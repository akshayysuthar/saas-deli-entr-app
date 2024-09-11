"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Client from "@/components/ClientName";
import Footer from "@/components/ui/Footer";

export default function EntriesPage() {
  const { user } = useUser();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEntries() {
      if (!user) return;

      try {
        const response = await fetch(`/api/entries?societyId=${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch entries");
        }
        const data = await response.json();
        setEntries(data.entries);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEntries();
  }, [user]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <Client />
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
        All Entries
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
        {entries.length === 0 ? (
          <p className="text-center">No entries found.</p>
        ) : (
          <div className="overflow-x-auto">
            {/* Table */}
            <table className="min-w-full divide-y divide-gray-200 table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Mobile No
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Wing
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Flat No
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {entries.map((entry) => (
                  <tr key={entry._id}>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm">
                      {entry.name}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm">
                      {entry.mobileNo}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm">
                      {entry.company}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm">
                      {entry.wing}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm">
                      {entry.flatNo}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm">
                      {new Date(entry.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
