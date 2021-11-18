<template>
  <div class="uiv">
    <date-picker v-model="date" :date-class="dateClass" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      date: null,
    };
  },
  methods: {
    dateClass(date) {
      return date.getDay() === 0 ? 'btn-sunday' : '';
    },
  },
};
</script>
<style lang="less">
.uiv .btn-sunday.btn-default,
.uiv .btn-sunday.btn-primary {
  background-color: #46bd87;
  color: #fff;
  border-radius: 0;
  opacity: 0.7;
  outline: 0 !important;

  &:hover,
  &:focus,
  &:active {
    background-color: #46bd87 !important;
    opacity: 1;
  }
}
</style>
