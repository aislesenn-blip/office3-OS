import React, { useState } from 'react';
import { NOTICES } from '../data/mockData';
import NoticeCard from '../components/NoticeCard';
import ForceReadModal from '../components/ForceReadModal';
import DMDrawer from '../components/DMDrawer';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Feed() {
  const [readingNotice, setReadingNotice] = useState(null);
  const [replyingNotice, setReplyingNotice] = useState(null);
  const { user } = useAuth();

  const handleForceRead = (notice) => {
    setReadingNotice(notice);
  };

  const handleReply = (notice) => {
    setReplyingNotice(notice);
  };

  const handleAcknowledge = () => {
    setReadingNotice(null);
  };

  return (
    <div className="relative">
      <header className="mb-8">
         <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Feed</h1>
         <p className="text-slate-500 mt-1">Updates for {user?.name}</p>
      </header>

      <div className="space-y-6">
        {NOTICES.map((notice) => (
          <NoticeCard
            key={notice.id}
            notice={notice}
            onForceRead={handleForceRead}
            onReply={handleReply}
          />
        ))}
      </div>

      <AnimatePresence>
        {readingNotice && (
            <ForceReadModal
                notice={readingNotice}
                onAcknowledge={handleAcknowledge}
            />
        )}
        {replyingNotice && (
            <DMDrawer
                notice={replyingNotice}
                onClose={() => setReplyingNotice(null)}
            />
        )}
      </AnimatePresence>
    </div>
  );
}
