import{j as o}from"./jsx-runtime-BWtM72Fx.js";import{u as a,a as i,i as u}from"./index-DJR8etIf.js";function m({statusHandlers:e,defaultStatusHandler:r=({error:s})=>o.jsxs("p",{children:[s.status," ",s.status," ",s.data]}),unexpectedErrorHandler:n=s=>o.jsx("p",{children:f(s)})}){const s=a(),t=i();return typeof document<"u"&&console.error(t),o.jsx("div",{className:"flex h-full w-full flex-col items-center justify-center",children:u(t)?(e?.[t.status]??r)({error:t,params:s}):n(t)})}function f(e){return typeof e=="string"?e:e&&typeof e=="object"&&"message"in e&&typeof e.message=="string"?e.message:(console.error("Unable to get error message for error:",e),"Unknown error")}export{m as G};
