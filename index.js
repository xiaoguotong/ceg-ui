import CegCell from './CegCell.vue'

import CegHeader from './CegHeader.vue'
import Indexlist from './Indexlist.vue'
import Indexsection from './Indexsection.vue'
import Modal from './Modal.js'
import SelectModelSlider from './SelectModelSlider.vue'

import VinInput from './VinInput.vue'
import Toast from './Toast.js'

import CegMile from './CegMile.vue'
import CegInput from './CegInput.vue'
import Popup from './Popup.vue'
import Loading from './Loading.js'






const install = function (Vue, config = {}) {
  if (install.installed) return;

  Vue.component(CegCell.name, CegCell);
  Vue.component(CegHeader.name, CegHeader);
  Vue.component(Indexlist.name, Indexlist);
  Vue.component(Indexsection.name, Indexsection);
  Vue.component(SelectModelSlider.name, SelectModelSlider);
  Vue.component(VinInput.name, VinInput);
  Vue.component(CegMile.name, CegMile);
  Vue.component(CegInput.name, CegInput);
  Vue.component(Popup.name, Popup);



  Vue.$toast = Vue.prototype.$toast = Toast;
  Vue.$modal = Vue.prototype.$modal = Modal;
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};
var obj = {
    CegCell,
    CegHeader,
    Indexlist,
    Indexsection,
    SelectModelSlider,
    VinInput,
    Modal,
    Toast,
    CegMile,
    CegInput,
    Popup,
    Loading
  }

export {
    CegCell,
    CegHeader,
    Indexlist,
    Indexsection,
    SelectModelSlider,
    VinInput,
    Modal,
    Toast,
    CegMile,
    CegInput,
    Popup,
    Loading
  }

export default obj;
