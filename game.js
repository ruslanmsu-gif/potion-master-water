const GAME_VERSION = "v123";

const LEADERBOARD_DATA = {
  "all-time": [
    { rank: 1, name: "Albus Dumbledore", title: "Великий Чародей", avatar: "🧙‍♂️", house: "🦁 Gryffindor", score: "34,800", level: 150, isUser: false },
    { rank: 2, name: "Lord Voldemort", title: "Повелитель Теней", avatar: "🔮", house: "🐍 Slytherin", score: "31,400", level: 142, isUser: false },
    { rank: 3, name: "Gellert Grindelwald", title: "Мастер Алхимии", avatar: "⚡", house: "🐍 Slytherin", score: "28,900", level: 135, isUser: false },
    { rank: 4, name: "ВЫ (Гарри Поттер)", title: "Магистр Зелий", avatar: "🧙‍♂️", house: "🦁 Gryffindor", score: "24,500", level: 100, isUser: true },
    { rank: 5, name: "Minerva McGonagall", title: "Декан Факультета", avatar: "🦉", house: "🦁 Gryffindor", score: "21,200", level: 92, isUser: false },
    { rank: 6, name: "Hermione Granger", title: "Знаток Рецептов", avatar: "📚", house: "🦁 Gryffindor", score: "19,800", level: 88, isUser: false },
    { rank: 7, name: "Severus Snape", title: "Зельевар-Виртуоз", avatar: "🧪", house: "🐍 Slytherin", score: "18,100", level: 84, isUser: false },
    { rank: 8, name: "Remus Lupin", title: "Хранитель Огня", avatar: "🐺", house: "🦡 Hufflepuff", score: "15,600", level: 75, isUser: false },
    { rank: 9, name: "Sirius Black", title: "Тёмный Чародей", avatar: "🐾", house: "🦁 Gryffindor", score: "14,200", level: 71, isUser: false },
    { rank: 10, name: "Luna Lovegood", title: "Мистический Адепт", avatar: "✨", house: "🦅 Ravenclaw", score: "12,800", level: 66, isUser: false }
  ],
  "week": [
    { rank: 1, name: "Hermione Granger", title: "Знаток Рецептов", avatar: "📚", house: "🦁 Gryffindor", score: "4,850", level: 28, isUser: false },
    { rank: 2, name: "Severus Snape", title: "Зельевар-Виртуоз", avatar: "🧪", house: "🐍 Slytherin", score: "4,200", level: 24, isUser: false },
    { rank: 3, name: "ВЫ (Гарри Поттер)", title: "Магистр Зелий", avatar: "🧙‍♂️", house: "🦁 Gryffindor", score: "3,900", level: 21, isUser: true },
    { rank: 4, name: "Albus Dumbledore", title: "Великий Чародей", avatar: "🧙‍♂️", house: "🦁 Gryffindor", score: "3,500", level: 19, isUser: false },
    { rank: 5, name: "Draco Malfoy", title: "Адепт Слизерина", avatar: "🐍", house: "🐍 Slytherin", score: "3,100", level: 17, isUser: false },
    { rank: 6, name: "Ron Weasley", title: "Рыцарь Гриффиндора", avatar: "♟️", house: "🦁 Gryffindor", score: "2,800", level: 15, isUser: false },
    { rank: 7, name: "Cedric Diggory", title: "Чемпион Пуффендуя", avatar: "🏆", house: "🦡 Hufflepuff", score: "2,450", level: 13, isUser: false },
    { rank: 8, name: "Cho Chang", title: "Ловец Когтеврана", avatar: "🦅", house: "🦅 Ravenclaw", score: "2,100", level: 11, isUser: false },
    { rank: 9, name: "Neville Longbottom", title: "Мастер Травологии", avatar: "🌱", house: "🦁 Gryffindor", score: "1,850", level: 9, isUser: false },
    { rank: 10, name: "Ginny Weasley", title: "Виртуоз Зелий", avatar: "🧹", house: "🦁 Gryffindor", score: "1,500", level: 8, isUser: false }
  ],
  "today": [
    { rank: 1, name: "ВЫ (Гарри Поттер)", title: "Магистр Зелий", avatar: "🧙‍♂️", house: "🦁 Gryffindor", score: "1,250", level: 7, isUser: true },
    { rank: 2, name: "Hermione Granger", title: "Знаток Рецептов", avatar: "📚", house: "🦁 Gryffindor", score: "1,100", level: 6, isUser: false },
    { rank: 3, name: "Draco Malfoy", title: "Адепт Слизерина", avatar: "🐍", house: "🐍 Slytherin", score: "950", level: 5, isUser: false },
    { name: "AlchemistMaster", score: 14200, avatar: "🧙‍♂️" },
    { name: "PotionQueen",     score: 12850, avatar: "👩‍🔬" },
    { name: "SpellCaster",     score: 11400, avatar: "✨" },
    { name: "RuneSeeker",      score: 9950,  avatar: "📜" },
    { name: "StarDust99",      score: 8700,  avatar: "🌟" }
  ],
  "weekly": [
    { name: "PotionQueen",     score: 4150, avatar: "👩‍🔬" },
    { name: "StarDust99",      score: 3800, avatar: "🌟" },
    { name: "AlchemistMaster", score: 3620, avatar: "🧙‍♂️" }
  ],
  "friends": [
    { name: "AlchemistMaster", score: 14200, avatar: "🧙‍♂️" },
    { name: "YourFriendAlex",  score: 6400,  avatar: "🧑‍🌾" }
  ]
};

const PALETTE = [
  { id: 0, name: "Ruby Red",      hex: 0xff1744, inner: 0xc50024, glow: 0xff8a80, sparkles: 0xffd54f },
  { id: 1, name: "Emerald Green", hex: 0x00e676, inner: 0x009e3b, glow: 0xb9f6ca, sparkles: 0x69f0ae },
  { id: 2, name: "Sapphire Blue", hex: 0x2979ff, inner: 0x1554c0, glow: 0x82b1ff, sparkles: 0xe0f7fa },
  { id: 3, name: "Amber Gold",    hex: 0xffc400, inner: 0xd97706, glow: 0xffe57f, sparkles: 0xffffff },
  { id: 4, name: "Amethyst",      hex: 0xd500f9, inner: 0x8800cc, glow: 0xea80fc, sparkles: 0xff80ab },
  { id: 5, name: "Cyan Teal",     hex: 0x00e5ff, inner: 0x0088cc, glow: 0x84ffff, sparkles: 0xffffff },
  { id: 6, name: "Orange Magma",  hex: 0xff6d00, inner: 0xbb2200, glow: 0xffab40, sparkles: 0xffeb3b },
  { id: 7, name: "Rose Pink",     hex: 0xff4081, inner: 0xa80045, glow: 0xff80ab, sparkles: 0xffd1dc },
  { id: 8, name: "Obsidian Violet", hex: 0x7c4dff, inner: 0x536dfe, glow: 0xb388ff, sparkles: 0xe040fb },
  { id: 9, name: "Lunar Pearl",     hex: 0xdcd0c0, inner: 0xa89880, glow: 0xf0e8dd, sparkles: 0xffffff },
  { id: 10, name: "Verdant Lime",   hex: 0x76ff03, inner: 0x4caf00, glow: 0xccff90, sparkles: 0xeeff41 }
];

const MYSTERY_COLOR = {
  id: -1,
  name: "Mystery Segment",
  hex: 0x2b313d,
  inner: 0x1d222b,
  glow: 0x485465,
  sparkles: 0x8a9bb0
};

const FLASK_CAP = 4;

class GameEngine {
  constructor() {
    this.container = document.getElementById("canvas-container");
    this.currentLevel = 1;
    this.completedLevelsCount = 0;
    this.activeTab = "map"; // "stats" | "map" | "collection"
    this.flasks = [];
    this.selectedFlask = null;
    this.isBusy = false;
    this.undoStack = [];

    this.initPixi();
    this.initMainScreen();
    this.bindUI();
  }

  initPixi() {
    const w = this.container.clientWidth || 400;
    const h = this.container.clientHeight || 700;

    this.app = new PIXI.Application({
      width: w,
      height: h,
      backgroundAlpha: 0,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      antialias: true
    });

    this.container.appendChild(this.app.view);

    this.stage = this.app.stage;
    this.stage.eventMode = 'static';
    this.stage.hitArea = this.app.screen;

    this.flasksLayer = new PIXI.Container();
    this.streamLayer = new PIXI.Graphics();
    this.splashLayer = new PIXI.Graphics();

    this.stage.addChild(this.flasksLayer);
    this.stage.addChild(this.streamLayer);
    this.stage.addChild(this.splashLayer);

    window.addEventListener("resize", () => this.onResize());

    this.time = 0;
    this.app.ticker.add((delta) => this.update(delta));

    this.loadLevel(this.currentLevel);
  }

  onResize() {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this.app.renderer.resize(w, h);
    this.positionFlasks();
  }

  loadLevel(levelNum) {
    this.currentLevel = levelNum;
    this.selectedFlask = null;
    this.isBusy = false;
    this.undoStack = [];

    const levelTitle = document.getElementById("level-title");
    if (levelTitle) {
      levelTitle.textContent = `LEVEL ${levelNum}`;
    }

    const preset = (typeof PRESET_LEVELS !== 'undefined' && levelNum <= PRESET_LEVELS.length) ? PRESET_LEVELS[levelNum - 1] : null;
    this.currentRecipe = (preset && preset.isRecipeLevel) ? preset.recipe : null;

    const levelSub = document.getElementById("level-sub");
    if (levelSub) {
      levelSub.textContent = `Novice Alchemist (${GAME_VERSION})`;
    }

    // Hide top action buttons (Restart, Undo, Add Flask) ONLY on Level 1
    const topActions = document.getElementById("game-top-actions");
    if (topActions) {
      if (levelNum === 1) {
        topActions.classList.add("hidden");
      } else {
        topActions.classList.remove("hidden");
      }
    }

    // Mystery level check for hidden ? layers
    const isMysteryLevel = preset && (preset.isMysteryLevel || preset.hasHiddenLayers);

    // Glowing Info Button & Mechanic Instructions Modal ONLY on levels where a NEW mechanic is first introduced (Level 5, Level 6)
    const btnInfo = document.getElementById("btn-level-info");
    const isFirstMechanicIntro = (levelNum === 5 || levelNum === 6 || (preset && preset.isFirstMechanicIntro));

    if (isFirstMechanicIntro) {
      if (btnInfo) btnInfo.classList.remove("hidden");

      const titleElem = document.getElementById("mechanic-intro-title");
      if (titleElem && preset.introTitle) {
        titleElem.textContent = preset.introTitle;
      } else if (titleElem && preset.isRecipeLevel) {
        titleElem.textContent = "РИТУАЛ АЛХИМИИ";
      }

      const stepsContainer = document.querySelector(".intro-steps-list");
      if (stepsContainer && preset.introSteps) {
        stepsContainer.innerHTML = preset.introSteps.map((step, idx) => `
          <div class="intro-step">
            <span class="step-num">${idx + 1}</span>
            <span>${step}</span>
          </div>
        `).join("");
      } else if (stepsContainer && preset.isRecipeLevel) {
        const target = preset.recipe ? (preset.recipe.targetCount || 6) : 6;
        stepsContainer.innerHTML = `
          <div class="intro-step"><span class="step-num">1</span><span>Отсортируйте все <b>${target} цветов</b> по колбам.</span></div>
          <div class="intro-step"><span class="step-num">2</span><span>После сборки цветов <b>Главная Колба</b> разблокируется.</span></div>
          <div class="intro-step"><span class="step-num">3</span><span>Перелейте эссенции в Главную Колбу для синтеза зелья!</span></div>
        `;
      }

      this.openModal("mechanic-intro-modal");
    } else {
      if (btnInfo) btnInfo.classList.add("hidden");
      this.closeModal("mechanic-intro-modal");
    }

    this.flasksLayer.removeChildren();
    this.flasks = [];

    const levelData = this.generateLevelData(levelNum);
    for (let i = 0; i < levelData.length; i++) {
      const flask = new FlaskView(this, i, levelData[i]);
      if (this.currentRecipe && i === 0) {
        flask.isMasterVessel = true;
        flask.maxCapacity = this.currentRecipe.targetCount || 6;
      }
      if (isMysteryLevel && flask.layers.length > 0 && !flask.isMasterVessel) {
        flask.hiddenCount = Math.max(0, flask.layers.length - 1);
      } else {
        flask.hiddenCount = 0;
      }
      this.flasks.push(flask);
      this.flasksLayer.addChild(flask.container);
    }

    this.positionFlasks();
  }

  generateLevelData(level) {
    const COLOR_KEY_TO_ID = {
      ruby: 0,
      emerald: 1,
      sapphire: 2,
      amber: 3,
      amethyst: 4,
      gold: 5,
      cyan: 6,
      rose: 7,
      violet: 8,
      pearl: 9,
      lime: 10
    };

    if (typeof PRESET_LEVELS !== 'undefined' && level <= PRESET_LEVELS.length) {
      const preset = PRESET_LEVELS[level - 1];
      if (preset && preset.flasks) {
        return preset.flasks.map(flask =>
          flask.map(colorKey => (typeof colorKey === 'string' ? COLOR_KEY_TO_ID[colorKey] ?? 0 : colorKey))
        );
      }
    }

    // Procedural generation for level > PRESET_LEVELS.length (guaranteed solvable & NO pre-solved flasks)
    const colorCount = Math.min(3 + Math.floor(level / 3), 7);
    return this.generateSolvable(colorCount, 2);
  }

  generateSolvable(colorCount, emptyCount) {
    let flasks = [];
    let attempts = 0;

    while (attempts < 50) {
      attempts++;
      flasks = [];
      for (let c = 0; c < colorCount; c++) flasks.push([c, c, c, c]);
      for (let e = 0; e < emptyCount; e++) flasks.push([]);

      // Generous number of un-shuffling steps to properly disperse liquids
      const steps = Math.max(50, colorCount * 25);
      for (let s = 0; s < steps; s++) {
        const from = Math.floor(Math.random() * flasks.length);
        const to = Math.floor(Math.random() * flasks.length);
        if (from === to || flasks[from].length === 0 || flasks[to].length >= FLASK_CAP) continue;
        flasks[to].push(flasks[from].pop());
      }

      // Check rule: NO full monochromatic flask (no pre-solved flasks at start)
      const hasSolvedFlask = flasks.some(f => f.length === FLASK_CAP && f.every(c => c === f[0]));
      // Check rule: all colored liquids are mixed
      const emptyFlasksCount = flasks.filter(f => f.length === 0).length;
      if (!hasSolvedFlask && emptyFlasksCount >= 1) {
        return flasks;
      }
    }

    return flasks;
  }

  positionFlasks() {
    const w = this.app.screen.width;
    const h = this.app.screen.height;
    const total = this.flasks.length;

    // --- Standard Flask Dimensions (Unified across ALL levels) ---
    const MAX_COLS = 6;
    const GAP = 22;      // visible gap between flasks
    const RATIO = 3.4;   // height = width * RATIO
    const SIDE_PAD = 24; // total horizontal padding

    const flaskWidth = Math.min(42, Math.floor((w - SIDE_PAD - (MAX_COLS - 1) * GAP) / MAX_COLS));
    const flaskHeight = Math.round(flaskWidth * RATIO);

    if (this.currentRecipe) {
      // 🏰 Recipe Boss Level 5 Layout: Standard side flasks (42x143) & Lengthened Central Master Vessel
      const hasBoosters = total > 9;
      const numRows = hasBoosters ? 3 : 2;

      const sideW = flaskWidth;   // Exactly 42px - SAME as Levels 1-4!
      const sideH = flaskHeight;  // Exactly 143px - SAME as Levels 1-4!

      const ROW_GAP = 26; // Equal vertical gap between ALL rows
      const gapX = sideW + GAP; // Exactly matching standard GAP (22px) between flasks
      const gapY = sideH + ROW_GAP;

      // Master Vessel height equals 2 rows of standard flasks + gap
      const masterH = Math.round(2 * sideH + ROW_GAP); // ~312px high!
      const masterW = Math.round(masterH / 3.4);   // ~92px wide!

      const totalGridH = numRows * sideH + (numRows - 1) * ROW_GAP;
      const gridTopY = hasBoosters
        ? Math.round((h - totalGridH) / 2) + 20
        : Math.max(52, Math.round((h - totalGridH) / 2) - 10);

      const masterY = gridTopY + Math.round((2 * sideH + ROW_GAP - masterH) / 2);

      // Position Master Crucible (Flask 0) in center
      this.flasks[0].setSize(masterW, masterH);
      this.flasks[0].setBasePosition(w / 2, masterY);

      if (total >= 9) {
        const leftCenterX = Math.round((w / 2 - masterW / 2) / 2);
        const rightCenterX = Math.round(w - leftCenterX);

        // Left Side Flasks: Flasks 1, 2 (top), Flasks 3, 4 (bot)
        const leftCoords = [
          { x: leftCenterX - gapX / 2, y: gridTopY },
          { x: leftCenterX + gapX / 2, y: gridTopY },
          { x: leftCenterX - gapX / 2, y: gridTopY + gapY },
          { x: leftCenterX + gapX / 2, y: gridTopY + gapY }
        ];

        // Right Side Flasks: Flasks 5, 6 (top), Flasks 7, 8 (bot)
        const rightCoords = [
          { x: rightCenterX - gapX / 2, y: gridTopY },
          { x: rightCenterX + gapX / 2, y: gridTopY },
          { x: rightCenterX - gapX / 2, y: gridTopY + gapY },
          { x: rightCenterX + gapX / 2, y: gridTopY + gapY }
        ];

        for (let i = 1; i <= 4 && i < total; i++) {
          const flask = this.flasks[i];
          const capFrac = Math.min(1, flask.maxCapacity / FLASK_CAP);
          const curH = Math.round((sideH - 26) * capFrac + 26);
          const curY = leftCoords[i - 1].y + (sideH - curH);
          flask.setSize(sideW, curH);
          flask.setBasePosition(leftCoords[i - 1].x, curY);
        }
        for (let i = 5; i <= 8 && i < total; i++) {
          const flask = this.flasks[i];
          const capFrac = Math.min(1, flask.maxCapacity / FLASK_CAP);
          const curH = Math.round((sideH - 26) * capFrac + 26);
          const curY = rightCoords[i - 5].y + (sideH - curH);
          flask.setSize(sideW, curH);
          flask.setBasePosition(rightCoords[i - 5].x, curY);
        }

        // Extra Booster / Bottom Flasks (i >= 9): position in 3rd row below grid, centered & completely visible!
        if (total > 9) {
          const extraCount = total - 9;
          const maxAvailableW = w - 24;
          const desiredSpacingX = sideW + GAP; // Exactly matching standard GAP (22px) between flasks
          const extraSpacingX = extraCount > 1
            ? Math.min(desiredSpacingX, Math.floor(maxAvailableW / (extraCount - 1)))
            : desiredSpacingX;
          const extraStartX = Math.round((w - (extraCount - 1) * extraSpacingX) / 2);
          const row3Y = gridTopY + 2 * gapY;
          for (let i = 9; i < total; i++) {
            const flask = this.flasks[i];
            const capFrac = Math.min(1, flask.maxCapacity / FLASK_CAP);
            const curH = Math.round((sideH - 26) * capFrac + 26);
            const curY = row3Y + (sideH - curH);
            flask.setSize(sideW, curH);
            flask.setBasePosition(extraStartX + (i - 9) * extraSpacingX, curY);
          }
        }
      } else {
        const sideCount = total - 1;
        const sideW = flaskWidth;
        const sideH = flaskHeight;
        const spacingX = sideW + 10;
        const sideStartX = (w - (sideCount - 1) * spacingX) / 2;
        const sideY = gridTopY + masterH + 26;

        for (let i = 1; i < total; i++) {
          const flask = this.flasks[i];
          const capFrac = Math.min(1, flask.maxCapacity / FLASK_CAP);
          const curH = Math.round((sideH - 26) * capFrac + 26);
          const targetX = sideStartX + (i - 1) * spacingX;
          const curY = sideY + (sideH - curH);
          flask.setSize(sideW, curH);
          flask.setBasePosition(targetX, curY);
        }
      }
      return;
    }

    // --- Normal levels: always max 6 per row, guaranteed to fit any screen ---
    const spacingX = flaskWidth + GAP;

    // Grid layout
    const rows = Math.ceil(total / MAX_COLS);
    const spacingY = flaskHeight + 36;

    // Vertical centering
    const totalGridH = rows * flaskHeight + (rows - 1) * 36;
    const startY = Math.max(65, Math.round((h - totalGridH) / 2) + 10);

    for (let i = 0; i < total; i++) {
      let row, col, rowCount;
      if (rows === 2) {
        const row0Count = Math.ceil(total / 2);
        const row1Count = total - row0Count;
        if (i < row0Count) {
          row = 0;
          col = i;
          rowCount = row0Count;
        } else {
          row = 1;
          col = i - row0Count;
          rowCount = row1Count;
        }
      } else {
        row = Math.floor(i / MAX_COLS);
        col = i % MAX_COLS;
        rowCount = (row === rows - 1) ? (total - row * MAX_COLS) : MAX_COLS;
      }

      const rowStartX = Math.round((w - (rowCount - 1) * spacingX) / 2);

      const targetX = rowStartX + col * spacingX;
      const targetY = startY + row * spacingY;
      const flask = this.flasks[i];
      const capFraction = Math.min(1, flask.maxCapacity / FLASK_CAP);
      const curH = Math.round((flaskHeight - 26) * capFraction + 26);
      const curY = targetY + (flaskHeight - curH);

      flask.setSize(flaskWidth, curH);
      flask.setBasePosition(targetX, curY);
    }

    this.updateTutorialOverlay();
  }

  updateTutorialOverlay() {
    const overlay = document.getElementById("tutorial-overlay");
    const banner = document.getElementById("tutorial-banner");
    const target = document.getElementById("tutorial-target");
    const finger = document.getElementById("tutorial-finger");
    const glow = document.getElementById("tutorial-glow");
    const staticCard = document.getElementById("level-hint-card");
    const staticText = document.getElementById("level-hint-text");

    const preset = (typeof PRESET_LEVELS !== 'undefined' && this.currentLevel <= PRESET_LEVELS.length)
      ? PRESET_LEVELS[this.currentLevel - 1]
      : null;

    // Static hint frame under flasks (e.g. Level 2 with showGuide: false)
    if (preset && preset.showGuide === false) {
      if (overlay) overlay.classList.add("hidden");
      this.flasks.forEach(f => { f.isTutorialPulse = false; });

      if (preset.hintText && staticCard && staticText) {
        staticText.textContent = preset.hintText;
        staticCard.classList.remove("hidden");
      } else if (staticCard) {
        staticCard.classList.add("hidden");
      }
      return;
    }

    if (staticCard) staticCard.classList.add("hidden");

    if (!overlay || !banner || !target || !finger) return;

    if (!preset || !preset.hintText || this.isBusy) {
      overlay.classList.add("hidden");
      this.flasks.forEach(f => { f.isTutorialPulse = false; });
      return;
    }

    let targetFlask = null;
    if (!this.selectedFlask) {
      targetFlask = this.flasks[0];
    } else {
      targetFlask = (this.selectedFlask.index === 0 && this.flasks.length > 1) ? this.flasks[1] : null;
    }

    this.flasks.forEach(f => {
      f.isTutorialPulse = (f === targetFlask);
    });

    if (!targetFlask) {
      overlay.classList.add("hidden");
      return;
    }

    overlay.classList.remove("hidden");
    banner.textContent = preset.hintText;

    if (preset.hintPosition === 'bottom') {
      banner.classList.add("hint-bottom");
    } else {
      banner.classList.remove("hint-bottom");
    }

    const x = targetFlask.baseX;
    const centerY = targetFlask.baseY + targetFlask.height / 2;
    const bottomY = targetFlask.baseY + targetFlask.height + 40;

    if (glow) {
      glow.style.left = `${x}px`;
      glow.style.top = `${centerY}px`;
      glow.style.width = `${targetFlask.width * 2.2}px`;
      glow.style.height = `${targetFlask.height * 1.35}px`;
    }

    target.style.left = `${x}px`;
    target.style.top = `${bottomY}px`;
  }

  isRitualUnlocked() {
    if (!this.currentRecipe) return false;
    const masterCount = this.flasks[0] ? this.flasks[0].layers.length : 0;
    const fullSideCount = this.flasks.filter(f => !f.isMasterVessel && f.isCompletedFull()).length;
    return (masterCount + fullSideCount) >= (this.currentRecipe.targetCount || 6);
  }

  onFlaskClicked(flask) {
    if (window.soundEngine) window.soundEngine.init();
    if (this.isBusy || flask.isCapped) return;

    if (flask.isMasterVessel && !this.selectedFlask) {
      if (!this.isRitualUnlocked()) {
        const masterCount = this.flasks[0] ? this.flasks[0].layers.length : 0;
        const fullSideCount = this.flasks.filter(f => !f.isMasterVessel && f.isCompletedFull()).length;
        const totalCompleted = masterCount + fullSideCount;
        const target = this.currentRecipe ? (this.currentRecipe.targetCount || 6) : 6;
        const recipeBanner = document.getElementById("recipe-banner");
        if (recipeBanner) {
          recipeBanner.innerHTML = `🔒 <b>РИТУАЛ ЗАБЛОКИРОВАН:</b> Отсортируйте ${target} цветов! (${totalCompleted}/${target})`;
        }
      }
    }

    if (!this.selectedFlask) {
      if (flask.layers.length > 0 && !flask.isMasterVessel) {
        this.selectedFlask = flask;
        flask.setSelected(true);
      }
    } else if (this.selectedFlask === flask) {
      flask.setSelected(false);
      this.selectedFlask = null;
    } else {
      if (this.selectedFlask.canPourInto(flask)) {
        const from = this.selectedFlask;
        const to = flask;
        this.selectedFlask = null;
        from.setSelected(false);
        this.executePour(from, to);
      } else {
        this.selectedFlask.setSelected(false);
        if (flask.layers.length > 0 && !flask.isMasterVessel) {
          this.selectedFlask = flask;
          flask.setSelected(true);
        } else {
          this.selectedFlask = null;
        }
      }
    }

    this.updateTutorialOverlay();
  }

  async executePour(from, to) {
    this.isBusy = true;
    this.updateTutorialOverlay();

    const amount = from.getAmountToPour(to);
    const colorId = from.topColor();

    this.undoStack.push({
      fromIndex: from.index,
      toIndex: to.index,
      amount: amount,
      colorId: colorId,
      fromLayersBackup: [...from.layers],
      toLayersBackup: [...to.layers],
      fromHiddenBackup: from.hiddenCount,
      toHiddenBackup: to.hiddenCount
    });

    if (to.isMasterVessel) {
      await from.pourInto(to, 1, colorId, this.streamLayer, this.splashLayer);
      from.layers = []; // Complete monochromatic side flask transfers its essence and empties
      from.drawLiquids();
    } else {
      await from.pourInto(to, amount, colorId, this.streamLayer, this.splashLayer);
    }

    // If target flask reaches full capacity with all identical colors, unveil any remaining mystery layers
    if (!to.isMasterVessel && to.layers.length === to.maxCapacity) {
      const first = to.layers[0];
      if (to.layers.every(c => c === first)) {
        if (to.hiddenCount > 0) {
          to.hiddenCount = 0;
          to.drawLiquids();
          if (window.soundEngine && typeof window.soundEngine.playChime === 'function') {
            window.soundEngine.playChime();
          }
        }
      }
    }

    // If target is master vessel and reached target capacity: synthesize potion!
    if (to.isMasterVessel && to.layers.length >= to.maxCapacity && !to.isCapped) {
      await to.synthesizePotion();
    } else if (to.isCompletedFull() && !to.isCapped && !this.currentRecipe) {
      await to.capFlask();
    }

    this.isBusy = false;
    this.checkWinCondition();
  }

  async checkWinCondition() {
    let won = false;
    if (this.currentRecipe) {
      // Recipe level win condition: Master Vessel (Flask 0) is synthesized and capped!
      won = this.flasks[0].isCapped;
    } else {
      won = this.flasks.every(f => f.isSolved());
    }

    if (!won) return;

    this.isBusy = true;

    // 1. Initial short pause after last cork drop
    await new Promise(r => setTimeout(r, 220));

    // 2. Cascading wave bounce for all non-empty (solved) flasks
    const solvedFlasks = this.flasks.filter(f => f.layers.length > 0);
    for (let i = 0; i < solvedFlasks.length; i++) {
      const flask = solvedFlasks[i];
      flask.bounceTriumph(); // Trigger bounce + sparkles + chime
      await new Promise(r => setTimeout(r, 110)); // Stagger wave by 110ms
    }

    // 3. Admiration pause: allow player to view all completed, glowing flasks
    const pauseTime = this.currentRecipe ? 3500 : 950;
    await new Promise(r => setTimeout(r, pauseTime));

    // 4. Play grand victory sound & show modal
    if (window.soundEngine && typeof window.soundEngine.playLevelWin === 'function') {
      window.soundEngine.playLevelWin();
    }
    this.showWinModal();
    this.isBusy = false;
  }

  showWinModal() {
    const modal = document.getElementById("win-modal");
    const preview = document.getElementById("potion-preview");
    const nameEl = document.getElementById("potion-name");

    const solvedFlask = this.flasks.find(f => f.layers.length > 0);
    const color = solvedFlask ? PALETTE[solvedFlask.layers[0]] : PALETTE[0];

    preview.style.background = `radial-gradient(circle at 35% 35%, #${color.hex.toString(16)}, #05050a)`;
    nameEl.textContent = this.currentRecipe ? this.currentRecipe.potionName : color.name;

    modal.classList.remove("hidden");
  }

  undo() {
    if (this.isBusy || this.undoStack.length === 0) return;
    const last = this.undoStack.pop();
    const fromFlask = this.flasks[last.fromIndex];
    const toFlask = this.flasks[last.toIndex];

    if (toFlask.isCapped) {
      toFlask.uncapFlask();
    }

    if (last.fromLayersBackup && last.toLayersBackup) {
      fromFlask.layers = [...last.fromLayersBackup];
      toFlask.layers = [...last.toLayersBackup];
      if (last.fromHiddenBackup !== undefined) fromFlask.hiddenCount = last.fromHiddenBackup;
      if (last.toHiddenBackup !== undefined) toFlask.hiddenCount = last.toHiddenBackup;
    } else {
      for (let i = 0; i < last.amount; i++) {
        toFlask.layers.pop();
        fromFlask.layers.push(last.colorId);
      }
    }

    fromFlask.drawLiquids();
    toFlask.drawLiquids();
  }

  restart() {
    if (this.isBusy) return;
    this.loadLevel(this.currentLevel);
  }

  update(delta) {
    this.time += 0.05 * delta;
    for (const flask of this.flasks) {
      flask.updateVFX(this.time);
    }
  }

  renderLeaderboard(period = "all-time") {
    const listEl = document.getElementById("leaderboard-list");
    if (!listEl) return;

    const dataset = LEADERBOARD_DATA[period] || LEADERBOARD_DATA["all-time"];
    listEl.innerHTML = "";

    dataset.forEach(item => {
      const el = document.createElement("div");
      
      let rankClass = item.rank <= 3 ? `rank-${item.rank}` : "";
      let badgeClass = item.rank <= 3 ? `rank-${item.rank}` : "rank-normal";
      let userClass = item.isUser ? "is-user" : "";

      el.className = `leaderboard-item ${rankClass} ${userClass}`;

      let crownOrRank = item.rank === 1 ? "🥇" : (item.rank === 2 ? "🥈" : (item.rank === 3 ? "🥉" : `#${item.rank}`));

      el.innerHTML = `
        <div class="lb-left">
          <div class="rank-badge ${badgeClass}">${crownOrRank}</div>
          <div class="player-avatar">${item.avatar}</div>
          <div class="player-details">
            <span class="player-name">${item.name}</span>
            <span class="player-title">${item.house} • ${item.title}</span>
          </div>
        </div>
        <div class="player-score">
          <span class="score-pts">${item.score} pts</span>
          <span class="score-level">Ур. ${item.level}</span>
        </div>
      `;

      listEl.appendChild(el);

      if (item.isUser) {
        const userBadge = document.getElementById("user-badge-rank");
        const userPill = document.getElementById("user-stats-pill");
        if (userBadge) userBadge.textContent = `#${item.rank}`;
        if (userPill) userPill.textContent = `${item.score} pts`;
      }
    });
  }

  initMainScreen() {
    this.renderSagaNodes();
    this.populateCollectionGrid();
    this.renderLeaderboard("all-time");
    this.scrollToCurrentNode();
    this.updateQuickPlayBtn();
  }

  scrollToCurrentNode() {
    const sagaContainer = document.getElementById("saga-map-container");
    if (!sagaContainer) return;

    const currentChapter = Math.ceil(this.currentLevel / 50) || 1;
    const chapterY = [1440, 1340, 1180, 1020, 860, 700, 540, 380, 220, 100];
    const targetY = chapterY[Math.min(9, Math.max(0, currentChapter - 1))];

    const containerH = sagaContainer.clientHeight || 500;
    const targetScrollTop = Math.max(0, targetY - containerH / 2);

    const doScroll = () => {
      sagaContainer.scrollTop = targetScrollTop;
    };
    doScroll();
    requestAnimationFrame(doScroll);
    setTimeout(doScroll, 60);
    setTimeout(doScroll, 200);
  }

  renderSagaNodes() {
    const list = document.getElementById("saga-nodes-list");
    if (!list) return;
    list.innerHTML = "";

    // Exact Bezier curve node coordinates (Bottom-to-Top: Chapter 1 at y=1440, Chapter 10 at y=100)
    const nodeCoords = [
      { chapter: 1,  x: 200, y: 1440, title: "Основы зельеварения" },
      { chapter: 2,  x: 300, y: 1340, title: "Заколдованный лес" },
      { chapter: 3,  x: 200, y: 1180, title: "Первые травы" },
      { chapter: 4,  x: 100, y: 1020, title: "Подземелье Снейпа" },
      { chapter: 5,  x: 200, y: 860,  title: "Пламенный Искровит" },
      { chapter: 6,  x: 300, y: 700,  title: "Тайные пропорции" },
      { chapter: 7,  x: 200, y: 540,  title: "Академия Магии" },
      { chapter: 8,  x: 100, y: 380,  title: "Ночные настойки" },
      { chapter: 9,  x: 200, y: 220,  title: "Высшая Алхимия" },
      { chapter: 10, x: 300, y: 100,  title: "Magnum Opus" }
    ];

    // Ensure path SVG d attribute matches exact node coordinates
    const pathEl = document.getElementById("saga-path-line");
    if (pathEl) {
      pathEl.setAttribute("d", "M 200,1440 C 260,1440 280,1400 300,1340 C 300,1280 260,1220 200,1180 C 140,1140 100,1080 100,1020 C 100,960 140,900 200,860 C 260,820 300,760 300,700 C 300,640 260,580 200,540 C 140,500 100,440 100,380 C 100,320 140,260 200,220 C 260,180 300,140 300,100");
    }

    const currentChapter = Math.ceil(this.currentLevel / 50) || 1;

    nodeCoords.forEach(node => {
      const wrapper = document.createElement("div");
      wrapper.className = "saga-node-wrapper";
      wrapper.style.left = `${(node.x / 400) * 100}%`;
      wrapper.style.top = `${node.y}px`;

      let stateClass = "locked-node";
      if (node.chapter < currentChapter) {
        stateClass = "completed-node";
      } else if (node.chapter === currentChapter) {
        stateClass = "current-node";
      }

      wrapper.classList.add(stateClass);

      const startLvl = (node.chapter - 1) * 50 + 1;
      const endLvl = node.chapter * 50;

      const icon = stateClass === "completed-node" ? "✨" : (stateClass === "current-node" ? "🧪" : "🔒");

      wrapper.innerHTML = `
        <button class="saga-node-btn" data-chapter="${node.chapter}" data-start="${startLvl}">
          <span class="node-number">${icon} ${node.chapter}</span>
          <span class="node-range">${startLvl}-${endLvl}</span>
        </button>
        <div class="node-title-badge">${node.title}</div>
      `;

      wrapper.querySelector(".saga-node-btn").addEventListener("click", () => {
        if (stateClass !== "locked-node") {
          this.loadLevel(startLvl);
          this.showGameplayScreen();
        }
      });

      list.appendChild(wrapper);
    });
  }

  updateQuickPlayBtn() {
    const textEl = document.getElementById("quick-play-text");
    if (textEl) {
      textEl.textContent = `УРОВЕНЬ ${this.currentLevel}`;
    }
  }

  switchTab(tabId) {
    this.activeTab = tabId;

    document.querySelectorAll(".dock-tab").forEach(tab => tab.classList.remove("active"));
    const activeTabBtn = document.getElementById(`tab-${tabId}`);
    if (activeTabBtn) activeTabBtn.classList.add("active");

    const quickBtn = document.getElementById("quick-play-btn");
    const archEl = document.querySelector(".dock-border-svg");
    const straightBgEl = document.querySelector(".dock-straight-bg");

    const mapContainer = document.getElementById("saga-map-container");
    const collectionContainer = document.getElementById("collection-tab-container");
    const statsContainer = document.getElementById("stats-tab-container");

    if (tabId === "map") {
      if (quickBtn) quickBtn.style.display = "flex";
      if (archEl) archEl.style.display = "block";
      if (straightBgEl) straightBgEl.classList.add("hidden-dock-bg");

      if (mapContainer) {
        mapContainer.className = "tab-view-container tab-view-active";
      }
      if (collectionContainer) {
        collectionContainer.className = "tab-view-container tab-view-hidden-right";
      }
      if (statsContainer) {
        statsContainer.className = "tab-view-container tab-view-hidden-left";
      }
      this.scrollToCurrentNode();
    } else if (tabId === "collection") {
      if (quickBtn) quickBtn.style.display = "none";
      if (archEl) archEl.style.display = "none";
      if (straightBgEl) straightBgEl.classList.remove("hidden-dock-bg");

      if (mapContainer) {
        mapContainer.className = "tab-view-container tab-view-hidden-left";
      }
      if (collectionContainer) {
        collectionContainer.className = "tab-view-container tab-view-active";
      }
      if (statsContainer) {
        statsContainer.className = "tab-view-container tab-view-hidden-left";
      }
    } else if (tabId === "stats") {
      if (quickBtn) quickBtn.style.display = "none";
      if (archEl) archEl.style.display = "none";
      if (straightBgEl) straightBgEl.classList.remove("hidden-dock-bg");

      if (mapContainer) {
        mapContainer.className = "tab-view-container tab-view-hidden-right";
      }
      if (collectionContainer) {
        collectionContainer.className = "tab-view-container tab-view-hidden-right";
      }
      if (statsContainer) {
        statsContainer.className = "tab-view-container tab-view-active";
      }
    }
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("hidden");
      modal.style.display = "flex";
      modal.style.pointerEvents = "auto";
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("hidden");
      modal.style.display = "none";
      modal.style.pointerEvents = "none";
    }
  }

  showGameplayScreen() {
    document.getElementById("main-screen")?.classList.remove("active-screen");
    document.getElementById("main-screen")?.classList.add("hidden-screen");

    document.getElementById("game-screen")?.classList.remove("hidden-screen");
    document.getElementById("game-screen")?.classList.add("active-screen");

    const quickBtn = document.getElementById("quick-play-btn");
    if (quickBtn) quickBtn.style.display = "none";
  }

  showMainScreen() {
    document.getElementById("game-screen")?.classList.remove("active-screen");
    document.getElementById("game-screen")?.classList.add("hidden-screen");

    document.getElementById("main-screen")?.classList.remove("hidden-screen");
    document.getElementById("main-screen")?.classList.add("active-screen");

    this.switchTab("map");
    this.renderSagaNodes();
    this.scrollToCurrentNode();
  }

  populateCollectionGrid() {
    const grid = document.getElementById("collection-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const items = [
      { name: "Слеза Феникса", icon: "🔴", unlocked: true },
      { name: "Сок Мандрагоры", icon: "🟢", unlocked: true },
      { name: "Лунный Мороз", icon: "🔵", unlocked: true },
      { name: "Пламя Дракона", icon: "🟠", unlocked: false },
      { name: "Туман Теней", icon: "🟣", unlocked: false },
      { name: "Эликсир Удачи", icon: "🟡", unlocked: false }
    ];

    items.forEach(item => {
      const el = document.createElement("div");
      el.className = `collection-item ${item.unlocked ? '' : 'locked'}`;
      el.innerHTML = `
        <span class="collection-icon">${item.icon}</span>
        <span class="collection-name">${item.name}</span>
      `;
      grid.appendChild(el);
    });
  }

  bindUI() {
    // Bottom Dock navigation
    document.getElementById("tab-stats")?.addEventListener("click", () => this.switchTab("stats"));
    document.getElementById("tab-map")?.addEventListener("click", () => this.switchTab("map"));
    document.getElementById("tab-collection")?.addEventListener("click", () => this.switchTab("collection"));

    // Quick Play floating button
    document.getElementById("quick-play-btn")?.addEventListener("click", () => {
      this.loadLevel(this.currentLevel);
      this.showGameplayScreen();
    });

    // Back to map button in game header
    document.getElementById("btn-back-to-map")?.addEventListener("click", () => {
      this.showMainScreen();
    });

    // Modal close buttons
    document.getElementById("btn-close-stats")?.addEventListener("click", () => {
      this.switchTab("map");
    });
    document.getElementById("btn-close-collection")?.addEventListener("click", () => {
      this.switchTab("map");
    });

    // Stats sub-tabs
    document.querySelectorAll(".stats-tab").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const subtab = e.target.getAttribute("data-subtab") || "all-time";
        document.querySelectorAll(".stats-tab").forEach(t => {
          if (t.getAttribute("data-subtab") === subtab) {
            t.classList.add("active");
          } else {
            t.classList.remove("active");
          }
        });
        this.renderLeaderboard(subtab);
      });
    });

    document.getElementById("btn-level-info")?.addEventListener("click", () => {
      this.openModal("mechanic-intro-modal");
    });
    document.getElementById("btn-close-mechanic-intro")?.addEventListener("click", () => {
      this.closeModal("mechanic-intro-modal");
    });

    document.getElementById("btn-dev-solve")?.addEventListener("click", () => {
      this.devAutoSort();
    });

    document.getElementById("btn-restart").addEventListener("click", () => this.restart());
    document.getElementById("btn-undo").addEventListener("click", () => this.undo());
    document.getElementById("btn-add-flask")?.addEventListener("click", () => this.addMiniFlask());
    document.getElementById("btn-next-level").addEventListener("click", () => {
      document.getElementById("win-modal").classList.add("hidden");
      this.currentLevel++;
      this.completedLevelsCount++;
      const completedStat = document.getElementById("stat-completed-levels");
      if (completedStat) completedStat.textContent = this.completedLevelsCount;
      this.updateQuickPlayBtn();
      this.loadLevel(this.currentLevel);
    });

    // Developer Admin Quick-Skip controls
    document.getElementById("btn-dev-next")?.addEventListener("click", () => {
      this.currentLevel++;
      this.updateQuickPlayBtn();
      this.loadLevel(this.currentLevel);
    });
    document.getElementById("btn-dev-prev")?.addEventListener("click", () => {
      if (this.currentLevel > 1) {
        this.currentLevel--;
        this.updateQuickPlayBtn();
        this.loadLevel(this.currentLevel);
      }
    });
  }

  addMiniFlask() {
    if (this.isBusy) return;
    const badge = document.querySelector("#btn-add-flask .badge-count");
    let count = badge ? parseInt(badge.textContent) || 0 : 0;
    if (count <= 0) return;

    // Check if an incomplete booster flask (maxCapacity < 4) already exists
    const existingIncomplete = this.flasks.find(f => f.maxCapacity < FLASK_CAP);

    count--;
    if (badge) badge.textContent = count;

    if (existingIncomplete) {
      existingIncomplete.maxCapacity++;
    } else {
      const newIndex = this.flasks.length;
      const newFlask = new FlaskView(this, newIndex, [], 1);
      this.flasks.push(newFlask);
      this.flasksLayer.addChild(newFlask.container);
    }

    this.positionFlasks();

    if (window.soundEngine && typeof window.soundEngine.playPourStart === 'function') {
      window.soundEngine.playPourStart();
    }
  }

  devAutoSort() {
    if (this.isBusy) return;

    for (const flask of this.flasks) {
      flask.hiddenCount = 0;
    }

    if (this.currentRecipe) {
      // Recipe Boss Level (Level 5, Level 10, etc.):
      // Instantly collect & sort all distinct colors into side flasks
      // Master Vessel (Flask 0) is kept empty for manual pour testing!
      const allColors = new Set();
      for (let i = 1; i < this.flasks.length; i++) {
        for (const c of this.flasks[i].layers) allColors.add(c);
      }
      const colorList = Array.from(allColors);
      this.flasks[0].layers = [];

      for (let i = 1; i < this.flasks.length; i++) {
        const flask = this.flasks[i];
        if (i <= colorList.length) {
          const colorId = colorList[i - 1];
          flask.layers = [colorId, colorId, colorId, colorId];
        } else {
          flask.layers = [];
        }
        flask.drawLiquids();
      }
      this.flasks[0].drawLiquids();
    } else {
      // Normal Levels (Levels 1-4, etc.):
      // Collect all color IDs across all flasks, and fill flasks with 4 units of each color
      const allColors = new Set();
      for (const f of this.flasks) {
        for (const c of f.layers) allColors.add(c);
      }
      const colorList = Array.from(allColors);

      for (let i = 0; i < this.flasks.length; i++) {
        const flask = this.flasks[i];
        if (i < colorList.length) {
          const c = colorList[i];
          flask.layers = [c, c, c, c];
        } else {
          flask.layers = [];
        }
        flask.drawLiquids();
      }
    }

    if (window.soundEngine && typeof window.soundEngine.playFlaskComplete === 'function') {
      window.soundEngine.playFlaskComplete();
    }

    this.updateTutorialOverlay();
  }
}

/**
 * High-End Realistic Glass Flask with Deep Fluid Stream Mechanics
 */
class FlaskView {
  constructor(engine, index, initialLayers, maxCapacity = FLASK_CAP) {
    this.engine = engine;
    this.index = index;
    this.layers = [...initialLayers];
    this.maxCapacity = maxCapacity;

    this.container = new PIXI.Container();
    this.container.eventMode = 'static';
    this.container.cursor = 'pointer';

    this.container.on('pointerdown', (e) => {
      e.stopPropagation();
      this.engine.onFlaskClicked(this);
    });

    // Sub-layers
    this.auraGfx = new PIXI.Graphics();
    this.glassBody = new PIXI.Graphics();
    this.maskGfx = new PIXI.Graphics();
    this.liquidGfx = new PIXI.Graphics();
    this.waveGfx = new PIXI.Graphics();
    this.sparklesGfx = new PIXI.Graphics();
    this.backRimGfx = new PIXI.Graphics();
    this.glassHighlights = new PIXI.Graphics();

    this.liquidContainer = new PIXI.Container();
    this.liquidContainer.mask = this.maskGfx;
    this.liquidContainer.addChild(this.liquidGfx);
    this.liquidContainer.addChild(this.waveGfx);
    this.liquidContainer.addChild(this.sparklesGfx);

    this.capGfx = new PIXI.Graphics();
    this.capParticlesGfx = new PIXI.Graphics();

    this.container.addChild(this.auraGfx);
    this.container.addChild(this.glassBody);
    this.container.addChild(this.maskGfx);
    this.container.addChild(this.liquidContainer);
    this.container.addChild(this.backRimGfx);
    this.container.addChild(this.capGfx);
    this.container.addChild(this.glassHighlights);
    this.container.addChild(this.capParticlesGfx);

    this.width = 76;
    this.height = 215;
    this.baseX = 0;
    this.baseY = 0;
    this.isSelected = false;
    this.isReceiving = false;
    this.isCapped = false;
    this.corkDisplacement = 0;
    this.hiddenCount = 0;

    // Create ? text labels for hidden segments
    this.questionLabels = [];
    for (let k = 0; k < FLASK_CAP; k++) {
      const qText = new PIXI.Text('?', {
        fontFamily: 'Cinzel, Arial, sans-serif',
        fontSize: 16,
        fontWeight: 'bold',
        fill: 0xffffff,
        align: 'center'
      });
      qText.anchor.set(0.5, 0.5);
      qText.visible = false;
      this.liquidContainer.addChild(qText);
      this.questionLabels.push(qText);
    }

    // Magical sparkles
    this.sparkles = [];
    for (let i = 0; i < 7; i++) {
      this.sparkles.push({
        x: (Math.random() - 0.5) * 0.7,
        y: Math.random(),
        speed: 0.003 + Math.random() * 0.005,
        size: 1.5 + Math.random() * 2.2,
        twinkle: Math.random() * Math.PI
      });
    }
  }

  setSize(w, h) {
    this.width = w;
    this.height = h;

    // Hit area covering the flask
    this.container.hitArea = new PIXI.Rectangle(-w / 2 - 10, -10, w + 20, h + 20);

    this.drawGlass();
    this.drawLiquids();
  }

  setBasePosition(x, y) {
    this.baseX = x;
    this.baseY = y;
    this.container.x = x;
    this.container.y = y;
    this.container.rotation = 0;
  }

  getSurfaceY() {
    const layerH = (this.height - 26) / this.maxCapacity;
    const bottomY = this.height - 8;
    return bottomY - this.layers.length * layerH - (this.corkDisplacement || 0);
  }

  topColor() {
    return this.layers.length > 0 ? this.layers[this.layers.length - 1] : -1;
  }

  topColorCount() {
    if (this.layers.length === 0) return 0;
    const c = this.topColor();
    let count = 0;
    for (let i = this.layers.length - 1; i >= 0; i--) {
      if (this.layers[i] === c) count++;
      else break;
    }
    return count;
  }

  canPourInto(target) {
    if (this === target) return false;
    if (this.isCapped || target.isCapped) return false;
    if (this.layers.length === 0) return false;
    if (target.layers.length >= target.maxCapacity) return false;
    if (target.isMasterVessel) {
      if (!this.engine.isRitualUnlocked()) return false;
      return this.isCompletedFull();
    }
    if (target.layers.length === 0) return true;
    return this.topColor() === target.topColor();
  }

  getAmountToPour(target) {
    if (target.isMasterVessel) return 1;
    const available = this.topColorCount();
    const free = target.maxCapacity - target.layers.length;
    return Math.min(available, free);
  }

  isSolved() {
    if (this.isMasterVessel) return this.isCapped;
    if (this.layers.length === 0) return true;
    if (this.hiddenCount > 0) return false;
    if (this.layers.length < FLASK_CAP) return false;
    const first = this.layers[0];
    return this.layers.every(c => c === first);
  }

  isCompletedFull() {
    if (this.hiddenCount > 0) return false;
    if (this.layers.length !== FLASK_CAP) return false;
    const first = this.layers[0];
    return this.layers.every(c => c === first);
  }

  setSelected(selected) {
    this.isSelected = selected;
    const targetY = selected ? this.baseY - 32 : this.baseY;
    this.animateProperty(this.container, "y", targetY, 150);
  }

  drawGlass() {
    const gB = this.glassBody;
    const gH = this.glassHighlights;
    const gBack = this.backRimGfx;
    const m = this.maskGfx;
    gB.clear();
    gH.clear();
    gBack.clear();
    m.clear();

    const w = this.width;
    const h = this.height;
    const wRim = w * 0.55; // Elegant flared lip at top
    const flareY = 20;

    if (this.isMasterVessel) {
      // 🔮 Master Crucible Vessel: Slender top neck + Wide rounded alchemical bulb bottom
      const neckW = w * 0.32;
      const bulbR = w * 0.58;
      const bulbCenterY = h - bulbR - 4;
      const neckY = h * 0.35;

      const mRim = wRim - 2.5;
      const mNeck = neckW - 2.5;
      const mBulbR = bulbR - 2.5;

      // 1. Fluid Mask (Bulbous bottom + neck)
      m.beginFill(0xffffff);
      m.moveTo(-mRim, 2);
      m.quadraticCurveTo(-mNeck, 6, -mNeck, neckY);
      m.arc(0, bulbCenterY, mBulbR, Math.PI + 0.35, -0.35, true);
      m.lineTo(mNeck, neckY);
      m.quadraticCurveTo(mNeck, 6, mRim, 2);
      m.closePath();
      m.endFill();

      // 2. Translucent Ambient Glass Body (Bulbous bottom)
      gB.beginFill(0x1a2b42, 0.45);
      gB.moveTo(-wRim, 2);
      gB.quadraticCurveTo(-neckW, 6, -neckW, neckY);
      gB.arc(0, bulbCenterY, bulbR, Math.PI + 0.35, -0.35, true);
      gB.lineTo(neckW, neckY);
      gB.quadraticCurveTo(neckW, 6, wRim, 2);
      gB.closePath();
      gB.endFill();

      // Dark interior throat depth inside open mouth
      gB.beginFill(0x0a0614, 0.55);
      gB.drawEllipse(0, 2, wRim - 4, 5);
      gB.endFill();

      // 3. Dual Glass Specular Highlights & 3D Volume
      gH.lineStyle(2.8, 0xd0e8ff, 0.70);
      gH.moveTo(-wRim, 2);
      gH.quadraticCurveTo(-neckW, 6, -neckW, neckY);
      gH.arc(0, bulbCenterY, bulbR, Math.PI + 0.35, -0.35, true);
      gH.lineTo(neckW, neckY);
      gH.quadraticCurveTo(neckW, 6, wRim, 2);



      // Gold mouth rim crowning the flared vessel
      this.drawBackRim(gBack, 0, 2, wRim, 6, 4, 0xffd700, 0.95);
      this.drawBackRim(gBack, 0, 0, wRim - 4, 4.5, 1.5, 0xffffff, 0.9);

      this.drawFrontRim(gH, 0, 2, wRim, 6, 4, 0xffd700, 0.95);
      this.drawFrontRim(gH, 0, 0, wRim - 4, 4.5, 1.5, 0xffffff, 0.9);
      return;
    }

    const r = w / 2; // Perfect tangential semicircle matching wall half-width
    const bottomArcY = h - r - 4;

    // 1. Fluid Mask (Follows flared lip and smooth U-bottom with 2.5px inset)
    const mRim = wRim - 2.5;
    const mBody = w / 2 - 2.5;
    const mR = r - 2.5;
    m.beginFill(0xffffff);
    m.moveTo(-mRim, 2);
    m.quadraticCurveTo(-mBody, 6, -mBody, flareY);
    m.lineTo(-mBody, bottomArcY);
    m.arc(0, bottomArcY, mR, Math.PI, 0, true);
    m.lineTo(mBody, flareY);
    m.quadraticCurveTo(mBody, 6, mRim, 2);
    m.closePath();
    m.endFill();

    // 2. Translucent Ambient Glass Body (Flared mouth + smooth U-bottom)
    gB.beginFill(0x162438, 0.4);
    gB.moveTo(-wRim, 2);
    gB.quadraticCurveTo(-w / 2, 6, -w / 2, flareY);
    gB.lineTo(-w / 2, bottomArcY);
    gB.arc(0, bottomArcY, r, Math.PI, 0, true);
    gB.lineTo(w / 2, flareY);
    gB.quadraticCurveTo(w / 2, 6, wRim, 2);
    gB.closePath();
    gB.endFill();

    // Dark interior throat depth inside open mouth
    gB.beginFill(0x0a0614, 0.55);
    gB.drawEllipse(0, 2, wRim - 4, 5);
    gB.endFill();

    // 3. Glass Highlights & Open Outer Contour
    // Smooth flared contour: left rim -> flared collar -> vertical wall -> bottom semicircle -> vertical wall -> flared collar -> right rim
    gH.lineStyle(2, 0xd0e8ff, 0.55);
    gH.moveTo(-wRim, 2);
    gH.quadraticCurveTo(-w / 2, 6, -w / 2, flareY);
    gH.lineTo(-w / 2, bottomArcY);
    gH.arc(0, bottomArcY, r, Math.PI, 0, true);
    gH.lineTo(w / 2, flareY);
    gH.quadraticCurveTo(w / 2, 6, wRim, 2);

    // Gold mouth rim crowning the flared vessel (split into back and front arcs for 3D occlusion)
    // 1. Back golden rim arc (in backRimGfx, placed behind cork stopper)
    this.drawBackRim(gBack, 0, 2, wRim, 6, 4, 0xffd700, 0.95);
    this.drawBackRim(gBack, 0, 0, wRim - 4, 4.5, 1.5, 0xffffff, 0.9);

    // 2. Front golden rim arc (in glassHighlights, placed in front of cork stopper)
    this.drawFrontRim(gH, 0, 2, wRim, 6, 4, 0xffd700, 0.95);
    this.drawFrontRim(gH, 0, 0, wRim - 4, 4.5, 1.5, 0xffffff, 0.9);

    if (this.isMasterVessel) {
      // Golden Crown Crest & Ruby Gem on Master Crucible Neck
      gH.lineStyle(3, 0xffd700, 0.95);
      gH.drawCircle(0, flareY + 2, wRim * 0.42);
      gH.beginFill(0xff1744, 0.95);
      gH.drawCircle(0, flareY + 2, 4.5);
      gH.endFill();
    }
  }

  drawBackRim(g, cx, cy, rx, ry, strokeWidth, strokeColor, strokeAlpha) {
    g.lineStyle(strokeWidth, strokeColor, strokeAlpha);
    g.moveTo(cx - rx, cy);
    const steps = 24;
    for (let i = 1; i <= steps; i++) {
      const angle = Math.PI + (i / steps) * Math.PI;
      g.lineTo(cx + rx * Math.cos(angle), cy + ry * Math.sin(angle));
    }
  }

  drawFrontRim(g, cx, cy, rx, ry, strokeWidth, strokeColor, strokeAlpha) {
    g.lineStyle(strokeWidth, strokeColor, strokeAlpha);
    g.moveTo(cx + rx, cy);
    const steps = 24;
    for (let i = 1; i <= steps; i++) {
      const angle = (i / steps) * Math.PI;
      g.lineTo(cx + rx * Math.cos(angle), cy + ry * Math.sin(angle));
    }
  }

  drawFrontRimOverlay(gfx) {
    const w = this.width;
    const cx = this.baseX;
    const cy = this.baseY;
    const wRim = w * 0.55;
    gfx.lineStyle(4, 0xffd700, 0.95);
    gfx.drawEllipse(cx, cy + 2, wRim, 6);
    gfx.lineStyle(1.5, 0xffffff, 0.9);
    gfx.drawEllipse(cx, cy, wRim - 4, 4.5);
  }

  drawStar(g, cx, cy, size, color) {
    g.beginFill(color, 0.95);
    g.drawCircle(cx, cy, size * 0.45);
    g.endFill();
    g.lineStyle(1.2, color, 0.95);
    g.moveTo(cx - size, cy); g.lineTo(cx + size, cy);
    g.moveTo(cx, cy - size); g.lineTo(cx, cy + size);
  }

  drawCork(offsetY = 0) {
    const g = this.capGfx;
    g.clear();

    const w = this.width;
    const cy = offsetY;
    const wRim = w * 0.55;

    if (this.isMasterVessel) {
      // 💎 Grand Magical 3D Faceted Crystal Gem Stopper for Central Master Crucible
      const gemR = wRim * 0.85; // Grand size matching wide flared neck
      const yGemCenter = cy - 22;

      // 1. Crystal Plug entering throat (Dark cyan glass seal inside throat)
      const throatPlugW = w * 0.32 - 3;
      g.lineStyle(0);
      g.beginFill(0x0088cc, 0.45);
      g.drawRect(-throatPlugW, cy + 2, throatPlugW * 2, 14);
      g.endFill();

      // 2. Golden Royal Crown Collar (Curved filigree mount encircling vessel throat)
      const collarW = wRim * 0.72;
      g.beginFill(0xffd700);
      g.lineStyle(1.8, 0xb8860b, 0.95);
      g.drawRoundedRect(-collarW, cy - 6, collarW * 2, 14, 5);
      g.endFill();

      // Inner Gold Sheen Streak
      g.lineStyle(0);
      g.beginFill(0xffffff, 0.4);
      g.drawRoundedRect(-collarW + 4, cy - 5, collarW * 2 - 8, 4, 2);
      g.endFill();

      // Ruby Gem Inlaid in Center of Crown Collar
      g.beginFill(0xff1744);
      g.lineStyle(1.2, 0xffd700, 0.95);
      g.drawCircle(0, cy + 1, 4.5);
      g.endFill();

      // 3. Multi-Faceted 3D Crystal Gem Body (Octagonal Crystal with light refraction)
      // Base Facet Shadow (Deep Teal / Dark Cyan)
      g.beginFill(0x006699, 0.95);
      g.lineStyle(2, 0xffffff, 0.95);
      g.moveTo(0, yGemCenter - gemR - 8);
      g.lineTo(gemR, yGemCenter - 6);
      g.lineTo(gemR * 0.72, yGemCenter + gemR);
      g.lineTo(-gemR * 0.72, yGemCenter + gemR);
      g.lineTo(-gemR, yGemCenter - 6);
      g.closePath();
      g.endFill();

      // Front Left Radiant Facet (Electric Cyan)
      g.beginFill(0x00e5ff, 0.92);
      g.lineStyle(1.2, 0x84ffff, 0.9);
      g.moveTo(0, yGemCenter - gemR - 8);
      g.lineTo(-gemR, yGemCenter - 6);
      g.lineTo(-gemR * 0.72, yGemCenter + gemR);
      g.lineTo(0, yGemCenter + gemR * 0.4);
      g.closePath();
      g.endFill();

      // Front Right Specular Facet (Light Sky Blue / Cyan)
      g.beginFill(0x84ffff, 0.88);
      g.lineStyle(1.2, 0xffffff, 0.95);
      g.moveTo(0, yGemCenter - gemR - 8);
      g.lineTo(gemR, yGemCenter - 6);
      g.lineTo(gemR * 0.72, yGemCenter + gemR);
      g.lineTo(0, yGemCenter + gemR * 0.4);
      g.closePath();
      g.endFill();

      // Top Specular Diamond Flare (Pure White Specular Core)
      g.beginFill(0xffffff, 0.75);
      g.lineStyle(0);
      g.moveTo(0, yGemCenter - gemR - 8);
      g.lineTo(gemR * 0.38, yGemCenter - 4);
      g.lineTo(0, yGemCenter + gemR * 0.15);
      g.lineTo(-gemR * 0.28, yGemCenter - 2);
      g.closePath();
      g.endFill();

      // 4. Golden Star Lens Flare on Peak of Crystal
      this.drawStar(g, 0, yGemCenter - gemR - 8, 7, 0xffffff);
      this.drawStar(g, 0, yGemCenter - gemR - 8, 4, 0xffd700);
      return;
    }

    // Proportions: compact cork that enters 3px into the potion
    const topCapW = wRim - 2.0;   // Protruding head (~39.8px)
    const mouthW = wRim - 3.5;    // Enters mouth (~38.3px)
    const throatW = w / 2 - 2.8;  // Throat contour (~35.2px)

    const yTop = cy - 5;          // Protrudes 5px above rim
    const yRim = cy + 2;          // Rim level
    const yCollar = cy + 12;      // Collar transition
    const yBot = cy + 27;         // Tip enters potion to y=27 (~11.5px depth into liquid)
    const yWater = 15.5;          // Rest fluid surface level

    const topColor = this.layers.length > 0 ? PALETTE[this.topColor()] : null;

    // 1. Main dry cork body (from top head down to liquid level)
    g.beginFill(0x9e6a38);
    g.moveTo(-topCapW, yTop);
    g.lineTo(-mouthW, yRim);
    g.quadraticCurveTo(-throatW, cy + 7, -throatW, yCollar);
    g.lineTo(-throatW, yBot);
    g.lineTo(throatW, yBot);
    g.lineTo(throatW, yCollar);
    g.quadraticCurveTo(throatW, cy + 7, mouthW, yRim);
    g.lineTo(topCapW, yTop);
    g.closePath();
    g.endFill();

    // Cylindrical shadow on left
    g.beginFill(0x6e421a, 0.35);
    g.moveTo(-topCapW, yTop);
    g.lineTo(-mouthW, yRim);
    g.quadraticCurveTo(-throatW, cy + 7, -throatW, yBot);
    g.lineTo(0, yBot);
    g.lineTo(-throatW * 0.35, cy + 7);
    g.lineTo(-topCapW * 0.4, yTop);
    g.closePath();
    g.endFill();

    // Subtle right edge highlight
    g.beginFill(0xcb9960, 0.25);
    g.moveTo(topCapW * 0.6, yTop);
    g.lineTo(topCapW, yTop);
    g.lineTo(mouthW, yRim);
    g.quadraticCurveTo(throatW, cy + 7, throatW, yBot);
    g.lineTo(throatW * 0.65, yBot);
    g.closePath();
    g.endFill();

    // Natural cork porous flecks / grain in air portion
    g.lineStyle(1.4, 0x5a3212, 0.45);
    g.moveTo(-mouthW * 0.4, yRim + 2); g.lineTo(-mouthW * 0.1, yRim + 2);
    g.moveTo(mouthW * 0.15, yRim + 4); g.lineTo(mouthW * 0.5, yRim + 4);
    g.moveTo(-throatW * 0.45, yCollar - 2); g.lineTo(-throatW * 0.1, yCollar - 2);
    g.moveTo(throatW * 0.1, yCollar + 1); g.lineTo(throatW * 0.4, yCollar + 1);

    // 2. Optical Submergence: Submerged tip inside potion is dark wet wood tinted by potion color!
    if (yBot > yWater && topColor) {
      const actualYWater = Math.max(cy + 12, yWater);
      if (yBot > actualYWater) {
        const subH = yBot - actualYWater;

        // Dark wet wood base overlay (makes submerged wood clearly distinct from liquid)
        g.lineStyle(0);
        g.beginFill(0x2b1505, 0.58);
        g.drawRect(-throatW, actualYWater, throatW * 2, subH);
        g.endFill();

        // Potion inner tint overlay (tinted by liquid color)
        g.beginFill(topColor.inner, 0.36);
        g.drawRect(-throatW, actualYWater, throatW * 2, subH);
        g.endFill();

        // Potion bright hex overlay
        g.beginFill(topColor.hex, 0.18);
        g.drawRect(-throatW, actualYWater, throatW * 2, subH);
        g.endFill();

        // Submerged wood texture lines for clear physical presence under water
        g.lineStyle(1.4, 0x180902, 0.55);
        g.moveTo(-throatW * 0.4, actualYWater + 3); g.lineTo(-throatW * 0.1, actualYWater + 3);
        g.moveTo(throatW * 0.1, actualYWater + 7); g.lineTo(throatW * 0.45, actualYWater + 7);

        // Strong dark outline around submerged cork tip inside liquid
        g.lineStyle(1.6, 0x120601, 0.70);
        g.moveTo(-throatW, actualYWater);
        g.lineTo(-throatW, yBot);
        g.lineTo(throatW, yBot);
        g.lineTo(throatW, actualYWater);
      }
    }

    // 3. Top face of cork
    g.lineStyle(1.2, 0xba884e, 0.95);
    g.beginFill(0xab7742);
    g.drawEllipse(0, yTop, topCapW, 4.0);
    g.endFill();

    // Top face light sheen
    g.lineStyle(0);
    g.beginFill(0xd29d63, 0.45);
    g.drawEllipse(0, yTop - 0.5, topCapW * 0.72, 2.4);
    g.endFill();
  }

  async synthesizePotion() {
    // 1. Swirl & blend reaction: all colors mix together into radiant Prismatic Master Elixir
    const duration = 1200;
    const startTime = performance.now();
    const origLayers = [...this.layers];
    const layerCount = this.maxCapacity;
    const paletteSize = PALETTE.length;

    if (window.soundEngine && typeof window.soundEngine.playFlaskComplete === 'function') {
      window.soundEngine.playFlaskComplete();
    }

    await new Promise(resolve => {
      const step = (now) => {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);

        if (t < 0.8) {
          const shift = Math.floor(t * 14) % layerCount;
          this.layers = origLayers.map((_, idx) => (idx + shift) % paletteSize);
          this.drawLiquids(0, 0, null, Math.sin(t * Math.PI * 8) * 0.15);
        } else {
          // Final transformed state: all layers become radiant Prismatic Amethyst Potion (ID 4)
          this.layers = Array(layerCount).fill(4);
          this.drawLiquids();
        }

        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          resolve();
        }
      };
      requestAnimationFrame(step);
    });

    this.spawnCapSparkles();
    await this.capFlask();
  }

  uncapFlask() {
    this.isCapped = false;
    this.corkDisplacement = 0;
    this.capGfx.clear();
    this.capParticlesGfx.clear();
    this.drawLiquids();
  }

  async capFlask() {
    if (this.isCapped) return;
    this.hiddenCount = 0;
    this.isCapped = true;
    this.drawLiquids();

    // Snappy drop animation into flask mouth (-38px down into neck 0px)
    const duration = 220;
    const startY = -38;
    const startTime = performance.now();

    await new Promise(resolve => {
      const step = (now) => {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);
        // Snappy back-out settle
        const c1 = 1.35;
        const c3 = c1 + 1;
        const ease = 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
        const curY = startY + (0 - startY) * ease;

        // Dynamic fluid displacement: as cork enters liquid (last 35% of drop), liquid rises by 2.5px
        if (t > 0.65) {
          const dipProgress = (t - 0.65) / 0.35;
          this.corkDisplacement = dipProgress * 2.5;
          this.drawLiquids();
        }

        this.drawCork(curY);

        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          this.corkDisplacement = 2.5;
          this.drawLiquids();
          this.drawCork(0);
          if (window.soundEngine && typeof window.soundEngine.playCork === 'function') {
            window.soundEngine.playCork();
          }
          resolve();
        }
      };
      requestAnimationFrame(step);
    });

    // Golden sparkles bursting from the seal
    this.spawnCapSparkles();
  }

  spawnCapSparkles() {
    const pG = this.capParticlesGfx;
    pG.clear();
    const wRim = this.width * 0.55;
    const particles = [];
    for (let i = 0; i < 9; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.8;
      const spd = 1.8 + Math.random() * 2.6;
      particles.push({
        x: (Math.random() - 0.5) * wRim * 0.8,
        y: -4,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        life: 0,
        maxLife: 28 + Math.random() * 16,
        size: 2.2 + Math.random() * 2.8,
        color: Math.random() > 0.3 ? 0xffd700 : 0xffffff
      });
    }

    const animateParticles = () => {
      pG.clear();
      let active = false;
      for (const p of particles) {
        p.life++;
        if (p.life < p.maxLife) {
          active = true;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.09;
          const alpha = 1 - (p.life / p.maxLife);
          pG.lineStyle(1.2, p.color, alpha);
          const s = p.size * (1 - p.life / p.maxLife * 0.4);
          pG.moveTo(p.x - s, p.y); pG.lineTo(p.x + s, p.y);
          pG.moveTo(p.x, p.y - s); pG.lineTo(p.x, p.y + s);
        }
      }
      if (active) {
        requestAnimationFrame(animateParticles);
      } else {
        pG.clear();
      }
    };
    requestAnimationFrame(animateParticles);
  }

  async bounceTriumph() {
    if (window.soundEngine && typeof window.soundEngine.playFlaskComplete === 'function') {
      window.soundEngine.playFlaskComplete();
    }

    this.spawnCapSparkles();

    const duration = 380;
    const startY = this.container.y;
    const startTime = performance.now();

    await new Promise(resolve => {
      const animate = (now) => {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);

        const bounceY = Math.sin(t * Math.PI) * -16;
        const scaleS = 1 + Math.sin(t * Math.PI) * 0.10;

        this.container.y = startY + bounceY;
        this.container.scale.set(scaleS, scaleS);

        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          this.container.y = startY;
          this.container.scale.set(1, 1);
          resolve();
        }
      };
      requestAnimationFrame(animate);
    });
  }

  drawLiquids(drainHeight = 0, fillHeight = 0, fillColor = null, tilt = 0) {
    const g = this.liquidGfx;
    g.clear();

    const count = this.layers.length;
    if (count === 0 && fillHeight === 0) return;

    const w = this.width;
    const h = this.height;
    const layerH = (h - 26) / this.maxCapacity;
    const bottomY = h - 8;

    // --- 1. Merge adjacent same-color layers into unified chunks ---
    const chunks = [];
    let curChunk = null;

    for (let i = 0; i < count; i++) {
      const isHidden = (i < this.hiddenCount) && !this.isCapped;
      const colorId = isHidden ? -1 : this.layers[i];
      if (!curChunk || curChunk.colorId !== colorId) {
        curChunk = { colorId: colorId, startIndex: i, layerCount: 1, extraH: 0 };
        chunks.push(curChunk);
      } else {
        curChunk.layerCount++;
      }
    }

    // If receiving incoming liquid, merge into top chunk if same color, or add as new chunk
    if (fillHeight > 0 && fillColor) {
      if (chunks.length > 0 && chunks[chunks.length - 1].colorId === fillColor.id) {
        chunks[chunks.length - 1].extraH = (chunks[chunks.length - 1].extraH || 0) + fillHeight;
      } else {
        chunks.push({ colorId: fillColor.id, startIndex: count, layerCount: 0, extraH: fillHeight });
      }
    }

    // --- 2. Fluid Surface Slant calculation ---
    const isTilted = Math.abs(tilt) > 0.02;
    const isRight = tilt > 0;
    const maxSlope = 4.2;
    const slope = isTilted ? Math.max(-maxSlope, Math.min(maxSlope, Math.tan(tilt))) : 0;
    const spoutX = isRight ? (w * 0.52) : (-w * 0.52);

    // --- 3. Compute nominal center heights for all chunks ---
    const chunkHeights = [];
    let totalNominalH = 0;
    for (let c = 0; c < chunks.length; c++) {
      let cH = chunks[c].layerCount * layerH + (chunks[c].extraH || 0);
      if (c === chunks.length - 1 && drainHeight > 0) {
        cH = Math.max(0, cH - drainHeight);
      }
      chunkHeights.push(cH);
      totalNominalH += cH;
    }

    // --- 4. Fluid Slosh & Lip Contact: Strict Volume Conservation & Bottom Anchoring ---
    // The bottom of the liquid column is PERMANENTLY anchored to bottomY.
    // Liquid fills from the bottom of the flask upwards.
    const boundaries = [bottomY];
    let curY = bottomY;
    for (let c = 0; c < chunks.length; c++) {
      curY -= chunkHeights[c];
      boundaries.push(curY);
    }

    // Nominal top surface center (rises slightly by corkDisplacement upon capping)
    const topIdx = chunks.length - 1;
    let nominalTopY = boundaries[chunks.length] - (this.corkDisplacement || 0);
    const nominalLipY = nominalTopY - spoutX * slope;
    const targetLipY = 4; // Firmly lock fluid to the pouring mouth rim

    // Compute surface lift to connect smoothly with the pouring mouth lip
    let topSurfaceY = nominalTopY;
    if (isTilted && chunks.length > 0 && totalNominalH > 0) {
      const maxLift = Math.max(0, nominalLipY - targetLipY);
      const tiltFactor = Math.min(1, Math.pow(Math.abs(tilt) / 0.70, 1.5));

      // When the very last chunk is almost empty, smoothly fade lift so it doesn't artificially stretch
      const isLastOnlyChunk = (chunks.length === 1);
      const remRatio = isLastOnlyChunk ? Math.max(0, chunkHeights[0] / layerH) : 1;
      const volFactor = isLastOnlyChunk ? Math.min(1, remRatio * 1.5) : 1;

      const lift = maxLift * tiltFactor * volFactor;
      topSurfaceY = nominalTopY - lift;
    }

    // 5. Render each chunk with solid bottom anchoring & seamless parallel boundaries
    const xL = -w / 2 - 15;
    const xR = w / 2 + 15;
    const yBottomClamp = h + 60; // Deep clamp into the mask for anatomical rounded glass bottom

    for (let c = 0; c < chunks.length; c++) {
      if (chunkHeights[c] <= 0) continue;

      const color = chunks[c].colorId === -1 ? MYSTERY_COLOR : PALETTE[chunks[c].colorId];
      const isBottomChunk = (c === 0);
      const isTopChunk = (c === topIdx);

      const Y_bot = boundaries[c];
      const Y_top = isTopChunk ? topSurfaceY : boundaries[c + 1];

      // Slanted top boundary with animated wave for resting top-most layer
      const waveTime = (this.engine ? (this.engine.time || performance.now() * 0.003) : 0);
      const isRestingWave = (isTopChunk && !isTilted && !this.isReceiving && !this.isCapped);

      // Generate top surface curve points
      const topCurvePoints = [];
      const step = 3;
      for (let x = xL; x <= xR; x += step) {
        const wave = isRestingWave ? Math.sin(waveTime * 3.5 + x * 0.18) * 1.8 : 0;
        const yVal = Y_top - x * slope + wave;
        topCurvePoints.push({ x: x, y: yVal });
      }

      // Bottom boundary: Chunk 0 is ALWAYS solidly anchored to the glass bottom (clipped by maskGfx).
      // Higher chunks strictly match the top boundary of the chunk below them!
      const yBL = isBottomChunk ? yBottomClamp : (Y_bot - xL * slope);
      const yBR = isBottomChunk ? yBottomClamp : (Y_bot - xR * slope);

      // 1. Solid fluid body (following wave on top edge)
      const bodyPoly = [];
      for (let p of topCurvePoints) {
        bodyPoly.push(p.x, p.y);
      }
      bodyPoly.push(xR, yBR, xL, yBL);

      g.lineStyle(0);
      g.beginFill(color.hex, 0.95);
      g.drawPolygon(bodyPoly);
      g.endFill();

      // 2. Subtle boundary line between DIFFERENT colors
      if (c < chunks.length - 1) {
        g.lineStyle(1, 0x000000, 0.15);
        g.moveTo(xL, Y_top - xL * slope);
        g.lineTo(xR, Y_top - xR * slope);
      }

      // 3. Surface meniscus line on top-most fluid layer when pouring
      if (isTopChunk && isTilted) {
        g.lineStyle(2.5, 0xffffff, 0.75);
        g.moveTo(xL, Y_top - xL * slope);
        g.lineTo(xR, Y_top - xR * slope);
      }
    }

    // --- UNIFIED SEAMLESS VELVET GLASS SHEEN OVERLAY (AUTOMATICALLY CLIPPED BY FLUID MASK) ---
    // Renders ONE continuous, perfectly uniform, velvet highlight stripe over ALL liquid layers!
    if (chunks.length > 0 && totalNominalH > 0) {
      const topChunkPoints = [];
      const waveTime = (this.engine ? (this.engine.time || performance.now() * 0.003) : 0);
      const isRestingWave = (!isTilted && !this.isReceiving && !this.isCapped);

      const hL = -w * 0.36;
      const hR = -w * 0.18;
      const step = 3;

      for (let x = hL; x <= hR; x += step) {
        const wave = isRestingWave ? Math.sin(waveTime * 3.5 + x * 0.18) * 1.8 : 0;
        topChunkPoints.push(x, topSurfaceY - x * slope + wave);
      }

      const sheenPoly = [];
      for (let i = 0; i < topChunkPoints.length; i += 2) {
        sheenPoly.push(topChunkPoints[i], topChunkPoints[i + 1]);
      }
      // Bottom clamp into rounded glass base
      sheenPoly.push(hR, yBottomClamp, hL, yBottomClamp);

      // Velvet soft glass highlight (uniform 18% white sheen)
      g.lineStyle(0);
      g.beginFill(0xffffff, 0.18);
      g.drawPolygon(sheenPoly);
      g.endFill();

      // Subtle inner bright core streak (uniform 12% white inner core)
      const corePoly = [];
      const cL = -w * 0.32;
      const cR = -w * 0.24;
      for (let x = cL; x <= cR; x += step) {
        const wave = isRestingWave ? Math.sin(waveTime * 3.5 + x * 0.18) * 1.8 : 0;
        corePoly.push(x, topSurfaceY - x * slope + wave);
      }
      corePoly.push(cR, yBottomClamp, cL, yBottomClamp);

      g.beginFill(0xffffff, 0.12);
      g.drawPolygon(corePoly);
      g.endFill();
    }

    // Position Question Mark labels for hidden segments
    if (this.questionLabels) {
      for (let k = 0; k < FLASK_CAP; k++) {
        if (k < count && k < this.hiddenCount && !this.isCapped) {
          this.questionLabels[k].visible = true;
          this.questionLabels[k].y = (h - 8) - (k + 0.5) * layerH;
          this.questionLabels[k].x = 0;
        } else {
          this.questionLabels[k].visible = false;
        }
      }
    }
  }

  updateVFX(time) {
    if (this.isTutorialPulse && !this.isSelected) {
      // Very smooth, gentle scale breathing (~2% variation, slow tempo)
      const pulseScale = 1 + Math.sin(time * 1.4) * 0.022;
      this.container.scale.set(pulseScale, pulseScale);
    } else {
      if (!this.isSelected && (this.container.scale.x !== 1 || this.container.scale.y !== 1)) {
        this.container.scale.set(1, 1);
      }
    }

    const wG = this.waveGfx;
    const sG = this.sparklesGfx;
    wG.clear();
    sG.clear();

    const count = this.layers.length;
    if (count === 0) return;

    // Do not draw resting surface wave while tilted, actively receiving liquid, or capped
    if (Math.abs(this.container.rotation) <= 0.05 && !this.isReceiving && !this.isCapped) {
      this.drawLiquids(); // Re-render animated fluid polygon body matching wave!
      const topColor = PALETTE[this.topColor()];
      const w = this.width;
      const h = this.height;
      const layerH = (h - 26) / this.maxCapacity;
      const surfaceY = (h - 8) - count * layerH;

      // Animated gentle wave at the top resting surface
      wG.lineStyle(1.5, 0xffffff, 0.45);
      wG.moveTo(-w / 2, surfaceY);
      for (let x = -w / 2; x <= w / 2; x += 3) {
        const wave = Math.sin(time * 3.5 + x * 0.18) * 1.8;
        wG.lineTo(x, surfaceY + wave);
      }

      wG.lineStyle(3, topColor.glow, 0.5);
      wG.moveTo(-w / 2, surfaceY + 2);
      for (let x = -w / 2; x <= w / 2; x += 3) {
        const wave = Math.sin(time * 3.5 + x * 0.18) * 2.2;
        wG.lineTo(x, surfaceY + 2 + wave);
      }
    }

    // Effervescent sparkles
    const topColor = PALETTE[this.topColor()];
    const w = this.width;
    const h = this.height;
    const layerH = (h - 26) / this.maxCapacity;
    for (const s of this.sparkles) {
      s.y -= s.speed;
      if (s.y < 0) s.y = 1;

      const sparkY = (h - 10) - s.y * (count * layerH);
      const sparkX = s.x * w + Math.sin(time * 2.5 + s.y * 12) * 3;
      const alpha = 0.4 + Math.sin(time * 4 + s.twinkle) * 0.35;

      sG.beginFill(topColor.sparkles, alpha);
      sG.drawCircle(sparkX, sparkY, s.size);
      sG.endFill();
    }
  }

  animateRotationAndFluid(targetRot, duration, pivot = null) {
    return new Promise(resolve => {
      const startRot = this.container.rotation;
      const startTime = performance.now();
      const localLipX = (pivot && pivot.localLipX !== undefined)
        ? pivot.localLipX
        : (targetRot > 0 ? (this.width * 0.44) : (-this.width * 0.44));
      const localLipY = 4;

      const step = (now) => {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const curRot = startRot + (targetRot - startRot) * ease;

        this.container.rotation = curRot;
        if (pivot) {
          const curCos = Math.cos(curRot);
          const curSin = Math.sin(curRot);
          this.container.x = pivot.x - (localLipX * curCos - localLipY * curSin);
          this.container.y = pivot.y - (localLipX * curSin + localLipY * curCos);
        }
        this.drawLiquids(0, 0, null, curRot);

        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          this.container.rotation = targetRot;
          if (pivot) {
            const curCos = Math.cos(targetRot);
            const curSin = Math.sin(targetRot);
            this.container.x = pivot.x - (localLipX * curCos - localLipY * curSin);
            this.container.y = pivot.y - (localLipX * curSin + localLipY * curCos);
          }
          this.drawLiquids(0, 0, null, targetRot);
          resolve();
        }
      };
      requestAnimationFrame(step);
    });
  }

  async pourInto(target, amount, colorId, streamGfx, splashGfx) {
    const color = PALETTE[colorId];
    const currentLayersCount = this.layers.length;

    // Bring pouring flask to the very top of display list so it NEVER renders behind other flasks
    if (this.container.parent) {
      this.container.parent.addChild(this.container);
    }

    // Continuous physical tilt angle function based on fluid level
    const getTiltForLayers = (L) => 0.72 + (1 - Math.max(0, L) / this.maxCapacity) * 0.68;

    const drainAmount = target.isMasterVessel ? this.layers.length : amount;
    const fillAmount = target.isMasterVessel ? 1 : amount;

    const startLayers = currentLayersCount;
    const endLayers = currentLayersCount - drainAmount;

    const startTiltMag = getTiltForLayers(startLayers);
    const endTiltMag = getTiltForLayers(endLayers);

    // Calculate pouring direction (left-to-right vs right-to-left)
    // If same column, tilt based on screen half
    let isTargetOnRight = this.baseX < target.baseX;
    if (Math.abs(this.baseX - target.baseX) < 4) {
      isTargetOnRight = target.baseX < (this.engine.app.screen.width / 2);
    }

    const startTilt = isTargetOnRight ? startTiltMag : -startTiltMag;
    const endTilt = isTargetOnRight ? endTiltMag : -endTiltMag;

    // Calculate lip position in local space
    const localLipX = isTargetOnRight ? (this.width * 0.52) : (-this.width * 0.52);
    const localLipY = 4;

    // World position of pouring lip elevated compactly and gracefully directly above target mouth
    const lipLiftY = Math.min(42, Math.max(32, this.height * 0.22));
    const lipSideOffset = isTargetOnRight ? -Math.min(32, this.width * 0.46) : Math.min(32, this.width * 0.46);

    const targetLipWorldX = target.baseX + lipSideOffset;
    const targetLipWorldY = target.baseY - lipLiftY;
    const pivot = { x: targetLipWorldX, y: targetLipWorldY, localLipX };

    // Elevated position: mouth lip is aligned directly over target flask
    const elevatedX = targetLipWorldX - localLipX;
    const elevatedY = targetLipWorldY - localLipY;

    await Promise.all([
      this.animateProperty(this.container, "x", elevatedX, 260),
      this.animateProperty(this.container, "y", elevatedY, 260)
    ]);

    // --- 2. Smooth physical tilt: Flask tilts around its lip, fluid reaches the lip ---
    await this.animateRotationAndFluid(startTilt, 280, pivot);

    // --- 3. Dynamic Pouring Stream with Synchronized Tilting & Natural Curve ---
    const pourDuration = 880;
    const startTime = performance.now();
    const sourceLayerH = (this.height - 26) / this.maxCapacity;
    const targetLayerH = (target.height - 26) / target.maxCapacity;
    const initialTargetSurfaceY = target.baseY + target.getSurfaceY();

    // Particles for delicate luminous potion spray and rising micro-bubbles
    const sprayParticles = [];
    const submergedBubbles = [];

    target.isReceiving = true;
    target.waveGfx.clear();

    while (performance.now() - startTime < pourDuration) {
      const elapsed = performance.now() - startTime;
      const progress = elapsed / pourDuration;

      streamGfx.clear();
      splashGfx.clear();

      // Dynamic tilt: continuously tilts at the exact rate liquid drains!
      // Fluid stays pinned right at the mouth nozzle lip throughout the pour.
      const curEffectiveLayers = startLayers - progress * drainAmount;
      const curTiltMag = getTiltForLayers(curEffectiveLayers);
      const currentRot = (isTargetOnRight ? 1 : -1) * curTiltMag;
      this.container.rotation = currentRot;

      // Keep lip pinned exactly at target mouth while flask body tilts
      const curCos = Math.cos(currentRot);
      const curSin = Math.sin(currentRot);
      this.container.x = targetLipWorldX - (localLipX * curCos - localLipY * curSin);
      this.container.y = targetLipWorldY - (localLipX * curSin + localLipY * curCos);

      const startX = targetLipWorldX;
      const startY = targetLipWorldY;

      // Current rising fluid level in target flask
      const currentFillAmount = progress * targetLayerH * fillAmount;
      const targetLiquidY = initialTargetSurfaceY - currentFillAmount;

      // Destination: Directly into the liquid surface of target flask
      const destX = target.baseX;
      const destY = targetLiquidY;

      // --- Natural Volumetric Tapered Stream along Cubic Bezier Path ---
      // P0: At the pouring mouth lip
      // P1: Adaptive forward tangent leaving the spout (proportional to distance)
      // P2: Aligned directly above target mouth for vertical gravity entry
      // P3: Destination impact point at liquid surface
      const dist = Math.abs(destX - startX);
      const flowDir = isTargetOnRight ? 1 : -1;
      const P0 = { x: startX, y: startY };
      const P1 = { x: startX + flowDir * Math.max(12, dist * 0.4), y: startY + Math.min(18, (destY - startY) * 0.3) };
      const P2 = { x: destX, y: Math.min(target.baseY - 6, destY - 14) };
      const P3 = { x: destX, y: destY };

      const N = 20;
      const outerLeft = [];
      const outerRight = [];
      const coreLeft = [];
      const coreRight = [];

      for (let i = 0; i <= N; i++) {
        const t = i / N;
        const u = 1 - t;
        const u2 = u * u;
        const t2 = t * t;

        // Position on cubic Bezier
        let px = u2 * u * P0.x + 3 * u2 * t * P1.x + 3 * u * t2 * P2.x + t2 * t * P3.x;
        let py = u2 * u * P0.y + 3 * u2 * t * P1.y + 3 * u * t2 * P2.y + t2 * t * P3.y;

        // Micro-organic flow shimmer
        if (i > 0 && i < N) {
          px += Math.sin(elapsed * 0.024 + t * 7) * 1.0;
        }

        // Tangent vector
        const dx = 3 * u2 * (P1.x - P0.x) + 6 * u * t * (P2.x - P1.x) + 3 * t2 * (P3.x - P2.x);
        const dy = 3 * u2 * (P1.y - P0.y) + 6 * u * t * (P2.y - P1.y) + 3 * t2 * (P3.y - P2.y);
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;

        // Natural tapering: elegant at spout lip (3.6px), slender at impact point (1.8px)
        const wOuter = 3.6 * (1 - t * 0.50);
        const wCore = 1.9 * (1 - t * 0.50);

        outerLeft.push(px + nx * wOuter, py + ny * wOuter);
        outerRight.unshift(px - nx * wOuter, py - ny * wOuter);
        coreLeft.push(px + nx * wCore, py + ny * wCore);
        coreRight.unshift(px - nx * wCore, py - ny * wCore);
      }

      const outerPoly = outerLeft.concat(outerRight);
      const corePoly = coreLeft.concat(coreRight);

      // 1. Solid fluid body (outer rich potion color)
      streamGfx.beginFill(color.inner, 0.95);
      streamGfx.drawPolygon(outerPoly);
      streamGfx.endFill();

      // 2. Luminous inner core
      streamGfx.beginFill(color.hex, 0.95);
      streamGfx.drawPolygon(corePoly);
      streamGfx.endFill();

      // 3. Central specular reflection streak
      streamGfx.lineStyle(1.1, 0xffffff, 0.9);
      streamGfx.moveTo(P0.x, P0.y);
      streamGfx.bezierCurveTo(P1.x, P1.y, P2.x, P2.y, P3.x, P3.y);

      // --- 4. Spawn Delicate Luminous Particles ---
      // A. Upward Sparkle Spray (tiny droplets & sparks in potion color)
      if (Math.random() < 0.85) {
        const speed = 2.0 + Math.random() * 2.2;
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.1; // upward cone
        sprayParticles.push({
          x: destX + (Math.random() - 0.5) * 4,
          y: destY - 1,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: 1.2 + Math.random() * 1.2,
          life: 0,
          maxLife: 20 + Math.random() * 12,
          color: Math.random() > 0.25 ? color.glow : color.sparkles
        });
      }

      // B. Submerged micro-bubbles inside liquid under impact
      if (Math.random() < 0.45) {
        const bottomClampY = target.baseY + target.height - 18;
        const spawnY = destY + 3 + Math.random() * 12;
        if (spawnY < bottomClampY) {
          submergedBubbles.push({
            x: destX + (Math.random() - 0.5) * 10,
            y: spawnY,
            vy: -0.6 - Math.random() * 0.8,
            r: 1.0 + Math.random() * 1.2,
            life: 0,
            maxLife: 28 + Math.random() * 14,
            color: color.glow
          });
        }
      }

      // --- 5. Render Fluid Impact Reaction (Clean & Magical, NO white frames) ---
      // A. Soft luminous glow spot on liquid surface
      splashGfx.beginFill(color.glow, 0.35);
      splashGfx.drawEllipse(destX, destY, 11 + Math.sin(elapsed * 0.04) * 2.5, 4);
      splashGfx.endFill();

      splashGfx.beginFill(0xffffff, 0.7);
      splashGfx.drawCircle(destX, destY, 2.0);
      splashGfx.endFill();

      // B. Render submerged rising micro-bubbles
      for (let b = submergedBubbles.length - 1; b >= 0; b--) {
        const mb = submergedBubbles[b];
        mb.life++;
        mb.y += mb.vy;
        mb.x += Math.sin(mb.life * 0.2) * 0.25;
        if (mb.life >= mb.maxLife || mb.y <= destY) {
          submergedBubbles.splice(b, 1);
          continue;
        }
        const bProg = mb.life / mb.maxLife;
        const bAlpha = Math.sin(bProg * Math.PI) * 0.7;
        splashGfx.beginFill(mb.color, bAlpha);
        splashGfx.drawCircle(mb.x, mb.y, mb.r);
        splashGfx.endFill();
      }

      // C. Render fine fountain spray of glowing sparks
      for (let sp = sprayParticles.length - 1; sp >= 0; sp--) {
        const p = sprayParticles[sp];
        p.life++;
        if (p.life >= p.maxLife || (p.vy > 0 && p.y >= destY + 2)) {
          sprayParticles.splice(sp, 1);
          continue;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12; // soft gravitational arc fall
        p.x = Math.max(destX - target.width * 0.38, Math.min(destX + target.width * 0.38, p.x));

        const prog = p.life / p.maxLife;
        const alpha = Math.sin(prog * Math.PI) * 0.9;

        splashGfx.beginFill(p.color, alpha);
        splashGfx.drawCircle(p.x, p.y, p.r);
        splashGfx.endFill();
      }

      // 6. 3D Lip Depth: front half of golden mouth rim renders OVER the stream
      target.drawFrontRimOverlay(splashGfx);

      // Synchronous Drain from Source & Rise in Target
      this.drawLiquids(progress * sourceLayerH * drainAmount, 0, null, currentRot);
      target.drawLiquids(0, progress * targetLayerH * fillAmount, color, 0);

      await new Promise(r => requestAnimationFrame(r));
    }

    streamGfx.clear();
    splashGfx.clear();

    // 4. Finalize layer states
    if (target.isMasterVessel) {
      this.layers = [];
      target.layers.push(colorId);
    } else {
      for (let i = 0; i < amount; i++) {
        this.layers.pop();
        target.layers.push(colorId);
      }
    }

    if (this.hiddenCount > 0 && this.hiddenCount >= this.layers.length) {
      this.hiddenCount = Math.max(0, this.layers.length - 1);
      if (window.soundEngine && typeof window.soundEngine.playChime === 'function') {
        window.soundEngine.playChime();
      }
    }

    // 5. Un-tilt: remaining fluid sloshes back and settles smoothly at bottom
    await this.animateRotationAndFluid(0, 240, pivot);

    // 6. Return flask to resting base position
    await Promise.all([
      this.animateProperty(this.container, "x", this.baseX, 240),
      this.animateProperty(this.container, "y", this.baseY, 240)
    ]);

    target.isReceiving = false;
    this.drawLiquids();
    target.drawLiquids();
  }

  animateProperty(obj, prop, targetVal, duration) {
    return new Promise(resolve => {
      const startVal = obj[prop];
      const startTime = performance.now();

      function step(now) {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        obj[prop] = startVal + (targetVal - startVal) * ease;

        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          obj[prop] = targetVal;
          resolve();
        }
      }
      requestAnimationFrame(step);
    });
  }
}

function initGameEngine() {
  if (!window.gameEngine) {
    window.gameEngine = new GameEngine();
  }
}

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", initGameEngine);
} else {
  initGameEngine();
}



