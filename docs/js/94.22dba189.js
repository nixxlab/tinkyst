"use strict";(self["webpackChunktinkyst"]=self["webpackChunktinkyst"]||[]).push([[94],{7094:(e,l,t)=>{t.r(l),t.d(l,{default:()=>_});var a=t(3673),n=t(2323);const u={class:"text-h3"},r={colspan:"2",style:{"font-size":"1.5em","font-weight":"bold","text-align":"center"}},d={style:{"text-align":"right"}},s={style:{"font-weight":"bold"}},i={style:{"text-align":"right"}};function o(e,l,t,o,v,c){const m=(0,a.up)("q-markup-table"),b=(0,a.up)("q-page");return(0,a.wg)(),(0,a.j4)(b,{class:"column fit q-gutter-md q-pa-md",style:{"max-width":"500px"}},{default:(0,a.w5)((()=>[(0,a.Wm)("div",u,(0,n.zw)(e.$t("dividends")),1),((0,a.wg)(!0),(0,a.j4)(a.HY,null,(0,a.Ko)(e.dividends_by_months,((l,t)=>((0,a.wg)(),(0,a.j4)("div",{key:t},[(0,a.Wm)(m,{dense:""},{default:(0,a.w5)((()=>[(0,a.Wm)("thead",null,[(0,a.Wm)("tr",null,[(0,a.Wm)("td",r,(0,n.zw)(t),1)])]),(0,a.Wm)("tbody",null,[((0,a.wg)(!0),(0,a.j4)(a.HY,null,(0,a.Ko)(e.months,(t=>((0,a.wg)(),(0,a.j4)("tr",{key:t},[(0,a.Wm)("td",null,(0,n.zw)(t.label),1),(0,a.Wm)("td",d,(0,n.zw)(e.dividends_formatted(l[t.value])),1)])))),128))]),(0,a.Wm)("thead",s,[(0,a.Wm)("tr",null,[(0,a.Wm)("td",null,(0,n.zw)(e.$t("total")),1),(0,a.Wm)("td",i,(0,n.zw)(e.dividends_formatted(e.dividends_by_years[t])),1)])])])),_:2},1024)])))),128))])),_:1})}var v=t(1959),c=t(9582),m=t(7874);const b=[{label:"€",value:"EUR",name:"Евро"},{label:"₽",value:"RUB",name:"Рубль"},{label:"$",value:"USD",name:"Доллар США"}],y=[{label:"Январь",value:1},{label:"Февраль",value:2},{label:"Март",value:3},{label:"Апрель",value:4},{label:"Май",value:5},{label:"Июнь",value:6},{label:"Июль",value:7},{label:"Август",value:8},{label:"Сентябрь",value:9},{label:"Октябрь",value:10},{label:"Ноябрь",value:11},{label:"Декабрь",value:12}],f=(0,a.aZ)({setup(){const e=(0,c.tv)(),l=(0,m.oR)(),t=l.getters["tinkoff/accounts"],a=Intl.NumberFormat("ru-RU"),n=(0,v.iH)({}),u=(0,v.iH)({});function r(e){return e?["EUR","RUB","USD"].map((l=>e[l]?a.format(e[l])+" "+b.find((e=>e.value===l)).label:null)).filter((e=>e)).join(" + "):""}return t?t.forEach((e=>{e.operations.forEach((e=>{if("Done"==e.status&&"Dividend"===e.operationType){const l=new Date(e.date),t=l.getFullYear(),a=l.getMonth();n.value[t]||(n.value[t]={}),n.value[t][a]||(n.value[t][a]={}),n.value[t][a][e.currency]||(n.value[t][a][e.currency]=0),n.value[t][a][e.currency]+=e.payment,u.value[t]||(u.value[t]={}),u.value[t][e.currency]||(u.value[t][e.currency]=0),u.value[t][e.currency]+=e.payment}}))})):e.push("/settings"),{accounts:t,currencies:b,dividends_by_months:n,dividends_by_years:u,dividends_formatted:r,months:y,number_format:a}}});var p=t(4379),g=t(481),h=t(7518),w=t.n(h);f.render=o;const _=f;w()(f,"components",{QPage:p.Z,QMarkupTable:g.Z})}}]);