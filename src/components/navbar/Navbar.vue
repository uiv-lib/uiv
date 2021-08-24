<template>
  <nav :class="navClasses">
    <div :class="fluid ? 'container-fluid' : 'container'">
      <div class="navbar-header">
        <slot name="collapse-btn">
          <button type="button" class="navbar-toggle collapsed" @click="toggle">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </slot>
        <slot name="brand" />
      </div>
      <slot />
      <collapse v-model="show" class="navbar-collapse">
        <slot name="collapse" />
      </collapse>
    </div>
  </nav>
</template>

<script src="./Navbar.js" />
