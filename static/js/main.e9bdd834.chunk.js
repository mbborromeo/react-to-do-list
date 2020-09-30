(this["webpackJsonpreact-to-do-list"]=this["webpackJsonpreact-to-do-list"]||[]).push([[0],{27:function(e,t,n){},32:function(e,t,n){e.exports=n(63)},37:function(e,t,n){},57:function(e,t,n){},63:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),l=n(28),i=n.n(l),r=(n(37),n(8)),o=n(1),u=n(13),d=n(7),m=n(29),s=n(30),b=n(16),p=n.n(b),f="https://jsonplaceholder.typicode.com/todos",E=function(){function e(){Object(m.a)(this,e)}return Object(s.a)(e,[{key:"getList",value:function(){return p.a.jsonp(f,{timeout:2e3})}},{key:"getDetail",value:function(e){return p.a.jsonp("".concat(f,"/").concat(e),{timeout:2e3})}}]),e}();var j=function(e){var t=e.addFunction,n=Object(a.useState)(""),l=Object(d.a)(n,2),i=l[0],r=l[1],o=Object(a.useCallback)((function(e){e.preventDefault(),i&&(t(i),r(""))}),[i,t]);return c.a.createElement("form",{onSubmit:o},c.a.createElement("input",{type:"text",placeholder:"Type item",value:i,onChange:function(e){return r(e.target.value)}}),c.a.createElement("button",{type:"submit"},"Add"),c.a.createElement("input",{type:"button",value:"Clear",onClick:function(){return r("")}}))};n(57);var k=function(){var e=Object(a.useState)(void 0),t=Object(d.a)(e,2),n=t[0],l=t[1],i=Object(a.useState)({key:"id",direction:"ascending"}),o=Object(d.a)(i,2),m=o[0],s=o[1],b=Object(a.useState)(!1),p=Object(d.a)(b,2),f=p[0],k=p[1],O=Object(a.useMemo)((function(){return new E}),[]),y=Object(a.useCallback)((function(e){return n.findIndex((function(t){return t.id===e}))}),[n]),v=Object(a.useCallback)((function(e){var t=y(e),a=Object(u.a)(n);a[t].completed?a[t].completed=!1:a[t].completed=!0,l(a)}),[n,y]),g=Object(a.useCallback)((function(e){y(e);var t=n.filter((function(t){return t.id!==e}));l(t)}),[n,y]),h=Object(a.useCallback)((function(){var e=n.map((function(e){return e.id})).sort((function(e,t){return e-t}));return e[e.length-1]}),[n]),C=Object(a.useCallback)((function(e){var t={userId:99,id:h()+1,completed:!1,title:e},a=[].concat(Object(u.a)(n),[t]);l(a)}),[n,h]),N=Object(a.useCallback)((function(e){var t;t=m.key===e&&"ascending"===m.direction?"descending":"ascending",s({key:e,direction:t})}),[m]);Object(a.useEffect)((function(){O.getList().then((function(e){l(e)})).catch((function(e){console.error("axios.jsonp CATCH",e),k(!0)})).finally((function(){}))}),[O]);var S=Object(a.useMemo)((function(){if(n){var e=Object(u.a)(n);return e.sort((function(e,t){return e[m.key]<t[m.key]?"completed"===m.key?"ascending"===m.direction?1:-1:"ascending"===m.direction?-1:1:e[m.key]>t[m.key]?"completed"===m.key?"ascending"===m.direction?-1:1:"ascending"===m.direction?1:-1:e.id<t.id?-1:e.id>t.id?1:0})),e}}),[n,m]);return S?S.length>0?c.a.createElement("div",null,c.a.createElement("div",{id:"header"},c.a.createElement("h1",null,"TO DO"),c.a.createElement(j,{addFunction:C})),c.a.createElement("table",null,c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",null,c.a.createElement("button",{type:"button",className:"id"===m.key?m.direction:"",onClick:function(){return N("id")}},"ID")),c.a.createElement("th",null,c.a.createElement("button",{type:"button",className:"title"===m.key?m.direction:"",onClick:function(){return N("title")}},"Title")),c.a.createElement("th",null,c.a.createElement("button",{type:"button",id:"completed",className:"completed"===m.key?m.direction:"",onClick:function(){return N("completed")}},"Completed")))),c.a.createElement("tbody",null,S.map((function(e){return c.a.createElement("tr",{key:e.id},c.a.createElement("td",null,c.a.createElement(r.b,{to:"/detail/".concat(e.id),"data-id":e.id,className:e.completed?"completed":""},e.id)),c.a.createElement("td",null,c.a.createElement(r.b,{to:"/detail/".concat(e.id),"data-id":e.id,className:e.completed?"completed":""},e.title)),c.a.createElement("td",null,c.a.createElement("button",{type:"button",onClick:function(){return v(e.id)}},e.completed?"Mark as Incomplete":"Mark as Completed"),c.a.createElement("button",{type:"button","aria-label":"Delete item ".concat(e.id),onClick:function(){return g(e.id)}},"X")))}))))):c.a.createElement("div",null,"No results to display"):f?c.a.createElement("div",null,"Error loading"):c.a.createElement("div",null,"Loading...")};n(27);var O=function(e){var t=e.match,n=Object(a.useState)({}),l=Object(d.a)(n,2),i=l[0],o=l[1],u=Object(a.useState)(!1),m=Object(d.a)(u,2),s=m[0],b=m[1],p=Object(a.useState)(!1),f=Object(d.a)(p,2),j=f[0],k=f[1],O=t.params.id,y=Object(a.useMemo)((function(){return new E}),[]);return Object(a.useEffect)((function(){O&&y.getDetail(O).then((function(e){console.log("getDetail response",e),o(e),b(!0)})).catch((function(e){console.error("axios.jsonp CATCH",e),k(!0)})).finally((function(){}))}),[y,O]),s&&Object.keys(i).length>0?c.a.createElement("div",null,c.a.createElement("span",{id:"id"},"ID:"," ",O),c.a.createElement("br",null),c.a.createElement("span",{id:"title"},"Title:"," ",i.title),c.a.createElement("br",null),c.a.createElement("span",{id:"completed"},"Completed:"," ",i.completed.toString()),c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement(r.b,{to:"/",className:"button back"},"< Back")):s&&0===Object.keys(i).length?c.a.createElement("div",null,"No detail to display"):j?c.a.createElement("div",null,"Error loading"):c.a.createElement("div",null,"Loading...")};var y=function(){return c.a.createElement("div",{className:"App"},c.a.createElement(r.a,null,c.a.createElement(o.c,null,c.a.createElement(o.a,{path:"/",exact:!0,component:k}),c.a.createElement(o.a,{path:"/detail/:id",exact:!0,component:O}))))};i.a.render(c.a.createElement(y,null),document.getElementById("root"))}},[[32,1,2]]]);
//# sourceMappingURL=main.e9bdd834.chunk.js.map