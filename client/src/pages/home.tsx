import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/lib/language-context";
import type { Investment } from "@shared/schema";

export default function Home() {
  const { translations } = useLanguage();
  
  const { data: investments = [] } = useQuery<Investment[]>({
    queryKey: ["/api/investments"],
  });

  // Calculate portfolio metrics
  const totalInvestment = investments.reduce((sum, inv) => sum + Number(inv.amount), 0);
  const currentValue = investments.reduce((sum, inv) => {
    // Mock current value calculation with 8.5% annual growth
    const monthsHeld = Math.floor((Date.now() - new Date(inv.createdAt!).getTime()) / (1000 * 60 * 60 * 24 * 30));
    const monthlyReturn = 0.085 / 12; // 8.5% annual return divided by 12 months
    return sum + (Number(inv.amount) * Math.pow(1 + monthlyReturn, monthsHeld));
  }, 0);
  
  const totalReturn = currentValue - totalInvestment;
  const cagr = totalInvestment > 0 ? ((totalReturn / totalInvestment) * 100) : 0;

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="pt-4 pb-6 px-4">
        <h1 className="text-2xl font-bold text-black mb-1">
          {translations.assalam_alaikum || "Assalam Alaikum"}
        </h1>
        <p className="text-sm text-gray-600">
          {translations.welcome_message || "Welcome to Barakah - Your Islamic Finance Companion"}
        </p>
      </div>

      {/* Main Dashboard Cards */}
      <div className="px-4 space-y-6 pb-24">
        {/* My Investments Card */}
        <Link href="/investments" className="block">
          <Card className="bg-black text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer border-0" style={{ height: '160px' }}>
            <CardHeader className="pb-2 pt-6">
              <CardTitle className="flex items-center text-lg">
                <i className="fas fa-chart-line mr-3 text-xl" style={{ color: '#B2D2A4' }}></i>
                <span className="section-header" style={{ color: '#B2D2A4' }}>My Investments</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-6">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-xs text-gray-300">Current Value</p>
                  <p className="text-sm font-bold text-white">
                    ₹{currentValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-300">Total Investment</p>
                  <p className="text-sm font-bold text-white">
                    ₹{totalInvestment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-300">CAGR</p>
                  <p className="text-sm font-bold" style={{ color: cagr >= 0 ? '#B2D2A4' : '#ff6b6b' }}>
                    {cagr >= 0 ? '+' : ''}{cagr.toFixed(1)}%
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-300 text-center">
                Explore halal investment options
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* My Mosque Card */}
        <Link href="/mosque" className="block">
          <Card className="border border-black rounded-lg hover:bg-gray-50 transition-colors cursor-pointer" style={{ height: '120px' }}>
            <CardHeader className="pb-2 pt-6">
              <CardTitle className="flex items-center text-black text-lg">
                <i className="fas fa-mosque mr-3 text-xl"></i>
                <span className="font-semibold">My Mosque</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600">
                Prayer times, Azaan, fundraising, announcements, and dua requests
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* My Communities Card */}
        <Link href="/community" className="block">
          <Card className="border border-black rounded-lg hover:bg-gray-50 transition-colors cursor-pointer" style={{ height: '120px' }}>
            <CardHeader className="pb-2 pt-6">
              <CardTitle className="flex items-center text-black text-lg">
                <i className="fas fa-comments mr-3 text-xl"></i>
                <span className="font-semibold">My Communities</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600">
                Join discussions, share knowledge, and connect with the community
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* My Causes Card */}
        <Link href="/causes" className="block">
          <Card className="border border-black rounded-lg hover:bg-gray-50 transition-colors cursor-pointer" style={{ height: '120px' }}>
            <CardHeader className="pb-2 pt-6">
              <CardTitle className="flex items-center text-black text-lg">
                <i className="fas fa-hand-holding-heart mr-3 text-xl"></i>
                <span className="font-semibold">My Causes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600">
                Support meaningful causes and track your contributions
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}