import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const slides = [
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
    title: '说明方法不要只认名字，还要说效果',
    type: 'matrix',
    columns: ['方法', '识别标志', '作用表达'],
    rows: [
      ['举例子', '比如、例如、具体事例', '具体明确地说明……'],
      ['列数字', '数字、比例、年份', '准确具体地说明……'],
      ['作比较', '比、相比、与……不同', '突出强调……'],
      ['打比方', '像、仿佛、比作', '生动形象地说明……'],
      ['分类别', '分为、类别', '条理清楚地说明……'],
      ['下定义', '……是……', '科学本质地揭示……']
    ],
    note:
      '说明方法题的格式很稳定：方法名，加说明内容，加表达效果。比如：运用列数字，准确具体地说明了赵州桥历史悠久，使说明更有说服力。'
  },
  {
    eyebrow: '说明文语言',
    title: '“能否删去”题：四步拿稳',
    type: 'process',
    steps: [
      ['表态', '不能删'],
      ['定性', '说明这个词表示程度、范围、估计、数量或时间'],
      ['比较', '删去后意思变得绝对或不符合实际'],
      ['归纳', '体现说明文语言的准确性、严密性']
    ],
    note:
      '说明文语言题最常见的是限制性词语。比如“大约”“几乎”“可能”“比较”。它们看起来不起眼，但正是这些词让表达更准确。答题一定要有“删前删后对比”。'
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
    title: '词语赏析：先解释，再分析',
    type: 'formula',
    formula: '“……”一词原指……，在文中指……，生动/准确地写出了……，表现了……。',
    exampleTitle: '例',
    example: '“攥”字写出了母亲握钱时用力的动作，表现了她生活节俭，也透露出她对孩子的珍惜与疼爱。',
    tips: ['动词看动作', '形容词看特点', '副词看限制', '最后落到人物、情感或主题'],
    note:
      '词语赏析题要让学生看到词的“不可替代”。动词通常写动作，形容词写状态，副词体现准确性。结尾要回到人物形象、作者情感或文章中心。'
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
      ['比喻', '生动形象地写出特点', '说清本体和喻体'],
      ['拟人', '赋予事物人的情态', '写出对象的状态或情感'],
      ['排比', '增强语势，层层推进', '注意情感或说理气势'],
      ['反问', '加强语气，态度鲜明', '要写出作者真正态度'],
      ['设问', '引起注意，启发思考', '常有引出下文的作用'],
      ['反复', '强调内容，强化情感', '说明强调了什么']
    ],
    note:
      '修辞题一定不要只写“用了比喻，很生动”。要完整表达：把什么比作什么，写出了什么特点，表达了什么情感。术语只是开头，结合文本才是得分点。'
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

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function App() {
  const [current, setCurrent] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [showOverview, setShowOverview] = useState(false);

  const progress = useMemo(() => ((current + 1) / slides.length) * 100, [current]);

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
    <main className="deck-shell">
      <div className="progress" style={{ width: `${progress}%` }} />
      <aside className="rail" aria-label="课程章节">
        <button className="rail-brand" type="button" onClick={() => setCurrent(0)} title="回到首页">
          <span>阅读</span>
          <b>理解</b>
        </button>
        <nav>
          {sectionNames.map((name, index) => (
            <span key={name} className={index === activeSection(current) ? 'active' : ''}>
              {name}
            </span>
          ))}
        </nav>
      </aside>
      <section key={current} className={`slide slide-${slide.type}`}>
        <SlideContent slide={slide} index={current} />
      </section>
      <footer className="deck-footer">
        <span>课堂教学版</span>
        <span>
          {current + 1} / {slides.length}
        </span>
      </footer>
      <div className="controls" aria-label="幻灯片控制">
        <button type="button" onClick={() => setCurrent(0)}>
          首页
        </button>
        <button type="button" onClick={() => setCurrent((value) => clamp(value - 1, 0, slides.length - 1))}>
          上一页
        </button>
        <button type="button" onClick={() => setShowOverview(true)}>
          总览
        </button>
        <button type="button" onClick={() => setShowNotes((value) => !value)}>
          讲稿
        </button>
        <button type="button" onClick={() => setCurrent((value) => clamp(value + 1, 0, slides.length - 1))}>
          下一页
        </button>
      </div>
      {showNotes && <NotesPanel slide={slide} onClose={() => setShowNotes(false)} />}
      {showOverview && <Overview current={current} onGo={setCurrent} onClose={() => setShowOverview(false)} />}
    </main>
  );
}

function activeSection(index) {
  if (index <= 4) return 0;
  if (index <= 10) return 1;
  if (index <= 13) return 2;
  if (index <= 15) return 3;
  if (index <= 21) return 4;
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
