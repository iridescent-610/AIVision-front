<template>
  <div class="industry_demo">
    <div class="module-header"
      v-bind:style="{ background: 'url(&quot;' + require(typeToDesc[industry_type].back + '') + '&quot;) center center / cover no-repeat rgb(0, 0, 0)' }">
      <div class="module-header-container">
        <div class="module-header-content">
          <div v-bind:style="{ color: typeToDesc[industry_type].back_color }" class="module-header-title"> {{
              typeToDesc[industry_type].name
          }}</div>
          <div v-bind:style="{ color: typeToDesc[industry_type].back_color }" class="module-header-info"> {{
              typeToDesc[industry_type].desc
          }}</div>
        </div>
        <!-- <el-button style="margin-left: 100px" type="success"
          @click="createExample(typeToDesc[industry_type].key, typeToDesc[industry_type].industry)">立即创建
        </el-button> -->
        <!-- <div class="module-header-empty"></div> -->
      </div>
    </div>

    <div>
      <div v-if="typeToDesc[industry_type].demo_type === 'IMAGE'" class="demo-block" linknav="true">
        <div class="demo-canvas-container">
          <el-upload name="imgUpload" class="avatar-uploader" action="" accept="image/jpeg,image/png,image/bmp"
            :auto-upload="false" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleAvatarError"
            :before-upload="beforeAvatarUpload" :on-change="onUploadChange">
            <canvas id="canvas1" width="618" height="384" class="el-icon-plus avatar-uploader-icon" />
            <img v-show="isShow" src="./assets/icon_20_AIVison.png" class="demo-img">
            <div v-show="isShow" class="upload-notice1">
              点击此区域，上传图片
            </div>
            <div v-show="isShow" class="upload-notice2">
              支持PNG、JPG、JPEG、BMP，图片大小不超过4M
            </div>
          </el-upload>
        </div>
        <img src="./assets/arrow.png" class="arrow">
        <div class="demo-result-container">
          <canvas id="canvas2" ref="canvas2" width="618" height="384" />
        </div>
      </div>

      <div v-else-if="typeToDesc[industry_type].demo_type === 'VIDEO'" class="demo-block-video" linknav="true">
        <div class="demo-video-container">
          <div class="">
            <el-upload class="avatar-uploader-video" action="/aivision/20202/demo" v-bind:data="{ key: 'test' }"
              v-bind:on-progress="uploadVideoProcess" v-bind:on-success="handleVideoSuccess"
              v-bind:before-upload="beforeUploadVideo" v-bind:show-file-list="false">
              <video v-if="videoForm.showVideoPath != '' && !videoFlag" v-bind:src="videoForm.showVideoPath"
                class="video-avatar" controls="controls">
                您的浏览器不支持视频播放
              </video>
              <canvas v-else-if="videoForm.showVideoPath == '' && !videoFlag" width="595" height="334"
                class="el-icon-plus avatar-uploader-icon-video" />
              <!-- <i v-else-if="videoForm.showVideoPath == '' && !videoFlag"
                class="el-icon-plus avatar-uploader-icon-video"></i> -->
              <!-- <el-progress v-if="videoFlag == true" type="circle" v-bind:percentage="videoUploadPercent"
                style="margin-top: 211px; margin-left: 421px;"></el-progress> -->
              <!-- 270-59  480-59 -->
            </el-upload>
          </div>

          <img v-show="isShow" src="./assets/icon_21_AIVison.png" class="demo-img-video">
          <div v-show="isShow" class="upload-video-notice1">
            点击此区域，上传视频
          </div>
          <div v-show="isShow" class="upload-video-notice2">
            支持MP4，视频大小不超过10M
          </div>
        </div>
      </div>

      <div style="text-align: center; vertical-align: middle;">
        <el-button type="primary" class="note-button" @click="submitUpload">
          <img src="./assets/icon.png" style="display:inline-block; height:20px; width:20px;">
          {{ typeToDesc[industry_type].note }}
        </el-button>
      </div>
    </div>
    <div class="footer">
      <p>AI+X 普适化平台</p>
      <p>Copyright © 2022 浙江大学计算机创新技术研究院</p>
    </div>
  </div>
</template>

<script>
import {
  detectDemo,
} from "./api";
import { typeToDesc } from './industries'

import img_src from "./assets/plus.png";

export default {
  mounted() {
    if (this.typeToDesc[this.industry_type].demo_type === 'IMAGE')
      this.show_plus();
  },
  data() {
    return {
      industry_type: this.$route.params.type,
      demo_url: "",
      demo_base64: "",
      typeToDesc: typeToDesc,
      pred: {},
      ///////// video
      videoFlag: false,
      //是否显示进度条
      videoUploadPercent: "",
      //进度条的进度，
      isShowUploadVideo: false,
      //显示上传按钮
      videoForm: {
        showVideoPath: ''
      },
      //
      show_flag: true,
      isShow: true
    };
  },
  methods: {
    createExample(task, industry) {
      /// object_detection factory
      let routeUrl = this.$router.resolve({
        name: 'Flowcharting',
        query: { task: task, industry: industry },
      })
      window.open(routeUrl.href, '_blank')
    },
    show_plus() {
      let canvas = this.$refs.canvas1;
      let ctx = canvas.getContext("2d");
      let img = new Image();

      // if(img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
      //   ctx.drawImage(img, canvas.width / 2 - w / 2, canvas.height / 2 - h / 2, w, h)
      //   return; // 直接返回，不用再处理onload事件
      // }
      img.src = img_src;

      img.onload = function () {
        let w = 0.2 * img.width;
        let h = 0.2 * img.height; //这里的坑 获取图像高度要在加载完图像之后！
        ctx.drawImage(
          img,
          canvas.width / 2 - w / 2,
          canvas.height / 2 - h / 2,
          w,
          h
        );
      };
    },
    handleAvatarError(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      const canvas = document.getElementById("canvas1");
      var ctx = canvas.getContext("2d");
      var img = new Image();

      img.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var sw = img.width / canvas.width;
        var sh = img.height / canvas.height;
        var hh = img.height;
        var ww = img.width;
        if (sw > sh && sw > 1) {
          hh = img.height / sw;
          ww = canvas.width;
        } else if (sh > sw && sh > 1) {
          ww = img.width / sh;
          hh = canvas.height;
        }
        // var ww = img.width*canvas.height/img.height
        ctx.drawImage(
          img,
          canvas.width / 2 - ww / 2,
          canvas.height / 2 - hh / 2,
          ww,
          hh
        );
      };
      img.src = this.imageUrl;
      // ctx.fillStyle = 'black'
      // ctx.font = '20px Georgia'
      this.$message.error("上传失败!");
    },
    handleAvatarSuccess(res, file) {

      console.log(res.data.aa);
      // this.imageUrl = URL.createObjectURL(file.raw)
      // const canvas = document.getElementById('canvas1')
      // var ctx = canvas.getContext('2d')
      // var img = new Image()

      // img.onload = function () {
      //   ctx.clearRect(0, 0, canvas.width, canvas.height)
      //   var sw = img.width / canvas.width
      //   var sh = img.height / canvas.height
      //   var hh = img.height
      //   var ww = img.width
      //   if (sw > sh && sw > 1) {
      //     hh = img.height / sw
      //     ww = canvas.width
      //   } else if (sh > sw && sh > 1) {
      //     ww = img.width / sh
      //     hh = canvas.height
      //   }
      //   // var ww = img.width*canvas.height/img.height
      //   ctx.drawImage(
      //     img,
      //     canvas.width / 2 - ww / 2,
      //     canvas.height / 2 - hh / 2,
      //     ww,
      //     hh
      //   )
      // }
      // img.src = this.imageUrl
      // ctx.fillStyle = 'black'
      // ctx.font = '20px Georgia'
      this.$message("上传成功!");
    },
    beforeAvatarUpload(file) {
      const isImage =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/bmp";
      const isLt4M = file.size / 1024 / 1024 < 4;

      if (!isImage) {
        this.$message.error("上传格式必须为图片!");
      }
      if (!isLt4M) {
        this.$message.error("上传图片大小不能超过4MB!");
      }
      return isImage && isLt4M;
    },
    onUploadChange(file, fileList) {

      // const isIMAGE = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png');
      // const isLt1M = file.size / 1024 / 1024 < 1;

      // if (!isIMAGE) {
      //   this.$message.error('Only upload jpg/png picture!');
      //   return false;
      // }
      // if (!isLt1M) {
      //   this.$message.error('Upload file size cannot exceed 1 MB!');
      //   return false;
      // }
      ////
      this.pred = {};

      var This = this;
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function (e) {
        console.log(this.result); //base64 data for pictures
        This.demo_base64 = this.result;
      };
      /////////////////////////////
      this.imageUrl = URL.createObjectURL(file.raw);
      const canvas = document.getElementById("canvas1");
      var ctx = canvas.getContext("2d");
      var img = new Image();

      img.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var sw = img.width / canvas.width;
        var sh = img.height / canvas.height;
        var hh = img.height;
        var ww = img.width;
        if (sw > sh && sw > 1) {
          hh = img.height / sw;
          ww = canvas.width;
        } else if (sh > sw && sh > 1) {
          ww = img.width / sh;
          hh = canvas.height;
        }
        // var ww = img.width*canvas.height/img.height
        ctx.drawImage(
          img,
          canvas.width / 2 - ww / 2,
          canvas.height / 2 - hh / 2,
          ww,
          hh
        );
      };
      img.src = this.imageUrl;
      //////
      const canvas2 = document.getElementById("canvas2");
      const context2 = canvas2.getContext("2d");
      context2.clearRect(0, 0, canvas2.width, canvas2.height);

      this.isShow = false;
    },
    submitUpload() {
      var data = {
        image: this.demo_base64,
      };

      if (this.industry_type === 'security_check') {
        this.demo_url = "/20167/demo"
      } else if (this.industry_type === 'retail_detect') {
        this.demo_url = "/20200/demo"
      } else if (this.industry_type === 'card_recognition') {
        this.demo_url = "/20201/demo"
      } else if (this.industry_type === 'driver_action_recognition') {
        this.demo_url = "/20202/demo"
      }

      if (!this.demo_url) {
        this.$message.error("请输入请求url!");
        return;
      }
      detectDemo(this.demo_url, data).then((res) => {
        const pred = res.data.result

        const canvas = document.getElementById('canvas2')
        var ctx = canvas.getContext('2d')
        var img = new Image()

        img.onload = function () {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          var sw = img.width / canvas.width
          var sh = img.height / canvas.height
          var hh = img.height
          var ww = img.width
          if (sw > sh && sw > 1) {
            hh = img.height / sw
            ww = canvas.width
          } else if (sh > sw && sh > 1) {
            ww = img.width / sh
            hh = canvas.height
          }
          // var ww = img.width*canvas.height/img.height
          ctx.drawImage(
            img,
            canvas.width / 2 - ww / 2,
            canvas.height / 2 - hh / 2,
            ww,
            hh
          )
        }
        img.src = pred
      })
      // detectDemo("http://" + this.demo_url, data).then((res) => {
      //   this.pred = res.data;
      // });
    },


    ////////////////////////// VIDEO
    //上传前回调
    beforeUploadVideo(file) {
      var fileSize = file.size / 1024 / 1024 < 50;
      if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) == -1) {
        this.$message.error("请上传正确的视频格式");
        return false;
      }
      if (!fileSize) {
        this.$message.error("视频大小不能超过10MB");
        return false;
      }
      this.isShowUploadVideo = false;
    },
    //进度条
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
      if (this.videoUploadPercent >= 70 && this.show_flag) {
        this.$message({
          message: '请耐心等待处理结果',
          type: 'warning',
          duration: 10000
        });
        this.show_flag = false
      }
      this.isShow = false;
    },
    //上传成功回调
    handleVideoSuccess(res, file) {
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;

      // //前台上传地址
      // if (file.status == 'success' ) {
      //    this.videoForm.showVideoPath = file.url;
      // } else {
      //     this.$message.error("上传失败，请重新上传");
      // }

      // 后台上传地址
      if (res.code == 200) {
        this.videoForm.showVideoPath = res.data;
      } else {
        this.$message.error(res.Message);
      }
    }

  }
};
</script>

<style scoped>
canvas {
  display: block;
  /* float: left; */
}

.avatar-uploader-video {
  width: 595px;
  height: 334px;
}

/* .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
} */

/* .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 618px;
  height: 384px;
  line-height: 384px;
  text-align: center;
} */

.demo-img {
  display: block;
  height: 64px;
  width: 64px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 205px;
}

.demo-img-video {
  display: block;
  height: 64px;
  width: 64px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 170px;
}

.avatar-uploader-icon-video {
  font-size: 28px;
  color: #8c939d;
  width: 595px;
  height: 334px;
  line-height: 334px;
  text-align: center;
}

/*
.avatar {
  width: 500px;
  height: 420px;
  display: block;
} */

.video-avatar {
  width: 595px;
  height: 334px;
  display: block;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.demo-block {
  width: 1376px;
  margin: 32px auto 24px;
  /* padding-top: 20px; */
  display: flex;
  /* text-align: center; */
  /* margin-bottom: 60px; */
  position: relative;
}

.arrow {
  margin-top: 187px;
  width: 140px;
  height: 10px;
}

.demo-block-video {
  width: 595px;
  margin: 32px auto 24px;
  /* padding-top: 20px; */
  display: flex;
  /* text-align: center; */
  /* margin-bottom: 60px; */
}

.demo-video-container {
  position: relative;
  width: 595px;
  height: 334px;
  background: rgba(238, 242, 243, 1);
  border: 1px dash rgba(73, 93, 103, 0.35);
  border-radius: 4px;
}

.demo-canvas-container {
  position: relative;
  width: 618px;
  height: 384px;
  /* margin-right: 140px; */
  background: rgba(238, 242, 243, 1);
  border: 1px dash rgba(73, 93, 103, 0.35);
  border-radius: 4px;
}

.demo-result-container {
  position: relative;
  width: 618px;
  height: 384px;
  background: white;
  /* margin-left: 60px; */
  border: 1px solid rgba(73, 93, 103, 0.35);
  border-radius: 4px;
  /* border-style: solid;
  border-width: 2px;
  border-color: #000000; */
}

.upload-notice1 {
  position: absolute;
  bottom: 161px;
  left: 50%;
  transform: translate(-50%, 0);
  line-height: 20px;
  color: rgba(73, 93, 103, 1);
  font-size: 14px;
  text-align: center;
}

.upload-notice2 {
  position: absolute;
  bottom: 136px;
  left: 50%;
  transform: translate(-50%, 0);
  line-height: 17px;
  color: rgba(73, 93, 103, 0.65);
  font-size: 12px;
  text-align: center;
}

.upload-video-notice1 {
  position: absolute;
  bottom: 125px;
  left: 50%;
  transform: translate(-50%, 0);
  line-height: 21px;
  color: rgba(73, 93, 103, 1);
  font-size: 14px;
  text-align: center;
}

.upload-video-notice2 {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translate(-50%, 0);
  line-height: 18px;
  color: rgba(73, 93, 103, 0.65);
  font-size: 12px;
  text-align: center;
}

.note-button {
  width: 76px;
  height: 32px;
  background: rgba(25, 118, 210, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  text-align: center;
}

.button-icon {
  display: inline-block;
  height: 20px;
  width: 20px;
}

.textarea {
  width: 100%;
  min-height: 20px;
  /* 	max-height: 300px; */
  _height: 120px;
  margin-left: auto;
  margin-right: auto;
  padding: 3px;
  outline: 0;
  border: 1px solid #a0b3d6;
  font-size: 12px;
  line-height: 24px;
  padding: 2px;
  word-wrap: break-word;
  overflow-x: hidden;
  overflow-y: auto;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>

<style scoped>
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
  padding: 4px 4px;
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
</style>


<style scoped>
.industry_demo {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
}

.module-header {
  height: 193px;
  color: #fff;
  background: #000;
}

.module-header-container {
  position: relative;
  margin-left: 32px;
  height: 100%;
  /* color: rgba(59, 112, 42, 1); */
  /* overflow: hidden; */
}

.module-header-title {
  padding-top: 40px;
  font-size: 36px;
  line-height: 50px;
}

.module-header-info {
  width: 766px;
  margin-top: 8px;
  font-size: 14px;
  height: 50px;
}

/* .module-header-content,
.module-header-empty {
  display: inline-block;
  vertical-align: middle;
} */

.module-header-empty {
  height: 100%;
}

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  color: rgba(69, 90, 100, 0.35);
  line-height: 20px;
  font-size: 12px;
  text-align: center;
  padding: 4px 0 7px 0;
  border-top: 1px solid rgba(69, 90, 100, 0.1);
  margin-top: auto;
}
</style>
