// ============================================
// 默读 — 时间线 Mock 数据
// ============================================

export interface TimelineEvent {
  id: string
  date: string
  caseId: string
  title: string
  description: string
  type: 'discovery' | 'breakthrough' | 'twist' | 'resolution'
  keyFigures: string[]
}

export const timelineData: TimelineEvent[] = [
  // ===== 前史 =====
  {
    id: 'tl-000',
    date: '2015-06-01',
    caseId: 'CASE-2017-005',
    title: '费渡回国',
    description: '费渡从海外归来，接手费氏集团部分业务。表面上是商业精英的回归，实则带着对过去的追问。他开始暗中调查与家族有关的一些"旧事"。',
    type: 'discovery',
    keyFigures: ['char-feidu'],
  },

  // ===== 于连案 =====
  {
    id: 'tl-001',
    date: '2016-09-15',
    caseId: 'CASE-2016-001',
    title: '于连坠楼身亡',
    description: '燕城大学学生于连从教学楼顶层坠落，初步认定为自杀。校园内外议论纷纷。',
    type: 'discovery',
    keyFigures: ['char-suspect-yu'],
  },
  {
    id: 'tl-002',
    date: '2016-09-18',
    caseId: 'CASE-2016-001',
    title: '骆闻舟复查案卷',
    description: '骆闻舟在例行复查中发现坠落轨迹不符合自杀特征——落点距楼体过远，存在外力作用的可能。',
    type: 'breakthrough',
    keyFigures: ['char-luowenzhou'],
  },
  {
    id: 'tl-003',
    date: '2016-09-25',
    caseId: 'CASE-2016-001',
    title: '楼顶提取第三方血迹',
    description: '现场勘查队在楼顶护栏处提取到微量血迹，DNA比对后确认不属于于连，证明案发时有第三人在场。',
    type: 'breakthrough',
    keyFigures: ['char-luowenzhou', 'char-lujia'],
  },
  {
    id: 'tl-004',
    date: '2016-10-08',
    caseId: 'CASE-2016-001',
    title: '费渡首次介入',
    description: '费渡以"关心校友"的名义接触案件，向骆闻舟提供了关于于连日记的独特分析视角。两人首次正式交流。',
    type: 'twist',
    keyFigures: ['char-feidu', 'char-luowenzhou'],
  },
  {
    id: 'tl-005',
    date: '2016-10-20',
    caseId: 'CASE-2016-001',
    title: '赵某某供述矛盾',
    description: '排查嫌疑人过程中，于连室友赵某某的供述出现时间线矛盾。其"完美"的回忆反而暴露了问题。',
    type: 'breakthrough',
    keyFigures: ['char-luowenzhou', 'char-taoran'],
  },
  {
    id: 'tl-006',
    date: '2016-11-05',
    caseId: 'CASE-2016-001',
    title: '发现于连日记关键线索',
    description: '在于连的日记中发现"有人告诉我该怎么做"这句话反复出现，暗示有幕后操控者。费渡对此表现出异常的关注。',
    type: 'twist',
    keyFigures: ['char-feidu', 'char-luowenzhou'],
  },
  {
    id: 'tl-007',
    date: '2016-11-20',
    caseId: 'CASE-2016-001',
    title: '于连案告破',
    description: '锁定凶手，案件告破。但费渡注意到案件背后似乎还有更深层的操控痕迹——"有人告诉我"中的"有人"究竟是谁？',
    type: 'resolution',
    keyFigures: ['char-luowenzhou', 'char-feidu'],
  },

  // ===== 洛丽塔案 =====
  {
    id: 'tl-008',
    date: '2016-12-03',
    caseId: 'CASE-2016-002',
    title: '苏某失踪报案',
    description: '少女苏某家人报案称其失踪多日。警方介入调查，从苏某的手机数据入手。',
    type: 'discovery',
    keyFigures: ['char-luowenzhou', 'char-taoran'],
  },
  {
    id: 'tl-009',
    date: '2016-12-20',
    caseId: 'CASE-2016-002',
    title: '恢复加密聊天记录',
    description: '技术部门从苏某手机中恢复了被删除的加密聊天记录，显示其与一名年长男子频繁联系，对方以"关心"为名实施心理操控。',
    type: 'breakthrough',
    keyFigures: ['char-taoran', 'char-xiaohaitao'],
  },
  {
    id: 'tl-010',
    date: '2017-01-15',
    caseId: 'CASE-2016-002',
    title: '发现犯罪链条',
    description: '调查中发现苏某并非个案，背后存在一条针对未成年人的犯罪链条。李某的银行转账记录揭示了他并非单独行动。',
    type: 'breakthrough',
    keyFigures: ['char-luowenzhou', 'char-xiaohaitao'],
  },
  {
    id: 'tl-011',
    date: '2017-02-18',
    caseId: 'CASE-2016-002',
    title: '洛丽塔案告破',
    description: '核心嫌疑人李某落网。但骆闻舟注意到李某的操控手法与于连案中的"幕后操控者"如出一辙——这绝不是巧合。',
    type: 'resolution',
    keyFigures: ['char-luowenzhou', 'char-taoran'],
  },

  // ===== 麦克白案 =====
  {
    id: 'tl-012',
    date: '2017-03-22',
    caseId: 'CASE-2017-003',
    title: '企业家死于别墅',
    description: '燕城知名企业家在别墅中被发现死亡，现场被精心伪装成意外事故。骆闻舟到场后直觉告诉他"太干净了"。',
    type: 'discovery',
    keyFigures: ['char-luowenzhou', 'char-lujia'],
  },
  {
    id: 'tl-013',
    date: '2017-04-10',
    caseId: 'CASE-2017-003',
    title: '遗嘱与保险异常',
    description: '调查发现受害者遗嘱在近期被修改，巨额保险受益人也发生了变更，所有经济线索指向同一人。',
    type: 'breakthrough',
    keyFigures: ['char-luowenzhou', 'char-taoran'],
  },
  {
    id: 'tl-014',
    date: '2017-04-30',
    caseId: 'CASE-2017-003',
    title: '法医发现罕见毒素',
    description: '陆嘉在尸检中检出罕见毒素，这种毒素不会自然产生。案件性质从"意外"直接转为"谋杀"。',
    type: 'breakthrough',
    keyFigures: ['char-lujia', 'char-luowenzhou'],
  },
  {
    id: 'tl-015',
    date: '2017-05-25',
    caseId: 'CASE-2017-003',
    title: '毒素来源指向暗网',
    description: '费渡追查毒素来源，发现其获取渠道极为特殊，与"朗诵者"组织已知的资源网络存在交集。',
    type: 'twist',
    keyFigures: ['char-feidu'],
  },
  {
    id: 'tl-016',
    date: '2017-06-10',
    caseId: 'CASE-2017-003',
    title: '麦克白案告破',
    description: '凶手落网。费渡确认：朗诵者利用了已有的商业纠纷，为凶手提供了"工具"和"方法"。',
    type: 'resolution',
    keyFigures: ['char-luowenzhou', 'char-feidu'],
  },

  // ===== 基督山伯爵案 =====
  {
    id: 'tl-017',
    date: '2017-07-08',
    caseId: 'CASE-2017-004',
    title: '连环"意外"引起警觉',
    description: '燕城接连发生多起看似无关的意外事件。费渡在分析后发现所有受害者都与多年前同一事件有关。',
    type: 'discovery',
    keyFigures: ['char-feidu'],
  },
  {
    id: 'tl-018',
    date: '2017-07-25',
    caseId: 'CASE-2017-004',
    title: '发现匿名挑衅信',
    description: '复仇者寄出的挑衅信被截获，措辞古典而优雅，引用了多部文学名著。这不是普通犯罪——这是一场"仪式"。',
    type: 'breakthrough',
    keyFigures: ['char-luowenzhou', 'char-feidu'],
  },
  {
    id: 'tl-019',
    date: '2017-08-20',
    caseId: 'CASE-2017-004',
    title: '确认复仇者与朗诵者的交叉',
    description: '调查确认复仇者的资源来源与朗诵者存在交叉。费渡推断：组织主动为复仇者提供了"工具"，将其变成了棋子。',
    type: 'twist',
    keyFigures: ['char-feidu', 'char-luowenzhou'],
  },

  // ===== 朗读者案 =====
  {
    id: 'tl-020',
    date: '2017-09-01',
    caseId: 'CASE-2017-005',
    title: '成立专项调查组',
    description: '骆闻舟决定将前案中所有指向"朗诵者"的线索汇总，正式成立专项调查。全员参与。',
    type: 'discovery',
    keyFigures: ['char-luowenzhou', 'char-feidu', 'char-taoran', 'char-xiaohaitao'],
  },
  {
    id: 'tl-021',
    date: '2017-09-10',
    caseId: 'CASE-2017-005',
    title: '四案关联图谱完成',
    description: '费渡完成了四起案件的关联分析图谱，揭示出朗诵者利用人性弱点的系统性模式：野心、欲望、贪婪、仇恨。',
    type: 'breakthrough',
    keyFigures: ['char-feidu'],
  },
  {
    id: 'tl-022',
    date: '2017-09-15',
    caseId: 'CASE-2017-005',
    title: '文学密码破译',
    description: '费渡破译了案件中反复出现的文学引用构成的密码体系——每部文学作品对应一种行动指令。',
    type: 'breakthrough',
    keyFigures: ['char-feidu'],
  },
  {
    id: 'tl-023',
    date: '2017-09-22',
    caseId: 'CASE-2017-005',
    title: '组织内部发现分裂迹象',
    description: '调查中发现朗诵者组织内部存在叛徒或分裂的迹象，某些成员的行为模式出现异常。',
    type: 'twist',
    keyFigures: ['char-feidu', 'char-luowenzhou'],
  },
  {
    id: 'tl-024',
    date: '2017-09-28',
    caseId: 'CASE-2017-005',
    title: '费渡身世浮出水面',
    description: '多条线索指向费渡的家族与朗诵者的深层渊源。骆闻舟意识到，费渡不仅是帮手，更是解开谜团的关键。',
    type: 'twist',
    keyFigures: ['char-feidu', 'char-luowenzhou'],
  },
  {
    id: 'tl-025',
    date: '2017-10-01',
    caseId: 'CASE-2017-005',
    title: '费渡坦白过去',
    description: '费渡向骆闻舟坦白了自己的家族与朗诵者的关系。"我选择帮你，不是因为任何人的安排，这是我自己的选择。"',
    type: 'twist',
    keyFigures: ['char-feidu', 'char-luowenzhou'],
  },
  {
    id: 'tl-026',
    date: '2017-10-10',
    caseId: 'CASE-2017-005',
    title: '锁定朗诵者核心',
    description: '综合所有线索，调查组终于逼近朗诵者组织的核心身份。最终的 confrontation 即将到来。',
    type: 'breakthrough',
    keyFigures: ['char-luowenzhou', 'char-feidu', 'char-taoran', 'char-xiaohaitao'],
  },
]
