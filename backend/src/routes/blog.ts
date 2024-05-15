import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt';
import { createBlog, updateBlog } from "@jaskirat01/medium-project"

interface Blog {
    readonly id: string,
    title: string,
    content: string,
    published: boolean,
    readonly authorId: string,
    readonly createdAt: Date,
    readonly updatedAt: Date
}
type createBlogType = Pick<Blog, 'title' | 'content'>
type updateBlogType = Partial<Pick<Blog, 'id' | 'title' | 'content'>>

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    }, 
    Variables: {
        userId: string,
    }
}>();

// auth middleware
app.use('/*', async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    const token = authHeader.split(" ")[1]; 

    try{
        const { id }: { id: string } = await verify(token, c.env.JWT_SECRET);
        if(id) {
            c.set('userId', id);
            await next();
        } else {
            c.status(403);
            return c.json({ message: ""})
        }
    } catch (err) {
        c.status(403);
        return c.json({ message: "you are not logged in"})
    }
});

app.post('/', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body: createBlogType = await c.req.json();
    const userId: string = c.get('userId');

    const { success } = createBlog.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json({ message: "Invalid Inputs" });
    } 

    try {
        const post: Blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        });
        c.status(201);
        return c.json({ 
            message: "new Post created",
            id: post.id
        })
    } catch (err) {
        c.status(500);
        return c.json({message: "error while creating post"});
    } finally {
        await prisma.$disconnect();
    }
});

app.put('/', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body: updateBlogType = await c.req.json();
    const userId: string = c.get('userId');

    const { success } = updateBlog.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json({ message: "Invalid Inputs" });
    } 

    try {
        await prisma.post.update({
            where: {
                id: body.id,
                authorId: userId
            },
            data: {
                title: body.title,
                content: body.content
            }
        });
        c.status(200);
        return c.json({ message: "updated successfully" })
    } catch (err) {
        c.status(500)
        return c.json({ message: "error whle updating post" })
    } finally {
        await prisma.$disconnect();
    }
});

app.get('/:id', async (c) => {
    const id: string  = c.req.param('id');
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const post: Blog | null = await prisma.post.findUnique({
            where: { id }
        });
        if(!post){
            c.status(404);
            return c.json({ message: "Post/Blog not found" });
        }
        c.status(200);
        return c.json(post);
    } catch (err) {
        c.status(500)
        return c.json({ message: "error while fetching blog" })
    } finally {
        await prisma.$disconnect();
    }
});

app.get('/bulk/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    console.log("bulkkkkk");

    try {
        const posts: Blog[] = await prisma.post.findMany();
        c.status(200);
        if(!posts) return c.json("no posts/blogs found")
        return c.json(posts);
    } catch (err) {
        c.status(500)
        return c.json({ message: "error while fetching blog" })
    } finally {
        await prisma.$disconnect();
    }
});

export default app;