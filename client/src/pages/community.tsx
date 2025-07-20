import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <div className="bg-black px-4 py-6 border-b border-black">
        <h3 className="text-xl font-semibold mb-2" style={{ color: '#B2D2A4' }}>Community Forums</h3>
        <p className="text-white text-sm">Connect, learn, and grow together</p>
      </div>

      {/* Search Bar */}
      <div className="mx-4 mt-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search forums, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-black focus:border-black"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" size={16} />
        </div>
      </div>

      {/* Forum Rooms */}
      <div className="mx-4 mt-4 space-y-3">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <Card key={i} className="border border-black rounded-lg">
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
      <Card className="mx-4 mt-6 border border-black rounded-lg">
        <CardHeader className="pb-3 pt-6">
          <CardTitle className="font-semibold text-lg text-black">Trending Discussions</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-6">
          <div className="space-y-4">
            <div className="border-l-4 border-black pl-4">
              <h5 className="font-medium text-sm text-black">How to calculate Zakat on investments?</h5>
              <div className="flex items-center space-x-4 mt-2 text-xs text-black">
                <span>by Ahmad_Sheikh</span>
                <span>•</span>
                <span>24 replies</span>
                <span>•</span>
                <span>2h ago</span>
              </div>
            </div>
            <div className="border-l-4 border-black pl-4">
              <h5 className="font-medium text-sm text-black">Best books for Islamic finance beginners</h5>
              <div className="flex items-center space-x-4 mt-2 text-xs text-black">
                <span>by Fatima_Rahman</span>
                <span>•</span>
                <span>18 replies</span>
                <span>•</span>
                <span>5h ago</span>
              </div>
            </div>
            <div className="border-l-4 border-black pl-4">
              <h5 className="font-medium text-sm text-black">Community Iftar planning for Ramadan</h5>
              <div className="flex items-center space-x-4 mt-2 text-xs text-black">
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
      <div className="mx-4 mt-6 mb-24">
        <Button className="w-full bg-black text-white hover:bg-white hover:text-black hover:border-black border py-4 font-semibold">
          <i className="fas fa-plus mr-2"></i>Register Your Cause
        </Button>
      </div>
    </div>
  );
}
