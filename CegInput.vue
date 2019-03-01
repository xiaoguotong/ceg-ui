<template>
  <ceg-cell :titleWidth='24' :title='title' :showArrow='false' :isGray='false' :showBorder='showBorder' :small="small">
    <input class="right-input" @focus="handleFocus" @blur="handleBlur" :type="type" :max-length="maxLen||maxLength" ref="valInput" @input="bindInput" :value="val" :placeholder="placeholder"><span>{{extra}}</span>
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
import CegCell from "./CegCell";
export default {
  name: "ceg-input",
  props: {
    value: String,
    placeholder: String,
    title: String,
    extra: String,
    type: {
      type: String,
      default: "text"
    },
    small: {
      type: Boolean,
      default: false
    },
    maxLen: {
      type: Number | String,
      default: ""
    },
    maxLength: {
      type: Number | String,
      default: 50
    },
    showBorder: {
      type: Boolean,
      default: true
    },
    regex: RegExp
  },
  data() {
    return {
      val: ""
    };
  },
  methods: {
    bindInput: function(e) {
      let val = e.target.value,
        regex = this.regex,
        maxLength = this.maxLen || this.maxLength;

      val = val && val.substr(0, maxLength);
      if (regex) {
        val = val.replace(regex, "");
      }
      this.$refs.valInput.value = val;
      this.$data.val = val;

      this.$emit("input", val);
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
      this.$data.val = n;
    }
  },
  components: {
    CegCell
  },
  mounted() {
    this.$data.val = this.value;
  }
};
</script>
