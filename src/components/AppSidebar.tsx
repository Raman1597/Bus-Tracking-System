import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, MapPin, Route, CreditCard, IndianRupee,
  MessageSquareWarning, Bell, Settings, LogOut, Bus, ChevronLeft, ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import logo from "@/assets/geeta-university-logo.png";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Live Bus Tracking", icon: MapPin, path: "/dashboard/tracking" },
  { label: "Routes & Stops", icon: Route, path: "/dashboard/routes" },
  { label: "My Bus Pass", icon: CreditCard, path: "/dashboard/bus-pass" },
  { label: "Transport Fees", icon: IndianRupee, path: "/dashboard/fees" },
  { label: "Complaints", icon: MessageSquareWarning, path: "/dashboard/complaints" },
  { label: "Notifications", icon: Bell, path: "/dashboard/notifications" },
  { label: "Settings", icon: Settings, path: "/dashboard/settings" },
];

const AppSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className={`h-screen sticky top-0 gradient-primary flex flex-col transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}>
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 border-b border-primary-foreground/10">
        <img src={logo} alt="Geeta University" width={40} height={40} className="rounded-full bg-primary-foreground/10 p-0.5 flex-shrink-0" />
        {!collapsed && (
          <div className="overflow-hidden">
            <h2 className="text-sm font-bold text-primary-foreground truncate">Geeta University</h2>
            <p className="text-xs text-primary-foreground/70">Transport Portal</p>
          </div>
        )}
      </div>

      {/* User info */}
      {!collapsed && user && (
        <div className="px-4 py-3 border-b border-primary-foreground/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-sm font-bold text-primary-foreground">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-primary-foreground truncate">{user.name}</p>
              <p className="text-xs text-primary-foreground/60 capitalize">{user.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Menu */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path === "/dashboard" && location.pathname === "/dashboard");
          const exactActive = item.path === "/dashboard" ? location.pathname === "/dashboard" : location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                exactActive
                  ? "bg-primary-foreground/20 text-primary-foreground font-semibold shadow-sm"
                  : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm truncate">{item.label}</span>}
              {exactActive && !collapsed && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-primary-foreground/10 space-y-1">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-all w-full"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm">Logout</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-primary-foreground/50 hover:text-primary-foreground/80 transition-all w-full"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
