import { Bell, Search, User, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const DashboardHeader = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-10">
      <div>
        <h1 className="text-lg font-semibold text-foreground">Welcome, {user?.name || "Student"}! 👋</h1>
        <p className="text-xs text-muted-foreground">Geeta University Transport Portal • <span className="capitalize">{user?.role}</span></p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-9 w-48 h-9 bg-muted/50" />
        </div>
        <Link to="/dashboard/notifications">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-foreground leading-tight">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
          <LogOut className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
