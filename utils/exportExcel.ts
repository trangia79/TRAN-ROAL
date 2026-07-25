'use client';

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Survey } from "@/types/survey"; // Đã cập nhật đường dẫn đúng theo bước refactor

export const exportSurveyToExcel = (surveys: Survey[] = []) => {
  // 1. CHỐNG LỖI: Nếu surveys là undefined hoặc rỗng thì dừng lại ngay
  if (!surveys || !Array.isArray(surveys) || surveys.length === 0) {
    alert("Dữ liệu đang được tải hoặc chưa có khảo sát nào để xuất!");
    return;
  }

  try {
    const data = surveys.map((survey, index) => ({
      STT: index + 1,
      "Mức độ hài lòng": survey.rating ?? "",
      "Ý kiến góp ý": survey.comment || "",
      "Thời gian": survey.createdAt 
        ? survey.createdAt.toDate().toLocaleString("vi-VN") 
        : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    // Chỉnh độ rộng cột cho đẹp
    worksheet["!cols"] = [
      { wch: 5 },  // STT
      { wch: 15 }, // Mức độ
      { wch: 45 }, // Ý kiến
      { wch: 20 }, // Thời gian
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Khảo sát");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, `BaoCao_SIPAS_${new Date().getFullYear()}.xlsx`);

  } catch (error) {
    console.error("Lỗi xuất Excel:", error);
    alert("Có lỗi xảy ra khi tạo file Excel!");
  }
};