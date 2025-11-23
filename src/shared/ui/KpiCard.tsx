type Props = { label: string; value: string | number; delta?: string };

export default function KpiCard({ label, value, delta }: Props) {
  const isUp = delta?.startsWith("+");
  const isDown = delta?.startsWith("-");

  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-1 flex items-end justify-between">
        <div className="text-2xl font-semibold">{value}</div>
        {delta && (
          <span
            className={`text-xs rounded px-2 py-0.5 ${
              isUp ? "bg-green-100 text-green-700" :
              isDown ? "bg-red-100 text-red-700" :
              "bg-gray-100 text-gray-700"
            }`}
          >
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}
