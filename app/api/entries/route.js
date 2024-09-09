// pages/api/entries.js
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { name, mobileNo, company, wing, flatNo } = await req.json();

    // Validate the request body
    if (!name || !mobileNo || !company || !wing || !flatNo) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("society");
    const collection = db.collection("entries");

    // Insert the entry into MongoDB
    await collection.insertOne({
      name,
      mobileNo,
      company,
      wing,
      flatNo,
      timestamp: new Date(),
    });

    return new Response(
      JSON.stringify({ message: "Entry submitted successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error inserting entry:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("society");
    const collection = db.collection("entries");

    const entries = await collection.find({}).toArray();

    return new Response(JSON.stringify({ entries }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
