/* ═══════════════════════════════════════════════════════
   NOIR & OR — Fast Food Gastronomique
   app.js
═══════════════════════════════════════════════════════ */

/* ─── DONNÉES : MENU ─────────────────────────────────── */
let menuData = [
  { id: 1,  name: 'The Black Gold',       cat: 'burgers',  price: 8500,  emoji: '🍔', desc: 'Bœuf Angus 180g, cheddar fumé, oignons caramélisés, sauce truffe noire',    active: true, badge: 'Signature'   },
  { id: 2,  name: 'Le Royal Crispy',      cat: 'burgers',  price: 7200,  emoji: '🍗', desc: 'Poulet fermier croustillant, mayo citron, pickles artisanaux, brioche dorée', active: true, badge: 'Best-seller' },
  { id: 3,  name: 'Double Trouble',       cat: 'burgers',  price: 9800,  emoji: '🔥', desc: 'Double steak Angus, double cheddar, bacon fumé, sauce BBQ maison',           active: true, badge: 'Épicé'       },
  { id: 4,  name: 'Le Végétal Noir',      cat: 'burgers',  price: 6500,  emoji: '🌿', desc: 'Galette pois chiches, avocat, tomates confites, pesto basilic',              active: true, badge: ''            },
  { id: 5,  name: 'Chicken Truffle',      cat: 'burgers',  price: 8800,  emoji: '🥇', desc: 'Blanc de poulet, brie fondu, lamelles de truffe, roquette sauvage',          active: true, badge: 'Premium'     },
  { id: 6,  name: 'Frites Or Noir',       cat: 'sides',    price: 2200,  emoji: '🍟', desc: 'Frites crinkle cut, sauce dorée à la truffe et parmesan',                   active: true, badge: ''            },
  { id: 7,  name: 'Onion Rings Gold',     cat: 'sides',    price: 2500,  emoji: '🧅', desc: "Rondelles d'oignon panées, sauce ranch maison",                             active: true, badge: ''            },
  { id: 8,  name: 'Salade Royale',        cat: 'sides',    price: 2800,  emoji: '🥗', desc: 'Mesclun, tomates cerises, croûtons, vinaigrette balsamique',                active: true, badge: ''            },
  { id: 9,  name: 'Cheese Lava Cake',     cat: 'desserts', price: 3200,  emoji: '🎂', desc: 'Fondant au fromage blanc, cœur coulant au caramel beurre salé',             active: true, badge: 'Nouveau'     },
  { id: 10, name: 'Milkshake Or',         cat: 'desserts', price: 3500,  emoji: '🥤', desc: 'Vanille bourbon, caramel salé, chantilly artisanale, biscuit spéculoos',    active: true, badge: ''            },
  { id: 11, name: 'Limonade Artisanale',  cat: 'drinks',   price: 1800,  emoji: '🍋', desc: 'Citron pressé, menthe fraîche, eau pétillante, sirop gingembre',            active: true, badge: 'Local'       },
  { id: 12, name: 'Soda Premium',         cat: 'drinks',   price: 1200,  emoji: '🥃', desc: 'Soda artisanal en bouteille — Cola, Gingembre ou Agrume',                  active: true, badge: ''            },
];

/* ─── DONNÉES : COMMANDES ────────────────────────────── */
let orders = [
  { id: '#0098', client: 'Mme Afi Kokou',  items: 'Black Gold + Frites',      amount: '10 700 F', type: 'Sur place',  status: 'En cours'  },
  { id: '#0097', client: 'M. Komi Ablo',   items: '2× Royal Crispy',          amount: '14 400 F', type: 'Livraison',  status: 'En attente' },
  { id: '#0096', client: 'Table 7',        items: 'Double Trouble + Rings',   amount: '12 300 F', type: 'Sur place',  status: 'Servi'      },
  { id: '#0095', client: 'Mme Edem Sena', items: 'Végétal Noir + Limonade',  amount: '8 300 F',  type: 'Emporter',   status: 'Payé'       },
  { id: '#0094', client: 'M. Yao Atsu',   items: 'Chicken Truffle + Milkshake', amount: '12 300 F', type: 'Livraison', status: 'Payé'     },
];

/* ─── DONNÉES : RÉSERVATIONS ─────────────────────────── */
const reservations = [
  { name: 'Famille Agbodjan',   n: 6,  date: "Aujourd'hui 19h30", occ: 'Anniversaire'   },
  { name: 'M. et Mme Koami',    n: 2,  date: "Aujourd'hui 20h00", occ: 'Romantique'     },
  { name: 'Groupe BizAfrique',  n: 10, date: 'Demain 12h30',      occ: 'Business lunch' },
  { name: 'Mme Akoua Foli',     n: 3,  date: '21 Avril 19h00',    occ: 'Famille'        },
  { name: 'M. Koffi Amegan',    n: 2,  date: '22 Avril 20h30',    occ: 'Romantique'     },
];

/* ─── ÉTAT ───────────────────────────────────────────── */
let nextId     = 13;
let curFilter  = 'all';

const STATUS_FLOW = ['En attente', 'En cours', 'Servi', 'Payé'];
const CAT_LABELS  = { burgers: 'Burgers', sides: 'Accompagnements', desserts: 'Desserts', drinks: 'Boissons' };
const CAT_LABELS_SHORT = { burgers: 'Burgers', sides: 'Sides', desserts: 'Desserts', drinks: 'Boissons' };

/* ═══════════════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════════════ */
function showView(v) {
  document.querySelectorAll('.view').forEach(x => x.classList.remove('active'));
  document.getElementById('view-' + v).classList.add('active');
  document.querySelectorAll('#navLinks a').forEach(a => {
    a.classList.toggle('active', a.dataset.v === v);
  });
  if (v === 'menu') renderMenu();
}

function goHome()  { showView('home'); }

function goAdmin() {
  document.getElementById('topbar').style.display = 'none';
  showView('admin');
  renderAdmin();
}

function exitAdmin() {
  document.getElementById('topbar').style.display = 'flex';
  showView('home');
}

/* ═══════════════════════════════════════════════════════
   PAGE : MENU PUBLIC
═══════════════════════════════════════════════════════ */
function renderMenu() {
  const visible = menuData.filter(i => {
    return i.active && (curFilter === 'all' || i.cat === curFilter);
  });

  document.getElementById('menuGrid').innerHTML = visible.map(i => `
    <div class="item-card">
      <div class="item-img">
        ${i.emoji}
        ${i.badge ? `<span class="item-badge${i.badge === 'Nouveau' ? ' new-b' : ''}">${i.badge}</span>` : ''}
      </div>
      <div class="item-body">
        <div class="item-cat">${CAT_LABELS[i.cat]}</div>
        <div class="item-name">${i.name}</div>
        <div class="item-desc">${i.desc}</div>
        <div class="item-foot">
          <span class="item-price">${i.price.toLocaleString('fr-FR')} F</span>
          <button class="btn-cmd" onclick="toast('${i.name.replace(/'/g,"\\'")} ajouté !')">Commander</button>
        </div>
      </div>
    </div>
  `).join('');
}

/* ─── Filtres menu ───────────────────────────────────── */
document.getElementById('filters').addEventListener('click', e => {
  const btn = e.target.closest('.f-btn');
  if (!btn) return;
  document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  curFilter = btn.dataset.c;
  renderMenu();
});

/* ═══════════════════════════════════════════════════════
   PAGE : RÉSERVATION
═══════════════════════════════════════════════════════ */
function submitResa() {
  toast('Réservation confirmée ! Un SMS de confirmation vous sera envoyé.');
}

/* ═══════════════════════════════════════════════════════
   ADMIN — RENDU GLOBAL
═══════════════════════════════════════════════════════ */
function renderAdmin() {
  renderKPIs();
  renderWeekChart();
  renderLastOrders();
  renderOrdersTbl();
  renderMenuTbl();
  renderResaList();
  renderStats();
  setTodayDate();
}

/* ─── Date du jour ───────────────────────────────────── */
function setTodayDate() {
  const el = document.getElementById('todayDate');
  if (!el) return;
  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  el.textContent = new Date().toLocaleDateString('fr-FR', opts) + ' · Bonne journée !';
}

/* ═══════════════════════════════════════════════════════
   ADMIN — TABLEAU DE BORD
═══════════════════════════════════════════════════════ */
function renderKPIs() {
  document.getElementById('kpis').innerHTML = `
    <div class="kpi">
      <div class="kpi-l">Commandes du jour</div>
      <div class="kpi-v">31</div>
      <div class="kpi-c up">↑ +18% vs hier</div>
    </div>
    <div class="kpi">
      <div class="kpi-l">Chiffre d'affaires</div>
      <div class="kpi-v">242 400 F</div>
      <div class="kpi-c up">↑ +11% ce mois</div>
    </div>
    <div class="kpi">
      <div class="kpi-l">Réservations</div>
      <div class="kpi-v">5</div>
      <div class="kpi-c nt">Aujourd'hui</div>
    </div>
    <div class="kpi">
      <div class="kpi-l">Plat du jour</div>
      <div class="kpi-v">Black Gold</div>
      <div class="kpi-c up">↑ 24 ventes</div>
    </div>
  `;
}

function renderWeekChart() {
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const vals  = [80, 95, 60, 110, 140, 185, 90];
  const max   = Math.max(...vals);

  document.getElementById('weekChart').innerHTML = vals.map((v, i) => `
    <div class="bc-wrap">
      <div class="bc-bar" style="height:${Math.round(v / max * 78)}px" title="${(v * 1000).toLocaleString('fr-FR')} F"></div>
    </div>
  `).join('');

  document.getElementById('weekLabels').innerHTML = days.map(d => `
    <div class="bc-lbl" style="flex:1;text-align:center">${d}</div>
  `).join('');
}

function renderLastOrders() {
  document.getElementById('lastOrders').innerHTML = orders.slice(0, 4).map(o => `
    <div class="mini-row">
      <div class="avatar">${o.client[0]}</div>
      <div class="mini-info">
        <strong>${o.client}</strong>
        <span>${o.items}</span>
      </div>
      <span class="badge ${statusClass(o.status)}">${o.status}</span>
    </div>
  `).join('');
}

/* ═══════════════════════════════════════════════════════
   ADMIN — COMMANDES
═══════════════════════════════════════════════════════ */
function statusClass(s) {
  const map = {
    'En cours':   'b-warn',
    'En attente': 'b-err',
    'Servi':      'b-inf',
    'Payé':       'b-ok',
  };
  return map[s] || 'b-gold';
}

function renderOrdersTbl() {
  const pending = orders.filter(o => o.status === 'En attente').length;
  const pb = document.getElementById('pendingBadge');
  if (pb) pb.textContent = `● ${pending} en attente`;

  document.getElementById('ordersTbl').innerHTML = orders.map(o => `
    <tr>
      <td style="color:var(--gold);font-weight:700">${o.id}</td>
      <td>${o.client}</td>
      <td style="color:var(--text3)">${o.items}</td>
      <td style="color:var(--text);font-weight:600">${o.amount}</td>
      <td><span class="badge b-inf">${o.type}</span></td>
      <td><span class="badge ${statusClass(o.status)}">${o.status}</span></td>
      <td>
        ${o.status !== 'Payé' ? `<button class="ab ab-n" onclick="advOrder('${o.id}')">→ Suivant</button>` : ''}
        <button class="ab ab-d" onclick="removeOrder('${o.id}')">Suppr.</button>
      </td>
    </tr>
  `).join('');
}

function advOrder(id) {
  const o = orders.find(x => x.id === id);
  if (!o) return;
  const i = STATUS_FLOW.indexOf(o.status);
  if (i < STATUS_FLOW.length - 1) {
    o.status = STATUS_FLOW[i + 1];
    renderOrdersTbl();
    renderLastOrders();
    renderKPIs();
    toast('Statut mis à jour : ' + o.status);
  }
}

function removeOrder(id) {
  orders = orders.filter(x => x.id !== id);
  renderOrdersTbl();
  renderLastOrders();
  toast('Commande supprimée');
}

/* ═══════════════════════════════════════════════════════
   ADMIN — GESTION MENU
═══════════════════════════════════════════════════════ */
function renderMenuTbl() {
  document.getElementById('menuTbl').innerHTML = menuData.map(i => `
    <tr>
      <td>${i.emoji} ${i.name}</td>
      <td><span class="badge b-inf">${CAT_LABELS_SHORT[i.cat]}</span></td>
      <td style="color:var(--gold);font-weight:700">${i.price.toLocaleString('fr-FR')} F</td>
      <td>${i.badge ? `<span class="badge b-gold">${i.badge}</span>` : '—'}</td>
      <td><span class="badge ${i.active ? 'b-ok' : 'b-err'}">${i.active ? 'Actif' : 'Masqué'}</span></td>
      <td>
        <button class="ab ab-e" onclick="toggleItem(${i.id})">${i.active ? 'Masquer' : 'Activer'}</button>
        <button class="ab ab-d" onclick="deleteItem(${i.id})">Suppr.</button>
      </td>
    </tr>
  `).join('');
}

function toggleItem(id) {
  const item = menuData.find(x => x.id === id);
  if (!item) return;
  item.active = !item.active;
  renderMenuTbl();
  toast(item.active ? 'Article activé' : 'Article masqué');
}

function deleteItem(id) {
  menuData = menuData.filter(x => x.id !== id);
  renderMenuTbl();
  toast('Article supprimé du menu');
}

function addItem() {
  const name  = document.getElementById('nName').value.trim();
  const price = parseInt(document.getElementById('nPrice').value);

  if (!name || !price) {
    toast('⚠ Nom et prix requis !');
    return;
  }

  menuData.push({
    id:     nextId++,
    name,
    cat:    document.getElementById('nCat').value,
    price,
    emoji:  document.getElementById('nEmoji').value || '🍔',
    desc:   document.getElementById('nDesc').value  || 'Nouvelle création du chef',
    active: true,
    badge:  document.getElementById('nBadge').value,
  });

  // Reset des champs
  ['nName', 'nPrice', 'nEmoji', 'nDesc'].forEach(id => {
    document.getElementById(id).value = '';
  });

  renderMenuTbl();
  toast('Article ajouté au menu !');
}

/* ═══════════════════════════════════════════════════════
   ADMIN — RÉSERVATIONS
═══════════════════════════════════════════════════════ */
function renderResaList() {
  document.getElementById('resaList').innerHTML = reservations.map(r => `
    <div class="mini-row">
      <div class="avatar">${r.name[0]}</div>
      <div class="mini-info">
        <strong>${r.name}</strong>
        <span>${r.n} pers · ${r.occ}</span>
      </div>
      <span class="mini-date">${r.date}</span>
      <span class="badge b-ok">Confirmé</span>
    </div>
  `).join('');
}

/* ═══════════════════════════════════════════════════════
   ADMIN — STATISTIQUES
═══════════════════════════════════════════════════════ */
function renderStats() {
  renderMonthlyChart();
  renderTopItems();
}

function renderMonthlyChart() {
  const months = ['Nov', 'Déc', 'Jan', 'Fév', 'Mar', 'Avr'];
  const vals   = [880, 1020, 750, 1180, 1350, 920];
  const max    = Math.max(...vals);

  document.getElementById('monthChart').innerHTML = `
    <div class="month-bars">
      ${vals.map((v, i) => `
        <div class="mb-col">
          <span class="mb-val">${Math.round(v)}K</span>
          <div class="mb-bar" style="height:${Math.round(v / max * 90)}px;background:rgba(201,168,76,${i === 4 ? '0.9' : '0.25'})"></div>
          <span class="mb-lbl">${months[i]}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderTopItems() {
  const top = [
    { n: 'The Black Gold',  c: 186, p: 100 },
    { n: 'Royal Crispy',    c: 154, p: 83  },
    { n: 'Double Trouble',  c: 112, p: 60  },
    { n: 'Frites Or Noir',  c: 198, p: 100 },
  ];

  document.getElementById('topItems').innerHTML = top.map(t => `
    <div class="progress-row">
      <div class="pr-head">
        <span>${t.n}</span>
        <span>${t.c} ventes</span>
      </div>
      <div class="pr-bar">
        <div class="pr-fill" style="width:${t.p}%"></div>
      </div>
    </div>
  `).join('');
}

/* ═══════════════════════════════════════════════════════
   SIDEBAR ADMIN — Navigation entre panels
═══════════════════════════════════════════════════════ */
document.querySelectorAll('.sn').forEach(s => {
  s.addEventListener('click', () => {
    document.querySelectorAll('.sn').forEach(x => x.classList.remove('on'));
    s.classList.add('on');
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('on'));
    document.getElementById('panel-' + s.dataset.p).classList.add('on');
  });
});

/* ═══════════════════════════════════════════════════════
   NAVIGATION TOPBAR — Liens
═══════════════════════════════════════════════════════ */
document.querySelectorAll('#navLinks a').forEach(a => {
  a.addEventListener('click', () => showView(a.dataset.v));
});

/* ═══════════════════════════════════════════════════════
   TOAST — Notification
═══════════════════════════════════════════════════════ */
function toast(msg) {
  const t = document.getElementById('toast');
  const m = document.getElementById('toastMsg');
  m.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3000);
}

/* ═══════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════ */
renderMenu();
