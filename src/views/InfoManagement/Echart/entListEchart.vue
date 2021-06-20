<template>

  <div style="width:100%;height:100%;">
    <el-button @click="gotolink" class="btn btn-success" plain>表格</el-button>

    <!--    委托数据扇状图-->
    <div id="charts" style="width:100%;height:100%;margin: auto">
    </div>


  </div>
</template>

<script>
var echarts = require('echarts');
export default {
  name: "addType",
  methods: {
    gotolink() {
      //点击跳转至上次浏览页面
      // this.$router.go(-1)
      //指定跳转地址
      this.$router.replace('/entlist')
    }
  },

  mounted() {

    this.$axios.get('/entrustEchart').then((res) => {
          // 基于准备好的dom，初始化echarts实例
          var option = echarts.init(document.getElementById('charts'));

          // 指定图表的配置项和数据
          option.setOption({
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
              // data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
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
          })
        }
    );
  }

}


</script>

<style scoped>

</style>