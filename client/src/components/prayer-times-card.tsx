import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/lib/language-context";
import { useState } from "react";
import MosqueFinder from "./mosque-finder";
import type { PrayerTime } from "@shared/schema";

export default function PrayerTimesCard() {
  const { translations } = useLanguage();
  const [isMosqueFinderOpen, setIsMosqueFinderOpen] = useState(false);
  
  const { data: prayerTimes, isLoading } = useQuery<PrayerTime>({
    queryKey: ["/api/prayer-times/Mumbai"],
  });

  if (isLoading) {
    return (
      <Card className="mx-4 mt-4 mb-6 border border-black rounded-lg" style={{ height: '140px' }}>
        <CardContent className="p-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-4 gap-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="text-center">
                  <div className="h-3 bg-gray-200 rounded w-12 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="mx-4 mt-4 mb-6 border border-black rounded-lg" style={{ height: '140px' }}>
        <CardHeader className="pb-1">
          <CardTitle className="flex items-center justify-between text-black text-sm">
            <span className="section-header">{translations.prayer_times || "Prayer Times"}</span>
            <i className="fas fa-mosque text-black"></i>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {prayerTimes && (
            <div className="grid grid-cols-4 gap-1 mb-3">
              <div className="text-center">
                <p className="text-xs text-black">Fajr</p>
                <p className="font-semibold text-black text-xs">{prayerTimes.fajr}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-black">Dhuhr</p>
                <p className="font-semibold text-black text-xs">{prayerTimes.dhuhr}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-black">Asr</p>
                <p className="font-semibold text-black text-xs">{prayerTimes.asr}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-black">Maghrib</p>
                <p className="font-semibold text-black text-xs">{prayerTimes.maghrib}</p>
              </div>
            </div>
          )}
          <Button 
            className="w-full bg-black text-white hover:bg-white hover:text-black hover:border-black border text-xs" 
            style={{ height: '36px' }}
            onClick={() => setIsMosqueFinderOpen(!isMosqueFinderOpen)}
          >
            <MapPin className="w-3 h-3 mr-1" />
            {translations.find_mosque || "Find Nearest Mosque"}
          </Button>
        </CardContent>
      </Card>
      
      {/* Mosque Finder - positioned below the Prayer Times card */}
      <MosqueFinder 
        isOpen={isMosqueFinderOpen} 
        onClose={() => setIsMosqueFinderOpen(false)} 
      />
    </>
  );
}
