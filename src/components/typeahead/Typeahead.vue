<template>
  <dropdown
    ref="dropdown"
    v-model="open"
    tag="section"
    :append-to-body="appendToBody"
    :not-close-elements="elements"
    :position-element="inputEl"
  >
    <template slot="dropdown">
      <slot
        name="item"
        :items="items"
        :active-index="activeIndex"
        :select="selectItem"
        :highlight="highlight"
      >
        <li
          v-for="(item, index) in items"
          :key="index"
          :class="{ active: activeIndex === index }"
        >
          <a href="#" @click.prevent="selectItem(item)">
            <span v-html="highlight(item)"></span>
          </a>
        </li>
      </slot>
      <slot v-if="!items || items.length === 0" name="empty" />
    </template>
  </dropdown>
</template>

<script src="./Typeahead.js" />
