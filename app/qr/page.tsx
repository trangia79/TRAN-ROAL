"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function QRPage() {
  const [surveyUrl, setSurveyUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Tự động nhận diện tên miền thực tế (Vercel hoặc Localhost)
    if (typeof window !== "undefined") {
      setSurveyUrl(`${window.location.origin}/survey`);
    }
  }, []);

  const qrImageUrl = surveyUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
        surveyUrl
      )}`
    : "";

  const handleCopy = () => {
    if (!surveyUrl) return;
    navigator.clipboard.writeText(surveyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    if (!qrImageUrl) return;
    try {
      const response = await fetch(qrImageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "EduSIPAS-Ma-QR-Khao-Sat.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Không thể tải ảnh, vui lòng thử lại!");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl text-center">
        <h1 className="text-2xl font-bold text-slate-800">Mã QR Khảo Sát</h1>
        <p className="mt-2 text-sm text-slate-500">
          Sử dụng camera điện thoại hoặc ứng dụng Zalo để quét mã và thực hiện đánh giá sự hài lòng.
        </p>

        {/* Khung hiển thị QR Code */}
        <div className="my-6 flex justify-center">
          {qrImageUrl ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-inner">
              <img
                src={qrImageUrl}
                alt="Mã QR Khảo sát EduSIPAS"
                className="h-64 w-64 object-contain"
              />
            </div>
          ) : (
            <div className="flex h-64 w-64 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              Đang tạo mã QR...
            </div>
          )}
        </div>

        {/* Hiển thị đường dẫn khảo sát */}
        <div className="mb-6 rounded-lg bg-slate-50 p-3 text-xs text-slate-600 break-all border border-slate-200 font-mono">
          {surveyUrl || "Đang tải liên kết..."}
        </div>

        {/* Các nút thao tác */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleDownload}
            disabled={!qrImageUrl}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50"
          >
            📥 Tải ảnh mã QR về máy
          </button>

          <button
            onClick={handleCopy}
            disabled={!surveyUrl}
            className="flex items-center justify-center gap-2 w-full rounded-xl border border-slate-300 bg-white py-3 font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98] disabled:opacity-50"
          >
            {copied ? "✅ Đã sao chép link!" : "📋 Sao chép đường dẫn"}
          </button>

          <Link
            href="/"
            className="mt-2 text-sm text-slate-500 hover:text-slate-800 underline transition"
          >
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    </main>
  );
}