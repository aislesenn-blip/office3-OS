import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, XCircle, Clock, FileText } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminDashboard() {
  const { user, requests } = useAuth();

  if (user?.role !== 'Administrator') {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
             <XCircle className="w-8 h-8 text-slate-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Access Denied</h2>
        <p className="text-slate-500 mt-2">You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div>
      <header className="mb-8">
         <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Dashboard</h1>
         <p className="text-slate-500 mt-1">Manage staff requests and approvals</p>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Recent Requests</h2>
            <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-lg">{requests.length} Pending</span>
        </div>

        <div className="divide-y divide-slate-100">
            {requests.length === 0 ? (
                <div className="p-8 text-center text-slate-500">No requests found.</div>
            ) : (
                requests.map((req) => (
                    <div key={req.id} className="p-6 hover:bg-slate-50/50 transition-colors flex items-center gap-4">
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                             req.status === 'Approved' ? 'bg-green-100 text-green-600' :
                             req.status === 'Rejected' ? 'bg-red-100 text-red-600' :
                             'bg-amber-100 text-amber-600'
                         }`}>
                             {req.status === 'Approved' ? <CheckCircle className="w-5 h-5" /> :
                              req.status === 'Rejected' ? <XCircle className="w-5 h-5" /> :
                              <Clock className="w-5 h-5" />}
                         </div>

                         <div className="flex-1 min-w-0">
                             <div className="flex items-center justify-between mb-1">
                                 <h3 className="text-sm font-bold text-slate-900">{req.type}</h3>
                                 <span className="text-xs text-slate-400">{format(new Date(req.date), 'MMM d, yyyy')}</span>
                             </div>
                             <p className="text-sm text-slate-600 truncate">
                                {req.type === 'Salary Advance' && `Amount: ${req.amount}`}
                                {req.type === 'Report Issue' && `${req.location}: ${req.description}`}
                                {req.type === 'Request Leave' && `${req.reason}: ${req.startDate} to ${req.endDate}`}
                             </p>
                             <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">ID: {req.id}</span>
                                {req.requestor && <span className="text-xs text-slate-400">by User {req.requestor}</span>}
                             </div>
                         </div>

                         <div className="flex items-center gap-2">
                             <button className="p-2 hover:bg-green-100 text-slate-400 hover:text-green-600 rounded-lg transition-colors">
                                 <CheckCircle className="w-5 h-5" />
                             </button>
                             <button className="p-2 hover:bg-red-100 text-slate-400 hover:text-red-600 rounded-lg transition-colors">
                                 <XCircle className="w-5 h-5" />
                             </button>
                         </div>
                    </div>
                ))
            )}
        </div>
      </div>
    </div>
  );
}
