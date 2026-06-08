// dsmtech — progressive enhancement for the companies table.
// Without JS the full table still renders; this adds search, filtering,
// sorting, shareable URL state, and view transitions.

const $ = (selector) => document.querySelector(selector);

const form = $('#filters');
const q = $('#q');
const count = $('#count');
const table = $('#companies');
const tbody = table.tBodies[0];
const rows = [...tbody.querySelectorAll('tr.co')];

const collator = new Intl.Collator('en', { sensitivity: 'base' });

const haystack = new Map(
  rows.map((row) => [
    row,
    `${row.dataset.name} ${row.querySelector('.c-desc').textContent} ${row.dataset.city} ${row.dataset.category}`.toLowerCase()
  ])
);

// Animate discrete updates (filter clicks, sorts — not keystrokes) with the
// View Transitions API where available.
const animated = (update) =>
  document.startViewTransition ? document.startViewTransition(update) : update();

function applyFilters() {
  const query = q.value.trim().toLowerCase();
  const type = new FormData(form).get('type') ?? '';

  let shown = 0;
  for (const row of rows) {
    const match =
      (!type || row.dataset.category === type) &&
      (!query || haystack.get(row).includes(query));
    row.hidden = !match;
    if (match) shown += 1;
  }
  count.value = String(shown);

  const params = new URLSearchParams();
  if (query) params.set('q', q.value.trim());
  if (type) params.set('type', type);
  history.replaceState(null, '', params.size ? `?${params}` : location.pathname);
}

q.addEventListener('input', applyFilters);
form.addEventListener('submit', (event) => event.preventDefault());
form.addEventListener('change', (event) => {
  if (event.target.name === 'type') animated(applyFilters);
});

$('#reset').addEventListener('click', () => {
  form.reset();
  animated(applyFilters);
  q.focus();
});

// Column sorting (Company / Type / HQ), name as tiebreaker.
let order = { key: 'name', dir: 1 };

for (const button of table.tHead.querySelectorAll('button[data-sort]')) {
  button.addEventListener('click', () => {
    const key = button.dataset.sort;
    order = { key, dir: order.key === key ? -order.dir : 1 };

    for (const th of table.tHead.rows[0].cells) th.removeAttribute('aria-sort');
    button
      .closest('th')
      .setAttribute('aria-sort', order.dir === 1 ? 'ascending' : 'descending');

    rows.sort(
      (a, b) =>
        order.dir * collator.compare(a.dataset[key], b.dataset[key]) ||
        collator.compare(a.dataset.name, b.dataset.name)
    );
    animated(() => tbody.prepend(...rows));
  });
}

// Press “/” anywhere to jump to search.
addEventListener('keydown', (event) => {
  if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return;
  const active = document.activeElement;
  if (active?.tagName === 'INPUT' || active?.tagName === 'TEXTAREA' || active?.isContentEditable)
    return;
  event.preventDefault();
  q.focus();
  q.select();
});

// Restore shareable state from the URL (?q=…&type=…).
const params = new URLSearchParams(location.search);
q.value = params.get('q') ?? '';
const type = params.get('type');
if (type) {
  const radio = form.querySelector(`input[name="type"][value="${CSS.escape(type)}"]`);
  if (radio) radio.checked = true;
}
if (params.size > 0) applyFilters();
