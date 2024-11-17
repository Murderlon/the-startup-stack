import{r as P,a as r,j as v}from"./jsx-runtime-BWtM72Fx.js";import{u as At}from"./useTranslation-CjEt9MOR.js";import{a as Ot,b as Ut}from"./honeypot-B8ojEnLc.js";import{s as Wt,h as Vt,u as Nt}from"./use-theme-CrgZS6In.js";import{s as pt}from"./brand-2sN0ZQ2a.js";import{a as _t,R as Jt}from"./index-DAw2iBXv.js";import{f as Kt,p as Xt,c as Ft,O as qt}from"./index-DJR8etIf.js";import{G as Gt}from"./error-boundary-8261IS0k.js";import{d as Qt,_ as Zt,u as te,M as ee,e as ae,S as re}from"./components-Bhby6F3L.js";import"./context-ChrYeCtx.js";import"./index-BgCZZJbK.js";/**
 * @remix-run/react v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let kt="positions";function oe({getKey:e,...a}){let{isSpaMode:o}=Qt(),m=Kt(),h=Xt();_t({getKey:e,storageKey:kt});let p=P.useMemo(()=>{if(!e)return null;let d=e(m,h);return d!==m.key?d:null},[]);if(o)return null;let y=((d,k)=>{if(!window.history.state||!window.history.state.key){let B=Math.random().toString(32).slice(2);window.history.replaceState({key:B},"")}try{let H=JSON.parse(sessionStorage.getItem(d)||"{}")[k||window.history.state.key];typeof H=="number"&&window.scrollTo(0,H)}catch(B){console.error(B),sessionStorage.removeItem(d)}}).toString();return P.createElement("script",Zt({},a,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${y})(${JSON.stringify(kt)}, ${JSON.stringify(p)})`}}))}function ne(e){let{i18n:a}=At();P.useEffect(()=>{a.language!==e&&a.changeLanguage(e)},[e,a])}const Tt=P.createContext("");Tt.Provider;const Ct=()=>P.useContext(Tt);var se=e=>{switch(e){case"success":return de;case"info":return ue;case"warning":return ce;case"error":return me;default:return null}},ie=Array(12).fill(0),le=({visible:e})=>r.createElement("div",{className:"sonner-loading-wrapper","data-visible":e},r.createElement("div",{className:"sonner-spinner"},ie.map((a,o)=>r.createElement("div",{className:"sonner-loading-bar",key:`spinner-bar-${o}`})))),de=r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"20",width:"20"},r.createElement("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",clipRule:"evenodd"})),ce=r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",height:"20",width:"20"},r.createElement("path",{fillRule:"evenodd",d:"M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",clipRule:"evenodd"})),ue=r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"20",width:"20"},r.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",clipRule:"evenodd"})),me=r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"20",width:"20"},r.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",clipRule:"evenodd"})),he=()=>{let[e,a]=r.useState(document.hidden);return r.useEffect(()=>{let o=()=>{a(document.hidden)};return document.addEventListener("visibilitychange",o),()=>window.removeEventListener("visibilitychange",o)},[]),e},ft=1,pe=class{constructor(){this.subscribe=e=>(this.subscribers.push(e),()=>{let a=this.subscribers.indexOf(e);this.subscribers.splice(a,1)}),this.publish=e=>{this.subscribers.forEach(a=>a(e))},this.addToast=e=>{this.publish(e),this.toasts=[...this.toasts,e]},this.create=e=>{var a;let{message:o,...m}=e,h=typeof e?.id=="number"||((a=e.id)==null?void 0:a.length)>0?e.id:ft++,p=this.toasts.find(d=>d.id===h),y=e.dismissible===void 0?!0:e.dismissible;return p?this.toasts=this.toasts.map(d=>d.id===h?(this.publish({...d,...e,id:h,title:o}),{...d,...e,id:h,dismissible:y,title:o}):d):this.addToast({title:o,...m,dismissible:y,id:h}),h},this.dismiss=e=>(e||this.toasts.forEach(a=>{this.subscribers.forEach(o=>o({id:a.id,dismiss:!0}))}),this.subscribers.forEach(a=>a({id:e,dismiss:!0})),e),this.message=(e,a)=>this.create({...a,message:e}),this.error=(e,a)=>this.create({...a,message:e,type:"error"}),this.success=(e,a)=>this.create({...a,type:"success",message:e}),this.info=(e,a)=>this.create({...a,type:"info",message:e}),this.warning=(e,a)=>this.create({...a,type:"warning",message:e}),this.loading=(e,a)=>this.create({...a,type:"loading",message:e}),this.promise=(e,a)=>{if(!a)return;let o;a.loading!==void 0&&(o=this.create({...a,promise:e,type:"loading",message:a.loading,description:typeof a.description!="function"?a.description:void 0}));let m=e instanceof Promise?e:e(),h=o!==void 0;return m.then(async p=>{if(ge(p)&&!p.ok){h=!1;let y=typeof a.error=="function"?await a.error(`HTTP error! status: ${p.status}`):a.error,d=typeof a.description=="function"?await a.description(`HTTP error! status: ${p.status}`):a.description;this.create({id:o,type:"error",message:y,description:d})}else if(a.success!==void 0){h=!1;let y=typeof a.success=="function"?await a.success(p):a.success,d=typeof a.description=="function"?await a.description(p):a.description;this.create({id:o,type:"success",message:y,description:d})}}).catch(async p=>{if(a.error!==void 0){h=!1;let y=typeof a.error=="function"?await a.error(p):a.error,d=typeof a.description=="function"?await a.description(p):a.description;this.create({id:o,type:"error",message:y,description:d})}}).finally(()=>{var p;h&&(this.dismiss(o),o=void 0),(p=a.finally)==null||p.call(a)}),o},this.custom=(e,a)=>{let o=a?.id||ft++;return this.create({jsx:e(o),id:o,...a}),o},this.subscribers=[],this.toasts=[]}},w=new pe,fe=(e,a)=>{let o=a?.id||ft++;return w.addToast({title:e,...a,id:o}),o},ge=e=>e&&typeof e=="object"&&"ok"in e&&typeof e.ok=="boolean"&&"status"in e&&typeof e.status=="number",ve=fe,be=()=>w.toasts,ye=Object.assign(ve,{success:w.success,info:w.info,warning:w.warning,error:w.error,custom:w.custom,message:w.message,promise:w.promise,dismiss:w.dismiss,loading:w.loading},{getHistory:be});function we(e,{insertAt:a}={}){if(typeof document>"u")return;let o=document.head||document.getElementsByTagName("head")[0],m=document.createElement("style");m.type="text/css",a==="top"&&o.firstChild?o.insertBefore(m,o.firstChild):o.appendChild(m),m.styleSheet?m.styleSheet.cssText=e:m.appendChild(document.createTextNode(e))}we(`:where(html[dir="ltr"]),:where([data-sonner-toaster][dir="ltr"]){--toast-icon-margin-start: -3px;--toast-icon-margin-end: 4px;--toast-svg-margin-start: -1px;--toast-svg-margin-end: 0px;--toast-button-margin-start: auto;--toast-button-margin-end: 0;--toast-close-button-start: 0;--toast-close-button-end: unset;--toast-close-button-transform: translate(-35%, -35%)}:where(html[dir="rtl"]),:where([data-sonner-toaster][dir="rtl"]){--toast-icon-margin-start: 4px;--toast-icon-margin-end: -3px;--toast-svg-margin-start: 0px;--toast-svg-margin-end: -1px;--toast-button-margin-start: 0;--toast-button-margin-end: auto;--toast-close-button-start: unset;--toast-close-button-end: 0;--toast-close-button-transform: translate(35%, -35%)}:where([data-sonner-toaster]){position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999}:where([data-sonner-toaster][data-x-position="right"]){right:max(var(--offset),env(safe-area-inset-right))}:where([data-sonner-toaster][data-x-position="left"]){left:max(var(--offset),env(safe-area-inset-left))}:where([data-sonner-toaster][data-x-position="center"]){left:50%;transform:translate(-50%)}:where([data-sonner-toaster][data-y-position="top"]){top:max(var(--offset),env(safe-area-inset-top))}:where([data-sonner-toaster][data-y-position="bottom"]){bottom:max(var(--offset),env(safe-area-inset-bottom))}:where([data-sonner-toast]){--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);filter:blur(0);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:none;overflow-wrap:anywhere}:where([data-sonner-toast][data-styled="true"]){padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px #0000001a;width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}:where([data-sonner-toast]:focus-visible){box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast][data-y-position="top"]){top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap))}:where([data-sonner-toast][data-y-position="bottom"]){bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap))}:where([data-sonner-toast]) :where([data-description]){font-weight:400;line-height:1.4;color:inherit}:where([data-sonner-toast]) :where([data-title]){font-weight:500;line-height:1.5;color:inherit}:where([data-sonner-toast]) :where([data-icon]){display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}:where([data-sonner-toast][data-promise="true"]) :where([data-icon])>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}:where([data-sonner-toast]) :where([data-icon])>*{flex-shrink:0}:where([data-sonner-toast]) :where([data-icon]) svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}:where([data-sonner-toast]) :where([data-content]){display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}:where([data-sonner-toast]) :where([data-button]):focus-visible{box-shadow:0 0 0 2px #0006}:where([data-sonner-toast]) :where([data-button]):first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}:where([data-sonner-toast]) :where([data-cancel]){color:var(--normal-text);background:rgba(0,0,0,.08)}:where([data-sonner-toast][data-theme="dark"]) :where([data-cancel]){background:rgba(255,255,255,.3)}:where([data-sonner-toast]) :where([data-close-button]){position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;background:var(--gray1);color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}:where([data-sonner-toast]) :where([data-close-button]):focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast]) :where([data-disabled="true"]){cursor:not-allowed}:where([data-sonner-toast]):hover :where([data-close-button]):hover{background:var(--gray2);border-color:var(--gray5)}:where([data-sonner-toast][data-swiping="true"]):before{content:"";position:absolute;left:0;right:0;height:100%;z-index:-1}:where([data-sonner-toast][data-y-position="top"][data-swiping="true"]):before{bottom:50%;transform:scaleY(3) translateY(50%)}:where([data-sonner-toast][data-y-position="bottom"][data-swiping="true"]):before{top:50%;transform:scaleY(3) translateY(-50%)}:where([data-sonner-toast][data-swiping="false"][data-removed="true"]):before{content:"";position:absolute;inset:0;transform:scaleY(2)}:where([data-sonner-toast]):after{content:"";position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}:where([data-sonner-toast][data-mounted="true"]){--y: translateY(0);opacity:1}:where([data-sonner-toast][data-expanded="false"][data-front="false"]){--scale: var(--toasts-before) * .05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}:where([data-sonner-toast])>*{transition:opacity .4s}:where([data-sonner-toast][data-expanded="false"][data-front="false"][data-styled="true"])>*{opacity:0}:where([data-sonner-toast][data-visible="false"]){opacity:0;pointer-events:none}:where([data-sonner-toast][data-mounted="true"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}:where([data-sonner-toast][data-removed="true"][data-front="true"][data-swipe-out="false"]){--y: translateY(calc(var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="false"]){--y: translateY(40%);opacity:0;transition:transform .5s,opacity .2s}:where([data-sonner-toast][data-removed="true"][data-front="false"]):before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount, 0px));transition:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation:swipe-out .2s ease-out forwards}@keyframes swipe-out{0%{transform:translateY(calc(var(--lift) * var(--offset) + var(--swipe-amount)));opacity:1}to{transform:translateY(calc(var(--lift) * var(--offset) + var(--swipe-amount) + var(--lift) * -100%));opacity:0}}@media (max-width: 600px){[data-sonner-toaster]{position:fixed;--mobile-offset: 16px;right:var(--mobile-offset);left:var(--mobile-offset);width:100%}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset)}[data-sonner-toaster][data-y-position=bottom]{bottom:20px}[data-sonner-toaster][data-y-position=top]{top:20px}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset);right:var(--mobile-offset);transform:none}}[data-sonner-toaster][data-theme=light]{--normal-bg: #fff;--normal-border: var(--gray4);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 91%);--success-text: hsl(140, 100%, 27%);--info-bg: hsl(208, 100%, 97%);--info-border: hsl(221, 91%, 91%);--info-text: hsl(210, 92%, 45%);--warning-bg: hsl(49, 100%, 97%);--warning-border: hsl(49, 91%, 91%);--warning-text: hsl(31, 92%, 45%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12)}[data-sonner-toaster][data-theme=dark]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--info-bg: hsl(215, 100%, 6%);--info-border: hsl(223, 100%, 12%);--info-text: hsl(216, 87%, 65%);--warning-bg: hsl(64, 100%, 6%);--warning-border: hsl(60, 100%, 12%);--warning-text: hsl(46, 87%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%)}[data-rich-colors=true][data-sonner-toast][data-type=success],[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info],[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning],[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error],[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}
`);function at(e){return e.label!==void 0}var xe=3,Ee="32px",ke=4e3,Se=356,Ne=14,Te=20,Ce=200;function Me(...e){return e.filter(Boolean).join(" ")}var Be=e=>{var a,o,m,h,p,y,d,k,B,H;let{invert:rt,toast:t,unstyled:g,interacting:W,setHeights:N,visibleToasts:ot,heights:Y,index:R,toasts:nt,expanded:V,removeToast:x,defaultRichColors:_,closeButton:G,style:Q,cancelButtonStyle:st,actionButtonStyle:it,className:z="",descriptionClassName:Z="",duration:J,position:lt,gap:$,loadingIcon:j,expandByDefault:K,classNames:s,icons:S,closeButtonAriaLabel:dt="Close toast",pauseWhenPageIsHidden:i,cn:c}=e,[f,T]=r.useState(!1),[L,b]=r.useState(!1),[ct,X]=r.useState(!1),[F,q]=r.useState(!1),[Bt,ut]=r.useState(0),[jt,gt]=r.useState(0),vt=r.useRef(null),D=r.useRef(null),Rt=R===0,zt=R+1<=ot,E=t.type,A=t.dismissible!==!1,It=t.className||"",Ht=t.descriptionClassName||"",tt=r.useMemo(()=>Y.findIndex(n=>n.toastId===t.id)||0,[Y,t.id]),Lt=r.useMemo(()=>{var n;return(n=t.closeButton)!=null?n:G},[t.closeButton,G]),bt=r.useMemo(()=>t.duration||J||ke,[t.duration,J]),mt=r.useRef(0),O=r.useRef(0),yt=r.useRef(0),U=r.useRef(null),[wt,Pt]=lt.split("-"),xt=r.useMemo(()=>Y.reduce((n,u,l)=>l>=tt?n:n+u.height,0),[Y,tt]),Et=he(),Yt=t.invert||rt,ht=E==="loading";O.current=r.useMemo(()=>tt*$+xt,[tt,xt]),r.useEffect(()=>{T(!0)},[]),r.useLayoutEffect(()=>{if(!f)return;let n=D.current,u=n.style.height;n.style.height="auto";let l=n.getBoundingClientRect().height;n.style.height=u,gt(l),N(C=>C.find(M=>M.toastId===t.id)?C.map(M=>M.toastId===t.id?{...M,height:l}:M):[{toastId:t.id,height:l,position:t.position},...C])},[f,t.title,t.description,N,t.id]);let I=r.useCallback(()=>{b(!0),ut(O.current),N(n=>n.filter(u=>u.toastId!==t.id)),setTimeout(()=>{x(t)},Ce)},[t,x,N,O]);r.useEffect(()=>{if(t.promise&&E==="loading"||t.duration===1/0||t.type==="loading")return;let n,u=bt;return V||W||i&&Et?(()=>{if(yt.current<mt.current){let l=new Date().getTime()-mt.current;u=u-l}yt.current=new Date().getTime()})():u!==1/0&&(mt.current=new Date().getTime(),n=setTimeout(()=>{var l;(l=t.onAutoClose)==null||l.call(t,t),I()},u)),()=>clearTimeout(n)},[V,W,K,t,bt,I,t.promise,E,i,Et]),r.useEffect(()=>{let n=D.current;if(n){let u=n.getBoundingClientRect().height;return gt(u),N(l=>[{toastId:t.id,height:u,position:t.position},...l]),()=>N(l=>l.filter(C=>C.toastId!==t.id))}},[N,t.id]),r.useEffect(()=>{t.delete&&I()},[I,t.delete]);function $t(){return S!=null&&S.loading?r.createElement("div",{className:"sonner-loader","data-visible":E==="loading"},S.loading):j?r.createElement("div",{className:"sonner-loader","data-visible":E==="loading"},j):r.createElement(le,{visible:E==="loading"})}return r.createElement("li",{"aria-live":t.important?"assertive":"polite","aria-atomic":"true",role:"status",tabIndex:0,ref:D,className:c(z,It,s?.toast,(a=t?.classNames)==null?void 0:a.toast,s?.default,s?.[E],(o=t?.classNames)==null?void 0:o[E]),"data-sonner-toast":"","data-rich-colors":(m=t.richColors)!=null?m:_,"data-styled":!(t.jsx||t.unstyled||g),"data-mounted":f,"data-promise":!!t.promise,"data-removed":L,"data-visible":zt,"data-y-position":wt,"data-x-position":Pt,"data-index":R,"data-front":Rt,"data-swiping":ct,"data-dismissible":A,"data-type":E,"data-invert":Yt,"data-swipe-out":F,"data-expanded":!!(V||K&&f),style:{"--index":R,"--toasts-before":R,"--z-index":nt.length-R,"--offset":`${L?Bt:O.current}px`,"--initial-height":K?"auto":`${jt}px`,...Q,...t.style},onPointerDown:n=>{ht||!A||(vt.current=new Date,ut(O.current),n.target.setPointerCapture(n.pointerId),n.target.tagName!=="BUTTON"&&(X(!0),U.current={x:n.clientX,y:n.clientY}))},onPointerUp:()=>{var n,u,l,C;if(F||!A)return;U.current=null;let M=Number(((n=D.current)==null?void 0:n.style.getPropertyValue("--swipe-amount").replace("px",""))||0),et=new Date().getTime()-((u=vt.current)==null?void 0:u.getTime()),Dt=Math.abs(M)/et;if(Math.abs(M)>=Te||Dt>.11){ut(O.current),(l=t.onDismiss)==null||l.call(t,t),I(),q(!0);return}(C=D.current)==null||C.style.setProperty("--swipe-amount","0px"),X(!1)},onPointerMove:n=>{var u;if(!U.current||!A)return;let l=n.clientY-U.current.y,C=n.clientX-U.current.x,M=(wt==="top"?Math.min:Math.max)(0,l),et=n.pointerType==="touch"?10:2;Math.abs(M)>et?(u=D.current)==null||u.style.setProperty("--swipe-amount",`${l}px`):Math.abs(C)>et&&(U.current=null)}},Lt&&!t.jsx?r.createElement("button",{"aria-label":dt,"data-disabled":ht,"data-close-button":!0,onClick:ht||!A?()=>{}:()=>{var n;I(),(n=t.onDismiss)==null||n.call(t,t)},className:c(s?.closeButton,(h=t?.classNames)==null?void 0:h.closeButton)},r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"},r.createElement("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),r.createElement("line",{x1:"6",y1:"6",x2:"18",y2:"18"}))):null,t.jsx||r.isValidElement(t.title)?t.jsx||t.title:r.createElement(r.Fragment,null,E||t.icon||t.promise?r.createElement("div",{"data-icon":"",className:c(s?.icon,(p=t?.classNames)==null?void 0:p.icon)},t.promise||t.type==="loading"&&!t.icon?t.icon||$t():null,t.type!=="loading"?t.icon||S?.[E]||se(E):null):null,r.createElement("div",{"data-content":"",className:c(s?.content,(y=t?.classNames)==null?void 0:y.content)},r.createElement("div",{"data-title":"",className:c(s?.title,(d=t?.classNames)==null?void 0:d.title)},t.title),t.description?r.createElement("div",{"data-description":"",className:c(Z,Ht,s?.description,(k=t?.classNames)==null?void 0:k.description)},t.description):null),r.isValidElement(t.cancel)?t.cancel:t.cancel&&at(t.cancel)?r.createElement("button",{"data-button":!0,"data-cancel":!0,style:t.cancelButtonStyle||st,onClick:n=>{var u,l;at(t.cancel)&&A&&((l=(u=t.cancel).onClick)==null||l.call(u,n),I())},className:c(s?.cancelButton,(B=t?.classNames)==null?void 0:B.cancelButton)},t.cancel.label):null,r.isValidElement(t.action)?t.action:t.action&&at(t.action)?r.createElement("button",{"data-button":!0,"data-action":!0,style:t.actionButtonStyle||it,onClick:n=>{var u,l;at(t.action)&&(n.defaultPrevented||((l=(u=t.action).onClick)==null||l.call(u,n),I()))},className:c(s?.actionButton,(H=t?.classNames)==null?void 0:H.actionButton)},t.action.label):null))};function St(){if(typeof window>"u"||typeof document>"u")return"ltr";let e=document.documentElement.getAttribute("dir");return e==="auto"||!e?window.getComputedStyle(document.documentElement).direction:e}var je=e=>{let{invert:a,position:o="bottom-right",hotkey:m=["altKey","KeyT"],expand:h,closeButton:p,className:y,offset:d,theme:k="light",richColors:B,duration:H,style:rt,visibleToasts:t=xe,toastOptions:g,dir:W=St(),gap:N=Ne,loadingIcon:ot,icons:Y,containerAriaLabel:R="Notifications",pauseWhenPageIsHidden:nt,cn:V=Me}=e,[x,_]=r.useState([]),G=r.useMemo(()=>Array.from(new Set([o].concat(x.filter(i=>i.position).map(i=>i.position)))),[x,o]),[Q,st]=r.useState([]),[it,z]=r.useState(!1),[Z,J]=r.useState(!1),[lt,$]=r.useState(k!=="system"?k:typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),j=r.useRef(null),K=m.join("+").replace(/Key/g,"").replace(/Digit/g,""),s=r.useRef(null),S=r.useRef(!1),dt=r.useCallback(i=>{var c;(c=x.find(f=>f.id===i.id))!=null&&c.delete||w.dismiss(i.id),_(f=>f.filter(({id:T})=>T!==i.id))},[x]);return r.useEffect(()=>w.subscribe(i=>{if(i.dismiss){_(c=>c.map(f=>f.id===i.id?{...f,delete:!0}:f));return}setTimeout(()=>{Jt.flushSync(()=>{_(c=>{let f=c.findIndex(T=>T.id===i.id);return f!==-1?[...c.slice(0,f),{...c[f],...i},...c.slice(f+1)]:[i,...c]})})})}),[]),r.useEffect(()=>{if(k!=="system"){$(k);return}k==="system"&&(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?$("dark"):$("light")),typeof window<"u"&&window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",({matches:i})=>{$(i?"dark":"light")})},[k]),r.useEffect(()=>{x.length<=1&&z(!1)},[x]),r.useEffect(()=>{let i=c=>{var f,T;m.every(L=>c[L]||c.code===L)&&(z(!0),(f=j.current)==null||f.focus()),c.code==="Escape"&&(document.activeElement===j.current||(T=j.current)!=null&&T.contains(document.activeElement))&&z(!1)};return document.addEventListener("keydown",i),()=>document.removeEventListener("keydown",i)},[m]),r.useEffect(()=>{if(j.current)return()=>{s.current&&(s.current.focus({preventScroll:!0}),s.current=null,S.current=!1)}},[j.current]),x.length?r.createElement("section",{"aria-label":`${R} ${K}`,tabIndex:-1},G.map((i,c)=>{var f;let[T,L]=i.split("-");return r.createElement("ol",{key:i,dir:W==="auto"?St():W,tabIndex:-1,ref:j,className:y,"data-sonner-toaster":!0,"data-theme":lt,"data-y-position":T,"data-x-position":L,style:{"--front-toast-height":`${((f=Q[0])==null?void 0:f.height)||0}px`,"--offset":typeof d=="number"?`${d}px`:d||Ee,"--width":`${Se}px`,"--gap":`${N}px`,...rt},onBlur:b=>{S.current&&!b.currentTarget.contains(b.relatedTarget)&&(S.current=!1,s.current&&(s.current.focus({preventScroll:!0}),s.current=null))},onFocus:b=>{b.target instanceof HTMLElement&&b.target.dataset.dismissible==="false"||S.current||(S.current=!0,s.current=b.relatedTarget)},onMouseEnter:()=>z(!0),onMouseMove:()=>z(!0),onMouseLeave:()=>{Z||z(!1)},onPointerDown:b=>{b.target instanceof HTMLElement&&b.target.dataset.dismissible==="false"||J(!0)},onPointerUp:()=>J(!1)},x.filter(b=>!b.position&&c===0||b.position===i).map((b,ct)=>{var X,F;return r.createElement(Be,{key:b.id,icons:Y,index:ct,toast:b,defaultRichColors:B,duration:(X=g?.duration)!=null?X:H,className:g?.className,descriptionClassName:g?.descriptionClassName,invert:a,visibleToasts:t,closeButton:(F=g?.closeButton)!=null?F:p,interacting:Z,position:i,style:g?.style,unstyled:g?.unstyled,classNames:g?.classNames,cancelButtonStyle:g?.cancelButtonStyle,actionButtonStyle:g?.actionButtonStyle,removeToast:dt,toasts:x.filter(q=>q.position==b.position),heights:Q.filter(q=>q.position==b.position),setHeights:st,expandByDefault:h,gap:N,loadingIcon:ot,expanded:it,pauseWhenPageIsHidden:nt,cn:V})}))})):null};function Re(e){P.useEffect(()=>{e&&setTimeout(()=>{ye[e.type](e.title,{id:e.id,description:e.description})},0)},[e])}const ze=({theme:e,...a})=>v.jsx(je,{theme:e,className:"toaster group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...a});function Ie({nonce:e}){const{revalidate:a}=Ft();return P.useEffect(()=>Wt(()=>a()),[a]),v.jsx("script",{nonce:e,dangerouslySetInnerHTML:{__html:Vt.getClientHintCheckScript()}})}const He="/assets/root-XIloWU53.css",Je={i18n:["translation"]},Ke=({data:e})=>[{title:e?`${pt.siteTitle}`:`Error | ${pt.siteTitle}`},{name:"description",content:pt.siteDescription}],Xe=()=>[{rel:"stylesheet",href:He}];function Mt({children:e,nonce:a,lang:o="en",dir:m="ltr",theme:h="light"}){return v.jsxs("html",{lang:o,dir:m,className:`${h} overflow-x-hidden`,style:{colorScheme:h},children:[v.jsxs("head",{children:[v.jsx("meta",{charSet:"utf-8"}),v.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),v.jsx(Ie,{nonce:a}),v.jsx(ee,{}),v.jsx(ae,{})]}),v.jsxs("body",{className:"h-auto w-full",children:[e,v.jsx(oe,{nonce:a}),v.jsx(re,{nonce:a}),v.jsx(ze,{closeButton:!0,position:"bottom-center",theme:h})]})]})}function Fe(){const{locale:e,toast:a,csrfToken:o,honeypotProps:m}=te(),h=Ct(),p=Nt();return ne(e),Re(a),v.jsx(Mt,{nonce:h,theme:p,lang:e??"en",children:v.jsx(Ot,{token:o,children:v.jsx(Ut,{...m,children:v.jsx(qt,{})})})})}function qe(){const e=Ct(),a=Nt();return v.jsx(Mt,{nonce:e,theme:a,children:v.jsx(Gt,{statusHandlers:{403:({error:o})=>v.jsxs("p",{children:["You are not allowed to do that: ",o?.data.message]})}})})}export{qe as ErrorBoundary,Fe as default,Je as handle,Xe as links,Ke as meta};
