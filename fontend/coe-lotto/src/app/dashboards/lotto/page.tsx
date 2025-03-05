'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const LottoPage = ({ searchTerm = '' }) => {
  const [lottoData, setLottoData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLottoData = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/lotto6s?populate[0]=lotto4num', {
          params: {
            fields: 'lottonumber',
            'populate[lotto4num][fields]': 'lottonumber',
          },
        });

        const formattedData = response.data.data.map((lotto: any) => ({
          lotto6number: String(lotto.lottonumber || 'N/A').padStart(6, '0'),
          lotto4number: String(lotto.lotto4num?.lottonumber || 'N/A').padStart(4, '0'),
        }));

        setLottoData(formattedData);
      } catch (err: any) {
        setError(`Error fetching lotto data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchLottoData();
  }, []);

  const handleAddToCart = (lotto: { lotto6number: string; lotto4number: string }) => {
    const userData = sessionStorage.getItem("user");
    if (!userData) {
      alert("Please log in first.");
      return;
    }

    const user = JSON.parse(userData);
    const userId = user.id;
    const cartKey = `cart_${userId}`;

    const existingCart = JSON.parse(sessionStorage.getItem(cartKey) || "[]");

    const foundIndex = existingCart.findIndex(
      (item: any) => item.lotto6number === lotto.lotto6number
    );

    if (foundIndex !== -1) {
      existingCart[foundIndex].count += 1;
    } else {
      existingCart.push({
        id: Date.now().toString(),
        lotto6number: lotto.lotto6number,
        lotto4number: lotto.lotto4number,
        count: 1,
        price: 100, // ตั้งราคาสมมติ
      });
    }

    sessionStorage.setItem(cartKey, JSON.stringify(existingCart));
    alert(`Added to cart: ${lotto.lotto6number} / ${lotto.lotto4number}`);
  };

  if (loading) return <div>Loading lotto data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">Lotto Numbers</h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lottoData.map((lotto, index) => (
          <div key={index} className="bg-purple-500 text-white p-4 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-bold">{lotto.lotto6number}</h3>
            <p className="text-sm">4-digit: {lotto.lotto4number}</p>
            <button
              onClick={() => handleAddToCart(lotto)}
              className="mt-2 bg-red-500 px-4 py-2 rounded hover:bg-red-700 text-sm"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LottoPage;
