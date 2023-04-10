<template>
  <van-space direction="vertical" fill>
    <van-row>
      <van-col span="24">
        <van-search v-model="url" placeholder="请输入链接" :clearable="false" />
      </van-col>
    </van-row>

    <van-row>
      <van-col span="4" offset="2">
        <van-button type="primary" @click="clear">清空</van-button></van-col
      >

      <van-col span="4" offset="2">
        <van-button type="primary" @click="search">搜索</van-button></van-col
      >

      <van-col span="4" offset="2"
        ><van-button type="primary" @click="copy" v-if="text"
          >复制</van-button
        ></van-col
      >
    </van-row>

    <van-row>
      <van-col offset="2" span="20">
        <van-text-ellipsis
          class="text"
          :content="text"
          rows="10"
          expand-text="展开"
          collapse-text="收起"
        />
      </van-col>
    </van-row>
  </van-space>

  <van-back-top />
</template>

<script setup name="Home">
import { ref, onMounted, watch } from "vue";
import { getBodyByUrl } from "@/api/home.js";
import { showSuccessToast, showFailToast } from "vant";

const url = ref("");

const text = ref("");

watch(
  url,
  (value, oldValue) => {
    if (!value) {
      text.value = "";
    }
  },
  { immediate: true }
);

const clear = () => {
  url.value = "";
};
const copy = () => {
  try {
    navigator.clipboard.writeText(text.value).then(() => {
      showSuccessToast("复制成功!");
    });
  } catch (err) {
    showFailToast("复制失败");
  }
};

const search = () => {
  if (!url.value) {
    showFailToast("url不能为空!");
  }
  getBodyByUrl({ url: url.value })
    .then((res) => {
      text.value = res.data;
    })
    .catch(() => {
      showFailToast("解析失败!");
    });
};
</script>

<style scoped>
.text {
  font-size: 16px;
}
</style>
