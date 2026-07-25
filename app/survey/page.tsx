"use client";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
export default function SurveyPage() {
    const [selected, setSelected] = useState("");
    const [comment, setComment] = useState("");
    const options = [
    {
     emoji: "😍",
    text: "Rất rất hài lòng",
    hover: "hover:bg-green-50",
},
  {
    emoji: "😀",
    text: "Rất hài lòng",
    hover: "hover:bg-green-50",
  },
  {
    emoji: "🙂",
    text: "Hài lòng",
    hover: "hover:bg-green-50",
  },
  {
    emoji: "😐",
    text: "Bình thường",
    hover: "hover:bg-yellow-50",
  },
  {
    emoji: "☹️",
    text: "Chưa hài lòng",
    hover: "hover:bg-orange-50",
  },
  {
    emoji: "😠",
    text: "Không hài lòng",
    hover: "hover:bg-red-50",
  },
];
const saveSurvey = async () => {
  if (!selected) return;

  try {
    await addDoc(collection(db, "surveys"), {
      rating: selected,
      comment: comment,
      createdAt: serverTimestamp(),
    });

    alert("🎉 Cảm ơn bạn đã gửi đánh giá!");

    // Reset form
    setSelected("");
    setComment("");
  } catch (error) {
    console.error("Lỗi:", error);
    alert("❌ Không thể gửi đánh giá.");
  }
};
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-xl">

        <h1 className="text-center text-3xl font-bold text-blue-700">
          📋 Khảo sát sự hài lòng
        </h1>

        <p className="mt-3 text-center text-gray-600">
          THCS & THPT Mong Thọ
        </p>

        <h2 className="mt-10 text-xl font-semibold">
          Bạn hài lòng với chất lượng phục vụ?
        </h2>

        <div className="mt-6 space-y-3">

          {options.map((option) => (
  <button
    key={option.text}
    onClick={() => setSelected(option.text)}
    className={`w-full rounded-xl border p-4 text-left transition
      ${
        selected === option.text
          ? "bg-blue-600 text-white border-blue-600"
          : option.hover
      }`}
  >
    {option.emoji} {option.text}
  </button>
))}

        </div>
<div className="mt-8">

  <label className="mb-2 block text-lg font-semibold">
    Ý kiến góp ý (không bắt buộc)
  </label>

  <textarea
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    maxLength={300}
    rows={5}
    className="w-full rounded-xl border p-4 outline-none focus:border-blue-500"
    placeholder="Nhập ý kiến của bạn..."
  />

  <p className="mt-2 text-right text-sm text-gray-500">
    {comment.length}/300 ký tự
  </p>

</div>
       <button
  onClick={saveSurvey}
  disabled={!selected}
  className={`mt-8 w-full rounded-xl py-4 text-white transition
    ${
      selected
        ? "bg-blue-600 hover:bg-blue-700"
        : "cursor-not-allowed bg-gray-400"
    }`}
>
  Gửi đánh giá
</button>

      </div>
    </main>
  );
}