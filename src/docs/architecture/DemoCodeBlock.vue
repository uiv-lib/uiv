<template>
  <section>
    <br/>
    <p v-if="demoFile">
      <a :href="'https://github.com/wxsms/uiv/blob/master/src/docs/pages/'+demoFile" target="_blank">
        <i class="glyphicon glyphicon-link"></i>
        <b>Full Demo Code</b>
      </a>
    </p>
    <p>Minimal example:</p>
    <div>
      <slot></slot>
    </div>
  </section>
</template>

<script>
  export default {
    props: ['demoFile']
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
