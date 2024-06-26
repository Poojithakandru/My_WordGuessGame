import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"; 

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            navigate('/game', { state: { email: userCredential.user.email } });
        } catch (error) {
            console.log(error);
            if (error.code === 'auth/invalid-credential') {
                setError('Failed to login. Please check your credentials.');
            } else {
                setError(error.message);
            }
        }
    };
    return (
        <div className="container">
            <br/>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required 
                />
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required 
                />
                <br/>
                <button type="submit">Login</button>
            </form>
            {error && <p className="error">{error}</p>}
            <br/>
            Don't have an account?<button className="Register" onClick={() => navigate("/register")}>
                 Register
            </button>
        </div>
    );
};

export default Login;
