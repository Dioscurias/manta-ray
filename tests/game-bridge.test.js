import test from 'node:test';
import assert from 'node:assert/strict';
import {GAME_ORIGIN,GAME_PATH,gameURL,legacyGameURL,isGameMessage} from '../src/game-bridge/index.js';
test('Manta links to the separately hosted game and preserves its own Play route',()=>{
 assert.equal(GAME_PATH,'/projects/speedster/play');
 const url=new URL(gameURL({map:'parkour',autoplay:true}));assert.equal(url.origin,GAME_ORIGIN);assert.equal(url.pathname,'/');assert.equal(url.searchParams.get('map'),'parkour');assert.equal(url.searchParams.get('autoplay'),'1');
 assert.equal(new URL(gameURL({map:'unknown'})).searchParams.get('map'),'austin');
 assert.equal(new URL(legacyGameURL(new URL('https://lab.test/projects/speedster/play?embed=1&map=parkour'))).origin,GAME_ORIGIN);
 assert.equal(legacyGameURL(new URL('https://lab.test/projects/speedster/play')),null);
});
test('only the actual game iframe at the configured origin can control the lab player',()=>{
 const frame={},other={};assert.equal(isGameMessage({origin:GAME_ORIGIN,source:frame},frame),true);
 assert.equal(isGameMessage({origin:'https://untrusted.test',source:frame},frame),false);
 assert.equal(isGameMessage({origin:GAME_ORIGIN,source:other},frame),false);
 assert.equal(isGameMessage({origin:GAME_ORIGIN,source:null},null),false);
});
