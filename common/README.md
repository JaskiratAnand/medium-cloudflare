## Introduction

This module contains code for zod validation of user inputs and data types.
module also exports data types for use in frontend

## Getting started

- Installing the module
```bash
    npm install @jaskirat01/medium-project
```

- Importing the module
```ts
    // user auth
    import { signupInput, signinInput } from "@jaskirat01/medium-project"

    // blogs
    import { createBlog, updateBlog } from "@jaskirat01/medium-project"
```

- Using the functions
```ts
    const { success } = signupInput.safeParse(userInputs);
```

- Importing Typescript types:
```ts
    // user auth
    import { UserSignUp, UserSignIn } from "@jaskirat01/medium-project"

    // blogs
    import { CreateBlog, UpdateBlog } from "@jaskirat01/medium-project"
```

- Using types
```ts
    const inputBody: UserSignUp = await c.req.json();
```

## publish to npm
```bash
    npm adduser
    npm publish --access public
```