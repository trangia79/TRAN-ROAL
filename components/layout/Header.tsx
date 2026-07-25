import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Logo trường"
            width={150}
            height={150}
          />

          <div>
            <h1 className="text-2xl font-bold text-blue-700">
              EduSIPAS
            </h1>

            <p className="text-sm text-gray-500">
              THCS & THPT Mong Thọ
            </p>
          </div>
        </div>

        {/* Menu */}
        <nav className="hidden gap-8 text-gray-700 md:flex">
          <Link href="/">Trang chủ</Link>
          <Link href="#">Khảo sát</Link>
          <Link href="#">Thống kê</Link>
          <Link href="#">Liên hệ</Link>
        </nav>

        {/* Button */}
        <button className="rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700">
          Đăng nhập
        </button>

      </div>
    </header>
  );
}