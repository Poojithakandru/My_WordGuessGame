import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            navigate('/login', { state: { email: userCredential.user.email } });
        } catch (error) {
            console.log(error);
            if (error.code === 'auth/email-already-in-use') {
                setError('Failed to register. Please try again.');
            } else {
                setError(error.message);
            }
        }
    };

    return (
        <div className="container">
            <br/>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
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
                {error && <p className="error">{error}</p>}
                <button className="Register" type="submit">Register</button>
            </form>
            
            Already have an account?<button className="Login" onClick={() => navigate("/login")}>Login </button>
        </div>
    );
};

export default Register;
