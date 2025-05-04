// components/EventOverlay.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';

interface EventOverlayProps {
  event: '1v1' | 'clutch' | 'ace' | null;
}

const eventStyles = {
  '1v1': 'bg-blue-500/60',
  'clutch': 'bg-red-600/60',
  'ace': 'bg-yellow-400/60',
};

const EventOverlay = ({ event }: EventOverlayProps) => {
  return (
    <AnimatePresence>
      {event && (
        <motion.div
          className={`fixed inset-0 z-50 flex items-center justify-center text-white text-6xl font-bold ${eventStyles[event]} backdrop-blur-md`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {event.toUpperCase()}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventOverlay;
