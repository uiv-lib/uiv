<template>
  <section @click.stop>
    <table>
      <tbody>
        <tr v-if="controls" class="text-center">
          <td>
            <btn
              type="link"
              size="sm"
              :disabled="readonly"
              @click="changeTime(1, 1)"
            >
              <i :class="iconControlUp"></i>
            </btn>
          </td>
          <td>&nbsp;</td>
          <td>
            <btn
              type="link"
              size="sm"
              :disabled="readonly"
              @click="changeTime(0, 1)"
            >
              <i :class="iconControlUp"></i>
            </btn>
          </td>
          <td v-if="showMeridian"></td>
        </tr>
        <tr>
          <td class="form-group">
            <input
              ref="hoursInput"
              v-model.lazy="hoursText"
              type="tel"
              pattern="\d*"
              class="form-control text-center"
              :style="inputStyles"
              placeholder="HH"
              :readonly="readonly"
              maxlength="2"
              size="2"
              @mouseup="selectInputValue"
              @keydown.prevent.up="changeTime(1, 1)"
              @keydown.prevent.down="changeTime(1, 0)"
              @wheel="onWheel($event, true)"
            />
          </td>
          <td>&nbsp;<b>:</b>&nbsp;</td>
          <td class="form-group">
            <input
              ref="minutesInput"
              v-model.lazy="minutesText"
              type="tel"
              pattern="\d*"
              class="form-control text-center"
              :style="inputStyles"
              placeholder="MM"
              :readonly="readonly"
              maxlength="2"
              size="2"
              @mouseup="selectInputValue"
              @keydown.prevent.up="changeTime(0, 1)"
              @keydown.prevent.down="changeTime(0, 0)"
              @wheel="onWheel($event, false)"
            />
          </td>
          <td v-if="showMeridian">
            &nbsp;
            <btn
              data-action="toggleMeridian"
              :disabled="readonly"
              @click="toggleMeridian"
              v-text="
                meridian ? t('uiv.timePicker.am') : t('uiv.timePicker.pm')
              "
            ></btn>
          </td>
        </tr>
        <tr v-if="controls" class="text-center">
          <td>
            <btn
              type="link"
              size="sm"
              :disabled="readonly"
              @click="changeTime(1, 0)"
            >
              <i :class="iconControlDown"></i>
            </btn>
          </td>
          <td>&nbsp;</td>
          <td>
            <btn
              type="link"
              size="sm"
              :disabled="readonly"
              @click="changeTime(0, 0)"
            >
              <i :class="iconControlDown"></i>
            </btn>
          </td>
          <td v-if="showMeridian"></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script src="./TimePicker.js" />
