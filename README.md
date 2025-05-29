This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## MCP (Model Context Protocol) Setup

This project supports Supabase MCP for AI assistants like Cursor. **IMPORTANT: Never commit your actual MCP configuration file with access tokens!**

### Setup Instructions

1. **Create Personal Access Token**

   - Go to [Supabase Dashboard](https://supabase.com/dashboard) → Settings → Access Tokens
   - Generate a new token for MCP usage

2. **Configure MCP**

   ```bash
   # Copy the example configuration
   cp .cursor/mcp.json.example .cursor/mcp.json

   # Edit with your actual tokens
   # Replace YOUR_SUPABASE_PERSONAL_ACCESS_TOKEN with your token
   # Replace YOUR_PROJECT_ID with: lcxkydjlpbypmmtmfigs
   ```

3. **Security Note**
   - `.cursor/mcp.json` is automatically ignored by Git
   - Never share your personal access tokens
   - Use read-only mode when possible by adding `--read-only` flag

### Usage with Cursor IDE

After setup, you can ask Cursor AI assistant:

- "Show me the Supabase database schema"
- "List all tables in the database"
- "Create a new migration"

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
