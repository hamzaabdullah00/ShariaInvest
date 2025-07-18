import { useState, useRef, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { NavData } from "@shared/schema";

export default function NavChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("1M");
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; data: NavData } | null>(null);
  const [guideLine, setGuideLine] = useState<number | null>(null);
  const chartRef = useRef<SVGSVGElement>(null);
  
  const { data: navData, isLoading } = useQuery<NavData[]>({
    queryKey: ["/api/nav-data/Barakah Equity Fund", selectedPeriod],
    queryFn: () => fetch(`/api/nav-data/Barakah Equity Fund?period=${selectedPeriod}`).then(res => res.json()),
  });

  // Mouse interaction handlers
  const handleMouseMove = useCallback((event: React.MouseEvent<SVGSVGElement>) => {
    if (!chartRef.current || !navData || navData.length === 0) return;
    
    const rect = chartRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const chartWidth = 260; // 300 - 40 for padding
    const chartHeight = 140; // Updated height
    
    // Calculate the closest data point
    const dataPointWidth = chartWidth / (navData.length - 1);
    const dataIndex = Math.round(x / dataPointWidth);
    
    if (dataIndex >= 0 && dataIndex < navData.length) {
      const dataPoint = navData[dataIndex];
      const pointX = 20 + (dataIndex * dataPointWidth);
      
      // Calculate y position based on NAV value
      const values = navData.map(d => parseFloat(d.navValue));
      const minValue = Math.min(...values);
      const maxValue = Math.max(...values);
      const valueRange = maxValue - minValue || 1;
      const navValue = parseFloat(dataPoint.navValue);
      const pointY = 20 + ((maxValue - navValue) / valueRange) * (chartHeight - 40);
      
      setHoveredPoint({ x: pointX, y: pointY, data: dataPoint });
      setGuideLine(pointX);
    }
  }, [navData]);

  const handleMouseLeave = useCallback(() => {
    setHoveredPoint(null);
    setGuideLine(null);
  }, []);

  // Format date for tooltip
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short',
      year: selectedPeriod === '1Y' ? 'numeric' : undefined
    });
  };

  if (isLoading) {
    return (
      <Card className="mx-4 mt-6 mb-6 border border-black rounded-lg" style={{ height: '300px' }}>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!navData || navData.length === 0) {
    return (
      <Card className="mx-4 mt-6 mb-6 border border-black rounded-lg" style={{ height: '300px' }}>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">No data available</div>
        </CardContent>
      </Card>
    );
  }

  // Calculate chart data
  const values = navData.map(d => parseFloat(d.navValue));
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const valueRange = maxValue - minValue || 1;
  
  const currentNav = navData[navData.length - 1];
  const previousNav = navData.length > 1 ? navData[navData.length - 2] : navData[0];
  
  let changePercent = 0;
  if (currentNav && previousNav) {
    const current = parseFloat(currentNav.navValue);
    const previous = parseFloat(previousNav.navValue);
    changePercent = ((current - previous) / previous) * 100;
  }

  // Generate chart points
  const chartWidth = 260; // 300 - 40 for padding
  const chartHeight = 140; // Increased height for better visibility
  const points = navData.map((item, index) => {
    const x = 20 + (index * chartWidth / (navData.length - 1));
    const navValue = parseFloat(item.navValue);
    const y = 20 + ((maxValue - navValue) / valueRange) * (chartHeight - 40);
    return `${x},${y}`;
  }).join(' ');

  // Calculate 52W high (mock for now)
  const high52W = Math.max(...values);

  return (
    <Card className="mx-4 mt-6 mb-6 border border-black rounded-lg" style={{ height: '340px' }}>
      <CardHeader className="flex flex-row items-center justify-between pb-3 pt-6 px-6">
        <CardTitle className="section-header text-black">NAV Performance</CardTitle>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-16 text-sm border-black">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1W">1W</SelectItem>
            <SelectItem value="1M">1M</SelectItem>
            <SelectItem value="3M">3M</SelectItem>
            <SelectItem value="1Y">1Y</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-0 pb-8 px-6">
        <div className="relative chart-container pt-[30px] pb-[10px] mt-[15px] mb-[15px] pl-[10px] pr-[10px] overflow-visible" style={{ height: '160px' }}>
          <svg 
            ref={chartRef}
            className="w-full h-full cursor-crosshair" 
            viewBox="0 0 300 160"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Grid lines for better readability */}
            <defs>
              <pattern id="grid" width="50" height="32" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 32" fill="none" stroke="#f0f0f0" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Main chart line */}
            <polyline 
              points={points}
              stroke="#666" 
              strokeWidth="3.5" 
              fill="none"
              style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}
            />
            
            {/* Area fill under the line */}
            <polygon
              points={`20,140 ${points} ${20 + chartWidth},140`}
              fill="url(#gradient)"
              opacity="0.1"
            />
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#666" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#666" stopOpacity="0"/>
              </linearGradient>
            </defs>
            
            {/* Guide line */}
            {guideLine && (
              <line
                x1={guideLine}
                y1="20"
                x2={guideLine}
                y2="140"
                stroke="#999"
                strokeWidth="2"
                strokeDasharray="3,3"
                opacity="0.8"
              />
            )}
            
            {/* Data points */}
            {navData.map((item, index) => {
              const x = 20 + (index * chartWidth / (navData.length - 1));
              const navValue = parseFloat(item.navValue);
              const y = 20 + ((maxValue - navValue) / valueRange) * (chartHeight - 40);
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="2.5"
                  fill="#666"
                  opacity={hoveredPoint?.x === x ? 1 : 0.7}
                />
              );
            })}
            
            {/* Hovered point highlight */}
            {hoveredPoint && (
              <circle
                cx={hoveredPoint.x}
                cy={hoveredPoint.y}
                r="5"
                fill="#333"
                stroke="#fff"
                strokeWidth="2"
              />
            )}
          </svg>
          
          {/* Tooltip */}
          {hoveredPoint && (() => {
            const chartWidth = 300;
            const chartHeight = 160;
            const tooltipWidth = 80;
            const tooltipHeight = 40;
            const margin = 8;
            
            // Calculate responsive positioning
            let left = (hoveredPoint.x / chartWidth) * 100;
            let top = (hoveredPoint.y / chartHeight) * 100;
            let transformX = '-50%';
            let transformY = '-100%';
            
            // Adjust horizontal position if touching left or right edge
            const leftPos = (hoveredPoint.x / chartWidth) * 100;
            if (leftPos < 15) { // Too close to left edge
              left = leftPos + 5;
              transformX = '0%';
            } else if (leftPos > 85) { // Too close to right edge
              left = leftPos - 5;
              transformX = '-100%';
            }
            
            // Adjust vertical position if touching top or bottom edge
            const topPos = (hoveredPoint.y / chartHeight) * 100;
            if (topPos < 25) { // Too close to top edge
              top = topPos + 8;
              transformY = '0%';
            } else if (topPos > 75) { // Too close to bottom edge
              top = topPos - 8;
              transformY = '-100%';
            }
            
            return (
              <div
                className="absolute z-10 bg-white border border-gray-300 rounded-lg p-2 text-xs shadow-lg pointer-events-none"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  transform: `translate(${transformX}, ${transformY})`,
                  minWidth: '80px'
                }}
              >
                <div className="text-center">
                  <div className="font-semibold text-gray-800">₹{hoveredPoint.data.navValue}</div>
                  <div className="text-gray-600">{formatDate(hoveredPoint.data.date.toString())}</div>
                </div>
              </div>
            );
          })()}
        </div>
        
        <div className="grid grid-cols-3 gap-4 px-2">
          <div className="text-center">
            <p className="text-xs text-black mb-1">Current NAV</p>
            <p className="font-semibold text-black text-xs">
              ₹{currentNav?.navValue || "12.45"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-black mb-1">Day Change</p>
            <p className="font-semibold text-xs" style={{ color: 'var(--gain-green)' }}>
              +{changePercent.toFixed(2)}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-black mb-1">52W High</p>
            <p className="font-semibold text-black text-xs">₹{high52W.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
