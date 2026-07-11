// ============================================
// 默读 — 案件 Mock 数据
// ============================================

export interface Suspect {
  name: string
  alias?: string
  description: string
  status: 'at_large' | 'detained' | 'deceased' | 'unknown'
}

export interface Evidence {
  id: string
  name: string
  type: 'physical' | 'document' | 'digital' | 'testimony' | 'other'
  description: string
  relatedCaseId: string
}

export interface Clue {
  id: string
  content: string
  verified: boolean
  source: string
}

export interface Case {
  id: string
  name: string
  literaryRef: string
  status: 'unsolved' | 'investigating' | 'closed'
  priority: 'high' | 'medium' | 'low'
  summary: string
  description: string
  createDate: string
  closeDate?: string
  leadInvestigator: string
  participants: string[]
  suspects: Suspect[]
  evidence: Evidence[]
  clues: Clue[]
  tags: string[]
  connectionToMainCase: boolean
}

export const casesData: Case[] = [
  {
    id: 'CASE-2016-001',
    name: '于连案',
    literaryRef: '《红与黑》— 司汤达',
    status: 'closed',
    priority: 'high',
    summary: '燕城大学学生坠楼身亡，表面看似自杀，实则牵扯出校园中阶层歧视、学术腐败与一场精心设计的谋杀。如同《红与黑》中于连的悲剧，阶层攀升的野心最终成为致命陷阱。',
    description: '2016年秋，燕城大学学生于连从教学楼顶层坠落。初步调查认定为自杀，但骆闻舟在复查案卷时发现坠落轨迹不符合自杀特征。深入调查后，楼顶护栏处提取的第三方DNA血迹、于连日记中反复出现的"有人告诉我该怎么做"、以及监控中案发时段的可疑人影，逐渐拼凑出真相——于连并非自杀，他是被操控的棋子。有人利用了他的阶层焦虑和校园矛盾，一步步将他推向了死亡。这不仅仅是校园暴力，更是"朗诵者"组织利用人性弱点制造犯罪的又一"作品"。',
    createDate: '2016-09-15',
    closeDate: '2016-11-20',
    leadInvestigator: '骆闻舟',
    participants: ['char-luowenzhou', 'char-feidu', 'char-taoran'],
    suspects: [
      { name: '赵某某', alias: '于连室友', description: '与受害者存在长期矛盾，案发当晚行踪不明', status: 'detained' },
      { name: '周某', alias: '同班同学', description: '曾公开威胁受害者，有作案动机', status: 'detained' },
    ],
    evidence: [
      { id: 'ev-001-01', name: '现场血迹样本', type: 'physical', description: '楼顶护栏处提取的微量血迹，经DNA比对不属于受害者', relatedCaseId: 'CASE-2016-001' },
      { id: 'ev-001-02', name: '于连日记', type: 'document', description: '受害者生前日记，记录了对校园生活的绝望和对他人的怀疑', relatedCaseId: 'CASE-2016-001' },
      { id: 'ev-001-03', name: '监控录像', type: 'digital', description: '教学楼走廊监控，显示案发时间段有可疑人员出入', relatedCaseId: 'CASE-2016-001' },
    ],
    clues: [
      { id: 'clue-001-01', content: '于连坠楼前曾收到一条匿名短信', verified: true, source: '手机取证' },
      { id: 'clue-001-02', content: '楼顶护栏有被人为破坏的痕迹', verified: true, source: '现场勘查' },
      { id: 'clue-001-03', content: '案件背后似乎有人暗中操控', verified: false, source: '费渡分析' },
    ],
    tags: ['校园', '坠楼', '阶层', '谋杀'],
    connectionToMainCase: true,
  },
  {
    id: 'CASE-2016-002',
    name: '洛丽塔案',
    literaryRef: '《洛丽塔》— 纳博科夫',
    status: 'closed',
    priority: 'high',
    summary: '一名未成年少女的失踪案，揭开了一条以"关爱"为名、针对弱势群体的隐秘犯罪链条。如同《洛丽塔》中被扭曲的欲望，施害者用温情编织了一张致命的控制之网。',
    description: '少女苏某突然失踪，家人报案后引起警方重视。调查中发现苏某失踪前与一名年长男子频繁加密聊天。该男子以"关心"和"保护"为名逐步接近苏某，先建立信任、再制造依赖、最后切断退路——这是教科书般的心理操控模式。更令人不安的是，嫌疑人李某的银行转账记录揭示了他并非单独行动：定期向多个账户的汇款指向一个更大的犯罪网络。李某只是链条中的一环，他的背后还有更高层级的操控者。这个案件让所有参与调查的警员感到愤怒，也让骆闻舟意识到——操控手法与于连案如出一辙。',
    createDate: '2016-12-03',
    closeDate: '2017-02-18',
    leadInvestigator: '骆闻舟',
    participants: ['char-luowenzhou', 'char-taoran', 'char-xiaohaitao'],
    suspects: [
      { name: '李某', alias: '苏某"朋友"', description: '以关心为名接近受害者的成年男子，具有极强的操控能力', status: 'detained' },
      { name: '身份未确认', alias: '幕后人物', description: '疑似犯罪网络的上游中间人，身份尚未确认，可能涉及更高层级', status: 'unknown' as const },
    ],
    evidence: [
      { id: 'ev-002-01', name: '聊天记录', type: 'digital', description: '受害者手机中恢复的加密聊天内容', relatedCaseId: 'CASE-2016-002' },
      { id: 'ev-002-02', name: '银行转账记录', type: 'document', description: '嫌疑人向多个账户的定期转账，疑似交易记录', relatedCaseId: 'CASE-2016-002' },
    ],
    clues: [
      { id: 'clue-002-01', content: '受害者曾向同学透露"有人对我很好"', verified: true, source: '同学证言' },
      { id: 'clue-002-02', content: '嫌疑人的真实身份可能涉及更高层级', verified: false, source: '骆闻舟推断' },
    ],
    tags: ['失踪', '未成年人', '诱拐', '犯罪网络'],
    connectionToMainCase: true,
  },
  {
    id: 'CASE-2017-003',
    name: '麦克白案',
    literaryRef: '《麦克白》— 莎士比亚',
    status: 'closed',
    priority: 'high',
    summary: '燕城企业家在别墅中被毒杀，现场伪装成意外事故。如同《麦克白》中被野心驱使的弑杀，遗产争夺与商业阴谋交织成一场精心策划的"完美犯罪"。',
    description: '燕城知名企业家在自家别墅中被发现死亡，现场被精心伪装成意外事故。法医陆嘉在尸检中检出罕见毒素，直接将案件从"意外"转为"谋杀"。调查发现受害者遗嘱近期被修改、巨额保险受益人变更，所有经济线索指向同一人。嫌疑人之间的互相指认如同麦克白中的命运纠葛——每个人都在说谎，每个人都有动机。更令人不安的是，这种罕见毒素的来源极为特殊，费渡追查发现其获取渠道与"朗诵者"组织的资源网络存在交集。组织可能利用了一场已有的商业纠纷，为凶手提供了"工具"和"方法"，将普通谋杀变成了他们的又一件"作品"。',
    createDate: '2017-03-22',
    closeDate: '2017-06-10',
    leadInvestigator: '骆闻舟',
    participants: ['char-luowenzhou', 'char-feidu', 'char-lujia'],
    suspects: [
      { name: '王某', alias: '商业伙伴', description: '与受害者存在巨额财务纠纷，有直接动机', status: 'detained' },
      { name: '受害者妻子', alias: '家属', description: '巨额保险受益人，案发时声称不在场但证据存疑', status: 'detained' },
    ],
    evidence: [
      { id: 'ev-003-01', name: '遗嘱复印件', type: 'document', description: '近期修改过的遗嘱，受益人变更时间与案发吻合', relatedCaseId: 'CASE-2017-003' },
      { id: 'ev-003-02', name: '毒药残留', type: 'physical', description: '受害者体内检出罕见毒素，来源指向特殊渠道', relatedCaseId: 'CASE-2017-003' },
      { id: 'ev-003-03', name: '别墅监控', type: 'digital', description: '案发当晚监控被人为关闭，技术恢复后获取部分画面', relatedCaseId: 'CASE-2017-003' },
    ],
    clues: [
      { id: 'clue-003-01', content: '凶手可能得到了内部人员的协助', verified: true, source: '陆嘉法医报告' },
      { id: 'clue-003-02', content: '案件手法与"朗诵者"过往模式相似', verified: false, source: '费渡对比分析' },
    ],
    tags: ['商业', '谋杀', '遗产', '毒杀'],
    connectionToMainCase: true,
  },
  {
    id: 'CASE-2017-004',
    name: '基督山伯爵案',
    literaryRef: '《基督山伯爵》— 大仲马',
    status: 'investigating',
    priority: 'high',
    summary: '燕城接连发生看似无关的"意外"事件，费渡敏锐地察觉到这些事件背后隐藏着同一只手——有人正在实施一场跨越多年的精密复仇，如同基督山伯爵般逐一向旧日仇人讨债。',
    description: '燕城接连发生多起看似毫无关联的意外事件，但费渡在深入分析后发现了一个惊人的共同点：所有受害者都与多年前的同一事件有关。这不是巧合——有人在系统性地复仇。复仇者寄出的挑衅信措辞古典而优雅，每一步计划精密如棋局，展现出极度的耐心和文化素养。然而更复杂的是，费渡发现复仇者的资源来源与"朗诵者"组织存在交叉。一个有个人仇恨的人为什么会与犯罪组织产生交集？答案令人不寒而栗：朗诵者发现了这个心怀仇恨的人，主动为其提供了复仇的"工具"和"资源"。复仇者以为自己在独立行动，实际上已经成了组织棋盘上的一颗棋子——正如基督山伯爵以为自己在执行天意，却不知每一步都落在了别人的布局之中。',
    createDate: '2017-07-08',
    leadInvestigator: '骆闻舟',
    participants: ['char-luowenzhou', 'char-feidu', 'char-taoran', 'char-xiaohaitao'],
    suspects: [
      { name: '身份待确认', alias: '复仇者', description: '多年前某事件的受害者或相关人，经过多年准备后展开系统性复仇', status: 'at_large' },
    ],
    evidence: [
      { id: 'ev-004-01', name: '受害者关联图谱', type: 'other', description: '所有受害者之间的共同联系，指向多年前的同一事件', relatedCaseId: 'CASE-2017-004' },
      { id: 'ev-004-02', name: '匿名信件', type: 'document', description: '复仇者寄出的挑衅信，措辞古典而优雅', relatedCaseId: 'CASE-2017-004' },
    ],
    clues: [
      { id: 'clue-004-01', content: '复仇者的下一步行动可能针对某个特定目标', verified: false, source: '费渡推理' },
      { id: 'clue-004-02', content: '复仇计划与"朗诵者"存在资源交叉', verified: false, source: '线索交叉分析' },
    ],
    tags: ['复仇', '连环', '阴谋', '古典'],
    connectionToMainCase: true,
  },
  {
    id: 'CASE-2017-005',
    name: '朗读者案',
    literaryRef: '《朗读者》— 本哈德·施林克',
    status: 'unsolved',
    priority: 'high',
    summary: '贯穿所有案件的核心——"朗诵者"犯罪组织的真面目。以文学为密码、以人性弱点为棋盘、以人命为棋子，这个隐藏在燕城最深处的暗网组织，编织了一张覆盖一切的巨大暗网。而揭开真相的最后钥匙，恰恰藏在费渡最不愿触碰的过去之中。',
    description: '在经历了于连案、洛丽塔案、麦克白案和基督山伯爵案之后，所有线索最终指向同一个方向——一个被称为"朗诵者"的神秘组织。这个组织以经典文学作品为暗号进行内部通讯，即使被截获也只会被认为是普通的文学引用。他们系统性地识别并利用人性的弱点：于连的阶层野心、苏某的脆弱无助、企业家的商业贪婪、复仇者的刻骨仇恨——每一个弱点都被精准放大为犯罪工具。朗读者案不是一起独立的案件，而是对所有前案的重新审视与终极追查。随着调查深入，费渡的身世与组织之间的深层渊源逐渐浮出水面——他成长的家族、童年的经历、对黑暗的独特理解，都与朗诵者密不可分。骆闻舟意识到，费渡不仅是帮手，更是解开谜团的关键。但这也意味着费渡必须直面自己最不愿触碰的过去。真相的最后拼图，关乎每一个人的选择与沉默——在沉默中阅读黑暗，在黑暗中寻找光明。',
    createDate: '2017-09-01',
    leadInvestigator: '骆闻舟',
    participants: ['char-luowenzhou', 'char-feidu', 'char-taoran', 'char-xiaohaitao', 'char-lujia'],
    suspects: [
      { name: '核心人物', alias: '朗诵者', description: '组织的核心操控者，身份成谜，可能就在身边', status: 'at_large' },
      { name: '多名成员', alias: '组织成员', description: '分布在不同领域的组织成员，各自执行"朗诵者"的意志', status: 'unknown' },
    ],
    evidence: [
      { id: 'ev-005-01', name: '前案关联证据汇总', type: 'other', description: '四起案件中指向"朗诵者"的所有线索汇总', relatedCaseId: 'CASE-2017-005' },
      { id: 'ev-005-02', name: '文学密码', type: 'document', description: '案件中反复出现的文学引用，构成某种密码体系', relatedCaseId: 'CASE-2017-005' },
      { id: 'ev-005-03', name: '组织架构图', type: 'document', description: '费渡整理的"朗诵者"组织推测架构（不完整）', relatedCaseId: 'CASE-2017-005' },
    ],
    clues: [
      { id: 'clue-005-01', content: '"朗诵者"组织的创立时间远早于预期', verified: true, source: '费渡调查' },
      { id: 'clue-005-02', content: '组织内部存在叛徒或分裂', verified: false, source: '异常行为分析' },
      { id: 'clue-005-03', content: '最终真相与费渡的身世密切相关', verified: false, source: '多条线索指向' },
    ],
    tags: ['核心', '组织', '暗线', '终极'],
    connectionToMainCase: true,
  },
]
