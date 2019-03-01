<template>

</template>

<style scoped>
</style>
<script>
import SelectModel from "./SelectModel.js";
export default {
  name: "select-model-slider",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    componentName: {
      type: String,
      default: ""
    }
  },
  watch: {
    value: function(n, o) {
      if (n) {
        this.selectModel.open();
      } else {
        this.selectModel.close();
      }
    }
  },
  created() {
    this.selectModel = SelectModel(this.$slots, this.componentName, function(
      e
    ) {
      console.log(e);
    });
  },
  beforeDestroy() {
    if (this.selectModel) {
      this.selectModel.destroyed();
    }
  }
};
</script>
