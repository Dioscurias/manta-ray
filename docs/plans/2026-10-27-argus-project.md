# ARGUS Project Entry Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Publish ARGUS in Manta's Projects section with a dedicated detail page, representative globe image, and live-app link.

**Architecture:** Use Manta's existing data-driven project registry. One new project record automatically supplies the index card, detail route, about-page reference, sitemap URL, SEO metadata, and generated social image; one static screenshot supplies the visual.

**Tech Stack:** TypeScript data, vanilla JavaScript rendering, Vite, Node test runner, Playwright, Vercel

---

### Task 1: Add the ARGUS project contract

**Files:**
- Modify: `tests/lab-projects.test.js`
- Modify: `src/data/projects.ts`

**Step 1: Write the failing test**

Assert that the project list contains an `argus` entry with code `MR-007`, category `Geospatial intelligence`, image `/brand/argus.jpg`, and external link `https://argus-one-mu.vercel.app`.

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL because the ARGUS project is absent.

**Step 3: Write minimal implementation**

Append this record to `projects`:

```ts
{slug:'argus',code:'MR-007',name:'ARGUS',description:'A live global intelligence map for tracking aircraft, vessels, infrastructure, and geopolitical activity.',category:'Geospatial intelligence',status:null,stage:null,image:'/brand/argus.jpg',link:'https://argus-one-mu.vercel.app',featured:false}
```

**Step 4: Run test to verify it passes**

Run: `npm test`

Expected: all project tests pass.

### Task 2: Add and validate the visual

**Files:**
- Create: `public/brand/argus.jpg`
- Modify: `scripts/lab-browser-check.mjs`

**Step 1: Capture a current ARGUS production screenshot**

Open `https://argus-one-mu.vercel.app`, wait for the globe and live aircraft layer, and capture a 16:9 image without browser chrome.

**Step 2: Add a failing browser assertion**

Assert that `/projects` contains the ARGUS row and image, and that `/projects/argus` contains an external “Visit project” link to the production ARGUS URL.

**Step 3: Run the browser check to verify it fails**

Run the Manta development server and `npm run test:browser`.

Expected: FAIL before the project record/image is present.

**Step 4: Save the optimized screenshot**

Store the screenshot at `public/brand/argus.jpg` with a 16:9 crop and reasonable web compression.

**Step 5: Run the browser check**

Run: `npm run test:browser`

Expected: PASS, including the ARGUS card, route, image, and link.

### Task 3: Build, publish, and verify

**Files:**
- Verify: generated `dist/projects/argus.html`
- Verify: generated `dist/og/argus.png`

**Step 1: Run the complete verification suite**

Run: `npm test && npm run build`

Expected: all tests pass and the Vite build completes with ARGUS HTML and social-image output.

**Step 2: Commit**

```bash
git add docs/plans src/data/projects.ts tests/lab-projects.test.js scripts/lab-browser-check.mjs public/brand/argus.jpg
git commit -m "feat: add ARGUS to Manta projects"
```

**Step 3: Push the branch and deploy production**

Push `codex/add-argus`, deploy the existing Manta Vercel project to production, and promote the deployment to `manta.bet` if necessary.

**Step 4: Verify production**

Check:

- `https://manta.bet/projects` shows the ARGUS card.
- `https://manta.bet/projects/argus` loads with the correct description and image.
- The project action opens `https://argus-one-mu.vercel.app`.
- The production page has no console errors.
