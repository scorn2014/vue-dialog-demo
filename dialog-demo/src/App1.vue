<template>
  <div id="app">
    <q-dialog v-model="show" title="传入的标题" :btns="btns" :beforeClose="beforeClose">
      <template v-slot:details>
        <div>我是详情插槽</div>
      </template>
    </q-dialog>
  </div>
</template>

<script>
import QDialog from "./components/QDialog/Index";

export default {
  name: "app",
  data() {
    return {
      show: false,
      btns: [
        {
          value: "测试取消",
          color: "red"
        },
        {
          value: "测试确认",
          color: "blue"
        }
      ]
    };
  },
  methods:{
    beforeClose(type,done) {
      console.log(type)
      setTimeout(() => {
        done()
      }, 3000);
    },
  },
   // vue正确的生命周期顺序是 父beforeCreate => 父 created => 父 beforeMount => 子beforeCreate => 子 created => 子 beforeMount => 子 mounted => 父 mounted
 created() {
    this.$dialog.show({
      title: '实例弹窗',
      details: '详情',
    });
  },
  components: {
    QDialog
  }
};
</script>

<style lang="scss" scoped>
</style>



