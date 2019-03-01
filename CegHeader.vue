<template>
  <header class="ceg-header" :class="{ 'is-fixed': fixed }">
    <div class="ceg-header-button  is-left">
      <slot name="left">
         <div class="left-arrow"  @click="back"></div>
      </slot>
    </div>
    <h1 class="ceg-header-title text-ellipsis" v-text="title"></h1>
    <div class="ceg-header-button is-right">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<style scoped>
@import "./common.css";

.ceg-header {
  align-items: center;
  background-color: #f5f5f5;
  box-sizing: border-box;
  color: #333;
  display: flex;
  font-size: 14px;
  height: 40px;
  line-height: 1;
  padding: 0 10px;
  position: relative;
  text-align: center;
  white-space: nowrap;
}
.ceg-button {
  background-color: transparent;
  border: 0;
  box-shadow: none;
  color: inherit;
  display: inline-block;
  padding: 0;
  font-size: inherit;
}
.ceg-button::after {
  content: none;
}
.ceg-header-button {
  flex: 0.5;
}
.ceg-header-button > a {
  color: inherit;
}

.ceg-header-title {
  font-size: inherit;
  font-weight: normal;
  flex: 1;
}
.is-left {
  text-align: left;
}
.is-right {
  text-align: right;
}

.is-fixed {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}

.left-arrow {
  position: relative;
  width: 20px;
  height: 10px;
}
.left-arrow::after {
  position: absolute;
  left: 4px;
  content: " ";
  top: 50%;
  transform: translateY(-50%) rotate(-45deg);
  width: 8px;
  height: 8px;
  border: transparent;
  border-top: 1px solid;
  border-left: 1px solid;
  border-color: #333;
}
</style>
<script>
export default {
  name: "ceg-header",

  props: {
    fixed: Boolean,
    title: String
  },
  methods: {
    back:function(){
      this.$emit('back')
    }
  }
};
</script>

