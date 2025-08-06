import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border rounded px-3 py-2"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={() => login(email, password)}
        >
          Login
        </button>
      </div>
    </div>
  );
}