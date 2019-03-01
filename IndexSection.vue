<template>
  <li class="indexsection">
    <p class="indexsection-index border-1px ">{{ index }}</p>
    <ul>
      <slot></slot>
    </ul>
  </li>
</template>

<style scoped>
@import './common.css';


.indexsection {
  width: 100%;
  display: block;
  margin: 0;
  padding: 0;
}
.indexsection ul{
  padding: 0;
  margin: 0;
}
.indexsection-index {
  padding: 0px 15px;
  display: block;
  height: 30px;
  line-height: 30px;
  font-size:16px;
  background: #fafafa;
  text-align: left;
}
</style>

<script>
export default {
  name: "indexsection",
  props: {
    index: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.$parent.sections.push(this);
  },
  beforeDestroy() {
    let index = this.$parent.sections.indexOf(this);
    if (index > -1) {
      this.$parent.sections.splice(index, 1);
    }
  }
};
</script>
