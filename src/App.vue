<script setup>
import { computed, ref } from 'vue'
import StoryPanel from './components/StoryPanel.vue'
import { useStoryStore } from './stores/storyStore'

const story = useStoryStore()
const node = computed(() => story.currentNode)
const slot = ref(1)

const choices = computed(() => node.value.choices ?? [])

function choose(choice) {
  story.choose(choice)
}

function quickLoad() {
  const loaded = story.load(slot.value)
  if (!loaded) {
    alert(`存档槽 ${slot.value} 没有可读取的数据。`)
  }
}
</script>

<template>
  <main class="app" :style="{ backgroundImage: `url(${node.background})` }">
    <header class="toolbar">
      <button @click="story.restart">重新开始</button>
      <button :disabled="!story.canRollback" @click="story.rollback">回退一步</button>

      <label>
        存档槽位
        <select v-model.number="slot">
          <option v-for="item in story.saveSlots" :key="item" :value="item">槽位 {{ item }}</option>
        </select>
      </label>
      <button @click="story.save(slot)">保存</button>
      <button @click="quickLoad">读取</button>
    </header>

    <section class="meta-panel">
      <p>数值：{{ story.stats }}</p>
      <p>已解锁结局：{{ story.endings.length > 0 ? story.endings.join(' / ') : '暂无' }}</p>
    </section>

    <StoryPanel :node="node" :choices="choices" :can-choose="story.isChoiceUnlocked" @choose="choose" />
  </main>
</template>
