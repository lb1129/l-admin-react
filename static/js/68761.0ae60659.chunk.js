"use strict";(self.webpackChunkl_admin=self.webpackChunkl_admin||[]).push([[68761],{68761:function(t,e,n){n.r(e);var i=n(58467),r=n(87785),o=n(59491),a=n(75590),c=n(46417);e.default=function(){var t=(0,i.s0)(),e=(0,a.$G)().t;return(0,c.jsxs)("div",{style:{textAlign:"center",paddingTop:100},children:[(0,c.jsx)("h2",{style:{lineHeight:"64px",fontSize:"64px",fontWeight:600},children:"404"}),(0,c.jsx)("p",{style:{fontSize:"20px",fontWeight:600},children:e("pageNotFound")}),(0,c.jsx)("div",{style:{margin:"24px auto 18px",width:"150px"},children:(0,c.jsx)(r.Z,{})}),(0,c.jsx)(o.ZP,{type:"primary",ghost:!0,shape:"round",onClick:function(){t(-1)},children:e("back")})]})}},87785:function(t,e,n){n.d(e,{Z:function(){return x}});var i=n(4942),r=n(29439),o=n(46123),a=n.n(o),c=n(47313),l=n(74714),d=n(40601),s=n(96122),h=n(73239),g=function(t){var e,n=t.componentCls,r=t.sizePaddingEdgeHorizontal,o=t.colorSplit,a=t.lineWidth;return(0,i.Z)({},n,Object.assign(Object.assign({},(0,d.Wf)(t)),(e={borderBlockStart:"".concat(a,"px solid ").concat(o),"&-vertical":{position:"relative",top:"-0.06em",display:"inline-block",height:"0.9em",margin:"0 ".concat(t.dividerVerticalGutterMargin,"px"),verticalAlign:"middle",borderTop:0,borderInlineStart:"".concat(a,"px solid ").concat(o)},"&-horizontal":{display:"flex",clear:"both",width:"100%",minWidth:"100%",margin:"".concat(t.dividerHorizontalGutterMargin,"px 0")}},(0,i.Z)(e,"&-horizontal".concat(n,"-with-text"),{display:"flex",alignItems:"center",margin:"".concat(t.dividerHorizontalWithTextGutterMargin,"px 0"),color:t.colorTextHeading,fontWeight:500,fontSize:t.fontSizeLG,whiteSpace:"nowrap",textAlign:"center",borderBlockStart:"0 ".concat(o),"&::before, &::after":{position:"relative",width:"50%",borderBlockStart:"".concat(a,"px solid transparent"),borderBlockStartColor:"inherit",borderBlockEnd:0,transform:"translateY(50%)",content:"''"}}),(0,i.Z)(e,"&-horizontal".concat(n,"-with-text-left"),{"&::before":{width:"5%"},"&::after":{width:"95%"}}),(0,i.Z)(e,"&-horizontal".concat(n,"-with-text-right"),{"&::before":{width:"95%"},"&::after":{width:"5%"}}),(0,i.Z)(e,"".concat(n,"-inner-text"),{display:"inline-block",padding:"0 1em"}),(0,i.Z)(e,"&-dashed",{background:"none",borderColor:o,borderStyle:"dashed",borderWidth:"".concat(a,"px 0 0")}),(0,i.Z)(e,"&-horizontal".concat(n,"-with-text").concat(n,"-dashed"),{"&::before, &::after":{borderStyle:"dashed none none"}}),(0,i.Z)(e,"&-vertical".concat(n,"-dashed"),{borderInlineStartWidth:a,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0}),(0,i.Z)(e,"&-plain".concat(n,"-with-text"),{color:t.colorText,fontWeight:"normal",fontSize:t.fontSize}),(0,i.Z)(e,"&-horizontal".concat(n,"-with-text-left").concat(n,"-no-default-orientation-margin-left"),(0,i.Z)({"&::before":{width:0},"&::after":{width:"100%"}},"".concat(n,"-inner-text"),{paddingInlineStart:r})),(0,i.Z)(e,"&-horizontal".concat(n,"-with-text-right").concat(n,"-no-default-orientation-margin-right"),(0,i.Z)({"&::before":{width:"100%"},"&::after":{width:0}},"".concat(n,"-inner-text"),{paddingInlineEnd:r})),e)))},p=(0,s.Z)("Divider",(function(t){var e=(0,h.TS)(t,{dividerVerticalGutterMargin:t.marginXS,dividerHorizontalWithTextGutterMargin:t.margin,dividerHorizontalGutterMargin:t.marginLG});return[g(e)]}),{sizePaddingEdgeHorizontal:0}),f=function(t,e){var n={};for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&e.indexOf(i)<0&&(n[i]=t[i]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(i=Object.getOwnPropertySymbols(t);r<i.length;r++)e.indexOf(i[r])<0&&Object.prototype.propertyIsEnumerable.call(t,i[r])&&(n[i[r]]=t[i[r]])}return n};var x=function(t){var e,n=c.useContext(l.E_),o=n.getPrefixCls,d=n.direction,s=t.prefixCls,h=t.type,g=void 0===h?"horizontal":h,x=t.orientation,b=void 0===x?"center":x,u=t.orientationMargin,m=t.className,v=t.rootClassName,w=t.children,Z=t.dashed,y=t.plain,z=f(t,["prefixCls","type","orientation","orientationMargin","className","rootClassName","children","dashed","plain"]),S=o("divider",s),k=p(S),j=(0,r.Z)(k,2),O=j[0],C=j[1],W=b.length>0?"-".concat(b):b,E=!!w,G="left"===b&&null!=u,H="right"===b&&null!=u,M=a()(S,C,"".concat(S,"-").concat(g),(e={},(0,i.Z)(e,"".concat(S,"-with-text"),E),(0,i.Z)(e,"".concat(S,"-with-text").concat(W),E),(0,i.Z)(e,"".concat(S,"-dashed"),!!Z),(0,i.Z)(e,"".concat(S,"-plain"),!!y),(0,i.Z)(e,"".concat(S,"-rtl"),"rtl"===d),(0,i.Z)(e,"".concat(S,"-no-default-orientation-margin-left"),G),(0,i.Z)(e,"".concat(S,"-no-default-orientation-margin-right"),H),e),m,v),B=Object.assign(Object.assign({},G&&{marginLeft:u}),H&&{marginRight:u});return O(c.createElement("div",Object.assign({className:M},z,{role:"separator"}),w&&"vertical"!==g&&c.createElement("span",{className:"".concat(S,"-inner-text"),style:B},w)))}}}]);