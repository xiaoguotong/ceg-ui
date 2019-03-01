<template>
  <div class="ceg-cell" :class="{'border-1px':showBorder}" :style="`font-size:${fontSize}px;`">
    <div class="ceg-cell-left">
      <slot name="left"></slot>
    </div>
    <div class="ceg-cell-wrapper" :class="{'ceg-cell-wrapper-small':small}">
      <div class="ceg-cell-title" :style="`width:${titleWidth}%;`">
        <slot name="title">
          <span class="ceg-cell-text" v-html="title"></span>
          <span v-if="label" class="ceg-cell-label" v-text="label"></span>
        </slot>
      </div>
      <div class="ceg-cell-value " :class="{ 'is-gray' : isGray }" @click="titleClick">
        <slot>
          <p class="text-ellipsis" v-text="value"></p>
        </slot>
      </div>
      <i v-if="showArrow" class="ceg-cell-allow-right"></i>
    </div>
    <div class="ceg-cell-right">
      <slot name="right"></slot>
    </div>
  </div>

</template>


<style scoped >
@import "./common.css";
img {
  vertical-align: middle;
}
.ceg-cell {
  background-color: white;
  box-sizing: border-box;
  color: inherit;
  display: block;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  color: #333;
  text-align: left;
}

.ceg-cell-wrapper {
  background-origin: border-box;
}

.ceg-cell-wrapper {
  /* background-image: linear-gradient(
    180deg,
    #d9d9d9,
    #d9d9d9 50%,
    transparent 50%
  );
  background-size: 120% 1px;
  background-repeat: no-repeat;
  background-position: top left;
  background-origin: content-box; */
  align-items: center;
  box-sizing: border-box;
  display: flex;
  line-height: 1;
  min-height: inherit;
  overflow: hidden;
  padding: 0.2em 0.12em;
  width: 100%;
}
.ceg-cell-wrapper-small {
  padding: 0.14em 0.12em;
}
.ceg-cell-text {
  vertical-align: middle;
}
.ceg-cell-label {
  display: block; /* font-size: 12px; */
  margin-top: 0.06em;
  color: #999;
  font-size: 0.12em;
}
.ceg-cell-title {
  font-size: 0.16em;
}
.ceg-cell-value {
  /* display: flex;
  align-items: center; */
  font-size: 0.16em;
  overflow: hidden;
  text-align: right;
  flex: 1;
}
.is-gray {
  color: #c8c8c8;
}
.ceg-cell-left {
  position: absolute;
  height: 100%;
  left: 0;
  transform: translate3d(-100%, 0, 0);
}
.ceg-cell-right {
  position: absolute;
  height: 100%;
  right: 0;
  top: 0;
  transform: translate3d(100%, 0, 0);
}
.ceg-cell-allow-right {
  margin-left: 0.18em;
}
.ceg-cell-allow-right::after {
  border: 1px solid #c8c8cd;
  border-bottom-width: 0;

  border-left-width: 0;
  content: " ";
  top: 50%;
  right: 0.16em;
  position: absolute;
  width: 0.09em;
  height: 0.09em;
  -webkit-transform: translateY(-50%) rotate(45deg);
  transform: translateY(-50%) rotate(45deg);
}
</style>

<script>
export default {
  name: "ceg-cell",
  props: {
    showArrow: {
      type: Boolean,
      default: true
    },
    isGray: {
      type: Boolean,
      default: true
    },
    title: String,
    label: String,
    value: {},
    showBorder: {
      type: Boolean,
      default: true
    },
    fontSize: {
      type: Number,
      default: 100
    },
    titleWidth: {
      type: Number,
      default: 24
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    titleClick: function(e) {
      this.$emit("titleClick", e);
    }
  }
};
</script>
