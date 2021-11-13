<template>
  <div id="affix-example" class="uiv">
    <affix :offset="50">
      <alert>I'm using affix.</alert>
    </affix>
  </div>
</template>
<style>
#affix-example .affix {
  z-index: 999;
}
</style>
