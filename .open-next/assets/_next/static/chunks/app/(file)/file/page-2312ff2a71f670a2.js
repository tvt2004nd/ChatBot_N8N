(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[825],{1969:(e,t,r)=>{"use strict";r.d(t,{default:()=>n});var i=r(5155),a=r(2005),o=r(2115),s=r(8434);function n(){let{files:e,isLoading:t,loadFiles:r,deleteAndRemoveFile:n}=(0,a.jT)(),[l,d]=(0,o.useState)(null);(0,o.useEffect)(()=>{r()},[r]);let c=async(e,t)=>{if(confirm(`Bạn c\xf3 chắc muốn x\xf3a "${t}"?`)){d(e);try{await n(e)}catch(e){s.Ay.error(e instanceof Error?e.message:"Lỗi x\xf3a file")}finally{d(null)}}};return t?(0,i.jsx)("div",{children:"Đang tải danh s\xe1ch file..."}):0===e.length?(0,i.jsx)("div",{children:"Chưa c\xf3 file n\xe0o được tải l\xean"}):(0,i.jsx)("div",{children:e.map(e=>(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{children:e.file_name}),(0,i.jsx)("div",{children:e.modified_time.toString()}),(0,i.jsx)("a",{href:e.source_url,target:"_blank",children:"Xem file"}),(0,i.jsx)("button",{onClick:()=>c(e.file_id,e.file_name),disabled:!!e.isUploading||l===e.file_id,title:e.isUploading?"Đang upload, vui l\xf2ng chờ...":"X\xf3a file",style:{marginLeft:8,color:"#ef4444",background:"transparent",border:"1px solid #ef4444",borderRadius:4,padding:"4px 10px",cursor:e.isUploading||l===e.file_id?"not-allowed":"pointer",opacity:e.isUploading||l===e.file_id?.5:1},children:e.isUploading?"Đang upload...":l===e.file_id?"Đang x\xf3a...":"X\xf3a"})]},e.file_id))})}},2005:(e,t,r)=>{"use strict";r.d(t,{FileProvider:()=>f,jT:()=>p});var i=r(5155),a=r(2115),o=r(9339);let s=(0,o.createServerReference)("405eb2bf32d9b2c986942a5e57f395608e41f4741f",o.callServer,void 0,o.findSourceMapURL,"uploadFile"),n=(0,o.createServerReference)("40f56fda17def39343bd69a6ba2dc9deb346890f4a",o.callServer,void 0,o.findSourceMapURL,"deleteFile"),l=(0,o.createServerReference)("005396251fbca6195ad34c21fb0ccf170ba5ab2565",o.callServer,void 0,o.findSourceMapURL,"default");var d=r(8434);let c=["application/pdf","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],u=(0,a.createContext)(null);function f({children:e}){let[t,r]=(0,a.useState)([]),[o,p]=(0,a.useState)(!1),m=(0,a.useCallback)(async()=>{p(!0);try{let e=await l();r(e)}catch(e){console.error("Lỗi tải danh s\xe1ch file:",e),d.Ay.error(e instanceof Error?e.message:"Lỗi tải danh s\xe1ch file")}finally{p(!1)}},[]),h=(0,a.useCallback)(async e=>{if(!c.includes(e.type))return void d.Ay.error("File kh\xf4ng đ\xfang định dạng (hỗ trợ: PDF, Excel, Word)");if(t.some(t=>t.file_name.toLowerCase()===e.name.toLowerCase()))return void d.Ay.error(`File "${e.name}" đ\xe3 được tải l\xean rồi`);let i=`temp_${Date.now()}`,a={file_id:i,file_name:e.name,modified_time:new Date,source_url:"",isUploading:!0};r(e=>[a,...e]);try{let t=new FormData;t.append("data",e);let a=await s(t);if(a&&"object"==typeof a&&"error"in a)throw Error(a.error);Array.isArray(a)&&a.length>0&&(a=a[0]),a&&a.data&&Array.isArray(a.data)?a=a.data[0]:a&&a.data&&(a=a.data),console.log("[uploadFile] result shape:",JSON.stringify(a).slice(0,300));let o=a?.file_id??a?.id??a?.fileId;if(!o||"string"!=typeof o||""===o.trim()){console.error("[uploadFile] Kh\xf4ng t\xecm thấy file_id hợp lệ trong response. To\xe0n bộ result:",a),r(e=>e.filter(e=>e.file_id!==i)),d.Ay.error("Upload th\xe0nh c\xf4ng nhưng server kh\xf4ng trả về file_id.");return}r(t=>t.map(t=>t.file_id===i?{file_id:o,file_name:a.file_name??e.name,modified_time:a.modified_time?new Date(a.modified_time):new Date,source_url:a.source_url??"",isUploading:!1}:t)),console.log(`[uploadFile] Đ\xe3 cập nhật tempId "${i}" → realId "${o}"`),d.Ay.success("Upload file th\xe0nh c\xf4ng!")}catch(e){r(e=>e.filter(e=>e.file_id!==i)),console.warn("[uploadFile] Lỗi upload — re-sync danh s\xe1ch để kiểm tra file c\xf3 l\xean Drive kh\xf4ng:",e),d.Ay.error(e instanceof Error?e.message:"Lỗi khi upload file"),m().catch(e=>console.error("[uploadFile] Re-sync sau lỗi thất bại:",e))}},[t,m]),g=(0,a.useCallback)(async e=>{try{let t=await n(e);if(t&&"object"==typeof t&&"error"in t)return void d.Ay.error(t.error);r(t=>t.filter(t=>t.file_id!==e)),d.Ay.success("Đ\xe3 x\xf3a file")}catch(e){d.Ay.error(e instanceof Error?e.message:"Lỗi khi x\xf3a file")}},[]);return(0,i.jsx)(u.Provider,{value:{files:t,setFiles:r,isLoading:o,loadFiles:m,uploadAndAddFile:h,deleteAndRemoveFile:g},children:e})}function p(){let e=(0,a.useContext)(u);if(!e)throw Error("lỗi kh\xf4ng d\xf9ng file context");return e}},4094:(e,t,r)=>{"use strict";r.d(t,{default:()=>n});var i=r(5155),a=r(2005),o=r(2115),s=r(8434);function n(){let{uploadAndAddFile:e}=(0,a.jT)(),[t,r]=(0,o.useState)(""),[n,l]=(0,o.useState)(!1),d=async t=>{let i=t.target.files?.[0];if(i){l(!0),r(i.name);try{await e(i),console.log("Upload th\xe0nh c\xf4ng:",i.name)}catch(e){console.error("Upload lỗi:",e),s.Ay.error(e instanceof Error?e.message:"Lỗi upload file")}finally{l(!1),t.target.value=""}}};return(0,i.jsxs)("div",{children:[(0,i.jsx)("h2",{children:"Upload file"}),(0,i.jsx)("input",{type:"file",onChange:d,disabled:n}),n&&(0,i.jsxs)("div",{children:["Đang tải l\xean: ",t,"..."]})]})}},8434:(e,t,r)=>{"use strict";let i,a;r.d(t,{Toaster:()=>ee,Ay:()=>et});var o,s=r(2115);let n={data:""},l=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,c=/\n+/g,u=(e,t)=>{let r="",i="",a="";for(let o in e){let s=e[o];"@"==o[0]?"i"==o[1]?r=o+" "+s+";":i+="f"==o[1]?u(s,o):o+"{"+u(s,"k"==o[1]?"":t)+"}":"object"==typeof s?i+=u(s,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=s&&(o="-"==o[1]?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=u.p?u.p(o,s):o+":"+s+";")}return r+(t&&a?t+"{"+a+"}":a)+i},f={},p=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+p(e[r]);return t}return e};function m(e){let t,r,i=this||{},a=e.call?e(i.p):e;return((e,t,r,i,a)=>{var o;let s=p(e),n=f[s]||(f[s]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(s));if(!f[n]){let t=s!==e?e:(e=>{let t,r,i=[{}];for(;t=l.exec(e.replace(d,""));)t[4]?i.shift():t[3]?(r=t[3].replace(c," ").trim(),i.unshift(i[0][r]=i[0][r]||{})):i[0][t[1]]=t[2].replace(c," ").trim();return i[0]})(e);f[n]=u(a?{["@keyframes "+n]:t}:t,r?"":"."+n)}let m=r&&f.g;return r&&(f.g=f[n]),o=f[n],m?t.data=t.data.replace(m,o):-1===t.data.indexOf(o)&&(t.data=i?o+t.data:t.data+o),n})(a.unshift?a.raw?(t=[].slice.call(arguments,1),r=i.p,a.reduce((e,i,a)=>{let o=t[a];if(o&&o.call){let e=o(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":u(e,""):!1===e?"":e}return e+i+(null==o?"":o)},"")):a.reduce((e,t)=>Object.assign(e,t&&t.call?t(i.p):t),{}):a,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||n})(i.target),i.g,i.o,i.k)}m.bind({g:1});let h,g,y,b=m.bind({k:1});function v(e,t){let r=this||{};return function(){let i=arguments;function a(o,s){let n=Object.assign({},o),l=n.className||a.className;r.p=Object.assign({theme:g&&g()},n),r.o=/go\d/.test(l),n.className=m.apply(r,i)+(l?" "+l:""),t&&(n.ref=s);let d=e;return e[0]&&(d=n.as||e,delete n.as),y&&d[0]&&y(n),h(d,n)}return t?t(a):a}}var x=(e,t)=>"function"==typeof e?e(t):e,w=(i=0,()=>(++i).toString()),_=()=>{if(void 0===a&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a},k="default",E=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:i}=t;return E(e,{type:+!!e.toasts.find(e=>e.id===i.id),toast:i});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+o}))}}},j=[],A={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},S=(e,t=k)=>{C[t]=E(C[t]||A,e),j.forEach(([e,r])=>{e===t&&r(C[t])})},$=e=>Object.keys(C).forEach(t=>S(e,t)),D=(e=k)=>t=>{S(t,e)},L={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},O=e=>(t,r)=>{let i,a=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||w()}))(t,e,r);return D(a.toasterId||(i=a.id,Object.keys(C).find(e=>C[e].toasts.some(e=>e.id===i))))({type:2,toast:a}),a.id},U=(e,t)=>O("blank")(e,t);U.error=O("error"),U.success=O("success"),U.loading=O("loading"),U.custom=O("custom"),U.dismiss=(e,t)=>{let r={type:3,toastId:e};t?D(t)(r):$(r)},U.dismissAll=e=>U.dismiss(void 0,e),U.remove=(e,t)=>{let r={type:4,toastId:e};t?D(t)(r):$(r)},U.removeAll=e=>U.remove(void 0,e),U.promise=(e,t,r)=>{let i=U.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?x(t.success,e):void 0;return a?U.success(a,{id:i,...r,...null==r?void 0:r.success}):U.dismiss(i),e}).catch(e=>{let a=t.error?x(t.error,e):void 0;a?U.error(a,{id:i,...r,...null==r?void 0:r.error}):U.dismiss(i)}),e};var F=1e3,N=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,P=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,R=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,I=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${N} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${P} 0.15s ease-out forwards;
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
    animation: ${R} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,M=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,T=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${M} 1s linear infinite;
`,z=b`
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

  animation: ${z} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,J=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,K=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${J} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,W=({toast:e})=>{let{icon:t,type:r,iconTheme:i}=e;return void 0!==t?"string"==typeof t?s.createElement(K,null,t):t:"blank"===r?null:s.createElement(q,null,s.createElement(T,{...i}),"loading"!==r&&s.createElement(B,null,"error"===r?s.createElement(I,{...i}):s.createElement(X,{...i})))},Y=v("div")`
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
`,Z=v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,G=s.memo(({toast:e,position:t,style:r,children:i})=>{let a=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[i,a]=_()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${b(i)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=s.createElement(W,{toast:e}),n=s.createElement(Z,{...e.ariaProps},x(e.message,e));return s.createElement(Y,{className:e.className,style:{...a,...r,...e.style}},"function"==typeof i?i({icon:o,message:n}):s.createElement(s.Fragment,null,o,n))});o=s.createElement,u.p=void 0,h=o,g=void 0,y=void 0;var Q=({id:e,className:t,style:r,onHeightUpdate:i,children:a})=>{let o=s.useCallback(t=>{if(t){let r=()=>{i(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,i]);return s.createElement("div",{ref:o,className:t,style:r},a)},V=m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ee=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:i,children:a,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:i}=((e={},t=k)=>{let[r,i]=(0,s.useState)(C[t]||A),a=(0,s.useRef)(C[t]);(0,s.useEffect)(()=>(a.current!==C[t]&&i(C[t]),j.push([t,i]),()=>{let e=j.findIndex(([e])=>e===t);e>-1&&j.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,i,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(i=e[t.type])?void 0:i.duration)||(null==e?void 0:e.duration)||L[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...r,toasts:o}})(e,t),a=(0,s.useRef)(new Map).current,o=(0,s.useCallback)((e,t=F)=>{if(a.has(e))return;let r=setTimeout(()=>{a.delete(e),n({type:4,toastId:e})},t);a.set(e,r)},[]);(0,s.useEffect)(()=>{if(i)return;let e=Date.now(),a=r.map(r=>{if(r.duration===1/0)return;let i=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(i<0){r.visible&&U.dismiss(r.id);return}return setTimeout(()=>U.dismiss(r.id,t),i)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[r,i,t]);let n=(0,s.useCallback)(D(t),[t]),l=(0,s.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,s.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,s.useCallback)(()=>{i&&n({type:6,time:Date.now()})},[i,n]),u=(0,s.useCallback)((e,t)=>{let{reverseOrder:i=!1,gutter:a=8,defaultPosition:o}=t||{},s=r.filter(t=>(t.position||o)===(e.position||o)&&t.height),n=s.findIndex(t=>t.id===e.id),l=s.filter((e,t)=>t<n&&e.visible).length;return s.filter(e=>e.visible).slice(...i?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[r]);return(0,s.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=a.get(e.id);t&&(clearTimeout(t),a.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}})(r,o);return s.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let o,n,l=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:i,defaultPosition:t}),u=(o=l.includes("top"),n=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:_()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...n});return s.createElement(Q,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?V:"",style:u},"custom"===r.type?x(r.message,r):a?a(r):s.createElement(G,{toast:r,position:l}))}))},et=U},8998:(e,t,r)=>{Promise.resolve().then(r.bind(r,1969)),Promise.resolve().then(r.bind(r,4094))},9339:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={callServer:function(){return o.callServer},createServerReference:function(){return n.createServerReference},findSourceMapURL:function(){return s.findSourceMapURL}};for(var a in i)Object.defineProperty(t,a,{enumerable:!0,get:i[a]});let o=r(7304),s=r(4060),n=r(7197)}},e=>{e.O(0,[441,413,358],()=>e(e.s=8998)),_N_E=e.O()}]);