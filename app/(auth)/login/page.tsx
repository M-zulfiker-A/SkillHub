import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { UserAuthForm } from "../components/UserAuthForm";
import AuthStatic from "../components/AuthStatic";

export const metadata: Metadata = {
  title: "Login to Skillhub",
  description: "Login Page to Skill hub",
};

export default function AuthenticationPage() {
  return (
    <>
      <AuthStatic pageType="Login" />
    </>
  );
}
