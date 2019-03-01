import Vue from 'vue';
import loadingVue from './Loading.vue';

const LoadingConstructor = Vue.extend(loadingVue);
let loadingPool = [];

let getAnInstance = () => {
  if (loadingPool.length > 0) {
    let instance = loadingPool[0];
    loadingPool.splice(0, 1);
    return instance;
  }
  return new LoadingConstructor({
    el: document.createElement('div')
  });
};

let returnAnInstance = instance => {
  if (instance) {
    loadingPool.push(instance);
  }
};

let removeDom = event => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target);
  }
};

function loading() {
 this.instance='';

}

loading.prototype.close = function () {
  let instance = this.instance;
  if(!instance) return;
  returnAnInstance(instance);
  instance.closeMask();
  if (instance.$el.parentNode) {
    instance.$el.parentNode.removeChild(instance.$el);
  }
};

loading.prototype.open = function () {
  let instance = getAnInstance();
  document.body.appendChild(instance.$el);
  instance.openMask();
  this.instance = instance;
};

let Loading =new loading();

export default Loading;
