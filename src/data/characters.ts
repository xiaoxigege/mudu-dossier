// ============================================
// 默读 — 人物 Mock 数据（基于原著）
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
    description: '资深刑警，办案经验丰富，性格沉稳老练，外表粗犷但心思缜密。对案件有着近乎偏执的执着，始终坚持"不放过任何一个细节"的原则。花市抛尸案中凭借坠落轨迹分析推翻初步判断，西山失踪案中层层剥开沉默之网。在追查"朗诵者"的过程中，他逐渐意识到这个组织的庞大远超想象——而费渡，是他打开真相之门的钥匙。',
    relatedCases: ['CASE-2016-001', 'CASE-2016-002', 'CASE-2017-003', 'CASE-2017-004', 'CASE-2017-005'],
    relationships: [
      { targetId: 'char-feidu', type: '搭档', description: '从最初的试探到后来的默契配合，两人联手追查朗诵者。骆闻舟代表光明中的执剑人，费渡代表黑暗中的同行者' },
      { targetId: 'char-taoran', type: '同事', description: '刑侦支队同事，值得信赖的战友，执行力强' },
      { targetId: 'char-langqiao', type: '同事', description: '刑侦支队女警，细心敏锐，擅长外围排查和证人询问' },
    ],
  },
  {
    id: 'char-feidu',
    name: '费渡',
    role: 'other',
    identity: '费氏集团继承人',
    trueIdentity: '与"朗诵者"组织有着深层的渊源，其身世本身就是解开最终谜团的关键钥匙',
    description: '年轻、富有、聪明，但内心承载着常人难以想象的黑暗过往。他以一种近乎自毁的方式与黑暗共处，却在关键时刻展现出惊人的洞察力和分析能力。他对人性弱点的理解超乎常人——因为他自己就是从黑暗中走出来的人。花市抛尸案中他首次展现出独特的犯罪分析视角；西山失踪案中他指出了"沉默之网"的本质。他的出现改变了骆闻舟追查"朗诵者"的进程——因为他不仅是帮手，更是谜团本身的一部分。',
    relatedCases: ['CASE-2016-001', 'CASE-2016-002', 'CASE-2017-004', 'CASE-2017-005'],
    relationships: [
      { targetId: 'char-luowenzhou', type: '搭档', description: '与骆闻舟形成互补——一个代表光明中的执剑人，一个代表黑暗中的同行者' },
      { targetId: 'char-taoran', type: '熟人', description: '因骆闻舟的关系而相识，逐渐建立信任' },
    ],
  },
  {
    id: 'char-taoran',
    name: '陶然',
    role: 'police',
    identity: '燕城市公安局刑侦支队警员',
    description: '骆闻舟的得力助手，性格温和但办案认真，执行力极强。在多个案件中参与一线调查和走访排查，是团队中不可或缺的稳定力量。花市抛尸案中他负责外围监控排查，西山失踪案中他深入学校取证。',
    relatedCases: ['CASE-2016-001', 'CASE-2016-002', 'CASE-2017-003', 'CASE-2017-004', 'CASE-2017-005'],
    relationships: [
      { targetId: 'char-luowenzhou', type: '上级', description: '骆闻舟的下属，对其极为信任和服从' },
      { targetId: 'char-langqiao', type: '同事', description: '经常搭档出外勤，配合默契' },
    ],
  },
  {
    id: 'char-langqiao',
    name: '郎乔',
    role: 'police',
    identity: '燕城市公安局刑侦支队警员',
    description: '刑侦支队年轻女警，性格直爽，观察力敏锐。虽然资历较浅，但在案件中展现出极强的取证和证人沟通能力。西山失踪案中她负责走访受害者同学，获取了关键证言。',
    relatedCases: ['CASE-2016-001', 'CASE-2016-002', 'CASE-2017-003', 'CASE-2017-004', 'CASE-2017-005'],
    relationships: [
      { targetId: 'char-luowenzhou', type: '上级', description: '骆闻舟的下属，敬畏但不怯懦' },
      { targetId: 'char-taoran', type: '同事', description: '经常搭档，互相照应' },
    ],
  },

  // ===== 花市西区抛尸案 =====
  {
    id: 'char-suspect-zhao',
    name: '赵浩昌',
    role: 'suspect',
    identity: '律师',
    trueIdentity: '别名"赵凤年"，花市西区抛尸案凶手',
    description: '表面是体面成功的律师，实则内心充满对底层人的极端蔑视。别名"赵凤年"，以阶层优越感为驱动，将谋杀视为对"低等人"的"清理"。他利用自己的法律知识精心规避侦查，抛尸路线设计得极为周密。骆闻舟通过监控排查和血迹证据最终将其锁定。费渡指出，赵浩昌的行为模式暗示他可能受到了某种"引导"——朗诵者可能利用了他的阶层偏见，将其塑造成了犯罪工具。',
    relatedCases: ['CASE-2016-001'],
    relationships: [
      { targetId: 'char-victim-he', type: '凶手/受害者', description: '以"帮忙"为由诱骗何忠义后实施杀害' },
      { targetId: 'char-luowenzhou', type: '被追捕', description: '骆闻舟主导案件侦破并将其抓获' },
    ],
  },
  {
    id: 'char-victim-he',
    name: '何忠义',
    role: 'victim',
    identity: '外卖员，18岁',
    description: '花市西区抛尸案受害者。从乡下来城里打工的18岁年轻人，靠送外卖为生。本应有着平凡而漫长的人生，却因遇到了赵浩昌而惨遭杀害。他的死揭示了燕城光鲜表面下的阶层裂痕——一个底层年轻人的生命，在某些人眼中竟然轻如鸿毛。',
    relatedCases: ['CASE-2016-001'],
    relationships: [
      { targetId: 'char-suspect-zhao', type: '受害者/凶手', description: '被赵浩昌诱骗并杀害' },
    ],
  },

  // ===== 西山少女失踪案 =====
  {
    id: 'char-victim-qu',
    name: '曲桐',
    role: 'victim',
    identity: '学生，11岁',
    description: '西山少女失踪案受害者。11岁的小女孩，在西山游玩后失踪。她的失踪揭开了一连串被掩埋的真相——已故教师吴广川的长期性侵、社区的集体沉默、以及她父亲郭恒在得知真相后的崩溃与复仇。她是一个被大人的罪恶碾碎的孩子。',
    relatedCases: ['CASE-2016-002'],
    relationships: [
      { targetId: 'char-suspect-guo', type: '父女', description: '郭恒之女，父亲在得知她遭遇后走上了极端复仇之路' },
      { targetId: 'char-suspect-wu', type: '受害者/施害者', description: '吴广川的受害学生之一' },
    ],
  },
  {
    id: 'char-suspect-guo',
    name: '郭恒',
    role: 'suspect',
    identity: '曲桐的父亲',
    description: '一个普通的父亲，在得知女儿被性侵的真相后精神世界彻底崩塌。愤怒、绝望、自责——这些情感将他推向了极端。他以暴制暴，走上了复仇之路。父爱在此刻变成了最危险的武器。他的故事是整个案件中最令人心碎的部分——当法律无法保护你的孩子，你会怎么做？',
    relatedCases: ['CASE-2016-002'],
    relationships: [
      { targetId: 'char-victim-qu', type: '父女', description: '曲桐的父亲，在得知女儿遭遇后走上复仇之路' },
      { targetId: 'char-suspect-wu', type: '复仇者/目标', description: '对已故的吴广川充满仇恨，因其性侵了自己的女儿' },
    ],
  },
  {
    id: 'char-suspect-wu',
    name: '吴广川',
    role: 'suspect',
    identity: '西山学校教师（已故）',
    description: '西山学校教师，生前利用职位之便长期性侵多名女学生。他表面上是受人尊敬的教书先生，暗地里却是披着人皮的恶魔。虽然已经死亡，但他的罪行是整起西山失踪案的核心导火索——他种下的恶因，在他死后结出了更可怕的恶果。',
    relatedCases: ['CASE-2016-002'],
    relationships: [
      { targetId: 'char-victim-qu', type: '施害者/受害者', description: '利用教师身份性侵曲桐等多名女学生' },
      { targetId: 'char-suspect-su-xl', type: '关联人', description: '与苏筱兰有着不为人知的复杂关系' },
    ],
  },
  {
    id: 'char-suspect-su-xl',
    name: '苏筱兰',
    role: 'suspect',
    identity: '与吴广川案相关的女性',
    description: '与已故教师吴广川有着复杂关系的女性。她的过去同样不堪——可能是吴广川的另一个受害者，也可能是知情者。在事件中她扮演了关键角色，她的沉默和后来的爆发都源于同一段不堪的过往。作为母亲，她将女儿苏落盏也卷入了这场漩涡。',
    relatedCases: ['CASE-2016-002'],
    relationships: [
      { targetId: 'char-suspect-wu', type: '关联人', description: '与吴广川有着复杂的过往纠葛' },
      { targetId: 'char-suspect-su-lz', type: '母女', description: '苏落盏的母亲，将女儿卷入了这场阴谋' },
    ],
  },
  {
    id: 'char-suspect-su-lz',
    name: '苏落盏',
    role: 'suspect',
    identity: '苏筱兰之女',
    description: '苏筱兰的女儿，被母亲卷入了这场跨越多年的阴谋。她既是受害者也是参与者——母亲的疯狂和仇恨将她推入了一个本不属于她的漩涡。她的命运令人唏嘘，是整个案件中最让人心疼的角色之一。',
    relatedCases: ['CASE-2016-002'],
    relationships: [
      { targetId: 'char-suspect-su-xl', type: '母女', description: '苏筱兰的女儿，被母亲卷入阴谋' },
    ],
  },
  {
    id: 'char-witness-xu',
    name: '徐文超',
    role: 'witness',
    identity: '自由摄影师',
    description: '自由摄影师，在西山拍摄自然风光时无意中记录下了与案件相关的关键影像证据。这些照片成为破解西山失踪案的重要突破口。他的故事提醒我们：有时候真相就藏在不经意的瞬间。',
    relatedCases: ['CASE-2016-002'],
    relationships: [
      { targetId: 'char-luowenzhou', type: '证人', description: '为案件提供了关键的影像证据' },
    ],
  },

  // ===== 贩毒网络案 =====
  {
    id: 'char-suspect-zhou',
    name: '周怀信',
    role: 'suspect',
    identity: '商人 / 贩毒中间人',
    description: '表面是燕城本地的普通商人，实则是贩毒网络中的关键中间人，负责燕城地区的分销协调。他的落网撕开了贩毒网络的一角，但更深层的幕后操控者仍然隐藏在暗处。费渡在分析其资金流向时发现，部分资金的最终去向指向了可疑的商业实体。',
    relatedCases: ['CASE-2017-003'],
    relationships: [
      { targetId: 'char-luowenzhou', type: '被追捕', description: '骆闻舟率队将其抓获' },
    ],
  },
]
