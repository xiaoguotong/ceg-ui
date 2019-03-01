<template>
  <transition name="slider-right">
    <div class="ceg-slider-container" v-show="visible">
      <keep-alive>
        <slot></slot>
        <component v-if="currentComponent" v-bind:is="currentComponent" v-bind="property" @call-back='callback'></component>
      </keep-alive>
    </div>
  </transition>
</template>

<style scoped>
.ceg-slider-container {
  position: fixed;
  color: #333;
  background: white;
  box-sizing: border-box;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 99;
  transition: transform 0.3s linear;
  will-change: "transform";
}

.slider-right-enter,
.slider-right-leave-active {
  transform: translate3d(100%, 0, 0);
}
</style>

<script>
export default {
  name: "selectModel",
  data() {
    return {
      visible: false,
      property: {},
      //   currentTabComponent:''
      callback: function() {}
    };
  },
  props: {
    currentComponent: {},
    propVisible: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    propVisible:function (n) {
      this.visible=n;
    }
  }
};
</script>
