import { useState, useEffect, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../apis/firebase_config";
import { User, onAuthStateChanged } from "firebase/auth";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [user, setUser] = useState<User | null>(null);
  const [initialCheck, setInitialCheck] = useState(true); // 상태 초기 체크를 위한 state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        if (initialCheck) {
          alert("로그인해주세요");
        }
      }
      setInitialCheck(false);
    });

    return () => unsubscribe();
  }, [initialCheck]);

  if (!user && !initialCheck) return <Navigate to="/" />;
  return children;
}

export default ProtectedRoute;
