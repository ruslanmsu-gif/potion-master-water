// Potion Master: Wizard Sort — Движок с физикой живой воды, пружинными волнами и органической струей

class PotionGame {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentLevelIndex = parseInt(localStorage.getItem('potion_current_level') || '0', 10);
        
        this.flasks = [];
        this.initialState = [];
        this.history = [];
        this.selectedFlaskIndex = null;
        this.isAnimating = false;
        this.hasAddedExtraFlask = false;

        // Пружинные волны для каждой колбы
        this.wavePoints = [];
        this.waveCount = 14;

        // Частицы
        this.bubbles = [];
        this.sparkles = [];
        this.splashParticles = [];
        this.foamRipples = [];
        
        // Текущее состояние переливания
        this.pourAnimation = null;

        this.initDOM();
        this.resize();
        this.loadLevel(this.currentLevelIndex);
        
        window.addEventListener('resize', () => this.resize());
        this.canvas.addEventListener('pointerdown', (e) => this.handlePointerDown(e));
        
        this.lastTime = performance.now();
        requestAnimationFrame((t) => this.loop(t));
    }

    initDOM() {
        this.chapterLabel = document.getElementById('chapter-label');
        this.levelTitle = document.getElementById('level-title');
        this.undoBtn = document.getElementById('undo-btn');
        this.restartBtn = document.getElementById('restart-btn');
        this.addFlaskBtn = document.getElementById('add-flask-btn');
        this.soundBtn = document.getElementById('sound-btn');
        this.victoryModal = document.getElementById('victory-modal');
        this.nextLevelBtn = document.getElementById('next-level-btn');

        this.undoBtn.addEventListener('click', () => this.undo());
        this.restartBtn.addEventListener('click', () => this.restart());
        this.addFlaskBtn.addEventListener('click', () => this.addExtraFlask());
        this.nextLevelBtn.addEventListener('click', () => this.nextLevel());

        this.soundBtn.addEventListener('click', () => {
            const isMuted = window.soundEngine.toggleMute();
            this.soundBtn.textContent = isMuted ? '🔇' : '🔊';
        });
    }

    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        this.width = rect.width;
        this.height = rect.height;
        this.calculateLayout();
    }

    loadLevel(index) {
        let levelData;
        if (index < PRESET_LEVELS.length) {
            levelData = PRESET_LEVELS[index];
        } else {
            levelData = generateSolvableLevel(index + 1);
        }

        this.currentLevelData = levelData;
        this.levelTitle.textContent = levelData.title;
        this.chapterLabel.textContent = levelData.chapter;
        
        this.flasks = levelData.flasks.map(f => [...f]);
        this.initialState = levelData.flasks.map(f => [...f]);
        this.history = [];
        this.selectedFlaskIndex = null;
        this.isAnimating = false;
        this.hasAddedExtraFlask = false;
        this.addFlaskBtn.disabled = false;
        this.undoBtn.disabled = true;

        this.initWaves();
        this.initBubbles();
        this.calculateLayout();
        this.victoryModal.classList.remove('active');
    }

    initWaves() {
        this.wavePoints = [];
        for (let i = 0; i < this.flasks.length; i++) {
            const pts = [];
            for (let j = 0; j < this.waveCount; j++) {
                pts.push({ y: 0, vy: 0 });
            }
            this.wavePoints.push(pts);
        }
    }

    initBubbles() {
        this.bubbles = [];
        for (let i = 0; i < 50; i++) {
            this.bubbles.push({
                xOffsetRatio: (Math.random() - 0.5) * 0.72,
                yProgress: Math.random(),
                radius: 1.4 + Math.random() * 2.4,
                speed: 0.002 + Math.random() * 0.005,
                wobbleSpeed: 2 + Math.random() * 3.5,
                wobblePhase: Math.random() * Math.PI * 2
            });
        }
    }

    calculateLayout() {
        const total = this.flasks.length;
        this.layout = [];

        let row1Count, row2Count;
        if (total <= 4) {
            row1Count = total;
            row2Count = 0;
        } else if (total === 5) {
            row1Count = 3;
            row2Count = 2;
        } else if (total === 6) {
            row1Count = 3;
            row2Count = 3;
        } else if (total === 7) {
            row1Count = 4;
            row2Count = 3;
        } else {
            row1Count = Math.ceil(total / 2);
            row2Count = Math.floor(total / 2);
        }

        const maxInRow = Math.max(row1Count, row2Count);
        const availableWidth = this.width * 0.88;
        const flaskW = Math.min(64, availableWidth / (maxInRow + 0.4));
        const flaskH = flaskW * 2.85;

        const startY1 = row2Count > 0 ? this.height * 0.35 : this.height * 0.52;
        const startY2 = this.height * 0.72;

        for (let i = 0; i < total; i++) {
            const isRow1 = i < row1Count;
            const rowIndex = isRow1 ? i : (i - row1Count);
            const countInThisRow = isRow1 ? row1Count : row2Count;

            const spacing = availableWidth / countInThisRow;
            const centerX = (this.width - availableWidth) / 2 + spacing * (rowIndex + 0.5);
            const centerY = isRow1 ? startY1 : startY2;

            this.layout.push({
                x: centerX,
                y: centerY,
                w: flaskW,
                h: flaskH,
                offsetY: 0,
                angle: 0
            });
        }
    }

    handlePointerDown(e) {
        if (this.isAnimating) return;
        window.soundEngine.init();

        const rect = this.canvas.getBoundingClientRect();
        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;

        let clickedIdx = -1;
        for (let i = 0; i < this.layout.length; i++) {
            const b = this.layout[i];
            const left = b.x - b.w / 2 - 10;
            const right = b.x + b.w / 2 + 10;
            const top = b.y - b.h / 2 - 25;
            const bottom = b.y + b.h / 2 + 15;

            if (clientX >= left && clientX <= right && clientY >= top && clientY <= bottom) {
                clickedIdx = i;
                break;
            }
        }

        if (clickedIdx === -1) {
            if (this.selectedFlaskIndex !== null) {
                this.selectedFlaskIndex = null;
                window.soundEngine.playClick();
            }
            return;
        }

        if (this.selectedFlaskIndex === null) {
            if (this.flasks[clickedIdx].length > 0) {
                this.selectedFlaskIndex = clickedIdx;
                this.disturbWaves(clickedIdx, 8);
                window.soundEngine.playSelect();
            }
        } else if (this.selectedFlaskIndex === clickedIdx) {
            this.selectedFlaskIndex = null;
            this.disturbWaves(clickedIdx, 4);
            window.soundEngine.playClick();
        } else {
            this.tryPour(this.selectedFlaskIndex, clickedIdx);
        }
    }

    disturbWaves(flaskIdx, power) {
        if (!this.wavePoints[flaskIdx]) return;
        const pts = this.wavePoints[flaskIdx];
        const mid = Math.floor(pts.length / 2);
        pts[mid].vy -= power;
        if (mid > 0) pts[mid - 1].vy -= power * 0.7;
        if (mid < pts.length - 1) pts[mid + 1].vy -= power * 0.7;
    }

    tryPour(fromIdx, toIdx) {
        const fromFlask = this.flasks[fromIdx];
        const toFlask = this.flasks[toIdx];

        if (fromFlask.length === 0) {
            this.selectedFlaskIndex = null;
            return;
        }

        if (toFlask.length >= FLASK_CAPACITY) {
            this.selectedFlaskIndex = toIdx;
            window.soundEngine.playSelect();
            return;
        }

        const topColorFrom = fromFlask[fromFlask.length - 1];

        if (toFlask.length === 0 || toFlask[toFlask.length - 1] === topColorFrom) {
            let countMatching = 0;
            for (let i = fromFlask.length - 1; i >= 0; i--) {
                if (fromFlask[i] === topColorFrom) countMatching++;
                else break;
            }

            const freeSpace = FLASK_CAPACITY - toFlask.length;
            const amountToPour = Math.min(countMatching, freeSpace);

            if (amountToPour > 0) {
                this.saveHistory();
                this.startPourAnimation(fromIdx, toIdx, amountToPour, topColorFrom);
                this.selectedFlaskIndex = null;
                return;
            }
        }

        if (toFlask.length > 0) {
            this.selectedFlaskIndex = toIdx;
            this.disturbWaves(toIdx, 6);
            window.soundEngine.playSelect();
        } else {
            this.selectedFlaskIndex = null;
            window.soundEngine.playClick();
        }
    }

    startPourAnimation(fromIdx, toIdx, count, colorId) {
        this.isAnimating = true;
        const fromBox = this.layout[fromIdx];
        const toBox = this.layout[toIdx];

        const isTargetToRight = toBox.x >= fromBox.x;
        const targetAngle = isTargetToRight ? 1.38 : -1.38;

        const neckOffsetLocalX = isTargetToRight ? (fromBox.w * 0.22) : -(fromBox.w * 0.22);
        const neckOffsetLocalY = -fromBox.h * 0.5;

        const rotatedLipX = neckOffsetLocalX * Math.cos(targetAngle) - neckOffsetLocalY * Math.sin(targetAngle);
        const rotatedLipY = neckOffsetLocalX * Math.sin(targetAngle) + neckOffsetLocalY * Math.cos(targetAngle);

        const targetLipX = toBox.x + (isTargetToRight ? -fromBox.w * 0.25 : fromBox.w * 0.25);
        const targetLipY = toBox.y - toBox.h * 0.5 - 14;

        const pourX = targetLipX - rotatedLipX;
        const pourY = targetLipY - rotatedLipY;

        this.pourAnimation = {
            fromIdx,
            toIdx,
            count,
            colorId,
            originX: fromBox.x,
            originY: fromBox.y,
            pourX,
            pourY,
            targetAngle,
            progress: 0,
            phase: 'move',
            streamActive: false,
            pourFraction: 0
        };

        window.soundEngine.startPour();
    }

    saveHistory() {
        this.history.push(this.flasks.map(f => [...f]));
        this.undoBtn.disabled = false;
    }

    undo() {
        if (this.isAnimating || this.history.length === 0) return;
        this.flasks = this.history.pop();
        this.selectedFlaskIndex = null;
        if (this.history.length === 0) this.undoBtn.disabled = true;
        window.soundEngine.playClick();
    }

    restart() {
        if (this.isAnimating) return;
        this.flasks = this.initialState.map(f => [...f]);
        this.history = [];
        this.selectedFlaskIndex = null;
        this.undoBtn.disabled = true;
        window.soundEngine.playClick();
    }

    addExtraFlask() {
        if (this.hasAddedExtraFlask || this.isAnimating) return;
        this.saveHistory();
        this.flasks.push([]);
        this.hasAddedExtraFlask = true;
        this.addFlaskBtn.disabled = true;
        this.calculateLayout();
        this.initWaves();
        window.soundEngine.playFlaskComplete();
    }

    checkWinCondition() {
        for (let flask of this.flasks) {
            if (flask.length === 0) continue;
            if (flask.length !== FLASK_CAPACITY) return false;
            const firstColor = flask[0];
            for (let i = 1; i < flask.length; i++) {
                if (flask[i] !== firstColor) return false;
            }
        }
        return true;
    }

    triggerVictory() {
        this.isAnimating = true;
        window.soundEngine.playLevelWin();

        for (let i = 0; i < 80; i++) {
            this.sparkles.push({
                x: this.width * (0.2 + Math.random() * 0.6),
                y: this.height * (0.3 + Math.random() * 0.4),
                vx: (Math.random() - 0.5) * 7,
                vy: (Math.random() - 0.5) * 7 - 2.5,
                radius: 2 + Math.random() * 3.5,
                color: Math.random() > 0.5 ? '#ffd166' : '#9d4edd',
                alpha: 1,
                decay: 0.014 + Math.random() * 0.02
            });
        }

        setTimeout(() => {
            this.victoryModal.classList.add('active');
            this.isAnimating = false;
        }, 900);
    }

    nextLevel() {
        this.currentLevelIndex++;
        localStorage.setItem('potion_current_level', this.currentLevelIndex.toString());
        this.loadLevel(this.currentLevelIndex);
    }

    loop(currentTime) {
        const dt = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        this.update(dt);
        this.render();

        requestAnimationFrame((t) => this.loop(t));
    }

    update(dt) {
        // 1. Симуляция пружинных волн
        const k = 0.035;
        const damping = 0.045;
        const spread = 0.28;

        for (let f = 0; f < this.wavePoints.length; f++) {
            const pts = this.wavePoints[f];
            if (!pts) continue;

            for (let i = 0; i < pts.length; i++) {
                const force = -k * pts[i].y - pts[i].vy * damping;
                pts[i].vy += force;
                pts[i].y += pts[i].vy;
            }

            for (let pass = 0; pass < 2; pass++) {
                for (let i = 0; i < pts.length; i++) {
                    if (i > 0) {
                        const dL = spread * (pts[i].y - pts[i - 1].y);
                        pts[i - 1].vy += dL;
                        pts[i - 1].y += dL;
                    }
                    if (i < pts.length - 1) {
                        const dR = spread * (pts[i].y - pts[i + 1].y);
                        pts[i + 1].vy += dR;
                        pts[i + 1].y += dR;
                    }
                }
            }
        }

        // 2. Анимация переливания
        if (this.pourAnimation) {
            const p = this.pourAnimation;
            const fromBox = this.layout[p.fromIdx];

            if (p.phase === 'move') {
                p.progress += dt * 4.2;
                if (p.progress >= 1) {
                    p.progress = 1;
                    p.phase = 'pouring';
                    p.pourTimer = 0;
                    p.pourFraction = 0;
                    p.streamActive = true;
                }
                const ease = p.progress * p.progress * (3 - 2 * p.progress);
                fromBox.x = p.originX + (p.pourX - p.originX) * ease;
                fromBox.y = p.originY + (p.pourY - p.originY) * ease;
                fromBox.angle = p.targetAngle * ease;
            } else if (p.phase === 'pouring') {
                p.pourTimer = (p.pourTimer || 0) + dt;
                const duration = 0.5 * p.count;
                p.pourFraction = Math.min(1, p.pourTimer / duration);

                if (Math.random() < 0.4) {
                    this.disturbWaves(p.toIdx, 2.5);
                }

                const toBox = this.layout[p.toIdx];
                const currentHeight = (this.flasks[p.toIdx].length + p.pourFraction * p.count) * (toBox.h * 0.78 / FLASK_CAPACITY);
                const impactY = toBox.y + toBox.h * 0.5 - Math.max(12, currentHeight);

                if (Math.random() < 0.5) {
                    this.splashParticles.push({
                        x: toBox.x + (Math.random() - 0.5) * 16,
                        y: impactY,
                        vx: (Math.random() - 0.5) * 3,
                        vy: -2 - Math.random() * 2.5,
                        radius: 1.5 + Math.random() * 2.5,
                        color: POTION_PALETTE[p.colorId].topColor,
                        alpha: 1,
                        decay: 0.055
                    });
                }

                if (Math.random() < 0.25) {
                    this.foamRipples.push({
                        x: toBox.x,
                        y: impactY,
                        rx: 4,
                        ry: 1.5,
                        maxR: 18,
                        alpha: 0.8,
                        color: POTION_PALETTE[p.colorId].topColor
                    });
                }

                if (p.pourTimer >= duration) {
                    p.phase = 'return';
                    p.streamActive = false;
                    p.progress = 0;
                    window.soundEngine.stopPour();

                    for (let i = 0; i < p.count; i++) {
                        if (this.flasks[p.fromIdx].length > 0) {
                            const liquid = this.flasks[p.fromIdx].pop();
                            this.flasks[p.toIdx].push(liquid);
                        }
                    }

                    const toFlask = this.flasks[p.toIdx];
                    if (toFlask.length === FLASK_CAPACITY && toFlask.every(c => c === toFlask[0])) {
                        window.soundEngine.playFlaskComplete();
                        this.disturbWaves(p.toIdx, 15);
                    }

                    if (this.checkWinCondition()) {
                        this.triggerVictory();
                    }
                }
            } else if (p.phase === 'return') {
                p.progress += dt * 4.2;
                if (p.progress >= 1) {
                    fromBox.x = p.originX;
                    fromBox.y = p.originY;
                    fromBox.angle = 0;
                    this.pourAnimation = null;
                    if (!this.checkWinCondition()) {
                        this.isAnimating = false;
                    }
                } else {
                    const rev = 1 - p.progress;
                    const ease = rev * rev * (3 - 2 * rev);
                    fromBox.x = p.originX + (p.pourX - p.originX) * ease;
                    fromBox.y = p.originY + (p.pourY - p.originY) * ease;
                    fromBox.angle = p.targetAngle * ease;
                }
            }
        }

        for (let i = 0; i < this.layout.length; i++) {
            const b = this.layout[i];
            if (this.pourAnimation && (i === this.pourAnimation.fromIdx)) continue;
            const isSelected = (this.selectedFlaskIndex === i);
            const targetOffsetY = isSelected ? -22 : 0;
            b.offsetY += (targetOffsetY - b.offsetY) * (dt * 12);
        }

        for (let i = this.sparkles.length - 1; i >= 0; i--) {
            const sp = this.sparkles[i];
            sp.x += sp.vx;
            sp.y += sp.vy;
            sp.alpha -= sp.decay;
            if (sp.alpha <= 0) this.sparkles.splice(i, 1);
        }

        for (let i = this.splashParticles.length - 1; i >= 0; i--) {
            const sp = this.splashParticles[i];
            sp.x += sp.vx;
            sp.y += sp.vy;
            sp.alpha -= sp.decay;
            if (sp.alpha <= 0) this.splashParticles.splice(i, 1);
        }

        for (let i = this.foamRipples.length - 1; i >= 0; i--) {
            const r = this.foamRipples[i];
            r.rx += dt * 35;
            r.ry += dt * 12;
            r.alpha -= dt * 1.5;
            if (r.alpha <= 0 || r.rx > r.maxR) this.foamRipples.splice(i, 1);
        }
    }

    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        for (let i = 0; i < this.layout.length; i++) {
            if (this.pourAnimation && i === this.pourAnimation.fromIdx) continue;
            const b = this.layout[i];
            
            let dynamicFill = 0;
            let dynamicColor = null;
            if (this.pourAnimation && i === this.pourAnimation.toIdx && this.pourAnimation.phase === 'pouring') {
                dynamicFill = this.pourAnimation.pourFraction * this.pourAnimation.count;
                dynamicColor = this.pourAnimation.colorId;
            }

            this.drawRealisticFlask(i, b.x, b.y + b.offsetY, b.w, b.h, this.flasks[i], b.angle, i === this.selectedFlaskIndex, dynamicFill, dynamicColor);
        }

        if (this.pourAnimation && this.pourAnimation.streamActive) {
            this.drawRealisticStream();
        }

        if (this.pourAnimation) {
            const p = this.pourAnimation;
            const b = this.layout[p.fromIdx];
            let dynamicDrain = 0;
            if (p.phase === 'pouring') {
                dynamicDrain = p.pourFraction * p.count;
            }
            this.drawRealisticFlask(p.fromIdx, b.x, b.y, b.w, b.h, this.flasks[p.fromIdx], b.angle, false, -dynamicDrain, p.colorId);
        }

        this.drawParticles();
    }

    drawRealisticFlask(flaskIdx, x, y, w, h, layers, angle, isSelected, dynamicVolumeChange = 0, dynamicColorId = null) {
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(x, y);
        if (angle) ctx.rotate(angle);

        const halfW = w / 2;
        const halfH = h / 2;
        const neckW = w * 0.44;
        const neckH = h * 0.22;
        const radius = w * 0.3;

        if (!angle) {
            ctx.save();
            ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
            ctx.beginPath();
            ctx.ellipse(0, halfH + 9, halfW * 0.88, 8, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        ctx.save();
        this.createFlaskPath(ctx, halfW, halfH, neckW, neckH, radius);
        ctx.clip();

        const segH = (h - neckH) / FLASK_CAPACITY;
        const bodyBottom = halfH;

        let displayLayers = [...layers];
        let fractionalTopHeight = 1.0;

        if (dynamicVolumeChange < 0) {
            const drainCount = -dynamicVolumeChange;
            const fullDrops = Math.floor(drainCount);
            const partial = drainCount - fullDrops;
            for (let k = 0; k < fullDrops; k++) {
                if (displayLayers.length > 0) displayLayers.pop();
            }
            fractionalTopHeight = Math.max(0, 1.0 - partial);
        } else if (dynamicVolumeChange > 0) {
            const addCount = dynamicVolumeChange;
            const fullAdds = Math.floor(addCount);
            const partial = addCount - fullAdds;
            for (let k = 0; k < fullAdds; k++) {
                displayLayers.push(dynamicColorId);
            }
            if (partial > 0) {
                displayLayers.push(dynamicColorId);
                fractionalTopHeight = partial;
            }
        }

        if (angle) {
            this.drawTiltedLiquidDrop(ctx, halfW, halfH, neckW, neckH, displayLayers, fractionalTopHeight);
        } else {
            for (let i = 0; i < displayLayers.length; i++) {
                const isTopLayer = (i === displayLayers.length - 1);
                const curSegH = (isTopLayer && fractionalTopHeight < 1.0) ? (segH * fractionalTopHeight) : segH;
                const colorId = displayLayers[i];
                const potion = POTION_PALETTE[colorId] || POTION_PALETTE.ruby;

                const yBottom = bodyBottom - i * segH;
                const yTop = yBottom - curSegH;

                const grad = ctx.createLinearGradient(0, yTop, 0, yBottom);
                grad.addColorStop(0, potion.topColor);
                grad.addColorStop(0.7, potion.bottomColor);
                grad.addColorStop(1, '#050208');

                ctx.fillStyle = grad;
                ctx.fillRect(-halfW - 5, yTop, w + 10, curSegH + 1);

                const coreGrad = ctx.createRadialGradient(0, yTop + curSegH * 0.5, 2, 0, yTop + curSegH * 0.5, halfW);
                coreGrad.addColorStop(0, potion.glowColor);
                coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = coreGrad;
                ctx.fillRect(-halfW - 5, yTop, w + 10, curSegH + 1);

                this.drawBubblesInLayer(ctx, -halfW, halfW, yTop, yBottom, potion.bubbleColor);

                if (isTopLayer) {
                    this.drawSpringWaveSurface(ctx, flaskIdx, -halfW * 0.88, halfW * 0.88, yTop, potion);
                }
            }
        }

        ctx.restore();

        ctx.save();
        this.createFlaskPath(ctx, halfW, halfH, neckW, neckH, radius);
        
        const glassGrad = ctx.createLinearGradient(-halfW, 0, halfW, 0);
        glassGrad.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
        glassGrad.addColorStop(0.2, 'rgba(255, 255, 255, 0.02)');
        glassGrad.addColorStop(0.8, 'rgba(0, 0, 0, 0.05)');
        glassGrad.addColorStop(1, 'rgba(255, 255, 255, 0.08)');
        ctx.fillStyle = glassGrad;
        ctx.fill();

        if (isSelected) {
            ctx.strokeStyle = '#ffd166';
            ctx.lineWidth = 3.5;
            ctx.shadowColor = '#ffd166';
            ctx.shadowBlur = 18;
        } else {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
            ctx.lineWidth = 2.2;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
            ctx.shadowBlur = 5;
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-halfW + 6, -halfH + neckH + 14);
        ctx.lineTo(-halfW + 6, halfH - radius);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(halfW - 6, -halfH + neckH + 16);
        ctx.lineTo(halfW - 6, halfH - radius);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(0, -halfH, neckW / 2 + 2, 4.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
        ctx.restore();
    }

    createFlaskPath(ctx, halfW, halfH, neckW, neckH, radius) {
        ctx.beginPath();
        ctx.moveTo(-neckW / 2, -halfH);
        ctx.lineTo(neckW / 2, -halfH);
        ctx.lineTo(neckW / 2, -halfH + neckH);
        ctx.lineTo(halfW, -halfH + neckH + 12);
        ctx.lineTo(halfW, halfH - radius);
        ctx.arcTo(halfW, halfH, halfW - radius, halfH, radius);
        ctx.lineTo(-halfW + radius, halfH);
        ctx.arcTo(-halfW, halfH, -halfW, halfH - radius, radius);
        ctx.lineTo(-halfW, -halfH + neckH + 12);
        ctx.lineTo(-neckW / 2, -halfH + neckH);
        ctx.closePath();
    }

    drawTiltedLiquidDrop(ctx, halfW, halfH, neckW, neckH, layers, fractionalTopHeight) {
        if (layers.length === 0) return;
        const totalAmount = Math.max(0.2, (layers.length - 1 + fractionalTopHeight) / FLASK_CAPACITY);
        const topColorId = layers[layers.length - 1];
        const potion = POTION_PALETTE[topColorId] || POTION_PALETTE.ruby;

        ctx.save();
        ctx.beginPath();
        
        ctx.moveTo(neckW / 2, -halfH);
        ctx.lineTo(halfW, -halfH + neckH + 12);
        ctx.lineTo(halfW, halfH - 10);
        ctx.quadraticCurveTo(halfW * (1 - totalAmount * 0.8), halfH, -halfW * (totalAmount * 0.5), halfH * 0.3);
        ctx.quadraticCurveTo(halfW * 0.1, -halfH * 0.2, 0, -halfH);
        ctx.closePath();

        const dropGrad = ctx.createRadialGradient(halfW * 0.4, 0, 5, halfW * 0.2, 0, halfW * 1.5);
        dropGrad.addColorStop(0, potion.topColor);
        dropGrad.addColorStop(0.6, potion.bottomColor);
        dropGrad.addColorStop(1, '#050208');
        ctx.fillStyle = dropGrad;
        ctx.fill();

        ctx.fillStyle = potion.glowColor;
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(-halfW * (totalAmount * 0.5), halfH * 0.3);
        ctx.quadraticCurveTo(halfW * 0.1, -halfH * 0.2, 0, -halfH);
        ctx.stroke();

        ctx.restore();
    }

    drawSpringWaveSurface(ctx, flaskIdx, leftX, rightX, baseY, potion) {
        const pts = this.wavePoints[flaskIdx] || [];
        const count = pts.length;
        if (count < 2) return;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(leftX, baseY + (pts[0] ? pts[0].y : 0));

        const step = (rightX - leftX) / (count - 1);
        for (let i = 1; i < count; i++) {
            const px = leftX + i * step;
            const py = baseY + pts[i].y;
            const prevX = leftX + (i - 1) * step;
            const prevY = baseY + pts[i - 1].y;
            const cx = (prevX + px) / 2;
            const cy = (prevY + py) / 2;
            ctx.quadraticCurveTo(prevX, prevY, cx, cy);
        }
        ctx.lineTo(rightX, baseY + (pts[count - 1] ? pts[count - 1].y : 0));
        ctx.lineTo(rightX, baseY + 10);
        ctx.lineTo(leftX, baseY + 10);
        ctx.closePath();
        ctx.fillStyle = potion.topColor;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(leftX, baseY + (pts[0] ? pts[0].y : 0));
        for (let i = 1; i < count; i++) {
            const px = leftX + i * step;
            const py = baseY + pts[i].y;
            const prevX = leftX + (i - 1) * step;
            const prevY = baseY + pts[i - 1].y;
            const cx = (prevX + px) / 2;
            const cy = (prevY + py) / 2;
            ctx.quadraticCurveTo(prevX, prevY, cx, cy);
        }
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.lineWidth = 2.2;
        ctx.stroke();

        ctx.restore();
    }

    drawBubblesInLayer(ctx, left, right, top, bottom, color) {
        const time = performance.now() * 0.001;
        ctx.fillStyle = color;
        for (let i = 0; i < 3; i++) {
            const b = this.bubbles[i];
            const curY = bottom - ((b.yProgress + time * b.speed) % 1) * (bottom - top);
            const curX = (left + right) / 2 + b.xOffsetRatio * (right - left) + Math.sin(time * b.wobbleSpeed + b.wobblePhase) * 3;
            ctx.beginPath();
            ctx.arc(curX, curY, b.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    drawRealisticStream() {
        const ctx = this.ctx;
        const p = this.pourAnimation;
        const fromBox = this.layout[p.fromIdx];
        const toBox = this.layout[p.toIdx];
        const potion = POTION_PALETTE[p.colorId] || POTION_PALETTE.ruby;

        const isTargetToRight = toBox.x >= fromBox.x;
        const lipLocalX = isTargetToRight ? (fromBox.w * 0.22) : -(fromBox.w * 0.22);
        const lipLocalY = -fromBox.h * 0.5;

        const startX = fromBox.x + lipLocalX * Math.cos(fromBox.angle) - lipLocalY * Math.sin(fromBox.angle);
        const startY = fromBox.y + lipLocalX * Math.sin(fromBox.angle) + lipLocalY * Math.cos(fromBox.angle);

        const targetX = toBox.x;
        const currentHeight = (this.flasks[p.toIdx].length + p.pourFraction * p.count) * (toBox.h * 0.78 / FLASK_CAPACITY);
        const targetY = toBox.y + toBox.h * 0.5 - Math.max(12, currentHeight);

        const cpX = startX + (targetX - startX) * 0.25;
        const cpY = Math.min(startY, targetY) - 18;

        ctx.save();

        const startW = 15;
        const endW = 7.5;

        ctx.beginPath();
        ctx.moveTo(startX - startW / 2, startY);
        ctx.quadraticCurveTo(cpX - endW / 2, cpY, targetX - endW / 2, targetY);
        ctx.lineTo(targetX + endW / 2, targetY);
        ctx.quadraticCurveTo(cpX + endW / 2, cpY, startX + startW / 2, startY);
        ctx.closePath();

        const streamGrad = ctx.createLinearGradient(startX, startY, targetX, targetY);
        streamGrad.addColorStop(0, potion.topColor);
        streamGrad.addColorStop(0.5, potion.bottomColor);
        streamGrad.addColorStop(1, potion.topColor);

        ctx.fillStyle = streamGrad;
        ctx.shadowColor = potion.topColor;
        ctx.shadowBlur = 18;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(cpX, cpY, targetX, targetY);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.lineWidth = 2.8;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.restore();
    }

    drawParticles() {
        const ctx = this.ctx;

        for (let sp of this.sparkles) {
            ctx.save();
            ctx.fillStyle = sp.color;
            ctx.globalAlpha = sp.alpha;
            ctx.shadowColor = sp.color;
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        for (let sp of this.splashParticles) {
            ctx.save();
            ctx.fillStyle = sp.color;
            ctx.globalAlpha = sp.alpha;
            ctx.shadowColor = sp.color;
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        for (let r of this.foamRipples) {
            ctx.save();
            ctx.strokeStyle = r.color;
            ctx.globalAlpha = r.alpha;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.ellipse(r.x, r.y, r.rx, r.ry, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.game = new PotionGame();
});
