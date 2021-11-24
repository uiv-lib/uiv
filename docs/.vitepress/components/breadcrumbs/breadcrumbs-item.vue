<template>
  <div class="uiv">
    <Breadcrumbs>
      <BreadcrumbItem href="#"><b>Home</b></BreadcrumbItem>
      <BreadcrumbItem href="#">Library</BreadcrumbItem>
      <BreadcrumbItem active>Data</BreadcrumbItem>
    </Breadcrumbs>
  </div>
</template>

<script setup>
import { Breadcrumbs, BreadcrumbItem } from 'uiv';
</script>
