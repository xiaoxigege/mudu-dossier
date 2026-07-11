// ============================================
// 默读 — 闯关挑战数据
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
    caseName: '于连案',
    intro: '燕城大学学生于连从教学楼顶层坠落。初步认定为自杀，但骆闻舟在复查中发现了疑点。你需要通过问答和推理，还原案件真相。',
    steps: [
      {
        id: 'step-001-1',
        type: 'choice',
        title: '初步判断',
        description: '于连从教学楼顶层坠落，现场初步勘查后，警方需要判断案件性质。',
        question: '骆闻舟在复查案卷时，首先发现的疑点是什么？',
        options: [
          { id: 'a', text: '坠落轨迹不符合自杀特征' },
          { id: 'b', text: '现场有陌生人的指纹' },
          { id: 'c', text: '于连的遗书有伪造痕迹' },
          { id: 'd', text: '监控显示有人尾随于连' },
        ],
        correctAnswer: 'a',
        explanation: '骆闻舟通过物理分析发现坠落轨迹异常——如果是自杀，坠落点应该更靠近楼体，但实际落点偏远处，说明可能存在外力作用。',
      },
      {
        id: 'step-001-2',
        type: 'truefalse',
        title: '线索甄别',
        description: '在调查过程中，警方提取了楼顶护栏处的微量血迹样本。',
        question: '经DNA比对，楼顶护栏上的血迹属于于连本人。',
        correctAnswer: 'false',
        explanation: '护栏处的血迹DNA不属于于连，而是属于第三方。这一关键证据证明了有其他人曾在案发现场受伤，直接推翻了自杀的结论。',
      },
      {
        id: 'step-001-sort',
        type: 'sorting',
        title: '还原调查过程',
        description: '骆闻舟接手案件后，按正确的时间顺序推进了调查。请将以下步骤按正确顺序排列。',
        question: '请按调查推进的先后顺序排列以下步骤：',
        correctAnswer: '',
        explanation: '正确的调查顺序是：先复查案卷发现坠落轨迹异常，再从现场提取第三方血迹DNA，然后排查嫌疑人并分析供述矛盾，最后在于连日记中发现"有人告诉我"的关键线索，从而揭示幕后操控者的存在。',
        sortItems: [
          { id: 's1', text: '复查案卷，发现坠落轨迹异常' },
          { id: 's2', text: '提取楼顶护栏第三方血迹DNA' },
          { id: 's3', text: '排查嫌疑人，分析供述矛盾' },
          { id: 's4', text: '在于连日记中发现"有人告诉我"' },
        ],
        correctOrder: ['s1', 's2', 's3', 's4'],
      },
      {
        id: 'step-001-3',
        type: 'reasoning',
        title: '推理：幕后黑手',
        description: '案件告破后，费渡在分析案件时注意到了一个不寻常的细节——于连的日记中反复提到"有人告诉我该怎么做"，但于连从未明确说出这个人是谁。同时，赵某某的供述中有一个时间线与费渡掌握的信息矛盾。',
        question: '根据以上线索，你认为案件的真相是什么？',
        options: [
          { id: 'a', text: '赵某某是独立作案，没有其他参与者' },
          { id: 'b', text: '有人暗中操控了赵某某的行为' },
          { id: 'c', text: '于连确实是自杀，赵某某只是见死不救' },
        ],
        correctAnswer: 'b',
        explanation: '于连日记中的"有人告诉我"暗示他被他人引导和操控。赵某某供述的时间线矛盾说明他可能在替某人隐瞒。这是一个精心设计的局——真正的凶手隐藏在幕后，通过心理操控让赵某某成为了工具。',
        hintChatMessages: [
          { sender: '费渡', senderId: 'char-feidu', text: '你有没有注意到于连日记里那句话？"有人告诉我该怎么做"——这不是普通的求助，这是被操控的痕迹。', isHint: false },
          { sender: '骆闻舟', senderId: 'char-luowenzhou', text: '你是说有人在背后指使？', isHint: false },
          { sender: '费渡', senderId: 'char-feidu', text: '不止如此。赵某某的供述太"完美"了，完美到像是排练过的。真正心虚的人不会记得那么清楚——除非有人在帮他准备说辞。', isHint: true },
        ],
      },
    ],
  },
  {
    caseId: 'CASE-2016-002',
    caseName: '洛丽塔案',
    intro: '少女苏某失踪多日，家人报案后引起警方重视。随着调查深入，一条针对未成年人的隐秘犯罪链条逐渐浮出水面。',
    steps: [
      {
        id: 'step-002-1',
        type: 'choice',
        title: '失踪线索',
        description: '苏某失踪后，警方在调查其手机时发现了一些关键线索。',
        question: '苏某失踪前最关键的线索是什么？',
        options: [
          { id: 'a', text: '与一名年长男子的频繁加密聊天' },
          { id: 'b', text: '一条求救短信发送记录' },
          { id: 'c', text: '银行卡的大额转账记录' },
          { id: 'd', text: '社交媒体上的异常动态' },
        ],
        correctAnswer: 'a',
        explanation: '苏某手机中恢复的加密聊天记录显示，她在失踪前与一名年长男子频繁联系。该男子以"关心"和"保护"为名逐步接近苏某，展现了典型的心理操控模式。',
      },
      {
        id: 'step-002-2',
        type: 'truefalse',
        title: '犯罪网络',
        description: '调查中发现李某并非单独行动，银行转账记录显示他定期向多个账户汇款。',
        question: '李某是单独作案的犯罪分子，没有同伙或组织。',
        correctAnswer: 'false',
        explanation: '李某的银行转账记录揭示了一个更大的犯罪网络。他只是一个中间人，背后还有更高层级的人物在操控整个链条。这些定期转账疑似是交易记录，指向一个系统性的犯罪组织。',
      },
      {
        id: 'step-002-3',
        type: 'reasoning',
        title: '推理：幕后人物',
        description: '案件告破后，骆闻舟发现李某的供述中有一个关键信息被刻意回避——他从未提及"上线"是谁。同时，费渡注意到李某使用的操控手法与于连案中"幕后操控者"的手法惊人相似。',
        question: '两起案件之间的联系说明了什么？',
        options: [
          { id: 'a', text: '两起案件只是巧合，手法相似是偶然' },
          { id: 'b', text: '两起案件背后可能有同一个组织在操控' },
          { id: 'c', text: '李某从于连案中学到了操控手法' },
        ],
        correctAnswer: 'b',
        explanation: '两起案件中"幕后操控"的手法高度一致——都是通过心理操控让他人成为工具，都隐藏在暗处不直接出手。这强烈暗示存在一个系统性的犯罪组织，他们以类似的方式在不同场景中制造犯罪。这个组织，就是后来被追查到的一切暗线的核心——"朗诵者"。',
        hintChatMessages: [
          { sender: '骆闻舟', senderId: 'char-luowenzhou', text: '这两个案子的操控手法太像了。都是躲在后面不出手，让别人当工具。', isHint: false },
          { sender: '费渡', senderId: 'char-feidu', text: '不只是"像"。你看李某接近苏某的方式——先建立信任，再制造依赖，最后切断退路。这和于连案中"那个人"对于连做的事如出一辙。', isHint: true },
          { sender: '骆闻舟', senderId: 'char-luowenzhou', text: '你是说……同一个组织？', isHint: false },
          { sender: '费渡', senderId: 'char-feidu', text: '我还没法确定。但这种模式化的操控手法，不是个人能发明出来的——这是被训练出来的。', isHint: true },
        ],
      },
    ],
  },
  {
    caseId: 'CASE-2017-003',
    caseName: '麦克白案',
    intro: '燕城知名企业家在别墅中被发现死亡，现场伪装成意外事故。法医鉴定为他杀后，一场关于野心、贪婪和精心策划的谋杀逐渐揭露。',
    steps: [
      {
        id: 'step-003-1',
        type: 'choice',
        title: '死因突破',
        description: '案件初期，现场看起来像是意外事故。但法医陆嘉在尸检中有了关键发现。',
        question: '陆嘉的哪项发现将案件性质从"意外"转为"谋杀"？',
        options: [
          { id: 'a', text: '受害者体内检出罕见毒素' },
          { id: 'b', text: '后脑有被钝器击打的痕迹' },
          { id: 'c', text: '死者指甲下有挣扎留下的皮屑' },
          { id: 'd', text: '血液中有大量酒精残留' },
        ],
        correctAnswer: 'a',
        explanation: '陆嘉在尸检中检出了罕见毒素，这种毒素不会自然产生，只能通过人为投毒获得。这一发现直接推翻了"意外死亡"的结论，将案件定性为精心策划的谋杀。',
      },
      {
        id: 'step-003-2',
        type: 'truefalse',
        title: '动机分析',
        description: '调查发现，受害者的遗嘱在近期被修改过，受益人发生了变更。同时，一份巨额保险单的受益人也是同一个人。',
        question: '修改遗嘱和保险受益人的行为，说明嫌疑人有明确的谋财动机。',
        correctAnswer: 'true',
        explanation: '遗嘱修改时间和保险受益人变更时间与案发时间高度吻合，且受益人集中指向同一人。这种经济利益的集中变动是谋杀案中最典型的动机之一——正如麦克白被野心驱使，嫌疑人也在巨额财富的诱惑下走上了不归路。',
      },
      {
        id: 'step-003-3',
        type: 'reasoning',
        title: '推理：手法关联',
        description: '费渡在分析此案时发现了一个令人不安的细节：凶手使用的罕见毒素来源极为特殊，普通渠道根本无法获得。而这种毒素的获取方式，与"朗诵者"组织已知的资源网络存在交集。同时，凶手"将谋杀伪装成意外"的手法，也与此前案件的幕后操控模式一致。',
        question: '综合以上信息，此案最可能是什么性质？',
        options: [
          { id: 'a', text: '一起独立的商业谋杀案' },
          { id: 'b', text: '朗诵者组织利用商业纠纷制造的"完美犯罪"' },
          { id: 'c', text: '凶手模仿了朗诵者的手法' },
        ],
        correctAnswer: 'b',
        explanation: '毒素来源指向朗诵者的资源网络，伪装手法与其一贯模式一致。这很可能不是一起独立的谋杀——朗诵者组织可能利用了已有的商业纠纷，为凶手提供了"工具"（毒素）和"方法"（伪装意外），将一场普通的商业谋杀变成了他们的又一件"作品"。',
        hintChatMessages: [
          { sender: '费渡', senderId: 'char-feidu', text: '这种毒素我在一份资料里见过。来源非常特殊，不是随便谁都能拿到的。', isHint: false },
          { sender: '骆闻舟', senderId: 'char-luowenzhou', text: '你的意思是……', isHint: false },
          { sender: '费渡', senderId: 'char-feidu', text: '我查了一下朗诵者已知的资源渠道。有一条线，恰好能触及这种特殊物资。而且你不觉得吗？"把谋杀伪装成意外"——这正是他们最擅长的。', isHint: true },
        ],
      },
    ],
  },
  {
    caseId: 'CASE-2017-004',
    caseName: '基督山伯爵案',
    intro: '燕城接连发生看似无关的"意外"事件。费渡敏锐地察觉到这些事件之间存在隐秘联系——有人正在实施一场跨越多年的精密复仇。',
    steps: [
      {
        id: 'step-004-1',
        type: 'choice',
        title: '发现联系',
        description: '多起"意外"事件接连发生，表面上毫无关联。但费渡在分析后发现了关键联系。',
        question: '费渡发现这些"意外"事件之间的联系是什么？',
        options: [
          { id: 'a', text: '所有受害者都曾参与多年前的同一件事' },
          { id: 'b', text: '所有事件发生在同一区域' },
          { id: 'c', text: '所有受害者都是同一公司的人' },
          { id: 'd', text: '所有事件使用了同一种凶器' },
        ],
        correctAnswer: 'a',
        explanation: '费渡通过深入调查发现，所有看似意外的受害者都与多年前的同一事件有关联。这不是巧合——有人在系统性地对这些人进行报复，如同基督山伯爵一般，逐一向曾经的"仇人"讨债。',
      },
      {
        id: 'step-004-2',
        type: 'truefalse',
        title: '复仇者画像',
        description: '调查中发现复仇者寄出的挑衅信，措辞古典而优雅，引用了多部文学名著。',
        question: '复仇者的行为特征表明他/她是一个冲动行事的人。',
        correctAnswer: 'false',
        explanation: '复仇者的行为恰恰相反——信件措辞古典优雅、每一步计划精密如棋局、多年隐忍等待时机。这不是冲动犯罪，而是一个极度耐心、有文化素养、精心策划的复仇者。这种"优雅"本身就是其犯罪美学的一部分。',
      },
      {
        id: 'step-004-3',
        type: 'reasoning',
        title: '推理：复仇与组织',
        description: '随着调查推进，骆闻舟和费渡发现复仇者的资源来源与朗诵者组织存在交叉。但复仇者的动机又明显是个人化的——他/她确实在为自己遭受的不公复仇。这产生了一个矛盾：一个有个人复仇动机的人，为什么会与朗诵者组织产生交集？',
        question: '最合理的解释是什么？',
        options: [
          { id: 'a', text: '复仇者就是朗诵者的核心成员' },
          { id: 'b', text: '朗诵者利用了复仇者的个人仇恨，为其提供了资源' },
          { id: 'c', text: '复仇者在不知情的情况下使用了朗诵者的资源' },
        ],
        correctAnswer: 'b',
        explanation: '最可能的解释是朗诵者组织发现了这个心怀仇恨的人，并主动为其提供了复仇的"工具"和"资源"。组织这样做是为了自己的目的——可能是制造混乱，可能是消除某些人，也可能是在测试某种模式。复仇者以为自己在独立行动，实际上已经成为了朗诵者棋盘上的一颗棋子。',
        hintChatMessages: [
          { sender: '骆闻舟', senderId: 'char-luowenzhou', text: '这个人的复仇动机是真的，但资源来源又指向朗诵者。怎么解释这个矛盾？', isHint: false },
          { sender: '费渡', senderId: 'char-feidu', text: '也许不矛盾。你想，如果有人找到你，告诉你他能帮你复仇——在你最渴望报复的时候，你会拒绝吗？', isHint: true },
          { sender: '骆闻舟', senderId: 'char-luowenzhou', text: '所以朗诵者是……', isHint: false },
          { sender: '费渡', senderId: 'char-feidu', text: '提供了一把刀。复仇者以为自己在独立行动，但他手里的刀、他脚下的路，都是别人铺好的。这才是朗诵者最可怕的地方——他们不需要创造仇恨，只需要在合适的时机，给合适的人递上一把刀。', isHint: true },
        ],
      },
    ],
  },
  {
    caseId: 'CASE-2017-005',
    caseName: '朗读者案',
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
        explanation: '文学引用构成了朗诵者组织内部的通讯密码。每个案件对应的文学作品不是巧合，而是组织用来标记行动指令的暗号。这种通讯方式极其隐蔽——即使被截获，也只会被认为是普通的文学引用，不会暴露组织的真实意图。',
      },
      {
        id: 'step-005-2',
        type: 'truefalse',
        title: '组织特征',
        description: '通过汇总所有案件的线索，费渡整理出了朗诵者组织的推测架构。调查显示该组织的创立时间远早于所有人的预期。',
        question: '朗诵者组织是一个近期才成立的新兴犯罪组织。',
        correctAnswer: 'false',
        explanation: '朗诵者的创立时间远早于预期——这意味着它已经深深扎根在燕城的暗处多年。组织的长期存在说明它有着极其稳固的结构和运作模式，不是轻易能够瓦解的。这也解释了为什么前几起案件中都能发现它的痕迹——它一直在运作。',
      },
      {
        id: 'step-005-connect',
        type: 'connect',
        title: '案件关联分析',
        description: '费渡在整理所有案件时，发现每起案件背后都对应着一种被利用的人性弱点。朗诵者正是通过精准识别并放大这些弱点，将普通人变成了犯罪工具。请将每起案件与其揭示的人性主题进行连线。',
        question: '将案件与朗诵者利用的核心人性弱点连线：',
        correctAnswer: '',
        explanation: '每起案件都是朗诵者精心设计的"实验"——于连案利用了阶层攀升的野心，洛丽塔案利用了扭曲的欲望与控制，麦克白案利用了权力野心驱动的谋杀，基督山伯爵案利用了仇恨驱动的精密复仇。当四起案件拼在一起，朗诵者的全貌终于浮现：它不是一个普通的犯罪组织，而是一个以人性弱点为棋盘的黑暗棋局。',
        connectData: {
          left: [
            { id: 'c1', text: '于连案' },
            { id: 'c2', text: '洛丽塔案' },
            { id: 'c3', text: '麦克白案' },
            { id: 'c4', text: '基督山伯爵案' },
          ],
          right: [
            { id: 't1', text: '欲望的扭曲与控制' },
            { id: 't2', text: '仇恨驱动的精密复仇' },
            { id: 't3', text: '阶层攀升的致命野心' },
            { id: 't4', text: '权力野心催生谋杀' },
          ],
        },
        correctConnect: { c1: 't3', c2: 't1', c3: 't4', c4: 't2' },
      },
      {
        id: 'step-005-3',
        type: 'reasoning',
        title: '终极推理：真相的核心',
        description: '所有线索汇聚。费渡的身世与朗诵者组织有着深层的渊源——他成长的家族、他童年的经历、他对黑暗的独特理解，都与这个组织密不可分。骆闻舟意识到，要彻底揭开朗诵者的面纱，费渡不仅是帮手，更是关键。但这也意味着费渡必须直面自己最不愿触碰的过去。',
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
