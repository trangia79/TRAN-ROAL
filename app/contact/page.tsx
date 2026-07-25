import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <h1 className="text-2xl font-bold text-blue-900 text-center mb-2">
          Thông Tin Liên Hệ
        </h1>
        <p className="text-slate-500 text-center text-sm mb-8">
          Trường THCS & THPT Mong Thọ - Hệ thống EduSIPAS
        </p>

        <div className="space-y-4 text-slate-700 text-sm">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
            <span className="text-xl">📍</span>
            <div>
              <strong>Địa chỉ:</strong> Ấp Hoà An, Xã Thạnh Lộc, Tỉnh An Giang
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
            <span className="text-xl">📞</span>
            <div>
              <strong>Điện thoại nhà trường:</strong> (02973) 837 437
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
            <span className="text-xl">✉️</span>
            <div>
              <strong>Email góp ý:</strong> c3mongtho.kiengiang@moet.edu.vn
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block rounded-xl bg-blue-600 px-6 py-2.5 font-semibold text-white transition hover:bg-blue-700"
          >
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    </main>
  );
}