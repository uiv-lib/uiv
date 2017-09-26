<template>
  <section class="container-fluid">
    <div class="row">
      <div class="col-xs-12">
        <anchor-header :text="$t('menu.datePicker')" source-folder="datepicker"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <h3 class="page-header">{{$t('datePicker.inlineExample')}}</h3>
        <div class="panel panel-default" style="display: inline-block">
          <div class="panel-body">
            <date-picker class="date-picker"
                         v-model="date"
                         :today-btn="todayBtn"
                         :clear-btn="clearBtn"
                         :limit-from="limitFrom"
                         :format="format"
                         :week-starts-with="weekStartsWith"
                         :limit-to="limitTo"></date-picker>
          </div>
        </div>
        <h3 class="page-header">{{$t('datePicker.withDropdown')}}</h3>
        <form class="form-inline">
          <dropdown class="form-group">
            <div class="input-group">
              <input class="form-control" type="text" v-model="date">
              <div class="input-group-btn">
                <button class="btn btn-default" type="button" data-role="trigger">
                  <i class="glyphicon glyphicon-calendar"></i>
                </button>
              </div>
            </div>
            <template slot="dropdown">
              <li>
                <date-picker class="date-picker"
                             v-model="date"
                             :today-btn="todayBtn"
                             :clear-btn="clearBtn"
                             :limit-from="limitFrom"
                             :limit-to="limitTo"
                             :format="format"
                             :week-starts-with="weekStartsWith"
                             :close-on-selected="closeOnSelected"></date-picker>
              </li>
            </template>
          </dropdown>
        </form>
        <br/>
        <div class="alert alert-info" v-if="dateStr">You selected <b>{{dateStr}}</b>.</div>
        <div class="well">
          <form class="form-horizontal">
            <div class="form-group">
              <div class="col-xs-12">
                <label class="checkbox-inline"><input type="checkbox" v-model="todayBtn"> {{$t('datePicker.showTodayBtn')}}</label>
                <label class="checkbox-inline"><input type="checkbox" v-model="clearBtn"> {{$t('datePicker.showClearBtn')}}</label>
                <label class="checkbox-inline"><input type="checkbox" v-model="closeOnSelected">
                  {{$t('datePicker.closeOnSelected')}}
                </label>
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-6">
                <label>{{$t('datePicker.limitFrom')}}</label>
                <input type="text" class="form-control" v-model="limitFrom" placeholder="E.g. 2017-03-01">
              </div>
              <div class="col-md-6">
                <label>{{$t('datePicker.limitTo')}}</label>
                <input type="text" class="form-control" v-model="limitTo" placeholder="E.g. 2017-03-31">
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-6">
                <label>{{$t('datePicker.format')}}</label>
                <select class="form-control" v-model="format">
                  <option>yyyy-M-d</option>
                  <option>yyyy-MM-dd</option>
                  <option>yyyy-MMM-dd</option>
                  <option>yyyy-MMMM-dd</option>
                  <option>yyyy/MM/dd</option>
                  <option>MM/dd/yyyy</option>
                  <option>yyyy,MM,dd</option>
                </select>
                <p class="help-block">* {{$t('datePicker.formatNote')}}</p>
              </div>
              <div class="col-md-6">
                <label>{{$t('datePicker.weekStartsWith')}}</label>
                <select class="form-control" v-model="weekStartsWith">
                  <option v-for="day in 7" :value="day - 1">{{ day - 1 }}</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <demo-code-panel demo-file="DatePickerDoc.vue">
        <pre><code>
&lt;!-- With Dropdown Example --&gt;
&lt;dropdown class=&quot;form-group&quot;&gt;
  &lt;div class=&quot;input-group&quot;&gt;
    &lt;input class=&quot;form-control&quot; type=&quot;text&quot; v-model=&quot;date&quot;&gt;
    &lt;div class=&quot;input-group-btn&quot;&gt;
      &lt;button class=&quot;btn btn-default&quot; type=&quot;button&quot; data-role=&quot;trigger&quot;&gt;
        &lt;i class=&quot;glyphicon glyphicon-calendar&quot;&gt;&lt;/i&gt;
      &lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;template slot=&quot;dropdown&quot;&gt;
    &lt;li&gt;
      &lt;date-picker v-model=&quot;date&quot;&gt;&lt;/date-picker&gt;
    &lt;/li&gt;
  &lt;/template&gt;
&lt;/dropdown&gt;
        </code></pre>
        </demo-code-panel>
        <api-panel :api="api" folder="datepicker" file="DatePicker.vue"></api-panel>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from '../architecture/AnchorHeader.vue'
  import DemoCodePanel from '../architecture/DemoCodePanel.vue'
  import ApiPanel from './../architecture/ApiPanel.vue'
  import DatePicker from '../../components/datepicker/DatePicker.vue'
  import Dropdown from '../../components/dropdown/Dropdown.vue'
  import hljsMixin from './../mixins/hljsMixin'

  export default {
    mixins: [hljsMixin],
    components: {AnchorHeader, DemoCodePanel, DatePicker, Dropdown, ApiPanel},
    data () {
      return {
        api: {
          props: [
            {
              name: 'v-model',
              desc: 'The selected date',
              required: true
            },
            {
              name: 'width',
              type: 'Number',
              desc: 'The date-picker\'s width in px',
              'default': 270
            },
            {
              name: 'today-btn',
              type: 'Boolean',
              desc: 'Show / hide the today button.',
              'default': 'true'
            },
            {
              name: 'clear-btn',
              type: 'Boolean',
              desc: 'Show / hide the clear button.',
              'default': 'true'
            },
            {
              name: 'format',
              type: 'String',
              desc: 'The date format',
              'default': 'yyyy-MM-dd'
            },
            {
              name: 'close-on-selected',
              type: 'Boolean',
              desc: 'Close the date-picker dropdown after date selected',
              'default': 'true'
            },
            {
              name: 'limit-from',
              desc: 'Anything that can convert to a valid Date object. E.g. \'2017-01-01\' or \'new Date()\''
            },
            {
              name: 'limit-to',
              desc: 'Same as limit-from'
            },
            {
              name: 'initial-view',
              type: 'String',
              desc: 'Open the date-picker with specify view (one of d / m / y) on initial. Only works if the v-model is empty.',
              'default': 'd'
            },
            {
              name: 'week-starts-with',
              type: 'Number',
              desc: 'Starting day of the week. Support 0 (Sunday) ~ 6 (Saturday).',
              'default': '0'
            },
            {
              name: 'date-parser',
              type: 'Function',
              'default': 'Date.parse',
              desc: `
<p>Use this prop to replace the <code>Date.parse</code> call inside the component.
Useful when The formatted String can not be correctly parsed to Date type by <code>Date.parse</code> (e.g. dd-MM-yyyy).</p>
<p>Example (use moment.js):</p>
<pre><code>dateParser (value) {
  return moment(value, 'DD-MM-YYYY').toDate().getTime()
}</code></pre>
`
            }
          ]
        },
        date: '',
        show: false,
        clearBtn: true,
        todayBtn: true,
        closeOnSelected: true,
        limitFrom: '',
        limitTo: '',
        format: 'yyyy-MM-dd',
        weekStartsWith: 0
      }
    },
    computed: {
      dateStr () {
        let date = new Date(this.date)
        if (!isNaN(date.getTime())) {
          return date.toUTCString()
        } else {
          return ''
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

</style>
