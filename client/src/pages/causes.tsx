import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Calendar, ArrowRight } from "lucide-react";
import type { NgoProject } from "@shared/schema";

export default function Causes() {
  const [activeTab, setActiveTab] = useState<'my-causes' | 'explore'>('my-causes');
  
  const { data: allCauses = [] } = useQuery<NgoProject[]>({
    queryKey: ["/api/ngo-projects"],
  });

  // Mock user's supported causes (subset of all causes)
  const myCauses = allCauses.slice(0, 2);
  const exploreCauses = allCauses.slice(2);

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

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="bg-black px-4 py-6 border-b border-black">
        <h1 className="text-2xl font-bold" style={{ color: '#B2D2A4' }}>My Causes</h1>
        <p className="text-sm text-white">Support meaningful causes and make a difference</p>
      </div>

      {/* Tab Navigation */}
      <div className="px-4 pt-4">
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('my-causes')}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'my-causes'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            My Causes ({myCauses.length})
          </button>
          <button
            onClick={() => setActiveTab('explore')}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'explore'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Explore All Causes
          </button>
        </div>
      </div>

      <div className="screen-content pb-24">
        {activeTab === 'my-causes' && (
          <>
            {/* Summary Card */}
            <Card className="mx-4 mt-6 mb-6 border border-black rounded-lg">
              <CardHeader className="pb-3 pt-6">
                <CardTitle className="flex items-center text-lg">
                  <Heart className="mr-3 text-black" size={20} />
                  <span className="text-black font-semibold">Your Impact</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-black">₹12,500</p>
                    <p className="text-sm text-gray-600">Total Donated</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-black">{myCauses.length}</p>
                    <p className="text-sm text-gray-600">Causes Supported</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* My Supported Causes */}
            <div className="px-4 space-y-6">
              {myCauses.length > 0 ? (
                myCauses.map((cause) => (
                  <CauseCard key={cause.id} cause={cause} isSupported={true} />
                ))
              ) : (
                <Card className="border border-gray-200 rounded-lg">
                  <CardContent className="pt-8 pb-8 text-center">
                    <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">You haven't supported any causes yet</p>
                    <Button 
                      onClick={() => setActiveTab('explore')}
                      className="bg-black text-white hover:bg-gray-800"
                    >
                      Explore Causes
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        )}

        {activeTab === 'explore' && (
          <>
            {/* Filter/Search Bar */}
            <div className="px-4 pt-6 pb-2">
              <div className="bg-white px-4 py-4 rounded-lg mb-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-black font-semibold text-lg">All Registered Causes</h3>
                  <p className="text-sm text-gray-600">{allCauses.length} causes</p>
                </div>
              </div>
            </div>

            {/* All Causes */}
            <div className="px-4 space-y-6">
              {allCauses.map((cause) => (
                <CauseCard 
                  key={cause.id} 
                  cause={cause} 
                  isSupported={myCauses.some(mc => mc.id === cause.id)}
                />
              ))}
            </div>

            {/* Register New Cause Button */}
            <div className="px-4 mt-8">
              <Card className="border border-black rounded-lg">
                <CardContent className="pt-6 pb-6 text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-plus text-xl text-gray-600"></i>
                  </div>
                  <h3 className="font-semibold text-black mb-2">Have a Cause to Register?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Help your community by registering a meaningful cause
                  </p>
                  <Button className="bg-black text-white hover:bg-gray-800">
                    Register Your Cause
                  </Button>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}