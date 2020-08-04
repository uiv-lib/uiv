<template>
  <div tabindex="-1" role="dialog" class="modal" :class="{fade:transition>0}" @click.self="backdropClicked">
    <div ref="dialog" class="modal-dialog" :class="modalSizeClass" role="document">
      <div class="modal-content">
        <div class="modal-header" v-if="header">
          <slot name="header">
            <button
              type="button"
              class="close"
              aria-label="Close"
              @click="toggle(false)"
              style="position: relative;z-index: 1060"
              v-if="dismissBtn">
              <!-- 1060 is bigger than dialog z-index 1050 because it got cover by title sometimes -->
              <span aria-hidden="true">×</span>
            </button>
            <h4 class="modal-title">
              <slot name="title">{{ title }}</slot>
            </h4>
          </slot>
        </div>
        <div class="modal-body">
          <slot/>
        </div>
        <div class="modal-footer" v-if="footer">
          <slot name="footer">
            <btn :type="cancelType" @click="toggle(false,'cancel')">
              <span>{{ cancelText || t('uiv.modal.cancel') }}</span>
            </btn>
            <btn :type="okType" @click="toggle(false,'ok')" data-action="auto-focus">
              <span>{{ okText || t('uiv.modal.ok') }}</span>
            </btn>
          </slot>
        </div>
      </div>
    </div>
    <div ref="backdrop" class="modal-backdrop" :class="{fade:transition>0}"></div>
  </div>
</template>

<script src="./Modal.js"/>
