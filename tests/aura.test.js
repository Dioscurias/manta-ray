import test from 'node:test';
import assert from 'node:assert/strict';
import { projects } from '../src/data/projects.ts';
import { renderPage } from '../src/lab/pages.js';
import { projectRoutes } from '../src/lab/project-model.js';
import { seoHead } from '../src/lab/seo.js';

test('Aura belongs to the existing Manta project index and static routes', () => {
 const aura = projects.find(project => project.slug === 'aura');
 assert.ok(aura);
 assert.equal(aura.code, 'MR-009');
 assert.ok(projectRoutes().includes('/projects/aura'));
 assert.match(renderPage('/'), /href="\/projects\/aura"/);
 assert.match(renderPage('/projects'), /href="\/projects\/aura"/);
});
test('Aura uses the shared site shell and describes its real implementation state', () => {
 const html = renderPage('/projects/aura');
 assert.match(html, /class="site-header"/);
 assert.match(html, /class="site-footer"/);
 assert.match(html, /Prototype · testnet tokens · simulated banking/);
 assert.match(html, /Payments for games/);
 assert.match(html, /Payment services are not available yet/);
 assert.doesNotMatch(html, /localhost|127\.0\.0\.1|Connect wallet|Mint now|100% backed/);
 assert.match(seoHead('/projects/aura'), /https:\/\/manta\.bet\/projects\/aura/);
});
