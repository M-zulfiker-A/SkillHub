"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodObject, ZodString, ZodType } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type FormSchema = {
  username: string;
  password: string;
  confirmPassword: string;
};

const formSchema: ZodType<FormSchema> = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters." })
      .regex(/[a-z]/, { message: "Password must contain lowercase letters." })
      .regex(/[A-Z]/, { message: "Password must contain uppercase letters." })
      .regex(/[0-9]/, { message: "Password must contain numbers." })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain special characters.",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export function UserAuthForm({ Authtype }: { Authtype: "Login" | "Signup" }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-bold">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="awesomename@example.com"
                  className="bg-gray-200 rounded-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-bold">Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="complex password"
                  className="bg-gray-200 rounded-lg"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {Authtype === "Signup" && (
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Retype Password"
                    className="bg-gray-200 rounded-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button
          className="bg-green-500 hover:bg-green-600 w-full"
          type="submit"
        >
          {Authtype}
        </Button>
      </form>
    </Form>
  );
}
