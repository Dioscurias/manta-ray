import './ui/tokens.css';
import './ui/loading.css';
import './game-bridge/map-dialog.css';
import './lab/lab.css';
import {brandSprite,brand} from './ui/components.js';
import {legacyGameURL} from './game-bridge/index.js';
const legacy=legacyGameURL(new URL(location.href));
if(legacy){location.replace(legacy);}else{
 const cover=document.createElement('div');cover.className='manta-loading';cover.setAttribute('role','status');cover.innerHTML=brandSprite()+brand()+'<p>Loading</p>';document.body.append(cover);
 try{await import('./lab/app.js');cover.remove();}catch(error){cover.querySelector('p').textContent='Could not load. Reload to try again.';console.error(error);}
}
