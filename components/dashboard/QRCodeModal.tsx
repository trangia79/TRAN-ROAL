"use client";

import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function QRCodeModal({ isOpen, onClose }: Props) {
  const [surveyUrl, setSurveyUrl] = useState("");

  // Tự động lấy tên miền hiện tại (localhost hoặc domain thật sau khi deploy)
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Giả sử trang làm khảo sát của bạn nằm ở đường dẫn /survey
      // Nếu trang khảo sát nằm ở trang chủ "/", bạn sửa lại thành window.location.origin
      setSurveyUrl(`${window.location.origin}/survey`);
    }
  }, []);

  if (!isOpen) return null;

  const handleDownload = () => {
    const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "QR_KhaoSat_EduSIPAS.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl">
        <h2 className="mb-2 text-2xl font-bold text-slate-800">Mã QR Khảo Sát</h2>
        <p className="mb-6 text-sm text-slate-500">
          Quét mã này để truy cập nhanh vào trang đánh giá EduSIPAS
        </p>

        <div className="mx-auto flex justify-center rounded-xl border-4 border-slate-100 p-4">
          <QRCodeCanvas
            id="qr-canvas"
            value={surveyUrl}
            size={200}
            bgColor={"#ffffff"}
            fgColor={"#0f172a"}
            level={"H"}
            includeMargin={false}
          />
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-slate-200 px-4 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-300"
          >
            Đóng
          </button>
          <button
            onClick={handleDownload}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Tải Ảnh QR
          </button>
        </div>
      </div>
    </div>
  );
}