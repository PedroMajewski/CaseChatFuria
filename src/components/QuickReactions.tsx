'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '@/lib/firebaseConfig';
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  DocumentData,
} from 'firebase/firestore';

const reactions = [
  { emoji: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDM0eGk2c2o1MGxsc2VtZXJreWN0eXkxem5lNmU4ZmI2bjJ4cXZodyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9ZQ/J2awouDsf23R2vo2p5/giphy.gif', label: 'fire' },
  { emoji: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHdlNGh6bTZ4MWhmMGJpNTFnazE5N3Z1NWpqOW55a3h2d3BoN3oweiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/laEy0xWBQWWVkuWM1R/giphy.gif', label: 'clap' },
  { emoji: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG1hbjdjbDNnb2pwbG9kOGdicTA3dHVhdHY0anByMHF4aXk0djMyOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9ZQ/ViHbdDMcIOeLeblrbq/giphy.gif', label: 'cry' },
];

const REACTION_TTL = 2000; 
const TIME_WINDOW = 10 * 1000; 

type LiveReaction = {
  id: string;
  emoji: string;
};

export default function QuickReactions({ chatRoomId }: { chatRoomId: string }) {
  const [visibleReactions, setVisibleReactions] = useState<LiveReaction[]>([]);

  const handleReaction = async (emoji: string) => {
    const ref = collection(db, 'reactions', chatRoomId, 'itens');
  
    const localId = `local-${Date.now()}`;
  
    setVisibleReactions((prev) => [...prev, { id: localId, emoji }]);
  
    setTimeout(() => {
      setVisibleReactions((prev) => prev.filter((r) => r.id !== localId));
    }, REACTION_TTL);
  
    await addDoc(ref, {
      emoji,
      timestamp: serverTimestamp(),
    });
  }

  useEffect(() => {
    const ref = collection(db, 'reactions', chatRoomId, 'itens');

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const now = Date.now();

      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const data: DocumentData = change.doc.data();
          const emoji = data.emoji;
          const id = change.doc.id;
          const timestamp = data.timestamp?.toDate();

          if (!timestamp || now - timestamp.getTime() > TIME_WINDOW) return;

          setVisibleReactions((prev) => [...prev, { id, emoji }]);

          setTimeout(() => {
            setVisibleReactions((prev) => prev.filter((r) => r.id !== id));
          }, REACTION_TTL);
        }
      });
    });

    return () => unsubscribe();
  }, [chatRoomId]);

  return (
    <div className="relative w-full">
      {/* Botões de reação */}
      <div className="flex gap-2 justify-center mt-4">
        {reactions.map((reaction) => (
          <button
            key={reaction.label}
            className="w-10 h-10"
            onClick={() => handleReaction(reaction.emoji)}
          >
            <img
              src={reaction.emoji}
              alt={reaction.label}
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>

      {/* Animações flutuantes */}
      <div className="absolute inset-0 pointer-events-none z-50">
        <AnimatePresence>
          {visibleReactions.map(({ id, emoji }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: -150, scale: 1 }}
              exit={{ opacity: 0, y: -200, scale: 0.5 }}
              transition={{ duration: 1 }}
              className="absolute left-1/2 transform -translate-x-1/2"
            >
              <img
                src={emoji}
                alt="reaction"
                className="w-12 h-12 object-contain drop-shadow-md"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
