<template>
  <div class="challenge-page">
    <div class="page-header">
      <h1>案件闯关</h1>
      <p class="header-sub">CASE CHALLENGE</p>
    </div>

    <!-- 案件选择 -->
    <div v-if="!activeCase" class="case-select">
      <p class="select-hint">选择案件开始闯关。完成当前案件才能解锁下一关。</p>
      <div class="challenge-cards">
        <div
          v-for="(ch, idx) in challengesData"
          :key="ch.caseId"
          class="challenge-card"
          :class="{
            locked: !challengeStore.isCaseUnlocked(ch.caseId),
            completed: challengeStore.isCaseCompleted(ch.caseId),
            current: challengeStore.isCaseUnlocked(ch.caseId) && !challengeStore.isCaseCompleted(ch.caseId),
          }"
          @click="startCase(ch.caseId)"
        >
          <div class="card-status-icon">
            <span v-if="challengeStore.isCaseCompleted(ch.caseId)" class="icon-done">&#10003;</span>
            <span v-else-if="challengeStore.isCaseUnlocked(ch.caseId)" class="icon-lock-open">&#9711;</span>
            <span v-else class="icon-lock">&#128274;</span>
          </div>
          <div class="card-info">
            <div class="card-index">第 {{ idx + 1 }} 关</div>
            <div class="card-name">{{ ch.caseName }}</div>
            <div class="card-progress">{{ getProgressText(ch.caseId) }}</div>
          </div>
          <div class="card-arrow" v-if="challengeStore.isCaseUnlocked(ch.caseId)">&#8594;</div>
        </div>
      </div>
      <div class="progress-summary">
        <div class="progress-bar-wrap">
          <div class="progress-bar-fill" :style="{ width: (challengeStore.totalCompleted / challengesData.length * 100) + '%' }"></div>
        </div>
        <span>{{ challengeStore.totalCompleted }} / {{ challengesData.length }} 案件已完成</span>
      </div>
    </div>

    <!-- 答题中 -->
    <div v-else class="challenge-active">
      <div class="active-header">
        <button class="btn-back" @click="activeCase = null">&#8592; 返回</button>
        <div class="step-dots">
          <span
            v-for="(s, i) in activeCase.steps"
            :key="s.id"
            class="step-dot"
            :class="{
              active: i === currentStepIndex,
              done: i < currentStepIndex,
            }"
          ></span>
        </div>
      </div>

      <div class="step-card">
        <div class="step-type-badge" :class="`type-${currentStep.type}`">
          {{ typeText(currentStep.type) }}
        </div>
        <h2 class="step-title">{{ currentStep.title }}</h2>
        <div class="step-scene" v-html="currentStep.description"></div>

        <!-- ===== 选择题 / 推理题（有 options） ===== -->
        <div v-if="currentStep.type === 'choice' || currentStep.type === 'reasoning'" class="question-block">
          <p class="step-question">{{ currentStep.question }}</p>
          <div class="options-list">
            <div
              v-for="opt in currentStep.options"
              :key="opt.id"
              class="option-item"
              :class="{
                selected: selectedAnswer === opt.id,
                correct: answered && opt.id === currentStep.correctAnswer,
                wrong: answered && selectedAnswer === opt.id && opt.id !== currentStep.correctAnswer,
                disabled: answered,
              }"
              @click="selectAnswer(opt.id)"
            >
              <span class="option-id">{{ opt.id.toUpperCase() }}</span>
              <span class="option-text">{{ opt.text }}</span>
              <span v-if="answered && opt.id === currentStep.correctAnswer" class="option-mark correct-mark">&#10003;</span>
              <span v-else-if="answered && selectedAnswer === opt.id && opt.id !== currentStep.correctAnswer" class="option-mark wrong-mark">&#10007;</span>
            </div>
          </div>
        </div>

        <!-- ===== 判断题 ===== -->
        <div v-if="currentStep.type === 'truefalse'" class="question-block">
          <p class="step-question">{{ currentStep.question }}</p>
          <div class="tf-buttons">
            <button
              class="tf-btn tf-true"
              :class="{
                selected: selectedAnswer === 'true',
                correct: answered && currentStep.correctAnswer === 'true',
                wrong: answered && selectedAnswer === 'true' && currentStep.correctAnswer !== 'true',
              }"
              @click="selectAnswer('true')"
              :disabled="answered"
            >
              <span class="tf-icon">&#10003;</span>
              <span>正确</span>
            </button>
            <button
              class="tf-btn tf-false"
              :class="{
                selected: selectedAnswer === 'false',
                correct: answered && currentStep.correctAnswer === 'false',
                wrong: answered && selectedAnswer === 'false' && currentStep.correctAnswer !== 'false',
              }"
              @click="selectAnswer('false')"
              :disabled="answered"
            >
              <span class="tf-icon">&#10007;</span>
              <span>错误</span>
            </button>
          </div>
        </div>

        <!-- ===== 排序题 ===== -->
        <div v-if="currentStep.type === 'sorting'" class="question-block">
          <p class="step-question">{{ currentStep.question }}</p>
          <div class="sorting-list">
            <div
              v-for="(item, idx) in sortItems"
              :key="item.id"
              class="sort-item"
              :class="{ placed: answered }"
            >
              <div class="sort-handle" @mousedown="startDrag(idx)" @touchstart.prevent="startDrag(idx)">
                &#9776;
              </div>
              <div class="sort-order">{{ idx + 1 }}</div>
              <div class="sort-text">{{ item.text }}</div>
              <div class="sort-arrows">
                <button v-if="idx > 0" class="arrow-btn" @click="moveItem(idx, idx - 1)" :disabled="answered">&#9650;</button>
                <button v-if="idx < sortItems.length - 1" class="arrow-btn" @click="moveItem(idx, idx + 1)" :disabled="answered">&#9660;</button>
              </div>
            </div>
          </div>
        </div>

        <!-- ===== 连线题 ===== -->
        <div v-if="currentStep.type === 'connect'" class="question-block">
          <p class="step-question">{{ currentStep.question }}</p>
          <div class="connect-board">
            <div class="connect-left">
              <div v-for="item in connectLeft" :key="item.id" class="connect-item left-item"
                :class="{ selected: connectSelectLeft === item.id }"
                @click="selectConnectLeft(item.id)"">
                {{ item.text }}
              </div>
            </div>
            <div class="connect-lines">
              <div v-for="(match, key) in connectMatches" :key="key" class="match-line"
                :class="{ matched: match !== '' }">
                {{ match || '—' }}
              </div>
            </div>
            <div class="connect-right">
              <div v-for="item in connectRight" :key="item.id" class="connect-item right-item"
                :class="{ used: Object.values(connectMatches).includes(item.id) }"
                @click="selectConnectRight(item.id)">
                {{ item.text }}
              </div>
            </div>
          </div>
        </div>

        <!-- 确认按钮 -->
        <div v-if="canSubmit && !answered" class="action-row">
          <button class="btn-confirm" @click="submitAnswer">确认提交</button>
        </div>

        <!-- 结果 -->
        <div v-if="answered" class="result-area">
          <div class="result-banner" :class="isCorrect ? 'correct' : 'wrong'">
            {{ isCorrect ? '回答正确！' : '回答错误' }}
          </div>
          <div class="explanation">
            <h4>&#128270; 解析</h4>
            <p>{{ currentStep.explanation }}</p>
          </div>

          <ChatHint
            v-if="currentStep.hintChatMessages && currentStep.hintChatMessages.length"
            :messages="currentStep.hintChatMessages"
          />

          <div class="action-row">
            <button v-if="currentStepIndex < activeCase.steps.length - 1" class="btn-next" @click="nextStep">
              下一步 &#8594;
            </button>
            <button v-else class="btn-next btn-finish" @click="finishCase">
              案件完成 &#10003;
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { challengesData, getChallengeByCaseId } from '@/data/challenges'
import { useChallengeStore } from '@/stores/challengeStore'
import ChatHint from '@/components/ChatHint.vue'

const challengeStore = useChallengeStore()

const activeCase = ref<ReturnType<typeof getChallengeByCaseId> | null>(null)
const currentStepIndex = ref(0)
const selectedAnswer = ref('')
const answered = ref(false)
const isCorrect = ref(false)

// 排序题状态
const sortItems = ref<{ id: string; text: string }[]>([])

// 连线题状态
const connectLeft = ref<{ id: string; text: string }[]>([])
const connectRight = ref<{ id: string; text: string }[]>([])
const connectSelectLeft = ref('')
const connectMatches = ref<Record<string, string>>({})

const currentStep = computed(() => activeCase.value!.steps[currentStepIndex.value])

const canSubmit = computed(() => {
  const step = currentStep.value
  if (step.type === 'choice' || step.type === 'reasoning') return !!selectedAnswer.value
  if (step.type === 'truefalse') return !!selectedAnswer.value
  if (step.type === 'sorting') return sortItems.value.length > 0
  if (step.type === 'connect') return Object.keys(connectMatches.value).length === connectLeft.value.length
  return false
})

watch(currentStepIndex, () => {
  initStepState()
})

watch(activeCase, () => {
  if (activeCase.value) initStepState()
})

function initStepState() {
  const step = currentStep.value
  selectedAnswer.value = ''
  answered.value = false
  isCorrect.value = false

  if (step.type === 'sorting' && step.sortItems) {
    // 打乱顺序
    sortItems.value = [...step.sortItems].sort(() => Math.random() - 0.5)
  }

  if (step.type === 'connect' && step.connectData) {
    connectLeft.value = [...step.connectData.left]
    connectRight.value = [...step.connectData.right].sort(() => Math.random() - 0.5)
    connectSelectLeft.value = ''
    connectMatches.value = {}
  }
}

function startCase(caseId: string) {
  if (!challengeStore.isCaseUnlocked(caseId)) return
  const ch = getChallengeByCaseId(caseId)
  if (!ch) return
  activeCase.value = ch
  currentStepIndex.value = challengeStore.getCurrentStepIndex(caseId)
  if (currentStepIndex.value >= ch.steps.length) currentStepIndex.value = 0
  initStepState()
}

function selectAnswer(id: string) {
  if (answered.value) return
  selectedAnswer.value = id
}

function moveItem(from: number, to: number) {
  if (answered.value) return
  const items = [...sortItems.value]
  const [moved] = items.splice(from, 1)
  items.splice(to, 0, moved)
  sortItems.value = items
}

function startDrag(_idx: number) {
  // 简化：使用上下箭头代替拖拽
}

function selectConnectLeft(id: string) {
  if (answered.value) return
  connectSelectLeft.value = id
}

function selectConnectRight(id: string) {
  if (answered.value || !connectSelectLeft.value) return
  // 如果右侧已被其他连线占用，先清除
  for (const [k, v] of Object.entries(connectMatches.value)) {
    if (v === id) delete connectMatches.value[k]
  }
  connectMatches.value = { ...connectMatches.value, [connectSelectLeft.value]: id }
  connectSelectLeft.value = ''
}

function submitAnswer() {
  if (!activeCase.value) return
  const step = currentStep.value
  let correct = false

  if (step.type === 'choice' || step.type === 'truefalse' || step.type === 'reasoning') {
    correct = selectedAnswer.value === step.correctAnswer
  } else if (step.type === 'sorting') {
    correct = sortItems.value.every((item, i) => item.id === step.correctOrder?.[i])
  } else if (step.type === 'connect') {
    correct = JSON.stringify(connectMatches.value) === JSON.stringify(step.correctConnect)
  }

  isCorrect.value = correct
  answered.value = true
  challengeStore.recordAnswer(activeCase.value.caseId, step.id, correct)
}

function nextStep() {
  if (!activeCase.value) return
  currentStepIndex.value++
}

function finishCase() {
  activeCase.value = null
}

function getProgressText(caseId: string): string {
  if (challengeStore.isCaseCompleted(caseId)) return '已完成'
  if (!challengeStore.isCaseUnlocked(caseId)) return '未解锁'
  const ch = getChallengeByCaseId(caseId)
  if (!ch) return ''
  const idx = challengeStore.getCurrentStepIndex(caseId)
  return `${idx} / ${ch.steps.length} 步`
}

function typeText(type: string): string {
  const map: Record<string, string> = {
    choice: '选择题', truefalse: '判断题', reasoning: '推理题',
    sorting: '排序题', connect: '连线题',
  }
  return map[type] ?? type
}
</script>

<style lang="scss" scoped>
.challenge-page {
  max-width: 800px;
  margin: 0 auto;
  animation: pageEnter 0.4s ease;
}

@keyframes pageEnter {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.page-header {
  margin-bottom: 24px;
  h1 {
    font-size: 24px; font-weight: 700; color: var(--text-primary); letter-spacing: 2px;
    position: relative; display: inline-block;
    &::after {
      content: ''; position: absolute; bottom: -4px; left: 0; width: 40px; height: 3px;
      background: var(--accent-red); border-radius: 2px;
    }
  }
  .header-sub { font-family: var(--font-mono, monospace); font-size: 12px; color: var(--text-muted); margin-top: 8px; letter-spacing: 2px; }
}

.select-hint { font-size: 14px; color: var(--text-secondary); margin-bottom: 20px; }

.challenge-cards { display: flex; flex-direction: column; gap: 12px; }

.challenge-card {
  display: flex; align-items: center; gap: 16px; padding: 16px 20px;
  background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px;
  cursor: pointer; transition: all 0.25s ease;
  animation: cardEnter 0.4s ease both;
  &:hover:not(.locked) { box-shadow: var(--shadow-hover); transform: translateY(-2px); border-color: color-mix(in srgb, var(--accent-blue) 30%, transparent); }
  &.locked { opacity: 0.45; cursor: not-allowed; }
  &.completed { border-color: var(--accent-green); }
  &.current { border-color: var(--accent-blue); box-shadow: 0 0 0 1px color-mix(in srgb, var(--accent-blue) 15%, transparent); }
}

@for $i from 1 through 5 {
  .challenge-card:nth-child(#{$i}) { animation-delay: #{$i * 80}ms; }
}

@keyframes cardEnter {
  from { opacity: 0; transform: translateX(-12px); }
  to { opacity: 1; transform: translateX(0); }
}

.card-status-icon {
  width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 18px; flex-shrink: 0; background: var(--bg-tertiary); border: 1px solid var(--border-color);
  transition: all 0.2s ease;
}
.challenge-card:hover:not(.locked) .card-status-icon { transform: scale(1.1); }
.icon-done { color: var(--accent-green); }
.icon-lock-open { color: var(--accent-blue); }
.icon-lock { color: var(--text-muted); }

.card-info { flex: 1; }
.card-index { font-size: 11px; color: var(--text-muted); font-family: var(--font-mono, monospace); }
.card-name { font-size: 16px; font-weight: 600; color: var(--text-primary); margin: 2px 0; }
.card-progress { font-size: 12px; color: var(--text-secondary); }
.card-arrow { color: var(--text-muted); font-size: 18px; transition: transform 0.2s ease; }
.challenge-card:hover:not(.locked) .card-arrow { transform: translateX(4px); }

.progress-summary {
  margin-top: 24px; text-align: center;
  animation: fadeIn 0.6s ease 0.5s both;
  span { font-size: 13px; color: var(--text-muted); }
}
.progress-bar-wrap {
  height: 4px; background: var(--bg-tertiary); border-radius: 2px; margin-bottom: 8px; overflow: hidden;
}
.progress-bar-fill {
  height: 100%; background: linear-gradient(90deg, var(--accent-blue), var(--accent-purple)); border-radius: 2px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Active */
.active-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; animation: fadeIn 0.3s ease; }
.btn-back {
  background: none; border: 1px solid var(--border-color); color: var(--text-secondary);
  padding: 6px 14px; border-radius: 4px; cursor: pointer; font-size: 13px; transition: all 0.2s ease;
  &:hover { border-color: var(--accent-blue); color: var(--accent-blue); transform: translateX(-2px); }
  &:active { transform: scale(0.97); }
}

.step-dots { display: flex; gap: 6px; }
.step-dot {
  width: 10px; height: 10px; border-radius: 50%; background: var(--bg-tertiary); border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  &.active { background: var(--accent-blue); border-color: var(--accent-blue); box-shadow: 0 0 6px color-mix(in srgb, var(--accent-blue) 40%, transparent); }
  &.done { background: var(--accent-green); border-color: var(--accent-green); }
}

.step-card {
  background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px; padding: 24px;
  animation: stepCardEnter 0.4s ease;
}

@keyframes stepCardEnter {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}

.step-type-badge {
  display: inline-block; font-size: 11px; padding: 2px 10px; border-radius: 10px; font-weight: 600; margin-bottom: 12px;
  animation: badgePop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  &.type-choice { background: color-mix(in srgb, var(--accent-blue) 15%, transparent); color: var(--accent-blue); }
  &.type-truefalse { background: color-mix(in srgb, var(--accent-yellow) 15%, transparent); color: var(--accent-yellow); }
  &.type-reasoning { background: color-mix(in srgb, var(--accent-purple) 15%, transparent); color: var(--accent-purple); }
  &.type-sorting { background: color-mix(in srgb, var(--accent-green) 15%, transparent); color: var(--accent-green); }
  &.type-connect { background: color-mix(in srgb, var(--accent-red) 15%, transparent); color: var(--accent-red); }
}

@keyframes badgePop {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.step-title { font-size: 20px; font-weight: 700; color: var(--text-primary); margin-bottom: 12px; }
.step-scene { font-size: 14px; color: var(--text-secondary); line-height: 1.8; margin-bottom: 16px; }

.question-block { margin-top: 16px; animation: fadeIn 0.3s ease; }
.step-question {
  font-size: 15px; color: var(--text-primary); font-weight: 500; margin-bottom: 16px;
  padding: 12px 16px; background: var(--bg-tertiary); border-radius: 6px; border-left: 3px solid var(--accent-blue);
}

/* Options (choice / reasoning) */
.options-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
.option-item {
  display: flex; align-items: center; gap: 12px; padding: 12px 16px;
  background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px;
  cursor: pointer; transition: all 0.25s ease;
  &:hover:not(.correct):not(.wrong):not(.disabled) { border-color: var(--accent-blue); background: var(--bg-hover); transform: translateX(4px); }
  &.selected { border-color: var(--accent-blue); background: color-mix(in srgb, var(--accent-blue) 8%, transparent); transform: scale(1.01); }
  &.correct { border-color: var(--accent-green); background: color-mix(in srgb, var(--accent-green) 10%, transparent); animation: correctPop 0.4s ease; }
  &.wrong { border-color: var(--accent-red); background: color-mix(in srgb, var(--accent-red) 10%, transparent); animation: wrongShake 0.4s ease; }
  &.disabled { cursor: default; }
}

@keyframes correctPop {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

@keyframes wrongShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

.option-id {
  width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; background: var(--bg-primary); color: var(--text-secondary); flex-shrink: 0;
  transition: all 0.2s ease;
}
.option-item:hover:not(.disabled) .option-id { background: var(--accent-blue); color: #fff; }
.option-text { flex: 1; font-size: 14px; color: var(--text-primary); }
.option-mark { font-size: 16px; font-weight: 700; &.correct-mark { color: var(--accent-green); } &.wrong-mark { color: var(--accent-red); } }

/* True/False buttons */
.tf-buttons { display: flex; gap: 16px; justify-content: center; margin-bottom: 16px; }
.tf-btn {
  flex: 1; max-width: 200px; padding: 20px; display: flex; flex-direction: column; align-items: center; gap: 8px;
  background: var(--bg-tertiary); border: 2px solid var(--border-color); border-radius: 12px;
  cursor: pointer; transition: all 0.25s ease; font-size: 16px; color: var(--text-primary);
  .tf-icon { font-size: 28px; transition: transform 0.2s ease; }
  &:hover:not(:disabled) { transform: translateY(-3px); }
  &:active:not(:disabled) { transform: scale(0.97); }
  &.tf-true {
    .tf-icon { color: var(--accent-green); }
    &:hover:not(:disabled) { border-color: var(--accent-green); }
    &:hover:not(:disabled) .tf-icon { transform: scale(1.15); }
    &.selected { border-color: var(--accent-green); background: color-mix(in srgb, var(--accent-green) 10%, transparent); }
    &.correct { border-color: var(--accent-green); background: color-mix(in srgb, var(--accent-green) 15%, transparent); animation: correctPop 0.4s ease; }
    &.wrong { border-color: var(--accent-red); background: color-mix(in srgb, var(--accent-red) 10%, transparent); animation: wrongShake 0.4s ease; }
  }
  &.tf-false {
    .tf-icon { color: var(--accent-red); }
    &:hover:not(:disabled) { border-color: var(--accent-red); }
    &:hover:not(:disabled) .tf-icon { transform: scale(1.15); }
    &.selected { border-color: var(--accent-red); background: color-mix(in srgb, var(--accent-red) 10%, transparent); }
    &.correct { border-color: var(--accent-green); background: color-mix(in srgb, var(--accent-green) 15%, transparent); animation: correctPop 0.4s ease; }
    &.wrong { border-color: var(--accent-red); background: color-mix(in srgb, var(--accent-red) 10%, transparent); animation: wrongShake 0.4s ease; }
  }
  &:disabled { cursor: default; }
}

/* Sorting */
.sorting-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
.sort-item {
  display: flex; align-items: center; gap: 10px; padding: 10px 14px;
  background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px;
  transition: all 0.2s ease;
  &:hover { border-color: var(--accent-blue); transform: translateX(4px); }
}
.sort-handle { cursor: grab; color: var(--text-muted); font-size: 14px; }
.sort-order {
  width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; background: var(--accent-blue); color: #fff; flex-shrink: 0;
}
.sort-text { flex: 1; font-size: 14px; color: var(--text-primary); }
.sort-arrows { display: flex; flex-direction: column; gap: 2px; }
.arrow-btn {
  background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 10px; padding: 0 4px;
  transition: all 0.15s ease;
  &:hover:not(:disabled) { color: var(--accent-blue); transform: scale(1.2); }
  &:disabled { opacity: 0.3; cursor: default; }
}

/* Connect */
.connect-board { display: flex; gap: 16px; align-items: flex-start; margin-bottom: 16px; }
.connect-left, .connect-right { flex: 1; display: flex; flex-direction: column; gap: 8px; }
.connect-item {
  padding: 10px 14px; background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px;
  font-size: 13px; color: var(--text-primary); cursor: pointer; transition: all 0.2s ease; text-align: center;
  &:hover { border-color: var(--accent-blue); transform: scale(1.02); }
  &.selected { border-color: var(--accent-yellow); background: color-mix(in srgb, var(--accent-yellow) 10%, transparent); animation: correctPop 0.3s ease; }
  &.used { opacity: 0.5; }
}
.connect-lines { flex: 0 0 40px; display: flex; flex-direction: column; gap: 8px; padding-top: 10px; }
.match-line { text-align: center; font-size: 11px; color: var(--text-muted); padding: 8px 0; }

/* Actions */
.action-row { display: flex; justify-content: flex-end; margin-top: 16px; }
.btn-confirm, .btn-next {
  padding: 8px 24px; border: none; border-radius: 6px; font-size: 14px; font-weight: 600;
  cursor: pointer; transition: all 0.2s ease;
  &:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
  &:active { transform: scale(0.97); }
}
.btn-confirm { background: var(--accent-blue); color: #fff; }
.btn-next { background: var(--accent-green); color: #fff;
  &.btn-finish { background: var(--accent-purple); }
}

/* Result */
.result-area { margin-top: 20px; animation: resultEnter 0.4s ease; }

@keyframes resultEnter {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.result-banner {
  padding: 10px 16px; border-radius: 6px; font-size: 15px; font-weight: 700; text-align: center; margin-bottom: 16px;
  animation: bannerPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  &.correct { background: color-mix(in srgb, var(--accent-green) 15%, transparent); color: var(--accent-green); border: 1px solid color-mix(in srgb, var(--accent-green) 30%, transparent); }
  &.wrong { background: color-mix(in srgb, var(--accent-red) 15%, transparent); color: var(--accent-red); border: 1px solid color-mix(in srgb, var(--accent-red) 30%, transparent); }
}

@keyframes bannerPop {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.explanation {
  background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px;
  animation: fadeIn 0.3s ease 0.2s both;
  h4 { font-size: 13px; font-weight: 600; color: var(--text-primary); margin-bottom: 8px; }
  p { font-size: 14px; color: var(--text-secondary); line-height: 1.7; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ===== 移动端适配 ===== */
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 20px;
  }

  .step-card {
    padding: 16px;
  }

  .step-title {
    font-size: 18px;
  }

  .tf-buttons {
    gap: 10px;
  }

  .tf-btn {
    padding: 14px;
    .tf-icon { font-size: 22px; }
  }

  .connect-board {
    flex-direction: column;
    gap: 10px;
  }

  .connect-left, .connect-right {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 6px;
  }

  .connect-item {
    flex: 1;
    min-width: calc(50% - 6px);
    font-size: 12px;
    padding: 8px 10px;
  }

  .connect-lines {
    flex-direction: row;
    flex: 0;
    padding-top: 0;
    gap: 6px;
  }

  .option-item {
    padding: 10px 12px;
    &:hover:not(.correct):not(.wrong):not(.disabled) { transform: none; }
  }

  .step-question {
    padding: 10px 12px;
    font-size: 14px;
  }

  .challenge-card {
    padding: 12px 14px;
    gap: 12px;
  }

  .card-status-icon {
    width: 34px;
    height: 34px;
    font-size: 15px;
  }

  .card-name {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .step-card {
    padding: 12px;
  }

  .step-title {
    font-size: 16px;
  }

  .tf-btn {
    padding: 12px;
    font-size: 14px;
    .tf-icon { font-size: 20px; }
  }

  .sort-item {
    padding: 8px 10px;
    gap: 6px;
  }

  .sort-text {
    font-size: 13px;
  }

  .connect-item {
    min-width: calc(50% - 4px);
    font-size: 11px;
    padding: 6px 8px;
  }

  .option-id {
    width: 20px;
    height: 20px;
    font-size: 11px;
  }

  .option-text {
    font-size: 13px;
  }

  .btn-confirm, .btn-next {
    width: 100%;
    text-align: center;
  }

  .action-row {
    justify-content: stretch;
  }
}
</style>
