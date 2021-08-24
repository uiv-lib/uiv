<template>
  <dropdown
    ref="dropdown"
    v-model="showDropdown"
    :not-close-elements="els"
    :append-to-body="appendToBody"
    :disabled="disabled"
    :style="containerStyles"
    @keydown.native.esc="showDropdown = false"
  >
    <div
      class="form-control dropdown-toggle clearfix"
      :class="selectClasses"
      :disabled="disabled"
      tabindex="0"
      data-role="trigger"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
      @keydown.prevent.stop.down="goNextOption"
      @keydown.prevent.stop.up="goPrevOption"
      @keydown.prevent.stop.enter="selectOption"
    >
      <div
        class="pull-right"
        style="display: inline-block; vertical-align: middle"
      >
        <span>&nbsp;</span>
        <span class="caret"></span>
      </div>
      <div
        :class="selectTextClasses"
        style="overflow-x: hidden; text-overflow: ellipsis; white-space: nowrap"
        v-text="selectedText"
      ></div>
    </div>
    <template slot="dropdown">
      <li v-if="filterable" style="padding: 4px 8px">
        <input
          ref="filterInput"
          v-model="filterInput"
          aria-label="Filter..."
          class="form-control input-sm"
          type="text"
          :placeholder="
            filterPlaceholder || t('uiv.multiSelect.filterPlaceholder')
          "
          @keyup.enter="searchClicked"
          @keydown.prevent.stop.down="goNextOption"
          @keydown.prevent.stop.up="goPrevOption"
          @keydown.prevent.stop.enter="selectOption"
        />
      </li>
      <template v-for="(item, i) in groupedOptions">
        <li
          v-if="item.$group"
          :key="i"
          class="dropdown-header"
          v-text="item.$group"
        ></li>
        <template v-for="(_item, j) in item.options">
          <li
            :key="`${i}_${j}`"
            :class="itemClasses(_item)"
            style="outline: 0"
            @keydown.prevent.stop.down="goNextOption"
            @keydown.prevent.stop.up="goPrevOption"
            @keydown.prevent.stop.enter="selectOption"
            @click.stop="toggle(_item)"
            @mouseenter="currentActive = -1"
          >
            <a v-if="customOptionsVisible" role="button" style="outline: 0">
              <slot name="option" :item="_item" />
              <span
                v-if="selectedIcon && isItemSelected(_item)"
                :class="selectedIconClasses"
              ></span>
            </a>
            <a
              v-else-if="isItemSelected(_item)"
              role="button"
              style="outline: 0"
            >
              <b>{{ _item[labelKey] }}</b>
              <span v-if="selectedIcon" :class="selectedIconClasses"></span>
            </a>
            <a v-else role="button" style="outline: 0">
              <span>{{ _item[labelKey] }}</span>
            </a>
          </li>
        </template>
      </template>
    </template>
  </dropdown>
</template>

<script src="./MultiSelect.js" />
