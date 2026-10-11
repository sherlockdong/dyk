'use client';

import PhotoImage from './PhotoImage';
import styles from './fragments.module.css';

export default function PhotoCanvas({ items, worldRef, active, onSelect }) {
  return (
    <div className={styles.canvas} aria-label="Photograph canvas" aria-hidden={!active} inert={!active} style={{ opacity: active ? 1 : 0 }}>
      <div ref={worldRef} className={styles.world}>
        {items.map((photo, index) => (
          <button key={photo.id} data-photo-id={photo.id} type="button" className={styles.canvasPhoto}
            style={{ left: photo.x, top: photo.y, width: photo.canvasWidth, height: photo.canvasHeight }}
            aria-label={`Discover ${photo.location}, ${photo.date}`}
            onClick={event => onSelect(index, event.detail === 0)}>
            <PhotoImage photo={photo} />
            <span className={styles.canvasLabel}>{photo.location}<span>{photo.date}</span></span>
          </button>
        ))}
      </div>
    </div>
  );
}
