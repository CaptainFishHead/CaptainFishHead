<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
  node: {
    type: Object,
    required: true
  },
  choices: {
    type: Array,
    default: () => []
  },
  canChoose: {
    type: Function,
    required: true
  }
})

const emit = defineEmits(['choose'])
const renderedText = ref('')
const typing = ref(false)
let timer = null

const isEnding = computed(() => Boolean(props.node.ending))

function clearTypingTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function showAllText() {
  clearTypingTimer()
  renderedText.value = props.node?.text ?? ''
  typing.value = false
}

watch(
  () => props.node,
  (value) => {
    clearTypingTimer()

    if (!value?.text) {
      renderedText.value = ''
      typing.value = false
      return
    }

    typing.value = true
    renderedText.value = ''

    let index = 0
    const source = value.text
    timer = setInterval(() => {
      index += 1
      renderedText.value = source.slice(0, index)
      if (index >= source.length) {
        clearTypingTimer()
        typing.value = false
      }
    }, 18)
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  clearTypingTimer()
})
</script>

<template>
  <section class="story-panel">
    <p class="speaker">{{ node.speaker }}</p>
    <h1>{{ node.title }}</h1>
    <p class="story-text">{{ renderedText }}</p>

    <button v-if="typing" class="skip-button" @click="showAllText">跳过文字动画</button>

    <div v-if="!isEnding" class="choices">
      <button
        v-for="choice in choices"
        :key="choice.text"
        :disabled="typing || !canChoose(choice)"
        @click="emit('choose', choice)"
      >
        {{ choice.text }}
      </button>
    </div>

    <p v-else class="ending">已达成结局：{{ node.ending }}</p>
  </section>
</template>
