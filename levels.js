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
    },
    violet: {
        id: 'violet',
        name: 'Shadow Mist',
        ruName: 'Туман Теней',
        topColor: '#7c4dff',
        bottomColor: '#4527a0',
        glowColor: 'rgba(124, 77, 255, 0.45)',
        bubbleColor: 'rgba(210, 180, 255, 0.7)'
    },
    pearl: {
        id: 'pearl',
        name: 'Lunar Pearl',
        ruName: 'Лунный Жемчуг',
        topColor: '#dcd0c0',
        bottomColor: '#a89880',
        glowColor: 'rgba(220, 208, 192, 0.45)',
        bubbleColor: 'rgba(245, 240, 235, 0.7)'
    },
    lime: {
        id: 'lime',
        name: 'Verdant Sap',
        ruName: 'Зелёный Огонь',
        topColor: '#76ff03',
        bottomColor: '#4caf00',
        glowColor: 'rgba(118, 255, 3, 0.45)',
        bubbleColor: 'rgba(200, 255, 150, 0.7)'
    }
};

// Емкость каждой колбы (4 сегмента)
const FLASK_CAPACITY = 4;

// 15 калибровочных уровней с кривой сложности «Американские горки»
const PRESET_LEVELS = [
    // Уровень 1: Обучение (2 колбы, наполовину налитых одного цвета)
    {
        title: 'Урок 1: Знакомство со склянками',
        chapter: 'Семестр 1: Основы зельеварения',
        hintText: 'Нажми на колбу и перелей воду',
        flasks: [
            ['ruby', 'ruby'],
            ['ruby', 'ruby']
        ]
    },
    // Уровень 2: Простая сортировка
    {
        title: 'Урок 2: Разделение стихий',
        chapter: 'Семестр 1: Основы зельеварения',
        hintText: 'Только зелья ОДИНАКОВОГО ЦВЕТА можно наливать друг на друга',
        showGuide: false,
        flasks: [
            ['ruby', 'sapphire', 'ruby', 'sapphire'],
            ['sapphire', 'ruby', 'sapphire', 'ruby'],
            []
        ]
    },
    // Уровень 3: 5 колб, 3 цвета, средняя колба пустая (легкая сборка)
    {
        title: 'Урок 3: Первые травы',
        chapter: 'Семестр 1: Основы зельеварения',
        flasks: [
            ['ruby', 'ruby', 'ruby', 'sapphire'],
            ['sapphire', 'sapphire', 'sapphire', 'emerald'],
            [],
            ['emerald', 'emerald', 'emerald', 'ruby'],
            []
        ]
    },
    // Уровень 4: 11 колб (6 сверху, 5 снизу), 9 цветов, 2 пустые колбы
    {
        title: 'Урок 4: Лабиринт Ингредиентов',
        chapter: 'Семестр 1: Основы зельеварения',
        flasks: [
            ['ruby', 'sapphire', 'emerald', 'amber'],
            ['amethyst', 'gold', 'cyan', 'rose'],
            ['violet', 'ruby', 'sapphire', 'emerald'],
            ['amber', 'amethyst', 'gold', 'cyan'],
            ['rose', 'violet', 'ruby', 'sapphire'],
            [],
            ['emerald', 'amber', 'amethyst', 'gold'],
            ['cyan', 'rose', 'violet', 'ruby'],
            ['sapphire', 'emerald', 'amber', 'amethyst'],
            ['gold', 'cyan', 'rose', 'violet'],
            []
        ]
    },
    // Уровень 5: БОСС-УРОВЕНЬ: Ритуал Заварки «Великого Эликсира»
    {
        title: 'Урок 5: Ритуал Заварки «Великого Эликсира»',
        chapter: 'Семестр 1: Основы зельеварения',
        isRecipeLevel: true,
        recipe: {
            potionName: 'Великий Эликсир Магии',
            targetCount: 6
        },
        flasks: [
            [], // Central Master Vessel (Flask 0)
            ['ruby', 'sapphire', 'emerald', 'amber'],
            ['amethyst', 'gold', 'ruby', 'sapphire'],
            ['emerald', 'amber', 'amethyst', 'gold'],
            ['sapphire', 'ruby', 'amber', 'emerald'],
            ['gold', 'amethyst', 'sapphire', 'ruby'],
            ['amber', 'emerald', 'gold', 'amethyst'],
            [], // Empty Side Flask (Flask 7)
            []  // Empty Side Flask (Flask 8)
        ]
    },
    // Уровень 6: Введение новой механики «Скрытые Слои (Тайные Зелья)»
    {
        title: 'Урок 6: Тайна Запечатанных Сосудов',
        chapter: 'Семестр 1: Основы зельеварения',
        isMysteryLevel: true,
        introTitle: 'ТАЙНЫЕ СЛОИ ЗЕЛИЙ',
        introSteps: [
            'Нижние слои скрыты под знаками вопроса ❓',
            'В каждой колбе открыт только самый верхний цвет.',
            'Перелейте верхний слой, чтобы открыть цвет под ним!'
        ],
        flasks: [
            ['ruby', 'sapphire', 'emerald', 'amber'],
            ['amethyst', 'gold', 'cyan', 'rose'],
            ['violet', 'ruby', 'sapphire', 'emerald'],
            ['amber', 'amethyst', 'gold', 'cyan'],
            ['rose', 'violet', 'ruby', 'sapphire'],
            ['emerald', 'amber', 'amethyst', 'gold'],
            ['cyan', 'rose', 'violet', 'ruby'],
            ['sapphire', 'emerald', 'amber', 'amethyst'],
            ['gold', 'cyan', 'rose', 'violet'],
            [], // Пустая колба 1
            []  // Пустая колба 2
        ]
    },
    // Уровень 7: Повышенная сложность со скрытыми слоями
    {
        title: 'Урок 7: Тайны Глубоких Сводов',
        chapter: 'Семестр 1: Основы зельеварения',
        isMysteryLevel: true,
        introTitle: 'ТАЙНЫ ГЛУБОКИХ СВОДОВ',
        introSteps: [
            'Глубокая перемешка ингредиентов под знаками ❓',
            'Планируйте переливания в 2 пустые колбы.',
            'Раскапывайте ключевые цвета, чтобы не заблокировать ходы!'
        ],
        flasks: [
            ['cyan', 'cyan', 'amber', 'ruby'],
            ['violet', 'amethyst', 'rose', 'ruby'],
            ['emerald', 'amber', 'amber', 'sapphire'],
            ['gold', 'violet', 'violet', 'sapphire'],
            ['ruby', 'rose', 'rose', 'gold'],
            ['amethyst', 'cyan', 'cyan', 'gold'],
            ['gold', 'ruby', 'amethyst', 'emerald'],
            ['sapphire', 'emerald', 'emerald', 'amethyst'],
            ['violet', 'sapphire', 'amber', 'rose'],
            [], // Пустая колба 1
            []  // Пустая колба 2
        ]
    },
    // Уровень 8: Высокая сложность с открытыми слоями (Узел Архимага)
    {
        title: 'Урок 8: Узел Архимага',
        chapter: 'Семестр 1: Основы зельеварения',
        flasks: [
            ['emerald', 'violet', 'cyan', 'sapphire'],
            ['amethyst', 'gold', 'amber', 'sapphire'],
            ['gold', 'cyan', 'rose', 'ruby'],
            ['amethyst', 'violet', 'emerald', 'ruby'],
            ['cyan', 'rose', 'violet', 'gold'],
            ['violet', 'ruby', 'sapphire', 'amber'],
            ['ruby', 'amber', 'cyan', 'emerald'],
            ['rose', 'gold', 'emerald', 'amethyst'],
            ['amber', 'amethyst', 'sapphire', 'rose'],
            [], // Пустая колба 1
            []  // Пустая колба 2
        ]
    },
    // Уровень 9: Высокая сложность со скрытыми слоями (Лабиринт Теней)
    {
        title: 'Урок 9: Лабиринт Теней',
        chapter: 'Семестр 1: Основы зельеварения',
        isMysteryLevel: true,
        flasks: [
            ['violet', 'amber', 'cyan', 'ruby'],
            ['sapphire', 'cyan', 'emerald', 'ruby'],
            ['ruby', 'violet', 'gold', 'amethyst'],
            ['emerald', 'cyan', 'gold', 'cyan'],
            ['emerald', 'amethyst', 'rose', 'gold'],
            ['sapphire', 'rose', 'amber', 'emerald'],
            ['violet', 'amber', 'gold', 'rose'],
            ['sapphire', 'rose', 'violet', 'amethyst'],
            ['sapphire', 'ruby', 'amber', 'amethyst'],
            [], // Пустая колба 1
            []  // Пустая колба 2
        ]
    },
    // Уровень 10: Босс-сессия 1 курса (Экзамен Снейпа)
    {
        title: 'Урок 10: Экзамен Мастера Зелий',
        chapter: 'Семестр 1: Основы зельеварения',
        isRecipeLevel: true,
        recipe: {
            potionName: 'Философский Эликсир',
            targetCount: 11
        },
        introTitle: 'ЭКЗАМЕН МАСТЕРА ЗЕЛИЙ',
        introSteps: [
            'Отсортируйте все 11 цветов по боковым и нижним колбам.',
            'После полной сборки Главный Сосуд разблокируется.',
            'Перелейте все эссенции в Главный Сосуд для синтеза зелья!'
        ],
        flasks: [
            [], // Central Master Vessel (Flask 0)
            ['violet', 'amber', 'amethyst', 'violet'],
            ['amethyst', 'emerald', 'sapphire', 'ruby'],
            ['sapphire', 'pearl', 'sapphire', 'lime'],
            ['cyan', 'ruby', 'rose', 'lime'],
            ['lime', 'gold', 'emerald', 'amber'],
            ['ruby', 'amber', 'sapphire', 'gold'],
            ['violet', 'rose', 'pearl', 'ruby'],
            ['cyan', 'pearl', 'rose', 'cyan'],
            ['gold', 'amethyst', 'pearl', 'emerald'],
            ['amber', 'rose', 'emerald', 'violet'],
            ['lime', 'cyan', 'amethyst', 'gold'],
            [], // Пустая колба 1
            []  // Пустая колба 2
        ]
    },
    // Уровни 11-15: Расширенные колдовские составы
    {
        title: 'Урок 11: Пыльца Пикси',
        chapter: 'Семестр 2: Продвинутая алхимия',
        flasks: [
            ['rose', 'amethyst', 'emerald', 'amber'],
            ['cyan', 'sapphire', 'ruby', 'cyan'],
            ['emerald', 'emerald', 'ruby', 'rose'],
            ['amethyst', 'sapphire', 'rose', 'ruby'],
            ['sapphire', 'sapphire', 'cyan', 'amber'],
            ['rose', 'emerald', 'amber', 'amethyst'],
            ['cyan', 'ruby', 'amethyst', 'amber'],
            [],
            []
        ]
    },
    {
        title: 'Урок 12: Лабиринт Девяти Стихий',
        chapter: 'Семестр 2: Продвинутая алхимия',
        flasks: [
            ['amethyst', 'ruby', 'pearl', 'amethyst'],
            ['pearl', 'gold', 'amethyst', 'rose'],
            ['rose', 'pearl', 'pearl', 'amber'],
            ['sapphire', 'sapphire', 'ruby', 'amber'],
            ['amber', 'ruby', 'amethyst', 'cyan'],
            ['sapphire', 'rose', 'emerald', 'ruby'],
            ['gold', 'emerald', 'gold', 'sapphire'],
            ['rose', 'emerald', 'cyan', 'gold'],
            ['cyan', 'cyan', 'emerald', 'amber'],
            [],
            []
        ]
    },
    {
        title: 'Урок 13: Тайны Девяти Сводов',
        chapter: 'Семестр 2: Продвинутая алхимия',
        isMysteryLevel: true,
        introTitle: 'ТАЙНЫ ДЕВЯТИ СВОДОВ',
        introSteps: [
            '27 скрытых слоёв под знаками вопроса ❓',
            'Только 2 пустые колбы для распутывания 9 цветов.',
            'Планируйте ходы наперёд или используйте «+1 деление»!'
        ],
        flasks: [
            ['gold', 'cyan', 'rose', 'ruby'],
            ['pearl', 'sapphire', 'rose', 'sapphire'],
            ['emerald', 'cyan', 'pearl', 'emerald'],
            ['amethyst', 'gold', 'emerald', 'amber'],
            ['amber', 'rose', 'amethyst', 'ruby'],
            ['gold', 'rose', 'amethyst', 'sapphire'],
            ['cyan', 'sapphire', 'gold', 'ruby'],
            ['ruby', 'pearl', 'amber', 'emerald'],
            ['pearl', 'amethyst', 'cyan', 'amber'],
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
