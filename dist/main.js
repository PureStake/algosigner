!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=9)}([function(e,t,n){"use strict";n.d(t,"j",(function(){return h})),n.d(t,"h",(function(){return v})),n.d(t,"d",(function(){return g})),n.d(t,"f",(function(){return y})),n.d(t,"i",(function(){return b})),n.d(t,"e",(function(){return m})),n.d(t,"g",(function(){return _})),n.d(t,"a",(function(){return w})),n.d(t,"b",(function(){return x})),n.d(t,"c",(function(){return k}));var r,o,i,a=n(1),s=0,u=[],c=a.j.__r,l=a.j.diffed,d=a.j.__c,f=a.j.unmount;function p(e,t){a.j.__h&&a.j.__h(o,e,s||t),s=0;var n=o.__H||(o.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function h(e){return s=1,v(j,e)}function v(e,t,n){var i=p(r++,2);return i.t=e,i.__c||(i.__c=o,i.__=[n?n(t):j(void 0,t),function(e){var t=i.t(i.__[0],e);i.__[0]!==t&&(i.__[0]=t,i.__c.setState({}))}]),i.__}function g(e,t){var n=p(r++,3);!a.j.__s&&S(n.__H,t)&&(n.__=e,n.__H=t,o.__H.__h.push(n))}function y(e,t){var n=p(r++,4);!a.j.__s&&S(n.__H,t)&&(n.__=e,n.__H=t,o.__h.push(n))}function b(e){return s=5,_((function(){return{current:e}}),[])}function m(e,t,n){s=6,y((function(){"function"==typeof e?e(t()):e&&(e.current=t())}),null==n?n:n.concat(e))}function _(e,t){var n=p(r++,7);return S(n.__H,t)?(n.__H=t,n.__h=e,n.__=e()):n.__}function w(e,t){return s=8,_((function(){return e}),t)}function x(e){var t=o.context[e.__c],n=p(r++,9);return n.__c=e,t?(null==n.__&&(n.__=!0,t.sub(o)),t.props.value):e.__}function k(e,t){a.j.useDebugValue&&a.j.useDebugValue(t?t(e):e)}function $(){u.some((function(e){if(e.__P)try{e.__H.__h.forEach(O),e.__H.__h.forEach(A),e.__H.__h=[]}catch(t){return e.__H.__h=[],a.j.__e(t,e.__v),!0}})),u=[]}function O(e){"function"==typeof e.u&&e.u()}function A(e){e.u=e.__()}function S(e,t){return!e||t.some((function(t,n){return t!==e[n]}))}function j(e,t){return"function"==typeof t?t(e):t}a.j.__r=function(e){c&&c(e),r=0;var t=(o=e.__c).__H;t&&(t.__h.forEach(O),t.__h.forEach(A),t.__h=[])},a.j.diffed=function(e){l&&l(e);var t=e.__c;t&&t.__H&&t.__H.__h.length&&(1!==u.push(t)&&i===a.j.requestAnimationFrame||((i=a.j.requestAnimationFrame)||function(e){var t,n=function(){clearTimeout(r),cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(n,100);"undefined"!=typeof window&&(t=requestAnimationFrame(n))})($))},a.j.__c=function(e,t){t.some((function(e){try{e.__h.forEach(O),e.__h=e.__h.filter((function(e){return!e.__||A(e)}))}catch(n){t.some((function(e){e.__h&&(e.__h=[])})),t=[],a.j.__e(n,e.__v)}})),d&&d(e,t)},a.j.unmount=function(e){f&&f(e);var t=e.__c;if(t&&t.__H)try{t.__H.__.forEach(O)}catch(e){a.j.__e(e,t.__v)}}},function(e,t,n){"use strict";n.d(t,"k",(function(){return B})),n.d(t,"i",(function(){return M})),n.d(t,"f",(function(){return v})),n.d(t,"h",(function(){return v})),n.d(t,"b",(function(){return b})),n.d(t,"g",(function(){return y})),n.d(t,"a",(function(){return m})),n.d(t,"d",(function(){return N})),n.d(t,"e",(function(){return R})),n.d(t,"l",(function(){return O})),n.d(t,"c",(function(){return P})),n.d(t,"j",(function(){return r}));var r,o,i,a,s,u,c,l={},d=[],f=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function p(e,t){for(var n in t)e[n]=t[n];return e}function h(e){var t=e.parentNode;t&&t.removeChild(e)}function v(e,t,n){var r,o=arguments,i={};for(r in t)"key"!==r&&"ref"!==r&&(i[r]=t[r]);if(arguments.length>3)for(n=[n],r=3;r<arguments.length;r++)n.push(o[r]);if(null!=n&&(i.children=n),"function"==typeof e&&null!=e.defaultProps)for(r in e.defaultProps)void 0===i[r]&&(i[r]=e.defaultProps[r]);return g(e,i,t&&t.key,t&&t.ref,null)}function g(e,t,n,o,i){var a={type:e,props:t,key:n,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:i};return null==i&&(a.__v=a),r.vnode&&r.vnode(a),a}function y(){return{}}function b(e){return e.children}function m(e,t){this.props=e,this.context=t}function _(e,t){if(null==t)return e.__?_(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?_(e):null}function w(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return w(e)}}function x(e){(!e.__d&&(e.__d=!0)&&o.push(e)&&!i++||s!==r.debounceRendering)&&((s=r.debounceRendering)||a)(k)}function k(){for(var e;i=o.length;)e=o.sort((function(e,t){return e.__v.__b-t.__v.__b})),o=[],e.some((function(e){var t,n,r,o,i,a,s;e.__d&&(a=(i=(t=e).__v).__e,(s=t.__P)&&(n=[],(r=p({},i)).__v=r,o=C(s,i,r,t.__n,void 0!==s.ownerSVGElement,null,n,null==a?_(i):a),E(n,i),o!=a&&w(i)))}))}function $(e,t,n,r,o,i,a,s,u,c){var f,p,v,y,m,w,x,k,$,O=r&&r.__k||d,A=O.length;for(u==l&&(u=null!=a?a[0]:A?_(r,0):null),n.__k=[],f=0;f<t.length;f++)if(null!=(y=n.__k[f]=null==(y=t[f])||"boolean"==typeof y?null:"string"==typeof y||"number"==typeof y?g(null,y,null,null,y):Array.isArray(y)?g(b,{children:y},null,null,null):null!=y.__e||null!=y.__c?g(y.type,y.props,y.key,null,y.__v):y)){if(y.__=n,y.__b=n.__b+1,null===(v=O[f])||v&&y.key==v.key&&y.type===v.type)O[f]=void 0;else for(p=0;p<A;p++){if((v=O[p])&&y.key==v.key&&y.type===v.type){O[p]=void 0;break}v=null}if(m=C(e,y,v=v||l,o,i,a,s,u,c),(p=y.ref)&&v.ref!=p&&(k||(k=[]),v.ref&&k.push(v.ref,null,y),k.push(p,y.__c||m,y)),null!=m){if(null==x&&(x=m),$=void 0,void 0!==y.__d)$=y.__d,y.__d=void 0;else if(a==v||m!=u||null==m.parentNode){e:if(null==u||u.parentNode!==e)e.appendChild(m),$=null;else{for(w=u,p=0;(w=w.nextSibling)&&p<A;p+=2)if(w==m)break e;e.insertBefore(m,u),$=u}"option"==n.type&&(e.value="")}u=void 0!==$?$:m.nextSibling,"function"==typeof n.type&&(n.__d=u)}else u&&v.__e==u&&u.parentNode!=e&&(u=_(v))}if(n.__e=x,null!=a&&"function"!=typeof n.type)for(f=a.length;f--;)null!=a[f]&&h(a[f]);for(f=A;f--;)null!=O[f]&&P(O[f],O[f]);if(k)for(f=0;f<k.length;f++)D(k[f],k[++f],k[++f])}function O(e){return null==e||"boolean"==typeof e?[]:Array.isArray(e)?d.concat.apply([],e.map(O)):[e]}function A(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]="number"==typeof n&&!1===f.test(t)?n+"px":null==n?"":n}function S(e,t,n,r,o){var i,a,s,u,c;if(o?"className"===t&&(t="class"):"class"===t&&(t="className"),"style"===t)if(i=e.style,"string"==typeof n)i.cssText=n;else{if("string"==typeof r&&(i.cssText="",r=null),r)for(u in r)n&&u in n||A(i,u,"");if(n)for(c in n)r&&n[c]===r[c]||A(i,c,n[c])}else"o"===t[0]&&"n"===t[1]?(a=t!==(t=t.replace(/Capture$/,"")),s=t.toLowerCase(),t=(s in e?s:t).slice(2),n?(r||e.addEventListener(t,j,a),(e.l||(e.l={}))[t]=n):e.removeEventListener(t,j,a)):"list"!==t&&"tagName"!==t&&"form"!==t&&"type"!==t&&"size"!==t&&!o&&t in e?e[t]=null==n?"":n:"function"!=typeof n&&"dangerouslySetInnerHTML"!==t&&(t!==(t=t.replace(/^xlink:?/,""))?null==n||!1===n?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),n):null==n||!1===n&&!/^ar/.test(t)?e.removeAttribute(t):e.setAttribute(t,n))}function j(e){this.l[e.type](r.event?r.event(e):e)}function C(e,t,n,o,i,a,s,u,c){var l,d,f,h,v,g,y,_,w,x,k,O=t.type;if(void 0!==t.constructor)return null;(l=r.__b)&&l(t);try{e:if("function"==typeof O){if(_=t.props,w=(l=O.contextType)&&o[l.__c],x=l?w?w.props.value:l.__:o,n.__c?y=(d=t.__c=n.__c).__=d.__E:("prototype"in O&&O.prototype.render?t.__c=d=new O(_,x):(t.__c=d=new m(_,x),d.constructor=O,d.render=L),w&&w.sub(d),d.props=_,d.state||(d.state={}),d.context=x,d.__n=o,f=d.__d=!0,d.__h=[]),null==d.__s&&(d.__s=d.state),null!=O.getDerivedStateFromProps&&(d.__s==d.state&&(d.__s=p({},d.__s)),p(d.__s,O.getDerivedStateFromProps(_,d.__s))),h=d.props,v=d.state,f)null==O.getDerivedStateFromProps&&null!=d.componentWillMount&&d.componentWillMount(),null!=d.componentDidMount&&d.__h.push(d.componentDidMount);else{if(null==O.getDerivedStateFromProps&&_!==h&&null!=d.componentWillReceiveProps&&d.componentWillReceiveProps(_,x),!d.__e&&null!=d.shouldComponentUpdate&&!1===d.shouldComponentUpdate(_,d.__s,x)||t.__v===n.__v){for(d.props=_,d.state=d.__s,t.__v!==n.__v&&(d.__d=!1),d.__v=t,t.__e=n.__e,t.__k=n.__k,d.__h.length&&s.push(d),l=0;l<t.__k.length;l++)t.__k[l]&&(t.__k[l].__=t);break e}null!=d.componentWillUpdate&&d.componentWillUpdate(_,d.__s,x),null!=d.componentDidUpdate&&d.__h.push((function(){d.componentDidUpdate(h,v,g)}))}d.context=x,d.props=_,d.state=d.__s,(l=r.__r)&&l(t),d.__d=!1,d.__v=t,d.__P=e,l=d.render(d.props,d.state,d.context),null!=d.getChildContext&&(o=p(p({},o),d.getChildContext())),f||null==d.getSnapshotBeforeUpdate||(g=d.getSnapshotBeforeUpdate(h,v)),k=null!=l&&l.type==b&&null==l.key?l.props.children:l,$(e,Array.isArray(k)?k:[k],t,n,o,i,a,s,u,c),d.base=t.__e,d.__h.length&&s.push(d),y&&(d.__E=d.__=null),d.__e=!1}else null==a&&t.__v===n.__v?(t.__k=n.__k,t.__e=n.__e):t.__e=T(n.__e,t,n,o,i,a,s,c);(l=r.diffed)&&l(t)}catch(e){t.__v=null,r.__e(e,t,n)}return t.__e}function E(e,t){r.__c&&r.__c(t,e),e.some((function(t){try{e=t.__h,t.__h=[],e.some((function(e){e.call(t)}))}catch(e){r.__e(e,t.__v)}}))}function T(e,t,n,r,o,i,a,s){var u,c,f,p,h,v=n.props,g=t.props;if(o="svg"===t.type||o,null!=i)for(u=0;u<i.length;u++)if(null!=(c=i[u])&&((null===t.type?3===c.nodeType:c.localName===t.type)||e==c)){e=c,i[u]=null;break}if(null==e){if(null===t.type)return document.createTextNode(g);e=o?document.createElementNS("http://www.w3.org/2000/svg",t.type):document.createElement(t.type,g.is&&{is:g.is}),i=null,s=!1}if(null===t.type)v!==g&&e.data!=g&&(e.data=g);else{if(null!=i&&(i=d.slice.call(e.childNodes)),f=(v=n.props||l).dangerouslySetInnerHTML,p=g.dangerouslySetInnerHTML,!s){if(null!=i)for(v={},h=0;h<e.attributes.length;h++)v[e.attributes[h].name]=e.attributes[h].value;(p||f)&&(p&&f&&p.__html==f.__html||(e.innerHTML=p&&p.__html||""))}(function(e,t,n,r,o){var i;for(i in n)"children"===i||"key"===i||i in t||S(e,i,null,n[i],r);for(i in t)o&&"function"!=typeof t[i]||"children"===i||"key"===i||"value"===i||"checked"===i||n[i]===t[i]||S(e,i,t[i],n[i],r)})(e,g,v,o,s),p?t.__k=[]:(u=t.props.children,$(e,Array.isArray(u)?u:[u],t,n,r,"foreignObject"!==t.type&&o,i,a,l,s)),s||("value"in g&&void 0!==(u=g.value)&&u!==e.value&&S(e,"value",u,v.value,!1),"checked"in g&&void 0!==(u=g.checked)&&u!==e.checked&&S(e,"checked",u,v.checked,!1))}return e}function D(e,t,n){try{"function"==typeof e?e(t):e.current=t}catch(e){r.__e(e,n)}}function P(e,t,n){var o,i,a;if(r.unmount&&r.unmount(e),(o=e.ref)&&(o.current&&o.current!==e.__e||D(o,null,t)),n||"function"==typeof e.type||(n=null!=(i=e.__e)),e.__e=e.__d=void 0,null!=(o=e.__c)){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(e){r.__e(e,t)}o.base=o.__P=null}if(o=e.__k)for(a=0;a<o.length;a++)o[a]&&P(o[a],t,n);null!=i&&h(i)}function L(e,t,n){return this.constructor(e,n)}function B(e,t,n){var o,i,a;r.__&&r.__(e,t),i=(o=n===u)?null:n&&n.__k||t.__k,e=v(b,null,[e]),a=[],C(t,(o?t:n||t).__k=e,i||l,l,void 0!==t.ownerSVGElement,n&&!o?[n]:i?null:t.childNodes.length?d.slice.call(t.childNodes):null,a,n||l,o),E(a,e)}function M(e,t){B(e,t,u)}function N(e,t){var n,r;for(r in t=p(p({},e.props),t),arguments.length>2&&(t.children=d.slice.call(arguments,2)),n={},t)"key"!==r&&"ref"!==r&&(n[r]=t[r]);return g(e.type,n,t.key||e.key,t.ref||e.ref,null)}function R(e){var t={},n={__c:"__cC"+c++,__:e,Consumer:function(e,t){return e.children(t)},Provider:function(e){var r,o=this;return this.getChildContext||(r=[],this.getChildContext=function(){return t[n.__c]=o,t},this.shouldComponentUpdate=function(e){o.props.value!==e.value&&r.some((function(t){t.context=e.value,x(t)}))},this.sub=function(e){r.push(e);var t=e.componentWillUnmount;e.componentWillUnmount=function(){r.splice(r.indexOf(e),1),t&&t.call(e)}}),e.children}};return n.Consumer.contextType=n,n.Provider.__=n,n}r={__e:function(e,t){for(var n,r;t=t.__;)if((n=t.__c)&&!n.__)try{if(n.constructor&&null!=n.constructor.getDerivedStateFromError&&(r=!0,n.setState(n.constructor.getDerivedStateFromError(e))),null!=n.componentDidCatch&&(r=!0,n.componentDidCatch(e)),r)return x(n.__E=n)}catch(t){e=t}throw e}},m.prototype.setState=function(e,t){var n;n=this.__s!==this.state?this.__s:this.__s=p({},this.state),"function"==typeof e&&(e=e(n,this.props)),e&&p(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),x(this))},m.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),x(this))},m.prototype.render=b,o=[],i=0,a="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,u=l,c=0},function(e,t,n){"use strict";(function(e,r){n.d(t,"a",(function(){return Be})),n.d(t,"b",(function(){return qe})),n.d(t,"c",(function(){return Qe})),n.d(t,"d",(function(){return rt})),n.d(t,"e",(function(){return J})),n.d(t,"f",(function(){return We})),n.d(t,"g",(function(){return Ve})),n.d(t,"h",(function(){return ct}));
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)};var i=function(){return(i=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function a(e){var t="function"==typeof Symbol&&e[Symbol.iterator],n=0;return t?t.call(e):{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}}}function s(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a}function u(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(s(arguments[t]));return e}var c=[];Object.freeze(c);var l={};function d(){return++Se.mobxGuid}function f(e){throw p(!1,e),"X"}function p(e,t){if(!e)throw new Error("[mobx] "+(t||"An invariant failed, however the error is obfuscated because this is a production build."))}Object.freeze(l);function h(e){var t=!1;return function(){if(!t)return t=!0,e.apply(this,arguments)}}var v=function(){};function g(e){return null!==e&&"object"==typeof e}function y(e){if(null===e||"object"!=typeof e)return!1;var t=Object.getPrototypeOf(e);return t===Object.prototype||null===t}function b(e,t,n){Object.defineProperty(e,t,{enumerable:!1,writable:!0,configurable:!0,value:n})}function m(e,t){var n="isMobX"+e;return t.prototype[n]=!0,function(e){return g(e)&&!0===e[n]}}function _(e){return e instanceof Map}function w(e){return e instanceof Set}function x(e){var t=new Set;for(var n in e)t.add(n);return Object.getOwnPropertySymbols(e).forEach((function(n){Object.getOwnPropertyDescriptor(e,n).enumerable&&t.add(n)})),Array.from(t)}function k(e){return e&&e.toString?e.toString():new String(e).toString()}function $(e){return null===e?null:"object"==typeof e?""+e:e}var O=Symbol("mobx administration"),A=function(){function e(e){void 0===e&&(e="Atom@"+d()),this.name=e,this.isPendingUnobservation=!1,this.isBeingObserved=!1,this.observers=new Set,this.diffValue=0,this.lastAccessedBy=0,this.lowestObserverState=Y.NOT_TRACKING}return e.prototype.onBecomeObserved=function(){this.onBecomeObservedListeners&&this.onBecomeObservedListeners.forEach((function(e){return e()}))},e.prototype.onBecomeUnobserved=function(){this.onBecomeUnobservedListeners&&this.onBecomeUnobservedListeners.forEach((function(e){return e()}))},e.prototype.reportObserved=function(){return Pe(this)},e.prototype.reportChanged=function(){Te(),function(e){if(e.lowestObserverState===Y.STALE)return;e.lowestObserverState=Y.STALE,e.observers.forEach((function(t){t.dependenciesState===Y.UP_TO_DATE&&(t.isTracing!==Z.NONE&&Le(t,e),t.onBecomeStale()),t.dependenciesState=Y.STALE}))}(this),De()},e.prototype.toString=function(){return this.name},e}(),S=m("Atom",A);function j(e,t,n){void 0===t&&(t=v),void 0===n&&(n=v);var r,o=new A(e);return t!==v&&Ze("onBecomeObserved",o,t,r),n!==v&&Ye(o,n),o}var C={identity:function(e,t){return e===t},structural:function(e,t){return Gt(e,t)},default:function(e,t){return Object.is(e,t)},shallow:function(e,t){return Gt(e,t,1)}},E=Symbol("mobx did run lazy initializers"),T=Symbol("mobx pending decorators"),D={},P={};function L(e,t){var n=t?D:P;return n[e]||(n[e]={configurable:!0,enumerable:t,get:function(){return B(this),this[e]},set:function(t){B(this),this[e]=t}})}function B(e){var t,n;if(!0!==e[E]){var r=e[T];if(r){b(e,E,!0);var o=u(Object.getOwnPropertySymbols(r),Object.keys(r));try{for(var i=a(o),s=i.next();!s.done;s=i.next()){var c=r[s.value];c.propertyCreator(e,c.prop,c.descriptor,c.decoratorTarget,c.decoratorArguments)}}catch(e){t={error:e}}finally{try{s&&!s.done&&(n=i.return)&&n.call(i)}finally{if(t)throw t.error}}}}}function M(e,t){return function(){var n,r=function(r,o,a,s){if(!0===s)return t(r,o,a,r,n),null;if(!Object.prototype.hasOwnProperty.call(r,T)){var u=r[T];b(r,T,i({},u))}return r[T][o]={prop:o,propertyCreator:t,descriptor:a,decoratorTarget:r,decoratorArguments:n},L(o,e)};return N(arguments)?(n=c,r.apply(null,arguments)):(n=Array.prototype.slice.call(arguments),r)}}function N(e){return(2===e.length||3===e.length)&&("string"==typeof e[1]||"symbol"==typeof e[1])||4===e.length&&!0===e[3]}function R(e,t,n){return st(e)?e:Array.isArray(e)?J.array(e,{name:n}):y(e)?J.object(e,void 0,{name:n}):_(e)?J.map(e,{name:n}):w(e)?J.set(e,{name:n}):e}function I(e){return e}function U(t){p(t);var n=M(!0,(function(e,n,r,o,i){var a=r?r.initializer?r.initializer.call(e):r.value:void 0;Bt(e).addObservableProp(n,a,t)})),r=(void 0!==e&&e.env,n);return r.enhancer=t,r}var V={deep:!0,name:void 0,defaultDecorator:void 0,proxy:!0};function z(e){return null==e?V:"string"==typeof e?{name:e,deep:!0,proxy:!0}:e}Object.freeze(V);var F=U(R),G=U((function(e,t,n){return null==e||Ut(e)||At(e)||Et(e)||Pt(e)?e:Array.isArray(e)?J.array(e,{name:n,deep:!1}):y(e)?J.object(e,void 0,{name:n,deep:!1}):_(e)?J.map(e,{name:n,deep:!1}):w(e)?J.set(e,{name:n,deep:!1}):f(!1)})),H=U(I),W=U((function(e,t,n){return Gt(e,t)?t:e}));function K(e){return e.defaultDecorator?e.defaultDecorator.enhancer:!1===e.deep?I:R}var q={box:function(e,t){arguments.length>2&&X("box");var n=z(t);return new me(e,K(n),n.name,!0,n.equals)},array:function(e,t){arguments.length>2&&X("array");var n=z(t);return wt(e,K(n),n.name)},map:function(e,t){arguments.length>2&&X("map");var n=z(t);return new Ct(e,K(n),n.name)},set:function(e,t){arguments.length>2&&X("set");var n=z(t);return new Dt(e,K(n),n.name)},object:function(e,t,n){"string"==typeof arguments[1]&&X("object");var r=z(n);if(!1===r.proxy)return et({},e,t,r);var o=tt(r),i=et({},void 0,void 0,r),a=pt(i);return nt(a,e,t,o),a},ref:H,shallow:G,deep:F,struct:W},J=function(e,t,n){if("string"==typeof arguments[1]||"symbol"==typeof arguments[1])return F.apply(null,arguments);if(st(e))return e;var r=y(e)?J.object(e,t,n):Array.isArray(e)?J.array(e,t):_(e)?J.map(e,t):w(e)?J.set(e,t):e;if(r!==e)return r;f(!1)};function X(e){f("Expected one or two arguments to observable."+e+". Did you accidentally try to use observable."+e+" as decorator?")}Object.keys(q).forEach((function(e){return J[e]=q[e]}));var Y,Z,Q=M(!1,(function(e,t,n,r,o){var a=n.get,s=n.set,u=o[0]||{};Bt(e).addComputedProp(e,t,i({get:a,set:s,context:e},u))}));Q({equals:C.structural});!function(e){e[e.NOT_TRACKING=-1]="NOT_TRACKING",e[e.UP_TO_DATE=0]="UP_TO_DATE",e[e.POSSIBLY_STALE=1]="POSSIBLY_STALE",e[e.STALE=2]="STALE"}(Y||(Y={})),function(e){e[e.NONE=0]="NONE",e[e.LOG=1]="LOG",e[e.BREAK=2]="BREAK"}(Z||(Z={}));var ee=function(e){this.cause=e};function te(e){return e instanceof ee}function ne(e){switch(e.dependenciesState){case Y.UP_TO_DATE:return!1;case Y.NOT_TRACKING:case Y.STALE:return!0;case Y.POSSIBLY_STALE:for(var t=ce(!0),n=se(),r=e.observing,o=r.length,i=0;i<o;i++){var a=r[i];if(we(a)){if(Se.disableErrorBoundaries)a.get();else try{a.get()}catch(e){return ue(n),le(t),!0}if(e.dependenciesState===Y.STALE)return ue(n),le(t),!0}}return de(e),ue(n),le(t),!1}}function re(e){var t=e.observers.size>0;Se.computationDepth>0&&t&&f(!1),Se.allowStateChanges||!t&&"strict"!==Se.enforceActions||f(!1)}function oe(e,t,n){var r=ce(!0);de(e),e.newObserving=new Array(e.observing.length+100),e.unboundDepsCount=0,e.runId=++Se.runId;var o,i=Se.trackingDerivation;if(Se.trackingDerivation=e,!0===Se.disableErrorBoundaries)o=t.call(n);else try{o=t.call(n)}catch(e){o=new ee(e)}return Se.trackingDerivation=i,function(e){for(var t=e.observing,n=e.observing=e.newObserving,r=Y.UP_TO_DATE,o=0,i=e.unboundDepsCount,a=0;a<i;a++){0===(s=n[a]).diffValue&&(s.diffValue=1,o!==a&&(n[o]=s),o++),s.dependenciesState>r&&(r=s.dependenciesState)}n.length=o,e.newObserving=null,i=t.length;for(;i--;){0===(s=t[i]).diffValue&&Ce(s,e),s.diffValue=0}for(;o--;){var s;1===(s=n[o]).diffValue&&(s.diffValue=0,je(s,e))}r!==Y.UP_TO_DATE&&(e.dependenciesState=r,e.onBecomeStale())}(e),le(r),o}function ie(e){var t=e.observing;e.observing=[];for(var n=t.length;n--;)Ce(t[n],e);e.dependenciesState=Y.NOT_TRACKING}function ae(e){var t=se();try{return e()}finally{ue(t)}}function se(){var e=Se.trackingDerivation;return Se.trackingDerivation=null,e}function ue(e){Se.trackingDerivation=e}function ce(e){var t=Se.allowStateReads;return Se.allowStateReads=e,t}function le(e){Se.allowStateReads=e}function de(e){if(e.dependenciesState!==Y.UP_TO_DATE){e.dependenciesState=Y.UP_TO_DATE;for(var t=e.observing,n=t.length;n--;)t[n].lowestObserverState=Y.UP_TO_DATE}}var fe=0,pe=1,he=Object.getOwnPropertyDescriptor((function(){}),"name");he&&he.configurable;function ve(e,t,n){var r=function(){return ge(e,t,n||this,arguments)};return r.isMobxAction=!0,r}function ge(e,t,n,r){var o=function(e,t,n){var r=0;var o=se();Te();var i=ye(!0),a=ce(!0),s={prevDerivation:o,prevAllowStateChanges:i,prevAllowStateReads:a,notifySpy:!1,startTime:r,actionId:pe++,parentActionId:fe};return fe=s.actionId,s}();try{return t.apply(n,r)}catch(e){throw o.error=e,e}finally{!function(e){fe!==e.actionId&&f("invalid action stack. did you forget to finish an action?");fe=e.parentActionId,void 0!==e.error&&(Se.suppressReactionErrors=!0);be(e.prevAllowStateChanges),le(e.prevAllowStateReads),De(),ue(e.prevDerivation),e.notifySpy&&!1;Se.suppressReactionErrors=!1}(o)}}function ye(e){var t=Se.allowStateChanges;return Se.allowStateChanges=e,t}function be(e){Se.allowStateChanges=e}var me=function(e){function t(t,n,r,o,i){void 0===r&&(r="ObservableValue@"+d()),void 0===o&&(o=!0),void 0===i&&(i=C.default);var a=e.call(this,r)||this;return a.enhancer=n,a.name=r,a.equals=i,a.hasUnreportedChange=!1,a.value=n(t,void 0,r),a}return function(e,t){function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}(t,e),t.prototype.dehanceValue=function(e){return void 0!==this.dehancer?this.dehancer(e):e},t.prototype.set=function(e){this.value;if((e=this.prepareNewValue(e))!==Se.UNCHANGED){0,this.setNewValue(e)}},t.prototype.prepareNewValue=function(e){if(re(this),ht(this)){var t=gt(this,{object:this,type:"update",newValue:e});if(!t)return Se.UNCHANGED;e=t.newValue}return e=this.enhancer(e,this.value,this.name),this.equals(this.value,e)?Se.UNCHANGED:e},t.prototype.setNewValue=function(e){var t=this.value;this.value=e,this.reportChanged(),yt(this)&&mt(this,{type:"update",object:this,newValue:e,oldValue:t})},t.prototype.get=function(){return this.reportObserved(),this.dehanceValue(this.value)},t.prototype.intercept=function(e){return vt(this,e)},t.prototype.observe=function(e,t){return t&&e({object:this,type:"update",newValue:this.value,oldValue:void 0}),bt(this,e)},t.prototype.toJSON=function(){return this.get()},t.prototype.toString=function(){return this.name+"["+this.value+"]"},t.prototype.valueOf=function(){return $(this.get())},t.prototype[Symbol.toPrimitive]=function(){return this.valueOf()},t}(A),_e=(m("ObservableValue",me),function(){function e(e){this.dependenciesState=Y.NOT_TRACKING,this.observing=[],this.newObserving=null,this.isBeingObserved=!1,this.isPendingUnobservation=!1,this.observers=new Set,this.diffValue=0,this.runId=0,this.lastAccessedBy=0,this.lowestObserverState=Y.UP_TO_DATE,this.unboundDepsCount=0,this.__mapid="#"+d(),this.value=new ee(null),this.isComputing=!1,this.isRunningSetter=!1,this.isTracing=Z.NONE,p(e.get,"missing option for computed: get"),this.derivation=e.get,this.name=e.name||"ComputedValue@"+d(),e.set&&(this.setter=ve(this.name+"-setter",e.set)),this.equals=e.equals||(e.compareStructural||e.struct?C.structural:C.default),this.scope=e.context,this.requiresReaction=!!e.requiresReaction,this.keepAlive=!!e.keepAlive}return e.prototype.onBecomeStale=function(){!function(e){if(e.lowestObserverState!==Y.UP_TO_DATE)return;e.lowestObserverState=Y.POSSIBLY_STALE,e.observers.forEach((function(t){t.dependenciesState===Y.UP_TO_DATE&&(t.dependenciesState=Y.POSSIBLY_STALE,t.isTracing!==Z.NONE&&Le(t,e),t.onBecomeStale())}))}(this)},e.prototype.onBecomeObserved=function(){this.onBecomeObservedListeners&&this.onBecomeObservedListeners.forEach((function(e){return e()}))},e.prototype.onBecomeUnobserved=function(){this.onBecomeUnobservedListeners&&this.onBecomeUnobservedListeners.forEach((function(e){return e()}))},e.prototype.get=function(){this.isComputing&&f("Cycle detected in computation "+this.name+": "+this.derivation),0!==Se.inBatch||0!==this.observers.size||this.keepAlive?(Pe(this),ne(this)&&this.trackAndCompute()&&function(e){if(e.lowestObserverState===Y.STALE)return;e.lowestObserverState=Y.STALE,e.observers.forEach((function(t){t.dependenciesState===Y.POSSIBLY_STALE?t.dependenciesState=Y.STALE:t.dependenciesState===Y.UP_TO_DATE&&(e.lowestObserverState=Y.UP_TO_DATE)}))}(this)):ne(this)&&(this.warnAboutUntrackedRead(),Te(),this.value=this.computeValue(!1),De());var e=this.value;if(te(e))throw e.cause;return e},e.prototype.peek=function(){var e=this.computeValue(!1);if(te(e))throw e.cause;return e},e.prototype.set=function(e){if(this.setter){p(!this.isRunningSetter,"The setter of computed value '"+this.name+"' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?"),this.isRunningSetter=!0;try{this.setter.call(this.scope,e)}finally{this.isRunningSetter=!1}}else p(!1,!1)},e.prototype.trackAndCompute=function(){var e=this.value,t=this.dependenciesState===Y.NOT_TRACKING,n=this.computeValue(!0),r=t||te(e)||te(n)||!this.equals(e,n);return r&&(this.value=n),r},e.prototype.computeValue=function(e){var t;if(this.isComputing=!0,Se.computationDepth++,e)t=oe(this,this.derivation,this.scope);else if(!0===Se.disableErrorBoundaries)t=this.derivation.call(this.scope);else try{t=this.derivation.call(this.scope)}catch(e){t=new ee(e)}return Se.computationDepth--,this.isComputing=!1,t},e.prototype.suspend=function(){this.keepAlive||(ie(this),this.value=void 0)},e.prototype.observe=function(e,t){var n=this,r=!0,o=void 0;return qe((function(){var i=n.get();if(!r||t){var a=se();e({type:"update",object:n,newValue:i,oldValue:o}),ue(a)}r=!1,o=i}))},e.prototype.warnAboutUntrackedRead=function(){},e.prototype.toJSON=function(){return this.get()},e.prototype.toString=function(){return this.name+"["+this.derivation.toString()+"]"},e.prototype.valueOf=function(){return $(this.get())},e.prototype[Symbol.toPrimitive]=function(){return this.valueOf()},e}()),we=m("ComputedValue",_e),xe=function(){this.version=5,this.UNCHANGED={},this.trackingDerivation=null,this.computationDepth=0,this.runId=0,this.mobxGuid=0,this.inBatch=0,this.pendingUnobservations=[],this.pendingReactions=[],this.isRunningReactions=!1,this.allowStateChanges=!0,this.allowStateReads=!0,this.enforceActions=!1,this.spyListeners=[],this.globalReactionErrorHandlers=[],this.computedRequiresReaction=!1,this.reactionRequiresObservable=!1,this.observableRequiresReaction=!1,this.computedConfigurable=!1,this.disableErrorBoundaries=!1,this.suppressReactionErrors=!1},ke={};function $e(){return"undefined"!=typeof window?window:void 0!==r?r:"undefined"!=typeof self?self:ke}var Oe=!0,Ae=!1,Se=function(){var e=$e();return e.__mobxInstanceCount>0&&!e.__mobxGlobals&&(Oe=!1),e.__mobxGlobals&&e.__mobxGlobals.version!==(new xe).version&&(Oe=!1),Oe?e.__mobxGlobals?(e.__mobxInstanceCount+=1,e.__mobxGlobals.UNCHANGED||(e.__mobxGlobals.UNCHANGED={}),e.__mobxGlobals):(e.__mobxInstanceCount=1,e.__mobxGlobals=new xe):(setTimeout((function(){Ae||f("There are multiple, different versions of MobX active. Make sure MobX is loaded only once or use `configure({ isolateGlobalState: true })`")}),1),new xe)}();function je(e,t){e.observers.add(t),e.lowestObserverState>t.dependenciesState&&(e.lowestObserverState=t.dependenciesState)}function Ce(e,t){e.observers.delete(t),0===e.observers.size&&Ee(e)}function Ee(e){!1===e.isPendingUnobservation&&(e.isPendingUnobservation=!0,Se.pendingUnobservations.push(e))}function Te(){Se.inBatch++}function De(){if(0==--Se.inBatch){Ne();for(var e=Se.pendingUnobservations,t=0;t<e.length;t++){var n=e[t];n.isPendingUnobservation=!1,0===n.observers.size&&(n.isBeingObserved&&(n.isBeingObserved=!1,n.onBecomeUnobserved()),n instanceof _e&&n.suspend())}Se.pendingUnobservations=[]}}function Pe(e){var t=Se.trackingDerivation;return null!==t?(t.runId!==e.lastAccessedBy&&(e.lastAccessedBy=t.runId,t.newObserving[t.unboundDepsCount++]=e,e.isBeingObserved||(e.isBeingObserved=!0,e.onBecomeObserved())),!0):(0===e.observers.size&&Se.inBatch>0&&Ee(e),!1)}function Le(e,t){if(console.log("[mobx.trace] '"+e.name+"' is invalidated due to a change in: '"+t.name+"'"),e.isTracing===Z.BREAK){var n=[];!function e(t,n,r){if(n.length>=1e3)return void n.push("(and many more)");n.push(""+new Array(r).join("\t")+t.name),t.dependencies&&t.dependencies.forEach((function(t){return e(t,n,r+1)}))}(rt(e),n,1),new Function("debugger;\n/*\nTracing '"+e.name+"'\n\nYou are entering this break point because derivation '"+e.name+"' is being traced and '"+t.name+"' is now forcing it to update.\nJust follow the stacktrace you should now see in the devtools to see precisely what piece of your code is causing this update\nThe stackframe you are looking for is at least ~6-8 stack-frames up.\n\n"+(e instanceof _e?e.derivation.toString().replace(/[*]\//g,"/"):"")+"\n\nThe dependencies for this derivation are:\n\n"+n.join("\n")+"\n*/\n    ")()}}var Be=function(){function e(e,t,n,r){void 0===e&&(e="Reaction@"+d()),void 0===r&&(r=!1),this.name=e,this.onInvalidate=t,this.errorHandler=n,this.requiresObservable=r,this.observing=[],this.newObserving=[],this.dependenciesState=Y.NOT_TRACKING,this.diffValue=0,this.runId=0,this.unboundDepsCount=0,this.__mapid="#"+d(),this.isDisposed=!1,this._isScheduled=!1,this._isTrackPending=!1,this._isRunning=!1,this.isTracing=Z.NONE}return e.prototype.onBecomeStale=function(){this.schedule()},e.prototype.schedule=function(){this._isScheduled||(this._isScheduled=!0,Se.pendingReactions.push(this),Ne())},e.prototype.isScheduled=function(){return this._isScheduled},e.prototype.runReaction=function(){if(!this.isDisposed){if(Te(),this._isScheduled=!1,ne(this)){this._isTrackPending=!0;try{this.onInvalidate(),this._isTrackPending}catch(e){this.reportExceptionInDerivation(e)}}De()}},e.prototype.track=function(e){if(!this.isDisposed){Te();0,this._isRunning=!0;var t=oe(this,e,void 0);this._isRunning=!1,this._isTrackPending=!1,this.isDisposed&&ie(this),te(t)&&this.reportExceptionInDerivation(t.cause),De()}},e.prototype.reportExceptionInDerivation=function(e){var t=this;if(this.errorHandler)this.errorHandler(e,this);else{if(Se.disableErrorBoundaries)throw e;var n="[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '"+this+"'";Se.suppressReactionErrors?console.warn("[mobx] (error in reaction '"+this.name+"' suppressed, fix error of causing action below)"):console.error(n,e),Se.globalReactionErrorHandlers.forEach((function(n){return n(e,t)}))}},e.prototype.dispose=function(){this.isDisposed||(this.isDisposed=!0,this._isRunning||(Te(),ie(this),De()))},e.prototype.getDisposer=function(){var e=this.dispose.bind(this);return e[O]=this,e},e.prototype.toString=function(){return"Reaction["+this.name+"]"},e.prototype.trace=function(e){void 0===e&&(e=!1),function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=!1;"boolean"==typeof e[e.length-1]&&(n=e.pop());var r=ut(e);if(!r)return f(!1);r.isTracing===Z.NONE&&console.log("[mobx.trace] '"+r.name+"' tracing enabled");r.isTracing=n?Z.BREAK:Z.LOG}(this,e)},e}();var Me=function(e){return e()};function Ne(){Se.inBatch>0||Se.isRunningReactions||Me(Re)}function Re(){Se.isRunningReactions=!0;for(var e=Se.pendingReactions,t=0;e.length>0;){100==++t&&(console.error("Reaction doesn't converge to a stable state after 100 iterations. Probably there is a cycle in the reactive function: "+e[0]),e.splice(0));for(var n=e.splice(0),r=0,o=n.length;r<o;r++)n[r].runReaction()}Se.isRunningReactions=!1}var Ie=m("Reaction",Be);function Ue(e){var t=Me;Me=function(n){return e((function(){return t(n)}))}}function Ve(e){return console.warn("[mobx.spy] Is a no-op in production builds"),function(){}}function ze(){f(!1)}function Fe(e){return function(t,n,r){if(r){if(r.value)return{value:ve(e,r.value),enumerable:!1,configurable:!0,writable:!0};var o=r.initializer;return{enumerable:!1,configurable:!0,writable:!0,initializer:function(){return ve(e,o.call(this))}}}return Ge(e).apply(this,arguments)}}function Ge(e){return function(t,n,r){Object.defineProperty(t,n,{configurable:!0,enumerable:!1,get:function(){},set:function(t){b(this,n,He(e,t))}})}}var He=function(e,t,n,r){return 1===arguments.length&&"function"==typeof e?ve(e.name||"<unnamed action>",e):2===arguments.length&&"function"==typeof t?ve(e,t):1===arguments.length&&"string"==typeof e?Fe(e):!0!==r?Fe(t).apply(null,arguments):void b(e,t,ve(e.name||t,n.value,this))};function We(e,t){"string"==typeof e||e.name;return ge(0,"function"==typeof e?e:t,this,void 0)}function Ke(e,t,n){b(e,t,ve(t,n.bind(e)))}function qe(e,t){void 0===t&&(t=l);var n,r=t&&t.name||e.name||"Autorun@"+d();if(!t.scheduler&&!t.delay)n=new Be(r,(function(){this.track(a)}),t.onError,t.requiresObservable);else{var o=Xe(t),i=!1;n=new Be(r,(function(){i||(i=!0,o((function(){i=!1,n.isDisposed||n.track(a)})))}),t.onError,t.requiresObservable)}function a(){e(n)}return n.schedule(),n.getDisposer()}He.bound=function(e,t,n,r){return!0===r?(Ke(e,t,n.value),null):n?{configurable:!0,enumerable:!1,get:function(){return Ke(this,t,n.value||n.initializer.call(this)),this[t]},set:ze}:{enumerable:!1,configurable:!0,set:function(e){Ke(this,t,e)},get:function(){}}};var Je=function(e){return e()};function Xe(e){return e.scheduler?e.scheduler:e.delay?function(t){return setTimeout(t,e.delay)}:Je}function Ye(e,t,n){return Ze("onBecomeUnobserved",e,t,n)}function Ze(e,t,n,r){var o="function"==typeof r?Vt(t,n):Vt(t),i="function"==typeof r?r:n,a=e+"Listeners";return o[a]?o[a].add(i):o[a]=new Set([i]),"function"!=typeof o[e]?f(!1):function(){var e=o[a];e&&(e.delete(i),0===e.size&&delete o[a])}}function Qe(e){var t=e.enforceActions,n=e.computedRequiresReaction,r=e.computedConfigurable,o=e.disableErrorBoundaries,i=e.reactionScheduler,a=e.reactionRequiresObservable,s=e.observableRequiresReaction;if(!0===e.isolateGlobalState&&((Se.pendingReactions.length||Se.inBatch||Se.isRunningReactions)&&f("isolateGlobalState should be called before MobX is running any reactions"),Ae=!0,Oe&&(0==--$e().__mobxInstanceCount&&($e().__mobxGlobals=void 0),Se=new xe)),void 0!==t){var u=void 0;switch(t){case!0:case"observed":u=!0;break;case!1:case"never":u=!1;break;case"strict":case"always":u="strict";break;default:f("Invalid value for 'enforceActions': '"+t+"', expected 'never', 'always' or 'observed'")}Se.enforceActions=u,Se.allowStateChanges=!0!==u&&"strict"!==u}void 0!==n&&(Se.computedRequiresReaction=!!n),void 0!==a&&(Se.reactionRequiresObservable=!!a),void 0!==s&&(Se.observableRequiresReaction=!!s,Se.allowStateReads=!Se.observableRequiresReaction),void 0!==r&&(Se.computedConfigurable=!!r),void 0!==o&&(!0===o&&console.warn("WARNING: Debug feature only. MobX will NOT recover from errors when `disableErrorBoundaries` is enabled."),Se.disableErrorBoundaries=!!o),i&&Ue(i)}function et(e,t,n,r){var o=tt(r=z(r));return B(e),Bt(e,r.name,o.enhancer),t&&nt(e,t,n,o),e}function tt(e){return e.defaultDecorator||(!1===e.deep?H:F)}function nt(e,t,n,r){var o,i;Te();try{var s=x(t);try{for(var u=a(s),c=u.next();!c.done;c=u.next()){var l=c.value,d=Object.getOwnPropertyDescriptor(t,l);0;var f=(n&&l in n?n[l]:d.get?Q:r)(e,l,d,!0);f&&Object.defineProperty(e,l,f)}}catch(e){o={error:e}}finally{try{c&&!c.done&&(i=u.return)&&i.call(u)}finally{if(o)throw o.error}}}finally{De()}}function rt(e,t){return ot(Vt(e,t))}function ot(e){var t,n,r={name:e.name};return e.observing&&e.observing.length>0&&(r.dependencies=(t=e.observing,n=[],t.forEach((function(e){-1===n.indexOf(e)&&n.push(e)})),n).map(ot)),r}function it(){this.message="FLOW_CANCELLED"}function at(e,t){return null!=e&&(void 0!==t?!!Ut(e)&&e[O].values.has(t):Ut(e)||!!e[O]||S(e)||Ie(e)||we(e))}function st(e){return 1!==arguments.length&&f(!1),at(e)}it.prototype=Object.create(Error.prototype);function ut(e){switch(e.length){case 0:return Se.trackingDerivation;case 1:return Vt(e[0]);case 2:return Vt(e[0],e[1])}}function ct(e,t){void 0===t&&(t=void 0),Te();try{return e.apply(t)}finally{De()}}function lt(e){return e[O]}function dt(e){return"string"==typeof e||"number"==typeof e||"symbol"==typeof e}var ft={has:function(e,t){if(t===O||"constructor"===t||t===E)return!0;var n=lt(e);return dt(t)?n.has(t):t in e},get:function(e,t){if(t===O||"constructor"===t||t===E)return e[t];var n=lt(e),r=n.values.get(t);if(r instanceof A){var o=r.get();return void 0===o&&n.has(t),o}return dt(t)&&n.has(t),e[t]},set:function(e,t,n){return!!dt(t)&&(function e(t,n,r){if(2!==arguments.length||Pt(t))if(Ut(t)){var o=t[O],i=o.values.get(n);i?o.write(n,r):o.addObservableProp(n,r,o.defaultEnhancer)}else if(Et(t))t.set(n,r);else if(Pt(t))t.add(n);else{if(!At(t))return f(!1);"number"!=typeof n&&(n=parseInt(n,10)),p(n>=0,"Not a valid index: '"+n+"'"),Te(),n>=t.length&&(t.length=n+1),t[n]=r,De()}else{Te();var a=n;try{for(var s in a)e(t,s,a[s])}finally{De()}}}(e,t,n),!0)},deleteProperty:function(e,t){return!!dt(t)&&(lt(e).remove(t),!0)},ownKeys:function(e){return lt(e).keysAtom.reportObserved(),Reflect.ownKeys(e)},preventExtensions:function(e){return f("Dynamic observable objects cannot be frozen"),!1}};function pt(e){var t=new Proxy(e,ft);return e[O].proxy=t,t}function ht(e){return void 0!==e.interceptors&&e.interceptors.length>0}function vt(e,t){var n=e.interceptors||(e.interceptors=[]);return n.push(t),h((function(){var e=n.indexOf(t);-1!==e&&n.splice(e,1)}))}function gt(e,t){var n=se();try{for(var r=u(e.interceptors||[]),o=0,i=r.length;o<i&&(p(!(t=r[o](t))||t.type,"Intercept handlers should return nothing or a change object"),t);o++);return t}finally{ue(n)}}function yt(e){return void 0!==e.changeListeners&&e.changeListeners.length>0}function bt(e,t){var n=e.changeListeners||(e.changeListeners=[]);return n.push(t),h((function(){var e=n.indexOf(t);-1!==e&&n.splice(e,1)}))}function mt(e,t){var n=se(),r=e.changeListeners;if(r){for(var o=0,i=(r=r.slice()).length;o<i;o++)r[o](t);ue(n)}}var _t={get:function(e,t){return t===O?e[O]:"length"===t?e[O].getArrayLength():"number"==typeof t?kt.get.call(e,t):"string"!=typeof t||isNaN(t)?kt.hasOwnProperty(t)?kt[t]:e[t]:kt.get.call(e,parseInt(t))},set:function(e,t,n){return"length"===t&&e[O].setArrayLength(n),"number"==typeof t&&kt.set.call(e,t,n),"symbol"==typeof t||isNaN(t)?e[t]=n:kt.set.call(e,parseInt(t),n),!0},preventExtensions:function(e){return f("Observable arrays cannot be frozen"),!1}};function wt(e,t,n,r){void 0===n&&(n="ObservableArray@"+d()),void 0===r&&(r=!1);var o,i,a,s=new xt(n,t,r);o=s.values,i=O,a=s,Object.defineProperty(o,i,{enumerable:!1,writable:!1,configurable:!0,value:a});var u=new Proxy(s.values,_t);if(s.proxy=u,e&&e.length){var c=ye(!0);s.spliceWithArray(0,0,e),be(c)}return u}var xt=function(){function e(e,t,n){this.owned=n,this.values=[],this.proxy=void 0,this.lastKnownLength=0,this.atom=new A(e||"ObservableArray@"+d()),this.enhancer=function(n,r){return t(n,r,e+"[..]")}}return e.prototype.dehanceValue=function(e){return void 0!==this.dehancer?this.dehancer(e):e},e.prototype.dehanceValues=function(e){return void 0!==this.dehancer&&e.length>0?e.map(this.dehancer):e},e.prototype.intercept=function(e){return vt(this,e)},e.prototype.observe=function(e,t){return void 0===t&&(t=!1),t&&e({object:this.proxy,type:"splice",index:0,added:this.values.slice(),addedCount:this.values.length,removed:[],removedCount:0}),bt(this,e)},e.prototype.getArrayLength=function(){return this.atom.reportObserved(),this.values.length},e.prototype.setArrayLength=function(e){if("number"!=typeof e||e<0)throw new Error("[mobx.array] Out of range: "+e);var t=this.values.length;if(e!==t)if(e>t){for(var n=new Array(e-t),r=0;r<e-t;r++)n[r]=void 0;this.spliceWithArray(t,0,n)}else this.spliceWithArray(e,t-e)},e.prototype.updateArrayLength=function(e,t){if(e!==this.lastKnownLength)throw new Error("[mobx] Modification exception: the internal structure of an observable array was changed.");this.lastKnownLength+=t},e.prototype.spliceWithArray=function(e,t,n){var r=this;re(this.atom);var o=this.values.length;if(void 0===e?e=0:e>o?e=o:e<0&&(e=Math.max(0,o+e)),t=1===arguments.length?o-e:null==t?0:Math.max(0,Math.min(t,o-e)),void 0===n&&(n=c),ht(this)){var i=gt(this,{object:this.proxy,type:"splice",index:e,removedCount:t,added:n});if(!i)return c;t=i.removedCount,n=i.added}n=0===n.length?n:n.map((function(e){return r.enhancer(e,void 0)}));var a=this.spliceItemsIntoValues(e,t,n);return 0===t&&0===n.length||this.notifyArraySplice(e,n,a),this.dehanceValues(a)},e.prototype.spliceItemsIntoValues=function(e,t,n){var r;if(n.length<1e4)return(r=this.values).splice.apply(r,u([e,t],n));var o=this.values.slice(e,e+t);return this.values=this.values.slice(0,e).concat(n,this.values.slice(e+t)),o},e.prototype.notifyArrayChildUpdate=function(e,t,n){var r=!this.owned&&!1,o=yt(this),i=o||r?{object:this.proxy,type:"update",index:e,newValue:t,oldValue:n}:null;this.atom.reportChanged(),o&&mt(this,i)},e.prototype.notifyArraySplice=function(e,t,n){var r=!this.owned&&!1,o=yt(this),i=o||r?{object:this.proxy,type:"splice",index:e,removed:n,added:t,removedCount:n.length,addedCount:t.length}:null;this.atom.reportChanged(),o&&mt(this,i)},e}(),kt={intercept:function(e){return this[O].intercept(e)},observe:function(e,t){return void 0===t&&(t=!1),this[O].observe(e,t)},clear:function(){return this.splice(0)},replace:function(e){var t=this[O];return t.spliceWithArray(0,t.values.length,e)},toJS:function(){return this.slice()},toJSON:function(){return this.toJS()},splice:function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];var o=this[O];switch(arguments.length){case 0:return[];case 1:return o.spliceWithArray(e);case 2:return o.spliceWithArray(e,t)}return o.spliceWithArray(e,t,n)},spliceWithArray:function(e,t,n){return this[O].spliceWithArray(e,t,n)},push:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=this[O];return n.spliceWithArray(n.values.length,0,e),n.values.length},pop:function(){return this.splice(Math.max(this[O].values.length-1,0),1)[0]},shift:function(){return this.splice(0,1)[0]},unshift:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=this[O];return n.spliceWithArray(0,0,e),n.values.length},reverse:function(){var e=this.slice();return e.reverse.apply(e,arguments)},sort:function(e){var t=this.slice();return t.sort.apply(t,arguments)},remove:function(e){var t=this[O],n=t.dehanceValues(t.values).indexOf(e);return n>-1&&(this.splice(n,1),!0)},get:function(e){var t=this[O];if(t){if(e<t.values.length)return t.atom.reportObserved(),t.dehanceValue(t.values[e]);console.warn("[mobx.array] Attempt to read an array index ("+e+") that is out of bounds ("+t.values.length+"). Please check length first. Out of bound indices will not be tracked by MobX")}},set:function(e,t){var n=this[O],r=n.values;if(e<r.length){re(n.atom);var o=r[e];if(ht(n)){var i=gt(n,{type:"update",object:n.proxy,index:e,newValue:t});if(!i)return;t=i.newValue}(t=n.enhancer(t,o))!==o&&(r[e]=t,n.notifyArrayChildUpdate(e,t,o))}else{if(e!==r.length)throw new Error("[mobx.array] Index out of bounds, "+e+" is larger than "+r.length);n.spliceWithArray(e,0,[t])}}};["concat","every","filter","forEach","indexOf","join","lastIndexOf","map","reduce","reduceRight","slice","some","toString","toLocaleString"].forEach((function(e){kt[e]=function(){var t=this[O];t.atom.reportObserved();var n=t.dehanceValues(t.values);return n[e].apply(n,arguments)}}));var $t,Ot=m("ObservableArrayAdministration",xt);function At(e){return g(e)&&Ot(e[O])}var St,jt={},Ct=function(){function e(e,t,n){if(void 0===t&&(t=R),void 0===n&&(n="ObservableMap@"+d()),this.enhancer=t,this.name=n,this[$t]=jt,this._keysAtom=j(this.name+".keys()"),this[Symbol.toStringTag]="Map","function"!=typeof Map)throw new Error("mobx.map requires Map polyfill for the current browser. Check babel-polyfill or core-js/es6/map.js");this._data=new Map,this._hasMap=new Map,this.merge(e)}return e.prototype._has=function(e){return this._data.has(e)},e.prototype.has=function(e){var t=this;if(!Se.trackingDerivation)return this._has(e);var n=this._hasMap.get(e);if(!n){var r=n=new me(this._has(e),I,this.name+"."+k(e)+"?",!1);this._hasMap.set(e,r),Ye(r,(function(){return t._hasMap.delete(e)}))}return n.get()},e.prototype.set=function(e,t){var n=this._has(e);if(ht(this)){var r=gt(this,{type:n?"update":"add",object:this,newValue:t,name:e});if(!r)return this;t=r.newValue}return n?this._updateValue(e,t):this._addValue(e,t),this},e.prototype.delete=function(e){var t=this;if(ht(this)&&!(r=gt(this,{type:"delete",object:this,name:e})))return!1;if(this._has(e)){var n=yt(this),r=n?{type:"delete",object:this,oldValue:this._data.get(e).value,name:e}:null;return ct((function(){t._keysAtom.reportChanged(),t._updateHasMapEntry(e,!1),t._data.get(e).setNewValue(void 0),t._data.delete(e)})),n&&mt(this,r),!0}return!1},e.prototype._updateHasMapEntry=function(e,t){var n=this._hasMap.get(e);n&&n.setNewValue(t)},e.prototype._updateValue=function(e,t){var n=this._data.get(e);if((t=n.prepareNewValue(t))!==Se.UNCHANGED){var r=yt(this),o=r?{type:"update",object:this,oldValue:n.value,name:e,newValue:t}:null;0,n.setNewValue(t),r&&mt(this,o)}},e.prototype._addValue=function(e,t){var n=this;re(this._keysAtom),ct((function(){var r=new me(t,n.enhancer,n.name+"."+k(e),!1);n._data.set(e,r),t=r.value,n._updateHasMapEntry(e,!0),n._keysAtom.reportChanged()}));var r=yt(this),o=r?{type:"add",object:this,name:e,newValue:t}:null;r&&mt(this,o)},e.prototype.get=function(e){return this.has(e)?this.dehanceValue(this._data.get(e).get()):this.dehanceValue(void 0)},e.prototype.dehanceValue=function(e){return void 0!==this.dehancer?this.dehancer(e):e},e.prototype.keys=function(){return this._keysAtom.reportObserved(),this._data.keys()},e.prototype.values=function(){var e=this,t=0,n=Array.from(this.keys());return Kt({next:function(){return t<n.length?{value:e.get(n[t++]),done:!1}:{done:!0}}})},e.prototype.entries=function(){var e=this,t=0,n=Array.from(this.keys());return Kt({next:function(){if(t<n.length){var r=n[t++];return{value:[r,e.get(r)],done:!1}}return{done:!0}}})},e.prototype[($t=O,Symbol.iterator)]=function(){return this.entries()},e.prototype.forEach=function(e,t){var n,r;try{for(var o=a(this),i=o.next();!i.done;i=o.next()){var u=s(i.value,2),c=u[0],l=u[1];e.call(t,l,c,this)}}catch(e){n={error:e}}finally{try{i&&!i.done&&(r=o.return)&&r.call(o)}finally{if(n)throw n.error}}},e.prototype.merge=function(e){var t=this;return Et(e)&&(e=e.toJS()),ct((function(){y(e)?x(e).forEach((function(n){return t.set(n,e[n])})):Array.isArray(e)?e.forEach((function(e){var n=s(e,2),r=n[0],o=n[1];return t.set(r,o)})):_(e)?(e.constructor!==Map&&f("Cannot initialize from classes that inherit from Map: "+e.constructor.name),e.forEach((function(e,n){return t.set(n,e)}))):null!=e&&f("Cannot initialize map from "+e)})),this},e.prototype.clear=function(){var e=this;ct((function(){ae((function(){var t,n;try{for(var r=a(e.keys()),o=r.next();!o.done;o=r.next()){var i=o.value;e.delete(i)}}catch(e){t={error:e}}finally{try{o&&!o.done&&(n=r.return)&&n.call(r)}finally{if(t)throw t.error}}}))}))},e.prototype.replace=function(e){var t=this;return ct((function(){var n,r=y(n=e)?Object.keys(n):Array.isArray(n)?n.map((function(e){return s(e,1)[0]})):_(n)||Et(n)?Array.from(n.keys()):f("Cannot get keys from '"+n+"'");Array.from(t.keys()).filter((function(e){return-1===r.indexOf(e)})).forEach((function(e){return t.delete(e)})),t.merge(e)})),this},Object.defineProperty(e.prototype,"size",{get:function(){return this._keysAtom.reportObserved(),this._data.size},enumerable:!0,configurable:!0}),e.prototype.toPOJO=function(){var e,t,n={};try{for(var r=a(this),o=r.next();!o.done;o=r.next()){var i=s(o.value,2),u=i[0],c=i[1];n["symbol"==typeof u?u:k(u)]=c}}catch(t){e={error:t}}finally{try{o&&!o.done&&(t=r.return)&&t.call(r)}finally{if(e)throw e.error}}return n},e.prototype.toJS=function(){return new Map(this)},e.prototype.toJSON=function(){return this.toPOJO()},e.prototype.toString=function(){var e=this;return this.name+"[{ "+Array.from(this.keys()).map((function(t){return k(t)+": "+e.get(t)})).join(", ")+" }]"},e.prototype.observe=function(e,t){return bt(this,e)},e.prototype.intercept=function(e){return vt(this,e)},e}(),Et=m("ObservableMap",Ct),Tt={},Dt=function(){function e(e,t,n){if(void 0===t&&(t=R),void 0===n&&(n="ObservableSet@"+d()),this.name=n,this[St]=Tt,this._data=new Set,this._atom=j(this.name),this[Symbol.toStringTag]="Set","function"!=typeof Set)throw new Error("mobx.set requires Set polyfill for the current browser. Check babel-polyfill or core-js/es6/set.js");this.enhancer=function(e,r){return t(e,r,n)},e&&this.replace(e)}return e.prototype.dehanceValue=function(e){return void 0!==this.dehancer?this.dehancer(e):e},e.prototype.clear=function(){var e=this;ct((function(){ae((function(){var t,n;try{for(var r=a(e._data.values()),o=r.next();!o.done;o=r.next()){var i=o.value;e.delete(i)}}catch(e){t={error:e}}finally{try{o&&!o.done&&(n=r.return)&&n.call(r)}finally{if(t)throw t.error}}}))}))},e.prototype.forEach=function(e,t){var n,r;try{for(var o=a(this),i=o.next();!i.done;i=o.next()){var s=i.value;e.call(t,s,s,this)}}catch(e){n={error:e}}finally{try{i&&!i.done&&(r=o.return)&&r.call(o)}finally{if(n)throw n.error}}},Object.defineProperty(e.prototype,"size",{get:function(){return this._atom.reportObserved(),this._data.size},enumerable:!0,configurable:!0}),e.prototype.add=function(e){var t=this;if((re(this._atom),ht(this))&&!(r=gt(this,{type:"add",object:this,newValue:e})))return this;if(!this.has(e)){ct((function(){t._data.add(t.enhancer(e,void 0)),t._atom.reportChanged()}));var n=yt(this),r=n?{type:"add",object:this,newValue:e}:null;0,n&&mt(this,r)}return this},e.prototype.delete=function(e){var t=this;if(ht(this)&&!(r=gt(this,{type:"delete",object:this,oldValue:e})))return!1;if(this.has(e)){var n=yt(this),r=n?{type:"delete",object:this,oldValue:e}:null;return ct((function(){t._atom.reportChanged(),t._data.delete(e)})),n&&mt(this,r),!0}return!1},e.prototype.has=function(e){return this._atom.reportObserved(),this._data.has(this.dehanceValue(e))},e.prototype.entries=function(){var e=0,t=Array.from(this.keys()),n=Array.from(this.values());return Kt({next:function(){var r=e;return e+=1,r<n.length?{value:[t[r],n[r]],done:!1}:{done:!0}}})},e.prototype.keys=function(){return this.values()},e.prototype.values=function(){this._atom.reportObserved();var e=this,t=0,n=Array.from(this._data.values());return Kt({next:function(){return t<n.length?{value:e.dehanceValue(n[t++]),done:!1}:{done:!0}}})},e.prototype.replace=function(e){var t=this;return Pt(e)&&(e=e.toJS()),ct((function(){Array.isArray(e)||w(e)?(t.clear(),e.forEach((function(e){return t.add(e)}))):null!=e&&f("Cannot initialize set from "+e)})),this},e.prototype.observe=function(e,t){return bt(this,e)},e.prototype.intercept=function(e){return vt(this,e)},e.prototype.toJS=function(){return new Set(this)},e.prototype.toString=function(){return this.name+"[ "+Array.from(this).join(", ")+" ]"},e.prototype[(St=O,Symbol.iterator)]=function(){return this.values()},e}(),Pt=m("ObservableSet",Dt),Lt=function(){function e(e,t,n,r){void 0===t&&(t=new Map),this.target=e,this.values=t,this.name=n,this.defaultEnhancer=r,this.keysAtom=new A(n+".keys")}return e.prototype.read=function(e){return this.values.get(e).get()},e.prototype.write=function(e,t){var n=this.target,r=this.values.get(e);if(r instanceof _e)r.set(t);else{if(ht(this)){if(!(i=gt(this,{type:"update",object:this.proxy||n,name:e,newValue:t})))return;t=i.newValue}if((t=r.prepareNewValue(t))!==Se.UNCHANGED){var o=yt(this),i=o?{type:"update",object:this.proxy||n,oldValue:r.value,name:e,newValue:t}:null;0,r.setNewValue(t),o&&mt(this,i)}}},e.prototype.has=function(e){var t=this.pendingKeys||(this.pendingKeys=new Map),n=t.get(e);if(n)return n.get();var r=!!this.values.get(e);return n=new me(r,I,this.name+"."+k(e)+"?",!1),t.set(e,n),n.get()},e.prototype.addObservableProp=function(e,t,n){void 0===n&&(n=this.defaultEnhancer);var r=this.target;if(ht(this)){var o=gt(this,{object:this.proxy||r,name:e,type:"add",newValue:t});if(!o)return;t=o.newValue}var i=new me(t,n,this.name+"."+k(e),!1);this.values.set(e,i),t=i.value,Object.defineProperty(r,e,function(e){return Mt[e]||(Mt[e]={configurable:!0,enumerable:!0,get:function(){return this[O].read(e)},set:function(t){this[O].write(e,t)}})}(e)),this.notifyPropertyAddition(e,t)},e.prototype.addComputedProp=function(e,t,n){var r,o,i,a=this.target;n.name=n.name||this.name+"."+k(t),this.values.set(t,new _e(n)),(e===a||(r=e,o=t,!(i=Object.getOwnPropertyDescriptor(r,o))||!1!==i.configurable&&!1!==i.writable))&&Object.defineProperty(e,t,function(e){return Nt[e]||(Nt[e]={configurable:Se.computedConfigurable,enumerable:!1,get:function(){return Rt(this).read(e)},set:function(t){Rt(this).write(e,t)}})}(t))},e.prototype.remove=function(e){if(this.values.has(e)){var t=this.target;if(ht(this))if(!(a=gt(this,{object:this.proxy||t,name:e,type:"remove"})))return;try{Te();var n=yt(this),r=this.values.get(e),o=r&&r.get();if(r&&r.set(void 0),this.keysAtom.reportChanged(),this.values.delete(e),this.pendingKeys){var i=this.pendingKeys.get(e);i&&i.set(!1)}delete this.target[e];var a=n?{type:"remove",object:this.proxy||t,oldValue:o,name:e}:null;0,n&&mt(this,a)}finally{De()}}},e.prototype.illegalAccess=function(e,t){console.warn("Property '"+t+"' of '"+e+"' was accessed through the prototype chain. Use 'decorate' instead to declare the prop or access it statically through it's owner")},e.prototype.observe=function(e,t){return bt(this,e)},e.prototype.intercept=function(e){return vt(this,e)},e.prototype.notifyPropertyAddition=function(e,t){var n=yt(this),r=n?{type:"add",object:this.proxy||this.target,name:e,newValue:t}:null;if(n&&mt(this,r),this.pendingKeys){var o=this.pendingKeys.get(e);o&&o.set(!0)}this.keysAtom.reportChanged()},e.prototype.getKeys=function(){var e,t;this.keysAtom.reportObserved();var n=[];try{for(var r=a(this.values),o=r.next();!o.done;o=r.next()){var i=s(o.value,2),u=i[0];i[1]instanceof me&&n.push(u)}}catch(t){e={error:t}}finally{try{o&&!o.done&&(t=r.return)&&t.call(r)}finally{if(e)throw e.error}}return n},e}();function Bt(e,t,n){if(void 0===t&&(t=""),void 0===n&&(n=R),Object.prototype.hasOwnProperty.call(e,O))return e[O];y(e)||(t=(e.constructor.name||"ObservableObject")+"@"+d()),t||(t="ObservableObject@"+d());var r=new Lt(e,new Map,k(t),n);return b(e,O,r),r}var Mt=Object.create(null),Nt=Object.create(null);function Rt(e){var t=e[O];return t||(B(e),e[O])}var It=m("ObservableObjectAdministration",Lt);function Ut(e){return!!g(e)&&(B(e),It(e[O]))}function Vt(e,t){if("object"==typeof e&&null!==e){if(At(e))return void 0!==t&&f(!1),e[O].atom;if(Pt(e))return e[O];if(Et(e)){var n=e;return void 0===t?n._keysAtom:((r=n._data.get(t)||n._hasMap.get(t))||f(!1),r)}var r;if(B(e),t&&!e[O]&&e[t],Ut(e))return t?((r=e[O].values.get(t))||f(!1),r):f(!1);if(S(e)||we(e)||Ie(e))return e}else if("function"==typeof e&&Ie(e[O]))return e[O];return f(!1)}function zt(e,t){return e||f("Expecting some object"),void 0!==t?zt(Vt(e,t)):S(e)||we(e)||Ie(e)||Et(e)||Pt(e)?e:(B(e),e[O]?e[O]:void f(!1))}var Ft=Object.prototype.toString;function Gt(e,t,n){return void 0===n&&(n=-1),function e(t,n,r,o,i){if(t===n)return 0!==t||1/t==1/n;if(null==t||null==n)return!1;if(t!=t)return n!=n;var a=typeof t;if("function"!==a&&"object"!==a&&"object"!=typeof n)return!1;var s=Ft.call(t);if(s!==Ft.call(n))return!1;switch(s){case"[object RegExp]":case"[object String]":return""+t==""+n;case"[object Number]":return+t!=+t?+n!=+n:0==+t?1/+t==1/n:+t==+n;case"[object Date]":case"[object Boolean]":return+t==+n;case"[object Symbol]":return"undefined"!=typeof Symbol&&Symbol.valueOf.call(t)===Symbol.valueOf.call(n);case"[object Map]":case"[object Set]":r>=0&&r++}t=Ht(t),n=Ht(n);var u="[object Array]"===s;if(!u){if("object"!=typeof t||"object"!=typeof n)return!1;var c=t.constructor,l=n.constructor;if(c!==l&&!("function"==typeof c&&c instanceof c&&"function"==typeof l&&l instanceof l)&&"constructor"in t&&"constructor"in n)return!1}if(0===r)return!1;r<0&&(r=-1);i=i||[];var d=(o=o||[]).length;for(;d--;)if(o[d]===t)return i[d]===n;if(o.push(t),i.push(n),u){if((d=t.length)!==n.length)return!1;for(;d--;)if(!e(t[d],n[d],r-1,o,i))return!1}else{var f=Object.keys(t),p=void 0;if(d=f.length,Object.keys(n).length!==d)return!1;for(;d--;)if(p=f[d],!Wt(n,p)||!e(t[p],n[p],r-1,o,i))return!1}return o.pop(),i.pop(),!0}(e,t,n)}function Ht(e){return At(e)?e.slice():_(e)||Et(e)||w(e)||Pt(e)?Array.from(e.entries()):e}function Wt(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function Kt(e){return e[Symbol.iterator]=qt,e}function qt(){return this}if("undefined"==typeof Proxy||"undefined"==typeof Symbol)throw new Error("[mobx] MobX 5+ requires Proxy and Symbol objects. If your environment doesn't support Symbol or Proxy objects, please downgrade to MobX 4. For React Native Android, consider upgrading JSCore.");"object"==typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__&&__MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({spy:Ve,extras:{getDebugName:function(e,t){return(void 0!==t?Vt(e,t):Ut(e)||Et(e)||Pt(e)?zt(e):Vt(e)).name}},$mobx:O})}).call(this,n(7),n(5))},function(e,t,n){"use strict";n.d(t,"c",(function(){return u})),n.d(t,"b",(function(){return d}));var r=n(0);n.d(t,"d",(function(){return r.a})),n.d(t,"e",(function(){return r.j}));var o=n(1);function i(e,t){for(var n in t)e[n]=t[n];return e}function a(e,t){for(var n in e)if("__source"!==n&&!(n in t))return!0;for(var r in t)if("__source"!==r&&e[r]!==t[r])return!0;return!1}var s=function(e){var t,n;function r(t){var n;return(n=e.call(this,t)||this).isPureReactComponent=!0,n}return n=e,(t=r).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,r.prototype.shouldComponentUpdate=function(e,t){return a(this.props,e)||a(this.state,t)},r}(o.a);function u(e,t){function n(e){var n=this.props.ref,r=n==e.ref;return!r&&n&&(n.call?n(null):n.current=null),t?!t(this.props,e)||!r:a(this.props,e)}function r(t){return this.shouldComponentUpdate=n,Object(o.f)(e,t)}return r.prototype.isReactComponent=!0,r.displayName="Memo("+(e.displayName||e.name)+")",r.t=!0,r}var c=o.j.__b;o.j.__b=function(e){e.type&&e.type.t&&e.ref&&(e.props.ref=e.ref,e.ref=null),c&&c(e)};var l="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.forward_ref")||3911;function d(e){function t(t,n){var r=i({},t);return delete r.ref,e(r,t.ref||n)}return t.$$typeof=l,t.render=t,t.prototype.isReactComponent=t.t=!0,t.displayName="ForwardRef("+(e.displayName||e.name)+")",t}var f=function(e,t){return e?Object(o.l)(e).reduce((function(e,n,r){return e.concat(t(n,r))}),[]):null},p={map:f,forEach:f,count:function(e){return e?Object(o.l)(e).length:0},only:function(e){if(1!==(e=Object(o.l)(e)).length)throw new Error("Children.only() expects only one child.");return e[0]},toArray:o.l},h=o.j.__e;function v(e){return e&&((e=i({},e)).__c=null,e.__k=e.__k&&e.__k.map(v)),e}function g(){this.__u=0,this.o=null,this.__b=null}function y(e){var t=e.__.__c;return t&&t.u&&t.u(e)}function b(){this.i=null,this.l=null}o.j.__e=function(e,t,n){if(e.then)for(var r,o=t;o=o.__;)if((r=o.__c)&&r.__c)return r.__c(e,t.__c);h(e,t,n)},(g.prototype=new o.a).__c=function(e,t){var n=this;null==n.o&&(n.o=[]),n.o.push(t);var r=y(n.__v),o=!1,i=function(){o||(o=!0,r?r(a):a())};t.__c=t.componentWillUnmount,t.componentWillUnmount=function(){i(),t.__c&&t.__c()};var a=function(){var e;if(!--n.__u)for(n.__v.__k[0]=n.state.u,n.setState({u:n.__b=null});e=n.o.pop();)e.forceUpdate()};n.__u++||n.setState({u:n.__b=n.__v.__k[0]}),e.then(i,i)},g.prototype.render=function(e,t){return this.__b&&(this.__v.__k[0]=v(this.__b),this.__b=null),[Object(o.f)(o.a,null,t.u?null:e.children),t.u&&e.fallback]};var m=function(e,t,n){if(++n[1]===n[0]&&e.l.delete(t),e.props.revealOrder&&("t"!==e.props.revealOrder[0]||!e.l.size))for(n=e.i;n;){for(;n.length>3;)n.pop()();if(n[1]<n[0])break;e.i=n=n[2]}};(b.prototype=new o.a).u=function(e){var t=this,n=y(t.__v),r=t.l.get(e);return r[0]++,function(o){var i=function(){t.props.revealOrder?(r.push(o),m(t,e,r)):o()};n?n(i):i()}},b.prototype.render=function(e){this.i=null,this.l=new Map;var t=Object(o.l)(e.children);e.revealOrder&&"b"===e.revealOrder[0]&&t.reverse();for(var n=t.length;n--;)this.l.set(t[n],this.i=[1,0,this.i]);return e.children},b.prototype.componentDidUpdate=b.prototype.componentDidMount=function(){var e=this;e.l.forEach((function(t,n){m(e,n,t)}))};var _=function(){function e(){}var t=e.prototype;return t.getChildContext=function(){return this.props.context},t.render=function(e){return e.children},e}();function w(e){var t=this,n=e.container,r=Object(o.f)(_,{context:t.context},e.vnode);return t.s&&t.s!==n&&(t.v.parentNode&&t.s.removeChild(t.v),Object(o.c)(t.h),t.p=!1),e.vnode?t.p?(n.__k=t.__k,Object(o.k)(r,n),t.__k=n.__k):(t.v=document.createTextNode(""),Object(o.i)("",n),n.appendChild(t.v),t.p=!0,t.s=n,Object(o.k)(r,n,t.v),t.__k=t.v.__k):t.p&&(t.v.parentNode&&t.s.removeChild(t.v),Object(o.c)(t.h)),t.h=r,t.componentWillUnmount=function(){t.v.parentNode&&t.s.removeChild(t.v),Object(o.c)(t.h)},null}var x=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;o.a.prototype.isReactComponent={};var k="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;var $=o.j.event;function O(e,t){e["UNSAFE_"+t]&&!e[t]&&Object.defineProperty(e,t,{configurable:!1,get:function(){return this["UNSAFE_"+t]},set:function(e){this["UNSAFE_"+t]=e}})}o.j.event=function(e){$&&(e=$(e)),e.persist=function(){};var t=!1,n=!1,r=e.stopPropagation;e.stopPropagation=function(){r.call(e),t=!0};var o=e.preventDefault;return e.preventDefault=function(){o.call(e),n=!0},e.isPropagationStopped=function(){return t},e.isDefaultPrevented=function(){return n},e.nativeEvent=e};var A={configurable:!0,get:function(){return this.class}},S=o.j.vnode;o.j.vnode=function(e){e.$$typeof=k;var t=e.type,n=e.props;if(t){if(n.class!=n.className&&(A.enumerable="className"in n,null!=n.className&&(n.class=n.className),Object.defineProperty(n,"className",A)),"function"!=typeof t){var r,i,a;for(a in n.defaultValue&&void 0!==n.value&&(n.value||0===n.value||(n.value=n.defaultValue),delete n.defaultValue),Array.isArray(n.value)&&n.multiple&&"select"===t&&(Object(o.l)(n.children).forEach((function(e){-1!=n.value.indexOf(e.props.value)&&(e.props.selected=!0)})),delete n.value),n)if(r=x.test(a))break;if(r)for(a in i=e.props={},n)i[x.test(a)?a.replace(/[A-Z0-9]/,"-$&").toLowerCase():a]=n[a]}!function(t){var n=e.type,r=e.props;if(r&&"string"==typeof n){var o={};for(var i in r)/^on(Ani|Tra|Tou)/.test(i)&&(r[i.toLowerCase()]=r[i],delete r[i]),o[i.toLowerCase()]=i;if(o.ondoubleclick&&(r.ondblclick=r[o.ondoubleclick],delete r[o.ondoubleclick]),o.onbeforeinput&&(r.onbeforeinput=r[o.onbeforeinput],delete r[o.onbeforeinput]),o.onchange&&("textarea"===n||"input"===n.toLowerCase()&&!/^fil|che|ra/i.test(r.type))){var a=o.oninput||"oninput";r[a]||(r[a]=r[o.onchange],delete r[o.onchange])}}}(),"function"==typeof t&&!t.m&&t.prototype&&(O(t.prototype,"componentWillMount"),O(t.prototype,"componentWillReceiveProps"),O(t.prototype,"componentWillUpdate"),t.m=!0)}S&&S(e)};function j(e){return!!e&&e.$$typeof===k}o.b;t.a={useState:r.j,useReducer:r.h,useEffect:r.d,useLayoutEffect:r.f,useRef:r.i,useImperativeHandle:r.e,useMemo:r.g,useCallback:r.a,useContext:r.b,useDebugValue:r.c,version:"16.8.0",Children:p,render:function(e,t,n){if(null==t.__k)for(;t.firstChild;)t.removeChild(t.firstChild);return Object(o.k)(e,t),"function"==typeof n&&n(),e?e.__c:null},hydrate:function(e,t,n){return Object(o.i)(e,t),"function"==typeof n&&n(),e?e.__c:null},unmountComponentAtNode:function(e){return!!e.__k&&(Object(o.k)(null,e),!0)},createPortal:function(e,t){return Object(o.f)(w,{vnode:e,container:t})},createElement:o.f,createContext:o.e,createFactory:function(e){return o.f.bind(null,e)},cloneElement:function(e){return j(e)?o.d.apply(null,arguments):e},createRef:o.g,Fragment:o.b,isValidElement:j,findDOMNode:function(e){return e&&(e.base||1===e.nodeType&&e)||null},Component:o.a,PureComponent:s,memo:u,forwardRef:d,unstable_batchedUpdates:function(e,t){return e(t)},StrictMode:o.b,Suspense:g,SuspenseList:b,lazy:function(e){var t,n,r;function i(i){if(t||(t=e()).then((function(e){n=e.default||e}),(function(e){r=e})),r)throw r;if(!n)throw t;return Object(o.f)(n,i)}return i.displayName="Lazy",i.t=!0,i}}},function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return _})),n.d(t,"b",(function(){return g}));var r=n(2),o=n(3);if(!o.e)throw new Error("mobx-react-lite requires React with Hooks support");if(!r.g)throw new Error("mobx-react-lite requires mobx at least version 4 to be available");var i=!1;function a(){return i}function s(){var e=Object(o.e)(0)[1];return Object(o.d)((function(){e((function(e){return e+1}))}),[])}function u(e){return Object(r.d)(e)}var c,l=1e4,d=new Set;function f(){void 0===c&&(c=setTimeout(p,1e4))}function p(){c=void 0;var e=Date.now();d.forEach((function(t){var n=t.current;n&&e>=n.cleanAt&&(n.reaction.dispose(),t.current=null,d.delete(t))})),d.size>0&&f()}var h={};function v(e){return"observer"+e}function g(e,t,n){if(void 0===t&&(t="observed"),void 0===n&&(n=h),a())return e();var i,c=(n.useForceUpdate||s)(),p=o.a.useRef(null);if(!p.current){var g=new r.a(v(t),(function(){y.mounted?c():(g.dispose(),p.current=null)})),y=function(e){return{cleanAt:Date.now()+l,reaction:e}}(g);p.current=y,i=p,d.add(i),f()}var b,m,_=p.current.reaction;if(o.a.useDebugValue(_,u),o.a.useEffect((function(){var e;return e=p,d.delete(e),p.current?p.current.mounted=!0:(p.current={reaction:new r.a(v(t),(function(){c()})),cleanAt:1/0},c()),function(){p.current.reaction.dispose(),p.current=null}}),[]),_.track((function(){try{b=e()}catch(e){m=e}})),m)throw m;return b}function y(e){var t=e.children,n=e.render,r=t||n;return"function"!=typeof r?null:g(r)}function b(e,t,n,r,o){var i="children"===t?"render":"children",a="function"==typeof e[t],s="function"==typeof e[i];return a&&s?new Error("MobX Observer: Do not use children and render in the same time in`"+n):a||s?null:new Error("Invalid prop `"+o+"` of type `"+typeof e[t]+"` supplied to `"+n+"`, expected `function`.")}function m(e,t){if(!t||void 0!==e){0;var n=o.a.useState((function(){return Object(r.e)(e,{},{deep:!1})}))[0];return Object(r.f)((function(){Object.assign(n,e)})),n}}function _(e,t){var n=m(t,!0);return o.a.useState((function(){var t=Object(r.e)(e(n));return function(e){if(!e||"object"!=typeof e)return!1;var t=Object.getPrototypeOf(e);return!t||t===Object.prototype}(t)&&Object(r.f)((function(){Object.keys(t).forEach((function(e){var n,o,i=t[e];"function"==typeof i&&(t[e]=(n=i,o=t,function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return Object(r.h)((function(){return n.apply(o,t)}))}))}))})),t}))[0]}y.propTypes={children:b,render:b},y.displayName="Observer"}).call(this,n(5))},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){var r,o,i,a=function(){var e=function(e,t){var n=e,r=u[t],o=null,i=0,a=null,s=[],c={},l=function(e,t){o=function(e){for(var t=new Array(e),n=0;n<e;n+=1){t[n]=new Array(e);for(var r=0;r<e;r+=1)t[n][r]=null}return t}(i=4*n+17),d(0,0),d(i-7,0),d(0,i-7),p(),f(),v(e,t),n>=7&&h(e),null==a&&(a=b(n,r,s)),g(a,t)},d=function(e,t){for(var n=-1;n<=7;n+=1)if(!(e+n<=-1||i<=e+n))for(var r=-1;r<=7;r+=1)t+r<=-1||i<=t+r||(o[e+n][t+r]=0<=n&&n<=6&&(0==r||6==r)||0<=r&&r<=6&&(0==n||6==n)||2<=n&&n<=4&&2<=r&&r<=4)},f=function(){for(var e=8;e<i-8;e+=1)null==o[e][6]&&(o[e][6]=e%2==0);for(var t=8;t<i-8;t+=1)null==o[6][t]&&(o[6][t]=t%2==0)},p=function(){for(var e=y.getPatternPosition(n),t=0;t<e.length;t+=1)for(var r=0;r<e.length;r+=1){var i=e[t],a=e[r];if(null==o[i][a])for(var s=-2;s<=2;s+=1)for(var u=-2;u<=2;u+=1)o[i+s][a+u]=-2==s||2==s||-2==u||2==u||0==s&&0==u}},h=function(e){for(var t=y.getBCHTypeNumber(n),r=0;r<18;r+=1){var a=!e&&1==(t>>r&1);o[Math.floor(r/3)][r%3+i-8-3]=a}for(r=0;r<18;r+=1){a=!e&&1==(t>>r&1);o[r%3+i-8-3][Math.floor(r/3)]=a}},v=function(e,t){for(var n=r<<3|t,a=y.getBCHTypeInfo(n),s=0;s<15;s+=1){var u=!e&&1==(a>>s&1);s<6?o[s][8]=u:s<8?o[s+1][8]=u:o[i-15+s][8]=u}for(s=0;s<15;s+=1){u=!e&&1==(a>>s&1);s<8?o[8][i-s-1]=u:s<9?o[8][15-s-1+1]=u:o[8][15-s-1]=u}o[i-8][8]=!e},g=function(e,t){for(var n=-1,r=i-1,a=7,s=0,u=y.getMaskFunction(t),c=i-1;c>0;c-=2)for(6==c&&(c-=1);;){for(var l=0;l<2;l+=1)if(null==o[r][c-l]){var d=!1;s<e.length&&(d=1==(e[s]>>>a&1)),u(r,c-l)&&(d=!d),o[r][c-l]=d,-1==(a-=1)&&(s+=1,a=7)}if((r+=n)<0||i<=r){r-=n,n=-n;break}}},b=function(e,t,n){for(var r=_.getRSBlocks(e,t),o=w(),i=0;i<n.length;i+=1){var a=n[i];o.put(a.getMode(),4),o.put(a.getLength(),y.getLengthInBits(a.getMode(),e)),a.write(o)}var s=0;for(i=0;i<r.length;i+=1)s+=r[i].dataCount;if(o.getLengthInBits()>8*s)throw"code length overflow. ("+o.getLengthInBits()+">"+8*s+")";for(o.getLengthInBits()+4<=8*s&&o.put(0,4);o.getLengthInBits()%8!=0;)o.putBit(!1);for(;!(o.getLengthInBits()>=8*s||(o.put(236,8),o.getLengthInBits()>=8*s));)o.put(17,8);return function(e,t){for(var n=0,r=0,o=0,i=new Array(t.length),a=new Array(t.length),s=0;s<t.length;s+=1){var u=t[s].dataCount,c=t[s].totalCount-u;r=Math.max(r,u),o=Math.max(o,c),i[s]=new Array(u);for(var l=0;l<i[s].length;l+=1)i[s][l]=255&e.getBuffer()[l+n];n+=u;var d=y.getErrorCorrectPolynomial(c),f=m(i[s],d.getLength()-1).mod(d);a[s]=new Array(d.getLength()-1);for(l=0;l<a[s].length;l+=1){var p=l+f.getLength()-a[s].length;a[s][l]=p>=0?f.getAt(p):0}}var h=0;for(l=0;l<t.length;l+=1)h+=t[l].totalCount;var v=new Array(h),g=0;for(l=0;l<r;l+=1)for(s=0;s<t.length;s+=1)l<i[s].length&&(v[g]=i[s][l],g+=1);for(l=0;l<o;l+=1)for(s=0;s<t.length;s+=1)l<a[s].length&&(v[g]=a[s][l],g+=1);return v}(o,r)};c.addData=function(e,t){var n=null;switch(t=t||"Byte"){case"Numeric":n=x(e);break;case"Alphanumeric":n=k(e);break;case"Byte":n=$(e);break;case"Kanji":n=O(e);break;default:throw"mode:"+t}s.push(n),a=null},c.isDark=function(e,t){if(e<0||i<=e||t<0||i<=t)throw e+","+t;return o[e][t]},c.getModuleCount=function(){return i},c.make=function(){if(n<1){for(var e=1;e<40;e++){for(var t=_.getRSBlocks(e,r),o=w(),i=0;i<s.length;i++){var a=s[i];o.put(a.getMode(),4),o.put(a.getLength(),y.getLengthInBits(a.getMode(),e)),a.write(o)}var u=0;for(i=0;i<t.length;i++)u+=t[i].dataCount;if(o.getLengthInBits()<=8*u)break}n=e}l(!1,function(){for(var e=0,t=0,n=0;n<8;n+=1){l(!0,n);var r=y.getLostPoint(c);(0==n||e>r)&&(e=r,t=n)}return t}())},c.createTableTag=function(e,t){e=e||2;var n="";n+='<table style="',n+=" border-width: 0px; border-style: none;",n+=" border-collapse: collapse;",n+=" padding: 0px; margin: "+(t=void 0===t?4*e:t)+"px;",n+='">',n+="<tbody>";for(var r=0;r<c.getModuleCount();r+=1){n+="<tr>";for(var o=0;o<c.getModuleCount();o+=1)n+='<td style="',n+=" border-width: 0px; border-style: none;",n+=" border-collapse: collapse;",n+=" padding: 0px; margin: 0px;",n+=" width: "+e+"px;",n+=" height: "+e+"px;",n+=" background-color: ",n+=c.isDark(r,o)?"#000000":"#ffffff",n+=";",n+='"/>';n+="</tr>"}return n+="</tbody>",n+="</table>"},c.createSvgTag=function(e,t,n,r){var o={};"object"==typeof arguments[0]&&(e=(o=arguments[0]).cellSize,t=o.margin,n=o.alt,r=o.title),e=e||2,t=void 0===t?4*e:t,(n="string"==typeof n?{text:n}:n||{}).text=n.text||null,n.id=n.text?n.id||"qrcode-description":null,(r="string"==typeof r?{text:r}:r||{}).text=r.text||null,r.id=r.text?r.id||"qrcode-title":null;var i,a,s,u,l=c.getModuleCount()*e+2*t,d="";for(u="l"+e+",0 0,"+e+" -"+e+",0 0,-"+e+"z ",d+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',d+=o.scalable?"":' width="'+l+'px" height="'+l+'px"',d+=' viewBox="0 0 '+l+" "+l+'" ',d+=' preserveAspectRatio="xMinYMin meet"',d+=r.text||n.text?' role="img" aria-labelledby="'+A([r.id,n.id].join(" ").trim())+'"':"",d+=">",d+=r.text?'<title id="'+A(r.id)+'">'+A(r.text)+"</title>":"",d+=n.text?'<description id="'+A(n.id)+'">'+A(n.text)+"</description>":"",d+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',d+='<path d="',a=0;a<c.getModuleCount();a+=1)for(s=a*e+t,i=0;i<c.getModuleCount();i+=1)c.isDark(a,i)&&(d+="M"+(i*e+t)+","+s+u);return d+='" stroke="transparent" fill="black"/>',d+="</svg>"},c.createDataURL=function(e,t){e=e||2,t=void 0===t?4*e:t;var n=c.getModuleCount()*e+2*t,r=t,o=n-t;return j(n,n,(function(t,n){if(r<=t&&t<o&&r<=n&&n<o){var i=Math.floor((t-r)/e),a=Math.floor((n-r)/e);return c.isDark(a,i)?0:1}return 1}))},c.createImgTag=function(e,t,n){e=e||2,t=void 0===t?4*e:t;var r=c.getModuleCount()*e+2*t,o="";return o+="<img",o+=' src="',o+=c.createDataURL(e,t),o+='"',o+=' width="',o+=r,o+='"',o+=' height="',o+=r,o+='"',n&&(o+=' alt="',o+=A(n),o+='"'),o+="/>"};var A=function(e){for(var t="",n=0;n<e.length;n+=1){var r=e.charAt(n);switch(r){case"<":t+="&lt;";break;case">":t+="&gt;";break;case"&":t+="&amp;";break;case'"':t+="&quot;";break;default:t+=r}}return t};return c.createASCII=function(e,t){if((e=e||1)<2)return function(e){e=void 0===e?2:e;var t,n,r,o,i,a=1*c.getModuleCount()+2*e,s=e,u=a-e,l={"██":"█","█ ":"▀"," █":"▄","  ":" "},d={"██":"▀","█ ":"▀"," █":" ","  ":" "},f="";for(t=0;t<a;t+=2){for(r=Math.floor((t-s)/1),o=Math.floor((t+1-s)/1),n=0;n<a;n+=1)i="█",s<=n&&n<u&&s<=t&&t<u&&c.isDark(r,Math.floor((n-s)/1))&&(i=" "),s<=n&&n<u&&s<=t+1&&t+1<u&&c.isDark(o,Math.floor((n-s)/1))?i+=" ":i+="█",f+=e<1&&t+1>=u?d[i]:l[i];f+="\n"}return a%2&&e>0?f.substring(0,f.length-a-1)+Array(a+1).join("▀"):f.substring(0,f.length-1)}(t);e-=1,t=void 0===t?2*e:t;var n,r,o,i,a=c.getModuleCount()*e+2*t,s=t,u=a-t,l=Array(e+1).join("██"),d=Array(e+1).join("  "),f="",p="";for(n=0;n<a;n+=1){for(o=Math.floor((n-s)/e),p="",r=0;r<a;r+=1)i=1,s<=r&&r<u&&s<=n&&n<u&&c.isDark(o,Math.floor((r-s)/e))&&(i=0),p+=i?l:d;for(o=0;o<e;o+=1)f+=p+"\n"}return f.substring(0,f.length-1)},c.renderTo2dContext=function(e,t){t=t||2;for(var n=c.getModuleCount(),r=0;r<n;r++)for(var o=0;o<n;o++)e.fillStyle=c.isDark(r,o)?"black":"white",e.fillRect(r*t,o*t,t,t)},c};e.stringToBytes=(e.stringToBytesFuncs={default:function(e){for(var t=[],n=0;n<e.length;n+=1){var r=e.charCodeAt(n);t.push(255&r)}return t}}).default,e.createStringToBytes=function(e,t){var n=function(){for(var n=S(e),r=function(){var e=n.read();if(-1==e)throw"eof";return e},o=0,i={};;){var a=n.read();if(-1==a)break;var s=r(),u=r()<<8|r();i[String.fromCharCode(a<<8|s)]=u,o+=1}if(o!=t)throw o+" != "+t;return i}(),r="?".charCodeAt(0);return function(e){for(var t=[],o=0;o<e.length;o+=1){var i=e.charCodeAt(o);if(i<128)t.push(i);else{var a=n[e.charAt(o)];"number"==typeof a?(255&a)==a?t.push(a):(t.push(a>>>8),t.push(255&a)):t.push(r)}}return t}};var t,n,r,o=1,i=2,a=4,s=8,u={L:1,M:0,Q:3,H:2},c=0,l=1,d=2,f=3,p=4,h=5,v=6,g=7,y=(t=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],r=function(e){for(var t=0;0!=e;)t+=1,e>>>=1;return t},(n={}).getBCHTypeInfo=function(e){for(var t=e<<10;r(t)-r(1335)>=0;)t^=1335<<r(t)-r(1335);return 21522^(e<<10|t)},n.getBCHTypeNumber=function(e){for(var t=e<<12;r(t)-r(7973)>=0;)t^=7973<<r(t)-r(7973);return e<<12|t},n.getPatternPosition=function(e){return t[e-1]},n.getMaskFunction=function(e){switch(e){case c:return function(e,t){return(e+t)%2==0};case l:return function(e,t){return e%2==0};case d:return function(e,t){return t%3==0};case f:return function(e,t){return(e+t)%3==0};case p:return function(e,t){return(Math.floor(e/2)+Math.floor(t/3))%2==0};case h:return function(e,t){return e*t%2+e*t%3==0};case v:return function(e,t){return(e*t%2+e*t%3)%2==0};case g:return function(e,t){return(e*t%3+(e+t)%2)%2==0};default:throw"bad maskPattern:"+e}},n.getErrorCorrectPolynomial=function(e){for(var t=m([1],0),n=0;n<e;n+=1)t=t.multiply(m([1,b.gexp(n)],0));return t},n.getLengthInBits=function(e,t){if(1<=t&&t<10)switch(e){case o:return 10;case i:return 9;case a:case s:return 8;default:throw"mode:"+e}else if(t<27)switch(e){case o:return 12;case i:return 11;case a:return 16;case s:return 10;default:throw"mode:"+e}else{if(!(t<41))throw"type:"+t;switch(e){case o:return 14;case i:return 13;case a:return 16;case s:return 12;default:throw"mode:"+e}}},n.getLostPoint=function(e){for(var t=e.getModuleCount(),n=0,r=0;r<t;r+=1)for(var o=0;o<t;o+=1){for(var i=0,a=e.isDark(r,o),s=-1;s<=1;s+=1)if(!(r+s<0||t<=r+s))for(var u=-1;u<=1;u+=1)o+u<0||t<=o+u||0==s&&0==u||a==e.isDark(r+s,o+u)&&(i+=1);i>5&&(n+=3+i-5)}for(r=0;r<t-1;r+=1)for(o=0;o<t-1;o+=1){var c=0;e.isDark(r,o)&&(c+=1),e.isDark(r+1,o)&&(c+=1),e.isDark(r,o+1)&&(c+=1),e.isDark(r+1,o+1)&&(c+=1),0!=c&&4!=c||(n+=3)}for(r=0;r<t;r+=1)for(o=0;o<t-6;o+=1)e.isDark(r,o)&&!e.isDark(r,o+1)&&e.isDark(r,o+2)&&e.isDark(r,o+3)&&e.isDark(r,o+4)&&!e.isDark(r,o+5)&&e.isDark(r,o+6)&&(n+=40);for(o=0;o<t;o+=1)for(r=0;r<t-6;r+=1)e.isDark(r,o)&&!e.isDark(r+1,o)&&e.isDark(r+2,o)&&e.isDark(r+3,o)&&e.isDark(r+4,o)&&!e.isDark(r+5,o)&&e.isDark(r+6,o)&&(n+=40);var l=0;for(o=0;o<t;o+=1)for(r=0;r<t;r+=1)e.isDark(r,o)&&(l+=1);return n+=Math.abs(100*l/t/t-50)/5*10},n),b=function(){for(var e=new Array(256),t=new Array(256),n=0;n<8;n+=1)e[n]=1<<n;for(n=8;n<256;n+=1)e[n]=e[n-4]^e[n-5]^e[n-6]^e[n-8];for(n=0;n<255;n+=1)t[e[n]]=n;var r={glog:function(e){if(e<1)throw"glog("+e+")";return t[e]},gexp:function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return e[t]}};return r}();function m(e,t){if(void 0===e.length)throw e.length+"/"+t;var n=function(){for(var n=0;n<e.length&&0==e[n];)n+=1;for(var r=new Array(e.length-n+t),o=0;o<e.length-n;o+=1)r[o]=e[o+n];return r}(),r={getAt:function(e){return n[e]},getLength:function(){return n.length},multiply:function(e){for(var t=new Array(r.getLength()+e.getLength()-1),n=0;n<r.getLength();n+=1)for(var o=0;o<e.getLength();o+=1)t[n+o]^=b.gexp(b.glog(r.getAt(n))+b.glog(e.getAt(o)));return m(t,0)},mod:function(e){if(r.getLength()-e.getLength()<0)return r;for(var t=b.glog(r.getAt(0))-b.glog(e.getAt(0)),n=new Array(r.getLength()),o=0;o<r.getLength();o+=1)n[o]=r.getAt(o);for(o=0;o<e.getLength();o+=1)n[o]^=b.gexp(b.glog(e.getAt(o))+t);return m(n,0).mod(e)}};return r}var _=function(){var e=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],t=function(e,t){var n={};return n.totalCount=e,n.dataCount=t,n},n={};return n.getRSBlocks=function(n,r){var o=function(t,n){switch(n){case u.L:return e[4*(t-1)+0];case u.M:return e[4*(t-1)+1];case u.Q:return e[4*(t-1)+2];case u.H:return e[4*(t-1)+3];default:return}}(n,r);if(void 0===o)throw"bad rs block @ typeNumber:"+n+"/errorCorrectionLevel:"+r;for(var i=o.length/3,a=[],s=0;s<i;s+=1)for(var c=o[3*s+0],l=o[3*s+1],d=o[3*s+2],f=0;f<c;f+=1)a.push(t(l,d));return a},n}(),w=function(){var e=[],t=0,n={getBuffer:function(){return e},getAt:function(t){var n=Math.floor(t/8);return 1==(e[n]>>>7-t%8&1)},put:function(e,t){for(var r=0;r<t;r+=1)n.putBit(1==(e>>>t-r-1&1))},getLengthInBits:function(){return t},putBit:function(n){var r=Math.floor(t/8);e.length<=r&&e.push(0),n&&(e[r]|=128>>>t%8),t+=1}};return n},x=function(e){var t=o,n=e,r={getMode:function(){return t},getLength:function(e){return n.length},write:function(e){for(var t=n,r=0;r+2<t.length;)e.put(i(t.substring(r,r+3)),10),r+=3;r<t.length&&(t.length-r==1?e.put(i(t.substring(r,r+1)),4):t.length-r==2&&e.put(i(t.substring(r,r+2)),7))}},i=function(e){for(var t=0,n=0;n<e.length;n+=1)t=10*t+a(e.charAt(n));return t},a=function(e){if("0"<=e&&e<="9")return e.charCodeAt(0)-"0".charCodeAt(0);throw"illegal char :"+e};return r},k=function(e){var t=i,n=e,r={getMode:function(){return t},getLength:function(e){return n.length},write:function(e){for(var t=n,r=0;r+1<t.length;)e.put(45*o(t.charAt(r))+o(t.charAt(r+1)),11),r+=2;r<t.length&&e.put(o(t.charAt(r)),6)}},o=function(e){if("0"<=e&&e<="9")return e.charCodeAt(0)-"0".charCodeAt(0);if("A"<=e&&e<="Z")return e.charCodeAt(0)-"A".charCodeAt(0)+10;switch(e){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+e}};return r},$=function(t){var n=a,r=e.stringToBytes(t),o={getMode:function(){return n},getLength:function(e){return r.length},write:function(e){for(var t=0;t<r.length;t+=1)e.put(r[t],8)}};return o},O=function(t){var n=s,r=e.stringToBytesFuncs.SJIS;if(!r)throw"sjis not supported.";!function(e,t){var n=r("友");if(2!=n.length||38726!=(n[0]<<8|n[1]))throw"sjis not supported."}();var o=r(t),i={getMode:function(){return n},getLength:function(e){return~~(o.length/2)},write:function(e){for(var t=o,n=0;n+1<t.length;){var r=(255&t[n])<<8|255&t[n+1];if(33088<=r&&r<=40956)r-=33088;else{if(!(57408<=r&&r<=60351))throw"illegal char at "+(n+1)+"/"+r;r-=49472}r=192*(r>>>8&255)+(255&r),e.put(r,13),n+=2}if(n<t.length)throw"illegal char at "+(n+1)}};return i},A=function(){var e=[],t={writeByte:function(t){e.push(255&t)},writeShort:function(e){t.writeByte(e),t.writeByte(e>>>8)},writeBytes:function(e,n,r){n=n||0,r=r||e.length;for(var o=0;o<r;o+=1)t.writeByte(e[o+n])},writeString:function(e){for(var n=0;n<e.length;n+=1)t.writeByte(e.charCodeAt(n))},toByteArray:function(){return e},toString:function(){var t="";t+="[";for(var n=0;n<e.length;n+=1)n>0&&(t+=","),t+=e[n];return t+="]"}};return t},S=function(e){var t=e,n=0,r=0,o=0,i={read:function(){for(;o<8;){if(n>=t.length){if(0==o)return-1;throw"unexpected end of file./"+o}var e=t.charAt(n);if(n+=1,"="==e)return o=0,-1;e.match(/^\s$/)||(r=r<<6|a(e.charCodeAt(0)),o+=6)}var i=r>>>o-8&255;return o-=8,i}},a=function(e){if(65<=e&&e<=90)return e-65;if(97<=e&&e<=122)return e-97+26;if(48<=e&&e<=57)return e-48+52;if(43==e)return 62;if(47==e)return 63;throw"c:"+e};return i},j=function(e,t,n){for(var r=function(e,t){var n=e,r=t,o=new Array(e*t),i={setPixel:function(e,t,r){o[t*n+e]=r},write:function(e){e.writeString("GIF87a"),e.writeShort(n),e.writeShort(r),e.writeByte(128),e.writeByte(0),e.writeByte(0),e.writeByte(0),e.writeByte(0),e.writeByte(0),e.writeByte(255),e.writeByte(255),e.writeByte(255),e.writeString(","),e.writeShort(0),e.writeShort(0),e.writeShort(n),e.writeShort(r),e.writeByte(0);var t=a(2);e.writeByte(2);for(var o=0;t.length-o>255;)e.writeByte(255),e.writeBytes(t,o,255),o+=255;e.writeByte(t.length-o),e.writeBytes(t,o,t.length-o),e.writeByte(0),e.writeString(";")}},a=function(e){for(var t=1<<e,n=1+(1<<e),r=e+1,i=s(),a=0;a<t;a+=1)i.add(String.fromCharCode(a));i.add(String.fromCharCode(t)),i.add(String.fromCharCode(n));var u=A(),c=function(e){var t=e,n=0,r=0,o={write:function(e,o){if(e>>>o!=0)throw"length over";for(;n+o>=8;)t.writeByte(255&(e<<n|r)),o-=8-n,e>>>=8-n,r=0,n=0;r|=e<<n,n+=o},flush:function(){n>0&&t.writeByte(r)}};return o}(u);c.write(t,r);var l=0,d=String.fromCharCode(o[l]);for(l+=1;l<o.length;){var f=String.fromCharCode(o[l]);l+=1,i.contains(d+f)?d+=f:(c.write(i.indexOf(d),r),i.size()<4095&&(i.size()==1<<r&&(r+=1),i.add(d+f)),d=f)}return c.write(i.indexOf(d),r),c.write(n,r),c.flush(),u.toByteArray()},s=function(){var e={},t=0,n={add:function(r){if(n.contains(r))throw"dup key:"+r;e[r]=t,t+=1},size:function(){return t},indexOf:function(t){return e[t]},contains:function(t){return void 0!==e[t]}};return n};return i}(e,t),o=0;o<t;o+=1)for(var i=0;i<e;i+=1)r.setPixel(i,o,n(i,o));var a=A();r.write(a);for(var s=function(){var e=0,t=0,n=0,r="",o={},i=function(e){r+=String.fromCharCode(a(63&e))},a=function(e){if(e<0);else{if(e<26)return 65+e;if(e<52)return e-26+97;if(e<62)return e-52+48;if(62==e)return 43;if(63==e)return 47}throw"n:"+e};return o.writeByte=function(r){for(e=e<<8|255&r,t+=8,n+=1;t>=6;)i(e>>>t-6),t-=6},o.flush=function(){if(t>0&&(i(e<<6-t),e=0,t=0),n%3!=0)for(var o=3-n%3,a=0;a<o;a+=1)r+="="},o.toString=function(){return r},o}(),u=a.toByteArray(),c=0;c<u.length;c+=1)s.writeByte(u[c]);return s.flush(),"data:image/gif;base64,"+s};return e}();a.stringToBytesFuncs["UTF-8"]=function(e){return function(e){for(var t=[],n=0;n<e.length;n++){var r=e.charCodeAt(n);r<128?t.push(r):r<2048?t.push(192|r>>6,128|63&r):r<55296||r>=57344?t.push(224|r>>12,128|r>>6&63,128|63&r):(n++,r=65536+((1023&r)<<10|1023&e.charCodeAt(n)),t.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|63&r))}return t}(e)},o=[],void 0===(i="function"==typeof(r=function(){return a})?r.apply(t,o):r)||(e.exports=i)},function(e,t){var n,r,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function s(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{r="function"==typeof clearTimeout?clearTimeout:a}catch(e){r=a}}();var u,c=[],l=!1,d=-1;function f(){l&&u&&(l=!1,u.length?c=u.concat(c):d=-1,c.length&&p())}function p(){if(!l){var e=s(f);l=!0;for(var t=c.length;t;){for(u=c,c=[];++d<t;)u&&u[d].run();d=-1,t=c.length}u=null,l=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===a||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function v(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];c.push(new h(e,t)),1!==c.length||l||s(p)},h.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=v,o.addListener=v,o.once=v,o.off=v,o.removeListener=v,o.removeAllListeners=v,o.emit=v,o.prependListener=v,o.prependOnceListener=v,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t,n){},function(e,t,n){"use strict";n.r(t),n.d(t,"StoreContext",(function(){return De}));var r=n(1),o=function(e,t,n,r){var i;t[0]=0;for(var a=1;a<t.length;a++){var s=t[a++],u=t[a]?(t[0]|=s?1:2,n[t[a++]]):t[++a];3===s?r[0]=u:4===s?r[1]=Object.assign(r[1]||{},u):5===s?(r[1]=r[1]||{})[t[++a]]=u:6===s?r[1][t[++a]]+=u+"":s?(i=e.apply(u,o(e,u,n,["",null])),r.push(i),u[0]?t[0]|=2:(t[a-2]=0,t[a]=i)):r.push(u)}return r},i=new Map,a=function(e){var t=i.get(this);return t||(t=new Map,i.set(this,t)),(t=o(this,t.get(e)||(t.set(e,t=function(e){for(var t,n,r=1,o="",i="",a=[0],s=function(e){1===r&&(e||(o=o.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?a.push(0,e,o):3===r&&(e||o)?(a.push(3,e,o),r=2):2===r&&"..."===o&&e?a.push(4,e,0):2===r&&o&&!e?a.push(5,0,!0,o):r>=5&&((o||!e&&5===r)&&(a.push(r,0,o,n),r=6),e&&(a.push(r,e,0,n),r=6)),o=""},u=0;u<e.length;u++){u&&(1===r&&s(),s(u));for(var c=0;c<e[u].length;c++)t=e[u][c],1===r?"<"===t?(s(),a=[a],r=3):o+=t:4===r?"--"===o&&">"===t?(r=1,o=""):o=t+o[0]:i?t===i?i="":o+=t:'"'===t||"'"===t?i=t:">"===t?(s(),r=1):r&&("="===t?(r=5,n=o,o=""):"/"===t&&(r<5||">"===e[u][c+1])?(s(),3===r&&(a=a[0]),r=a,(a=a[0]).push(2,0,r),r=0):" "===t||"\t"===t||"\n"===t||"\r"===t?(s(),r=2):o+=t),3===r&&"!--"===o&&(r=4,a=a[0])}return s(),a}(e)),t),arguments,[])).length>1?t:t[0]}.bind(r.h),s=n(0),u=n(2),c=n(4),l={};function d(e,t){for(var n in t)e[n]=t[n];return e}function f(e,t,n){var r,o=/(?:\?([^#]*))?(#.*)?$/,i=e.match(o),a={};if(i&&i[1])for(var s=i[1].split("&"),u=0;u<s.length;u++){var c=s[u].split("=");a[decodeURIComponent(c[0])]=decodeURIComponent(c.slice(1).join("="))}e=v(e.replace(o,"")),t=v(t||"");for(var d=Math.max(e.length,t.length),f=0;f<d;f++)if(t[f]&&":"===t[f].charAt(0)){var p=t[f].replace(/(^:|[+*?]+$)/g,""),h=(t[f].match(/[+*?]+$/)||l)[0]||"",g=~h.indexOf("+"),y=~h.indexOf("*"),b=e[f]||"";if(!b&&!y&&(h.indexOf("?")<0||g)){r=!1;break}if(a[p]=decodeURIComponent(b),g||y){a[p]=e.slice(f).map(decodeURIComponent).join("/");break}}else if(t[f]!==e[f]){r=!1;break}return(!0===n.default||!1!==r)&&a}function p(e,t){return e.rank<t.rank?1:e.rank>t.rank?-1:e.index-t.index}function h(e,t){return e.index=t,e.rank=function(e){return e.props.default?0:(t=e.props.path,v(t).map(g).join(""));var t}(e),e.props}function v(e){return e.replace(/(^\/+|\/+$)/g,"").split("/")}function g(e){return":"==e.charAt(0)?1+"*+?".indexOf(e.charAt(e.length-1))||4:5}var y=null,b=[],m=[],_={};function w(){var e;return""+((e=y&&y.location?y.location:y&&y.getCurrentLocation?y.getCurrentLocation():"undefined"!=typeof location?location:_).pathname||"")+(e.search||"")}function x(e,t){return void 0===t&&(t=!1),"string"!=typeof e&&e.url&&(t=e.replace,e=e.url),function(e){for(var t=b.length;t--;)if(b[t].canRoute(e))return!0;return!1}(e)&&function(e,t){void 0===t&&(t="push"),y&&y[t]?y[t](e):"undefined"!=typeof history&&history[t+"State"]&&history[t+"State"](null,null,e)}(e,t?"replace":"push"),k(e)}function k(e){for(var t=!1,n=0;n<b.length;n++)!0===b[n].routeTo(e)&&(t=!0);for(var r=m.length;r--;)m[r](e);return t}function $(e){if(e&&e.getAttribute){var t=e.getAttribute("href"),n=e.getAttribute("target");if(t&&t.match(/^\//g)&&(!n||n.match(/^_?self$/i)))return x(t)}}function O(e){if(!(e.ctrlKey||e.metaKey||e.altKey||e.shiftKey||0!==e.button))return $(e.currentTarget||e.target||this),A(e)}function A(e){return e&&(e.stopImmediatePropagation&&e.stopImmediatePropagation(),e.stopPropagation&&e.stopPropagation(),e.preventDefault()),!1}function S(e){if(!(e.ctrlKey||e.metaKey||e.altKey||e.shiftKey||0!==e.button)){var t=e.target;do{if("A"===String(t.nodeName).toUpperCase()&&t.getAttribute("href")){if(t.hasAttribute("native"))return;if($(t))return A(e)}}while(t=t.parentNode)}}var j=!1;var C=function(e){function t(t){e.call(this,t),t.history&&(y=t.history),this.state={url:t.url||w()},j||("function"==typeof addEventListener&&(y||addEventListener("popstate",(function(){k(w())})),addEventListener("click",S)),j=!0)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.shouldComponentUpdate=function(e){return!0!==e.static||(e.url!==this.props.url||e.onChange!==this.props.onChange)},t.prototype.canRoute=function(e){var t=Object(r.l)(this.props.children);return this.getMatchingChildren(t,e,!1).length>0},t.prototype.routeTo=function(e){this.setState({url:e});var t=this.canRoute(e);return this.updating||this.forceUpdate(),t},t.prototype.componentWillMount=function(){b.push(this),this.updating=!0},t.prototype.componentDidMount=function(){var e=this;y&&(this.unlisten=y.listen((function(t){e.routeTo(""+(t.pathname||"")+(t.search||""))}))),this.updating=!1},t.prototype.componentWillUnmount=function(){"function"==typeof this.unlisten&&this.unlisten(),b.splice(b.indexOf(this),1)},t.prototype.componentWillUpdate=function(){this.updating=!0},t.prototype.componentDidUpdate=function(){this.updating=!1},t.prototype.getMatchingChildren=function(e,t,n){return e.filter(h).sort(p).map((function(e){var o=f(t,e.props.path,e.props);if(o){if(!1!==n){var i={url:t,matches:o};return d(i,o),delete i.ref,delete i.key,Object(r.d)(e,i)}return e}})).filter(Boolean)},t.prototype.render=function(e,t){var n=e.children,o=e.onChange,i=t.url,a=this.getMatchingChildren(Object(r.l)(n),i,!0),s=a[0]||null,u=this.previousUrl;return i!==u&&(this.previousUrl=i,"function"==typeof o&&o({router:this,url:i,previous:u,active:a,current:s})),s},t}(r.a),E=function(e){return Object(r.f)("a",d({onClick:O},e))},T=function(e){return Object(r.f)(e.component,e)};C.subscribers=m,C.getCurrentUrl=w,C.route=x,C.Router=C,C.Route=T,C.Link=E,C.exec=f;function D(){return(D=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var P,L=P||(P={});L.Pop="POP",L.Push="PUSH",L.Replace="REPLACE";var B=function(e){return e};function M(e){e.preventDefault(),e.returnValue=""}function N(){var e=[];return{get length(){return e.length},push:function(t){return e.push(t),function(){e=e.filter((function(e){return e!==t}))}},call:function(t){e.forEach((function(e){return e&&e(t)}))}}}function R(){return Math.random().toString(36).substr(2,8)}function I(e){var t=e.pathname,n=e.search;return(void 0===t?"/":t)+(void 0===n?"":n)+(void 0===(e=e.hash)?"":e)}function U(e){var t={};if(e){var n=e.indexOf("#");0<=n&&(t.hash=e.substr(n),e=e.substr(0,n)),0<=(n=e.indexOf("?"))&&(t.search=e.substr(n),e=e.substr(0,n)),e&&(t.pathname=e)}return t}var V,z,F;function G(e,t,n){chrome.runtime.sendMessage({source:"ui",body:{jsonrpc:"2.0",method:e,params:t,id:(+new Date).toString(16)}},n)}!function(e){e.Heartbeat="heartbeat",e.Authorization="authorization",e.AuthorizationAllow="authorization-allow",e.AuthorizationDeny="authorization-deny",e.SignTransaction="sign-transaction",e.Algod="algod",e.Indexer="indexer",e.CreateWallet="create-wallet",e.CreateAccount="create-account",e.SaveAccount="save-account",e.ImportAccount="import-account",e.DeleteAccount="delete-account",e.GetSession="get-session",e.Login="login",e.AccountDetails="account-details",e.Transactions="transactions",e.AssetDetails="asset-details",e.SignSendTransaction="sign-send-transaction"}(V||(V={})),function(e){e.Status="status"}(z||(z={})),function(e){e.Extension="extension",e.DApp="dapp",e.Router="router",e.UI="ui"}(F||(F={}));var H=e=>{const t=Object(s.b)(De),[n,r]=Object(s.j)(!1);let o="dropdown is-right";n&&(o+=" is-active");const i=()=>{r(!n)},u=e=>{t.setLedger(e),i(),x("/wallet")};return Object(c.b)(()=>a`
    <div class=${o}>
      <div class="dropdown-trigger">
        <button
          id="selectLedger"
          class="button"
          onClick=${i}
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          style="border: none;">
          <span>${t.ledger}</span>
          <span class="icon is-small">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <a id="selectTestNet"
            onClick=${()=>u("TestNet")}
            class="dropdown-item">
            TestNet
          </a>
          <a id="selectMainNet"
            onClick=${()=>u("MainNet")}
            class="dropdown-item">
            MainNet
          </a>
        </div>
      </div>
    </div>
  `)},W=n.p+"assets/863bb6204174547af0f6809b1b39145d.png";var K=()=>a`
    <div class="px-4" style="flex: 0; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #EFF4F7">
      <img src=${W} width="130" />
      <div>
        <${H} />
      </div>
    </div>
  `;var q=()=>a`
    <div style="flex: 0; padding: 0 0.5em; border-top: 1px solid #EFF4F7;">
      <span class="is-size-7">
        ${"©"} 2020 PureStake
      </span>
    </div>
  `;var J=e=>a`
      <div class="main-view" style="flex-direction: column; justify-content: space-between;">
        <div style="flex: 1">
          <section class="hero">
            <div class="hero-body">
              <h1 class="title">
                dApp requested access to your wallet!
              </h1>
            </div>
          </section>

          <section class="section pt-4">
            <h3>
              This will grant the following priviliges
            </h3>
            <p>
              Algosign is your new way sign and create transactions on the Algorand network.
            </p>
            <p class="mt-4">
              AlgoSign is also a hot wallet for Algorand currency, and can manage assets on the network.
            </p>
          </section>
        </div>

        <div class="mx-5 mb-3" style="display: flex;">
          <button class="button is-link is-outlined px-6"
            onClick=${()=>{chrome.runtime.sendMessage({source:"extension",body:{jsonrpc:"2.0",method:"authorization-deny",params:[],id:(+new Date).toString(16)}})}}>
            Reject
          </button>
          <button class="button is-primary ml-3"
            style="flex: 1;"
            onClick=${()=>{chrome.runtime.sendMessage({source:"extension",body:{jsonrpc:"2.0",method:"authorization-allow",params:[],id:(+new Date).toString(16)}})}}>
            Grant access
          </button>
        </div>
      </div>
    `,X=n.p+"assets/b64680facf325e989a4525bf64ccf716.png",Y=n.p+"assets/d84de4dc26c628edb153250567542fca.svg",Z=n.p+"assets/e4444266d7616b4ff0069df1bc26d98c.svg";var Q=e=>a`
    <div class="main-view has-text-white"
      style="flex-direction: column; justify-content: space-between; background:url(${X}); background-size: cover;">
      <div style="flex: 1">

        <section class="section pt-4 has-text-centered">
          <img src=${Y} class="py-6" width="100" />

          <h1 class="title is-6 mb-0 has-text-white">
            Welcome to
          </h1>
          <img src=${Z} width="340" />
        </section>

        <section class="section pt-4">
          <p>
            AlgoSigner is your new way sign and create transactions on the Algorand network.
          </p>
          <p class="mt-4">
            It is also a hot wallet for Algorand currency, and can manage assets on the network.
          </p>
        </section>
      </div>

      <div class="mx-5 mb-3">
        <${E} id="setPassword" class="button is-link is-fullwidth" href="/set-password">
          Get started
        <//>
      </div>
    </div>
  `,ee=n.p+"assets/9cca34eeae82663678e260ab94a4ab06.png";var te=e=>{const[t,n]=Object(s.j)(""),[r,o]=Object(s.j)(""),[i,u]=Object(s.j)(""),c=Object(s.b)(De);return a`
      <div class="main-view" style="flex-direction: column; justify-content: space-between;">
        <div style="flex: 1">
          <section class="has-text-centered py-3"
            style="background:url(${X}); background-size: cover;">
            <img src=${ee} width="200" />
          </section>

          <section class="section pt-4 pb-0">
            <p>
              You don’t need a username, this wallet is tied to this browser. If you forget your password, your wallet will be lost. Make your password strong (at least 8 characters) and easy to remember.
            </p>
            <p class="mt-2">
              We recommend using a sentence that is meaningful, for "example". “my_1st_game_was_GALAGA!”
            </p>
            <input
              class="input mt-4"
              placeholder="Password"
              id="setPassword"
              type="password"
              value=${t}
              onInput=${e=>n(e.target.value)}/>
            <input
              class="input mt-4"
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value=${r}
              onInput=${e=>o(e.target.value)}/>

            ${i.length>0&&a`
              <p class="mt-4 has-text-danger has-text-centered">
                ${i}
              </p>
            `}
          </section>
        </div>

        <div class="mx-5 mb-3">
          <button
            id="createWallet"
            class="button is-link is-fullwidth"
            disabled=${0===t.length||0===r.length}
            onClick=${()=>{if(t!==r)return u("Confirmation doesn't match!"),!1;if(t.length<8)return u("Password needs at least 8 characters!"),!1;const e={passphrase:t};G(V.CreateWallet,e,(function(e){"error"in e?u(e.error):(c.updateWallet(e),x("/wallet"))}))}}>
            Create wallet
          </button>
        </div>
      </div>
    `};var ne=e=>{const[t,n]=Object(s.j)(""),[r,o]=Object(s.j)(!1),[i,u]=Object(s.j)(""),c=Object(s.b)(De),l=0===t.length||r,d=()=>{o(!0),u("");const e={passphrase:t};G(V.Login,e,(function(e){"error"in e?(o(!1),u("Wrong password!")):(c.updateWallet(e),x("/wallet"))}))};return a`
    <div class="main-view"
      style="flex-direction: column; justify-content: space-between; background:url(${X}); background-size: cover; color: white;">
      <div style="flex: 1">
        <section class="hero has-text-centered mb-6">
          <div class="hero-body">
            <img src=${Y} width="120" class="mb-3" />
          </div>
        </section>

        <section class="section pt-4">
          <input
            id="enterPassword"
            class="input"
            type="password"
            placeholder="Password"
            value=${t}
            onKeyDown=${e=>{13!==e.keyCode||l||d()}}
            onInput=${e=>n(e.target.value)}/>

          <p class="mt-5 has-text-centered is-size-7">
            AlgoSigner does not store your password. If you’ve forgotten your password, you’ll need to create a new wallet and re-link your accounts.
          </p>
          ${i.length>0&&a`
            <p class="mt-4 has-text-danger has-text-centered">
              ${i}
            </p>
          `}
        </section>
      </div>

      <div class="mx-5 mb-3">
        <button id="login"
          class="button is-link is-fullwidth ${r?"is-loading":""}"
          disabled=${l}
          onClick=${d}>
          Login
        </button>
      </div>
    </div>
  `};var re=e=>{const{title:t,action:n}=e;return a`
    <div class="px-4 py-3 has-text-weight-bold is-size-5">
      <p style="overflow: hidden; text-overflow: ellipsis;">
        <a class="icon mr-2" onClick=${n}>${"<"}</a>
        ${t}
      </p>
    </div>
  `};var oe=e=>{const{name:t,setName:n,ledger:r,account:o,nextStep:i}=e;return a`
    <div class="main-view" style="flex-direction: column; justify-content: space-between;">
      <${re} action="${()=>x("/wallet")}"
        title="Create ${r} Account" />
      <div class="px-3" style="flex: 1;">
        <input
          id="setAccountName"
          class="input mb-4"
          placeholder="Account name"
          value=${t}
          onInput=${e=>n(e.target.value)}/>
        <p class="mb-4">After making this screen, you will be provided with the public key and mnemonic for your new account.</p>
        <p class="mb-4">It will only be shown once.</p>
        <p class="mb-4">Make sure you have a secure location to store these keys. They are the only way to access your account in the future.</p>
        <b>If your mnemonic is lost, you will be locked out of your account <span class="has-text-link">FOREVER</span>.</b>
      </div>
      <div style="padding: 1em;">
        <button class="button is-primary is-fullwidth"
          id="nextStep"
          disabled=${0===t.length}
          onClick=${i}>
          Continue
        </button>
      </div>
    </div>
  `};var ie=e=>{let t=e.class||"";return a`
    <a onClick=${()=>{var t=document.createElement("textarea");t.innerText=e.data,document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}
      class=${t}>
      copy
    </a>
  `};var ae=e=>{const{account:t,nextStep:n,prevStep:r}=e;let o=[[],[],[],[],[]];const i=t.mnemonic.split(" ").map((e,t)=>a`
    <div class="mb-2" style="position: relative;" id="div_${t+1}">
      <div class="has-text-link"
        style="position: absolute; text-align: right; left: -1.2em; top: -0.2em; width: 1em; font-size: 0.6em;">
      </div>
      ${e}
    </div>
  `);for(var s=0;s<i.length;s++)o[s%5].push(i[s]);return a`
    <div class="main-view" style="flex-direction: column; justify-content: space-between;">
      <${re} action=${r} title="Save your keys!" />
      <div class="px-3" style="flex: 1;">
        <div class="mb-4" style="background: #EFF4F7; padding: 1em">
          <div>
            <b>Account address</b>
            <${ie} class="is-pulled-right" data=${t.address} />
          </div>
          <p style="word-break: break-all;" id="accountAddress">${t.address}</p>
          <div style="display: flow-root;">
            <b>Mnemonic </b>
            <${ie} class="is-pulled-right" data=${t.mnemonic} />
          </div>
          <div class="columns is-mobile">
            ${o.map(e=>a`
              <div class="column is-one-fifth">${e}</div>
            `)}
          </div>
        </div>
        <p class="mb-4">Make sure you have the entire 25-word mnemonic, or you will lose access to this account forever.</p>
        <p>You will <b>not</b> be able to recover it.</p>
      </div>
      <div style="padding: 1em;">
        <button class="button is-primary is-fullwidth" id="nextStep"
            onClick=${n}>
          Continue
        </button>
      </div>
    </div>
  `};var se=e=>{const{account:t,nextStep:n,prevStep:r}=e,[o,i]=Object(s.j)(""),[u,c]=Object(s.j)([]);Object(s.d)(()=>{c(t.mnemonic.split(" "))},[]);const l=e=>{0===o.length?i(e.target.name):i(o+" "+e.target.name)};let d=[],f=u.map(e=>a`
    <button class="button is-small is-fullwidth mt-3"
      name="${e}" id="${e}"
      disabled=${o.includes(e)}
      onClick=${l}>
      ${e}
    </button>
  `);for(;f.length;)d.push(f.splice(0,5));const p=o!=t.mnemonic;return a`
    <div class="main-view" style="flex-direction: column; justify-content: space-between;">
      <${re} action=${r}
        title="Confirm your mnemonic" />
      <div class="px-3" style="flex: 1;">
        <p class="mb-4">Use the buttons below to confirm the mnemonic</p>
        <textarea id="enterMnemonic" placeholder="Use the buttons below the enter the 25 word mnemonic to add this account to your wallet" class="textarea" value=${o} readonly></textarea>
        <div class="columns is-mobile">
          ${d.map(e=>a`<div class="column is-one-fifth">${e}</div>`)}
        </div>
      </div>
      <div style="padding: 1em;">
        <button class="button is-primary is-fullwidth"
          id="nextStep"
          disabled=${p}
          onClick=${n}>
          Continue
        </button>
      </div>
    </div>
  `};var ue=e=>{const{nextStep:t,error:n,loading:r}=e,[o,i]=Object(s.j)(""),u=0===o.length;return a`
    <div class="section has-text-white has-text-centered py-0">
      <img src=${Y} width="120" class="mb-6" />

      <p>
        AlgoSigner needs your password to continue
      </p>
      <input
        class="input my-5"
        id="enterPassword"
        type="password"
        placeholder="Password"
        value=${o}
        onKeyDown=${e=>{13!==e.keyCode||u||t(o)}}
        onInput=${e=>i(e.target.value)}/>

      <p class="mb-3 has-text-danger has-text-centered" style="height: 1.5em;">
        ${n&&n.length>0&&n}
      </p>

      <button class="button is-link is-fullwidth mb-6 ${r?"is-loading":""}"
        id="authButton"
        disabled=${u}
        onClick=${()=>t(o)} >
        Continue
      </button>
    </div>
  `};var ce=e=>{const{url:t,ledger:n}=e,[r,o]=Object(s.j)(""),[i,u]=Object(s.j)({address:"",mnemonic:"",name:""}),[c,l]=Object(s.j)(0),[d,f]=Object(s.j)(!1),[p,h]=Object(s.j)(!1),[v,g]=Object(s.j)(""),y=Object(s.b)(De);Object(s.d)(()=>{G(V.CreateAccount,{},(function(e){u({mnemonic:e[0],address:e[1],name:""})}))},[]);const b=()=>{l(c+1)},m=()=>{l(c-1)};return a`
    ${0===c&&a`
      <${oe}
        name=${r}
        setName=${o}
        ledger=${n}
        nextStep=${()=>{let e=Object.assign({},i);e.name=r,u(e),b()}} />
    `}
    ${1===c&&a`
      <${ae}
        account=${i}
        prevStep=${m}
        nextStep=${b} />
    `}
    ${2===c&&a`
      <${se}
        account=${i}
        prevStep=${m}
        nextStep=${()=>{f(!0)}} />

    `}
    ${d&&a`
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content" style="padding: 0 15px;">
          <${ue}
            error=${v}
            loading=${p}
            nextStep=${e=>{const t={ledger:n,address:i.address||"",mnemonic:i.mnemonic||"",name:i.name||"",passphrase:e};h(!0),g(""),G(V.SaveAccount,t,(function(e){if("error"in e)switch(h(!1),e.error){case"Login Failed":g("Wrong passphrase");break;default:f(!1),alert("There was an unkown error: "+e.error)}else y.updateWallet(e),x("/wallet")}))}} />
        </div>
        <button class="modal-close is-large" aria-label="close" onClick=${()=>f(!1)} />
      </div>
    `}
  `};var le=e=>{const t=Object(s.b)(De),{ledger:n}=e,[r,o]=Object(s.j)(""),[i,u]=Object(s.j)(""),[c,l]=Object(s.j)(!1),[d,f]=Object(s.j)(!1),[p,h]=Object(s.j)(""),[v,g]=Object(s.j)("");return a`
    <div class="main-view" style="flex-direction: column; justify-content: space-between;">
      <${re} action="${()=>x("/wallet")}"
        title="Import ${n} account" />
      <div class="px-3" style="flex: 1;">
        <input
          id="accountName"
          class="input"
          placeholder="Account name"
          value=${i}
          onInput=${e=>u(e.target.value)}/>

        <p class="my-3">
          Insert the 25 word mnemonic of the acccount you want to import
        </p>

        <textarea
          id="enterMnemonic"
          class="textarea"
          placeholder="apples butter king monkey nuts ..."
          rows="5"
          onInput=${e=>{o(e.target.value)}}
          value=${r}/>

        <p class="mt-3 has-text-danger" style="height: 1.5em;">
          ${void 0!==v&&v.length>0&&v}
        </p>
      </div>
      <div style="padding: 1em;">
        <button class="button is-primary is-fullwidth"
          id="nextStep"
          disabled=${!1}
          onClick=${()=>{l(!0)}}>
          Continue
        </button>
      </div>
    </div>

    ${c&&a`
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content" style="padding: 0 15px;">
          <${ue}
            error=${p}
            loading=${d}
            nextStep=${e=>{const o={passphrase:e,mnemonic:r,name:i,ledger:n};f(!0),h(""),g(""),G(V.ImportAccount,o,(function(e){if("error"in e)switch(f(!1),e.error){case"Login Failed":h("Wrong passphrase");break;default:g(e.error),l(!1)}else t.updateWallet(e),x("/wallet")}))}} />
        </div>
        <button class="modal-close is-large" aria-label="close" onClick=${()=>l(!1)} />
      </div>
    `}
  `},de=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function s(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}u((r=r.apply(e,t||[])).next())}))};var fe=e=>{const{account:t,ledger:n}=e,[r,o]=Object(s.j)(null);return Object(s.d)(()=>{de(void 0,void 0,void 0,(function*(){const e={ledger:n,address:t.address};G(V.AccountDetails,e,(function(e){o(e)}))}))},[]),a`
    <div class="box py-2 is-shadowless account-preview"
      onClick=${()=>x(`/${n}/${t.address}`)} id="account_${t.name}">
      <div style="display: flex; justify-content: space-between;">
        <div>
          <b>${t.name}</b>
        </div>
        <div class="is-size-7 has-text-right">
          ${r&&a`
            <b>${r.assets.length}</b> ASAs<br />
            <b>${r.amount}</b> MAlgos
          `}
          ${null===r&&a`
            <span class="loader"></span>
          `}
        </div>
      </div>
    </div>
  `};var pe=e=>{const t=Object(s.b)(De),[n,r]=Object(s.j)(!1);return Object(c.b)(()=>{const{ledger:e}=t;return console.log("LEDGER",e),a`
      <div class="main-view" style="flex-direction: column; justify-content: space-between;">
        <div class="px-4 py-4" style="flex: 1">
          ${t[e].map(t=>a`
            <${fe} ledger=${e} account=${t} />
          `)}
        </div>

        <div style="padding: 0.5em 0.75em;">
          <button
            id="addAccount"
            class="button is-link is-fullwidth"
            onClick=${()=>{r(!0)}}>
            Add account
          </button>
        </div>
      </div>

      <div class=${"modal "+(n?"is-active":"")}>
        <div class="modal-background"></div>
        <div class="modal-content" style="padding: 0 15px;">
          <div class="box">
            <div>
              <${E} class="button is-fullwidth" id="createAccount" href=${`/${e}/create-account`}>
                Create new account
              </${E}>
            </div>
            <div>
              <${E} class="button is-fullwidth mt-5" id="importAccount" href=${`/${e}/import-account`}>
                Import existing account
              </${E}>
            </div>
          </div>
        </div>
        <button class="modal-close is-large" aria-label="close" onClick=${()=>r(!1)} />
      </div>
    `})};var he=e=>{const{tx:t,ledger:n}=e;return a`
    <div class="box" style="overflow-wrap: break-word;">
      <p class="has-text-centered has-text-weight-bold">Asset configuration</p>
      <p><strong>TxID:</strong> ${t.id}</p>
      <p><strong>From:</strong> ${t.sender}</p>
      <p><strong>Asset name:</strong> ${t["asset-config-transaction"].params.name}</p>
      <p><strong>Total:</strong> ${t["asset-config-transaction"].params.total} ${t["asset-config-transaction"].params["unit-name"]}</p>
      <p><strong>Block:</strong> ${t["confirmed-round"]}</p>
      <div class="has-text-centered">
        <a href=${`https://goalseeker.purestake.io/algorand/${n.toLowerCase()}/transaction/${t.id}`} target="_blank" rel="noopener noreferrer">
          See details in GoalSeeker
        </a>
      </div>
    </div>
  `};var ve=e=>{const{tx:t,ledger:n}=e;return a`
    <div class="box" style="overflow-wrap: break-word;">
      <p class="has-text-centered has-text-weight-bold">Payment</p>
      <p><strong>TxID:</strong> ${t.id}</p>
      <p><strong>From:</strong> ${t.sender}</p>
      <p><strong>To:</strong> ${t["payment-transaction"].receiver}</p>
      <p><strong>Amount:</strong> ${t["payment-transaction"].amount/1e6} Algos</p>
      <p><strong>Block:</strong> ${t["confirmed-round"]}</p>
      <div class="has-text-centered">
        <a href=${`https://goalseeker.purestake.io/algorand/${n.toLowerCase()}/transaction/${t.id}`} target="_blank" rel="noopener noreferrer">
          See details in GoalSeeker
        </a>
      </div>
    </div>
  `};var ge=e=>{const{tx:t,ledger:n}=e;return a`
    <div class="box" style="overflow-wrap: break-word;">
      <p class="has-text-centered has-text-weight-bold">Key registration</p>
      <p><strong>TxID:</strong> ${t.id}</p>
      <p><strong>From:</strong> ${t.sender}</p>
      <p><strong>Block:</strong> ${t["confirmed-round"]}</p>
      <div class="has-text-centered">
        <a href=${`https://goalseeker.purestake.io/algorand/${n.toLowerCase()}/transaction/${t.id}`} target="_blank" rel="noopener noreferrer">
          See details in GoalSeeker
        </a>
      </div>
    </div>
  `};var ye=e=>{const{tx:t,ledger:n}=e;return console.log("tadfad",t),a`
    <div class="box" style="overflow-wrap: break-word;">
      <p class="has-text-centered has-text-weight-bold">Asset transfer</p>
      <p><strong>TxID:</strong> ${t.id}</p>
      <p><strong>From:</strong> ${t.sender}</p>
      <p><strong>To:</strong> ${t["asset-transfer-transaction"].receiver}</p>
      <p><strong>Amount:</strong> ${t["asset-transfer-transaction"].amount}</p>
      <p><strong>Block:</strong> ${t["confirmed-round"]}</p>
      <div class="has-text-centered">
        <a href=${`https://goalseeker.purestake.io/algorand/${n.toLowerCase()}/transaction/${t.id}`} target="_blank" rel="noopener noreferrer">
          See details in GoalSeeker
        </a>
      </div>
    </div>
  `};var be=e=>{const{tx:t,ledger:n}=e,r=t["asset-freeze-transaction"]["new-freeze-status"]?"Freeze":"Unfreeze";return a`
    <div class="box" style="overflow-wrap: break-word;">
      <p class="has-text-centered has-text-weight-bold">Asset ${r}</p>
      <p><b>TxID:</b> ${t.id}</p>
      <p><b>Origin:</b> ${t.sender}</p>
      <p><b>Freeze address:</b> ${t["asset-freeze-transaction"].address}</p>
      <p><b>Asset:</b> ${t["asset-freeze-transaction"]["asset-id"]}</p>
      <p><b>Action:</b> ${r}</p>
      <p><b>Block:</b> ${t["confirmed-round"]}</p>
      <div class="has-text-centered">
        <a href=${`https://goalseeker.purestake.io/algorand/${n.toLowerCase()}/transaction/${t.id}`} target="_blank" rel="noopener noreferrer">
          See details in GoalSeeker
        </a>
      </div>
    </div>
  `},me=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function s(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}u((r=r.apply(e,t||[])).next())}))};var _e=e=>{const{address:t,ledger:n}=e,[r,o]=Object(s.j)(new Date),[i,u]=Object(s.j)([]),[c,l]=Object(s.j)(null),[d,f]=Object(s.j)(null),p=()=>me(void 0,void 0,void 0,(function*(){const e={ledger:n,address:t,"next-token":d,limit:20};G(V.Transactions,e,(function(e){i.length>0?u(i.concat(e.transactions)):u(e.transactions),e["next-token"]?f(e["next-token"]):f(null)}))}));if(Object(s.d)(()=>{o(new Date),p()},[]),!i)return null;return a`
    <div class="py-2">
      <span class="px-4 has-text-weight-bold is-size-5">Transactions</span>
      ${i.map(e=>a`
        <div class="py-3 px-4"
          style="border-top: 1px solid rgba(138, 159, 168, 0.2); cursor: pointer;"
          onClick=${()=>(e=>{switch(e["tx-type"]){case"pay":l(a`<${ve} tx=${e} ledger=${n} />`);break;case"keyreg":l(a`<${ge} tx=${e} ledger=${n} />`);break;case"acfg":l(a`<${he} tx=${e} ledger=${n} />`);break;case"axfer":l(a`<${ye} tx=${e} ledger=${n} />`);break;case"afrz":l(a`<${be} tx=${e} ledger=${n} />`)}})(e)}>
          ${((e,n)=>{let r,o,i;switch(e["tx-type"]){case"pay":i=e["payment-transaction"].amount/1e6+" Algos",e.sender===t?(o="To",r=e["payment-transaction"].receiver):(o="From",r=e.sender);break;case"keyreg":r="Key registration";break;case"acfg":o="Asset config",r=e["asset-config-transaction"].params.name;break;case"axfer":i=e["asset-transfer-transaction"].amount,e["asset-transfer-transaction"].sender?e["asset-transfer-transaction"].receiver===t?(o="ASA From (clawback)",r=e["asset-transfer-transaction"].sender):(o="ASA To (clawback)",r=e["asset-transfer-transaction"].receiver):e["asset-transfer-transaction"].receiver===t?(o="ASA From",r=e.sender):(o="ASA To",r=e["asset-transfer-transaction"].receiver);break;case"afrz":r=e["asset-freeze-transaction"]["asset-id"],o=e["asset-freeze-transaction"]["new-freeze-status"]?"Asset freezed":"Asset unfreezed"}return a`
      <div style="display: flex; justify-content: space-between;" id="div_${e.id}">
        <div style="max-width: 60%; white-space: nowrap;">
          <h2 class="subtitle is-size-7 is-uppercase has-text-grey-light">
            ${o}
          </h2>
          <h1 style="text-overflow: ellipsis; overflow: hidden;"
            class="title is-size-6">${r}</h1>
        </div>
        <div class="has-text-right">
          <h2 class="subtitle is-size-7 has-text-grey-light is-uppercase">
            ${function(e,t){const n=new Date(1e3*t),r=e-n.getTime();if(r<864e5){let e,t;return r<6e4?(e=r/1e3,t="sec"):r<36e5?(e=r/6e4,t="min"):(e=r/36e5,t="hour"),e=Math.floor(e),e>1?e+" "+t+"s ago":e+" "+t+" ago"}return n.toDateString()}(n,e["round-time"])}
          </h2>
          <h1 class="title is-size-6">${i}</h1>
        </div>
      </div>
    `})(e,r)}
        </div>
      `)}
      ${d&&a`
        <div class="py-3 px-4 has-text-centered"
          style="border-top: 1px solid rgba(138, 159, 168, 0.2);">
          <a onClick=${()=>{p()}}>
            Load more transactions
          </a>
        </div>
      `}
    </div>

    <div class=${"modal "+(c?"is-active":"")}>
      <div class="modal-background"></div>
      <div class="modal-content" style="padding: 0 15px;">
        ${c}
      </div>
      <button class="modal-close is-large" aria-label="close" onClick=${()=>l(null)} />
    </div>
  `},we=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function s(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}u((r=r.apply(e,t||[])).next())}))};var xe=e=>{const{asset:t,ledger:n}=e,[r,o]=Object(s.j)(null);return Object(s.d)(()=>{we(void 0,void 0,void 0,(function*(){const e={ledger:n,"asset-id":t["asset-id"]};G(V.AssetDetails,e,(function(e){t.name=e.asset.params.name,t.unitname=e.asset.params["unit-name"],o(e.asset.params)}))}))},[]),a`
    <div class="box" style="overflow-wrap: break-word;">
      ${r&&a`
        <div class="has-text-centered mb-2">
          <b>${r.name}</b>
          <br />
          <span class="has-text-grey-light">${t["asset-id"]}</span>
        </div>
        <p>
          <b>Your balance</b>
          <span class="is-pulled-right">
            ${t.amount} <b>${r["unit-name"]}</b>
          </span>
        </p>
        <hr class="my-2" />
        <p>
          <b>Total units</b>
          <span class="is-pulled-right">
            ${r.total} <b>${r["unit-name"]}</b>
          </span>
        </p>
        <p>
          <b>Creator</b> (<${ie} data=${r.creator} />)
          <span class="is-pulled-right">
            ${r.creator.slice(0,8)}.....${r.creator.slice(-8)}
          </span>
        </p>
        <div class="has-text-centered mt-3">
          <a href=${`https://goalseeker.purestake.io/algorand/${n.toLowerCase()}/asset/${t["asset-id"]}`}
            target="_blank"
            rel="noopener noreferrer">
            See details in GoalSeeker
          </a>
        </div>
      `}
    </div>

  `};const ke=e=>{const{asset:t,setShowAsset:n}=e;return a`
    <div class="py-2 px-4"
      style="border-top: 1px solid rgba(138, 159, 168, 0.2); cursor: pointer;"
      onClick=${()=>n(t)}>
      ${t.name&&t.name.length>0&&a`
        ${t.name}
        <small class="has-text-grey-light"> ${t["asset-id"]}</small>
      `}
      ${(!t.name||0===t.name.length)&&a`
        ${t["asset-id"]}
      `}
      <span style="float: right;">
        <b>${t.amount}</b>
        ${t.unitname&&t.unitname.length>0&&a`
          <span> ${t.unitname}</span<
        `}
      </span>
    </div>
  `};var $e=e=>{const{ledger:t,assets:n}=e,[r,o]=Object(s.j)(null),[i,u]=Object(s.j)(!1);return a`
    <div class="py-2">
      <span class="px-4 has-text-weight-bold is-size-5">Assets</span>
      ${n.slice(0,10).map(e=>a`
        <${ke} asset=${e} setShowAsset=${o} />
      `)}
      ${n.length>10&&a`
        <div class="py-3 px-4 has-text-centered"
          style="border-top: 1px solid rgba(138, 159, 168, 0.2);">
          <a onClick=${()=>u(!0)}>
            Show all assets
          </a>
        </div>
      `}
    </div>


    <div class=${"modal "+(i?"is-active":"")}>
      <div class="modal-background" onClick=${()=>u(!1)}></div>
      <div class="modal-content" style="padding: 0 15px;">
        <div class="box" style="overflow-wrap: break-word;">
          ${n.map(e=>a`
            <${ke} asset=${e} setShowAsset=${o} />
          `)}
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" onClick=${()=>u(!1)} />
    </div>

    <div class=${"modal "+(r?"is-active":"")}>
      <div class="modal-background" onClick=${()=>o(null)}></div>
      <div class="modal-content" style="padding: 0 15px;">
        ${r&&a`
          <${xe} asset=${r} ledger=${t} />
        `}
      </div>
      <button class="modal-close is-large" aria-label="close" onClick=${()=>o(null)} />
    </div>

  `},Oe=n(6),Ae=n.n(Oe);var Se=e=>{const t=Object(s.b)(De),[n,r]=Object(s.j)(!1),{account:o,ledger:i}=e;var u=Ae()(4,"L");u.addData(o.address),u.make();let c=u.createDataURL(10,1);return n?a`
      <${ue}
        nextStep=${e=>{const n={ledger:i,address:o.address,passphrase:e};G(V.DeleteAccount,n,(function(e){"error"in e?alert(e):(t.updateWallet(e),x("/wallet"))}))}} />
    `:a`
      <strong>Address</strong>
      <p id="accountAddress">${o.address}</p>

      <div style="text-align: center;" id="qrCode">
        <img src="${c}"
          style="padding: 0.5em;
            margin: 0.5em;
            border: 1px solid #9095AF;
            border-radius: 10px;"
          width="250"
          height="250"/>
      </div>

      <button
        id="deleteAccount"
        class="button is-danger is-fullwidth"
        onClick=${()=>r(!0)}>
        Delete account!
      </button>

    `},je=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function s(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}u((r=r.apply(e,t||[])).next())}))};var Ce=e=>{const t=Object(s.b)(De),{url:n,ledger:r,address:o}=e,[i,u]=Object(s.j)(!1),[c,l]=Object(s.j)(!1),[d,f]=Object(s.j)(null);let p;for(var h=t[r].length-1;h>=0;h--)if(t[r][h].address===o){p=t[r][h];break}return Object(s.d)(()=>{je(void 0,void 0,void 0,(function*(){const e={ledger:r,address:o};G(V.AccountDetails,e,(function(e){f(e)}))}))},[]),a`
    <div class="px-4 py-3 has-text-weight-bold ">
      <p id="accountName" class="is-size-5" style="overflow: hidden; text-overflow: ellipsis;">
        <a class="icon mr-2" onClick=${()=>x("/wallet")}>${"<"}</a>
        ${p.name} Account
        <button id="showDetails"
          class="button is-outlined is-small is-primary is-pulled-right"
          onClick=${()=>u(!0)}>
          ${"⋮"}
        </button>
      </p>
      <span>
        Balance: ${d&&a`${d.amount/1e6} <span class="has-text-grey-light">Algos</span>`}
      </span>
    </div>
    <div class="px-4">
      <${E} id="sendAlgos" class="button is-primary is-fullwidth py-2" href=${n+"/send"}>
        Send Algos
      </${E}>
    </div>

    ${d&&d.assets.length>0&&a`
      <${$e} assets=${d.assets} ledger=${r}/>
    `}

    <${_e} address=${o} ledger=${r}/>

    <div class=${"modal "+(i?"is-active":"")}>
      <div class="modal-background" onClick=${()=>u(!1)}></div>
      <div class="modal-content" style="padding: 0 15px; max-height: calc(100vh - 95px);">
        <div class="box" style="overflow-wrap: break-word;">
          <${Se} account=${p} ledger=${r} />
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" onClick=${()=>u(!1)} />
    </div>
  `},Ee=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function s(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}u((r=r.apply(e,t||[])).next())}))};var Te=e=>{const t=Object(s.b)(De),{matches:n,path:r,url:o,ledger:i,address:u}=e,[c,l]=Object(s.j)(!1),[d,f]=Object(s.j)(""),[p,h]=Object(s.j)(""),[v,g]=Object(s.j)(""),[y,b]=Object(s.j)(""),[m,_]=Object(s.j)(!1),[w,k]=Object(s.j)(""),[$,O]=Object(s.j)("");let A;for(var S=t[i].length-1;S>=0;S--)if(t[i][S].address===u){A=t[i][S];break}return a`
    <div class="main-view" style="flex-direction: column; justify-content: space-between;">
      <${re}
        action="${()=>x(`/${n.ledger}/${n.address}`)}"
        title="Send Algos" />

      <div class="px-4" style="flex: 1">
        <input class="input mb-4"
          id="amountAlgos"
          placeholder="Algos"
          type="number"
          value=${p}
          onInput=${e=>h(e.target.value)} />
        
        <b>From</b>
        <div class="box py-2"
          style="overflow: hidden; text-overflow: ellipsis; background: #EFF4F7; box-shadow: none;">
          <h6 class="title is-6">${A.name}</h6>
          <h6 class="subtitle is-6">${A.address}</h6>
        </div>

        <textarea
          placeholder="To address"
          class="textarea mb-4"
          id="to-address"
          value=${d}
          rows="2"
          onInput=${e=>f(e.target.value)}/>
        <textarea
          placeholder="Note"
          class="textarea mb-4"
          id="note"
          value=${v}
          rows="2"
          onInput=${e=>g(e.target.value)}/>

        <p class="mt-3 has-text-danger">
          ${void 0!==$&&$.length>0&&$}
        </p>

      </div>
      <div class="px-4 py-4">
        <button
          id="submitSendAlgos"
          class="button is-link is-outlined is-fullwidth"
          onClick=${()=>l(!0)}>
          Send!
        </button>
      </div>
    </div>

    ${c&&a`
      <div class="modal is-active"}>
        <div class="modal-background"></div>
        <div class="modal-content" style="padding: 0 15px;">
          <${ue}
            error=${w}
            loading=${m}
            nextStep=${e=>Ee(void 0,void 0,void 0,(function*(){_(!0),k(""),O("");const t={ledger:i,address:A.address,amount:1e6*+p,note:v,to:d,passphrase:e};G(V.SignSendTransaction,t,(function(e){if("error"in e)switch(_(!1),e.error){case"Login Failed":k("Wrong passphrase");break;default:O(e.error),l(!1)}else console.log("setting txid",e.txId),l(!1),b(e.txId)}))}))} />
        </div>
        <button class="modal-close is-large" aria-label="close" onClick=${()=>l(!1)} />
      </div>
    `}

    ${y.length>0&&a`
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content" style="padding: 0 15px;">
          <div class="box">
            <p>Transaction sent with ID</p>
            <p id="txId" style="word-break: break-all;">${y}</p>
            <button
              id="backToWallet"
              class="button is-success is-outlined is-fullwidth mt-4"
              onClick=${()=>x(`/${n.ledger}/${n.address}`)}>
              Back to wallet!
            </button>
          </div>
        </div>
      </div>
    `}

  `};const De=Object(r.e)(),Pe=({children:e})=>{sessionStorage.getItem("wallet");const t=Object(c.a)(()=>({ledger:"MainNet",addAccount:(e,n,r)=>{t[e].push({address:n,name:r})},deleteAccount:(e,n)=>{for(var r=t[e].length-1;r>=0;r--)if(t[e][r].address==n.address){t[e].splice(r,1);break}},setLedger:e=>{t.ledger=e},updateWallet:e=>{t.TestNet=e.TestNet,t.MainNet=e.MainNet}}));return Object(u.b)(()=>{sessionStorage.setItem("wallet",JSON.stringify(t))}),G(V.GetSession,{},(function(e){console.log("GETSESSION",e),e&&e.exist&&("session"in e?(t.updateWallet(e.session),x("/wallet")):x("/login"))})),a`
    <${De.Provider} value=${t}>${e}</${De.Provider}>
  `};n(8);const Le=document.getElementById("root"),Be=e=>a`
      ${e.children}
  `;Object(r.k)(a`<${()=>a`
      <${Pe}>
        <div style="overflow: hidden; width: 400px; height: 550px; display: flex; flex-direction: column;">
          <${C} history=${function(e){function t(){var e=U(s.location.hash.substr(1)),t=e.pathname,n=e.search;e=e.hash;var r=u.state||{};return[r.idx,B({pathname:void 0===t?"/":t,search:void 0===n?"":n,hash:void 0===e?"":e,state:r.usr||null,key:r.key||"default"})]}function n(){if(c)h.call(c),c=null;else{var e=P.Pop,n=t(),r=n[0];if(n=n[1],h.length){if(null!=r){var o=d-r;o&&(c={action:e,location:n,retry:function(){a(-1*o)}},a(o))}}else i(e)}}function r(e){var t=document.querySelector("base"),n="";return t&&t.getAttribute("href")&&(n=-1===(n=(t=s.location.href).indexOf("#"))?t:t.slice(0,n)),n+"#"+("string"==typeof e?e:I(e))}function o(e,t){return void 0===t&&(t=null),B(D({},f,{},"string"==typeof e?U(e):e,{state:t,key:R()}))}function i(e){l=e,e=t(),d=e[0],f=e[1],p.call({action:l,location:f})}function a(e){u.go(e)}void 0===e&&(e={});var s=void 0===(e=e.window)?document.defaultView:e,u=s.history,c=null;s.addEventListener("popstate",n),s.addEventListener("hashchange",(function(){I(t()[1])!==I(f)&&n()}));var l=P.Pop,d=(e=t())[0],f=e[1],p=N(),h=N();return null==d&&(d=0,u.replaceState(D({},u.state,{idx:d}),"")),{get action(){return l},get location(){return f},createHref:r,push:function e(t,n){var a=P.Push,c=o(t,n);if(!h.length||(h.call({action:a,location:c,retry:function(){e(t,n)}}),0)){var l=[{usr:c.state,key:c.key,idx:d+1},r(c)];c=l[0],l=l[1];try{u.pushState(c,"",l)}catch(e){s.location.assign(l)}i(a)}},replace:function e(t,n){var a=P.Replace,s=o(t,n);h.length&&(h.call({action:a,location:s,retry:function(){e(t,n)}}),1)||(s=[{usr:s.state,key:s.key,idx:d},r(s)],u.replaceState(s[0],"",s[1]),i(a))},go:a,back:function(){a(-1)},forward:function(){a(1)},listen:function(e){return p.push(e)},block:function(e){var t=h.push(e);return 1===h.length&&s.addEventListener("beforeunload",M),function(){t(),h.length||s.removeEventListener("beforeunload",M)}}}}()}>
            <${J} path="/authorize" />
            <${Q} path="/" />
            <${te} path="/set-password" />
            <${ne} path="/login" />
            <${Be} path="/:*?">
              <${K} />
              <div style="overflow: auto; flex: 1; display: flex; flex-direction: column;">
                <${C}>
                  <${pe} path="/wallet" />
                  <${ce} path="/:ledger/create-account" />
                  <${le} path="/:ledger/import-account" />
                  <${Ce} path="/:ledger/:address" />
                  <${Te} path="/:ledger/:address/send" />
                </${C}>
              </div>
              <${q} />
            </${T}>
          </${C}>
        </div>
      </${Pe}>
    `}/>`,Le,Le.lastChild)}]);