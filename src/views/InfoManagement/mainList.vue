<template>
  <div>
    <el-breadcrumb style="margin-bottom: 20px">
      <el-breadcrumb-item :to="{ path: '/mainlist' }">首页</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="userinfo_box bg-purple">
            <el-col :span="6">
              <i class="info-icon el-icon-user"></i>
            </el-col>
            <el-col :offset="2" :span="16">
              <div class="info-box">
                <span class="info-title">近期活跃用户</span>
                <br>
                <b class="info-num">22</b>
              </div>
            </el-col>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="userinfo_box bg-purple">
            <el-col :span="6">
              <i class="info-icon el-icon-turn-off"></i>
            </el-col>
            <el-col :offset="2" :span="16">
              <div class="info-box">
                <span class="info-title">被封禁用户</span>
                <br>
                <b class="info-num">2</b>
              </div>
            </el-col>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="userinfo_box bg-purple">
            <el-col :span="6">
              <i class="info-icon el-icon-data-line"></i>
            </el-col>
            <el-col :offset="2" :span="16">
              <div class="info-box">
                <span class="info-title">新注册用户</span>
                <br>
                <b class="info-num">5</b>
              </div>
            </el-col>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="userinfo_box bg-purple">
            <el-col :span="6">
              <i class="info-icon el-icon-user-solid"></i>
            </el-col>
            <el-col :offset="2" :span="16">
              <div class="info-box">
                <span class="info-title">不活跃用户</span>
                <br>
                <b class="info-num">4</b>
              </div>
            </el-col>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="echarts_box bg-purple">
            <div id="charts2" style="height:100%;padding: 15px;"></div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="echarts_box bg-purple">
            <div id="charts" style="height:100%;padding: 15px"></div>
          </div>
        </el-col>
      </el-row>
    </div>
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

<style>
.userinfo_box {
  margin: 20px;
  height: 150px;
  border-radius: 15px;
}

.echarts_box {
  margin: 20px;
  height: 350px;
  border-radius: 15px;
}

.info-icon {
  color: #5a5757;
  font-size: 66px;
  margin: 36px 0;
  margin-left: 15px;
}

.info-box {
  padding: 25px 0;
}

.info-title {
  font-size: 20px;
  margin-left: 15px;
  color: #867f7f;
}

.info-num {
  margin: 18px;
  font-size: 50px;
  text-align: center;
  color: #403d3d;
}

.bg-purple {
  background: #f8f3f3;
}
</style>
