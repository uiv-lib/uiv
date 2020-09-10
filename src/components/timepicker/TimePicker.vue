<template>
  <section @click.stop>
    <table>
      <tbody>
      <tr v-if="controls" class="text-center">
        <td>
          <btn type="link" size="sm" @click="changeTime(1,1)" :disabled="readonly">
            <i :class="iconControlUp"></i>
          </btn>
        </td>
        <td>&nbsp;</td>
        <td>
          <btn type="link" size="sm" @click="changeTime(0,1)" :disabled="readonly">
            <i :class="iconControlUp"></i>
          </btn>
        </td>
        <td v-if="showMeridian">
        </td>
      </tr>
      <tr>
        <td class="form-group">
          <input
            ref="hoursInput"
            type="tel"
            pattern="\d*"
            class="form-control text-center"
            :style="inputStyles"
            @mouseup="selectInputValue"
            @keydown.prevent.up="changeTime(1, 1)"
            @keydown.prevent.down="changeTime(1, 0)"
            @wheel="onWheel($event, true)"
            placeholder="HH"
            v-model.lazy="hoursText"
            :readonly="readonly"
            maxlength="2"
            size="2">
        </td>
        <td>&nbsp;<b>:</b>&nbsp;</td>
        <td class="form-group">
          <input
            ref="minutesInput"
            type="tel"
            pattern="\d*"
            class="form-control text-center"
            :style="inputStyles"
            @mouseup="selectInputValue"
            @keydown.prevent.up="changeTime(0, 1)"
            @keydown.prevent.down="changeTime(0, 0)"
            @wheel="onWheel($event, false)"
            placeholder="MM"
            v-model.lazy="minutesText"
            :readonly="readonly"
            maxlength="2"
            size="2">
        </td>
        <td v-if="showMeridian">
          &nbsp;
          <btn
            data-action="toggleMeridian"
            :disabled="readonly"
            v-text="meridian?t('uiv.timePicker.am'):t('uiv.timePicker.pm')"
            @click="toggleMeridian"></btn>
        </td>
      </tr>
      <tr v-if="controls" class="text-center">
        <td>
          <btn type="link" size="sm" @click="changeTime(1,0)" :disabled="readonly">
            <i :class="iconControlDown"></i>
          </btn>
        </td>
        <td>&nbsp;</td>
        <td>
          <btn type="link" size="sm" @click="changeTime(0,0)" :disabled="readonly">
            <i :class="iconControlDown"></i>
          </btn>
        </td>
        <td v-if="showMeridian">
        </td>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<script src="./TimePicker.js"/>
