# Backend - Medium Blog Website
 This is the backend for a Medium-like blogging site.
 It is build to run on Cloudflare Workers. 

## Technologies Used:
- Cloudflare Workers
- Prisma db and Accelerate Connection Pooling
- Hono framework
- TypeScript
- bcryptjs

## Get Started

- Clone the Repo

- Install the dependencies
```bash
    npm install
```

- Setup .env file fron given template
```
    DATABASE_URL=<direct link to postgress database>
    JWT_SECRET=<your jwt secret>
```

- Migrate database
```bash
    prisma migrate dev --name medium-backend
```

- Generate Prisma clients
```bash
    prisma generate
```

- Setup your wrangler.toml from given template
```
    name = "backend"
    compatibility_date = "2023-12-01"
    [vars]
    DATABASE_URL=<link to connection pool>
    JWT_SECRET=<your jwt secret>
```

- setup wrangler on your system

- Run the application
```bash
    npm run dev
```

## Deploy to cloudflare

- Login to wrangler
```bash
    npx wrangler login
```
- Deploy
```bash
    npm run deploy
```
