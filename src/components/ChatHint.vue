<template>
  <div class="chat-hint" :class="{ collapsed: isCollapsed }">
    <div class="chat-header" @click="isCollapsed = !isCollapsed">
      <span class="chat-icon">&#128172;</span>
      <span class="chat-title">{{ isCollapsed ? '求助提示' : '对话中...' }}</span>
      <span class="chat-toggle">{{ isCollapsed ? '▲' : '▼' }}</span>
    </div>

    <div v-show="!isCollapsed" class="chat-body">
      <div class="chat-messages">
        <div
          v-for="(msg, i) in visibleMessages"
          :key="i"
          class="chat-msg"
          :class="{ 'msg-hint': msg.isHint }"
        >
          <div class="msg-sender" :style="{ color: getSenderColor(msg.senderId) }">
            {{ msg.sender }}
          </div>
          <div class="msg-text">
            <template v-if="msg.isHint && hintsRevealed <= i - firstHintIndex">
              <span class="hint-locked" @click="revealHint(i)">
                &#128274; 点击解锁提示
              </span>
            </template>
            <template v-else>
              {{ msg.text }}
            </template>
          </div>
        </div>
      </div>

      <div v-if="allHintsRevealed" class="chat-done">
        所有提示已解锁
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ChatMessage } from '@/data/challenges'

const props = defineProps<{
  messages: ChatMessage[]
}>()

const isCollapsed = ref(false)
const hintsRevealed = ref(0)

const firstHintIndex = computed(() =>
  props.messages.findIndex(m => m.isHint)
)

const visibleMessages = computed(() => props.messages)

const totalHints = computed(() =>
  props.messages.filter(m => m.isHint).length
)

const allHintsRevealed = computed(() =>
  hintsRevealed.value >= totalHints.value
)

function revealHint(clickedIndex: number) {
  const hintNum = clickedIndex - firstHintIndex.value + 1
  if (hintsRevealed.value < hintNum) {
    hintsRevealed.value = hintNum
  }
}

function getSenderColor(senderId: string): string {
  const colors: Record<string, string> = {
    'char-luowenzhou': 'var(--accent-blue)',
    'char-feidu': 'var(--accent-purple)',
    'char-taoran': 'var(--accent-green)',
  }
  return colors[senderId] || 'var(--text-secondary)'
}
</script>

<style lang="scss" scoped>
.chat-hint {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md, 8px);
  overflow: hidden;
  margin-top: 16px;
  transition: all 0.25s ease;

  &.collapsed {
    .chat-header {
      border-bottom: none;
    }
  }
}

.chat-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  cursor: pointer;
  background: var(--bg-tertiary);
  border-bottom: 1px solid var(--border-color);
  user-select: none;

  &:hover {
    background: var(--bg-hover);
  }
}

.chat-icon {
  font-size: 16px;
}

.chat-title {
  flex: 1;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}

.chat-toggle {
  font-size: 10px;
  color: var(--text-muted);
}

.chat-body {
  max-height: 400px;
  overflow-y: auto;
}

.chat-messages {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chat-msg {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.msg-sender {
  font-size: 12px;
  font-weight: 600;
}

.msg-text {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  padding: 8px 12px;
  background: var(--bg-tertiary);
  border-radius: 0 8px 8px 8px;
  max-width: 90%;
}

.msg-hint .msg-text {
  border-left: 2px solid var(--accent-yellow);
}

.hint-locked {
  color: var(--accent-yellow);
  cursor: pointer;
  font-size: 12px;
  font-style: italic;

  &:hover {
    color: var(--accent-yellow-light, var(--accent-yellow));
    text-decoration: underline;
  }
}

.chat-done {
  padding: 8px 16px;
  font-size: 11px;
  color: var(--accent-green);
  text-align: center;
  border-top: 1px solid var(--border-color);
}
</style>
