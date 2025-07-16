import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import ForumRoomCard from "@/components/forum-room-card";
import type { ForumRoom } from "@shared/schema";

export default function Community() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: forumRooms, isLoading } = useQuery<ForumRoom[]>({
    queryKey: ["/api/forum/rooms"],
  });

  const filteredRooms = forumRooms?.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleRoomClick = (room: ForumRoom) => {
    console.log("Navigate to room:", room.name);
    // In a real app, this would navigate to the room's thread list
  };

  return (
    <div className="screen-content">
      {/* Header */}
      <div className="bg-white px-4 py-6 border-b border-gray-100">
        <h3 className="text-xl font-semibold mb-2">Community Forums</h3>
        <p className="text-gray-600 text-sm">Connect, learn, and grow together</p>
      </div>

      {/* Search Bar */}
      <div className="mx-4 mt-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search forums, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-gray-200 focus:border-olive"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>
      </div>

      {/* Forum Rooms */}
      <div className="mx-4 mt-4 space-y-3">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <Card key={i} className="shadow-sm border border-gray-100">
              <CardContent className="p-4">
                <div className="animate-pulse flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-8 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-12"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          filteredRooms.map((room) => (
            <ForumRoomCard
              key={room.id}
              room={room}
              onClick={() => handleRoomClick(room)}
            />
          ))
        )}
      </div>

      {/* Popular Discussions */}
      <Card className="mx-4 mt-6 shadow-sm border border-gray-100">
        <CardContent className="p-6">
          <h4 className="font-semibold text-lg mb-4">Trending Discussions</h4>
          <div className="space-y-4">
            <div className="border-l-4 border-olive pl-4">
              <h5 className="font-medium text-sm">How to calculate Zakat on investments?</h5>
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <span>by Ahmad_Sheikh</span>
                <span>•</span>
                <span>24 replies</span>
                <span>•</span>
                <span>2h ago</span>
              </div>
            </div>
            <div className="border-l-4 border-gold pl-4">
              <h5 className="font-medium text-sm">Best books for Islamic finance beginners</h5>
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <span>by Fatima_Rahman</span>
                <span>•</span>
                <span>18 replies</span>
                <span>•</span>
                <span>5h ago</span>
              </div>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h5 className="font-medium text-sm">Community Iftar planning for Ramadan</h5>
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <span>by Yusuf_Ali</span>
                <span>•</span>
                <span>32 replies</span>
                <span>•</span>
                <span>1d ago</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New Room Button */}
      <div className="mx-4 mt-4 mb-6">
        <Button className="w-full bg-olive text-white hover:bg-olive/90 py-4 font-semibold shadow-lg">
          <i className="fas fa-plus mr-2"></i>Create New Room
        </Button>
      </div>
    </div>
  );
}
