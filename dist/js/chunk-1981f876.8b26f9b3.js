(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1981f876"],{"467b":function(a,t,s){"use strict";s.r(t);var r,e,i,l,c,d,o,n,b,h,g=function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("section",{staticClass:"chartjs"},[a._m(0),s("div",{staticClass:"row"},[s("div",{staticClass:"col-lg-6 grid-margin stretch-card"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-body"},[s("h4",{staticClass:"card-title"},[a._v("Line chart")]),s("line-chart",{attrs:{height:250}})],1)])]),s("div",{staticClass:"col-lg-6 grid-margin stretch-card"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-body"},[s("h4",{staticClass:"card-title"},[a._v("Bar chart")]),s("bar-chart",{attrs:{height:250}})],1)])])]),s("div",{staticClass:"row"},[s("div",{staticClass:"col-lg-6 grid-margin stretch-card"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-body"},[s("h4",{staticClass:"card-title"},[a._v("Area chart")]),s("area-chart",{attrs:{height:250}})],1)])]),s("div",{staticClass:"col-lg-6 grid-margin stretch-card"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-body"},[s("h4",{staticClass:"card-title"},[a._v("Doughnut chart")]),s("doughnut-chart",{attrs:{height:200}})],1)])])]),s("div",{staticClass:"row"},[s("div",{staticClass:"col-lg-6 grid-margin stretch-card"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-body"},[s("h4",{staticClass:"card-title"},[a._v("Pie chart")]),s("pie-chart",{attrs:{height:200}})],1)])]),s("div",{staticClass:"col-lg-6 grid-margin stretch-card"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-body"},[s("h4",{staticClass:"card-title"},[a._v("Scatter chart")]),s("scatter-chart",{attrs:{height:200}})],1)])])])])},u=[function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("div",{staticClass:"page-header"},[s("h3",{staticClass:"page-title"},[a._v(" ChartJS ")]),s("nav",{attrs:{"aria-label":"breadcrumb"}},[s("ol",{staticClass:"breadcrumb"},[s("li",{staticClass:"breadcrumb-item"},[s("a",{attrs:{href:"javascript:void(0);"}},[a._v("Charts")])]),s("li",{staticClass:"breadcrumb-item active",attrs:{"aria-current":"page"}},[a._v("Chartjs")])])])])}],C=s("1fca"),y={extends:C["c"],data:function(){return{datacollection:{labels:["Day 1","Day 2","Day 3","Day 4","Day 5","Day 6"],datasets:[{label:"# of Votes",data:[10,19,3,5,2,3],borderColor:["rgba(255,99,132,1)"],borderWidth:1,fill:!1}]},options:{scales:{yAxes:[{ticks:{beginAtZero:!0},gridLines:{display:!0}}],xAxes:[{ticks:{beginAtZero:!0},gridLines:{display:!0}}]},legend:{display:!0},elements:{point:{radius:0}}}}},mounted:function(){this.renderChart(this.datacollection,this.options)}},p=y,v=s("2877"),m=Object(v["a"])(p,r,e,!1,null,null,null),x=m.exports,f={extends:C["a"],data:function(){return{datacollection:{labels:["Day 1","Day 2","Day 3","Day 4","Day 5","Day 6"],datasets:[{label:"# of Votes",data:[10,19,3,5,2,3],backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"],borderColor:["rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],borderWidth:1}]},options:{scales:{yAxes:[{ticks:{beginAtZero:!0},gridLines:{display:!0}}],xAxes:[{ticks:{beginAtZero:!0},gridLines:{display:!0}}]},legend:{display:!1},elements:{point:{radius:0}}}}},mounted:function(){this.renderChart(this.datacollection,this.options)}},D=f,k=(s("ef94"),Object(v["a"])(D,i,l,!1,null,"88a47d58",null)),A=k.exports,_={name:"area-chart",extends:C["c"],data:function(){return{datacollection:{labels:["Day 1","Day 2","Day 3","Day 4","Day 5","Day 6"],datasets:[{label:"# of Votes",data:[10,19,3,5,2,3],backgroundColor:["rgba(255, 99, 132, 0.2)"],borderColor:["rgba(255,99,132,1)"],borderWidth:1}]},options:{scales:{yAxes:[{ticks:{beginAtZero:!0},gridLines:{display:!0}}],xAxes:[{ticks:{beginAtZero:!0},gridLines:{display:!0}}]},legend:{display:!0},elements:{point:{radius:0}}}}},mounted:function(){this.renderChart(this.datacollection,this.options)}},j=_,w=Object(v["a"])(j,c,d,!1,null,null,null),L=w.exports,O=s("baf3"),Z={extends:C["d"],data:function(){return{datacollection:{labels:["Pink","Blue","Yellow"],datasets:[{data:[30,40,30],backgroundColor:["rgba(255, 99, 132, 0.5)","rgba(54, 162, 235, 0.5)","rgba(255, 206, 86, 0.5)","rgba(75, 192, 192, 0.5)","rgba(153, 102, 255, 0.5)","rgba(255, 159, 64, 0.5)"],borderColor:["rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"]}]},options:{responsive:!0,animation:{animateScale:!0,animateRotate:!0}}}},mounted:function(){this.renderChart(this.datacollection,this.options)}},W=Z,S=Object(v["a"])(W,o,n,!1,null,null,null),J=S.exports,V={extends:C["c"],data:function(){return{datacollection:{labels:["0","1","2","3","4","5","6","7","8","9"],datasets:[{label:"First Dataset",data:[{x:-10,y:0},{x:0,y:3},{x:-25,y:5},{x:40,y:5}],backgroundColor:["rgba(255, 99, 132, 0.2)"],borderColor:["rgba(255,99,132,1)"],borderWidth:1},{label:"Second Dataset",data:[{x:10,y:5},{x:20,y:-30},{x:-25,y:15},{x:-10,y:5}],backgroundColor:["rgba(54, 162, 235, 0.2)"],borderColor:["rgba(54, 162, 235, 1)"],borderWidth:1}]},options:{scales:{xAxes:[{type:"linear",position:"bottom"}]}}}},mounted:function(){this.renderChart(this.datacollection,this.options)}},B=V,E=Object(v["a"])(B,b,h,!1,null,null,null),P=E.exports,$={name:"chartjs",components:{lineChart:x,barChart:A,areaChart:L,doughnutChart:O["a"],pieChart:J,scatterChart:P}},F=$,R=Object(v["a"])(F,g,u,!1,null,null,null);t["default"]=R.exports},b1b8:function(a,t,s){},ef94:function(a,t,s){"use strict";s("b1b8")}}]);
//# sourceMappingURL=chunk-1981f876.8b26f9b3.js.map