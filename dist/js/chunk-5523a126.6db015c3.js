(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5523a126"],{"0f66":function(e,t,n){"use strict";n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return c})),n.d(t,"d",(function(){return o})),n.d(t,"b",(function(){return l}));var a=n("22b6");function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return a["a"].post("project/node",{module:e})}function c(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return a["a"].post("project/node/allList",{module:e,node:t})}function o(e){return a["a"].post("project/node/save",{list:e})}function l(){return a["a"].post("project/node/clear")}},1542:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"editable-cell"},[e.editable?n("div",{staticClass:"editable-cell-input-wrapper"},[n("a-input",{attrs:{value:e.value},on:{change:e.handleChange,pressEnter:e.check}}),n("a-icon",{staticClass:"editable-cell-icon-check",attrs:{type:"check"},on:{click:e.check}})],1):n("div",{staticClass:"editable-cell-text-wrapper"},[e.value?n("span",[e._v(e._s(e.value))]):0==e.value?n("span",[e._v(e._s(e.value))]):n("span"),n("a-icon",{staticClass:"editable-cell-icon",attrs:{type:"edit"},on:{click:e.edit}})],1)])},i=[],c=(n("c5f6"),n("4e72")),o={name:"EditableCell",components:{"a-input":c["Input"],"a-icon":c["Icon"]},props:{text:[String,Number],showEdit:{type:[Boolean]}},data:function(){return{value:this.text,editable:!1}},methods:{handleChange:function(e){var t=e.target.value;this.value=t},check:function(){this.editable=!1,this.$emit("change",this.value)},edit:function(){this.editable=!0}}},l=o,r=(n("5092"),n("2877")),s=Object(r["a"])(l,a,i,!1,null,null,null);t["default"]=s.exports},"19ba":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"admin-menu"},[n("wrapper-content",[n("div",{staticClass:"action"},[n("Button",{attrs:{type:"primary",icon:"delete"},on:{click:e.clearNode}},[e._v("清理无效记录")])],1),e.data.length?n("Table",{attrs:{columns:e.columns,dataSource:e.data,rowKey:"node",defaultExpandAllRows:"",pagination:!1},scopedSlots:e._u([{key:"titles",fn:function(t,a){return[n("EditableCell",{attrs:{text:a.title?a.title:"-"},on:{change:function(t){return e.onCellChange(t,a.node)}}})]}},{key:"action",fn:function(t,a,i){return[-1!==a.node.indexOf("/")?n("div",[!a.children&&a.pnode?n("span",{staticStyle:{"margin-left":"24px"}}):e._e(),n("Checkbox",{attrs:{checked:e.isChecked(a,"is_login")},on:{change:function(t){return e.onChange(t,a,"is_login")}}},[a.children?n("span",[e._v("全部")]):e._e(),e._v("加入登录控制\n          ")]),!a.children&&a.pnode?n("span",{staticStyle:{"margin-left":"24px"}}):e._e(),n("Checkbox",{attrs:{checked:e.isChecked(a,"is_auth")},on:{change:function(t){return e.onChange(t,a,"is_auth")}}},[a.children?n("span",[e._v("全部")]):e._e(),e._v("加入权限控制\n          ")]),!a.children&&a.pnode?n("span",{staticStyle:{"margin-left":"24px"}}):e._e()],1):e._e()]}}],null,!1,2516118012)}):e._e()],1)],1)},i=[],c=(n("7f7f"),n("ac6a"),n("4e72")),o=n("1542"),l=n("0f66"),r=(n("2f14"),n("68fe"),c["Form"].Item),s=[{title:"节点",dataIndex:"node",width:"30%"},{title:"名称",width:"12%",scopedSlots:{customRender:"titles"}},{title:"操作",scopedSlots:{customRender:"action"}}],u={components:{Table:c["Table"],Button:c["Button"],Divider:c["Divider"],Modal:c["Modal"],Form:c["Form"],FormItem:r,Input:c["Input"],EditableCell:o["default"],Checkbox:c["Checkbox"]},data:function(){return{columns:s,data:[],loading:!0}},created:function(){this.init()},methods:{init:function(){var e=this;e.$store.dispatch("pageLoading",!0),Object(l["c"])().then((function(t){e.$store.dispatch("pageLoading",!1),e.data=t.data.nodes}))},clearNode:function(){Object(l["b"])()},onCellChange:function(e,t){Object(l["d"])(JSON.stringify([{name:[{name:"title"}],value:[{value:e}],node:t}]))},onChange:function(e,t,n){var a=e.target.checked;t[n]=a;var i=[],c={name:[{name:n}],value:[{value:a}],node:t.node};t.children&&t.children.forEach((function(e){e[n]=a;var t={name:[{name:n}],value:[{value:a}],node:e.node};a&&"is_auth"===n&&(e["is_login"]=a,t.name.push({name:"is_login"}),t.value.push({value:a})),i.push(t)})),a&&"is_auth"===n&&(t["is_login"]=a,c.name.push({name:"is_login"}),c.value.push({value:a})),i.push(c),i&&Object(l["d"])(JSON.stringify(i))},rowClick:function(e,t){},isChecked:function(e,t){if(!e.children)return!!e[t];var n=0;return e.children.forEach((function(e){e[t]&&n++})),n===e.children.length}}},d=u,h=n("2877"),p=Object(h["a"])(d,a,i,!1,null,null,null);t["default"]=p.exports},"1cb2":function(e,t,n){},5092:function(e,t,n){"use strict";var a=n("1cb2"),i=n.n(a);i.a}}]);