import type { Awaitable, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "your username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your password",
        },
      },
      async authorize(credentials) {
        //verify credentials from api
        //the below is a test account
        type User = {
          id: string;
          username: string;
          password: string;
        };
        const user: Awaitable<User | null> = {
          id: "24",
          username: "test@email.com",
          password: "password",
        };
        // try {
        //   const res = await (
        //     await fetch("http://192.168.1.9:8001/login", {
        //       method: "POST",
        //       body: JSON.stringify({
        //         email: credentials?.username,
        //         password: credentials?.password,
        //       }),
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //     })
        //   ).text();
        //   console.log(res);
        //   if (res === "welcome") return res;
        //   else return null;
        // } catch (error) {
        //   console.log(error);
        // }

        if (
          credentials?.username === user.username &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
