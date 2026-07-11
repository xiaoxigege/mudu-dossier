<template>
  <div class="case-list-page">
    <div class="page-header">
      <h1>案件列表</h1>
      <p class="header-sub">CASE FILES</p>
    </div>

    <!-- 筛选栏 -->
    <div class="filter-bar">
      <el-input
        v-model="searchText"
        placeholder="搜索案件名称、编号、标签..."
        clearable
        class="search-input"
      >
        <template #prefix>
          <span style="color: #8b949e;">&#128269;</span>
        </template>
      </el-input>

      <div class="filter-group">
        <el-select v-model="statusFilter" placeholder="状态" clearable>
          <el-option label="未结" value="unsolved" />
          <el-option label="调查中" value="investigating" />
          <el-option label="已结" value="closed" />
        </el-select>

        <el-select v-model="priorityFilter" placeholder="优先级" clearable>
          <el-option label="高" value="high" />
          <el-option label="中" value="medium" />
          <el-option label="低" value="low" />
        </el-select>
      </div>
    </div>

    <!-- 案件网格 -->
    <div class="cases-grid">
      <div
        v-for="c in filteredCases"
        :key="c.id"
        class="case-card"
        @click="$router.push(`/cases/${c.id}`)"
      >
        <div class="case-status-bar" :class="`status-${c.status}`"></div>
        <div class="case-card-body">
          <div class="case-header">
            <span class="case-name">{{ c.name }}</span>
            <span class="case-status-tag" :class="`tag-${c.status}`">
              {{ statusText(c.status) }}
            </span>
          </div>
          <div class="case-id">{{ c.id }}</div>
          <div class="case-literary">{{ c.literaryRef }}</div>
          <div class="case-summary">{{ c.summary }}</div>
          <div class="case-tags">
            <span v-for="tag in c.tags" :key="tag" class="case-tag">{{ tag }}</span>
          </div>
          <div class="case-footer">
            <span class="case-investigator">负责人: {{ c.leadInvestigator }}</span>
            <span class="case-priority" :class="`priority-${c.priority}`">
              {{ priorityText(c.priority) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredCases.length === 0" class="empty-state">
      <p>未找到匹配的案件</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCaseStore } from '@/stores/caseStore'
import type { Case } from '@/data/cases'

const caseStore = useCaseStore()

const searchText = ref('')
const statusFilter = ref('')
const priorityFilter = ref('')

const filteredCases = computed(() => {
  return caseStore.cases.filter(c => {
    const matchSearch = !searchText.value ||
      c.name.includes(searchText.value) ||
      c.id.toLowerCase().includes(searchText.value.toLowerCase()) ||
      c.tags.some(t => t.includes(searchText.value)) ||
      c.summary.includes(searchText.value)

    const matchStatus = !statusFilter.value || c.status === statusFilter.value
    const matchPriority = !priorityFilter.value || c.priority === priorityFilter.value

    return matchSearch && matchStatus && matchPriority
  })
})

function statusText(status: Case['status']): string {
  const map = { unsolved: '未结', investigating: '调查中', closed: '已结' }
  return map[status]
}

function priorityText(priority: Case['priority']): string {
  const map = { high: '高优先', medium: '中优先', low: '低优先' }
  return map[priority]
}
</script>

<style lang="scss" scoped>
.case-list-page {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 24px;

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
    letter-spacing: 2px;
  }
}

.filter-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  animation: filterEnter 0.4s ease;
}

@keyframes filterEnter {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.search-input {
  flex: 1;
  min-width: 240px;

  :deep(.el-input__wrapper) {
    background: $bg-secondary;
    border: 1px solid $border-color;
    border-radius: $radius-md;
    box-shadow: none;
    transition: all 0.2s ease;

    &:hover, &.is-focus {
      border-color: $accent-blue;
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent-blue) 10%, transparent);
    }

    .el-input__inner {
      color: $text-primary;

      &::placeholder {
        color: $text-muted;
      }
    }
  }
}

.filter-group {
  display: flex;
  gap: 12px;

  .el-select {
    width: 130px;
  }
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 16px;
}

.case-card {
  background: $bg-secondary;
  border: 1px solid $border-color;
  border-radius: $radius-md;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: cardEnter 0.4s ease both;

  &:hover {
    box-shadow: $shadow-hover;
    transform: translateY(-4px);
    border-color: color-mix(in srgb, var(--accent-blue) 30%, transparent);
  }
}

@for $i from 1 through 10 {
  .case-card:nth-child(#{$i}) { animation-delay: #{$i * 70}ms; }
}

@keyframes cardEnter {
  from { opacity: 0; transform: translateY(16px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
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
  padding: 16px 20px;
}

.case-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.case-name {
  font-size: 17px;
  font-weight: 600;
  color: $text-primary;
}

.case-id {
  font-family: $font-mono;
  font-size: 11px;
  color: $text-muted;
  margin-bottom: 6px;
}

.case-literary {
  font-size: 12px;
  color: $accent-purple;
  font-style: italic;
  margin-bottom: 10px;
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

.case-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}

.case-tag {
  font-size: 11px;
  padding: 2px 8px;
  background: $bg-tertiary;
  border: 1px solid $border-color;
  border-radius: 3px;
  color: $text-secondary;
  transition: all 0.15s ease;
  &:hover { border-color: $accent-blue; color: $accent-blue; }
}

.case-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: $text-muted;
}

.case-investigator {
  color: $text-secondary;
}

.case-priority {
  font-weight: 600;
  &.priority-high { color: $accent-red; }
  &.priority-medium { color: $accent-yellow; }
  &.priority-low { color: $accent-blue; }
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

.empty-state {
  text-align: center;
  padding: 60px 0;
  color: $text-muted;
  font-size: 14px;
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
