import { defineStore } from 'pinia'
import { initialNodeId, storyNodes } from '../data/story'

const SAVE_KEY = 'if-guardian-story-save'

export const useStoryStore = defineStore('story', {
  state: () => ({
    currentId: initialNodeId,
    history: [initialNodeId]
  }),
  getters: {
    currentNode: (state) => storyNodes[state.currentId],
    canRollback: (state) => state.history.length > 1
  },
  actions: {
    choose(nextId) {
      if (!storyNodes[nextId]) return
      this.currentId = nextId
      this.history.push(nextId)
    },
    rollback() {
      if (!this.canRollback) return
      this.history.pop()
      this.currentId = this.history[this.history.length - 1]
    },
    restart() {
      this.currentId = initialNodeId
      this.history = [initialNodeId]
    },
    save() {
      localStorage.setItem(
        SAVE_KEY,
        JSON.stringify({ currentId: this.currentId, history: this.history })
      )
    },
    load() {
      const raw = localStorage.getItem(SAVE_KEY)
      if (!raw) return false

      try {
        const parsed = JSON.parse(raw)
        if (!storyNodes[parsed.currentId] || !Array.isArray(parsed.history)) {
          return false
        }

        this.currentId = parsed.currentId
        this.history = parsed.history.filter((id) => storyNodes[id])
        if (this.history.length === 0) {
          this.history = [this.currentId]
        }
        return true
      } catch {
        return false
      }
    }
  }
})
