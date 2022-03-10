<template>
    <div class="content">
    <span class="close enable-click" @click="closeMain">×</span>
    <div class="content-manage">
      <router-view/>
    </div>
  </div>
</template>
<script>
import { closeMain } from '../../utils/useIPC.js'
export default {
  setup () {
    return {
      closeMain
    }
  }
}
</script>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,body{
  height: 100%;
  width: 100%;
}
#app{
  height: 100%;
  width: 100%;
  display: flex;
}
.content{
  flex: 1;
  padding-top: 20px;
  .content-manage{
    box-sizing: border-box;
    padding: 50px;
    height: 100%;
    width: 100%;
    font-size: 14px;
  }
  .close{
    font-size: 26px;
    float: right;
    margin-right: 30px;
    cursor: pointer;
  }
}
</style>
