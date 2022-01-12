<template>
  <div class="lineChart" id="main"></div>
</template>

<script>
//测试大量log数据看是什么效果
import * as echarts from 'echarts';
import {getSchemeAccountInfo} from "../../utils/schemeAccount";
import {convert_time, get_date_difference} from "../../utils/time";

export default {
  async mounted() {
    let info = await this.$axios.post('getSchemeChart', {
      'id': this.$route.params.id,
      'range': this.$route.params.days
    });
    // console.log(get_date_difference(new Date(), info.data.propertyLogs[0].time.$date),info.data.propertyLogs[0].time.$date);
    if(get_date_difference(new Date(), info.data.propertyLogs[0].time.$date)<1 && this.$route.params.days!=1){ //默认跳转到3天记录，但如果当前日志记录条数没有超过1天的话，跳转到24小时标签，后一个条件保证只跳转1次
      await this.$router.push("1");
      return ;//防止图表重复渲染，下面的语句就不执行了
    }
    convert_time(info);
    let x_data = [];
    let y_data = [];
    for (let item of info.data.propertyLogs) {
      x_data.push(item.time);
      y_data.push(item.value);
    }
    //图表最后添加当前的余额
    let time_now = {"time":{"$date":new Date()}};
    convert_time(time_now);
    x_data.push(time_now["time"]);
    y_data.push(this.$store.state.amount);
    this.$store.commit("setStartAmount",info.data.propertyLogs[0].value); //传值给上层组件
    let option = {
      // Make gradient line here
      // visualMap: [
      //   {
      //     show: false,
      //     type: 'continuous',
      //     seriesIndex: 0,
      //     min: 0,
      //     // max:400,
      //   }, //导致下面该symbol的颜色无效
      // ],
      tooltip: {
        trigger: 'axis',
        formatter: (params) => { //自定义鼠标移动到点上的显示框样式
          // console.log(params);
          let res = `
            <div style="line-height:2.5em;padding: 0 15px">
          <tr><td>Time:</td> <td style="text-align: right">${params[0].axisValue}</td></tr><br/>
           <tr><td>Value:</td> <td style="text-align: right">${this.$numFilter(params[0].data)} USD</td></tr></div>
          `;
          return res; // 经过这么一加工，最终返回出去并渲染，最终就出现了我们所看的效果
        },
      },
      xAxis: {
        show: false,
        data: x_data,
      },
      yAxis: {
        // position:"right"
      },
      grid: {
        top: "30px",
        left: '65px',
        right: '0%',
        bottom:'20%',//高度在这里设置
      },
      // legend: {
      //   textStyle: {
      //     fontSize: 12,
      //     color: '#F1F1F3'
      //   }
      // },
      series: [
        {
          type: 'line',
          showSymbol: false,
          symbol: 'emptyCircle',
          smooth: 0.1, //曲线平滑
          areaStyle: {
            // color: 'rgb(94,114,228)',
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(94,114,228)'
              },
              {
                offset: 1,
                color: 'white'
              }
            ]),
            // origin: 'start',
            // opacity: 0.1
          },
          lineStyle: {
            color: new echarts.graphic.LinearGradient(
                0, 1, 0, 0,
                [
                  {offset: 1, color: 'rgb(94,114,228)'},
                  {offset: 0, color: 'rgb(8,127,226)'}
                ]
            ),
            width: 2,
          },
          itemStyle: {
            color: "rgb(94,114,228)",
            borderColor: "#6c50f3",
          },
          data: y_data,
        },
      ]
    };
    let chart = document.getElementById('main');
    let myChart = echarts.init(chart);

    myChart.setOption(option);
    // window.onresize = myChart.resize;//跟随屏幕大小变化
    window.onresize = () => { //解决最大最小化之后图标比例显示异常的问题
      // myChart为echarts的实例
      myChart.resize();
      setTimeout(() => {
        myChart.resize();
      }, 300)
    }

  },

  components: {},
  data() {
    return {
      schemeChart: [],
    }
  },
  methods: {},
  computed: {},
}
</script>
<style lang="scss">
.lineChart {
  //min-height:200px;
  height: 25rem;
  width: 100%;
}

</style>
