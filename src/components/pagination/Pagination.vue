<template>
  <nav aria-label="Page navigation" :class="navClasses">
    <ul class="pagination" :class="classes">
      <li v-if="boundaryLinks" :class="{ disabled: value <= 1 || disabled }">
        <a
          href="#"
          role="button"
          aria-label="First"
          @click.prevent="onPageChange(1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-if="directionLinks" :class="{ disabled: value <= 1 || disabled }">
        <a
          href="#"
          role="button"
          aria-label="Previous"
          @click.prevent="onPageChange(value - 1)"
        >
          <span aria-hidden="true">&lsaquo;</span>
        </a>
      </li>
      <li v-if="sliceStart > 0" :class="{ disabled: disabled }">
        <a
          href="#"
          role="button"
          aria-label="Previous group"
          @click.prevent="toPage(1)"
        >
          <span aria-hidden="true">&hellip;</span>
        </a>
      </li>
      <li
        v-for="item in sliceArray"
        :key="item"
        :class="{ active: value === item + 1, disabled: disabled }"
      >
        <a href="#" role="button" @click.prevent="onPageChange(item + 1)">{{
          item + 1
        }}</a>
      </li>
      <li
        v-if="sliceStart < totalPage - maxSize"
        :class="{ disabled: disabled }"
      >
        <a
          href="#"
          role="button"
          aria-label="Next group"
          @click.prevent="toPage(0)"
        >
          <span aria-hidden="true">&hellip;</span>
        </a>
      </li>
      <li
        v-if="directionLinks"
        :class="{ disabled: value >= totalPage || disabled }"
      >
        <a
          href="#"
          role="button"
          aria-label="Next"
          @click.prevent="onPageChange(value + 1)"
        >
          <span aria-hidden="true">&rsaquo;</span>
        </a>
      </li>
      <li
        v-if="boundaryLinks"
        :class="{ disabled: value >= totalPage || disabled }"
      >
        <a
          href="#"
          role="button"
          aria-label="Last"
          @click.prevent="onPageChange(totalPage)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script src="./Pagination.js" />
