<template>
  <transition name="modal-center">
    <div class="ceg-modal" v-if="value">
      <div class="ceg-modal-content">
        <div class="ceg-modal-header" v-if="!!title">
          <div class="ceg-modal-title">{{title}}</div>
        </div>
        <div class="ceg-modal-body" v-if="!!message">
          <div class="ceg-modal-message" v-html="message"></div>
        </div>
        <div class="ceg-modal-footer ">
          <button class="ceg-modal-btn ceg-modal-btn-cancel" v-if="showCancelBouttn" @click="handleBtnClick('cancel')">{{cancelButtonText}}</button>
          <button class="ceg-modal-btn ceg-modal-btn-confirm" v-if="showConfirmButton" @click="handleBtnClick('confirm')">{{confirmButtonText}}</button>
        </div>
      </div>
    </div>
  </transition>
</template>



<style scoped>
@import "./common.css";
@import "./mask.css";
.ceg-modal {
  position: fixed;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  z-index: 999;
  -webkit-overflow-scrolling: touch;
  outline: 0;
  display: flex;
  justify-content: center;
  align-items: center;
 transform: translateZ(1px);
}

.ceg-modal-content {
  position: relative;
  background-color: #fff;
  border: 0;
  background-clip: padding-box;
  text-align: center;
  /* height: 100%; */
  overflow: hidden;
  border-radius: 7px;
  padding-top: 15px;
  width: 270px;
}

.ceg-modal-header {
  padding: 6px 15px 15px;
}

.ceg-modal-title {
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  color: #333;
}

.ceg-modal-footer {
  position: relative;
  display: flex;
  margin-top: 16px;
  border-top: 1px solid #ddd;
}

.modal-center-enter {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.7);
}
.modal-center-leave-active {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.9);
}
</style>

<script>
import { addClass, removeClass, getScrollBarWidth } from "./util";

export default {
  name: "Modal",
  data() {
    return {
      value: false,
      title: "",
      message: "",
      callback: null,
      showConfirmButton: true,
      showCancelBouttn: false,
      confirmButtonText: "确定",
      cancelButtonText: "取消"
    };
  },
  beforeDestroy() {
    this.unLockScroll();
  },
  props: {},
  methods: {
    lockScroll: function() {
      if (!this.bodyOverflow) {
        this.bodyPaddingRight = document.body.style.paddingRight;
        this.bodyOverflow = document.body.style.overflow;
      }
      var scrollBarWidth = getScrollBarWidth();
      let bodyHasOverflow =
        document.documentElement.clientHeight < document.body.scrollHeight;
      if (scrollBarWidth > 0 && bodyHasOverflow) {
        document.body.style.paddingRight = scrollBarWidth + "px";
      }
      document.body.style.overflow = "hidden";
    },
    unLockScroll: function() {
      setTimeout(() => {
        if (this.bodyOverflow !== "hidden") {
          document.body.style.overflow = this.bodyOverflow;
          document.body.style.paddingRight = this.bodyPaddingRight;
        }
        this.bodyOverflow = null;
        this.bodyPaddingRight = null;
      }, 200);
    },
    getMask: function() {
      if (this.maskDom) return this.maskDom;
      var maskDom = document.createElement("div"),
        that = this;

      maskDom.addEventListener("touchmove", function(event) {
        event.preventDefault();
        event.stopPropagation();
      });

      maskDom.addEventListener("click", function() {
        that.doOnModalClick && that.doOnModalClick();
      });

      this.maskDom = maskDom;

      return maskDom;
    },
    doOnModalClick: function() {
      this.closeMask();
    },
    openMask: function() {
      var maskDom = this.getMask();
      addClass(maskDom, "ceg-modal-mask ceg-modal-mask-enter");
      setTimeout(() => {
        removeClass(maskDom, "ceg-modal-mask-enter");
      }, 200);
     
      document.body.appendChild(maskDom);
    },
    closeMask: function() {
      var maskDom = this.getMask();
      addClass(maskDom, "ceg-modal-mask-leave");

      setTimeout(() => {
        if (maskDom.parentNode) maskDom.parentNode.removeChild(maskDom);
        maskDom.style.display = "none";
        this.maskDom = undefined;
        removeClass(maskDom, "ceg-modal-mask-leave");
      }, 200);
    
    },
    handleBtnClick: function(type) {
      this.closeMask();
      this.value=false;
      this.callback && this.callback(type);
    }
  
  },
 
  created () {
    this.openMask();
  }
};
</script>
