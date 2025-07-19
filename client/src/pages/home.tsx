import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/lib/language-context";
import type { Investment, PrayerTimes } from "@shared/schema";

export default function Home() {
  const { translations } = useLanguage();
  
  const { data: investments = [] } = useQuery<Investment[]>({
    queryKey: ["/api/investments"],
  });

  // Get prayer times for next prayer display
  const { data: prayerTimes } = useQuery<PrayerTimes>({
    queryKey: ["/api/prayer-times/Mumbai"],
  });

  // Function to get next prayer
  const getNextPrayer = () => {
    if (!prayerTimes) return "Asr – 3:45 PM";
    
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const prayers = [
      { name: "Fajr", time: prayerTimes.fajr },
      { name: "Dhuhr", time: prayerTimes.dhuhr },
      { name: "Asr", time: prayerTimes.asr },
      { name: "Maghrib", time: prayerTimes.maghrib },
      { name: "Isha", time: prayerTimes.isha }
    ];
    
    for (const prayer of prayers) {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      const prayerTime = hours * 60 + minutes;
      if (prayerTime > currentTime) {
        return `${prayer.name} – ${prayer.time}`;
      }
    }
    
    // If no prayer left today, return Fajr for tomorrow
    return `Fajr – ${prayerTimes.fajr} (Tomorrow)`;
  };

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
          <Card className="text-white rounded-lg hover:opacity-90 transition-colors cursor-pointer border-0" style={{ height: '160px', backgroundColor: '#1C1C1C' }}>
            <CardHeader className="pb-2 pt-6 px-6">
              <CardTitle className="flex items-center text-lg">
                <i className="fas fa-chart-line mr-3 text-xl" style={{ color: '#B2D2A4' }}></i>
                <span style={{ color: '#B2D2A4' }}>My Investments</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-4 px-6">
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="text-center">
                  <p className="text-xs text-gray-300 leading-tight">Current Value</p>
                  <p className="text-sm font-bold text-white whitespace-nowrap">
                    ₹{currentValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-300 leading-tight whitespace-nowrap">Total Investment</p>
                  <p className="text-sm font-bold text-white whitespace-nowrap">
                    ₹{totalInvestment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-300 leading-tight">CAGR</p>
                  <p className="text-sm font-bold whitespace-nowrap" style={{ color: cagr >= 0 ? '#B2D2A4' : '#ff6b6b' }}>
                    {cagr >= 0 ? '+' : ''}{cagr.toFixed(1)}%
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-300 text-center mt-2">
                Explore halal investment options
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* My Mosque Card */}
        <Link href="/mosque" className="block">
          <Card className="bg-black text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer border-0" style={{ height: '160px' }}>
            <CardHeader className="pb-2 pt-6">
              <CardTitle className="flex items-center text-lg">
                <i className="fas fa-mosque mr-3 text-xl" style={{ color: '#B2D2A4' }}></i>
                <span style={{ color: '#B2D2A4' }}>My Mosque</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-6">
              <div className="mb-4">
                <p className="text-sm text-gray-300 mb-1">Next Prayer</p>
                <p className="text-lg font-semibold text-white">{getNextPrayer()}</p>
              </div>
              <p className="text-xs text-gray-300">
                Prayer times, live Azaan, and community updates
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* My Communities Card */}
        <Link href="/community" className="block">
          <Card className="bg-black text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer border-0" style={{ height: '160px' }}>
            <CardHeader className="pb-2 pt-6">
              <CardTitle className="flex items-center text-lg">
                <i className="fas fa-comments mr-3 text-xl" style={{ color: '#B2D2A4' }}></i>
                <span style={{ color: '#B2D2A4' }}>My Communities</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-6">
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  {/* Overlapping circular icons for communities */}
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-xs font-bold text-black border-2 border-black">
                      FQ
                    </div>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-xs font-bold text-black border-2 border-black">
                      UM
                    </div>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-xs font-bold text-black border-2 border-black">
                      II
                    </div>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-xs font-bold text-black border-2 border-black">
                      YM
                    </div>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-xs font-bold text-black border-2 border-black">
                      +2
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-300">
                Active in 6 communities with 47 forum posts
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* My Causes Card */}
        <Link href="/causes" className="block">
          <Card className="bg-black text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer border-0" style={{ height: '160px' }}>
            <CardHeader className="pb-2 pt-6">
              <CardTitle className="flex items-center text-lg">
                <i className="fas fa-hand-holding-heart mr-3 text-xl" style={{ color: '#B2D2A4' }}></i>
                <span style={{ color: '#B2D2A4' }}>My Causes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-6">
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  {/* Overlapping circular icons for causes */}
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-xs font-bold text-black border-2 border-black">
                      CE
                    </div>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-xs font-bold text-black border-2 border-black">
                      CR
                    </div>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-xs font-bold text-black border-2 border-black">
                      WS
                    </div>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-xs font-bold text-black border-2 border-black">
                      +3
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-300">
                Supporting 6 causes with ₹12,500 total contributions
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}