# ARGUS Project Entry Design

## Goal

Add ARGUS to Manta's Projects section as a first-class project with a dedicated detail page and a link to the live application.

## Content and presentation

- Add ARGUS as `MR-007`, after the existing projects.
- Describe it as: “A live global intelligence map for tracking aircraft, vessels, infrastructure, and geopolitical activity.”
- Classify it as “Geospatial intelligence.”
- Use a current screenshot of the ARGUS globe as the project image so the index and detail page remain visually consistent with Manta's existing specimen-card treatment.
- Link the primary project action to `https://argus-one-mu.vercel.app` and label it through the existing external-project behavior.

## Architecture

Manta generates its project index, detail routes, metadata, sitemap entries, and social images from `src/data/projects.ts`. Adding one data record and one image asset is therefore sufficient; no new route component or custom styling is needed.

## Verification

- Extend the project-data tests to assert the ARGUS code, category, image, and external link.
- Run unit tests and the production build.
- Run the browser check and inspect the Projects index and ARGUS detail page.
- Deploy to Manta's existing Vercel production project, then verify `https://manta.bet/projects` and `https://manta.bet/projects/argus`.
