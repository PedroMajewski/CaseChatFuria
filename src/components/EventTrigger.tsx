import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EventOverlayProps {
  event: string | null;
  gif?: string | null;
}

const EventOverlay = ({ event, gif }: EventOverlayProps) => {
  return (
    <AnimatePresence>
      {event && (
        <motion.div
          className={`fixed inset-0 z-50 flex items-center justify-center text-center text-white text-5xl font-bold bg-black/60 backdrop-blur-md`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {event}

          {gif && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full pointer-events-none">
              <img
                src={gif}
                alt="event gif"
                className="w-full object-contain mx-auto"
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const EventTrigger = ({ chatRoomId }: { chatRoomId: string }) => {
  const [currentEvent, setCurrentEvent] = useState<string | null>(null);
  const [currentGif, setCurrentGif] = useState<string | null>(null);

  useEffect(() => {
    const EVENTS = [
      {
        type: '1v1',
        at: 35,
        duration: 5,
        title: 'KSCERATO está em um 1v1',
        gif: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDRvNHB6b2F0ajdhNDZoOGU1dXJ2cHJuZzdiajg5cmt1a2piMnlkOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3o7aD3RScly3FyZwQg/giphy.gif',
      },
      {
        type: 'clutch',
        at: 70,
        duration: 5,
        title: 'Clutch de FalleN',
        gif: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDRvNHB6b2F0ajdhNDZoOGU1dXJ2cHJuZzdiajg5cmt1a2piMnlkOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3o7aD3RScly3FyZwQg/giphy.gif',
      },
      {
        type: 'ace',
        at: 105,
        duration: 5,
        title: 'ACE de chelo!',
        gif: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDRvNHB6b2F0ajdhNDZoOGU1dXJ2cHJuZzdiajg5cmt1a2piMnlkOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3o7aD3RScly3FyZwQg/giphy.gif',
      },
    ];

    const matchStart = Date.now();
    const interval = setInterval(() => {
      const nowSeconds = Math.floor((Date.now() - matchStart) / 1000);

      for (const event of EVENTS) {
        if (event.at === nowSeconds) {
          setCurrentEvent(event.title);
          setCurrentGif(event.gif || null);

          setTimeout(() => {
            setCurrentEvent(null);
            setCurrentGif(null);
          }, event.duration * 1000);
        }
      }

      if (nowSeconds > Math.max(...EVENTS.map((e) => e.at + e.duration))) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [chatRoomId]);

  return (
    <div className="relative">
      <EventOverlay event={currentEvent} gif={currentGif} />
    </div>
  );
};

export default EventTrigger;
