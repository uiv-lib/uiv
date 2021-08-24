<template>
  <div class="tab-pane" :class="{ fade: transition > 0 }" role="tabpanel">
    <slot></slot>
    <portal :to="_uid.toString()">
      <slot name="title" />
    </portal>
  </div>
</template>

<script src="./Tab.js" />
