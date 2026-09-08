// Potion Master: Wizard Sort — Основной игровой движок (Canvas 60 FPS)

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

        // Частицы (пузырьки и победные искры)
        this.bubbles = [];
        this.sparkles = [];
        
        // Переменные анимации переливания
        this.pourAnimation = null; // { fromIdx, toIdx, progress, count, colorId, startX, startY, targetX, targetY }

        this.initDOM();
        this.resize();
        this.loadLevel(this.currentLevelIndex);
        
        window.addEventListener('resize', () => this.resize());
        this.canvas.addEventListener('pointerdown', (e) => this.handlePointerDown(e));
        
        // Запуск игрового цикла
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
        
        // Глубокое копирование колб
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
        // Создаем плавающие пузырьки внутри колб
        for (let i = 0; i < 40; i++) {
            this.bubbles.push({
                xOffsetRatio: (Math.random() - 0.5) * 0.7,
                yProgress: Math.random(),
                radius: 1.5 + Math.random() * 2.5,
                speed: 0.002 + Math.random() * 0.004,
                wobbleSpeed: 2 + Math.random() * 3,
                wobblePhase: Math.random() * Math.PI * 2
            });
        }
    }

    calculateLayout() {
        const total = this.flasks.length;
        this.layout = [];

        // Раскладка: в 1 ряд (до 4 колб) или в 2 ряда (от 5 колб)
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
        
        // Размеры колбы
        const availableWidth = this.width * 0.88;
        const flaskW = Math.min(65, availableWidth / (maxInRow + 0.35));
        const flaskH = flaskW * 2.8;

        const rowHeight = row2Count > 0 ? this.height * 0.38 : this.height * 0.45;
        const startY1 = row2Count > 0 ? this.height * 0.32 : this.height * 0.5;
        const startY2 = this.height * 0.70;

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

        // Поиск колбы под пальцем/кликом
        let clickedIdx = -1;
        for (let i = 0; i < this.layout.length; i++) {
            const b = this.layout[i];
            const left = b.x - b.w / 2 - 12;
            const right = b.x + b.w / 2 + 12;
            const top = b.y - b.h / 2 - 20;
            const bottom = b.y + b.h / 2 + 15;

            if (clientX >= left && clientX <= right && clientY >= top && clientY <= bottom) {
                clickedIdx = i;
                break;
            }
        }

        if (clickedIdx === -1) {
            // Клик в пустоту снимает выделение
            if (this.selectedFlaskIndex !== null) {
                this.selectedFlaskIndex = null;
                window.soundEngine.playClick();
            }
            return;
        }

        if (this.selectedFlaskIndex === null) {
            // Выбор исходной колбы (нельзя выбрать пустую)
            if (this.flasks[clickedIdx].length > 0) {
                this.selectedFlaskIndex = clickedIdx;
                window.soundEngine.playSelect();
            }
        } else if (this.selectedFlaskIndex === clickedIdx) {
            // Клик по той же колбе снимает выбор
            this.selectedFlaskIndex = null;
            window.soundEngine.playClick();
        } else {
            // Попытка перелить из selectedFlaskIndex в clickedIdx
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

        // Колба заполнена
        if (toFlask.length >= FLASK_CAPACITY) {
            this.selectedFlaskIndex = toIdx; // Переключаем выбор на эту колбу
            window.soundEngine.playSelect();
            return;
        }

        const topColorFrom = fromFlask[fromFlask.length - 1];

        // Переливать можно только если целевая колба пустая ИЛИ цвет верхнего слоя совпадает
        if (toFlask.length === 0 || toFlask[toFlask.length - 1] === topColorFrom) {
            // Считаем сколько подряд одинаковых слоев сверху в исходной колбе
            let countMatching = 0;
            for (let i = fromFlask.length - 1; i >= 0; i--) {
                if (fromFlask[i] === topColorFrom) countMatching++;
                else break;
            }

            const freeSpace = FLASK_CAPACITY - toFlask.length;
            const amountToPour = Math.min(countMatching, freeSpace);

            if (amountToPour > 0) {
                // Сохраняем состояние для отмены (Undo)
                this.saveHistory();

                // Запускаем плавную анимацию переливания
                this.startPourAnimation(fromIdx, toIdx, amountToPour, topColorFrom);
                this.selectedFlaskIndex = null;
                return;
            }
        }

        // Невозможно перелить: переключаем выбор на нажатую колбу
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

        // Точка переливания (чуть выше и левее/правее горлышка целевой колбы)
        const isTargetToRight = toBox.x >= fromBox.x;
        const pourX = toBox.x + (isTargetToRight ? -fromBox.w * 0.75 : fromBox.w * 0.75);
        const pourY = toBox.y - toBox.h * 0.65;
        const targetAngle = isTargetToRight ? Math.PI * 0.42 : -Math.PI * 0.42;

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
            streamActive: false
        };

        window.soundEngine.startPour();
    }

    executeTransfer(fromIdx, toIdx, count) {
        for (let i = 0; i < count; i++) {
            if (this.flasks[fromIdx].length > 0 && this.flasks[toIdx].length < FLASK_CAPACITY) {
                const liquid = this.flasks[fromIdx].pop();
                this.flasks[toIdx].push(liquid);
            }
        }
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
        // Условие победы: каждая колба либо полностью пуста, либо полностью заполнена (4 слоя) одним цветом
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

        // Спавн победных звездных искр
        for (let i = 0; i < 70; i++) {
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
        }, 1000);
    }

    nextLevel() {
        this.currentLevelIndex++;
        localStorage.setItem('potion_current_level', this.currentLevelIndex.toString());
        this.loadLevel(this.currentLevelIndex);
    }

    // Главный цикл отрисовки и анимации
    loop(currentTime) {
        const dt = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        this.update(dt);
        this.render();

        requestAnimationFrame((t) => this.loop(t));
    }

    update(dt) {
        // Обновление анимации переливания
        if (this.pourAnimation) {
            const p = this.pourAnimation;
            const fromBox = this.layout[p.fromIdx];

            if (p.phase === 'move') {
                p.progress += dt * 3.5;
                if (p.progress >= 1) {
                    p.progress = 1;
                    p.phase = 'pouring';
                    p.pourTimer = 0;
                    p.streamActive = true;
                }
                fromBox.x = p.originX + (p.pourX - p.originX) * p.progress;
                fromBox.y = p.originY + (p.pourY - p.originY) * p.progress;
                fromBox.angle = p.targetAngle * p.progress;
            } else if (p.phase === 'pouring') {
                p.pourTimer = (p.pourTimer || 0) + dt;
                // Струя льется 0.4 секунды на каждый сегмент
                const duration = 0.4 * p.count;
                if (p.pourTimer >= duration) {
                    p.phase = 'return';
                    p.streamActive = false;
                    p.progress = 0;
                    window.soundEngine.stopPour();
                    this.executeTransfer(p.fromIdx, p.toIdx, p.count);

                    // Проверяем, собрана ли колба целиком
                    const toFlask = this.flasks[p.toIdx];
                    if (toFlask.length === FLASK_CAPACITY) {
                        const allSame = toFlask.every(c => c === toFlask[0]);
                        if (allSame) window.soundEngine.playFlaskComplete();
                    }

                    // Проверка победы
                    if (this.checkWinCondition()) {
                        this.triggerVictory();
                    }
                }
            } else if (p.phase === 'return') {
                p.progress += dt * 3.5;
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
                    fromBox.x = p.originX + (p.pourX - p.originX) * rev;
                    fromBox.y = p.originY + (p.pourY - p.originY) * rev;
                    fromBox.angle = p.targetAngle * rev;
                }
            }
        }

        // Плавный подъем выбранной колбы
        for (let i = 0; i < this.layout.length; i++) {
            const b = this.layout[i];
            if (this.pourAnimation && (i === this.pourAnimation.fromIdx)) continue;

            const isSelected = (this.selectedFlaskIndex === i);
            const targetOffsetY = isSelected ? -22 : 0;
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
    }

    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Рисуем колбы
        for (let i = 0; i < this.layout.length; i++) {
            const b = this.layout[i];
            const flaskData = this.flasks[i];
            this.drawFlask(b.x, b.y + b.offsetY, b.w, b.h, flaskData, b.angle, i === this.selectedFlaskIndex);
        }

        // Рисуем струю жидкости при переливании
        if (this.pourAnimation && this.pourAnimation.streamActive) {
            this.drawPourStream();
        }

        // Рисуем победные искры
        this.drawSparkles();
    }

    drawFlask(x, y, w, h, layers, angle, isSelected) {
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(x, y);
        if (angle) ctx.rotate(angle);

        const halfW = w / 2;
        const halfH = h / 2;
        const neckW = w * 0.42;
        const neckH = h * 0.22;
        const radius = w * 0.28;

        // 1. Тень от колбы на деревянном столе
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.beginPath();
        ctx.ellipse(0, halfH + 8, halfW * 0.85, 7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // 2. Создание контура стеклянного флакона для клиппинга жидкости
        ctx.save();
        this.createFlaskPath(ctx, halfW, halfH, neckW, neckH, radius);
        ctx.clip();

        // Отрисовка слоев жидкости внутри колбы
        const segH = (h - neckH) / FLASK_CAPACITY;
        const bodyBottom = halfH;

        for (let i = 0; i < layers.length; i++) {
            const colorId = layers[i];
            const potion = POTION_PALETTE[colorId] || POTION_PALETTE.ruby;
            const yBottom = bodyBottom - i * segH;
            const yTop = yBottom - segH;

            // Градиент зелья
            const grad = ctx.createLinearGradient(-halfW, yTop, halfW, yBottom);
            grad.addColorStop(0, potion.topColor);
            grad.addColorStop(1, potion.bottomColor);

            ctx.fillStyle = grad;
            ctx.fillRect(-halfW - 5, yTop, w + 10, segH + 1);

            // Внутреннее свечение зелья
            ctx.fillStyle = potion.glowColor;
            ctx.fillRect(-halfW - 5, yTop, w + 10, segH + 1);

            // Плавающие пузырьки
            this.drawBubblesInLayer(ctx, -halfW, halfW, yTop, yBottom, potion.bubbleColor);
        }

        // Верхний изогнутый мениск жидкости
        if (layers.length > 0) {
            const topY = bodyBottom - layers.length * segH;
            const topPotion = POTION_PALETTE[layers[layers.length - 1]];
            ctx.fillStyle = topPotion.topColor;
            ctx.beginPath();
            ctx.ellipse(0, topY, halfW * 0.88, 3.5, 0, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore(); // Сброс clip

        // 3. Отрисовка стеклянного флакона (контур и блики)
        ctx.save();
        this.createFlaskPath(ctx, halfW, halfH, neckW, neckH, radius);
        
        // Стекло: легкий внутренний градиент
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.fill();

        // Свечение выделенной колбы
        if (isSelected) {
            ctx.strokeStyle = '#ffd166';
            ctx.lineWidth = 3;
            ctx.shadowColor = '#ffd166';
            ctx.shadowBlur = 15;
        } else {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.lineWidth = 2;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
            ctx.shadowBlur = 4;
        }
        ctx.stroke();

        // Вертикальный белый блик на стекле слева
        ctx.beginPath();
        ctx.moveTo(-halfW + 6, -halfH + neckH + 15);
        ctx.lineTo(-halfW + 6, halfH - radius);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Ободок горлышка
        ctx.beginPath();
        ctx.ellipse(0, -halfH, neckW / 2 + 2, 4, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
        ctx.restore();
    }

    createFlaskPath(ctx, halfW, halfH, neckW, neckH, radius) {
        ctx.beginPath();
        // Горлышко
        ctx.moveTo(-neckW / 2, -halfH);
        ctx.lineTo(neckW / 2, -halfH);
        ctx.lineTo(neckW / 2, -halfH + neckH);
        
        // Плечи флакона
        ctx.lineTo(halfW, -halfH + neckH + 14);
        
        // Правая стенка и скругленное дно
        ctx.lineTo(halfW, halfH - radius);
        ctx.arcTo(halfW, halfH, halfW - radius, halfH, radius);
        
        // Дно
        ctx.lineTo(-halfW + radius, halfH);
        ctx.arcTo(-halfW, halfH, -halfW, halfH - radius, radius);
        
        // Левая стенка
        ctx.lineTo(-halfW, -halfH + neckH + 14);
        ctx.lineTo(-neckW / 2, -halfH + neckH);
        ctx.closePath();
    }

    drawBubblesInLayer(ctx, left, right, top, bottom, color) {
        const time = performance.now() * 0.001;
        ctx.fillStyle = color;

        for (let i = 0; i < 4; i++) {
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

        // Носик наклоненной колбы
        const streamStartX = fromBox.x + Math.sin(fromBox.angle) * (fromBox.h * 0.45);
        const streamStartY = fromBox.y - Math.cos(fromBox.angle) * (fromBox.h * 0.45);

        // Горлышко целевой колбы
        const streamTargetX = toBox.x;
        const streamTargetY = toBox.y - toBox.h / 2 + 10;

        ctx.save();
        ctx.strokeStyle = potion.topColor;
        ctx.lineWidth = Math.min(10, fromBox.w * 0.18);
        ctx.lineCap = 'round';
        ctx.shadowColor = potion.topColor;
        ctx.shadowBlur = 12;

        ctx.beginPath();
        ctx.moveTo(streamStartX, streamStartY);
        // Плавная дуга Безье струи под действием гравитации
        const cpX = (streamStartX + streamTargetX) / 2;
        const cpY = Math.min(streamStartY, streamTargetY) - 25;
        ctx.quadraticCurveTo(cpX, cpY, streamTargetX, streamTargetY);
        ctx.stroke();

        // Белая сердцевина струи
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.restore();
    }

    drawSparkles() {
        const ctx = this.ctx;
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
    }
}

// Старт игры после загрузки страницы
window.addEventListener('DOMContentLoaded', () => {
    window.game = new PotionGame();
});
