"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, Timestamp } from "firebase/firestore";

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

  useEffect(() => {
    // 📡 Lắng nghe dữ liệu phản hồi mới nhất từ collection "reports" trên Firebase
    const q = query(collection(db, "reports"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Report[];

      setReports(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center text-slate-500 text-sm">
        ⏳ Đang tải danh sách báo lỗi...
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          🛠️ Phản Hồi & Báo Lỗi Từ Người Dùng
        </h2>
        <span className="text-xs font-semibold bg-red-100 text-red-600 px-2.5 py-1 rounded-full">
          {reports.length} phản hồi
        </span>
      </div>

      {reports.length === 0 ? (
        <p className="text-slate-400 text-sm text-center py-6">
          Chưa có báo lỗi hoặc phản hồi nào từ người dùng.
        </p>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
          {reports.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}