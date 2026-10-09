// VTech uPVC Lite: a compact, single-file version of the main landing page.
// Same real data (data.js) and real photos from vtechwindows.com, resized to WebP in img/.
// CSS and JS are inlined and minified into index.html. Run: node build.js
const fs = require('fs');
const path = require('path');
const { PRODUCTS, GROUPS } = require('./data.js');

const I = 'img/';
const PH = {
  'inward-outward-opening-windows': 'vtech-outward-opening-window-640x522-1',
  'top-hung-casement-window': 'fixed-glazing-casement',
  'tilt-and-turn-casement-window': 'WindowVentilation_iStock-830679624-e1629969808748-640x522-1',
  'fixed-glazing-casement-window': 'picture-window-with-casement-flankers-640x522-1',
  'french-door': 'French-Door-640x522-1',
  'multi-sliding-doors': 'Multi-Sliding-Doors-640x522-1',
  'two-track-sliding-windows': 'sliding-window-for-Living-Room-Design-640x522-1',
  'three-track-sliding-windows': 'UPVC-PROFILE-172-640x522-1',
  'monorail-sliding-windows': 'Monorail-sliding-windows',
  'fly-mesh-sliding-windows': 'Fly-Mesh-sliding-windows',
};
const img = (n) => I + n + '.webp';
const CLIENTS = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((n) => img('Picture' + n));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const LOGO = img('cropped-vtech-new-logo-150x150');
const HERO = img('WhatsApp-Image-2023-10-03-at-6');

const cards = PRODUCTS.map((p, i) => `<article class="card rv" style="--d:${(i % 3) * 110}" data-g="${p.group}" id="${p.id}">
<div class="im"><img src="${img(PH[p.id])}" alt="${esc(p.name)}, image from vtechwindows.com" width="640" height="522" loading="lazy"></div>
<div class="card__b"><p class="tag">${String(i + 1).padStart(2, '0')} · ${esc(GROUPS.find((g) => g.id === p.group).name)}</p><h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p>
<details><summary>Features${p.specs.length ? ' &amp; specs' : ''}</summary><ul>${p.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>${p.specs.length ? `<dl>${p.specs.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : ''}</details>
<div class="card__cta"><a class="btn" href="#enquiry" data-enq="${i}">Enquire now</a><a class="lnk" href="${p.url}" target="_blank" rel="noopener">Details ↗</a></div></div></article>`).join('');

const show = `<div class="sx" style="--n:${PRODUCTS.length}"><div class="sx__pin"><div class="w sx__in">
<div class="sx__stage" aria-hidden="true"><span class="sx__big" id="sxBig">01</span>${PRODUCTS.map((p, i) => `<figure class="sx__ph" style="--i:${i}"><img src="${img(PH[p.id])}" alt="" width="640" height="522"${i > 2 ? ' loading="lazy"' : ''}></figure>`).join('')}<span class="sx__frame"></span></div>
<div class="sx__info">${PRODUCTS.map((p, i) => `<article class="sx__it" id="${p.id}" data-i="${i}"><p class="tag">${String(i + 1).padStart(2, '0')} / ${PRODUCTS.length} · ${esc(GROUPS.find((g) => g.id === p.group).name)}</p><h3>${esc(p.name)}</h3><p class="sx__d">${esc(p.desc)}</p><ul>${p.features.slice(0, 3).map((f) => `<li>${esc(f)}</li>`).join('')}</ul>${p.specs.length ? `<dl>${p.specs.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : ''}<div class="card__cta"><a class="btn" href="#enquiry" data-enq="${i}">Enquire now</a><a class="lnk" href="${p.url}" target="_blank" rel="noopener">Full details ↗</a></div><img class="sx__mob" src="${img(PH[p.id])}" alt="${esc(p.name)}, image from vtechwindows.com" width="640" height="522" loading="lazy"></article>`).join('')}</div>
<ol class="sx__nav" aria-label="All products">${PRODUCTS.map((p, i) => `<li><button type="button" data-go="${i}"><b>${String(i + 1).padStart(2, '0')}</b>${esc(p.name)}</button></li>`).join('')}</ol>
<div class="sx__bar" aria-hidden="true"><i></i></div></div></div></div>`;
const filters = `<button class="on" data-f="all">All (${PRODUCTS.length})</button>` + GROUPS.map((g) => `<button data-f="${g.id}">${esc(g.name)} (${PRODUCTS.filter((p) => p.group === g.id).length})</button>`).join('');

const benefits = [
  ['Thermal insulation', 'Low thermal conductivity keeps rooms comfortable.'],
  ['Noise insulation', 'Strong insulation against ambient noise.'],
  ['Weather resistant', 'Unaffected by climate; will not rot, warp or fade.'],
  ['Low maintenance', 'No painting or varnishing. Clean with dishwashing liquid.'],
  ['Steel reinforced', 'Galvanised steel inside the chambers adds strength.'],
  ['Recyclable', 'uPVC is 100% recyclable, as stated by VTech.'],
];
const faqs = [
  ['Which window suits which space?', 'Outward-opening windows save interior space, sliding windows save space and let in more sunlight, tilt and turn windows give draft-free ventilation, and multi sliding doors give a panoramic view.'],
  ['What colours are offered?', 'VTech’s consultation form offers White and Wooden Finish. The French Door page lists various colours, designs and hardware.'],
  ['Is double glazing available?', 'The Inward Outward Opening page states single or double glazing is available; the Fly Mesh page lists 5 mm to 12 mm glass.'],
  ['How do I get a quotation?', 'Use the form below, call +91 97404 22863 or +91 99801 11468, or email vtechbuildingsystems@gmail.com.'],
];

const css = `
:root{--b:#02409A;--b2:#0854B5;--sky:#6EC1E4;--grn:#61CE70;--ink:#0E0F12;--tx:#453E3E;--mu:#4B4F58;--bg:#F4F4F4;--ln:#e2e4e8;--f:Verdana,Geneva,sans-serif}
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth;scroll-padding-top:70px}
body{font:15px/1.65 var(--f);color:var(--tx);background:#fff;-webkit-font-smoothing:antialiased}
img{display:block;max-width:100%;height:auto}a{color:inherit}ul{list-style:none}
:focus-visible{outline:3px solid var(--sky);outline-offset:2px}
h1,h2,h3{color:var(--ink);line-height:1.15;letter-spacing:-.02em}
.w{max-width:1180px;margin:0 auto;padding:0 20px}.sec{padding:72px 0}.sec--g{background:var(--bg)}
.k{font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--b);margin-bottom:10px}
.h2{font-size:clamp(26px,3.6vw,40px);margin-bottom:14px}.lead{color:var(--mu);max-width:640px}
.btn{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 22px;border:0;border-radius:4px;background:var(--b);color:#fff;font:700 12.5px var(--f);letter-spacing:.06em;text-transform:uppercase;text-decoration:none;cursor:pointer;transition:background .25s,transform .25s}
.btn:hover{background:var(--b2);transform:translateY(-2px)}.btn--o{background:transparent;border:1.5px solid #fff}.btn--o:hover{background:#fff;color:var(--b)}
.top{background:#000;color:#fff;font-size:12.5px;text-align:center;padding:7px 12px}.top a{text-decoration:none;margin:0 8px}
.nav{position:sticky;top:0;z-index:20;background:rgba(255,255,255,.95);backdrop-filter:blur(8px);border-bottom:1px solid var(--ln)}
.nav .w{display:flex;align-items:center;gap:20px;height:64px}.logo{display:flex;align-items:center;gap:10px;font-weight:700;color:var(--ink);text-decoration:none}
.nav nav{display:flex;gap:18px;margin-left:auto;font-size:13.5px}.nav nav a{text-decoration:none;color:var(--mu)}.nav nav a:hover{color:var(--b)}
.band{height:4px;background:linear-gradient(90deg,var(--b2),var(--grn))}
.hero{position:relative;min-height:min(84vh,720px);display:flex;align-items:center;color:#fff;overflow:hidden}
.hero>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;animation:kb 18s ease-out both}
.hero:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(14,15,18,.85),rgba(2,64,154,.35))}
.hero .w{position:relative;z-index:1;width:100%}.hero h1{color:#fff;font-size:clamp(34px,6vw,64px);margin-bottom:16px}.hero h1 span{color:var(--sky)}
.hero p{max-width:540px;margin-bottom:26px;color:#e8eaee}.hero .k{color:var(--sky)}.row{display:flex;flex-wrap:wrap;gap:12px}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--ln);border:1px solid var(--ln);border-radius:8px;overflow:hidden;margin-top:-40px;position:relative;z-index:2}
.stats div{background:#fff;padding:20px;text-align:center}.stats b{display:block;font-size:30px;color:var(--b)}.stats span{font-size:12px;color:var(--mu)}
.note{font-size:12px;color:var(--mu);margin-top:8px}
.fl{display:flex;flex-wrap:wrap;gap:8px;margin:24px 0}.fl button{padding:9px 16px;border:1.5px solid var(--ln);border-radius:4px;background:#fff;font:13px var(--f);color:var(--tx);cursor:pointer}
.fl button.on,.fl button:hover{border-color:var(--b);background:var(--b);color:#fff}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px}
.card{display:flex;flex-direction:column;background:#fff;border:1px solid var(--ln);border-radius:8px;overflow:hidden;transition:box-shadow .3s,transform .3s}
.card:hover{transform:translateY(-4px);box-shadow:0 18px 40px -20px rgba(2,64,154,.45)}.card[hidden]{display:none}
.card img{aspect-ratio:640/522;object-fit:cover}.card__b{display:flex;flex-direction:column;gap:8px;padding:18px;flex:1}
.tag{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--b)}.card h3{font-size:18px}.card__b>p{font-size:14px;color:var(--mu)}
details{font-size:13.5px;border-top:1px solid var(--ln);padding-top:8px}summary{cursor:pointer;font-weight:700;color:var(--ink)}
details li{padding-left:16px;position:relative;margin-top:4px}details li:before{content:"✓";position:absolute;left:0;color:var(--b)}
dl{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}dl div{background:var(--bg);padding:6px 10px;border-radius:4px}dt{font-size:11px;color:var(--mu)}dd{font-weight:700}
.card__cta{display:flex;align-items:center;gap:16px;margin-top:auto;padding-top:8px}.lnk{font-size:13px;color:var(--b);font-weight:700;text-decoration:none}
.two{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center}.two img{border-radius:8px}
.vm{display:grid;gap:12px;margin-top:20px}.vm div{border-left:3px solid var(--b);background:#fff;padding:12px 16px;border-radius:0 6px 6px 0}.vm b{color:var(--ink)}
.ben{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:24px}.ben li{background:#fff;border:1px solid var(--ln);border-radius:8px;padding:22px;border-top:3px solid var(--b)}
.ben h3{font-size:16px;margin-bottom:6px}.ben p{font-size:14px;color:var(--mu)}
.war{margin-top:24px;max-width:560px}
.mq{overflow:hidden;margin-top:24px;-webkit-mask:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
.mq div{display:flex;gap:14px;width:max-content;animation:mq 40s linear infinite}.mq span{display:grid;place-items:center;width:140px;height:80px;padding:10px;background:#fff;border:1px solid var(--ln);border-radius:6px}.mq img{max-height:58px;width:auto}
.faq{max-width:820px;display:grid;gap:10px;margin-top:20px}.faq details{background:#fff;border:1px solid var(--ln);border-radius:6px;padding:14px 18px}.faq p{margin-top:8px;color:var(--mu)}
.enq{background:var(--ink);color:#e8eaee}.enq h2{color:#fff}.enq .k{color:var(--sky)}.ct{display:grid;gap:12px;margin-top:20px;font-size:14px}.ct b{display:block;color:var(--sky);font-size:11px;letter-spacing:.16em;text-transform:uppercase}
form{display:grid;grid-template-columns:1fr 1fr;gap:12px;background:#fff;color:var(--tx);padding:24px;border-radius:8px}
.f{display:grid;gap:4px}.f--w{grid-column:1/-1}label{font-size:13px;font-weight:700;color:var(--ink)}label i{font-weight:400;color:var(--mu)}
input,select,textarea{width:100%;padding:11px 12px;font:14px var(--f);color:var(--ink);border:1.5px solid #cfd3d9;border-radius:4px;background:#fff}
input:focus,select:focus,textarea:focus{outline:none;border-color:var(--b)}[aria-invalid=true]{border-color:#b00500}.err{color:#b00500;font-size:12px}
.ck{grid-column:1/-1;display:flex;gap:8px;align-items:flex-start;font-size:13px}.ck input{width:auto;margin-top:3px}.hp{position:absolute;left:-9999px}
form .btn{grid-column:1/-1}#st{grid-column:1/-1;font-size:14px}#st.ok{color:#14532d}#st.bad{color:#b00500}
footer{background:#000;color:#c9cdd3;font-size:13px;padding:26px 0}footer .w{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px}
.fab{position:fixed;right:16px;bottom:16px;z-index:30;box-shadow:0 10px 24px -8px rgba(2,64,154,.7)}
.rv{opacity:0;transform:translateY(24px);transition:opacity .7s,transform .7s}.rv.in{opacity:1;transform:none}
@keyframes kb{from{transform:scale(1.12)}}@keyframes mq{to{transform:translateX(-50%)}}
.prog{position:fixed;top:0;left:0;right:0;height:3px;z-index:40;background:linear-gradient(90deg,var(--b2),var(--grn));transform-origin:0 50%;transform:scaleX(var(--p,0))}
.nav{transition:box-shadow .3s}.nav.sh{box-shadow:0 8px 24px -16px rgba(14,15,18,.35)}
.hero .w>*{opacity:0;transform:translateY(26px);animation:up .9s cubic-bezier(.2,.8,.2,1) forwards}
.hero .w>*:nth-child(1){animation-delay:.1s}.hero .w>*:nth-child(3){animation-delay:.55s}.hero .w>*:nth-child(4){animation-delay:.7s}
.hero h1{opacity:1!important;transform:none!important;animation:none!important}
.hero h1 .l{display:block;overflow:hidden;padding-bottom:.06em}.hero h1 .l>span{display:inline-block;transform:translateY(110%);animation:upl 1s cubic-bezier(.2,.8,.2,1) forwards}
.hero h1 .l:nth-child(2)>span{animation-delay:.15s}.hero h1 .l:first-child>span{color:#fff}
.hero>img{will-change:transform}
.k{display:inline-flex;align-items:center;gap:10px}.k:before{content:"";width:0;height:2px;background:currentColor;transition:width .8s .2s cubic-bezier(.2,.8,.2,1)}.in .k:before,.k.in:before,.hero .k:before{width:28px}
.btn{position:relative;overflow:hidden}.btn:after{content:"";position:absolute;inset:0;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.35) 50%,transparent 65%);transform:translateX(-120%);transition:transform .7s}.btn:hover:after{transform:translateX(120%)}
.card{transform-style:preserve-3d;will-change:transform}.card .im{overflow:hidden;position:relative}.card .im img{transition:transform .9s cubic-bezier(.2,.8,.2,1)}.card:hover .im img{transform:scale(1.07)}
.card .im:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 55%,rgba(2,64,154,.35));opacity:0;transition:opacity .4s}.card:hover .im:after{opacity:1}
.card.rv{transition:opacity .7s,transform .7s,box-shadow .3s;transition-delay:calc(var(--d,0)*1ms)}.card.rv.in:hover{transition-delay:0s}.card.pop{animation:pop .5s cubic-bezier(.2,.8,.2,1) both}
.rv{transition-delay:calc(var(--d,0)*1ms)}
.ben li{transition:transform .35s,box-shadow .35s,border-color .35s}.ben li:hover{transform:translateY(-5px);box-shadow:0 18px 36px -22px rgba(2,64,154,.5)}
.stats div{transition:background .3s}.stats div:hover{background:#f7f9fd}
.two img{transition:transform .6s cubic-bezier(.2,.8,.2,1)}.two img:hover{transform:scale(1.02)}
.faq details[open] p{animation:up .45s both}
.fab{animation:pulse 2.4s infinite}
@keyframes up{to{opacity:1;transform:none}}@keyframes upl{to{transform:none}}@keyframes pop{from{opacity:0;transform:scale(.94) translateY(12px)}}
@keyframes pulse{0%,100%{box-shadow:0 10px 24px -8px rgba(2,64,154,.7),0 0 0 0 rgba(8,84,181,.45)}60%{box-shadow:0 10px 24px -8px rgba(2,64,154,.7),0 0 0 14px rgba(8,84,181,0)}}
@media(prefers-reduced-motion:reduce){.hero .w>*,.hero h1 .l>span{opacity:1;transform:none}}
html,body{overflow-x:clip}
.hero{perspective:1400px}.hero .w>*{max-width:560px}
.orb{position:absolute;right:max(-40px,calc(50% - 620px));top:50%;width:520px;height:420px;margin-top:-210px;transform-style:preserve-3d;z-index:1;pointer-events:none}
.orb__r{position:absolute;inset:0;transform-style:preserve-3d;transform:rotateX(calc(-8deg + var(--my,0)*10deg)) rotateY(calc(var(--mx,0)*16deg));transition:transform .8s cubic-bezier(.2,.8,.2,1)}
.orb figure{position:absolute;left:50%;top:50%;width:200px;margin:-82px 0 0 -100px;transform:rotateY(calc(var(--i)*36deg + var(--a,0deg))) translateZ(320px);backface-visibility:hidden;border:6px solid #fff;border-radius:6px;box-shadow:0 30px 50px -20px rgba(0,0,0,.6);background:#fff}
.orb figure img{aspect-ratio:640/522;object-fit:cover}.orb figcaption{position:absolute;left:0;right:0;bottom:-28px;font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:#fff;text-align:center;text-shadow:0 2px 8px #000}
.orb__floor{position:absolute;left:50%;top:80%;width:760px;height:760px;margin:-380px 0 0 -380px;transform:rotateX(90deg);border-radius:50%;background:radial-gradient(rgba(110,193,228,.4),transparent 62%);animation:fl 4s ease-in-out infinite}
@keyframes fl{50%{opacity:.45}}
.glow{position:fixed;left:0;top:0;width:420px;height:420px;margin:-210px 0 0 -210px;border-radius:50%;background:radial-gradient(rgba(8,84,181,.14),transparent 65%);pointer-events:none;z-index:1;transform:translate(var(--gx,-600px),var(--gy,-600px))}
main{position:relative;z-index:2}
.h2 .wd{display:inline-block;overflow:hidden;vertical-align:top;perspective:600px;padding-bottom:.08em}.h2 .wd>span{display:inline-block;transform:translateY(100%) rotateX(-70deg);transform-origin:50% 100%;opacity:0;transition:transform .9s cubic-bezier(.2,.8,.2,1),opacity .6s;transition-delay:calc(var(--w)*55ms)}
.h2.in .wd>span{transform:none;opacity:1}
.grid{perspective:1400px}.card.rv{transform:translateY(70px) rotateX(18deg);transform-origin:50% 0}.card.rv.in{transform:none}
.card .im img{clip-path:inset(0 0 100% 0);transition:clip-path 1.1s cubic-bezier(.7,0,.2,1),transform .9s cubic-bezier(.2,.8,.2,1);transition-delay:calc(var(--d,0)*1ms + 150ms),0s}.card.in .im img{clip-path:inset(0)}
.card:before,.ben li:before{content:"";position:absolute;inset:0;border-radius:inherit;background:radial-gradient(260px circle at var(--sx,50%) var(--sy,50%),rgba(110,193,228,.22),transparent 60%);opacity:0;transition:opacity .3s;pointer-events:none;z-index:2}
.card,.ben li{position:relative}.card:hover:before,.ben li:hover:before{opacity:1}
.kin{overflow:hidden;padding:34px 0;background:var(--ink);transform:skewY(-2deg);margin:30px 0}
.kin__t{white-space:nowrap;font-size:clamp(40px,7vw,96px);font-weight:700;letter-spacing:-.02em;color:#fff;line-height:1.15;will-change:transform}
.kin__t--o{color:transparent;-webkit-text-stroke:1.5px var(--sky)}
.tilt3{transform:perspective(1000px) rotateY(var(--ry,0deg)) rotateX(var(--rx,0deg));box-shadow:0 40px 70px -40px rgba(2,64,154,.6)}
.stats{transform:perspective(900px) rotateX(var(--sr,0deg));transform-origin:50% 0}
.enq{position:relative;overflow:hidden}.enq:before{content:"";position:absolute;left:-50%;right:-50%;bottom:-20%;height:70%;background-image:linear-gradient(rgba(110,193,228,.18) 1px,transparent 1px),linear-gradient(90deg,rgba(110,193,228,.18) 1px,transparent 1px);background-size:60px 60px;transform:perspective(500px) rotateX(62deg);animation:grid 3s linear infinite;-webkit-mask:linear-gradient(transparent,#000 60%);mask:linear-gradient(transparent,#000 60%)}
.enq .w{position:relative}@keyframes grid{to{background-position:0 60px}}
@media(max-width:1000px){.hero{flex-direction:column;justify-content:center;padding:40px 0 120px}.orb{position:relative;right:auto;top:auto;margin:10px auto 0;width:300px;height:260px}.orb figure{width:130px;margin:-53px 0 0 -65px;transform:rotateY(calc(var(--i)*36deg + var(--a,0deg))) translateZ(210px)}.orb figcaption{display:none}.orb__floor{width:460px;height:460px;margin:-230px 0 0 -230px}}
@media(prefers-reduced-motion:reduce){.h2 .wd>span{transform:none;opacity:1}.card .im img{clip-path:none}.card.rv{transform:none}}
.sec--show{padding-bottom:0}
.sx{position:relative;height:calc(var(--n)*65vh + 100vh)}
.sx__pin{position:sticky;top:68px;height:calc(100vh - 68px);display:flex;align-items:center;overflow:hidden}
.sx__in{display:grid;grid-template-columns:1.15fr 1fr 210px;gap:44px;align-items:center;width:100%}
.sx__stage{position:relative;aspect-ratio:640/522;perspective:1600px;transform-style:preserve-3d}
.sx__big{position:absolute;left:-26px;top:-70px;font-size:clamp(110px,14vw,210px);font-weight:700;line-height:1;color:transparent;-webkit-text-stroke:2px rgba(2,64,154,.25);z-index:0;transition:transform .6s cubic-bezier(.2,.8,.2,1)}
.sx__ph{position:absolute;inset:0;border:10px solid #fff;border-radius:6px;background:#fff;box-shadow:0 40px 70px -35px rgba(14,15,18,.55),0 0 0 1px var(--ln);transform-origin:50% 0;
  --x:clamp(-1,var(--o),4);transform:translate3d(calc(var(--x)*34px),calc(var(--x)*-22px),calc(var(--x)*-140px)) rotateY(calc(var(--x)*-7deg));opacity:calc(1 - var(--x)*.22);z-index:calc(20 - var(--o));
  transition:transform 1s cubic-bezier(.2,.8,.2,1),opacity .8s,filter .8s;filter:saturate(calc(1 - var(--x)*.3)) brightness(calc(1 - var(--x)*.06))}
.sx__ph img{width:100%;height:100%;object-fit:cover}
.sx__ph.gone{transform:translate3d(-30px,40px,120px) rotateX(-95deg);opacity:0}
.sx__ph.far{opacity:0;pointer-events:none}
.sx__frame{position:absolute;inset:-18px;border:2px solid var(--b);border-radius:8px;z-index:30;pointer-events:none;clip-path:inset(0 0 0 0);animation:fr 1.2s cubic-bezier(.2,.8,.2,1)}
.sx__stage.flip .sx__frame{animation:fr2 .9s cubic-bezier(.2,.8,.2,1)}
@keyframes fr2{0%{clip-path:inset(0 100% 100% 0)}100%{clip-path:inset(0)}}
.sx__info{position:relative;min-height:440px}
.sx__it{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;gap:12px;visibility:hidden}
.sx__it>*{opacity:0;transform:translateY(26px);transition:opacity .5s,transform .7s cubic-bezier(.2,.8,.2,1)}
.sx__it.on{visibility:visible}.sx__it.on>*{opacity:1;transform:none}
.sx__it.on>*:nth-child(2){transition-delay:.06s}.sx__it.on>*:nth-child(3){transition-delay:.12s}.sx__it.on>*:nth-child(4){transition-delay:.18s}.sx__it.on>*:nth-child(5){transition-delay:.24s}.sx__it.on>*:nth-child(6){transition-delay:.3s}
.sx__it h3{font-size:clamp(26px,3vw,40px);line-height:1.1}.sx__d{color:var(--mu);font-size:15px}
.sx__it li{padding-left:22px;position:relative;font-size:14px;margin-top:4px}.sx__it li:before{content:"";position:absolute;left:0;top:.5em;width:10px;height:10px;border-radius:2px;background:linear-gradient(135deg,var(--b2),var(--grn))}
.sx__nav{list-style:none}
.sec--show{position:relative;background:radial-gradient(900px 500px at 85% 10%,rgba(110,193,228,.18),transparent 60%),radial-gradient(700px 500px at 0% 80%,rgba(97,206,112,.12),transparent 60%),linear-gradient(180deg,#fff,#f3f6fb)}
.sx__in{grid-template-columns:1.3fr 1fr 200px;gap:56px}
.sx__stage:before{content:"";position:absolute;inset:8% -7% -9% 9%;border-radius:14px;background:linear-gradient(135deg,var(--b),var(--b2) 55%,var(--grn));transform:translateZ(-260px) rotate(-3deg);box-shadow:0 50px 90px -40px rgba(2,64,154,.7)}
.sx__stage:after{content:"";position:absolute;width:120px;height:120px;left:-44px;top:-44px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#fff,var(--sky) 45%,var(--b2));opacity:.9;transform:translateZ(80px);animation:bob 5s ease-in-out infinite;z-index:40;mix-blend-mode:multiply}
@keyframes bob{50%{transform:translateZ(80px) translateY(18px)}}
.sx__big{-webkit-text-stroke:2px rgba(2,64,154,.35);z-index:35;left:auto;right:-10px;top:auto;bottom:-60px}
.sx__it h3{background:linear-gradient(90deg,var(--ink),var(--b));-webkit-background-clip:text;background-clip:text;color:transparent}
.sx__it .tag{display:inline-block;align-self:flex-start;padding:5px 10px;border-radius:999px;background:rgba(2,64,154,.08)}
.sx__it dl div{background:#fff;border:1px solid var(--ln)}
.sx__mob{display:none}
.sx__nav{display:grid;gap:2px;border-left:2px solid var(--ln)}
.sx__nav button{display:flex;gap:10px;width:100%;padding:7px 12px;border:0;background:none;text-align:left;font:12.5px var(--f);color:var(--mu);cursor:pointer;margin-left:-2px;border-left:2px solid transparent;transition:color .3s,border-color .3s,padding .3s}
.sx__nav button b{color:#9aa1ab;font-weight:700}.sx__nav button:hover{color:var(--ink)}
.sx__nav button.on{color:var(--ink);font-weight:700;border-color:var(--b);padding-left:18px}.sx__nav button.on b{color:var(--b)}
.sx__bar{position:absolute;left:0;right:0;bottom:22px;height:2px;background:var(--ln)}.sx__bar i{display:block;height:100%;background:linear-gradient(90deg,var(--b2),var(--grn));transform-origin:0;transform:scaleX(var(--sp,0))}
.fl button[data-go].on{border-color:var(--b);background:var(--b);color:#fff}
@media(max-width:1100px){.sx__in{grid-template-columns:1fr 1fr;gap:36px}.sx__stage{margin-left:34px}.sx__nav{display:none}}
@media(max-width:760px){.sx{height:calc(var(--n)*55vh + 100svh)}.sx__pin{top:60px;height:calc(100svh - 60px);align-items:flex-start;padding-top:18px}
  .sx__in{display:flex;flex-direction:column;gap:18px}.sx__stage{width:78%;margin:14px auto 0 6%}.sx__stage:after{width:70px;height:70px;left:-26px;top:-26px}
  .sx__big{font-size:84px;right:-30px;bottom:-34px}.sx__ph{border-width:6px}
  .sx__in{height:100%;padding-bottom:30px}.sx__info{min-height:0;flex:1;width:100%}.sx__it{justify-content:flex-start;gap:8px}
  .sx__it h3{font-size:22px}.sx__d{font-size:13.5px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
  .sx__it dl{display:none}.sx__it li{font-size:13px}.sx__it .card__cta{padding-top:4px}.sx__bar{bottom:10px}}
@media(prefers-reduced-motion:reduce){.sx__ph,.sx__it>*{transition:none}}
@media(max-width:860px){.nav nav{display:none}.two,form{grid-template-columns:1fr}.ben{grid-template-columns:1fr 1fr}.stats{grid-template-columns:1fr 1fr}.sec{padding:56px 0}}
@media(max-width:520px){.ben{grid-template-columns:1fr}.top a:nth-child(n+2){display:none}}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.rv{opacity:1;transform:none}html{scroll-behavior:auto}}`;

const data = { groups: GROUPS.map((g) => ({ q: g.quote, t: PRODUCTS.filter((p) => p.group === g.id).map((p) => p.name) })), p: PRODUCTS.map((p) => [GROUPS.find((g) => g.id === p.group).quote, p.name]) };
const js = `
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],D=${JSON.stringify(data)};
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});$$('.rv').forEach(el=>io.observe(el));
const cat=$('#fcat'),typ=$('#ftype'),st=$('#st');
cat.innerHTML='<option value="">Select category</option>'+D.groups.map(g=>'<option>'+g.q+'</option>').join('')+'<option>Not sure yet</option>';
const fill=v=>{const g=D.groups.find(x=>x.q===cat.value);typ.innerHTML='<option value="">Not sure yet</option>'+(g?g.t:D.groups.flatMap(x=>x.t)).map(t=>'<option>'+t+'</option>').join('');if(v)typ.value=v};fill();cat.onchange=()=>fill();
$$('[data-enq]').forEach(a=>a.addEventListener('click',()=>{const p=D.p[a.dataset.enq];if(p){cat.value=p[0];fill(p[1])}}));
const R={name:v=>v.trim().length<2?'Please enter your full name.':'',phone:v=>v.replace(/\\D/g,'').length<10?'Enter a valid phone number (at least 10 digits).':'',email:v=>v&&!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v)?'Enter a valid email or leave it blank.':'',city:v=>v.trim().length<2?'Please enter your city.':'',category:v=>v?'':'Please choose a category.',consent:(v,el)=>el.checked?'':'Please confirm consent.'};
const ck=el=>{const r=R[el.name];if(!r)return true;const m=r(el.value,el),e=el.closest('.f,.ck').querySelector('.err');if(e)e.textContent=m;el.setAttribute('aria-invalid',!!m);return!m};
const form=$('form');$$('input,select',form).forEach(el=>el.addEventListener('blur',()=>ck(el)));
form.onsubmit=e=>{e.preventDefault();const bad=$$('input,select',form).filter(el=>R[el.name]&&!ck(el));if(bad.length){st.className='bad';st.textContent='Please fix the highlighted fields.';bad[0].focus();return}
const d=Object.fromEntries(new FormData(form));if(d.website)return;
const t=[['Name',d.name],['Phone',d.phone],['Email',d.email],['City',d.city],['Category',d.category],['Type',d.type],['Colour',d.colour],['Details',d.details]].filter(x=>x[1]&&x[1].trim()).map(x=>x[0]+': '+x[1]).join('\\n');
location.href='mailto:vtechbuildingsystems@gmail.com?subject='+encodeURIComponent('uPVC enquiry: '+(d.type||d.category))+'&body='+encodeURIComponent(t);
st.className='ok';st.innerHTML='Your email app should now open with this enquiry filled in. <b>It is not sent until you press Send there.</b> No email app? Call <a href="tel:+919740422863">+91 97404 22863</a>.'};
const cio=new IntersectionObserver(e=>e.forEach(x=>{if(!x.isIntersecting)return;cio.unobserve(x.target);const el=x.target,to=+el.dataset.c,t0=performance.now();(function s(t){const k=Math.min(1,(t-t0)/1200);el.textContent=Math.round(to*(1-Math.pow(1-k,3)))+(el.dataset.s||'');if(k<1)requestAnimationFrame(s)})(t0)}),{threshold:.6});$$('[data-c]').forEach(el=>cio.observe(el));

const sx=$('.sx'),phs=$$('.sx__ph'),its=$$('.sx__it'),nbs=$$('.sx__nav button'),stg=$('.sx__stage'),big=$('#sxBig'),fams=$$('.fl button[data-go]');let sxA=-1;
const sxDesk=()=>true;
const sxSet=a=>{if(a===sxA)return;sxA=a;phs.forEach((f,i)=>{const o=i-a;f.style.setProperty('--o',o);f.classList.toggle('gone',o<0);f.classList.toggle('far',o>3)});
its.forEach((t,i)=>{const on=i===a;t.classList.toggle('on',on);if(sxDesk()){t.toggleAttribute('inert',!on);t.setAttribute('aria-hidden',!on)}else{t.removeAttribute('inert');t.removeAttribute('aria-hidden')}});
nbs.forEach((b,i)=>b.classList.toggle('on',i===a));big.textContent=String(a+1).padStart(2,'0');
const g=its[a].querySelector('.tag').textContent.split('· ')[1];fams.forEach(b=>b.classList.toggle('on',b.textContent.startsWith(g)));
stg.classList.remove('flip');void stg.offsetWidth;stg.classList.add('flip')};
const sxY=i=>sx.getBoundingClientRect().top+scrollY+(i+.5)/phs.length*(sx.offsetHeight-innerHeight);
const sxTick=()=>{if(!sxDesk()){sxSet(0);return}const r=sx.getBoundingClientRect(),sp=Math.min(1,Math.max(0,-r.top/(r.height-innerHeight)));sx.style.setProperty('--sp',sp.toFixed(4));sxSet(Math.min(phs.length-1,Math.floor(sp*phs.length)))};
addEventListener('scroll',sxTick,{passive:true});addEventListener('resize',sxTick);sxTick();
[...nbs,...fams].forEach(b=>b.addEventListener('click',()=>{const i=+b.dataset.go;if(sxDesk())scrollTo({top:sxY(i),behavior:rm?'auto':'smooth'});else document.getElementById(its[i].id).scrollIntoView({behavior:rm?'auto':'smooth'})}));
const rm=matchMedia('(prefers-reduced-motion: reduce)').matches,pr=$('.prog'),nv=$('.nav'),hi=$('.hero>img');let tk=0;
const onS=()=>{tk=0;const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;pr.style.setProperty('--p',(y/h).toFixed(4));nv.classList.toggle('sh',y>10);if(!rm&&y<innerHeight)hi.style.transform='translateY('+(y*.28)+'px) scale(1.06)'};
addEventListener('scroll',()=>{if(!tk)tk=requestAnimationFrame(onS)},{passive:true});onS();
$$('.k').forEach(el=>io.observe(el));
if(!rm&&matchMedia('(hover:hover)').matches)$$('.card').forEach(c=>{c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform='perspective(900px) rotateY('+x*6+'deg) rotateX('+(-y*6)+'deg) translateY(-4px)'});c.addEventListener('pointerleave',()=>c.style.transform='')});
$$('.h2').forEach(h=>{let n=0;h.innerHTML=h.textContent.split(' ').map(w=>'<span class="wd"><span style="--w:'+(n++)+'">'+w+'</span></span>').join(' ');io.observe(h)});
const orb=$('.orb'),figs=$$('.orb figure'),kts=$$('.kin__t'),t3=$('.tilt3'),stt=$('.stats'),gl=$('.glow');let ang=0,vel=0,ly=scrollY,lt=performance.now(),kx=0;
const loop=t=>{const dt=Math.min(.05,(t-lt)/1000);lt=t;const y=scrollY,dy=y-ly;ly=y;vel=vel*.9+dy*.1;
if(!rm){ang+=dt*(14+Math.min(60,Math.abs(vel)*4));figs.forEach(f=>f.style.setProperty('--a',ang.toFixed(2)+'deg'));
kx+=dt*60+Math.min(30,Math.abs(vel)*.6);kts.forEach((k,i)=>{const w=k.scrollWidth/(i?4:3);k.style.transform='translateX('+(-((i?kx*.8:kx)%w)-(i?w*.5:0))+'px)'});
if(t3){const r=t3.getBoundingClientRect(),c=(r.top+r.height/2)/innerHeight-.5;t3.style.setProperty('--ry',(c*-18).toFixed(2)+'deg');t3.style.setProperty('--rx',(c*8).toFixed(2)+'deg')}
if(stt){const r=stt.getBoundingClientRect();stt.style.setProperty('--sr',Math.max(0,Math.min(25,(r.top/innerHeight-.55)*60)).toFixed(2)+'deg')}}
requestAnimationFrame(loop)};requestAnimationFrame(loop);
if(!rm&&matchMedia('(hover:hover)').matches){addEventListener('pointermove',e=>{gl.style.setProperty('--gx',e.clientX+'px');gl.style.setProperty('--gy',e.clientY+'px');orb.style.setProperty('--mx',(e.clientX/innerWidth-.5).toFixed(3));orb.style.setProperty('--my',(e.clientY/innerHeight-.5).toFixed(3))},{passive:true});
$$('.card,.ben li').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--sx',(e.clientX-r.left)+'px');c.style.setProperty('--sy',(e.clientY-r.top)+'px')}));
$$('.btn').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.25)+'px,'+((e.clientY-r.top-r.height/2)*.35)+'px)'});b.addEventListener('pointerleave',()=>b.style.transform='')})}else gl.remove();`;

const min = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*\n\s*/g, '').replace(/\s*([{};:,>])\s*/g, '$1').replace(/;}/g, '}');
const minJs = (s) => s.split('\n').map((l) => l.trim()).filter(Boolean).join('\n');

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>uPVC Windows &amp; Doors in Bengaluru | VTech</title>
<meta name="description" content="VTech uPVC casement windows, French doors, multi sliding doors and sliding windows in Bengaluru. Real product photos and details from vtechwindows.com.">
<meta name="theme-color" content="#02409A"><link rel="icon" href="${LOGO}"><link rel="preload" as="image" href="${HERO}">
<style>${min(css)}</style></head><body><div class="prog" aria-hidden="true"></div><div class="glow" aria-hidden="true"></div>
<div class="top"><a href="tel:+919740422863">📞 +91 97404 22863</a><a href="mailto:vtechbuildingsystems@gmail.com">✉ vtechbuildingsystems@gmail.com</a><a>All days 09:00 AM – 09:00 PM</a></div>
<header class="nav"><div class="w"><a class="logo" href="#"><img src="${LOGO}" alt="" width="40" height="40">V-TECH</a><nav aria-label="Sections"><a href="#products">Products</a><a href="#about">About</a><a href="#why">Why uPVC</a><a href="#faq">FAQ</a></nav><a class="btn" href="#enquiry">Get a quote</a></div><div class="band"></div></header>
<main>
<section class="hero"><img src="${HERO}" alt="Residential building with uPVC windows, photo from vtechwindows.com" width="760" height="570" fetchpriority="high"><div class="w">
<p class="k">V-Tech Building Systems · Bengaluru</p><h1><span class="l"><span>A Better View.</span></span><span class="l"><span>A Better Way to Live.</span></span></h1>
<p>Casement windows, French doors, multi sliding doors and sliding windows from a Bengaluru manufacturer using German uPVC profile technology.</p>
<div class="row"><a class="btn" href="#products">View all ${PRODUCTS.length} products</a><a class="btn btn--o" href="#enquiry">Request a quote</a></div></div>
<div class="orb" aria-hidden="true"><div class="orb__r">${PRODUCTS.map((p, i) => `<figure style="--i:${i}"><img src="${img(PH[p.id])}" alt="" width="640" height="522"><figcaption>${esc(p.name)}</figcaption></figure>`).join('')}</div><div class="orb__floor"></div></div></section>
<div class="w"><div class="stats rv" aria-label="Figures as stated on vtechwindows.com"><div><b data-c="1" data-s=" Lakh+">1 Lakh+</b><span>happy customers</span></div><div><b data-c="200" data-s="+">200+</b><span>projects completed</span></div><div><b data-c="20" data-s="+">20+</b><span>years of experience</span></div><div><b data-c="5" data-s="+">5+</b><span>quality certifications</span></div></div><p class="note">Figures as stated on VTech’s homepage.</p></div>

<section class="sec sec--show" id="products"><div class="w"><p class="k">uPVC Windows &amp; Doors</p><h2 class="h2">${PRODUCTS.length} systems, 4 families</h2><p class="lead">Every product with its real photo and details from vtechwindows.com.</p>
<div class="fl" role="group" aria-label="Jump to a product family">${GROUPS.map((g) => `<button type="button" data-go="${PRODUCTS.findIndex((p) => p.group === g.id)}">${esc(g.name)} (${PRODUCTS.filter((p) => p.group === g.id).length})</button>`).join("")}</div></div>${show}</section>

<div class="kin" aria-hidden="true"><div class="kin__t">${(GROUPS.map((g) => g.name.toUpperCase()).join(" ✳ ") + " ✳ ").repeat(3)}</div><div class="kin__t kin__t--o">${"GERMAN uPVC PROFILE TECHNOLOGY ✳ BENGALURU ✳ ".repeat(4)}</div></div>
<section class="sec sec--g" id="about"><div class="w two"><div class="rv"><p class="k">About V-Tech</p><h2 class="h2">German profile technology, made in Bengaluru</h2>
<p class="lead">V-Tech Building Systems Pvt. Ltd is a uPVC doors and windows manufacturer and supplier in Bengaluru, Karnataka, using German uPVC profile technology.</p>
<div class="vm"><div><b>Vision:</b> Create timeless fabrication pieces and become clients’ first choice.</div><div><b>Mission:</b> High-quality, environmentally friendly products, world-class designs, competitive pricing and long service life.</div></div></div>
<img class="rv tilt3" src="${img('WhatsApp-Image-2023-10-19-at-2')}" alt="Interior photo from the VTech About page" width="760" height="507" loading="lazy"></div></section>

<section class="sec" id="why"><div class="w"><p class="k">Why uPVC</p><h2 class="h2">Built to be lived with</h2>
<ul class="ben">${benefits.map(([t, d], i) => `<li class="rv" style="--d:${(i % 3) * 100}"><h3>${t}</h3><p>${d}</p></li>`).join('')}</ul>
<img class="war rv" src="${img('Icon-ultrain-ex-final-640x158-1')}" alt="VTech graphic: 15 year uPVC profile warranty, 10 year hardware warranty, weather resistant, low maintenance" width="640" height="158" loading="lazy"><p class="note">Graphic from VTech’s product pages. Please confirm warranty terms with VTech.</p></div></section>

<section class="sec sec--g"><div class="w"><p class="k">Clients &amp; projects</p><h2 class="h2">Logos shown on vtechwindows.com</h2>
<div class="mq"><div>${[...CLIENTS, ...CLIENTS].map((c, i) => `<span><img src="${c}" alt="${i < CLIENTS.length ? 'Client logo' : ''}" loading="lazy" width="140" height="70"></span>`).join('')}</div></div>
<div class="two" style="margin-top:28px"><img class="rv" src="${HERO}" alt="Project photo from vtechwindows.com" loading="lazy" width="760" height="570"><img class="rv" src="${img('WhatsApp-Image-2026-01-03-at-2')}" alt="Doors photo from vtechwindows.com" loading="lazy"></div></div></section>

<section class="sec" id="faq"><div class="w"><p class="k">FAQ</p><h2 class="h2">Questions, answered</h2><div class="faq">${faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div></div></section>

<section class="sec enq" id="enquiry"><div class="w two" style="align-items:start"><div><p class="k">Enquiry</p><h2 class="h2">Let’s find the right windows for your space</h2>
<div class="ct"><div><b>Call</b><a href="tel:+919740422863">+91 97404 22863</a> · <a href="tel:+919980111468">+91 99801 11468</a></div><div><b>Email</b><a href="mailto:vtechbuildingsystems@gmail.com">vtechbuildingsystems@gmail.com</a></div><div><b>Showroom</b>No. 693, M.N.S Arcade, 3rd Floor, Dr. Rajkumar Rd, 6th Block, Rajajinagar, Bengaluru 560010</div><div><b>Hours</b>All days, 09:00 AM to 09:00 PM</div></div></div>
<form novalidate><div class="f"><label for="fn">Full Name *</label><input id="fn" name="name" autocomplete="name"><small class="err"></small></div>
<div class="f"><label for="fp">Phone *</label><input id="fp" name="phone" type="tel" autocomplete="tel"><small class="err"></small></div>
<div class="f"><label for="fe">Email <i>(optional)</i></label><input id="fe" name="email" type="email" autocomplete="email"><small class="err"></small></div>
<div class="f"><label for="fc">City *</label><input id="fc" name="city" autocomplete="address-level2"><small class="err"></small></div>
<div class="f"><label for="fcat">Category *</label><select id="fcat" name="category"></select><small class="err"></small></div>
<div class="f"><label for="ftype">Type</label><select id="ftype" name="type"></select></div>
<div class="f f--w"><label for="fcol">Colour</label><select id="fcol" name="colour"><option value="">No preference</option><option>White</option><option>Wooden Finish</option></select></div>
<div class="f f--w"><label for="fd">Project details <i>(optional)</i></label><textarea id="fd" name="details" rows="3"></textarea></div>
<label class="hp" aria-hidden="true">Leave blank<input name="website" tabindex="-1" autocomplete="off"></label>
<div class="ck"><input type="checkbox" id="fk" name="consent"><label for="fk" style="font-weight:400">I agree that VTech may use these details to contact me about my enquiry. *</label><small class="err"></small></div>
<button class="btn" type="submit">Request a Quote</button><p id="st" role="status" aria-live="polite"></p></form></div></section>
</main>
<footer><div class="w"><span>© V-Tech Building Systems Pvt. Ltd · Bengaluru</span><span>Photos &amp; facts: <a href="https://vtechwindows.com/" target="_blank" rel="noopener">vtechwindows.com</a></span></div></footer>
<a class="btn fab" href="tel:+919740422863" aria-label="Call VTech">📞 Call</a>
<script>${minJs(js)}</script></body></html>`;

fs.writeFileSync(path.join(__dirname, 'index.html'), html);
console.log('index.html', (html.length / 1024).toFixed(1) + ' KB');
