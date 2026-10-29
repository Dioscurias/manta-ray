# Manta Ray

Independent source repository and Vercel deployment.

Run `npm ci`, then `npm run dev`. Use `npm test`, `npm run build`, and `npm run preview` for validation.

Manta Ray owns the lab pages, project data, branding, opening film and gameplay promotional footage. Speedster runs at https://speedster-game.vercel.app and is embedded on `/projects/speedster/play`. Configure `VITE_SPEEDSTER_ORIGIN` to use another game host.

Production: https://manta.bet

The home and project index group entries into Browser Games, Intelligence Tools, and Crypto. Set each entry's `collection` in `src/data/projects.ts`; labels and order live in `src/lab/project-model.js`. Existing detail and play routes remain independent of collections, so games and tools can move to their own sites later.

The crypto entry is an upcoming token placeholder, with no ticker, chain, launch date, or purchase link announced. Replace its verified details when available.

Repository: https://github.com/Dioscurias/manta-ray
