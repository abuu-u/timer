import { defineStore } from 'pinia'

const createId = () => {
  let id = 0

  return {
    next: () => {
      id += 1
      return id
    },
  }
}

const id = createId()

export const useTimersStore = defineStore('timer', {
  state: (): { timers: { timeInSeconds: number; id: number }[] } => ({
    timers: [],
  }),

  actions: {
    add(timer: number) {
      this.timers.push({ timeInSeconds: timer, id: id.next() })
    },

    remove(id: number) {
      this.timers = this.timers.filter((timer) => timer.id !== id)
    },
  },
})
