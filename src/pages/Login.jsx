import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            if (isRegister) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (err) {
            const code = err.code;

            if (code === "auth/invalid-credential") {
                setError("Email sau parolă greșită.");
            } else if (code === "auth/user-not-found") {
                setError("Nu există cont cu acest email.");
            } else if (code === "auth/wrong-password") {
                setError("Parolă incorectă.");
            } else if (code === "auth/email-already-in-use") {
                setError("Emailul este deja folosit.");
            } else if (code === "auth/weak-password") {
                setError("Parola trebuie să aibă minim 6 caractere.");
            } else {
                setError("A apărut o eroare. Încearcă din nou.");
            }
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={{ marginBottom: "25px", fontSize: "40px" }}>
                    {isRegister ? "Creează cont" : "Login"}
                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                />

                <input
                    type="password"
                    placeholder="Parolă"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />

                {error && <p style={styles.error}>{error}</p>}

                <button
                    type="submit"
                    style={styles.button}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#e67e22")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#f39c12")}
                >
                    {isRegister ? "Înregistrează-te" : "Login"}
                </button>

                <p style={styles.toggle} onClick={() => setIsRegister(!isRegister)}>
                    {isRegister
                        ? "Ai deja cont? Login"
                        : "Nu ai cont? Creează unul"}
                </p>
            </form>
        </div>
    );
}

const styles = {
    container: {
        position: "fixed",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1a1a1a, #2c2c2c)",
    },

    form: {
        backgroundColor: "#252525",
        padding: "55px",
        borderRadius: "18px",
        width: "420px",
        textAlign: "center",
        color: "white",
        boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
    },

    input: {
        width: "100%",
        padding: "14px",
        margin: "12px 0",
        borderRadius: "10px",
        border: "1px solid #444",
        backgroundColor: "#1a1a1a",
        color: "white",
        fontSize: "30px",
    },

    button: {
        width: "100%",
        padding: "14px",
        backgroundColor: "#f39c12",
        border: "none",
        borderRadius: "10px",
        fontWeight: "bold",
        fontSize: "25px",
        cursor: "pointer",
        marginTop: "12px",
    },

    error: {
        color: "#ff4d4d",
        fontSize: "0.95rem",
        marginTop: "5px",
    },

    toggle: {
        marginTop: "18px",
        cursor: "pointer",
        fontSize: "1.5rem",
        color: "#f39c12",
    },
};

export default Login;