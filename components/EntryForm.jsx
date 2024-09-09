// components/EntryForm.js
"use client";
// components/EntryForm.js
import { useState, useEffect } from "react";

const companies = [
  "Dmart",
  "Amazon",
  "Flipkart",
  "Others", // Add other companies as needed
];

const wings = ["Wing A", "Wing B", "Wing C"]; // Example wings

const flats = {
  "Wing A": [
    "101",
    "102",
    "103",
    "104",
    "201",
    "202",
    "203",
    "204",
    "301",
    "302",
    "303",
    "304",
  ],
  "Wing B": [
    "101",
    "102",
    "103",
    "104",
    "201",
    "202",
    "203",
    "204",
    "301",
    "302",
    "303",
    "304",
  ],
  "Wing C": [
    "101",
    "102",
    "103",
    "104",
    "201",
    "202",
    "203",
    "204",
    "301",
    "302",
    "303",
    "304",
  ],
};

export default function EntryForm() {
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [company, setCompany] = useState("");
  const [wing, setWing] = useState("");
  const [flatNo, setFlatNo] = useState("");
  const [message, setMessage] = useState("");
  const [availableFlats, setAvailableFlats] = useState([]);

  useEffect(() => {
    if (wing) {
      setAvailableFlats(flats[wing] || []);
    } else {
      setAvailableFlats([]);
    }
  }, [wing]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, mobileNo, company, wing, flatNo }), // Include wing in the request body
    });

    const result = await response.json();

    if (response.ok) {
      setMessage("Entry submitted successfully!");
      setName("");
      setMobileNo("");
      setCompany("");
      setWing("");
      setFlatNo("");
    } else {
      setMessage(`Error: ${result.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col">
        <label htmlFor="name" className="text-gray-700 font-medium mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="mobileNo" className="text-gray-700 font-medium mb-2">
          Mobile Number:
        </label>
        <input
          type="text"
          id="mobileNo"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="company" className="text-gray-700 font-medium mb-2">
          Company:
        </label>
        <select
          id="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="" disabled>
            Select a company
          </option>
          {companies.map((comp) => (
            <option key={comp} value={comp}>
              {comp}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="wing" className="text-gray-700 font-medium mb-2">
          Wing:
        </label>
        <select
          id="wing"
          value={wing}
          onChange={(e) => setWing(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="" disabled>
            Select a wing
          </option>
          {wings.map((wingOption) => (
            <option key={wingOption} value={wingOption}>
              {wingOption}
            </option>
          ))}
        </select>
      </div>
      {wing && (
        <div className="flex flex-col">
          <label htmlFor="flatNo" className="text-gray-700 font-medium mb-2">
            Flat Number:
          </label>
          <div className="flex flex-wrap gap-2">
            {availableFlats.map((flat) => (
              <button
                key={flat}
                type="button"
                onClick={() => setFlatNo(flat)}
                className={`border border-gray-300 rounded-lg p-2 ${
                  flatNo === flat
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {flat}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Submit
      </button>
      {message && <p className="text-red-500 text-center">{message}</p>}
    </form>
  );
}
