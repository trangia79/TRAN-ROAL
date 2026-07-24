export default function Home() {
  return (
    <main className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold text-blue-700">
        THCS&THPT MONG THỌ
      </h1>

      <p className="mt-4 text-xl text-gray-700 text-center">
        Hệ thống đánh giá sự hài lòng
        <br />
        Phụ huynh và Học sinh
      </p>

      <button className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-xl shadow-lg transition">
        Bắt đầu khảo sát
      </button>
    </main>
  );
}