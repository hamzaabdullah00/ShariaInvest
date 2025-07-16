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
      <Card className="mx-4 mt-4 shadow-sm border border-gray-100">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
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
    <Card className="mx-4 mt-4 shadow-sm border border-gray-100">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle>NAV Performance</CardTitle>
        <Select defaultValue="1M">
          <SelectTrigger className="w-16 text-sm">
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
      <CardContent>
        <div className="chart-container mb-4">
          <svg className="w-full h-full" viewBox="0 0 300 120">
            <polyline 
              points="20,100 50,85 80,90 110,70 140,75 170,60 200,65 230,45 260,50 290,35" 
              stroke="#059669" 
              strokeWidth="2" 
              fill="none"
            />
            <circle cx="290" cy="35" r="3" fill="#059669"/>
          </svg>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xs text-gray-500">Current NAV</p>
            <p className="font-semibold text-olive">
              ₹{currentNav?.navValue || "12.45"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Change</p>
            <p className={`font-semibold ${changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">52W High</p>
            <p className="font-semibold text-green-600">₹13.20</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
