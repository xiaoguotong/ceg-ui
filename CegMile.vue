<template>
  <ceg-cell :titleWidth='24' title='行驶里程' :showArrow='false' :isGray='false' :showBorder='showBorder' :small='small'>
    <input @focus="handleFocus" @blur="handleBlur" class="right-input" style="width:160px;" maxlength="5" ref="mileInput" type="number" @input="bindInput" :value="mile" :placeholder="placeholder"> <span>万公里</span>
  </ceg-cell>

</template>


<style  scoped >
@import "./common.css";
input {
  outline: none;
  border: none;
  font-size: 1em;
}
</style>

<script>
const MAX_LENGTH = 5;
import CegCell from "./CegCell";
export default {
  name: "vin-mile",
  props: {
    value: String,
    placeholder: String,
    showBorder: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mile: "",
      scrollTop: 0
    };
  },
  methods: {
    bindInput: function(e) {
      let mile = e.target.value,
        oldMile = this.$data.mile;

      mile = mile && mile.substr(0, MAX_LENGTH);

      if (+mile > 100) {
        mile = oldMile;
      }
      this.$refs.mileInput.value = mile;
      this.$data.mile = mile;

      this.$emit("input", mile);
    },
    handleFocus: function(e) {
      this.$emit("focus", e);
      this.scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
    },
    handleBlur: function(e) {
      this.$emit("blur", e);
      document.documentElement.scrollTop = this.scrollTop;
      document.body.scrollTop = this.scrollTop;
    }
  },
  watch: {
    value: function(n, o) {
      this.$data.mile = n;
    }
  },
  components: {
    CegCell
  },
  mounted() {
    this.$data.mile = this.value;
  }
};
</script>
