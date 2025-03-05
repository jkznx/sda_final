"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const storedToken = sessionStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      router.replace("/dashboards"); // ✅ ถ้ามี token อยู่แล้วให้ redirect ไปหน้า Dashboard
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:1337/api/auth/local", {
        identifier: email,
        password: password,
      });

      const loggedInUser = response.data.user;
      sessionStorage.setItem("token", response.data.jwt);
      sessionStorage.setItem("user", JSON.stringify(loggedInUser));

      setUser(loggedInUser);
      router.replace("/dashboards"); // ✅ ใช้ replace() แทน push() เพื่อป้องกันย้อนกลับ

      // บังคับให้รีเฟรชหน้า Dashboard ทันทีหลังจากที่ล็อกอิน
      window.location.reload();
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
    router.replace("/dashboards/login"); // ✅ เปลี่ยนเส้นทางไปหน้า login
  };

  const handleGoToRegister = () => {
    router.push("/dashboards/register"); // ✅ กดแล้วไปหน้า Register
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">{user ? "Sign Out" : "Login"}</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {!user ? (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              required
            />
            <button type="submit" className="w-full bg-purple-500 text-gray p-2 rounded mb-2">
              Login
            </button>
            <button type="button" onClick={handleGoToRegister} className="w-full bg-green-500 text-gray p-2 rounded">
              Register
            </button>
          </form>
        ) : (
          <button onClick={handleSignOut} className="w-full bg-red-500 text-gray p-2 rounded">
            Sign Out
          </button>
        )}

        {user && (
          <div className="mt-4 text-sm">
            <p>Welcome, {user.username}!</p>
          </div>
        )}
      </div>
    </div>
  );
}
