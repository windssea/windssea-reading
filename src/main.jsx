import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const slides = [
  {
    eyebrow: '课堂导入',
    title: '阅读理解答题技巧',
    subtitle: '给小学生的一套清楚、好记、能落笔的方法',
    type: 'title',
    chips: ['读懂文章', '找准依据', '规范表达'],
    goals: ['先看原文', '再分题型', '最后写完整'],
    note:
      '这是整套课件的封面。开场时可以先告诉学生：阅读理解不是靠猜，也不是靠背答案，而是有步骤、有方法。今天我们会把题目拆开看，学会回到原文找依据，再把答案写完整。'
  },
  {
    eyebrow: '语文阅读理解',
    title: '把题做对，不靠感觉',
    subtitle: '一套能落到笔上的阅读理解答题方法',
    type: 'cover',
    goals: ['先读懂文章', '再看清题目', '最后规范作答'],
    note:
      '今天这节课，我们不讲玄乎的“语感”，而是把阅读理解拆成一套能操作的方法。很多同学失分，不是完全看不懂文章，而是没有按步骤找答案，想到哪写到哪。我们今天要记住一个核心：答案先在原文里，再用自己的话整理出来。'
  },
  {
    eyebrow: '本课目标',
    title: '学完你要会这 5 件事',
    type: 'checklist',
    items: [
      ['会读题', '知道题目到底问内容、结构、语言、手法，还是主旨。'],
      ['会定位', '能回到原文找到答题区间，不凭空想象。'],
      ['会分文体', '记叙文、说明文、议论文用不同抓手。'],
      ['会套公式', '遇到常见题型能按步骤组织答案。'],
      ['会检查', '让答案完整、有条理、有关键词。']
    ],
    note:
      '这一页先给学生建立目标感。我们不是背一堆术语，而是学会五个动作：读题、定位、分文体、套公式、检查。只要每道题都按这五个动作走，阅读理解就会从“碰运气”变成“有章法”。'
  },
  {
    eyebrow: '总原则',
    title: '阅读理解的第一句话：答案在原文里',
    type: 'quote',
    quote: '先找原文依据，再整理成答案。',
    blocks: [
      ['不要一上来就写', '先通读全文，知道文章讲了什么。'],
      ['不要离开文本发挥', '题目问的是这篇文章，不是你的自由作文。'],
      ['不要只写术语', '术语后面必须接具体内容。']
    ],
    note:
      '这页是全课的地基。很多学生喜欢“凭感觉”，比如问句子作用，直接写“承上启下”，但不说承接了什么、引出了什么。阅读题需要证据，证据来自原文。原文没有的，不要硬写；原文有的，要提炼清楚。'
  },
  {
    eyebrow: '总流程',
    title: '六步答题法：从读懂到写对',
    type: 'process',
    steps: [
      ['看标题', '判断对象、文体、线索或主题暗示'],
      ['通全文', '抓主要内容、结构层次、作者情感'],
      ['审题干', '圈关键词，看清问法和分值'],
      ['回原文', '找答题区间、中心句、关键词'],
      ['组答案', '提取、压缩、概括、分点表达'],
      ['再检查', '是否完整、准确、紧扣文本']
    ],
    note:
      '这里要让学生把流程记下来。特别强调两点：第一，读题之后一定要回原文；第二，答案写完要检查有没有分点。分值常常就是提示，三分题通常至少有两到三个要点。'
  },
  {
    eyebrow: '基础口诀',
    title: '四个“不离”：理解词句的保险绳',
    type: 'cards',
    cards: [
      ['字不离词', '解释一个字，要放回词语里看。'],
      ['词不离句', '解释一个词，要看它在句中的意思。'],
      ['句不离段', '理解一个句子，要看前后语境。'],
      ['段不离文', '分析一段话，要服务全文中心。']
    ],
    note:
      '词句理解题最容易脱离语境。比如一个词本来有很多意思，但在文章里只能取其中一个。四个不离就是提醒学生：越小的单位，越要放回大的语境里看。'
  },
  {
    eyebrow: '记叙文',
    title: '记叙文先抓“谁发生了什么”',
    type: 'split',
    leftTitle: '六要素',
    left: ['时间', '地点', '人物', '起因', '经过', '结果'],
    rightTitle: '一句话概括',
    formula: '谁 + 在什么情况下 + 做了什么 + 结果怎样',
    example: '小明在暴雨天帮助同学送伞，表现出乐于助人的品质。',
    note:
      '记叙文的第一层任务是把故事讲清楚。六要素不是每篇都平均重要，但起因、经过、结果通常是主体。概括内容时，不要把细节全抄进去，要抓主干。'
  },
  {
    eyebrow: '概括填图',
    title: '情节图、心情图：先看例子，再写答案',
    type: 'process',
    steps: [
      ['读例子', '看已给答案的主语、字数和表达格式'],
      ['找位置', '根据前后内容，定位对应段落'],
      ['删细节', '删掉修饰、解释、例子，留下主干'],
      ['合信息', '把人物、事件、结果或变化合成短语'],
      ['仿格式', '让答案和例子保持同一表达方式']
    ],
    note:
      '新增材料里特别强调“读懂例子”。填思维导图不是随便概括，而是要和表格里已有答案保持同一种格式。比如前面都是四字短语，后面也尽量用四字短语；前面主语是“我”，后面就不要突然换成“事情”。'
  },
  {
    eyebrow: '记叙文线索',
    title: '抓住线索，文章就不散',
    type: 'matrix',
    columns: ['线索类型', '怎么找', '答题重点'],
    rows: [
      ['物线', '反复出现的物品', '物品串起事件和情感'],
      ['人线', '主要人物或人物特征', '围绕人物展开故事'],
      ['事线', '中心事件', '事件推动情节发展'],
      ['情感线', '情感变化词', '由“不喜欢”到“敬佩”等变化'],
      ['时空线', '时间词、地点词', '按时间推进或空间转换']
    ],
    note:
      '线索题要避免只写“以某某为线索”。还要补一句：它串联了哪些内容，起到了什么作用。常见作用是使文章条理清楚、结构完整、主旨鲜明。'
  },
  {
    eyebrow: '记叙顺序',
    title: '顺叙、倒叙、插叙：问作用就这样答',
    type: 'three',
    items: [
      ['顺叙', '按事情发展顺序写', '条理清楚，脉络分明'],
      ['倒叙', '先写结果或后发生的事', '设置悬念，吸引读者，突出重点'],
      ['插叙', '中断主线，插入相关内容', '补充情节，丰富人物，为下文铺垫']
    ],
    note:
      '这类题目先判断顺序，再说作用。尤其是插叙，常考“能不能删”。一般不能删，因为它补充了背景、解释了原因，或者让人物形象更丰满。'
  },
  {
    eyebrow: '句段作用',
    title: '看到“作用”，先分两边：结构 + 内容',
    type: 'compare',
    leftTitle: '结构上',
    left: ['开头：总领全文、引出下文、设置悬念', '中间：承上启下、推动情节', '结尾：总结全文、首尾照应'],
    rightTitle: '内容上',
    right: ['点明题目', '渲染气氛', '表现人物', '深化主题', '表达情感'],
    formula: '结构上：……；内容上：……。',
    note:
      '句段作用题千万不要只答一个词。比如“承上启下”后要说清楚：承接上文什么内容，引出下文什么内容。内容上要结合文章具体主题，不能泛泛地写“突出中心”。'
  },
  {
    eyebrow: '人物形象',
    title: '分析人物：事件 + 描写',
    type: 'cards',
    cards: [
      ['典型事件', '人物做了什么，体现什么品质。'],
      ['语言描写', '他说了什么，表现什么心理或性格。'],
      ['动作描写', '他怎么做，表现什么态度或品质。'],
      ['心理/神态', '他怎么想、什么表情，揭示内心。'],
      ['外貌描写', '身份、处境、精神状态。'],
      ['侧面描写', '别人怎么评价，环境如何烘托。']
    ],
    note:
      '人物题要教学生用“证据加性格”的方式回答。不要只写“他很善良”，要写“从他冒雨给同学送伞这件事可以看出，他关心他人、乐于助人”。'
  },
  {
    eyebrow: '主旨概括',
    title: '主旨不是“故事内容”，而是“作者想表达什么”',
    type: 'formula',
    formula: '通过……，表现/赞美/批判/揭示了……，表达了作者……的感情。',
    exampleTitle: '例',
    example: '通过父亲雨中送伞的故事，赞美了父爱的深沉细腻，表达了作者对父亲的感激与怀念。',
    tips: ['先概括内容', '再上升到情感或道理', '抓开头、结尾、议论抒情句'],
    note:
      '主旨题要提醒学生：不能只写文章讲了什么，还要写作者借这件事表达什么。记叙文常见关键词有赞美、歌颂、怀念、批判、揭示、表达。'
  },
  {
    eyebrow: '说明文',
    title: '说明文重点：对象、特征、顺序、方法、语言',
    type: 'radial',
    center: '说明文',
    petals: [
      ['说明对象', '文章介绍什么'],
      ['对象特征', '它有什么特点'],
      ['说明顺序', '时间、空间、逻辑'],
      ['说明方法', '举例子、列数字等'],
      ['语言准确', '限制词不能随便删']
    ],
    note:
      '说明文和记叙文不一样，它不是以情动人，而是把知识讲清楚。做说明文，第一步找说明对象，第二步找特征。后面的说明顺序、说明方法、语言准确性，都是为了把对象说明白。'
  },
  {
    eyebrow: '说明方法',
    title: '说明方法：名字 + 过程 + 特点 + 好处',
    type: 'matrix',
    columns: ['方法', '怎么写', '答题落点'],
    rows: [
      ['举例子', '举了……的例子', '具体说明……，更有说服力'],
      ['列数字', '用了具体数字', '准确说明……，更可信'],
      ['作比较', '把……和……比较', '突出强调……，更清楚'],
      ['打比方', '把……比作……', '生动形象说明……，更通俗'],
      ['引用', '引用名言、资料或故事', '增强说服力或趣味性'],
      ['分类别', '分成几类说明', '条理清楚说明……']
    ],
    note:
      '新增资料把说明方法题拆成四步：先说方法，再说文中怎么用这个方法，然后点明说明了对象的什么特点，最后说好处。提醒学生：题目问“有什么作用”，不能只答“用了列数字”。'
  },
  {
    eyebrow: '说明文语言',
    title: '“能否删去”题：五步拿稳',
    type: 'process',
    steps: [
      ['表态', '不能删'],
      ['释本义', '解释词语本来的意思，可找近义词'],
      ['释句义', '说明它在句中限制了什么'],
      ['比删后', '删去后意思会变得绝对或不符合实际'],
      ['落术语', '体现说明文语言准确、严谨']
    ],
    note:
      '说明文语言题最常见的是限制性词语。新增资料提醒：要先解释词语本来的意思，再解释它在句中的意思。比如“大约”本来表示估计，在句中说明数量不是绝对值。删掉后就和实际不符。'
  },
  {
    eyebrow: '议论文',
    title: '议论文抓三件套：论点、论据、论证',
    type: 'three',
    items: [
      ['论点', '作者要证明什么', '常在标题、开头、结尾，通常是判断句'],
      ['论据', '用什么来证明', '事实论据和道理论据'],
      ['论证', '怎样证明', '举例、道理、对比、比喻论证']
    ],
    note:
      '议论文的阅读不要先陷进细节，而要先问：作者到底想证明什么？论点找到了，论据和论证都是为它服务的。分论点也要围绕中心论点。'
  },
  {
    eyebrow: '论证思路',
    title: '思路题就是把文章层次说清楚',
    type: 'formula',
    formula: '首先……；然后……；接着……；最后……。',
    exampleTitle: '常用表达',
    example: '文章首先引用名言提出中心论点；然后列举事例加以证明；接着从反面进行对比论证；最后总结全文，发出号召。',
    tips: ['看开头怎样提出论点', '看中间用了哪些论据', '看结尾如何总结或深化'],
    note:
      '论证思路题不是让学生评价好不好，而是复述作者证明观点的过程。答题时要加顺序词，让阅卷老师一眼看到层次。'
  },
  {
    eyebrow: '高频题型',
    title: '联系上下文解释词语：猜、找、联、本、代',
    type: 'formula',
    formula: '“……”本来指……，文中指……。',
    exampleTitle: '例',
    example: '“攥”本来指用手紧紧握住，文中指母亲用力握着钱，写出她生活节俭，也表现出她对孩子的珍惜。',
    tips: ['猜：近义词法、拆字法', '找：圈出原句', '联：看前后文', '代：把意思放回句子检验'],
    note:
      '新增资料把解释词语拆得很细：先猜大意，但不要急着写；必须回到原文，联系句子和上下文，再写本义和文中义。如果题目是“赏析词语”，再补写特点、情感或主题作用。'
  },
  {
    eyebrow: '高频题型',
    title: '句子含义：表层 + 深层',
    type: 'compare',
    leftTitle: '表层意思',
    left: ['这句话字面上写了什么', '比喻句先找本体和喻体', '双关句先解释本义'],
    rightTitle: '深层意思',
    right: ['联系上下文', '联系人物处境', '联系文章主旨', '联系作者情感'],
    formula: '先说字面意思，再说它在文中真正表达了什么。',
    note:
      '句子含义题最怕只翻译字面意思。尤其是比喻句、双关句、哲理句，要把隐藏意思说出来。例如“冬天”可能不只是季节，而是困境。'
  },
  {
    eyebrow: '高频题型',
    title: '修辞题：方法名 + 具体内容 + 表达效果',
    type: 'matrix',
    columns: ['修辞', '常见作用', '答题提醒'],
    rows: [
      ['比喻', '把……比作……', '生动形象写出特点，表达感情'],
      ['拟人', '把……当作人写', '生动写出状态，表达感情'],
      ['夸张', '把……夸大或缩小', '突出特点，给人强烈印象'],
      ['对比', '把……与……比较', '突出特点，态度更鲜明'],
      ['排比', '句式连续出现', '增强语势，强化情感'],
      ['反问', '用疑问表达肯定', '加强语气，突出态度']
    ],
    note:
      '新增修辞资料给了很清楚的句式：点明修辞手法，说明怎么做的，再说好在哪里。比如比喻必须写“把什么比作什么”；对比必须写“把什么与什么进行对比”。'
  },
  {
    eyebrow: '高频题型',
    title: '表达方式与描写：看它为中心服务什么',
    type: 'cards',
    cards: [
      ['记叙', '交代事件经过，让读者知道发生了什么。'],
      ['描写', '让人物、景物、场面更具体生动。'],
      ['议论', '揭示意义，点明或深化中心。'],
      ['抒情', '直接或间接表达作者感情，增强感染力。'],
      ['说明', '介绍事物特征、性质、原因或过程。'],
      ['环境描写', '交代时间地点，渲染气氛，烘托人物，推动情节。']
    ],
    note:
      '表达方式题要先识别，再回答作用。描写题尤其要具体，比如环境描写常见作用有交代时间地点、渲染气氛、烘托人物心情、推动情节、暗示主题。'
  },
  {
    eyebrow: '高频题型',
    title: '标题作用：从 6 个角度排查',
    type: 'cards',
    cards: [
      ['概括内容', '标题直接点出文章主要事件或对象。'],
      ['交代对象', '告诉读者文章写谁、写什么。'],
      ['点明线索', '标题中的物、人、事贯穿全文。'],
      ['设置悬念', '让读者产生疑问，想继续读。'],
      ['揭示主题', '暗示文章中心或深层含义。'],
      ['表达情感', '体现作者态度、赞美、怀念或批判。']
    ],
    note:
      '标题作用题通常不只一个角度。要结合文章判断，不要把六个角度全部机械写上。最稳的方法是：先看标题字面写什么，再看它和线索、主旨、情感有没有关系。'
  },
  {
    eyebrow: '开放题',
    title: '开放题也不能“随便写”',
    type: 'process',
    steps: [
      ['亮观点', '我认为……'],
      ['扣文本', '文中……说明……'],
      ['联生活', '现实中也有类似情况……'],
      ['讲理由', '因为……所以……'],
      ['收结论', '因此我们应该……']
    ],
    note:
      '开放题看似自由，其实有边界。第一要紧扣文本，第二要观点正确，第三要有例子或理由。可以不同意，但要说得通，不能和文章主旨完全相反。'
  },
  {
    eyebrow: '劝告赞扬',
    title: '对人物说话：先表态，再讲理由',
    type: 'compare',
    leftTitle: '赞扬类',
    left: ['你是对的', '你的具体行为有什么好处', '你的品质值得我学习'],
    rightTitle: '劝告类',
    right: ['你这样不对', '这种行为会造成什么后果', '不该……而应该……'],
    formula: '表态 + 概括行为 + 后果/好处 + 品质/做法',
    note:
      '新增材料把“劝告”“赞扬”题单独拿出来了。这类题不能只说“你真棒”或“你不对”，要结合文章具体行为。赞扬要落到品质，劝告要落到正确做法，语气可以像真的在对这个人物说话。'
  },
  {
    eyebrow: '考场清单',
    title: '最后 30 秒，检查这 6 点',
    type: 'checklist',
    items: [
      ['有没有回到原文', '答案里要看得出文本依据。'],
      ['有没有分点', '分值高的题不要写成一团。'],
      ['有没有关键词', '题干术语和原文关键词要出现。'],
      ['有没有答全', '内容、结构、情感、作用别漏。'],
      ['有没有空话', '“突出中心”后面要说中心是什么。'],
      ['有没有写清楚', '句子通顺，字迹清楚。']
    ],
    note:
      '这页适合作为课堂结尾，也可以让学生抄到笔记本上。检查不是形式，它能直接减少失分。尤其是空话问题：写“深化主题”不够，要写深化了什么主题。'
  },
  {
    eyebrow: '总结',
    title: '阅读理解拿分口诀',
    type: 'quote',
    quote: '读全文，审题干；回原文，找答案；分文体，套方法；写完整，少空话。',
    blocks: [
      ['最重要', '答案在原文里。'],
      ['最实用', '结构 + 内容，表层 + 深层。'],
      ['最稳妥', '按分值分点作答。']
    ],
    note:
      '最后用口诀收束。让学生记住：阅读理解不是靠背答案，而是靠方法。只要每次都读全文、审题干、回原文、分文体、规范写，分数会稳定提升。'
  }
];

const sectionNames = ['总法', '记叙文', '说明文', '议论文', '题型', '检查'];
const sectionStarts = [0, 6, 13, 16, 18, 25];
const sectionIcons = ['sparkles', 'book-open', 'search', 'message', 'target', 'check'];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function Icon({ name }) {
  const paths = {
    'book-open': (
      <>
        <path d="M4 5.5c2.6-.9 5-.6 7 1v12c-2-1.6-4.4-1.9-7-1V5.5Z" />
        <path d="M20 5.5c-2.6-.9-5-.6-7 1v12c2-1.6 4.4-1.9 7-1V5.5Z" />
      </>
    ),
    check: <path d="m5 12 4.2 4.2L19 6.5" />,
    'chevron-left': <path d="m15 18-6-6 6-6" />,
    'chevron-right': <path d="m9 18 6-6-6-6" />,
    home: (
      <>
        <path d="m4 11 8-7 8 7" />
        <path d="M6.5 10.5V20h11v-9.5" />
      </>
    ),
    layout: (
      <>
        <rect x="4" y="5" width="7" height="6" rx="1.5" />
        <rect x="13" y="5" width="7" height="6" rx="1.5" />
        <rect x="4" y="13" width="7" height="6" rx="1.5" />
        <rect x="13" y="13" width="7" height="6" rx="1.5" />
      </>
    ),
    menu: (
      <>
        <path d="M5 7h14" />
        <path d="M5 12h14" />
        <path d="M5 17h14" />
      </>
    ),
    message: (
      <>
        <path d="M5 6.5h14v9H9l-4 3v-12Z" />
        <path d="M8 10h8" />
        <path d="M8 13h5" />
      </>
    ),
    note: (
      <>
        <path d="M6 4.5h9l3 3V20H6V4.5Z" />
        <path d="M14.5 4.5V8h3.5" />
        <path d="M9 12h6" />
        <path d="M9 15h4" />
      </>
    ),
    pen: (
      <>
        <path d="M4 20h4l11-11-4-4L4 16v4Z" />
        <path d="m13.5 6.5 4 4" />
      </>
    ),
    presentation: (
      <>
        <path d="M4 5h16v10H4z" />
        <path d="M12 15v5" />
        <path d="m8 20 4-3 4 3" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="6" />
        <path d="m16 16 4 4" />
      </>
    ),
    sparkles: (
      <>
        <path d="M12 3.5 13.6 8l4.4 1.6-4.4 1.6L12 15.5l-1.6-4.3L6 9.6 10.4 8 12 3.5Z" />
        <path d="m18.5 14 .7 2 1.8.7-1.8.7-.7 2-.7-2-1.8-.7 1.8-.7.7-2Z" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="1" />
      </>
    )
  };

  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[name] || paths.sparkles}
    </svg>
  );
}

function buildPresenterHtml(initialIndex) {
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>演讲者模式 · 阅读理解课</title>
<style>
  :root{--ink:#171717;--muted:#6a6358;--paper:#fbfaf6;--panel:#fff;--line:rgba(35,30,24,.14);--accent:#1a3a7a;--accent2:#b3392d;--green:#2d7d6e}
  *{box-sizing:border-box} body{margin:0;min-height:100vh;background:var(--paper);color:var(--ink);font-family:"Noto Sans SC","Microsoft YaHei",system-ui,sans-serif;overflow:hidden}
  .presenter{height:100vh;padding:18px;display:grid;grid-template-columns:1.35fr .9fr;grid-template-rows:1fr 1fr;gap:14px;background:linear-gradient(90deg,rgba(20,20,20,.035) 0 1px,transparent 1px),linear-gradient(0deg,rgba(20,20,20,.025) 0 1px,transparent 1px),var(--paper);background-size:44px 44px}
  .card{background:var(--panel);border:1px solid var(--line);box-shadow:0 1px 0 rgba(20,20,20,.08);min-height:0;display:flex;flex-direction:column}
  .card h2{margin:0;padding:12px 14px;border-bottom:1px solid var(--line);font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--accent)}
  .stage{padding:18px;display:grid;gap:12px;align-content:start;min-height:0;overflow:auto}
  .current{grid-row:span 2}.preview-title{font-family:"Noto Serif SC","Songti SC",Georgia,serif;font-size:clamp(26px,4.2vw,58px);line-height:1.08;font-weight:600;letter-spacing:.02em;margin:0}
  .preview-eyebrow{margin:0;color:var(--accent2);font-weight:800;letter-spacing:.12em}.preview-body{font-size:18px;line-height:1.55;color:var(--muted)}
  .mini .preview-title{font-size:30px}.script{padding:20px 24px;font-size:24px;line-height:1.75;overflow:auto;white-space:pre-wrap}.script b{color:var(--accent)}
  .timer{padding:20px;display:grid;gap:16px;align-content:start}.clock{font-variant-numeric:tabular-nums;font-size:56px;font-weight:800;color:var(--green)}
  .meta{font-size:18px;color:var(--muted)}.buttons{display:flex;gap:10px;flex-wrap:wrap}.buttons button{border:1px solid var(--line);background:#fff;padding:10px 14px;cursor:pointer;color:var(--ink);font:inherit}.buttons button:hover{border-color:var(--accent);color:var(--accent)}
</style>
</head>
<body>
<main class="presenter">
  <section class="card current"><h2>Current</h2><div id="current" class="stage"></div></section>
  <section class="card mini"><h2>Next</h2><div id="next" class="stage"></div></section>
  <section class="card"><h2>Speaker Script</h2><div id="script" class="script"></div></section>
  <section class="card"><h2>Timer</h2><div class="timer"><div id="clock" class="clock">00:00</div><div id="meta" class="meta"></div><div class="buttons"><button id="prev">上一页</button><button id="nextBtn">下一页</button><button id="reset">重置计时</button></div></div></section>
</main>
<script>
  const slides = ${JSON.stringify(slides)};
  let idx = ${initialIndex};
  let started = Date.now();
  const current = document.getElementById('current');
  const next = document.getElementById('next');
  const script = document.getElementById('script');
  const meta = document.getElementById('meta');
  const clock = document.getElementById('clock');
  function esc(value){return String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));}
  function summarize(slide){
    if(!slide) return '';
    const pool = slide.quote || slide.formula || slide.subtitle || (slide.items || slide.cards || slide.steps || slide.blocks || []).slice(0,3).map(item => item.join('：')).join(' / ');
    return esc(pool);
  }
  function card(slide){
    if(!slide) return '<p class="preview-body">已经是最后一页。</p>';
    return '<p class="preview-eyebrow">'+esc(slide.eyebrow)+'</p><h1 class="preview-title">'+esc(slide.title)+'</h1><p class="preview-body">'+summarize(slide)+'</p>';
  }
  function render(){
    current.innerHTML = card(slides[idx]);
    next.innerHTML = card(slides[Math.min(idx + 1, slides.length - 1)]);
    script.textContent = slides[idx]?.note || '';
    meta.textContent = '第 ' + (idx + 1) + ' / ' + slides.length + ' 页';
  }
  function goto(nextIdx){
    idx = Math.max(0, Math.min(slides.length - 1, nextIdx));
    render();
    window.opener?.postMessage({type:'presenter-goto', idx}, '*');
  }
  function tick(){
    const seconds = Math.floor((Date.now() - started) / 1000);
    clock.textContent = String(Math.floor(seconds / 60)).padStart(2,'0') + ':' + String(seconds % 60).padStart(2,'0');
  }
  document.getElementById('prev').onclick = () => goto(idx - 1);
  document.getElementById('nextBtn').onclick = () => goto(idx + 1);
  document.getElementById('reset').onclick = () => { started = Date.now(); tick(); };
  window.addEventListener('message', event => { if(event.data?.type === 'audience-goto'){ idx = event.data.idx; render(); } });
  window.addEventListener('keydown', event => {
    if(event.key === 'ArrowRight' || event.key === ' ') { event.preventDefault(); goto(idx + 1); }
    if(event.key === 'ArrowLeft') { event.preventDefault(); goto(idx - 1); }
    if(event.key.toLowerCase() === 'r') { started = Date.now(); tick(); }
    if(event.key === 'Escape') window.close();
  });
  render(); tick(); setInterval(tick, 1000);
</script>
</body>
</html>`;
}

function App() {
  const [current, setCurrent] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [railCollapsed, setRailCollapsed] = useState(false);
  const presenterRef = useRef(null);
  const touchRef = useRef({ x: 0, y: 0, time: 0 });

  const progress = useMemo(() => ((current + 1) / slides.length) * 100, [current]);

  function goToSlide(index) {
    setCurrent(clamp(index, 0, slides.length - 1));
  }

  function openPresenter() {
    const presenter = window.open('', 'reading-presenter-mode', 'width=1440,height=900');
    if (!presenter) {
      setShowNotes(true);
      return;
    }

    presenterRef.current = presenter;
    presenter.document.open();
    presenter.document.write(buildPresenterHtml(current));
    presenter.document.close();
    presenter.focus();
  }

  function handleTouchStart(event) {
    const touch = event.touches[0];
    touchRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };
  }

  function handleTouchEnd(event) {
    if (!isMobile || showNotes || showOverview) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchRef.current.x;
    const deltaY = touch.clientY - touchRef.current.y;
    const elapsed = Date.now() - touchRef.current.time;

    if (elapsed > 700 || Math.abs(deltaX) < 48 || Math.abs(deltaY) > 72) return;

    if (deltaX < 0) {
      setCurrent((value) => clamp(value + 1, 0, slides.length - 1));
    } else {
      setCurrent((value) => clamp(value - 1, 0, slides.length - 1));
    }
  }

  useEffect(() => {
    const media = window.matchMedia('(max-width: 760px)');
    const syncMobile = () => setIsMobile(media.matches);

    syncMobile();
    media.addEventListener('change', syncMobile);
    return () => media.removeEventListener('change', syncMobile);
  }, []);

  useEffect(() => {
    presenterRef.current?.postMessage({ type: 'audience-goto', idx: current }, '*');
  }, [current]);

  useEffect(() => {
    function onMessage(event) {
      if (event.data?.type === 'presenter-goto') {
        goToSlide(event.data.idx);
      }
    }

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        setCurrent((value) => clamp(value + 1, 0, slides.length - 1));
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        setCurrent((value) => clamp(value - 1, 0, slides.length - 1));
      }
      if (event.key === 'Home') {
        event.preventDefault();
        setCurrent(0);
      }
      if (event.key.toLowerCase() === 'h') {
        setCurrent(0);
      }
      if (event.key === 'End') {
        event.preventDefault();
        setCurrent(slides.length - 1);
      }
      if (event.key.toLowerCase() === 'n') {
        setShowNotes((value) => !value);
      }
      if (event.key.toLowerCase() === 'o') {
        setShowOverview((value) => !value);
      }
      if (event.key.toLowerCase() === 's') {
        event.preventDefault();
        openPresenter();
      }
      if (event.key === 'Escape') {
        setShowNotes(false);
        setShowOverview(false);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const slide = slides[current];

  return (
    <main
      className={`deck-shell${isMobile ? ' mobile-shell' : ''}${railCollapsed ? ' rail-collapsed' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="progress" style={{ width: `${progress}%` }} />
      <aside className={`rail${railCollapsed ? ' is-collapsed' : ''}`} aria-label="课程章节">
        <button className="rail-brand" type="button" onClick={() => setCurrent(0)} title="回到首页">
          <span>阅读</span>
          <b>理解</b>
          <small>course module</small>
        </button>
        <nav>
          {sectionNames.map((name, index) => (
            <button
              key={name}
              type="button"
              className={index === activeSection(current) ? 'active' : ''}
              onClick={() => setCurrent(sectionStarts[index])}
              title={`跳转到${name}`}
            >
              <span className="rail-icon">
                <Icon name={sectionIcons[index]} />
              </span>
              <span>{name}</span>
            </button>
          ))}
        </nav>
        <button
          className="rail-toggle"
          type="button"
          onClick={() => setRailCollapsed((value) => !value)}
          aria-label={railCollapsed ? '展开目录' : '收起目录'}
          title={railCollapsed ? '展开目录' : '收起目录'}
        >
          <Icon name={railCollapsed ? 'chevron-right' : 'chevron-left'} />
        </button>
      </aside>
      <section key={current} className={`slide slide-${slide.type}`}>
        <SlideContent slide={slide} index={current} />
      </section>
      <footer className="deck-footer">
        <span>
          {current + 1} / {slides.length}
        </span>
      </footer>
      <div className="controls" aria-label="幻灯片控制">
        <button type="button" onClick={() => setCurrent(0)}>
          <Icon name="home" />
          首页
        </button>
        <button type="button" onClick={() => setCurrent((value) => clamp(value - 1, 0, slides.length - 1))}>
          <Icon name="chevron-left" />
          上一页
        </button>
        <button type="button" onClick={() => setShowOverview(true)}>
          <Icon name="layout" />
          总览
        </button>
        <button type="button" onClick={() => setShowNotes((value) => !value)}>
          <Icon name="note" />
          讲稿
        </button>
        <button type="button" onClick={openPresenter}>
          <Icon name="presentation" />
          演讲
        </button>
        <button type="button" onClick={() => setCurrent((value) => clamp(value + 1, 0, slides.length - 1))}>
          <Icon name="chevron-right" />
          下一页
        </button>
      </div>
      {showNotes && <NotesPanel slide={slide} onClose={() => setShowNotes(false)} />}
      {showOverview && <Overview current={current} onGo={setCurrent} onClose={() => setShowOverview(false)} />}
    </main>
  );
}

function activeSection(index) {
  if (index <= 5) return 0;
  if (index <= 12) return 1;
  if (index <= 15) return 2;
  if (index <= 17) return 3;
  if (index <= 24) return 4;
  return 5;
}

function SlideContent({ slide, index }) {
  return (
    <>
      <header className="slide-header">
        <p className="eyebrow">{slide.eyebrow}</p>
        <span className="slide-index">{String(index + 1).padStart(2, '0')}</span>
      </header>
      {renderBody(slide)}
    </>
  );
}

function renderBody(slide) {
  if (slide.type === 'title') {
    return (
      <div className="title-layout">
        <div className="title-copy">
          <div className="title-badge">
            <Icon name="sparkles" />
            <span>{slide.eyebrow}</span>
          </div>
          <h1>{slide.title}</h1>
          <p className="subtitle">{slide.subtitle}</p>
          <div className="title-chip-row">
            {slide.chips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
        </div>
        <div className="title-visual" aria-hidden="true">
          <div className="book-card">
            <Icon name="book-open" />
            <b>READ</b>
          </div>
          <div className="path-card">
            {slide.goals.map((goal, index) => (
              <span key={goal}>
                <i>{index + 1}</i>
                {goal}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (slide.type === 'cover') {
    return (
      <div className="cover-layout">
        <div>
          <h1>{slide.title}</h1>
          <p className="subtitle">{slide.subtitle}</p>
        </div>
        <div className="goal-stack">
          {slide.goals.map((goal, index) => (
            <div className="goal" key={goal}>
              <span>{index + 1}</span>
              <b>{goal}</b>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === 'checklist') {
    return (
      <div>
        <h2>{slide.title}</h2>
        <div className="check-grid">
          {slide.items.map(([title, text]) => (
            <article className="check-item" key={title}>
              <span />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === 'quote') {
    return (
      <div>
        <h2>{slide.title}</h2>
        <blockquote>{slide.quote}</blockquote>
        <div className="mini-grid">
          {slide.blocks.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === 'process') {
    return (
      <div>
        <h2>{slide.title}</h2>
        <div className="process-list">
          {slide.steps.map(([title, text], index) => (
            <article key={title}>
              <span>{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === 'cards') {
    return (
      <div>
        <h2>{slide.title}</h2>
        <div className="card-grid">
          {slide.cards.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === 'split') {
    return (
      <div>
        <h2>{slide.title}</h2>
        <div className="split-layout">
          <article>
            <h3>{slide.leftTitle}</h3>
            <div className="tag-wrap">
              {slide.left.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
          <article className="formula-card">
            <h3>{slide.rightTitle}</h3>
            <p className="formula">{slide.formula}</p>
            <p className="example">{slide.example}</p>
          </article>
        </div>
      </div>
    );
  }

  if (slide.type === 'matrix') {
    return (
      <div>
        <h2>{slide.title}</h2>
        <table>
          <thead>
            <tr>
              {slide.columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slide.rows.map((row) => (
              <tr key={row.join('-')}>
                {row.map((cell) => (
                  <td key={cell}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (slide.type === 'three') {
    return (
      <div>
        <h2>{slide.title}</h2>
        <div className="three-grid">
          {slide.items.map(([title, text, effect], index) => (
            <article key={title}>
              <span>{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <b>{effect}</b>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === 'compare') {
    return (
      <div>
        <h2>{slide.title}</h2>
        <div className="compare-grid">
          <article>
            <h3>{slide.leftTitle}</h3>
            <ul>{slide.left.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article>
            <h3>{slide.rightTitle}</h3>
            <ul>{slide.right.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
        <p className="formula wide">{slide.formula}</p>
      </div>
    );
  }

  if (slide.type === 'formula') {
    return (
      <div>
        <h2>{slide.title}</h2>
        <p className="formula wide">{slide.formula}</p>
        <div className="example-box">
          <h3>{slide.exampleTitle}</h3>
          <p>{slide.example}</p>
        </div>
        <div className="tip-row">
          {slide.tips.map((tip) => (
            <span key={tip}>{tip}</span>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === 'radial') {
    return (
      <div>
        <h2>{slide.title}</h2>
        <div className="radial">
          <div className="radial-center">{slide.center}</div>
          {slide.petals.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

function NotesPanel({ slide, onClose }) {
  return (
    <aside className="notes-panel">
      <button type="button" onClick={onClose}>关闭</button>
      <p className="eyebrow">教师讲稿</p>
      <h3>{slide.title}</h3>
      <p>{slide.note}</p>
    </aside>
  );
}

function Overview({ current, onGo, onClose }) {
  return (
    <div className="overview">
      <div className="overview-panel">
        <button type="button" onClick={onClose}>关闭</button>
        <h2>幻灯片总览</h2>
        <div className="overview-grid">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.title + index}
              className={index === current ? 'active' : ''}
              onClick={() => {
                onGo(index);
                onClose();
              }}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {slide.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
