'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

const Checklotto = () => {
  const [reward4nums, setReward4nums] = useState(null);
  const [reward6nums, setReward6nums] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res4nums = await axios.get('http://localhost:1337/api/reward4nums');
        setReward4nums(res4nums.data.data[0]);

        const res6nums = await axios.get('http://localhost:1337/api/reward6nums');
        setReward6nums(res6nums.data.data[0]);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 via-violet-500 to-violet-500">
        <h1 className="text-white text-3xl font-bold">กำลังโหลดข้อมูล...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-400 to-violet-600 p-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-8">
          ประกาศผลรางวัล
        </h1>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">เลขชุด 6 ตัว</h2>
          {reward6nums ? (
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        
              <p className="text-gray-600">เลขที่ออก: {reward6nums.reward6num}</p>
              <p className="text-gray-600">ประกาศผลเมื่อวันที่: {new Date(reward6nums.createdAt).toLocaleString()}</p>
            </div>
          ) : (
            <p className="text-red-500">ไม่พบข้อมูลจาก API /reward6nums</p>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">เลขชุด 4 ตัว</h2>
          {reward4nums ? (
            <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
             
              <p className="text-gray-600">เลขที่ออก: {reward4nums.reward4num}</p>
             
              <p className="text-gray-600">ประกาศผลเมื่อวันที่: {new Date(reward4nums.createdAt).toLocaleString()}</p>
            </div>
          ) : (
            <p className="text-red-500">ไม่พบข้อมูลจาก API /reward4nums</p>
          )}
        </div>

        
      </div>
    </div>
  );
};

export default Checklotto;
