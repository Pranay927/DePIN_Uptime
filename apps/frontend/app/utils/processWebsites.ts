import { Website } from "@/types/website";
type UptimeStatus = "good" | "bad" | "unknown";
/* {
    id:1,
    url:".com",
    ticks:[
        {id:1, createdAt: "11:00",status: "good", latency: "21ms"},
        {id:2, createdAt: "11:03",status: "good", latency: "101ms"},
    ,]
} */

export function processWebsites(websites: Website[]) {
  // iterating over each website in the websites array...
  return websites.map((website) => {
    const sortedTicks = [...website.ticks].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

    //  if the tick was valiadted for more than 30min- ago then filter it
    const recentTicks = sortedTicks.filter(
      (tick) => new Date(tick.createdAt) > thirtyMinutesAgo
    );

    const windows: UptimeStatus[] = [];

    for (let i = 0; i < 10; i++) {
      const windowStart = new Date(Date.now() - (i + 1) * 3 * 60 * 1000);
      const windowEnd = new Date(Date.now() - i * 3 * 60 * 1000);

      const windowTicks = recentTicks.filter((tick) => {
        const tickTime = new Date(tick.createdAt);
        return tickTime >= windowStart && tickTime < windowEnd;
      });

      const upTicks = windowTicks.filter(
        (tick) => tick.status === "Good"
      ).length;

      windows[9 - i] =
        windowTicks.length === 0
          ? "unknown"
          : upTicks / windowTicks.length >= 0.5
            ? "good"
            : "bad";
    }

    const totalTicks = sortedTicks.length;

    const upTicks = sortedTicks.filter((tick) => tick.status === "Good").length;

    const uptimePercentage =
      totalTicks === 0 ? 100 : (upTicks / totalTicks) * 100;

    const currentStatus = windows[windows.length - 1];
    const lastChecked = sortedTicks[0]
      ? new Date(sortedTicks[0].createdAt).toLocaleTimeString()
      : "Never";

    return {
      id: website.id,
      url: website.url,
      status: currentStatus,
      uptimePercentage,
      lastChecked,
      uptimeTicks: windows,
    };
  });
}
