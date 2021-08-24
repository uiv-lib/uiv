<template>
  <alert
    class="fade"
    :class="customClass"
    :style="styles"
    :type="type"
    :duration="duration"
    :dismissible="dismissible"
    @dismissed="onDismissed"
  >
    <div class="media" style="margin: 0">
      <div v-if="icons" class="media-left">
        <span :class="icons" style="font-size: 1.5em"></span>
      </div>
      <div class="media-body">
        <div v-if="title" class="media-heading">
          <b>{{ title }}</b>
        </div>
        <div v-if="html" v-html="content"></div>
        <div v-else>{{ content }}</div>
      </div>
    </div>
  </alert>
</template>

<script src="./Notification.js" />
