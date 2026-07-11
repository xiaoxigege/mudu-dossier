// ============================================
// 默读 — 人物 Mock 数据
// ============================================

export interface Relationship {
  targetId: string
  type: string
  description: string
}

export interface Character {
  id: string
  name: string
  role: 'police' | 'suspect' | 'victim' | 'witness' | 'other'
  identity: string
  trueIdentity?: string
  description: string
  relatedCases: string[]
  relationships: Relationship[]
}

export const charactersData: Character[] = [
  // ===== 警方 =====
  {
    id: 'char-luowenzhou',
    name: '骆闻舟',
    role: 'police',
    identity: '燕城市公安局刑侦支队队长',
    description: '资深刑警，办案经验丰富，性格沉稳老练，外表粗犷但心思缜密。对案件有着近乎偏执的执着，始终坚持"可接受低QPS，不可接受扣款无法溯源"——不，是"不放过任何一个细节"的原则。在追查"朗诵者"的过程中逐渐接近真相的核心。',
    relatedCases: ['CASE-2016-001', 'CASE-2016-002', 'CASE-2017-003', 'CASE-2017-004', 'CASE-2017-005'],
    relationships: [
      { targetId: 'char-feidu', type: '搭档', description: '从最初的试探到后来的默契配合，两人联手追查朗诵者' },
      { targetId: 'char-taoran', type: '同事', description: '刑侦支队同事，值得信赖的战友' },
      { targetId: 'char-xiaohaitao', type: '同事', description: '支队成员，执行力强' },
      { targetId: 'char-lujia', type: '同事', description: '法医，为案件提供关键技术支持' },
    ],
  },
  {
    id: 'char-feidu',
    name: '费渡',
    role: 'other',
    identity: '费氏集团继承人',
    trueIdentity: '与"朗诵者"组织有着深层的渊源，其身世本身就是解开最终谜团的关键钥匙',
    description: '年轻、富有、聪明，但内心承载着常人难以想象的黑暗过往。他以一种近乎自毁的方式与黑暗共处，却在关键时刻展现出惊人的洞察力和分析能力。他的出现改变了骆闻舟追查"朗诵者"的进程。',
    relatedCases: ['CASE-2016-001', 'CASE-2017-003', 'CASE-2017-004', 'CASE-2017-005'],
    relationships: [
      { targetId: 'char-luowenzhou', type: '搭档', description: '与骆闻舟形成互补，一个代表光明中的执剑人，一个代表黑暗中的同行者' },
      { targetId: 'char-taoran', type: '熟人', description: '因骆闻舟的关系而相识' },
    ],
  },
  {
    id: 'char-taoran',
    name: '陶然',
    role: 'police',
    identity: '燕城市公安局刑侦支队警员',
    description: '骆闻舟的得力助手，性格温和但办案认真。在多个案件中参与一线调查，是团队中不可或缺的稳定力量。',
    relatedCases: ['CASE-2016-001', 'CASE-2016-002', 'CASE-2017-004', 'CASE-2017-005'],
    relationships: [
      { targetId: 'char-luowenzhou', type: '上级', description: '骆闻舟的下属，对其极为信任' },
      { targetId: 'char-xiaohaitao', type: '同事', description: '并肩作战的队友' },
    ],
  },
  {
    id: 'char-xiaohaitao',
    name: '肖海洋',
    role: 'police',
    identity: '燕城市公安局刑侦支队警员',
    description: '支队年轻警员，冲劲十足，行动力强。在多个案件中负责外围调查和追踪工作。',
    relatedCases: ['CASE-2016-002', 'CASE-2017-004', 'CASE-2017-005'],
    relationships: [
      { targetId: 'char-luowenzhou', type: '上级', description: '骆闻舟的下属' },
      { targetId: 'char-taoran', type: '同事', description: '经常搭档出外勤' },
    ],
  },
  {
    id: 'char-lujia',
    name: '陆嘉',
    role: 'police',
    identity: '法医',
    description: '技术过硬的法医，冷静理性。她的尸检报告和法医分析为多起案件提供了关键突破口。',
    relatedCases: ['CASE-2017-003', 'CASE-2017-005'],
    relationships: [
      { targetId: 'char-luowenzhou', type: '同事', description: '工作上的密切合作者' },
    ],
  },

  // ===== 嫌疑人 / 案件相关人物 =====
  {
    id: 'char-suspect-yu',
    name: '于连',
    role: 'victim',
    identity: '燕城大学学生',
    description: '于连案受害者。出身普通，凭借努力考入燕城大学，却在校园中遭遇了来自阶层差异的巨大压力。他的死亡是一切的起点。',
    relatedCases: ['CASE-2016-001'],
    relationships: [
      { targetId: 'char-suspect-zhao', type: '室友/矛盾', description: '与赵某某存在长期宿舍矛盾' },
      { targetId: 'char-luowenzhou', type: '被调查', description: '骆闻舟复查其案卷后发现真相' },
    ],
  },
  {
    id: 'char-suspect-zhao',
    name: '赵某某',
    role: 'suspect',
    identity: '燕城大学学生，于连室友',
    description: '与于连长期存在矛盾，案发当晚行踪不明。在审讯中表现出与供述不一致的行为特征。其"完美"的供述反而暴露了有人在帮他准备说辞。',
    relatedCases: ['CASE-2016-001'],
    relationships: [
      { targetId: 'char-suspect-yu', type: '室友/矛盾', description: '与受害者存在长期宿舍矛盾' },
      { targetId: 'char-luowenzhou', type: '被审讯', description: '骆闻舟发现其供述时间线矛盾' },
    ],
  },
  {
    id: 'char-suspect-li',
    name: '李某',
    role: 'suspect',
    identity: '无固定职业',
    description: '洛丽塔案核心嫌疑人。以"关心"和"保护"为名接近未成年受害者，具有极强的心理操控能力。其背后可能牵涉更大的犯罪网络。',
    relatedCases: ['CASE-2016-002'],
    relationships: [
      { targetId: 'char-luowenzhou', type: '被追捕', description: '骆闻舟主导追捕并最终将其抓获' },
    ],
  },
  {
    id: 'char-suspect-wang',
    name: '王某',
    role: 'suspect',
    identity: '企业家',
    description: '麦克白案核心嫌疑人。与受害者存在巨额商业纠纷，在利益驱使下走上了不归路。如同麦克白被野心驱使，他在财富的诱惑下选择了谋杀。',
    relatedCases: ['CASE-2017-003'],
    relationships: [
      { targetId: 'char-luowenzhou', type: '被审讯', description: '骆闻舟负责审讯' },
      { targetId: 'char-lujia', type: '关键证据', description: '陆嘉的法医报告是定罪的关键' },
    ],
  },
]
