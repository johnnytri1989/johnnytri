import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-pink-100">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-2xl font-bold text-pink-500">LipGlow</Link>
        <div className="flex items-center gap-3 text-sm md:text-base">
          <NavLink to="/" className="hover:text-pink-500">Shop</NavLink>
          <NavLink to="/cart" className="hover:text-pink-500">Cart</NavLink>
          {user && <NavLink to="/orders" className="hover:text-pink-500">Orders</NavLink>}
          {user?.role === 'admin' && <NavLink to="/admin" className="hover:text-pink-500">Admin</NavLink>}
          {user ? (
            <button className="rounded bg-pink-500 px-3 py-1 text-white" onClick={logout}>Logout</button>
          ) : (
            <NavLink to="/login" className="rounded bg-pink-500 px-3 py-1 text-white">Login</NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}
