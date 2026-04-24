import { Bus, MapPin, Calendar, CreditCard, Bell, Megaphone, Wrench, TrendingUp, Users, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

const stats = [
  { label: "Active Buses", value: "12", icon: Bus, change: "+2 today", color: "bg-primary/10 text-primary" },
  { label: "Students Enrolled", value: "1,240", icon: Users, change: "98% active", color: "bg-info/10 text-info" },
  { label: "Routes Active", value: "8", icon: MapPin, change: "All operational", color: "bg-success/10 text-success" },
  { label: "On-Time Rate", value: "94%", icon: TrendingUp, change: "+3% this week", color: "bg-warning/10 text-warning" },
];

const liveBuses = [
  { number: "GU-01", route: "Panipat → Campus", location: "Near Toll Plaza", eta: "12 min", status: "on-time" },
  { number: "GU-03", route: "Karnal → Campus", location: "GT Road", eta: "25 min", status: "delayed" },
  { number: "GU-05", route: "Samalkha → Campus", location: "At Bus Stand", eta: "5 min", status: "on-time" },
];

const schedule = [
  { time: "7:30 AM", route: "Panipat → Campus", bus: "GU-01" },
  { time: "8:00 AM", route: "Karnal → Campus", bus: "GU-03" },
  { time: "8:15 AM", route: "Samalkha → Campus", bus: "GU-05" },
  { time: "4:30 PM", route: "Campus → Panipat", bus: "GU-01" },
  { time: "5:00 PM", route: "Campus → Karnal", bus: "GU-03" },
];

const notifications = [
  { text: "Bus GU-03 delayed by 15 mins due to traffic", type: "warning", time: "10 min ago" },
  { text: "Route 4 temporarily diverted via NH-44", type: "info", time: "1 hour ago" },
  { text: "Transport fees due date extended to May 15", type: "success", time: "2 hours ago" },
];

const calendarEvents = [
  { date: "Apr 15", event: "Bus Maintenance - GU-02", type: "maintenance" },
  { date: "Apr 18", event: "Holiday - No Service", type: "holiday" },
  { date: "Apr 20", event: "Route 3 Time Change", type: "change" },
  { date: "Apr 25", event: "Fee Payment Deadline", type: "deadline" },
];

const DashboardHome = () => {
  const { user } = useUser();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="gradient-primary rounded-2xl p-6 text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-primary-foreground/5 -translate-y-12 translate-x-12" />
        <div className="absolute bottom-0 left-1/2 w-32 h-32 rounded-full bg-primary-foreground/5 translate-y-8" />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold">Good Morning, {user?.name || "Student"}! 🎓</h2>
          <p className="text-primary-foreground/80 mt-1">
            {user?.selectedRoute
              ? `Your bus is on route: ${user.selectedRoute}`
              : "Select your bus route to get started"}
          </p>
          {!user?.selectedRoute && (
            <Link to="/dashboard/routes">
              <Button variant="secondary" size="sm" className="mt-3">
                Select Route <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover-lift border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  <p className="text-xs text-primary mt-1 font-medium">{stat.change}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Bus Status */}
        <Card className="lg:col-span-2 hover-lift border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                Live Bus Status
              </CardTitle>
              <Link to="/dashboard/tracking">
                <Button variant="ghost" size="sm" className="text-primary text-xs">View All →</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {liveBuses.map((bus) => (
              <Link to="/dashboard/tracking" key={bus.number}>
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-accent/50 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Bus className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{bus.number}</p>
                      <p className="text-xs text-muted-foreground">{bus.route}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={bus.status === "on-time" ? "default" : "destructive"} className="text-xs">
                      {bus.status === "on-time" ? "✓ On Time" : "⚠ Delayed"}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">ETA: {bus.eta}</p>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="hover-lift border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" /> Alerts
              </CardTitle>
              <Link to="/dashboard/notifications">
                <Button variant="ghost" size="sm" className="text-primary text-xs">All →</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.map((n, i) => (
              <Link to="/dashboard/notifications" key={i}>
                <div className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    n.type === "warning" ? "bg-warning" : n.type === "info" ? "bg-info" : "bg-success"
                  }`} />
                  <div>
                    <p className="text-sm text-foreground leading-tight">{n.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card className="lg:col-span-2 hover-lift border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" /> Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {schedule.map((s, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2 min-w-[80px]">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    <span className="text-sm font-semibold text-foreground">{s.time}</span>
                  </div>
                  <span className="text-sm text-foreground flex-1">{s.route}</span>
                  <Badge variant="outline" className="text-xs font-mono">{s.bus}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Calendar Events */}
        <Card className="hover-lift border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" /> Upcoming
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {calendarEvents.map((e, i) => (
              <div key={i} className="flex items-start gap-3 p-2 hover:bg-muted/30 rounded-lg transition-colors">
                <div className="text-center min-w-[44px] bg-accent rounded-lg p-1.5">
                  <p className="text-[10px] text-muted-foreground leading-tight">{e.date.split(" ")[0]}</p>
                  <p className="text-base font-bold text-primary leading-tight">{e.date.split(" ")[1]}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground">{e.event}</p>
                  <Badge variant="outline" className="text-[10px] mt-1 capitalize">{e.type}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: MapPin, label: "Track My Bus", path: "/dashboard/tracking", color: "from-primary to-success" },
          { icon: CreditCard, label: "My Bus Pass", path: "/dashboard/bus-pass", color: "from-info to-primary" },
          { icon: Wrench, label: "Raise Complaint", path: "/dashboard/complaints", color: "from-warning to-destructive" },
          { icon: Megaphone, label: "Pay Fees", path: "/dashboard/fees", color: "from-success to-primary" },
        ].map((action) => (
          <Link to={action.path} key={action.label}>
            <Card className="hover-lift cursor-pointer group border-0 shadow-sm overflow-hidden">
              <CardContent className="p-4 text-center relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                <action.icon className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-foreground">{action.label}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
