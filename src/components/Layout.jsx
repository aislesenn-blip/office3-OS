import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import FloatingActionButton from './FloatingActionButton';

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar />
      <main className="flex-1 ml-80 min-h-screen relative">
        <div className="max-w-3xl mx-auto py-12 px-8">
            <Outlet />
        </div>
        <FloatingActionButton />
      </main>
    </div>
  );
}
