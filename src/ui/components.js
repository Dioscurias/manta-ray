import {icon} from './icons.js';
import {manta,brand} from './brand.js';
export {icon} from './icons.js';
export {mantaLogoURL,mantaViewBox,mantaArtwork,brandSprite,manta,brand} from './brand.js';
export function button(label,{id='',href='',ghost=false,attrs=''}={}){
 const tag=href?'a':'button';return `<${tag} ${id?`id="${id}"`:''} ${href?`href="${href}"`:'type="button"'} class="mr-btn${ghost?' mr-btn--ghost':''}" ${attrs}><span>${label}</span><span class="mr-arrow" aria-hidden="true">${icon('arrow')}</span></${tag}>`;
}
export function segmented(label,id,{active=false,disabled=false}={}){return `<button type="button" id="${id}" class="mr-segmented" role="switch" aria-label="${label}" aria-checked="${active}" ${disabled?'disabled':''}><span>${label}</span><i aria-hidden="true"></i></button>`;}
export function keycap(key,display){return `<kbd class="mr-keycap" data-key-hint="${key}">${display}</kbd>`;}
export function header(active=''){return `<header class="site-header"><a class="site-brand" href="/" aria-label="Manta home">${brand()}</a><nav aria-label="Main navigation"><a href="/projects" ${active==='projects'?'aria-current="page"':''}>Projects</a><a href="/about" ${active==='about'?'aria-current="page"':''}>About</a><a href="/#contact">Contact</a></nav><div class="header-actions">${button('Play',{href:'/projects/speedster/play',ghost:true})}<button class="mr-icon-btn mobile-menu-button" id="open-navigation" aria-label="Open navigation">${icon('menu')}</button></div></header>`;}
export function dialog(id,label,content,className=''){return `<dialog id="${id}" class="mr-dialog ${className}" aria-labelledby="${id}-title"><button class="mr-icon-btn mr-dialog-close" data-close-dialog aria-label="Close ${label}">${icon('close')}</button>${content}</dialog>`;}
export function wireDialog(node){
 node.querySelector('[data-close-dialog]')?.addEventListener('click',()=>node.close());
 node.addEventListener('click',event=>{if(event.target===node){const r=node.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)node.close();}});
}
