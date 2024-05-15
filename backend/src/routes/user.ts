import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import bcrypt from 'bcryptjs'
import { sign } from 'hono/jwt'
import { signupInput, signinInput } from "@jaskirat01/medium-project"

interface User {
    readonly id: string;
    email: string;
    name: string;
    password: string;
}
type userSignUp = Pick<User, 'email' | 'password' | 'name'>
type userSignIn = Pick<User, 'email' | 'password'>;

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    }
}>();

app.post('/signup', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const body: userSignUp = await c.req.json();

    const { success } = signupInput.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json({ message: "Invalid Inputs" });
    } 

    try {
        const userExists: (User | null) = await prisma.user.findUnique({
            where: { email: body.email }
        });
        if(userExists) {
            c.status(409);
            return c.json({ message: "User already exists" });
        }
        const hashedPassword: string = await bcrypt.hash(body.password, 10);
        const user: User = await prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
                password: hashedPassword
            } 
        })
        const jwt: string = await sign({ id: user.id }, c.env.JWT_SECRET);
        c.status(201);
        return c.json({ jwt })
    } catch (err) {
        console.log(err);
        c.status(500);
        return c.json({ error: "error while signing up" })
    } finally {
        await prisma.$disconnect();
    }
});

app.post('/signin', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const body: userSignIn = await c.req.json();

    const { success } = signinInput.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json({ message: "Invalid Inputs" });
    } 

    try {
        const user: (User | null) = await prisma.user.findUnique({
            where: { email: body.email }
        });
        if(!user) {
            c.status(404);
            return c.json({ message: "User not found" });
        }
        const passwordValid: boolean = await bcrypt.compare(
            body.password, 
            user.password
        );
        if (!passwordValid) {
            c.status(401);
            return c.json({ message: "Invalid password" });
        }
        const jwt: string = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt });
    } catch (err) {
        console.log(err);
        c.status(500);
        return c.json({ error: "error while signing in" });
    } finally {
        await prisma.$disconnect();
    }
});

export default app;