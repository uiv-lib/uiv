<template>
  <section>
    <p>Minimal example:</p>
    <div>
      <slot></slot>
    </div>
    <p v-if="demoFile">
      <a :href="'https://github.com/wxsms/uiv/blob/master/src/docs/pages/'+demoFile" target="_blank">
        <i class="glyphicon glyphicon-share"></i>
        <b>Full Demo Code</b>
      </a>
    </p>
  </section>
</template>

<script>
  export default {
    props: ['demoFile']
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
