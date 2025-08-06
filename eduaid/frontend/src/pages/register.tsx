import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'student' | 'sponsor' | 'verifier' | 'admin'>('student');
  const [password, setPassword] = useState('');
  const { register } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
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
        <select
          className="w-full border rounded px-3 py-2"
          value={role}
          onChange={(e) => setRole(e.target.value as 'student' | 'sponsor' | 'verifier' | 'admin')}
        >
          <option value="student">Student</option>
          <option value="sponsor">Sponsor</option>
          <option value="verifier">Verifier</option>
          <option value="admin">Admin</option>
        </select>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={() => register({ name, email, role }, password)}
        >
          Register
        </button>
      </div>
    </div>
  );
}