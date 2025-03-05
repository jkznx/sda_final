"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Cart() {
  const [lotto6s, setLotto6s] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      router.push("/dashboards/login"); // Redirect to login if no token is available
    } else {
      // Fetch user data from API
      fetchUserData(token);
    }
  }, [router]);

  const fetchUserData = async (token: string) => {
    try {
      const response = await axios.get("http://localhost:1337/api/users/me?populate=*", {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in request header
        },
      });

      const userData = response.data;
      setLotto6s(userData.lotto_6s || []); // Assuming the lotto_6s data is available in user data
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred while fetching the user data.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-purple-600">COE Lotto</h2>
          <div className="space-x-4">
            <button className="bg-gray-200 text-sm px-4 py-2 rounded-lg">Check</button>
            <button className="bg-gray-200 text-sm px-4 py-2 rounded-lg">Buys</button>
            <button className="bg-purple-600 text-white text-sm px-4 py-2 rounded-lg">Carts</button>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-700 mb-6">My Carts</h3>
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {lotto6s.length === 0 ? (
          <p className="text-center text-gray-500">No Lotto 6s found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lotto6s.map((lotto: any) => (
              <div key={lotto.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <p className="font-medium text-lg text-gray-700">Lotto Number: {lotto.lottonumber}</p>
                <p className="text-sm text-gray-600">Count: {lotto.count}</p>
                <p className="text-xs text-gray-500">Created At: {new Date(lotto.createdAt).toLocaleString()}</p>
                <p className="text-xs text-gray-500">Updated At: {new Date(lotto.updatedAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
