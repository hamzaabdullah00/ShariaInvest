import { Card, CardContent } from "@/components/ui/card";
import type { ForumRoom } from "@shared/schema";

interface ForumRoomCardProps {
  room: ForumRoom;
  onClick: () => void;
}

export default function ForumRoomCard({ room, onClick }: ForumRoomCardProps) {
  const getIconColor = (name: string) => {
    switch (name) {
      case "Finance Q&A":
        return "text-black bg-gray-100";
      case "Local Events":
        return "text-black bg-gray-100";
      case "Culture & Faith":
        return "text-black bg-gray-100";
      case "Education":
        return "text-black bg-gray-100";
      default:
        return "text-black bg-gray-100";
    }
  };

  const timeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <Card 
      className="shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getIconColor(room.name)}`}>
              <i className={`${room.icon}`}></i>
            </div>
            <div>
              <h4 className="font-semibold">{room.name}</h4>
              <p className="text-gray-500 text-sm">{room.description}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{room.memberCount > 1000 ? `${(room.memberCount / 1000).toFixed(1)}k` : room.memberCount}</p>
            <p className="text-gray-500 text-xs">members</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Latest: "Sample discussion topic"</span>
          <span className="text-olive">{timeAgo(room.lastActivity!)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
