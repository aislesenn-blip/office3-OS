import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, MessageSquare, Share2, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';

export default function NoticeCard({ notice, onForceRead, onReply }) {
  const isCritical = notice.isCritical;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-2xl border ${isCritical ? 'border-red-200 bg-red-50/30' : 'border-slate-200 bg-white'} p-6 transition-all hover:shadow-md`}
    >
      {isCritical && (
        <div className="absolute top-0 right-0 p-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                <AlertCircle className="w-3 h-3" />
                Urgent
            </span>
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
             <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isCritical ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'}`}>
                <span className="font-bold text-sm">{notice.author.charAt(0)}</span>
             </div>
        </div>
        <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-slate-900 text-sm">{notice.author}</span>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-slate-400 text-xs">{format(new Date(notice.date), 'MMM d, h:mm a')}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight">{notice.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {notice.content}
            </p>

            {isCritical && (
                 <button
                    onClick={() => onForceRead(notice)}
                    className="mb-4 w-full py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
                 >
                    Read & Acknowledge
                 </button>
            )}

            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <div className="flex gap-4">
                    <button
                        onClick={() => onReply(notice)}
                        className="text-slate-400 hover:text-indigo-600 flex items-center gap-1 text-xs font-medium transition-colors"
                    >
                        <MessageSquare className="w-4 h-4" />
                        Reply
                    </button>
                    <button className="text-slate-400 hover:text-indigo-600 flex items-center gap-1 text-xs font-medium transition-colors">
                        <Share2 className="w-4 h-4" />
                        Share
                    </button>
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                    <MoreHorizontal className="w-4 h-4" />
                </button>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
