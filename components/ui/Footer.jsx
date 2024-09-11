import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useAuth,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";

const Footer = () => {
  const { isLoaded, userId } = useAuth(); // Check if user is authenticated
  const { user } = useUser();

  return (
    <footer className="mt-8 text-gray-600 text-center">
      <p>&copy; {new Date().getFullYear()} Society Management</p>
      <Link href="/entries">
        <h2>{user?.username}</h2>
      </Link>
      <div className="flex items-center justify-center gap-4">
        {/* If user is signed in, show sign out */}
        {isLoaded && userId ? (
          <SignedIn>
            <div>You are signed in</div>
            <SignOutButton />
          </SignedIn>
        ) : (
          // If user is not signed in, show sign in
          <SignedOut>
            <SignInButton mode="modal" />
          </SignedOut>
        )}
      </div>
    </footer>
  );
};

export default Footer;
