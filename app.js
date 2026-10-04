(() => {
  'use strict';
  const KEY = 'daily-coach-data-v1';
  const MEALS = [
    { id: 'breakfast', label: '早餐', icon: '☀️' },
    { id: 'lunch', label: '午餐', icon: '🥗' },
    { id: 'dinner', label: '晚餐', icon: '🌙' },
    { id: 'snack', label: '點心', icon: '🍌' }
  ];
  const NUTRIENTS = [
    { id: 'kcal', label: '熱量', unit: 'kcal', color: '#255f4d' },
    { id: 'protein', label: '蛋白質', unit: 'g', color: '#e4a052' },
    { id: 'carbs', label: '碳水', unit: 'g', color: '#779fbe' },
    { id: 'fat', label: '脂肪', unit: 'g', color: '#d27c6d' },
    { id: 'fiber', label: '纖維', unit: 'g', color: '#8caf68' },
    { id: 'water', label: '飲水', unit: 'ml', color: '#67a9a1' }
  ];
  const FOODS = [
    { id: 'oats', name: '燕麥', emoji: '🌾', unit: 'g', qty: 100, kcal: 389, protein: 16.9, carbs: 66.3, fat: 6.9, fiber: 10.6 },
    { id: 'soy', name: '無糖豆漿', emoji: '🥛', unit: 'ml', qty: 100, kcal: 33, protein: 3.3, carbs: 1.2, fat: 1.8, fiber: 0.4 },
    { id: 'egg', name: '雞蛋／茶葉蛋', emoji: '🥚', unit: '個', qty: 1, kcal: 72, protein: 6.3, carbs: 0.4, fat: 4.8, fiber: 0 },
    { id: 'sweet-potato', name: '地瓜', emoji: '🍠', unit: 'g', qty: 100, kcal: 86, protein: 1.6, carbs: 20.1, fat: 0.1, fiber: 3 },
    { id: 'greek-yogurt', name: '希臘優格（原味）', emoji: '🥣', unit: 'g', qty: 100, kcal: 97, protein: 9, carbs: 3.9, fat: 5, fiber: 0 },
    { id: 'banana', name: '香蕉', emoji: '🍌', unit: 'g', qty: 100, kcal: 89, protein: 1.1, carbs: 22.8, fat: 0.3, fiber: 2.6 },
    { id: 'nuts', name: '綜合堅果', emoji: '🥜', unit: 'g', qty: 100, kcal: 607, protein: 20, carbs: 21, fat: 54, fiber: 8 },
    { id: 'chicken', name: '雞胸肉（熟）', emoji: '🍗', unit: 'g', qty: 100, kcal: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0 },
    { id: 'rice', name: '白飯（熟）', emoji: '🍚', unit: 'g', qty: 100, kcal: 130, protein: 2.7, carbs: 28.2, fat: 0.3, fiber: 0.4 },
    { id: 'vegetables', name: '綜合蔬菜（熟）', emoji: '🥦', unit: 'g', qty: 100, kcal: 35, protein: 2.5, carbs: 6, fat: 0.5, fiber: 3 },
    { id: 'white-fish', name: '白肉魚（熟）', emoji: '🐟', unit: 'g', qty: 100, kcal: 110, protein: 23, carbs: 0, fat: 2, fiber: 0 },
    { id: 'tofu', name: '板豆腐', emoji: '◻️', unit: 'g', qty: 100, kcal: 90, protein: 9, carbs: 2, fat: 5, fiber: 1 },
    { id: 'shrimp', name: '蝦仁（熟）', emoji: '🦐', unit: 'g', qty: 100, kcal: 99, protein: 24, carbs: 0.2, fat: 0.3, fiber: 0 },
    { id: 'milk', name: '低脂牛奶', emoji: '🥛', unit: 'ml', qty: 100, kcal: 46, protein: 3.2, carbs: 4.8, fat: 1.5, fiber: 0 },
    { id: 'beef', name: '瘦牛肉（熟）', emoji: '🥩', unit: 'g', qty: 100, kcal: 190, protein: 29, carbs: 0, fat: 8, fiber: 0 }
  ];
  const BREAKFASTS = [
    { name: '早餐 A', items: [['oats', 50], ['soy', 300], ['egg', 2], ['banana', 100]] },
    { name: '早餐 B', items: [['sweet-potato', 200], ['egg', 2], ['greek-yogurt', 150], ['nuts', 10]] },
    { name: '早餐 C', items: [['oats', 40], ['greek-yogurt', 200], ['egg', 2], ['nuts', 10]] }
  ];
  const TRAINING = {
    1: { name: '背部・後三角・二頭', focus: 'Back + Rear Delts + Biceps', exercises: [
      ['lat-pulldown', 'Lat Pulldown', 3, 8, 12], ['seated-cable-row', 'Seated Cable Row', 3, 8, 12], ['chest-supported-row', 'Chest Supported Row', 2, 10, 12], ['straight-arm-pulldown', 'Straight Arm Pulldown', 2, 12, 15], ['reverse-pec-deck', 'Reverse Pec Deck', 3, 12, 15], ['face-pull', 'Face Pull', 2, 12, 15], ['dumbbell-curl', 'Dumbbell Curl', 2, 10, 12], ['hammer-curl', 'Hammer Curl', 2, 10, 12], ['plank', 'Plank', 3, 30, 45, '秒']
    ] },
    2: { name: '腿部・核心', focus: 'Legs + Core', exercises: [
      ['leg-press', 'Leg Press', 3, 8, 12], ['romanian-deadlift', 'Romanian Deadlift', 3, 8, 12], ['leg-extension', 'Leg Extension', 2, 10, 15], ['leg-curl', 'Leg Curl', 2, 10, 15], ['calf-raise', 'Calf Raise', 3, 12, 15], ['cable-crunch', 'Cable Crunch', 3, 10, 15], ['dead-bug', 'Dead Bug', 3, 8, 12]
    ] },
    3: { name: '胸部・肩膀・三頭', focus: 'Chest + Shoulders + Triceps', exercises: [
      ['machine-chest-press', 'Machine Chest Press', 3, 8, 12], ['incline-dumbbell-press', 'Incline Dumbbell Press', 3, 8, 12], ['cable-fly', 'Cable Fly', 2, 12, 15], ['lateral-raise', 'Lateral Raise', 3, 12, 15], ['shoulder-press', 'Shoulder Press', 2, 8, 12], ['rope-pushdown', 'Rope Pushdown', 3, 10, 15], ['overhead-triceps-extension', 'Overhead Triceps Extension', 2, 10, 15]
    ] },
    5: { name: '上半身', focus: 'Upper Body', exercises: [
      ['machine-chest-press', 'Machine Chest Press', 2, 8, 12], ['lat-pulldown', 'Lat Pulldown', 2, 8, 12], ['cable-row', 'Cable Row', 2, 8, 12], ['lateral-raise', 'Lateral Raise', 3, 12, 15], ['reverse-pec-deck', 'Reverse Pec Deck', 2, 12, 15], ['cable-curl', 'Cable Curl', 2, 10, 15], ['rope-pushdown', 'Rope Pushdown', 2, 10, 15]
    ] },
    6: { name: '下半身・手臂・核心', focus: 'Lower Body + Arms + Core', exercises: [
      ['hack-squat', 'Hack Squat／Leg Press', 3, 8, 12], ['romanian-deadlift', 'Romanian Deadlift', 2, 8, 12], ['leg-curl', 'Leg Curl', 2, 10, 15], ['leg-extension', 'Leg Extension', 2, 10, 15], ['calf-raise', 'Calf Raise', 3, 12, 15], ['hammer-curl', 'Hammer Curl', 2, 10, 12], ['rope-pushdown', 'Rope Pushdown', 2, 10, 12], ['cable-crunch', 'Cable Crunch', 3, 10, 15], ['plank', 'Plank', 3, 30, 45, '秒']
    ] }
  };
  const MEAL_NAMES = Object.fromEntries(MEALS.map(m => [m.id, m.label]));
  const MEAL_ICONS = Object.fromEntries(MEALS.map(m => [m.id, m.icon]));
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const number = (v, fallback = 0) => Number.isFinite(Number(v)) ? Number(v) : fallback;
  const round = (v, places = 0) => Math.round((number(v) + Number.EPSILON) * 10 ** places) / 10 ** places;
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
  const localDate = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const shiftDate = (iso, offset) => { const d = new Date(`${iso}T12:00:00`); d.setDate(d.getDate() + offset); return localDate(d); };
  const dateLabel = iso => new Intl.DateTimeFormat('zh-TW', { month: 'long', day: 'numeric', weekday: 'long' }).format(new Date(`${iso}T12:00:00`));
  const today = localDate();
  const blankDay = () => ({ meals: { breakfast: [], lunch: [], dinner: [], snack: [] }, water: 0, sleep: null, energy: null, soreness: null, weighIn: null, waist: null, bodyFat: null, workoutDone: false, cardioDone: false, exercises: {} });
  const defaults = () => ({
    profile: { age: 20, sex: '男性', height: 165, weight: 58, activity: 1.2, goal: '體態重組', calories: 1850, protein: 120, carbs: 225, fat: 50, fiber: 28, water: 2200 },
    days: {}, restaurants: [], customFoods: [], createdAt: today
  });
  function loadData() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY));
      if (!saved || !saved.profile || !saved.days) return defaults();
      const d = defaults();
      return { ...d, ...saved, profile: { ...d.profile, ...saved.profile }, days: saved.days, restaurants: Array.isArray(saved.restaurants) ? saved.restaurants : [], customFoods: Array.isArray(saved.customFoods) ? saved.customFoods : [] };
    } catch { return defaults(); }
  }
  let data = loadData();
  let route = 'today';
  let selectedDate = today;
  let searchTerm = '';
  function save() { localStorage.setItem(KEY, JSON.stringify(data)); }
  function getDay(date = selectedDate) { data.days[date] ||= blankDay(); return data.days[date]; }
  function allFoods() { return [...FOODS, ...data.customFoods]; }
  function getFood(id) { return allFoods().find(food => food.id === id); }
  function amountNutrition(food, amount) {
    const factor = amount / number(food.qty, 100);
    return Object.fromEntries(['kcal', 'protein', 'carbs', 'fat', 'fiber'].map(key => [key, round(number(food[key]) * factor, 1)]));
  }
  function totals(day = getDay()) {
    const sum = { kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };
    Object.values(day.meals).forEach(items => items.forEach(item => Object.keys(sum).forEach(key => { sum[key] += number(item[key]); })));
    Object.keys(sum).forEach(key => { sum[key] = round(sum[key], 1); });
    return sum;
  }
  function goals() { const p = data.profile; return { kcal: number(p.calories, 1850), protein: number(p.protein, 120), carbs: number(p.carbs, 225), fat: number(p.fat, 50), fiber: number(p.fiber, 28), water: number(p.water, 2200) }; }
  function pct(value, goal) { return Math.min(100, Math.max(0, goal ? value / goal * 100 : 0)); }
  function fmt(value, decimals = 0) { return new Intl.NumberFormat('zh-TW', { maximumFractionDigits: decimals }).format(round(value, decimals)); }
  function macroLine(item) { return `${fmt(item.kcal)} kcal · P ${fmt(item.protein, 1)} · C ${fmt(item.carbs, 1)} · F ${fmt(item.fat, 1)}`; }
  function sourceBadge(source = 'estimate') { return source === 'fact' ? '<span class="tag fact">FACT・標示數值</span>' : '<span class="tag estimate">ESTIMATE・估算</span>'; }
  function loggedItem(food, amount, sourceOverride) {
    const nutrition = amountNutrition(food, amount);
    return { id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`, foodId: food.id, name: food.name, amount: number(amount), unit: food.unit, source: sourceOverride || food.source || 'estimate', ...nutrition };
  }
  function navMarkup() {
    $$('.nav-item, .bottom-nav button').forEach(button => button.classList.toggle('active', button.dataset.route === route));
  }
  function goalItem(nutrient, consumed, target) {
    const rem = Math.max(0, target - consumed);
    const color = nutrient.color ? `style="background:${nutrient.color};width:${pct(consumed, target)}%"` : `style="width:${pct(consumed, target)}%"`;
    return `<div class="goal-item"><div class="goal-top"><span class="goal-dot" style="background:${nutrient.color}"></span><span class="goal-name">${nutrient.label}</span></div><div class="goal-values">${fmt(consumed, nutrient.id === 'kcal' || nutrient.id === 'water' ? 0 : 1)} <small>/ ${fmt(target)} ${nutrient.unit}</small></div><div class="progress-track"><div class="progress-fill" ${color}></div></div><div class="small-muted" style="margin-top:6px">還差 ${fmt(rem, nutrient.id === 'kcal' || nutrient.id === 'water' ? 0 : 1)} ${nutrient.unit}</div></div>`;
  }
  function workoutForDate(date) { return TRAINING[new Date(`${date}T12:00:00`).getDay()] || null; }
  function coachText(date) {
    const day = getDay(date), t = totals(day), g = goals();
    const left = Math.max(0, g.protein - t.protein), kcal = Math.max(0, g.kcal - t.kcal);
    if (workoutForDate(date) && !day.workoutDone) return `今天安排${workoutForDate(date).name}，先用能穩定控制的重量熟悉動作，保留約 2–4 下餘裕。${left > 20 ? `飲食方面還有 ${fmt(left)} g 蛋白質空間，晚餐可以優先選魚、雞肉或豆腐。` : ''}`;
    if (!workoutForDate(date)) return '今天是恢復日。散步或簡單活動即可，讓身體為下一次訓練做好準備。照常吃飯補水，不需要額外補做訓練。';
    if (kcal < 150 && left > 15) return `今天熱量已接近目標，蛋白質還差約 ${fmt(left)} g。可用低脂、高蛋白食物補足，份量依包裝標示調整。`;
    return `目前約吃進 ${fmt(t.kcal)} kcal，蛋白質 ${fmt(t.protein)} g。距離今日目標還有 ${fmt(kcal)} kcal、${fmt(left)} g 蛋白質；照平常節奏安排下一餐就好。`;
  }
  function pageHeading(eyebrow, title, description, chip = '') {
    return `<div class="page-heading"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p>${description}</p></div>${chip ? `<span class="date-pill">${chip}</span>` : ''}</div>`;
  }
  function renderToday() {
    const day = getDay(), t = totals(day), g = goals(), plan = workoutForDate(selectedDate);
    const dinner = dinnerPlan(t, g);
    const greeting = selectedDate === today ? '一步一步來，也算數。' : dateLabel(selectedDate);
    const meals = MEALS.map(m => {
      const items = day.meals[m.id] || [];
      const mealKcal = items.reduce((s, item) => s + number(item.kcal), 0);
      const protein = items.reduce((s, item) => s + number(item.protein), 0);
      return `<div class="meal-row"><span class="meal-symbol">${m.icon}</span><div class="meal-info"><strong>${m.label}</strong><small>${items.length ? `${items.length} 項食物 · 蛋白質 ${fmt(protein, 1)} g` : '尚未記錄'}</small></div><div class="meal-kcal">${items.length ? `${fmt(mealKcal)} kcal` : '—'}<small>${items.length ? '已記錄' : '待記錄'}</small></div><span class="meal-state ${items.length ? 'done' : ''}"></span></div>`;
    }).join('');
    const workoutLabel = plan ? plan.name : '休息與恢復';
    const workoutMeta = plan ? `重訓 ${plan.exercises.length} 個動作 · 坡度走 40 分鐘（舒服、可交談的強度）` : '散步、伸展或完全休息都可以';
    const recovery = `<form id="checkin-form" class="checkin-grid"><div class="field"><label for="sleep">睡眠（小時）</label><input id="sleep" name="sleep" type="number" min="0" max="24" step="0.25" placeholder="7.5" value="${day.sleep ?? ''}"></div><div class="field"><label for="energy">精神（1–10）</label><select id="energy" name="energy"><option value="">選擇</option>${Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}" ${Number(day.energy) === i + 1 ? 'selected' : ''}>${i + 1}</option>`).join('')}</select></div><div class="field"><label for="soreness">痠痛（1–10）</label><select id="soreness" name="soreness"><option value="">選擇</option>${Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}" ${Number(day.soreness) === i + 1 ? 'selected' : ''}>${i + 1}</option>`).join('')}</select></div></form>`;
    $('#view').innerHTML = `${pageHeading('SUNDAY · DAILY CHECK-IN', greeting, '讓日常的選擇，慢慢累積成你要的狀態。', dateLabel(selectedDate))}
      <div class="dashboard-grid">
        <div class="stack">
          <section class="card hero-card"><p class="eyebrow">今天的教練提醒</p><h2>${selectedDate === today ? '做得到的小事，最有力量。' : escapeHTML(dateLabel(selectedDate))}</h2><p>${escapeHTML(coachText(selectedDate))}</p><div class="hero-meta"><span>${escapeHTML(data.profile.goal || '體態重組')}</span><span>初期建立習慣・RPE 6–8</span></div></section>
          <section class="card"><div class="card-header"><div><h2 class="card-title">今日營養目標</h2><p class="card-subtitle">已吃入 · 目標；資料為估算值</p></div><button class="text-link" data-route="food">記錄飲食 ↗</button></div><div class="goal-grid">${NUTRIENTS.map(n => goalItem(n, n.id === 'water' ? day.water : t[n.id], g[n.id])).join('')}</div></section>
          <section class="card"><div class="card-header"><div><h2 class="card-title">餐點紀錄</h2><p class="card-subtitle">簡單記錄，不用追求每一餐都完美</p></div><button class="text-link" data-route="food">查看飲食 ↗</button></div><div class="meal-list">${meals}</div></section>
        </div>
        <div class="stack">
          <section class="card"><div class="card-header"><div><h2 class="card-title">今天的訓練</h2><p class="card-subtitle">${escapeHTML(plan ? plan.focus : '休息日・輕鬆活動')}</p></div><button class="text-link" data-route="workout">訓練 ↗</button></div><div class="workout-summary"><span class="workout-emblem">${plan ? '⌁' : '☁'}</span><div><strong>${escapeHTML(workoutLabel)}</strong><small>${escapeHTML(workoutMeta)}</small></div><span class="status-tag">${!plan ? '恢復' : day.workoutDone ? '已完成' : '待開始'}</span></div></section>
          <section class="card"><div class="card-header"><div><h2 class="card-title">今日飲水</h2><p class="card-subtitle">目標 ${fmt(g.water)} ml</p></div></div><div class="water-card"><span class="water-icon">💧</span><div class="water-copy"><strong>${fmt(day.water)} <small style="font-size:10px;color:#84938b">/ ${fmt(g.water)} ml</small></strong><div class="progress-track"><div class="progress-fill" style="background:#67a9a1;width:${pct(day.water, g.water)}%"></div></div></div><div class="water-actions"><button data-action="water" data-amount="250">+250</button><button data-action="water" data-amount="500">+500</button></div></div></section>
          <section class="card"><div class="card-header"><div><h2 class="card-title">身體狀態</h2><p class="card-subtitle">幾秒鐘留下有用的恢復線索</p></div><span class="tag estimate">自我感受</span></div>${recovery}<div style="display:flex;justify-content:flex-end;margin-top:11px"><button class="primary-button" data-action="save-checkin">儲存狀態</button></div></section>
          <section class="card"><div class="card-header"><div><h2 class="card-title">晚餐方向</h2><p class="card-subtitle">依剩餘目標估算份量</p></div><span class="tag estimate">ESTIMATE</span></div>${dinner ? `<p class="small-muted" style="line-height:1.8">熟雞胸 ${fmt(dinner.items.find(x => x[0] === 'chicken')?.[1] || 0)} g、熟白飯 ${fmt(dinner.items.find(x => x[0] === 'rice')?.[1] || 0)} g、蔬菜 ${fmt(dinner.items.find(x => x[0] === 'vegetables')?.[1] || 0)} g。約 ${fmt(dinner.nutrition.kcal)} kcal · 蛋白質 ${fmt(dinner.nutrition.protein, 1)} g。</p><button class="secondary-button" data-action="log-dinner-plan" style="margin-top:9px">加入晚餐紀錄</button>` : `<p class="small-muted">${escapeHTML(dailySuggestion(t, g))}</p><button class="secondary-button" data-route="food" style="margin-top:9px">安排下一餐</button>`}</section>
        </div>
      </div>`;
  }
  function dailySuggestion(t, g) {
    const leftProtein = Math.max(0, g.protein - t.protein), leftKcal = Math.max(0, g.kcal - t.kcal);
    if (leftProtein < 10 && leftKcal < 300) return '今天的主要目標大致完成。補充水分、按平常時間休息，就很好。';
    if (leftProtein > 25) return `還有約 ${fmt(leftProtein)} g 蛋白質與 ${fmt(leftKcal)} kcal 的空間。下一餐可以挑一份有標示蛋白質的魚、雞肉、蛋或豆腐，再配蔬菜和適量主食。`;
    return `還有約 ${fmt(leftKcal)} kcal 可安排。依飢餓感正常吃一份均衡餐點即可，毋須為了湊數硬吃。`;
  }
  function dinnerPlan(t, g) {
    const leftKcal = g.kcal - t.kcal, leftProtein = g.protein - t.protein, leftCarbs = g.carbs - t.carbs;
    if (leftKcal < 130) return null;
    const vegetables = 150;
    const vegNut = amountNutrition(FOODS.find(f => f.id === 'vegetables'), vegetables);
    const chickenTarget = Math.min(180, Math.max(80, Math.round(Math.max(0, leftProtein / 3 - vegNut.protein) / 31 * 100 / 10) * 10));
    const chickenBudget = Math.floor(Math.max(0, leftKcal - vegNut.kcal) / 1.65 / 10) * 10;
    const chicken = Math.min(chickenTarget, chickenBudget);
    if (chicken < 50) return null;
    const chickenNut = amountNutrition(FOODS.find(f => f.id === 'chicken'), chicken);
    const riceCarbBudget = Math.floor(Math.max(0, leftCarbs - vegNut.carbs) / 0.282 / 10) * 10;
    const riceCalBudget = Math.floor(Math.max(0, leftKcal - vegNut.kcal - chickenNut.kcal) / 1.3 / 10) * 10;
    const rice = Math.max(0, Math.min(180, riceCarbBudget, riceCalBudget));
    const items = [['chicken', chicken], ['rice', rice], ['vegetables', vegetables]].filter(([, amount]) => amount > 0);
    const nutrition = items.reduce((sum, [id, amount]) => { const part = amountNutrition(FOODS.find(f => f.id === id), amount); Object.keys(part).forEach(key => { sum[key] += part[key]; }); return sum; }, { kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });
    return { items, nutrition };
  }
  function mealCard(meal) {
    const day = getDay(), items = day.meals[meal.id] || [];
    const totalKcal = items.reduce((s, item) => s + number(item.kcal), 0);
    return `<section class="card meal-card"><div class="meal-card-head"><span class="meal-symbol">${meal.icon}</span><div class="meal-info"><h3>${meal.label}</h3><small>${items.length ? `${items.length} 項 · 約 ${fmt(totalKcal)} kcal` : '尚未記錄・依食量自由調整'}</small></div>${items.length ? '<span class="logged-badge">已記錄</span>' : ''}</div>${items.length ? items.map(item => `<div class="food-entry"><div class="food-text"><strong>${escapeHTML(item.name)}</strong><small>${fmt(item.amount, 1)} ${escapeHTML(item.unit)} · ${sourceBadge(item.source)}</small></div><span class="food-macro">${fmt(item.kcal)} kcal</span><button data-action="remove-food" data-meal="${meal.id}" data-entry="${escapeHTML(item.id)}" aria-label="移除${escapeHTML(item.name)}">×</button></div>`).join('') : ''}<div class="food-actions"><button class="add-food-button" data-action="pick-food" data-meal="${meal.id}">＋ 搜尋食物紀錄</button><button class="quiet-button" data-action="custom-food" data-meal="${meal.id}">手動輸入</button></div></section>`;
  }
  function foodDatabaseCard(food, meal = 'breakfast') { return `<button class="food-pick" data-action="select-food" data-food="${escapeHTML(food.id)}" data-meal="${escapeHTML(meal)}"><span class="food-emoji">${food.emoji || '🍽️'}</span><span><strong>${escapeHTML(food.name)}</strong><small>每 ${fmt(food.qty)} ${escapeHTML(food.unit)} · 約 ${fmt(food.kcal)} kcal · ${sourceBadge(food.source)}</small></span></button>`; }
  function restaurantRecommendations() {
    const rem = goals(), t = totals(), left = { kcal: rem.kcal - t.kcal, protein: rem.protein - t.protein, carbs: rem.carbs - t.carbs, fat: rem.fat - t.fat };
    const choices = data.restaurants.map(item => {
      const values = item.values;
      const tooLarge = left.kcal > 0 && values.kcal > left.kcal * 1.35;
      const fits = (left.kcal <= 0 || values.kcal <= left.kcal * 1.1) && (left.fat <= 0 || values.fat <= left.fat * 1.5);
      const score = Math.max(0, 100 - (left.kcal > 0 ? Math.abs(values.kcal - left.kcal * .75) / Math.max(left.kcal, 1) * 18 : values.kcal / 20) - (left.protein > 0 ? Math.max(0, left.protein - values.protein) / left.protein * 45 : 0) - (left.carbs > 0 ? Math.abs(values.carbs - left.carbs * .65) / Math.max(left.carbs, 1) * 18 : values.carbs / 20) - (tooLarge ? 25 : 0) - (fits ? 0 : 10) - (item.fried ? 12 : 0) + (item.hasVegetables ? 4 : 0) + (item.sauceSeparate ? 3 : 0) + (item.riceAdjust ? 2 : 0));
      return { ...item, score, fits };
    }).sort((a, b) => b.score - a.score).slice(0, 5);
    return choices;
  }
  function renderFood() {
    const t = totals(), g = goals(), day = getDay(), recs = restaurantRecommendations();
    const templates = BREAKFASTS.map((template, idx) => {
      const sum = template.items.reduce((total, [id, qty]) => { const f = FOODS.find(x => x.id === id); const n = amountNutrition(f, qty); Object.keys(n).forEach(key => total[key] += n[key]); return total; }, { kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });
      return `<article class="template-card"><h3>${template.name}</h3><strong>約 ${fmt(sum.kcal)} kcal · P ${fmt(sum.protein)} g</strong><p>${template.items.map(([id, qty]) => { const f = FOODS.find(x => x.id === id); return `${f.name} ${qty}${f.unit}`; }).join('、')}<br>${sourceBadge('estimate')}</p><button class="secondary-button" data-action="add-template" data-template="${idx}">加入早餐</button></article>`;
    }).join('');
    $('#view').innerHTML = `${pageHeading('FOOD JOURNAL', '飲食紀錄', '記下吃了什麼，計算會自動跟上。', `剩餘 ${fmt(Math.max(0, g.kcal - t.kcal))} kcal`)}
      <div class="dashboard-grid"><div class="stack"><section class="card"><div class="card-header"><div><h2 class="card-title">今天吃了多少</h2><p class="card-subtitle">累積值對照每日目標 · 未記錄的餐點不會被推測</p></div><span class="tag estimate">食物資料為估算</span></div><div class="goal-grid">${NUTRIENTS.filter(n => n.id !== 'water').map(n => goalItem(n, t[n.id], g[n.id])).join('')}</div></section>
      <section class="card"><div class="card-header"><div><h2 class="card-title">快速早餐提案</h2><p class="card-subtitle">可依手邊食材調整份量；每份數值為估算</p></div></div><div class="template-list">${templates}</div></section>
      ${MEALS.map(mealCard).join('')}
      </div><div class="stack"><section class="card"><div class="card-header"><div><h2 class="card-title">外食餐點資料庫</h2><p class="card-subtitle">新增店家提供的餐點營養，系統依剩餘目標排序</p></div></div>${recs.length ? recs.map(item => `<div class="restaurant-recommendation"><div><strong>${escapeHTML(item.name)}</strong><small>${escapeHTML(item.restaurant)} · ${fmt(item.values.kcal)} kcal · P ${fmt(item.values.protein)} g · C ${fmt(item.values.carbs)} g · F ${fmt(item.values.fat)} g<br>${sourceBadge(item.source)}</small></div><span class="recommend-score">${Math.round(item.score)} 分</span><select aria-label="記錄到哪一餐" class="meal-select"><option value="lunch">午餐</option><option value="dinner">晚餐</option><option value="snack">點心</option></select><button class="secondary-button" data-action="log-restaurant" data-id="${escapeHTML(item.id)}">記錄</button></div>`).join('') : `<div class="empty-state">還沒有店家餐點資料。<br>加入餐廳提供的營養標示或自行估算後，就能依剩餘目標比較。</div>`}<button class="add-food-button" style="margin-top:12px" data-action="restaurant-form">＋ 新增店家餐點</button><p class="small-muted" style="margin-top:10px">排序參考剩餘熱量、蛋白質與脂肪，分數是規則計算的相對參考，不代表精確營養品質。</p></section>
      <section class="card"><div class="card-header"><div><h2 class="card-title">今日小計</h2><p class="card-subtitle">以已記錄的食物計算</p></div></div><div class="metric-grid"><div class="metric-card"><small>熱量</small><strong>${fmt(t.kcal)}<small> / ${fmt(g.kcal)} kcal</small></strong></div><div class="metric-card"><small>蛋白質</small><strong>${fmt(t.protein, 1)}<small> / ${fmt(g.protein)} g</small></strong></div><div class="metric-card"><small>食物項目</small><strong>${Object.values(day.meals).reduce((s, list) => s + list.length, 0)}<small> 項</small></strong></div></div></section>
      <div class="note-box">「一份」或「一杯」的實際重量會因店家和品牌而異。無法確認份量時，請保留估算標記；食品包裝或餐廳標示數值可選 FACT。</div></div></div>`;
  }
  function previousExercise(id, before = selectedDate) {
    const dates = Object.keys(data.days).filter(date => date < before && data.days[date]?.exercises?.[id]).sort().reverse();
    return dates.length ? { date: dates[0], ...data.days[dates[0]].exercises[id] } : null;
  }
  function progressionText(ex, log) {
    if (!log) return '先選擇能控制的重量，保留約 2–4 下餘裕（RPE 6–8）。';
    const reps = String(log.reps).split(/[\/,\s]+/).map(Number).filter(Number.isFinite);
    if (reps.length >= ex[2] && reps.every(rep => rep >= ex[4])) return `本次每組都達到 ${ex[4]} 下；下次可小幅加重約 2–2.5 kg，再從區間下緣開始。`;
    return `下次先維持 ${fmt(log.weight, 1)} kg，目標在動作品質穩定下逐步多做幾下，再考慮加重。`;
  }
  function exerciseCard(ex, day) {
    const [id, name, sets, low, high, unit = '下'] = ex, log = day.exercises[id], last = previousExercise(id);
    const isTime = unit === '秒';
    const repsPlaceholder = Array.from({ length: sets }, () => isTime ? String(Math.round((low + high) / 2)) : String(Math.round((low + high) / 2))).join('/');
    return `<article class="exercise-card"><div class="exercise-head"><div><strong>${escapeHTML(name)}</strong><small>${sets} 組 · ${low}–${high} ${unit} · 休息 60–120 秒</small></div><div class="exercise-right">${log ? '<span class="logged-badge">已記錄</span>' : ''}<div class="range">${last ? `上次 ${fmt(last.weight, 1)} kg` : '初次紀錄'}</div></div></div><div class="progression-tip">${escapeHTML(progressionText(ex, log || last))}</div><div class="exercise-fields"><div class="field"><label>重量（kg）</label><input aria-label="${escapeHTML(name)}重量" data-ex-field="weight" data-id="${id}" type="number" min="0" step="0.5" placeholder="${last ? fmt(last.weight, 1) : '例如 20'}" value="${log ? escapeHTML(log.weight) : ''}"></div><div class="field"><label>每組次數（用 / 分開）</label><input aria-label="${escapeHTML(name)}每組次數" data-ex-field="reps" data-id="${id}" type="text" inputmode="numeric" placeholder="${repsPlaceholder}" value="${log ? escapeHTML(log.reps) : ''}"></div><div class="field"><label>RPE</label><input aria-label="${escapeHTML(name)}RPE" data-ex-field="rpe" data-id="${id}" type="number" min="1" max="10" step="1" placeholder="6–8" value="${log?.rpe ? escapeHTML(log.rpe) : ''}"></div><button class="primary-button" data-action="save-exercise" data-id="${id}">儲存</button></div></article>`;
  }
  function renderWorkout() {
    const day = getDay(), plan = workoutForDate(selectedDate);
    if (!plan) {
      $('#view').innerHTML = `${pageHeading('TRAINING & RECOVERY', '訓練計畫', '休息也是計畫的一部分。', dateLabel(selectedDate))}<section class="card rest-card"><div class="rest-icon">☁️</div><h3>今天安排恢復</h3><p>不排重量訓練。想活動一下，可以輕鬆散步、做伸展或關節活動度練習；不需要補做 40 分鐘有氧。若疲勞或痠痛明顯，安心休息。</p><div class="rest-chips"><span>散步</span><span>伸展・活動度</span><span>補水與睡眠</span></div></section><div class="dashboard-grid" style="margin-top:16px"><section class="card"><h2 class="card-title">本週訓練節奏</h2><p class="small-muted" style="line-height:2;margin-top:10px">週一 背部・後三角・二頭<br>週二 腿部・核心<br>週三 胸部・肩膀・三頭<br>週四 休息<br>週五 上半身<br>週六 下半身・手臂・核心<br>週日 休息</p></section><section class="card"><h2 class="card-title">新手訓練原則</h2><p class="small-muted" style="line-height:1.9;margin-top:10px">前 2–3 週先學會動作、建立習慣；不用追求最大重量或力竭。若有疼痛、暈眩或不適，停止動作並休息。</p></section></div>`;
      return;
    }
    const saved = Object.keys(day.exercises).filter(id => plan.exercises.some(ex => ex[0] === id)).length;
    const completion = Math.round(saved / plan.exercises.length * 100);
    $('#view').innerHTML = `${pageHeading('TRAINING PLAN', '訓練計畫', '先熟悉動作、保留餘裕；有記錄才看得到進步。', dateLabel(selectedDate))}<section class="workout-hero"><span class="workout-hero-icon">⌁</span><div><h2>${escapeHTML(plan.name)}</h2><p>${escapeHTML(plan.focus)} · 每個動作 RPE 6–8，不必練到力竭</p></div><span class="status-tag">${completion}% 完成</span></section><div class="dashboard-grid"><div class="stack"><section class="card"><div class="card-header"><div><h2 class="card-title">今天的重訓動作</h2><p class="card-subtitle">輸入實際重量和每組次數；下次目標會參考這次紀錄</p></div><span class="tag estimate">2–3 組・8–15 下</span></div><div class="exercise-list">${plan.exercises.map(ex => exerciseCard(ex, day)).join('')}</div><div class="settings-actions"><button class="primary-button" data-action="finish-workout">${day.workoutDone ? '訓練已完成 ✓' : '標記今天訓練完成'}</button><span class="small-muted" style="align-self:center">未記錄動作仍可完成訓練；完成度以已記錄動作計算。</span></div></section></div><div class="stack"><section class="card"><div class="card-header"><div><h2 class="card-title">低強度有氧</h2><p class="card-subtitle">重訓後安排為主；仍可短句交談的強度</p></div></div><div class="workout-summary"><span class="workout-emblem">🚶</span><div><strong>坡度走 40 分鐘</strong><small>腿部日前避免高強度；前 5–10 分鐘可作暖身</small></div><span class="status-tag">${day.cardioDone ? '已完成' : '建議'}</span></div><button class="secondary-button" style="margin-top:12px;width:100%" data-action="toggle-cardio">${day.cardioDone ? '取消有氧完成標記' : '標記有氧已完成'}</button></section><section class="card"><h2 class="card-title">本次運動感受</h2><p class="small-muted" style="line-height:1.8;margin-top:9px">重量先穩定，再逐步增加次數。所有組數都達到目標上限且動作穩定，下次可小幅加重；否則保持重量慢慢累積。</p><button class="text-link" data-route="progress" style="padding:8px 0">查看近期訓練紀錄 ↗</button></section></div></div>`;
  }
  function weighEntries() { return Object.keys(data.days).filter(date => data.days[date]?.weighIn != null).sort().map(date => ({ date, weight: number(data.days[date].weighIn), waist: data.days[date].waist == null ? null : number(data.days[date].waist) })); }
  function average(entries) { return entries.length ? entries.reduce((s, x) => s + x.weight, 0) / entries.length : null; }
  function weeklyAnalysis() {
    const recent = [], previous = [];
    for (let i = 0; i < 7; i++) { const date = shiftDate(selectedDate, -i), d = data.days[date]; if (d?.weighIn != null) recent.push({ date, weight: number(d.weighIn), waist: d.waist == null ? null : number(d.waist) }); }
    for (let i = 7; i < 14; i++) { const date = shiftDate(selectedDate, -i), d = data.days[date]; if (d?.weighIn != null) previous.push({ date, weight: number(d.weighIn), waist: d.waist == null ? null : number(d.waist) }); }
    const r = average(recent), p = average(previous), waistRecent = recent.filter(x => x.waist != null), waistPrevious = previous.filter(x => x.waist != null);
    const rw = waistRecent.length ? waistRecent.reduce((s, x) => s + x.waist, 0) / waistRecent.length : null;
    const pw = waistPrevious.length ? waistPrevious.reduce((s, x) => s + x.waist, 0) / waistPrevious.length : null;
    if (recent.length < 3 || previous.length < 3) return { text: `最近 7 天記錄 ${recent.length} 次體重；前 7 天 ${previous.length} 次。連續記錄至少 3 次／週後再看趨勢，避免被單日變化帶著走。`, action: null };
    if (Math.abs(r - p) < 0.25 && rw != null && pw != null && pw - rw >= 0.5) return { text: `近 7 天平均 ${fmt(r, 1)} kg，與前一週接近；腰圍平均減少 ${fmt(pw - rw, 1)} cm。體重穩定但腰圍下降，可能是體態重組，先維持目前熱量。`, action: null };
    const checkinDays = offset => Array.from({ length: 7 }, (_, i) => data.days[shiftDate(selectedDate, -(i + offset))]).filter(d => d && Object.values(d.meals).flat().length >= 2).length;
    if (Math.abs(r - p) < 0.2 && !(rw != null && pw != null && pw - rw >= 0.4)) {
      if (checkinDays(0) < 5 || checkinDays(7) < 5) return { text: `兩週體重平均變化不明顯。飲食紀錄仍不完整（至少每週 5 天記錄 2 餐），先補足紀錄再判斷是否需要調整。`, action: null };
      return { text: `近 7 天平均 ${fmt(r, 1)} kg，兩週變化不明顯，腰圍也沒有下降。若目前精神和訓練狀態正常，可小幅調整每日熱量 100 kcal，或增加日常步行；一次只改一件事。`, action: 'decrease' };
    }
    const difference = r - p;
    if (difference < -number(data.profile.weight, 58) * 0.007) {
      const thisWeekWorkouts = Object.keys(data.days).filter(date => date <= selectedDate && date >= shiftDate(selectedDate, -6) && data.days[date].workoutDone).length;
      return { text: `近 7 天平均 ${fmt(r, 1)} kg，較前一週減少 ${fmt(Math.abs(difference), 1)} kg。這個速度偏快${thisWeekWorkouts < 2 ? '，且近週訓練完成次數偏少' : ''}；留意疲勞、飢餓和訓練表現，可把每日熱量小幅上調 100 kcal 觀察。`, action: 'increase' };
    }
    return { text: `近 7 天平均 ${fmt(r, 1)} kg，與前一週相差 ${difference > 0 ? '+' : ''}${fmt(difference, 1)} kg。單週先維持觀察，同時參考腰圍、訓練表現與恢復狀態。`, action: null };
  }
  function chartMarkup() {
    const entries = Array.from({ length: 14 }, (_, i) => { const date = shiftDate(selectedDate, -(13 - i)), day = data.days[date]; return { date, weight: day?.weighIn == null ? null : number(day.weighIn) }; });
    const points = entries.filter(x => x.weight != null);
    if (!points.length) return '<div class="empty-state" style="height:100%;display:grid;place-items:center">記錄幾次晨間體重後，這裡會顯示趨勢。</div>';
    const min = Math.min(...points.map(x => x.weight)) - .4, max = Math.max(...points.map(x => x.weight)) + .4;
    const xFor = i => 28 + i * 40, yFor = weight => 175 - (weight - min) / Math.max(max - min, .1) * 130;
    const poly = points.map(x => `${xFor(entries.indexOf(x))},${yFor(x.weight)}`).join(' ');
    const lines = Array.from({ length: 4 }, (_, i) => { const y = 22 + i * 43; return `<line x1="25" x2="560" y1="${y}" y2="${y}" stroke="#edf0eb"/><text x="0" y="${y + 4}" class="chart-label">${fmt(max - i * (max - min) / 3, 1)}</text>`; }).join('');
    const circles = points.map(x => `<circle cx="${xFor(entries.indexOf(x))}" cy="${yFor(x.weight)}" r="4.5" fill="#255f4d" stroke="white" stroke-width="2"><title>${x.date}: ${fmt(x.weight, 1)} kg</title></circle>`).join('');
    return `<svg viewBox="0 0 575 210" role="img" aria-label="最近 14 天體重紀錄圖">${lines}<polyline points="${poly}" fill="none" stroke="#255f4d" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>${circles}<text x="28" y="203" class="chart-label">${entries[0].date.slice(5)}</text><text x="500" y="203" class="chart-label">${entries[13].date.slice(5)}</text></svg>`;
  }
  function renderProgress() {
    const entries = weighEntries().filter(x => x.date <= selectedDate).slice(-7), latest = entries.at(-1), day = getDay(), analysis = weeklyAnalysis();
    const actionButton = analysis.action ? `<button class="primary-button" style="margin-top:11px" data-action="apply-adjustment" data-adjust="${analysis.action}">採用小幅調整（100 kcal）</button>` : '';
    $('#view').innerHTML = `${pageHeading('PROGRESS & TRENDS', '進度追蹤', '把體重、腰圍、訓練與恢復一起看。', dateLabel(selectedDate))}<div class="dashboard-grid"><div class="stack"><section class="card"><div class="card-header"><div><h2 class="card-title">體重趨勢</h2><p class="card-subtitle">最近 14 天 · 單日波動很正常</p></div>${latest ? `<span class="date-pill">${fmt(latest.weight, 1)} kg</span>` : ''}</div><div class="chart-wrap">${chartMarkup()}</div><div class="metric-grid" style="margin-top:12px"><div class="metric-card"><small>最近體重</small><strong>${latest ? `${fmt(latest.weight, 1)}<small> kg</small>` : '—'}</strong></div><div class="metric-card"><small>7 日平均（近 7 筆）</small><strong>${entries.length ? `${fmt(average(entries), 1)}<small> kg</small>` : '—'}</strong></div><div class="metric-card"><small>腰圍</small><strong>${latest?.waist != null ? `${fmt(latest.waist, 1)}<small> cm</small>` : '—'}</strong></div></div></section>
      <section class="card"><div class="card-header"><div><h2 class="card-title">每週調整建議</h2><p class="card-subtitle">先看趨勢與紀錄完整度，再決定是否調整</p></div><span class="tag estimate">規則分析</span></div><div class="recommendation-card card"><h3>教練觀察</h3><p>${escapeHTML(analysis.text)}</p>${actionButton}</div><p class="small-muted" style="margin:10px 0 0">分析至少需要連續兩週、每週 3 次體重紀錄。熱量調整幅度為 100 kcal；按下採用才會更新設定。</p></section></div>
      <div class="stack"><section class="card"><div class="card-header"><div><h2 class="card-title">記錄身體數據</h2><p class="card-subtitle">起床、如廁後、進食前測量更容易比較</p></div></div><form id="measure-form" class="dialog-form"><div class="field"><label for="measure-weight">體重（kg）</label><input id="measure-weight" name="weight" type="number" min="20" max="350" step="0.1" placeholder="例如 58.0" value="${day.weighIn ?? ''}" required></div><div class="field"><label for="measure-waist">腰圍（cm，可選）</label><input id="measure-waist" name="waist" type="number" min="30" max="250" step="0.1" placeholder="例如 72.5" value="${day.waist ?? ''}"></div><div class="field"><label for="measure-fat">體脂率（%，可選）</label><input id="measure-fat" name="bodyFat" type="number" min="2" max="70" step="0.1" placeholder="若有可信測量再填" value="${day.bodyFat ?? ''}"></div><button class="primary-button">儲存 ${dateLabel(selectedDate)}紀錄</button></form></section>
      <section class="card"><div class="card-header"><div><h2 class="card-title">近期體重</h2><p class="card-subtitle">記錄 ${entries.length} 筆</p></div></div>${entries.length ? [...entries].reverse().map(item => `<div class="history-row"><strong>${fmt(item.weight, 1)} kg${item.waist != null ? ` · 腰圍 ${fmt(item.waist, 1)} cm` : ''}</strong><small>${escapeHTML(dateLabel(item.date))}</small></div>`).join('') : '<div class="empty-state">還沒有測量紀錄</div>'}</section>
      <section class="card"><h2 class="card-title">判讀時也看這些</h2><p class="small-muted" style="line-height:1.9;margin-top:9px">體重平均、腰圍、訓練重量／次數、蛋白質攝取和訓練完成度。體重不變但腰圍下降、力量上升時，可能正在重組體態，不急著減熱量。</p></section></div></div>`;
  }
  function renderSettings() {
    const p = data.profile;
    $('#view').innerHTML = `${pageHeading('YOUR PLAN', '個人設定', '依你的身體資料設定起始目標，之後可再微調。', '本機保存')}
      <div class="settings-layout"><section class="card"><div class="card-header"><div><h2 class="card-title">基本資料與每日目標</h2><p class="card-subtitle">這是起始估算，請依實際狀態調整</p></div></div><form id="profile-form"><div class="form-grid"><div class="field"><label for="p-sex">性別（代謝公式）</label><select id="p-sex" name="sex"><option ${p.sex === '男性' ? 'selected' : ''}>男性</option><option ${p.sex === '女性' ? 'selected' : ''}>女性</option></select></div><div class="field"><label for="p-age">年齡</label><input id="p-age" name="age" type="number" min="13" max="100" value="${escapeHTML(p.age)}"></div><div class="field"><label for="p-height">身高（cm）</label><input id="p-height" name="height" type="number" min="100" max="230" step="0.1" value="${escapeHTML(p.height)}"></div><div class="field"><label for="p-weight">目前體重（kg）</label><input id="p-weight" name="weight" type="number" min="30" max="250" step="0.1" value="${escapeHTML(p.weight)}"></div><div class="field"><label for="p-activity">日常活動量</label><select id="p-activity" name="activity"><option value="1.2" ${Number(p.activity) === 1.2 ? 'selected' : ''}>較少活動（1.2）</option><option value="1.375" ${Number(p.activity) === 1.375 ? 'selected' : ''}>輕度活動（1.375）</option><option value="1.55" ${Number(p.activity) === 1.55 ? 'selected' : ''}>中度活動（1.55）</option><option value="1.725" ${Number(p.activity) === 1.725 ? 'selected' : ''}>高度活動（1.725）</option></select></div><div class="field"><label for="p-goal">目前方向</label><select id="p-goal" name="goal">${['體態重組', '減脂', '增肌', '維持體重'].map(g => `<option ${p.goal === g ? 'selected' : ''}>${g}</option>`).join('')}</select></div><div class="field"><label for="p-kcal">每日熱量（kcal）</label><input id="p-kcal" name="calories" type="number" min="1200" max="5000" step="50" value="${escapeHTML(p.calories)}"></div><div class="field"><label for="p-protein">蛋白質（g）</label><input id="p-protein" name="protein" type="number" min="30" max="350" value="${escapeHTML(p.protein)}"></div><div class="field"><label for="p-carbs">碳水（g）</label><input id="p-carbs" name="carbs" type="number" min="30" max="700" value="${escapeHTML(p.carbs)}"></div><div class="field"><label for="p-fat">脂肪（g）</label><input id="p-fat" name="fat" type="number" min="20" max="250" value="${escapeHTML(p.fat)}"></div><div class="field"><label for="p-fiber">膳食纖維（g）</label><input id="p-fiber" name="fiber" type="number" min="10" max="100" value="${escapeHTML(p.fiber)}"></div><div class="field"><label for="p-water">飲水（ml）</label><input id="p-water" name="water" type="number" min="500" max="10000" step="100" value="${escapeHTML(p.water)}"></div></div><div class="settings-actions"><button class="primary-button">儲存個人設定</button><button type="button" class="secondary-button" data-action="calculate-target">用身體資料估算熱量</button></div></form></section>
      <div class="stack"><section class="card"><h2 class="card-title">目標小提醒</h2><p class="small-muted" style="line-height:1.9;margin-top:10px">起始熱量沿用你的設定（${fmt(p.calories)} kcal）。若採用代謝估算，會使用 Mifflin–St Jeor 基礎代謝公式與活動係數，只作起點；實際需求仍要依數週體重趨勢、腰圍和訓練狀態調整。</p><p class="small-muted">不建議突然大幅降低熱量。訓練前幾週先練好動作、睡眠與規律飲食。</p></section>
      <section class="card"><div class="card-header"><div><h2 class="card-title">備份與還原</h2><p class="card-subtitle">換裝置前先匯出資料檔</p></div></div><p class="small-muted">所有紀錄在本機瀏覽器，不會自動同步到其他手機或電腦。匯出 JSON 備份後，可在另一台裝置匯入。</p><div class="settings-actions"><button class="secondary-button" data-action="export-data">匯出備份</button><label class="secondary-button" style="cursor:pointer">匯入備份<input id="import-file" type="file" accept="application/json,.json" hidden></label></div></section>
      <section class="card"><h2 class="card-title">開始新的紀錄</h2><p class="small-muted" style="margin:7px 0 12px">會清除此瀏覽器儲存的飲食、訓練與個人設定。</p><button class="danger-link" data-action="reset-data">清除本機所有資料</button></section></div></div>`;
  }
  function render() {
    navMarkup();
    $('#selected-date').value = selectedDate;
    if (route === 'today') renderToday();
    else if (route === 'food') renderFood();
    else if (route === 'workout') renderWorkout();
    else if (route === 'progress') renderProgress();
    else renderSettings();
  }
  function toast(message) { const el = $('#toast'); el.textContent = message; el.classList.add('show'); clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove('show'), 2500); }
  function modal(title, body, actions = '') { $('#overlay-root').innerHTML = `<div class="overlay" data-action="overlay-close"><section class="dialog" role="dialog" aria-modal="true" aria-label="${escapeHTML(title)}"><div class="dialog-head"><h2>${escapeHTML(title)}</h2><button class="close-button" data-action="close-modal" aria-label="關閉">×</button></div>${body}${actions}</section></div>`; }
  function closeModal() { $('#overlay-root').innerHTML = ''; }
  function openFoodPicker(meal) {
    searchTerm = '';
    const list = allFoods().filter(f => `${f.name} ${f.id}`.toLowerCase().includes(searchTerm.toLowerCase()));
    const body = `<label class="food-search"><span class="field-label">搜尋食物</span><input class="form-control" id="food-search" type="search" placeholder="例如：雞胸、豆漿、燕麥"></label><div class="food-db-grid" id="food-picks" data-meal="${meal}">${list.map(food => foodDatabaseCard(food, meal)).join('')}</div><button class="add-food-button" style="margin-top:12px" data-action="custom-food" data-meal="${meal}">＋ 手動輸入食物與營養數值</button><p class="small-muted" style="margin-top:9px">資料庫是常見食物的參考估算；品牌、烹調方式和份量會讓數值不同。</p>`;
    modal(`新增${MEAL_NAMES[meal]}食物`, body);
  }
  function openPortion(food, meal) {
    const defaultAmount = food.defaultAmount || (food.unit === '個' || (food.unit === '份' && food.qty < 100) ? food.qty : 100);
    const body = `<form id="portion-form" data-meal="${meal}" data-food="${escapeHTML(food.id)}"><div class="field"><label>${escapeHTML(food.name)} ・每 ${fmt(food.qty)} ${escapeHTML(food.unit)}約 ${fmt(food.kcal)} kcal</label><input name="amount" type="number" min="0.1" step="${food.unit === '個' ? '0.5' : '1'}" value="${defaultAmount}" required></div><p class="small-muted" id="portion-preview" style="margin:11px 0">${macroLine(amountNutrition(food, defaultAmount))} · ${sourceBadge(food.source)}</p><p class="small-muted">估算數值會保留 ESTIMATE 標記；如果你是依包裝標示自行建立資料，可標記為 FACT。</p><div class="field"><label><input type="checkbox" name="fact" style="width:auto;margin-right:6px">營養數值來自食品包裝／官方餐廳標示</label></div><div class="dialog-actions"><button type="button" class="secondary-button" data-action="back-picker" data-meal="${meal}">返回</button><button class="primary-button">加入${MEAL_NAMES[meal]}</button></div></form>`;
    modal('確認食物份量', body);
  }
  function openCustomFood(meal) {
    const body = `<form id="custom-food-form" data-meal="${meal}"><div class="form-grid"><div class="field full"><label>食物名稱</label><input name="name" maxlength="60" placeholder="例如：便利商店舒肥雞胸" required></div><div class="field"><label>份量（g／ml／份）</label><input name="amount" type="number" min="0.1" step="1" value="1" required></div><div class="field"><label>份量單位</label><input name="unit" maxlength="8" value="份" required></div><div class="field"><label>熱量（kcal）</label><input name="kcal" type="number" min="0" step="1" required></div><div class="field"><label>蛋白質（g）</label><input name="protein" type="number" min="0" step="0.1" required></div><div class="field"><label>碳水（g）</label><input name="carbs" type="number" min="0" step="0.1" required></div><div class="field"><label>脂肪（g）</label><input name="fat" type="number" min="0" step="0.1" required></div><div class="field"><label>纖維（g，可不填）</label><input name="fiber" type="number" min="0" step="0.1" value="0"></div></div><div class="field" style="margin-top:11px"><label><input type="checkbox" name="fact" style="width:auto;margin-right:6px">數值取自包裝、官方資料或店家標示（FACT）</label></div><div class="field" style="margin-top:10px"><label><input type="checkbox" name="saveFood" style="width:auto;margin-right:6px">同時加入我的食物清單</label></div><p class="small-muted">若是估計數值，保持未勾選；系統會標記 ESTIMATE，不會自行猜測未知營養。</p><div class="dialog-actions"><button type="button" class="secondary-button" data-action="close-modal">取消</button><button class="primary-button">加入紀錄</button></div></form>`;
    modal(`手動輸入${MEAL_NAMES[meal]}食物`, body);
  }
  function openRestaurantForm() {
    const body = `<form id="restaurant-form"><div class="form-grid"><div class="field"><label>餐廳名稱</label><input name="restaurant" maxlength="70" placeholder="店家名稱" required></div><div class="field"><label>餐點名稱</label><input name="name" maxlength="70" placeholder="例如：烤雞胸餐盒" required></div><div class="field"><label>熱量（kcal）</label><input name="kcal" type="number" min="0" step="1" required></div><div class="field"><label>蛋白質（g）</label><input name="protein" type="number" min="0" step="0.1" required></div><div class="field"><label>碳水（g）</label><input name="carbs" type="number" min="0" step="0.1" required></div><div class="field"><label>脂肪（g）</label><input name="fat" type="number" min="0" step="0.1" required></div><div class="field full"><label>餐點內容／烹調方式（可選）</label><input name="notes" maxlength="100" placeholder="肉類、主食、配菜或醬料備註"></div><div class="field full"><label><input type="checkbox" name="hasVegetables" style="width:auto;margin-right:6px">含蔬菜</label><label><input type="checkbox" name="riceAdjust" style="width:auto;margin-right:6px">可調整主食份量</label><label><input type="checkbox" name="sauceSeparate" style="width:auto;margin-right:6px">醬料可另外放</label><label><input type="checkbox" name="fried" style="width:auto;margin-right:6px">油炸料理</label></div><div class="field full"><label><input type="checkbox" name="fact" style="width:auto;margin-right:6px">數值來自店家營養標示（FACT）；否則以估算標記</label></div></div><div class="dialog-actions"><button type="button" class="secondary-button" data-action="close-modal">取消</button><button class="primary-button">儲存餐點</button></div></form>`;
    modal('新增店家餐點', body);
  }
  function logToMeal(meal, item) { getDay().meals[meal].push(item); save(); }
  function addTemplate(index) {
    const template = BREAKFASTS[index]; if (!template) return;
    template.items.forEach(([id, amount]) => { const food = FOODS.find(x => x.id === id); logToMeal('breakfast', loggedItem(food, amount)); });
    toast(`${template.name}已加入早餐紀錄`); render();
  }
  function serializeForm(form) { return Object.fromEntries(new FormData(form).entries()); }
  function showHelp() {
    modal('快速使用說明', `<div class="stack"><p class="small-muted" style="line-height:1.9;margin:0">① 在「飲食」搜尋食物、輸入實際份量，或新增餐廳提供的餐點資料。<br>② 在「訓練」記重量、每組次數和 RPE；下次會參考上次紀錄給出加重或維持建議。<br>③ 到「進度」記晨間體重與腰圍。趨勢至少需要兩週資料才會給熱量調整提示。<br>④ 「設定」可調整目標並匯出 JSON 備份。所有資料只存在目前瀏覽器。</p><div class="note-box">目前的教練回饋來自程式中的營養、訓練與體重趨勢規則，尚未連接外部 AI、台灣食品資料庫或即時餐廳菜單。營養值會明確標示 ESTIMATE 或 FACT。</div><p class="small-muted">手機使用：用手機瀏覽器開啟同一個網址，再使用「加入主畫面」。若透過區網預覽，需讓手機與提供網頁的電腦連上同一個 Wi-Fi。</p></div>`);
  }
  function updateTargetsFromEstimate() {
    const p = data.profile, s = p.sex === '女性' ? -161 : 5;
    const bmr = 10 * number(p.weight) + 6.25 * number(p.height) - 5 * number(p.age) + s;
    const tdee = bmr * number(p.activity, 1.2);
    let suggested = tdee;
    if (p.goal === '減脂') suggested *= .9;
    else if (p.goal === '增肌') suggested *= 1.08;
    const safe = Math.max(1300, Math.min(4000, suggested));
    p.calories = Math.round(safe / 50) * 50;
    p.protein = Math.round(number(p.weight) * 2);
    p.fat = Math.round(number(p.weight) * .86);
    p.carbs = Math.max(30, Math.round((p.calories - p.protein * 4 - p.fat * 9) / 4));
    save(); render(); toast(`代謝公式估算完成：${fmt(p.calories)} kcal 起始目標`);
  }
  function renderAfterData(message) { save(); render(); if (message) toast(message); }
  document.addEventListener('click', event => {
    const routeButton = event.target.closest('[data-route]');
    if (routeButton) { route = routeButton.dataset.route; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const button = event.target.closest('[data-action]'); if (!button) return;
    const action = button.dataset.action;
    if (action === 'close-modal' || (action === 'overlay-close' && event.target === button)) { closeModal(); return; }
    if (action === 'help') { showHelp(); return; }
    if (action === 'water') { getDay().water += number(button.dataset.amount); renderAfterData(`已加 ${button.dataset.amount} ml 飲水`); return; }
    if (action === 'pick-food') { openFoodPicker(button.dataset.meal); return; }
    if (action === 'select-food') { const food = getFood(button.dataset.food); if (food) openPortion(food, button.dataset.meal || 'breakfast'); return; }
    if (action === 'custom-food') { openCustomFood(button.dataset.meal || 'breakfast'); return; }
    if (action === 'back-picker') { openFoodPicker(button.dataset.meal); return; }
    if (action === 'remove-food') { const day = getDay(); day.meals[button.dataset.meal] = day.meals[button.dataset.meal].filter(item => item.id !== button.dataset.entry); renderAfterData('已移除這項飲食紀錄'); return; }
    if (action === 'add-template') { addTemplate(number(button.dataset.template)); return; }
    if (action === 'restaurant-form') { openRestaurantForm(); return; }
    if (action === 'log-restaurant') { const item = data.restaurants.find(x => x.id === button.dataset.id); if (!item) return; const id = button.closest('.restaurant-recommendation').querySelector('.meal-select')?.value || 'lunch'; getDay().meals[id].push({ id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), foodId: item.id, name: `${item.restaurant}・${item.name}`, amount: 1, unit: '份', source: item.source, ...item.values }); renderAfterData(`已記錄到${MEAL_NAMES[id]}`); return; }
    if (action === 'log-dinner-plan') { const suggestion = dinnerPlan(totals(), goals()); if (!suggestion) { toast('今日剩餘目標較少，暫不產生晚餐份量'); return; } suggestion.items.forEach(([id, amount]) => { const food = FOODS.find(f => f.id === id); getDay().meals.dinner.push(loggedItem(food, amount)); }); renderAfterData('估算晚餐已加入紀錄，可依實際食用內容修改'); return; }
    if (action === 'save-checkin') { const form = $('#checkin-form'), v = serializeForm(form), day = getDay(); day.sleep = v.sleep === '' ? null : number(v.sleep); day.energy = v.energy === '' ? null : number(v.energy); day.soreness = v.soreness === '' ? null : number(v.soreness); renderAfterData('今日身體狀態已儲存'); return; }
    if (action === 'save-exercise') {
      const id = button.dataset.id, fields = $$(`[data-ex-field][data-id="${CSS.escape(id)}"]`), values = Object.fromEntries(fields.map(f => [f.dataset.exField, f.value.trim()]));
      if (!values.weight || !values.reps || values.reps.split(/[\/,\s]+/).some(x => !Number.isFinite(Number(x)))) { toast('請輸入重量和各組次數'); return; }
      getDay().exercises[id] = { weight: number(values.weight), reps: values.reps, rpe: number(values.rpe) || null, savedAt: new Date().toISOString() };
      renderAfterData('訓練紀錄已儲存'); return;
    }
    if (action === 'finish-workout') { getDay().workoutDone = !getDay().workoutDone; renderAfterData(getDay().workoutDone ? '已標記今天訓練完成' : '已取消完成標記'); return; }
    if (action === 'toggle-cardio') { getDay().cardioDone = !getDay().cardioDone; renderAfterData(getDay().cardioDone ? '有氧已記錄' : '已取消有氧標記'); return; }
    if (action === 'calculate-target') { updateTargetsFromEstimate(); return; }
    if (action === 'apply-adjustment') { const delta = button.dataset.adjust === 'increase' ? 100 : -100; const p = data.profile; p.calories = Math.max(1300, number(p.calories) + delta); p.carbs = Math.max(30, Math.round((p.calories - p.protein * 4 - p.fat * 9) / 4)); renderAfterData(`每日目標調整為 ${p.calories} kcal；蛋白質和脂肪保持不變`); return; }
    if (action === 'export-data') { const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }), url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = `daily-coach-backup-${today}.json`; a.click(); URL.revokeObjectURL(url); toast('備份檔已匯出'); return; }
    if (action === 'reset-data') { if (confirm('確定清除這個瀏覽器儲存的所有飲食、訓練和個人資料？此動作無法復原，建議先匯出備份。')) { data = defaults(); save(); renderAfterData('已清除本機資料'); } return; }
  });
  document.addEventListener('input', event => {
    if (event.target.id === 'food-search') {
      const list = allFoods().filter(food => `${food.name} ${food.id}`.toLowerCase().includes(event.target.value.trim().toLowerCase()));
      const meal = $('#food-picks')?.dataset.meal || 'breakfast';
      const root = $('#food-picks'); if (root) root.innerHTML = list.length ? list.map(food => foodDatabaseCard(food, meal)).join('') : '<div class="empty-state">找不到這項食物，可以手動輸入營養標示。</div>';
    }
  });
  document.addEventListener('change', event => {
    if (event.target.id === 'selected-date') { if (event.target.value) { selectedDate = event.target.value; render(); } return; }
    if (event.target.id === 'import-file' && event.target.files?.[0]) {
      const reader = new FileReader(); reader.onload = () => { try { const imported = JSON.parse(reader.result); if (!imported.profile || !imported.days) throw new Error('格式'); data = imported; save(); renderAfterData('備份資料已匯入'); } catch { toast('無法匯入：檔案格式不正確'); } }; reader.readAsText(event.target.files[0]);
    }
  });
  document.addEventListener('submit', event => {
    const form = event.target; event.preventDefault(); const values = serializeForm(form);
    if (form.id === 'checkin-form') { const day = getDay(); day.sleep = values.sleep ? number(values.sleep) : null; day.energy = values.energy ? number(values.energy) : null; day.soreness = values.soreness ? number(values.soreness) : null; renderAfterData('今日身體狀態已儲存'); return; }
    if (form.id === 'measure-form') { const day = getDay(); day.weighIn = number(values.weight); day.waist = values.waist ? number(values.waist) : null; day.bodyFat = values.bodyFat ? number(values.bodyFat) : null; data.profile.weight = day.weighIn; renderAfterData('身體數據已儲存'); return; }
    if (form.id === 'profile-form') { const p = data.profile; ['age', 'height', 'weight', 'activity', 'calories', 'protein', 'carbs', 'fat', 'fiber', 'water'].forEach(k => { p[k] = number(values[k], p[k]); }); p.sex = values.sex; p.goal = values.goal; renderAfterData('個人設定已儲存'); return; }
    if (form.id === 'portion-form') {
      const food = getFood(form.dataset.food), amount = number(values.amount), item = loggedItem(food, amount, values.fact ? 'fact' : food.source);
      logToMeal(form.dataset.meal, item); closeModal(); route = 'food'; renderAfterData(`已加入${MEAL_NAMES[form.dataset.meal]}`); return;
    }
    if (form.id === 'custom-food-form') {
      const id = `custom-${crypto.randomUUID ? crypto.randomUUID() : Date.now()}`, item = { id, name: values.name.trim(), unit: values.unit.trim(), qty: number(values.amount), source: values.fact ? 'fact' : 'estimate', kcal: number(values.kcal), protein: number(values.protein), carbs: number(values.carbs), fat: number(values.fat), fiber: number(values.fiber) };
      const logged = loggedItem(item, number(values.amount), item.source); if (values.saveFood) data.customFoods.push(item); getDay().meals[form.dataset.meal].push(logged); closeModal(); route = 'food'; renderAfterData('已加入飲食紀錄'); return;
    }
    if (form.id === 'restaurant-form') {
      data.restaurants.push({ id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), restaurant: values.restaurant.trim(), name: values.name.trim(), notes: values.notes.trim(), hasVegetables: Boolean(values.hasVegetables), riceAdjust: Boolean(values.riceAdjust), sauceSeparate: Boolean(values.sauceSeparate), fried: Boolean(values.fried), source: values.fact ? 'fact' : 'estimate', values: { kcal: number(values.kcal), protein: number(values.protein), carbs: number(values.carbs), fat: number(values.fat), fiber: 0 } }); closeModal(); renderAfterData('店家餐點已存入資料庫'); return;
    }
  });
  document.addEventListener('input', event => {
    if (event.target.name === 'amount' && event.target.form?.id === 'portion-form') {
      const food = getFood(event.target.form.dataset.food), preview = $('#portion-preview'); if (food && preview) preview.innerHTML = `${macroLine(amountNutrition(food, number(event.target.value)))} · ${sourceBadge(food.source)}`;
    }
  });
  render();
})();
