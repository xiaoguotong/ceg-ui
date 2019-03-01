<template>
  <div class="ceg-modal">
    <img src="./images/loading.svg" alt="">
  </div>
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
  z-index: 88;
  -webkit-overflow-scrolling: touch;
  outline: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateZ(1px);
}

.ceg-modal img {
  width: 42px;
  height: 42px;
}
</style>

<script>
import { addClass, removeClass } from "./util";

export default {
  name: "loading",
  data() {
    return {};
  },
  props: {},
  methods: {
    getMask: function() {
      if (this.maskDom) return this.maskDom;
      var maskDom = document.createElement("div");
      this.maskDom = maskDom;
      return maskDom;
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
    }
  },

  created() {
    // this.openMask();
  },
  beforeDestroy() {
    this.closeMask();
  }
};
</script>
