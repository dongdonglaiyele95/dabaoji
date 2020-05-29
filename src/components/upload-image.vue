<template>
  <!--上传素材组件-->
  <div>
    <slot></slot>
    <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      name="file_icon"
      action
      accept="png, jpg"
      :on-change="handleChange"
      :auto-upload="false"
    >
      <div v-if="file_icon || parentValue">
        <img ref="parentDom" :src="file_icon|| parentValue" class="avatar" />
      </div>
      <div v-else>
        <img :src="defaultPng" class="avatar" />
      </div>
    </el-upload>
    <el-button @click="remove()" type="danger" icon="el-icon-delete" circle></el-button>
  </div>
</template>

<script>
import defaultPng from "@/assets/images/default.png";
export default {
  name: "upload-image",
  props: ["value"],
  data() {
    return {
      defaultPng,
      file_icon: "",
      parentValue: ""
    };
  },
  // 监听父组件数据变化 并 赋值
  watch: {
    value: function(newVal, oldVal) {
      if (newVal) {
        this.parentValue = newVal;
      }
    }
  },
  methods: {
    // 改变图片 子组件预览 传父组件base64
    handleChange(file) {
      this.file_icon = URL.createObjectURL(file.raw);
      if (typeof file.raw == "object" && file.raw != null) {
        this.uploadFile(file.raw).then(res => {
          this.$emit("input", res);
        });
      }
    },
    // 清除图片
    remove() {
      this.parentValue = "";
      this.file_icon = "";
      this.$emit("input", "");
    },
    //   图片转码
    uploadFile(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
          resolve(e.currentTarget.result);
        };
      });
    }
  }
};
</script>

<style lang="less" scoped>
div {
  text-align: center;
}
</style>
