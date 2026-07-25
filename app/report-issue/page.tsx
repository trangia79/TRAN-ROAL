"use client";

import { useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ReportIssuePage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    issueType: "Giao diện / Khó thao tác",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 📥 Gửi dữ liệu lưu trực tiếp vào collection "reports" trên Firebase
      await addDoc(collection(db, "reports"), {
        name: formData.name || "Ẩn danh",
        contact: formData.contact || "Không cung cấp",
        issueType: formData.issueType,
        description: formData.description,
        status: "pending", // Trạng thái: Chưa xử lý
        createdAt: serverTimestamp(),
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Lỗi khi gửi báo lỗi:", error);
      alert("❌ Có lỗi xảy ra khi gửi báo lỗi. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="text-center mb-6">
          <span className="text-4xl">🛠️</span>
          <h1 className="text-2xl font-bold text-slate-800 mt-2">
            Báo Lỗi & Phản Hồi Hệ Thống
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            EduSIPAS - Trường THCS & THPT Mong Thọ
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <h2 className="text-xl font-bold text-slate-800">
              Cảm ơn bạn đã gửi phản hồi!
            </h2>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Thông tin báo lỗi đã được gửi tới Ban quản trị hệ thống. Chúng tôi sẽ xử lý và khắc phục trong thời gian sớm nhất.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", contact: "", issueType: "Giao diện / Khó thao tác", description: "" });
                }}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-medium transition"
              >
                Gửi phản hồi khác
              </button>
              <Link
                href="/"
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium transition"
              >
                Về trang chủ
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Họ và tên (không bắt buộc)
              </label>
              <input
                type="text"
                placeholder="Nguyễn Văn A"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Số điện thoại / Email liên hệ
              </label>
              <input
                type="text"
                placeholder="0912345678 hoặc email@gmail.com"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Loại sự cố <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.issueType}
                onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm bg-white"
                required
              >
                <option value="Giao diện / Khó thao tác">Giao diện / Khó thao tác</option>
                <option value="Không gửi được bài khảo sát">Không gửi được bài khảo sát</option>
                <option value="Lỗi đăng nhập / Tài khoản">Lỗi đăng nhập / Tài khoản</option>
                <option value="Tải trang chậm / Lỗi mạng">Tải trang chậm / Lỗi mạng</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Mô tả chi tiết lỗi <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                placeholder="Vui lòng mô tả rõ thao tác dẫn đến lỗi hoặc thông báo lỗi bạn gặp phải..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm resize-none"
              ></textarea>
            </div>

            <div className="flex gap-3 pt-2">
              <Link
                href="/"
                className="w-1/3 text-center py-3 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50 transition text-sm"
              >
                Hủy bỏ
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-2/3 py-3 rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700 disabled:bg-blue-300 transition text-sm shadow-md"
              >
                {isSubmitting ? "⏳ Đang gửi..." : "🚀 Gửi báo lỗi"}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}