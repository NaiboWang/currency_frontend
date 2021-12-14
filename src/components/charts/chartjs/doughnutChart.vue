<script>
import {
  Doughnut
} from 'vue-chartjs'
import * as chartUtils from "../../../utils/chartUtils";
import Chart from "chart.js";
export default {
  extends: Doughnut,
  props: {
    chartData: {
      required: true,
    },
    chartLabels: {
      required: true,
    },
  },
  data() {
    return {
      datacollection: {
        labels: this.chartLabels,
        datasets: [{
          data: this.chartData,
          backgroundColor: chartUtils.COLORS,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio : false,
        legend: {
          position: 'right',
          labels:{
            fontColor:"black",
            fontFamily:'ubuntu-regular',
            padding:20,
            margins:{
              left:100,
            },
            generateLabels: (c) => { //右边图例格式
              let labels = [];
              // console.log(this.chartLabels); //使用箭头函数可以将this传递给此函数！
              // console.log(c);
              for (let key in c.data.labels) {
                labels.push([]);
                labels[key]["text"] = c.data.labels[key] + " "+c.data.datasets[0].data[key]+"%";
                labels[key]["fillStyle"]  = chartUtils.COLORS[key];
                labels[key]["strokeStyle"] = "rgba(0, 0, 200, 0)"; //设置图例透明
              }
              return labels;
            }
          },
        },
        plugins:{
          legend:{
            display:false,

          }
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) { //鼠标移动到圆环上项显示的内容
              // console.log(tooltipItem,data);
              // tooltipItem是当前鼠标所在项的信息，如index;data是chart的数据，如dateset和labels
              return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
            },
            // afterLabel: function (tooltipItem, data) {
            //   // console.log(tooltipItem,data);
            //   // tooltipItem是当前鼠标所在项的信息，如index;data是chart的数据，如dateset和labels
            //   return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
            // }
          }
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    }
  }
  ,
  mounted() {
    // console.log(this.chartData, this.chartLabels)
    this.renderChart(this.datacollection, this.options);
  }
}
</script>
