import Vue from 'vue';
import selectModel from './SelectModel.vue';


const SelectModelConstructor = Vue.extend(selectModel);

let getAnInstance = () => {
  return new SelectModelConstructor({
    el: document.createElement('div')
  });
};

function AnObject(slots, currentComponent, callback) {
  this.slots = slots;
  this.currentComponent = currentComponent;
  this.callback = callback;

};

let getAnObject = (slots, currentComponent, callback) => {
  return new AnObject(slots, currentComponent, callback);
}


AnObject.prototype.close = function () {
  if (!this.opened || !this.instance) return;
  this.instance.visible = false;
};


AnObject.prototype.open = function () {
  let that = this,
    instance = this.instance;

  if (!instance) {
    instance = getAnInstance();
    instance.$slots = this.slots;
    instance.currentComponent = this.currentComponent;
    instance.callback = function (e) {
      instance.$emit('input', false);
      this.callback && this.callback.apply(null, e);
    }
    this.instance = instance;
  }


  this.opened = true;
  if (this.opening) return;

  if (!document.body.contains(instance.$el)) {
    document.body.appendChild(instance.$el);
  }

  this.opening = true;

  Vue.nextTick(function () {
    instance.visible = true;
    that.opening = false;
  });
};
AnObject.prototype.destroyed = function () {
  if (!this.instance) return;
  let instance=this.instance;
  if (document.body.contains(instance.$el)) {
    document.body.removeChild(instance.$el);
  }
};


let SelectModel = (slots, currentComponent, callback) => {
  let obj = getAnObject(slots, currentComponent, callback);
  return obj;

};



export default SelectModel;
