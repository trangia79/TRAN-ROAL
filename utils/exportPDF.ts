'use client';

import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

/**
 * Hàm chụp vùng giao diện theo ID và xuất ra file PDF
 * @param elementId ID của phần tử HTML cần chụp (VD: "dashboard-content")
 * @param fileName Tên file PDF xuất ra
 */
export const exportDashboardToPDF = async (
  elementId: string,
  fileName = "BaoCao_SIPAS.pdf"
) => {
  const element = document.getElementById(elementId);

  if (!element) {
    alert("Không tìm thấy dữ liệu để xuất PDF!");
    return;
  }

  try {
    // 1. Chụp vùng HTML thành hình ảnh Canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Tăng chất lượng ảnh lên gấp 2 lần cho sắc nét
      useCORS: true, // Hỗ trợ tải ảnh/icon từ bên ngoài
      logging: false,
      backgroundColor: "#f8fafc", // Màu nền chuẩn (slate-100)
    });

    const imgData = canvas.toDataURL("image/png");

    // 2. Khởi tạo file PDF kích thước A4 (mm)
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // 3. Thêm ảnh vào trang thứ 1
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // 4. Nếu nội dung dài quá 1 trang A4 -> tự động tạo trang mới
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    // 5. Tải file về máy người dùng
    pdf.save(fileName);
  } catch (error) {
    console.error("Lỗi khi xuất PDF:", error);
    alert("Có lỗi xảy ra khi tạo file PDF!");
  }
};