> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Use Prisma Postgres with Bun

<Note>
  Prisma needs Node.js to run certain generation code, so make sure Node.js is installed in the environment where you
  run `bunx prisma` commands.
</Note>

<Steps>
  <Step title="Create a new project">
    First, create a directory and initialize it with `bun init`.

    ```bash terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
    mkdir prisma-postgres-app
    cd prisma-postgres-app
    bun init
    ```
  </Step>

  <Step title="Install Prisma dependencies">
    Then install the Prisma CLI (`prisma`), Prisma Client (`@prisma/client`), and the accelerate extension as dependencies.

    ```bash terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
    bun add -d prisma
    bun add @prisma/client @prisma/extension-accelerate
    ```
  </Step>

  <Step title="Initialize Prisma with PostgreSQL">
    Use the Prisma CLI with `bunx` to initialize the schema and migration directory, with PostgreSQL as the database.

    ```bash terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
    bunx --bun prisma init --db
    ```

    This creates a basic schema. Update it to use the Rust-free client optimized for Bun: open `prisma/schema.prisma` and modify the generator block, then add a `User` model.

    ```prisma prisma/schema.prisma icon="https://mintcdn.com/bun-1dd33a4e/nIz6GtMH5K-dfXeV/icons/ecosystem/prisma.svg?fit=max&auto=format&n=nIz6GtMH5K-dfXeV&q=85&s=c37203455320f85a20a7b29ce374661c" theme={"theme":{"light":"github-light","dark":"dracula"}}
    generator client {
    	provider = "prisma-client"
    	output = "./generated" // [!code ++]
    	engineType = "client" // [!code ++]
    	runtime = "bun" // [!code ++]
    }

    datasource db {
    	provider = "postgresql"
    	url      = env("DATABASE_URL")
    }

    model User { // [!code ++]
    	id    Int     @id @default(autoincrement()) // [!code ++]
    	email String  @unique // [!code ++]
    	name  String? // [!code ++]
    } // [!code ++]
    ```
  </Step>

  <Step title="Configure database connection">
    Set up your Postgres database URL in the `.env` file.

    ```ini .env icon="settings" theme={"theme":{"light":"github-light","dark":"dracula"}}
    DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"
    ```
  </Step>

  <Step title="Create and run database migration">
    Then generate and run the initial migration.

    The command writes a `.sql` migration file to `prisma/migrations` and executes it against your Postgres database.

    ```bash terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
    bunx --bun prisma migrate dev --name init
    ```

    ```txt theme={"theme":{"light":"github-light","dark":"dracula"}}
    Environment variables loaded from .env
    Prisma schema loaded from prisma/schema.prisma
    Datasource "db": PostgreSQL database "mydb", schema "public" at "localhost:5432"

    Applying migration `20250114141233_init`

    The following migration(s) have been created and applied from new schema changes:

    prisma/migrations/
      └─ 20250114141233_init/
        └─ migration.sql

    Your database is now in sync with your schema.

    ✔ Generated Prisma Client (6.17.1) to ./generated in 18ms
    ```
  </Step>

  <Step title="Generate Prisma Client">
    As the output shows, Prisma re-generates the *Prisma client* whenever you run a new migration. The client provides a fully typed API for reading and writing to the database. To re-generate the client manually, use the Prisma CLI.

    ```sh terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
    bunx --bun prisma generate
    ```
  </Step>

  <Step title="Initialize Prisma Client with Accelerate">
    Create a new file `prisma/db.ts` that initializes the PrismaClient with the Postgres adapter.

    ```ts prisma/db.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
    import { PrismaClient } from "./generated/client";
    import { withAccelerate } from '@prisma/extension-accelerate'

    export const prisma = new PrismaClient().$extends(withAccelerate())
    ```
  </Step>

  <Step title="Create a test script">
    Write a script that creates a new user, then counts the users in the database.

    ```ts index.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
    import { prisma } from "./prisma/db";

    // create a new user
    await prisma.user.create({
      data: {
        name: "John Dough",
        email: `john-${Math.random()}@example.com`,
      },
    });

    // count the number of users
    const count = await prisma.user.count();
    console.log(`There are ${count} users in the database.`);
    ```
  </Step>

  <Step title="Run and test the application">
    Run the script with `bun run`. Each run creates a new user.

    ```bash terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
    bun run index.ts
    ```

    ```txt theme={"theme":{"light":"github-light","dark":"dracula"}}
    There are 1 users in the database.
    ```

    ```bash terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
    bun run index.ts
    ```

    ```txt theme={"theme":{"light":"github-light","dark":"dracula"}}
    There are 2 users in the database.
    ```

    ```bash terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
    bun run index.ts
    ```

    ```txt theme={"theme":{"light":"github-light","dark":"dracula"}}
    There are 3 users in the database.
    ```
  </Step>
</Steps>

***

Prisma Postgres is now set up with Bun. Refer to the [official Prisma Postgres docs](https://www.prisma.io/docs/postgres) as you continue to develop your application.
