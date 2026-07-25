"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logout } from "@/services/authService";
import { exportSurveyToExcel } from "@/utils/exportExcel";
import { exportDashboardToPDF } from "@/utils/exportPDF";
import { Survey } from "@/types/survey";
import QRCodeModal from "./QRCodeModal";
import { resetAllSurveys } from "@/services/surveyService"; // 👈 Import hàm reset

type Props = {
  surveys: Survey[];
  schoolName?: string;
};

export default function DashboardHeader({
  surveys,
  schoolName = "Trường THCS&THPT Mong Thọ",
}: Props) {
  const router = useRouter();
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Xử lý đăng xuất
  const handleLogout = async () => {
    const ok = confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (!ok) return;

    try {
      await logout();
      router.replace("/login");
    } catch (error) {
      console.error(error);
      alert("Không thể đăng xuất.");
    }
  };

  // 🗑️ Xử lý Reset toàn bộ dữ liệu
  const handleResetData = async () => {
    const firstConfirm = confirm(
      "⚠️ CẢNH BÁO NGUY HIỂM:\n\nBạn có chắc chắn muốn XÓA TOÀN BỘ dữ liệu khảo sát hiện tại không?\n\nDữ liệu sau khi xóa sẽ KHÔNG THỂ KHÔI PHỤC!"
    );

    if (!firstConfirm) return;

    const secondConfirm = confirm(
      "❗ Xác nhận lần cuối: Bạn đã xuất file Excel/PDF lưu trữ chưa?\n\nBấm OK để tiến hành dọn sạch dữ liệu về 0."
    );

    if (!secondConfirm) return;

    try {
      setIsResetting(true);
      await resetAllSurveys();
      alert("✅ Đã reset toàn bộ dữ liệu khảo sát thành công!");
      
      // Tải lại trang để cập nhật các chỉ số về 0
      window.location.reload();
    } catch (error) {
      alert("❌ Có lỗi xảy ra khi xóa dữ liệu. Vui lòng thử lại!");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700">
            {schoolName}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Hệ thống khảo sát mức độ hài lòng (EduSIPAS)
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 items-center">
          {/* Nút Quay lại trang chủ */}
          <Link
            href="/"
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-all flex items-center gap-1 border border-slate-200"
          >
            🏠 Trang chủ
          </Link>

          {/* Nút Mã QR */}
          <button
            type="button"
            onClick={() => setIsQRModalOpen(true)}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all"
          >
            📱 Mã QR
          </button>

          {/* Nút Xuất Excel */}
          <button
            type="button"
            onClick={() => exportSurveyToExcel(surveys)}
            className="px-3.5 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-all"
          >
            📥 Xuất Excel
          </button>

          {/* Nút Xuất PDF */}
          <button
            type="button"
            onClick={() =>
              exportDashboardToPDF(
                "dashboard-content",
                `BaoCao_SIPAS_${new Date().getFullYear()}.pdf`
              )
            }
            className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-all"
          >
            📄 Xuất PDF
          </button>

          {/* 👇 NÚT RESET DỮ LIỆU MỚI THÊM */}
          <button
            type="button"
            onClick={handleResetData}
            disabled={isResetting}
            className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-300 text-white text-sm font-medium rounded-lg transition-all flex items-center gap-1 shadow-sm"
          >
            {isResetting ? "⏳ Đang xóa..." : "🔄 Reset dữ liệu"}
          </button>

          {/* Nút Đăng xuất */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-all"
          >
            Đăng xuất
          </button>
        </div>
      </div>

      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />
    </>
  );
}