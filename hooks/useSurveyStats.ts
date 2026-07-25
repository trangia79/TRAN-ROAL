"use client";

import { useMemo } from "react";
import { Survey } from "@/services/surveyService";

export function useSurveyStats(surveys: Survey[]) {
  return useMemo(() => {
    const total = surveys.length;

    const ratRatHaiLong = surveys.filter(
      (s) => s.rating === "Rất rất hài lòng"
    ).length;

    const ratHaiLong = surveys.filter(
      (s) => s.rating === "Rất hài lòng"
    ).length;

    const haiLong = surveys.filter(
      (s) => s.rating === "Hài lòng"
    ).length;

    const binhThuong = surveys.filter(
      (s) => s.rating === "Bình thường"
    ).length;

    const chuaHaiLong = surveys.filter(
      (s) => s.rating === "Chưa hài lòng"
    ).length;

    const khongHaiLong = surveys.filter(
      (s) => s.rating === "Không hài lòng"
    ).length;

    const pieData = [
      {
        name: "😍 Rất rất hài lòng",
        value: ratRatHaiLong,
      },
      {
        name: "😀 Rất hài lòng",
        value: ratHaiLong,
      },
      {
        name: "🙂 Hài lòng",
        value: haiLong,
      },
      {
        name: "😐 Bình thường",
        value: binhThuong,
      },
      {
        name: "☹️ Chưa hài lòng",
        value: chuaHaiLong,
      },
      {
        name: "😠 Không hài lòng",
        value: khongHaiLong,
      },
    ];
const sipas =
  total === 0
    ? 0
    : Number(
        (
          ((ratRatHaiLong + ratHaiLong + haiLong) / total) *
          100
        ).toFixed(1)
      );
    return {
      total,
      sipas,
      ratRatHaiLong,
      ratHaiLong,
      haiLong,
      binhThuong,
      chuaHaiLong,
      khongHaiLong,
      pieData,
    };
  }, [surveys]);
}