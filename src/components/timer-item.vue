<script setup lang="ts">
import { computed, ref } from 'vue'
import IconPause from '@/components/icons/icon-pause.vue'
import IconStop from '@/components/icons/icon-stop.vue'
import IconStart from '@/components/icons/icon-start.vue'
import { useTimersStore } from '@/stores/timers'

const properties = defineProps<{
  timeInSeconds: number
  id: number
}>()

const store = useTimersStore()
const timeInSeconds = ref(properties.timeInSeconds)

const timer = computed(() => {
  const seconds = timeInSeconds.value % 60
  const minutes = ((timeInSeconds.value - seconds) / 60) % 60
  const hours = (timeInSeconds.value - seconds - minutes * 60) / (60 * 60)

  return [hours, minutes, seconds]
    .filter((time) => time > 0)
    .map((time, index) => (index === 0 ? time.toString() : time.toString().padStart(2, '0')))
    .join(':')
})

const isStarted = ref(false)

const token = ref(-1)

const start = () => {
  token.value = setInterval(() => timeInSeconds.value--, 1000)
}

const pause = () => {
  clearInterval(token.value)
}

const pauseStartClickHandler = () => {
  isStarted.value = !isStarted.value

  if (isStarted.value) {
    start()
  } else {
    pause()
  }
}

const stopClickHandler = () => {
  pause()
  store.remove(properties.id)
}
</script>

<template>
  <div class="wrapper" :class="{ active: isStarted }">
    <p class="timer">{{ timer }}</p>

    <div class="buttons">
      <button v-if="isStarted" class="button" @click="pauseStartClickHandler">
        Pause
        <IconPause />
      </button>
      <button v-else class="button" @click="pauseStartClickHandler">
        Start
        <IconStart />
      </button>

      <button class="button" @click="stopClickHandler">
        Stop
        <IconStop />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  background-color: $color-bg;
  display: inline-grid;

  &.active {
    color: $color-secondary;
  }

  &::after {
    position: absolute;
    content: '';
    height: 1px;
    width: 100%;
    background-color: currentColor;
    left: 0;
    top: calc(50% - 0.5px);
  }
}

.timer,
.buttons {
  display: flex;
  height: 60px;
  width: 225px;
  justify-content: center;
  align-items: center;
}

.timer {
  font-weight: 400;
  font-size: 22px;
  line-height: 21px;
}

.buttons {
  display: flex;
  gap: 45px;
}

.button {
  cursor: pointer;
  padding: 0;
  font-size: 0;
  background: 0;
  border: 0;
  color: inherit;

  & svg {
    fill: currentColor;
    height: 20px;
    width: 20px;
  }
}
</style>
