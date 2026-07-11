<template>
  <div class="dashboard">
    <div class="page-header">
      <h1>案卷总览</h1>
      <p class="header-sub">燕城市公安局 · 刑侦支队</p>
    </div>

    <!-- 统计卡片 -->
    <div class="stat-cards">
      <div class="stat-card">
        <div class="stat-number">{{ animatedTotal }}</div>
        <div class="stat-label">总案件数</div>
      </div>
      <div class="stat-card stat-unsolved">
        <div class="stat-number">{{ animatedUnsolved }}</div>
        <div class="stat-label">未结案</div>
      </div>
      <div class="stat-card stat-investigating">
        <div class="stat-number">{{ animatedInvestigating }}</div>
        <div class="stat-label">调查中</div>
      </div>
      <div class="stat-card stat-closed">
        <div class="stat-number">{{ animatedClosed }}</div>
        <div class="stat-label">已结案</div>
      </div>
    </div>

    <!-- 案件卡片 -->
    <div class="section-title">
      <span>全部案件</span>
      <router-link to="/cases" class="view-all">查看全部 →</router-link>
    </div>
    <div class="cases-grid">
      <div
        v-for="c in caseStore.cases"
        :key="c.id"
        class="case-card"
        @click="$router.push(`/cases/${c.id}`)"
      >
        <div class="case-status-bar" :class="`status-${c.status}`"></div>
        <div class="case-card-body">
          <div class="case-name">{{ c.name }}</div>
          <div class="case-literary">{{ c.literaryRef }}</div>
          <div class="case-summary">{{ c.summary }}</div>
          <div class="case-meta">
            <span class="case-id">{{ c.id }}</span>
            <span class="case-status-tag" :class="`tag-${c.status}`">
              {{ statusText(c.status) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 最近活动 -->
    <div class="section-title" style="margin-top: 32px;">
      <span>最近活动</span>
      <router-link to="/timeline" class="view-all">完整时间线 →</router-link>
    </div>
    <div class="recent-activity">
      <div
        v-for="event in recentEvents"
        :key="event.id"
        class="activity-item"
      >
        <div class="activity-dot" :class="`dot-${event.type}`"></div>
        <div class="activity-content">
          <div class="activity-title">{{ event.title }}</div>
          <div class="activity-desc">{{ event.description }}</div>
        </div>
        <div class="activity-date">{{ event.date }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useCaseStore } from '@/stores/caseStore'
import { timelineData } from '@/data/timeline'
import type { Case } from '@/data/cases'

const caseStore = useCaseStore()

const recentEvents = computed(() =>
  [...timelineData].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6)
)

// 数字动画
const animatedTotal = ref(0)
const animatedUnsolved = ref(0)
const animatedInvestigating = ref(0)
const animatedClosed = ref(0)

onMounted(() => {
  animateNumber(animatedTotal, caseStore.totalCases)
  animateNumber(animatedUnsolved, caseStore.unsolvedCases)
  animateNumber(animatedInvestigating, caseStore.investigatingCases)
  animateNumber(animatedClosed, caseStore.closedCases)
})

function animateNumber(target: { value: number }, end: number) {
  const duration = 800
  const start = 0
  const startTime = performance.now()
  function tick(now: number) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    // easeOutCubic
    const ease = 1 - Math.pow(1 - progress, 3)
    target.value = Math.round(start + (end - start) * ease)
    if (progress < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

function statusText(status: Case['status']): string {
  const map = { unsolved: '未结', investigating: '调查中', closed: '已结' }
  return map[status]
}
</script>

<style lang="scss" scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 28px;

  h1 {
    font-size: 24px;
    font-weight: 700;
    color: $text-primary;
    letter-spacing: 2px;
    position: relative;
    display: inline-block;
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 40px;
      height: 3px;
      background: $accent-red;
      border-radius: 2px;
    }
  }

  .header-sub {
    font-family: $font-mono;
    font-size: 12px;
    color: $text-muted;
    margin-top: 8px;
    letter-spacing: 1px;
  }
}

.stat-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

.stat-card {
  background: $bg-secondary;
  border: 1px solid $border-color;
  border-radius: $radius-md;
  padding: 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: statCardEnter 0.5s ease both;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: $border-color;
    transition: height 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-hover;
    &::before { height: 4px; }
  }

  .stat-number {
    font-family: $font-mono;
    font-size: 36px;
    font-weight: 700;
    color: $text-primary;
    transition: transform 0.3s ease;
  }

  &:hover .stat-number {
    transform: scale(1.05);
  }

  .stat-label {
    font-size: 13px;
    color: $text-secondary;
    margin-top: 4px;
  }

  &.stat-unsolved {
    .stat-number { color: $accent-red; }
    &::before { background: $accent-red; }
    &:hover { box-shadow: 0 4px 16px color-mix(in srgb, var(--accent-red) 20%, transparent), 0 0 0 1px var(--border-color); }
  }
  &.stat-investigating {
    .stat-number { color: $accent-yellow; }
    &::before { background: $accent-yellow; }
    &:hover { box-shadow: 0 4px 16px color-mix(in srgb, var(--accent-yellow) 20%, transparent), 0 0 0 1px var(--border-color); }
  }
  &.stat-closed {
    .stat-number { color: $accent-green; }
    &::before { background: $accent-green; }
    &:hover { box-shadow: 0 4px 16px color-mix(in srgb, var(--accent-green) 20%, transparent), 0 0 0 1px var(--border-color); }
  }
}

@for $i from 1 through 4 {
  .stat-card:nth-child(#{$i}) { animation-delay: #{$i * 100}ms; }
}

@keyframes statCardEnter {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 600;
  color: $text-primary;
  position: relative;
  padding-left: 14px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 18px;
    background: $accent-blue;
    border-radius: 2px;
  }
}

.view-all {
  font-size: 13px;
  font-weight: 400;
  color: $accent-blue;
  transition: all 0.2s ease;
  &:hover { color: $accent-blue-light; transform: translateX(2px); }
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 16px;
}

.case-card {
  background: $bg-secondary;
  border: 1px solid $border-color;
  border-radius: $radius-md;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: caseCardEnter 0.4s ease both;

  &:hover {
    box-shadow: $shadow-hover;
    transform: translateY(-4px);
    border-color: color-mix(in srgb, var(--accent-blue) 30%, transparent);
  }
}

@for $i from 1 through 10 {
  .case-card:nth-child(#{$i}) { animation-delay: #{$i * 80 + 200}ms; }
}

@keyframes caseCardEnter {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

.case-status-bar {
  height: 3px;
  transition: height 0.2s ease;
  .case-card:hover & { height: 4px; }

  &.status-unsolved { background: linear-gradient(90deg, $accent-red, color-mix(in srgb, var(--accent-red) 60%, white)); }
  &.status-investigating { background: linear-gradient(90deg, $accent-yellow, color-mix(in srgb, var(--accent-yellow) 60%, white)); }
  &.status-closed { background: linear-gradient(90deg, $accent-green, color-mix(in srgb, var(--accent-green) 60%, white)); }
}

.case-card-body {
  padding: 16px;
}

.case-name {
  font-size: 16px;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: 4px;
}

.case-literary {
  font-size: 12px;
  color: $accent-purple;
  margin-bottom: 10px;
  font-style: italic;
}

.case-summary {
  font-size: 13px;
  color: $text-secondary;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12px;
}

.case-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.case-id {
  font-family: $font-mono;
  font-size: 11px;
  color: $text-muted;
}

.case-status-tag {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;

  &.tag-unsolved {
    background: color-mix(in srgb, var(--accent-red) 15%, transparent);
    color: $accent-red-light;
  }
  &.tag-investigating {
    background: color-mix(in srgb, var(--accent-yellow) 15%, transparent);
    color: $accent-yellow-light;
  }
  &.tag-closed {
    background: color-mix(in srgb, var(--accent-green) 15%, transparent);
    color: $accent-green-light;
  }
}

.recent-activity {
  background: $bg-secondary;
  border: 1px solid $border-color;
  border-radius: $radius-md;
  padding: 4px 0;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 20px;
  border-bottom: 1px solid $border-light;
  transition: all 0.2s ease;
  animation: activityEnter 0.3s ease both;

  &:last-child { border-bottom: none; }
  &:hover {
    background: $bg-hover;
    padding-left: 24px;
  }
}

@for $i from 1 through 6 {
  .activity-item:nth-child(#{$i}) { animation-delay: #{$i * 60 + 400}ms; }
}

@keyframes activityEnter {
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
}

.activity-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 6px;
  flex-shrink: 0;
  box-shadow: 0 0 6px currentColor;

  &.dot-discovery { background: $accent-blue; }
  &.dot-breakthrough { background: $accent-yellow; }
  &.dot-twist { background: $accent-purple; }
  &.dot-resolution { background: $accent-green; }
}

.activity-content {
  flex: 1;
  min-width: 0;
}

.activity-title {
  font-size: 14px;
  color: $text-primary;
  font-weight: 500;
}

.activity-desc {
  font-size: 12px;
  color: $text-secondary;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.activity-date {
  font-family: $font-mono;
  font-size: 12px;
  color: $text-muted;
  flex-shrink: 0;
}

/* ===== 移动端适配 ===== */
@media (max-width: 768px) {
  .stat-cards {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .stat-card {
    padding: 14px;
    .stat-number { font-size: 28px; }
  }

  .cases-grid {
    grid-template-columns: 1fr;
  }

  .activity-item {
    padding: 10px 14px;
    &:hover { padding-left: 16px; }
  }

  .activity-desc {
    white-space: normal;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .activity-date {
    font-size: 11px;
  }

  .page-header h1 {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .stat-cards {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .stat-card {
    padding: 12px;
    .stat-number { font-size: 24px; }
    .stat-label { font-size: 12px; }
  }

  .case-card-body {
    padding: 12px;
  }

  .case-name {
    font-size: 15px;
  }
}
</style>
