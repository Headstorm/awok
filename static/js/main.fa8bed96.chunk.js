(this["webpackJsonpproject-reckoning"]=this["webpackJsonpproject-reckoning"]||[]).push([[0],{72:function(e,n,t){e.exports=t.p+"static/media/headstorm_logo.872b2a80.png"},82:function(e,n,t){e.exports=t(96)},87:function(e,n,t){},96:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(10),o=t.n(c),l=(t(87),t(4)),i=t(21),u=t(12),m=t(17),s=t(5),d=t(6),f=t(127),g=t(35),h=t.n(g),p=t(53),v=function(e){fetch("https://yt6g0s41t1.execute-api.us-east-1.amazonaws.com/Prod/employee-count?TestedPositive=".concat(e),{method:"PATCH",mode:"cors"})},b=function(){var e=Object(p.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("https://yt6g0s41t1.execute-api.us-east-1.amazonaws.com/Prod/employee-count",{mode:"cors"}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),E=function(){var e=Object(p.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("https://yt6g0s41t1.execute-api.us-east-1.amazonaws.com/Prod/settings/Headstorm",{mode:"cors"}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),y=function(){var e=Object(p.a)(h.a.mark((function e(n){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("https://yt6g0s41t1.execute-api.us-east-1.amazonaws.com/Prod/settings",{mode:"cors",method:"POST",body:JSON.stringify(n)}));case 1:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),j=t(69),O=t.n(j);function w(){var e=Object(l.a)(["\n  text-align: center\n"]);return w=function(){return e},e}function x(){var e=Object(l.a)(["\n  display: grid;\n  grid-template-rows: auto;\n  grid-template-columns: auto;\n  grid-gap: 0.625rem;\n  padding: 0.625rem;\n  align-self: center;\n"]);return x=function(){return e},e}var k=s.a.div(x()),F=Object(d.a)((function(){return{root:{color:"#FFFFFF",backgroundColor:"#518DFD",marginBottom:"2rem",padding:".5rem 1.375rem"}}}))(f.a),C=s.a.h2(w()),S=Object(u.f)((function(e){var n=Object(a.useState)(0),t=Object(m.a)(n,2),c=t[0],o=t[1];Object(a.useEffect)((function(){b().then((function(e){return e.json()})).then((function(e){o(e.positiveCount+e.negativeCount)})).catch((function(e){return console.log(e)}))}));var l=c>1?"people checked in to go to the office today.":"person checked in to go to the office today.";return r.a.createElement(k,null,r.a.createElement(C,null,"You have checked in.",r.a.createElement("br",null),c," ",l,r.a.createElement("br",null),r.a.createElement("br",null),localStorage.getItem("successMessage")),r.a.createElement(F,{size:"large",variant:"contained",startIcon:r.a.createElement(O.a,null),onClick:function(){return n="/",void e.history.push(n);var n}},"Home Page"))}));function I(){var e=Object(l.a)(["\n  height: 3rem;\n  width: 3rem;\n  margin: 0 auto;\n"]);return I=function(){return e},e}function D(){var e=Object(l.a)(["\n  grid-column-start: 2;\n  display: flex;\n  flex-direction: column;\n  padding: 1rem;\n"]);return D=function(){return e},e}function P(){var e=Object(l.a)(["\n  display: grid;\n  grid-template-columns: auto auto;\n  padding-bottom: 1rem;\n  justify-content: center;\n"]);return P=function(){return e},e}function R(){var e=Object(l.a)(["\n  display: flex;\n  flex-direction: column;\n  margin: 0 auto;\n"]);return R=function(){return e},e}function z(){var e=Object(l.a)(["\n  grid-column-start: 1;\n  margin: 0;\n  border-radius: 50%;\n  display: block;\n  padding: 1rem;\n"]);return z=function(){return e},e}function N(){var e=Object(l.a)(["\n  fill: transparent;\n  stroke: #518dfd;\n  stroke-width: 26;\n"]);return N=function(){return e},e}function W(){var e=Object(l.a)(["\n  fill: transparent;\n  stroke: #dae2e5;\n  stroke-width: 26;\n"]);return W=function(){return e},e}var M=s.a.circle(W()),H=s.a.circle(N()),T=s.a.svg(z()),B=s.a.div(R()),L=s.a.div(P()),Y=s.a.div(D()),A=s.a.svg(I()),G=function(e){var n=e.value,t=2*Math.PI*44.5,a=n*t/100+" "+t,c=e.totalOccupancy-e.spotsTaken,o={strokeWidth:26},l={strokeWidth:26,strokeDasharray:a};return r.a.createElement(L,null,r.a.createElement(T,{width:115,height:115,className:"donutchart"},r.a.createElement(M,{r:44.5,cx:57.5,cy:57.5,transform:"rotate(-90 57.5,57.5)",style:o,className:"donutchart-track"}),r.a.createElement(H,{r:44.5,cx:57.5,cy:57.5,transform:"rotate(-90 57.5,57.5)",style:l,className:"donutchart-indicator"})),r.a.createElement(Y,null,r.a.createElement(B,null,r.a.createElement("label",null,r.a.createElement("b",null,c)," Spots Open"),r.a.createElement(A,null,r.a.createElement("circle",{cx:20,cy:20,r:10,fill:"#DAE2E5"}))),r.a.createElement(B,null,r.a.createElement("label",null,r.a.createElement("b",null,e.spotsTaken)," Checked In"),r.a.createElement(A,null,r.a.createElement("circle",{cx:20,cy:20,r:10,fill:"#518DFD"})))))},J=t(70),V=t.n(J);function $(){var e=Object(l.a)(["\n  color: #518dfd;\n  align-self: flex-end;\n"]);return $=function(){return e},e}function _(){var e=Object(l.a)(["\n  position: relative;\n  left: 10%;\n  right: 10%;\n  top: 10%;\n  bottom: 60%;\n  border-radius: 1px;\n  background: white;\n  padding: 1rem;\n  display: flex;\n  flex-direction: column;\n  width: 70%;\n"]);return _=function(){return e},e}function q(){var e=Object(l.a)(["\n  position: fixed;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n"]);return q=function(){return e},e}var K=s.a.div(q()),Q=s.a.div(_()),U=s.a.span($()),X=function(e){return r.a.createElement(K,null,r.a.createElement(Q,null,r.a.createElement("p",null,"Rules: ".concat(e.content)," "),r.a.createElement(U,{onClick:function(){return e.handleDismiss()}},"Dismiss")))};function Z(){var e=Object(l.a)(["\n  text-align: center;\n"]);return Z=function(){return e},e}function ee(){var e=Object(l.a)(["\n  grid-column-start: 2;\n  grid-row-start: 2;\n  text-align: center;\n"]);return ee=function(){return e},e}function ne(){var e=Object(l.a)(["\n  text-align: center;\n  padding-bottom: 2rem;\n  margin: 0;\n"]);return ne=function(){return e},e}function te(){var e=Object(l.a)(["\n  text-align: center;\n  padding: 0rem;\n  margin: 0;\n"]);return te=function(){return e},e}function ae(){var e=Object(l.a)(["\n  grid-column-start: 2;\n  text-align: center;\n  align-content: space-between;\n"]);return ae=function(){return e},e}function re(){var e=Object(l.a)(["\n  display: grid;\n  grid-template-columns: repeat(3, auto);\n  grid-gap: 0.625rem;\n  padding: 0.625rem;\n"]);return re=function(){return e},e}var ce=Object(d.a)((function(){return{root:{color:"#FFFFFF",backgroundColor:"#518DFD",marginBottom:"2rem",padding:".5rem 1.375rem"}}}))(f.a),oe=s.a.div(re()),le=s.a.div(ae()),ie=s.a.h2(te()),ue=s.a.h2(ne()),me=s.a.div(ee()),se=s.a.h3(Z()),de=Object(u.f)((function(e){var n=function(n){e.history.push(n)},t=Object(a.useState)(!1),c=Object(m.a)(t,2),o=c[0],l=c[1],i=Object(a.useState)(0),u=Object(m.a)(i,2),s=u[0],d=u[1],f=Object(a.useState)(0),g=Object(m.a)(f,2),h=g[0],p=g[1],v=Object(a.useState)(0),y=Object(m.a)(v,2),j=y[0],O=y[1],w=localStorage.getItem("occupancyRule");Object(a.useEffect)((function(){localStorage.clear(),E().then((function(e){return e.json()})).then((function(e){localStorage.setItem("successMessage",e.successMessage),localStorage.setItem("occupancyRule",e.occupancyRule),localStorage.setItem("currentRules",e.currentRules),localStorage.setItem("companyName",e.companyName)})).catch((function(e){console.log(e)})),b().then((function(e){return e.json()})).then((function(e){p(e.positiveCount),O(e.negativeCount),d((e.positiveCount+e.negativeCount)/w*100)})).catch((function(e){return console.log(e)}))}));var x=localStorage.getItem("checkInDate")===(new Date).toISOString().slice(0,10);return r.a.createElement(oe,null,r.a.createElement(le,null,x?r.a.createElement(ie,null,"You have already checked in today!"):r.a.createElement(ie,null,"Want to come into the office today?"),r.a.createElement(se,null,h+j," out of ",w," spots taken",r.a.createElement(V.a,{fontSize:"small",onClick:function(){return l(!0)}})),r.a.createElement("h3",null,"Today's checkins"),r.a.createElement(G,{value:s,spotsTaken:h+j,totalOccupancy:w}),x?null:r.a.createElement(ce,{size:"large",variant:"contained",onClick:function(){localStorage.getItem("covidDate")?n("/good-day"):n("/covid-check")}},"Check In")),x?null:r.a.createElement(me,null,r.a.createElement(ue,null,"Plan on working remote?"),r.a.createElement(ce,{size:"large",variant:"contained",onClick:function(){return n("/good-day")}},"Working Remote")),o?r.a.createElement(X,{handleDismiss:function(){l(!1)},content:localStorage.getItem("currentRules")}):null)})),fe=t(48),ge=t.n(fe),he=t(49),pe=t.n(he);function ve(){var e=Object(l.a)(["\n  grid-row-start: 1;\n  grid-column-start: 2;\n  margin-bottom: 2rem;\n  text-align: center;\n"]);return ve=function(){return e},e}function be(){var e=Object(l.a)(["\n  grid-row-start: 2;\n  grid-column-start: 2;\n  display: flex;\n  align-items: center;\n  flex-direction: row;\n  @media (max-width:425px) {\n    width: 100%;\n  }\n"]);return be=function(){return e},e}function Ee(){var e=Object(l.a)(["\n  display: grid;\n  grid-template-rows: repeat(3, auto);\n  grid-template-columns: repeat(3, auto);\n  grid-gap: 0.625rem;\n  padding: 0.625rem;\n"]);return Ee=function(){return e},e}var ye=Object(d.a)((function(){return{root:{color:"#FFFFFF",backgroundColor:"#518DFD",width:"50%",margin:"1rem","@media (max-width:425px)":{width:"100%"}}}}))(f.a),je=s.a.div(Ee()),Oe=s.a.div(be()),we=s.a.h2(ve()),xe=Object(u.f)((function(e){var n=function(n,t){localStorage.setItem("isPositive",t),e.history.push(n)};return r.a.createElement(je,null,r.a.createElement(we,null,"Have you ever tested positive for Covid-19?"),r.a.createElement(Oe,null,r.a.createElement(ye,{size:"large",variant:"contained",startIcon:r.a.createElement(ge.a,null),onClick:function(){return n("/covid-test-date",!0)}},"Yes"),r.a.createElement(ye,{size:"large",variant:"contained",startIcon:r.a.createElement(pe.a,null),onClick:function(){return n("/symptoms-screen",!1)}},"No")))})),ke=t(130),Fe=t(135),Ce=t(132);function Se(){var e=Object(l.a)(["\n  grid-row-start: 3;\n  grid-column-start: 2;\n  text-align: center;\n"]);return Se=function(){return e},e}function Ie(){var e=Object(l.a)(["\n  grid-row-start: 2;\n  grid-column-start: 2;\n  text-align: center;\n  padding-bottom: 2rem;\n"]);return Ie=function(){return e},e}function De(){var e=Object(l.a)(["\n  margin-bottom: 2rem;\n  grid-row-start: 1;\n  grid-column-start: 2;\n  text-align: center;\n"]);return De=function(){return e},e}function Pe(){var e=Object(l.a)(["\n  display: grid;\n  grid-template-rows: repeat(4, auto);\n  grid-template-columns: repeat(3, auto);\n  grid-gap: 0.625rem;\n  padding: 0.625rem;\n"]);return Pe=function(){return e},e}function Re(){var e=Object(l.a)(["\n  grid-row-start: 4;\n  grid-column-start: 2;\n  text-align: center;\n"]);return Re=function(){return e},e}var ze=Object(d.a)((function(){return{root:{color:"#FFFFFF",backgroundColor:"#518DFD",marginBottom:"2rem",width:"50%","@media (max-width:425px)":{width:"100%"}}}}))(f.a),Ne=s.a.div(Re()),We=s.a.div(Pe()),Me=s.a.div(De()),He=s.a.form(Ie()),Te=s.a.div(Se()),Be=Object(u.f)((function(e){var n=Object(a.useState)(!1),t=Object(m.a)(n,2),c=t[0],o=t[1],l=Object(a.useState)(),i=Object(m.a)(l,2),u=i[0],s=i[1],d=new Date,f=d.toISOString().slice(0,10),g=new Date(d-12096e5).toISOString().slice(0,10);return r.a.createElement(We,null,r.a.createElement(Me,null,r.a.createElement("h2",null,"When did you test positive?",r.a.createElement("br",null),r.a.createElement("br",null),"We will use this information to alert other people who have visited this office.")),r.a.createElement(He,{noValidate:!0},r.a.createElement(ke.a,{type:"date",defaultValue:f,onChange:function(e){s(e.target.value)}})),r.a.createElement(Te,null,r.a.createElement(Fe.a,{control:r.a.createElement(Ce.a,{onChange:function(e){o(!c)}}),label:"Remember my answer on this device"})),r.a.createElement(Ne,null,r.a.createElement(ze,{size:"large",variant:"contained",onClick:function(){var n;u>=g?(n="/covid-positive",e.history.push(n)):(v(localStorage.getItem("isPositive")),e.history.push("/good-day"),c&&localStorage.setItem("covidDate",u))}},"Check In")))}));function Le(){var e=Object(l.a)(["\n  grid-row-start: 2;\n  grid-column-start: 3;\n  align-items: center;\n"]);return Le=function(){return e},e}function Ye(){var e=Object(l.a)(["\n  margin-bottom: 2rem;\n  grid-row-start: 1;\n  grid-column-start: 3;\n  text-align: center;\n"]);return Ye=function(){return e},e}function Ae(){var e=Object(l.a)(["\n  display: grid;\n  grid-template-rows: repeat(2, auto);\n  grid-template-columns: repeat(5, auto);\n  grid-gap: 0.625rem;\n  padding: 0.625rem;\n  text-align: center;\n"]);return Ae=function(){return e},e}var Ge=Object(d.a)((function(){return{root:{color:"#FFFFFF",backgroundColor:"#518DFD",width:"50%","@media (max-width:425px)":{width:"100%"}}}}))(f.a),Je=s.a.div(Ae()),Ve=s.a.h2(Ye()),$e=s.a.div(Le()),_e=Object(u.f)((function(e){return r.a.createElement(Je,null,r.a.createElement(Ve,null,"Going to work with these symptoms puts the rest of your office at risk.",r.a.createElement("br",null),r.a.createElement("br",null),"Please work from home today."),r.a.createElement($e,null,r.a.createElement(Ge,{size:"large",variant:"contained",onClick:function(){return n="/wfh-conf",void e.history.push(n);var n}},"Going back home")))}));function qe(){var e=Object(l.a)(["\n  display: flex;\n  align-items: center;\n  flex-direction: row;\n  width: 60%;\n  text-align: center;\n  justify-content: center;\n  @media (max-width:425px) {\n    width: 100%;\n  }\n"]);return qe=function(){return e},e}function Ke(){var e=Object(l.a)(["\n  display: flex;\n  flex-direction: column;\n  text-align: center;\n\n  h3 {\n    margin-top: 0rem;\n  }\n\n  .left-column {\n  }\n\n  .right-column {\n  }\n"]);return Ke=function(){return e},e}function Qe(){var e=Object(l.a)(["\n  display: flex;\n  justify-content: space-evenly;\n"]);return Qe=function(){return e},e}function Ue(){var e=Object(l.a)(["\n  margin-bottom: 0.5rem;\n\n  h2 {\n    text-align: center;\n  }\n"]);return Ue=function(){return e},e}function Xe(){var e=Object(l.a)(["\n  display: flex;\n  flex-direction: column;\n  margin: 0rem 2rem 0rem 2rem;\n  flex: 1 0;\n  align-items: center;\n"]);return Xe=function(){return e},e}var Ze=Object(d.a)((function(){return{root:{color:"#FFFFFF",backgroundColor:"#518DFD",width:"50%",margin:"1rem","@media (max-width:425px)":{width:"100%",margin:".5rem"}}}}))(f.a),en=s.a.div(Xe()),nn=s.a.div(Ue()),tn=s.a.div(Qe()),an=s.a.div(Ke()),rn=s.a.div(qe()),cn=Object(u.f)((function(e){return r.a.createElement(en,null,r.a.createElement(nn,null,r.a.createElement("h2",null,"Have you experienced any of the following in the last 2-14 days?"),r.a.createElement(tn,null,r.a.createElement(an,{className:"left-column"},r.a.createElement("h3",null,"Fever/Chills"),r.a.createElement("h3",null,"Shortness of breath"),r.a.createElement("h3",null,"Difficulty breathing"),r.a.createElement("h3",null,"Sore throat"),r.a.createElement("h3",null,"Congestion"),r.a.createElement("h3",null,"Diarrhea"),r.a.createElement("h3",null,"Fatigue")),r.a.createElement(an,{className:"right-column"},r.a.createElement("h3",null,"Headache"),r.a.createElement("h3",null,"New loss of taste/smell"),r.a.createElement("h3",null,"Muscle/Body aches"),r.a.createElement("h3",null,"Cough"),r.a.createElement("h3",null,"Runny nose"),r.a.createElement("h3",null,"Nausea"),r.a.createElement("h3",null,"Vomiting")))),r.a.createElement(rn,null,r.a.createElement(Ze,{size:"large",variant:"contained",startIcon:r.a.createElement(ge.a,null),onClick:function(){return n="/safety-rejection",void e.history.push(n);var n}},"Yes"),r.a.createElement(Ze,{size:"large",variant:"contained",startIcon:r.a.createElement(pe.a,null),onClick:function(){v(localStorage.getItem("isPositive")),e.history.push("/good-day"),localStorage.setItem("checkInDate",(new Date).toISOString().slice(0,10))}},"No")))}));function on(){var e=Object(l.a)(["\n  grid-row-start: 1;\n  grid-column-start: 3;\n  text-align: center;\n"]);return on=function(){return e},e}function ln(){var e=Object(l.a)(["\n  display: grid;\n  grid-template-rows: repeat(3, auto);\n  grid-template-columns: repeat(5, auto);\n  grid-gap: 0.625rem;\n  padding: 0.625rem;\n  align-self: center;\n"]);return ln=function(){return e},e}var un=s.a.div(ln()),mn=s.a.h2(on()),sn=function(e){return r.a.createElement(un,null,r.a.createElement(mn,null,"Thank you for helping to keep the office safe and healthy.",r.a.createElement("br",null),r.a.createElement("br",null),"Please remember to reach out to your Project Lead via Slack or email if you need to take some time off"))};function dn(){var e=Object(l.a)(["\n  flex-direction: column;\n  align-self: center;\n  padding: 2rem;\n  flex: 1 0 auto;\n"]);return dn=function(){return e},e}var fn=s.a.div(dn()),gn=function(e){return r.a.createElement(fn,null,r.a.createElement("h2",null,"You have already checked in for the day. Please come back tomorrow to check in again!"))},hn=t(51),pn=t(71),vn=t(134),bn=t(131);function En(){var e=Object(l.a)(["\n  position: inherit !important;\n  margin-right: auto;\n  margin-left: 2rem;\n"]);return En=function(){return e},e}function yn(){var e=Object(l.a)(["\n  align-self: flex-end;\n  margin: 0rem 2rem 1rem 1rem !important;\n  width: 8rem;\n  background-color: #288bea !important;\n  color: #ffffff !important;\n"]);return yn=function(){return e},e}function jn(){var e=Object(l.a)(["\n  display: flex;\n  justify-content: flex-end;\n  align-items: flex-start;\n"]);return jn=function(){return e},e}function On(){var e=Object(l.a)(["\n  margin-bottom: 1rem !important;\n"]);return On=function(){return e},e}function wn(){var e=Object(l.a)(["\n  margin: 3rem 2rem 0rem 2rem;\n"]);return wn=function(){return e},e}function xn(){var e=Object(l.a)(["\n  display: flex;\n  flex: 1 0;\n  flex-direction: column;\n  justify-content: space-between;\n"]);return xn=function(){return e},e}var kn=s.a.div(xn()),Fn=s.a.div(wn()),Cn=Object(s.a)(ke.a)(On()),Sn=s.a.div(jn()),In=Object(s.a)(f.a)(yn()),Dn=Object(s.a)(vn.a)(En()),Pn=Object(u.f)((function(e){var n=Object(a.useState)({companyName:"",occupancyRule:"",currentRules:"",successMessage:""}),t=Object(m.a)(n,2),c=t[0],o=t[1],l=Object(a.useState)(!1),i=Object(m.a)(l,2),u=i[0],s=i[1],d=Object(a.useState)(!0),f=Object(m.a)(d,2),g=f[0],h=f[1];Object(a.useEffect)((function(){E().then((function(e){return e.json()})).then((function(e){o(e)})).catch((function(e){console.log(e)}))}),[]);var p=function(e){o(Object(pn.a)({},c,Object(hn.a)({},e.target.getAttribute("name"),e.target.value)))};return r.a.createElement(kn,null,r.a.createElement(Fn,null,r.a.createElement("form",null,r.a.createElement(Cn,{InputLabelProps:{shrink:!0},fullWidth:!0,type:"text",placeholder:"e.g. Headstorm",name:"companyName",value:c.companyName,onChange:function(e){return p(e)},label:"Company Name"}),r.a.createElement(Cn,{InputLabelProps:{shrink:!0},type:"number",name:"occupancyRule",placeholder:"e.g. 25",onChange:function(e){return p(e)},value:c.occupancyRule,fullWidth:!0,label:"Occupancy Rule"}),r.a.createElement(Cn,{InputLabelProps:{shrink:!0},type:"text",name:"currentRules",placeholder:"e.g. Rule 1, Rule 2, ...",onChange:function(e){return p(e)},value:c.currentRules,fullWidth:!0,label:"Current Rules"}),r.a.createElement(Cn,{InputLabelProps:{shrink:!0},type:"text",fullWidth:!0,placeholder:"e.g. Have a good day!",onChange:function(e){return p(e)},name:"successMessage",value:c.successMessage,label:"Success Message"}))),r.a.createElement(Sn,null,r.a.createElement(Dn,{autoHideDuration:3e3,anchorOrigin:{vertical:"bottom",horizontal:"left"},open:u,onClose:function(e,n){"clickaway"!==n&&s(!1)}},g?r.a.createElement(bn.a,{severity:"success"},"Saved"):r.a.createElement(bn.a,{severity:"error"},"Error saving")),r.a.createElement(In,{size:"large",variant:"contained",onClick:function(){return y(c).then((function(e){return e.json()})).then((function(e){console.log(e)})).catch((function(e){console.log(e),h(!1)})),void s(!0)}},"Save")))})),Rn=t(72),zn=t.n(Rn);function Nn(){var e=Object(l.a)(["\n  margin-left: auto;\n"]);return Nn=function(){return e},e}function Wn(){var e=Object(l.a)(["\n  width: 20%;\n  height: 20%;\n  @media (max-width: 425px) {\n    width: 50%;\n    height: 50%;\n  }\n"]);return Wn=function(){return e},e}function Mn(){var e=Object(l.a)(["\n  display: flex;\n  flex-direction: row;\n  padding: 1.5rem;\n  background-color: rgb(209, 224, 224, 30%);\n  border-bottom: 0.2rem solid #d1e0e0;\n  max-height: 1.5rem;\n"]);return Mn=function(){return e},e}var Hn=s.a.div(Mn()),Tn=s.a.img(Wn()),Bn=s.a.div(Nn()),Ln=Object(u.f)((function(e){var n=!["/","/safety-rejection"].includes(e.location.pathname),t=Object(a.useState)(0),c=Object(m.a)(t,2),o=c[0],l=c[1],i=localStorage.getItem("occupancyRule");return Object(a.useEffect)((function(){b().then((function(e){return e.json()})).then((function(e){l(e.positiveCount+e.negativeCount)})).catch((function(e){return console.log(e)}))})),r.a.createElement(Hn,null,r.a.createElement(Tn,{src:zn.a}),n?r.a.createElement(Bn,null,"Checked In ",o," / ",i):null)}));function Yn(){var e=Object(l.a)(["\n  padding: 1rem;\n  text-align: center;\n  background-color: rgb(209, 224, 224, 30%);\n"]);return Yn=function(){return e},e}var An=s.a.div(Yn()),Gn=Object(u.f)((function(){return r.a.createElement(An,null,"All answers are completely anonymous. We do not track your phone, location, or anything about you")}));function Jn(){var e=Object(l.a)(["\n  margin-bottom: 2rem;\n  grid-row-start: 1;\n  grid-column-start: 2;\n  text-align: center;\n"]);return Jn=function(){return e},e}function Vn(){var e=Object(l.a)(["\n  display: grid;\n  grid-template-rows: repeat(2, auto);\n  grid-template-columns: repeat(3, auto);\n  grid-gap: 0.625rem;\n  padding: 0.625rem;\n"]);return Vn=function(){return e},e}var $n=Object(d.a)((function(){return{root:{color:"#FFFFFF",backgroundColor:"#D96239","grid-row-start":2,"grid-column-start":2}}}))(f.a),_n=s.a.div(Vn()),qn=s.a.h2(Jn()),Kn=Object(u.f)((function(e){return r.a.createElement(_n,null,r.a.createElement(qn,null,'CDC Guidelines state "Stay home until 14 days after your last exposure"',r.a.createElement("br",null),r.a.createElement("br",null),"Please work from home today."),r.a.createElement($n,{size:"large",variant:"contained",onClick:function(){return n="/wfh-conf",void e.history.push(n);var n}},"Going back home"))}));function Qn(){var e=Object(l.a)(["\n  display: flex;\n  flex-flow: column;\n  justify-content: space-between;\n  min-height: 100vh;\n"]);return Qn=function(){return e},e}var Un=s.a.div(Qn());var Xn=function(){return r.a.createElement(i.a,null,r.a.createElement(Un,null,r.a.createElement(Ln,null),r.a.createElement(u.c,null,r.a.createElement(u.a,{path:"/check-in"},r.a.createElement(de,null)),r.a.createElement(u.a,{path:"/covid-check"},r.a.createElement(xe,null)),r.a.createElement(u.a,{path:"/covid-test-date"},r.a.createElement(Be,null)),r.a.createElement(u.a,{path:"/good-day"},r.a.createElement(S,null)),r.a.createElement(u.a,{path:"/safety-rejection"},r.a.createElement(_e,null)),r.a.createElement(u.a,{path:"/symptoms-screen"},r.a.createElement(cn,null)),r.a.createElement(u.a,{path:"/wfh-conf"},r.a.createElement(sn,null)),r.a.createElement(u.a,{path:"/covid-positive"},r.a.createElement(Kn,null)),r.a.createElement(u.a,{path:"/already-checked-in"},r.a.createElement(gn,null)),r.a.createElement(u.a,{path:"/admin"},r.a.createElement(Pn,null)),r.a.createElement(u.a,{path:"/"},r.a.createElement(de,null))),r.a.createElement(Gn,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Xn,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[82,1,2]]]);
//# sourceMappingURL=main.fa8bed96.chunk.js.map