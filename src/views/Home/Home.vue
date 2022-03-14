<!--  -->
<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>

        <div class="login-info">
          <p>上次登录时间:<span>2502-1-10</span></p>
          <p>上次登录地点:<span>广东</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col style="margin-top: 20px" :span="16">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: '0' }"
        >
          <i
            class="icon"
            :class="`el-icon${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 没封装前的图标做法 -->
      <!-- <el-card style="height: 280px">
        <div style="height: 280px" ref="echarts"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <div style="height: 240px" ref="userEcharts"></div>
        </el-card>
        <el-card style="height: 260px">
          <div style="height: 240px" ref="videoEcharts"></div>
        </el-card> -->
      <!-- 封装后的图表 -->
      <el-card style="height: 280px">
        <Echart :chartData="echartData.order" style="height: 280px"></Echart>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <Echart :chartData="echartData.user" style="height: 240px"></Echart>
        </el-card>
        <el-card style="height: 260px">
          <Echart
            :chartData="echartData.video"
            style="height: 240px"
            :isAxisChart="false"
          ></Echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../../api/data";
import * as echarts from "echarts";
import Echart from "../../components/ECharts.vue";
export default {
  name: "Home",
  data() {
    return {
      userImg: require("@/assets/images/user.png"),
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      order: [],
      userData: [],
      videoData: [],
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },

  components: {
    Echart,
  },

  created() {
    //     console.log("a");
    //  //在页面刷新时将vuex里的信息保存到localStorage里
    //   window.addEventListener("beforeunload",()=>{
    //    localStorage.setItem("messageStore",JSON.stringify(this.$store.state))
    //   })
    //  //在页面加载时读取localStorage里的状态信息
    //   this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("messageStore"))));
  },

  methods: {},
  mounted() {
    // 这是经过组件封装的,图表
    getData().then((res) => {
      if (res.data.code === 20000) {
        // 曲线图数据
        this.tableData = res.data.data.tableData;
        // 柱状图数据
        this.userData = res.data.data.userData;
        // 饼图数据
        this.videoData = res.data.data.videoData;
        const order = res.data.data.orderData;
        const xData = order.date;
        const keyArray = Object.keys(order.data[0]);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });
        // 曲线图
        // const option = {
        //   xAxis: {
        //     data: xData,
        //   },
        //   yAxis: {},
        //   legend: {
        //     data: keyArray,
        //   },
        //   series,
        // };
        this.echartData.order.xData = xData;
        this.echartData.order.series = series;
        // const E = echarts.init(this.$refs.echarts);
        // E.setOption(option);

        // 用户图  柱状图
        const userOption = {
          legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: this.userData.map((item) => item.date),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name: "新增用户",
              data: this.userData.map((item) => item.new),
              type: "bar",
            },
            {
              name: "活跃用户",
              data: this.userData.map((item) => item.active),
              type: "bar",
            },
          ],
        };
        this.echartData.user.xData = this.userData.map((item) => item.date);
        this.echartData.user.series = [
          {
            name: "新增用户",
            data: this.userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: this.userData.map((item) => item.active),
            type: "bar",
          },
        ];
        // const U = echarts.init(this.$refs.userEcharts);
        // U.setOption(userOption);

        // 饼图
        // const videoOption = {
        //   tooltip: {
        //     trigger: "item",
        //   },
        //   color: [
        //     "#0f78f4",
        //     "#dd536b",
        //     "#9462e5",
        //     "#a6a6a6",
        //     "#e1bb22",
        //     "#39c362",
        //     "#3ed1cf",
        //   ],
        //   series: [
        //     {
        //       data: this.videoData,
        //       type: "pie",
        //     },
        //   ],
        // };
        // const V = echarts.init(this.$refs.videoEcharts);
        // V.setOption(videoOption);
        this.echartData.video.series = [
          {
            data: this.videoData,
            type: "pie",
          },
        ];
      }
    });
  },

  // 没封装前使用的
  //   getData().then((res) => {
  //     if (res.data.code === 20000) {
  //       // 曲线图数据
  //       this.tableData = res.data.data.tableData;
  //       // 柱状图数据
  //       this.userData = res.data.data.userData;
  //       // 饼图数据
  //       this.videoData = res.data.data.videoData;
  //       const order = res.data.data.orderData;
  //       const xData = order.date;
  //       const keyArray = Object.keys(order.data[0]);
  //       const series = [];
  //       keyArray.forEach((key) => {
  //         series.push({
  //           name: key,
  //           data: order.data.map((item) => item[key]),
  //           type: "line",
  //         });
  //       });
  //       // 曲线图
  //       const option = {
  //         xAxis: {
  //           data: xData,
  //         },
  //         yAxis: {},
  //         legend: {
  //           data: keyArray,
  //         },
  //         series,
  //       };
  //       const E = echarts.init(this.$refs.echarts);
  //       E.setOption(option);

  //       // 用户图  柱状图
  //       const userOption = {
  //         legend: {
  //           // 图例文字颜色
  //           textStyle: {
  //             color: "#333",
  //           },
  //         },
  //         grid: {
  //           left: "20%",
  //         },
  //         // 提示框
  //         tooltip: {
  //           trigger: "axis",
  //         },
  //         xAxis: {
  //           type: "category", // 类目轴
  //           data: this.userData.map((item) => item.date),
  //           axisLine: {
  //             lineStyle: {
  //               color: "#17b3a3",
  //             },
  //           },
  //           axisLabel: {
  //             interval: 0,
  //             color: "#333",
  //           },
  //         },
  //         yAxis: [
  //           {
  //             type: "value",
  //             axisLine: {
  //               lineStyle: {
  //                 color: "#17b3a3",
  //               },
  //             },
  //           },
  //         ],
  //         color: ["#2ec7c9", "#b6a2de"],
  //         series: [
  //           {
  //             name: "新增用户",
  //             data: this.userData.map((item) => item.new),
  //             type: "bar",
  //           },
  //           {
  //             name: "活跃用户",
  //             data: this.userData.map((item) => item.active),
  //             type: "bar",
  //           },
  //         ],
  //       };
  //       const U = echarts.init(this.$refs.userEcharts);
  //       U.setOption(userOption);

  //       // 饼图
  //       const videoOption = {
  //         tooltip: {
  //           trigger: "item",
  //         },
  //         color: [
  //           "#0f78f4",
  //           "#dd536b",
  //           "#9462e5",
  //           "#a6a6a6",
  //           "#e1bb22",
  //           "#39c362",
  //           "#3ed1cf",
  //         ],
  //         series: [
  //           {
  //             data: this.videoData,
  //             type: "pie",
  //           },
  //         ],
  //       };
  //       const V = echarts.init(this.$refs.videoEcharts);
  //       V.setOption(videoOption);
  //     }
  //   });
  // },
};
</script>
<style lang='less' scoped>
.home {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
</style>