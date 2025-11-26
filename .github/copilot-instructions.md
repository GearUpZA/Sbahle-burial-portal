# Copilot Instructions for Sbahle Burial Portal

## Project Overview
- **Purpose:** Web-based management portal for burial societies, supporting member management, attendance, beneficiaries, and financial tracking.
- **Tech Stack:** HTML5, CSS3, Vanilla JavaScript, Canvas API (for signatures), browser Local Storage (with encryption for sensitive data).
- **Live Demo:** https://GearUpZA.github.io/sbahle-burial-portal

## Key Architectural Patterns
- **Single-page HTML apps**: Main features are implemented in HTML files (e.g., `SBS - V14.html`, `sbahle-burial-portal.html`) with embedded or linked JS.
- **Data Persistence:** Uses browser Local Storage for all data, with custom encryption for sensitive fields. No backend server.
- **Digital Signatures:** Captured via Canvas API and stored as base64-encoded images in Local Storage.
- **Backup/Restore:** Users can export/import all data as JSON. See Data Management tab in the UI.

## Developer Workflows
- **Testing:**
  - Open `SBS - V14.html` in a browser to access the full admin/member portal.
  - Use demo credentials: `admin`/`admin123` (admin), `member@test.com`/`password123` (member).
- **Debugging:**
  - Use browser DevTools to inspect Local Storage and debug JS.
  - Data is not persisted server-side; clearing browser storage will reset the app.
- **No build step:**
  - All code is plain HTML/JS/CSS. No npm/yarn or bundler required.

## Project-Specific Conventions
- **File naming:**
  - Major versions are tracked as `SBS - V10.html`, `SBS - V14.html`, etc.
  - New features/fixes often appear as new HTML files (e.g., `member-login-fix.html`).
- **Data files:**
  - Example data: `data/burial-society-data.json` (for manual import/export).
- **Security:**
  - All sensitive data is encrypted before storage. See `sbs-init.js` for encryption logic.

## Integration Points
- **No external backend:**
  - All logic and data are client-side. No API calls or server integration.
- **Canvas API:**
  - Used for signature capture in attendance and member management.

## Examples
- To add a new feature, copy an existing HTML file (e.g., `SBS - V14.html`), update the JS logic, and test in-browser.
- For data migration or troubleshooting, use the Data Management tab to export/import JSON backups.

## Key Files
- `SBS - V14.html`: Main portal UI and logic (latest stable version)
- `sbs-init.js`: Core JS for data handling, encryption, and app initialization
- `data/burial-society-data.json`: Example data for import/export

---
For more details, see `README.md` and in-app documentation.
