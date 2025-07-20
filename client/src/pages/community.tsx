import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Search, Users, MessageSquare, TrendingUp, X, Plus, Send } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import ForumRoomCard from "@/components/forum-room-card";
import type { ForumRoom } from "@shared/schema";

export default function Community() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState<ForumRoom | null>(null);
  const [selectedThread, setSelectedThread] = useState<any>(null);
  const [showMembersDialog, setShowMembersDialog] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  
  const { data: forumRooms, isLoading } = useQuery<ForumRoom[]>({
    queryKey: ["/api/forum/rooms"],
  });

  const filteredRooms = forumRooms?.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Mock user communities (communities user is a member of)
  const userCommunities = [
    { id: 1, name: "Finance Q&A", description: "Get expert answers on Islamic finance questions", memberCount: 2847, isOnline: true, unreadCount: 3 },
    { id: 2, name: "Urban Muslims", description: "Modern Muslim lifestyle and city living", memberCount: 1523, isOnline: true, unreadCount: 1 },
    { id: 3, name: "Islamic Investing", description: "Halal investment strategies and tips", memberCount: 3291, isOnline: false, unreadCount: 0 },
    { id: 4, name: "Young Muslims", description: "Community for young Muslim professionals", memberCount: 1847, isOnline: true, unreadCount: 5 },
  ];

  // Mock featured communities
  const featuredCommunities = [
    { id: 5, name: "Ramadan 2025", description: "Preparation and spiritual growth", memberCount: 4521, trending: true },
    { id: 6, name: "Startup Muslims", description: "Entrepreneurs building halal businesses", memberCount: 987, trending: true },
    { id: 7, name: "Marriage & Family", description: "Islamic guidance for family life", memberCount: 2156, trending: false },
  ];

  // Mock online members for selected community
  const onlineMembers = [
    { id: 1, name: "Ahmad Sheikh", avatar: "AS", status: "online", lastSeen: "now" },
    { id: 2, name: "Fatima Rahman", avatar: "FR", status: "online", lastSeen: "2m ago" },
    { id: 3, name: "Yusuf Ali", avatar: "YA", status: "online", lastSeen: "5m ago" },
    { id: 4, name: "Aisha Khan", avatar: "AK", status: "away", lastSeen: "15m ago" },
    { id: 5, name: "Omar Hassan", avatar: "OH", status: "online", lastSeen: "1h ago" },
  ];

  // Mock all members (for dialog)
  const allMembers = [
    ...onlineMembers,
    { id: 6, name: "Zainab Ahmed", avatar: "ZA", status: "offline", lastSeen: "2h ago" },
    { id: 7, name: "Ibrahim Malik", avatar: "IM", status: "offline", lastSeen: "1d ago" },
    { id: 8, name: "Mariam Qureshi", avatar: "MQ", status: "offline", lastSeen: "2d ago" },
    { id: 9, name: "Hassan Ali", avatar: "HA", status: "offline", lastSeen: "3d ago" },
    { id: 10, name: "Nadia Farooq", avatar: "NF", status: "offline", lastSeen: "1w ago" },
  ];

  // Mock discussion threads
  const discussionThreads = [
    {
      id: 1,
      title: "How to calculate Zakat on investments?",
      author: "Ahmad_Sheikh",
      replies: 24,
      lastActivity: "2h ago",
      isSticky: true
    },
    {
      id: 2,
      title: "Best books for Islamic finance beginners",
      author: "Fatima_Rahman", 
      replies: 18,
      lastActivity: "5h ago",
      isSticky: false
    },
    {
      id: 3,
      title: "Community Iftar planning for Ramadan",
      author: "Yusuf_Ali",
      replies: 32,
      lastActivity: "1d ago", 
      isSticky: false
    },
    {
      id: 4,
      title: "Halal ETF recommendations for 2025",
      author: "Omar_Hassan",
      replies: 15,
      lastActivity: "2d ago",
      isSticky: false
    }
  ];

  // Mock thread messages
  const threadMessages = [
    {
      id: 1,
      author: "Ahmad_Sheikh",
      content: "I'm trying to understand the correct way to calculate Zakat on my investment portfolio. Should I include unrealized gains?",
      timestamp: "2h ago",
      avatar: "AS"
    },
    {
      id: 2,
      author: "Fatima_Rahman",
      content: "According to most scholars, you should calculate Zakat on the current market value of your investments, including unrealized gains. The key is the value on your Zakat due date.",
      timestamp: "1h ago",
      avatar: "FR"
    },
    {
      id: 3,
      author: "Yusuf_Ali",
      content: "That's correct. Also remember that if you hold the investments for trading purposes, it's 2.5% of the total value. If it's for long-term holding, the calculation might differ.",
      timestamp: "45m ago",
      avatar: "YA"
    }
  ];

  const handleCommunityClick = (community: any) => {
    setSelectedCommunity(community);
    setSelectedThread(null);
  };

  const handleThreadClick = (thread: any) => {
    setSelectedThread(thread);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleRoomClick = (room: ForumRoom) => {
    console.log("Navigate to room:", room.name);
    // In a real app, this would navigate to the room's thread list
  };

  // Thread view
  if (selectedThread) {
    return (
      <div className="screen-content">
        {/* Thread Header */}
        <div className="bg-black px-4 py-6 border-b border-black">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedThread(null)}
              className="text-white hover:bg-gray-800 p-2"
            >
              ←
            </Button>
            <div>
              <h3 className="text-xl font-semibold" style={{ color: '#B2D2A4' }}>{selectedThread.title}</h3>
              <p className="text-white text-sm">in {selectedCommunity?.name}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 px-4 py-4 pb-32">
          {/* Thread Messages */}
          <div className="space-y-4">
            {threadMessages.map((message) => (
              <Card key={message.id} className="border border-black rounded-lg">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center font-semibold text-white text-sm">
                      {message.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h5 className="font-semibold text-black">{message.author}</h5>
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                      </div>
                      <p className="text-black text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Reply Input */}
          <Card className="mt-6 border border-black rounded-lg">
            <CardContent className="p-4">
              <div className="space-y-3">
                <Textarea
                  placeholder="Write your reply..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="min-h-20 border-black focus:border-black resize-none"
                />
                <div className="flex justify-end">
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-black text-white hover:bg-gray-800 disabled:bg-gray-300"
                  >
                    <Send size={16} className="mr-2" />
                    Reply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Community forum view
  if (selectedCommunity) {
    return (
      <div className="screen-content">
        {/* Forum Header */}
        <div className="bg-black px-4 py-6 border-b border-black">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCommunity(null)}
                className="text-white hover:bg-gray-800 p-2"
              >
                ←
              </Button>
              <div>
                <h3 className="text-xl font-semibold" style={{ color: '#B2D2A4' }}>{selectedCommunity.name}</h3>
                <p className="text-white text-sm">{selectedCommunity.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="text-white" size={16} />
              <span className="text-white text-sm">{selectedCommunity.memberCount}</span>
            </div>
          </div>
        </div>

        <div className="flex h-full">
          {/* Main Discussion Area */}
          <div className="flex-1 px-4 py-4">
            {/* Start Discussion Button */}
            <div className="mb-4">
              <Button className="bg-black text-white hover:bg-gray-800">
                <Plus size={16} className="mr-2" />
                Start a Discussion
              </Button>
            </div>

            {/* Discussion Threads */}
            <div className="space-y-3">
              {discussionThreads.map((thread) => (
                <Card 
                  key={thread.id} 
                  className="border border-black rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleThreadClick(thread)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {thread.isSticky && (
                            <Badge variant="secondary" className="bg-black text-white text-xs">
                              Pinned
                            </Badge>
                          )}
                          <h4 className="font-medium text-black text-sm">{thread.title}</h4>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-gray-600">
                          <span>by {thread.author}</span>
                          <span>•</span>
                          <span>{thread.replies} replies</span>
                          <span>•</span>
                          <span>{thread.lastActivity}</span>
                        </div>
                      </div>
                      <MessageSquare className="text-gray-400" size={16} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Members Panel */}
          <div className="w-80 border-l border-black bg-white">
            <div className="bg-black px-4 py-3 border-b border-black">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-white">Online Members</h4>
                <Dialog open={showMembersDialog} onOpenChange={setShowMembersDialog}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800 text-xs">
                      View All
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg max-h-[80vh]" aria-describedby="members-description">
                    <DialogHeader>
                      <DialogTitle>All Members ({allMembers.length})</DialogTitle>
                    </DialogHeader>
                    <p id="members-description" className="sr-only">View all community members with their online status</p>
                    <div className="max-h-96 overflow-y-auto">
                      <div className="space-y-2">
                        {allMembers.map((member) => (
                          <div key={member.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white ${
                              member.status === 'online' ? 'bg-black' : 
                              member.status === 'away' ? 'bg-gray-600' : 'bg-gray-400'
                            }`}>
                              {member.avatar}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-black">{member.name}</p>
                              <p className="text-xs text-gray-500">{member.lastSeen}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <div className="p-4">
              <div className="space-y-3">
                {onlineMembers.slice(0, 8).map((member) => (
                  <div key={member.id} className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white ${
                      member.status === 'online' ? 'bg-black' : 
                      member.status === 'away' ? 'bg-gray-600' : 'bg-gray-400'
                    }`}>
                      {member.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-black">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.lastSeen}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-content">
      {/* Header */}
      <div className="bg-black px-4 py-6 border-b border-black">
        <h3 className="text-xl font-semibold mb-2" style={{ color: '#B2D2A4' }}>My Communities</h3>
        <p className="text-white text-sm">Connect, learn, and grow together</p>
      </div>

      {/* My Communities */}
      <div className="mx-4 mt-4">
        <h4 className="font-semibold text-black mb-3">Your Communities</h4>
        <div className="space-y-3">
          {userCommunities.map((community) => (
            <Card 
              key={community.id} 
              className="border border-black rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleCommunityClick(community)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center font-semibold text-white">
                      {community.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h5 className="font-medium text-black">{community.name}</h5>
                        {community.unreadCount > 0 && (
                          <Badge variant="destructive" className="bg-black text-white text-xs">
                            {community.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{community.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>{community.memberCount.toLocaleString()} members</span>
                        {community.isOnline && (
                          <>
                            <span>•</span>
                            <span className="text-black font-medium">Active now</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <MessageSquare className="text-gray-400" size={20} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Search Communities */}
      <div className="mx-4 mt-6">
        <h4 className="font-semibold text-black mb-3">Search Communities</h4>
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

      {/* Forum Rooms (Search Results) */}
      {searchQuery && (
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
      )}

      {/* Featured Communities */}
      <div className="mx-4 mt-6">
        <h4 className="font-semibold text-black mb-3">Featured Communities</h4>
        <div className="space-y-3">
          {featuredCommunities.map((community) => (
            <Card key={community.id} className="border border-black rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center font-semibold text-white">
                      {community.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h5 className="font-medium text-black">{community.name}</h5>
                        {community.trending && (
                          <TrendingUp className="text-black" size={16} />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{community.description}</p>
                      <p className="text-xs text-gray-500 mt-2">{community.memberCount.toLocaleString()} members</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-black text-black hover:bg-black hover:text-white">
                    Join
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Trending Discussions */}
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

      <div className="pb-6"></div>
    </div>
  );
}
