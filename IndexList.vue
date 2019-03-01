<template>
  <div class="indexlist scroll-container">
    <div class="indexlist-content" :style='"height:"+currentHeight+"px;"' ref="content">
      <ul>
        <slot></slot>
      </ul>
    </div>
    <template v-if="showIndex">
      <div class="indexlist-nav" @touchstart="handleTouchStart" ref="nav">
        <ul class="indexlist-navlist">
          <li class="indexlist-navitem" :key="section.index" v-for="section in sections">{{ section.index }}</li>
        </ul>
      </div>
      <div class="indexlist-indicator" v-show="moving">{{ currentIndicator }}</div>
    </template>
  </div>
</template>

<style scoped>
.scroll-container {
  will-change: transform;
  overflow: hidden;
}

.indexlist-nav {
  position: fixed;
  top: 50%;
  right: 6px;
  transform: translateY(-50%);
  background: rgba(188, 188, 188, 0.4);
  padding: 6px 0;
}
.indexlist-navitem {
  font-size: 12px;
  text-align: center;
  padding: 1px 3px;
  color: #333;
  margin: 0;
  display: block;
}
.indexlist-indicator {
  position: absolute;
  size: 50px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 50px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  color: #fff;
  font-size: 22px;
  width: 64px;
}
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
</style>

<script >
import BScroll from "better-scroll";

export default {
  name: "index-list",
  props: {
    height: Number,
    showIndex: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      sections: [],
      moving: false,
      firstSection: null,
      currentHeight: this.height,
      navOffsetX: 0,
      contentRef: null,
      currentIndicator: ""
    };
  },

  watch: {
    sections() {
      this.init();
    },
    height(val) {
      if (val) {
        this.currentHeight = val;
      }
    }
  },

  methods: {
    init() {
      this.$nextTick(() => {
        if (!this.contentRef) {
          this.contentRef = new BScroll(this.$refs.content, {
            click: true,
            brounce: false,
            stop: 0
          });
        } else {
          this.contentRef.refresh();
        }
      });

      let listItems = this.$refs.content.getElementsByTagName("li");
      if (listItems.length > 0) {
        this.firstSection = listItems[0];
      }
    },

    handleTouchStart(e) {
      if (e.target.tagName !== "LI") {
        return;
      }
      this.navOffsetX = e.changedTouches[0].clientX;
      this.scrollList(e.changedTouches[0].clientY);

      this.moving = true;
      window.addEventListener("touchmove", this.handleTouchMove);
      window.addEventListener("touchend", this.handleTouchEnd);
    },

    handleTouchMove(e) {
      e.preventDefault();
      this.scrollList(e.changedTouches[0].clientY);
    },

    handleTouchEnd() {
      this.indicatorTime = setTimeout(() => {
        this.moving = false;
        this.currentIndicator = "";
      }, 500);
      window.removeEventListener("touchmove", this.handleTouchMove);
      window.removeEventListener("touchend", this.handleTouchEnd);
    },

    scrollList(y) {
      let currentItem = document.elementFromPoint(this.navOffsetX, y);
      if (
        !currentItem ||
        !currentItem.classList.contains("indexlist-navitem")
      ) {
        return;
      }
      this.currentIndicator = currentItem.innerText;

      let targets = this.sections.filter(
        section => section.index === currentItem.innerText
      );
      let targetDOM;
      if (targets.length > 0) {
        targetDOM = targets[0].$el;
        this.contentRef.scrollToElement(targetDOM);
      }
    }
  },
  updated() {
    // this.init();
  },
  mounted() {
    if (!this.height) {
      this.currentHeight = document.documentElement.clientHeight;
    }
    this.init();
  }
};
</script>
