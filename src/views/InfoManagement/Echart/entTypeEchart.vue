<template>
  <div style="width:100%;height:100%;">
    <el-button @click="gotolink" class="btn btn-success" plain>表格</el-button>
    <el-row>
      <el-col :span="12" style="height: 900px">
        <div id="charts" style="height:600px;"></div>
      </el-col>
      <el-col :span="12" style="height: 900px">
        <div id="charts2" style="height:600px;"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
var echarts = require('echarts');
export default {
  methods: {
    gotolink() {
      this.$router.replace('/enttypelist')
    },
  },
  mounted() {
    var option;
    var myChart;
    this.$axios.post('/entrustTypeEchart').then((res) => {
      myChart = echarts.init(document.getElementById('charts'));
      myChart.setOption({
        title: {
          text: '委托类型数据图'
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
          }
        },
        tooltip: {},
        legend: {
          data: ['类型']
        },
        xAxis: {
          data: res.data.X
        },
        yAxis: {},
        series: [{
          name: '委托类型数据',
          type: 'bar',
          data: res.data.Y
        }]
      });
      window.onresize = function () {
        myChart.resize();
        option.resize();
      }
    }),
        this.$axios.post('/entrustTypeEchartSector').then((res) => {
          option = echarts.init(document.getElementById('charts2'));//main是<div id="main" style="width: 600px;height:400px;"></div>的id
          // 指定图表的配置项和数据
          option.setOption({
            title: {
              text: '委托类型数据饼状图',
              subtext: '实时数据',
              left: 'center'
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: '60%',
                // data: JSON.parse(res.data),
                data: res.data,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 40,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          });
        });
  },
}

</script>
