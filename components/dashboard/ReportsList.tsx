"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { 
  collection, query, orderBy, onSnapshot, Timestamp, 
  deleteDoc, doc, getDocs // 👈 Import thêm các hàm để xóa dữ liệu
} from "firebase/firestore";

interface Report {
  id: string;
  name: string;
  contact: string;
  issueType: string;
  description: string;
  createdAt?: Timestamp;
}

export default function ReportsList() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeletingAll, setIsDeletingAll] = useState(false);

  useEffect(() => {
    // 📡 Lắng nghe dữ liệu phản hồi mới nhất
    const q = query(collection(db, "reports"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      })) as Report[];

      setReports(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🗑️ Hàm xử lý: Xóa từng báo lỗi (Đánh dấu đã xong)
  const handleDelete = async (id: string) => {
    const ok = confirm("Bạn đã xử lý xong và muốn xóa báo lỗi này khỏi danh sách?");
    if (!ok) return;

    try {
      await deleteDoc(doc(db, "reports", id));
    } catch (error) {
      console.error("Lỗi khi xóa báo lỗi:", error);
      alert("❌ Có lỗi khi xóa. Vui lòng thử lại!");
    }
  };

  // 🔄 Hàm xử lý: Reset (Xóa) tất cả báo lỗi
  const handleClearAll = async () => {
    const ok = confirm("⚠️ Bạn có chắc chắn muốn xóa TOÀN BỘ danh sách báo lỗi đã nhận không?");
    if (!ok) return;

    setIsDeletingAll(true);
    try {
      const querySnapshot = await getDocs(collection(db, "reports"));
      const deletePromises = querySnapshot.docs.map((docItem) =>
        deleteDoc(doc(db, "reports", docItem.id))
      );
      await Promise.all(deletePromises);
      alert("✅ Đã dọn sạch danh sách báo lỗi!");
    } catch (error) {
      console.error("Lỗi khi reset báo lỗi:", error);
      alert("❌ Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setIsDeletingAll(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center text-slate-500 text-sm">
        ⏳ Đang tải danh sách báo lỗi...
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            🛠️ Phản Hồi & Báo Lỗi Từ Người Dùng
          </h2>
          <span className="text-xs font-semibold bg-red-100 text-red-600 px-2.5 py-1 rounded-full">
            {reports.length} phản hồi
          </span>
        </div>

        {/* NÚT RESET TẤT CẢ */}
        {reports.length > 0 && (
          <button
            onClick={handleClearAll}
            disabled={isDeletingAll}
            className="text-xs font-medium px-3 py-1.5 bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-700 rounded-lg transition-all flex items-center gap-1 border border-slate-200 hover:border-red-200 disabled:opacity-50"
          >
            {isDeletingAll ? "⏳ Đang dọn dẹp..." : "🗑️ Xóa tất cả"}
          </button>
        )}
      </div>

      {reports.length === 0 ? (
        <p className="text-emerald-600 font-medium text-sm text-center py-8 bg-emerald-50 rounded-xl border border-emerald-100">
          🎉 Tuyệt vời! Hiện không có báo lỗi nào cần xử lý.
        </p>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
          {reports.map((item) => (
            <div
              key={item.id}
              className="relative group p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pr-8">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800 text-sm">
                    👤 {item.name}
                  </span>
                  <span className="text-xs text-slate-400">
                    ({item.contact})
                  </span>
                </div>

                <span className="text-xs font-medium px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg">
                  {item.issueType}
                </span>
              </div>

              <p className="text-sm text-slate-700 bg-white p-3 rounded-lg border border-slate-100 leading-relaxed">
                {item.description}
              </p>

              {item.createdAt && (
                <p className="text-[11px] text-slate-400 text-right">
                  🕒 {item.createdAt.toDate().toLocaleString("vi-VN")}
                </p>
              )}

              {/* NÚT XÓA TỪNG CÁI (HIỆN KHI RÊ CHUỘT) */}
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-3 right-3 p-1.5 bg-white border border-slate-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300 rounded-md text-slate-400 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 shadow-sm"
                title="Đánh dấu đã xử lý (Xóa)"
              >
                ✓
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}