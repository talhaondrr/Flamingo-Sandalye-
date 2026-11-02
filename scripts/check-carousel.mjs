import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../js/featured-carousel.js', import.meta.url), 'utf8');
for (const visible of [1, 2, 3]) {
  for (const readyState of ['loading', 'interactive', 'complete']) {
    const events = {};
    const button = () => ({ addEventListener(name, callback) { this[name] = callback; } });
    const previous = button(), next = button();
    let cards = readyState === 'complete' ? Array(9).fill({ getBoundingClientRect: () => ({ width: 300 }) }) : [];
    const track = {
      clientWidth: visible * 322 - 22, scrollWidth: 9 * 322 - 22, scrollLeft: 0,
      closest: () => ({ querySelector: selector => selector === '.featured-prev' ? previous : next }),
      querySelectorAll: () => cards,
      addEventListener(name, callback) { events[name] = callback; },
      scrollTo({ left }) { this.scrollLeft = Math.min(this.scrollWidth - this.clientWidth, Math.max(0, left)); events.scroll?.(); },
    };
    let onReady;
    vm.runInNewContext(source, {
      document: { readyState, getElementById: () => track, addEventListener: (_, callback) => { onReady = callback; } },
      window: { matchMedia: () => ({ matches: true }) },
      getComputedStyle: () => ({ columnGap: '22px' }),
      requestAnimationFrame: callback => { callback(); return 1; }, cancelAnimationFrame() {},
      ResizeObserver: class { constructor(callback) { this.callback = callback; } observe() { this.callback(); } },
    });
    if (onReady) {
      assert.equal(next.click, undefined, 'Must wait for dynamically generated cards');
      cards = Array(9).fill({ getBoundingClientRect: () => ({ width: 300 }) });
      onReady();
    }
    assert.equal(previous.disabled, true);
    next.click();
    assert.equal(track.scrollLeft, 322, 'Right arrow must advance one card');
    assert.equal(previous.disabled, false);
    previous.click();
    assert.equal(track.scrollLeft, 0, 'Left arrow must return to start');
    for (let i = 0; i < 12; i++) next.click();
    assert.equal(track.scrollLeft, track.scrollWidth - track.clientWidth);
    assert.equal(next.disabled, true);
    events.keydown({ target: track, key: 'ArrowLeft', preventDefault() {} });
    assert.ok(track.scrollLeft < track.scrollWidth - track.clientWidth);
  }
}
console.log('PASS: Carousel arrows, boundaries, keyboard and delayed cards; 1/2/3 visible cards and loading/interactive/complete states.');
