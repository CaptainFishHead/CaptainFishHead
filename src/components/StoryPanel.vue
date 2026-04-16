<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  node: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['choose'])
const renderedText = ref('')
const typing = ref(false)

const isEnding = computed(() => Boolean(props.node.ending))

watch(
  () => props.node,
  (value) => {
    if (!value?.text) {
      renderedText.value = ''
      return
    }

    typing.value = true
    renderedText.value = ''

    let index = 0
    const source = value.text
    const timer = setInterval(() => {
      index += 1
      renderedText.value = source.slice(0, index)
      if (index >= source.length) {
        clearInterval(timer)
        typing.value = false
      }
    }, 18)
  },
  { immediate: true }
)
</script>

<template>
  <section class="story-panel">
    <h1>{{ node.title }}</h1>
    <p class="story-text">{{ renderedText }}</p>

    <div v-if="!isEnding" class="choices">
      <button
        v-for="choice in node.choices"
        :key="choice.text"
        :disabled="typing"
        @click="emit('choose', choice.next)"
      >
        {{ choice.text }}
      </button>
    </div>

    <p v-else class="ending">已达成结局：{{ node.ending }}</p>
  </section>
</template>
