<template>
  <ceg-cell :titleWidth='20' :title='title' :showArrow='false' :isGray='false'>
    <div class="vin-input">
      <input type="text" maxlength="17" ref="input" :value="vin" @compositionstart="compositionstart" @compositionend="compositionend" @input="bindInput" placeholder="请输入17位车架号（必填）">
      <span><img src="./images/delete.png" @click="clearVin">{{this.$data.vin.length}}/17</span>
    </div>
  </ceg-cell>

</template>


<style scoped>
@import "./init.css";
input {
  outline: none;
  border: none;
}
.vin-input {
  display: flex;
  justify-content: space-between;
  flex: 1;
  margin-left: 0.1em;
  align-items: center;
}
.vin-input input {
  width: 70%;
  background-color: white;
  border: none;
  box-sizing: border-box;
  flex: 1;
  /* line-height: 16px; */
  margin-right: 0.2em;
  text-align: right;
}
.vin-input > span {
  display: block;
}
.vin-input > span > img {
  width: 0.9em;
  margin: 0 0.2em 0.2em 0;
}
</style>

<script>
import CegCell from "./CegCell";
export default {
  name: "vin-input",
  props: {
    value: String,
    title: {
      type: String,
      default: "VIN码"
    }
  },
  data() {
    return {
      vin: "",
      isComposition: false
    };
  },
  methods: {
    compositionstart: function(e) {
      console.log("start:");
      console.log(e);
      this.isComposition = true;
    },
    compositionend: function(e) {
      console.log(e);
      let vin = this.vin,
        data = e.data;
      this.isComposition = false;
      vin = vin + data;
      vin = vin && vin.replace(/[^a-zA-Z0-9]/gi, "").toUpperCase().substr(0,17);
      this.$data.vin = vin;
      this.$emit("input", vin);
    },
    bindInput: function(e) {
      let vin = e.target.value,
        isComposition = this.$data.isComposition;
      if (isComposition) return;
      vin = vin && vin.replace(/[^a-zA-Z0-9]/gi, "").toUpperCase();
      if ((vin || "").length > 17) return;
      this.$data.vin = vin;
      this.$emit("input", vin);
    },
    clearVin: function(e) {
      this.$data.vin = "";
      this.$emit("input", "");
    }
  },
  watch: {
    value: function(n, o) {
      this.$data.vin = n;
    }
  },
  components: {
    CegCell
  },
  mounted() {
    this.$data.vin = this.value;
  }
};
</script>
