# laurenyoshida.me

Plain HTML, CSS and JavaScript — no build step. Edit a file, push to `main`, and GitHub Pages publishes it.

- `index.html` — all the text and the order of sections
- `styles.css` — layout and look
- `script.js` — phone menu, photo carousel, footer year
- `images/` — headshot, carousel photos and company logos (add an `<img>` in the carousel in `index.html` to add a photo)
- `favicon.svg`, `favicon-32.png`, `favicon.ico`, `apple-touch-icon.png` — the "L." tab and home-screen icons

Photos are JPEGs sized for how they're shown: about 1000px wide for the carousel and 640px for the headshot. To add one on a Mac:

```bash
sips -s format jpeg -s formatOptions 70 --resampleWidth 1000 photo.png --out images/photo.jpg
```

Preview locally:

```bash
python3 -m http.server 8080
```

then open http://localhost:8080.
