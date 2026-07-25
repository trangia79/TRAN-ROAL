import { Survey } from "@/services/surveyService";

type Props = {
  surveys: Survey[];
};

export default function RecentSurvey({ surveys }: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-slate-700">
        📝 10 phản hồi mới nhất
      </h2>

      <div className="space-y-4">
        {surveys.length === 0 ? (
          <p className="text-gray-500">Chưa có dữ liệu.</p>
        ) : (
          surveys.map((survey) => (
            <div
              key={survey.id}
              className="rounded-xl border p-4 hover:bg-slate-50"
            >
              <div className="font-semibold text-blue-700">
                {survey.rating}
              </div>

              <p className="mt-2 text-gray-700">
                {survey.comment || (
                  <span className="italic text-gray-400">
                    Không có góp ý
                  </span>
                )}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}