import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "student" | "driver" | "admin";

interface UserData {
  name: string;
  email: string;
  role: UserRole;
  studentId: string;
  course: string;
  semester: string;
  phone: string;
  selectedRoute: string | null;
  busPassId: string;
}

interface UserContextType {
  user: UserData | null;
  login: (name: string, email: string, role: UserRole) => void;
  logout: () => void;
  updateUser: (updates: Partial<UserData>) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(() => {
    const saved = localStorage.getItem("gu_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (name: string, email: string, role: UserRole) => {
    const newUser: UserData = {
      name,
      email,
      role,
      studentId: "GU2024CSE0847",
      course: "B.Tech CSE",
      semester: "4th Semester",
      phone: "+91 98765 43210",
      selectedRoute: null,
      busPassId: "GU-2024-0847",
    };
    setUser(newUser);
    localStorage.setItem("gu_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("gu_user");
  };

  const updateUser = (updates: Partial<UserData>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem("gu_user", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
