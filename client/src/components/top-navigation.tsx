import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Bell, User, X, FileText, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export default function TopNavigation() {
  const [location] = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Sample notifications
  const notifications = [
    {
      id: 1,
      title: "Investment Update",
      message: "Your Barakah Equity Fund has gained 2.1% this week",
      time: "2h ago",
      read: false
    },
    {
      id: 2,
      title: "Community Activity",
      message: "New discussion in Finance Q&A: Zakat calculations",
      time: "4h ago",
      read: false
    },
    {
      id: 3,
      title: "Prayer Reminder",
      message: "Maghrib prayer time in 15 minutes",
      time: "6h ago",
      read: true
    },
    {
      id: 4,
      title: "Donation Receipt",
      message: "Thank you for your ₹500 donation to Children's Education",
      time: "1d ago",
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  // Determine if we're on a page with black background
  const isBlackBackground = location === "/investments" || location.startsWith("/fund/") || 
                           location === "/community" || location === "/causes" || 
                           location === "/mosque" || location === "/profile";

  const menuItems = [
    { icon: FileText, label: "Technical Documentation", href: "#" },
    { icon: Shield, label: "Disclaimer", href: "#" },
    { icon: Lock, label: "Privacy Policy", href: "#" }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 ${
        isBlackBackground ? 'bg-black border-b border-gray-800' : 'bg-white border-b border-gray-200'
      }`}>
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left: Hamburger Menu */}
          <Dialog open={showMenu} onOpenChange={setShowMenu}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className={`p-2 ${
                isBlackBackground ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'
              }`}>
                <Menu size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm" aria-describedby="menu-description">
              <DialogHeader>
                <DialogTitle>Menu</DialogTitle>
              </DialogHeader>
              <p id="menu-description" className="sr-only">Navigation menu with documentation and policy links</p>
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <Button
                    key={item.label}
                    variant="ghost"
                    className="w-full justify-start hover:bg-gray-100"
                    onClick={() => {
                      console.log(`Navigate to: ${item.label}`);
                      setShowMenu(false);
                    }}
                  >
                    <item.icon size={16} className="mr-3" />
                    {item.label}
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {/* Center: Logo/Title */}
          <Link href="/">
            <h1 className={`text-lg font-bold ${
              isBlackBackground ? 'text-white' : 'text-black'
            }`}>
              Barakah
            </h1>
          </Link>

          {/* Right: Notifications & Profile */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className={`p-2 relative ${
                  isBlackBackground ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'
                }`}>
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[80vh]" aria-describedby="notifications-description">
                <DialogHeader>
                  <DialogTitle>Notifications</DialogTitle>
                </DialogHeader>
                <p id="notifications-description" className="sr-only">List of recent notifications and updates</p>
                <div className="max-h-96 overflow-y-auto space-y-3">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`p-3 rounded-lg border ${
                      notification.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h5 className="font-medium text-black text-sm">{notification.title}</h5>
                          <p className="text-gray-600 text-xs mt-1">{notification.message}</p>
                          <span className="text-gray-500 text-xs">{notification.time}</span>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            {/* Profile */}
            <Link href="/profile">
              <Button variant="ghost" size="sm" className={`p-2 ${
                isBlackBackground ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'
              }`}>
                <User size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from being hidden behind fixed nav */}
      <div className="h-14"></div>
    </>
  );
}