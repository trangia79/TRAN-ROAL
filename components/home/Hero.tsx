import Link from "next/link";
export default function Hero() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">

        <h1 className="text-4xl font-extrabold text-slate-800 md:text-6xl">
          HỆ THỐNG ĐÁNH GIÁ
        </h1>

        <h2 className="mt-3 text-4xl font-extrabold text-blue-600 md:text-6xl">
          SỰ HÀI LÒNG
        </h2>

        <p className="mt-8 text-xl text-gray-600">
          Dành cho Phụ huynh và Học sinh
        </p>

        <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-500">
          Khảo sát trực tuyến nhanh chóng, minh bạch và bảo mật,
          giúp nhà trường lắng nghe ý kiến của phụ huynh và học sinh
          mọi lúc, mọi nơi.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

  <Link
    href="/survey"
    className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-blue-700"
  >
    📝 Bắt đầu khảo sát
  </Link>
<Link href="/qr">
  <button
    className="rounded-xl border-2 border-blue-600 px-8 py-4 text-lg font-semibold text-blue-600 transition hover:bg-blue-50"
  >
    📷 Quét mã QR
  </button>
</Link>
</div>

      </div>
    </section>
  );
}