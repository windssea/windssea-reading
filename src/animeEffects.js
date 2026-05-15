import { animate as animeAnimate } from 'animejs';

const easeOut = 'out(4)';
const easeSoft = 'outCubic';

function canAnimate() {
  return typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function register(animation) {
  if (!animation) return null;

  window.__hfAnime = window.__hfAnime || [];
  window.__hfAnime.push(animation);

  return animation;
}

function animate(target, params = {}) {
  if (!target || !canAnimate()) return null;

  const animation = animeAnimate(target, {
    autoplay: false,
    ease: easeOut,
    duration: 520,
    ...params
  });

  register(animation);
  animation.play();

  return animation;
}

function stagger(items, paramsForItem, baseOptions = {}) {
  return items
    .map((item, index) =>
      animate(item, {
        delay: index * 42,
        ...baseOptions,
        ...paramsForItem(item, index)
      })
    )
    .filter(Boolean);
}

function stopAll(animations) {
  animations.forEach((animation) => {
    if (typeof animation.cancel === 'function') {
      animation.cancel();
    } else {
      animation.pause();
    }
  });
}

export function runSlideAnime(slide, { direction = 1, isMobile = false } = {}) {
  if (!slide || !canAnimate()) return () => {};

  const animations = [];
  const add = (animation) => {
    if (animation) animations.push(animation);
  };

  const travel = isMobile ? 24 : 72;
  add(
    animate(slide, {
      opacity: [0, 1],
      x: [direction * travel, 0],
      scale: [isMobile ? 0.988 : 0.965, 1],
      filter: ['blur(7px)', 'blur(0px)'],
      duration: isMobile ? 420 : 680,
      ease: easeSoft
    })
  );

  add(
    animate(slide.querySelector('.slide-header'), {
      opacity: [0, 1],
      y: [-20, 0],
      duration: 460,
      delay: 80,
      ease: easeOut
    })
  );

  add(
    animate(slide.querySelector('h1, h2'), {
      opacity: [0, 1],
      y: [isMobile ? 22 : 38, 0],
      scale: [0.98, 1],
      filter: ['blur(5px)', 'blur(0px)'],
      duration: isMobile ? 520 : 760,
      delay: 130,
      ease: 'outBack'
    })
  );

  add(
    animate(slide.querySelector('.subtitle, blockquote, .formula.wide'), {
      opacity: [0, 1],
      y: [22, 0],
      duration: 620,
      delay: 240,
      ease: easeOut
    })
  );

  add(
    animate(slide.querySelector('.title-visual, .radial-center, .book-card'), {
      opacity: [0, 1],
      y: [28, 0],
      rotate: [-5, 0],
      scale: [0.86, 1],
      duration: 900,
      delay: 220,
      ease: 'outElastic(1, .72)'
    })
  );

  const cardTargets = [
    ...slide.querySelectorAll(
      '.goal, .check-item, .card-grid article, .mini-grid article, .process-list article, .split-layout article, .compare-grid article, .three-grid article, .radial article, .tip-row span, .tag-wrap span, .path-card span'
    )
  ];

  animations.push(
    ...stagger(
      cardTargets,
      () => ({
        opacity: [0, 1],
        y: [isMobile ? 18 : 32, 0],
        scale: [0.92, 1],
        rotate: [direction * 0.8, 0]
      }),
      { duration: isMobile ? 460 : 680, delay: 280, ease: 'outBack' }
    )
  );

  animations.push(
    ...stagger(
      [...slide.querySelectorAll('tbody tr')],
      () => ({
        opacity: [0, 1],
        x: [direction * 34, 0],
        filter: ['blur(3px)', 'blur(0px)']
      }),
      { duration: isMobile ? 360 : 520, delay: 220, ease: easeOut }
    )
  );

  return () => stopAll(animations);
}

export function runRailAnime(rail, collapsed) {
  if (!rail || !canAnimate()) return () => {};

  const animations = [];
  const add = (animation) => {
    if (animation) animations.push(animation);
  };

  add(
    animate(rail, {
      opacity: [0.92, 1],
      x: [collapsed ? -18 : 18, 0],
      duration: 360,
      ease: easeSoft
    })
  );

  animations.push(
    ...stagger(
      [...rail.querySelectorAll('nav button')],
      () => ({
        opacity: [0, 1],
        x: [collapsed ? -14 : 14, 0],
        scale: [0.92, 1]
      }),
      { duration: 360, delay: 70, ease: 'outBack' }
    )
  );

  return () => stopAll(animations);
}

export function runButtonTapAnime(button) {
  return animate(button, {
    scale: [
      { to: 0.9, duration: 95 },
      { to: 1.04, duration: 110 },
      { to: 1, duration: 120 }
    ],
    duration: 325,
    ease: 'outBack'
  });
}
