import { MessageSquareWarning, Send, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";

interface Complaint {
  id: string;
  date: string;
  subject: string;
  category: string;
  status: string;
}

const initialComplaints: Complaint[] = [
  { id: "CMP001", date: "10 Apr 2025", subject: "Bus GU-03 late by 30 mins", category: "Delay", status: "resolved" },
  { id: "CMP002", date: "05 Apr 2025", subject: "Rude behavior by conductor", category: "Staff", status: "in-progress" },
  { id: "CMP003", date: "28 Mar 2025", subject: "AC not working in GU-01", category: "Maintenance", status: "pending" },
];

const ComplaintsPage = () => {
  const { toast } = useToast();
  const { user } = useUser();
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!category) {
      toast({ title: "Select a category", variant: "destructive" });
      return;
    }
    if (!subject.trim()) {
      toast({ title: "Enter a subject", variant: "destructive" });
      return;
    }
    if (!description.trim()) {
      toast({ title: "Enter complaint details", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    
    const newComplaint: Complaint = {
      id: `CMP${String(complaints.length + 1).padStart(3, "0")}`,
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      subject: subject.trim(),
      category: category.charAt(0).toUpperCase() + category.slice(1),
      status: "pending",
    };

    setComplaints([newComplaint, ...complaints]);
    setSubject("");
    setCategory("");
    setDescription("");
    setIsSubmitting(false);

    toast({
      title: "Complaint Submitted! ✅",
      description: `Your complaint ${newComplaint.id} has been registered. We'll update you soon.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-foreground">Complaints & Support</h2>
        <p className="text-sm text-muted-foreground">Raise issues and track complaint status • {user?.name}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Raise Complaint */}
        <Card className="hover-lift border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <MessageSquareWarning className="h-5 w-5 text-primary" /> Raise a Complaint
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="delay">🕐 Bus Delay</SelectItem>
                  <SelectItem value="staff">👤 Staff Behavior</SelectItem>
                  <SelectItem value="maintenance">🔧 Bus Maintenance</SelectItem>
                  <SelectItem value="route">🗺️ Route Issue</SelectItem>
                  <SelectItem value="safety">⚠️ Safety Concern</SelectItem>
                  <SelectItem value="other">📋 Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Subject *</Label>
              <Input placeholder="Brief description of the issue" value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={200} />
            </div>
            <div className="space-y-2">
              <Label>Details *</Label>
              <Textarea placeholder="Provide detailed information..." rows={4} value={description} onChange={(e) => setDescription(e.target.value)} maxLength={1000} />
              <p className="text-xs text-muted-foreground text-right">{description.length}/1000</p>
            </div>
            <Button
              className="w-full gradient-primary text-primary-foreground"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : (
                <><Send className="h-4 w-4 mr-2" /> Submit Complaint</>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Complaint History */}
        <Card className="hover-lift border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">My Complaints ({complaints.length})</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
            {complaints.map((c) => (
              <div key={c.id} className="p-4 rounded-xl border border-border hover:bg-muted/30 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm text-foreground">{c.subject}</p>
                    <p className="text-xs text-muted-foreground">{c.id} • {c.date}</p>
                  </div>
                  <Badge variant="outline" className="capitalize text-xs">{c.category}</Badge>
                </div>
                <Badge className={`text-xs border-0 gap-1 ${
                  c.status === "resolved" ? "bg-success/10 text-success" :
                  c.status === "in-progress" ? "bg-info/10 text-info" :
                  "bg-warning/10 text-warning"
                }`}>
                  {c.status === "resolved" ? <CheckCircle className="h-3 w-3" /> :
                   c.status === "in-progress" ? <Clock className="h-3 w-3" /> :
                   <AlertCircle className="h-3 w-3" />}
                  {c.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComplaintsPage;
