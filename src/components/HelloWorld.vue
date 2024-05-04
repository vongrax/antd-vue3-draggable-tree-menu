<template>
  <h1 class="title">Draggable tree menu</h1>
    <div class="menu">
      <draggable-menu />
    </div>

</template>

<script setup lang="ts">
import DraggableMenu from "@/components/DraggableMenu.vue";
</script>

<style scoped>
.title {
  margin: 30px;
}
.menu {
  margin: 0 auto;
  max-width: 300px;
  padding: 20px;
  border: 1px solid;
  border-radius: 5px;
}
</style>
