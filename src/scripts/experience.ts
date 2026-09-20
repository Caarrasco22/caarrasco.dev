const motion = matchMedia('(prefers-reduced-motion: reduce)');
const desktop = matchMedia('(min-width: 761px)');
const chapters = [...document.querySelectorAll<HTMLElement>('[data-chapter]')];
const artworks = [...document.querySelectorAll<HTMLElement>('[data-art]')];
const progress = document.querySelector<HTMLElement>('.reading-progress');
const navLinks = [...document.querySelectorAll<HTMLAnchorElement>('.editorial-header nav a')];
const navSections = navLinks.map(link => document.querySelector<HTMLElement>(link.hash));
let scheduled = false;
let activeChapter = '';

// Match the pinned artwork to the chapter nearest the viewport's reading line.
function updateScroll() {
  scheduled = false;
  const available = document.documentElement.scrollHeight - innerHeight;
  if (progress) progress.style.transform = `scaleX(${available > 0 ? scrollY / available : 0})`;
  if (desktop.matches) {
    const readingLine = innerHeight * .52;
    let closest = chapters[0];
    let distance = Infinity;
    chapters.forEach(chapter => {
      const rect = chapter.getBoundingClientRect();
      const current = Math.abs(rect.top + rect.height / 2 - readingLine);
      if (current < distance) { closest = chapter; distance = current; }
    });
    if (closest && activeChapter !== closest.dataset.chapter) {
      activeChapter = closest.dataset.chapter!;
      artworks.forEach(art => art.classList.toggle('is-active', art.dataset.art === activeChapter));
    }
  }
  let active = -1;
  navSections.forEach((section, index) => {
    if (section && section.getBoundingClientRect().top < innerHeight * .45) active = index;
  });
  navLinks.forEach((link, index) => {
    if (active === index) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
function scheduleScroll() {
  if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); }
}
addEventListener('scroll', scheduleScroll, { passive: true });
addEventListener('resize', scheduleScroll);
addEventListener('pageshow', scheduleScroll);
document.querySelectorAll('details').forEach(detail => detail.addEventListener('toggle', scheduleScroll));
new ResizeObserver(scheduleScroll).observe(document.body);
updateScroll();

const reel = document.querySelector<HTMLVideoElement>('[data-reel]');
const reelToggle = document.querySelector<HTMLButtonElement>('[data-reel-toggle]');
const film = document.querySelector<HTMLVideoElement>('[data-film]');
const filmPlay = document.querySelector<HTMLButtonElement>('[data-film-play]');
let manuallyPaused = false;
let reelVisible = true;
let reelLoaded = false;
const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

function syncReel() {
  if (!reel || !reelToggle) return;
  const playing = !reel.paused;
  reel.classList.toggle('is-playing', playing || reel.currentTime > 0);
  reelToggle.setAttribute('aria-label', playing ? 'Pausar vídeo de portada' : 'Reproducir vídeo de portada');
  reelToggle.title = reelToggle.getAttribute('aria-label')!;
  reelToggle.querySelector<HTMLElement>('[data-play-icon]')!.hidden = playing;
  reelToggle.querySelector<HTMLElement>('[data-pause-icon]')!.hidden = !playing;
}
async function playReel() {
  if (!reel) return;
  if (!reelLoaded) {
    const source = reel.querySelector('source')!;
    source.src = source.dataset.src!;
    reel.load();
    reelLoaded = true;
  }
  try { await reel.play(); } catch { syncReel(); }
}
function automaticReel() {
  if (!reel) return;
  if (!motion.matches && desktop.matches && !saveData && !manuallyPaused && reelVisible && !document.hidden && (!film || film.paused)) void playReel();
  else reel.pause();
}
if (reel && reelToggle) {
  reelToggle.hidden = motion.matches;
  reel.addEventListener('play', syncReel);
  reel.addEventListener('pause', syncReel);
  reel.addEventListener('error', () => { reelToggle.hidden = true; reel.classList.remove('is-playing'); });
  reel.querySelector('source')?.addEventListener('error', () => { reelToggle.hidden = true; });
  reelToggle.addEventListener('click', () => {
    if (reel.paused) { manuallyPaused = false; void playReel(); }
    else { manuallyPaused = true; reel.pause(); }
  });
  new IntersectionObserver(entries => {
    reelVisible = entries[0].isIntersecting;
    automaticReel();
  }, { threshold: .1 }).observe(reel);
  document.addEventListener('visibilitychange', automaticReel);
  motion.addEventListener('change', () => { reelToggle.hidden = motion.matches; automaticReel(); });
  desktop.addEventListener('change', automaticReel);
}
if (film && filmPlay) {
  filmPlay.hidden = false;
  film.controls = false;
  filmPlay.addEventListener('click', async () => {
    filmPlay.hidden = true;
    film.controls = true;
    reel?.pause();
    try { await film.play(); } catch { film.focus(); }
  });
  film.addEventListener('play', () => { reel?.pause(); filmPlay.hidden = true; film.controls = true; });
  // Native controls and the adjacent direct link remain usable if playback fails.
  film.addEventListener('error', () => { filmPlay.hidden = true; film.controls = true; });
  new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) film.pause();
  }, { threshold: .05 }).observe(film);
  document.addEventListener('visibilitychange', () => { if (document.hidden) film.pause(); });
}
