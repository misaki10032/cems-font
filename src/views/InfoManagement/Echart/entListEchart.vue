<template>
  <div style="height:100%;">
    <el-button @click="gotolink" class="btn btn-success" plain>表格</el-button>
    <el-row>
      <el-col :span="18">
        <div id="charts" style="height:658px;margin: auto">
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
var echarts = require('echarts');
export default {
  name: "addType",
  methods: {
    gotolink() {
      this.$router.replace('/entlist')
    }
  },
  mounted() {
    this.$axios.get('/entrustEchart').then((res) => {
          var option = echarts.init(document.getElementById('charts'));
          option.setOption({
            tooltip: {
              trigger: 'item',
              formatter: '{a} </br><hr>{b}: {c} ({d}%)'
            },
            legend: {
              data: res.data.EntPlanName
            },
            series: [
              {
                name: '委托类型',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, '30%'],
                label: {
                  position: 'inner',
                  fontSize: 14,
                },
                labelLine: {
                  show: false
                },
                data: res.data.EntPlan,
              },
              {
                name: '委托进度',
                type: 'pie',
                radius: ['45%', '60%'],
                labelLine: {
                  length: 30,
                },
                label: {
                  formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                  backgroundColor: '#F6F8FC',
                  borderColor: '#8C8D8E',
                  borderWidth: 1,
                  borderRadius: 4,

                  rich: {
                    a: {
                      color: '#6E7079',
                      lineHeight: 22,
                      align: 'center'
                    },
                    hr: {
                      borderColor: '#8C8D8E',
                      width: '100%',
                      borderWidth: 1,
                      height: 0
                    },
                    b: {
                      color: '#4C5058',
                      fontSize: 14,
                      fontWeight: 'bold',
                      lineHeight: 33
                    },
                    per: {
                      color: '#fff',
                      backgroundColor: '#4C5058',
                      padding: [3, 4],
                      borderRadius: 4
                    }
                  }
                },
                data: res.data.EntrusType,
              }
            ]
          });
          window.onresize = function () {
            option.resize();
          }
        }
    );
  }
}
</script>