type UptimeStatus = "good" | "bad" | "unknown";

export function UptimeTicks({ ticks }: { ticks: UptimeStatus[] }) {
    return (
      <div className="flex gap-1 mt-2">
        {ticks.map((tick, index) => (
          <div
            key={index}
            className={`w-8 h-2 rounded ${
              tick === "good"
                ? "bg-green-500"
                : tick === "bad"
                  ? "bg-red-500"
                  : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    );
  }