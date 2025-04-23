# basta-dl-client

## 🧱 About [www.basta.app](http://www.basta.app)

This project is a skeleton app used to showcase how to use [www.basta.app](https://www.basta.app) in a **headless** manner. It demonstrates integration patterns, authentication, and API usage that developers can adopt when building custom frontends or services using the Basta platform as a backend.

**basta-dl-client** is a frontend application built using [Next.js](https://nextjs.org/) with TypeScript. It leverages GraphQL, Apollo Client, and various modern tools to provide a rich user experience, including authentication, email capabilities, data handling, and UI components based on Material UI Joy and Emotion.

## 🔐 Authentication

We implemented a very naive user store to allow customers to test out the login flow and place bids as users. These mock users are included by default and simulate both verified and unverified accounts.

```txt
alice@example.com / basta (verified)
bob@example.com / basta (verified)
carol@example.com / basta (not verified)
```

## 📆 Project Overview

This client is part of the Basta platform ecosystem, focusing on dynamic data interactions, secure authentication, and modern frontend development best practices.

---

## 🚀 Getting Started

### 1. Prerequisites

Make sure your database is seeded or populated appropriately to support these users.

#### SSL Development Setup

To enable HTTPS in local development, install and configure mkcert:

1. **Install mkcert (Generate Dev Certificates)**

**macOS:**

```bash
brew install mkcert && mkcert -install
```

**Ubuntu:**

```bash
sudo apt install libnss3-tools
wget -O mkcert https://github.com/FiloSottile/mkcert/releases/latest/download/mkcert-linux-amd64
chmod +x mkcert
sudo mv mkcert /usr/local/bin/
mkcert -install
```

**Generate Certificates**

```bash
mkcert localhost
```

The above command generates `localhost.pem` (certificate) and `localhost-key.pem` (key).

**Prepare environment variables**

- Node.js v16+ (recommend using `nvm`)
- Yarn or NPM (project uses `npm`)
- A `.env.local` file with the following variables:

```env
# Created by Vercel CLI
BASTA_ACCOUNT_ID=""
BASTA_MANAGEMENT_API_URI="https://management.api.basta.app/graphql"
BASTA_MANAGEMENT_KEY=""
NEXTAUTH_SECRET=""
NEXTAUTH_URL="localhost:3000"
NEXT_PUBLIC_BASTA_CLIENT_API_URL="https://client.api.basta.app/graphql"
NEXT_PUBLIC_BASTA_WSS_URL="wss://client.api.basta.app/graphql"
```

> 🔐 **Note:**
>
> - You need to get an API token and your account ID from Basta.
> - Generate a secure random passphrase to use as your `NEXTAUTH_SECRET`.
> - A valid SendGrid API key is required for email functionality.
> - To enable **Facebook social login**, you must create a [Facebook App](https://developers.facebook.com/apps/) and fill in the `FACEBOOK_CLIENT_ID` and `FACEBOOK_CLIENT_SECRET`.
> - To enable **Google social login**, you must create a [Google Cloud OAuth client](https://console.cloud.google.com/apis/credentials) and provide the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

### 2. Installation

```bash
pnpm install
```

### 3. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### 4. Production Build

```bash
npm run build
npm start
```

### 5. Export Static Site

```bash
npm run export
```

---

## 📱 Code Generation

This project uses [GraphQL Code Generator](https://the-guild.dev/graphql/codegen) to auto-generate TypeScript types and hooks.

```bash
npm run codegen
```

The configuration lives in `codegen.yaml`.

---

## 🔐 Environment Setup

To pull environment variables from Vercel:

```bash
npm run env
```

---

## 🔧 Scripts

| Script    | Description                                |
| --------- | ------------------------------------------ |
| `dev`     | Start development server                   |
| `build`   | Compile the application                    |
| `start`   | Start the production server                |
| `lint`    | Lint the project using ESLint              |
| `codegen` | Generate GraphQL types and hooks           |
| `export`  | Export the project to static HTML          |
| `link`    | Link project to Vercel using scope `basta` |
| `env`     | Pull environment variables from Vercel     |

---

## 📚 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: TypeScript
- **GraphQL**: Apollo Client, graphql-request, graphql-codegen
- **UI**: MUI Joy, Emotion
- **Authentication**: NextAuth.js
- **Utilities**: axios, bcrypt, uuid, moment, date-fns, dinero.js

---

## 🧪 Dev Dependencies

- ESLint for linting
- TypeScript definitions
- GraphQL Codegen plugins

---

## 📩 Contact

For issues or feature requests, please open an issue in the repository or contact the development team.

---
