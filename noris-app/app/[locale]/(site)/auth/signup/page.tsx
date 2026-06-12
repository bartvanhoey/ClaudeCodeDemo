import Signup from "@/components/Auth/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up Page - Noris SaaS Boilerplate",

  // other metadata
  description: "This is Sign Up page for Noris Pro"
};

export default function Register() {
  return (
    <>
      <Signup />
    </>
  );
}
