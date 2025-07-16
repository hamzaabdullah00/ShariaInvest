import { Link, useLocation } from "wouter";
import { Home, Coins, BarChart3, MessageCircle, User } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function BottomNavigation() {
  const [location] = useLocation();
  const { translations } = useLanguage();

  const navItems = [
    { path: "/", icon: Home, label: translations.home || "Home" },
    { path: "/invest", icon: Coins, label: translations.invest || "Invest" },
    { path: "/dashboard", icon: BarChart3, label: translations.dashboard || "Dashboard" },
    { path: "/community", icon: MessageCircle, label: translations.community || "Community" },
    { path: "/profile", icon: User, label: translations.profile || "Profile" },
  ];

  return (
    <nav className="bottom-nav">
      <div className="flex justify-between items-center px-4 py-2">
        {navItems.map((item, index) => {
          const isActive = location === item.path;
          const isDashboard = item.path === "/dashboard";
          const Icon = item.icon;

          return (
            <Link key={item.path} href={item.path} className="nav-item">
              <button className={`flex flex-col items-center space-y-1 px-2 py-2 ${
                isDashboard && isActive ? 'dashboard-active' : ''
              }`}>
                {isDashboard && isActive ? (
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center -mt-2">
                    <Icon className="text-white text-xl" size={20} />
                  </div>
                ) : (
                  <Icon 
                    className={`text-xl ${
                      isActive ? 'text-white bg-black p-1 rounded' : 'text-black'
                    }`} 
                    size={20} 
                  />
                )}
                <span className={`text-xs font-medium ${
                  isActive ? 'text-black' : 'text-black'
                }`}>
                  {item.label}
                </span>
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
