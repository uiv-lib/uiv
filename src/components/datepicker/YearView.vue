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
        <td colspan="3">
          <btn
            class="uiv-datepicker-title"
            block
            size="sm"
            style="border: none"
          >
            <b>{{ yearStr }}</b>
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
        <td v-for="(year, j) in row" :key="`${i}_${j}`" width="20%">
          <btn
            block
            size="sm"
            style="border: none"
            :type="getBtnClass(year)"
            @click="changeView(year)"
          >
            <span>{{ year }}</span>
          </btn>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script src="./YearView.js" />
