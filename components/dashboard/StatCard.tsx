type StatCardProps = {
  title: string;
  value: number;
  color: string;
  icon: string;
};

export default function StatCard({
  title,
  value,
  color,
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl">

      <div className="flex items-center justify-between">

        <h2 className="text-gray-500 font-medium">
          {title}
        </h2>

        <span className="text-3xl">
          {icon}
        </span>

      </div>

      <p className={`mt-5 text-5xl font-bold ${color}`}>
        {value}
      </p>

    </div>
  );
}