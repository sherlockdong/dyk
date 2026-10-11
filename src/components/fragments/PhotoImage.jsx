'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './fragments.module.css';

export default function PhotoImage({ photo, prominent = false }) {
  const [failed, setFailed] = useState(false);
  const alt = photo.alt || [photo.location, photo.date, photo.caption].filter(Boolean).join(' — ');
  if (failed) return <span className={styles.unavailable} role="img" aria-label={alt}>Photograph unavailable<span>{photo.location}</span></span>;
  return <Image src={photo.src} alt={alt} fill sizes={prominent ? '(max-width: 600px) 88vw, 1040px' : '(max-width: 600px) 280px, 640px'} loading={prominent ? 'eager' : 'lazy'} draggable={false} onError={() => setFailed(true)} className={styles.image} />;
}
