// pages/entries.js
"use client";
import { useEffect, useState } from "react";
import { useUser } from '@clerk/nextjs';

export default function EntriesPage() {
  const { user } = useUser();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEntries() {
      if (!user) return; // Ensure user is available

      try {
        const response = await fetch(`/api/entries?societyId=${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch entries");
        }
        const data = await response.json();
        setEntries(data.entries); // Adjust based on the shape of your API response
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEntries();
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">All Entries</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        {entries.length === 0 ? (
          <p>No entries found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wing</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flat No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {entries.map((entry) => (
                <tr key={entry._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{entry.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{entry.mobileNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{entry.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{entry.wing}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{entry.flatNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(entry.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
