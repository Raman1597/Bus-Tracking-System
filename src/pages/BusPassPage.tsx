import { CreditCard, Calendar, CheckCircle, Download, QrCode, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const BusPassPage = () => {
  const { user } = useUser();
  const { toast } = useToast();

  const handleDownload = () => {
    toast({ title: "Downloading Bus Pass...", description: "Your bus pass PDF is being generated" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-foreground">My Bus Pass</h2>
        <p className="text-sm text-muted-foreground">View and manage your transport pass</p>
      </div>

      {!user?.selectedRoute && (
        <Card className="border-warning/30 bg-warning/5">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-warning flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">No route selected</p>
              <p className="text-xs text-muted-foreground">
                Please{" "}
                <Link to="/dashboard/routes" className="text-primary underline">select a route</Link>
                {" "}first to view your bus pass details.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bus Pass Card */}
        <Card className="overflow-hidden hover-lift border-0 shadow-md">
          <div className="gradient-primary p-6 text-primary-foreground relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary-foreground/5 -translate-y-8 translate-x-8" />
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-primary-foreground/5 translate-y-6 -translate-x-6" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs opacity-80 tracking-wider">GEETA UNIVERSITY</p>
                  <p className="text-lg font-bold">Transport Pass</p>
                </div>
                <CreditCard className="h-8 w-8 opacity-80" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold tracking-wider">{user?.busPassId || "GU-2024-XXXX"}</p>
                <p className="text-sm opacity-80 uppercase">{user?.name || "Student Name"}</p>
              </div>
              <div className="flex items-center justify-between mt-6 text-xs">
                <div>
                  <p className="opacity-60">Valid Till</p>
                  <p className="font-semibold text-sm">31 July 2025</p>
                </div>
                <div>
                  <p className="opacity-60">Route</p>
                  <p className="font-semibold text-sm truncate max-w-[120px]">{user?.selectedRoute?.split(" → ")[0] || "Not Selected"}</p>
                </div>
                <div>
                  <p className="opacity-60">Bus</p>
                  <p className="font-semibold text-sm">GU-01</p>
                </div>
              </div>
            </div>
          </div>
          <CardContent className="p-4 flex justify-between items-center">
            <Badge className="bg-success text-success-foreground gap-1">
              <CheckCircle className="h-3 w-3" /> Active
            </Badge>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1"><QrCode className="h-4 w-4" /> QR Code</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xs">
                  <DialogHeader><DialogTitle>Scan QR Code</DialogTitle></DialogHeader>
                  <div className="flex flex-col items-center py-6">
                    <div className="w-48 h-48 bg-foreground rounded-xl flex items-center justify-center">
                      <div className="w-40 h-40 bg-card rounded-lg grid grid-cols-5 gap-0.5 p-2">
                        {Array.from({ length: 25 }).map((_, i) => (
                          <div key={i} className={`rounded-sm ${Math.random() > 0.4 ? "bg-foreground" : "bg-card"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm font-mono text-muted-foreground mt-4">{user?.busPassId}</p>
                    <p className="text-xs text-muted-foreground">{user?.name}</p>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="sm" className="gap-1" onClick={handleDownload}>
                <Download className="h-4 w-4" /> Download
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pass Details */}
        <Card className="hover-lift border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Pass Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Student Name", value: user?.name || "—" },
              { label: "Student ID", value: user?.studentId || "—" },
              { label: "Course", value: user?.course || "—" },
              { label: "Semester", value: user?.semester || "—" },
              { label: "Route", value: user?.selectedRoute || "Not Selected" },
              { label: "Bus Number", value: "GU-01" },
              { label: "Pass Type", value: "Annual" },
              { label: "Issue Date", value: "1 August 2024" },
              { label: "Expiry Date", value: "31 July 2025" },
              { label: "Amount Paid", value: "₹18,000" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <span className="text-sm font-medium text-foreground">{item.value}</span>
              </div>
            ))}
            <Link to="/dashboard/fees">
              <Button className="w-full gradient-primary text-primary-foreground mt-4">Renew Bus Pass</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusPassPage;
