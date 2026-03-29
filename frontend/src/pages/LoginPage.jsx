import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const submit = async (e) => {
    e.preventDefault();
    const url = isRegister ? '/auth/register' : '/auth/login';
    const payload = isRegister ? form : { email: form.email, password: form.password };
    const { data } = await api.post(url, payload);
    login(data);
    navigate('/');
  };

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <form onSubmit={submit} className="space-y-4 rounded-2xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold text-pink-600">{isRegister ? 'Create account' : 'Welcome back'}</h1>
        {isRegister && (
          <input className="w-full rounded border p-2" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        )}
        <input className="w-full rounded border p-2" placeholder="Email" type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full rounded border p-2" placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="w-full rounded bg-pink-500 py-2 text-white">{isRegister ? 'Register' : 'Login'}</button>
        <button type="button" className="w-full text-sm text-pink-600" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Already have an account? Login' : 'No account? Register'}
        </button>
      </form>
    </main>
  );
}
