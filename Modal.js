var CONFIRM_TEXT = '确定';
var CANCEL_TEXT = '取消';

var defaults = {
  title: '提示',
  message: '',
  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonText: CONFIRM_TEXT,
  cancelButtonText: CANCEL_TEXT,
};

import Vue from 'vue';
import modal from './Modal.vue';
import {
  merge
} from './util';

const ModalConstructor = Vue.extend(modal);
let modalPool = [];

let getAnInstance = () => {
  if (modalPool.length > 0) {
    let instance = modalPool[0];
    modalPool.splice(0, 1);
    return instance;
  }
  return new ModalConstructor({
    el: document.createElement('div')
  });
};

let returnAnInstance = instance => {
  if (instance) {
    modalPool.push(instance);
  }
};

let removeDom = event => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target);
  }
};

// modalConstructor.prototype.close = function () {
//   this.visible = false;
//   this.$el.addEventListener('transitionend', removeDom);
//   this.closed = true;
//   returnAnInstance(this);
// };

let Modal = (options, callback) => {
  if (typeof options === 'string') {
    options = {
      title: options
    };
    console.log(arguments);

    if (typeof callback === 'string') {
      options.message = callback;
    } else if (typeof callback === 'function') {
      options.callback = callback;
    }
    // if (arguments[2]) {
    //   options.type = arguments[2];
    // }
  } else if (options.callback && !callback) {
    callback = options.callback || function () {};
  }

  let instance = getAnInstance();

  let opts = merge({}, defaults, options);

  for (let prop in opts) {
    if (opts.hasOwnProperty(prop)) {
      instance[prop] = opts[prop];
    }
  }

  if (options.callback === undefined&&typeof callback === 'function') {
    instance.callback = callback;
  }

  document.body.appendChild(instance.$el);
  Vue.nextTick(function () {
    instance.value = true;
  });
  
  return instance;
};

export default Modal;
