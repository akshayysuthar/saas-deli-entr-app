// app/api/entries/route.js
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { name, mobileNo, company, wing, flatNo, societyId } =
      await req.json();

    if (!name || !mobileNo || !company || !wing || !flatNo || !societyId) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const client = await clientPromise;
    const db = client.db("society");
    const collection = db.collection("entries");

    await collection.insertOne({
      name,
      mobileNo,
      company,
      wing,
      flatNo,
      societyId,
      timestamp: new Date(),
    });

    return new Response(
      JSON.stringify({ message: "Entry submitted successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const societyId = searchParams.get("societyId");

    if (!societyId) {
      return new Response(
        JSON.stringify({ message: "Society ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const client = await clientPromise;
    const db = client.db("society");
    const collection = db.collection("entries");

    const entries = await collection.find({ societyId }).toArray();

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
