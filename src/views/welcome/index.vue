<template>
  <div style="width: 100%">
    <div id="static" class="common-container">
      <!-- <div class="banner lite">
        <section class="section">
          <div class="banner-title">
            <h1 class="banner-title-text">AIVision开发平台</h1>
            <div class="alink-grounp alink-grounp-center">
              <el-button
                type="primary"
                style="
                  margin-left: 0px;
                  width: 128px;
                  height: 45px;
                  letter-spacing: 1px;
                  font-size: 18px;
                  font-weight: 500;
                "
                @click="handleClickJump('task')"
                >立即体验</el-button
              >
              <a href="http://10.214.211.207:10087" target="_blank">
                <el-button
                  type="info"
                  style="
                    margin-left: 20px;
                    width: 128px;
                    height: 45px;
                    letter-spacing: 1px;
                    font-size: 18px;
                    font-weight: 500;
                  "
                  >使用文档</el-button
                >
              </a>
            </div>
          </div>

          <div class="banner-main">
            <div class="banner-main-nav">
              <div class="banner-main-nav_title">
                零算法基础四步 <br />定制复杂AI模型
              </div>
              <ul>
                <li>
                  <a
                    target="__black"
                    href="#"
                    @click="handleClickJump('dataset')"
                    class="banner-main-nav_item"
                    >【数据】上传业务数据
                    <i class="icon el-icon-picture-outline"></i
                  ></a>
                </li>
                <li>
                  <a
                    target="__black"
                    href="#"
                    @click="handleClickJump('task')"
                    class="banner-main-nav_item"
                    >【任务】快速定制任务
                    <i class="icon el-icon-magic-stick"></i
                  ></a>
                </li>
                <li>
                  <a
                    target="__black"
                    href="#"
                    @click="handleClickJump('task')"
                    class="banner-main-nav_item"
                    >【训练】自动串行训练 <i class="icon el-icon-files"></i
                  ></a>
                </li>
                <li>
                  <a
                    target="__black"
                    href="#"
                    @click="handleClickJump('task')"
                    class="banner-main-nav_item"
                    >【部署】本地一键部署 <i class="icon el-icon-coin"></i
                  ></a>
                </li>
              </ul>
            </div>
            <div class="banner-main-swiper">
              <div class="swiper-container">
                <el-carousel height="350px">
                  <el-carousel-item>
                    <img
                      src="./assets/dataset.jpg"
                      style="height: 100%; width: 100%"
                      alt="上传数据集"
                      title="上传数据集"
                    />
                  </el-carousel-item>
                  <el-carousel-item>
                    <img
                      src="./assets/task.jpg"
                      style="height: 100%; width: 100%"
                      alt="创建任务"
                      title="创建任务"
                    />
                  </el-carousel-item>
                  <el-carousel-item>
                    <img
                      src="./assets/train.jpg"
                      style="height: 100%; width: 100%"
                      alt="训练"
                      title="训练"
                    />
                  </el-carousel-item>
                  <el-carousel-item>
                    <img
                      src="./assets/deploy.jpg"
                      style="height: 100%; width: 100%"
                      alt="本地部署"
                      title="本地部署"
                    />
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
          </div>
        </section>
      </div> -->

      <div class="introduction">
        <div class="intro-title">AIVision - 视频图像范式平台</div>
        <div class="intro-subtitle">
          通过普适化技术，以API调用方式，零门槛快速具备AI检测能力
        </div>
        <div class="intro-describe">
          <p>
            基于已有数据进行训练，定制多种图像处理和图像分析的AI模型，解决图像增强、图像分类、物体检测、语义
          </p>
          <p>
            分割、视频分析等问题，适用于安检图像识别、物品分类统计、视频动作识别等各类应用场景。
          </p>
        </div>
        <div class="intro-button">
          <el-button
            type="primary"
            style="
              margin-left: 0px;
              margin-bottom: 6%;
              width: 128px;
              height: 45px;
              letter-spacing: 1px;
              font-size: 18px;
              font-weight: 500;
            "
            @click="handleClickJump('task')"
            >立即使用</el-button
          >
          <a href="http://10.214.211.207:10087" target="_blank">
            <el-button
              type="info"
              style="
                margin-left: 20px;
                margin-bottom: 6%;
                width: 128px;
                height: 45px;
                letter-spacing: 1px;
                font-size: 18px;
                font-weight: 500;
              "
              >查看文档</el-button
            >
          </a>
        </div>
      </div>

      <div
        style="padding-top: 0"
        class="section-wrap section-white modal_section"
      >
        <section id="generic_template" class="section">
          <div class="section-title_container">
            <div class="section-title">预置通用模板</div>
          </div>
          <div class="section-content">
            <div class="modeltype lite">
              <a
                v-for="item in keyToIndustry['general'].examples"
                :key="item.id"
                @click="createExample(item.key, 'general')"
                class="modeltype-item"
                id="generic_template_item"
              >
                <div class="modeltype-icon" id="generic_template_icon">
                  <img :src="require(item.img + '')" :alt="item.name" />
                </div>
                <div class="modeltype-title">
                  {{ item.name }}
                  <i class="el-icon-arrow-right" style="font-size: 18px"></i>
                </div>
                <div class="modeltype-type">
                  <span v-for="element in item.elements" :key="element">{{
                    element
                  }}</span>
                </div>
                <div class="modeltype-desc">{{ item.desc }}</div>
              </a>
            </div>
          </div>
        </section>
      </div>

      <div
        style="padding-top: 0"
        class="section-wrap section-white modal_section"
      >
        <section id="" class="section">
          <div class="section-title_container">
            <div class="section-title">行业应用案例</div>
          </div>
          <div class="section-content">
            <div class="modeltype lite">
              <a
                v-for="item in realApplication"
                :key="item.id"
                class="modeltype-item"
              >
                <div class="modeltype-icon">
                  <img :src="require(item.img + '')" :alt="item.name" />
                </div>
                <div class="modeltype-title">
                  {{ item.name }}
                  <i class="el-icon-arrow-right" style="font-size: 18px"></i>

                  <el-button
                    class="button"
                    plain
                    @click="createExample(item.key, item.industry)"
                    >创建</el-button
                  >
                  <el-button class="button" plain @click="demoExample(item.id)"
                    >演示</el-button
                  >
                </div>
                <div class="modeltype-type">
                  <span v-for="element in item.elements" :key="element">{{
                    element
                  }}</span>
                </div>
                <div class="modeltype-desc">{{ item.desc }}</div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>

    <div class="footer">
      <div class="footer_cover">
        <el-row>
          <el-col :span="6" :offset="6">
            <div class="ai_items_class connect">
              <div class="ai_title">联系地址</div>
              <div>
                <div class="ai_items qq">浙江省杭州市西湖区浙大路38号</div>
                <div class="ai_items qq">浙江大学玉泉校区</div>
                <div class="ai_items qq">曹光彪西楼404室</div>
                <div class="ai_items qq">视觉智能和模式识别实验室</div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="ai_items_img">新浪微博</div>
          </el-col>
        </el-row>
      </div>
      <div class="footer_copyright" style="text-align: center">
        <p style="color: rgb(255, 255, 255)">
          ©2017-2019 Laboratory of Visual Intelligence and Pattern Analysis All
          Rights Reserved
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import _ from "lodash";

import { keyToIndustry, realApplication, typeToDesc } from "./industries";

export default {
  name: "MyFlowcharts",
  //   components: {
  //     FlowchartOverview
  //   },
  data() {
    return {
      keyToIndustry: keyToIndustry,
      realApplication: realApplication,
      typeToDesc: typeToDesc,
    };
  },

  computed: {},

  methods: {
    handleClickIndustry(industry) {
      var routeUrl = this.$router.resolve({
        name: "Industry",
        params: { industry: industry },
      });
      window.open(routeUrl.href, "_blank");
    },
    handleClickJump(type) {
      var routeUrl;
      if (type == "dataset") {
        routeUrl = this.$router.resolve({
          name: "My Datasets",
        });
        window.open(routeUrl.href, "_blank");
      } else if (type == "task") {
        routeUrl = this.$router.resolve({
          name: "My Flowcharts",
        });
      } else if (type == "doc") {
        routeUrl = this.$router.resolve({
          name: "Doc",
        });
      }
      window.open(routeUrl.href, "_blank");
    },
    createExample(task, industry) {
      /// object_detection factory
      let routeUrl = this.$router.resolve({
        name: "Flowcharting",
        query: { task: task, industry: industry },
      });
      window.open(routeUrl.href, "_blank");
    },
    demoExample(type) {
      console.log(type);
      let routeUrl = this.$router.resolve({
        name: "IndustryDemo",
        params: { type: type },
      });

      //  console.log({ id: id, name: this.allFlowChartData[index].name })
      window.open(routeUrl.href, "_blank");
    },
  },
};
</script>

<style scoped>
.banner.lite {
  background-image: linear-gradient(transparent, white 100%),
    url("./assets/head.jpg");
  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 60px;
  padding-bottom: 80px;
}
.banner.lite .banner-title {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 45px;
}
.banner.lite .banner-title-text {
  margin: 0;
  font-size: 42px;
  letter-spacing: 3px;
  line-height: 1.5;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  color: #c6c2d3;
}
.banner.lite .banner-main {
  overflow: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 350px;
  -webkit-box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);
}
.banner.lite .banner-main-nav {
  background: #f8f9fb no-repeat bottom/100%;
  background-position: 0 3px;
  width: 300px;
  padding: 42px 40px 40px;
}
.banner.lite .banner-main-nav_title {
  font-size: 20px;
  letter-spacing: 4px;
  line-height: 32px;
  margin-bottom: 30px;
  font-weight: 500;
}
.banner.lite .banner-main-nav > ul > li {
  cursor: pointer;
  margin-bottom: 28px;
  position: relative;
}
.banner.lite .banner-main-nav > ul > li,
.banner.lite .banner-main-nav > ul > li .banner-main-nav_item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.banner.lite .banner-main-nav > ul > li .banner-main-nav_item {
  font-size: 16px;
  line-height: 22px;
  vertical-align: middle;
}
.banner.lite .banner-main-nav > ul > li .banner-main-nav_item:hover {
  color: #036fe2;
}
.banner.lite .banner-main-nav > ul > li .icon {
  font-size: 16px;
  margin-left: 8px;
}
.banner.lite .banner-main-nav > ul > li .img-icon-wrap {
  margin-left: 8px;
  overflow: hidden;
  height: 22px;
  width: 22px;
}
.banner.lite .banner-main-nav > ul > li .img-icon {
  position: relative;
  left: -80px;
  height: 22px;
  width: 22px;
  -webkit-filter: drop-shadow(#000 80px 0);
  filter: drop-shadow(#000 80px 0);
}
.banner.lite .banner-main-nav > ul > li:before {
  content: "";
  display: block;
  height: 6px;
  width: 6px;
  background: #d8d8d8;
  border-radius: 50%;
  margin-right: 10px;
}
.banner.lite .banner-main-nav > ul > li:after {
  content: "";
  display: block;
  width: 0;
  height: 42px;
  border: 1px dashed #d8d8d8;
  position: absolute;
  left: 2px;
  top: 16px;
}
.banner.lite .banner-main-nav > ul > li:last-child:after {
  display: none;
}
.banner.lite .banner-main-swiper {
  width: 900px;
  height: 350px;
  overflow: hidden;
  position: relative;
}
.banner.lite .slide {
  width: 900px;
  height: 350px;
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
}
.banner.lite .lite-swiper-pagination {
  position: absolute;
  bottom: 86px;
  text-align: center;
  width: 100%;
  height: 19px;
  z-index: 10;
}

.introduction {
  width: 100%;
  background-image: url("./assets/head.jpg");
  margin: 0 auto 5%;
  text-align: center;
}
.intro-title {
  padding: 5% 0 0;
  color: white;
  font-size: 48px;
}
.intro-subtitle {
  padding: 5px;
  color: white;
  font-size: 18px;
  font-weight: 800;
}
.intro-describe {
  padding: 3% 0 2%;
  color: white;
  font-size: 18px;
}
.intro-button {
  text-align: center;
}

.modeltype.lite {
  font-size: 16px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  /* justify-content: space-between; */
}
.modeltype.lite .modeltype-item {
  display: block;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  /* flex-grow: 1; */
  width: 382px;
  padding: 30px;
  border: 1px solid rgba(0, 0, 0, 0);
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
.modeltype.lite .modeltype-item:hover {
  border: 1px solid #036fe2;
  -webkit-box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);
}

.modeltype.lite .modeltype-item:hover .modeltype-title {
  color: #503ef3;
}

.modeltype.lite .modeltype-item .modeltype-title .button {
  padding: 6px 10px 6px 10px;
  float: right;
  margin: 2px 3px 0 3px;
}
/* .modeltype.lite .modeltype-item:last-child {
  -webkit-box-flex: 0;
  -ms-flex-positive: 0;
  flex-grow: 0;
  margin-bottom: 0;
} */
.modeltype.lite .modeltype-icon {
  width: 320px;
  margin-bottom: 24px;
}
.modeltype.lite .modeltype-title {
  display: block;
  font-size: 20px;
  line-height: 30px;
  padding-bottom: 20px;
  margin-bottom: 24px;
  border-bottom: 1px solid #e1e1e1;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
.modeltype.lite .modeltype-title > i {
  font-size: 12px;
  padding-left: 10px;
}
.modeltype.lite .modeltype-title:hover {
  color: #503ef3;
}
.modeltype.lite .modeltype-desc {
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  font-size: 14px;
  color: #666;
  line-height: 24px;
}
.modeltype.lite .modeltype-type {
  font-size: 14px;
  line-height: 24px;
  margin-bottom: 10px;
  /* margin-right: 10px; */
  overflow: hidden;
  color: #000;
}
.modeltype.lite .modeltype-type > span {
  display: inline-block;
  height: 24px;
  padding: 0 12px;
  margin-right: 10px;
  margin-bottom: 6px;
  background: #f5f5f5;
}

#generic_template {
  width: 924px;
}
#generic_template_item {
  width: 462px;
}
#generic_template_icon {
  width: 400px;
}

:root {
  --swiper-theme-color: #007aff;
}
.swiper-container {
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  list-style: none;
  padding: 0;
  z-index: 1;
}
.swiper-container /deep/ .el-carousel__button {
  background-color: #0c24ad;
}

.footer {
  vertical-align: top;
  background-color: rgba(3, 3, 122, 0.8);
  /* padding-right: 220px; */
}
.footer .footer_cover {
  width: 100%;
  height: 300px;
  margin: 0 auto;
}
.footer .ai_items_img {
  padding-top: 158px;
  color: #ffffff;

  font-size: 14px;
  width: 138px;
  text-align: center;
  margin-top: 80px;
  margin-left: 200px;
  background-image: url("./assets/QRcode.png");
  /* background-size: 200px 200px; */
  background-repeat: no-repeat;
}
.footer .ai_items_class {
  width: 259px;
  text-align: center;
  font-size: 18px;
  color: #fff;
  display: block;
  margin: 0 auto;
}
.footer .ai_items_class .title {
  font-size: 18px;
  margin: 20px 0 20px;
}
.footer .ai_items_class .desc {
  font-size: 14px;
  line-height: 20px;
  opacity: 0.66;
  max-width: 302px;
}
.footer .ai_items_class.logo {
  width: 405px;
}
.footer .ai_items_class.resource {
  width: 158px;
}
.footer .ai_items_class.market {
  width: 170px;
}
.footer .ai_items {
  font-size: 14px;
  color: #fff;
  opacity: 0.66;
  line-height: 36px;
  cursor: pointer;
}
.footer .ai_items.qq {
  cursor: default;
  white-space: nowrap;
}
.footer .ai_items.qq:hover {
  color: #fff;
}
.footer .ai_items:hover {
  opacity: 1;
  color: #036fe2;
  /* #3B5998 */
}
.footer .ai_title {
  margin: 48px 0 27px;
  text-align: center;
  color: #fff;
  font-size: 36px;
  opacity: 1;
  cursor: default;
}
.footer .footer_copyright {
  line-height: 50px;
  font-size: 14px;
}

body,
html {
  height: 100%;
  width: 100%;
  /* min-width: 1200px; */
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Helvetica, Arial,
    sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*,
body,
html {
  padding: 0;
  margin: 0;
}
* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
a {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
img {
  width: 100%;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.modal_section .section-title_container {
  padding-bottom: 30px;
}
.section {
  margin: 0 auto;
  font-size: 0;
}
.section-wrap {
  padding-top: 60px;
  padding-bottom: 60px;
}
.section-white {
  background: rgba(0, 0, 0, 0);
}
.section-title_container {
  padding-bottom: 60px;
}
.section-title {
  width: 100%;
  font-size: 32px;
  text-align: center;
  font-weight: 400;
  letter-spacing: normal;
}
.common-container .section {
  width: 1146px;
}
.alink {
  display: inline-block;
  text-align: center;
  min-width: 130px;
  padding: 8px;
  font-size: 18px;
  line-height: 30px;
  cursor: pointer;
}

.alink-grounp.alink-grounp-center {
  text-align: center;
}
.alink-grounp.alink-grounp-left {
  text-align: left;
}
</style>


