(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[825],{1969:(e,t,r)=>{"use strict";r.d(t,{default:()=>n});var a=r(5155),i=r(2648),o=r(2115),s=r(8434);function n(){let{files:e,isLoading:t,loadFiles:r,deleteAndRemoveFile:n,role:l}=(0,i.jT)(),[d,c]=(0,o.useState)(null);(0,o.useEffect)(()=>{r()},[r]);let u=async(e,t)=>{if(confirm(`Bạn c\xf3 chắc muốn x\xf3a "${t}"?`)){c(e);try{await n(e)}catch(e){s.Ay.error(e instanceof Error?e.message:"Lỗi x\xf3a file")}finally{c(null)}}};return t?(0,a.jsx)("div",{children:"Đang tải danh s\xe1ch file..."}):0===e.length?(0,a.jsx)("div",{children:"Chưa c\xf3 file n\xe0o được tải l\xean"}):(0,a.jsx)("div",{children:e.map(e=>(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{children:e.file_name}),(0,a.jsx)("div",{children:e.modified_time.toString()}),(0,a.jsx)("a",{href:e.source_url,target:"_blank",children:"Xem file"}),"admin"===l&&(0,a.jsx)("button",{onClick:()=>u(e.file_id,e.file_name),disabled:!!e.isUploading||d===e.file_id,title:e.isUploading?"Đang upload, vui l\xf2ng chờ...":"X\xf3a file",style:{marginLeft:8,color:"#ef4444",background:"transparent",border:"1px solid #ef4444",borderRadius:4,padding:"4px 10px",cursor:e.isUploading||d===e.file_id?"not-allowed":"pointer",opacity:e.isUploading||d===e.file_id?.5:1},children:e.isUploading?"Đang upload...":d===e.file_id?"Đang x\xf3a...":"X\xf3a"})]},e.file_id))})}},2648:(e,t,r)=>{"use strict";r.d(t,{FileProvider:()=>f,jT:()=>p});var a=r(5155),i=r(2115),o=r(9339);let s=(0,o.createServerReference)("40df43f4e6656ac2f2a0a7f98b12edb447084572c6",o.callServer,void 0,o.findSourceMapURL,"uploadFile"),n=(0,o.createServerReference)("407fc5c44dd92fa56a7fba70af10b9b8b799e50d9d",o.callServer,void 0,o.findSourceMapURL,"deleteFile"),l=(0,o.createServerReference)("0029797efa826889f8495fdfabfc8c047f0d25b727",o.callServer,void 0,o.findSourceMapURL,"default");var d=r(8434);let c=["application/pdf","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],u=(0,i.createContext)(null);function f({children:e,role:t="user"}){let[r,o]=(0,i.useState)([]),[p,m]=(0,i.useState)(!1),h=(0,i.useCallback)(async()=>{m(!0);try{let e=await l();o(e)}catch(e){console.error("Lỗi tải danh s\xe1ch file:",e),d.Ay.error(e instanceof Error?e.message:"Lỗi tải danh s\xe1ch file")}finally{m(!1)}},[]),g=(0,i.useCallback)(async e=>{if(!c.includes(e.type))return void d.Ay.error("File kh\xf4ng đ\xfang định dạng (hỗ trợ: PDF, Excel, Word)");if(r.some(t=>t.file_name.toLowerCase()===e.name.toLowerCase()))return void d.Ay.error(`File "${e.name}" đ\xe3 được tải l\xean rồi`);let t=`temp_${Date.now()}`,a={file_id:t,file_name:e.name,modified_time:new Date,source_url:"",isUploading:!0};o(e=>[a,...e]);try{let t=new FormData;t.append("data",e);let r=await s(t);if(r&&"object"==typeof r&&"error"in r)throw Error(r.error);d.Ay.success("Upload file th\xe0nh c\xf4ng!"),await h()}catch(e){o(e=>e.filter(e=>e.file_id!==t)),console.warn("[uploadFile] Lỗi upload:",e),d.Ay.error(e instanceof Error?e.message:"Lỗi khi upload file")}},[r,h]),y=(0,i.useCallback)(async e=>{try{let t=await n(e);if(t&&"object"==typeof t&&"error"in t)return void d.Ay.error(t.error);o(t=>t.filter(t=>t.file_id!==e)),d.Ay.success("Đ\xe3 x\xf3a file")}catch(e){d.Ay.error(e instanceof Error?e.message:"Lỗi khi x\xf3a file")}},[]);return(0,a.jsx)(u.Provider,{value:{role:t,files:r,setFiles:o,isLoading:p,loadFiles:h,uploadAndAddFile:g,deleteAndRemoveFile:y},children:e})}function p(){let e=(0,i.useContext)(u);if(!e)throw Error("lỗi kh\xf4ng d\xf9ng file context");return e}},4094:(e,t,r)=>{"use strict";r.d(t,{default:()=>n});var a=r(5155),i=r(2648),o=r(2115),s=r(8434);function n(){let{uploadAndAddFile:e}=(0,i.jT)(),[t,r]=(0,o.useState)(""),[n,l]=(0,o.useState)(!1),d=async t=>{let a=t.target.files?.[0];if(a){l(!0),r(a.name);try{await e(a),console.log("Upload th\xe0nh c\xf4ng:",a.name)}catch(e){console.error("Upload lỗi:",e),s.Ay.error(e instanceof Error?e.message:"Lỗi upload file")}finally{l(!1),t.target.value=""}}};return(0,a.jsxs)("div",{children:[(0,a.jsx)("h2",{children:"Upload file"}),(0,a.jsx)("input",{type:"file",onChange:d,disabled:n}),n&&(0,a.jsxs)("div",{children:["Đang tải l\xean: ",t,"..."]})]})}},8434:(e,t,r)=>{"use strict";let a,i;r.d(t,{Toaster:()=>ee,Ay:()=>et});var o,s=r(2115);let n={data:""},l=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,c=/\n+/g,u=(e,t)=>{let r="",a="",i="";for(let o in e){let s=e[o];"@"==o[0]?"i"==o[1]?r=o+" "+s+";":a+="f"==o[1]?u(s,o):o+"{"+u(s,"k"==o[1]?"":t)+"}":"object"==typeof s?a+=u(s,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=s&&(o="-"==o[1]?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=u.p?u.p(o,s):o+":"+s+";")}return r+(t&&i?t+"{"+i+"}":i)+a},f={},p=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+p(e[r]);return t}return e};function m(e){let t,r,a=this||{},i=e.call?e(a.p):e;return((e,t,r,a,i)=>{var o;let s=p(e),n=f[s]||(f[s]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(s));if(!f[n]){let t=s!==e?e:(e=>{let t,r,a=[{}];for(;t=l.exec(e.replace(d,""));)t[4]?a.shift():t[3]?(r=t[3].replace(c," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(c," ").trim();return a[0]})(e);f[n]=u(i?{["@keyframes "+n]:t}:t,r?"":"."+n)}let m=r&&f.g;return r&&(f.g=f[n]),o=f[n],m?t.data=t.data.replace(m,o):-1===t.data.indexOf(o)&&(t.data=a?o+t.data:t.data+o),n})(i.unshift?i.raw?(t=[].slice.call(arguments,1),r=a.p,i.reduce((e,a,i)=>{let o=t[i];if(o&&o.call){let e=o(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":u(e,""):!1===e?"":e}return e+a+(null==o?"":o)},"")):i.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):i,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||n})(a.target),a.g,a.o,a.k)}m.bind({g:1});let h,g,y,b=m.bind({k:1});function v(e,t){let r=this||{};return function(){let a=arguments;function i(o,s){let n=Object.assign({},o),l=n.className||i.className;r.p=Object.assign({theme:g&&g()},n),r.o=/go\d/.test(l),n.className=m.apply(r,a)+(l?" "+l:""),t&&(n.ref=s);let d=e;return e[0]&&(d=n.as||e,delete n.as),y&&d[0]&&y(n),h(d,n)}return t?t(i):i}}var x=(e,t)=>"function"==typeof e?e(t):e,w=(a=0,()=>(++a).toString()),E=()=>{if(void 0===i&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");i=!e||e.matches}return i},k="default",j=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return j(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+o}))}}},_=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},S={},A=(e,t=k)=>{S[t]=j(S[t]||C,e),_.forEach(([e,r])=>{e===t&&r(S[t])})},$=e=>Object.keys(S).forEach(t=>A(e,t)),L=(e=k)=>t=>{A(t,e)},D={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},O=e=>(t,r)=>{let a,i=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||w()}))(t,e,r);return L(i.toasterId||(a=i.id,Object.keys(S).find(e=>S[e].toasts.some(e=>e.id===a))))({type:2,toast:i}),i.id},U=(e,t)=>O("blank")(e,t);U.error=O("error"),U.success=O("success"),U.loading=O("loading"),U.custom=O("custom"),U.dismiss=(e,t)=>{let r={type:3,toastId:e};t?L(t)(r):$(r)},U.dismissAll=e=>U.dismiss(void 0,e),U.remove=(e,t)=>{let r={type:4,toastId:e};t?L(t)(r):$(r)},U.removeAll=e=>U.remove(void 0,e),U.promise=(e,t,r)=>{let a=U.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?x(t.success,e):void 0;return i?U.success(i,{id:a,...r,...null==r?void 0:r.success}):U.dismiss(a),e}).catch(e=>{let i=t.error?x(t.error,e):void 0;i?U.error(i,{id:a,...r,...null==r?void 0:r.error}):U.dismiss(a)}),e};var N=1e3,P=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,R=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,F=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,M=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${P} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${R} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${F} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,I=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,z=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${I} 1s linear infinite;
`,T=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,H=b`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,X=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${T} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${H} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,B=v("div")`
  position: absolute;
`,q=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,W=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Y=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${W} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Z=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?s.createElement(Y,null,t):t:"blank"===r?null:s.createElement(q,null,s.createElement(z,{...a}),"loading"!==r&&s.createElement(B,null,"error"===r?s.createElement(M,{...a}):s.createElement(X,{...a})))},G=v("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,J=v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,K=s.memo(({toast:e,position:t,style:r,children:a})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,i]=E()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${b(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=s.createElement(Z,{toast:e}),n=s.createElement(J,{...e.ariaProps},x(e.message,e));return s.createElement(G,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof a?a({icon:o,message:n}):s.createElement(s.Fragment,null,o,n))});o=s.createElement,u.p=void 0,h=o,g=void 0,y=void 0;var Q=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let o=s.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return s.createElement("div",{ref:o,className:t,style:r},i)},V=m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ee=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:a}=((e={},t=k)=>{let[r,a]=(0,s.useState)(S[t]||C),i=(0,s.useRef)(S[t]);(0,s.useEffect)(()=>(i.current!==S[t]&&a(S[t]),_.push([t,a]),()=>{let e=_.findIndex(([e])=>e===t);e>-1&&_.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,a,i;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||D[t.type],style:{...e.style,...null==(i=e[t.type])?void 0:i.style,...t.style}}});return{...r,toasts:o}})(e,t),i=(0,s.useRef)(new Map).current,o=(0,s.useCallback)((e,t=N)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,r)},[]);(0,s.useEffect)(()=>{if(a)return;let e=Date.now(),i=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&U.dismiss(r.id);return}return setTimeout(()=>U.dismiss(r.id,t),a)});return()=>{i.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let n=(0,s.useCallback)(L(t),[t]),l=(0,s.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,s.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,s.useCallback)(()=>{a&&n({type:6,time:Date.now()})},[a,n]),u=(0,s.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:i=8,defaultPosition:o}=t||{},s=r.filter(t=>(t.position||o)===(e.position||o)&&t.height),n=s.findIndex(t=>t.id===e.id),l=s.filter((e,t)=>t<n&&e.visible).length;return s.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+i,0)},[r]);return(0,s.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}})(r,o);return s.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let o,n,l=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),u=(o=l.includes("top"),n=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:E()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...n});return s.createElement(Q,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?V:"",style:u},"custom"===r.type?x(r.message,r):i?i(r):s.createElement(K,{toast:r,position:l}))}))},et=U},8998:(e,t,r)=>{Promise.resolve().then(r.bind(r,1969)),Promise.resolve().then(r.bind(r,4094))},9339:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={callServer:function(){return o.callServer},createServerReference:function(){return n.createServerReference},findSourceMapURL:function(){return s.findSourceMapURL}};for(var i in a)Object.defineProperty(t,i,{enumerable:!0,get:a[i]});let o=r(7304),s=r(4060),n=r(7197)}},e=>{e.O(0,[441,413,358],()=>e(e.s=8998)),_N_E=e.O()}]);