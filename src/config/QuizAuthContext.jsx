import { createContext, useContext, useState } from "react";

const QuizAuthContext = createContext();

export function useQuizAuth() {
  const ctx = useContext(QuizAuthContext);
  if (!ctx) throw new Error("useQuizAuth must be used within QuizAuthProvider");
  return ctx;
}

export function QuizAuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <QuizAuthContext.Provider value={{ user, login, logout }}>
      {children}
    </QuizAuthContext.Provider>
  );
}
