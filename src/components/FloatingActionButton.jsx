import React, { useState } from 'react';
import { Plus, DollarSign, Calendar, AlertOctagon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RequestModal from './RequestModal';

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const actions = [
    { icon: AlertOctagon, label: 'Report Issue', color: 'bg-red-500', type: 'Report Issue' },
    { icon: Calendar, label: 'Request Leave', color: 'bg-indigo-500', type: 'Request Leave' },
    { icon: DollarSign, label: 'Salary Advance', color: 'bg-emerald-500', type: 'Salary Advance' },
  ];

  const handleActionClick = (type) => {
    setModalType(type);
    setIsOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-3">
        <AnimatePresence>
          {isOpen && (
            <div className="flex flex-col gap-3 mb-2">
              {actions.map((action, index) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.8 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleActionClick(action.type)}
                  className="flex items-center gap-3 pr-2 pl-4 py-2 bg-white rounded-full shadow-lg border border-slate-100 group hover:pr-4 transition-all"
                >
                  <span className="text-sm font-medium text-slate-700">{action.label}</span>
                  <div className={`w-8 h-8 rounded-full ${action.color} text-white flex items-center justify-center shadow-sm`}>
                    <action.icon className="w-4 h-4" />
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white transition-all transform hover:scale-105 active:scale-95 ${isOpen ? 'bg-slate-800 rotate-45' : 'bg-indigo-600'}`}
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {modalType && (
          <RequestModal
            type={modalType}
            onClose={() => setModalType(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
