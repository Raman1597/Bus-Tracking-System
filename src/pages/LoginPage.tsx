import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bus, GraduationCap, Shield, User, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser, UserRole } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/geeta-university-logo.png";

const roles = [
  { id: "student" as UserRole, label: "Student", icon: GraduationCap, desc: "Access bus pass, tracking & schedule" },
  { id: "driver" as UserRole, label: "Driver", icon: Bus, desc: "Manage routes & report status" },
  { id: "admin" as UserRole, label: "Admin", icon: Shield, desc: "Full transport management" },
];

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({ title: "Name required", description: "Please enter your full name", variant: "destructive" });
      return;
    }
    if (!email.trim()) {
      toast({ title: "Email required", description: "Please enter your email or student ID", variant: "destructive" });
      return;
    }
    if (!password.trim()) {
      toast({ title: "Password required", description: "Please enter your password", variant: "destructive" });
      return;
    }
    login(name.trim(), email.trim(), selectedRole);
    toast({ title: "Welcome!", description: `Logged in as ${name.trim()}` });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary flex-col justify-center items-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-primary-foreground/20 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-primary-foreground/10 blur-3xl" />
        </div>
        <div className="relative z-10 text-center">
          <img src={logo} alt="Geeta University" width={120} height={120} className="mx-auto mb-6 rounded-full bg-primary-foreground/10 p-2" />
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">Geeta University</h1>
          <p className="text-primary-foreground/80 text-lg mb-8">Transport Management System</p>
          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 max-w-sm">
            <p className="text-primary-foreground/90 text-sm leading-relaxed">
              Track your bus in real-time, manage your bus pass, view schedules, and stay updated with transport notifications.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-xs mx-auto">
            {[
              { value: "12", label: "Buses" },
              { value: "1.2K+", label: "Students" },
              { value: "8", label: "Routes" },
            ].map((s) => (
              <div key={s.label} className="bg-primary-foreground/10 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-primary-foreground">{s.value}</p>
                <p className="text-xs text-primary-foreground/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md animate-fade-in">
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <img src={logo} alt="Geeta University" width={48} height={48} className="rounded-full" />
            <h1 className="text-xl font-bold text-foreground">Geeta University TMS</h1>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-1">Welcome back</h2>
          <p className="text-muted-foreground mb-6">Sign in to your transport portal</p>

          {/* Role Selection */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200 ${
                  selectedRole === role.id
                    ? "border-primary bg-accent text-accent-foreground shadow-sm scale-105"
                    : "border-border hover:border-primary/30 text-muted-foreground hover:text-foreground"
                }`}
              >
                <role.icon className="h-5 w-5" />
                <span className="text-xs font-medium">{role.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11"
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email / Student ID</Label>
              <Input
                id="email"
                type="text"
                placeholder={selectedRole === "student" ? "Enter student ID or email" : "Enter your email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
                maxLength={255}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                Remember me
              </label>
              <a href="#" className="text-primary hover:underline font-medium">Forgot password?</a>
            </div>
            <Button type="submit" className="w-full h-11 text-base font-semibold gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
              Sign In as {roles.find(r => r.id === selectedRole)?.label}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <a href="#" className="text-primary font-medium hover:underline">Contact Admin</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
