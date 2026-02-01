import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Home, Users, Plus, Check, Network, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const { user, usersList, login, addUser } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState('');
  const location = useLocation();

  const handleAddUser = (e) => {
    e.preventDefault();
    if (newUserName && newUserRole) {
      addUser({ name: newUserName, role: newUserRole });
      setIsAdding(false);
      setNewUserName('');
      setNewUserRole('');
    }
  };

  const navItems = [
    { icon: Home, label: 'Feed', path: '/feed' },
    { icon: Network, label: 'InkTree', path: '/inktree' },
  ];

  if (user?.role === 'Administrator') {
      navItems.push({ icon: Shield, label: 'Admin', path: '/admin' });
  }

  return (
    <div className="w-80 h-screen bg-slate-50 border-r border-slate-200 flex flex-col fixed left-0 top-0 z-20">
      <div className="p-6 border-b border-slate-100">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
            Office3
        </h1>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-medium">Institutional OS</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {/* Navigation */}
        <div className="mb-8">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Menu</h2>
            <nav className="space-y-1">
                {navItems.map((item) => (
                    <Link to={item.path} key={item.path}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            location.pathname === item.path
                            ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50'
                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/50'
                        }`}
                    >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>

        {/* User Switcher */}
        <div>
          <div className="flex items-center justify-between mb-3 px-2">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">God Mode</h2>
            <button onClick={() => setIsAdding(!isAdding)} className="text-slate-400 hover:text-indigo-600 transition-colors">
                <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {usersList.map((u) => (
              <div
                key={u.id}
                onClick={() => login(u.id)}
                className={`group flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-all ${
                    user?.id === u.id
                    ? 'bg-white shadow-md border border-slate-100 ring-1 ring-slate-200/50 scale-[1.02]'
                    : 'hover:bg-slate-100/80 border border-transparent'
                }`}
              >
                <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full bg-slate-200 object-cover" />
                <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${user?.id === u.id ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
                        {u.name}
                    </p>
                    <p className="text-xs text-slate-400 truncate">{u.role}</p>
                </div>
                {user?.id === u.id && (
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                )}
              </div>
            ))}
          </div>

          <AnimatePresence>
            {isAdding && (
                <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleAddUser}
                    className="mt-4 p-3 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
                >
                    <input
                        type="text"
                        placeholder="Name"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        className="w-full text-sm border-b border-slate-100 pb-2 mb-2 focus:outline-none focus:border-indigo-500 bg-transparent placeholder:text-slate-300"
                        autoFocus
                    />
                    <input
                        type="text"
                        placeholder="Role"
                        value={newUserRole}
                        onChange={(e) => setNewUserRole(e.target.value)}
                        className="w-full text-sm border-b border-slate-100 pb-2 mb-3 focus:outline-none focus:border-indigo-500 bg-transparent placeholder:text-slate-300"
                    />
                    <button type="submit" className="w-full py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                        Add User
                    </button>
                </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs text-slate-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              System Operational
          </div>
      </div>
    </div>
  );
}
