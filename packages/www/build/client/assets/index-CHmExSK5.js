import{r as c,j as S}from"./jsx-runtime-BWtM72Fx.js";import{r as C}from"./index-DAw2iBXv.js";import{S as y}from"./button-DXLxMO3S.js";function $(e,t,{checkForDefaultPrevented:r=!0}={}){return function(o){if(e?.(o),r===!1||!o.defaultPrevented)return t?.(o)}}function j(e,t=[]){let r=[];function u(n,s){const i=c.createContext(s),a=r.length;r=[...r,s];function f(d){const{scope:v,children:h,...l}=d,x=v?.[e][a]||i,m=c.useMemo(()=>l,Object.values(l));return S.jsx(x.Provider,{value:m,children:h})}function p(d,v){const h=v?.[e][a]||i,l=c.useContext(h);if(l)return l;if(s!==void 0)return s;throw new Error(`\`${d}\` must be used within \`${n}\``)}return f.displayName=n+"Provider",[f,p]}const o=()=>{const n=r.map(s=>c.createContext(s));return function(i){const a=i?.[e]||n;return c.useMemo(()=>({[`__scope${e}`]:{...i,[e]:a}}),[i,a])}};return o.scopeName=e,[u,E(o,...t)]}function E(...e){const t=e[0];if(e.length===1)return t;const r=()=>{const u=e.map(o=>({useScope:o(),scopeName:o.scopeName}));return function(n){const s=u.reduce((i,{useScope:a,scopeName:f})=>{const d=a(n)[`__scope${f}`];return{...i,...d}},{});return c.useMemo(()=>({[`__scope${t.scopeName}`]:s}),[s])}};return r.scopeName=t.scopeName,r}function b(e){const t=c.useRef(e);return c.useEffect(()=>{t.current=e}),c.useMemo(()=>(...r)=>t.current?.(...r),[])}function M({prop:e,defaultProp:t,onChange:r=()=>{}}){const[u,o]=P({defaultProp:t,onChange:r}),n=e!==void 0,s=n?e:u,i=b(r),a=c.useCallback(f=>{if(n){const d=typeof f=="function"?f(e):f;d!==e&&i(d)}else o(f)},[n,e,o,i]);return[s,a]}function P({defaultProp:e,onChange:t}){const r=c.useState(e),[u]=r,o=c.useRef(u),n=b(t);return c.useEffect(()=>{o.current!==u&&(n(u),o.current=u)},[u,o,n]),r}function k(e){const t=c.useRef({value:e,previous:e});return c.useMemo(()=>(t.current.value!==e&&(t.current.previous=t.current.value,t.current.value=e),t.current.previous),[e])}var g=globalThis?.document?c.useLayoutEffect:()=>{};function A(e){const[t,r]=c.useState(void 0);return g(()=>{if(e){r({width:e.offsetWidth,height:e.offsetHeight});const u=new ResizeObserver(o=>{if(!Array.isArray(o)||!o.length)return;const n=o[0];let s,i;if("borderBoxSize"in n){const a=n.borderBoxSize,f=Array.isArray(a)?a[0]:a;s=f.inlineSize,i=f.blockSize}else s=e.offsetWidth,i=e.offsetHeight;r({width:s,height:i})});return u.observe(e,{box:"border-box"}),()=>u.unobserve(e)}else r(void 0)},[e]),t}var w=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"],B=w.reduce((e,t)=>{const r=c.forwardRef((u,o)=>{const{asChild:n,...s}=u,i=n?y:t;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),S.jsx(i,{...s,ref:o})});return r.displayName=`Primitive.${t}`,{...e,[t]:r}},{});function H(e,t){e&&C.flushSync(()=>e.dispatchEvent(t))}export{B as P,$ as a,g as b,j as c,H as d,A as e,k as f,M as g,b as u};
