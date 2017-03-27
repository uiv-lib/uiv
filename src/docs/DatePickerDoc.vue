<template>
  <section>
    <div class="row">
      <div class="col-xs-12">
        <anchor-header text="DatePicker" source-folder="datepicker"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <h3>Inline Example</h3>
        <hr/>
        <date-picker v-model="date"
                     :today-btn="todayBtn"
                     :clear-btn="clearBtn"
                     :limit-from="limitFrom"
                     :limit-to="limitTo"></date-picker>
        <h3>With Dropdown</h3>
        <form class="form-inline">
          <dropdown tag="div" class="form-group">
            <div class="input-group">
              <input class="form-control" type="text" v-model="date" readonly>
              <div class="input-group-btn">
                <button class="btn btn-default" type="button" data-role="trigger">
                  <i class="glyphicon glyphicon-calendar"></i>
                </button>
              </div>
            </div>
            <ul slot="dropdown" class="dropdown-menu">
              <li>
                <date-picker v-model="date"
                             :today-btn="todayBtn"
                             :clear-btn="clearBtn"
                             :limit-from="limitFrom"
                             :limit-to="limitTo"
                             :close-on-selected="closeOnSelected"></date-picker>
              </li>
            </ul>
          </dropdown>
        </form>
        <br/>
        <div class="well">
          <p v-if="date">You selected <b>{{date.toDateString()}}</b>.</p>
          <form class="form-horizontal">
            <div class="form-group">
              <div class="col-xs-12">
                <label class="checkbox-inline"><input type="checkbox" v-model="todayBtn"> Show Today Btn</label>
                <label class="checkbox-inline"><input type="checkbox" v-model="clearBtn"> Show clear Btn</label>
                <label class="checkbox-inline"><input type="checkbox" v-model="closeOnSelected">
                  Close On Selected
                </label>
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-6">
                <label>Limit From</label>
                <input type="text" class="form-control" v-model="limitFrom" placeholder="E.g. 2017-03-01">
              </div>
              <div class="col-md-6">
                <label>Limit To</label>
                <input type="text" class="form-control" v-model="limitTo" placeholder="E.g. 2017-03-31">
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="col-md-6">
        <h4>Note</h4>
        <ul>
          <li><p>Use <code>v-model: Date</code> to bind or change the selected date.</p></li>
          <li>
            <p>
              Make sure to update the date object reference when try to change it from outside the component. E.g.
              <code>model = new Date(model)</code>
            </p>
          </li>
        </ul>
        <h4>Props</h4>
        <ul>
          <li><p><code>width: Number</code> The date-picker's width in px. Default: 270.</p></li>
          <li><p><code>today-btn: Boolean</code> Show / hide the today button. Default: true.</p></li>
          <li><p><code>clear-btn: Boolean</code> Show / hide the clear button. Default: true.</p></li>
          <li>
            <p><code>close-on-selected: Boolean</code> Close the date-picker after date selected. Default: true.</p>
          </li>
          <li>
            <p>
              <code>limit-from</code>
              Anything that can convert to a valid Date object.
              E.g. '2017-01-01' or 'new Date()'
            </p>
          </li>
          <li><p><code>limit-to</code> Same as limitFrom.</p></li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <demo-code-block demo-file="DatePickerDoc.vue">
        <pre><code>
&lt;!-- With Dropdown Example --&gt;
&lt;dropdown tag=&quot;div&quot; class=&quot;form-group&quot;&gt;
  &lt;div class=&quot;input-group&quot;&gt;
    &lt;input class=&quot;form-control&quot; type=&quot;text&quot; v-model=&quot;date&quot; readonly&gt;
    &lt;div class=&quot;input-group-btn&quot;&gt;
      &lt;button class=&quot;btn btn-default&quot; type=&quot;button&quot; data-role=&quot;trigger&quot;&gt;
        &lt;i class=&quot;glyphicon glyphicon-calendar&quot;&gt;&lt;/i&gt;
      &lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;ul slot=&quot;dropdown&quot; class=&quot;dropdown-menu&quot;&gt;
    &lt;li&gt;
      &lt;date-picker v-model=&quot;date&quot;&gt;&lt;/date-picker&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/dropdown&gt;
        </code></pre>
        </demo-code-block>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from './architectures/AnchorHeader.vue'
  import DemoCodeBlock from './architectures/DemoCodeBlock.vue'
  import DatePicker from './../components/datepicker/DatePicker.vue'
  import Dropdown from './../components/dropdown/Dropdown.vue'
  export default {
    components: {AnchorHeader, DemoCodeBlock, DatePicker, Dropdown},
    data () {
      return {
        date: null,
        show: false,
        clearBtn: true,
        todayBtn: true,
        closeOnSelected: true,
        limitFrom: '',
        limitTo: ''
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

</style>
