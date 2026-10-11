'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { clamp, photoRect, zoomAt } from './geometry.mjs';

export default function useCanvasCamera(stageRef, worldRef, items, enabled, reducedMotion) {
  const camera = useRef({ x: 0, y: 0, zoom: 0.55 });
  const target = useRef(camera.current);
  const frame = useRef(0);
  const moved = useRef(false);
  const initialized = useRef(false);
  const sizeRef = useRef({ width: 0, height: 0 });
  const [size, setSize] = useState(sizeRef.current);

  const paint = useCallback(() => {
    const world = worldRef.current;
    if (!world) return;
    const value = camera.current;
    world.style.transform = `translate3d(${value.x}px, ${value.y}px, 0) scale(${value.zoom})`;
    world.dataset.detail = value.zoom > 1.05 ? 'true' : 'false';
    const viewport = sizeRef.current;
    // Visibility changes are imperative, so moving the camera never rerenders React.
    for (let index = 0; index < items.length; index++) {
      const node = world.children[index];
      if (!node) continue;
      const rect = photoRect(items[index], value);
      const visible = rect.x + rect.width > -400 && rect.y + rect.height > -400 && rect.x < viewport.width + 400 && rect.y < viewport.height + 400;
      node.style.visibility = visible ? 'visible' : 'hidden';
      node.tabIndex = rect.x + rect.width > 0 && rect.y + rect.height > 0 && rect.x < viewport.width && rect.y < viewport.height ? 0 : -1;
    }
  }, [items, worldRef]);

  const move = useCallback((value, smooth = false) => {
    cancelAnimationFrame(frame.current);
    target.current = value;
    if (!smooth || reducedMotion) {
      camera.current = value;
      paint();
      return;
    }
    let last = performance.now();
    const tick = now => {
      const blend = 1 - Math.exp(-Math.min(now - last, 50) / 65);
      last = now;
      const from = camera.current;
      camera.current = { x: from.x + (value.x - from.x) * blend, y: from.y + (value.y - from.y) * blend, zoom: from.zoom + (value.zoom - from.zoom) * blend };
      paint();
      if (Math.abs(value.x - camera.current.x) + Math.abs(value.y - camera.current.y) + Math.abs(value.zoom - camera.current.zoom) * 100 > 0.08) frame.current = requestAnimationFrame(tick);
      else { camera.current = value; paint(); }
    };
    frame.current = requestAnimationFrame(tick);
  }, [paint, reducedMotion]);

  const reset = useCallback(() => {
    const { width, height } = sizeRef.current;
    move({ x: width / 2, y: height / 2, zoom: width < 600 ? 0.36 : 0.55 }, true);
  }, [move]);
  const zoom = useCallback(factor => {
    const { width, height } = sizeRef.current;
    move(zoomAt(target.current, factor, { x: width / 2, y: height / 2 }), true);
  }, [move]);
  const centerOn = useCallback(photo => {
    const { width, height } = sizeRef.current;
    const zoom = width < 600 ? 0.36 : 0.55;
    move({ zoom, x: width / 2 - (photo.x + photo.canvasWidth / 2) * zoom * 0.55, y: height / 2 - (photo.y + photo.canvasHeight / 2) * zoom * 0.55 });
  }, [move]);

  useEffect(() => {
    const stage = stageRef.current;
    const observer = new ResizeObserver(([entry]) => {
      const next = { width: entry.contentRect.width, height: entry.contentRect.height };
      const old = sizeRef.current;
      sizeRef.current = next;
      setSize(next);
      if (!initialized.current) {
        initialized.current = true;
        move({ x: next.width / 2, y: next.height / 2, zoom: next.width < 600 ? 0.36 : 0.55 });
      } else move({ ...camera.current, x: camera.current.x + (next.width - old.width) / 2, y: camera.current.y + (next.height - old.height) / 2 });
    });
    observer.observe(stage);
    return () => { observer.disconnect(); cancelAnimationFrame(frame.current); };
  }, [stageRef, move]);

  useEffect(() => {
    if (!enabled) return;
    const stage = stageRef.current;
    const pointers = new Map();
    let distance = 0;
    let midpoint = null;
    let origin = null;
    const point = event => {
      const rect = stage.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const pinch = () => {
      const [a, b] = [...pointers.values()];
      return { distance: Math.hypot(b.x - a.x, b.y - a.y), midpoint: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 } };
    };
    const down = event => {
      if (event.button !== 0 && event.pointerType === 'mouse') return;
      cancelAnimationFrame(frame.current);
      target.current = camera.current;
      pointers.set(event.pointerId, point(event));
      if (pointers.size === 1) { moved.current = false; origin = point(event); }
      if (pointers.size === 2) { const state = pinch(); distance = state.distance; midpoint = state.midpoint; moved.current = true; }
      // Capture on the photo itself so a stationary tap still generates its click.
      event.target.setPointerCapture(event.pointerId);
      stage.dataset.dragging = 'true';
    };
    const motion = event => {
      if (!pointers.has(event.pointerId)) return;
      const old = pointers.get(event.pointerId);
      const current = point(event);
      pointers.set(event.pointerId, current);
      if (pointers.size >= 2) {
        const next = pinch();
        const value = zoomAt(camera.current, next.distance / Math.max(1, distance), midpoint);
        move({ ...value, x: value.x + next.midpoint.x - midpoint.x, y: value.y + next.midpoint.y - midpoint.y });
        distance = next.distance; midpoint = next.midpoint;
      } else {
        if (Math.hypot(current.x - origin.x, current.y - origin.y) > 5) moved.current = true;
        if (moved.current) move({ ...camera.current, x: camera.current.x + current.x - old.x, y: camera.current.y + current.y - old.y });
      }
    };
    const up = event => {
      pointers.delete(event.pointerId);
      if (pointers.size === 1) origin = [...pointers.values()][0];
      if (!pointers.size) stage.dataset.dragging = 'false';
    };
    const wheel = event => {
      event.preventDefault();
      const mouseWheel = event.deltaMode !== 0 || (event.deltaX === 0 && Math.abs(event.deltaY) >= 50 && Number.isInteger(event.deltaY));
      if (event.ctrlKey || event.metaKey || mouseWheel) {
        const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? sizeRef.current.height : 1);
        move(zoomAt(target.current, Math.exp(-clamp(delta, -160, 160) * (event.ctrlKey ? 0.012 : 0.003)), point(event)), true);
      } else {
        move({ ...target.current, x: target.current.x - (event.shiftKey ? event.deltaY : event.deltaX), y: target.current.y - (event.shiftKey ? 0 : event.deltaY) }, true);
      }
    };
    stage.addEventListener('pointerdown', down);
    stage.addEventListener('pointermove', motion);
    stage.addEventListener('pointerup', up);
    stage.addEventListener('pointercancel', up);
    stage.addEventListener('wheel', wheel, { passive: false });
    return () => {
      stage.removeEventListener('pointerdown', down); stage.removeEventListener('pointermove', motion);
      stage.removeEventListener('pointerup', up); stage.removeEventListener('pointercancel', up);
      stage.removeEventListener('wheel', wheel); stage.dataset.dragging = 'false';
      cancelAnimationFrame(frame.current);
    };
  }, [enabled, move, stageRef]);

  return { camera, size, moved, reset, zoom, centerOn, move };
}
