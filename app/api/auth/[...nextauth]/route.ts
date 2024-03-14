import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { Session } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      id: "login-credentials",
      name: "Login Credentials",
      credentials: {},

      async authorize(credentials: any, req) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string() })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };

          const body = JSON.stringify({ email, password });

          try {
            const res = await axios.post(
              "https://playshere-api-v1.onrender.com/api/v1/user/signin",
              body,
              config
            );
            const user = await res.data;
            return user;
          } catch (err: any) {
            const error = err.response.data;
            throw new Error(error.message);
          }
        }
        return null;
      },
    }),

    Credentials({
      id: "register-credentials",
      name: "Register Credentials",
      credentials: {},

      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            name: z.string(),
            email: z.string().email(),
            password: z.string(),
            phoneNumber: z.string(),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { name, email, password, phoneNumber } = parsedCredentials.data;
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };

          const body = JSON.stringify({ name, email, password, phoneNumber });

          try {
            const res = await axios.post(
              "https://playshere-api-v1.onrender.com/api/v1/user/register",
              body,
              config
            );
            const user = await res.data;
            return user;
          } catch (err: any) {
            const errors = err.response.data;
            console.log(errors);
            throw new Error(errors.message);
          }
        }
        return null;
      },
    }),

    Credentials({
      id: "confirm-otp",
      name: "Confirm OTP",
      credentials: {},

      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            OTP: z.string(),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, OTP } = parsedCredentials.data;
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };

          const body = JSON.stringify({ email, OTP });

          try {
            const res = await axios.post(
              "https://playshere-api-v1.onrender.com/api/v1/user/confirm-otp",
              body,
              config
            );
            const user = await res.data;
            return user;
          } catch (err: any) {
            const errors = err.response.data;
            console.log(errors);
            throw new Error(errors.message);
          }
        }
        return null;
      },
    }),
  ],

  session: { strategy: "jwt" },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/",
    // verifyRequest: "/confirmOTP",
    // error: "/error",
  },

  callbacks: {
    async session({ session, token }: { session: Session; token: any }) {
      session.user = token.user;
      // console.log(session);
      return session;
    },
    async jwt({ token, user }: { token: DefaultJWT; user: any }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
