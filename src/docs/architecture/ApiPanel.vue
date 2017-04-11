<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <span>API</span>
      <a v-if="folder && file"
         class="pull-right"
         :href="'https://github.com/wxsms/uiv/tree/master/src/components/'+folder+'/'+file">
        <i class="glyphicon glyphicon-share"></i>
        {{file}}
      </a>
    </div>
    <div class="table-responsive">
      <table class="table table-bordered">
        <tbody v-if="api.notes">
        <tr class="active">
          <td colspan="5">Note</td>
        </tr>
        <tr v-for="note in api.notes">
          <td colspan="5" v-html="note"></td>
        </tr>
        </tbody>
        <tbody v-if="api.props">
        <tr class="active">
          <td colspan="5">Props</td>
        </tr>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default</th>
          <th>Required</th>
          <th>Description</th>
        </tr>
        <tr v-for="prop in api.props">
          <td nowrap="nowrap"><code>{{prop.name}}</code></td>
          <td>{{prop.type}}</td>
          <td>{{prop.default}}</td>
          <td><i class="glyphicon glyphicon-ok" v-if="prop.required"></i></td>
          <td v-html="prop.desc"></td>
        </tr>
        </tbody>
        <tbody v-if="api.slots">
        <tr class="active">
          <td colspan="5">Slots</td>
        </tr>
        <tr>
          <th>Name</th>
          <th colspan="4">Desc</th>
        </tr>
        <tr v-for="slot in api.slots">
          <td nowrap="nowrap"><code>{{slot.name}}</code></td>
          <td colspan="4" v-html="slot.desc"></td>
        </tr>
        </tbody>
        <tbody v-if="api.events">
        <tr class="active">
          <td colspan="5">Events</td>
        </tr>
        <tr>
          <th>Name</th>
          <th>Params</th>
          <th colspan="3">Desc</th>
        </tr>
        <tr v-for="event in api.events">
          <td nowrap="nowrap"><code>{{event.name}}</code></td>
          <td>
            <p v-for="param in event.params">{{param}}</p>
          </td>
          <td colspan="3" v-html="event.desc"></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['api', 'file', 'folder']
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
