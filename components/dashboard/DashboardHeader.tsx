"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/services/authService";
import { exportSurveyToExcel } from "@/utils/exportExcel";
import { exportDashboardToPDF } from "@/utils/exportPDF";
import { Survey } from "@/types/survey";
import QRCodeModal from "./QRCodeModal";

type Props = {
  surveys: Survey[];
  schoolName?: string; // 👈 Thêm prop tên trường (không bắt buộc)
};

export default function DashboardHeader({
  surveys,
  schoolName = "Trường THCS&THPT Mong Thọ", // 👈 Tên trường mặc định ở đây
}: Props) {
  const router = useRouter();
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

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

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          {/* 👇 Hiển thị tên trường động ở đây */}
          <h1 className="text-4xl font-bold text-blue-700">
            {schoolName}
          </h1>
          <p className="text-slate-500">
            Hệ thống khảo sát mức độ hài lòng (EduSIPAS)
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setIsQRModalOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all"
          >
            📱 Mã QR
          </button>

          <button
            type="button"
            onClick={() => exportSurveyToExcel(surveys)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all"
          >
            📥 Xuất Excel
          </button>

          <button
            type="button"
            onClick={() =>
              exportDashboardToPDF(
                "dashboard-content",
                `BaoCao_SIPAS_${new Date().getFullYear()}.pdf`
              )
            }
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all"
          >
            📄 Xuất PDF
          </button>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-slate-700 px-5 py-2 text-white hover:bg-slate-800 transition-all"
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