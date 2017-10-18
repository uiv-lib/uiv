# Tabs

> Add quick, dynamic tab functionality to transition through panes of local content, even via dropdown menus. **Nested tabs are not supported**.

## Example

```html
<template>
  <tabs ref="tabComponent" :justified="justified" v-model="tabIndex" @change="afterTabActive">
    <tab title="Tab 1">
      <p>This is tab 1.</p>
    </tab>
    <tab title="Tab 2">
      <p>Tab 2 goes here.</p>
    </tab>
    <tab :title="thirdTabDisabled?'Tab 3 (Disabled)':'Tab 3 (Enabled)'" :disabled="thirdTabDisabled">
      <p>This tab can be enable / disable.</p>
    </tab>
    <tab title="Tab in Group 1" group="Tab Group">
      <p>This is Tab in group 1.</p>
    </tab>
    <tab title="Tab in Group 2" group="Tab Group">
      <p>This is Tab in group 2.</p>
    </tab>
    <tab title="<i class='glyphicon glyphicon-bell'></i> Alert!" :html-title="true">
      <p>This tab has a HTML and callback function.</p>
    </tab>
  </tabs>
  <hr/>
  <h4>Settings</h4>
  <button type="button" id="tabs-btn-1" class="btn btn-default" @click="tabIndex = 0">Active Tab 1</button>
  <button type="button" id="tabs-btn-2" class="btn btn-default" @click="tabIndex = 1">Active Tab 2</button>
  <button type="button" id="tabs-btn-3" class="btn btn-default" @click="thirdTabDisabled=!thirdTabDisabled">Enable / Disable Tab 3</button>
  <button type="button" id="tabs-btn-4" class="btn btn-default" @click="justified=!justified">Justified Style</button>
</template>

<script>
  export default {
    data () {
      return {
        thirdTabDisabled: true,
        justified: false,
        tabIndex: 0
      }
    },
    methods: {
      afterTabActive (index) {
        if (index === 5) {
          window.alert('You clicked on a tab that has callback function!')
        }
      }
    }
  }
</script>

<!-- Live demo -->
```

## With `nav-right` Slot

```html
<tabs>
  <tab title="Tab 1">
    <p>This is tab 1.</p>
  </tab>
  <tab title="Tab 2">
    <p>Tab 2 goes here.</p>
  </tab>
  <form slot="nav-right">
    <select class="form-control" style="display: inline-block;width: auto">
      <option>option1</option>
      <option>option2</option>
      <option>option3</option>
      <option>option4</option>
    </select>
    <button type="button" class="btn btn-success">Button</button>
  </form>
</tabs>
<!-- Live demo -->
```

# API Reference

## [Tabs.vue](https://github.com/wxsms/uiv/tree/master/src/components/tabs/Tabs.vue)

<div class="table-responsive">
  <table class="table table-bordered">
    <tbody>
    <tr>
      <td colspan="5"><span class="label label-default">Props</span></td>
    </tr>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default</th>
      <th width="50px">Required</th>
      <th>Description</th>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>v-model</code></td>
      <td>Number</td>
      <td></td>
      <td></td>
      <td>The current tab index, use this to manual change tab index.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>justified</code></td>
      <td>Boolean</td>
      <td>false</td>
      <td></td>
      <td>Use justified style.</td>
    </tr>
    </tbody>
    <tbody>
    <tr>
      <td colspan="5"><span class="label label-default">Slots</span></td>
    </tr>
    <tr>
      <th>Name</th>
      <th colspan="4">Description</th>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>default</code></td>
      <td colspan="4">The tabs content.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>nav-right</code></td>
      <td colspan="4">
        The snip at right side of tab nav. Note: it won't display if using justified style.
      </td>
    </tr>
    </tbody>
    <tbody>
    <tr>
      <td colspan="5"><span class="label label-default">Events</span></td>
    </tr>
    <tr>
      <th>Name</th>
      <th>Params</th>
      <th colspan="3">Description</th>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>change</code></td>
      <td><p>index</p></td>
      <td colspan="3">Fire after active tab changed, with the active index.</td>
    </tr>
    </tbody>
  </table>
</div>

## [Tab.vue](https://github.com/wxsms/uiv/tree/master/src/components/tabs/Tab.vue)

<div class="table-responsive">
  <table class="table table-bordered">
    <tbody>
    <tr>
      <td colspan="5"><span class="label label-default">Props</span></td>
    </tr>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default</th>
      <th width="50px">Required</th>
      <th>Description</th>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>title</code></td>
      <td>String</td>
      <td></td>
      <td></td>
      <td>The tab title.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>html-title</code></td>
      <td>Boolean</td>
      <td>false</td>
      <td></td>
      <td>Use HTML title.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>disabled</code></td>
      <td>Boolean</td>
      <td>false</td>
      <td></td>
      <td>Disable the tab.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>group</code></td>
      <td>String</td>
      <td></td>
      <td></td>
      <td>Tabs nav with same group will in a dropdown list.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>pull-right</code></td>
      <td>Boolean</td>
      <td>false</td>
      <td></td>
      <td>Add <code>pull-right</code>
        class to the tab nav. A grouped tab will be pull to right if one of its sub-tabs has this prop set to <code>true</code>.
      </td>
    </tr>
    </tbody>
  </table>
</div>

<!-- Live demo script
<script>
  export default {
    data () {
      return {
        thirdTabDisabled: true,
        justified: false,
        tabIndex: 0
      }
    },
    methods: {
      afterTabActive (index) {
        if (index === 5) {
          window.alert('You clicked on a tab that has callback function!')
        }
      }
    }
  }
</script>
-->
