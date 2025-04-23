import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, {
  CallbacksOptions,
  DefaultSession,
  NextAuthOptions,
} from "next-auth";
import bcrypt from "bcrypt";
import { users } from "src/stores/users";

declare module "next-auth" {
  interface User {
    id: string;
    isVerified: boolean;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}

export const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  }),

  FacebookProvider({
    clientId: process.env.FACEBOOK_CLIENT_ID || "",
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
  }),
  CredentialsProvider({
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: "",
    // The credentials is used to generate a suitable form on the sign in page.
    // You can specify whatever fields you are expecting to be submitted.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      email: {
        label: "email",
        type: "email",
        placeholder: "Email address*",
      },
      password: {
        label: "Password",
        type: "password",
        placeholder: "Password*",
      },
    },
    async authorize(credentials) {
      const { email, password } = credentials ?? {};

      const user = users.find((u) => u.email === email);
      if (!user) return null;

      const passwordValid = await bcrypt.compare(
        password || "",
        user.passwordHash
      );
      if (!passwordValid) return null;

      return {
        id: user.id,
        email: user.email,
        isVerified: user.isVerified,
      };
    },
  }),
];

const callbacks: Pick<
  CallbacksOptions,
  "signIn" | "redirect" | "session" | "jwt"
> = {
  async redirect({ url }) {
    return url;
  },
  async signIn() {
    // You already authenticated with CredentialsProvider
    // If user is null, signIn is denied automatically
    return true;
  },
  async jwt({ token, user }) {
    // First time login: copy info from the user object
    if (user) {
      token.id = user.id;
      token.email = user.email;
      token.isVerified = user.isVerified;
    }
    return token;
  },
  async session({ session, token }) {
    // Inject custom fields into the session
    session.user = {
      id: token.id as string,
      email: token.email as string,
      isVerified: token.isVerified as boolean,
    };
    return session;
  },
};

const pages = {
  signIn: "/signin",
  signOut: "/signout",
  error: "/error", // Error code passed in query string as ?error=
  verifyRequest: "/verifyRequest", // (used for check email message)
  newUser: "/signup", // New users will be directed here on first sign in (leave the property out if not of interest)
};

export const authOptions: NextAuthOptions = {
  providers,
  callbacks,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 10 * 24 * 60 * 60, // 10 days
  },
  pages,
};

export default NextAuth(authOptions);
