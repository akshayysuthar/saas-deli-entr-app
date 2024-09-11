// pages/index.js
"use client";
import Client from "@/components/ClientName";
import EntryForm from "../components/EntryForm";
import Footer from "@/components/ui/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4">
      <Client />
      <main className="bg-white shadow-lg rounded-lg max-w-md w-full p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Visitor and Delivery Person Entries
        </h1>
        <EntryForm />
      </main>
      <Footer />
    </div>
  );
}
