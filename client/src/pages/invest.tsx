import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NavChart from "@/components/nav-chart";
import type { Transaction } from "@shared/schema";

export default function Invest() {
  const [hoveredSegment, setHoveredSegment] = useState<{name: string, percentage: string} | null>(null);
  
  const { data: transactions = [] } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
  });

  // Calculate portfolio values
  const investmentTransactions = transactions.filter(t => t.type === 'investment');
  const totalInvestment = investmentTransactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);
  const currentValue = totalInvestment * 1.074; // 7.4% gain
  const gainAmount = currentValue - totalInvestment;
  const gainPercent = totalInvestment > 0 ? (gainAmount / totalInvestment) * 100 : 0;

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="pt-4 pb-4 px-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-black">My Investments</h1>
        <p className="text-sm text-gray-600">Track your Shariah-compliant investment portfolio</p>
      </div>

      <div className="screen-content pb-24">
        {/* Portfolio Overview - Reuse Investment Summary card design */}
        <div className="bg-black mx-4 mt-6 rounded-lg p-8 text-white border border-black" style={{ height: '180px' }}>
          <h3 className="text-lg font-semibold mb-4 text-white">Investment Summary</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-white opacity-80 text-sm">Total Investment</p>
              <p className="text-2xl font-bold text-white">₹{totalInvestment.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-white opacity-80 text-sm">Current Value</p>
              <p className="text-2xl font-bold text-white">₹{Math.round(currentValue).toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 pb-2">
            <i className="fas fa-arrow-up" style={{ color: 'var(--gain-green)' }}></i>
            <span className="font-medium ml-[2px] mr-[2px] pl-[0px] pr-[0px] mt-[-11px] mb-[-11px] pt-[-5px] pb-[-5px] text-[14px]" style={{ color: 'var(--gain-green)' }}>
              +{gainPercent.toFixed(2)}% (₹{Math.round(gainAmount).toLocaleString()})
            </span>
            <span className="text-white opacity-80 text-sm">This month</span>
          </div>
        </div>

        {/* Asset Allocation - Reuse doughnut chart from dashboard */}
        <Card className="mx-4 mt-6 mb-6 border border-black rounded-lg" style={{ height: '200px' }}>
          <CardHeader className="pb-3 pt-6">
            <CardTitle className="section-header text-black">Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-20 h-20 flex items-center justify-center relative">
                <svg className="w-20 h-20" viewBox="0 0 42 42">
                  {/* Doughnut chart segments with thickened lines */}
                  <circle 
                    cx="21" cy="21" r="15.9" 
                    fill="transparent" 
                    stroke="#333" 
                    strokeWidth="5" 
                    strokeDasharray="35 65" 
                    strokeDashoffset="25" 
                    transform="rotate(-90 21 21)"
                    className="hover:stroke-black cursor-pointer transition-colors duration-200"
                    onMouseEnter={() => setHoveredSegment({ name: 'Real Estate', percentage: '35%' })}
                    onMouseLeave={() => setHoveredSegment(null)}
                  />
                  <circle 
                    cx="21" cy="21" r="15.9" 
                    fill="transparent" 
                    stroke="#666" 
                    strokeWidth="5" 
                    strokeDasharray="25 75" 
                    strokeDashoffset="40" 
                    transform="rotate(-90 21 21)"
                    className="hover:stroke-black cursor-pointer transition-colors duration-200"
                    onMouseEnter={() => setHoveredSegment({ name: 'SMEs', percentage: '25%' })}
                    onMouseLeave={() => setHoveredSegment(null)}
                  />
                  <circle 
                    cx="21" cy="21" r="15.9" 
                    fill="transparent" 
                    stroke="#999" 
                    strokeWidth="5" 
                    strokeDasharray="20 80" 
                    strokeDashoffset="65" 
                    transform="rotate(-90 21 21)"
                    className="hover:stroke-black cursor-pointer transition-colors duration-200"
                    onMouseEnter={() => setHoveredSegment({ name: 'Venture Capital', percentage: '20%' })}
                    onMouseLeave={() => setHoveredSegment(null)}
                  />
                  <circle 
                    cx="21" cy="21" r="15.9" 
                    fill="transparent" 
                    stroke="#ccc" 
                    strokeWidth="5" 
                    strokeDasharray="20 80" 
                    strokeDashoffset="85" 
                    transform="rotate(-90 21 21)"
                    className="hover:stroke-black cursor-pointer transition-colors duration-200"
                    onMouseEnter={() => setHoveredSegment({ name: 'Innovation', percentage: '20%' })}
                    onMouseLeave={() => setHoveredSegment(null)}
                  />
                </svg>
                
                {/* Improved tooltip with edge detection */}
                {hoveredSegment && (
                  <div 
                    className="absolute z-10 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap pointer-events-none shadow-lg"
                    style={{
                      left: '50%',
                      top: '-35px',
                      transform: 'translateX(-50%)'
                    }}
                  >
                    {hoveredSegment.name}: {hoveredSegment.percentage}
                  </div>
                )}
              </div>
              <div className="flex-1 ml-6 space-y-1">
                {/* Grey-colored legends */}
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-800 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Real Estate</span>
                  <span className="ml-auto text-sm text-gray-800">35%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-600 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">SMEs</span>
                  <span className="ml-auto text-sm text-gray-800">25%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Venture Capital</span>
                  <span className="ml-auto text-sm text-gray-800">20%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Innovation</span>
                  <span className="ml-auto text-sm text-gray-800">20%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* NAV Performance Chart */}
        <NavChart />

        {/* Recent Transactions - Well-padded card */}
        <Card className="mx-4 mt-6 mb-6 border border-black rounded-lg" style={{ minHeight: '240px' }}>
          <CardHeader className="pb-4 pt-6">
            <CardTitle className="section-header text-black">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-6" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            <div className="space-y-3">
              {investmentTransactions.slice(-5).reverse().map((transaction, index) => (
                <div key={transaction.id || index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                      <i className="fas fa-arrow-up text-white text-xs"></i>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-black">{transaction.description}</p>
                      <p className="text-xs text-gray-600">Investment • Today</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-black">₹{parseFloat(transaction.amount).toLocaleString('en-IN')}</p>
                    <p className="text-xs" style={{ color: '#18A558' }}>+2.48%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fund Summary with stat blocks */}
        <Card className="mx-4 mt-6 mb-6 border border-black rounded-lg" style={{ minHeight: '180px' }}>
          <CardHeader className="pb-4 pt-6">
            <CardTitle className="section-header text-black">Fund Summary</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-8">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Current NAV</p>
                <p className="text-xl font-bold text-black">₹2,458.36</p>
                <p className="text-xs" style={{ color: '#18A558' }}>+7.40%</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Day Change</p>
                <p className="text-xl font-bold text-black">+₹18.24</p>
                <p className="text-xs" style={{ color: '#18A558' }}>+0.74%</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">52W High</p>
                <p className="text-xl font-bold text-black">₹2,845.22</p>
                <p className="text-xs text-gray-600">15 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
