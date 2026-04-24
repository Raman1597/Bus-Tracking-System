import { User, Bell, Shield, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const SettingsPage = () => {
  const { user, updateUser } = useUser();
  const { toast } = useToast();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const handleSaveProfile = () => {
    if (!name.trim()) {
      toast({ title: "Name is required", variant: "destructive" });
      return;
    }
    updateUser({ name: name.trim(), email: email.trim(), phone: phone.trim() });
    toast({ title: "Profile Updated! ✅", description: "Your changes have been saved." });
  };

  const handlePasswordChange = () => {
    toast({ title: "Password Updated! ✅", description: "Your password has been changed successfully." });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center gap-2"><User className="h-4 w-4" /> Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2"><Bell className="h-4 w-4" /> Notifications</TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2"><Shield className="h-4 w-4" /> Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="hover-lift border-0 shadow-sm">
            <CardHeader><CardTitle className="text-base">Profile Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.studentId} • <span className="capitalize">{user?.role}</span></p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} maxLength={100} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={15} />
                </div>
                <div className="space-y-2">
                  <Label>Course</Label>
                  <Input value={user?.course || ""} disabled className="bg-muted/50" />
                </div>
              </div>
              <Button className="gradient-primary text-primary-foreground" onClick={handleSaveProfile}>
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="hover-lift border-0 shadow-sm">
            <CardHeader><CardTitle className="text-base">Notification Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Bus delay alerts", desc: "Get notified when your bus is delayed", default: true },
                { label: "Route changes", desc: "Alerts for route diversions and changes", default: true },
                { label: "Fee reminders", desc: "Payment due date reminders", default: true },
                { label: "Complaint updates", desc: "Status updates on your complaints", default: true },
                { label: "General announcements", desc: "Transport department announcements", default: false },
                { label: "SMS notifications", desc: "Receive alerts via SMS", default: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.default} />
                </div>
              ))}
              <Button variant="outline" onClick={() => toast({ title: "Preferences saved! ✅" })}>
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="hover-lift border-0 shadow-sm">
            <CardHeader><CardTitle className="text-base">Security Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" placeholder="Enter current password" />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" placeholder="Enter new password" />
              </div>
              <div className="space-y-2">
                <Label>Confirm New Password</Label>
                <Input type="password" placeholder="Confirm new password" />
              </div>
              <Button className="gradient-primary text-primary-foreground" onClick={handlePasswordChange}>
                <Shield className="h-4 w-4 mr-2" /> Update Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
