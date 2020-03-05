<template>
  <div>bus-dialog</div>
</template>

<script>
import bus from '../../bus';
export default {
  name: 'BusDialog',
  created() {
    bus.$on('bus-dialog-show', () => {
      console.log('我接受到了显示的方法');
    });
  }
};
</script>