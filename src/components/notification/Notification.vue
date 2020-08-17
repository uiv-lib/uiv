<template>
  <alert
    class="fade"
    :class="customClass"
    :style="styles"
    :type="type"
    :duration="duration"
    :dismissible="dismissible"
    @dismissed="onDismissed">
    <div class="media" style="margin: 0">
      <div class="media-left" v-if="icons">
        <span :class="icons" style="font-size: 1.5em"></span>
      </div>
      <div class="media-body">
        <div class="media-heading" v-if="title"><b>{{ title }}</b></div>
        <div v-if="html" v-html="content"></div>
        <div v-else>{{ content }}</div>
      </div>
    </div>
  </alert>
</template>

<script src="./Notification.js"/>
