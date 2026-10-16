import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const base=process.env.TEST_URL||'http://127.0.0.1:5201',gameOrigin=process.env.TEST_GAME_URL||'http://127.0.0.1:5202';
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'}),errors=[];
try{
 const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});page.on('pageerror',e=>errors.push(e.message));
 if(process.env.TEST_DENY_STORAGE==='1')await page.addInitScript(()=>{if(window.parent!==window)Object.defineProperty(window,'sessionStorage',{get(){throw new DOMException('Storage denied','SecurityError');}});});
 await page.goto(base+'/projects/speedster/play');const game=page.frameLocator('#game-window');await game.locator('#join-player-name').waitFor({timeout:90000});await game.locator('#join-player-name').fill('Lab Runner');await game.locator('#manta-start').click();
 const frame=()=>page.frames().find(f=>f.url().startsWith(gameOrigin+'/'));
 await frame().waitForFunction(()=>window.__velocity?.getState().status==='running',null,{timeout:90000});assert.notEqual(new URL(page.url()).origin,new URL(frame().url()).origin,'game runs on a different host');
 assert.equal(await page.locator('.site-header').isVisible(),false);await game.locator('.manta-hud:not([hidden])').waitFor();
 await page.evaluate(()=>window.postMessage({type:'speedster:maps'},location.origin));assert.equal(await page.locator('#maps-dialog').isVisible(),false,'forged message cannot open map picker');
 await game.locator('#hud-pause').click();await game.locator('#hud-maps').click();await page.locator('#maps-dialog[open]').waitFor();assert.equal(await page.locator('.map-option img').evaluateAll(nodes=>nodes.every(n=>n.complete&&n.naturalWidth>0)),true,'map previews load from game host');
 await page.keyboard.press('Escape');await frame().waitForFunction(()=>window.__velocity?.getState().status==='running');
 await game.locator('#hud-pause').click();await game.locator('#hud-maps').click();await page.getByRole('radio',{name:'The Last Household',exact:true}).check();await page.click('#launch-game');
 await game.locator('.manta-hud:not([hidden])').waitFor({timeout:90000});await frame().waitForFunction(()=>window.__parkour?.getState().status==='running',null,{timeout:90000});
 await game.locator('#hud-pause').click();await game.locator('#hud-leave').click();await page.waitForURL(base+'/projects/speedster');await page.locator('.project-detail').waitFor();
 assert.deepEqual(errors,[]);console.log('PASS: cross-origin embedded game, trusted messages, map previews, cancel/resume, map launch, Leave returns to Manta project.');
}finally{await browser.close();}
