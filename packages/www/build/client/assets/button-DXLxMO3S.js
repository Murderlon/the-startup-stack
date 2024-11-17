import{r as s,j as v}from"./jsx-runtime-BWtM72Fx.js";import{c as E}from"./misc-DExpcjDH.js";function R(e,t){typeof e=="function"?e(t):e!=null&&(e.current=t)}function x(...e){return t=>e.forEach(n=>R(n,t))}function H(...e){return s.useCallback(x(...e),e)}var C=s.forwardRef((e,t)=>{const{children:n,...r}=e,o=s.Children.toArray(n),i=o.find(O);if(i){const l=i.props.children,u=o.map(m=>m===i?s.Children.count(l)>1?s.Children.only(null):s.isValidElement(l)?l.props.children:null:m);return v.jsx(g,{...r,ref:t,children:s.isValidElement(l)?s.cloneElement(l,void 0,u):null})}return v.jsx(g,{...r,ref:t,children:n})});C.displayName="Slot";var g=s.forwardRef((e,t)=>{const{children:n,...r}=e;if(s.isValidElement(n)){const o=k(n);return s.cloneElement(n,{...S(r,n.props),ref:t?x(t,o):o})}return s.Children.count(n)>1?s.Children.only(null):null});g.displayName="SlotClone";var w=({children:e})=>v.jsx(v.Fragment,{children:e});function O(e){return s.isValidElement(e)&&e.type===w}function S(e,t){const n={...t};for(const r in t){const o=e[r],i=t[r];/^on[A-Z]/.test(r)?o&&i?n[r]=(...u)=>{i(...u),o(...u)}:o&&(n[r]=o):r==="style"?n[r]={...o,...i}:r==="className"&&(n[r]=[o,i].filter(Boolean).join(" "))}return{...e,...n}}function k(e){let t=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(t=Object.getOwnPropertyDescriptor(e,"ref")?.get,n=t&&"isReactWarning"in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}function j(e){var t,n,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=j(e[t]))&&(r&&(r+=" "),r+=n);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}function A(){for(var e,t,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(t=j(e))&&(r&&(r+=" "),r+=t);return r}const p=e=>typeof e=="boolean"?"".concat(e):e===0?"0":e,h=A,P=(e,t)=>n=>{var r;if(t?.variants==null)return h(e,n?.class,n?.className);const{variants:o,defaultVariants:i}=t,l=Object.keys(o).map(a=>{const c=n?.[a],f=i?.[a];if(c===null)return null;const d=p(c)||p(f);return o[a][d]}),u=n&&Object.entries(n).reduce((a,c)=>{let[f,d]=c;return d===void 0||(a[f]=d),a},{}),m=t==null||(r=t.compoundVariants)===null||r===void 0?void 0:r.reduce((a,c)=>{let{class:f,className:d,...V}=c;return Object.entries(V).every(N=>{let[b,y]=N;return Array.isArray(y)?y.includes({...i,...u}[b]):{...i,...u}[b]===y})?[...a,f,d]:a},[]);return h(e,l,m,n?.class,n?.className)},W=P("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),B=s.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},i)=>{const l=r?C:"button";return v.jsx(l,{className:E(W({variant:t,size:n,className:e})),ref:i,...o})});B.displayName="Button";export{B,C as S,W as b,x as c,H as u};