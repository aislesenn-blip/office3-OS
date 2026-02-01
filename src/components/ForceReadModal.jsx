import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export default function ForceReadModal({ notice, onAcknowledge }) {
  if (!notice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="bg-red-50 p-6 flex items-center gap-4 border-b border-red-100">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
                <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-red-900">Critical Notice</h2>
                <p className="text-red-700 text-sm">Action required immediately</p>
            </div>
        </div>
        <div className="p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-2">{notice.title}</h3>
            <p className="text-slate-600 leading-relaxed mb-8">
                {notice.content}
            </p>

            <button
                onClick={onAcknowledge}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
                <CheckCircle className="w-5 h-5" />
                I Acknowledge
            </button>
        </div>
      </motion.div>
    </div>
  );
}
