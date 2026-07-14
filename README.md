# v1olet.xyz

Static site — no build step, no npm, no Vite. Push to `main`, GitHub Pages serves it.

## Files

| file | what it is |
|---|---|
| `index.html` | page structure (sections, nav, texts) |
| `style.css` | all styling incl. dark/light themes |
| `main.js` | rendering, animations, theme toggle, flower rain |
| `data.js` | **← edit this to update the roster & competition results** |
| `wordmark-hero-dark/light.png` | hero logo per theme |
| `wordmark-nav-dark/light.png` | nav logo per theme |
| `favicon.png`, `v1olet-preview.png` | favicon + link preview banner |
| `CNAME` | custom domain (don't touch) |

## Editing the roster / events

Everything lives in `data.js`:

- **Add a member**: copy an existing block in `roster`, adjust the fields.
  `tier: "captain"` = big card, `tier: "core"` = compact card.
  `links` supports `linkedin`, `github`, `website` (all optional).
  `avatar: ""` shows an auto initials avatar.
- **Add a CTF result**: add a line at the TOP of `events` (newest first).
  `"top": true` highlights it as a top run.

## Theme behaviour

- First visit: follows the visitor's OS preference (dark/light).
- The toggle button (top right) overrides it; the choice is saved in the browser.
