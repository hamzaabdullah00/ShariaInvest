import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/lib/language-context";
import type { PrayerTime } from "@shared/schema";

export default function PrayerTimesCard() {
  const { translations } = useLanguage();
  
  const { data: prayerTimes, isLoading } = useQuery<PrayerTime>({
    queryKey: ["/api/prayer-times/Mumbai"],
  });

  if (isLoading) {
    return (
      <Card className="mx-4 mt-4 shadow-sm border border-gray-100">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-2 gap-4">
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
    <Card className="mx-4 mt-4 shadow-sm border border-gray-100">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span>{translations.prayer_times || "Prayer Times"}</span>
          <i className="fas fa-mosque text-olive"></i>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {prayerTimes && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">Fajr</p>
              <p className="font-semibold text-olive">{prayerTimes.fajr}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Dhuhr</p>
              <p className="font-semibold text-olive">{prayerTimes.dhuhr}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Asr</p>
              <p className="font-semibold text-olive">{prayerTimes.asr}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Maghrib</p>
              <p className="font-semibold text-olive">{prayerTimes.maghrib}</p>
            </div>
          </div>
        )}
        <Button className="w-full bg-olive text-white hover:bg-olive/90">
          <MapPin className="w-4 h-4 mr-2" />
          {translations.find_mosque || "Find Nearest Mosque"}
        </Button>
      </CardContent>
    </Card>
  );
}
