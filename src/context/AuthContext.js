import { createContext, useState, useEffect, useRef } from "react";

const STORAGE_KEY = "careerAI_user";
const ACTIVITY_KEY = "careerAI_lastActivity";
const INACTIVITY_LIMIT_MS = 2 * 60 * 1000;

const loadStoredUser = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const loadStoredLastActivity = () => {
  try {
    const stored = localStorage.getItem(ACTIVITY_KEY);
    return stored ? Number(stored) : null;
  } catch {
    return null;
  }
};

const isSessionExpired = () => {
  const lastActivity = loadStoredLastActivity();
  return lastActivity !== null && Date.now() - lastActivity > INACTIVITY_LIMIT_MS;
};

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = loadStoredUser();
    if (storedUser && isSessionExpired()) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(ACTIVITY_KEY);
      return null;
    }
    return storedUser;
  });
  const inactivityTimerRef = useRef(null);
  const notificationTimeoutRef = useRef(null);
  const [notification, setNotification] = useState("");

  const showNotification = (message) => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }

    setNotification(message);
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification("");
      notificationTimeoutRef.current = null;
    }, 5000);
  };

  const resetInactivity = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    localStorage.setItem(ACTIVITY_KEY, Date.now().toString());
    inactivityTimerRef.current = setTimeout(() => {
      logout();
      showNotification("You have been logged out due to inactivity.");
    }, INACTIVITY_LIMIT_MS);
  };

  const setupActivityListeners = () => {
    const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetInactivity));
    return () => events.forEach((event) => window.removeEventListener(event, resetInactivity));
  };

  useEffect(() => {
    if (user) {
      resetInactivity();
      const cleanup = setupActivityListeners();
      return cleanup;
    }

    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
  }, [user]);

  const login = (data) => {
    const userData = data?.user ? { ...data.user, token: data.token } : data;
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    localStorage.setItem(ACTIVITY_KEY, Date.now().toString());
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ACTIVITY_KEY);
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, showNotification }}>
      {children}
      {notification && (
        <div className="fixed left-1/2 top-6 z-50 inline-flex min-w-[24rem] max-w-xl -translate-x-1/2 flex-col rounded-[2rem] bg-slate-900/95 border border-white/20 px-10 py-6 shadow-[0_24px_70px_rgba(15,23,42,0.7)] text-white backdrop-blur-2xl transition-all duration-300">
          <div className="text-lg uppercase tracking-[0.25em] text-cyan-300 mb-3">Session Notice</div>
          <div className="text-2xl leading-9 font-semibold">{notification}</div>
        </div>
      )}
    </AuthContext.Provider>
  );
}