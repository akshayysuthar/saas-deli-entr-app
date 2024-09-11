// app/ClientHomePage.jsx
"use client";
import { useUser } from "@clerk/nextjs";

export default function Client() {
  const { user } = useUser();

  return (
    <h1 className="text-2xl font-semibold text-gray-800 mb-6">
      Welcome to {user?.firstName ? `${user.firstName} ${user.lastName} ` : "Society"}
    </h1>
  );
}
