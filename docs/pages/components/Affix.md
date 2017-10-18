# Affix

> The affix component toggles `position: fixed` on and off, emulating the effect found with `position: sticky`.

The navigation **on the right** is a live demo of the affix component.

## Example Code

```html
<affix :offset="50">
  <ul>
    <li>...</li>
    <li>...</li>
    <li>...</li>
  </ul>
</affix>
```

# API Reference

## [Affix.vue](https://github.com/wxsms/uiv/tree/master/src/components/affix/Affix.vue)

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
      <td nowrap="nowrap"><code>offset</code></td>
      <td>Number</td>
      <td>0</td>
      <td></td>
      <td>Pixels to offset from screen when calculating position of scroll.</td>
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
      <td colspan="4">The affix body.</td>
    </tr>
    </tbody>
  </table>
</div>


