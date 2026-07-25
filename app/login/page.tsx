"use client";

import { useState } from "react";
import { login } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      setLoading(true);

      await login(email, password);

      alert("🎉 Đăng nhập thành công!");

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("❌ Email hoặc mật khẩu không đúng.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        <h1 className="mb-8 text-center text-3xl font-bold text-blue-700">
          EduSIPAS
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded-xl border p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          className="mb-6 w-full rounded-xl border p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

      </div>
    </main>
  );
}