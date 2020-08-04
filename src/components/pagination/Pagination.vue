<template>
  <nav aria-label="Page navigation" :class="navClasses">
    <ul class="pagination" :class="classes">
      <li :class="{disabled:value<=1||disabled}" v-if="boundaryLinks">
        <a href="#" role="button" aria-label="First" @click.prevent="onPageChange(1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li :class="{disabled:value<= 1||disabled}" v-if="directionLinks">
        <a href="#" role="button" aria-label="Previous" @click.prevent="onPageChange(value-1)">
          <span aria-hidden="true">&lsaquo;</span>
        </a>
      </li>
      <li :class="{disabled:disabled}" v-if="sliceStart>0">
        <a href="#" role="button" aria-label="Previous group" @click.prevent="toPage(1)">
          <span aria-hidden="true">&hellip;</span>
        </a>
      </li>
      <li v-for="item in sliceArray" :key="item" :class="{active:value===item+1,disabled:disabled}">
        <a href="#" role="button" @click.prevent="onPageChange(item + 1)">{{item + 1}}</a>
      </li>
      <li :class="{disabled:disabled}" v-if="sliceStart<totalPage-maxSize">
        <a href="#" role="button" aria-label="Next group" @click.prevent="toPage(0)">
          <span aria-hidden="true">&hellip;</span>
        </a>
      </li>
      <li :class="{disabled:value>=totalPage||disabled}" v-if="directionLinks">
        <a href="#" role="button" aria-label="Next" @click.prevent="onPageChange(value+1)">
          <span aria-hidden="true">&rsaquo;</span>
        </a>
      </li>
      <li :class="{disabled:value>=totalPage||disabled}" v-if="boundaryLinks">
        <a href="#" role="button" aria-label="Last" @click.prevent="onPageChange(totalPage)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script src="./Pagination.js"/>
