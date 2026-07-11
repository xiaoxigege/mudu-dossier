<template>
  <div class="character-hub">
    <div class="page-header">
      <h1>人物档案</h1>
      <p class="header-sub">CHARACTER DOSSIERS</p>
    </div>

    <!-- 视图切换 -->
    <div class="view-tabs">
      <button class="view-tab" :class="{ active: viewMode === 'list' }" @click="viewMode = 'list'">档案列表</button>
      <button class="view-tab" :class="{ active: viewMode === 'graph' }" @click="viewMode = 'graph'">关系图谱</button>
    </div>

    <!-- ===== 档案列表视图 ===== -->
    <div v-if="viewMode === 'list'" class="hub-layout">
      <div class="char-list-panel">
        <div class="role-filter">
          <span
            v-for="role in roles"
            :key="role.value"
            class="role-tag"
            :class="{ active: selectedRole === role.value }"
            @click="selectedRole = role.value"
          >
            {{ role.label }}
          </span>
        </div>
        <div class="char-list">
          <div
            v-for="c in filteredCharacters"
            :key="c.id"
            class="char-list-item"
            :class="{ active: selectedChar?.id === c.id }"
            @click="selectedChar = c"
          >
            <div class="char-avatar">{{ c.name[0] }}</div>
            <div class="char-brief">
              <div class="char-name">{{ c.name }}</div>
              <div class="char-identity">{{ c.identity }}</div>
            </div>
            <span class="char-role-dot" :class="`role-${c.role}`"></span>
          </div>
        </div>
      </div>

      <div class="char-detail-panel">
        <div v-if="selectedChar" class="char-detail">
          <div class="detail-top">
            <div class="detail-avatar">{{ selectedChar.name[0] }}</div>
            <div class="detail-info">
              <h2>{{ selectedChar.name }}</h2>
              <div class="detail-identity">{{ selectedChar.identity }}</div>
              <div v-if="selectedChar.trueIdentity" class="true-identity">
                <span class="true-label">[ 真实身份 ]</span>
                {{ selectedChar.trueIdentity }}
              </div>
            </div>
          </div>
          <div class="detail-body">
            <div class="info-section">
              <h3>人物描述</h3>
              <p>{{ selectedChar.description }}</p>
            </div>
            <div class="info-section">
              <h3>关联案件</h3>
              <div class="related-cases">
                <span
                  v-for="cid in selectedChar.relatedCases"
                  :key="cid"
                  class="related-case-link"
                  @click="$router.push(`/cases/${cid}`)"
                >
                  {{ getCaseName(cid) }}
                </span>
              </div>
            </div>
            <div v-if="selectedChar.relationships.length" class="info-section">
              <h3>人物关系</h3>
              <div class="relationships">
                <div v-for="rel in selectedChar.relationships" :key="rel.targetId" class="rel-item">
                  <span class="rel-target" @click="selectCharById(rel.targetId)">{{ getCharName(rel.targetId) }}</span>
                  <span class="rel-type">{{ rel.type }}</span>
                  <span class="rel-desc">{{ rel.description }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="no-selection">
          <p>← 选择一个人物查看档案</p>
        </div>
      </div>
    </div>

    <!-- ===== 关系图谱视图 ===== -->
    <div v-else class="graph-view">
      <div class="graph-toolbar">
        <div class="graph-legend">
          <span class="legend-item"><span class="legend-dot police"></span>警方</span>
          <span class="legend-item"><span class="legend-dot suspect"></span>嫌疑人</span>
          <span class="legend-item"><span class="legend-dot victim"></span>受害者</span>
          <span class="legend-item"><span class="legend-dot other"></span>其他</span>
        </div>
        <div class="graph-zoom-controls">
          <button class="zoom-btn" @click="zoomIn" title="放大">+</button>
          <button class="zoom-btn" @click="zoomOut" title="缩小">−</button>
          <button class="zoom-btn" @click="resetView" title="重置">⟲</button>
        </div>
      </div>
      <div
        class="graph-container"
        @wheel.prevent="onGraphWheel"
        @mousedown="onGraphMouseDown"
        @mousemove="onGraphMouseMove"
        @mouseup="onGraphMouseUp"
        @mouseleave="onGraphMouseUp"
      >
        <svg :viewBox="vb" class="graph-svg" :class="{ grabbing: isPanning }">
          <g>
            <template v-for="(edge, i) in graphEdges" :key="i">
              <line
                :x1="edge.x1" :y1="edge.y1"
                :x2="edge.x2" :y2="edge.y2"
                :stroke="edge.color"
                stroke-width="1.5"
                stroke-opacity="0.5"
                :stroke-dasharray="edge.dashed ? '4,4' : 'none'"
              />
              <text
                :x="(edge.x1 + edge.x2) / 2"
                :y="(edge.y1 + edge.y2) / 2 - 6"
                class="edge-label"
                text-anchor="middle"
                fill="var(--text-muted)"
                font-size="9"
              >{{ edge.label }}</text>
            </template>
          </g>
          <g>
            <g
              v-for="node in graphNodes"
              :key="node.id"
              class="graph-node"
              :class="{ highlighted: highlightedNode === node.id }"
              @mouseenter="highlightedNode = node.id"
              @mouseleave="highlightedNode = ''"
              @click="onGraphNodeClick(node.id)"
            >
              <circle
                :cx="node.x" :cy="node.y"
                :r="node.r"
                :fill="getNodeColor(node.role)"
                fill-opacity="0.15"
                :stroke="getNodeColor(node.role)"
                stroke-width="2"
              />
              <text
                :x="node.x" :y="node.y + 1"
                text-anchor="middle"
                dominant-baseline="central"
                :fill="getNodeColor(node.role)"
                font-size="12"
                font-weight="600"
              >{{ node.name }}</text>
              <text
                :x="node.x" :y="node.y + node.r + 14"
                text-anchor="middle"
                fill="var(--text-muted)"
                font-size="9"
              >{{ node.identity }}</text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCharacterStore } from '@/stores/characterStore'
import { useCaseStore } from '@/stores/caseStore'
import type { Character } from '@/data/characters'

const characterStore = useCharacterStore()
const caseStore = useCaseStore()

const viewMode = ref<'list' | 'graph'>('list')
const selectedRole = ref<string>('')
const selectedChar = ref<Character | null>(null)
const highlightedNode = ref('')

// ===== 图谱缩放/平移 =====
const isPanning = ref(false)
const panStart = ref({ x: 0, y: 0 })
const vbX = ref(0)
const vbY = ref(0)
const vbW = ref(800)
const vbH = ref(580)
const MIN_ZOOM = 0.3
const MAX_ZOOM = 3
const baseW = 800
const baseH = 580

const vb = computed(() => `${vbX.value} ${vbY.value} ${vbW.value} ${vbH.value}`)

function zoomIn() {
  const factor = 0.8
  const newW = vbW.value * factor
  if (newW < baseW * MIN_ZOOM) return
  const newH = vbH.value * factor
  vbX.value += (vbW.value - newW) / 2
  vbY.value += (vbH.value - newH) / 2
  vbW.value = newW
  vbH.value = newH
}

function zoomOut() {
  const factor = 1.25
  const newW = vbW.value * factor
  if (newW > baseW * MAX_ZOOM) return
  const newH = vbH.value * factor
  vbX.value += (vbW.value - newW) / 2
  vbY.value += (vbH.value - newH) / 2
  vbW.value = newW
  vbH.value = newH
}

function resetView() {
  vbX.value = 0
  vbY.value = 0
  vbW.value = baseW
  vbH.value = baseH
}

function onGraphWheel(e: WheelEvent) {
  const factor = e.deltaY > 0 ? 1.1 : 0.9
  const newW = vbW.value * factor
  if (newW < baseW * MIN_ZOOM || newW > baseW * MAX_ZOOM) return
  const newH = vbH.value * factor
  // 以鼠标位置为中心缩放
  const svg = (e.currentTarget as HTMLElement).querySelector('svg')
  if (!svg) return
  const rect = svg.getBoundingClientRect()
  const mx = (e.clientX - rect.left) / rect.width
  const my = (e.clientY - rect.top) / rect.height
  vbX.value += (vbW.value - newW) * mx
  vbY.value += (vbH.value - newH) * my
  vbW.value = newW
  vbH.value = newH
}

function onGraphMouseDown(e: MouseEvent) {
  if (e.button !== 0) return
  isPanning.value = true
  panStart.value = { x: e.clientX, y: e.clientY }
}

function onGraphMouseMove(e: MouseEvent) {
  if (!isPanning.value) return
  const svg = (e.currentTarget as HTMLElement).querySelector('svg')
  if (!svg) return
  const rect = svg.getBoundingClientRect()
  const scaleX = vbW.value / rect.width
  const scaleY = vbH.value / rect.height
  vbX.value -= (e.clientX - panStart.value.x) * scaleX
  vbY.value -= (e.clientY - panStart.value.y) * scaleY
  panStart.value = { x: e.clientX, y: e.clientY }
}

function onGraphMouseUp() {
  isPanning.value = false
}

const roles = [
  { label: '全部', value: '' },
  { label: '警方', value: 'police' },
  { label: '嫌疑人', value: 'suspect' },
  { label: '受害者', value: 'victim' },
  { label: '其他', value: 'other' },
]

const filteredCharacters = computed(() => {
  if (!selectedRole.value) return characterStore.characters
  return characterStore.characters.filter(c => c.role === selectedRole.value)
})

function getCaseName(caseId: string): string {
  return caseStore.getCaseById(caseId)?.name ?? caseId
}

function getCharName(charId: string): string {
  return characterStore.getCharacterById(charId)?.name ?? charId
}

function selectCharById(id: string) {
  const char = characterStore.getCharacterById(id)
  if (char) selectedChar.value = char
}

function onGraphNodeClick(charId: string) {
  const char = characterStore.getCharacterById(charId)
  if (char) {
    selectedChar.value = char
    viewMode.value = 'list'
  }
}

// ===== 关系图谱数据 =====
const nodePositions: Record<string, { x: number; y: number; r: number }> = {
  'char-luowenzhou':    { x: 400, y: 250, r: 32 },
  'char-feidu':         { x: 220, y: 160, r: 28 },
  'char-taoran':        { x: 560, y: 140, r: 24 },
  'char-xiaohaitao':    { x: 620, y: 280, r: 22 },
  'char-lujia':         { x: 520, y: 400, r: 22 },
  'char-suspect-yu':    { x: 140, y: 400, r: 20 },
  'char-suspect-zhao':  { x: 80,  y: 300, r: 20 },
  'char-suspect-li':    { x: 200, y: 500, r: 20 },
  'char-suspect-wang':  { x: 700, y: 430, r: 20 },
}

interface GraphNode {
  id: string
  name: string
  role: string
  identity: string
  x: number
  y: number
  r: number
}

interface GraphEdge {
  x1: number; y1: number
  x2: number; y2: number
  label: string
  color: string
  dashed?: boolean
}

const graphNodes = computed<GraphNode[]>(() => {
  return characterStore.characters
    .filter(c => nodePositions[c.id])
    .map(c => ({
      id: c.id,
      name: c.name,
      role: c.role,
      identity: c.identity.length > 8 ? c.identity.slice(0, 8) + '…' : c.identity,
      ...nodePositions[c.id],
    }))
})

const graphEdges = computed<GraphEdge[]>(() => {
  const edges: GraphEdge[] = []
  const seen = new Set<string>()

  for (const char of characterStore.characters) {
    const fromPos = nodePositions[char.id]
    if (!fromPos) continue

    for (const rel of char.relationships) {
      const toPos = nodePositions[rel.targetId]
      if (!toPos) continue

      // 去重：取排序后的 key
      const key = [char.id, rel.targetId].sort().join('|')
      if (seen.has(key)) continue
      seen.add(key)

      const color = getRelColor(rel.type)
      edges.push({
        x1: fromPos.x, y1: fromPos.y,
        x2: toPos.x, y2: toPos.y,
        label: rel.type,
        color,
        dashed: rel.type.includes('嫌疑') || rel.type.includes('矛盾'),
      })
    }
  }
  return edges
})

function getNodeColor(role: string): string {
  const map: Record<string, string> = {
    police: 'var(--accent-blue)',
    suspect: 'var(--accent-red)',
    victim: 'var(--accent-yellow)',
    witness: 'var(--accent-green)',
    other: 'var(--accent-purple)',
  }
  return map[role] ?? 'var(--text-muted)'
}

function getRelColor(type: string): string {
  if (type.includes('搭档')) return 'var(--accent-blue)'
  if (type.includes('同事') || type.includes('上级')) return 'var(--accent-blue)'
  if (type.includes('矛盾') || type.includes('嫌疑')) return 'var(--accent-red)'
  if (type.includes('被调查') || type.includes('被审讯') || type.includes('被追捕')) return 'var(--accent-yellow)'
  if (type.includes('熟人')) return 'var(--accent-purple)'
  return 'var(--text-muted)'
}
</script>

<style lang="scss" scoped>
.character-hub { max-width: 1200px; margin: 0 auto; }

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

/* 视图切换 */
.view-tabs {
  display: flex; gap: 4px; margin-bottom: 20px;
  background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px;
  padding: 4px; width: fit-content;
}
.view-tab {
  padding: 6px 20px; border: none; border-radius: 6px; cursor: pointer;
  font-size: 13px; font-weight: 500; background: transparent; color: var(--text-secondary);
  transition: all 0.2s ease;
  &:hover { color: var(--text-primary); background: var(--bg-hover); }
  &.active { background: var(--accent-blue); color: #fff; box-shadow: 0 2px 8px color-mix(in srgb, var(--accent-blue) 30%, transparent); }
}

/* ===== 列表视图 ===== */
.hub-layout { display: flex; gap: 16px; min-height: calc(100vh - 200px); }

.char-list-panel {
  width: 300px; min-width: 300px;
  background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px;
  display: flex; flex-direction: column; overflow: hidden;
}

.role-filter { display: flex; flex-wrap: wrap; gap: 6px; padding: 14px; border-bottom: 1px solid var(--border-color); }
.role-tag {
  font-size: 12px; padding: 3px 10px; border-radius: 12px; cursor: pointer;
  background: var(--bg-tertiary); color: var(--text-secondary); border: 1px solid var(--border-color);
  transition: all 0.2s ease;
  &:hover { border-color: var(--accent-blue); color: var(--accent-blue); transform: translateY(-1px); }
  &.active { background: color-mix(in srgb, var(--accent-blue) 15%, transparent); border-color: var(--accent-blue); color: var(--accent-blue); }
}

.char-list { flex: 1; overflow-y: auto; }
.char-list-item {
  display: flex; align-items: center; gap: 12px; padding: 12px 14px;
  cursor: pointer; border-bottom: 1px solid var(--border-light);
  transition: all 0.2s ease;
  animation: listItemEnter 0.3s ease both;
  &:hover { background: var(--bg-hover); padding-left: 18px; }
  &.active {
    background: color-mix(in srgb, var(--accent-blue) 8%, transparent);
    border-left: 3px solid var(--accent-blue);
    padding-left: 11px;
  }
}

@for $i from 1 through 20 {
  .char-list-item:nth-child(#{$i}) { animation-delay: #{$i * 30}ms; }
}

@keyframes listItemEnter {
  from { opacity: 0; transform: translateX(-12px); }
  to { opacity: 1; transform: translateX(0); }
}

.char-avatar {
  width: 36px; height: 36px; border-radius: 50%;
  background: var(--bg-tertiary); border: 1px solid var(--border-color);
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 600; color: var(--text-primary); flex-shrink: 0;
  transition: all 0.2s ease;
}
.char-list-item:hover .char-avatar {
  border-color: var(--accent-blue);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent-blue) 20%, transparent);
}
.char-brief { flex: 1; min-width: 0; }
.char-name { font-size: 14px; font-weight: 500; color: var(--text-primary); }
.char-identity { font-size: 11px; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.char-role-dot {
  width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
  box-shadow: 0 0 4px currentColor;
  &.role-police { background: var(--accent-blue); }
  &.role-suspect { background: var(--accent-red); }
  &.role-victim { background: var(--accent-yellow); }
  &.role-witness { background: var(--accent-green); }
  &.role-other { background: var(--accent-purple); }
}

.char-detail-panel {
  flex: 1; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px;
  overflow: hidden; animation: panelFadeIn 0.3s ease;
}
@keyframes panelFadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.char-detail { height: 100%; display: flex; flex-direction: column; }

.detail-top {
  display: flex; align-items: center; gap: 20px; padding: 24px;
  border-bottom: 1px solid var(--border-color);
  background: linear-gradient(135deg, color-mix(in srgb, var(--accent-blue) 3%, transparent), transparent 60%);
}
.detail-avatar {
  width: 64px; height: 64px; border-radius: 50%;
  background: var(--bg-tertiary); border: 2px solid var(--border-color);
  display: flex; align-items: center; justify-content: center;
  font-size: 24px; font-weight: 700; color: var(--text-primary); flex-shrink: 0;
  box-shadow: 0 2px 12px color-mix(in srgb, var(--accent-blue) 15%, transparent);
}
.detail-info {
  h2 { font-size: 22px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
}
.detail-identity { font-size: 14px; color: var(--text-secondary); }
.true-identity {
  margin-top: 8px; font-size: 13px; color: var(--accent-red-light);
  padding: 6px 10px; background: color-mix(in srgb, var(--accent-red) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent-red) 20%, transparent); border-radius: 4px;
  animation: pulseGlow 2s ease-in-out infinite;
  .true-label { font-family: var(--font-mono, monospace); font-size: 11px; color: var(--accent-red); margin-right: 6px; }
}
@keyframes pulseGlow {
  0%, 100% { box-shadow: none; }
  50% { box-shadow: 0 0 8px color-mix(in srgb, var(--accent-red) 15%, transparent); }
}

.detail-body { flex: 1; overflow-y: auto; padding: 20px 24px; }
.info-section {
  margin-bottom: 20px;
  animation: sectionFadeIn 0.4s ease both;
  h3 {
    font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 10px;
    padding-bottom: 6px; border-bottom: 1px solid var(--border-light);
    display: flex; align-items: center; gap: 6px;
    &::before { content: ''; width: 3px; height: 14px; background: var(--accent-blue); border-radius: 2px; }
  }
  p { font-size: 14px; color: var(--text-secondary); line-height: 1.8; }
}
@for $i from 1 through 5 {
  .info-section:nth-child(#{$i}) { animation-delay: #{$i * 80}ms; }
}
@keyframes sectionFadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.related-cases { display: flex; flex-wrap: wrap; gap: 8px; }
.related-case-link {
  font-size: 13px; padding: 4px 12px; background: var(--bg-tertiary);
  border: 1px solid var(--border-color); border-radius: 4px; color: var(--accent-blue);
  cursor: pointer; transition: all 0.2s ease;
  &:hover { background: var(--bg-hover); border-color: var(--accent-blue); transform: translateY(-1px); box-shadow: 0 2px 6px color-mix(in srgb, var(--accent-blue) 15%, transparent); }
}

.relationships { display: flex; flex-direction: column; gap: 10px; }
.rel-item {
  display: flex; align-items: flex-start; gap: 10px; padding: 8px 0;
  border-bottom: 1px solid var(--border-light);
  transition: all 0.2s ease;
  &:last-child { border-bottom: none; }
  &:hover { padding-left: 6px; }
}
.rel-target { font-size: 14px; font-weight: 500; color: var(--accent-blue); cursor: pointer; flex-shrink: 0; &:hover { text-decoration: underline; } }
.rel-type { font-size: 11px; padding: 1px 6px; background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 3px; color: var(--text-muted); flex-shrink: 0; }
.rel-desc { font-size: 13px; color: var(--text-secondary); }

.no-selection { height: 100%; display: flex; align-items: center; justify-content: center; color: var(--text-muted); font-size: 14px; }

/* ===== 关系图谱视图 ===== */
.graph-view {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  animation: panelFadeIn 0.3s ease;
}

.graph-toolbar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0; border-bottom: 1px solid var(--border-color);
}

.graph-legend {
  display: flex; gap: 20px; padding: 14px 20px;
  background: var(--bg-tertiary);
}
.legend-item {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; color: var(--text-secondary);
}
.legend-dot {
  width: 10px; height: 10px; border-radius: 50%;
  box-shadow: 0 0 6px currentColor;
  &.police { background: var(--accent-blue); }
  &.suspect { background: var(--accent-red); }
  &.victim { background: var(--accent-yellow); }
  &.other { background: var(--accent-purple); }
}

.graph-zoom-controls {
  display: flex; gap: 4px; padding: 8px 16px;
}
.zoom-btn {
  width: 30px; height: 30px; border: 1px solid var(--border-color); border-radius: 6px;
  background: var(--bg-tertiary); color: var(--text-secondary); cursor: pointer;
  font-size: 16px; display: flex; align-items: center; justify-content: center;
  transition: all 0.2s ease;
  &:hover { border-color: var(--accent-blue); color: var(--accent-blue); background: color-mix(in srgb, var(--accent-blue) 8%, transparent); transform: scale(1.1); }
  &:active { transform: scale(0.95); }
}

.graph-container {
  padding: 16px;
  cursor: grab;
}
.graph-container:active {
  cursor: grabbing;
}

.graph-svg {
  width: 100%;
  height: 500px;
  transition: none;
}

.graph-node {
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover, &.highlighted {
    circle {
      fill-opacity: 0.35;
      stroke-width: 3;
      filter: drop-shadow(0 0 6px currentColor);
    }
    text { font-size: 13px; }
  }
}

.edge-label {
  pointer-events: none;
  font-family: var(--font-mono, monospace);
}
</style>
