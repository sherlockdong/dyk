'use client';

import { motion } from 'motion/react';
import PhotoImage from './PhotoImage';
import styles from './fragments.module.css';

const exit = ({ returning, rect, reduced }) => returning
  ? { ...rect, opacity: 1, scale: 1, transition: { duration: reduced ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] } }
  : { opacity: 0, scale: reduced ? 1 : 0.985, transition: { duration: reduced ? 0 : 0.42 } };

export default function DiscoverPhoto({ photo, rect, entry, reduced }) {
  return (
    <motion.div className={styles.discoverPhoto}
      initial={entry ? { ...entry, opacity: 1, scale: 1 } : { ...rect, opacity: 0, scale: reduced ? 1 : 1.015 }}
      animate={{ ...rect, opacity: 1, scale: 1 }}
      variants={{ exit }} exit="exit"
      transition={{ duration: reduced ? 0 : entry ? 0.85 : 0.65, ease: [0.22, 1, 0.36, 1] }}>
      <PhotoImage key={photo.src} photo={photo} prominent />
    </motion.div>
  );
}
