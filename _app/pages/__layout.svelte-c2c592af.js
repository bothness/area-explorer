import{S as s,i as t,s as e,e as a,t as c,c as l,a as r,g as o,d as n,b as i,f as h,D as f,E as m,F as v,G as u,H as d,k as g,I as p,n as $,J as w,K as y,L as k,j as E,m as b,o as x,M as I,N as O,O as G,x as z,u as L,v as A,y as M}from"../chunks/vendor-0db0d0ac.js";import{t as N}from"../chunks/config-408aebb3.js";import{a as S}from"../chunks/paths-6758d194.js";function C(s){let t,e,v,u;return{c(){t=a("nav"),e=a("div"),v=a("strong"),u=c("Warning! This is a prototype. Data likely to contain inaccuracies."),this.h()},l(s){t=l(s,"NAV",{class:!0});var a=r(t);e=l(a,"DIV",{class:!0});var c=r(e);v=l(c,"STRONG",{});var i=r(v);u=o(i,"Warning! This is a prototype. Data likely to contain inaccuracies."),i.forEach(n),c.forEach(n),a.forEach(n),this.h()},h(){i(e,"class","col-wide middle"),i(t,"class","warning svelte-cnxfzf")},m(s,a){h(s,t,a),f(t,e),f(e,v),f(v,u)},p:m,i:m,o:m,d(s){s&&n(t)}}}class D extends s{constructor(s){super(),t(this,s,null,C,e,{})}}function V(s){let t,e;return{c(){t=a("img"),this.h()},l(s){t=l(s,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){d(t.src,e=S+"/img/ons-logo-black-en.svg")||i(t,"src",e),i(t,"alt","Office for National Statistics"),i(t,"class","svelte-1az9tmh")},m(s,e){h(s,t,e)},p:m,d(s){s&&n(t)}}}function H(s){let t,e;return{c(){t=a("img"),this.h()},l(s){t=l(s,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){d(t.src,e=S+"/img/ons-logo-pos-en.svg")||i(t,"src",e),i(t,"alt","Office for National Statistics"),i(t,"class","svelte-1az9tmh")},m(s,e){h(s,t,e)},p:m,d(s){s&&n(t)}}}function T(s){let t,e;return{c(){t=a("img"),this.h()},l(s){t=l(s,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){d(t.src,e=S+"/img/ons-logo-neg-en.svg")||i(t,"src",e),i(t,"alt","Office for National Statistics"),i(t,"class","svelte-1az9tmh")},m(s,e){h(s,t,e)},p:m,d(s){s&&n(t)}}}function j(s){let t,e,c,o,u;function d(s,t){return"dark"==s[0].name?T:1==s[1]?H:V}let g=d(s),p=g(s);return{c(){t=a("nav"),e=a("div"),c=a("a"),o=a("picture"),p.c(),this.h()},l(s){t=l(s,"NAV",{style:!0,class:!0});var a=r(t);e=l(a,"DIV",{class:!0});var i=r(e);c=l(i,"A",{href:!0,class:!0});var h=r(c);o=l(h,"PICTURE",{class:!0});var f=r(o);p.l(f),f.forEach(n),h.forEach(n),i.forEach(n),a.forEach(n),this.h()},h(){i(o,"class","svelte-1az9tmh"),i(c,"href","https://www.ons.gov.uk/"),i(c,"class","svelte-1az9tmh"),i(e,"class","col-wide middle"),v(e,"center",s[2]),i(t,"style",u="border-bottom-color: "+s[0].muted+"; "+(s[1]?"background-color: "+s[0].background+";":"")),i(t,"class","svelte-1az9tmh")},m(s,a){h(s,t,a),f(t,e),f(e,c),f(c,o),p.m(o,null)},p(s,[a]){g===(g=d(s))&&p?p.p(s,a):(p.d(1),p=g(s),p&&(p.c(),p.m(o,null))),4&a&&v(e,"center",s[2]),3&a&&u!==(u="border-bottom-color: "+s[0].muted+"; "+(s[1]?"background-color: "+s[0].background+";":""))&&i(t,"style",u)},i:m,o:m,d(s){s&&n(t),p.d()}}}function R(s,t,e){let{theme:a=u("theme")}=t,{filled:c=!0}=t,{center:l=!1}=t;return s.$$set=s=>{"theme"in s&&e(0,a=s.theme),"filled"in s&&e(1,c=s.filled),"center"in s&&e(2,l=s.center)},[a,c,l]}class U extends s{constructor(s){super(),t(this,s,R,j,e,{theme:0,filled:1,center:2})}}function K(s){let t,e;return{c(){t=a("img"),this.h()},l(s){t=l(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){i(t,"class","logo-img svelte-137hs7y"),d(t.src,e=S+"/img/ons-logo-black-en.svg")||i(t,"src",e),i(t,"alt","Office for National Statistics")},m(s,e){h(s,t,e)},p:m,d(s){s&&n(t)}}}function B(s){let t,e;return{c(){t=a("img"),this.h()},l(s){t=l(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){i(t,"class","logo-img svelte-137hs7y"),d(t.src,e=S+"/img/ons-logo-neg-en.svg")||i(t,"src",e),i(t,"alt","Office for National Statistics")},m(s,e){h(s,t,e)},p:m,d(s){s&&n(t)}}}function F(s){let t,e,v,u,d,k,E,b,x,I,O,G,z,L,A,M,N,S,C,D,V,H,T,j,R;function U(s,t){return"dark"==s[0]?B:K}let F=U(s),W=F(s);return{c(){t=a("footer"),e=a("div"),v=a("a"),W.c(),u=g(),d=a("ul"),k=a("li"),E=a("a"),b=c("Contact us"),x=g(),I=a("li"),O=a("a"),G=c("Cookies and privacy"),z=g(),L=a("hr"),A=g(),M=a("div"),N=p("svg"),S=p("title"),C=c("UK Open Government Licence"),D=p("path"),H=c("\n\t\t\tAll content is available under the\n\t\t\t"),T=a("a"),j=c("Open Government Licence v3.0"),R=c(", \n\t\t\texcept where otherwise stated"),this.h()},l(s){t=l(s,"FOOTER",{style:!0,class:!0});var a=r(t);e=l(a,"DIV",{class:!0,"data-analytics":!0});var c=r(e);v=l(c,"A",{href:!0,class:!0});var i=r(v);W.l(i),i.forEach(n),u=$(c),d=l(c,"UL",{class:!0});var h=r(d);k=l(h,"LI",{class:!0});var f=r(k);E=l(f,"A",{href:!0,class:!0,style:!0});var m=r(E);b=o(m,"Contact us"),m.forEach(n),f.forEach(n),x=$(h),I=l(h,"LI",{class:!0});var g=r(I);O=l(g,"A",{href:!0,class:!0,style:!0});var p=r(O);G=o(p,"Cookies and privacy"),p.forEach(n),g.forEach(n),h.forEach(n),z=$(c),L=l(c,"HR",{style:!0,class:!0}),A=$(c),M=l(c,"DIV",{class:!0});var y=r(M);N=w(y,"svg",{class:!0,viewBox:!0,xmlns:!0});var V=r(N);S=w(V,"title",{});var U=r(S);C=o(U,"UK Open Government Licence"),U.forEach(n),D=w(V,"path",{fill:!0,d:!0}),r(D).forEach(n),V.forEach(n),H=o(y,"\n\t\t\tAll content is available under the\n\t\t\t"),T=l(y,"A",{href:!0,class:!0,target:!0,rel:!0,style:!0});var K=r(T);j=o(K,"Open Government Licence v3.0"),K.forEach(n),R=o(y,", \n\t\t\texcept where otherwise stated"),y.forEach(n),c.forEach(n),a.forEach(n),this.h()},h(){i(v,"href","https://www.ons.gov.uk/"),i(v,"class","svelte-137hs7y"),i(E,"href","https://www.ons.gov.uk/aboutus/contactus"),i(E,"class","link svelte-137hs7y"),y(E,"color",s[0].text),i(k,"class","svelte-137hs7y"),i(O,"href","https://www.ons.gov.uk/help/privacynotice"),i(O,"class","link svelte-137hs7y"),y(O,"color",s[0].text),i(I,"class","svelte-137hs7y"),i(d,"class","svelte-137hs7y"),y(L,"border-top-color",s[0].muted),i(L,"class","svelte-137hs7y"),i(D,"fill",V=s[0].muted),i(D,"d","M59,17.5v6.2H45.3V4l6.2-3.9v17.4H59z M33.6,13h9.8v10.7H43L40.6,21c-2.1,1.8-4.9,3-7.9,3 c-4.4,0-8.3-2.4-10.4-6.1c-2.1,3.6-5.9,6.1-10.4,6.1C5.4,23.9,0,18.6,0,12C0,5.4,5.4,0.1,11.9,0.1c4.5,0,8.4,2.5,10.4,6.1 c2.1-3.6,5.9-6.1,10.4-6.1c4.2,0,7.9,2.2,10.1,5.5l-5.2,3.3c-1-1.6-2.8-2.7-4.8-2.7C29.6,6.2,27,8.8,27,12s2.6,5.8,5.8,5.8 c1.5,0,2.8-0.5,3.8-1.4L33.6,13z M17.7,12c0-3.2-2.6-5.7-5.8-5.7S6.2,8.8,6.2,12s2.6,5.8,5.8,5.8S17.7,15.2,17.7,12z"),i(N,"class","ogl-img svelte-137hs7y"),i(N,"viewBox","0 0 59 24"),i(N,"xmlns","http://www.w3.org/2000/svg"),i(T,"href","https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"),i(T,"class","link svelte-137hs7y"),i(T,"target","_blank"),i(T,"rel","noopener"),y(T,"color",s[0].text),i(M,"class","license svelte-137hs7y"),i(e,"class","col-wide"),i(e,"data-analytics","footer"),y(t,"color",s[0].text),y(t,"background-color",s[0].pale),i(t,"class","svelte-137hs7y")},m(s,a){h(s,t,a),f(t,e),f(e,v),W.m(v,null),f(e,u),f(e,d),f(d,k),f(k,E),f(E,b),f(d,x),f(d,I),f(I,O),f(O,G),f(e,z),f(e,L),f(e,A),f(e,M),f(M,N),f(N,S),f(S,C),f(N,D),f(M,H),f(M,T),f(T,j),f(M,R)},p(s,[e]){F===(F=U(s))&&W?W.p(s,e):(W.d(1),W=F(s),W&&(W.c(),W.m(v,null))),1&e&&y(E,"color",s[0].text),1&e&&y(O,"color",s[0].text),1&e&&y(L,"border-top-color",s[0].muted),1&e&&V!==(V=s[0].muted)&&i(D,"fill",V),1&e&&y(T,"color",s[0].text),1&e&&y(t,"color",s[0].text),1&e&&y(t,"background-color",s[0].pale)},i:m,o:m,d(s){s&&n(t),W.d()}}}function W(s,t,e){let{theme:a=u("theme")}=t;return s.$$set=s=>{"theme"in s&&e(0,a=s.theme)},[a]}class J extends s{constructor(s){super(),t(this,s,W,F,e,{theme:0})}}function P(s){let t,e,a,c,l,r,o;t=new D({}),a=new U({});const i=s[1].default,f=k(i,s,s[0],null);return r=new J({}),{c(){E(t.$$.fragment),e=g(),E(a.$$.fragment),c=g(),f&&f.c(),l=g(),E(r.$$.fragment)},l(s){b(t.$$.fragment,s),e=$(s),b(a.$$.fragment,s),c=$(s),f&&f.l(s),l=$(s),b(r.$$.fragment,s)},m(s,n){x(t,s,n),h(s,e,n),x(a,s,n),h(s,c,n),f&&f.m(s,n),h(s,l,n),x(r,s,n),o=!0},p(s,[t]){f&&f.p&&(!o||1&t)&&I(f,i,s,s[0],o?G(i,s[0],t,null):O(s[0]),null)},i(s){o||(z(t.$$.fragment,s),z(a.$$.fragment,s),z(f,s),z(r.$$.fragment,s),o=!0)},o(s){L(t.$$.fragment,s),L(a.$$.fragment,s),L(f,s),L(r.$$.fragment,s),o=!1},d(s){A(t,s),s&&n(e),A(a,s),s&&n(c),f&&f.d(s),s&&n(l),A(r,s)}}}function _(s,t,e){let{$$slots:a={},$$scope:c}=t;return M("theme",N.light),s.$$set=s=>{"$$scope"in s&&e(0,c=s.$$scope)},[c,a]}class q extends s{constructor(s){super(),t(this,s,_,P,e,{})}}export{q as default};