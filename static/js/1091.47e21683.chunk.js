"use strict";(self.webpackChunkl_admin=self.webpackChunkl_admin||[]).push([[1091,69155],{3355:function(e,n,r){r.d(n,{Z:function(){return c}});r(47313);var t=r(52917),i=r(20377);var a=r(46417),c=function(e){var n=e.title,r=e.subTitle,c=e.extra,s=e.children,l=e.onBack,d={wrap:(0,i.l)((function(){return{color:"#000000d9",fontSize:"14px",position:"relative",padding:"16px 24px",backgroundColor:"#fff"}})),head:(0,i.l)((function(){return{display:"flex",justifyContent:"space-between"}})),headLeft:(0,i.l)((function(){return{display:"flex",alignItems:"center",margin:"4px 0",overflow:"hidden"}})),headBack:(0,i.l)((function(){return{marginRight:"16px",fontSize:"16px",lineHeight:1}})),headBackButton:(0,i.l)((function(e){return{display:"inline-block",transition:"color .3s",color:e.token.colorPrimary,cursor:"pointer"}})),headTitle:(0,i.l)((function(){return{marginRight:"12px",color:"#000000d9",fontWeight:600,fontSize:"20px",lineHeight:"32px",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}})),headSubTitle:(0,i.l)((function(){return{marginRight:"12px",color:"#00000073",fontSize:"14px",lineHeight:"1.5715",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}})),headExtra:(0,i.l)((function(){return{margin:"4px 0",whiteSpace:"nowrap","&>*":{marginLeft:"12px",whiteSpace:"unset"},"&>*:first-child":{marginLeft:0}}})),content:(0,i.l)((function(){return{paddingTop:"12px"}}))};return(0,a.jsxs)("div",{className:d.wrap,children:[(0,a.jsxs)("div",{className:d.head,children:[(0,a.jsxs)("div",{className:d.headLeft,children:[(0,a.jsx)("div",{className:d.headBack,children:(0,a.jsx)("div",{className:d.headBackButton,onClick:l,children:(0,a.jsx)(t.Z,{})})}),(0,a.jsx)("span",{className:d.headTitle,children:n}),(0,a.jsx)("span",{className:d.headSubTitle,children:r})]}),(0,a.jsx)("div",{className:d.headExtra,children:c})]}),(0,a.jsx)("div",{className:d.content,children:s})]})}},20377:function(e,n,r){r.d(n,{l:function(){return a}});var t=r(838),i=r(92465),a=function(e){var n=i.Z.useToken();return(0,t.iv)(e(n))}},14820:function(e,n,r){r.r(n);var t=r(74165),i=r(15861),a=r(29439),c=r(47313),s=r(96333),l=r(56744),d=r(59491),u=r(83725),o=r(68197),h=r(59624),f=r(14391),x=r(35795),p=r(32697),Z=r(58467),m=r(3355),j=r(75590),v=r(69155),g=r(46417);n.default=function(){var e=(0,Z.UO)(),n=(0,Z.s0)(),r=(0,j.$G)().t,b=s.Z.useApp().message,w=l.Z.useForm(),k=(0,a.Z)(w,1)[0],y=(0,c.useState)(!1),I=(0,a.Z)(y,2),S=I[0],B=I[1],N=(0,c.useState)(!1),P=(0,a.Z)(N,2),T=P[0],q=P[1],C=(0,c.useMemo)((function(){return e.id?r("edit"):r("add")}),[e.id,r]),z=function(){var e=(0,i.Z)((0,t.Z)().mark((function e(){var i;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,k.validateFields();case 3:return i=e.sent,q(!0),e.next=7,(0,v.saveProduct)(i);case 7:q(!1),b.success(r("whatSuccess",{what:r("save")})),n(-1),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),q(!1);case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(){return e.apply(this,arguments)}}(),L=(0,c.useCallback)((0,i.Z)((0,t.Z)().mark((function n(){var r;return(0,t.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!e.id){n.next=13;break}return B(!0),n.prev=2,n.next=5,(0,v.getProductById)(e.id);case 5:r=n.sent,k.setFieldsValue(r.data),B(!1),n.next=13;break;case 10:n.prev=10,n.t0=n.catch(2),B(!1);case 13:case"end":return n.stop()}}),n,null,[[2,10]])}))),[e.id,k]);return(0,c.useEffect)((function(){L()}),[L]),(0,g.jsx)(m.Z,{title:C,onBack:function(){return n(-1)},extra:(0,g.jsx)(d.ZP,{type:"primary",onClick:z,loading:T,children:r("save")}),children:(0,g.jsx)(u.Z,{loading:S,active:!0,children:(0,g.jsx)(l.Z,{form:k,children:(0,g.jsxs)(o.Z,{gutter:24,children:[(0,g.jsx)(h.Z,{span:8,children:(0,g.jsx)(l.Z.Item,{name:"name",label:"name",rules:[{required:!0}],children:(0,g.jsx)(f.Z,{})})}),(0,g.jsx)(h.Z,{span:8,children:(0,g.jsx)(l.Z.Item,{name:"brand",label:"brand",rules:[{required:!0}],children:(0,g.jsx)(f.Z,{})})}),(0,g.jsx)(h.Z,{span:8,children:(0,g.jsx)(l.Z.Item,{name:"category",label:"category",rules:[{required:!0}],children:(0,g.jsx)(f.Z,{})})}),(0,g.jsx)(h.Z,{span:8,children:(0,g.jsx)(l.Z.Item,{name:"price",label:"price",rules:[{required:!0}],children:(0,g.jsx)(x.Z,{style:{width:"100%"},min:0,precision:2})})}),(0,g.jsx)(h.Z,{span:8,children:(0,g.jsx)(l.Z.Item,{name:"color",label:"color",rules:[{required:!0}],children:(0,g.jsx)(f.Z,{})})}),(0,g.jsx)(h.Z,{span:8,children:(0,g.jsx)(l.Z.Item,{name:"inventory",label:"inventory",rules:[{required:!0}],children:(0,g.jsx)(x.Z,{style:{width:"100%"},min:0,precision:0})})}),(0,g.jsx)(h.Z,{span:8,children:(0,g.jsx)(l.Z.Item,{name:"style",label:"style",rules:[{required:!0}],children:(0,g.jsx)(f.Z,{})})}),(0,g.jsx)(h.Z,{span:8,children:(0,g.jsx)(l.Z.Item,{name:"enable",label:"enable",valuePropName:"checked",children:(0,g.jsx)(p.Z,{})})}),(0,g.jsx)(h.Z,{span:24,children:(0,g.jsx)(l.Z.Item,{name:"describe",label:"describe",children:(0,g.jsx)(f.Z.TextArea,{})})})]})})})})}},69155:function(e,n,r){r.r(n),r.d(n,{deleteProductByIds:function(){return s},getProductById:function(){return a},getProducts:function(){return l},saveProduct:function(){return c}});var t=r(67037),i=r(84312),a=function(e){return t.Z.get(i.j,{params:{id:e}})},c=function(e){return t.Z.post(i.j,e)},s=function(e){return t.Z.delete(i.j,{data:e})},l=function(e){return t.Z.post(i.jN,e)}},67440:function(e,n,r){r.d(n,{Z:function(){return l}});var t=r(87462),i=r(47313),a={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"}}]},name:"down",theme:"outlined"},c=r(17469),s=function(e,n){return i.createElement(c.Z,(0,t.Z)({},e,{ref:n,icon:a}))};var l=i.forwardRef(s)},59624:function(e,n,r){var t=r(26297);n.Z=t.Z},68197:function(e,n,r){var t=r(84268);n.Z=t.Z}}]);