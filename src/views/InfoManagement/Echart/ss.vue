<!--<template>-->

<!--  <div id="myChart" :style="{width: '300px', height: '300px'}">-->
<!--    <el-button @click="gotolink" class="btn btn-success" plain>表格</el-button>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import ECharts from "vue-echarts/components/ECharts";-->
<!--import "echarts/lib/chart/bar";-->
<!--export default {-->
<!--  name: "App",-->
<!--  components: {-->
<!--    "v-chart": ECharts-->
<!--  },-->

<!--  methods: {-->
<!--    data() {-->
<!--      return {-->
<!--        orgOptions: {},-->
<!--      }-->
<!--    },-->
<!--    gotolink() {-->
<!--      //点击跳转至上次浏览页面-->
<!--      // this.$router.go(-1)-->

<!--      //指定跳转地址-->
<!--      this.$router.replace('/enttypelist')-->
<!--    },-->
<!--  },-->
<!--  data: function() {-->
<!--    return {-->
<!--      bar: {-->
<!--        title: {-->
<!--          text: "ECharts 入门示例"-->
<!--        },-->
<!--        tooltip: {},-->
<!--        legend: {-->
<!--          data: ["销量"]-->
<!--        },-->
<!--        xAxis: {-->
<!--          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]-->
<!--        },-->
<!--        yAxis: {},-->
<!--        series: [-->
<!--          {-->
<!--            name: "销量",-->
<!--            type: "bar",-->
<!--            data: [5, 20, 36, 10, 10, 20]-->
<!--          }-->
<!--        ]-->
<!--      }-->
<!--    };-->
<!--  }-->


<!--}-->


<!--</script>-->

<!--<style scoped>-->

<!--</style>-->