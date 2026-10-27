import test from 'node:test';
import assert from 'node:assert/strict';

test('seed project data is factual and absent metadata is null', async()=>{
 const {projects}=await import('../src/data/projects.ts');
 assert.deepEqual(projects.slice(0,4).map(p=>[p.code,p.name]),[['MR-001','Speedster'],['MR-002','Burkit'],['MR-003','OpenClaw'],['MR-004','orny.ai']]);
 assert.equal(JSON.stringify(projects).includes('TBD'),false);
 for(const p of projects){assert.equal(p.status,null);assert.equal(p.stage,null);assert.ok(p.description);}
 assert.ok(projects[0].image);assert.ok(projects[0].video);assert.equal(projects[0].link,'/projects/speedster/play');
 for(const p of projects.slice(1,4)){assert.equal(p.image,null);assert.equal(p.link,null);}
});
test('ARGUS is a geospatial intelligence project with a live external link',async()=>{
 const {projects}=await import('../src/data/projects.ts');
 const argus=projects.find(project=>project.slug==='argus');
 assert.deepEqual(argus&&{
  code:argus.code,
  name:argus.name,
  description:argus.description,
  category:argus.category,
  image:argus.image,
  link:argus.link,
 },{
  code:'MR-007',
  name:'ARGUS',
  description:'A live global intelligence map for tracking aircraft, vessels, infrastructure, and geopolitical activity.',
  category:'Geospatial intelligence',
  image:'/brand/argus.jpg',
  link:'https://argus-one-mu.vercel.app',
 });
});
test('status filtering is offered only for two or more known statuses',async()=>{
 const {projects}=await import('../src/data/projects.ts');const {FilterSegmented}=await import('../src/lab/components.js');const {filterProjects}=await import('../src/lab/project-model.js');
 assert.equal(FilterSegmented(projects),'');assert.equal(FilterSegmented([{status:'Live'}]),'');
 const list=[{status:'Live'},{status:'Beta'},{status:null}],markup=FilterSegmented(list);
 assert.match(markup,/Live/);assert.match(markup,/Beta/);assert.doesNotMatch(markup,/TBD|null/);
 assert.equal(filterProjects(list,'All').length,3);assert.equal(filterProjects(list,'Live').length,1);
});
test('one data entry creates a route and next-project relation without a registry',async()=>{
 const {projects}=await import('../src/data/projects.ts');const {projectRoutes,resolveRoute,nextProject}=await import('../src/lab/project-model.js');
 const extra={...projects[1],slug:'new-project',code:'MR-999',name:'New project'},list=[...projects,extra];
 assert.ok(projectRoutes(list).includes('/projects/new-project'));assert.equal(resolveRoute('/projects/new-project/',list).project,extra);assert.equal(nextProject(projects.at(-1),list),extra);assert.equal(nextProject(extra,list),list[0]);assert.equal(resolveRoute('/projects/missing',list).type,'not-found');assert.equal(resolveRoute('/projects/speedster/play',list).type,'play');
});
test('SEO contains factual descriptions and branded site identity schema',async()=>{
 const {projects}=await import('../src/data/projects.ts');const {pageSEO,organization,website,ogSVG,SITE_ORIGIN,seoHead}=await import('../src/lab/seo.js');
 const seo=pageSEO('/projects/burkit');assert.equal(seo.title,'Burkit | Manta');assert.match(seo.description,/insurtech/);assert.equal(seo.image,'/og/burkit.png');assert.equal(pageSEO('/').title,'Manta | Games, Insurtech and AI');
 assert.equal(SITE_ORIGIN,'https://manta.bet');assert.match(seoHead('/projects'),/https:\/\/manta\.bet\/projects/);
 assert.equal(organization.name,'Manta');assert.equal(organization.url,'https://manta.bet/');assert.match(organization.logo,/favicon-512\.png$/);
 assert.deepEqual(website,{'@context':'https://schema.org','@type':'WebSite',name:'Manta',url:'https://manta.bet/'});
 assert.match(seoHead('/'),/\"@type\":\"WebSite\"/);assert.doesNotMatch(seoHead('/projects'),/\"@type\":\"WebSite\"/);assert.match(ogSVG(projects[0]),/SPEEDSTER/);
});

test('homepage search metadata is descriptive and uses the apex canonical host',async()=>{
 const {pageSEO,seoHead}=await import('../src/lab/seo.js');const seo=pageSEO('/');
 assert.equal(seo.title,'Manta | Games, Insurtech and AI');
 assert.match(seo.description,/Speedster/);assert.match(seo.description,/PCL Pocket Racing/);
 assert.match(seoHead('/'),/<link rel="canonical" href="https:\/\/manta\.bet\/">/);
});
test('project components escape content and omit missing fields and empty sections',async()=>{
 const {projects}=await import('../src/data/projects.ts');const {ProjectRow,ProjectPage,StatusChip}=await import('../src/lab/components.js');
 const item={...projects[1],name:'<img src=x onerror=alert(1)>'};assert.ok(ProjectRow(item,1).includes('&lt;img'));assert.equal(ProjectRow(item,1).includes('<img src=x'),false);
 const detail=ProjectPage(projects[1],projects);assert.doesNotMatch(detail,/TBD|>Problem<|>Build<|>Result<|<dt>Status|<dt>Stack/);assert.match(detail,/manta-mark/);assert.equal(StatusChip(null),'');assert.match(StatusChip('Live'),/status-live/);
});
test('home contains only hero, project index, feature, and contact content',async()=>{
 const {renderPage}=await import('../src/lab/pages.js');const home=renderPage('/');
 assert.match(home,/hero-title/);assert.match(home,/Play Speedster/);assert.match(home,/View projects/);assert.match(home,/id="contact"/);
 assert.doesNotMatch(home,/TBD|id="pipeline"|id="lab-log"|plankton|rolling-track|Loading preview|A lab for what comes next|01 \/ The premise/);
 for(const path of ['/projects','/projects/burkit','/about'])assert.doesNotMatch(renderPage(path),/TBD|A lab for what comes next/);
});

test('public brand output uses Manta without the former two-word name',async()=>{
 const {renderPage}=await import('../src/lab/pages.js');
 const {seoHead}=await import('../src/lab/seo.js');
 const {brand}=await import('../src/ui/brand.js');
 const {IntroDialog}=await import('../src/lab/intro.js');
 const output=[renderPage('/'),renderPage('/about'),renderPage('/projects/burkit'),seoHead('/'),seoHead('/projects/burkit'),brand(),IntroDialog()].join('\n');
 assert.match(output,/MANTA|Manta/);
 assert.doesNotMatch(output,/Manta Ray|MANTA RAY/);
});
