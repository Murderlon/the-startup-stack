import{r as a,j as e}from"./jsx-runtime-BWtM72Fx.js";import{s as c}from"./brand-2sN0ZQ2a.js";import{R as m}from"./_layout-wxatRzG3.js";import{b as n}from"./button-DXLxMO3S.js";import{u as d,L as x}from"./components-Bhby6F3L.js";import{c as p}from"./index-DJR8etIf.js";import{L as u}from"./loader-circle-VNTRYFCh.js";import{c as o}from"./createLucideIcon-B9RxcC_s.js";import{E as f}from"./external-link-mtANY_RP.js";import"./settings.billing-KtkZgDAY.js";import"./misc-CKFZHWnt.js";import"./index-CHmExSK5.js";import"./index-DAw2iBXv.js";import"./misc-DExpcjDH.js";import"./use-theme-CrgZS6In.js";import"./index-BgCZZJbK.js";import"./settings-W3iAG64G.js";import"./theme-switcher--CK6PTzp.js";import"./useTranslation-CjEt9MOR.js";import"./context-ChrYeCtx.js";import"./logo-DBvKTkUR.js";/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=o("BadgeCheck",[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=o("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);function g(r,s){const t=a.useRef();a.useEffect(()=>{t.current=r},[r]),a.useEffect(()=>{function l(){t.current?.()}if(s){const i=setInterval(l,s);return()=>clearInterval(i)}},[s])}const F=()=>[{title:`${c.siteTitle} - Checkout`}];function H(){const{isFreePlan:r}=d(),{revalidate:s}=p(),[t,l]=a.useState(0);return g(()=>{s(),l(t+1)},r&&t!==3?2e3:null),e.jsx("div",{className:"flex h-full w-full bg-secondary px-6 py-8 dark:bg-black",children:e.jsx("div",{className:"z-10 mx-auto flex h-full w-full max-w-screen-xl gap-12",children:e.jsxs("div",{className:"flex w-full flex-col rounded-lg border border-border bg-card dark:bg-black",children:[e.jsx("div",{className:"flex w-full flex-col rounded-lg p-6",children:e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("h2",{className:"text-xl font-medium text-primary",children:"Completing your Checkout"}),e.jsx("p",{className:"text-sm font-normal text-primary/60",children:"We are completing your checkout, please wait ..."})]})}),e.jsx("div",{className:"flex w-full px-6",children:e.jsx("div",{className:"w-full border-b border-border"})}),e.jsx("div",{className:"relative mx-auto flex w-full flex-col items-center p-6",children:e.jsxs("div",{className:"relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-lg border border-border bg-secondary px-6 py-24 dark:bg-card",children:[e.jsxs("div",{className:"z-10 flex flex-col items-center gap-4",children:[e.jsxs("div",{className:"flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-card hover:border-primary/40",children:[r&&t<3&&e.jsx(u,{className:"h-8 w-8 animate-spin stroke-[1.5px] text-primary/60"}),!r&&e.jsx(h,{className:"h-8 w-8 stroke-[1.5px] text-primary/60"}),r&&t===3&&e.jsx(b,{className:"h-8 w-8 stroke-[1.5px] text-primary/60"})]}),e.jsx("div",{className:"flex flex-col items-center gap-2",children:e.jsxs("p",{className:"text-center text-base font-medium text-primary",children:[r&&t<3&&"Completing your checkout ...",!r&&"Checkout completed!",r&&t===3&&"Something went wrong, but don't worry, you will not be charged."]})})]}),e.jsx("div",{className:"z-10 flex items-center justify-center",children:e.jsxs(x,{to:m,prefetch:"intent",className:`${n({variant:"ghost",size:"sm"})} gap-2`,children:[e.jsx("span",{className:"text-sm font-medium text-primary/60 group-hover:text-primary",children:"Return to Dashboard"}),e.jsx(f,{className:"h-4 w-4 stroke-[1.5px] text-primary/60 group-hover:text-primary"})]})}),e.jsx("div",{className:"base-grid absolute h-full w-full opacity-40"}),e.jsx("div",{className:"absolute bottom-0 h-full w-full bg-gradient-to-t from-[hsl(var(--card))] to-transparent"})]})})]})})})}export{H as default,F as meta};
