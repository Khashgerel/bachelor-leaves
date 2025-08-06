import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            if (onLogin) onLogin();
        } catch (err) {
            setError('Invalid email or password.');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <div className="error">{error}</div>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <style jsx>{`
                .login-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 60vh;
                }
                .login-form {
                    background: #fff;
                    padding: 2rem;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    width: 300px;
                }
                .login-form h2 {
                    margin-bottom: 1rem;
                }
                .login-form input {
                    padding: 0.5rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
                .login-form button {
                    padding: 0.5rem;
                    background: #1976d2;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .login-form .error {
                    color: #d32f2f;
                    font-size: 0.9rem;
                }
            `}</style>
        </div>
    );
};

export default LoginPage;