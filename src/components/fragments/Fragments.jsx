'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { arrangePhotos, discoverRect, nextIndex, photoRect } from './geometry.mjs';
import useCanvasCamera from './useCanvasCamera';
import PhotoCanvas from './PhotoCanvas';
import DiscoverPhoto from './DiscoverPhoto';
import styles from './fragments.module.css';

export default function Fragments({ photos }) {
  const items = useMemo(() => arrangePhotos(photos), [photos]);
  const [mode, setMode] = useState('discover');
  const [history, setHistory] = useState({ moments: [], cursor: 0 });
  const [entry, setEntry] = useState(null);
  const [returnRect, setReturnRect] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const stageRef = useRef(null);
  const worldRef = useRef(null);
  const discoverControl = useRef(null);
  const exploreControl = useRef(null);
  const hasExplored = useRef(false);
  const transitionTimer = useRef(null);
  const reduced = useReducedMotion();
  const active = mode === 'explore';
  const { camera, size, moved, reset, zoom, centerOn, move } = useCanvasCamera(stageRef, worldRef, items, active && !transitioning, reduced);
  const index = history.moments[history.cursor];
  const photo = items[index];

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (items.length) setHistory({ moments: [Math.floor(Math.random() * items.length)], cursor: 0 });
    });
    return () => { cancelAnimationFrame(frame); clearTimeout(transitionTimer.current); };
  }, [items.length]);

  const next = useCallback(() => {
    if (transitioning || items.length < 2) return;
    setEntry(null);
    setHistory(previous => {
      if (previous.cursor < previous.moments.length - 1) return { ...previous, cursor: previous.cursor + 1 };
      const moments = [...previous.moments, nextIndex(previous.moments[previous.cursor], items.length)].slice(-200);
      return { moments, cursor: moments.length - 1 };
    });
  }, [items.length, transitioning]);
  const previous = useCallback(() => {
    if (transitioning) return;
    setEntry(null);
    setHistory(value => ({ ...value, cursor: Math.max(0, value.cursor - 1) }));
  }, [transitioning]);

  const focusCanvas = useCallback(() => {
    const node = [...(worldRef.current?.children || [])].find(node => node.dataset.photoId === photo?.id);
    if (node?.style.visibility === 'visible') node.focus({ preventScroll: true });
    else exploreControl.current?.focus({ preventScroll: true });
  }, [photo]);

  const explore = useCallback(() => {
    if (!photo || transitioning) return;
    // The first reveal is composed around the currently discovered photograph.
    if (!hasExplored.current) centerOn(photo);
    hasExplored.current = true;
    setReturnRect(photoRect(photo, camera.current));
    setTransitioning(true);
    setMode('explore');
    transitionTimer.current = setTimeout(() => { setTransitioning(false); focusCanvas(); }, reduced ? 0 : 870);
  }, [photo, transitioning, centerOn, camera, reduced, focusCanvas]);

  const select = useCallback((selected, keyboard = false) => {
    if (transitioning || (!keyboard && moved.current)) return;
    setEntry(photoRect(items[selected], camera.current));
    setHistory(value => {
      if (value.moments[value.cursor] === selected) return value;
      const moments = [...value.moments.slice(0, value.cursor + 1), selected].slice(-200);
      return { moments, cursor: moments.length - 1 };
    });
    setTransitioning(true);
    setMode('discover');
    transitionTimer.current = setTimeout(() => { setTransitioning(false); discoverControl.current?.focus({ preventScroll: true }); }, reduced ? 0 : 870);
  }, [transitioning, moved, items, camera, reduced]);

  useEffect(() => {
    const keydown = event => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target.isContentEditable) return;
      if (transitioning) return;
      if (!active && event.key === 'ArrowRight') { event.preventDefault(); next(); }
      if (!active && event.key === 'ArrowLeft') { event.preventDefault(); previous(); }
      if (!active && event.key === 'Escape') { event.preventDefault(); explore(); }
      if (active && ['+', '=', '-'].includes(event.key)) { event.preventDefault(); zoom(event.key === '-' ? 0.8 : 1.25); }
      if (active && event.key.toLowerCase() === 'r') { event.preventDefault(); reset(); }
      if (active && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        event.preventDefault();
        const steps = { ArrowLeft: [100, 0], ArrowRight: [-100, 0], ArrowUp: [0, 100], ArrowDown: [0, -100] };
        const [x, y] = steps[event.key];
        move({ ...camera.current, x: camera.current.x + x, y: camera.current.y + y }, true);
      }
    };
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, [active, next, previous, explore, zoom, reset, transitioning, camera, move]);

  return (
    <section className={styles.fragments} aria-label="Fragments photography" data-mode={mode}>
      <header className={styles.header}>
        <Link href="/" className={styles.home} aria-label="Return to Sherlock Dong’s homepage"><span aria-hidden="true">↖</span> Sherlock Dong</Link>
        <div className={styles.identity}><h1>FRAGMENTS<span className={styles.titleDot}>.</span></h1><p>Places I’ve been. Things I’ve seen.</p></div>
        <div className={styles.edition}><span className={styles.statusDot} /> A personal collection<span>{String(items.length).padStart(2, '0')} moments, no particular order</span></div>
      </header>

      <div ref={stageRef} className={styles.stage} aria-label={active ? 'Explore photographs. Drag or use arrow keys to pan, scroll to zoom. Tab to select a photograph.' : 'Discover a photograph'} aria-describedby="fragments-help">
        <PhotoCanvas items={items} worldRef={worldRef} active={active} onSelect={select} />
        <AnimatePresence custom={{ returning: active, rect: returnRect, reduced }}>
          {!active && photo && size.width > 0 && <DiscoverPhoto key={photo.id} photo={photo} rect={discoverRect(photo, size)} entry={entry} reduced={reduced} />}
        </AnimatePresence>
        {!items.length && <p className={styles.empty}>The next memory is on its way.<span>Add a photograph to src/data/photos.js to begin.</span></p>}
      </div>

      <footer className={styles.footer}>
        <div className={styles.metadata} aria-live="polite" aria-atomic="true">
          <AnimatePresence mode="wait">
            {!active && photo && <motion.div key={photo.id} initial={{ opacity: 0, y: reduced ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -4 }} transition={{ duration: reduced ? 0 : 0.22 }}>
              <div className={styles.location}>{photo.location}<span>{photo.date}</span></div>
              {photo.caption && <p className={styles.caption}>{photo.caption}</p>}
              {photo.sample && <span className={styles.sample}>Sample photograph · <a href="https://picsum.photos" target="_blank" rel="noreferrer">Unsplash via Lorem Picsum</a></span>}
            </motion.div>}
            {active && <motion.div key="explore" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><span className={styles.location}>A collection without edges.</span><span className={styles.sample}>Take your time. Find a moment.</span></motion.div>}
          </AnimatePresence>
        </div>
        <nav className={styles.controls} aria-label="Photography controls">
          {active ? <>
            <button ref={exploreControl} onClick={() => select(index, true)} disabled={!photo || transitioning}>Return to Discover <span aria-hidden="true">↗</span></button>
            <div className={styles.zoomControls}>
              <button onClick={() => zoom(0.8)} disabled={transitioning} aria-label="Zoom out">−</button>
              <button onClick={reset} disabled={transitioning} className={styles.reset}>Reset view</button>
              <button onClick={() => zoom(1.25)} disabled={transitioning} aria-label="Zoom in">+</button>
            </div>
          </> : <>
            <button className={styles.previous} onClick={previous} disabled={!history.cursor || transitioning} aria-label="Previous moment">←</button>
            <button ref={discoverControl} onClick={next} disabled={items.length < 2 || transitioning}>Another Moment <span aria-hidden="true">→</span></button>
            <span className={styles.divider} />
            <button onClick={explore} disabled={!photo || transitioning}>Explore All <span aria-hidden="true">↗</span></button>
          </>}
        </nav>
        <div className={styles.footnote}>
          <span>{active ? '02 — EXPLORE' : '01 — DISCOVER'}</span>
          <span id="fragments-help">{active ? 'Drag to wander · Wheel to zoom · Trackpad to pan · Pinch to zoom' : '← → to wander · Esc to explore'}</span>
          <span>{photo?.sample ? 'SAMPLE COLLECTION' : 'SHERLOCK DONG'}</span>
        </div>
      </footer>
    </section>
  );
}
