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
            @click="goPrevYear"
          >
            <i :class="iconControlLeft"></i>
          </btn>
        </td>
        <td colspan="4">
          <btn
            class="uiv-datepicker-title"
            block
            size="sm"
            style="border: none"
            @click="changeView()"
          >
            <b>{{ year }}</b>
          </btn>
        </td>
        <td>
          <btn
            class="uiv-datepicker-pager-next"
            block
            size="sm"
            style="border: none"
            @click="goNextYear"
          >
            <i :class="iconControlRight"></i>
          </btn>
        </td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in rows" :key="i">
        <td v-for="(month, j) in row" :key="j" colspan="2" width="33.333333%">
          <btn
            block
            size="sm"
            style="border: none"
            :type="getBtnClass(i * 3 + j)"
            @click="changeView(i * 3 + j)"
          >
            <span>{{ tCell(month) }}</span>
          </btn>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script src="./MonthView.js" />
