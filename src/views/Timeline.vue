<template>
  <div class="timeline-page">
    <div class="page-header">
      <h1>时间线</h1>
      <p class="header-sub">CASE TIMELINE</p>
    </div>

    <!-- 筛选 -->
    <div class="filter-bar">
      <el-select v-model="caseFilter" placeholder="按案件筛选" clearable>
        <el-option
          v-for="c in caseStore.cases"
          :key="c.id"
          :label="c.name"
          :value="c.id"
        />
      </el-select>

      <div class="type-legend">
        <span class="legend-item"><span class="legend-dot dot-discovery"></span>发现</span>
        <span class="legend-item"><span class="legend-dot dot-breakthrough"></span>突破</span>
        <span class="legend-item"><span class="legend-dot dot-twist"></span>转折</span>
        <span class="legend-item"><span class="legend-dot dot-resolution"></span>结案</span>
      </div>
    </div>

    <!-- 时间线 -->
    <div class="timeline">
      <div
        v-for="event in filteredEvents"
        :key="event.id"
        class="timeline-item"
      >
        <div class="timeline-line">
          <div class="timeline-dot" :class="`dot-${event.type}`"></div>
        </div>
        <div class="timeline-card">
          <div class="card-header">
            <span class="event-date">{{ event.date }}</span>
            <span class="event-type-badge" :class="`badge-${event.type}`">
              {{ typeText(event.type) }}
            </span>
          </div>
          <div class="event-title">{{ event.title }}</div>
          <div class="event-desc">{{ event.description }}</div>
          <div class="card-footer">
            <span class="event-case-tag" @click="$router.push(`/cases/${event.caseId}`)">
              {{ getCaseName(event.caseId) }}
            </span>
            <div class="event-figures">
              <span
                v-for="fid in event.keyFigures"
                :key="fid"
                class="figure-tag"
              >
                {{ getCharName(fid) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredEvents.length === 0" class="empty-state">
      <p>该案件暂无时间线事件</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { timelineData } from '@/data/timeline'
import { useCaseStore } from '@/stores/caseStore'
import { useCharacterStore } from '@/stores/characterStore'

const caseStore = useCaseStore()
const characterStore = useCharacterStore()

const caseFilter = ref('')

const filteredEvents = computed(() => {
  const events = [...timelineData].sort((a, b) => a.date.localeCompare(b.date))
  if (!caseFilter.value) return events
  return events.filter(e => e.caseId === caseFilter.value)
})

function getCaseName(caseId: string): string {
  return caseStore.getCaseById(caseId)?.name ?? caseId
}

function getCharName(charId: string): string {
  return characterStore.getCharacterById(charId)?.name ?? charId
}

function typeText(type: string): string {
  const map: Record<string, string> = {
    discovery: '发现',
    breakthrough: '突破',
    twist: '转折',
    resolution: '结案',
  }
  return map[type] ?? type
}
</script>

<style lang="scss" scoped>
.timeline-page {
  max-width: 900px;
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
  justify-content: space-between;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 12px;
  animation: filterEnter 0.4s ease;

  .el-select {
    width: 200px;
  }
}

@keyframes filterEnter {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.type-legend {
  display: flex;
  gap: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: $text-secondary;
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  box-shadow: 0 0 4px currentColor;

  &.dot-discovery { background: $accent-blue; }
  &.dot-breakthrough { background: $accent-yellow; }
  &.dot-twist { background: $accent-purple; }
  &.dot-resolution { background: $accent-green; }
}

.timeline {
  position: relative;
  padding-left: 32px;

  &::before {
    content: '';
    position: absolute;
    left: 11px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, $accent-blue, $border-color 30%, $border-color 70%, $accent-green);
  }
}

.timeline-item {
  position: relative;
  margin-bottom: 20px;
  animation: timelineItemEnter 0.4s ease both;
}

@for $i from 1 through 30 {
  .timeline-item:nth-child(#{$i}) { animation-delay: #{$i * 60}ms; }
}

@keyframes timelineItemEnter {
  from { opacity: 0; transform: translateX(16px); }
  to { opacity: 1; transform: translateX(0); }
}

.timeline-line {
  position: absolute;
  left: -32px;
  top: 0;
  bottom: 0;
  width: 24px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 18px;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid $bg-primary;
  z-index: 1;
  transition: all 0.3s ease;

  &.dot-discovery { background: $accent-blue; box-shadow: 0 0 6px color-mix(in srgb, var(--accent-blue) 40%, transparent); }
  &.dot-breakthrough { background: $accent-yellow; box-shadow: 0 0 6px color-mix(in srgb, var(--accent-yellow) 40%, transparent); }
  &.dot-twist { background: $accent-purple; box-shadow: 0 0 6px color-mix(in srgb, var(--accent-purple) 40%, transparent); }
  &.dot-resolution { background: $accent-green; box-shadow: 0 0 6px color-mix(in srgb, var(--accent-green) 40%, transparent); }
}

.timeline-item:hover .timeline-dot {
  transform: scale(1.3);
}

.timeline-card {
  background: $bg-secondary;
  border: 1px solid $border-color;
  border-radius: $radius-md;
  padding: 16px 20px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: $shadow-hover;
    border-color: color-mix(in srgb, var(--accent-blue) 30%, transparent);
    transform: translateX(4px);
  }
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.event-date {
  font-family: $font-mono;
  font-size: 12px;
  color: $text-muted;
}

.event-type-badge {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 600;

  &.badge-discovery { background: color-mix(in srgb, var(--accent-blue) 15%, transparent); color: $accent-blue-light; }
  &.badge-breakthrough { background: color-mix(in srgb, var(--accent-yellow) 15%, transparent); color: $accent-yellow-light; }
  &.badge-twist { background: color-mix(in srgb, var(--accent-purple) 15%, transparent); color: $accent-purple; }
  &.badge-resolution { background: color-mix(in srgb, var(--accent-green) 15%, transparent); color: $accent-green-light; }
}

.event-title {
  font-size: 16px;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: 6px;
}

.event-desc {
  font-size: 13px;
  color: $text-secondary;
  line-height: 1.6;
  margin-bottom: 12px;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}

.event-case-tag {
  font-size: 11px;
  padding: 2px 8px;
  background: color-mix(in srgb, var(--accent-purple) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent-purple) 30%, transparent);
  border-radius: 3px;
  color: $accent-purple;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: color-mix(in srgb, var(--accent-purple) 20%, transparent);
    transform: translateY(-1px);
  }
}

.event-figures {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.figure-tag {
  font-size: 11px;
  padding: 2px 8px;
  background: $bg-tertiary;
  border: 1px solid $border-color;
  border-radius: 3px;
  color: $text-secondary;
  transition: all 0.15s ease;
  &:hover { border-color: $accent-blue; color: $accent-blue; }
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

/* ===== 移动端适配 ===== */
@media (max-width: 768px) {
  .filter-bar {
    flex-direction: column;
    align-items: stretch;

    .el-select {
      width: 100%;
    }
  }

  .type-legend {
    flex-wrap: wrap;
    gap: 10px;
  }

  .timeline {
    padding-left: 24px;

    &::before {
      left: 7px;
    }
  }

  .timeline-line {
    left: -24px;
    width: 18px;
  }

  .timeline-dot {
    width: 10px;
    height: 10px;
  }

  .timeline-card {
    padding: 12px 14px;

    &:hover {
      transform: none;
    }
  }

  .event-title {
    font-size: 15px;
  }

  .card-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .page-header h1 {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .timeline-card {
    padding: 10px 12px;
  }

  .event-desc {
    font-size: 12px;
  }

  .card-header {
    flex-wrap: wrap;
    gap: 6px;
  }
}
</style>
