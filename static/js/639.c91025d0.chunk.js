"use strict";(self.webpackChunkl_admin=self.webpackChunkl_admin||[]).push([[639],{4569:function(e,n,t){t(7313);var r=t(8267),i=t(9527),a=t(5590),o=t(6417);n.Z=function(e){var n=(0,a.$G)().i18n;return(0,o.jsx)(r.Z,{menu:{onClick:function(e){n.changeLanguage(e.key)},selectedKeys:[n.language],items:[{label:"English",key:"en"},{label:"\u4e2d\u6587",key:"zh-CN"}]},children:(0,o.jsx)("span",{className:e.className,style:{fontSize:"16px"},children:(0,o.jsx)(i.Z,{})})})}},377:function(e,n,t){t.d(n,{l:function(){return a}});var r=t(838),i=t(2465),a=function(e){var n=i.Z.useToken();return(0,r.iv)(e(n))}},4622:function(e,n,t){t.r(n),t.d(n,{default:function(){return i}});var r=t(377);function i(){return{wrap:(0,r.l)((function(){return{height:"100%"}})),header:(0,r.l)((function(e){return{display:"flex",alignItems:"center",padding:"0 16px",color:e.token.colorWhite}})),headerLogo:(0,r.l)((function(e){return{fontWeight:600,fontSize:"18px","&>a":{display:"flex",alignItems:"center",color:e.token.colorWhite,"&>img":{width:"38px",height:"38px"}}}})),headerCenter:(0,r.l)((function(){return{flex:1}})),headerRight:(0,r.l)((function(){return{display:"flex"}})),headerRightItem:(0,r.l)((function(){return{padding:"0 12px",cursor:"pointer",transition:"all 0.3s","&:hover":{backgroundColor:"#252a3d"}}})),headerRightItemUser:(0,r.l)((function(){return{display:"flex",alignItems:"center"}})),sliderContent:(0,r.l)((function(e){var n=e.token;return{height:"100%",overflow:"auto",borderBottomWidth:n.lineWidthBold,borderBottomStyle:"solid",borderBottomColor:n.colorBorderSecondary}})),content:(0,r.l)((function(e){return{backgroundColor:e.token.colorBgContainer,overflow:"hidden"}}))}}},2464:function(e,n,t){t.r(n),t.d(n,{default:function(){return W}});var r=t(3433),i=t(9439),a=t(7313);var o=t.p+"static/media/logo.6cc989de70f05ea14f567691dc7fafca.svg",l=t.p+"static/media/user.78e68eaaf4b22ad842d9.png",s=t(6252),c=t(9548),u=t(9297),d=t(5508),h=t(7105),f=t(759),m=t(8267),p=t(3918),g=t(1864),x=t(5347),j=t(8467),v=t(4569),C=t(340),y=t(8216),k=t(5042),Z=t(1644),b=t(4622),N=t(6241),S=t(5590),I=t(6417),R=d.Z.Header,w=d.Z.Content,O=d.Z.Sider,W=function(){var e=(0,a.useState)([]),n=(0,i.Z)(e,2),t=n[0],W=n[1],B=(0,a.useState)([]),z=(0,i.Z)(B,2),E=z[0],L=z[1],T=(0,a.useState)([]),K=(0,i.Z)(T,2),P=K[0],_=K[1],G=(0,a.useState)([]),H=(0,i.Z)(G,2),U=H[0],$=H[1],A=(0,b.default)(),D=(0,j.s0)(),M=(0,j.TH)().pathname,Y=h.Z.useApp(),q=Y.modal,F=Y.message,J=(0,C.C)((function(e){var n;return null===(n=e.theme.token)||void 0===n?void 0:n.colorPrimary})),Q=(0,C.C)((function(e){return e.menuData.data})),V=(0,C.C)((function(e){return e.userInfo})),X=(0,C.T)(),ee=(0,S.$G)().t;(0,a.useEffect)((function(){W([M]);var e=M.split("/");L(e.slice(1,-1).map((function(e){return"/".concat(e)}))),_(e.slice(1).reduce((function(e,n){return e.push({title:ee(n)}),e}),[]))}),[M,D,ee]);var ne=(0,j.pC)(),te=(0,a.createRef)();return(0,a.useEffect)((function(){$([{key:"/",icon:(0,I.jsx)(s.Z,{}),label:ee("homePage")}].concat((0,r.Z)(function e(n,t){var r=[];return n.forEach((function(n){if(!n.hidden){var i={key:t?"".concat(t.path).concat(n.path):n.path,icon:n.icon,label:ee(n.name)};n.children&&Q.length&&(i.children=e(n.children,n)),r.push(i)}})),r}(Q)),[{key:"/personalCenter",icon:(0,I.jsx)(c.Z,{}),label:ee("personalCenter")}]))}),[Q,ee]),(0,I.jsxs)(d.Z,{className:A.wrap,children:[(0,I.jsxs)(R,{className:A.header,children:[(0,I.jsx)("div",{className:A.headerLogo,children:(0,I.jsxs)("a",{href:"/",children:[(0,I.jsx)("img",{src:o,alt:"logo"}),"l-admin"]})}),(0,I.jsx)("div",{className:A.headerCenter}),(0,I.jsxs)("div",{className:A.headerRight,children:[(0,I.jsx)(f.Z,{trigger:"hover",value:J,onChange:function(e,n){X((0,y.M)(n))},children:(0,I.jsx)(u.Z,{style:{fontSize:"16px"},className:A.headerRightItem})}),(0,I.jsx)(m.Z,{menu:{items:[{label:(0,I.jsx)("span",{children:ee("personalCenter")}),key:"personalCenter",onClick:function(){D("/personalCenter")}},{type:"divider"},{label:(0,I.jsx)("span",{children:ee("logOut")}),key:"logOut",onClick:function(){q.confirm({title:ee("tip"),content:ee("areYouSureToLogOut"),onOk:function(){F.loading(ee("signingOutPleaseWait"),0),setTimeout((function(){N._.clear().then((function(){F.destroy(),D("/login",{replace:!0})}))}),500)}})}}]},children:(0,I.jsxs)("span",{className:"".concat(A.headerRightItem," ").concat(A.headerRightItemUser),children:[(0,I.jsx)(p.C,{size:"small",src:l}),(0,I.jsx)("span",{style:{marginLeft:"8px"},children:V.userName})]})}),(0,I.jsx)(v.Z,{className:A.headerRightItem})]})]}),(0,I.jsxs)(d.Z,{children:[(0,I.jsx)(O,{onCollapse:function(e){if(!e){var n=M.split("/");L(n.slice(1,-1).map((function(e){return"/".concat(e)})))}},collapsible:!0,collapsedWidth:48,width:208,theme:"light",children:(0,I.jsx)("div",{className:A.sliderContent,children:(0,I.jsx)(g.Z,{mode:"inline",onClick:function(e){D(e.key)},selectedKeys:t,onSelect:function(e){W([e.key])},openKeys:E,onOpenChange:function(e){L(e)},items:U})})}),(0,I.jsxs)(d.Z,{style:{padding:"0 24px 24px"},children:[(0,I.jsx)(x.Z,{style:{margin:"16px 0"},items:P}),(0,I.jsx)(w,{className:A.content,children:(0,I.jsx)(k.Z,{children:(0,I.jsx)(Z.Z,{nodeRef:te,timeout:300,classNames:"transition-scale",unmountOnExit:!0,children:(0,I.jsx)("div",{style:{height:"100%"},ref:te,children:ne})},M)})})]})]})]})}}}]);