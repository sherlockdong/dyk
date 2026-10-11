# Fragments

A separate Next.js App Router page at `/fragments`. The existing homepage only gains a link; its content and layout are preserved.

## Add your own photographs

1. Copy a JPEG, WebP, AVIF, or PNG into `public/photos/fragments/`. Subfolders (for example `montreal/`) are supported.
2. Add an entry to `src/data/photos.js`:

```js
{
  id: 'montreal-01',
  src: '/photos/fragments/montreal/evening.jpg',
  location: 'Montreal, Canada',
  date: 'November 2026',
  width: 2400,
  height: 1600,
  alt: 'Warm apartment windows above a snowy Montreal street',
  caption: 'An evening in the city.', // optional
  tags: ['travel', 'night'],        // optional, for organization
}
```

Use the image's original pixel dimensions for `width` and `height`. They reserve the correct aspect ratio before loading and make spatial transitions exact. If omitted, a 3:2 frame is used; the image still fits without cropping, but may have empty space. Export web-sized images (roughly 1600–2400 pixels on the long edge) instead of camera originals. Next Image generates optimized responsive versions automatically.

Delete an entry to remove a photo. Replace its `src` to swap the image. Keep IDs unique. The sample collection uses local Lorem Picsum photographs from Unsplash and explicitly displays a sample credit. Remove `sample: true` for your own photographs. The sample titles describe visual studies, not verified locations or dates. Replace the sample date counters with your actual dates.

## Position and size

Omit `x` and `y` for automatic placement on an expanding golden-angle spiral, with collision avoidance and varied widths. There is no fixed canvas boundary and no hardcoded photo count. Appending entries preserves existing automatic positions; reordering/removing entries may reflow automatic positions. To lock a composition, specify coordinates.

```js
x: 450,             // optional top-left canvas x; specify both x and y
y: -200,           // optional top-left canvas y; negatives are welcome
scale: 1.2,         // optional size multiplier; default 1, range 0.25–3
displayWidth: 340, // optional base width in canvas pixels, before scale
```

The original aspect ratio sets height. Manual placements reserve space for automatic photos; manual photos may overlap each other deliberately. Tags are stored but have no filtering UI.

## Controls

- Discover: Another Moment or Right arrow; Previous Moment or Left arrow retraces viewing history. Right retraces forward history before choosing another random photo. Escape or Explore All opens the canvas.
- Explore: drag to pan; two-finger trackpad movement pans; mouse wheel zooms; trackpad pinch or Ctrl+wheel zooms around the cursor. Shift+trackpad wheel pans horizontally.
- Mobile: one-finger drag, two-finger pinch, tap to discover.
- Keyboard: Tab/Enter selects controls and visible photos; arrow keys pan; `+` / `-` zoom; `R` resets the canvas. A visible focus ring follows navigation.
- Return to Discover reopens the last photograph. The existing canvas camera is retained until Reset View or a new page load.

Mouse-wheel versus trackpad detection is heuristic because browsers expose both as wheel events. Zoom buttons and Ctrl+wheel provide unambiguous alternatives.

## Implementation

- `Fragments.jsx`: modes, random history, accessible controls, focus management.
- `PhotoCanvas.jsx`: spatial photograph buttons, semantic zoom labels.
- `DiscoverPhoto.jsx`: shared-photo rectangle animation and crossfades using the existing `motion/react` dependency.
- `useCanvasCamera.js`: Pointer Events, pinch focal-point math, wheel smoothing, resize handling, imperative CSS transforms, overscan culling.
- `geometry.mjs`: deterministic layout, zoom math, discovery fitting, random selection.
- `PhotoImage.jsx`: Next Image optimization, lazy canvas images, eager discovery image, missing-image fallback.
- `fragments.module.css`: isolated responsive styles using the site's navy palette and monospace family.

No dependencies, backend, authentication, or hosting setup were added. Pan/zoom mutate refs and DOM transforms, so React does not rerender every frame. Offscreen photos are culled with CSS visibility; their lightweight DOM nodes remain mounted. Reduced motion disables transitions and camera smoothing.

Run `node --test tests/fragments.test.mjs` for 150-photo placement, stable append, collision spacing, zoom focal points/bounds, image fitting, and no-repeat random navigation. Run `npm run build` for the production build.

For very large collections (thousands), consider spatial indexing and DOM virtualization. Physical-device touch/pinch testing is recommended before publishing. Camera/history are session-local and not saved across reloads. Source samples are listed in `public/photos/fragments/SOURCES.md`.
