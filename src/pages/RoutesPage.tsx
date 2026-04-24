import { MapPin, Clock, Bus, Check, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const routes = [
  {
    id: "R1", name: "Panipat → Geeta University", bus: "GU-01", distance: "32 km", duration: "45 min", fare: "₹1,500/month",
    stops: ["Panipat Bus Stand", "Model Town", "Sector 12", "Toll Plaza", "Samalkha Bypass", "Geeta University"],
    timings: { morning: "7:30 AM", evening: "4:30 PM" },
  },
  {
    id: "R2", name: "Karnal → Geeta University", bus: "GU-03", distance: "45 km", duration: "1 hr", fare: "₹1,800/month",
    stops: ["Karnal Bus Stand", "Sector 7", "NDDH Hospital", "GT Road Junction", "Nilokheri", "Geeta University"],
    timings: { morning: "8:00 AM", evening: "5:00 PM" },
  },
  {
    id: "R3", name: "Samalkha → Geeta University", bus: "GU-05", distance: "12 km", duration: "20 min", fare: "₹800/month",
    stops: ["Samalkha Market", "Railway Station", "NH-44 Crossing", "Geeta University"],
    timings: { morning: "8:15 AM", evening: "5:15 PM" },
  },
  {
    id: "R4", name: "Jind → Geeta University", bus: "GU-02", distance: "60 km", duration: "1.5 hr", fare: "₹2,200/month",
    stops: ["Jind Bus Stand", "Narwana Road", "Safidon Turn", "Hansi Bypass", "Geeta University"],
    timings: { morning: "7:00 AM", evening: "5:30 PM" },
  },
];

const RoutesPage = () => {
  const { user, updateUser } = useUser();
  const { toast } = useToast();
  const [customRoute, setCustomRoute] = useState({ from: "", stops: "" });

  const selectRoute = (routeName: string) => {
    updateUser({ selectedRoute: routeName });
    toast({
      title: "Route Selected! 🚍",
      description: `You've selected: ${routeName}`,
    });
  };

  const handleCustomRouteRequest = () => {
    if (!customRoute.from.trim()) {
      toast({ title: "Enter your pickup location", variant: "destructive" });
      return;
    }
    toast({
      title: "Route Request Submitted! ✅",
      description: `Your request for route from ${customRoute.from} has been sent to the transport office.`,
    });
    setCustomRoute({ from: "", stops: "" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Routes & Stops</h2>
          <p className="text-sm text-muted-foreground">
            {user?.selectedRoute
              ? `Your current route: ${user.selectedRoute}`
              : "Select your daily bus route"}
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" /> Request New Route
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request a New Bus Route</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Your Pickup Location</Label>
                <Input
                  placeholder="e.g., Kurukshetra, Ambala..."
                  value={customRoute.from}
                  onChange={(e) => setCustomRoute({ ...customRoute, from: e.target.value })}
                  maxLength={100}
                />
              </div>
              <div className="space-y-2">
                <Label>Preferred Stops (optional)</Label>
                <Input
                  placeholder="e.g., Bus Stand, Railway Station..."
                  value={customRoute.stops}
                  onChange={(e) => setCustomRoute({ ...customRoute, stops: e.target.value })}
                  maxLength={200}
                />
              </div>
              <Button className="w-full gradient-primary text-primary-foreground" onClick={handleCustomRouteRequest}>
                Submit Request
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {routes.map((route) => {
          const isSelected = user?.selectedRoute === route.name;
          return (
            <Card key={route.id} className={`hover-lift border-0 shadow-sm transition-all ${isSelected ? "ring-2 ring-primary" : ""}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{route.name}</CardTitle>
                  {isSelected && <Badge className="bg-success text-success-foreground gap-1"><Check className="h-3 w-3" /> Selected</Badge>}
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{route.distance}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{route.duration}</span>
                  <span className="flex items-center gap-1"><Bus className="h-3 w-3" />{route.bus}</span>
                  <span className="font-semibold text-primary">{route.fare}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 text-xs text-muted-foreground mb-3 bg-muted/50 rounded-lg p-2">
                  <span>🌅 Morning: <strong className="text-foreground">{route.timings.morning}</strong></span>
                  <span>🌆 Evening: <strong className="text-foreground">{route.timings.evening}</strong></span>
                </div>
                <div className="relative pl-6 mb-4">
                  {route.stops.map((stop, i) => (
                    <div key={i} className="relative pb-3 last:pb-0">
                      {i < route.stops.length - 1 && (
                        <div className="absolute left-[-18px] top-3 bottom-0 w-0.5 bg-primary/20" />
                      )}
                      <div className={`absolute left-[-22px] top-1 w-3 h-3 rounded-full border-2 ${
                        i === 0 || i === route.stops.length - 1 ? "border-primary bg-primary" : "border-primary bg-card"
                      }`} />
                      <p className={`text-sm ${i === 0 || i === route.stops.length - 1 ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                        {stop}
                      </p>
                    </div>
                  ))}
                </div>
                {!isSelected ? (
                  <Button className="w-full gradient-primary text-primary-foreground" onClick={() => selectRoute(route.name)}>
                    Select This Route
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" onClick={() => updateUser({ selectedRoute: null })}>
                    Change Route
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default RoutesPage;
