import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('Manta no longer presents Burkit as a Manta project', async () => {
  const projects=await readFile(new URL('../src/data/projects.ts', import.meta.url),'utf8');
  const seo=await readFile(new URL('../src/lab/seo.js', import.meta.url),'utf8');
  assert.doesNotMatch(projects,/burkit/i);
  assert.doesNotMatch(seo,/burkit/i);
});

test('Manta identifies its founder', async () => {
  const site=await readFile(new URL('../src/data/site.ts', import.meta.url),'utf8');
  const pages=await readFile(new URL('../src/lab/pages.js', import.meta.url),'utf8');
  assert.match(site,/Nikoloz Sharvashidze/);
  assert.match(pages,/site\.founder/);
});
