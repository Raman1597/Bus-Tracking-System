import { Bell, Bus, AlertTriangle, Info, CheckCircle, Megaphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const notifications = [
  { id: 1, title: "Bus GU-03 Delayed", message: "Bus GU-03 from Karnal is delayed by 15 minutes due to heavy traffic on GT Road.", type: "warning", time: "10 min ago", read: false },
  { id: 2, title: "Route 4 Diverted", message: "Route 4 (Jind → Campus) is temporarily diverted via NH-44 due to road construction. Estimated extra time: 10 min.", type: "info", time: "1 hour ago", read: false },
  { id: 3, title: "Fee Deadline Extended", message: "Transport fees due date has been extended to May 15, 2025. No late fee will be charged until the new deadline.", type: "success", time: "2 hours ago", read: true },
  { id: 4, title: "Bus Maintenance - GU-02", message: "Bus GU-02 will be under maintenance on April 15. Alternate bus GU-06 will serve Route 4.", type: "info", time: "5 hours ago", read: true },
  { id: 5, title: "Holiday Notice", message: "No transport service on April 18 (Public Holiday). Services resume April 19.", type: "warning", time: "1 day ago", read: true },
  { id: 6, title: "New Route Added", message: "Route 6 (Kaithal → Campus) is now operational starting April 22. Register via the transport office.", type: "success", time: "2 days ago", read: true },
];

const announcements = [
  { title: "Summer Schedule 2025", message: "Summer transport schedule effective from May 1. Morning pickup times revised by 30 min.", date: "Apr 12, 2025" },
  { title: "Transport Safety Drive", message: "Annual safety drill for all bus drivers scheduled for April 20. No delays expected.", date: "Apr 10, 2025" },
];

const iconMap = {
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle,
};

const NotificationsPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Notifications</h2>
          <p className="text-sm text-muted-foreground">Stay updated with transport alerts</p>
        </div>
        <Button variant="outline" size="sm">Mark all as read</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications List */}
        <div className="lg:col-span-2 space-y-3">
          {notifications.map((n) => {
            const Icon = iconMap[n.type as keyof typeof iconMap];
            return (
              <Card key={n.id} className={`hover-lift ${!n.read ? "border-primary/30 bg-accent/30" : ""}`}>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      n.type === "warning" ? "bg-warning/10" : n.type === "info" ? "bg-info/10" : "bg-success/10"
                    }`}>
                      <Icon className={`h-4 w-4 ${
                        n.type === "warning" ? "text-warning" : n.type === "info" ? "text-info" : "text-success"
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm text-foreground">{n.title}</h3>
                        {!n.read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{n.time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Announcements */}
        <Card className="h-fit hover-lift">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-primary" /> Announcements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {announcements.map((a, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/50">
                <p className="font-medium text-sm text-foreground">{a.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{a.message}</p>
                <p className="text-xs text-primary font-medium mt-2">{a.date}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotificationsPage;
