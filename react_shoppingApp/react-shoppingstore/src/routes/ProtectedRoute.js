import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../apis/firebase_config";
import { onAuthStateChanged } from "firebase/auth";

function ProtectedRoute({ children }) {
	const [user, setUser] = useState(null);
	const [initialCheck, setInitialCheck] = useState(true); // 상태 초기 체크를 위한 state

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			if (currentUser) {
				setUser(currentUser);
			} else {
				setUser(null);
				if (initialCheck) {
					// 첫번째 체크일 때만 알림을 보냅니다.
					alert("로그인해주세요"); // 사용자에게 로그인해야 함을 알림
				}
			}
			setInitialCheck(false); // 초기 체크가 끝났음을 나타냅니다.
		});

		return () => unsubscribe();
	}, [initialCheck]);

	if (!user && !initialCheck) return <Navigate to="/" />;
	return children;
}

export default ProtectedRoute;
