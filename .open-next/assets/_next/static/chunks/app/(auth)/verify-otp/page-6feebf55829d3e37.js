(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[206,381],{3220:(e,t,r)=>{"use strict";r.d(t,{k5:()=>d});var a=r(2115),s={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},o=a.createContext&&a.createContext(s),i=["attr","size","title"];function n(){return(n=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)({}).hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e}).apply(null,arguments)}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,a)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach(function(t){var a,s,o;a=e,s=t,o=r[t],(s=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var a=r.call(e,t||"default");if("object"!=typeof a)return a;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(s))in a?Object.defineProperty(a,s,{value:o,enumerable:!0,configurable:!0,writable:!0}):a[s]=o}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function d(e){return t=>a.createElement(u,n({attr:c({},e.attr)},t),function e(t){return t&&t.map((t,r)=>a.createElement(t.tag,c({key:r},t.attr),e(t.child)))}(e.child))}function u(e){var t=t=>{var r,s=e.attr,o=e.size,l=e.title,d=function(e,t){if(null==e)return{};var r,a,s=function(e,t){if(null==e)return{};var r={};for(var a in e)if(({}).hasOwnProperty.call(e,a)){if(-1!==t.indexOf(a))continue;r[a]=e[a]}return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],-1===t.indexOf(r)&&({}).propertyIsEnumerable.call(e,r)&&(s[r]=e[r])}return s}(e,i),u=o||t.size||"1em";return t.className&&(r=t.className),e.className&&(r=(r?r+" ":"")+e.className),a.createElement("svg",n({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,s,d,{className:r,style:c(c({color:e.color||t.color},t.style),e.style),height:u,width:u,xmlns:"http://www.w3.org/2000/svg"}),l&&a.createElement("title",null,l),e.children)};return void 0!==o?a.createElement(o.Consumer,null,e=>t(e)):t(s)}},3321:(e,t,r)=>{"use strict";var a=r(4645);r.o(a,"usePathname")&&r.d(t,{usePathname:function(){return a.usePathname}}),r.o(a,"useRouter")&&r.d(t,{useRouter:function(){return a.useRouter}}),r.o(a,"useSearchParams")&&r.d(t,{useSearchParams:function(){return a.useSearchParams}})},3817:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>h});var a=r(5155),s=r(2115),o=r(2505),i=r(8500),n=r.n(i),l=r(5250),c=r.n(l),d=r(9339);let u=(0,d.createServerReference)("78331df58e79c38a81d9ac38b0df7c048f557496d5",d.callServer,void 0,d.findSourceMapURL,"resetPasswordWithOtp");var p=r(3321),m=r(8434);function f(){let e=(0,p.useRouter)(),t=(0,p.useSearchParams)().get("email")||"",[r,i]=(0,s.useState)(""),[l,d]=(0,s.useState)(""),[f,h]=(0,s.useState)(""),[y,g]=(0,s.useState)(!1),[b,v]=(0,s.useState)(!1),[x,w]=(0,s.useState)({otp:"",password:"",confirmPassword:""}),[_,j]=(0,s.useState)(!1),N=async a=>{if(a.preventDefault(),!t){m.Ay.error("Kh\xf4ng t\xecm thấy email, vui l\xf2ng thao t\xe1c lại từ đầu"),e.push("/forgot-password");return}let s=!0,o={otp:"",password:"",confirmPassword:""};if(/^\d{6}$/.test(r)||(o.otp="M\xe3 OTP phải gồm 6 chữ số",s=!1),l?/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(l)||(o.password="Mật khẩu ≥ 8 k\xed tự, c\xf3 chữ hoa, thường v\xe0 số",s=!1):(o.password="Vui l\xf2ng nhập mật khẩu",s=!1),f?l!==f&&(o.confirmPassword="Mật khẩu kh\xf4ng khớp",s=!1):(o.confirmPassword="Vui l\xf2ng x\xe1c nhận mật khẩu",s=!1),w(o),s){j(!0);try{let a=await u(t,r,l,f);m.Ay.success(a.message),e.push("/login")}catch(e){e instanceof Error?m.Ay.error(e.message):m.Ay.error("C\xf3 lỗi xảy ra")}finally{j(!1)}}};return(0,a.jsxs)("div",{className:c().card,children:[(0,a.jsxs)("div",{className:c().header,children:[(0,a.jsx)("h1",{className:c().title,children:"Nhập m\xe3 x\xe1c nhận"}),(0,a.jsxs)("p",{className:c().subtitle,children:["M\xe3 OTP đ\xe3 được gửi đến: ",(0,a.jsx)("strong",{style:{color:"var(--primary-color, #10b981)"},children:t})]})]}),(0,a.jsxs)("form",{className:c().form,onSubmit:N,noValidate:!0,children:[(0,a.jsxs)("div",{className:c().formGroup,children:[(0,a.jsx)("label",{className:c().label,htmlFor:"otp",children:"M\xe3 OTP"}),(0,a.jsx)("div",{className:c().inputWrapper,children:(0,a.jsx)("input",{className:`${c().input} ${x.otp?c().inputError:""}`,id:"otp",type:"text",maxLength:6,value:r,onChange:e=>{i(e.target.value),w(e=>({...e,otp:""}))},placeholder:"Nhập m\xe3 OTP 6 số..."})}),x.otp&&(0,a.jsxs)("span",{className:c().errorMessage,children:["⚠ ",x.otp]})]}),(0,a.jsxs)("div",{className:c().formGroup,children:[(0,a.jsx)("label",{className:c().label,htmlFor:"password",children:"Mật khẩu mới"}),(0,a.jsxs)("div",{className:c().inputWrapper,children:[(0,a.jsx)("input",{className:`${c().input} ${c().inputPassword} ${x.password?c().inputError:""}`,id:"password",type:y?"text":"password",value:l,onChange:e=>{d(e.target.value),w(e=>({...e,password:""}))},placeholder:"Nhập mật khẩu mới..."}),(0,a.jsx)("div",{className:c().eyeIcon,onClick:()=>g(!y),children:y?(0,a.jsx)(o.mx3,{}):(0,a.jsx)(o.Ny1,{})})]}),x.password&&(0,a.jsxs)("span",{className:c().errorMessage,children:["⚠ ",x.password]})]}),(0,a.jsxs)("div",{className:c().formGroup,children:[(0,a.jsx)("label",{className:c().label,htmlFor:"confirmPassword",children:"X\xe1c nhận mật khẩu"}),(0,a.jsxs)("div",{className:c().inputWrapper,children:[(0,a.jsx)("input",{className:`${c().input} ${c().inputPassword} ${x.confirmPassword?c().inputError:""}`,id:"confirmPassword",type:b?"text":"password",value:f,onChange:e=>{h(e.target.value),w(e=>({...e,confirmPassword:""}))},placeholder:"X\xe1c nhận mật khẩu mới..."}),(0,a.jsx)("div",{className:c().eyeIcon,onClick:()=>v(!b),children:b?(0,a.jsx)(o.mx3,{}):(0,a.jsx)(o.Ny1,{})})]}),x.confirmPassword&&(0,a.jsxs)("span",{className:c().errorMessage,children:["⚠ ",x.confirmPassword]})]}),(0,a.jsx)("button",{type:"submit",className:c().button,disabled:_,children:_?"Đang xử l\xfd...":"Đặt lại mật khẩu"}),(0,a.jsx)("div",{className:c().footer,style:{marginTop:"1rem",cursor:"pointer",textAlign:"center"},children:(0,a.jsx)(n(),{href:"/forgot-password",className:c().link,children:"Quay lại nhập email"})})]})]})}function h(){return(0,a.jsx)("main",{className:c().container,children:(0,a.jsx)(s.Suspense,{fallback:(0,a.jsx)("div",{className:c().card,children:"Đang tải..."}),children:(0,a.jsx)(f,{})})})}},5250:e=>{e.exports={container:"auth_container__4mlEL",card:"auth_card__BccNd",header:"auth_header__HWGMo",title:"auth_title__BYJnV",subtitle:"auth_subtitle__RYWyF",form:"auth_form__5lK9U",formGroup:"auth_formGroup__XBUF0",label:"auth_label___xjo2",inputWrapper:"auth_inputWrapper__6LZKp",input:"auth_input__Z15S_",inputPassword:"auth_inputPassword__jOc__",eyeIcon:"auth_eyeIcon__fXtbv",inputError:"auth_inputError__E8blt",errorMessage:"auth_errorMessage__8wob8",slideDown:"auth_slideDown__q9XpE",button:"auth_button__L_A_G",footer:"auth_footer__tfwX6",link:"auth_link__WVBhW"}},7526:(e,t,r)=>{Promise.resolve().then(r.bind(r,3817))},8434:(e,t,r)=>{"use strict";let a,s;r.d(t,{Toaster:()=>ee,Ay:()=>et});var o,i=r(2115);let n={data:""},l=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,u=(e,t)=>{let r="",a="",s="";for(let o in e){let i=e[o];"@"==o[0]?"i"==o[1]?r=o+" "+i+";":a+="f"==o[1]?u(i,o):o+"{"+u(i,"k"==o[1]?"":t)+"}":"object"==typeof i?a+=u(i,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=i&&(o="-"==o[1]?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=u.p?u.p(o,i):o+":"+i+";")}return r+(t&&s?t+"{"+s+"}":s)+a},p={},m=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+m(e[r]);return t}return e};function f(e){let t,r,a=this||{},s=e.call?e(a.p):e;return((e,t,r,a,s)=>{var o;let i=m(e),n=p[i]||(p[i]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(i));if(!p[n]){let t=i!==e?e:(e=>{let t,r,a=[{}];for(;t=l.exec(e.replace(c,""));)t[4]?a.shift():t[3]?(r=t[3].replace(d," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(d," ").trim();return a[0]})(e);p[n]=u(s?{["@keyframes "+n]:t}:t,r?"":"."+n)}let f=r&&p.g;return r&&(p.g=p[n]),o=p[n],f?t.data=t.data.replace(f,o):-1===t.data.indexOf(o)&&(t.data=a?o+t.data:t.data+o),n})(s.unshift?s.raw?(t=[].slice.call(arguments,1),r=a.p,s.reduce((e,a,s)=>{let o=t[s];if(o&&o.call){let e=o(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":u(e,""):!1===e?"":e}return e+a+(null==o?"":o)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||n})(a.target),a.g,a.o,a.k)}f.bind({g:1});let h,y,g,b=f.bind({k:1});function v(e,t){let r=this||{};return function(){let a=arguments;function s(o,i){let n=Object.assign({},o),l=n.className||s.className;r.p=Object.assign({theme:y&&y()},n),r.o=/go\d/.test(l),n.className=f.apply(r,a)+(l?" "+l:""),t&&(n.ref=i);let c=e;return e[0]&&(c=n.as||e,delete n.as),g&&c[0]&&g(n),h(c,n)}return t?t(s):s}}var x=(e,t)=>"function"==typeof e?e(t):e,w=(a=0,()=>(++a).toString()),_=()=>{if(void 0===s&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");s=!e||e.matches}return s},j="default",N=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return N(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+o}))}}},O=[],P={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},E=(e,t=j)=>{k[t]=N(k[t]||P,e),O.forEach(([e,r])=>{e===t&&r(k[t])})},S=e=>Object.keys(k).forEach(t=>E(e,t)),$=(e=j)=>t=>{E(t,e)},C={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},M=e=>(t,r)=>{let a,s=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||w()}))(t,e,r);return $(s.toasterId||(a=s.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===a))))({type:2,toast:s}),s.id},D=(e,t)=>M("blank")(e,t);D.error=M("error"),D.success=M("success"),D.loading=M("loading"),D.custom=M("custom"),D.dismiss=(e,t)=>{let r={type:3,toastId:e};t?$(t)(r):S(r)},D.dismissAll=e=>D.dismiss(void 0,e),D.remove=(e,t)=>{let r={type:4,toastId:e};t?$(t)(r):S(r)},D.removeAll=e=>D.remove(void 0,e),D.promise=(e,t,r)=>{let a=D.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?x(t.success,e):void 0;return s?D.success(s,{id:a,...r,...null==r?void 0:r.success}):D.dismiss(a),e}).catch(e=>{let s=t.error?x(t.error,e):void 0;s?D.error(s,{id:a,...r,...null==r?void 0:r.error}):D.dismiss(a)}),e};var A=1e3,I=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,z=b`
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
}`,L=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${I} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${z} 0.15s ease-out forwards;
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
`,T=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,W=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${T} 1s linear infinite;
`,F=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,G=b`
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
}`,U=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${F} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${G} 0.2s ease-out forwards;
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
`,H=v("div")`
  position: absolute;
`,X=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,B=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,V=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${B} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Z=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?i.createElement(V,null,t):t:"blank"===r?null:i.createElement(X,null,i.createElement(W,{...a}),"loading"!==r&&i.createElement(H,null,"error"===r?i.createElement(L,{...a}):i.createElement(U,{...a})))},K=v("div")`
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
`,Y=v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,q=i.memo(({toast:e,position:t,style:r,children:a})=>{let s=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,s]=_()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${b(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=i.createElement(Z,{toast:e}),n=i.createElement(Y,{...e.ariaProps},x(e.message,e));return i.createElement(K,{className:e.className,style:{...s,...r,...e.style}},"function"==typeof a?a({icon:o,message:n}):i.createElement(i.Fragment,null,o,n))});o=i.createElement,u.p=void 0,h=o,y=void 0,g=void 0;var J=({id:e,className:t,style:r,onHeightUpdate:a,children:s})=>{let o=i.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return i.createElement("div",{ref:o,className:t,style:r},s)},Q=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ee=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:s,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:c,handlers:d}=((e,t="default")=>{let{toasts:r,pausedAt:a}=((e={},t=j)=>{let[r,a]=(0,i.useState)(k[t]||P),s=(0,i.useRef)(k[t]);(0,i.useEffect)(()=>(s.current!==k[t]&&a(k[t]),O.push([t,a]),()=>{let e=O.findIndex(([e])=>e===t);e>-1&&O.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||C[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:o}})(e,t),s=(0,i.useRef)(new Map).current,o=(0,i.useCallback)((e,t=A)=>{if(s.has(e))return;let r=setTimeout(()=>{s.delete(e),n({type:4,toastId:e})},t);s.set(e,r)},[]);(0,i.useEffect)(()=>{if(a)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&D.dismiss(r.id);return}return setTimeout(()=>D.dismiss(r.id,t),a)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let n=(0,i.useCallback)($(t),[t]),l=(0,i.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),c=(0,i.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),d=(0,i.useCallback)(()=>{a&&n({type:6,time:Date.now()})},[a,n]),u=(0,i.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:o}=t||{},i=r.filter(t=>(t.position||o)===(e.position||o)&&t.height),n=i.findIndex(t=>t.id===e.id),l=i.filter((e,t)=>t<n&&e.visible).length;return i.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,i.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=s.get(e.id);t&&(clearTimeout(t),s.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:c,startPause:l,endPause:d,calculateOffset:u}}})(r,o);return i.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(r=>{let o,n,l=r.position||t,c=d.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),u=(o=l.includes("top"),n=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:_()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${c*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...n});return i.createElement(J,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?Q:"",style:u},"custom"===r.type?x(r.message,r):s?s(r):i.createElement(q,{toast:r,position:l}))}))},et=D},9339:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={callServer:function(){return o.callServer},createServerReference:function(){return n.createServerReference},findSourceMapURL:function(){return i.findSourceMapURL}};for(var s in a)Object.defineProperty(t,s,{enumerable:!0,get:a[s]});let o=r(7304),i=r(4060),n=r(7197)}},e=>{e.O(0,[641,711,500,441,413,358],()=>e(e.s=7526)),_N_E=e.O()}]);