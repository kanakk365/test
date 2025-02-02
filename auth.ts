import NextAuth, { type DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; // Import CredentialsProvider

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's id. */
      id: string;
      jwt: string;
      role: string;
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  // Specify the authentication providers
  secret: "sdfdf3432T%RGTF#$t",
  providers: [
    // CredentialsProvider for username and password authentication
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone", type: "text" },
        otp: { label: "otp", type: "password" },
      },
      async authorize(credentials) {
        // Replace "/api/auth" with your actual authentication endpoint
        const res = await fetch(
          `https://wedzing-admin.vercel.app/api/authenticate`,
          {
            // const res = await fetch(
            //   `https://roc8-challenge-q2.vercel.app/api/authenticate`,
            //   {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          },
        );
        const r = await res.json();
        console.log(r);
        const user = {
          id: "",
          message: "",
          type: "",
          token: "",
        };
        user.message = r.data.message;
        user.type = r.type;
        user.token = r.data.token;
        if (!res.ok) {
          throw new Error(user.message);
        }

        // If the response is ok and user data is returned, authenticate the user
        if (res.ok && user) {
          return { ...user };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user && "token" in user && "type" in user) {
        token.jwt = user.token;
        token.type = user.type;
      }
      return token;
    },
    session({ session, token }) {
      // Assign the user ID from the token to the session's user object
      if (session?.user) {
        session.user.jwt = String(token.jwt);
        session.user.role = String(token.type);
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Custom sign-in page URL
  },
});
