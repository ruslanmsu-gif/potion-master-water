// Web Audio API Procedural ASMR Sound Engine
class SoundEngine {
    constructor() {
        this.ctx = null;
        this.muted = false;
        this.pourNode = null;
        this.pourGain = null;
        this.isPouring = false;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        return this.muted;
    }

    // Мягкий клик по дереву
    playClick() {
        if (this.muted) return;
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.04);
    }

    // Выбор колбы: подъем и хлопок деревянной пробки
    playSelect() {
        if (this.muted) return;
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(450, this.ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
    }

    // Сочный щелчок закрытия деревянной пробки
    playCork() {
        if (this.muted) return;
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(360, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
    }

    // Начало реалистичного переливания жидкости (ASMR бульканье)
    startPour() {
        if (this.muted || this.isPouring) return;
        this.init();
        this.isPouring = true;

        // Генерация розового шума для струи
        const bufferSize = this.ctx.sampleRate * 2;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
            b6 = white * 0.115926;
        }

        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Полосовой фильтр для эффекта резонанса сосуда
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(650, this.ctx.currentTime);
        filter.Q.setValueAtTime(4.0, this.ctx.currentTime);

        // LFO модуляция для бульканья пузырьков
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.setValueAtTime(14, this.ctx.currentTime); // 14 герц бульканья
        lfoGain.gain.setValueAtTime(250, this.ctx.currentTime);
        lfo.connect(filter.frequency);

        this.pourGain = this.ctx.createGain();
        this.pourGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
        this.pourGain.gain.linearRampToValueAtTime(0.22, this.ctx.currentTime + 0.1);

        whiteNoise.connect(filter);
        filter.connect(this.pourGain);
        this.pourGain.connect(this.ctx.destination);

        whiteNoise.start();
        lfo.start();

        this.pourNode = { whiteNoise, lfo, filter };
    }

    // Окончание переливания
    stopPour() {
        if (!this.isPouring || !this.pourGain) return;
        this.isPouring = false;
        try {
            this.pourGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
            setTimeout(() => {
                if (this.pourNode) {
                    this.pourNode.whiteNoise.stop();
                    this.pourNode.lfo.stop();
                    this.pourNode = null;
                }
            }, 90);
        } catch (e) {}
    }

    // Кристальный волшебный перезвон при сборе целой колбы
    playFlaskComplete() {
        if (this.muted) return;
        this.init();
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (магический мажор)
        notes.forEach((freq, index) => {
            const time = this.ctx.currentTime + index * 0.07;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, time);
            
            gain.gain.setValueAtTime(0.18, time);
            gain.gain.exponentialRampToValueAtTime(0.0005, time + 0.6);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(time);
            osc.stop(time + 0.6);
        });
    }

    // Торжественные аккорды победы на уровне
    playLevelWin() {
        if (this.muted) return;
        this.init();
        const chord = [392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51];
        chord.forEach((freq, idx) => {
            const time = this.ctx.currentTime + idx * 0.06;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, time);
            
            gain.gain.setValueAtTime(0.15, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 1.2);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(time);
            osc.stop(time + 1.2);
        });
    }
}

window.soundEngine = new SoundEngine();
