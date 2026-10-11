export const MIN_ZOOM = 0.18;
export const MAX_ZOOM = 2.6;
export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function hash(id) {
  return [...id].reduce((n, char) => (Math.imul(n, 31) + char.charCodeAt(0)) >>> 0, 7);
}

// An expanding golden-angle spiral. Existing automatic
// placements remain unchanged when new photos are appended; manual photos reserve space.
export function arrangePhotos(photos) {
  const occupied = photos.filter(p => Number.isFinite(p.x) && Number.isFinite(p.y)).map(dimensions);
  let slot = 0;
  return photos.map(photo => {
    const item = dimensions(photo);
    if (Number.isFinite(photo.x) && Number.isFinite(photo.y)) return item;
    for (;;) {
      const position = slot++;
      const angle = position * 2.399963229728653;
      const radius = 210 * Math.sqrt(position);
      const seed = hash(photo.id);
      const x = Math.cos(angle) * radius + (seed % 61) - item.canvasWidth / 2;
      const y = Math.sin(angle) * radius + ((seed >>> 8) % 61) - item.canvasHeight / 2;
      const candidate = { ...item, x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100 };
      if (occupied.some(other => overlaps(candidate, other, 65))) continue;
      occupied.push(candidate);
      return candidate;
    }
  });
}

function dimensions(photo) {
  const seed = hash(photo.id);
  const width = (photo.displayWidth || 270 + seed % 85) * clamp(photo.scale || 1, 0.25, 3);
  const ratio = photo.width && photo.height ? photo.width / photo.height : 1.5;
  return { ...photo, canvasWidth: width, canvasHeight: Math.round(width / ratio * 100) / 100 };
}
function overlaps(a, b, gap) {
  return a.x < b.x + b.canvasWidth + gap && a.x + a.canvasWidth + gap > b.x && a.y < b.y + b.canvasHeight + gap && a.y + a.canvasHeight + gap > b.y;
}
export function zoomAt(camera, factor, point) {
  const zoom = clamp(camera.zoom * factor, MIN_ZOOM, MAX_ZOOM);
  const ratio = zoom / camera.zoom;
  return { zoom, x: point.x - (point.x - camera.x) * ratio, y: point.y - (point.y - camera.y) * ratio };
}
export function photoRect(photo, camera) {
  return { x: camera.x + photo.x * camera.zoom, y: camera.y + photo.y * camera.zoom, width: photo.canvasWidth * camera.zoom, height: photo.canvasHeight * camera.zoom };
}
export function discoverRect(photo, size) {
  const ratio = photo.width && photo.height ? photo.width / photo.height : 1.5;
  const width = Math.min(size.width * (size.width < 600 ? 0.88 : 0.72), 1040, size.height * 0.9 * ratio);
  const height = width / ratio;
  return { x: (size.width - width) / 2, y: (size.height - height) / 2, width, height };
}
export function nextIndex(current, count, random = Math.random) {
  if (count < 2) return 0;
  return (current + 1 + Math.floor(random() * (count - 1))) % count;
}
