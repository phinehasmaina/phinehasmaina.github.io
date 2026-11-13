# Updating photos and artwork

Keep the current pictures until their replacements are ready. There is no need to rename or move everything now.

For new assets, use folders like:

```text
Assets/
  brand/       # logos and the 10Phin background
  photos/      # portraits, music, football
  projects/    # one folder per project
```

- Use descriptive lowercase names with hyphens: `phin-saxophone.webp` or `delivery-robot-front.webp`.
- Export photos as WebP or JPEG. Use transparent PNG or SVG for logos and artwork.
- Around 1200 to 1600 pixels wide is usually enough for these photo cards. Aim for roughly 200 to 500 KB per photo, checking that it still looks good.
- Keep full-resolution originals in your photo library or OneDrive, outside the published repository. Export web copies without location metadata.
- Store site photos in this repository so the site does not depend on temporary file-sharing links. Large videos belong on a video service rather than in Git.
- Update the image `src` and its `alt` description together. Capitalization matters on GitHub Pages.
- The two project cards use landscape crops. The About photo uses a portrait crop. Leave room around faces so mobile cropping still works.

Current image locations are in `index.html` and the `interestPhotos` map in `room.js`. The background is set in `styles/room.css`.

The Music, Football, and Faith & Worship tabs use optimized WebP copies in `Assets/photos/`. They preserve the complete uploaded compositions without cropping. The originals remain outside the repository.
