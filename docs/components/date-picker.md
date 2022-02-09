# DatePicker

> A lightweight & configurable date picker.

## Example

Use `v-model` to bind the selected date.

<DemoWrapper><date-picker-example/></DemoWrapper>

<<< @/.vitepress/components/date-picker/example.vue

## Formats

You can use any format you like. For example:

* yyyy-M-d
* yyyy-MM-dd
* yyyy-MMM-dd
* yyyy-MMMM-dd
* yyyy/MM/dd
* MM/dd/yyyy
* yyyy, MM, dd
* ...

::: warning
Some browsers (e.g. IE) might not support all of these formats.

If you need a special format that not supported by `Date.parse`, consider using `date-parser` option to override it.
:::

<DemoWrapper><date-picker-formats/></DemoWrapper>

<<< @/.vitepress/components/date-picker/formats.vue

## Buttons

Use `today-btn` and `clear-btn` to toggle visible of them.

<DemoWrapper><date-picker-without-buttons/></DemoWrapper>

<<< @/.vitepress/components/date-picker/without-buttons.vue

## Range limit

Example that limit date range from today, to next week:

<DemoWrapper><date-picker-range-limit/></DemoWrapper>

<<< @/.vitepress/components/date-picker/range-limit.vue

## Week starts

Change the starting day of the week. Support 0 (Sunday) ~ 6 (Saturday).

<DemoWrapper><date-picker-week-starts/></DemoWrapper>

<<< @/.vitepress/components/date-picker/week-starts.vue

## Week numbers

<DemoWrapper><date-picker-week-numbers/></DemoWrapper>

<<< @/.vitepress/components/date-picker/week-numbers.vue

## With dropdown

<br/>

<DemoWrapper><date-picker-dropdown-example/></DemoWrapper>

<<< @/.vitepress/components/date-picker/dropdown-example.vue

## Custom date classes

Use `date-class` to apply custom classes to each date button, which should be an function that:

* takes the date of button as the first param.
* also with current month and year showing of the picker in the second param.
* returns the class(es).

See below example for detail usage, which has all sunday highlighted:

<DemoWrapper><date-picker-custom-date-classes/></DemoWrapper>

<<< @/.vitepress/components/date-picker/custom-date-classes.vue

## API Reference

### [DatePicker](https://github.com/uiv-lib/uiv/blob/1.x/src/components/datepicker/DatePicker.vue)

#### Props

| Name                   | Type     | Default                           | Required | Description                                                                                                                                                                                                                                                                 |
|------------------------|----------|-----------------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `v-model`              |          |                                   | &#10004; | The selected date.                                                                                                                                                                                                                                                          |
| `width`                | Number   | 270                               |          | The date-picker's width in px.                                                                                                                                                                                                                                              |
| `today-btn`            | Boolean  | true                              |          | Show / hide the today button.                                                                                                                                                                                                                                               |
| `clear-btn`            | Boolean  | true                              |          | Show / hide the clear button.                                                                                                                                                                                                                                               |
| `format`               | String   | yyyy-MM-dd                        |          | The date format, will emit Date object if provided as empty string.                                                                                                                                                                                                         |
| `close-on-selected`    | Boolean  | true                              |          | Close the date-picker dropdown after date selected.                                                                                                                                                                                                                         |
| `limit-from`           |          |                                   |          | Anything that can convert to a valid Date object. E.g. `2017-01-01` or `new Date()`.                                                                                                                                                                                        |
| `limit-to`             |          |                                   |          | Same as `limit-from`.                                                                                                                                                                                                                                                       |
| `initial-view`         | String   | d                                 |          | Open the date-picker with specify view (one of `d` / `m` / `y`) on initial. Only works if the `v-model` is empty.                                                                                                                                                           |
| `week-starts-with`     | Number   | 0                                 |          | Starting day of the week. Support 0 (Sunday) ~ 6 (Saturday).                                                                                                                                                                                                                |
| `week-numbers`         | Boolean  | false                             |          | Show week numbers of year.                                                                                                                                                                                                                                                  |
| `date-parser`          | Function | Date.parse                        |          | Use this prop to replace the `Date.parse` call inside the component. Useful when The formatted String can not be correctly parsed to Date type by `Date.parse` (e.g. dd-MM-yyyy). For example: `dateParser (value) {return moment(value, 'DD-MM-YYYY').toDate().getTime()}` |
| `date-class`           | Function |                                   |          | The custom class callback function for each date. See above example section for details.                                                                                                                                                                                    |
| `year-month-formatter` | Function |                                   |          | The formatter function of year month label string on top of date view, with 2 params `year` and `month` (0-based), with the formatted string returned.                                                                                                                      |
| `icon-control-left`    | String   | glyphicon glyphicon-chevron-left  |          | The arrow icon shown inside the `previous` button.                                                                                                                                                                                                                          |
| `icon-control-right`   | String   | glyphicon glyphicon-chevron-right |          | The arrow icon shown inside the `next` button.                                                                                                                                                                                                                              |
