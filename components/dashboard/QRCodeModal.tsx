"use client";

import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function QRCodeModal({ isOpen, onClose }: Props) {
  // 🔗 Đã gắn trực tiếp link ứng dụng Vercel của bạn
  const APP_URL = "https://suhailong.vercel.app/";
  const [surveyUrl, setSurveyUrl] = useState(APP_URL);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ưu tiên dùng đường link thực tế của ứng dụng
      setSurveyUrl(window.location.origin || APP_URL);
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