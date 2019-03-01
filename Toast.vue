<template>
  <transition name="ceg-toast-pop">
    <div class="ceg-toast" v-show="visible" :class="customClass">
      <span class="ceg-toast-text">{{ message }}</span>
    </div>
  </transition>
</template>

<script type="text/babel">
export default {
  name: "Toast",
  props: {
    message: String,
    className: {
      type: String,
      default: ""
    },
    position: {
      type: String,
      default: "middle"
    }
  },
  data() {
    return {
      visible: false
    };
  },
  computed: {
    customClass() {
      var classes = [];
      switch (this.position) {
        case "top":
          classes.push("is-placetop");
          break;
        case "bottom":
          classes.push("is-placebottom");
          break;
        default:
          classes.push("is-placemiddle");
      }
      classes.push(this.className);

      return classes.join(" ");
    }
  }
};
</script>

<style >

.ceg-toast {
  position: fixed;
  max-width: 80%;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  box-sizing: border-box;
  text-align: center;
  z-index: 1000;
  transition: opacity 0.3s linear;
  padding: 10px;
  white-space: nowrap;
}

.ceg-toast-text {
  font-size: 14px;
  display: block;
  text-align: center;
}

.is-placetop {
  top: 50px;
  left: 50%;
  transform: translate(-50%, 0);
}

.is-placemiddle {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.is-placebottom {
  bottom: 50px;
  left: 50%;
  transform: translate(-50%, 0);
}

.ceg-toast-pop-enter,
.ceg-toast-pop-leave-active {
  opacity: 0;
}
</style>


