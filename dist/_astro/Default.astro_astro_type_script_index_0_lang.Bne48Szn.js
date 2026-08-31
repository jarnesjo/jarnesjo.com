var e=[`ArrowUp`,`ArrowUp`,`ArrowDown`,`ArrowDown`,`ArrowLeft`,`ArrowRight`,`ArrowLeft`,`ArrowRight`,`b`,`a`],t=0;document.addEventListener(`keydown`,r=>{document.getElementById(`c64-overlay`)||(r.key===e[t]?(t++,t===e.length&&(t=0,n())):t=0)});function n(){let e=document.createElement(`div`);e.id=`c64-overlay`,e.style.cssText=`position:fixed;inset:0;z-index:9999;background:#4040e0;display:flex;align-items:center;justify-content:center;`;let t=document.createElement(`div`);t.style.cssText=`width:100%;max-width:640px;height:100%;background:#4040e0;color:#a0a0ff;font-family:monospace;font-size:clamp(10px,2vw,14px);line-height:1.4;padding:24px;overflow:hidden;position:relative;white-space:pre;display:flex;align-items:center;`,t.id=`c64-screen`,e.appendChild(t),document.body.appendChild(e);let n=document.createElement(`div`);n.style.cssText=`position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.1) 2px,rgba(0,0,0,0.1) 4px);z-index:1;`,t.appendChild(n);let r=document.createElement(`div`);r.className=`c64-content`,r.style.cssText=`width:100%;`,t.appendChild(r),i(t,r)}async function r(e,t,n=40){for(let r of t)e.textContent+=r,await new Promise(e=>setTimeout(e,n))}async function i(e,t){t.textContent=``,await r(t,`
    **** COMMODORE 64 BASIC V2 ****

`,30),await r(t,` 64K RAM SYSTEM  38911 BASIC BYTES FREE

`,30),await r(t,`READY.
`,50),await new Promise(e=>setTimeout(e,600)),await r(t,`LOAD "*",8,1

`,60),await r(t,`SEARCHING...
`,40),await new Promise(e=>setTimeout(e,400)),await r(t,`LOADING
`,40),await new Promise(e=>setTimeout(e,600)),await r(t,`READY.
`,50),await r(t,`RUN
`,60),await new Promise(e=>setTimeout(e,300)),a(e)}function a(e){let t=e.querySelector(`.c64-content`),n=`
`;n+=`     ========================
`,n+=`     =   JARNESJO ARCADE    =
`,n+=`     ========================

`,n+=`     1. SNAKE
`,n+=`     2. PONG
`,n+=`     3. TRON

`,n+=`     SELECT GAME (1-3)

`,n+=`     ESC = EXIT`,t.textContent=n;function r(t){if(t.key===`Escape`){document.removeEventListener(`keydown`,r),document.getElementById(`c64-overlay`)?.remove();return}t.key===`1`?(document.removeEventListener(`keydown`,r),o(e)):t.key===`2`?(document.removeEventListener(`keydown`,r),s(e)):t.key===`3`&&(document.removeEventListener(`keydown`,r),c(e))}document.addEventListener(`keydown`,r)}function o(e){let t=[{x:15,y:7},{x:14,y:7},{x:13,y:7}],n={x:1,y:0},r={x:1,y:0},i=u(),o=0,s=!1,c,l=parseInt(localStorage.getItem(`c64-snake-hi`)||`0`);function u(){let e;do e={x:Math.floor(Math.random()*30),y:Math.floor(Math.random()*15)};while(t.some(t=>t.x===e.x&&t.y===e.y));return e}function d(){let n=e.querySelector(`.c64-content`),r=` SNAKE!                    SCORE: `+String(o).padStart(3,`0`)+`
`;r+=` `+`-`.repeat(30)+`
`;for(let e=0;e<15;e++){let n=`|`;for(let r=0;r<30;r++)t[0].x===r&&t[0].y===e?n+=`@`:t.some(t=>t.x===r&&t.y===e)?n+=`O`:i.x===r&&i.y===e?n+=`*`:n+=` `;n+=`|`,r+=` `+n+`
`}if(r+=` `+`-`.repeat(30)+`

`,s){let e=Math.max(o,l);o>l&&(localStorage.setItem(`c64-snake-hi`,String(o)),l=o),r+=` GAME OVER! SCORE: `+o,o>0&&o===e&&o>parseInt(localStorage.getItem(`c64-snake-hi`)||`0`)-o&&(r+=`  NEW HIGH!`),r+=`
 BEST: `+e+`

`,r+=` SPACE=AGAIN  M=MENU  ESC=EXIT`}else r+=` HI:`+String(Math.max(o,l)).padStart(3,`0`),r+=`  ARROWS=MOVE  ESC=EXIT`;n.textContent=r}function f(){n=r;let e={x:t[0].x+n.x,y:t[0].y+n.y};if(e.x<0||e.x>=30||e.y<0||e.y>=15||t.some(t=>t.x===e.x&&t.y===e.y)){s=!0,clearInterval(c),d();return}t.unshift(e),e.x===i.x&&e.y===i.y?(o+=10,i=u()):t.pop(),d()}function p(t){if(t.key===`Escape`){h();return}if(s){if(t.key===` `){m();return}if(t.key===`m`||t.key===`M`){clearInterval(c),document.removeEventListener(`keydown`,p),a(e);return}return}switch(t.key){case`ArrowUp`:n.y===0&&(r={x:0,y:-1});break;case`ArrowDown`:n.y===0&&(r={x:0,y:1});break;case`ArrowLeft`:n.x===0&&(r={x:-1,y:0});break;case`ArrowRight`:n.x===0&&(r={x:1,y:0})}t.preventDefault()}function m(){t=[{x:15,y:7},{x:14,y:7},{x:13,y:7}],n={x:1,y:0},r={x:1,y:0},i=u(),o=0,s=!1,c=window.setInterval(f,150),d()}function h(){clearInterval(c),document.removeEventListener(`keydown`,p),document.getElementById(`c64-overlay`)?.remove()}document.addEventListener(`keydown`,p),c=window.setInterval(f,150),d()}function s(e){let t=6,n=15,r=7,i=1,o=1,s=0,c=!1,l,u=parseInt(localStorage.getItem(`c64-pong-hi`)||`0`),d=6;function f(){let i=e.querySelector(`.c64-content`),a=` PONG!                     SCORE: `+String(s).padStart(3,`0`)+`
`;a+=` `+`-`.repeat(30)+`
`;for(let e=0;e<15;e++){let i=`|`;for(let a=0;a<30;a++){let o=a===1&&e>=t&&e<t+3,s=a===28&&e>=d&&e<d+3;i+=a===Math.round(n)&&e===Math.round(r)?`O`:o||s?`#`:` `}i+=`|`,a+=` `+i+`
`}if(a+=` `+`-`.repeat(30)+`

`,c){let e=Math.max(s,u);s>u&&(localStorage.setItem(`c64-pong-hi`,String(s)),u=s),a+=` GAME OVER! SCORE: `+s,a+=`
 BEST: `+e+`

`,a+=` SPACE=AGAIN  M=MENU  ESC=EXIT`}else a+=` HI:`+String(Math.max(s,u)).padStart(3,`0`),a+=`  UP/DOWN=MOVE  ESC=EXIT`;i.textContent=a}function p(){n+=i,r+=o,(r<=0||r>=14)&&(o*=-1),Math.round(n)===2&&Math.round(r)>=t&&Math.round(r)<t+3&&(i=Math.abs(i),s+=10),Math.round(n)===27&&Math.round(r)>=d&&Math.round(r)<d+3&&(i=-Math.abs(i)),i>0&&(d+3/2<r&&d+3<15?d++:d+3/2>r&&d>0&&d--),n<=0&&(c=!0,clearInterval(l)),n>=29&&(s+=25,n=15,r=7,i=-1,o=Math.random()>.5?1:-1),f()}function m(n){if(n.key===`Escape`){g();return}if(c){if(n.key===` `){h();return}if(n.key===`m`||n.key===`M`){clearInterval(l),document.removeEventListener(`keydown`,m),a(e);return}return}switch(n.key){case`ArrowUp`:t>0&&t--;break;case`ArrowDown`:t+3<15&&t++}n.preventDefault()}function h(){t=6,d=6,n=15,r=7,i=1,o=1,s=0,c=!1,l=window.setInterval(p,120),f()}function g(){clearInterval(l),document.removeEventListener(`keydown`,m),document.getElementById(`c64-overlay`)?.remove()}document.addEventListener(`keydown`,m),l=window.setInterval(p,120),f()}function c(e){let t={x:5,y:7,dx:1,dy:0},n={x:24,y:7,dx:-1,dy:0},r=[{x:5,y:7}],i=[{x:24,y:7}],o=0,s=!1,c=!1,l,u=parseInt(localStorage.getItem(`c64-tron-hi`)||`0`);function d(){let a=e.querySelector(`.c64-content`),l=` TRON!                     SCORE: `+String(o).padStart(3,`0`)+`
`;l+=` `+`-`.repeat(30)+`
`;for(let e=0;e<15;e++){let a=`|`;for(let o=0;o<30;o++)t.x===o&&t.y===e?a+=`@`:n.x===o&&n.y===e?a+=`X`:r.some(t=>t.x===o&&t.y===e)?a+=`.`:i.some(t=>t.x===o&&t.y===e)?a+=`:`:a+=` `;a+=`|`,l+=` `+a+`
`}if(l+=` `+`-`.repeat(30)+`

`,s){let e=Math.max(o,u);o>u&&(localStorage.setItem(`c64-tron-hi`,String(o)),u=o),l+=c?` YOU WIN! `:` CRASHED! `,l+=`SCORE: `+o,l+=`
 BEST: `+e+`

`,l+=` SPACE=AGAIN  M=MENU  ESC=EXIT`}else l+=` HI:`+String(Math.max(o,u)).padStart(3,`0`),l+=`  @=YOU :=ENEMY  ESC=EXIT`;a.textContent=l}function f(e,t){return!!(e<0||e>=30||t<0||t>=15||r.some(n=>n.x===e&&n.y===t)||i.some(n=>n.x===e&&n.y===t))}function p(){let e=t.x+t.dx,a=t.y+t.dy,u={dx:n.dx,dy:n.dy},p={x:n.x+n.dx,y:n.y+n.dy};if(f(p.x,p.y)){let e=[{dx:0,dy:-1},{dx:0,dy:1},{dx:-1,dy:0},{dx:1,dy:0}].filter(e=>e.dx!==-n.dx||e.dy!==-n.dy).filter(e=>!f(n.x+e.dx,n.y+e.dy));e.length>0&&(u=e[Math.floor(Math.random()*e.length)])}else if(Math.random()<.1){let e=[{dx:0,dy:-1},{dx:0,dy:1},{dx:-1,dy:0},{dx:1,dy:0}].filter(e=>(e.dx!==-n.dx||e.dy!==-n.dy)&&!f(n.x+e.dx,n.y+e.dy));e.length>0&&(u=e[Math.floor(Math.random()*e.length)])}n.dx=u.dx,n.dy=u.dy;let m=n.x+n.dx,h=n.y+n.dy,g=f(e,a),_=f(m,h);if(g&&_){s=!0,c=!1,clearInterval(l),d();return}if(g){s=!0,c=!1,clearInterval(l),d();return}if(_){o+=50,c=!0,s=!0,clearInterval(l),d();return}r.push({x:t.x,y:t.y}),t.x=e,t.y=a,i.push({x:n.x,y:n.y}),n.x=m,n.y=h,o++,d()}function m(n){if(n.key===`Escape`){g();return}if(s){if(n.key===` `){h();return}if(n.key===`m`||n.key===`M`){clearInterval(l),document.removeEventListener(`keydown`,m),a(e);return}return}switch(n.key){case`ArrowUp`:t.dy===0&&(t.dx=0,t.dy=-1);break;case`ArrowDown`:t.dy===0&&(t.dx=0,t.dy=1);break;case`ArrowLeft`:t.dx===0&&(t.dx=-1,t.dy=0);break;case`ArrowRight`:t.dx===0&&(t.dx=1,t.dy=0)}n.preventDefault()}function h(){t={x:5,y:7,dx:1,dy:0},n={x:24,y:7,dx:-1,dy:0},r=[{x:5,y:7}],i=[{x:24,y:7}],o=0,s=!1,c=!1,l=window.setInterval(p,150),d()}function g(){clearInterval(l),document.removeEventListener(`keydown`,m),document.getElementById(`c64-overlay`)?.remove()}document.addEventListener(`keydown`,m),l=window.setInterval(p,150),d()}