<template>
  <table role="grid" style="width: 100%">
    <thead>
      <tr>
        <td>
          <btn
            class="uiv-datepicker-pager-prev"
            block
            size="sm"
            style="border: none"
            @click="goPrevMonth"
          >
            <i :class="iconControlLeft"></i>
          </btn>
        </td>
        <td :colspan="weekNumbers ? 6 : 5">
          <btn
            class="uiv-datepicker-title"
            block
            size="sm"
            style="border: none"
            @click="changeView"
          >
            <b>{{ yearMonthStr }}</b>
          </btn>
        </td>
        <td>
          <btn
            class="uiv-datepicker-pager-next"
            block
            size="sm"
            style="border: none"
            @click="goNextMonth"
          >
            <i :class="iconControlRight"></i>
          </btn>
        </td>
      </tr>
      <tr align="center">
        <td v-if="weekNumbers"></td>
        <td
          v-for="(day, index) in weekDays"
          :key="index"
          width="14.2857142857%"
        >
          <small class="uiv-datepicker-week">{{
            tWeekName(day === 0 ? 7 : day)
          }}</small>
        </td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in monthDayRows" :key="index">
        <td
          v-if="weekNumbers"
          class="text-center"
          style="border-right: 1px solid #eee"
        >
          <small class="text-muted">{{
            getWeekNumber(row[weekStartsWith])
          }}</small>
        </td>
        <td v-for="(date, _index) in row" :key="_index">
          <btn
            block
            size="sm"
            style="border: none"
            data-action="select"
            :class="date.classes"
            :type="getBtnType(date)"
            :disabled="date.disabled"
            @click="select(date)"
          >
            <span
              data-action="select"
              :class="{ 'text-muted': month !== date.month }"
              >{{ date.date }}</span
            >
          </btn>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script src="./DateView.js" />
