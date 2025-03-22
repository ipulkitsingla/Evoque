import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/api';
import { toast } from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await auth.login({ email, password });
            if (response.success) {
                toast.success('Login successful!');
                navigate('/dashboard');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
            console.error('Login error:', error);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Admin Login</h2>
                <div className="form-group">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login; 