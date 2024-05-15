import z from 'zod';

// User auth
export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().optional()
});

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});


// blogs
export const createBlog = z.object({
    title: z.string(),
    content: z.string()
});

export const updateBlog = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string()
});


export type UserSignUp = z.infer<typeof signupInput>;
export type UserSignIn = z.infer<typeof signinInput>;
export type CreateBlog = z.infer<typeof createBlog>;
export type UpdateBlog = z.infer<typeof updateBlog>;