// ============================================
// 默读 — 闯关挑战数据（基于原著情节）
// ============================================

export type QuestionType = 'choice' | 'truefalse' | 'reasoning' | 'sorting' | 'connect'

export interface ChoiceOption {
  id: string
  text: string
}

export interface ChatMessage {
  sender: string
  senderId: string
  text: string
  isHint: boolean
}

export interface ChallengeStep {
  id: string
  type: QuestionType
  title: string
  description: string
  question: string
  options?: ChoiceOption[]
  correctAnswer: string
  explanation: string
  hintChatMessages?: ChatMessage[]
  // 排序题
  sortItems?: { id: string; text: string }[]
  correctOrder?: string[]
  // 连线题
  connectData?: {
    left: { id: string; text: string }[]
    right: { id: string; text: string }[]
  }
  correctConnect?: Record<string, string>
}

export interface CaseChallenge {
  caseId: string
  caseName: string
  intro: string
  steps: ChallengeStep[]
}

export const challengesData: CaseChallenge[] = [
  {
    caseId: 'CASE-2016-001',
    caseName: '花市西区抛尸案',
    intro: '花市西区发现被肢解的尸体，受害者为18岁外卖员何忠义。你需要通过问答和推理，跟随骆闻舟的脚步锁定真凶。',
    steps: [
      {
        id: 'step-001-1',
        type: 'choice',
        title: '初步判断',
        description: '花市西区发现被塑料袋包裹的人体残骸，警方需要第一时间确认受害者身份和案件性质。',
        question: '骆闻舟接手案件后，首先通过什么方式锁定了抛尸车辆的排查方向？',
        options: [
          { id: 'a', text: '逐帧排查抛尸路线沿途监控，发现刻意避开卡口的车辆' },
          { id: 'b', text: '在残骸上提取到完整的指纹信息' },
          { id: 'c', text: '有目击者看到了抛尸过程' },
          { id: 'd', text: '受害者身上留有嫌疑人的名片' },
        ],
        correctAnswer: 'a',
        explanation: '骆闻舟带领团队逐帧排查抛尸路线沿途监控，发现一辆刻意避开主要卡口的车辆。车辆的行驶路线显示出极强的反侦查意识，这成为缩小嫌疑人范围的关键突破口。',
      },
      {
        id: 'step-001-2',
        type: 'truefalse',
        title: '心理画像',
        description: '费渡在分析案件时提出了一个独特的观点：凶手的抛尸路线不仅是反侦查，更体现了一种特殊的心理状态。',
        question: '费渡认为凶手的抛尸行为体现的是一种"清理"心态——凶手在心理上并不认为自己在杀人，而是在"处理垃圾"。',
        correctAnswer: 'true',
        explanation: '费渡指出，凶手精心设计的抛尸路线不仅是为了规避侦查，更反映了一种深层的心理机制——凶手在心理上将自己定位为"清理者"，将受害者视为需要被"处理"的对象。这种心理画像帮助骆闻舟理解了凶手的阶层偏见和自恋情结。',
      },
      {
        id: 'step-001-sort',
        type: 'sorting',
        title: '还原侦破过程',
        description: '骆闻舟接手花市抛尸案后，按正确的时间顺序推进了调查。请将以下步骤按正确顺序排列。',
        question: '请按调查推进的先后顺序排列以下步骤：',
        correctAnswer: '',
        explanation: '正确的侦破顺序是：先确认受害者身份（何忠义），再逐帧排查监控锁定可疑车辆，然后通过车辆登记和通话记录锁定嫌疑人赵浩昌，最后在住所检出血迹证据完成定罪。',
        sortItems: [
          { id: 's1', text: 'DNA比对确认受害者为外卖员何忠义' },
          { id: 's2', text: '逐帧排查监控，发现刻意避开卡口的车辆' },
          { id: 's3', text: '通过车辆登记和通话记录锁定律师赵浩昌' },
          { id: 's4', text: '搜查住所检出血迹证据，嫌疑人心理防线崩溃' },
        ],
        correctOrder: ['s1', 's2', 's3', 's4'],
      },
      {
        id: 'step-001-3',
        type: 'reasoning',
        title: '推理：更深的暗线',
        description: '赵浩昌供述后，费渡在旁听时注意到了一个细节——赵浩昌对底层人的蔑视不是普通的偏见，而是一种被"培养"出来的极端思维。同时，赵浩昌的某些行为模式过于"标准"，像是经过精心设计的。',
        question: '费渡暗示赵浩昌的案件背后可能隐藏着什么？',
        options: [
          { id: 'a', text: '赵浩昌是独立犯罪，没有幕后因素' },
          { id: 'b', text: '赵浩昌可能受到了某种力量的"引导"和"塑造"' },
          { id: 'c', text: '赵浩昌是被他人胁迫犯罪的' },
        ],
        correctAnswer: 'b',
        explanation: '费渡敏锐地指出，赵浩昌的行为模式不像是一个独立犯罪者——他的阶层偏见被放大到了病态的程度，犯罪手法冷静到不像是第一次。这暗示有某种力量在背后"培养"和"引导"了他。这个"某种力量"，就是后来追查到的"朗诵者"组织。',
        hintChatMessages: [
          { sender: '费渡', senderId: 'char-feidu', text: '你不觉得奇怪吗？他对那些底层人的蔑视，不像是一般的偏见——更像是被训练出来的。', isHint: false },
          { sender: '骆闻舟', senderId: 'char-luowenzhou', text: '你是说有人故意把他培养成这样？', isHint: false },
          { sender: '费渡', senderId: 'char-feidu', text: '不只是培养。你看他处理尸体的方式——冷静、有条理、没有一丝犹豫。这不是冲动犯罪，这是被"教育"过的。有人在利用他的阶层优越感，把他变成了一把刀。', isHint: true },
        ],
      },
    ],
  },
  {
    caseId: 'CASE-2016-002',
    caseName: '西山少女失踪案',
    intro: '11岁少女曲桐在西山游玩后失踪。调查层层剥开，牵出已故教师多年的性侵丑闻和围绕掩盖真相衍生出的连环犯罪。',
    steps: [
      {
        id: 'step-002-1',
        type: 'choice',
        title: '关键突破口',
        description: '曲桐失踪后，警方在西山展开大规模搜索。但真正的突破口来自一个意想不到的方向。',
        question: '哪个线索将调查方向从"普通失踪"转向了学校内部？',
        options: [
          { id: 'a', text: '郎乔走访同学时发现曲桐对某位"老师"极度恐惧' },
          { id: 'b', text: '在西山发现了曲桐的书包' },
          { id: 'c', text: '有人匿名举报了学校' },
          { id: 'd', text: '曲桐自己打了求救电话' },
        ],
        correctAnswer: 'a',
        explanation: '郎乔在走访曲桐的同学时，多名学生反映曲桐在失踪前表现出对某位"老师"的极度恐惧。这条关键证言将调查方向从"随机失踪"转向了学校内部，最终牵出了已故教师吴广川的惊天丑闻。',
      },
      {
        id: 'step-002-2',
        type: 'truefalse',
        title: '核心真相',
        description: '调查中发现已故教师吴广川生前利用教师身份长期性侵多名女学生。虽然他已经死亡，但他的罪行是整起案件的核心导火索。',
        question: '吴广川虽然已经死亡，但他的罪行直接引发了后续的连锁犯罪。',
        correctAnswer: 'true',
        explanation: '吴广川的罪行是整个案件的根源。曲桐的父亲郭恒在得知女儿遭遇后精神崩溃走上复仇之路；苏筱兰母女与吴广川的纠葛也被翻出；整个社区的"集体沉默"被打破。一个人的恶行，在他死后结出了更多可怕的恶果。',
      },
      {
        id: 'step-002-3',
        type: 'reasoning',
        title: '推理：沉默之网',
        description: '案件告破后，费渡在总结时提出了一个令人不安的观点：这个案件的核心不是某一个人的犯罪，而是一整个社区的"沉默"。当所有人都选择视而不见，黑暗便在沉默中滋长。',
        question: '费渡所说的"沉默之网"指的是什么？',
        options: [
          { id: 'a', text: '只是指嫌疑人拒绝供述' },
          { id: 'b', text: '指整个社区——老师、家长、邻居——都选择对吴广川的罪行视而不见' },
          { id: 'c', text: '指警方的调查不够及时' },
        ],
        correctAnswer: 'b',
        explanation: '"沉默之网"指的是围绕吴广川罪行的集体沉默。学校里的其他老师、知情家长、甚至社区中的成年人——他们中有些人可能察觉到了异常，但都选择了沉默。正是这种集体的"视而不见"，让吴广川的罪行得以持续多年，让曲桐这样的孩子失去了被保护的机会。沉默，本身就是一种共谋。',
        hintChatMessages: [
          { sender: '费渡', senderId: 'char-feidu', text: '这个案件最可怕的不是吴广川——他已经死了。最可怕的是那些活着的人，他们知道，但他们选择了沉默。', isHint: false },
          { sender: '骆闻舟', senderId: 'char-luowenzhou', text: '你是说整个社区都在包庇？', isHint: false },
          { sender: '费渡', senderId: 'char-feidu', text: '不一定是主动包庇。但当一个成年人看到孩子不对劲却选择不问、不管、不说——这种沉默本身就是一种共谋。吴广川不是一个人作恶的，是所有人的沉默给了他继续作恶的空间。', isHint: true },
        ],
      },
    ],
  },
  {
    caseId: 'CASE-2017-003',
    caseName: '贩毒网络案',
    intro: '燕城破获一起大型贩毒案件，牵扯出盘踞多年的地下网络。在毒品供应链中，"朗诵者"的影子若隐若现。',
    steps: [
      {
        id: 'step-003-1',
        type: 'choice',
        title: '案件起因',
        description: '贩毒网络案的起因是一次看似普通的缉毒行动。',
        question: '是什么让骆闻舟意识到这次缉毒行动可能牵扯出更大的网络？',
        options: [
          { id: 'a', text: '缴获的新型毒品成分特殊，不像是普通渠道流通' },
          { id: 'b', text: '现场抓获了知名毒贩' },
          { id: 'c', text: '有人匿名提供了情报' },
          { id: 'd', text: '毒品包装上有特殊标记' },
        ],
        correctAnswer: 'a',
        explanation: '例行缉毒行动中缴获的新型毒品，成分分析显示来源极为特殊，不像是普通渠道流通。骆闻舟凭借丰富的经验敏锐地意识到，这种特殊来源的毒品背后可能隐藏着一个规模更大的供应链。',
      },
      {
        id: 'step-003-2',
        type: 'truefalse',
        title: '资金追踪',
        description: '费渡在分析毒品交易资金流向时，发现部分资金经过多层洗白后流向了几个看似合法的商业实体。',
        question: '费渡发现这些商业实体的运作模式与"朗诵者"组织的已知特征高度吻合。',
        correctAnswer: 'true',
        explanation: '费渡追踪资金流向后发现，部分涉案资金经过多层洗白，最终流向了几个看似合法的商业实体。这些实体的运作模式——单线联系、层级隔离、合法外壳——与"朗诵者"组织的已知特征高度吻合。这暗示贩毒网络可能只是朗诵者用来洗钱和控制人心的工具之一。',
      },
      {
        id: 'step-003-3',
        type: 'reasoning',
        title: '推理：消失的顶层',
        description: '收网行动成功后，费渡在复盘时注意到了一个令人不安的细节——贩毒网络的最顶层关键人物在收网前就已经"消失"了。这不是巧合。',
        question: '关键人物提前消失说明了什么？',
        options: [
          { id: 'a', text: '他们只是运气好，提前离开了' },
          { id: 'b', text: '网络中有人通风报信，或者组织本身的预警机制在运作' },
          { id: 'c', text: '骆闻舟的行动计划泄露了' },
        ],
        correctAnswer: 'b',
        explanation: '关键人物在收网前精确"消失"，说明两种可能：要么网络中有内鬼通风报信，要么"朗诵者"组织本身就有完善的预警机制。无论哪种，都说明这个组织的根基远比想象中深厚——它不仅在运作，而且在自我保护。骆闻舟意识到，他们抓到的可能只是组织故意暴露的"外围"。',
        hintChatMessages: [
          { sender: '费渡', senderId: 'char-feidu', text: '你有没有注意到，收网的时候，最上面的几个人全都不在？', isHint: false },
          { sender: '骆闻舟', senderId: 'char-luowenzhou', text: '我注意到了。可能是巧合。', isHint: false },
          { sender: '费渡', senderId: 'char-feidu', text: '三个人同时"巧合"地消失？这不是巧合。要么有人通风报信，要么这个组织自己有预警系统。无论哪种——我们抓到的可能只是他们想让我们抓到的。', isHint: true },
        ],
      },
    ],
  },
  {
    caseId: 'CASE-2017-004',
    caseName: '连环失踪案',
    intro: '燕城多名与旧案相关的人员接连失踪，费渡发现这些事件背后隐藏着同一只手——有人在实施一场跨越多年的精密复仇。',
    steps: [
      {
        id: 'step-004-1',
        type: 'choice',
        title: '发现联系',
        description: '多起失踪事件接连发生，表面上毫无关联。但费渡在深入分析后发现了关键联系。',
        question: '费渡发现所有失踪者之间的共同点是什么？',
        options: [
          { id: 'a', text: '他们都与十多年前的同一件"旧事"有关' },
          { id: 'b', text: '他们都住在同一个小区' },
          { id: 'c', text: '他们都是同一公司的人' },
          { id: 'd', text: '他们都收到过威胁信' },
        ],
        correctAnswer: 'a',
        explanation: '费渡通过深入调查发现，所有看似无关的失踪者都与十多年前的同一件"旧事"有关联。那件旧事被刻意掩埋多年，如今有人要让它重见天日——用一种极端的方式。这不是巧合，而是一场精心策划了十几年的复仇。',
      },
      {
        id: 'step-004-2',
        type: 'truefalse',
        title: '复仇者画像',
        description: '调查中发现复仇者寄出的匿名信件措辞古典而优雅，字里行间引用了多部文学名著。',
        question: '复仇者的行为特征表明他是一个冲动行事、不计后果的人。',
        correctAnswer: 'false',
        explanation: '复仇者的行为恰恰相反——信件措辞古典优雅、每一步计划精密如棋局、十几年隐忍等待时机。这不是冲动犯罪，而是一个极度耐心、有文化素养、精心策划的复仇者。他自比为执行天意的使者，将复仇变成了一场"仪式"。',
      },
      {
        id: 'step-004-3',
        type: 'reasoning',
        title: '推理：棋子与棋手',
        description: '费渡追查发现复仇者使用的部分资源和信息渠道远超个人能力范围。一个有个人复仇动机的人，为什么会与"朗诵者"组织产生交集？',
        question: '最合理的解释是什么？',
        options: [
          { id: 'a', text: '复仇者就是朗诵者的核心成员' },
          { id: 'b', text: '朗诵者发现了复仇者的仇恨，主动为其提供了"工具"和"资源"' },
          { id: 'c', text: '复仇者在不知情的情况下使用了朗诵者的资源' },
        ],
        correctAnswer: 'b',
        explanation: '最可能的解释是朗诵者组织发现了这个心怀仇恨的人，并主动为其提供了复仇的"工具"和"资源"。复仇者以为自己在独立行动，实际上已经成了组织棋盘上的一颗棋子。正如费渡所说："他们不需要创造仇恨，只需要在合适的时机，给合适的人递上一把刀。"',
        hintChatMessages: [
          { sender: '骆闻舟', senderId: 'char-luowenzhou', text: '这个人的复仇动机是真的，但他手里的资源来源又指向朗诵者。怎么解释？', isHint: false },
          { sender: '费渡', senderId: 'char-feidu', text: '你想，如果有人找到你，告诉你他能帮你复仇——在你最渴望报复的时候，你会拒绝吗？', isHint: true },
          { sender: '骆闻舟', senderId: 'char-luowenzhou', text: '所以朗诵者是……', isHint: false },
          { sender: '费渡', senderId: 'char-feidu', text: '提供了一把刀。复仇者以为自己在独立行动，但他手里的刀、他脚下的路，都是别人铺好的。这才是朗诵者最可怕的地方。', isHint: true },
        ],
      },
    ],
  },
  {
    caseId: 'CASE-2017-005',
    caseName: '朗诵者案',
    intro: '所有线索最终指向同一个方向——"朗诵者"。这个以文学为密码、以人命为棋子的神秘组织，隐藏在燕城最深处的暗网之中。这是最终的追查。',
    steps: [
      {
        id: 'step-005-1',
        type: 'choice',
        title: '密码破译',
        description: '费渡在分析所有案件时发现，每个案件中都出现了特定的文学引用，这些引用构成了一套密码体系。',
        question: '朗诵者使用文学引用作为密码的目的是什么？',
        options: [
          { id: 'a', text: '在组织成员之间传递指令而不被外界察觉' },
          { id: 'b', text: '炫耀组织的文化素养' },
          { id: 'c', text: '给警方留下误导线索' },
          { id: 'd', text: '记录组织的犯罪历史' },
        ],
        correctAnswer: 'a',
        explanation: '文学引用构成了朗诵者组织内部的通讯密码。每个案件对应的文学作品不是巧合，而是组织用来标记行动指令和身份标记的暗号。这种通讯方式极其隐蔽——即使被截获，也只会被认为是普通的文学讨论。',
      },
      {
        id: 'step-005-2',
        type: 'truefalse',
        title: '组织特征',
        description: '通过汇总所有案件的线索，费渡整理出了朗诵者组织的推测架构。调查显示该组织的创立时间远早于所有人的预期。',
        question: '朗诵者组织是一个近期才成立的新兴犯罪组织。',
        correctAnswer: 'false',
        explanation: '朗诵者的创立时间远早于预期——这意味着它已经深深扎根在燕城的暗处多年。组织的长期存在说明它有着极其稳固的结构和运作模式。这也解释了为什么前几起案件中都能发现它的痕迹——它一直在运作，一直在利用人性弱点制造犯罪。',
      },
      {
        id: 'step-005-connect',
        type: 'connect',
        title: '案件关联分析',
        description: '费渡在整理所有案件时，发现每起案件背后都对应着一种被利用的人性弱点。朗诵者正是通过精准识别并放大这些弱点，将普通人变成了犯罪工具。请将每起案件与其揭示的人性主题进行连线。',
        question: '将案件与朗诵者利用的核心人性弱点连线：',
        correctAnswer: '',
        explanation: '每起案件都是朗诵者精心设计的"实验"——花市抛尸案利用了赵浩昌的阶层偏见与蔑视，西山失踪案利用了沉默之网中众人的冷漠与恐惧，贩毒网络案利用了周怀信等人的贪婪，连环失踪案利用了复仇者的刻骨仇恨。当四起案件拼在一起，朗诵者的全貌终于浮现。',
        connectData: {
          left: [
            { id: 'c1', text: '花市西区抛尸案' },
            { id: 'c2', text: '西山少女失踪案' },
            { id: 'c3', text: '贩毒网络案' },
            { id: 'c4', text: '连环失踪案' },
          ],
          right: [
            { id: 't1', text: '沉默中的冷漠与恐惧' },
            { id: 't2', text: '仇恨驱动的精密复仇' },
            { id: 't3', text: '阶层偏见与人性蔑视' },
            { id: 't4', text: '利益驱使的贪婪' },
          ],
        },
        correctConnect: { c1: 't3', c2: 't1', c3: 't4', c4: 't2' },
      },
      {
        id: 'step-005-3',
        type: 'reasoning',
        title: '终极推理：真相的核心',
        description: '所有线索汇聚。费渡的身世与朗诵者组织有着深层的渊源——他成长的家族、他童年的经历、他对黑暗的独特理解，都与这个组织密不可分。骆闻舟意识到，要彻底揭开朗诵者的面纱，费渡不仅是帮手，更是关键。',
        question: '费渡在整个追查中扮演的真正角色是什么？',
        options: [
          { id: 'a', text: '一个偶然卷入案件的旁观者' },
          { id: 'b', text: '连接光明与黑暗的桥梁——他的身世就是解开谜团的钥匙' },
          { id: 'c', text: '朗诵者安插在警方身边的卧底' },
        ],
        correctAnswer: 'b',
        explanation: '费渡从来不是一个旁观者。他的身世、他的家族、他与黑暗的共生关系——这些都是解开朗诵者之谜的最后拼图。他选择站在光明一侧，用自己的方式与黑暗对峙。他不是卧底，也不是无辜的卷入者——他是一个主动选择光明的人，用自己的黑暗来照亮真相。这正是《默读》最核心的主题：在沉默中阅读黑暗，在黑暗中寻找光明。',
        hintChatMessages: [
          { sender: '骆闻舟', senderId: 'char-luowenzhou', text: '费渡，我需要你告诉我实话。你和朗诵者之间，到底是什么关系？', isHint: false },
          { sender: '费渡', senderId: 'char-feidu', text: '……你想知道什么？', isHint: false },
          { sender: '骆闻舟', senderId: 'char-luowenzhou', text: '一切。', isHint: false },
          { sender: '费渡', senderId: 'char-feidu', text: '我的家族、我的过去、我童年见过的每一个人——都和这个组织有关。我来到你身边，不是因为巧合。但我选择帮你，也不是因为任何人的安排。这是我自己的选择。', isHint: true },
          { sender: '骆闻舟', senderId: 'char-luowenzhou', text: '我知道。所以我问你，不是因为怀疑你——是因为没有你，这个案子永远不会有真相。', isHint: true },
        ],
      },
    ],
  },
]

export function getChallengeByCaseId(caseId: string): CaseChallenge | undefined {
  return challengesData.find(c => c.caseId === caseId)
}
