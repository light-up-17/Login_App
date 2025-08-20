import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await api("/auth/me");
        setUser(res.user); // ✅ using res.user
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    })();
  }, []);

  const handleLogout = async () => {
    try {
      await api("/auth/logout", { method: "POST" });
      setUser(null);
      navigate("/login"); // redirect to login page
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "64px auto" }}>
      <h1>Dashboard</h1>
      {user ? (
        <>
          <p>
            Welcome back, <strong>{user.name}</strong>!
          </p>
          <button
            onClick={handleLogout}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              background: "tomato",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <p>Loading user...</p>
      )}
    </div>
  );
}
