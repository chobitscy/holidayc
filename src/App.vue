<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
  .el-dialog__body{
    padding: 10px 10px!important;
  }
  @media screen and (max-width: 750px) {
    .el-message-box {
      width: 70% !important;
    }
  }

  .el-message-box__btns{
    display: none!important;
  }
</style>
