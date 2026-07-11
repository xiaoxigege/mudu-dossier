<template>
  <div v-if="caseData" class="case-detail-page">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <router-link to="/cases">案件列表</router-link>
      <span class="sep">/</span>
      <span>{{ caseData.name }}</span>
    </div>

    <!-- 头部 -->
    <div class="detail-header">
      <div class="header-left">
        <div class="case-status-bar" :class="`status-${caseData.status}`"></div>
        <div>
          <h1>{{ caseData.name }}</h1>
          <div class="case-id-line">
            <span class="case-id">{{ caseData.id }}</span>
            <span class="case-status-tag" :class="`tag-${caseData.status}`">
              {{ statusText(caseData.status) }}
            </span>
            <span class="case-priority" :class="`priority-${caseData.priority}`">
              {{ priorityText(caseData.priority) }}
            </span>
          </div>
        </div>
      </div>
      <div class="header-right">
        <div class="meta-item">
          <span class="meta-label">关联名著</span>
          <span class="meta-value literary">{{ caseData.literaryRef }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">负责人</span>
          <span class="meta-value">{{ caseData.leadInvestigator }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">立案日期</span>
          <span class="meta-value">{{ caseData.createDate }}</span>
        </div>
        <div v-if="caseData.closeDate" class="meta-item">
          <span class="meta-label">结案日期</span>
          <span class="meta-value">{{ caseData.closeDate }}</span>
        </div>
      </div>
    </div>

    <!-- 概要 -->
    <div class="detail-section">
      <h2>案件概要</h2>
      <p class="description">{{ caseData.description }}</p>
      <div class="tags-row">
        <span v-for="tag in caseData.tags" :key="tag" class="tag">{{ tag }}</span>
        <span v-if="caseData.connectionToMainCase" class="tag tag-main">
          关联"朗诵者"主线
        </span>
      </div>
    </div>

    <!-- 嫌疑人 -->
    <div class="detail-section">
      <h2>嫌疑人 ({{ caseData.suspects.length }})</h2>
      <div class="suspects-grid">
        <div v-for="(s, i) in caseData.suspects" :key="i" class="suspect-card">
          <div class="suspect-name">
            {{ s.name }}
            <span v-if="s.alias" class="suspect-alias">（{{ s.alias }}）</span>
          </div>
          <div class="suspect-desc">{{ s.description }}</div>
          <div class="suspect-status" :class="`ss-${s.status}`">
            {{ suspectStatusText(s.status) }}
          </div>
        </div>
      </div>
    </div>

    <!-- 证据 -->
    <div class="detail-section">
      <h2>证据 ({{ caseData.evidence.length }})</h2>
      <div class="evidence-list">
        <div v-for="e in caseData.evidence" :key="e.id" class="evidence-item">
          <div class="evidence-header">
            <span class="evidence-type-badge" :class="`etype-${e.type}`">
              {{ evidenceTypeText(e.type) }}
            </span>
            <span class="evidence-name">{{ e.name }}</span>
          </div>
          <p class="evidence-desc">{{ e.description }}</p>
        </div>
      </div>
    </div>

    <!-- 线索 -->
    <div class="detail-section">
      <h2>线索 ({{ caseData.clues.length }})</h2>
      <div class="clues-list">
        <div v-for="clue in caseData.clues" :key="clue.id" class="clue-item">
          <span class="clue-indicator" :class="{ verified: clue.verified }">
            {{ clue.verified ? '✓' : '?' }}
          </span>
          <div class="clue-content">
            <span class="clue-text">{{ clue.content }}</span>
            <span class="clue-source">来源: {{ clue.source }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 参与人员 -->
    <div class="detail-section">
      <h2>参与人员</h2>
      <div class="participants">
        <span
          v-for="pid in caseData.participants"
          :key="pid"
          class="participant-link"
          @click="$router.push(`/characters`)"
        >
          {{ getCharName(pid) }}
        </span>
      </div>
    </div>
  </div>

  <div v-else class="not-found">
    <p>案件不存在</p>
    <router-link to="/cases">返回案件列表</router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCaseStore } from '@/stores/caseStore'
import { useCharacterStore } from '@/stores/characterStore'
import type { Case } from '@/data/cases'

const route = useRoute()
const caseStore = useCaseStore()
const characterStore = useCharacterStore()

const caseData = computed(() => caseStore.getCaseById(route.params.id as string))

function getCharName(id: string): string {
  return characterStore.getCharacterById(id)?.name ?? id
}

function statusText(status: Case['status']): string {
  const map = { unsolved: '未结', investigating: '调查中', closed: '已结' }
  return map[status]
}

function priorityText(priority: Case['priority']): string {
  const map = { high: '高优先', medium: '中优先', low: '低优先' }
  return map[priority]
}

function suspectStatusText(status: string): string {
  const map: Record<string, string> = {
    at_large: '在逃',
    detained: '已拘留',
    deceased: '已死亡',
    unknown: '身份不明',
  }
  return map[status] ?? status
}

function evidenceTypeText(type: string): string {
  const map: Record<string, string> = {
    physical: '物证',
    document: '文书',
    digital: '电子',
    testimony: '证言',
    other: '其他',
  }
  return map[type] ?? type
}
</script>

<style lang="scss" scoped>
.case-detail-page {
  max-width: 1000px;
  margin: 0 auto;
  animation: pageEnter 0.4s ease;
}

@keyframes pageEnter {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.breadcrumb {
  font-size: 13px;
  color: $text-muted;
  margin-bottom: 20px;

  a {
    color: $accent-blue;
    transition: all 0.2s ease;
    &:hover { color: $accent-blue-light; }
  }

  .sep {
    margin: 0 8px;
    color: $text-muted;
  }
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: $bg-secondary;
  border: 1px solid $border-color;
  border-radius: $radius-md;
  padding: 24px;
  margin-bottom: 24px;
  gap: 24px;
  position: relative;
  overflow: hidden;
  animation: headerEnter 0.5s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
  }

  &.status-unsolved-header::before,
  &:has(.status-unsolved)::before { background: linear-gradient(90deg, $accent-red, transparent); }
}

@keyframes headerEnter {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;

  h1 {
    font-size: 24px;
    font-weight: 700;
    color: $text-primary;
  }
}

.case-status-bar {
  width: 4px;
  min-height: 60px;
  border-radius: 2px;

  &.status-unsolved { background: $accent-red; }
  &.status-investigating { background: $accent-yellow; }
  &.status-closed { background: $accent-green; }
}

.case-id-line {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 6px;
}

.case-id {
  font-family: $font-mono;
  font-size: 12px;
  color: $text-muted;
}

.case-status-tag {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;

  &.tag-unsolved { background: color-mix(in srgb, var(--accent-red) 15%, transparent); color: $accent-red-light; }
  &.tag-investigating { background: color-mix(in srgb, var(--accent-yellow) 15%, transparent); color: $accent-yellow-light; }
  &.tag-closed { background: color-mix(in srgb, var(--accent-green) 15%, transparent); color: $accent-green-light; }
}

.case-priority {
  font-size: 11px;
  font-weight: 600;
  &.priority-high { color: $accent-red; }
  &.priority-medium { color: $accent-yellow; }
  &.priority-low { color: $accent-blue; }
}

.header-right {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
}

.meta-item {
  display: flex;
  gap: 8px;
  font-size: 13px;
}

.meta-label {
  color: $text-muted;
  min-width: 70px;
}

.meta-value {
  color: $text-secondary;

  &.literary {
    color: $accent-purple;
    font-style: italic;
  }
}

.detail-section {
  background: $bg-secondary;
  border: 1px solid $border-color;
  border-radius: $radius-md;
  padding: 20px 24px;
  margin-bottom: 16px;
  animation: sectionEnter 0.4s ease both;

  h2 {
    font-size: 15px;
    font-weight: 600;
    color: $text-primary;
    margin-bottom: 14px;
    padding-bottom: 10px;
    border-bottom: 1px solid $border-light;
    display: flex;
    align-items: center;
    gap: 8px;

    &::before {
      content: '';
      width: 3px;
      height: 16px;
      background: $accent-blue;
      border-radius: 2px;
      flex-shrink: 0;
    }
  }
}

@for $i from 1 through 6 {
  .detail-section:nth-child(#{$i}) { animation-delay: #{$i * 80 + 100}ms; }
}

@keyframes sectionEnter {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.description {
  font-size: 14px;
  color: $text-secondary;
  line-height: 1.8;
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.tag {
  font-size: 12px;
  padding: 3px 10px;
  background: $bg-tertiary;
  border: 1px solid $border-color;
  border-radius: 3px;
  color: $text-secondary;
  transition: all 0.2s ease;
  &:hover { border-color: $accent-blue; color: $accent-blue; transform: translateY(-1px); }

  &.tag-main {
    border-color: $accent-red;
    color: $accent-red-light;
    background: color-mix(in srgb, var(--accent-red) 8%, transparent);
    animation: pulseMainTag 2.5s ease-in-out infinite;
  }
}

@keyframes pulseMainTag {
  0%, 100% { box-shadow: none; }
  50% { box-shadow: 0 0 8px color-mix(in srgb, var(--accent-red) 20%, transparent); }
}

.suspects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}

.suspect-card {
  background: $bg-tertiary;
  border: 1px solid $border-color;
  border-radius: $radius-sm;
  padding: 14px;
  transition: all 0.25s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow-hover;
    border-color: color-mix(in srgb, var(--accent-red) 30%, transparent);
  }
}

.suspect-name {
  font-size: 15px;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: 6px;
}

.suspect-alias {
  font-weight: 400;
  font-size: 13px;
  color: $text-muted;
}

.suspect-desc {
  font-size: 13px;
  color: $text-secondary;
  line-height: 1.5;
  margin-bottom: 8px;
}

.suspect-status {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  display: inline-block;

  &.ss-at_large { background: color-mix(in srgb, var(--accent-yellow) 15%, transparent); color: $accent-yellow-light; }
  &.ss-detained { background: color-mix(in srgb, var(--accent-green) 15%, transparent); color: $accent-green-light; }
  &.ss-deceased { background: color-mix(in srgb, var(--text-muted) 15%, transparent); color: $text-muted; }
  &.ss-unknown { background: color-mix(in srgb, var(--accent-red) 15%, transparent); color: $accent-red-light; }
}

.evidence-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.evidence-item {
  background: $bg-tertiary;
  border: 1px solid $border-color;
  border-radius: $radius-sm;
  padding: 12px 16px;
  transition: all 0.25s ease;
  &:hover {
    border-color: color-mix(in srgb, var(--accent-blue) 30%, transparent);
    box-shadow: 0 2px 8px color-mix(in srgb, var(--accent-blue) 8%, transparent);
    transform: translateX(4px);
  }
}

.evidence-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.evidence-type-badge {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 3px;
  font-weight: 600;

  &.etype-physical { background: color-mix(in srgb, var(--accent-red) 15%, transparent); color: $accent-red-light; }
  &.etype-document { background: color-mix(in srgb, var(--accent-blue) 15%, transparent); color: $accent-blue-light; }
  &.etype-digital { background: color-mix(in srgb, var(--accent-purple) 15%, transparent); color: $accent-purple; }
  &.etype-testimony { background: color-mix(in srgb, var(--accent-green) 15%, transparent); color: $accent-green-light; }
  &.etype-other { background: color-mix(in srgb, var(--text-muted) 15%, transparent); color: $text-secondary; }
}

.evidence-name {
  font-size: 14px;
  font-weight: 500;
  color: $text-primary;
}

.evidence-desc {
  font-size: 13px;
  color: $text-secondary;
  line-height: 1.5;
}

.clues-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.clue-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid $border-light;
  transition: all 0.2s ease;
  &:last-child { border-bottom: none; }
  &:hover { padding-left: 6px; }
}

.clue-indicator {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
  background: rgba($accent-yellow, 0.15);
  color: $accent-yellow;
  transition: all 0.2s ease;

  &.verified {
    background: rgba($accent-green, 0.15);
    color: $accent-green-light;
  }
}

.clue-item:hover .clue-indicator {
  transform: scale(1.1);
}

.clue-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.clue-text {
  font-size: 14px;
  color: $text-primary;
}

.clue-source {
  font-size: 12px;
  color: $text-muted;
}

.participants {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.participant-link {
  font-size: 13px;
  padding: 4px 12px;
  background: $bg-tertiary;
  border: 1px solid $border-color;
  border-radius: $radius-sm;
  color: $accent-blue;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: $bg-hover;
    border-color: $accent-blue;
    transform: translateY(-2px);
    box-shadow: 0 2px 8px color-mix(in srgb, var(--accent-blue) 15%, transparent);
  }
}

.not-found {
  text-align: center;
  padding: 80px 0;
  color: $text-muted;

  a {
    color: $accent-blue;
    margin-top: 12px;
    display: inline-block;
    transition: all 0.2s ease;
    &:hover { transform: translateX(4px); }
  }
}
</style>
