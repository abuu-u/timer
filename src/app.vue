<script setup lang="ts">
import AddTimer from './components/add-timer.vue'
import TimerItem from './components/timer-item.vue'
import { useTimersStore } from './stores/timers'

const store = useTimersStore()
</script>

<template>
  <main class="container">
    <TimerItem
      v-for="timer in store.timers"
      :id="timer.id"
      :key="timer.id"
      :time-in-seconds="timer.timeInSeconds"
    />

    <AddTimer @click="store.add(Math.ceil(Math.random() * 100000))" />
  </main>
</template>

<style scoped lang="scss">
.container {
  min-width: $mobile;
  padding: 70px 50px;
  gap: 50px 45px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 225px);
  justify-content: center;

  @media #{$tablet-breakpoint} {
    padding: 70px 135px;
  }

  @media #{$desktop-breakpoint} {
    padding: 70px 210px;
  }
}
</style>
