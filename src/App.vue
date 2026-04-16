<script setup>
import { computed } from 'vue'
import StoryPanel from './components/StoryPanel.vue'
import { useStoryStore } from './stores/storyStore'

const story = useStoryStore()
const node = computed(() => story.currentNode)

function choose(nextId) {
  story.choose(nextId)
}

function quickLoad() {
  const loaded = story.load()
  if (!loaded) {
    alert('没有可读取的存档。')
  }
}
</script>

<template>
  <main class="app" :style="{ backgroundImage: `url(${node.background})` }">
    <header class="toolbar">
      <button @click="story.restart">重新开始</button>
      <button :disabled="!story.canRollback" @click="story.rollback">回退一步</button>
      <button @click="story.save">快速存档</button>
      <button @click="quickLoad">读取存档</button>
    </header>

    <StoryPanel :node="node" @choose="choose" />
  </main>
</template>
