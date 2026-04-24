import { Bus, MapPin, Clock, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const buses = [
  { id: "GU-01", route: "Panipat → Campus", driver: "Rajan Kumar", lat: "29.3909", lng: "76.9635", speed: "45 km/h", eta: "12 min", status: "moving", passengers: 42, capacity: 50 },
  { id: "GU-02", route: "Jind → Campus", driver: "Suresh Yadav", lat: "29.3165", lng: "76.3140", speed: "0 km/h", eta: "—", status: "stopped", passengers: 35, capacity: 50 },
  { id: "GU-03", route: "Karnal → Campus", driver: "Amit Singh", lat: "29.6857", lng: "76.9905", speed: "38 km/h", eta: "25 min", status: "delayed", passengers: 48, capacity: 50 },
  { id: "GU-05", route: "Samalkha → Campus", driver: "Vikram Rao", lat: "29.2344", lng: "76.9710", speed: "50 km/h", eta: "5 min", status: "moving", passengers: 30, capacity: 50 },
];

const LiveTrackingPage = () => {
  const [selectedBus, setSelectedBus] = useState("all");

  const filteredBuses = selectedBus === "all" ? buses : buses.filter(b => b.id === selectedBus);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Live Bus Tracking</h2>
          <p className="text-sm text-muted-foreground">Real-time GPS tracking of all university buses</p>
        </div>
        <Select value={selectedBus} onValueChange={setSelectedBus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Bus" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Buses</SelectItem>
            {buses.map(b => (
              <SelectItem key={b.id} value={b.id}>{b.id} - {b.route.split(" → ")[0]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Map Placeholder */}
      <Card className="overflow-hidden">
        <div className="h-64 bg-muted relative flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-accent to-muted opacity-50" />
          <div className="relative text-center">
            <Navigation className="h-12 w-12 text-primary mx-auto mb-2 animate-pulse" />
            <p className="text-sm font-medium text-foreground">Live Map View</p>
            <p className="text-xs text-muted-foreground">GPS tracking integrated with Google Maps</p>
          </div>
          {/* Mock bus markers */}
          {filteredBuses.map((bus, i) => (
            <div key={bus.id} className="absolute" style={{ top: `${20 + i * 15}%`, left: `${15 + i * 20}%` }}>
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center shadow-lg animate-pulse">
                <Bus className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="bg-card rounded-md px-2 py-1 shadow-sm mt-1 text-xs font-medium text-foreground">{bus.id}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Bus Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBuses.map((bus) => (
          <Card key={bus.id} className="hover-lift">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                    <Bus className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{bus.id}</h3>
                    <p className="text-sm text-muted-foreground">{bus.route}</p>
                  </div>
                </div>
                <Badge variant={bus.status === "moving" ? "default" : bus.status === "delayed" ? "destructive" : "secondary"}>
                  {bus.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{bus.lat}, {bus.lng}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>ETA: {bus.eta}</span>
                </div>
                <div className="text-muted-foreground">Speed: {bus.speed}</div>
                <div className="text-muted-foreground">Driver: {bus.driver}</div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Passengers</span>
                  <span>{bus.passengers}/{bus.capacity}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full gradient-primary rounded-full transition-all" style={{ width: `${(bus.passengers / bus.capacity) * 100}%` }} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LiveTrackingPage;
