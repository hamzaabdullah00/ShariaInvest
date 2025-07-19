import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, Volume2, MapPin, Heart } from "lucide-react";
import MosqueFinder from "@/components/mosque-finder";
import type { PrayerTimes } from "@shared/schema";

export default function Mosque() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMosqueFinderOpen, setIsMosqueFinderOpen] = useState(false);
  
  const { data: prayerTimes } = useQuery<PrayerTimes>({
    queryKey: ["/api/prayer-times/Mumbai"],
  });

  // Mock data for demonstration
  const fundraisingGoal = 50000;
  const currentFunding = 32500;
  const progressPercent = (currentFunding / fundraisingGoal) * 100;
  const daysLeft = 12;

  const announcements = [
    {
      id: 1,
      title: "Friday Khutbah - The Importance of Charity",
      time: "12:30 PM",
      type: "live"
    },
    {
      id: 2,
      title: "Community Iftar Planning Meeting",
      time: "Yesterday 6:00 PM",
      type: "transcript"
    },
    {
      id: 3,
      title: "Ramadan Schedule Update",
      time: "2 days ago",
      type: "transcript"
    }
  ];

  const duaRequests = [
    "For successful surgery of community member",
    "For guidance in career decisions", 
    "For healing of family member's illness"
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="pt-4 pb-4 px-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-black">My Mosque</h1>
        <p className="text-sm text-gray-600">Your spiritual hub and community center</p>
      </div>

      <div className="screen-content pb-24">
        {/* Prayer Times */}
        <Card className="mx-4 mt-6 mb-6 border border-black rounded-lg">
          <CardHeader className="pb-2 pt-6">
            <CardTitle className="flex items-center justify-between text-black text-lg">
              <span className="section-header">Prayer Times</span>
              <i className="fas fa-mosque text-black"></i>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-6">
            {prayerTimes && (
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Fajr</p>
                  <p className="font-semibold text-black">{prayerTimes.fajr}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Dhuhr</p>
                  <p className="font-semibold text-black">{prayerTimes.dhuhr}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Asr</p>
                  <p className="font-semibold text-black">{prayerTimes.asr}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Maghrib</p>
                  <p className="font-semibold text-black">{prayerTimes.maghrib}</p>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Sehri Ends</p>
                <p className="font-semibold text-black">4:45 AM</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Iftar Time</p>
                <p className="font-semibold text-black">7:32 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Azaan Audio */}
        <Card className="mx-4 mt-6 mb-6 border border-black rounded-lg">
          <CardHeader className="pb-2 pt-6">
            <CardTitle className="flex items-center text-black text-lg">
              <Volume2 className="mr-3" size={20} />
              <span className="section-header">Live Azaan</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </Button>
                <div>
                  <p className="font-medium text-black">
                    {isPlaying ? "Now Playing" : "Next Azaan"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {isPlaying ? "Maghrib Azaan" : `Maghrib - ${prayerTimes?.maghrib || "7:32 PM"}`}
                  </p>
                </div>
              </div>
              {isPlaying && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-red-500">LIVE</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Mosque Fundraising */}
        <Card className="mx-4 mt-6 mb-6 border border-black rounded-lg">
          <CardHeader className="pb-2 pt-6">
            <CardTitle className="flex items-center text-black text-lg">
              <Heart className="mr-3" size={20} />
              <span className="section-header">Monthly Fundraising</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Mosque Maintenance Fund</p>
                <p className="text-sm font-medium text-black">{daysLeft} days left</p>
              </div>
              <Progress value={progressPercent} className="h-3" />
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-black">
                  ₹{currentFunding.toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-gray-600">
                  of ₹{fundraisingGoal.toLocaleString('en-IN')}
                </p>
              </div>
              <Button className="w-full bg-black text-white hover:bg-gray-800">
                <Heart className="mr-2" size={16} />
                Donate Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card className="mx-4 mt-6 mb-6 border border-black rounded-lg">
          <CardHeader className="pb-2 pt-6">
            <CardTitle className="flex items-center text-black text-lg">
              <i className="fas fa-bullhorn mr-3"></i>
              <span className="section-header">Announcements</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-6">
            <div className="space-y-3">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium text-black text-sm">{announcement.title}</p>
                    {announcement.type === 'live' && (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-red-500">LIVE</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-600">{announcement.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dua Requests */}
        <Card className="mx-4 mt-6 mb-6 border border-black rounded-lg">
          <CardHeader className="pb-2 pt-6">
            <CardTitle className="flex items-center text-black text-lg">
              <i className="fas fa-hands-praying mr-3"></i>
              <span className="section-header">Community Dua Requests</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-6">
            <div className="space-y-3 mb-4">
              {duaRequests.map((request, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-black">{request}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white">
              Submit Dua Request
            </Button>
          </CardContent>
        </Card>

        {/* Find Nearest Mosque */}
        <Card className="mx-4 mt-6 mb-6 border border-black rounded-lg">
          <CardHeader className="pb-2 pt-6">
            <CardTitle className="flex items-center text-black text-lg">
              <MapPin className="mr-3" size={20} />
              <span className="section-header">Nearby Mosques</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-6">
            <Button 
              className="w-full bg-black text-white hover:bg-gray-800"
              onClick={() => setIsMosqueFinderOpen(true)}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Find Nearest Mosque
            </Button>
          </CardContent>
        </Card>

        {/* Mosque Finder */}
        <MosqueFinder 
          isOpen={isMosqueFinderOpen} 
          onClose={() => setIsMosqueFinderOpen(false)} 
        />
      </div>
    </div>
  );
}