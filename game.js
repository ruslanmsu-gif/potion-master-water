/**
 * Potion Master: Wizard Sort
 * Realistic Deep Fluid Injection & Dynamic Meniscus Engine (Pixi.js WebGL)
 */

const PALETTE = [
  { id: 0, name: "Ruby Red",      hex: 0xff1744, inner: 0xc50024, glow: 0xff8a80, sparkles: 0xffd54f },
  { id: 1, name: "Emerald Green", hex: 0x00e676, inner: 0x009e3b, glow: 0xb9f6ca, sparkles: 0x69f0ae },
  { id: 2, name: "Sapphire Blue", hex: 0x2979ff, inner: 0x1554c0, glow: 0x82b1ff, sparkles: 0xe0f7fa },
  { id: 3, name: "Amber Gold",    hex: 0xffc400, inner: 0xd97706, glow: 0xffe57f, sparkles: 0xffffff },
  { id: 4, name: "Amethyst",      hex: 0xd500f9, inner: 0x8800cc, glow: 0xea80fc, sparkles: 0xff80ab },
  { id: 5, name: "Cyan Teal",     hex: 0x00e5ff, inner: 0x0088cc, glow: 0x84ffff, sparkles: 0xffffff },
  { id: 6, name: "Orange Magma",  hex: 0xff6d00, inner: 0xbb2200, glow: 0xffab40, sparkles: 0xffeb3b },
  { id: 7, name: "Rose Pink",     hex: 0xff4081, inner: 0xa80045, glow: 0xff80ab, sparkles: 0xffd1dc }
];

const FLASK_CAP = 4;

class GameEngine {
  constructor() {
    this.container = document.getElementById("canvas-container");
    this.currentLevel = 1;
    this.flasks = [];
    this.selectedFlask = null;
    this.isBusy = false;
    this.undoStack = [];

    this.initPixi();
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
      levelSub.textContent = `Novice Alchemist (v29)`;
    }

    // Floating Parchment Recipe HUD Banner
    let recipeBanner = document.getElementById("recipe-banner");
    if (!recipeBanner) {
      recipeBanner = document.createElement("div");
      recipeBanner.id = "recipe-banner";
      this.container.appendChild(recipeBanner);
    }

    if (this.currentRecipe) {
      recipeBanner.innerHTML = `📜 <b>ЦЕЛЬ:</b> Сварить <i>${this.currentRecipe.potionName}</i> (2🔴 + 2🔵)`;
      recipeBanner.classList.remove("hidden");
    } else {
      recipeBanner.classList.add("hidden");
    }

    this.flasksLayer.removeChildren();
    this.flasks = [];

    const levelData = this.generateLevelData(levelNum);
    for (let i = 0; i < levelData.length; i++) {
      const flask = new FlaskView(this, i, levelData[i]);
      if (this.currentRecipe && i === 0) {
        flask.isMasterVessel = true;
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
      rose: 7
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

    if (this.currentRecipe) {
      // 🏰 Recipe Boss Level Layout: Central Master Crucible at top, ingredient flasks in bottom row
      const masterW = Math.min(84, w * 0.24);
      const masterH = masterW * 2.95;

      const sideCount = total - 1;
      const sideW = Math.min(66, (w - 40) / sideCount - 12);
      const sideH = sideW * 2.75;

      const startY = Math.max(78, h * 0.16);

      // Position Master Crucible (Flask 0) in top center
      this.flasks[0].setSize(masterW, masterH);
      this.flasks[0].setBasePosition(w / 2, startY);

      // Position Side Flasks in bottom row
      const spacingX = Math.min(102, (w - 20) / sideCount);
      const sideStartX = (w - (sideCount - 1) * spacingX) / 2;
      const sideY = startY + masterH * 0.65 + 48;

      for (let i = 1; i < total; i++) {
        const targetX = sideStartX + (i - 1) * spacingX;
        this.flasks[i].setSize(sideW, sideH);
        this.flasks[i].setBasePosition(targetX, sideY);
      }
      return;
    }

    let cols = total;
    let rows = 1;
    if (total > 4) {
      cols = Math.ceil(total / 2);
      rows = 2;
    }

    let flaskWidth, flaskHeight, spacingX, spacingY, startX, startY;

    if (rows === 1) {
      flaskWidth = Math.min(76, (w - 40) / cols - 16);
      flaskHeight = flaskWidth * 2.85;
      spacingX = Math.min(108, (w - 20) / cols);
      spacingY = 0;
      startX = (w - (cols - 1) * spacingX) / 2;
      startY = (h - flaskHeight) / 2 + 10;
    } else {
      // 2-row layout adapted for mobile screen:
      // Leave ~70px at top for tilting flask and header, ~25px gap between rows, ~20px before footer
      const maxH = (h - 130) / 2;
      flaskHeight = Math.min(175, Math.max(130, maxH));
      flaskWidth = Math.min(64, flaskHeight / 2.75, (w - 40) / cols - 12);
      flaskHeight = flaskWidth * 2.75;

      spacingX = Math.min(94, (w - 20) / cols);
      spacingY = flaskHeight + 42;

      startX = (w - (cols - 1) * spacingX) / 2;
      startY = Math.max(68, (h - (flaskHeight + spacingY)) / 2 + 15);
    }

    for (let i = 0; i < total; i++) {
      const col = rows === 1 ? i : i % cols;
      const row = rows === 1 ? 0 : Math.floor(i / cols);

      // If the bottom row has fewer flasks, center them horizontally
      let rowStartX = startX;
      if (rows === 2 && row === 1) {
        const bottomCount = total - cols;
        rowStartX = (w - (bottomCount - 1) * spacingX) / 2;
      }

      const targetX = rowStartX + col * spacingX;
      const targetY = startY + row * spacingY;

      this.flasks[i].setSize(flaskWidth, flaskHeight);
      this.flasks[i].setBasePosition(targetX, targetY);
    }
  }

  onFlaskClicked(flask) {
    if (window.soundEngine) window.soundEngine.init();
    if (this.isBusy || flask.isCapped) return;

    if (!this.selectedFlask) {
      if (flask.layers.length > 0) {
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
        if (flask.layers.length > 0) {
          this.selectedFlask = flask;
          flask.setSelected(true);
        } else {
          this.selectedFlask = null;
        }
      }
    }
  }

  async executePour(from, to) {
    this.isBusy = true;

    const amount = from.getAmountToPour(to);
    const colorId = from.topColor();

    this.undoStack.push({
      fromIndex: from.index,
      toIndex: to.index,
      amount: amount,
      colorId: colorId
    });

    await from.pourInto(to, amount, colorId, this.streamLayer, this.splashLayer);

    // If target is master vessel and full: check if recipe completed!
    if (to.isMasterVessel && to.layers.length === FLASK_CAP && !to.isCapped) {
      const rubyCount = to.layers.filter(c => c === 0).length;
      const sapphireCount = to.layers.filter(c => c === 2).length;
      if (rubyCount === 2 && sapphireCount === 2) {
        await to.synthesizePotion();
      } else {
        await to.capFlask();
      }
    } else if (to.isCompletedFull() && !to.isCapped) {
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
    await new Promise(r => setTimeout(r, 950));

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
    nameEl.textContent = color.name;

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

    for (let i = 0; i < last.amount; i++) {
      toFlask.layers.pop();
      fromFlask.layers.push(last.colorId);
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

  bindUI() {
    document.getElementById("btn-restart").addEventListener("click", () => this.restart());
    document.getElementById("btn-undo").addEventListener("click", () => this.undo());
    document.getElementById("btn-next-level").addEventListener("click", () => {
      document.getElementById("win-modal").classList.add("hidden");
      this.loadLevel(this.currentLevel + 1);
    });

    // Developer Admin Quick-Skip controls
    document.getElementById("btn-dev-next")?.addEventListener("click", () => {
      this.loadLevel(this.currentLevel + 1);
    });
    document.getElementById("btn-dev-prev")?.addEventListener("click", () => {
      if (this.currentLevel > 1) {
        this.loadLevel(this.currentLevel - 1);
      }
    });
  }
}

/**
 * High-End Realistic Glass Flask with Deep Fluid Stream Mechanics
 */
class FlaskView {
  constructor(engine, index, initialLayers) {
    this.engine = engine;
    this.index = index;
    this.layers = [...initialLayers];

    this.container = new PIXI.Container();
    this.container.eventMode = 'static';
    this.container.cursor = 'pointer';

    this.container.on('pointerdown', (e) => {
      e.stopPropagation();
      this.engine.onFlaskClicked(this);
    });

    // Sub-layers
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
    const layerH = (this.height - 26) / FLASK_CAP;
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
    if (target.layers.length >= FLASK_CAP) return false;
    if (target.isMasterVessel) return true; // Master Vessel accepts any ingredient!
    if (target.layers.length === 0) return true;
    return this.topColor() === target.topColor();
  }

  getAmountToPour(target) {
    const available = this.topColorCount();
    const free = FLASK_CAP - target.layers.length;
    return Math.min(available, free);
  }

  isSolved() {
    if (this.isMasterVessel) return this.isCapped;
    if (this.layers.length === 0) return true;
    if (this.layers.length < FLASK_CAP) return false;
    const first = this.layers[0];
    return this.layers.every(c => c === first);
  }

  isCompletedFull() {
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
    const r = w / 2; // Perfect tangential semicircle matching wall half-width
    const bottomArcY = h - r - 4;
    const wRim = w * 0.55; // Elegant flared lip (41.8px at top)
    const flareY = 20; // Flare starts smoothly at y=20

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

    // Left Specular Highlight Stripe (cleanly stops before the bottom semicircle curvature)
    gH.lineStyle(3.5, 0xffffff, 0.85);
    gH.moveTo(-w * 0.36, flareY + 2);
    gH.lineTo(-w * 0.36, bottomArcY - 2);

    // Right subtle reflection (cleanly stops before the bottom semicircle curvature)
    gH.lineStyle(1.5, 0xffffff, 0.35);
    gH.moveTo(w * 0.36, flareY + 4);
    gH.lineTo(w * 0.36, bottomArcY - 5);

    this.drawStar(gH, -w * 0.36, flareY + 4, 4, 0xffffff);

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
    // 1. Magical synthesis reaction: color morph into radiant Amethyst/Magenta Master Potion
    this.layers = [4, 4, 4, 4];
    this.drawLiquids();
    this.spawnCapSparkles();
    if (window.soundEngine && typeof window.soundEngine.playFlaskComplete === 'function') {
      window.soundEngine.playFlaskComplete();
    }
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
    this.isCapped = true;

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
    const layerH = (h - 26) / FLASK_CAP;
    const bottomY = h - 8;

    // --- 1. Merge adjacent same-color layers into unified chunks ---
    const chunks = [];
    let curChunk = null;

    for (let i = 0; i < count; i++) {
      const colorId = this.layers[i];
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

    // --- 5. Render each chunk with solid bottom anchoring & seamless parallel boundaries ---
    const xL = -w / 2 - 15;
    const xR = w / 2 + 15;
    const yBottomClamp = h + 60; // Deep clamp into the mask for anatomical rounded glass bottom

    for (let c = 0; c < chunks.length; c++) {
      if (chunkHeights[c] <= 0) continue;

      const color = PALETTE[chunks[c].colorId];
      const isBottomChunk = (c === 0);
      const isTopChunk = (c === topIdx);

      const Y_bot = boundaries[c];
      const Y_top = isTopChunk ? topSurfaceY : boundaries[c + 1];

      // Slanted top boundary
      const yTL = Y_top - xL * slope;
      const yTR = Y_top - xR * slope;

      // Bottom boundary: Chunk 0 is ALWAYS solidly anchored to the glass bottom (clipped by maskGfx).
      // Higher chunks strictly match the top boundary of the chunk below them!
      const yBL = isBottomChunk ? yBottomClamp : (Y_bot - xL * slope);
      const yBR = isBottomChunk ? yBottomClamp : (Y_bot - xR * slope);

      // 1. Solid fluid body
      g.beginFill(color.inner, 0.95);
      g.drawPolygon([xL, yTL, xR, yTR, xR, yBR, xL, yBL]);
      g.endFill();

      // 2. Luminous core
      const coreL = -w * 0.36;
      const coreR = w * 0.36;
      const coreBL = isBottomChunk ? yBottomClamp : (Y_bot - coreL * slope);
      const coreBR = isBottomChunk ? yBottomClamp : (Y_bot - coreR * slope);
      g.beginFill(color.hex, 0.85);
      g.drawPolygon([
        coreL, Y_top - coreL * slope,
        coreR, Y_top - coreR * slope,
        coreR, coreBR,
        coreL, coreBL
      ]);
      g.endFill();

      // 3. Highlight sheen
      const hL = -w * 0.34;
      const hR = -w * 0.16;
      const hBL = isBottomChunk ? yBottomClamp : (Y_bot - hL * slope);
      const hBR = isBottomChunk ? yBottomClamp : (Y_bot - hR * slope);
      g.beginFill(color.glow, 0.35);
      g.drawPolygon([
        hL, Y_top - hL * slope,
        hR, Y_top - hR * slope,
        hR, hBR,
        hL, hBL
      ]);
      g.endFill();

      // 4. Boundary line between DIFFERENT colors
      if (c < chunks.length - 1) {
        g.lineStyle(2, 0xffffff, 0.35);
        g.moveTo(xL, yTL);
        g.lineTo(xR, yTR);
      }

      // 5. Surface meniscus line on top-most fluid layer
      if (isTopChunk && isTilted) {
        g.lineStyle(2.5, 0xffffff, 0.75);
        g.moveTo(xL, yTL);
        g.lineTo(xR, yTR);
      }
    }
  }

  updateVFX(time) {
    const wG = this.waveGfx;
    const sG = this.sparklesGfx;
    wG.clear();
    sG.clear();

    const count = this.layers.length;
    if (count === 0) return;

    // Do not draw resting surface wave while tilted, actively receiving liquid, or capped
    if (Math.abs(this.container.rotation) <= 0.05 && !this.isReceiving && !this.isCapped) {
      const topColor = PALETTE[this.topColor()];
      const w = this.width;
      const h = this.height;
      const layerH = (h - 26) / FLASK_CAP;
      const surfaceY = (h - 8) - count * layerH;

      // Animated gentle wave at the top resting surface
      wG.lineStyle(2.5, 0xffffff, 0.9);
      wG.moveTo(-w / 2, surfaceY);
      for (let x = -w / 2; x <= w / 2; x += 3) {
        const wave = Math.sin(time * 3.5 + x * 0.18) * 2.2;
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
    const layerH = (h - 24) / FLASK_CAP;
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
    const getTiltForLayers = (L) => 0.72 + (FLASK_CAP - L) * 0.17;

    const startLayers = currentLayersCount;
    const endLayers = currentLayersCount - amount;

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
    const layerH = (this.height - 24) / FLASK_CAP;
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
      const curEffectiveLayers = startLayers - progress * amount;
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
      const currentFillAmount = progress * layerH * amount;
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

        // Natural tapering: thicker at spout lip, slender at impact point
        const wOuter = 5.2 * (1 - t * 0.52);
        const wCore = 2.8 * (1 - t * 0.52);

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
      streamGfx.lineStyle(1.6, 0xffffff, 0.9);
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
      this.drawLiquids(progress * layerH * amount, 0, null, currentRot);
      target.drawLiquids(0, progress * layerH * amount, color, 0);

      await new Promise(r => requestAnimationFrame(r));
    }

    streamGfx.clear();
    splashGfx.clear();

    // 4. Finalize layer states
    for (let i = 0; i < amount; i++) {
      this.layers.pop();
      target.layers.push(colorId);
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

window.addEventListener("DOMContentLoaded", () => {
  window.gameEngine = new GameEngine();
});



