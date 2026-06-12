"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useAuth } from "@/app/context/AuthContext";

const AuthStatus = () => {
  const { user, loading, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch {
      toast.error("Failed to log out");
    }
  };

  if (loading) {
    return null;
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-regular font-medium text-black dark:text-white">
          {user.name || user.email}
        </span>
        <button
          aria-label="log out"
          onClick={handleLogout}
          className="text-regular font-medium text-waterloo hover:text-primary"
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/auth/signin"
        className="text-regular font-medium text-waterloo hover:text-primary"
      >
        Sign In
      </Link>
      <Link
        href="/auth/signup"
        className="flex items-center justify-center rounded-full bg-primary px-6 py-2 text-regular text-white duration-300 ease-in-out hover:bg-primaryho"
      >
        Sign Up
      </Link>
    </div>
  );
};

export default AuthStatus;
