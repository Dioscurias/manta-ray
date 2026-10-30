// The mark is a white, transparent extraction of the supplied Manta artwork.
export const mantaLogoURL='/brand/manta-ray-mark.png';
export const mantaViewBox='0 0 1436 696';
export function mantaArtwork(imageURL=mantaLogoURL){return `<image href="${imageURL}" x="0" y="0" width="1436" height="696"/>`;}
export function brandSprite(){return `<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" aria-hidden="true" style="position:absolute;overflow:hidden"><defs><filter id="manta-wordmark-alpha" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.2126 0.7152 0.0722 0 0"/></filter></defs><symbol id="manta" viewBox="${mantaViewBox}">${mantaArtwork()}</symbol></svg>`;}
export function manta(className=''){return `<svg class="manta-mark ${className}" viewBox="${mantaViewBox}" aria-hidden="true"><use href="#manta" width="1436" height="696"/></svg>`;}
// Convert the supplied black field to alpha inside SVG, independent of backdrop blending.
export function wordmark(){return `<svg class="manta-wordmark" viewBox="214 230 1560 338" role="img" aria-label="Manta"><image filter="url(#manta-wordmark-alpha)" href="/brand/manta-wordmark.png" width="1983" height="793"/></svg>`;}
export function brand(){return wordmark();}
