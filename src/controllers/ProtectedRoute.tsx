// src/components/ProtectedRoute.tsx
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from "../utils/supabase";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [session, setSession] = useState<any>(null); // Puedes tipar mejor si lo deseas
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return session ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
