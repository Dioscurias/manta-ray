export type Project = {
 slug:string; code:string; name:string; description:string; category:string;
 collection:'games'|'intelligence'|'crypto';
 status:string|null; stage:string|null; image:string|null; video?:string|null;
 link:string|null; stack?:string[]; links?:{label:string;url:string}[]; featured:boolean;
};

// Add one entry here to create its tile, detail route, and social image.
// Unknown facts stay null. The renderer omits them.
export const projects:Project[] = [
 {slug:'speedster',code:'MR-001',name:'Speedster',description:'Run at superhuman speed through real city maps, Austin first.',category:'Browser game',collection:'games',status:null,stage:null,image:'/brand/speedster-poster.jpg',video:'/brand/speedster-gameplay.mp4',link:'/projects/speedster/play',featured:true},
 {slug:'openclaw',code:'MR-003',name:'OpenClaw',description:'An AI agent orchestration framework.',category:'AI framework',collection:'intelligence',status:null,stage:null,image:null,link:null,featured:false},
 {slug:'orny-ai',code:'MR-004',name:'orny.ai',description:'An AI auditing tool.',category:'AI auditing',collection:'intelligence',status:null,stage:null,image:null,link:null,featured:false},
 {slug:'pcl-pocket-racing',code:'MR-006',name:'PCL Pocket Racing',description:'Toy-sized arcade racing through the PCL stacks. Drift, use library-themed items, and race your friends.',category:'Browser game',collection:'games',status:null,stage:null,image:'/brand/pcl-pocket-racing.jpg',link:'https://pcl-pocket-racing.vercel.app',stack:['Three.js','WebRTC'],featured:false},
 {slug:'argus',code:'MR-007',name:'ARGUS',description:'A live global intelligence map for tracking aircraft, vessels, infrastructure, and geopolitical activity.',category:'Geospatial intelligence',collection:'intelligence',status:null,stage:null,image:'/brand/argus.jpg',link:'https://argus-one-mu.vercel.app',featured:false},
 {slug:'upcoming-token',code:'MR-008',name:'Upcoming Token',description:'A crypto token in development. More details coming soon.',category:'Crypto token',collection:'crypto',status:'Coming soon',stage:null,image:null,link:null,featured:false},
 {slug:'aura',code:'MR-009',name:'Aura',description:'A USD stablecoin and payments project for games.',category:'Payments',collection:'crypto',status:null,stage:null,image:'/brand/aura.svg',link:null,featured:false}
];
