import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/lib/language-context";
import type { User } from "@shared/schema";

export default function Profile() {
  const { language, setLanguage } = useLanguage();
  
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["/api/user"],
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
  };

  const memberSince = user?.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
    : 'Jan 2022';

  return (
    <div className="screen-content">
      {/* Profile Header */}
      <div className="bg-black mx-4 mt-4 rounded-lg p-6 text-white border border-black" style={{ height: '140px' }}>
        {isLoading ? (
          <div className="animate-pulse flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-full"></div>
            <div>
              <div className="h-6 bg-white bg-opacity-30 rounded w-32 mb-2"></div>
              <div className="h-4 bg-white bg-opacity-30 rounded w-48"></div>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-black">
                {user ? getInitials(user.fullName) : "AI"}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">{user?.fullName || "Ahmed Ibrahim"}</h3>
              <p className="text-white opacity-90">{user?.email || "ahmed.ibrahim@email.com"}</p>
              <div className="flex items-center space-x-2 mt-1">
                <i className="fas fa-shield-alt text-white text-sm"></i>
                <span className="text-sm text-white">{user?.isKycVerified ? "KYC Verified" : "KYC Pending"}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Account Stats */}
      <Card className="mx-4 mt-4 mb-6 border border-black rounded-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-black font-semibold">Account Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-white border border-black rounded-lg">
              <p className="text-2xl font-bold text-black">2.5 Years</p>
              <p className="text-sm text-black">Member Since</p>
            </div>
            <div className="text-center p-4 bg-white border border-black rounded-lg">
              <p className="text-2xl font-bold text-black">47</p>
              <p className="text-sm text-black">Forum Posts</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Menu */}
      <Card className="mx-4 mb-8 border border-black rounded-lg overflow-hidden">
        <CardContent className="p-0">
          <div className="space-y-0">
            <div className="flex items-center justify-between p-4 border-b border-black">
              <div className="flex items-center space-x-3">
                <i className="fas fa-globe text-black"></i>
                <span className="font-medium text-black">Language</span>
              </div>
              <div className="flex items-center space-x-2">
                <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
                  <SelectTrigger className="w-24 border-none bg-transparent">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ur">اردو</SelectItem>
                    <SelectItem value="hi">हिंदी</SelectItem>
                    <SelectItem value="ta">தமிழ்</SelectItem>
                    <SelectItem value="te">తెలుగు</SelectItem>
                    <SelectItem value="bn">বাংলা</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-b border-black">
              <div className="flex items-center space-x-3">
                <i className="fas fa-bell text-black"></i>
                <span className="font-medium text-black">Notifications</span>
              </div>
              <ChevronRight className="text-black" size={16} />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-b border-black">
              <div className="flex items-center space-x-3">
                <i className="fas fa-credit-card text-black"></i>
                <span className="font-medium text-black">Payment Methods</span>
              </div>
              <ChevronRight className="text-black" size={16} />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-b border-black">
              <div className="flex items-center space-x-3">
                <i className="fas fa-shield-alt text-black"></i>
                <span className="font-medium text-black">Security</span>
              </div>
              <ChevronRight className="text-black" size={16} />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-b border-black">
              <div className="flex items-center space-x-3">
                <i className="fas fa-file-alt text-black"></i>
                <span className="font-medium text-black">KYC Documents</span>
              </div>
              <ChevronRight className="text-black" size={16} />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <i className="fas fa-question-circle text-black"></i>
                <span className="font-medium text-black">Help & Support</span>
              </div>
              <ChevronRight className="text-black" size={16} />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Islamic Features */}
      <Card className="mx-4 mt-4 shadow-sm border border-gray-100">
        <CardHeader>
          <CardTitle>Islamic Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100">
              <div className="flex items-center space-x-3">
                <i className="fas fa-prayer-hands text-black"></i>
                <span className="font-medium text-black">Prayer Reminders</span>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <i className="fas fa-hand-holding-heart text-blue-600"></i>
                <span className="font-medium">Auto Zakat Calculator</span>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logout */}
      <div className="mx-4 mt-4 mb-6">
        <Button 
          variant="destructive" 
          className="w-full py-4 font-semibold shadow-lg"
        >
          <i className="fas fa-sign-out-alt mr-2"></i>Sign Out
        </Button>
      </div>
    </div>
  );
}
