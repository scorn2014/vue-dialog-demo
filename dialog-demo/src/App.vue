<template>
  <div id="app">
    
  </div>
</template>

<script>

export default {
  name: "app",
  data() {
    return {
     
    };
  },
   // vue正确的生命周期顺序是 父beforeCreate => 父 created => 父 beforeMount => 子beforeCreate => 子 created => 子 beforeMount => 子 mounted => 父 mounted
 created() {
    this.$dialog.show({
      title: '实例弹窗',
      details: '详情',
    });

    setTimeout(() => {
      this.$dialog
        .show({
          title: '第二次实例弹窗',
          details: '第二次详情'
        }).then((type)=>{
          console.log(`点击了${type}`);
        }).catch((type)=>{
          console.log(`点击了${type}`);
        })
      }, 2000);
  },
  components: {
    
  }
};
</script>

<style lang="scss" scoped>
</style>