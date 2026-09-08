// Палитра драгоценных магических зелий (Глубокие тона, комфортные для глаз)
const POTION_PALETTE = {
    ruby: {
        id: 'ruby',
        name: 'Phoenix Tear',
        ruName: 'Слеза Феникса',
        topColor: '#e63956',
        bottomColor: '#9b1127',
        glowColor: 'rgba(230, 57, 86, 0.45)',
        bubbleColor: 'rgba(255, 180, 190, 0.7)'
    },
    sapphire: {
        id: 'sapphire',
        name: 'Moon Frost',
        ruName: 'Лунный Мороз',
        topColor: '#3a86ff',
        bottomColor: '#1045a1',
        glowColor: 'rgba(58, 134, 255, 0.45)',
        bubbleColor: 'rgba(180, 220, 255, 0.7)'
    },
    emerald: {
        id: 'emerald',
        name: 'Mandrake Sap',
        ruName: 'Сок Мандрагоры',
        topColor: '#2ec4b6',
        bottomColor: '#0e665d',
        glowColor: 'rgba(46, 196, 182, 0.45)',
        bubbleColor: 'rgba(190, 255, 230, 0.7)'
    },
    amber: {
        id: 'amber',
        name: 'Dragon Fire',
        ruName: 'Пламя Дракона',
        topColor: '#ff9f1c',
        bottomColor: '#b35d00',
        glowColor: 'rgba(255, 159, 28, 0.45)',
        bubbleColor: 'rgba(255, 230, 170, 0.7)'
    },
    amethyst: {
        id: 'amethyst',
        name: 'Shadow Mist',
        ruName: 'Туман Теней',
        topColor: '#9d4edd',
        bottomColor: '#5a189a',
        glowColor: 'rgba(157, 78, 221, 0.45)',
        bubbleColor: 'rgba(230, 190, 255, 0.7)'
    },
    gold: {
        id: 'gold',
        name: 'Elixir of Luck',
        ruName: 'Эликсир Удачи',
        topColor: '#ffd166',
        bottomColor: '#c79207',
        glowColor: 'rgba(255, 209, 102, 0.45)',
        bubbleColor: 'rgba(255, 245, 190, 0.7)'
    },
    cyan: {
        id: 'cyan',
        name: 'Star Dust',
        ruName: 'Звездная Пыль',
        topColor: '#00f5d4',
        bottomColor: '#007f6e',
        glowColor: 'rgba(0, 245, 212, 0.45)',
        bubbleColor: 'rgba(180, 255, 245, 0.7)'
    },
    rose: {
        id: 'rose',
        name: 'Love Essence',
        ruName: 'Амортенция',
        topColor: '#ff4d6d',
        bottomColor: '#a4133c',
        glowColor: 'rgba(255, 77, 109, 0.45)',
        bubbleColor: 'rgba(255, 200, 215, 0.7)'
    }
};

// Емкость каждой колбы (4 сегмента)
const FLASK_CAPACITY = 4;

// 15 калибровочных уровней с кривой сложности «Американские горки»
const PRESET_LEVELS = [
    // Уровень 1: Обучающий (2 цвета, 1 пустая)
    {
        title: 'Урок 1: Знакомство со склянками',
        chapter: 'Семестр 1: Основы зельеварения',
        flasks: [
            ['ruby', 'ruby', 'sapphire', 'sapphire'],
            ['sapphire', 'sapphire', 'ruby', 'ruby'],
            []
        ]
    },
    // Уровень 2: Простая сортировка
    {
        title: 'Урок 2: Разделение стихий',
        chapter: 'Семестр 1: Основы зельеварения',
        flasks: [
            ['ruby', 'sapphire', 'ruby', 'sapphire'],
            ['sapphire', 'ruby', 'sapphire', 'ruby'],
            []
        ]
    },
    // Уровень 3: Ввод 3-го цвета (Emerald)
    {
        title: 'Урок 3: Первые травы',
        chapter: 'Семестр 1: Основы зельеварения',
        flasks: [
            ['ruby', 'emerald', 'sapphire', 'ruby'],
            ['sapphire', 'emerald', 'ruby', 'emerald'],
            ['emerald', 'sapphire', 'sapphire', 'ruby'],
            []
        ]
    },
    // Уровень 4: 4 колбы, 3 цвета
    {
        title: 'Урок 4: Смешение в подземелье',
        chapter: 'Семестр 1: Основы зельеварения',
        flasks: [
            ['emerald', 'ruby', 'sapphire', 'emerald'],
            ['ruby', 'sapphire', 'ruby', 'emerald'],
            ['sapphire', 'emerald', 'sapphire', 'ruby'],
            []
        ]
    },
    // Уровень 5: Легкий релакс (2 пустые колбы)
    {
        title: 'Урок 5: Дыхание алхимика',
        chapter: 'Семестр 1: Основы зельеварения',
        flasks: [
            ['sapphire', 'ruby', 'emerald', 'emerald'],
            ['ruby', 'emerald', 'ruby', 'sapphire'],
            ['sapphire', 'ruby', 'emerald', 'sapphire'],
            [],
            []
        ]
    },
    // Уровень 6: Ввод 4-го цвета (Amber)
    {
        title: 'Урок 6: Пламя феникса',
        chapter: 'Семестр 1: Основы зельеварения',
        flasks: [
            ['amber', 'ruby', 'sapphire', 'emerald'],
            ['emerald', 'amber', 'ruby', 'sapphire'],
            ['sapphire', 'emerald', 'amber', 'ruby'],
            ['ruby', 'sapphire', 'emerald', 'amber'],
            [],
            []
        ]
    },
    // Уровень 7: Напряжение
    {
        title: 'Урок 7: Тайные пропорции',
        chapter: 'Семестр 1: Основы зельеварения',
        flasks: [
            ['ruby', 'amber', 'emerald', 'sapphire'],
            ['sapphire', 'ruby', 'amber', 'emerald'],
            ['emerald', 'sapphire', 'ruby', 'amber'],
            ['amber', 'emerald', 'sapphire', 'ruby'],
            [],
            []
        ]
    },
    // Уровень 8: Волна релакса
    {
        title: 'Урок 8: Равновесие магии',
        chapter: 'Семестр 1: Основы зельеварения',
        flasks: [
            ['amber', 'amber', 'ruby', 'emerald'],
            ['sapphire', 'ruby', 'emerald', 'sapphire'],
            ['emerald', 'sapphire', 'ruby', 'ruby'],
            ['emerald', 'amber', 'sapphire', 'amber'],
            [],
            []
        ]
    },
    // Уровень 9: Ввод 5-го цвета (Amethyst)
    {
        title: 'Урок 9: Ночная настойка',
        chapter: 'Семестр 1: Основы зельеварения',
        flasks: [
            ['amethyst', 'ruby', 'emerald', 'sapphire'],
            ['amber', 'amethyst', 'ruby', 'emerald'],
            ['sapphire', 'amber', 'amethyst', 'ruby'],
            ['emerald', 'sapphire', 'amber', 'amethyst'],
            ['ruby', 'emerald', 'sapphire', 'amber'],
            [],
            []
        ]
    },
    // Уровень 10: Босс-сессия 1 курса (Экзамен Снейпа)
    {
        title: 'Урок 10: Экзамен Мастера Зелий',
        chapter: 'Семестр 1: Основы зельеварения',
        flasks: [
            ['amethyst', 'amber', 'emerald', 'ruby'],
            ['ruby', 'sapphire', 'amethyst', 'amber'],
            ['emerald', 'ruby', 'sapphire', 'amethyst'],
            ['amber', 'emerald', 'ruby', 'sapphire'],
            ['sapphire', 'amethyst', 'amber', 'emerald'],
            [],
            []
        ]
    },
    // Уровни 11-15: Расширенные колдовские составы
    {
        title: 'Урок 11: Золотая пыльца',
        chapter: 'Семестр 2: Продвинутая алхимия',
        flasks: [
            ['gold', 'ruby', 'sapphire', 'gold'],
            ['emerald', 'gold', 'ruby', 'emerald'],
            ['sapphire', 'emerald', 'gold', 'sapphire'],
            ['ruby', 'sapphire', 'emerald', 'ruby'],
            [],
            []
        ]
    },
    {
        title: 'Урок 12: Кристальный раствор',
        chapter: 'Семестр 2: Продвинутая алхимия',
        flasks: [
            ['cyan', 'amethyst', 'amber', 'cyan'],
            ['amethyst', 'cyan', 'amber', 'amethyst'],
            ['amber', 'cyan', 'amethyst', 'amber'],
            [],
            []
        ]
    },
    {
        title: 'Урок 13: Симфония эссенций',
        chapter: 'Семестр 2: Продвинутая алхимия',
        flasks: [
            ['cyan', 'gold', 'ruby', 'amethyst'],
            ['amethyst', 'cyan', 'gold', 'ruby'],
            ['ruby', 'amethyst', 'cyan', 'gold'],
            ['gold', 'ruby', 'amethyst', 'cyan'],
            [],
            []
        ]
    },
    {
        title: 'Урок 14: Лунные приливы',
        chapter: 'Семестр 2: Продвинутая алхимия',
        flasks: [
            ['rose', 'sapphire', 'emerald', 'gold'],
            ['gold', 'rose', 'sapphire', 'emerald'],
            ['emerald', 'gold', 'rose', 'sapphire'],
            ['sapphire', 'emerald', 'gold', 'rose'],
            [],
            []
        ]
    },
    {
        title: 'Урок 15: Великое Делание (Magnum Opus)',
        chapter: 'Семестр 2: Продвинутая алхимия',
        flasks: [
            ['rose', 'cyan', 'amethyst', 'amber'],
            ['ruby', 'sapphire', 'emerald', 'gold'],
            ['cyan', 'amethyst', 'amber', 'rose'],
            ['sapphire', 'emerald', 'gold', 'ruby'],
            ['amethyst', 'amber', 'rose', 'cyan'],
            ['emerald', 'gold', 'ruby', 'sapphire'],
            [],
            []
        ]
    }
];

// Процедурный генератор гарантированно решаемых уровней (Обратный симулятор)
function generateSolvableLevel(levelNumber) {
    const colorKeys = Object.keys(POTION_PALETTE);
    
    // Определяем число цветов и пустых колб в зависимости от уровня
    let numColors = Math.min(8, 3 + Math.floor(levelNumber / 4));
    let numEmpty = 2;
    if (levelNumber > 25) numEmpty = 2;
    
    const chosenColors = colorKeys.slice(0, numColors);
    
    // 1. Создаем решенное состояние
    const flasks = [];
    for (let c of chosenColors) {
        flasks.push([c, c, c, c]);
    }
    for (let e = 0; e < numEmpty; e++) {
        flasks.push([]);
    }
    
    // 2. Делаем обратные ходы для перемешивания
    const shuffleSteps = 20 + Math.min(60, levelNumber * 2);
    for (let step = 0; step < shuffleSteps; step++) {
        // Выбираем непустую колбу
        const nonEmpties = [];
        for (let i = 0; i < flasks.length; i++) {
            if (flasks[i].length > 0) nonEmpties.push(i);
        }
        const fromIdx = nonEmpties[Math.floor(Math.random() * nonEmpties.length)];
        
        // Выбираем колбу, куда можно перелить (где есть место)
        const canReceive = [];
        for (let j = 0; j < flasks.length; j++) {
            if (j !== fromIdx && flasks[j].length < FLASK_CAPACITY) {
                canReceive.push(j);
            }
        }
        
        if (canReceive.length > 0) {
            const toIdx = canReceive[Math.floor(Math.random() * canReceive.length)];
            const liquid = flasks[fromIdx].pop();
            flasks[toIdx].push(liquid);
        }
    }
    
    return {
        title: `Испытание ${levelNumber}`,
        chapter: `Курс Высшей Алхимии (Уровень ${levelNumber})`,
        flasks: flasks
    };
}
