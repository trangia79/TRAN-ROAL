"use client";

import { useEffect, useState, useMemo } from "react";
import { listenSurveys, Survey } from "@/services/surveyService";
import StatCard from "@/components/dashboard/StatCard";
import SurveyPieChart from "@/components/dashboard/SurveyPieChart";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SurveyBarChart from "@/components/dashboard/SurveyBarChart";
import RecentSurvey from "@/components/dashboard/RecentSurvey";
import ReportsList from "@/components/dashboard/ReportsList"; // 👈 1. Đã thêm import ReportsList
import { useSurveyStats } from "@/hooks/useSurveyStats";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [timeFilter, setTimeFilter] = useState("all");
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = listenSurveys((data) => {
      setSurveys(data);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  const filteredSurveys = useMemo(() => {
    const now = new Date();
    
    return surveys.filter((survey) => {
      if (timeFilter === "all") return true;
      if (!survey.createdAt) return false;

      const surveyDate = survey.createdAt.toDate(); 
      const diffTime = Math.abs(now.getTime() - surveyDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (timeFilter === "today") {
        return (
          surveyDate.getDate() === now.getDate() &&
          surveyDate.getMonth() === now.getMonth() &&
          surveyDate.getFullYear() === now.getFullYear()
        );
      }
      if (timeFilter === "7days") return diffDays <= 7;
      if (timeFilter === "30days") return diffDays <= 30;
      
      return true;
    });
  }, [surveys, timeFilter]);

  const {
    total,
    sipas,
    ratRatHaiLong,
    ratHaiLong,
    haiLong,
    binhThuong,
    chuaHaiLong,
    khongHaiLong,
    pieData,
  } = useSurveyStats(filteredSurveys);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Đang kiểm tra đăng nhập...</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main id="dashboard-content" className="min-h-screen bg-slate-100 p-8">
      {/* HEADER TRANG DASHBOARD */}
      <DashboardHeader 
        surveys={filteredSurveys} 
        schoolName="Trường THCS&THPT Mong Thọ" 
      />

      {/* ĐÂY LÀ ĐOẠN HIỂN THỊ BỘ LỌC THỜI GIAN */}
      <div className="mb-6 flex items-center justify-end gap-2">
        <span className="font-medium text-slate-600">Lọc thời gian:</span>
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          <option value="all">Tất cả thời gian</option>
          <option value="today">Hôm nay</option>
          <option value="7days">7 ngày qua</option>
          <option value="30days">30 ngày qua</option>
        </select>
      </div>

      {/* CÁC THẺ CHỈ SỐ KPI */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard title="Tổng khảo sát" value={total} color="text-blue-700" icon="📋" />
        <StatCard title="Chỉ số SIPAS" value={`${sipas}%`} color="text-emerald-700" icon="🏆" />
        <StatCard title="😍 Rất rất hài lòng" value={ratRatHaiLong} color="text-green-700" icon="😍" />
        <StatCard title="😀 Rất hài lòng" value={ratHaiLong} color="text-green-600" icon="😀" />
        <StatCard title="🙂 Hài lòng" value={haiLong} color="text-lime-600" icon="🙂" />
        <StatCard title="😐 Bình thường" value={binhThuong} color="text-yellow-600" icon="😐" />
        <StatCard title="☹️ Chưa hài lòng" value={chuaHaiLong} color="text-orange-600" icon="☹️" />
        <StatCard title="😠 Không hài lòng" value={khongHaiLong} color="text-red-600" icon="😠" />
      </div>

      {/* BIỂU ĐỒ THỐNG KÊ */}
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <SurveyPieChart data={pieData} />
        <SurveyBarChart data={pieData} />
      </div>
      
      {/* DANH SÁCH KHẢO SÁT GẦN ĐÂY */}
      <div className="mt-10">
        <RecentSurvey surveys={filteredSurveys} />
      </div>

      {/* 👇 2. ĐÃ CHÈN DANH SÁCH BÁO LỖI & PHẢN HỒI Ở ĐÂY */}
      <div className="mt-10">
        <ReportsList />
      </div>
    </main>
  );
}