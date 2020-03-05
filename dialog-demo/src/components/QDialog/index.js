import QDiloagVue from "./Index.vue";
import Vue from "vue";

const QDialogVueConstructor = Vue.extend(QDiloagVue);

let instance, _resolve, _reject;

function resetInstance() {
  const props = instance.$options.props;
  for (const key in props) {
    let defaultValue = props[key];
    if (defaultValue && typeof defaultValue === "function") {
      defaultValue = defaultValue();
    }
    instance[key] = defaultValue;
  }
}

function _doPromiseInstanceClose(type, v) {
  if (type === "confirm" || type === "background") {
    _resolve(type, v);
  } else if (type === "cancel") {
    _reject(type, v);
  }
  instance.show = false;
}

export default {
  show(opts = {}) {
    const promise = new Promise((resolve, reject) => {
      if (instance) {
        resetInstance();
      } else {
        // 创建实例
        instance = new QDialogVueConstructor();
        console.log(instance);
        // 挂载实例
        instance.$mount();
        // 添加到网页中
        document.body.appendChild(instance.$el);
      }

      instance._doPromiseInstanceClose = _doPromiseInstanceClose;

      // 设置实例的值
      for (const key in opts) {
        instance[key] = opts[key];
      }
      // 让弹窗显示
      instance.show = true;

      _resolve = resolve;
      _reject = reject;
    });

    if (opts.beforeClose) {
      return "";
    } else {
      return promise;
    }
  }
};
