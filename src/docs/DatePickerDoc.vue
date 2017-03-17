<template>
  <section>
    <div class="row">
      <div class="col-xs-12">
        <anchor-header text="DatePicker" source-folder="datepicker"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="well" v-if="date">You selected <b>{{date.toDateString()}}</b>.</div>
        <h3>Inline Sample</h3>
        <date-picker v-model="date"></date-picker>
        <h3>Popup Sample</h3>
        <form class="form-inline">
          <div class="form-group">
            <div class="input-group">
              <input class="form-control" type="text" v-model="date">
              <div class="input-group-btn">
                <button class="btn btn-default" type="button" @click="toggle()">
                  <i class="glyphicon glyphicon-calendar"></i>
                </button>
              </div>
            </div>
            <date-picker ref="datepicker" v-model="date" :inline="true"></date-picker>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from './architectures/AnchorHeader.vue'
  import DemoCodeBlock from './architectures/DemoCodeBlock.vue'
  import DatePicker from './../components/datepicker/DatePicker.vue'
  export default {
    components: {AnchorHeader, DemoCodeBlock, DatePicker},
    data () {
      return {
        date: null,
        show: false
      }
    },
    methods: {
      toggle () {
        this.$refs.datepicker.toggle()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

</style>
