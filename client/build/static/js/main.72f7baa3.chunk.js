(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{101:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),o=n(46),r=n.n(o),l=n(22),c=n(39),s=n.n(c),u=n(47),d=n(23),m=n(24),p=n(32),f=n(25),g=n(33),h=n(5),y=n(17),b=n(59),x=n(31),C=n(48),w=h.default.img.withConfig({displayName:"BackgroundPics__SummerPic",componentId:"lyh07p-0"})(["z-index:-1;position:absolute;height:100%;width:100%;object-fit:cover;opacity:",";transition:opacity 1s ease-in-out;"],function(e){return"Hottest"===e.theme?1:0}),v=h.default.img.withConfig({displayName:"BackgroundPics__WinterPic",componentId:"lyh07p-1"})(["z-index:-1;position:absolute;height:100%;width:100%;object-fit:cover;opacity:",";transition:opacity 1s ease-in-out;"],function(e){return"Coldest"===e.theme?1:0}),_=h.default.img.withConfig({displayName:"BackgroundPics__WindyPic",componentId:"lyh07p-2"})(["z-index:-1;position:absolute;height:100%;width:100%;object-fit:cover;opacity:",";transition:opacity 1s ease-in-out;"],function(e){return"Windiest"===e.theme?1:0}),E=h.default.img.withConfig({displayName:"BackgroundPics__CloudyPic",componentId:"lyh07p-3"})(["z-index:-1;position:absolute;height:100%;width:100%;object-fit:cover;opacity:",";transition:opacity 1s ease-in-out;"],function(e){return"Cloudiest"===e.theme?1:0}),k=h.default.img.withConfig({displayName:"BackgroundPics__HumidPic",componentId:"lyh07p-4"})(["z-index:-1;position:absolute;height:100%;width:100%;object-fit:cover;opacity:",";transition:opacity 1s ease-in-out;"],function(e){return"Most Humid"===e.theme?1:0}),I=h.default.img.withConfig({displayName:"BackgroundPics__DryPic",componentId:"lyh07p-5"})(["z-index:-1;position:absolute;height:100%;width:100%;object-fit:cover;opacity:",";transition:opacity 1s ease-in-out;"],function(e){return"Driest"===e.theme?1:0}),j=h.default.img.withConfig({displayName:"BackgroundPics__FoggyPic",componentId:"lyh07p-6"})(["z-index:-1;position:absolute;height:100%;width:100%;object-fit:cover;opacity:",";transition:opacity 1s ease-in-out;"],function(e){return"Least Visible"===e.theme?1:0}),z=function(e){var t=e.currentlySelected;return i.a.createElement(i.a.Fragment,null,i.a.createElement(w,{src:"https://res.cloudinary.com/tiagological/image/upload/q_auto/f_auto/v1566754501/extreme-weather/summer_ej4xdq.jpg",alt:"Summer",theme:t}),i.a.createElement(v,{src:"https://res.cloudinary.com/tiagological/image/upload/q_auto/f_auto/v1566754495/extreme-weather/winter_tp5fj7.jpg",alt:"Winter",theme:t}),i.a.createElement(_,{src:"https://res.cloudinary.com/tiagological/image/upload/q_auto/f_auto/v1566754493/extreme-weather/wind_uya9x8.jpg",alt:"Wind",theme:t}),i.a.createElement(E,{src:"https://res.cloudinary.com/tiagological/image/upload/q_auto/f_auto/v1566754509/extreme-weather/cloudy_jr5x1s.jpg",alt:"Cloudy",theme:t}),i.a.createElement(k,{src:"https://res.cloudinary.com/tiagological/image/upload/q_auto/f_auto/v1566754510/extreme-weather/humid_eh5sit.jpg",alt:"Humid",theme:t}),i.a.createElement(I,{src:"https://res.cloudinary.com/tiagological/image/upload/q_auto/v1566756570/extreme-weather/dry_bwvepc.jpg",alt:"Dry",theme:t}),i.a.createElement(j,{src:"https://res.cloudinary.com/tiagological/image/upload/q_auto/v1566754514/extreme-weather/fog_j82fnf.jpg",alt:"Foggy",theme:t}))},F=n(21),N=n.n(F),S=n(60);function H(e){var t=e.country,n=t.countryName,a=t.code,o=t.capital,r=t.currentTemp,l=t.windSpeed,c=t.cloudiness,s=t.humidity,u=t.visibility,d=e.ownIndex,m=e.currentFilter;return i.a.createElement(P,null,i.a.createElement(O,null,i.a.createElement(D,null,d+1,d+1===1?"st":d+1===2?"nd":d+1===3?"rd":"th")),i.a.createElement(q,null,i.a.createElement(W,{src:"https://flagcdn.com/60x45/".concat(a.toLowerCase(),".png"),alt:"".concat(n," flag")})),i.a.createElement(M,null,i.a.createElement("p",null,o,", ",n)),i.a.createElement(A,null,("Hottest"===m||"Coldest"===m)&&i.a.createElement(i.a.Fragment,null,i.a.createElement(L,null,r%1===0?r:r.toFixed(1)," C"),i.a.createElement(T,{temp:r})),"Windiest"===m&&i.a.createElement(L,null,(60*l*60/1e3/1.60934).toFixed(1)," mph"),"Cloudiest"===m&&i.a.createElement(L,null,c,"% cloudy"),("Most Humid"===m||"Driest"===m)&&i.a.createElement(L,null,s,"% humidity"),"Least Visible"===m&&i.a.createElement(L,null,(u/1e3/1.60934).toFixed(1)," miles visibility")))}var P=h.default.div.withConfig({displayName:"CountryItem__StyledDiv",componentId:"sc-16uh95k-0"})(["display:flex;flex-direction:column;align-items:center;background-color:#fff;border-radius:5px;margin:1rem 0;padding:1rem;opacity:0.8;"]),O=h.default.div.withConfig({displayName:"CountryItem__RankingContainer",componentId:"sc-16uh95k-1"})(["font-family:'Permanent Marker',cursive;margin:1rem 0;"]),D=h.default.p.withConfig({displayName:"CountryItem__Ranking",componentId:"sc-16uh95k-2"})(["font-size:2rem;font-weight:800;margin:0;"]),q=h.default.div.withConfig({displayName:"CountryItem__FlagContainer",componentId:"sc-16uh95k-3"})(["justify-content:center;"]),M=h.default.div.withConfig({displayName:"CountryItem__CountryContainer",componentId:"sc-16uh95k-4"})(["margin:0 1rem;flex-direction:row;align-self:stretch;text-align:center;"]),W=h.default.img.withConfig({displayName:"CountryItem__CountryFlag",componentId:"sc-16uh95k-5"})([""]),A=h.default.div.withConfig({displayName:"CountryItem__InfoContainer",componentId:"sc-16uh95k-6"})(["align-items:center;margin:1rem 0;text-align:center;margin-top:auto;"]),L=h.default.span.withConfig({displayName:"CountryItem__Text",componentId:"sc-16uh95k-7"})(["font-size:2rem;"]),T=Object(h.default)(S.a).withConfig({displayName:"CountryItem__Thermometer",componentId:"sc-16uh95k-8"})(["transform:scale(2);margin:0 1rem;color:",";"],function(e){var t=e.temp;return t>=40?"red":t>=35?"#ff3700":t<0?"blue":t<10?"#00a9ff":t<15?"#00ff7f":t<20?"#ffd800":"#ff6e00"}),B=n(51),R=(n(96),n(52)),Q=n.n(R);function V(){var e=Object(l.a)(["\n  query CitiesTempQuery {\n    citiesWeather {\n      countryName\n      code\n      capital\n      currentTemp\n      humidity\n      windSpeed\n      cloudiness\n      visibility\n      error {\n        status\n        message\n      }\n    }\n    lastQuery {\n      lastFetchedAt\n    }\n  }\n"]);return V=function(){return e},e}var J=N()(V()),G=function(e){function t(){return Object(d.a)(this,t),Object(p.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this,t=this.props.currentlySelected;return i.a.createElement(i.a.Fragment,null,i.a.createElement(x.b,{query:J},function(n){var a=n.loading,o=n.error,r=n.data;if(a)return i.a.createElement(U,null,i.a.createElement(B.BounceLoader,null));o&&console.log(o);var l="Hottest"===t||"Coldest"===t?"currentTemp":"Windiest"===t?"windSpeed":"Cloudiest"===t?"cloudiness":"Most Humid"===t||"Driest"===t?"humidity":"visibility",c="Coldest"===t||"Least Visible"===t||"Driest"===t?"asc":"desc",s=Q()(r.citiesWeather,[l],[c]);return i.a.createElement(Y,null,i.a.createElement($,null,i.a.createElement(Z,{currentFilter:t},"Top 20"," ",i.a.createElement(X,{value:t,onChange:e.props.handleChange,currentFilter:t},i.a.createElement("option",{value:"Hottest"},"Hottest "),i.a.createElement("option",{value:"Coldest"},"Coldest"),i.a.createElement("option",{value:"Windiest"},"Windiest"),i.a.createElement("option",{value:"Cloudiest"},"Cloudiest"),i.a.createElement("option",{value:"Most Humid"},"Humid"),i.a.createElement("option",{value:"Driest"},"Driest"),i.a.createElement("option",{value:"Least Visible"},"Foggiest"))," ","Capitals")),i.a.createElement(K,null,s.slice(0,20).map(function(e){return i.a.createElement(H,{key:e.countryName,country:e,ownIndex:s.indexOf(e),currentFilter:t})})))}))}}]),t}(a.Component),U=h.default.div.withConfig({displayName:"Countries__LoaderContainer",componentId:"zo9zba-0"})(["display:flex;flex-direction:row;justify-content:center;position:absolute;left:0;right:0;top:50%;"]),Y=h.default.div.withConfig({displayName:"Countries__StyledDiv",componentId:"zo9zba-1"})(["display:flex;flex-direction:column;align-items:stretch;font-family:'Montserrat',sans-serif;padding:2rem 1rem;"]),$=h.default.div.withConfig({displayName:"Countries__HeadingContainer",componentId:"zo9zba-2"})(["text-align:center;"]),K=h.default.div.withConfig({displayName:"Countries__CountryList",componentId:"zo9zba-3"})(["display:flex;flex-direction:column;align-items:stretch;font-family:'Montserrat',sans-serif;padding:2rem 1rem;@media only screen and (min-width:768px){display:grid;grid-template-columns:1fr 1fr 1fr;grid-gap:1rem;}"]),X=h.default.select.withConfig({displayName:"Countries__StyledSelect",componentId:"zo9zba-4"})(["outline:none;border-radius:5px;border:2px solid transparent;text-align-last:center;transition:all 200ms ease-in-out;:hover{border:",";}:focus{box-shadow:",";border:",";}"],function(e){var t=e.currentFilter;return"Hottest"===t?"2px solid #ebb788":"Coldest"===t?" 2px solid #000000FF":"2px solid #909CC6"},function(e){var t=e.currentFilter;return"Hottest"===t?"0 0 5px 2px #ebb788":"Coldest"===t?"0 0 5px 2px #000000FF":"Driest"===t?"0 0 5px 2px #8C5E45":"0 0 5px 2px #909CC6"},function(e){var t=e.currentFilter;return"Hottest"===t?"2px solid #ebb788":"Coldest"===t?" 2px solid #000000FF":"2px solid #909CC6"}),Z=h.default.p.withConfig({displayName:"Countries__Text",componentId:"zo9zba-5"})(["font-size:1.1rem;font-weight:600;margin:1rem auto;color:",";text-shadow:",";@media only screen and (min-width:768px){font-size:1.75rem;}"],function(e){var t=e.currentFilter;return"Windiest"===t||"Cloudiest"===t||"Most Humid"===t||"Driest"===t?"#fff":"#000"},function(e){return"Most Humid"===e.currentFilter?"0 0 5px #000":null}),ee=G,te=n(57),ne=n(58),ae=n.n(ne);function ie(){var e=Object(l.a)(["\n  @font-face {\n    font-family: 'Againts';\n    src: url(",");\n  }\n\n  @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');\n\n  @import url('https://fonts.googleapis.com/css?family=Permanent+Marker&display=swap');\n\n  html {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n  }\n  *,\n  *:before,\n  *:after {\n    -webkit-box-sizing: inherit;\n    box-sizing: inherit;\n  }\n  \n  html,\n  body {\n    height: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n  }\n  \n  body {\n    margin: 0;\n  }\n  \n  #root {\n    height: 100%;\n    width: 100%;\n    position: fixed;\n  }\n"]);return ie=function(){return e},e}var oe="/graphql",re=function(e){function t(){var e,n;Object(d.a)(this,t);for(var a=arguments.length,i=new Array(a),o=0;o<a;o++)i[o]=arguments[o];return(n=Object(p.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(i)))).state={client:null,loaded:!1,currentlySelected:"Hottest"},n.componentDidMount=Object(u.a)(s.a.mark(function e(){var t,a,i,o,r,l;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=JSON.parse(localStorage.getItem("apollo-cache-persist")),36e5,a=Date.now(),i=new y.a,o=new b.a({uri:oe,cache:i}),r=new C.CachePersistor({cache:i,storage:window.localStorage}),null===t){e.next=25;break}if(l=t["$ROOT_QUERY.lastQuery"].lastFetchedAt,!(a-l>36e5)){e.next=14;break}return e.next=11,r.purge();case 11:console.log("Purging the Apollo cache..."),e.next=23;break;case 14:return e.prev=14,e.next=17,r.restore();case 17:console.log("Restoring the Apollo cache..."),e.next=23;break;case 20:e.prev=20,e.t0=e.catch(14),console.error("Error restoring Apollo cache",e.t0);case 23:e.next=34;break;case 25:return e.prev=25,e.next=28,r.purge();case 28:console.log("Purging the Apollo cache..."),e.next=34;break;case 31:e.prev=31,e.t1=e.catch(25),console.error("Error purging Apollo cache",e.t1);case 34:n.setState({client:o,loaded:!0});case 35:case"end":return e.stop()}},e,null,[[14,20],[25,31]])})),n.state={currentlySelected:"Hottest"},n.handleChange=function(e){n.setState({currentlySelected:e.target.value})},n}return Object(g.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.state,t=e.client,n=e.loaded,a=e.currentlySelected;return n?i.a.createElement(x.a,{client:t},i.a.createElement(le,null),i.a.createElement(te.Normalize,null),i.a.createElement(ce,{theme:a},i.a.createElement(z,{currentlySelected:a}),i.a.createElement(se,{theme:a},"Extreme Weather App"),i.a.createElement(ee,{handleChange:this.handleChange,currentlySelected:a}))):i.a.createElement("div",null,"Loading...")}}]),t}(i.a.Component),le=Object(h.createGlobalStyle)(ie(),ae.a),ce=h.default.div.withConfig({displayName:"App__StyledDiv",componentId:"uzqsg-0"})(["display:flex;flex-direction:column;align-items:center;height:100%;overflow:auto;padding:0 1rem 2rem;"]),se=h.default.h1.withConfig({displayName:"App__Heading",componentId:"uzqsg-1"})(["font-family:'Permanent Marker',cursive;letter-spacing:2px;font-size:3rem;color:",";text-align:center;text-shadow:",";transition:color 1s ease-in-out;"],function(e){var t=e.theme;return"Coldest"===t?"#000000FF":"Driest"===t?"#8C5E45":"#fbfbf8"},function(e){var t=e.theme;return"Driest"===t||"Coldest"===t?"0 0 5px #fbfbf8":"0 0 5px #000"}),ue=re;r.a.render(i.a.createElement(ue,null),document.querySelector("#root"))},58:function(e,t,n){e.exports=n.p+"static/media/againts.cfb1a320.otf"},62:function(e,t,n){e.exports=n(101)}},[[62,1,2]]]);
//# sourceMappingURL=main.72f7baa3.chunk.js.map