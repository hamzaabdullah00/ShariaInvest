import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { NavData } from "@shared/schema";

export default function NavChart() {
  const { data: navData, isLoading } = useQuery<NavData[]>({
    queryKey: ["/api/nav-data/Barakah Equity Fund"],
  });

  if (isLoading) {
    return (
      <Card className="mx-4 mt-4 border border-black rounded-lg" style={{ height: '120px' }}>
        <CardContent className="p-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentNav = navData && navData.length > 0 ? navData[navData.length - 1] : null;
  const previousNav = navData && navData.length > 1 ? navData[navData.length - 2] : null;
  
  let changePercent = 0;
  if (currentNav && previousNav) {
    const current = parseFloat(currentNav.navValue);
    const previous = parseFloat(previousNav.navValue);
    changePercent = ((current - previous) / previous) * 100;
  }

  return (
    <Card className="mx-4 mt-4 border border-black rounded-lg" style={{ height: '120px' }}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="section-header text-black">NAV Performance</CardTitle>
        <Select defaultValue="1M">
          <SelectTrigger className="w-16 text-sm border-black">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1M">1M</SelectItem>
            <SelectItem value="3M">3M</SelectItem>
            <SelectItem value="6M">6M</SelectItem>
            <SelectItem value="1Y">1Y</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="chart-container mb-2" style={{ height: '60px' }}>
          <svg className="w-full h-full" viewBox="0 0 300 60">
            <polyline 
              points="20,50 50,42 80,45 110,35 140,37 170,30 200,32 230,22 260,25 290,17" 
              stroke="#000000" 
              strokeWidth="2" 
              fill="none"
            />
            <circle cx="290" cy="17" r="2" fill="#000000"/>
          </svg>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <p className="text-xs text-black">Current NAV</p>
            <p className="font-semibold text-black text-xs">
              ₹{currentNav?.navValue || "12.45"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-black">Change</p>
            <p className="font-semibold text-black text-xs">
              {changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-black">52W High</p>
            <p className="font-semibold text-black text-xs">₹13.20</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
