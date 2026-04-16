import { defineStore } from 'pinia'
import { initialNodeId, storyNodes } from '../data/story'

const SAVE_PREFIX = 'if-guardian-story-save-slot-'
const SLOT_COUNT = 3

function defaultStats() {
  return {
    trustOrg: 0,
    evidence: 0,
    stealth: 0,
    combat: 0,
    empathy: 0
  }
}

export const useStoryStore = defineStore('story', {
  state: () => ({
    currentId: initialNodeId,
    history: [initialNodeId],
    stats: defaultStats(),
    endings: []
  }),
  getters: {
    currentNode: (state) => storyNodes[state.currentId],
    canRollback: (state) => state.history.length > 1,
    saveSlots: () => Array.from({ length: SLOT_COUNT }, (_, i) => i + 1)
  },
  actions: {
    isChoiceUnlocked(choice) {
      if (!choice.requirements) return true
      return Object.entries(choice.requirements).every(
        ([key, value]) => (this.stats[key] ?? 0) >= value
      )
    },
    applyEffects(choice) {
      if (!choice.effects) return
      Object.entries(choice.effects).forEach(([key, value]) => {
        this.stats[key] = (this.stats[key] ?? 0) + value
      })
    },
    choose(choice) {
      if (!this.isChoiceUnlocked(choice)) return
      if (!storyNodes[choice.next]) return

      this.applyEffects(choice)
      this.currentId = choice.next
      this.history.push(choice.next)

      const currentNode = this.currentNode
      if (currentNode?.ending && !this.endings.includes(currentNode.ending)) {
        this.endings.push(currentNode.ending)
      }
    },
    rollback() {
      if (!this.canRollback) return
      this.history.pop()
      this.currentId = this.history[this.history.length - 1]
    },
    restart() {
      this.currentId = initialNodeId
      this.history = [initialNodeId]
      this.stats = defaultStats()
    },
    save(slot = 1) {
      if (!this.saveSlots.includes(slot)) return
      localStorage.setItem(
        `${SAVE_PREFIX}${slot}`,
        JSON.stringify({
          currentId: this.currentId,
          history: this.history,
          stats: this.stats,
          endings: this.endings
        })
      )
    },
    load(slot = 1) {
      if (!this.saveSlots.includes(slot)) return false
      const raw = localStorage.getItem(`${SAVE_PREFIX}${slot}`)
      if (!raw) return false

      try {
        const parsed = JSON.parse(raw)
        if (!storyNodes[parsed.currentId] || !Array.isArray(parsed.history)) {
          return false
        }

        this.currentId = parsed.currentId
        this.history = parsed.history.filter((id) => storyNodes[id])
        this.stats = {
          ...defaultStats(),
          ...(parsed.stats ?? {})
        }
        this.endings = Array.isArray(parsed.endings) ? parsed.endings : []

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
