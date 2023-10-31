import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { UserAuthForm } from "./UserAuthForm";

export default function AuthStatic({
  pageType,
}: {
  pageType: "Login" | "Signup";
}) {
  return (
    <>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900">
            <Image
              src="/loginSideImage.jpg"
              width={900}
              height={1250}
              alt="hero image"
            />
          </div>
          <div className="relative z-20 flex items-center text-2xl font-extrabold">
            <p className="bg-green-500 px-1 rounded-sm mr-1">Skill</p>{" "}
            <p className="text-black">Hub</p>
          </div>
        </div>
        <div className="lg:p-8 h-screen flex items-center justify-center">
          <div className="w-full justify-center space-y-6 rounded-lg sm:w-[350px] items-center p-6 shadow-[0.625rem_0.625rem_0.875rem_0_rgb(225,226,228),-0.5rem_-0.5rem_1.125rem_0_rgb(255,255,255)]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-3xl font-extrabold tracking-tight">Login</h1>
            </div>
            <UserAuthForm Authtype={pageType} />
            <div className="text-sm text-center">
              {pageType === "Login"
                ? "Still an outsider? Sign up "
                : "Already a member? Login "}

              <Link
                href={pageType === "Login" ? "signup" : "login"}
                className="hover:text-green-500"
              >
                Here!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
