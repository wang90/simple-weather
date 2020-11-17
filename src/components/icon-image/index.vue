<template>
  <view class="icon" :style="{ width: w +'px', height: h + 'px' ,backgroundImage:url(url)}"></view>
</template>
<style lang="less">
.icon {
  width: 50px;
  height: 50px;
  background: #fff;
  background-size: 100% 100%;
  background-repeat:  no-repeat;
  background-position: center center;
}
</style>
<script>
export default {
  name: 'IconImage',
  props:{
    'url': {
      type: String,
      default: '',
      require: true
    },
    'w': {
      type: Number,
      default: 50,
    },
    'h': {
      type: Number,
      default: 50,
    },

  },

}
</script>
