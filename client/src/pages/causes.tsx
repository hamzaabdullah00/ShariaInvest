import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Users, Calendar, ArrowRight, Calculator, TrendingUp, Building2, RefreshCw } from "lucide-react";
import type { NgoProject } from "@shared/schema";

export default function Causes() {
  const [activeTab, setActiveTab] = useState<'my-causes' | 'explore' | 'zakat' | 'ngos'>('my-causes');
  
  const { data: allCauses = [] } = useQuery<NgoProject[]>({
    queryKey: ["/api/ngo-projects"],
  });

  // Mock user's supported causes (subset of all causes)
  const myCauses = allCauses.slice(0, 2);
  const exploreCauses = allCauses.slice(2);
  
  // Mock Zakat-supported causes
  const zakatCauses = [
    {
      id: 1,
      name: "Widow Support Program",
      description: "Supporting widows with monthly stipends and skill development programs",
      currentAmount: 45000,
      targetAmount: 200000,
      deadline: "2025-12-31",
      category: "Social Welfare"
    },
    {
      id: 2,
      name: "Orphan Education Fund",
      description: "Providing quality education and care for orphaned children",
      currentAmount: 78000,
      targetAmount: 150000,
      deadline: "2025-10-15",
      category: "Education"
    },
    {
      id: 3,
      name: "Medical Aid for Poor",
      description: "Free medical treatment and medicines for underprivileged families",
      currentAmount: 32000,
      targetAmount: 100000,
      deadline: "2025-08-30",
      category: "Healthcare"
    }
  ];

  // Mock NGO data
  const ngos = [
    {
      id: 1,
      name: "Islamic Relief Foundation",
      description: "Providing humanitarian aid and development programs worldwide",
      impact: "Served 2.5M+ beneficiaries",
      categories: ["Emergency Relief", "Education", "Healthcare"],
      monthlySupport: 1500,
      totalRaised: 8500000
    },
    {
      id: 2,
      name: "Helping Hand Society",
      description: "Community-based organization focusing on local poverty alleviation",
      impact: "500+ families supported monthly",
      categories: ["Food Security", "Skill Development", "Housing"],
      monthlySupport: 2200,
      totalRaised: 3200000
    },
    {
      id: 3,
      name: "Education for All",
      description: "Ensuring quality education access for underprivileged children",
      impact: "1200+ children educated annually",
      categories: ["Primary Education", "Vocational Training", "Scholarships"],
      monthlySupport: 800,
      totalRaised: 1800000
    }
  ];

  const CauseCard = ({ cause, isSupported = false }: { cause: NgoProject; isSupported?: boolean }) => {
    const currentAmount = Number(cause.currentAmount) || 0;
    const targetAmount = Number(cause.targetAmount) || 1;
    const progressPercent = (currentAmount / targetAmount) * 100;
    const daysLeft = Math.ceil((new Date(cause.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

    return (
      <Card className="border border-black rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
        <CardHeader className="pb-3 pt-6">
          <div className="flex justify-between items-start mb-2">
            <CardTitle className="text-lg text-black font-semibold">
              {cause.name}
            </CardTitle>
            {isSupported && (
              <Badge className="bg-black text-white">
                Supporting
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600">{cause.description}</p>
        </CardHeader>
        <CardContent className="pt-0 pb-6">
          <div className="space-y-4">
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  ₹{currentAmount.toLocaleString('en-IN')} raised
                </p>
                <p className="text-sm font-medium text-black">
                  {Math.round(progressPercent)}%
                </p>
              </div>
              <Progress value={progressPercent} className="h-2" />
              <div className="flex justify-between items-center text-sm">
                <p className="text-gray-600">
                  Goal: ₹{targetAmount.toLocaleString('en-IN')}
                </p>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>{daysLeft} days left</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-1" />
                <span>{Math.floor(Math.random() * 200) + 50} supporters</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Heart className="w-4 h-4 mr-1" />
                <span>{isSupported ? 'Your contribution' : 'Support needed'}</span>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex space-x-2 pt-2">
              <Button 
                className="flex-1 bg-black text-white hover:bg-gray-800"
                size="sm"
              >
                <Heart className="w-4 h-4 mr-2" />
                {isSupported ? 'Donate More' : 'Support Cause'}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-black text-black hover:bg-black hover:text-white"
              >
                View Details
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const NgoCard = ({ ngo }: { ngo: any }) => (
    <Card className="border border-black rounded-lg">
      <CardHeader className="pb-3 pt-6">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
              <Building2 className="text-white" size={20} />
            </div>
            <div>
              <CardTitle className="text-lg text-black font-semibold">{ngo.name}</CardTitle>
              <p className="text-sm text-gray-600">{ngo.impact}</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600">{ngo.description}</p>
      </CardHeader>
      <CardContent className="pt-0 pb-6">
        <div className="space-y-4">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {ngo.categories.map((category: string, index: number) => (
              <Badge key={index} variant="outline" className="border-black text-black">
                {category}
              </Badge>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Monthly Support</p>
              <p className="font-semibold text-black">₹{ngo.monthlySupport.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <p className="text-gray-600">Total Raised</p>
              <p className="font-semibold text-black">₹{(ngo.totalRaised / 1000000).toFixed(1)}M</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button className="bg-black text-white hover:bg-gray-800">
              <Heart size={16} className="mr-2" />
              Donate Now
            </Button>
            <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
              <RefreshCw size={16} className="mr-2" />
              Start SIP
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="screen-content">
      {/* Header */}
      <div className="bg-black px-4 py-6">
        <h1 className="text-2xl font-bold" style={{ color: '#B2D2A4' }}>My Causes</h1>
        <p className="text-white text-sm mt-1">Support meaningful causes and track your impact</p>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-6">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="my-causes" className="text-xs">My Causes</TabsTrigger>
            <TabsTrigger value="explore" className="text-xs">Explore All</TabsTrigger>
            <TabsTrigger value="zakat" className="text-xs">Zakat Causes</TabsTrigger>
            <TabsTrigger value="ngos" className="text-xs">NGOs</TabsTrigger>
          </TabsList>

          <TabsContent value="my-causes" className="space-y-4">
            {myCauses.length > 0 ? (
              myCauses.map((cause) => (
                <CauseCard key={cause.id} cause={cause} isSupported={true} />
              ))
            ) : (
              <div className="text-center py-12">
                <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-black mb-2">No supported causes yet</h3>
                <p className="text-gray-600 mb-4">Start supporting causes that matter to you</p>
                <Button 
                  onClick={() => setActiveTab('explore')}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Explore Causes
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="explore" className="space-y-4">
            <div className="mb-4">
              <Button 
                onClick={() => {
                  // Navigate to investments page, zakat tab, donate by cause
                  window.location.href = '/investments?tab=zakat&section=donate-by-cause';
                }}
                className="w-full bg-black text-white hover:bg-gray-800 mb-4"
              >
                <TrendingUp size={16} className="mr-2" />
                View All Donation Options
              </Button>
            </div>
            {exploreCauses.map((cause) => (
              <CauseCard key={cause.id} cause={cause} />
            ))}
          </TabsContent>

          <TabsContent value="zakat" className="space-y-4">
            <div className="mb-4">
              <Button 
                onClick={() => {
                  // Navigate to investments page, zakat tab, zakat impact section
                  window.location.href = '/investments?tab=zakat&section=impact';
                }}
                className="w-full bg-black text-white hover:bg-gray-800 mb-4"
              >
                <Calculator size={16} className="mr-2" />
                View Supported Causes
              </Button>
            </div>
            {zakatCauses.map((cause) => (
              <CauseCard key={cause.id} cause={cause as any} isSupported={false} />
            ))}
          </TabsContent>

          <TabsContent value="ngos" className="space-y-4">
            {ngos.map((ngo) => (
              <NgoCard key={ngo.id} ngo={ngo} />
            ))}
          </TabsContent>
        </Tabs>

        <div className="pb-6"></div>
      </div>
    </div>
  );
}