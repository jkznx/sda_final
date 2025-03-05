import { useEffect, useState } from 'react';
import axios from 'axios';

const Checklotto = () => {
  const [reward4nums, setReward4nums] = useState(null);
  const [reward6nums, setReward6nums] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ดึงข้อมูลจาก API /reward4nums
        const res4nums = await axios.get('http://localhost:1337/api/reward4nums');
        setReward4nums(res4nums.data.data[0]);

        // ดึงข้อมูลจาก API /reward6nums
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
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>กำลังโหลดข้อมูล...</h1>
      </div>
    );
  }

  return (
    <div style={{ width: '80%', margin: '0 auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ textAlign: 'center' }}>ตรวจสอบล็อตโต้</h1>

      <div>
        <h2>ข้อมูลจาก API /reward4nums</h2>
        {reward4nums ? (
          <div style={{ backgroundColor: '#e0e0e0', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
            <h3>ID: {reward4nums.id}</h3>
            <p>Reward4Num: {reward4nums.reward4num}</p>
            <p>Document ID: {reward4nums.documentId}</p>
            <p>Created At: {new Date(reward4nums.createdAt).toLocaleString()}</p>
          </div>
        ) : (
          <p>ไม่พบข้อมูลจาก API /reward4nums</p>
        )}
      </div>

      <div>
        <h2>ข้อมูลจาก API /reward6nums</h2>
        {reward6nums ? (
          <div style={{ backgroundColor: '#e0e0e0', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
            <h3>ID: {reward6nums.id}</h3>
            <p>Reward6Num: {reward6nums.reward6num}</p>
            <p>Document ID: {reward6nums.documentId}</p>
            <p>Created At: {new Date(reward6nums.createdAt).toLocaleString()}</p>
          </div>
        ) : (
          <p>ไม่พบข้อมูลจาก API /reward6nums</p>
        )}
      </div>
    </div>
  );
};

export default Checklotto;
