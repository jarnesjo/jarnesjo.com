const D=["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];let O=0;document.addEventListener("keydown",s=>{document.getElementById("c64-overlay")||(s.key===D[O]?(O++,O===D.length&&(O=0,L())):O=0)});function L(){const s=document.createElement("div");s.id="c64-overlay",s.style.cssText="position:fixed;inset:0;z-index:9999;background:#4040e0;display:flex;align-items:center;justify-content:center;";const y=document.createElement("div");y.style.cssText="width:100%;max-width:640px;height:100%;background:#4040e0;color:#a0a0ff;font-family:monospace;font-size:clamp(10px,2vw,14px);line-height:1.4;padding:24px;overflow:hidden;position:relative;white-space:pre;display:flex;align-items:center;",y.id="c64-screen",s.appendChild(y),document.body.appendChild(s);const d=document.createElement("div");d.style.cssText="position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.1) 2px,rgba(0,0,0,0.1) 4px);z-index:1;",y.appendChild(d);const e=document.createElement("div");e.className="c64-content",e.style.cssText="width:100%;",y.appendChild(e),N(y,e)}async function I(s,y,d=40){for(const e of y)s.textContent+=e,await new Promise(t=>setTimeout(t,d))}async function N(s,y){y.textContent="",await I(y,`
    **** COMMODORE 64 BASIC V2 ****

`,30),await I(y,` 64K RAM SYSTEM  38911 BASIC BYTES FREE

`,30),await I(y,`READY.
`,50),await new Promise(d=>setTimeout(d,600)),await I(y,`LOAD "*",8,1

`,60),await I(y,`SEARCHING...
`,40),await new Promise(d=>setTimeout(d,400)),await I(y,`LOADING
`,40),await new Promise(d=>setTimeout(d,600)),await I(y,`READY.
`,50),await I(y,`RUN
`,60),await new Promise(d=>setTimeout(d,300)),R(s)}function R(s){const y=s.querySelector(".c64-content");let d=`
`;d+=`     ========================
`,d+=`     =   JARNESJO ARCADE    =
`,d+=`     ========================

`,d+=`     1. SNAKE
`,d+=`     2. PONG
`,d+=`     3. TRON

`,d+=`     SELECT GAME (1-3)

`,d+="     ESC = EXIT",y.textContent=d;function e(t){if(t.key==="Escape"){document.removeEventListener("keydown",e),document.getElementById("c64-overlay")?.remove();return}t.key==="1"?(document.removeEventListener("keydown",e),W(s)):t.key==="2"?(document.removeEventListener("keydown",e),H(s)):t.key==="3"&&(document.removeEventListener("keydown",e),P(s))}document.addEventListener("keydown",e)}function W(s){let e=[{x:15,y:7},{x:14,y:7},{x:13,y:7}],t={x:1,y:0},u={x:1,y:0},c=h(),a=0,E=!1,f,w=parseInt(localStorage.getItem("c64-snake-hi")||"0");function h(){let i;do i={x:Math.floor(Math.random()*30),y:Math.floor(Math.random()*15)};while(e.some(o=>o.x===i.x&&o.y===i.y));return i}function p(){const i=s.querySelector(".c64-content");let o=" SNAKE!                    SCORE: "+String(a).padStart(3,"0")+`
`;o+=" "+"-".repeat(30)+`
`;for(let n=0;n<15;n++){let r="|";for(let l=0;l<30;l++)e[0].x===l&&e[0].y===n?r+="@":e.some(m=>m.x===l&&m.y===n)?r+="O":c.x===l&&c.y===n?r+="*":r+=" ";r+="|",o+=" "+r+`
`}if(o+=" "+"-".repeat(30)+`

`,E){const n=Math.max(a,w);a>w&&(localStorage.setItem("c64-snake-hi",String(a)),w=a),o+=" GAME OVER! SCORE: "+a,a>0&&a===n&&a>parseInt(localStorage.getItem("c64-snake-hi")||"0")-a&&(o+="  NEW HIGH!"),o+=`
 BEST: `+n+`

`,o+=" SPACE=AGAIN  M=MENU  ESC=EXIT"}else o+=" HI:"+String(Math.max(a,w)).padStart(3,"0"),o+="  ARROWS=MOVE  ESC=EXIT";i.textContent=o}function x(){t=u;const i={x:e[0].x+t.x,y:e[0].y+t.y};if(i.x<0||i.x>=30||i.y<0||i.y>=15||e.some(o=>o.x===i.x&&o.y===i.y)){E=!0,clearInterval(f),p();return}e.unshift(i),i.x===c.x&&i.y===c.y?(a+=10,c=h()):e.pop(),p()}function S(i){if(i.key==="Escape"){A();return}if(E){if(i.key===" "){k();return}if(i.key==="m"||i.key==="M"){clearInterval(f),document.removeEventListener("keydown",S),R(s);return}return}switch(i.key){case"ArrowUp":t.y===0&&(u={x:0,y:-1});break;case"ArrowDown":t.y===0&&(u={x:0,y:1});break;case"ArrowLeft":t.x===0&&(u={x:-1,y:0});break;case"ArrowRight":t.x===0&&(u={x:1,y:0});break}i.preventDefault()}function k(){e=[{x:15,y:7},{x:14,y:7},{x:13,y:7}],t={x:1,y:0},u={x:1,y:0},c=h(),a=0,E=!1,f=window.setInterval(x,150),p()}function A(){clearInterval(f),document.removeEventListener("keydown",S),document.getElementById("c64-overlay")?.remove()}document.addEventListener("keydown",S),f=window.setInterval(x,150),p()}function H(s){let e=6;const t=3;let u=15,c=7,a=1,E=1,f=0,w=!1,h,p=parseInt(localStorage.getItem("c64-pong-hi")||"0"),x=6;function S(){const n=s.querySelector(".c64-content");let r=" PONG!                     SCORE: "+String(f).padStart(3,"0")+`
`;r+=" "+"-".repeat(30)+`
`;for(let l=0;l<15;l++){let m="|";for(let v=0;v<30;v++){const b=v===1&&l>=e&&l<e+t,T=v===28&&l>=x&&l<x+t;v===Math.round(u)&&l===Math.round(c)?m+="O":b||T?m+="#":m+=" "}m+="|",r+=" "+m+`
`}if(r+=" "+"-".repeat(30)+`

`,w){const l=Math.max(f,p);f>p&&(localStorage.setItem("c64-pong-hi",String(f)),p=f),r+=" GAME OVER! SCORE: "+f,r+=`
 BEST: `+l+`

`,r+=" SPACE=AGAIN  M=MENU  ESC=EXIT"}else r+=" HI:"+String(Math.max(f,p)).padStart(3,"0"),r+="  UP/DOWN=MOVE  ESC=EXIT";n.textContent=r}function k(){u+=a,c+=E,(c<=0||c>=14)&&(E*=-1),Math.round(u)===2&&Math.round(c)>=e&&Math.round(c)<e+t&&(a=Math.abs(a),f+=10),Math.round(u)===27&&Math.round(c)>=x&&Math.round(c)<x+t&&(a=-Math.abs(a)),a>0&&(x+t/2<c&&x+t<15?x++:x+t/2>c&&x>0&&x--),u<=0&&(w=!0,clearInterval(h)),u>=29&&(f+=25,u=15,c=7,a=-1,E=Math.random()>.5?1:-1),S()}function A(n){if(n.key==="Escape"){o();return}if(w){if(n.key===" "){i();return}if(n.key==="m"||n.key==="M"){clearInterval(h),document.removeEventListener("keydown",A),R(s);return}return}switch(n.key){case"ArrowUp":e>0&&e--;break;case"ArrowDown":e+t<15&&e++;break}n.preventDefault()}function i(){e=6,x=6,u=15,c=7,a=1,E=1,f=0,w=!1,h=window.setInterval(k,120),S()}function o(){clearInterval(h),document.removeEventListener("keydown",A),document.getElementById("c64-overlay")?.remove()}document.addEventListener("keydown",A),h=window.setInterval(k,120),S()}function P(s){let e={x:5,y:7,dx:1,dy:0},t={x:24,y:7,dx:-1,dy:0},u=[{x:5,y:7}],c=[{x:24,y:7}],a=0,E=!1,f=!1,w,h=parseInt(localStorage.getItem("c64-tron-hi")||"0");function p(){const o=s.querySelector(".c64-content");let n=" TRON!                     SCORE: "+String(a).padStart(3,"0")+`
`;n+=" "+"-".repeat(30)+`
`;for(let r=0;r<15;r++){let l="|";for(let m=0;m<30;m++)e.x===m&&e.y===r?l+="@":t.x===m&&t.y===r?l+="X":u.some(v=>v.x===m&&v.y===r)?l+=".":c.some(v=>v.x===m&&v.y===r)?l+=":":l+=" ";l+="|",n+=" "+l+`
`}if(n+=" "+"-".repeat(30)+`

`,E){const r=Math.max(a,h);a>h&&(localStorage.setItem("c64-tron-hi",String(a)),h=a),n+=f?" YOU WIN! ":" CRASHED! ",n+="SCORE: "+a,n+=`
 BEST: `+r+`

`,n+=" SPACE=AGAIN  M=MENU  ESC=EXIT"}else n+=" HI:"+String(Math.max(a,h)).padStart(3,"0"),n+="  @=YOU :=ENEMY  ESC=EXIT";o.textContent=n}function x(o,n){return!!(o<0||o>=30||n<0||n>=15||u.some(r=>r.x===o&&r.y===n)||c.some(r=>r.x===o&&r.y===n))}function S(){const o=e.x+e.dx,n=e.y+e.dy;let r={dx:t.dx,dy:t.dy};const l={x:t.x+t.dx,y:t.y+t.dy};if(x(l.x,l.y)){const g=[{dx:0,dy:-1},{dx:0,dy:1},{dx:-1,dy:0},{dx:1,dy:0}].filter(C=>!(C.dx===-t.dx&&C.dy===-t.dy)).filter(C=>!x(t.x+C.dx,t.y+C.dy));g.length>0&&(r=g[Math.floor(Math.random()*g.length)])}else if(Math.random()<.1){const M=[{dx:0,dy:-1},{dx:0,dy:1},{dx:-1,dy:0},{dx:1,dy:0}].filter(g=>!(g.dx===-t.dx&&g.dy===-t.dy)&&!x(t.x+g.dx,t.y+g.dy));M.length>0&&(r=M[Math.floor(Math.random()*M.length)])}t.dx=r.dx,t.dy=r.dy;const m=t.x+t.dx,v=t.y+t.dy,b=x(o,n),T=x(m,v);if(b&&T){E=!0,f=!1,clearInterval(w),p();return}if(b){E=!0,f=!1,clearInterval(w),p();return}if(T){a+=50,f=!0,E=!0,clearInterval(w),p();return}u.push({x:e.x,y:e.y}),e.x=o,e.y=n,c.push({x:t.x,y:t.y}),t.x=m,t.y=v,a++,p()}function k(o){if(o.key==="Escape"){i();return}if(E){if(o.key===" "){A();return}if(o.key==="m"||o.key==="M"){clearInterval(w),document.removeEventListener("keydown",k),R(s);return}return}switch(o.key){case"ArrowUp":e.dy===0&&(e.dx=0,e.dy=-1);break;case"ArrowDown":e.dy===0&&(e.dx=0,e.dy=1);break;case"ArrowLeft":e.dx===0&&(e.dx=-1,e.dy=0);break;case"ArrowRight":e.dx===0&&(e.dx=1,e.dy=0);break}o.preventDefault()}function A(){e={x:5,y:7,dx:1,dy:0},t={x:24,y:7,dx:-1,dy:0},u=[{x:5,y:7}],c=[{x:24,y:7}],a=0,E=!1,f=!1,w=window.setInterval(S,150),p()}function i(){clearInterval(w),document.removeEventListener("keydown",k),document.getElementById("c64-overlay")?.remove()}document.addEventListener("keydown",k),w=window.setInterval(S,150),p()}
