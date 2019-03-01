<template>
  <transition :name="currentTransition">
    <div v-show="currentValue" class="popup-container" :class="'popup-'+position">

      <slot></slot>
    </div>
  </transition>

</template>

<style scoped>
.popup-container {
  position: fixed;
  background: #fff;
  top: 50%;
  left: 50%;
  z-index: 99;
  transform: translate3d(-50%, -50%, 0);
  backface-visibility: hidden;
  transition: 0.2s ease-out;
  
}
.popup-top {
  top: 0;
  right: auto;
  bottom: auto;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}

.popup-right {
  top: 50%;
  right: 0;
  bottom: auto;
  left: auto;
  transform: translate3d(0, -50%, 0);
}

.popup-left {
  top: 50%;
  right: auto;
  bottom: auto;
  left: 0;
  transform: translate3d(0, -50%, 0);
}

.popup-bottom {
  top: auto;
  right: auto;
  bottom: 0;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  width: 100%;
}

.popup-slide-top-enter,
.popup-slide-top-leave-active {
  transform: translate3d(-50%, -100%, 0);
}

.popup-slide-right-enter,
.popup-slide-right-leave-active {
  transform: translate3d(100%, -50%, 0);
}

.popup-slide-bottom-enter,
.popup-slide-bottom-leave-active {
  transform: translate3d(-50%, 100%, 0);
}

.popup-slide-left-enter,
.popup-slide-left-leave-active {
  transform: translate3d(-100%, -50%, 0);
}

.popup-fade-enter,
.popup-fade-leave-active {
  opacity: 0;
}
</style>

<script>
export default {
  name: "popup",
  data() {
    return {
      currentValue: false,
      currentTransition: ""
    };
  },
  watch: {
    currentValue(val) {
      this.$emit("input", val);
    },

    value(val) {
        setTimeout(() => {
      
      if (!val) {
          this.close();
      } else {
        this.open();
      }
        },200)
      this.currentValue = val;
    }
  },
  props: {
    position: {
      type: String,
      default: "bottom"
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    //v-on:after-enter="afterEnter" v-on:enter-cancelled="enterCancelled" v-on:before-leave="beforeLeave" v-on:leave="leave" v-on:after-leave="afterLeave"
    // afterEnter: function(el) {console.log('afterEnter')},
    // enterCancelled: function(el) {console.log('enterCancelled')},
    // beforeLeave: function(el) {console.log('beforeLeave')},
    // leave: function(el) {console.log('leave')},
    // beforeEnter:function(){
    //    this.open();
    // },
    // leave: function(el) {this.close()},
    open: function() {
      if (!this.maskDom) {
        this.genMask();
      }
    },
    close: function() {
      this.currentValue = false;
      if (this.maskDom) {
        document.body.removeChild(this.maskDom);
        this.maskDom = null;
      }
    },
    genMask: function() {
      let maskDom = document.createElement("div"),
        that = this;
      maskDom.setAttribute("class", "ceg-modal-mask");

      maskDom.addEventListener("click", function() {
        that.currentValue = false;
        that.close.apply(that);
      });
      document.body.appendChild(maskDom);
      this.maskDom = maskDom;
    }
  },
  beforeMount() {
    this.currentTransition = `popup-slide-${this.position}`;
  },
  mounted() {
    if (this.value) {
      this.$data.currentValue = true;
      this.open();
    }
  },
  beforeDestroy() {
    this.close();
  }
};
</script>
