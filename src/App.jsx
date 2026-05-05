import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Login from "./pages/Login";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [games, setGames] = useState([]);
  const [aiReview, setAiReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [allGames, setAllGames] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const res = await fetch("http://localhost:5000/games");
          const data = await res.json();

          const mappedGames = data.slice(0, 20).map((game) => ({
            id: game.id,
            name: game.title,
            background_image: game.thumbnail,
          }));

          setGames(mappedGames);
          setAllGames(mappedGames);
        } catch (err) {
          console.error("Eroare API:", err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const searchGames = () => {
    if (!search) {
      setGames(allGames);
      return;
    }

    const filtered = allGames.filter((game) =>
      game.name.toLowerCase().includes(search.toLowerCase())
    );

    setGames(filtered);
  };

  const generateAIReview = async (gameName) => {
    setLoading(true);
    setAiReview("Generăm review-ul...");

    try {
      const response = await fetch("http://localhost:5000/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameName }),
      });

      const data = await response.json();
      setAiReview(data.text || "Nu s-a generat nimic 😕");
    } catch (error) {
      console.error("Eroare AI:", error);
      setAiReview("Nu merge API-ul 😬");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => signOut(auth);

  if (!user) return <Login />;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>GameRate AI 🕹️</h1>

        <p style={styles.user}>
          Salut, <strong>{user.email}</strong>
          <button onClick={handleLogout} style={styles.logout}>
            Logout
          </button>
        </p>

        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Caută un joc..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />
          <button onClick={searchGames} style={styles.searchBtn}>
            Caută
          </button>
        </div>

        {aiReview && (
          <div style={styles.review}>
            <h4 style={{ color: "#f39c12" }}>Review AI ✨</h4>
            <p>{aiReview}</p>
            <button onClick={() => setAiReview("")}>Închide</button>
          </div>
        )}

        <div style={styles.grid}>
          {games.map((game) => (
            <div key={game.id} style={styles.card}>
              <img
                src={game.background_image}
                alt={game.name}
                style={styles.image}
              />
              <h3>{game.name}</h3>

              <button
                onClick={() => generateAIReview(game.name)}
                style={styles.cardBtn}
                disabled={loading}
              >
                {loading ? "Se generează..." : "Cere Review AI ✨"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    position: "fixed",
    inset: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1a1a1a, #2c2c2c)",
  },

  container: {
    backgroundColor: "#252525",
    padding: "40px",
    borderRadius: "18px",
    width: "900px",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
    color: "white",
  },

  title: {
    textAlign: "center",
    fontSize: "36px",
    marginBottom: "10px",
  },

  user: {
    textAlign: "center",
    marginBottom: "20px",
  },

  logout: {
    marginLeft: "10px",
    cursor: "pointer",
  },

  searchBox: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "30px",
  },

  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "none",
  },

  searchBtn: {
    padding: "12px 20px",
    background: "#f39c12",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  review: {
    background: "#333",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    border: "2px solid #f39c12",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#1f1f1f",
    padding: "15px",
    borderRadius: "12px",
  },

  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "8px",
  },

  cardBtn: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    background: "#f39c12",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default App;