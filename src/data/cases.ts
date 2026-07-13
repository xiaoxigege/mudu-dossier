// ============================================
// 默读 — 案件 Mock 数据（基于原著情节）
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
    name: '花市西区抛尸案',
    literaryRef: '《红与黑》— 司汤达',
    status: 'closed',
    priority: 'high',
    summary: '花市西区发现被肢解的尸体，受害者为18岁外卖员何忠义。嫌疑人赵浩昌（别名赵凤年）是一名律师，表面精英实则冷血。如同《红与黑》中于连的悲剧，阶层壁垒与人性扭曲交织出一场精心设计的犯罪。',
    description: '2016年5月，燕城花市西区陆续发现被塑料袋包裹的人体组织。经DNA比对确认，受害者为18岁外卖员何忠义——一个从乡下来城里打工的年轻人，本应有着平凡而漫长的人生。骆闻舟接手案件后，通过走访排查和监控追踪，将目标锁定在律师赵浩昌身上。赵浩昌别名"赵凤年"，外表是体面的法律从业者，内心却藏着对底层人的极端蔑视。他以"帮忙"为由接近何忠义，将其诱骗至住所后实施杀害。更令人不寒而栗的是，赵浩昌的犯罪手法冷静而有条理——他利用自己的法律知识规避侦查，将抛尸路线设计得极为周密。这个案件让骆闻舟第一次意识到，燕城的黑暗远比表面看到的更深。而费渡在分析此案时敏锐地指出：赵浩昌的行为模式不像是一个独立犯罪者，更像是被某种力量"引导"和"塑造"的产物。',
    createDate: '2016-05-20',
    closeDate: '2016-07-15',
    leadInvestigator: '骆闻舟',
    participants: ['char-luowenzhou', 'char-feidu', 'char-taoran', 'char-langqiao'],
    suspects: [
      { name: '赵浩昌', alias: '赵凤年 / 律师', description: '表面成功的律师，实则以阶层优越感为驱动的冷血杀手。利用法律知识精心规避侦查，将谋杀包装成"清理"。', status: 'detained' },
    ],
    evidence: [
      { id: 'ev-001-01', name: '受害者残骸', type: 'physical', description: '花市西区多处发现的塑料袋包裹的人体组织，经DNA确认属于何忠义', relatedCaseId: 'CASE-2016-001' },
      { id: 'ev-001-02', name: '监控录像', type: 'digital', description: '抛尸路线沿途监控，经逐帧排查锁定嫌疑人车辆', relatedCaseId: 'CASE-2016-001' },
      { id: 'ev-001-03', name: '赵浩昌住所痕迹', type: 'physical', description: '住所内检出受害者血迹反应，成为定罪关键物证', relatedCaseId: 'CASE-2016-001' },
      { id: 'ev-001-04', name: '手机通讯记录', type: 'digital', description: '赵浩昌与何忠义的最后联络记录，证明两人存在接触', relatedCaseId: 'CASE-2016-001' },
    ],
    clues: [
      { id: 'clue-001-01', content: '受害者最后出现的地点与嫌疑人住所距离极近', verified: true, source: '监控排查' },
      { id: 'clue-001-02', content: '嫌疑人具有反侦查意识，抛尸路线刻意避开主要卡口', verified: true, source: '骆闻舟分析' },
      { id: 'clue-001-03', content: '赵浩昌的犯罪动机可能不仅仅是个人恩怨，背后或有更深原因', verified: false, source: '费渡推断' },
    ],
    tags: ['抛尸', '肢解', '外卖员', '律师', '阶层'],
    connectionToMainCase: true,
  },
  {
    id: 'CASE-2016-002',
    name: '西山少女失踪案',
    literaryRef: '《洛丽塔》— 纳博科夫',
    status: 'closed',
    priority: 'high',
    summary: '11岁少女曲桐在西山游玩后失踪。调查层层剥开，牵出已故教师吴广川多年的性侵丑闻，以及围绕掩盖真相而衍生出的连环犯罪——父爱的扭曲、母亲的疯狂、旁观者的沉默，共同编织了一张令人窒息的网。',
    description: '2016年7月，11岁的曲桐随学校去西山游玩后失踪。警方介入后，表面看似简单的失踪案却越挖越深。曲桐的失踪与一名已故教师吴广川有着隐秘关联——吴广川生前利用教师身份长期性侵多名女学生，曲桐就是受害者之一。吴广川死后，真相面临被永远掩埋的危险。曲桐的父亲郭恒在得知女儿遭遇后，被愤怒和绝望吞噬，走上了极端的复仇之路。与此同时，苏筱兰和苏落盏母女也深度卷入——她们与吴广川案有着不为人知的纠葛。摄影师徐文超则在无意中记录下了关键证据。这个案件的核心不是某一个人的犯罪，而是一整个社区的"沉默"——当所有人都选择视而不见，黑暗便在沉默中滋长。正如《洛丽塔》所揭示的，最可怕的犯罪往往披着"正常"的外衣。',
    createDate: '2016-07-27',
    closeDate: '2016-10-08',
    leadInvestigator: '骆闻舟',
    participants: ['char-luowenzhou', 'char-feidu', 'char-taoran', 'char-langqiao'],
    suspects: [
      { name: '郭恒', alias: '曲桐父亲', description: '普通父亲，在得知女儿被性侵的真相后精神崩溃，以暴制暴走上了复仇之路。父爱在此刻变成了最危险的武器。', status: 'detained' },
      { name: '苏筱兰', alias: '吴广川案相关人', description: '与已故教师吴广川有着复杂关系的女性，在事件中扮演了关键角色。她的沉默和后来的爆发都源于同一段不堪的过往。', status: 'detained' },
      { name: '苏落盏', alias: '苏筱兰之女', description: '苏筱兰的女儿，被母亲卷入了这场跨越多年的阴谋。她既是受害者也是参与者，命运令人唏嘘。', status: 'detained' },
      { name: '徐文超', alias: '摄影师', description: '自由摄影师，在西山拍摄时无意中记录下了与案件相关的关键影像证据。', status: 'detained' },
      { name: '吴广川', alias: '已故教师', description: '西山学校教师，生前利用职位之便长期性侵多名女学生。虽已死亡，但其罪行是整起案件的核心导火索。', status: 'deceased' },
    ],
    evidence: [
      { id: 'ev-002-01', name: '曲桐衣物', type: 'physical', description: '西山现场发现的曲桐随身物品，上面检出关键生物证据', relatedCaseId: 'CASE-2016-002' },
      { id: 'ev-002-02', name: '吴广川遗物', type: 'document', description: '已故教师吴广川的日记和笔记，其中暗含对犯罪行为的记录', relatedCaseId: 'CASE-2016-002' },
      { id: 'ev-002-03', name: '徐文超照片', type: 'digital', description: '摄影师在西山拍摄的照片，无意中记录了案发时段的关键画面', relatedCaseId: 'CASE-2016-002' },
      { id: 'ev-002-04', name: '多名受害者证言', type: 'testimony', description: '吴广川生前多名学生的证词，证实了其长期性侵行为', relatedCaseId: 'CASE-2016-002' },
    ],
    clues: [
      { id: 'clue-002-01', content: '曲桐失踪前曾表现出对某位"老师"的极度恐惧', verified: true, source: '同学证言' },
      { id: 'clue-002-02', content: '吴广川的死亡并非自然死亡，其中可能另有隐情', verified: true, source: '骆闻舟复查' },
      { id: 'clue-002-03', content: '苏筱兰母女的行为模式暗示她们知道更多真相', verified: false, source: '费渡分析' },
      { id: 'clue-002-04', content: '案件背后存在系统性的包庇网络', verified: false, source: '郎乔排查' },
    ],
    tags: ['失踪', '未成年人', '性侵', '复仇', '沉默'],
    connectionToMainCase: true,
  },
  {
    id: 'CASE-2017-003',
    name: '贩毒网络案',
    literaryRef: '《麦克白》— 莎士比亚',
    status: 'closed',
    priority: 'high',
    summary: '燕城破获一起大型贩毒案件，牵扯出盘踞多年的地下网络。如同《麦克白》中被野心驱使的堕落，涉案者在利益与权力的诱惑下一步步走向深渊，而"朗诵者"的影子在毒品供应链中若隐若现。',
    description: '2017年初，燕城警方在一次例行缉毒行动中意外发现了一条规模庞大的毒品供应链。这条链条从边境制毒窝点一直延伸到燕城核心城区的分销网络，涉及多个层级的中间人和保护伞。骆闻舟率队深入追查，发现这个网络的组织架构异常精密——每个节点之间单线联系，即使某个环节被破获也不会牵连整体。更令人警觉的是，费渡在分析毒品资金来源时发现，部分资金的最终流向指向了几个看似合法的商业实体。这些商业实体的运作模式与"朗诵者"组织的已知特征高度吻合。如同麦克白被野心一步步推向弑君之路，涉案的每个人都在利益的诱惑下做出了"不可逆"的选择。而这个贩毒网络，可能只是朗诵者用来洗钱和控制人心的工具之一。',
    createDate: '2017-02-14',
    closeDate: '2017-05-20',
    leadInvestigator: '骆闻舟',
    participants: ['char-luowenzhou', 'char-taoran', 'char-langqiao'],
    suspects: [
      { name: '周怀信', alias: '中间人', description: '贩毒网络中的关键中间人，负责燕城地区的分销协调。表面是普通商人，实则是毒品链条的核心节点。', status: 'detained' },
      { name: '多名下线', alias: '分销网络', description: '分布在不同区域的分销人员，彼此之间互不认识，仅通过单线联系接收指令。', status: 'detained' },
    ],
    evidence: [
      { id: 'ev-003-01', name: '毒品样品', type: 'physical', description: '缉毒行动中缴获的新型毒品，成分分析显示来源极为特殊', relatedCaseId: 'CASE-2017-003' },
      { id: 'ev-003-02', name: '资金流水', type: 'digital', description: '涉案账户的资金流向图，部分资金最终流向可疑商业实体', relatedCaseId: 'CASE-2017-003' },
      { id: 'ev-003-03', name: '通讯记录', type: 'digital', description: '嫌疑人之间的加密通讯，使用暗语进行毒品交易协调', relatedCaseId: 'CASE-2017-003' },
    ],
    clues: [
      { id: 'clue-003-01', content: '毒品供应链的组织手法与"朗诵者"已知模式吻合', verified: false, source: '费渡资金分析' },
      { id: 'clue-003-02', content: '部分涉案资金流向了与费氏集团有关联的账户', verified: false, source: '银行流水' },
      { id: 'clue-003-03', content: '网络中可能存在警方内部的保护伞', verified: false, source: '骆闻舟怀疑' },
    ],
    tags: ['贩毒', '网络', '洗钱', '组织'],
    connectionToMainCase: true,
  },
  {
    id: 'CASE-2017-004',
    name: '连环失踪案',
    literaryRef: '《基督山伯爵》— 大仲马',
    status: 'investigating',
    priority: 'high',
    summary: '燕城多名与旧案相关的人员接连失踪，费渡发现这些失踪事件背后隐藏着同一只手——有人在实施一场跨越多年的精密复仇，如同基督山伯爵般向旧日仇人逐一讨债。而"朗诵者"在幕后为复仇者递上了刀。',
    description: '2017年下半年，燕城接连发生多起看似毫无关联的人员失踪事件。失踪者身份各异——有商人、有公务员、有退休教师——唯一的共同点是他们都与十多年前的某些"旧事"有关。费渡在深入分析后发现了惊人的联系：所有失踪者的时间线、地点选择都呈现出一种"仪式感"，如同有人在按照某种剧本执行。更令人不安的是，费渡在追查中发现这些失踪者当年都曾在不同程度上参与或目睹过同一件事——一件被刻意掩埋的旧案。复仇者寄出的匿名信件措辞古典而优雅，字里行间引用了多部文学名著。这不是冲动犯罪，而是一场精心策划了十几年的复仇。然而费渡指出一个关键问题：复仇者获取的某些资源和信息渠道，远超个人能力范围——"朗诵者"在幕后为这场复仇提供了"工具"，将复仇者变成了棋盘上的一颗棋子。',
    createDate: '2017-06-15',
    leadInvestigator: '骆闻舟',
    participants: ['char-luowenzhou', 'char-feidu', 'char-taoran', 'char-langqiao'],
    suspects: [
      { name: '身份待确认', alias: '复仇者', description: '多年前某事件的受害者或相关人。经过十几年隐忍和准备，展开了一场系统性的复仇。极度耐心、极度危险。', status: 'at_large' },
    ],
    evidence: [
      { id: 'ev-004-01', name: '失踪者关联图谱', type: 'other', description: '所有失踪者之间的隐秘联系，指向十多年前的同一件旧事', relatedCaseId: 'CASE-2017-004' },
      { id: 'ev-004-02', name: '匿名信件', type: 'document', description: '复仇者寄出的挑衅信，引用文学名著作为暗号', relatedCaseId: 'CASE-2017-004' },
      { id: 'ev-004-03', name: '失踪现场痕迹', type: 'physical', description: '多处失踪现场发现的微量物证，显示经过专业清理', relatedCaseId: 'CASE-2017-004' },
    ],
    clues: [
      { id: 'clue-004-01', content: '复仇者的下一步行动可能针对某个特定目标', verified: false, source: '费渡推理' },
      { id: 'clue-004-02', content: '复仇计划中使用的部分资源来自"朗诵者"网络', verified: false, source: '线索交叉分析' },
      { id: 'clue-004-03', content: '旧事的真相可能与费渡的家族有关', verified: false, source: '费渡自查' },
    ],
    tags: ['失踪', '复仇', '连环', '旧案'],
    connectionToMainCase: true,
  },
  {
    id: 'CASE-2017-005',
    name: '朗诵者案',
    literaryRef: '《朗读者》— 本哈德·施林克',
    status: 'unsolved',
    priority: 'high',
    summary: '贯穿所有案件的核心——"朗诵者"犯罪组织的真面目。以文学为密码、以人性弱点为棋盘、以人命为棋子，这个隐藏在燕城最深处的暗网组织，编织了一张覆盖一切的巨大暗网。而揭开真相的最后钥匙，恰恰藏在费渡最不愿触碰的过去之中。',
    description: '在经历了花市抛尸案、西山失踪案、贩毒网络案和连环失踪案之后，所有线索最终指向同一个方向——一个被称为"朗诵者"的神秘组织。这个组织以经典文学作品为暗号进行内部通讯，即使被截获也只会被认为是普通的文学引用。他们系统性地识别并利用人性的弱点：赵浩昌的阶层偏见、郭恒的父爱扭曲、周怀信的贪婪、复仇者的仇恨——每一个弱点都被精准放大为犯罪工具。朗读者案不是一起独立的案件，而是对所有前案的重新审视与终极追查。随着调查深入，费渡的身世与组织之间的深层渊源逐渐浮出水面——他成长的家族、童年的经历、对黑暗的独特理解，都与朗诵者密不可分。骆闻舟意识到，费渡不仅是帮手，更是解开谜团的关键。但这也意味着费渡必须直面自己最不愿触碰的过去。真相的最后拼图，关乎每一个人的选择与沉默——在沉默中阅读黑暗，在黑暗中寻找光明。',
    createDate: '2017-08-01',
    leadInvestigator: '骆闻舟',
    participants: ['char-luowenzhou', 'char-feidu', 'char-taoran', 'char-langqiao'],
    suspects: [
      { name: '核心人物', alias: '朗诵者', description: '组织的核心操控者，身份成谜。此人深谙人性弱点，善于利用文学作品作为通讯密码，在燕城暗处经营多年。', status: 'at_large' },
      { name: '多名成员', alias: '组织成员', description: '分布在不同领域的组织成员——律师、商人、甚至可能有公职人员——各自执行"朗诵者"的意志。', status: 'unknown' },
    ],
    evidence: [
      { id: 'ev-005-01', name: '前案关联证据汇总', type: 'other', description: '所有案件中指向"朗诵者"的线索汇总——资金流向、通讯暗号、行为模式', relatedCaseId: 'CASE-2017-005' },
      { id: 'ev-005-02', name: '文学密码体系', type: 'document', description: '案件中反复出现的文学引用，构成组织内部的密码通讯系统', relatedCaseId: 'CASE-2017-005' },
      { id: 'ev-005-03', name: '组织推测架构', type: 'document', description: '费渡整理的"朗诵者"组织推测架构图（不完整）', relatedCaseId: 'CASE-2017-005' },
    ],
    clues: [
      { id: 'clue-005-01', content: '"朗诵者"组织的创立时间远早于预期，已深耕多年', verified: true, source: '费渡调查' },
      { id: 'clue-005-02', content: '组织内部可能存在分裂或叛徒', verified: false, source: '异常行为分析' },
      { id: 'clue-005-03', content: '最终真相与费渡的身世密切相关', verified: false, source: '多条线索指向' },
      { id: 'clue-005-04', content: '组织中可能有警方内部人员', verified: false, source: '骆闻舟怀疑' },
    ],
    tags: ['核心', '组织', '暗线', '终极'],
    connectionToMainCase: true,
  },
]
