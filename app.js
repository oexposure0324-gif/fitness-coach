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
  const blankDay = () => ({ meals: { breakfast: [], lunch: [], dinner: [], snack: [] }, water: 0, sleep: null, energy: null, soreness: null, weighIn: null, waist: null, bodyFat: null, workoutDone: false, cardioDone: false, exercises: {}, workoutLogs: [] });
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
  function getDay(date = selectedDate) { const day = data.days[date] ||= blankDay(); if (!Array.isArray(day.workoutLogs)) day.workoutLogs = []; return day; }
  function allFoods() { return [...FOODS, ...EXTRA_FOODS, ...data.customFoods]; }
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
  function loggedItem(food, amount, sourceOverride, extra = {}) {
    const nutrition = amountNutrition(food, amount), source = sourceOverride || food.source || 'estimate', now = new Date().toISOString();
    const confidence = source === 'fact' ? 'HIGH' : (food.unit === 'g' || food.unit === 'ml') ? 'MEDIUM' : 'ESTIMATED';
    return { id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`, foodId: food.id, name: food.name, amount: number(amount), unit: food.unit, source, origin: extra.origin || 'DATABASE', confidence, ...nutrition, createdAt: now, updatedAt: now };
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
    if (activitySummary(date).status === 'MODIFIED') return `${activityAnalysis(date)}${left > 20 ? ` 飲食方面還有 ${fmt(left)} g 蛋白質空間。` : ''}`;
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
      return `<div class="meal-row"><span class="meal-symbol">${m.icon}</span><div class="meal-info"><strong>${m.label}</strong><small>${items.length ? `${items.length} 項食物 · 蛋白質 ${fmt(protein, 1)} g` : '尚未記錄'}</small></div><div class="meal-kcal">${items.length ? `${fmt(mealKcal)} kcal` : '—'}<small>${items.length ? '已記錄' : '待記錄'}</small></div><span class="meal-check" aria-label="${items.length ? '已記錄' : '未記錄'}">${items.length ? '✅' : '⬜'}</span></div>`;
    }).join('');
    const activity = activitySummary(selectedDate);
    const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(`${selectedDate}T12:00:00`)).toUpperCase();
    const workoutLabel = plan ? plan.name : '休息與恢復';
    const workoutMeta = plan ? `重訓 ${plan.exercises.length} 個動作 · 坡度走 40 分鐘（舒服、可交談的強度）` : '散步、伸展或完全休息都可以';
    const recovery = `<form id="checkin-form" class="checkin-grid"><div class="field"><label for="sleep">睡眠（小時）</label><input id="sleep" name="sleep" type="number" min="0" max="24" step="0.25" placeholder="7.5" value="${day.sleep ?? ''}"></div><div class="field"><label for="energy">精神（1–10）</label><select id="energy" name="energy"><option value="">選擇</option>${Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}" ${Number(day.energy) === i + 1 ? 'selected' : ''}>${i + 1}</option>`).join('')}</select></div><div class="field"><label for="soreness">痠痛（1–10）</label><select id="soreness" name="soreness"><option value="">選擇</option>${Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}" ${Number(day.soreness) === i + 1 ? 'selected' : ''}>${i + 1}</option>`).join('')}</select></div></form>`;
    $('#view').innerHTML = `${pageHeading(`${weekday} · DAILY CHECK-IN`, greeting, '讓日常的選擇，慢慢累積成你要的狀態。', dateLabel(selectedDate))}
      <div class="dashboard-grid">
        <div class="stack">
          <section class="card hero-card"><p class="eyebrow">今天的教練提醒</p><h2>${selectedDate === today ? '做得到的小事，最有力量。' : escapeHTML(dateLabel(selectedDate))}</h2><p>${escapeHTML(coachText(selectedDate))}</p><div class="hero-meta"><span>${escapeHTML(data.profile.goal || '體態重組')}</span><span>初期建立習慣・RPE 6–8</span></div></section>
          <section class="card"><div class="card-header"><div><h2 class="card-title">今日營養目標</h2><p class="card-subtitle">已吃入 · 目標；資料為估算值</p></div><button class="text-link" data-route="food">記錄飲食 ↗</button></div><div class="goal-grid">${NUTRIENTS.map(n => goalItem(n, n.id === 'water' ? day.water : t[n.id], g[n.id])).join('')}</div></section>
          <section class="card"><div class="card-header"><div><h2 class="card-title">餐點紀錄</h2><p class="card-subtitle">簡單記錄，不用追求每一餐都完美</p></div><button class="text-link" data-route="food">查看飲食 ↗</button></div><div class="meal-list">${meals}</div><div class="food-actions"><button class="add-food-button" data-action="smart-add">＋ 自訂食物</button></div></section>
          ${quickSuggestCard()}
        </div>
        <div class="stack">
          <section class="card"><div class="card-header"><div><h2 class="card-title">今天的訓練</h2><p class="card-subtitle">${escapeHTML(plan ? plan.focus : '休息日・輕鬆活動')}</p></div><button class="text-link" data-route="workout">訓練 ↗</button></div><p class="section-label">AI Plan</p><div class="workout-summary"><span class="workout-emblem">${plan ? '⌁' : '☁'}</span><div><strong>${escapeHTML(workoutLabel)}</strong><small>${escapeHTML(workoutMeta)}</small></div><span class="status-tag">${!plan ? '恢復' : day.workoutDone ? '已完成' : '計畫'}</span></div><p class="section-label" style="margin-top:15px">Actual Workout</p>${actualMini(activity)}<div class="today-status">${statusPill(activity.status)}<span class="small-muted">Cardio ${fmt(activity.cardio)} min · Strength ${fmt(activity.strengthSets)} 組${activity.other ? ` · 其他 ${fmt(activity.other)} min` : ''}</span></div><p class="small-muted analysis-text">${escapeHTML(activityAnalysis(selectedDate))}</p><button class="add-food-button" style="width:100%" data-action="add-workout">＋ 新增運動</button></section>
          ${foodAnalysisCard()}
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
    const sum = items.reduce((total, item) => { NUT_KEYS.forEach(k => { total[k] += number(item[k]); }); return total; }, { kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });
    return `<section class="card meal-card scroll-target" id="meal-${meal.id}"><div class="meal-card-head"><span class="meal-symbol">${meal.icon}</span><div class="meal-info"><h3>${meal.label}</h3><small>${items.length ? `${items.length} 項 · 約 ${fmt(sum.kcal)} kcal · P ${fmt(sum.protein, 1)} · C ${fmt(sum.carbs, 1)} · F ${fmt(sum.fat, 1)} · 纖維 ${fmt(sum.fiber, 1)}` : '尚未記錄・依食量自由調整'}</small></div>${items.length ? '<span class="logged-badge">已記錄</span>' : ''}</div>${items.map(item => `<div class="food-entry"><div class="food-text"><strong>${escapeHTML(item.name)}</strong><small>${fmt(item.amount, 2)} ${escapeHTML(item.unit)} · ${fmt(item.kcal)} kcal · 蛋白質 ${fmt(item.protein, 1)} g</small><small>${entryBadge(item)}${item.origin && ORIGIN_LABEL[item.origin] ? ` <span class="origin-chip">${ORIGIN_LABEL[item.origin]}</span>` : ''}</small></div><div class="entry-actions"><button class="entry-btn" data-action="edit-food" data-meal="${meal.id}" data-entry="${escapeHTML(item.id)}">編輯</button><button class="entry-btn danger" data-action="remove-food" data-meal="${meal.id}" data-entry="${escapeHTML(item.id)}" aria-label="刪除${escapeHTML(item.name)}">刪除</button></div></div>`).join('')}<div class="food-actions"><button class="add-food-button" data-action="smart-add" data-meal="${meal.id}">＋ 自訂食物</button><button class="quiet-button" data-action="pick-food" data-meal="${meal.id}">搜尋快速新增</button></div></section>`;
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
      return `<article class="template-card"><h3>${template.name}</h3><strong>約 ${fmt(sum.kcal)} kcal · P ${fmt(sum.protein)} g</strong><p>${template.items.map(([id, qty]) => { const f = FOODS.find(x => x.id === id); return `${f.name} ${qty}${f.unit}`; }).join('、')}<br>${sourceBadge('estimate')}</p><div class="template-detail"><span class="small-muted">碳水 ${fmt(sum.carbs)} g · 脂肪 ${fmt(sum.fat)} g · 纖維 ${fmt(sum.fiber, 1)} g</span><ul class="suggest-items">${template.items.map(([id, qty]) => { const f = FOODS.find(x => x.id === id); return `<li><span>${escapeHTML(shortName(f))} <small>${friendlyAmount(f, qty)}</small></span><button class="mini-add" data-action="add-suggest-item" data-meal="breakfast" data-food="${id}" data-amount="${qty}">＋加入今日飲食</button></li>`; }).join('')}</ul></div><button class="secondary-button" data-action="add-template" data-template="${idx}">整份加入早餐</button></article>`;
    }).join('');
    $('#view').innerHTML = `${pageHeading('FOOD JOURNAL', '飲食紀錄', '記下吃了什麼，計算會自動跟上。', `剩餘 ${fmt(Math.max(0, g.kcal - t.kcal))} kcal`)}
      <div class="dashboard-grid"><div class="stack"><section class="card"><div class="card-header"><div><h2 class="card-title">今天吃了多少</h2><p class="card-subtitle">累積值對照每日目標 · 未記錄的餐點不會被推測</p></div><span class="tag estimate">食物資料為估算</span></div><div class="goal-grid">${NUTRIENTS.filter(n => n.id !== 'water').map(n => goalItem(n, t[n.id], g[n.id])).join('')}</div><div class="food-actions" style="margin-top:14px"><button class="primary-button" style="flex:1" data-action="smart-add">＋ 自訂食物</button><button class="quiet-button" data-action="pick-food" data-meal="${defaultMeal()}">搜尋快速新增</button></div><div class="jump-links"><button data-action="jump" data-target="meal-breakfast">今日飲食</button><button data-action="jump" data-target="food-breakfast-templates">早餐提案</button><button data-action="jump" data-target="suggest-lunch">午餐提案</button><button data-action="jump" data-target="suggest-dinner">晚餐提案</button></div></section>
      <section class="card scroll-target" id="food-breakfast-templates"><div class="card-header"><div><h2 class="card-title">快速早餐提案</h2><p class="card-subtitle">可依手邊食材調整份量；每份數值為估算</p></div></div><div class="template-list">${templates}</div><p class="swipe-hint">左右滑動看其他方案 →</p></section>
      ${suggestionSection('lunch')}
      ${suggestionSection('dinner')}
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
      $('#view').innerHTML = `${pageHeading('TRAINING & RECOVERY', '訓練計畫', '休息也是計畫的一部分。', dateLabel(selectedDate))}<section class="card rest-card"><div class="rest-icon">☁️</div><h3>今天安排恢復</h3><p>不排重量訓練。想活動一下，可以輕鬆散步、做伸展或關節活動度練習；不需要補做 40 分鐘有氧。若疲勞或痠痛明顯，安心休息。</p><div class="rest-chips"><span>散步</span><span>伸展・活動度</span><span>補水與睡眠</span></div></section><div style="margin-top:16px">${actualWorkoutSection()}</div><div class="dashboard-grid" style="margin-top:16px"><section class="card"><h2 class="card-title">本週訓練節奏</h2><p class="small-muted" style="line-height:2;margin-top:10px">週一 背部・後三角・二頭<br>週二 腿部・核心<br>週三 胸部・肩膀・三頭<br>週四 休息<br>週五 上半身<br>週六 下半身・手臂・核心<br>週日 休息</p></section><section class="card"><h2 class="card-title">新手訓練原則</h2><p class="small-muted" style="line-height:1.9;margin-top:10px">前 2–3 週先學會動作、建立習慣；不用追求最大重量或力竭。若有疼痛、暈眩或不適，停止動作並休息。</p></section></div>`;
      return;
    }
    const saved = Object.keys(day.exercises).filter(id => plan.exercises.some(ex => ex[0] === id)).length;
    const completion = Math.round(saved / plan.exercises.length * 100);
    $('#view').innerHTML = `${pageHeading('TRAINING PLAN', '訓練計畫', '先熟悉動作、保留餘裕；有記錄才看得到進步。', dateLabel(selectedDate))}<section class="workout-hero"><span class="workout-hero-icon">⌁</span><div><p class="hero-label">今日 AI 訓練・PLANNED</p><h2>${escapeHTML(plan.name)}</h2><p>${escapeHTML(plan.focus)} · 每個動作 RPE 6–8，不必練到力竭</p></div><span class="status-tag">計畫動作 ${completion}% 已記錄</span></section><div style="margin-bottom:17px">${actualWorkoutSection()}</div><div class="dashboard-grid"><div class="stack"><section class="card"><div class="card-header"><div><h2 class="card-title">AI 計畫動作</h2><p class="card-subtitle">有照計畫做的動作在這裡記重量和次數；沒照做也沒關係，可在上方新增實際運動</p></div><span class="tag estimate">2–3 組・8–15 下</span></div><div class="exercise-list">${plan.exercises.map(ex => exerciseCard(ex, day)).join('')}</div><div class="settings-actions"><button class="primary-button" data-action="finish-workout">${day.workoutDone ? '訓練已完成 ✓' : '標記今天訓練完成'}</button><span class="small-muted" style="align-self:center">未記錄動作仍可完成訓練；完成度以已記錄動作計算。</span></div></section></div><div class="stack"><section class="card"><div class="card-header"><div><h2 class="card-title">低強度有氧</h2><p class="card-subtitle">重訓後安排為主；仍可短句交談的強度</p></div></div><div class="workout-summary"><span class="workout-emblem">🚶</span><div><strong>坡度走 40 分鐘</strong><small>腿部日前避免高強度；前 5–10 分鐘可作暖身</small></div><span class="status-tag">${day.cardioDone ? '已完成' : '建議'}</span></div><button class="secondary-button" style="margin-top:12px;width:100%" data-action="toggle-cardio">${day.cardioDone ? '取消有氧完成標記' : '標記有氧已完成'}</button></section><section class="card"><h2 class="card-title">本次運動感受</h2><p class="small-muted" style="line-height:1.8;margin-top:9px">重量先穩定，再逐步增加次數。所有組數都達到目標上限且動作穩定，下次可小幅加重；否則保持重量慢慢累積。</p><button class="text-link" data-route="progress" style="padding:8px 0">查看近期訓練紀錄 ↗</button></section></div></div>`;
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
      const thisWeekWorkouts = Object.keys(data.days).filter(date => date <= selectedDate && date >= shiftDate(selectedDate, -6) && (data.days[date].workoutDone || activitySummary(date).strengthSets > 0)).length;
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
      ${weeklyActivityCard()}
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
  // ===== 第二階段：自由記錄（自訂食物、實際運動、午晚餐快速提案）=====
  const UNIT_OPTIONS = ['g', 'kg', 'ml', 'L', '顆', '個', '片', '碗', '杯', '份', '根', '條', '塊', '包', '瓶', '盒'];
  const COUNT_UNITS = ['顆', '個', '根', '條'];
  const NUT_KEYS = ['kcal', 'protein', 'carbs', 'fat', 'fiber'];
  const ORIGIN_LABEL = { AI_RECOMMENDED: 'AI 推薦', USER_ADDED: '自訂', DATABASE: '資料庫' };
  const FOOD_ADDONS = {
    oats: { units: { 碗: 40, 杯: 80, 份: 40, 包: 40 }, aliases: ['燕麥片', '大燕麥'] },
    soy: { units: { 杯: 300, 瓶: 400, 份: 300, 包: 250 }, aliases: ['豆漿', '無糖豆漿'] },
    egg: { units: { 顆: 1, 個: 1, 份: 1, g: 1 / 55 }, aliases: ['雞蛋', '茶葉蛋', '水煮蛋', '滷蛋', '荷包蛋', '蛋'] },
    'sweet-potato': { units: { 條: 200, 顆: 200, 個: 200, 根: 200, 份: 150 }, aliases: ['地瓜', '烤地瓜', '番薯'] },
    'greek-yogurt': { units: { 杯: 150, 盒: 150, 份: 150 }, aliases: ['希臘優格', '優格'] },
    banana: { units: { 根: 120, 條: 120, 個: 120, 份: 120 }, aliases: ['香蕉'] },
    nuts: { units: { 包: 25, 份: 30 }, aliases: ['堅果', '綜合堅果'] },
    chicken: { units: { 份: 100, 片: 120, 塊: 100, 包: 100 }, aliases: ['雞胸', '雞胸肉', '舒肥雞胸', '雞肉'] },
    rice: { units: { 碗: 160, 份: 160 }, aliases: ['白飯', '飯', '米飯'] },
    vegetables: { units: { 碗: 100, 份: 100 }, aliases: ['蔬菜', '青菜', '綜合蔬菜'] },
    'white-fish': { units: { 片: 120, 份: 120, 塊: 120 }, aliases: ['白肉魚', '魚', '魚肉', '鯛魚'] },
    tofu: { units: { 塊: 150, 份: 100, 盒: 300 }, aliases: ['豆腐', '板豆腐'] },
    shrimp: { units: { 份: 100, 個: 12 }, aliases: ['蝦', '蝦仁'] },
    milk: { units: { 杯: 240, 瓶: 290, 份: 240 }, aliases: ['牛奶', '鮮奶', '低脂牛奶'] },
    beef: { units: { 份: 100, 片: 30, 塊: 100 }, aliases: ['牛肉', '瘦牛肉'] }
  };
  FOODS.forEach(food => Object.assign(food, FOOD_ADDONS[food.id] || {}));
  const EXTRA_FOODS = [
    { id: 'chicken-thigh', name: '去皮雞腿肉（熟）', emoji: '🍗', unit: 'g', qty: 100, kcal: 180, protein: 25, carbs: 0, fat: 8.5, fiber: 0, units: { 份: 120, 個: 150 }, aliases: ['雞腿', '雞腿肉'] },
    { id: 'pork-loin', name: '豬里肌（熟）', emoji: '🥩', unit: 'g', qty: 100, kcal: 180, protein: 27, carbs: 0, fat: 7.5, fiber: 0, units: { 份: 100, 片: 80 }, aliases: ['豬里肌', '里肌', '豬肉'] },
    { id: 'salmon', name: '鮭魚（熟）', emoji: '🐟', unit: 'g', qty: 100, kcal: 206, protein: 22, carbs: 0, fat: 12.5, fiber: 0, units: { 片: 120, 份: 120, 塊: 120 }, aliases: ['鮭魚', '鮭魚排'] },
    { id: 'mackerel', name: '鯖魚（熟）', emoji: '🐟', unit: 'g', qty: 100, kcal: 250, protein: 21, carbs: 0, fat: 18.5, fiber: 0, units: { 片: 100, 份: 100, 塊: 100 }, aliases: ['鯖魚', '烤鯖魚'] },
    { id: 'brown-rice', name: '糙米飯', emoji: '🍚', unit: 'g', qty: 100, kcal: 112, protein: 2.6, carbs: 23.5, fat: 0.9, fiber: 1.8, units: { 碗: 160, 份: 160 }, aliases: ['糙米', '糙米飯'] },
    { id: 'potato', name: '馬鈴薯（熟）', emoji: '🥔', unit: 'g', qty: 100, kcal: 87, protein: 1.9, carbs: 20, fat: 0.1, fiber: 1.8, units: { 顆: 150, 個: 150, 份: 150 }, aliases: ['馬鈴薯', '洋芋'] },
    { id: 'noodles', name: '麵條（熟）', emoji: '🍜', unit: 'g', qty: 100, kcal: 138, protein: 4.5, carbs: 27, fat: 1, fiber: 1.2, units: { 碗: 200, 份: 200 }, aliases: ['麵', '麵條', '乾麵', '湯麵'] },
    { id: 'toast', name: '白吐司', emoji: '🍞', unit: 'g', qty: 100, kcal: 266, protein: 8.5, carbs: 49, fat: 3.5, fiber: 2.4, units: { 片: 30 }, aliases: ['吐司', '土司', '白吐司'] },
    { id: 'wholewheat-toast', name: '全麥吐司', emoji: '🍞', unit: 'g', qty: 100, kcal: 250, protein: 11, carbs: 43, fat: 3.5, fiber: 6, units: { 片: 30 }, aliases: ['全麥吐司', '全麥土司'] },
    { id: 'bread', name: '麵包（一般）', emoji: '🥐', unit: 'g', qty: 100, kcal: 300, protein: 8, carbs: 50, fat: 7, fiber: 2, units: { 個: 80, 份: 80 }, aliases: ['麵包'] },
    { id: 'mantou', name: '饅頭', emoji: '🥯', unit: 'g', qty: 100, kcal: 230, protein: 7, carbs: 47, fat: 1, fiber: 1.5, units: { 個: 100, 顆: 100 }, aliases: ['饅頭'] },
    { id: 'apple', name: '蘋果', emoji: '🍎', unit: 'g', qty: 100, kcal: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, units: { 顆: 200, 個: 200, 份: 150 }, aliases: ['蘋果'] },
    { id: 'guava', name: '芭樂', emoji: '🍐', unit: 'g', qty: 100, kcal: 38, protein: 0.8, carbs: 9.6, fat: 0.1, fiber: 3, units: { 顆: 250, 個: 250, 份: 150 }, aliases: ['芭樂'] },
    { id: 'kiwi', name: '奇異果', emoji: '🥝', unit: 'g', qty: 100, kcal: 61, protein: 1.1, carbs: 15, fat: 0.5, fiber: 3, units: { 顆: 80, 個: 80 }, aliases: ['奇異果'] },
    { id: 'edamame', name: '毛豆', emoji: '🫛', unit: 'g', qty: 100, kcal: 125, protein: 11, carbs: 10, fat: 5, fiber: 5, units: { 份: 100, 包: 150, 碗: 100 }, aliases: ['毛豆'] },
    { id: 'dried-tofu', name: '豆干', emoji: '◻️', unit: 'g', qty: 100, kcal: 160, protein: 17, carbs: 4, fat: 8.5, fiber: 1.5, units: { 片: 35, 塊: 35, 份: 70 }, aliases: ['豆干', '豆乾'] },
    { id: 'broccoli', name: '青花菜（熟）', emoji: '🥦', unit: 'g', qty: 100, kcal: 35, protein: 2.4, carbs: 7, fat: 0.4, fiber: 3.3, units: { 碗: 100, 份: 100 }, aliases: ['青花菜', '花椰菜', '綠花椰'] },
    { id: 'spinach', name: '菠菜（熟）', emoji: '🥬', unit: 'g', qty: 100, kcal: 23, protein: 3, carbs: 3.8, fat: 0.3, fiber: 2.4, units: { 碗: 100, 份: 100 }, aliases: ['菠菜'] },
    { id: 'cabbage', name: '高麗菜（熟）', emoji: '🥬', unit: 'g', qty: 100, kcal: 25, protein: 1.3, carbs: 5.5, fat: 0.1, fiber: 2, units: { 碗: 100, 份: 100 }, aliases: ['高麗菜'] },
    { id: 'mushroom', name: '菇類（熟）', emoji: '🍄', unit: 'g', qty: 100, kcal: 30, protein: 3, carbs: 5, fat: 0.4, fiber: 2.5, units: { 碗: 100, 份: 100 }, aliases: ['菇類', '香菇', '杏鮑菇', '金針菇'] },
    { id: 'tomato', name: '番茄', emoji: '🍅', unit: 'g', qty: 100, kcal: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, units: { 顆: 150, 個: 150 }, aliases: ['番茄', '蕃茄', '小番茄'] },
    { id: 'lettuce', name: '生菜沙拉（不含醬）', emoji: '🥗', unit: 'g', qty: 100, kcal: 15, protein: 1.4, carbs: 2.9, fat: 0.2, fiber: 1.3, units: { 份: 80, 盒: 120, 碗: 80 }, aliases: ['生菜', '沙拉', '生菜沙拉'] },
    { id: 'bubble-tea', name: '珍珠奶茶（大杯・正常甜）', emoji: '🧋', unit: '杯', qty: 1, kcal: 520, protein: 4, carbs: 95, fat: 14, fiber: 0.5, units: { 份: 1, ml: 1 / 700 }, aliases: ['珍珠奶茶', '珍奶', '波霸奶茶'] },
    { id: 'latte', name: '拿鐵（全脂鮮奶）', emoji: '☕', unit: 'ml', qty: 100, kcal: 56, protein: 3, carbs: 4.6, fat: 3, fiber: 0, units: { 杯: 360 }, aliases: ['拿鐵', '咖啡拿鐵'] },
    { id: 'black-coffee', name: '黑咖啡／美式', emoji: '☕', unit: 'ml', qty: 100, kcal: 2, protein: 0.1, carbs: 0.3, fat: 0, fiber: 0, units: { 杯: 360 }, aliases: ['黑咖啡', '美式', '美式咖啡', '咖啡'] },
    { id: 'lurou-rice', name: '滷肉飯（小碗）', emoji: '🍚', unit: '碗', qty: 1, kcal: 340, protein: 10, carbs: 48, fat: 12, fiber: 0.8, units: { 份: 1, g: 1 / 200 }, aliases: ['滷肉飯', '魯肉飯'] },
    { id: 'blanched-veg', name: '燙青菜（含少量肉燥）', emoji: '🥬', unit: '份', qty: 1, kcal: 90, protein: 3, carbs: 7, fat: 5.5, fiber: 3, units: { 碗: 1 }, aliases: ['燙青菜'] },
    { id: 'beef-rice', name: '牛肉飯（一般份量）', emoji: '🍛', unit: '碗', qty: 1, kcal: 650, protein: 25, carbs: 90, fat: 20, fiber: 2, units: { 份: 1 }, aliases: ['牛肉飯', '牛丼'] },
    { id: 'chicken-bento', name: '雞胸健康餐盒', emoji: '🍱', unit: '份', qty: 1, kcal: 550, protein: 40, carbs: 65, fat: 12, fiber: 7, units: { 盒: 1, 個: 1 }, aliases: ['雞胸便當', '健康餐', '健康餐盒', '雞胸餐盒'] },
    { id: 'chicken-leg-bento', name: '雞腿便當', emoji: '🍱', unit: '份', qty: 1, kcal: 850, protein: 38, carbs: 100, fat: 30, fiber: 4, units: { 盒: 1, 個: 1 }, aliases: ['雞腿便當', '便當'] },
    { id: 'dumplings', name: '水餃（豬肉高麗菜）', emoji: '🥟', unit: '個', qty: 1, kcal: 50, protein: 2.2, carbs: 6, fat: 1.9, fiber: 0.3, units: { 顆: 1, 份: 10 }, aliases: ['水餃', '餃子'] },
    { id: 'fried-chicken', name: '炸雞（帶骨）', emoji: '🍗', unit: '塊', qty: 1, kcal: 290, protein: 22, carbs: 10, fat: 18, fiber: 0, units: { 個: 1, 份: 2, g: 1 / 120 }, aliases: ['炸雞', '炸雞腿'] },
    { id: 'fries', name: '薯條', emoji: '🍟', unit: 'g', qty: 100, kcal: 312, protein: 3.4, carbs: 41, fat: 15, fiber: 3.8, units: { 份: 117, 包: 117 }, aliases: ['薯條'] }
  ];
  const SUGGEST_PROTEINS = [['chicken', '雞胸'], ['chicken-thigh', '雞腿'], ['beef', '牛肉'], ['pork-loin', '豬里肌'], ['white-fish', '白肉魚'], ['salmon', '鮭魚'], ['mackerel', '鯖魚'], ['shrimp', '蝦仁'], ['tofu', '豆腐'], ['egg', '雞蛋']];
  const SUGGEST_CARBS = ['rice', 'brown-rice', 'sweet-potato', 'potato', 'noodles'];
  const SUGGEST_VEG = ['broccoli', 'spinach', 'cabbage', 'mushroom', 'tomato', 'lettuce'];
  const FIXED_SUGGESTIONS = [
    { name: '便利商店高蛋白組', category: '便利商店', meals: ['lunch', 'dinner'], items: [['egg', 2], ['soy', 400], ['chicken', 100], ['sweet-potato', 200], ['lettuce', 80]] },
    { name: '便利商店輕食組', category: '便利商店', meals: ['lunch', 'dinner'], items: [['chicken', 100], ['egg', 1], ['sweet-potato', 150], ['soy', 300]] },
    { name: '便利商店清爽組', category: '便利商店', meals: ['lunch', 'dinner'], items: [['greek-yogurt', 150], ['egg', 2], ['edamame', 100], ['banana', 120]] },
    { name: '小吃店：滷肉飯小碗組', category: '一般外食', meals: ['lunch', 'dinner'], items: [['lurou-rice', 1], ['blanched-veg', 1], ['egg', 1], ['tofu', 100]] },
    { name: '牛肉飯＋燙青菜＋蛋', category: '一般外食', meals: ['lunch'], items: [['beef-rice', 1], ['blanched-veg', 1], ['egg', 1]] },
    { name: '水餃＋燙青菜＋豆漿', category: '一般外食', meals: ['lunch', 'dinner'], items: [['dumplings', 10], ['blanched-veg', 1], ['soy', 300]] },
    { name: '雞胸健康餐盒', category: '健康餐', meals: ['lunch', 'dinner'], items: [['chicken-bento', 1]] },
    { name: '自助餐：雞腿＋兩樣青菜', category: '自助餐', meals: ['lunch', 'dinner'], items: [['chicken-thigh', 120], ['rice', 150], ['cabbage', 100], ['spinach', 100]] },
    { name: '自助餐：魚＋兩樣青菜', category: '自助餐', meals: ['lunch', 'dinner'], items: [['white-fish', 120], ['rice', 120], ['broccoli', 100], ['mushroom', 80]] }
  ];
  const WORKOUT_TYPES = [['cardio', '有氧 Cardio'], ['strength', '重量訓練 Strength'], ['sports', '球類運動 Sports'], ['mobility', '伸展／活動度 Mobility'], ['other', '其他 Other']];
  const TYPE_LABEL = { cardio: 'Cardio・有氧', strength: 'Strength・重訓', sports: 'Sports・運動', mobility: 'Mobility・伸展', other: 'Other・其他' };
  const PERIODS = [['', '不指定時段'], ['morning', '上午'], ['afternoon', '下午'], ['evening', '晚上']];
  const PERIOD_LABEL = { morning: '上午', afternoon: '下午', evening: '晚上' };
  const EXERCISE_PRESETS = [['爬坡走', 'cardio', 6], ['跑步', 'cardio', 8.3], ['快走', 'cardio', 4.3], ['樓梯機', 'cardio', 9], ['腳踏車', 'cardio', 6.8], ['飛輪', 'cardio', 8], ['橢圓機', 'cardio', 5], ['划船機', 'cardio', 7], ['游泳', 'cardio', 7], ['籃球', 'sports', 6.5], ['羽球', 'sports', 5.5], ['足球', 'sports', 7], ['網球', 'sports', 7.3], ['桌球', 'sports', 4], ['瑜珈', 'mobility', 2.5], ['伸展', 'mobility', 2.3], ['深蹲', 'strength', 5], ['臥推', 'strength', 5], ['硬舉', 'strength', 6], ['引體向上', 'strength', 5], ['肩推', 'strength', 5], ['腿推', 'strength', 5], ['二頭彎舉', 'strength', 3.5], ['Lat Pulldown', 'strength', 5], ['Chest Press', 'strength', 5], ['Incline Dumbbell Press', 'strength', 5]];
  const STATUS_LABEL = { PLANNED: 'Planned・尚未記錄', COMPLETED: 'Completed・完成計畫', MODIFIED: 'Modified・有調整', REST: 'Rest・恢復日' };
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const round10 = v => Math.round(v / 10) * 10;
  const nowISO = () => new Date().toISOString();
  function newId() { return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`; }
  function shortName(food) { return String(food.name).replace(/（[^）]*）/g, '').split('／')[0]; }
  function friendlyAmount(food, amount) { return food.id === 'egg' ? `${fmt(amount, 1)} 顆` : `${fmt(amount, 1)} ${food.unit}`; }

  // --- 單位換算與食物比對 ---
  function normUnit(unit) {
    const raw = String(unit ?? '').trim(), lower = raw.toLowerCase();
    if (['g', '公克', '克'].includes(lower)) return 'g';
    if (['kg', '公斤'].includes(lower)) return 'kg';
    if (['ml', 'cc', '毫升'].includes(lower)) return 'ml';
    if (['l', '公升'].includes(lower)) return 'L';
    if (raw === '隻') return '個';
    if (raw === '粒') return '顆';
    return raw;
  }
  const METRIC = { g: ['g', 1], kg: ['g', 1000], ml: ['ml', 1], L: ['ml', 1000] };
  function toBaseAmount(food, qty, unit) {
    const u = normUnit(unit), fu = normUnit(food.unit), amount = number(qty), units = food.units || {};
    if (!(amount > 0)) return null;
    if (u === fu) return { amount, kind: fu === 'g' || fu === 'ml' ? 'measured' : 'portion' };
    if (METRIC[u]) {
      const [family, factor] = METRIC[u], value = amount * factor;
      if (fu === family) return { amount: value, kind: 'measured' };
      if (fu === 'g' || fu === 'ml') return { amount: value, kind: 'approx' };
      const per = units[family] ?? units[family === 'g' ? 'ml' : 'g'];
      return per ? { amount: value * per, kind: units[family] != null ? 'measured' : 'approx' } : null;
    }
    let per = units[u];
    if (per == null && COUNT_UNITS.includes(u)) {
      const alt = COUNT_UNITS.find(x => units[x] != null);
      if (alt) per = units[alt];
      else if (COUNT_UNITS.includes(fu)) return { amount, kind: 'portion' };
    }
    return per != null ? { amount: amount * per, kind: 'portion' } : null;
  }
  function confidenceFromKind(kind) { return kind === 'measured' ? 'MEDIUM' : kind === 'approx' ? 'LOW' : 'ESTIMATED'; }
  function unitsFor(food) {
    const fu = normUnit(food.unit), units = food.units || {}, list = [fu, ...Object.keys(units)];
    if (fu === 'g' || units.g != null) list.push('g', 'kg');
    if (fu === 'ml' || units.ml != null) list.push('ml', 'L');
    if (fu === 'g') list.push('ml');
    if (fu === 'ml') list.push('g');
    return [...new Set(list.map(normUnit))].filter(u => toBaseAmount(food, 1, u));
  }
  function normName(value) { return String(value ?? '').replace(/（[^）]*）|\([^)]*\)/g, '').replace(/\s+/g, '').toLowerCase(); }
  function matchFood(name) {
    const q = normName(name); if (!q) return null;
    let best = null, bestScore = 0;
    allFoods().forEach(food => {
      const keys = [food.name, ...String(food.name).split('／'), ...(food.aliases || [])].map(normName).filter(Boolean);
      let score = 0;
      keys.forEach(key => {
        if (key === q) score = Math.max(score, 100);
        else if (key.length >= 2 && (q.startsWith(key) || (q.length >= 2 && key.startsWith(q)))) score = Math.max(score, 80 - Math.abs(key.length - q.length));
        else if (key.length >= 2 && (q.includes(key) || (q.length >= 2 && key.includes(q)))) score = Math.max(score, 60 - Math.abs(key.length - q.length));
      });
      if (score && String(food.id).startsWith('custom-')) score += 5;
      if (score > bestScore) { bestScore = score; best = food; }
    });
    return bestScore >= 45 ? best : null;
  }
  function parseFoodText(text) {
    const s = String(text ?? '').trim(); if (!s) return null;
    const m = s.match(/^(.+?)\s*([0-9]+(?:\.[0-9]+)?|[一二兩三四五六七八九十半])\s*([a-zA-Z]+|公克|克|公斤|毫升|公升|顆|個|片|碗|杯|份|根|條|塊|包|瓶|盒|隻|粒)?\s*$/);
    if (!m) return { name: s, qty: null, unit: null };
    const cn = { 一: 1, 二: 2, 兩: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10, 半: 0.5 };
    return { name: m[1].trim(), qty: cn[m[2]] ?? Number(m[2]), unit: m[3] ? normUnit(m[3]) : null };
  }
  function naturalUnit(food) { const fu = normUnit(food.unit); if (fu !== 'g' && fu !== 'ml') return food.id === 'egg' ? '顆' : fu; return COUNT_UNITS.find(u => food.units?.[u] != null) || fu; }
  function estimateFood(name, qty, unit) {
    const food = matchFood(name); if (!food) return { food: null };
    const base = toBaseAmount(food, qty, unit);
    if (!base) return { food, base: null };
    return { food, base, nutrition: amountNutrition(food, base.amount), confidence: food.source === 'fact' && base.kind !== 'approx' ? 'HIGH' : confidenceFromKind(base.kind) };
  }
  function foodEntry({ food = null, name, amount, unit, nutrition, source = 'estimate', origin = 'USER_ADDED', confidence = 'ESTIMATED' }) {
    const n = Object.fromEntries(NUT_KEYS.map(k => [k, round(number(nutrition[k]), 1)])), now = nowISO(), qty = round(number(amount), 2);
    return { id: newId(), foodId: food ? food.id : null, name: String(name || food?.name || '食物').trim(), amount: qty, unit, source, origin, confidence: source === 'fact' ? 'HIGH' : confidence, ...n, basis: { amount: qty, unit, ...n }, createdAt: now, updatedAt: now };
  }
  function addFoodById(meal, id, amount, origin = 'AI_RECOMMENDED') {
    const food = getFood(id); if (!food) return null;
    const base = toBaseAmount(food, amount, food.unit);
    const entry = foodEntry({ food, name: food.name, amount, unit: food.unit, nutrition: amountNutrition(food, amount), source: food.source === 'fact' ? 'fact' : 'estimate', origin, confidence: confidenceFromKind(base?.kind) });
    getDay().meals[meal].push(entry);
    return entry;
  }
  function recalcEntry(item, amount, unit) {
    const food = item.foodId ? getFood(item.foodId) : null;
    if (food) { const base = toBaseAmount(food, amount, unit); if (base) return { nutrition: amountNutrition(food, base.amount), confidence: item.source === 'fact' ? 'HIGH' : confidenceFromKind(base.kind) }; }
    const basis = item.basis || item;
    if (normUnit(unit) === normUnit(basis.unit) && number(basis.amount) > 0 && number(amount) > 0) {
      const factor = number(amount) / number(basis.amount);
      return { nutrition: Object.fromEntries(NUT_KEYS.map(k => [k, round(number(basis[k]) * factor, 1)])), confidence: item.confidence || (item.source === 'fact' ? 'HIGH' : 'ESTIMATED') };
    }
    return null;
  }
  function entryBadge(item) {
    if (item.source === 'fact' || item.confidence === 'HIGH') return '<span class="tag fact">FACT・標示數值</span>';
    if (item.confidence === 'MEDIUM') return '<span class="tag estimate">ESTIMATE・依重量</span>';
    if (item.confidence === 'LOW') return '<span class="tag estimate">ESTIMATE・粗估</span>';
    if (item.confidence === 'ESTIMATED') return '<span class="tag estimate">Estimated・依份量推估</span>';
    return sourceBadge(item.source);
  }
  function macroChips(n) { return `<div class="macro-chips"><span><b>${fmt(n.kcal)}</b> kcal</span><span>蛋白質 <b>${fmt(n.protein, 1)}</b> g</span><span>碳水 <b>${fmt(n.carbs, 1)}</b> g</span><span>脂肪 <b>${fmt(n.fat, 1)}</b> g</span><span>纖維 <b>${fmt(n.fiber, 1)}</b> g</span></div>`; }
  function unitSelect(name, selected, options = UNIT_OPTIONS, id = '') { const opts = [...new Set([...(options || []), selected].filter(Boolean))]; return `<select name="${name}" ${id ? `id="${id}"` : ''}>${opts.map(u => `<option value="${escapeHTML(u)}" ${u === selected ? 'selected' : ''}>${escapeHTML(u)}</option>`).join('')}</select>`; }
  function mealSelect(name, selected, id = '') { return `<select name="${name}" ${id ? `id="${id}"` : ''}>${MEALS.map(m => `<option value="${m.id}" ${m.id === selected ? 'selected' : ''}>${m.icon} ${m.label}</option>`).join('')}</select>`; }
  function defaultMeal() {
    if (selectedDate === today) { const d = new Date(), h = d.getHours() + d.getMinutes() / 60; if (h < 10.5) return 'breakfast'; if (h < 14.5) return 'lunch'; if (h < 17) return 'snack'; if (h < 21) return 'dinner'; return 'snack'; }
    const day = getDay(); return ['breakfast', 'lunch', 'dinner'].find(m => !(day.meals[m] || []).length) || 'snack';
  }

  // --- 自訂食物視窗 ---
  function openSmartAdd({ meal = defaultMeal(), name = '', qty = '', unit = '', origin = 'USER_ADDED' } = {}) {
    const names = [...new Set(allFoods().flatMap(f => [f.name, ...(f.aliases || [])]))];
    const body = `<form id="smart-food-form" data-origin="${escapeHTML(origin)}">
      <div class="field"><label for="sf-quick">快速輸入（名稱＋份量）</label><input id="sf-quick" name="quick" autocomplete="off" placeholder="例如：香蕉 1 根、雞蛋 2 顆、白飯 150 g、豆漿 300 ml"></div>
      <div class="form-grid" style="margin-top:11px">
        <div class="field full"><label for="sf-name">食物名稱</label><input id="sf-name" name="name" list="sf-food-list" maxlength="60" autocomplete="off" value="${escapeHTML(name)}" placeholder="例如：香蕉、雞胸肉、珍珠奶茶" required><datalist id="sf-food-list">${names.map(n => `<option value="${escapeHTML(n)}"></option>`).join('')}</datalist></div>
        <div class="field"><label for="sf-qty">數量</label><input id="sf-qty" name="qty" type="number" min="0.01" step="any" inputmode="decimal" value="${escapeHTML(qty)}" placeholder="例如 1 或 150" required></div>
        <div class="field"><label for="sf-unit">單位</label>${unitSelect('unit', unit || 'g', UNIT_OPTIONS, 'sf-unit')}</div>
        <div class="field full"><label for="sf-meal">加入哪一餐</label>${mealSelect('meal', meal, 'sf-meal')}</div>
      </div>
      <div id="sf-preview" class="estimate-box"></div>
      <label class="check-row"><input type="checkbox" name="manual" id="sf-manual"> 自己輸入這份的營養數值（包裝標示或已知數值）</label>
      <div id="sf-manual-fields" class="form-grid" style="margin-top:10px" hidden>
        <div class="field"><label>熱量（kcal）</label><input name="kcal" type="number" min="0" step="any" inputmode="decimal"></div>
        <div class="field"><label>蛋白質（g）</label><input name="protein" type="number" min="0" step="any" inputmode="decimal"></div>
        <div class="field"><label>碳水（g）</label><input name="carbs" type="number" min="0" step="any" inputmode="decimal"></div>
        <div class="field"><label>脂肪（g）</label><input name="fat" type="number" min="0" step="any" inputmode="decimal"></div>
        <div class="field"><label>纖維（g）</label><input name="fiber" type="number" min="0" step="any" inputmode="decimal"></div>
        <label class="check-row full"><input type="checkbox" name="fact"> 數值來自包裝或店家標示（FACT）</label>
        <label class="check-row full"><input type="checkbox" name="saveFood"> 存到我的食物，下次輸入名稱就能自動計算</label>
      </div>
      <div class="dialog-actions"><button type="button" class="secondary-button" data-action="close-modal">取消</button><button class="primary-button">加入今日飲食</button></div></form>`;
    modal('＋ 自訂食物', body);
    updateSmartPreview($('#smart-food-form'));
  }
  function updateSmartPreview(form) {
    if (!form) return;
    const v = serializeForm(form), box = $('#sf-preview', form), manual = $('#sf-manual', form), name = String(v.name || '').trim();
    const est = name ? estimateFood(name, v.qty, v.unit) : { food: null };
    let html;
    if (!name) html = '<span class="small-muted">輸入食物名稱和份量，系統會自動估算熱量、蛋白質、碳水、脂肪與纖維。</span>';
    else if (!est.food) {
      html = `<strong>資料庫沒有「${escapeHTML(name)}」</strong><p class="small-muted">請在下方輸入這份的營養數值（可看包裝或店家標示，不確定也可以先粗估）。勾選「存到我的食物」後，下次輸入同名稱就會自動計算。</p>`;
      if (!manual.checked) { manual.checked = true; manual.dataset.auto = '1'; }
    } else {
      if (manual.dataset.auto === '1') { manual.checked = false; delete manual.dataset.auto; }
      if (!est.base) html = `<strong>${escapeHTML(est.food.name)}</strong><p class="small-muted">${number(v.qty) > 0 ? `這項食物沒有「${escapeHTML(v.unit)}」的換算，可以改用：${unitsFor(est.food).map(escapeHTML).join('、')}；或在下方自己輸入營養數值。` : '請輸入數量。'}</p>`;
      else html = `<div class="estimate-head"><strong>${escapeHTML(est.food.name)}</strong>${entryBadge({ confidence: est.confidence })}</div><p class="small-muted">參考：每 ${fmt(est.food.qty)} ${escapeHTML(est.food.unit)} 約 ${fmt(est.food.kcal)} kcal${normUnit(v.unit) !== normUnit(est.food.unit) ? ` · 換算約 ${fmt(est.base.amount, 1)} ${escapeHTML(est.food.unit)}` : ''}</p>${macroChips(est.nutrition)}${est.confidence === 'ESTIMATED' ? '<p class="small-muted">依一般大小推估，實際大小不同會有差異；知道重量時輸入 g 會更準。</p>' : ''}`;
    }
    box.innerHTML = html;
    $('#sf-manual-fields', form).hidden = !manual.checked;
    form.dataset.estimate = est.nutrition ? JSON.stringify(est.nutrition) : '';
  }
  function fillManualFromEstimate(form) {
    if (!form.dataset.estimate) return;
    const n = JSON.parse(form.dataset.estimate);
    NUT_KEYS.forEach(k => { const input = form.elements[k]; if (input && input.value === '') input.value = round(n[k], 1); });
  }
  function findEntry(meal, id) { return (getDay().meals[meal] || []).find(item => item.id === id); }
  function openEditFood(meal, id) {
    const item = findEntry(meal, id); if (!item) return;
    const food = item.foodId ? getFood(item.foodId) : null;
    const units = food ? [...new Set([normUnit(item.unit), ...unitsFor(food)])] : [item.unit];
    const body = `<form id="edit-food-form" data-meal="${meal}" data-entry="${escapeHTML(id)}">
      <p class="small-muted" style="margin:0 0 11px">目前：${fmt(item.amount, 2)} ${escapeHTML(item.unit)} · ${macroLine(item)}</p>
      <div class="form-grid"><div class="field"><label for="ef-qty">實際份量</label><input id="ef-qty" name="qty" type="number" min="0.01" step="any" inputmode="decimal" value="${escapeHTML(item.amount)}" required></div><div class="field"><label for="ef-unit">單位</label>${unitSelect('unit', normUnit(item.unit), units, 'ef-unit')}</div><div class="field full"><label for="ef-meal">餐別</label>${mealSelect('meal', meal, 'ef-meal')}</div></div>
      <div id="edit-preview" class="estimate-box"></div>
      ${food ? '' : '<p class="small-muted">這筆是自行輸入或店家餐點，修改份量時會依原本數值等比例換算。</p>'}
      <div class="dialog-actions"><button type="button" class="danger-link" style="margin-right:auto" data-action="remove-food" data-meal="${meal}" data-entry="${escapeHTML(id)}">刪除這筆</button><button type="button" class="secondary-button" data-action="close-modal">取消</button><button class="primary-button">儲存修改</button></div></form>`;
    modal(`編輯份量：${item.name}`, body);
    updateEditPreview($('#edit-food-form'));
  }
  function updateEditPreview(form) {
    if (!form) return;
    const item = findEntry(form.dataset.meal, form.dataset.entry), v = serializeForm(form), box = $('#edit-preview', form);
    if (!item || !box) return;
    const result = recalcEntry(item, v.qty, v.unit);
    box.innerHTML = result ? `<div class="estimate-head"><strong>${fmt(item.amount, 2)} ${escapeHTML(item.unit)} → ${fmt(number(v.qty), 2)} ${escapeHTML(v.unit)}</strong>${entryBadge({ confidence: result.confidence, source: item.source })}</div>${macroChips(result.nutrition)}<p class="small-muted">儲存後，今日總熱量與營養素會一起更新。</p>` : '<span class="small-muted">請輸入大於 0 的份量，或改用可換算的單位。</span>';
  }

  // --- 快速提案 ---
  function hashString(text) { let h = 2166136261; for (const ch of String(text)) { h ^= ch.codePointAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
  function seededRandom(seed) { let a = seed || 1; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function sumItems(items) { return items.reduce((sum, [id, amount]) => { const f = getFood(id); if (!f) return sum; const n = amountNutrition(f, amount); NUT_KEYS.forEach(k => { sum[k] += n[k]; }); return sum; }, { kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }); }
  function mealTarget(meal, day = getDay()) {
    const g = goals(), t = totals(day), has = id => (day.meals[id] || []).length > 0;
    const left = { kcal: g.kcal - t.kcal, protein: g.protein - t.protein, carbs: g.carbs - t.carbs, fat: g.fat - t.fat, fiber: g.fiber - t.fiber };
    const share = meal === 'lunch' ? (has('dinner') ? 0.9 : 0.5) : (has('snack') ? 1 : 0.9);
    const target = { kcal: clamp(left.kcal * share, 0, 1100), protein: Math.max(0, left.protein * share), carbs: Math.max(0, left.carbs * share), fat: Math.max(0, left.fat * share), fiber: Math.max(0, left.fiber * share) };
    return { left, target };
  }
  function buildHomeMeal(pid, label, cid, vid, target) {
    const P = getFood(pid), C = getFood(cid), V = getFood(vid), veg = 150, vn = amountNutrition(V, veg), cGuess = amountNutrition(C, 150);
    const needP = Math.max(15, target.protein - vn.protein - cGuess.protein), perP = P.protein / P.qty;
    const pAmt = P.unit === '個' ? clamp(Math.round(needP / perP), 2, 4) : clamp(round10(needP / perP), 80, pid === 'tofu' ? 300 : 200);
    const pn = amountNutrition(P, pAmt), carbKcal = target.kcal - pn.kcal - vn.kcal;
    let cAmt = clamp(round10(carbKcal / (C.kcal / C.qty)), 0, 250);
    if (cAmt < 50) cAmt = carbKcal > 60 ? 50 : 0;
    return { name: `${label}＋${shortName(C)}＋${shortName(V)}`, category: '自己料理', main: pid, items: [[pid, pAmt], [cid, cAmt], [vid, veg]].filter(x => x[1] > 0) };
  }
  function scoreSuggestion(n, target, left, ate, main) {
    let s = 100;
    s -= Math.abs(n.kcal - target.kcal) / Math.max(target.kcal, 250) * 35;
    if (target.protein > 5) s -= Math.max(0, target.protein - n.protein) / target.protein * 35;
    const fatRoom = Math.max(left.fat, 0) * 0.9 + 3;
    if (n.fat > fatRoom) s -= (n.fat - fatRoom) * 1.2;
    if (n.kcal > Math.max(left.kcal, 0) + 120) s -= 25;
    s += Math.min(n.fiber, 10) * 0.6;
    if (ate.has(main)) s -= 8;
    return s;
  }
  function suggestionCandidates(meal) {
    const day = getDay(), { left, target } = mealTarget(meal, day), rng = seededRandom(hashString(`${selectedDate}|${meal}`));
    const fixed = FIXED_SUGGESTIONS.filter(s => s.meals.includes(meal)).map(s => ({ ...s, main: s.items[0][0] }));
    const home = [], seen = new Set();
    for (let guard = 0; home.length < 12 && guard < 300; guard++) {
      const [pid, label] = SUGGEST_PROTEINS[Math.floor(rng() * SUGGEST_PROTEINS.length)];
      const cid = SUGGEST_CARBS[Math.floor(rng() * SUGGEST_CARBS.length)], vid = SUGGEST_VEG[Math.floor(rng() * SUGGEST_VEG.length)];
      if (seen.has(`${pid}|${cid}`)) continue;
      seen.add(`${pid}|${cid}`); home.push(buildHomeMeal(pid, label, cid, vid, target));
    }
    const ate = new Set(Object.values(day.meals).flat().map(i => i.foodId).filter(Boolean));
    let list = [...fixed, ...home].map(c => { const n = sumItems(c.items); return { ...c, nutrition: n, score: scoreSuggestion(n, target, left, ate, c.main) + rng() * (c.category === '自己料理' ? 16 : 30) }; });
    if (target.kcal < 250) { const light = list.filter(c => c.nutrition.kcal <= Math.max(left.kcal + 150, 350)); if (light.length >= 3) list = light; }
    list.sort((a, b) => b.score - a.score);
    const ordered = [];
    while (list.length) {
      let idx = list.findIndex(c => !ordered.slice(c.category === '自己料理' ? -1 : -3).some(x => x.category === c.category) && !ordered.slice(-3).some(x => x.main === c.main));
      if (idx < 0) idx = 0;
      ordered.push(list.splice(idx, 1)[0]);
    }
    return { list: ordered, left, target };
  }
  function suggestionReason(meal, left) {
    if (left.kcal <= 150) return `今天熱量已接近目標。如果還會餓，選份量小、以蛋白質和蔬菜為主的選項就好，不用硬吃。`;
    const proteinHeavy = left.protein > 0 && left.protein * 4 / Math.max(left.kcal, 1) > 0.3, fatTight = left.fat < 15;
    const focus = [proteinHeavy ? '高蛋白' : '適量蛋白質', '中等碳水', fatTight ? '低脂肪' : '低～中脂肪'];
    return `今天還剩約 ${fmt(Math.max(0, left.kcal))} kcal、蛋白質 ${fmt(Math.max(0, left.protein))} g、脂肪 ${fmt(Math.max(0, left.fat))} g。${proteinHeavy ? '蛋白質還差比較多，' : ''}${MEAL_NAMES[meal]}優先：${focus.join('、')}${fatTight ? '；脂肪空間很少，盡量避開油炸、起司和堅果' : '；炸物、奶茶這類高油高糖的選項先放後面'}。`;
  }
  const suggestState = {};
  function slotState(meal, length) {
    const key = `${selectedDate}|${meal}`, st = suggestState[key] ||= { slots: [0, 1, 2], next: 3 };
    st.slots = [...new Set(st.slots.filter(i => i < length))];
    for (let i = 0; st.slots.length < Math.min(st.size || 3, length) && i < length; i++) if (!st.slots.includes(i)) st.slots.push(i);
    return st;
  }
  function suggestionCard(meal, cand, slot, index) {
    return `<article class="suggest-card"><div class="suggest-head"><span class="cat-chip">${escapeHTML(cand.category)}</span><h3>${escapeHTML(cand.name)}</h3></div><ul class="suggest-items">${cand.items.map(([id, amount]) => { const f = getFood(id); return f ? `<li><span>${escapeHTML(shortName(f))} <small>${friendlyAmount(f, amount)}</small></span><button class="mini-add" data-action="add-suggest-item" data-meal="${meal}" data-food="${escapeHTML(id)}" data-amount="${amount}">＋加入今日飲食</button></li>` : ''; }).join('')}</ul>${macroChips(cand.nutrition)}<div class="suggest-actions"><button class="primary-button" data-action="add-suggestion" data-meal="${meal}" data-index="${index}">加入今日飲食</button><button class="secondary-button" data-action="swap-suggestion" data-meal="${meal}" data-slot="${slot}">換一個</button><button class="quiet-button" data-action="smart-add" data-meal="${meal}">自己輸入</button></div></article>`;
  }
  function suggestionSection(meal) {
    const { list, left } = suggestionCandidates(meal), st = slotState(meal, list.length);
    return `<section class="card scroll-target" id="suggest-${meal}"><div class="card-header"><div><h2 class="card-title">${MEAL_NAMES[meal]}快速提案</h2><p class="card-subtitle">不知道吃什麼時的方向；可以照吃、換一個，或自己輸入</p></div><span class="tag estimate">ESTIMATE</span></div><p class="suggest-reason">${escapeHTML(suggestionReason(meal, left))}</p><div class="suggest-list">${st.slots.map((i, slot) => suggestionCard(meal, list[i], slot, i)).join('')}</div><p class="swipe-hint">左右滑動看其他方案 →</p>${st.slots.length < 5 && list.length > st.slots.length ? `<button class="text-link" style="margin-top:8px" data-action="more-suggestions" data-meal="${meal}">再看 2 個方案 ↓</button>` : ''}</section>`;
  }

  // --- 實際運動紀錄 ---
  function logSets(log) { const parts = String(log.reps || '').split(/[\/,\s]+/).filter(Boolean); return parts.length > 1 ? parts.length : number(log.sets) || (parts.length ? 1 : 0); }
  function estimateCalories(log) {
    if (number(log.calories) > 0) return { kcal: number(log.calories), estimated: false };
    const minutes = number(log.duration); if (!(minutes > 0)) return null;
    const kg = number(data.profile.weight, 60), preset = EXERCISE_PRESETS.find(p => p[0].toLowerCase() === String(log.name).trim().toLowerCase());
    let met = preset ? preset[2] : ({ cardio: 6, strength: 5, sports: 6, mobility: 2.5, other: 4 }[log.type] || 4);
    const speed = number(log.speed), grade = number(log.incline) / 100, m = speed * 1000 / 60;
    if (log.type === 'cardio' && speed > 0 && speed <= 7.5 && /走|walk/i.test(log.name)) met = (0.1 * m + 1.8 * m * grade + 3.5) / 3.5;
    else if (log.type === 'cardio' && speed > 7.5 && /跑|run/i.test(log.name)) met = (0.2 * m + 0.9 * m * grade + 3.5) / 3.5;
    return { kcal: Math.round(met * kg * minutes / 60), estimated: true };
  }
  function logDetail(log) {
    const parts = [];
    if (log.type === 'strength') {
      const reps = String(log.reps || '').trim();
      if (reps.includes('/')) parts.push(`${log.weight != null ? `${fmt(log.weight, 1)} kg · ` : ''}${reps}`);
      else if (reps || log.sets) parts.push(`${log.weight != null ? `${fmt(log.weight, 1)}kg × ` : ''}${reps || '—'}${log.sets ? ` × ${fmt(log.sets)} 組` : ''}`);
    }
    if (log.duration) parts.push(`${fmt(log.duration)} 分鐘`);
    if (log.distance) parts.push(`${fmt(log.distance, 2)} km`);
    if (log.speed) parts.push(`${fmt(log.speed, 1)} km/h`);
    if (log.incline) parts.push(`坡度 ${fmt(log.incline, 1)}%`);
    const cal = estimateCalories(log); if (cal) parts.push(`${cal.estimated ? '約 ' : ''}${fmt(cal.kcal)} kcal${cal.estimated ? '（估算）' : ''}`);
    if (log.notes) parts.push(log.notes);
    return parts.join(' · ');
  }
  function activitySummary(date = selectedDate) {
    const day = data.days[date] || blankDay(), plan = workoutForDate(date), logs = day.workoutLogs || [], exercises = day.exercises || {};
    const planIds = plan ? plan.exercises.map(e => e[0]) : [], planLogged = planIds.filter(id => exercises[id]).length;
    const planSets = planIds.reduce((s, id) => s + (exercises[id] ? String(exercises[id].reps).split(/[\/,\s]+/).filter(Boolean).length : 0), 0);
    const mins = type => logs.filter(l => l.type === type).reduce((s, l) => s + number(l.duration), 0);
    const cardio = mins('cardio') + (day.cardioDone ? 40 : 0), strengthMin = mins('strength'), other = mins('sports') + mins('mobility') + mins('other');
    const strengthSets = logs.filter(l => l.type === 'strength').reduce((s, l) => s + logSets(l), 0) + planSets;
    const kcal = logs.reduce((s, l) => s + (estimateCalories(l)?.kcal || 0), 0);
    const planDone = !!plan && (day.workoutDone || planLogged >= Math.ceil(planIds.length / 2));
    const hasActivity = logs.length > 0 || planLogged > 0 || day.cardioDone;
    const status = !plan ? (logs.length ? 'MODIFIED' : 'REST') : planDone ? 'COMPLETED' : hasActivity ? 'MODIFIED' : 'PLANNED';
    return { day, plan, logs, planIds, planLogged, planSets, cardio, strengthMin, strengthSets, other, kcal, planDone, status };
  }
  function describeActivity(s) {
    const parts = s.logs.map(l => l.duration ? `${fmt(l.duration)} 分鐘${l.name}` : l.type === 'strength' ? `${l.name} ${logSets(l) || ''}${logSets(l) ? ' 組' : ''}` : l.name);
    if (s.day.cardioDone) parts.push('40 分鐘坡度走');
    if (s.planLogged && !s.planDone) parts.push(`計畫中的 ${s.planLogged} 個重訓動作`);
    return parts.join('＋');
  }
  function activityAnalysis(date = selectedDate) {
    const s = activitySummary(date), name = s.plan?.name;
    if (s.status === 'REST') return '今天是恢復日，休息本身就是計畫的一部分。想動的話，散步或伸展都可以記錄下來。';
    if (s.status === 'PLANNED') return date < today ? `這天原本安排${name}，沒有運動紀錄。當作多休息一天就好，不需要補做。` : `今天的 AI 計畫是${name}。目前還沒有運動紀錄；不管有沒有照菜單，實際做了什麼都可以直接新增。`;
    if (s.status === 'COMPLETED') {
      const extra = s.logs.length ? `另外還完成了${describeActivity({ ...s, day: { ...s.day, cardioDone: false }, planLogged: 0 })}。` : '';
      return `完成原定${name}（記錄 ${s.planLogged}/${s.planIds.length} 個動作${s.cardio ? `，有氧 ${fmt(s.cardio)} 分鐘` : ''}）。${extra}記得補充蛋白質、睡飽，讓身體恢復。`;
    }
    const desc = describeActivity(s) || '一些活動';
    if (!s.plan) return `今天原本安排恢復，你仍完成了${desc}。如果明天有訓練，先看看睡眠和痠痛狀況再決定強度。`;
    const parts = [`今天原本的計畫是${name}，實際完成了${desc}。`];
    if (s.cardio >= 30) parts.push(`你今天仍有完成 ${fmt(s.cardio)} 分鐘有氧，活動量其實不低。`);
    else if (s.cardio + s.other > 0) parts.push('有動起來就有幫助。');
    const otherStrength = s.strengthSets - s.planSets;
    if (otherStrength > 0) parts.push(`重訓部分做了 ${fmt(otherStrength)} 組其他動作，一樣是有效的刺激。`);
    parts.push(`由於今天沒有完成原定${name}，明天不需要補做全部訓練，可以依照恢復狀況調整。`);
    return parts.join('');
  }
  function statusPill(status) { return `<span class="status-pill s-${status.toLowerCase()}">${STATUS_LABEL[status]}</span>`; }
  function logRow(log) {
    return `<div class="food-entry"><div class="food-text"><strong>${escapeHTML(log.name)}${log.period ? ` <span class="origin-chip">${PERIOD_LABEL[log.period] || ''}</span>` : ''}${log.source === 'MODIFIED' ? ' <span class="origin-chip">取代計畫</span>' : ''}</strong><small>${escapeHTML(logDetail(log)) || '—'}</small></div><div class="entry-actions"><button class="entry-btn" data-action="edit-workout" data-id="${escapeHTML(log.id)}">編輯</button><button class="entry-btn danger" data-action="remove-workout" data-id="${escapeHTML(log.id)}" aria-label="刪除${escapeHTML(log.name)}">刪除</button></div></div>`;
  }
  function planLines(s) {
    const lines = [];
    if (s.planLogged) lines.push(`<div class="food-entry"><div class="food-text"><strong>AI 計畫動作</strong><small>已記錄 ${s.planLogged}/${s.planIds.length} 個動作 · ${fmt(s.planSets)} 組（在上方計畫卡片記錄）</small></div></div>`);
    if (s.day.cardioDone) lines.push('<div class="food-entry"><div class="food-text"><strong>坡度走（計畫有氧）</strong><small>40 分鐘 · 已標記完成</small></div></div>');
    return lines.join('');
  }
  function actualWorkoutSection(date = selectedDate) {
    const s = activitySummary(date);
    const groups = WORKOUT_TYPES.map(([type]) => { const list = s.logs.filter(l => l.type === type); return list.length ? `<div class="log-group"><p class="section-label">${TYPE_LABEL[type]}</p>${list.map(logRow).join('')}</div>` : ''; }).join('');
    const plans = planLines(s);
    return `<section class="card actual-card scroll-target" id="actual-workout"><div class="card-header"><div><h2 class="card-title">實際訓練紀錄</h2><p class="card-subtitle">實際做了什麼就記什麼；和 AI 計畫分開保存</p></div>${statusPill(s.status)}</div>
      <div class="metric-grid"><div class="metric-card"><small>Cardio</small><strong>${fmt(s.cardio)}<small> min</small></strong></div><div class="metric-card"><small>Strength</small><strong>${fmt(s.strengthSets)}<small> 組${s.strengthMin ? ` · ${fmt(s.strengthMin)} min` : ''}</small></strong></div><div class="metric-card"><small>其他活動</small><strong>${fmt(s.other)}<small> min</small></strong></div></div>
      ${groups || plans ? `${groups}${plans ? `<div class="log-group"><p class="section-label">From AI Plan</p>${plans}</div>` : ''}` : '<div class="empty-state" style="margin-top:12px">還沒有實際運動紀錄。<br>做了任何運動都可以新增，不需要和計畫一樣。</div>'}
      <button class="add-food-button" style="width:100%;margin-top:12px" data-action="add-workout">＋ 新增今日運動</button>
      <div class="recommendation-card card" style="margin-top:12px"><h3>今日活動分析</h3><p>${escapeHTML(activityAnalysis(date))}</p>${s.kcal ? `<p class="small-muted" style="margin-top:6px">自行紀錄的運動約消耗 ${fmt(s.kcal)} kcal（未填寫者依時間與體重估算）。</p>` : ''}</div></section>`;
  }
  function openWorkoutForm(id = '') {
    const day = getDay(), log = id ? day.workoutLogs.find(l => l.id === id) : null, type = log?.type || 'cardio';
    const names = [...new Set([...EXERCISE_PRESETS.map(p => p[0]), ...Object.values(TRAINING).flatMap(t => t.exercises.map(e => e[1]))])];
    const val = k => escapeHTML(log?.[k] ?? '');
    const field = (name, label, attrs, types) => `<div class="field" data-types="${types}"><label>${label}</label><input name="${name}" ${attrs} value="${val(name)}"></div>`;
    const body = `<form id="workout-log-form" data-id="${escapeHTML(id)}"><div class="form-grid">
      <div class="field full"><label for="wk-name">運動名稱</label><input id="wk-name" name="name" list="wk-list" maxlength="60" autocomplete="off" required placeholder="例如：爬坡走、Lat Pulldown、籃球" value="${val('name')}"><datalist id="wk-list">${names.map(n => `<option value="${escapeHTML(n)}"></option>`).join('')}</datalist></div>
      <div class="field"><label for="wk-type">運動類型</label><select id="wk-type" name="type">${WORKOUT_TYPES.map(([v, l]) => `<option value="${v}" ${v === type ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
      <div class="field"><label for="wk-period">時段</label><select id="wk-period" name="period">${PERIODS.map(([v, l]) => `<option value="${v}" ${v === (log?.period || '') ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
      ${field('duration', '時間（分鐘）', 'type="number" min="0" step="any" inputmode="decimal"', 'cardio strength sports mobility other')}
      ${field('distance', '距離（km）', 'type="number" min="0" step="any" inputmode="decimal"', 'cardio')}
      ${field('speed', '速度（km/h）', 'type="number" min="0" step="any" inputmode="decimal"', 'cardio')}
      ${field('incline', '坡度（%）', 'type="number" min="0" step="any" inputmode="decimal"', 'cardio')}
      ${field('weight', '重量（kg）', 'type="number" min="0" step="any" inputmode="decimal"', 'strength')}
      ${field('sets', '組數', 'type="number" min="0" step="1" inputmode="numeric"', 'strength')}
      ${field('reps', '每組次數（12/12/10 或 10）', 'type="text" inputmode="numeric" maxlength="40"', 'strength')}
      ${field('calories', '消耗熱量（kcal，知道再填）', 'type="number" min="0" step="any" inputmode="decimal"', 'cardio strength sports mobility other')}
      <div class="field full"><label for="wk-notes">備註（可不填）</label><input id="wk-notes" name="notes" maxlength="100" placeholder="例如：狀態不錯、膝蓋有點緊" value="${val('notes')}"></div>
      <label class="check-row full"><input type="checkbox" name="replacesPlan" ${log?.source === 'MODIFIED' ? 'checked' : ''}> 這是用來取代今天 AI 計畫的訓練</label>
    </div><p class="small-muted" style="margin-top:10px">沒填熱量時，會依時間、體重與運動類型粗估，並標示為估算。</p>
    <div class="dialog-actions">${log ? `<button type="button" class="danger-link" style="margin-right:auto" data-action="remove-workout" data-id="${escapeHTML(id)}">刪除這筆</button>` : ''}<button type="button" class="secondary-button" data-action="close-modal">取消</button><button class="primary-button">儲存運動</button></div></form>`;
    modal(log ? '編輯運動紀錄' : '＋ 新增今日運動', body);
    toggleWorkoutFields($('#workout-log-form'));
  }
  function toggleWorkoutFields(form) { if (!form) return; const type = form.elements.type.value; $$('[data-types]', form).forEach(el => { el.hidden = !el.dataset.types.split(' ').includes(type); }); }

  // --- 每日總結 ---
  function foodAnalysis(date = selectedDate) {
    const day = data.days[date] || blankDay(), t = totals(day), g = goals(), count = Object.values(day.meals).flat().length;
    const evening = date < today || (date === today && new Date().getHours() >= 19);
    const title = evening ? '今日飲食分析' : '目前飲食進度';
    if (!count) return { title, t, g, text: date === today ? '今天還沒有飲食紀錄。吃了什麼都可以用「＋ 自訂食物」直接記下來，不一定要是 AI 推薦的食物。' : '這天沒有飲食紀錄。' };
    const kcalDiff = t.kcal - g.kcal, pGap = g.protein - t.protein, fatOver = t.fat - g.fat, fiberGap = g.fiber - t.fiber, parts = [];
    if (evening) {
      if (Math.abs(kcalDiff) <= g.kcal * 0.06 && pGap <= g.protein * 0.06) parts.push('今天整體飲食控制非常接近目標');
      else if (kcalDiff > g.kcal * 0.06) parts.push(`今天熱量比目標多約 ${fmt(kcalDiff)} kcal。一天的差異影響不大，明天照平常吃就好，不需要刻意少吃補償`);
      else if (kcalDiff < -g.kcal * 0.15) parts.push(`今天熱量比目標少約 ${fmt(-kcalDiff)} kcal。如果有餐點沒記到可以補上；若真的吃得比較少，明天正常吃即可，避免長期吃太少`);
      else parts.push('今天熱量大致在目標範圍內');
      if (pGap > 0 && pGap <= 10) parts.push(`蛋白質略低約 ${fmt(pGap)} g，不需要刻意補充大量食物。明天早餐可以增加一顆蛋或少量希臘優格`);
      else if (pGap > 10) parts.push(`蛋白質少了約 ${fmt(pGap)} g，明天午餐或晚餐可以多一份手掌大的肉、魚、蛋或豆腐`);
      else parts.push('蛋白質有達標');
      if (fatOver > 8) parts.push(`脂肪多了約 ${fmt(fatOver)} g，可能來自油炸、醬料或堅果，明天留意一下就好`);
      if (fiberGap > 8) parts.push(`纖維還差約 ${fmt(fiberGap)} g，明天多一份蔬菜或水果`);
    } else {
      parts.push(`目前吃了 ${fmt(t.kcal)} / ${fmt(g.kcal)} kcal、蛋白質 ${fmt(t.protein)} / ${fmt(g.protein)} g`);
      if (pGap > 25) parts.push(`接下來的餐點可以優先補蛋白質（還差約 ${fmt(pGap)} g）`);
      if (kcalDiff < 0 && g.fat - t.fat < 12) parts.push('脂肪空間不多，下一餐盡量避開油炸和起司');
      if (kcalDiff > 0) parts.push('熱量已經超過目標，接下來吃清淡一點就好，不需要餓肚子');
      parts.push('晚上 7 點後會顯示完整的今日飲食分析');
    }
    return { title, t, g, text: `${parts.join('。')}。` };
  }
  function foodAnalysisCard() {
    const a = foodAnalysis(), rows = [['熱量', a.t.kcal, a.g.kcal, 'kcal'], ['蛋白質', a.t.protein, a.g.protein, 'g'], ['碳水', a.t.carbs, a.g.carbs, 'g'], ['脂肪', a.t.fat, a.g.fat, 'g'], ['纖維', a.t.fiber, a.g.fiber, 'g']];
    return `<section class="card"><div class="card-header"><div><h2 class="card-title">${a.title}</h2><p class="card-subtitle">依實際紀錄計算，不是依推薦菜單</p></div><span class="tag estimate">規則分析</span></div><div class="summary-grid">${rows.map(([l, v, goal, u]) => `<div><small>${l}</small><strong>${fmt(v)}<small> / ${fmt(goal)} ${u}</small></strong></div>`).join('')}</div><p class="small-muted analysis-text">${escapeHTML(a.text)}</p></section>`;
  }
  function actualMini(s) {
    const rows = s.logs.slice(0, 4).map(l => `<div><span>${escapeHTML(l.name)}</span><small>${escapeHTML(logDetail(l).split(' · ').slice(0, 2).join(' · '))}</small></div>`);
    if (s.day.cardioDone) rows.push('<div><span>坡度走（計畫）</span><small>40 分鐘</small></div>');
    if (s.planLogged) rows.push(`<div><span>AI 計畫動作</span><small>${s.planLogged}/${s.planIds.length} 個 · ${fmt(s.planSets)} 組</small></div>`);
    if (s.logs.length > 4) rows.push(`<div><span>還有 ${s.logs.length - 4} 筆</span><small>到訓練頁查看</small></div>`);
    return rows.length ? `<div class="actual-mini">${rows.join('')}</div>` : '<div class="empty-state" style="padding:14px 10px">還沒有實際運動紀錄</div>';
  }
  function quickSuggestCard() {
    const rows = [['breakfast', `${BREAKFASTS.length} 個方案`, `${BREAKFASTS[0].name}：${BREAKFASTS[0].items.map(([id, q]) => { const f = getFood(id); return `${shortName(f)} ${friendlyAmount(f, q)}`; }).join('、')}`, 'food-breakfast-templates']];
    ['lunch', 'dinner'].forEach(meal => { const { list } = suggestionCandidates(meal), top = list[0]; rows.push([meal, `${Math.min(5, list.length)} 個方案`, top ? `首選：${top.name} · 約 ${fmt(top.nutrition.kcal)} kcal · 蛋白質 ${fmt(top.nutrition.protein)} g` : '', `suggest-${meal}`]); });
    return `<section class="card"><div class="card-header"><div><h2 class="card-title">快速提案</h2><p class="card-subtitle">不知道吃什麼時，依今天剩餘營養挑一個方向</p></div><button class="text-link" data-route="food" data-scroll="suggest-lunch">全部方案 ↗</button></div>${rows.map(([meal, count, text, target]) => `<div class="quick-row"><span class="meal-symbol">${MEAL_ICONS[meal]}</span><div class="meal-info"><strong>${MEAL_NAMES[meal]} · ${count}</strong><small>${escapeHTML(text)}</small></div><button class="secondary-button" data-route="food" data-scroll="${target}">查看</button></div>`).join('')}</section>`;
  }
  function weeklyActivityCard() {
    const days = Array.from({ length: 7 }, (_, i) => shiftDate(selectedDate, -i)).map(date => ({ date, s: activitySummary(date) }));
    const active = days.filter(x => x.s.status === 'COMPLETED' || x.s.status === 'MODIFIED').length;
    const cardio = days.reduce((sum, x) => sum + x.s.cardio, 0), strengthDays = days.filter(x => x.s.strengthSets > 0 || x.s.planDone).length;
    const history = Array.from({ length: 14 }, (_, i) => shiftDate(selectedDate, -i)).map(date => ({ date, s: activitySummary(date) })).filter(x => x.s.status === 'COMPLETED' || x.s.status === 'MODIFIED');
    return `<section class="card"><div class="card-header"><div><h2 class="card-title">近 7 天實際活動</h2><p class="card-subtitle">依實際紀錄統計，包含沒照計畫的運動</p></div></div><div class="metric-grid"><div class="metric-card"><small>有運動的天數</small><strong>${active}<small> 天</small></strong></div><div class="metric-card"><small>有氧總時間</small><strong>${fmt(cardio)}<small> min</small></strong></div><div class="metric-card"><small>重訓天數</small><strong>${strengthDays}<small> 天</small></strong></div></div>${history.length ? `<div style="margin-top:10px">${history.map(x => `<div class="history-row"><strong>${escapeHTML(describeActivity(x.s) || (x.s.planDone ? x.s.plan.name : '運動'))}</strong><small>${escapeHTML(dateLabel(x.date))} · ${x.s.status === 'COMPLETED' ? '完成計畫' : '有調整'}</small></div>`).join('')}</div>` : '<div class="empty-state" style="margin-top:10px">近 14 天還沒有運動紀錄</div>'}</section>`;
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
    template.items.forEach(([id, amount]) => { const food = FOODS.find(x => x.id === id); logToMeal('breakfast', loggedItem(food, amount, null, { origin: 'AI_RECOMMENDED' })); });
    toast(`${template.name}已加入早餐紀錄`); render();
  }
  function serializeForm(form) { return Object.fromEntries(new FormData(form).entries()); }
  function showHelp() {
    modal('快速使用說明', `<div class="stack"><p class="small-muted" style="line-height:1.9;margin:0">① 在「飲食」按「＋ 自訂食物」，輸入像「香蕉 1 根」「白飯 150 g」，系統會估算營養；加入後可隨時編輯份量或刪除。午餐、晚餐快速提案會依今天剩餘營養推薦，可「換一個」。<br>② 在「訓練」可照 AI 計畫記重量和次數，也可以用「＋ 新增今日運動」記錄實際做的運動（有氧、重訓、球類…），沒照計畫也沒關係。<br>③ 到「進度」記晨間體重與腰圍。趨勢至少需要兩週資料才會給熱量調整提示。<br>④ 「設定」可調整目標並匯出 JSON 備份。所有資料只存在目前瀏覽器。</p><div class="note-box">目前的教練回饋與營養估算來自程式內建的規則和常見食物參考值（離線運作），尚未連接外部 AI、台灣食品資料庫或即時餐廳菜單；資料庫沒有的食物需要自行輸入營養數值。營養值會明確標示 ESTIMATE 或 FACT。</div><p class="small-muted">手機使用：用手機瀏覽器開啟同一個網址，再使用「加入主畫面」。若透過區網預覽，需讓手機與提供網頁的電腦連上同一個 Wi-Fi。</p></div>`);
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
    if (routeButton) { route = routeButton.dataset.route; closeModal(); render(); const target = routeButton.dataset.scroll; if (target) setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40); else window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const button = event.target.closest('[data-action]'); if (!button) return;
    const action = button.dataset.action;
    if (action === 'close-modal' || (action === 'overlay-close' && event.target === button)) { closeModal(); return; }
    if (action === 'help') { showHelp(); return; }
    if (action === 'water') { getDay().water += number(button.dataset.amount); renderAfterData(`已加 ${button.dataset.amount} ml 飲水`); return; }
    if (action === 'pick-food') { openFoodPicker(button.dataset.meal); return; }
    if (action === 'select-food') { const food = getFood(button.dataset.food); if (food) { const measured = food.unit === 'g' || food.unit === 'ml'; openSmartAdd({ meal: button.dataset.meal || defaultMeal(), name: food.name, qty: measured ? 100 : food.qty, unit: food.unit, origin: 'DATABASE' }); setTimeout(() => $('#sf-qty')?.select(), 60); } return; }
    if (action === 'smart-add') { openSmartAdd({ meal: button.dataset.meal || defaultMeal() }); return; }
    if (action === 'edit-food') { openEditFood(button.dataset.meal, button.dataset.entry); return; }
    if (action === 'jump') { document.getElementById(button.dataset.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    if (action === 'add-suggest-item') { const entry = addFoodById(button.dataset.meal, button.dataset.food, number(button.dataset.amount)); if (entry) renderAfterData(`已加入${MEAL_NAMES[button.dataset.meal]}：${entry.name}`); return; }
    if (action === 'add-suggestion') { const meal = button.dataset.meal, cand = suggestionCandidates(meal).list[number(button.dataset.index)]; if (!cand) return; cand.items.forEach(([id, amount]) => addFoodById(meal, id, amount)); renderAfterData(`「${cand.name}」已加入${MEAL_NAMES[meal]}，可再依實際份量編輯`); return; }
    if (action === 'swap-suggestion') { const meal = button.dataset.meal, { list } = suggestionCandidates(meal), st = slotState(meal, list.length), slot = number(button.dataset.slot); if (list.length <= st.slots.length) { toast('目前沒有其他方案了'); return; } let next = st.next % list.length; for (let i = 0; st.slots.includes(next) && i < list.length; i++) next = (next + 1) % list.length; st.slots[slot] = next; st.next = next + 1; render(); return; }
    if (action === 'more-suggestions') { const meal = button.dataset.meal, { list } = suggestionCandidates(meal), st = slotState(meal, list.length); st.size = 5; slotState(meal, list.length); render(); return; }
    if (action === 'add-workout') { openWorkoutForm(); return; }
    if (action === 'edit-workout') { openWorkoutForm(button.dataset.id); return; }
    if (action === 'remove-workout') { const day = getDay(); day.workoutLogs = day.workoutLogs.filter(l => l.id !== button.dataset.id); closeModal(); renderAfterData('已刪除這筆運動紀錄'); return; }
    if (action === 'custom-food') { openCustomFood(button.dataset.meal || 'breakfast'); return; }
    if (action === 'back-picker') { openFoodPicker(button.dataset.meal); return; }
    if (action === 'remove-food') { const day = getDay(); day.meals[button.dataset.meal] = day.meals[button.dataset.meal].filter(item => item.id !== button.dataset.entry); closeModal(); renderAfterData('已移除這項飲食紀錄'); return; }
    if (action === 'add-template') { addTemplate(number(button.dataset.template)); return; }
    if (action === 'restaurant-form') { openRestaurantForm(); return; }
    if (action === 'log-restaurant') { const item = data.restaurants.find(x => x.id === button.dataset.id); if (!item) return; const id = button.closest('.restaurant-recommendation').querySelector('.meal-select')?.value || 'lunch'; getDay().meals[id].push({ id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), foodId: item.id, name: `${item.restaurant}・${item.name}`, amount: 1, unit: '份', source: item.source, origin: 'DATABASE', confidence: item.source === 'fact' ? 'HIGH' : 'ESTIMATED', createdAt: new Date().toISOString(), ...item.values }); renderAfterData(`已記錄到${MEAL_NAMES[id]}`); return; }
    if (action === 'log-dinner-plan') { const suggestion = dinnerPlan(totals(), goals()); if (!suggestion) { toast('今日剩餘目標較少，暫不產生晚餐份量'); return; } suggestion.items.forEach(([id, amount]) => { const food = FOODS.find(f => f.id === id); getDay().meals.dinner.push(loggedItem(food, amount, null, { origin: 'AI_RECOMMENDED' })); }); renderAfterData('估算晚餐已加入紀錄，可依實際食用內容修改'); return; }
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
    const form = event.target.form;
    if (form?.id === 'smart-food-form') { if (event.target.name === 'manual') { delete event.target.dataset.auto; if (event.target.checked) fillManualFromEstimate(form); } updateSmartPreview(form); return; }
    if (form?.id === 'edit-food-form') { updateEditPreview(form); return; }
    if (form?.id === 'workout-log-form' && event.target.name === 'type') { event.target.dataset.touched = '1'; toggleWorkoutFields(form); return; }
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
      const logged = loggedItem(item, number(values.amount), item.source, { origin: 'USER_ADDED' }); if (!values.saveFood) logged.foodId = null; logged.basis = { amount: logged.amount, unit: logged.unit, kcal: logged.kcal, protein: logged.protein, carbs: logged.carbs, fat: logged.fat, fiber: logged.fiber }; if (values.saveFood) data.customFoods.push(item); getDay().meals[form.dataset.meal].push(logged); closeModal(); route = 'food'; renderAfterData('已加入飲食紀錄'); return;
    }
    if (form.id === 'smart-food-form') {
      const name = String(values.name || '').trim(), qty = number(values.qty), unit = normUnit(values.unit), meal = MEAL_NAMES[values.meal] ? values.meal : defaultMeal(), origin = form.dataset.origin || 'USER_ADDED';
      if (!name || !(qty > 0)) { toast('請輸入食物名稱和數量'); return; }
      let entry;
      if (values.manual) {
        if (values.kcal === '' || values.kcal == null) { toast('請至少輸入熱量（kcal）'); return; }
        const nutrition = { kcal: number(values.kcal), protein: number(values.protein), carbs: number(values.carbs), fat: number(values.fat), fiber: number(values.fiber) }, source = values.fact ? 'fact' : 'estimate';
        let food = null;
        if (values.saveFood) { food = { id: `custom-${newId()}`, name, unit, qty, source, ...nutrition }; data.customFoods.push(food); }
        entry = foodEntry({ food, name, amount: qty, unit, nutrition, source, origin, confidence: 'ESTIMATED' });
      } else {
        const est = estimateFood(name, qty, unit);
        if (!est.food) { toast('找不到參考資料，請勾選「自己輸入營養數值」'); return; }
        if (!est.base) { toast(`「${est.food.name}」無法用「${unit}」換算，請改用其他單位`); return; }
        entry = foodEntry({ food: est.food, name, amount: qty, unit, nutrition: est.nutrition, source: est.confidence === 'HIGH' ? 'fact' : 'estimate', origin, confidence: est.confidence });
      }
      getDay().meals[meal].push(entry); closeModal(); renderAfterData(`已加入${MEAL_NAMES[meal]}：${name}`); return;
    }
    if (form.id === 'edit-food-form') {
      const day = getDay(), fromMeal = form.dataset.meal, list = day.meals[fromMeal] || [], item = list.find(x => x.id === form.dataset.entry);
      if (!item) { closeModal(); return; }
      const qty = number(values.qty), unit = normUnit(values.unit), result = recalcEntry(item, qty, unit);
      if (!(qty > 0) || !result) { toast('無法用這個單位換算，請改用原本的單位'); return; }
      item.basis ||= { amount: item.amount, unit: item.unit, kcal: item.kcal, protein: item.protein, carbs: item.carbs, fat: item.fat, fiber: item.fiber };
      Object.assign(item, result.nutrition, { amount: round(qty, 2), unit, confidence: result.confidence, updatedAt: new Date().toISOString() });
      const toMeal = MEAL_NAMES[values.meal] ? values.meal : fromMeal;
      if (toMeal !== fromMeal) { day.meals[fromMeal] = list.filter(x => x !== item); day.meals[toMeal].push(item); }
      closeModal(); renderAfterData('份量已更新，今日營養已重新計算'); return;
    }
    if (form.id === 'workout-log-form') {
      const name = String(values.name || '').trim(), type = WORKOUT_TYPES.some(([v]) => v === values.type) ? values.type : 'other';
      if (!name) { toast('請輸入運動名稱'); return; }
      const shown = key => form.elements[key]?.closest('[data-types]')?.hidden === false;
      const num = key => (!shown(key) || values[key] === '' || values[key] == null) ? null : number(values[key]);
      const reps = shown('reps') ? String(values.reps || '').trim() : '';
      if (reps && reps.split(/[\/,\s]+/).filter(Boolean).some(x => !Number.isFinite(Number(x)))) { toast('每組次數請輸入數字，例如 12/12/10'); return; }
      const log = { name, type, period: values.period || '', duration: num('duration'), distance: num('distance'), speed: num('speed'), incline: num('incline'), weight: num('weight'), sets: num('sets'), reps, calories: num('calories'), notes: String(values.notes || '').trim(), source: values.replacesPlan ? 'MODIFIED' : 'USER_LOGGED' };
      if (type === 'strength' && reps.includes('/')) log.sets = reps.split('/').filter(Boolean).length;
      if (type === 'cardio' && !log.duration && !log.distance) { toast('有氧請輸入時間或距離'); return; }
      if (type === 'strength' && !log.reps && !log.sets && !log.duration) { toast('重訓請輸入組數／次數或時間'); return; }
      if (!['cardio', 'strength'].includes(type) && !log.duration) { toast('請輸入運動時間'); return; }
      const day = getDay(), now = new Date().toISOString(), existing = form.dataset.id ? day.workoutLogs.find(l => l.id === form.dataset.id) : null;
      if (existing) Object.assign(existing, log, { updatedAt: now });
      else day.workoutLogs.push({ id: newId(), date: selectedDate, ...log, createdAt: now, updatedAt: now });
      closeModal(); renderAfterData(existing ? '運動紀錄已更新' : '運動紀錄已新增'); return;
    }
    if (form.id === 'restaurant-form') {
      data.restaurants.push({ id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), restaurant: values.restaurant.trim(), name: values.name.trim(), notes: values.notes.trim(), hasVegetables: Boolean(values.hasVegetables), riceAdjust: Boolean(values.riceAdjust), sauceSeparate: Boolean(values.sauceSeparate), fried: Boolean(values.fried), source: values.fact ? 'fact' : 'estimate', values: { kcal: number(values.kcal), protein: number(values.protein), carbs: number(values.carbs), fat: number(values.fat), fiber: 0 } }); closeModal(); renderAfterData('店家餐點已存入資料庫'); return;
    }
  });
  document.addEventListener('input', event => {
    const form = event.target.form;
    if (form?.id === 'smart-food-form') {
      if (event.target.name === 'quick') {
        const parsed = parseFoodText(event.target.value);
        if (parsed) {
          form.elements.name.value = parsed.name;
          const food = matchFood(parsed.name);
          if (parsed.qty) form.elements.qty.value = parsed.qty;
          const unit = parsed.unit || (parsed.qty && food ? naturalUnit(food) : null);
          if (unit) { const sel = form.elements.unit; if (![...sel.options].some(o => o.value === unit)) sel.add(new Option(unit, unit)); sel.value = unit; }
        }
      }
      if (event.target.name === 'name' && !form.elements.qty.value) { const food = matchFood(event.target.value); if (food && normName(event.target.value) === normName(food.name) || food && (food.aliases || []).some(a => normName(a) === normName(event.target.value))) { const unit = naturalUnit(food); const sel = form.elements.unit; if (![...sel.options].some(o => o.value === unit)) sel.add(new Option(unit, unit)); sel.value = unit; form.elements.qty.value = unit === 'g' || unit === 'ml' ? 100 : 1; } }
      updateSmartPreview(form); return;
    }
    if (form?.id === 'edit-food-form') { updateEditPreview(form); return; }
    if (form?.id === 'workout-log-form' && event.target.name === 'name' && !form.elements.type.dataset.touched) { const preset = EXERCISE_PRESETS.find(p => p[0].toLowerCase() === event.target.value.trim().toLowerCase()) || (Object.values(TRAINING).some(t => t.exercises.some(e => e[1].toLowerCase() === event.target.value.trim().toLowerCase())) ? [event.target.value, 'strength'] : null); if (preset) { form.elements.type.value = preset[1]; toggleWorkoutFields(form); } return; }
    if (event.target.name === 'amount' && event.target.form?.id === 'portion-form') {
      const food = getFood(event.target.form.dataset.food), preview = $('#portion-preview'); if (food && preview) preview.innerHTML = `${macroLine(amountNutrition(food, number(event.target.value)))} · ${sourceBadge(food.source)}`;
    }
  });
  render();
})();
