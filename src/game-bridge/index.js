export const GAME_PATH='/projects/speedster/play';
export const GAME_ORIGIN=new URL(import.meta.env?.VITE_SPEEDSTER_ORIGIN||'https://speedster-game.vercel.app').origin;
export const GAME_EMBED_PATH=GAME_ORIGIN+'/';
export function gameURL({map='austin',autoplay=false,preview=false}={}){const params=new URLSearchParams({map:map==='parkour'?'parkour':'austin'});if(autoplay)params.set('autoplay','1');if(preview)params.set('preview','1');return GAME_EMBED_PATH+'?'+params.toString();}
export function legacyGameURL(url){if(url.pathname.replace(/\/$/,'')!==GAME_PATH||url.searchParams.get('embed')!=='1')return null;return gameURL({map:url.searchParams.get('map'),autoplay:url.searchParams.get('autoplay')==='1',preview:url.searchParams.get('preview')==='1'});}
export function isGameMessage(event,frameWindow){return event.origin===GAME_ORIGIN&&Boolean(frameWindow)&&event.source===frameWindow;}
