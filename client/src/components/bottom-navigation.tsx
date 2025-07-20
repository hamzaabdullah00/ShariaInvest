import { Link, useLocation } from "wouter";
import { Home, TrendingUp, MessageCircle, Heart } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function BottomNavigation() {
  const [location] = useLocation();
  const { translations } = useLanguage();

  const navItems = [
    { path: "/investments", icon: TrendingUp, label: "Invest" },
    { path: "/", icon: Home, label: translations.home || "Home" },
    { path: "/community", icon: MessageCircle, label: translations.community || "Community" },
    { path: "/causes", icon: Heart, label: "Causes" },
  ];

  return (
    <nav className="bottom-nav">
      <div className="flex justify-between items-center px-4 py-2">
        {navItems.map((item, index) => {
          const isActive = location === item.path;
          const Icon = item.icon;

          return (
            <Link key={item.path} href={item.path} className="nav-item">
              <button className="flex flex-col items-center space-y-1 px-2 py-2">
                <Icon 
                  className={`text-xl ${
                    isActive ? 'text-white bg-black p-1 rounded' : 'text-black'
                  }`} 
                  size={20} 
                />
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
