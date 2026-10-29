import {button, icon} from '../ui/components.js';
export function AuraPage(){return `<main id="main-content" class="aura-page">
<section class="project-title section-pad aura-title">
<a class="text-link metadata" href="/projects">Projects ${icon('arrow')}</a>
<div class="aura-heading"><h1>Aura</h1><span class="metadata">MR-009 / Payments</span></div>
<p>A USD stablecoin and payments project for games.</p>
<div class="aura-prototype metadata">Prototype · testnet tokens · simulated banking</div>
</section>
<section class="aura-overview section-pad" aria-labelledby="aura-overview-title">
<div><span class="metadata">The project</span><h2 id="aura-overview-title">Payments for games.</h2></div>
<div class="aura-copy"><p>Aura is Manta’s proposed payment layer for in-game purchases and creator payouts. Manta’s games are the starting point.</p><p>The prototype will connect a test token, game checkout and merchant tools. Banking and reserve records will be simulated.</p><a href="#aura-scope" class="text-link">Explore the scope ${icon('arrow')}</a></div>
</section>
<section class="aura-scope section-pad" id="aura-scope" aria-labelledby="aura-scope-title"><div class="section-heading"><h2 id="aura-scope-title">What’s being built</h2><span class="metadata">Planned scope</span></div>
${[['01','Checkout','Buy a cosmetic inside a game. Confirm payment before delivering the item.'],['02','Creator payouts','Let merchants authorize payouts to creator wallets and track settlement.'],['03','Deposit & redeem','Test issuance and redemption with simulated bank deposits and withdrawals.'],['04','Transparency','Show simulated reserve assets, token supply and unpaid redemption claims together.']].map(([n,title,copy])=>`<article class="aura-scope-row"><span class="metadata">${n}</span><h3>${title}</h3><p>${copy}</p></article>`).join('')}
</section>
<section class="aura-state section-pad" aria-labelledby="aura-state-title"><div><span class="metadata">Current status</span><h2 id="aura-state-title">In development.</h2></div><div class="aura-copy"><p>The token and redemption escrow contracts are implemented and tested locally. Checkout and payout services are still being built.</p><p>Payment services are not available yet. No real funds are accepted.</p>${button('Explore Manta projects',{href:'/projects',ghost:true})}</div></section>
</main>`;}
