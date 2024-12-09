import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import backgroundImage from '../assets/bg image.jpg';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [hubdbData, setHubdbData] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const ACCOUNT_ID = "43983695";
    const TABLE_ID = "100178944";

    useEffect(() => {
        const fetchHubDBData = async () => {
            try {
                const response = await axios.get(
                    `https://api.hubapi.com/cms/v3/hubdb/tables/${TABLE_ID}/rows?portalId=${ACCOUNT_ID}`
                );
                const data = response.data.results;
                setHubdbData(data);
                console.log('Fetched HubDB Data:', data);
            } catch (error) {
                console.error("Error fetching HubDB data:", error);
            }
        };

        fetchHubDBData();
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        const user = hubdbData.find(row => 
            row.values.email === email && row.values.password === password
        );

        if (user) {
            setIsAuthenticated(true);
            navigate("/course"); // Redirect to course page on successful login
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '100vh' }}>
            <div className="login-form">
                <div className="logo-icon">USER LOGIN </div>
                <h2>Welcome</h2>

                {isAuthenticated ? (
                    <p>You are logged in!</p>
                ) : (
                    <>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        <button className="login-button" onClick={handleLogin}>LOGIN</button>

                        <div className="signup-link">
                            Don’t have an account? <a href="/signup">Sign up</a>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login;
