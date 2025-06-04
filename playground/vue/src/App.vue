<script setup lang="ts">
import Themer from './components/Themer.vue';
import { provideTheemo } from '@theemo/vue';

provideTheemo();
</script>

<template>
  <Themer/>
</template>
