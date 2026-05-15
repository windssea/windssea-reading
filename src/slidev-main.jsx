import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  Brain,
  CheckCircle2,
  Columns2,
  FileCheck2,
  GitBranch,
  Home,
  LayoutDashboard,
  Lightbulb,
  ListChecks,
  Map,
  MessageSquareQuote,
  NotebookText,
  PenLine,
  Quote,
  SearchCheck,
  Sparkles,
  Target,
} from 'lucide-react';
import { slides, sectionNames, sectionStarts } from './slidesData';
import './slidev.css';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function fragmentCount(slide) {
  if (slide.type === 'split') return (slide.left?.length || 0) + 2;
  if (slide.type === 'compare') return 3;
  if (slide.type === 'formula') return (slide.tips?.length || 0) + 2;
  return Math.max(
    slide.goals?.length || 0,
    slide.items?.length || 0,
    slide.blocks?.length || 0,
    slide.steps?.length || 0,
    slide.cards?.length || 0,
    slide.rows?.length || 0,
    slide.petals?.length || 0,
    slide.chips?.length || 0
  );
}

function App() {
  const [current, setCurrent] = useState(0);
  const [fragment, setFragment] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const shellRef = useRef(null);

  const slide = slides[current];
  const maxFragment = fragmentCount(slide);
  const progress = useMemo(() => ((current + 1) / slides.length) * 100, [current]);

  function goTo(index) {
    setCurrent(clamp(index, 0, slides.length - 1));
    setFragment(0);
  }

  function next() {
    if (fragment < maxFragment) {
      setFragment((value) => value + 1);
      return;
    }
    if (current >= slides.length - 1) return;
    goTo(current + 1);
  }

  function prev() {
    if (fragment > 0) {
      setFragment((value) => value - 1);
      return;
    }
    goTo(current - 1);
  }

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        next();
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        prev();
      }
      if (event.key === 'Home') {
        event.preventDefault();
        goTo(0);
      }
      if (event.key === 'End') {
        event.preventDefault();
        goTo(slides.length - 1);
      }
      if (event.key.toLowerCase() === 'n') setShowNotes((value) => !value);
      if (event.key.toLowerCase() === 'o') setShowOverview((value) => !value);
      if (event.key === 'Escape') {
        setShowNotes(false);
        setShowOverview(false);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [current, fragment, maxFragment]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    function onFsChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  useEffect(() => {
    function onFsKey(e) {
      if ((e.key === 'f' || e.key === 'F') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (e.target === document.body || e.target === document.documentElement || e.target.classList.contains('slidev-shell')) {
          e.preventDefault();
          toggleFullscreen();
        }
      }
    }
    window.addEventListener('keydown', onFsKey);
    return () => window.removeEventListener('keydown', onFsKey);
  }, [toggleFullscreen, showNotes, showOverview]);

  function onPageTap(event) {
    if (window.innerWidth > 900) return;
    if (showNotes || showOverview) return;
    if (event.target.closest('button, a, input, textarea, select')) return;
    if (event.clientX < window.innerWidth / 2) prev();
    else next();
  }

  return (
    <main className={`slidev-shell${isFullscreen ? ' slidev-fullscreen' : ''}`} ref={shellRef} onClick={onPageTap}>
      <div className="slidev-progress" style={{ width: `${progress}%` }} />
      <aside className="slidev-toc">
        <button type="button" className="slidev-brand" onClick={() => goTo(0)}>
          阅读理解
        </button>
        {sectionNames.map((name, index) => (
          <button
            key={name}
            type="button"
            className={current >= sectionStarts[index] && current < (sectionStarts[index + 1] ?? slides.length) ? 'active' : ''}
            onClick={() => goTo(sectionStarts[index])}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {name}
          </button>
        ))}
      </aside>
      <section key={`${current}-${slide.type}`} className={`slidev-stage layout-${slide.type} density-${Math.min(maxFragment, 6)}`}>
        <header className="slidev-meta">
          <span>{slide.eyebrow}</span>
          <b>{String(current + 1).padStart(2, '0')} / {slides.length}</b>
        </header>
        <SlideContent slide={slide} fragment={fragment} />
      </section>
      <nav className="slidev-controls" aria-label="Slide controls">
        <button type="button" onClick={() => goTo(0)}>首页</button>
        <button type="button" onClick={prev}>上一页</button>
        <button type="button" onClick={() => setShowOverview(true)}>总览</button>
        <button type="button" onClick={() => setShowNotes((value) => !value)}>备注</button>
        <button type="button" onClick={toggleFullscreen}>{isFullscreen ? '退出全屏' : '全屏'}</button>
        <button type="button" onClick={next}>下一页</button>
      </nav>
      {showNotes && <Notes slide={slide} onClose={() => setShowNotes(false)} />}
      {showOverview && <Overview current={current} onGo={goTo} onClose={() => setShowOverview(false)} />}
    </main>
  );
}

function visible(fragment, index) {
  return fragment > index ? 'visible' : '';
}

const cardIcons = [SearchCheck, Target, PenLine, FileCheck2, Lightbulb, CheckCircle2, Brain, BookOpenCheck];

const titleIcons = {
  quote: Quote,
  checklist: ListChecks,
  process: GitBranch,
  cards: Sparkles,
  split: Columns2,
  matrix: LayoutDashboard,
  three: Target,
  compare: Columns2,
  formula: PenLine,
  radial: Map,
};

function IconBadge({ icon: Icon = Sparkles, tone = 0 }) {
  return (
    <span className={`slidev-icon tone-${tone % 6}`} aria-hidden="true">
      <Icon size={18} strokeWidth={2.2} />
    </span>
  );
}

function SlideTitle({ title, type }) {
  return (
    <div className="slidev-heading">
      <IconBadge icon={titleIcons[type] || Sparkles} />
      <h2>{title}</h2>
    </div>
  );
}

function SlideContent({ slide, fragment }) {
  if (slide.type === 'title') {
    return (
      <div className="slidev-title">
        <div>
          <p className="slidev-kicker"><IconBadge icon={BookOpenCheck} />{slide.eyebrow}</p>
          <h1>{slide.title}</h1>
          <p className="slidev-subtitle">{slide.subtitle}</p>
          <div className="slidev-pills">
            {slide.chips.map((chip, index) => <span className={visible(fragment, index)} key={chip}>{chip}</span>)}
          </div>
        </div>
        <div className="slidev-orbit" aria-hidden="true">
          {slide.goals.map((goal, index) => <span className={visible(fragment, index)} key={goal}>{goal}</span>)}
        </div>
      </div>
    );
  }

  if (slide.type === 'cover') {
    return (
      <div className="slidev-cover">
        <div className="slidev-cover-left">
          <div className="slidev-cover-title">
            <IconBadge icon={Sparkles} />
            <h1>{slide.title}</h1>
          </div>
          <p className="slidev-subtitle">{slide.subtitle}</p>
        </div>
        <div className="slidev-cover-right">
          <h4>答题三步法</h4>
          {slide.goals.map((goal, index) => (
            <article className={visible(fragment, index)} key={goal}>
              <b>{index + 1}</b>
              <span>{goal}</span>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === 'quote') {
    return (
      <div>
        <SlideTitle title={slide.title} type={slide.type} />
        <blockquote>{slide.quote}</blockquote>
        <div className="slidev-grid three">
          {slide.blocks.map(([title, text], index) => <Card key={title} title={title} text={text} show={visible(fragment, index)} index={index} />)}
        </div>
      </div>
    );
  }

  if (slide.type === 'checklist') {
    return (
      <div>
        <SlideTitle title={slide.title} type={slide.type} />
        <div className="slidev-grid three">
          {slide.items.map(([title, text], index) => <Card key={title} title={title} text={text} show={visible(fragment, index)} index={index} />)}
        </div>
      </div>
    );
  }

  if (slide.type === 'process') {
    return (
      <div>
        <SlideTitle title={slide.title} type={slide.type} />
        <div className="slidev-process">
          {slide.steps.map(([title, text], index) => (
            <article className={visible(fragment, index)} key={title}>
              <b>{index + 1}</b>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === 'cards') {
    return (
      <div>
        <SlideTitle title={slide.title} type={slide.type} />
        <div className="slidev-grid three">
          {slide.cards.map(([title, text], index) => <Card key={title} title={title} text={text} show={visible(fragment, index)} index={index} />)}
        </div>
      </div>
    );
  }

  if (slide.type === 'split') {
    return (
      <div>
        <SlideTitle title={slide.title} type={slide.type} />
        <div className="slidev-two">
          <article className={visible(fragment, 0)}>
            <h3>{slide.leftTitle}</h3>
            <div className="slidev-tags">{slide.left.map((item, index) => <span className={visible(fragment, index + 1)} key={item}>{item}</span>)}</div>
          </article>
          <article className={visible(fragment, slide.left.length + 1)}>
            <h3>{slide.rightTitle}</h3>
            <p className="slidev-formula">{slide.formula}</p>
            <p>{slide.example}</p>
          </article>
        </div>
      </div>
    );
  }

  if (slide.type === 'matrix') {
    return (
      <div>
        <SlideTitle title={slide.title} type={slide.type} />
        <table className="slidev-table">
          <thead><tr>{slide.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
          <tbody>
            {slide.rows.map((row, index) => (
              <tr className={visible(fragment, index)} key={row.join('-')}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (slide.type === 'three') {
    return (
      <div>
        <SlideTitle title={slide.title} type={slide.type} />
        <div className="slidev-grid three">
          {slide.items.map(([title, text, effect], index) => <Card key={title} title={title} text={`${text}｜${effect}`} show={visible(fragment, index)} index={index} />)}
        </div>
      </div>
    );
  }

  if (slide.type === 'compare') {
    return (
      <div>
        <SlideTitle title={slide.title} type={slide.type} />
        <div className="slidev-two">
          <ListPanel title={slide.leftTitle} items={slide.left} show={visible(fragment, 0)} />
          <ListPanel title={slide.rightTitle} items={slide.right} show={visible(fragment, 1)} />
        </div>
        <p className={`slidev-formula wide ${visible(fragment, 2)}`}>{slide.formula}</p>
      </div>
    );
  }

  if (slide.type === 'formula') {
    return (
      <div>
        <SlideTitle title={slide.title} type={slide.type} />
        <p className={`slidev-formula wide ${visible(fragment, 0)}`}>{slide.formula}</p>
        <Card title={slide.exampleTitle} text={slide.example} show={visible(fragment, 1)} index={1} />
        <div className="slidev-tags">{slide.tips.map((tip, index) => <span className={visible(fragment, index + 2)} key={tip}>{tip}</span>)}</div>
      </div>
    );
  }

  if (slide.type === 'radial') {
    return (
      <div>
        <SlideTitle title={slide.title} type={slide.type} />
        <div className="slidev-radial">
          <strong>{slide.center}</strong>
          {slide.petals.map(([title, text], index) => <Card key={title} title={title} text={text} show={visible(fragment, index)} index={index} />)}
        </div>
      </div>
    );
  }

  return null;
}

function Card({ title, text, show, index = 0 }) {
  const Icon = cardIcons[index % cardIcons.length];
  return (
    <article className={`slidev-card ${show}`}>
      <IconBadge icon={Icon} tone={index} />
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}

function ListPanel({ title, items, show }) {
  return (
    <article className={`slidev-card ${show}`}>
      <IconBadge icon={MessageSquareQuote} />
      <div>
        <h3>{title}</h3>
        <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
    </article>
  );
}

function Notes({ slide, onClose }) {
  return (
    <aside className="slidev-notes">
      <button type="button" onClick={onClose}>关闭</button>
      <h3>{slide.title}</h3>
      <p>{slide.note}</p>
    </aside>
  );
}

function Overview({ current, onGo, onClose }) {
  return (
    <div className="slidev-overview">
      <section>
        <button type="button" onClick={onClose}>关闭</button>
        <h2>幻灯片总览</h2>
        <div>
          {slides.map((slide, index) => (
            <button className={current === index ? 'active' : ''} key={slide.title + index} type="button" onClick={() => { onGo(index); onClose(); }}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {slide.title}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
