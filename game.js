// Potion Master: Wizard Sort — Игровой движок с улучшенной физикой переливания и горизонтом жидкости

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

        // Частицы
        this.bubbles = [];
        this.sparkles = [];
        this.splashParticles = [];
        
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

        this.initBubbles();
        this.calculateLayout();
        this.victoryModal.classList.remove('active');
    }

    initBubbles() {
        this.bubbles = [];
        for (let i = 0; i < 45; i++) {
            this.bubbles.push({
                xOffsetRatio: (Math.random() - 0.5) * 0.7,
                yProgress: Math.random(),
                radius: 1.5 + Math.random() * 2.2,
                speed: 0.002 + Math.random() * 0.004,
                wobbleSpeed: 2 + Math.random() * 3,
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
        const flaskW = Math.min(62, availableWidth / (maxInRow + 0.4));
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
                window.soundEngine.playSelect();
            }
        } else if (this.selectedFlaskIndex === clickedIdx) {
            this.selectedFlaskIndex = null;
            window.soundEngine.playClick();
        } else {
            this.tryPour(this.selectedFlaskIndex, clickedIdx);
        }
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
        // Угол наклона: 75 градусов (1.31 радиан)
        const targetAngle = isTargetToRight ? 1.35 : -1.35;

        // Рассчитываем позицию, чтобы горлышко верхней колбы зависало прямо над горлышком целевой колбы
        const neckOffsetLocalX = isTargetToRight ? (fromBox.w * 0.2) : -(fromBox.w * 0.2);
        const neckOffsetLocalY = -fromBox.h * 0.5;

        // Поворот точки горлышка
        const rotatedLipX = neckOffsetLocalX * Math.cos(targetAngle) - neckOffsetLocalY * Math.sin(targetAngle);
        const rotatedLipY = neckOffsetLocalX * Math.sin(targetAngle) + neckOffsetLocalY * Math.cos(targetAngle);

        // Горлышко целевой колбы
        const targetLipX = toBox.x + (isTargetToRight ? -fromBox.w * 0.22 : fromBox.w * 0.22);
        const targetLipY = toBox.y - toBox.h * 0.5 - 12;

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
            phase: 'move', // move -> pouring -> return
            streamActive: false,
            pourFraction: 0 // 0..1 плавный объем перелива
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

        for (let i = 0; i < 75; i++) {
            this.sparkles.push({
                x: this.width * (0.2 + Math.random() * 0.6),
                y: this.height * (0.3 + Math.random() * 0.4),
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6 - 2,
                radius: 2 + Math.random() * 3,
                color: Math.random() > 0.5 ? '#ffd166' : '#9d4edd',
                alpha: 1,
                decay: 0.015 + Math.random() * 0.02
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
        if (this.pourAnimation) {
            const p = this.pourAnimation;
            const fromBox = this.layout[p.fromIdx];

            if (p.phase === 'move') {
                p.progress += dt * 4.0;
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
                const duration = 0.45 * p.count;
                p.pourFraction = Math.min(1, p.pourTimer / duration);

                // Создаем брызги и пену в горлышке целевой колбы
                if (Math.random() < 0.6) {
                    const toBox = this.layout[p.toIdx];
                    this.splashParticles.push({
                        x: toBox.x + (Math.random() - 0.5) * 12,
                        y: toBox.y + toBox.h * 0.5 - (this.flasks[p.toIdx].length + p.pourFraction * p.count) * (toBox.h * 0.78 / FLASK_CAPACITY),
                        vx: (Math.random() - 0.5) * 2,
                        vy: -1 - Math.random() * 2,
                        radius: 1.5 + Math.random() * 2,
                        color: POTION_PALETTE[p.colorId].topColor,
                        alpha: 1,
                        decay: 0.05
                    });
                }

                if (p.pourTimer >= duration) {
                    p.phase = 'return';
                    p.streamActive = false;
                    p.progress = 0;
                    window.soundEngine.stopPour();

                    // Фактически переносим слои
                    for (let i = 0; i < p.count; i++) {
                        if (this.flasks[p.fromIdx].length > 0) {
                            const liquid = this.flasks[p.fromIdx].pop();
                            this.flasks[p.toIdx].push(liquid);
                        }
                    }

                    // Проверяем заполнение
                    const toFlask = this.flasks[p.toIdx];
                    if (toFlask.length === FLASK_CAPACITY && toFlask.every(c => c === toFlask[0])) {
                        window.soundEngine.playFlaskComplete();
                    }

                    if (this.checkWinCondition()) {
                        this.triggerVictory();
                    }
                }
            } else if (p.phase === 'return') {
                p.progress += dt * 4.0;
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

        // Плавный подъем выбранной колбы
        for (let i = 0; i < this.layout.length; i++) {
            const b = this.layout[i];
            if (this.pourAnimation && (i === this.pourAnimation.fromIdx)) continue;
            const isSelected = (this.selectedFlaskIndex === i);
            const targetOffsetY = isSelected ? -20 : 0;
            b.offsetY += (targetOffsetY - b.offsetY) * (dt * 12);
        }

        // Обновление искр
        for (let i = this.sparkles.length - 1; i >= 0; i--) {
            const sp = this.sparkles[i];
            sp.x += sp.vx;
            sp.y += sp.vy;
            sp.alpha -= sp.decay;
            if (sp.alpha <= 0) this.sparkles.splice(i, 1);
        }

        // Обновление брызг
        for (let i = this.splashParticles.length - 1; i >= 0; i--) {
            const sp = this.splashParticles[i];
            sp.x += sp.vx;
            sp.y += sp.vy;
            sp.alpha -= sp.decay;
            if (sp.alpha <= 0) this.splashParticles.splice(i, 1);
        }
    }

    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Рисуем неподвижные колбы
        for (let i = 0; i < this.layout.length; i++) {
            if (this.pourAnimation && i === this.pourAnimation.fromIdx) continue;
            const b = this.layout[i];
            
            // Если в целевую колбу льется жидкость, рассчитываем динамический уровень
            let dynamicFill = 0;
            let dynamicColor = null;
            if (this.pourAnimation && i === this.pourAnimation.toIdx && this.pourAnimation.phase === 'pouring') {
                dynamicFill = this.pourAnimation.pourFraction * this.pourAnimation.count;
                dynamicColor = this.pourAnimation.colorId;
            }

            this.drawFlask(b.x, b.y + b.offsetY, b.w, b.h, this.flasks[i], b.angle, i === this.selectedFlaskIndex, dynamicFill, dynamicColor);
        }

        // Рисуем струю жидкости
        if (this.pourAnimation && this.pourAnimation.streamActive) {
            this.drawPourStream();
        }

        // Рисуем наклоненную колбу поверх остальных
        if (this.pourAnimation) {
            const p = this.pourAnimation;
            const b = this.layout[p.fromIdx];
            let dynamicDrain = 0;
            if (p.phase === 'pouring') {
                dynamicDrain = p.pourFraction * p.count;
            }
            this.drawFlask(b.x, b.y, b.w, b.h, this.flasks[p.fromIdx], b.angle, false, -dynamicDrain, p.colorId);
        }

        // Брызги и искры
        this.drawParticles();
    }

    drawFlask(x, y, w, h, layers, angle, isSelected, dynamicVolumeChange = 0, dynamicColorId = null) {
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(x, y);
        if (angle) ctx.rotate(angle);

        const halfW = w / 2;
        const halfH = h / 2;
        const neckW = w * 0.44;
        const neckH = h * 0.22;
        const radius = w * 0.28;

        // 1. Тень
        if (!angle) {
            ctx.save();
            ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
            ctx.beginPath();
            ctx.ellipse(0, halfH + 8, halfW * 0.85, 7, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // 2. Клиппинг колбы для жидкости
        ctx.save();
        this.createFlaskPath(ctx, halfW, halfH, neckW, neckH, radius);
        ctx.clip();

        // Расчет слоев жидкости с учетом динамического перелива
        const segH = (h - neckH) / FLASK_CAPACITY;
        const bodyBottom = halfH;

        // Создаем временную копию слоев для отрисовки
        let displayLayers = [...layers];
        let fractionalTopHeight = 1.0;

        if (dynamicVolumeChange < 0) {
            // Опустошение верхней колбы
            const drainCount = -dynamicVolumeChange;
            const fullDrops = Math.floor(drainCount);
            const partial = drainCount - fullDrops;
            for (let k = 0; k < fullDrops; k++) {
                if (displayLayers.length > 0) displayLayers.pop();
            }
            fractionalTopHeight = 1.0 - partial;
        } else if (dynamicVolumeChange > 0) {
            // Наполнение целевой колбы
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

        // Если колба наклонена, мы поворачиваем градиент и уровень жидкости горизонтально земле!
        for (let i = 0; i < displayLayers.length; i++) {
            const isTopLayer = (i === displayLayers.length - 1);
            const curSegH = (isTopLayer && fractionalTopHeight < 1.0) ? (segH * fractionalTopHeight) : segH;
            
            const colorId = displayLayers[i];
            const potion = POTION_PALETTE[colorId] || POTION_PALETTE.ruby;
            const yBottom = bodyBottom - i * segH;
            const yTop = yBottom - curSegH;

            // Если колба наклонена, зеркало жидкости остается ровным
            ctx.save();
            if (angle) {
                // При наклоне жидкость стекает к стенке
                ctx.rotate(-angle * 0.45);
            }

            const grad = ctx.createLinearGradient(-halfW, yTop, halfW, yBottom);
            grad.addColorStop(0, potion.topColor);
            grad.addColorStop(1, potion.bottomColor);

            ctx.fillStyle = grad;
            ctx.fillRect(-halfW - 10, yTop, w + 20, curSegH + 2);

            ctx.fillStyle = potion.glowColor;
            ctx.fillRect(-halfW - 10, yTop, w + 20, curSegH + 2);

            if (!angle) {
                this.drawBubblesInLayer(ctx, -halfW, halfW, yTop, yBottom, potion.bubbleColor);
            }

            ctx.restore();
        }

        // Верхний мениск жидкости
        if (displayLayers.length > 0 && !angle) {
            const totalHeight = (displayLayers.length - 1 + fractionalTopHeight) * segH;
            const topY = bodyBottom - totalHeight;
            const topPotion = POTION_PALETTE[displayLayers[displayLayers.length - 1]] || POTION_PALETTE.ruby;
            ctx.fillStyle = topPotion.topColor;
            ctx.beginPath();
            ctx.ellipse(0, topY, halfW * 0.88, 3.5, 0, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore(); // Сброс клипа

        // 3. Стеклянный контур, блики и пробка
        ctx.save();
        this.createFlaskPath(ctx, halfW, halfH, neckW, neckH, radius);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fill();

        if (isSelected) {
            ctx.strokeStyle = '#ffd166';
            ctx.lineWidth = 3;
            ctx.shadowColor = '#ffd166';
            ctx.shadowBlur = 16;
        } else {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
            ctx.lineWidth = 2;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
            ctx.shadowBlur = 4;
        }
        ctx.stroke();

        // Блик стекла
        ctx.beginPath();
        ctx.moveTo(-halfW + 6, -halfH + neckH + 12);
        ctx.lineTo(-halfW + 6, halfH - radius);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Горлышко
        ctx.beginPath();
        ctx.ellipse(0, -halfH, neckW / 2 + 2, 4, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
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

    drawPourStream() {
        const ctx = this.ctx;
        const p = this.pourAnimation;
        const fromBox = this.layout[p.fromIdx];
        const toBox = this.layout[p.toIdx];
        const potion = POTION_PALETTE[p.colorId] || POTION_PALETTE.ruby;

        // Точные мировые координаты носика наклоненной колбы
        const isTargetToRight = toBox.x >= fromBox.x;
        const lipLocalX = isTargetToRight ? (fromBox.w * 0.2) : -(fromBox.w * 0.2);
        const lipLocalY = -fromBox.h * 0.5;

        const streamStartX = fromBox.x + lipLocalX * Math.cos(fromBox.angle) - lipLocalY * Math.sin(fromBox.angle);
        const streamStartY = fromBox.y + lipLocalX * Math.sin(fromBox.angle) + lipLocalY * Math.cos(fromBox.angle);

        // Горлышко целевой колбы
        const streamTargetX = toBox.x;
        const currentFillHeight = (this.flasks[p.toIdx].length + p.pourFraction * p.count) * (toBox.h * 0.78 / FLASK_CAPACITY);
        const streamTargetY = toBox.y + toBox.h * 0.5 - Math.max(10, currentFillHeight);

        ctx.save();
        ctx.strokeStyle = potion.topColor;
        ctx.lineWidth = Math.min(8, fromBox.w * 0.16);
        ctx.lineCap = 'round';
        ctx.shadowColor = potion.topColor;
        ctx.shadowBlur = 14;

        ctx.beginPath();
        ctx.moveTo(streamStartX, streamStartY);
        
        // Красивая дуга Безье струи под действием гравитации
        const cpX = streamStartX + (streamTargetX - streamStartX) * 0.25;
        const cpY = Math.min(streamStartY, streamTargetY) - 15;
        ctx.quadraticCurveTo(cpX, cpY, streamTargetX, streamTargetY);
        ctx.stroke();

        // Белое мерцающее ядро струи
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.restore();
    }

    drawParticles() {
        const ctx = this.ctx;
        // Победные искры
        for (let sp of this.sparkles) {
            ctx.save();
            ctx.fillStyle = sp.color;
            ctx.globalAlpha = sp.alpha;
            ctx.shadowColor = sp.color;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // Брызги переливания
        for (let sp of this.splashParticles) {
            ctx.save();
            ctx.fillStyle = sp.color;
            ctx.globalAlpha = sp.alpha;
            ctx.beginPath();
            ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.game = new PotionGame();
});
