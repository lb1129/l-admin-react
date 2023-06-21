"use strict";(self.webpackChunkl_admin=self.webpackChunkl_admin||[]).push([[18844,69155],{3355:function(e,t,n){n.d(t,{Z:function(){return a}});n(47313);var o=n(52917),r=n(20377);var c=n(46417),a=function(e){var t=e.title,n=e.subTitle,a=e.extra,i=e.children,l=e.onBack,s={wrap:(0,r.l)((function(){return{color:"#000000d9",fontSize:"14px",position:"relative",padding:"16px 24px",backgroundColor:"#fff"}})),head:(0,r.l)((function(){return{display:"flex",justifyContent:"space-between"}})),headLeft:(0,r.l)((function(){return{display:"flex",alignItems:"center",margin:"4px 0",overflow:"hidden"}})),headBack:(0,r.l)((function(){return{marginRight:"16px",fontSize:"16px",lineHeight:1}})),headBackButton:(0,r.l)((function(e){return{display:"inline-block",transition:"color .3s",color:e.token.colorPrimary,cursor:"pointer"}})),headTitle:(0,r.l)((function(){return{marginRight:"12px",color:"#000000d9",fontWeight:600,fontSize:"20px",lineHeight:"32px",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}})),headSubTitle:(0,r.l)((function(){return{marginRight:"12px",color:"#00000073",fontSize:"14px",lineHeight:"1.5715",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}})),headExtra:(0,r.l)((function(){return{margin:"4px 0",whiteSpace:"nowrap","&>*":{marginLeft:"12px",whiteSpace:"unset"},"&>*:first-child":{marginLeft:0}}})),content:(0,r.l)((function(){return{paddingTop:"12px"}}))};return(0,c.jsxs)("div",{className:s.wrap,children:[(0,c.jsxs)("div",{className:s.head,children:[(0,c.jsxs)("div",{className:s.headLeft,children:[(0,c.jsx)("div",{className:s.headBack,children:(0,c.jsx)("div",{className:s.headBackButton,onClick:l,children:(0,c.jsx)(o.Z,{})})}),(0,c.jsx)("span",{className:s.headTitle,children:t}),(0,c.jsx)("span",{className:s.headSubTitle,children:n})]}),(0,c.jsx)("div",{className:s.headExtra,children:a})]}),(0,c.jsx)("div",{className:s.content,children:i})]})}},50312:function(e,t,n){n.d(t,{a:function(){return a},o:function(){return c}});var o=n(58467),r=n(10340),c=function(e){return 0===e},a=function(){var e=(0,o.TH)().pathname,t=(0,r.C)((function(e){return e.menuData.data})),n={};return function t(o,r){for(var c=0;c<o.length;c++){var a=o[c];if("".concat(null!==r&&void 0!==r?r:"").concat(a.path)===e){a.operateAuth&&(n=a.operateAuth);break}a.children&&a.children.length&&t(a.children,"".concat(null!==r&&void 0!==r?r:"").concat(a.path))}}(t),{operateAuth:n}}},20377:function(e,t,n){n.d(t,{l:function(){return c}});var o=n(838),r=n(92465),c=function(e){var t=r.Z.useToken();return(0,o.iv)(e(t))}},18844:function(e,t,n){n.r(t),n.d(t,{default:function(){return A}});var o=n(74165),r=n(15861),c=n(29439),a=n(47313),i=n(59491),l=n(83725),s=n(4942),d=n(46123),u=n.n(d),p=n(14903),f=n(48138),m=n(17041),g=n(74714),h=n(34520),b=function(e){return e.children};function x(e){return void 0!==e&&null!==e}var v=function(e){var t,n=e.itemPrefixCls,o=e.component,r=e.span,c=e.className,i=e.style,l=e.labelStyle,d=e.contentStyle,p=e.bordered,f=e.label,m=e.content,g=e.colon,h=o;return p?a.createElement(h,{className:u()((t={},(0,s.Z)(t,"".concat(n,"-item-label"),x(f)),(0,s.Z)(t,"".concat(n,"-item-content"),x(m)),t),c),style:i,colSpan:r},x(f)&&a.createElement("span",{style:l},f),x(m)&&a.createElement("span",{style:d},m)):a.createElement(h,{className:u()("".concat(n,"-item"),c),style:i,colSpan:r},a.createElement("div",{className:"".concat(n,"-item-container")},(f||0===f)&&a.createElement("span",{className:u()("".concat(n,"-item-label"),(0,s.Z)({},"".concat(n,"-item-no-colon"),!g)),style:l},f),(m||0===m)&&a.createElement("span",{className:u()("".concat(n,"-item-content")),style:d},m)))};function y(e,t,n){var o=t.colon,r=t.prefixCls,c=t.bordered,i=n.component,l=n.type,s=n.showLabel,d=n.showContent,u=n.labelStyle,p=n.contentStyle;return e.map((function(e,t){var n=e.props,f=n.label,m=n.children,g=n.prefixCls,h=void 0===g?r:g,b=n.className,x=n.style,y=n.labelStyle,S=n.contentStyle,j=n.span,Z=void 0===j?1:j,w=e.key;return"string"===typeof i?a.createElement(v,{key:"".concat(l,"-").concat(w||t),className:b,style:x,labelStyle:Object.assign(Object.assign({},u),y),contentStyle:Object.assign(Object.assign({},p),S),span:Z,colon:o,component:i,itemPrefixCls:h,bordered:c,label:s?f:null,content:d?m:null}):[a.createElement(v,{key:"label-".concat(w||t),className:b,style:Object.assign(Object.assign(Object.assign({},u),x),y),span:1,colon:o,component:i[0],itemPrefixCls:h,bordered:c,label:f}),a.createElement(v,{key:"content-".concat(w||t),className:b,style:Object.assign(Object.assign(Object.assign({},p),x),S),span:2*Z-1,component:i[1],itemPrefixCls:h,bordered:c,content:m})]}))}var S=function(e){var t=a.useContext(k),n=e.prefixCls,o=e.vertical,r=e.row,c=e.index,i=e.bordered;return o?a.createElement(a.Fragment,null,a.createElement("tr",{key:"label-".concat(c),className:"".concat(n,"-row")},y(r,e,Object.assign({component:"th",type:"label",showLabel:!0},t))),a.createElement("tr",{key:"content-".concat(c),className:"".concat(n,"-row")},y(r,e,Object.assign({component:"td",type:"content",showContent:!0},t)))):a.createElement("tr",{key:c,className:"".concat(n,"-row")},y(r,e,Object.assign({component:i?["th","td"]:"td",type:"item",showLabel:!0,showContent:!0},t)))},j=n(96122),Z=n(73239),w=n(40601),O=function(e){var t,n,o=e.componentCls,r=e.descriptionsExtraColor,c=e.descriptionItemPaddingBottom,a=e.descriptionsItemLabelColonMarginRight,i=e.descriptionsItemLabelColonMarginLeft,l=e.descriptionsTitleMarginBottom;return(0,s.Z)({},o,Object.assign(Object.assign(Object.assign({},(0,w.Wf)(e)),function(e){var t,n=e.componentCls,o=e.descriptionsSmallPadding,r=e.descriptionsDefaultPadding,c=e.descriptionsMiddlePadding,a=e.descriptionsBg;return(0,s.Z)({},"&".concat(n,"-bordered"),(t={},(0,s.Z)(t,"".concat(n,"-view"),{border:"".concat(e.lineWidth,"px ").concat(e.lineType," ").concat(e.colorSplit),"> table":{tableLayout:"auto",borderCollapse:"collapse"}}),(0,s.Z)(t,"".concat(n,"-item-label, ").concat(n,"-item-content"),{padding:r,borderInlineEnd:"".concat(e.lineWidth,"px ").concat(e.lineType," ").concat(e.colorSplit),"&:last-child":{borderInlineEnd:"none"}}),(0,s.Z)(t,"".concat(n,"-item-label"),{color:e.colorTextSecondary,backgroundColor:a,"&::after":{display:"none"}}),(0,s.Z)(t,"".concat(n,"-row"),{borderBottom:"".concat(e.lineWidth,"px ").concat(e.lineType," ").concat(e.colorSplit),"&:last-child":{borderBottom:"none"}}),(0,s.Z)(t,"&".concat(n,"-middle"),(0,s.Z)({},"".concat(n,"-item-label, ").concat(n,"-item-content"),{padding:c})),(0,s.Z)(t,"&".concat(n,"-small"),(0,s.Z)({},"".concat(n,"-item-label, ").concat(n,"-item-content"),{padding:o})),t))}(e)),(n={},(0,s.Z)(n,"&-rtl",{direction:"rtl"}),(0,s.Z)(n,"".concat(o,"-header"),{display:"flex",alignItems:"center",marginBottom:l}),(0,s.Z)(n,"".concat(o,"-title"),Object.assign(Object.assign({},w.vS),{flex:"auto",color:e.colorText,fontWeight:e.fontWeightStrong,fontSize:e.fontSizeLG,lineHeight:e.lineHeightLG})),(0,s.Z)(n,"".concat(o,"-extra"),{marginInlineStart:"auto",color:r,fontSize:e.fontSize}),(0,s.Z)(n,"".concat(o,"-view"),{width:"100%",borderRadius:e.borderRadiusLG,table:{width:"100%",tableLayout:"fixed"}}),(0,s.Z)(n,"".concat(o,"-row"),{"> th, > td":{paddingBottom:c},"&:last-child":{borderBottom:"none"}}),(0,s.Z)(n,"".concat(o,"-item-label"),(0,s.Z)({color:e.colorTextTertiary,fontWeight:"normal",fontSize:e.fontSize,lineHeight:e.lineHeight,textAlign:"start","&::after":{content:'":"',position:"relative",top:-.5,marginInline:"".concat(i,"px ").concat(a,"px")}},"&".concat(o,"-item-no-colon::after"),{content:'""'})),(0,s.Z)(n,"".concat(o,"-item-no-label"),{"&::after":{margin:0,content:'""'}}),(0,s.Z)(n,"".concat(o,"-item-content"),{display:"table-cell",flex:1,color:e.colorText,fontSize:e.fontSize,lineHeight:e.lineHeight,wordBreak:"break-word",overflowWrap:"break-word"}),(0,s.Z)(n,"".concat(o,"-item"),{paddingBottom:0,verticalAlign:"top","&-container":(t={display:"flex"},(0,s.Z)(t,"".concat(o,"-item-label"),{display:"inline-flex",alignItems:"baseline"}),(0,s.Z)(t,"".concat(o,"-item-content"),{display:"inline-flex",alignItems:"baseline"}),t)}),(0,s.Z)(n,"&-middle",(0,s.Z)({},"".concat(o,"-row"),{"> th, > td":{paddingBottom:e.paddingSM}})),(0,s.Z)(n,"&-small",(0,s.Z)({},"".concat(o,"-row"),{"> th, > td":{paddingBottom:e.paddingXS}})),n)))},C=(0,j.Z)("Descriptions",(function(e){var t=e.colorFillAlter,n=e.fontSizeSM*e.lineHeightSM,o=e.colorText,r="".concat(e.paddingXS,"px ").concat(e.padding,"px"),c="".concat(e.padding,"px ").concat(e.paddingLG,"px"),a="".concat(e.paddingSM,"px ").concat(e.paddingLG,"px"),i=e.padding,l=e.marginXS,s=e.marginXXS/2,d=(0,Z.TS)(e,{descriptionsBg:t,descriptionsTitleMarginBottom:n,descriptionsExtraColor:o,descriptionItemPaddingBottom:i,descriptionsSmallPadding:r,descriptionsDefaultPadding:c,descriptionsMiddlePadding:a,descriptionsItemLabelColonMarginRight:l,descriptionsItemLabelColonMarginLeft:s});return[O(d)]})),E=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(n[o[r]]=e[o[r]])}return n},k=a.createContext({}),B={xxl:3,xl:3,lg:3,md:3,sm:2,xs:1};function N(e,t,n){var o=e;return(void 0===n||n>t)&&(o=(0,f.Tm)(e,{span:t})),o}function z(e){var t,n=e.prefixCls,o=e.title,r=e.extra,i=e.column,l=void 0===i?B:i,d=e.colon,f=void 0===d||d,b=e.bordered,x=e.layout,v=e.children,y=e.className,j=e.rootClassName,Z=e.style,w=e.size,O=e.labelStyle,z=e.contentStyle,L=E(e,["prefixCls","title","extra","column","colon","bordered","layout","children","className","rootClassName","style","size","labelStyle","contentStyle"]),M=a.useContext(g.E_),T=M.getPrefixCls,I=M.direction,P=T("descriptions",n),H=a.useState({}),X=(0,c.Z)(H,2),A=X[0],W=X[1],G=function(e,t){if("number"===typeof e)return e;if("object"===typeof e)for(var n=0;n<m.c.length;n++){var o=m.c[n];if(t[o]&&void 0!==e[o])return e[o]||B[o]}return 3}(l,A),R=(0,h.Z)(w),D=C(P),F=(0,c.Z)(D,2),_=F[0],Q=F[1],U=(0,m.Z)();a.useEffect((function(){var e=U.subscribe((function(e){"object"===typeof l&&W(e)}));return function(){U.unsubscribe(e)}}),[]);var q=function(e,t){var n=(0,p.Z)(e).filter((function(e){return e})),o=[],r=[],c=t;return n.forEach((function(e,a){var i,l=null===(i=e.props)||void 0===i?void 0:i.span,s=l||1;if(a===n.length-1)return r.push(N(e,c,l)),void o.push(r);s<c?(c-=s,r.push(e)):(r.push(N(e,c,s)),o.push(r),c=t,r=[])})),o}(v,G),$=a.useMemo((function(){return{labelStyle:O,contentStyle:z}}),[O,z]);return _(a.createElement(k.Provider,{value:$},a.createElement("div",Object.assign({className:u()(P,(t={},(0,s.Z)(t,"".concat(P,"-").concat(R),R&&"default"!==R),(0,s.Z)(t,"".concat(P,"-bordered"),!!b),(0,s.Z)(t,"".concat(P,"-rtl"),"rtl"===I),t),y,j,Q),style:Z},L),(o||r)&&a.createElement("div",{className:"".concat(P,"-header")},o&&a.createElement("div",{className:"".concat(P,"-title")},o),r&&a.createElement("div",{className:"".concat(P,"-extra")},r)),a.createElement("div",{className:"".concat(P,"-view")},a.createElement("table",null,a.createElement("tbody",null,q.map((function(e,t){return a.createElement(S,{key:t,index:t,colon:f,prefixCls:P,vertical:"vertical"===x,bordered:b,row:e})}))))))))}z.Item=b;var L=z,M=n(58467),T=n(3355),I=n(75590),P=n(50312),H=n(69155),X=n(46417),A=function(){var e=(0,M.UO)(),t=(0,M.s0)(),n=(0,I.$G)().t,s=(0,P.a)().operateAuth,d=(0,a.useState)(!1),u=(0,c.Z)(d,2),p=u[0],f=u[1],m=(0,a.useState)({name:"",brand:"",category:"",price:0,color:"",style:"",enable:!0,inventory:0,describe:""}),g=(0,c.Z)(m,2),h=g[0],b=g[1],x=(0,a.useCallback)((0,r.Z)((0,o.Z)().mark((function t(){var n;return(0,o.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.id){t.next=13;break}return f(!0),t.prev=2,t.next=5,(0,H.getProductById)(e.id);case 5:n=t.sent,b(n.data),f(!1),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(2),f(!1);case 13:case"end":return t.stop()}}),t,null,[[2,10]])}))),[e.id]);return(0,a.useEffect)((function(){x()}),[x]),(0,X.jsx)(T.Z,{title:n("detail"),onBack:function(){return t(-1)},extra:(0,X.jsx)(i.ZP,{type:"primary",disabled:(0,P.o)(s.edit),onClick:function(){t("/productManagement/ProductAddOrEdit/".concat(h.id),{state:{a:1}})},children:n("edit")}),children:(0,X.jsx)(l.Z,{loading:p,children:(0,X.jsxs)(L,{bordered:!0,children:[(0,X.jsx)(L.Item,{label:"name",children:h.name}),(0,X.jsx)(L.Item,{label:"brand",children:h.brand}),(0,X.jsx)(L.Item,{label:"category",children:h.category}),(0,X.jsx)(L.Item,{label:"price",children:h.price}),(0,X.jsx)(L.Item,{label:"color",children:h.color}),(0,X.jsx)(L.Item,{label:"inventory",children:h.inventory}),(0,X.jsx)(L.Item,{label:"style",span:3,children:h.style}),(0,X.jsx)(L.Item,{label:"describe",children:h.describe})]})})})}},69155:function(e,t,n){n.r(t),n.d(t,{deleteProductByIds:function(){return i},getProductById:function(){return c},getProducts:function(){return l},saveProduct:function(){return a}});var o=n(67037),r=n(84312),c=function(e){return o.Z.get(r.j,{params:{id:e}})},a=function(e){return o.Z.post(r.j,e)},i=function(e){return o.Z.delete(r.j,{data:e})},l=function(e){return o.Z.post(r.jN,e)}},17041:function(e,t,n){n.d(t,{Z:function(){return d},c:function(){return i}});var o=n(4942),r=n(29439),c=n(47313),a=n(67531),i=["xxl","xl","lg","md","sm","xs"],l=function(e){return{xs:"(max-width: ".concat(e.screenXSMax,"px)"),sm:"(min-width: ".concat(e.screenSM,"px)"),md:"(min-width: ".concat(e.screenMD,"px)"),lg:"(min-width: ".concat(e.screenLG,"px)"),xl:"(min-width: ".concat(e.screenXL,"px)"),xxl:"(min-width: ".concat(e.screenXXL,"px)")}},s=function(e){var t=e,n=[].concat(i).reverse();return n.forEach((function(e,o){var r=e.toUpperCase(),c="screen".concat(r,"Min"),a="screen".concat(r);if(!(t[c]<=t[a]))throw new Error("".concat(c,"<=").concat(a," fails : !(").concat(t[c],"<=").concat(t[a],")"));if(o<n.length-1){var i="screen".concat(r,"Max");if(!(t[a]<=t[i]))throw new Error("".concat(a,"<=").concat(i," fails : !(").concat(t[a],"<=").concat(t[i],")"));var l=n[o+1].toUpperCase(),s="screen".concat(l,"Min");if(!(t[i]<=t[s]))throw new Error("".concat(i,"<=").concat(s," fails : !(").concat(t[i],"<=").concat(t[s],")"))}})),e};function d(){var e=(0,a.dQ)(),t=(0,r.Z)(e,2)[1],n=l(s(t));return c.useMemo((function(){var e=new Map,t=-1,r={};return{matchHandlers:{},dispatch:function(t){return r=t,e.forEach((function(e){return e(r)})),e.size>=1},subscribe:function(n){return e.size||this.register(),t+=1,e.set(t,n),n(r),t},unsubscribe:function(t){e.delete(t),e.size||this.unregister()},unregister:function(){var t=this;Object.keys(n).forEach((function(e){var o=n[e],r=t.matchHandlers[o];null===r||void 0===r||r.mql.removeListener(null===r||void 0===r?void 0:r.listener)})),e.clear()},register:function(){var e=this;Object.keys(n).forEach((function(t){var c=n[t],a=function(n){var c=n.matches;e.dispatch(Object.assign(Object.assign({},r),(0,o.Z)({},t,c)))},i=window.matchMedia(c);i.addListener(a),e.matchHandlers[c]={mql:i,listener:a},a(i)}))},responsiveMap:n}}),[t])}},92465:function(e,t,n){n.d(t,{Z:function(){return x}});var o=n(29439),r=n(67531),c=n(93668),a=n(37750),i=n(89969),l=n(72387),s=n(40090),d=function(e,t){return new s.C(e).setAlpha(t).toRgbString()},u=function(e,t){return new s.C(e).lighten(t).toHexString()},p=function(e){var t=(0,a.generate)(e,{theme:"dark"});return{1:t[0],2:t[1],3:t[2],4:t[3],5:t[6],6:t[5],7:t[4],8:t[6],9:t[5],10:t[4]}},f=function(e,t){var n=e||"#000",o=t||"#fff";return{colorBgBase:n,colorTextBase:o,colorText:d(o,.85),colorTextSecondary:d(o,.65),colorTextTertiary:d(o,.45),colorTextQuaternary:d(o,.25),colorFill:d(o,.18),colorFillSecondary:d(o,.12),colorFillTertiary:d(o,.08),colorFillQuaternary:d(o,.04),colorBgElevated:u(n,12),colorBgContainer:u(n,8),colorBgLayout:u(n,0),colorBgSpotlight:u(n,26),colorBorder:u(n,26),colorBorderSecondary:u(n,19)}},m=function(e,t){var n=Object.keys(i.M).map((function(t){var n=(0,a.generate)(e[t],{theme:"dark"});return new Array(10).fill(1).reduce((function(e,o,r){return e["".concat(t,"-").concat(r+1)]=n[r],e["".concat(t).concat(r+1)]=n[r],e}),{})})).reduce((function(e,t){return e=Object.assign(Object.assign({},e),t)}),{}),o=null!==t&&void 0!==t?t:(0,c.Z)(e);return Object.assign(Object.assign(Object.assign({},o),n),(0,l.Z)(e,{generateColorPalettes:p,generateNeutralColorPalettes:f}))},g=n(9517);var h=n(23851),b=function(e,t){var n=null!==t&&void 0!==t?t:(0,c.Z)(e),o=n.fontSizeSM,r=n.controlHeight-4;return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},n),function(e){var t=e.sizeUnit,n=e.sizeStep-2;return{sizeXXL:t*(n+10),sizeXL:t*(n+6),sizeLG:t*(n+2),sizeMD:t*(n+2),sizeMS:t*(n+1),size:t*n,sizeSM:t*n,sizeXS:t*(n-1),sizeXXS:t*(n-1)}}(null!==t&&void 0!==t?t:e)),(0,h.Z)(o)),{controlHeight:r}),(0,g.Z)(Object.assign(Object.assign({},n),{controlHeight:r})))};var x={defaultConfig:r.u_,defaultSeed:r.u_.token,useToken:function(){var e=(0,r.dQ)(),t=(0,o.Z)(e,3);return{theme:t[0],token:t[1],hashId:t[2]}},defaultAlgorithm:c.Z,darkAlgorithm:m,compactAlgorithm:b}}}]);