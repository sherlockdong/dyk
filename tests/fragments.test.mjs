import test from 'node:test';
import assert from 'node:assert/strict';
import { arrangePhotos, zoomAt, photoRect, discoverRect, nextIndex, MIN_ZOOM, MAX_ZOOM } from '../src/components/fragments/geometry.mjs';
const photos = Array.from({ length: 150 }, (_, i) => ({ id: `photo-${i}`, width: i % 2 ? 900 : 1400, height: 1000 }));
test('150 automatic photographs have stable positions, no collisions, and allow appending', () => {
  const arranged = arrangePhotos(photos);
  assert.deepEqual(arranged, arrangePhotos(photos));
  assert.deepEqual(arranged.slice(0, 14), arrangePhotos(photos.slice(0, 14)));
  for (const [i, a] of arranged.entries()) {
    for (const b of arranged.slice(i + 1)) {
      assert.ok(a.x + a.canvasWidth + 64 <= b.x || b.x + b.canvasWidth + 64 <= a.x || a.y + a.canvasHeight + 64 <= b.y || b.y + b.canvasHeight + 64 <= a.y);
    }
  }
});
test('manual positions and display sizes are preserved and reserve room', () => {
  const manual = { ...photos[0], x: 0, y: 0, displayWidth: 420, scale: 1.2 };
  const placed = arrangePhotos([manual, ...photos.slice(1)]);
  assert.equal(placed[0].x, 0); assert.equal(placed[0].y, 0); assert.equal(placed[0].canvasWidth, 504);
  assert.ok(placed.every(p => Number.isFinite(p.x) && Number.isFinite(p.y)));
});
test('zoom holds the world position under the focal point and clamps its range', () => {
  const camera = { x: 160, y: -20, zoom: .8 }, point = { x: 700, y: 300 };
  const next = zoomAt(camera, 1.5, point);
  assert.equal((point.x - camera.x) / camera.zoom, (point.x - next.x) / next.zoom);
  assert.equal((point.y - camera.y) / camera.zoom, (point.y - next.y) / next.zoom);
  assert.equal(zoomAt(camera, 100, point).zoom, MAX_ZOOM);
  assert.equal(zoomAt(camera, .001, point).zoom, MIN_ZOOM);
});
test('discovery fits portrait and landscape images inside mobile and desktop stages', () => {
  for (const photo of photos.slice(0, 2)) for (const size of [{width:390,height:490},{width:1440,height:640}]) {
    const rect = discoverRect(photo,size);
    assert.ok(rect.x >= 0 && rect.y >= 0 && rect.width <= size.width && rect.height <= size.height);
    assert.ok(Math.abs(rect.width / rect.height - photo.width / photo.height) < .0001);
  }
  assert.deepEqual(photoRect({x:10,y:20,canvasWidth:200,canvasHeight:100},{x:100,y:50,zoom:2}), {x:120,y:90,width:400,height:200});
});
test('random navigation never immediately repeats, including two-photo collections', () => {
  for (const count of [2, 14, 150]) for (let i = 0; i < count; i++) for (const random of [0, .5, .99999]) assert.notEqual(nextIndex(i, count, () => random), i);
  assert.equal(nextIndex(0, 1), 0);
  assert.deepEqual(arrangePhotos([]), []);
});
