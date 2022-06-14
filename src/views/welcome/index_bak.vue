<template>
  <div style="margin-top:-24px; margin-bottom:-25px; !important;">
    <div id="static" class="common-container">
      <div class="banner lite">
        <section class="section">

          <div class="banner-title">
            <h1 class="banner-title-text">AIVision开发平台</h1>
            <div class="alink-grounp alink-grounp-center">
              <el-button type="primary"
                style="margin-left: 0px; width: 128px; height: 45px; letter-spacing: 1px; font-size: 18px; font-weight: 500;"
                @click="handleClickJump('task')">立即体验</el-button>
              <a href="http://183.129.217.214:20182/10087" target="_blank">
                <el-button type="info"
                  style="margin-left: 20px; width: 128px; height: 45px; letter-spacing: 1px; font-size: 18px; font-weight: 500;">
                  使用文档</el-button>
              </a>
            </div>
          </div>

          <div class="banner-main">
            <div class="banner-main-nav">
              <div class="banner-main-nav_title">零算法基础四步
                <br>定制复杂AI模型
              </div>
              <ul>
                <li>
                  <a target="__black" href="#" @click="handleClickJump('dataset')"
                    class="banner-main-nav_item">【数据】上传业务数据
                    <i class="icon el-icon-picture-outline"></i></a>
                </li>
                <li>
                  <a target="__black" href="#" @click="handleClickJump('task')" class="banner-main-nav_item">【任务】快速定制任务
                    <i class="icon el-icon-magic-stick"></i></a>
                </li>
                <li>
                  <a target="__black" href="#" @click="handleClickJump('task')" class="banner-main-nav_item">【训练】自动串行训练
                    <i class="icon el-icon-files"></i></a>
                </li>
                <li>
                  <a target="__black" href="#" @click="handleClickJump('task')" class="banner-main-nav_item">【部署】本地一键部署
                    <i class="icon el-icon-coin"></i></a>
                </li>
              </ul>
            </div>
            <div class="banner-main-swiper">
              <div class="swiper-container">
                <el-carousel height="350px">
                  <el-carousel-item>
                    <img src="./assets/dataset.jpg" style="height:100%;width:100%;" alt="上传数据集" title="上传数据集" />
                  </el-carousel-item>
                  <el-carousel-item>
                    <img src="./assets/task.jpg" style="height:100%;width:100%;" alt="创建任务" title="创建任务" />
                  </el-carousel-item>
                  <el-carousel-item>
                    <img src="./assets/train.jpg" style="height:100%;width:100%;" alt="训练" title="训练" />
                  </el-carousel-item>
                  <el-carousel-item>
                    <img src="./assets/deploy.jpg" style="height:100%;width:100%;" alt="本地部署" title="本地部署" />
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div style="padding-top: 0;" class="section-wrap section-white modal_section">
        <section id="" class="section">
          <div class="section-title_container">
            <div class="section-title">通用解决方案</div>
          </div>
          <div class="section-content">
            <div class="modeltype lite">

              <a v-for="item in keyToIndustry['general'].examples" :key="item.id"
                @click="createExample(item.key, 'general')" class="modeltype-item">
                <div class="modeltype-icon">
                  <img :src="require(item.img + '')" :alt="item.name">
                </div>
                <div class="modeltype-title">{{ item.name }}
                  <i class="el-icon-arrow-right" style="font-size: 18px"></i>
                </div>
                <div class="modeltype-type">
                  <span v-for="element in item.elements" :key="element">{{ element }}</span>
                </div>
                <div class="modeltype-desc">{{ item.desc }}</div>
              </a>

            </div>
          </div>
        </section>
      </div>

      <!-- 新加的 -->
      <div class="ai-home-section ai-home-section-industry">
        <div class="ai-home-section-title">行业解决方案</div>
        <div class="ai-platform-wrap">
          <div class="ai-layout-b">

            <!-- 通用 -->
            <!-- <a @click="handleClickIndustry('general')"
               class="ai-layout-b-item">
              <div class="ai-layout-b-item-img"><img src="./assets/general.jpg">
                <div class="ai-layout-b-item-title"> 通用场景 </div>
              </div>
            </a> -->

            <!-- 一般行业列表 -->
            <a v-for="item in industries" :key="item.id" @click="handleClickIndustry(item.key)"
              class="ai-layout-b-item">
              <div class="ai-layout-b-item-img"><img :src="require(item.img + '')">
                <div class="ai-layout-b-item-title"> {{ item.name }} </div>
              </div>
            </a>

            <!-- 更多 -->
            <a class="ai-layout-b-item">
              <div class="ai-layout-b-item-img"><img src="./assets/more.jpg">
                <div class="ai-layout-b-item-title"> 更多行业 </div>
              </div>
            </a>

          </div>
        </div>
        <div style="margin-bottom: 150px"></div>
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
      <div class="footer_copyright" style="text-align: center; ">
        <p style="color: rgb(255,255,255);">©2017-2019 Laboratory of Visual Intelligence and Pattern Analysis All Rights
          Reserved</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import _ from 'lodash'

import { industries, keyToIndustry } from './industries'

export default {
  name: 'MyFlowcharts',
  //   components: {
  //     FlowchartOverview
  //   },
  data() {
    return {
      industries: industries,
      keyToIndustry: keyToIndustry,
    }
  },

  computed: {},

  methods: {
    handleClickIndustry(industry) {
      var routeUrl = this.$router.resolve({
        name: 'Industry',
        params: { industry: industry },
      })
      window.open(routeUrl.href, '_blank')
    },
    handleClickJump(type) {
      var routeUrl
      if (type == 'dataset') {
        routeUrl = this.$router.resolve({
          name: 'My Datasets',
        })
        window.open(routeUrl.href, '_blank')
      } else if (type == 'task') {
        routeUrl = this.$router.resolve({
          name: 'My Flowcharts',
        })
      } else if (type == 'doc') {
        routeUrl = this.$router.resolve({
          name: 'Doc',
        })
      }
      window.open(routeUrl.href, '_blank')
    },
    createExample(task, industry) {
      let routeUrl = this.$router.resolve({
        name: 'Flowcharting',
        query: { task: task, industry: industry },
      })
      window.open(routeUrl.href, '_blank')
    },
  },
}
</script>

<style scoped>
.banner.lite {
  background-image: linear-gradient(transparent, white 100%),
    url('./assets/head.jpg');
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

.banner.lite .banner-main-nav>ul>li {
  cursor: pointer;
  margin-bottom: 28px;
  position: relative;
}

.banner.lite .banner-main-nav>ul>li,
.banner.lite .banner-main-nav>ul>li .banner-main-nav_item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.banner.lite .banner-main-nav>ul>li .banner-main-nav_item {
  font-size: 16px;
  line-height: 22px;
  vertical-align: middle;
}

.banner.lite .banner-main-nav>ul>li .banner-main-nav_item:hover {
  color: #036fe2;
}

.banner.lite .banner-main-nav>ul>li .icon {
  font-size: 16px;
  margin-left: 8px;
}

.banner.lite .banner-main-nav>ul>li .img-icon-wrap {
  margin-left: 8px;
  overflow: hidden;
  height: 22px;
  width: 22px;
}

.banner.lite .banner-main-nav>ul>li .img-icon {
  position: relative;
  left: -80px;
  height: 22px;
  width: 22px;
  -webkit-filter: drop-shadow(#000 80px 0);
  filter: drop-shadow(#000 80px 0);
}

.banner.lite .banner-main-nav>ul>li:before {
  content: '';
  display: block;
  height: 6px;
  width: 6px;
  background: #d8d8d8;
  border-radius: 50%;
  margin-right: 10px;
}

.banner.lite .banner-main-nav>ul>li:after {
  content: '';
  display: block;
  width: 0;
  height: 42px;
  border: 1px dashed #d8d8d8;
  position: absolute;
  left: 2px;
  top: 16px;
}

.banner.lite .banner-main-nav>ul>li:last-child:after {
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

.modeltype.lite .modeltype-title>i {
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

.modeltype.lite .modeltype-type>span {
  display: inline-block;
  height: 24px;
  padding: 0 12px;
  margin-right: 10px;
  margin-bottom: 6px;
  background: #f5f5f5;
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
  background-image: url('./assets/QRcode.png');
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

.common-container {}

.common-container .section {
  width: 1180px;
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




<style scoped>
.ai-platform-wrap {
  width: 1180px;
  margin: 0 auto;
  position: relative;
}

.ai-layout-b {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -moz-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.ai-layout-b-item {
  display: block;
  position: relative;
  width: 280px;
  height: 280px;
  /* padding-top: 44px; */
  border: 2px solid #dadcdf;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  color: inherit;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
}

.ai-layout-b-item-title {
  margin-top: -40px;
  color: white;
  font-size: 24px;
  line-height: 26px;
}

.ai-layout-b-item-img {
  width: 276px;
  height: 276px;
  background-repeat: no-repeat;
  -moz-background-size: contain;
  background-size: contain;
  margin: 0 auto;
}

.ai-home-section {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
}

.ai-home-section-title {
  font-size: 34px;
  line-height: 44px;
  text-align: center;
  color: inherit;
}

.ai-home-section-industry {
  /* padding-top: 50px; */
}

.ai-home-section-industry .ai-layout-b {
  margin-top: 56px;
}

.ai-home-section-industry .ai-layout-b-item {
  width: 280px;
  height: 280px;
  margin-top: 20px;
}

.ai-home-section-industry .ai-layout-b-item:not(:last-child):hover {
  border: 2px solid #1a73e8;
  -webkit-box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.05);
}

.ai-home-section-industry .ai-layout-b-item:last-child {
  pointer-events: none;
  cursor: default;
}

.ai-home-section-industry .ai-layout-b-item:not(:last-child):hover .ai-layout-b-item-title {
  font-weight: 700;
  /* color: #1a73e8; */
}
</style>