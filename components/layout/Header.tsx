"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* LOGO & TÊN TRƯỜNG */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-12 h-12">
            <Image
              src="/logo.png" // Đường dẫn logo của bạn
              alt="EduSIPAS Logo"
              width={68}
              height={68}
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-blue-900 leading-tight">
              EduSIPAS
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              THCS & THPT Mong Thọ
            </p>
          </div>
        </Link>

        {/* MENU ĐIỀU HƯỚNG */}
        <nav className="hidden md:flex items-center gap-8 text-slate-600 font-medium text-sm">
         
          <Link href="/dashboard" className="hover:text-blue-600 transition">
            Thống kê
          </Link>
         <Link href="/contact" className="hover:text-blue-600 transition">
            Liên hệ
          </Link>
          {/* 👇 Nút Báo lỗi hệ thống mới */}
          <Link href="/report-issue" className="hover:text-blue-600 transition">
            Báo lỗi hệ thống
          </Link>
        </nav>

        {/* NÚT ĐĂNG NHẬP */}
        <Link href="/login">
          <button className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 shadow-sm active:scale-95">
            Đăng nhập
          </button>
        </Link>
      </div>
    </header>
  );
}