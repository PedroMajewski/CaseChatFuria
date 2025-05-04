// components/EventOverlay.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';

type EventType = '1v1' | 'clutch' | 'ace';

interface EventOverlayProps {
  chatRoomId: string;
  onTitleUpdate: (title: string | null) => void;
}

interface EventData {
  id: string;
  type: EventType;
  title: string;
  startAt: Date;
  duration: number;
}

const eventStyles: Record<EventType, string> = {
  '1v1': 'bg-blue-500/60',
  'clutch': 'bg-red-600/60',
  'ace': 'bg-yellow-400/60',
};

const EventOverlay = ({ chatRoomId, onTitleUpdate }: EventOverlayProps) => {
  const [activeEvent, setActiveEvent] = useState<EventData | null>(null);

  useEffect(() => {
    const ref = collection(db, 'chatEvents', chatRoomId, 'eventos');

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const now = Date.now();

      snapshot.docChanges().forEach((change) => {
        const data = change.doc.data();
        const startAt = data.startAt?.toDate?.();
        const duration = data.duration || 5000;
        const type = data.type as EventType;
        const title = data.title || type.toUpperCase();

        if (!startAt) return;

        const startTime = startAt.getTime();
        const endTime = startTime + duration;

        if (now >= startTime && now <= endTime) {
          const event: EventData = {
            id: change.doc.id,
            type,
            title,
            startAt,
            duration,
          };

          setActiveEvent(event);
          onTitleUpdate(title); // Atualiza o título do chat

          // Remove overlay visual depois de 3s (efeito rápido)
          setTimeout(() => {
            setActiveEvent(null);
          }, 3000);

          // Remove título depois da duração total
          setTimeout(() => {
            onTitleUpdate(null);
          }, endTime - now);
        }
      });
    });

    return () => unsubscribe();
  }, [chatRoomId, onTitleUpdate]);

  return (
    <AnimatePresence>
      {activeEvent && (
        <motion.div
          key={activeEvent.id}
          className={`fixed inset-0 z-50 flex items-center justify-center text-white text-6xl font-bold ${eventStyles[activeEvent.type]} backdrop-blur-md pointer-events-none`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {activeEvent.type.toUpperCase()}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventOverlay;
