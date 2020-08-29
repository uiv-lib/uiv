<template>
  <dropdown
    v-model="showDropdown"
    ref="dropdown"
    :not-close-elements="els"
    :append-to-body="appendToBody"
    :disabled="disabled"
    :style="containerStyles"
    @keydown.native.esc="showDropdown=false">
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
      @keydown.prevent.stop.enter="selectOption">
      <div class="pull-right" style="display: inline-block;vertical-align: middle">
        <span>&nbsp;</span>
        <span class="caret"></span>
      </div>
      <div
        :class="selectTextClasses"
        style="overflow-x: hidden; text-overflow: ellipsis; white-space: nowrap;"
        v-text="selectedText"
      ></div>
    </div>
    <template slot="dropdown">
      <li v-if="filterable" style="padding: 4px 8px">
        <input
          aria-label="Filter..."
          ref="filterInput"
          class="form-control input-sm"
          type="text"
          :placeholder="filterPlaceholder || t('uiv.multiSelect.filterPlaceholder')"
          v-model="filterInput"
          @keyup.enter="searchClicked"
          @keydown.prevent.stop.down="goNextOption"
          @keydown.prevent.stop.up="goPrevOption"
          @keydown.prevent.stop.enter="selectOption"
        />
      </li>
      <template v-for="item in groupedOptions">
        <li v-if="item.$group" class="dropdown-header" v-text="item.$group"></li>
        <template v-for="_item in item.options">
          <li
            @keydown.prevent.stop.down="goNextOption"
            @keydown.prevent.stop.up="goPrevOption"
            @keydown.prevent.stop.enter="selectOption"
            :class="itemClasses(_item)"
            @click.stop="toggle(_item)"
            @mouseenter="currentActive=-1"
            style="outline: 0">
            <a role="button" v-if="customOptionsVisible" style="outline: 0">
              <slot name="custom-option"
                    :item="_item">
              </slot>
              <span v-if="selectedIcon && isItemSelected(_item)" :class="selectedIconClasses"></span>
            </a>
            <a role="button" v-else-if="isItemSelected(_item)" style="outline: 0">
              <b>{{ _item[labelKey] }}</b>
              <span v-if="selectedIcon" :class="selectedIconClasses"></span>
            </a>
            <a role="button" v-else style="outline: 0">
              <span>{{ _item[labelKey] }}</span>
            </a>
          </li>
        </template>
      </template>
    </template>
  </dropdown>
</template>

<script src="./MultiSelect.js"/>
