<template>
  <ParentLayout />
</template>

<script>
import ParentLayout from '@parent-theme/layouts/Layout.vue'
import * as uiv from '../../../../src/index'
import Vue from 'vue'

Vue.use(uiv)

export default {
  name: 'Layout',
  components: {
    ParentLayout,
  },
}
</script>

<style lang="less">
@import '~bootstrap/less/variables';
@import '~bootstrap/less/mixins';
// fix some body level styles
@import '~bootstrap/less/dropdowns';
@import '~bootstrap/less/modals';
@import '~bootstrap/less/alerts';
@import '~bootstrap/less/close';
@import '~bootstrap/less/buttons';
@import '~bootstrap/less/tooltip';
@import '~bootstrap/less/popovers';
@import '~bootstrap/less/component-animations';
@import '~bootstrap/less/forms';

.form-control {
  box-sizing: border-box;
}

.modal-open .modal {
  overflow-x: hidden !important;
  overflow-y: auto !important;
}

.modal-backdrop.in {
  filter: alpha(opacity=50);
  opacity: 0.5 !important;
}

a[role='button'] {
  cursor: pointer;
}

body > .alert {
  z-index: 2000;
}

.uiv {
  @import (less) '~bootstrap/dist/css/bootstrap.min.css';

  table {
    width: auto;

    td,
    th,
    tr {
      border: none;
      background: transparent;
    }

    td:first-child {
      width: auto;
    }
  }

  .navbar {
    padding: 0;
    z-index: unset;
    top: unset;
    left: unset;
    right: unset;
    height: unset;
    line-height: unset;
  }

  .pagination > li > a,
  .pagination > li > span {
    text-decoration: none !important;
  }
}

table {
  display: table;
  width: 100%;

  th:first-child,
  td:first-child {
    width: 100px;
  }
}
</style>
