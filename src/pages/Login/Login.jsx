import { useState } from 'react';
import joelogo from '../../assets/joelogo.png';
import loginimage from '../../assets/loginimage.png';
import { useNavigate } from 'react-router-dom';
import './login.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('https://joe-sbackend.fly.dev/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials.');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            navigate('/admin-dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-container ellipse1-container">
            <div className="login-navbar">
                <img src={joelogo} alt="Company Logo" className="login-logo" />
            </div>

            <div className="login-main-content">
                <div className="login-form-container">
                    <h2 className="login-form-title">Login</h2>
                    <p className="login-form-subtitle">Login to access your account</p>

                    <form onSubmit={handleSubmit}>
                        <div className="login-input-group">
                            <input
                                type="email"
                                id="email"
                                className="login-form-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label htmlFor="email" className="login-form-label">Email</label>
                        </div>

                        <div className="login-input-group">
                            <input
                                type="password"
                                id="password"
                                className="login-form-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label htmlFor="password" className="login-form-label">Password</label>
                        </div>


                        {error && <p className="login-form-error">{error}</p>}

                        <button type="submit" className="login-form-button">
                            Login
                        </button>
                    </form>
                </div>

                <div className="login-image-container">
                    <img
                        src={loginimage}
                        alt="Login Illustration"
                        className="login-image"
                    />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
