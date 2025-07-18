import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Navigation, MapPin } from "lucide-react";
import L from "leaflet";

// Fix leaflet default markers in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface Mosque {
  id: string;
  name: string;
  address: string;
  distance: number;
  lat: number;
  lng: number;
}

interface MosqueFinderProps {
  isOpen: boolean;
  onClose: () => void;
}

// Component to handle map centering
function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, 14);
  }, [center, map]);
  
  return null;
}

export default function MosqueFinder({ isOpen, onClose }: MosqueFinderProps) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [nearbyMosques, setNearbyMosques] = useState<Mosque[]>([]);
  const [selectedMosque, setSelectedMosque] = useState<Mosque | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get user's current location
  useEffect(() => {
    if (isOpen && !userLocation) {
      setIsLoading(true);
      setError(null);
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([latitude, longitude]);
            findNearbyMosques(latitude, longitude);
          },
          (error) => {
            console.error("Error getting location:", error);
            setError("Unable to access your location. Please enable location services.");
            // Fallback to Mumbai coordinates
            setUserLocation([19.0760, 72.8777]);
            findNearbyMosques(19.0760, 72.8777);
            setIsLoading(false);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
        // Fallback to Mumbai coordinates
        setUserLocation([19.0760, 72.8777]);
        findNearbyMosques(19.0760, 72.8777);
        setIsLoading(false);
      }
    }
  }, [isOpen, userLocation]);

  // Mock function to find nearby mosques (in real app, this would use a Places API)
  const findNearbyMosques = async (lat: number, lng: number) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock nearby mosques data (in real app, use Google Places API or Overpass API)
      const mockMosques: Mosque[] = [
        {
          id: "1",
          name: "Jama Masjid Mumbai",
          address: "Mohamed Ali Road, Mumbai",
          distance: 0.8,
          lat: lat + 0.005,
          lng: lng + 0.003
        },
        {
          id: "2", 
          name: "Haji Ali Dargah",
          address: "Dargah Road, Haji Ali, Mumbai",
          distance: 1.2,
          lat: lat - 0.003,
          lng: lng + 0.007
        },
        {
          id: "3",
          name: "Masjid Bandra",
          address: "Hill Road, Bandra West, Mumbai", 
          distance: 2.1,
          lat: lat + 0.008,
          lng: lng - 0.004
        },
        {
          id: "4",
          name: "Minara Masjid",
          address: "Fort, Mumbai",
          distance: 2.8,
          lat: lat - 0.006,
          lng: lng - 0.009
        }
      ];
      
      setNearbyMosques(mockMosques);
      setSelectedMosque(mockMosques[0]); // Select the nearest one by default
    } catch (error) {
      setError("Failed to find nearby mosques. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getDirections = (mosque: Mosque) => {
    if (userLocation) {
      const [lat, lng] = userLocation;
      const url = `https://www.google.com/maps/dir/${lat},${lng}/${mosque.lat},${mosque.lng}`;
      window.open(url, '_blank');
    }
  };

  if (!isOpen) return null;

  return (
    <Card className="mx-4 mb-6 border border-black rounded-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="section-header text-black">Find Nearest Mosque</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            <X size={16} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-pulse text-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Finding nearby mosques...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <Button 
              onClick={() => {
                setError(null);
                if (userLocation) {
                  findNearbyMosques(userLocation[0], userLocation[1]);
                }
              }}
              className="bg-black text-white hover:bg-gray-800"
            >
              Try Again
            </Button>
          </div>
        ) : userLocation ? (
          <div className="space-y-4">
            {/* Map */}
            <div className="h-64 rounded-lg overflow-hidden border border-gray-200">
              <MapContainer
                center={userLocation}
                zoom={14}
                style={{ height: "100%", width: "100%" }}
                className="z-0"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                <MapController center={userLocation} />
                
                {/* User location marker */}
                <Marker position={userLocation}>
                  <Popup>Your Location</Popup>
                </Marker>
                
                {/* Mosque markers */}
                {nearbyMosques.map((mosque) => (
                  <Marker 
                    key={mosque.id} 
                    position={[mosque.lat, mosque.lng]}
                    eventHandlers={{
                      click: () => setSelectedMosque(mosque)
                    }}
                  >
                    <Popup>
                      <div className="text-center">
                        <h4 className="font-semibold">{mosque.name}</h4>
                        <p className="text-xs text-gray-600">{mosque.address}</p>
                        <p className="text-xs text-gray-500">{mosque.distance} km away</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
            
            {/* Mosque List */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-black">Nearby Mosques</h4>
              {nearbyMosques.map((mosque) => (
                <div 
                  key={mosque.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedMosque?.id === mosque.id 
                      ? 'border-black bg-gray-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedMosque(mosque)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h5 className="font-medium text-sm text-black">{mosque.name}</h5>
                      <p className="text-xs text-gray-600">{mosque.address}</p>
                      <p className="text-xs text-gray-500">{mosque.distance} km away</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        getDirections(mosque);
                      }}
                      className="bg-black text-white hover:bg-gray-800 text-xs h-8"
                    >
                      <Navigation size={12} className="mr-1" />
                      Directions
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}