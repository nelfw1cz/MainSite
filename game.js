/* ========================================
   PythonPath - Игра "Прогулка по лесу"
   ======================================== */

// ========================================
// Конфигурация игры
// ========================================
const CONFIG = {
    gridSize: 15,
    treeChance: 0.25,
    flowerChance: 0.08,
    stoneChance: 0.05,
    waterChance: 0.03,
    pathChance: 0.07
};

// ========================================
// Состояние игры
// ========================================
let gameState = {
    playerX: 0,
    playerY: 0,
    steps: 0,
    foundItems: 0,
    grid: [],
    discovered: new Set(),
    cellCounts: {}
};

// ========================================
// Элементы DOM
// ========================================
let gameArea, positionEl, stepsEl, foundEl, messageArea;
let fieldSizeEl, treeCountEl, flowerCountEl, stoneCountEl, waterCountEl, pathCountEl;
let bestScoreEl, gamesPlayedEl;

// ========================================
// Типы клеток и их эмодзи
// ========================================
const cellTypes = {
    grass: { class: 'grass', emoji: '', name: 'Трава' },
    tree: { class: 'tree', emoji: '🌲', name: 'Дерево' },
    flower: { class: 'flower', emoji: '🌸', name: 'Цветок' },
    stone: { class: 'stone', emoji: '🪨', name: 'Камень' },
    water: { class: 'water', emoji: '💧', name: 'Вода' },
    path: { class: 'path', emoji: '🛤️', name: 'Тропинка' }
};

// ========================================
// Инициализация игры
// ========================================
function init() {
    // Получаем элементы
    gameArea = document.getElementById('gameArea');
    positionEl = document.getElementById('position');
    stepsEl = document.getElementById('steps');
    foundEl = document.getElementById('found');
    messageArea = document.getElementById('messageArea');
    
    // Элементы статистики
    fieldSizeEl = document.getElementById('fieldSize');
    treeCountEl = document.getElementById('treeCount');
    flowerCountEl = document.getElementById('flowerCount');
    stoneCountEl = document.getElementById('stoneCount');
    waterCountEl = document.getElementById('waterCount');
    pathCountEl = document.getElementById('pathCount');
    
    // Элементы рекордов
    bestScoreEl = document.getElementById('bestScore');
    gamesPlayedEl = document.getElementById('gamesPlayed');
    
    // Загружаем рекорды
    loadRecords();
    
    // Генерируем лес и запускаем игру
    generateForest();
    renderGrid();
    updatePlayerPosition(0, 0);
    setupControls();
    updateCellStats();
    
    showMessage('🌲 Добро пожаловать в лес! Исследуйте его! 🌲');
}

// ========================================
// Генерация леса
// ========================================
function generateForest() {
    gameState.grid = [];
    gameState.discovered.clear();
    gameState.cellCounts = { tree: 0, flower: 0, stone: 0, water: 0, path: 0, grass: 0 };
    
    for (let y = 0; y < CONFIG.gridSize; y++) {
        const row = [];
        for (let x = 0; x < CONFIG.gridSize; x++) {
            const cellType = determineCellType(x, y);
            row.push({
                type: cellType,
                discovered: false
            });
            gameState.cellCounts[cellType]++;
        }
        gameState.grid.push(row);
    }
    
    // Игрок всегда начинает на траве
    gameState.grid[0][0].type = 'grass';
    gameState.cellCounts.grass++;
}

// ========================================
// Определение типа клетки
// ========================================
function determineCellType(x, y) {
    const rand = Math.random();
    
    // Создаём тропинки
    if (isPath(x, y)) {
        return 'path';
    }
    
    if (rand < CONFIG.treeChance) return 'tree';
    if (rand < CONFIG.treeChance + CONFIG.flowerChance) return 'flower';
    if (rand < CONFIG.treeChance + CONFIG.flowerChance + CONFIG.stoneChance) return 'stone';
    if (rand < CONFIG.treeChance + CONFIG.flowerChance + CONFIG.stoneChance + CONFIG.waterChance) return 'water';
    if (rand < CONFIG.treeChance + CONFIG.flowerChance + CONFIG.stoneChance + CONFIG.waterChance + CONFIG.pathChance) return 'path';
    
    return 'grass';
}

// ========================================
// Создание тропинок
// ========================================
function isPath(x, y) {
    // Главная тропинка по горизонтали
    if (y === Math.floor(CONFIG.gridSize / 2) && Math.random() > 0.3) {
        return true;
    }
    // Главная тропинка по вертикали
    if (x === Math.floor(CONFIG.gridSize / 2) && Math.random() > 0.3) {
        return true;
    }
    return false;
}

// ========================================
// Отрисовка сетки
// ========================================
function renderGrid() {
    gameArea.innerHTML = '';
    gameArea.style.gridTemplateColumns = `repeat(${CONFIG.gridSize}, 1fr)`;
    
    for (let y = 0; y < CONFIG.gridSize; y++) {
        for (let x = 0; x < CONFIG.gridSize; x++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.x = x;
            cell.dataset.y = y;
            
            const cellData = gameState.grid[y][x];
            const cellType = cellTypes[cellData.type];
            cell.classList.add(cellType.class);
            cell.textContent = cellType.emoji;
            
            // Обработка клика для быстрой навигации
            cell.addEventListener('click', () => handleCellClick(x, y));
            
            gameArea.appendChild(cell);
        }
    }
}

// ========================================
// Обновление позиции игрока
// ========================================
function updatePlayerPosition(newX, newY) {
    // Удаляем старого игрока
    const oldPlayer = document.querySelector('.cell.player');
    if (oldPlayer) {
        oldPlayer.classList.remove('player');
        const cellData = gameState.grid[gameState.playerY][gameState.playerX];
        const cellType = cellTypes[cellData.type];
        oldPlayer.textContent = cellType.emoji;
    }
    
    // Проверка границ
    if (newX < 0 || newX >= CONFIG.gridSize || newY < 0 || newY >= CONFIG.gridSize) {
        return false;
    }
    
    // Проверка на воду (нельзя ходить)
    const targetCell = gameState.grid[newY][newX];
    if (targetCell.type === 'water') {
        showMessage('💧 Здесь слишком глубоко для прогулки!');
        return false;
    }
    
    // Обновляем позицию
    gameState.playerX = newX;
    gameState.playerY = newY;
    gameState.steps++;
    
    // Отмечаем как открытое
    const posKey = `${newX}:${newY}`;
    if (!gameState.discovered.has(posKey)) {
        gameState.discovered.add(posKey);
        gameState.foundItems++;
        onDiscover(newX, newY);
    }
    
    // Добавляем игрока
    const newPlayerCell = document.querySelector(`.cell[data-x="${newX}"][data-y="${newY}"]`);
    if (newPlayerCell) {
        newPlayerCell.classList.add('player');
        newPlayerCell.textContent = '🧍';
    }
    
    updateStats();
    return true;
}

// ========================================
// Обработка открытия новой клетки
// ========================================
function onDiscover(x, y) {
    const cellData = gameState.grid[y][x];
    const cellType = cellTypes[cellData.type];
    
    const messages = {
        tree: ['🌲 Вы нашли прекрасное дерево!', '🌲 Какое величественное дерево!', '🌲 Здесь растёт старое дерево'],
        flower: ['🌸 Какой красивый цветок!', '🌸 Цветочная поляна!', '🌸 Вы нашли редкий цветок!'],
        stone: ['🪨 Интересный камень!', '🪨 Древний валун', '🪨 Камень с мхом'],
        water: ['💧 Вы обнаружили ручеёк!', '💧 Здесь бежит вода'],
        path: ['🛤️ Вы вышли на тропинку', '🛤️ Тропинка ведёт вглубь леса'],
        grass: ['🌿 Мягкая трава под ногами', '🌿 Солнечная полянка']
    };
    
    const cellMessages = messages[cellData.type] || ['🌿 Вы исследуете новую местность'];
    const randomMessage = cellMessages[Math.floor(Math.random() * cellMessages.length)];
    showMessage(randomMessage);
}

// ========================================
// Обновление статистики
// ========================================
function updateStats() {
    positionEl.textContent = `${gameState.playerX}:${gameState.playerY}`;
    stepsEl.textContent = gameState.steps;
    foundEl.textContent = gameState.foundItems;
}

// ========================================
// Обновление статистики клеток
// ========================================
function updateCellStats() {
    if (fieldSizeEl) fieldSizeEl.textContent = `${CONFIG.gridSize}x${CONFIG.gridSize}`;
    if (treeCountEl) treeCountEl.textContent = gameState.cellCounts.tree;
    if (flowerCountEl) flowerCountEl.textContent = gameState.cellCounts.flower;
    if (stoneCountEl) stoneCountEl.textContent = gameState.cellCounts.stone;
    if (waterCountEl) waterCountEl.textContent = gameState.cellCounts.water;
    if (pathCountEl) pathCountEl.textContent = gameState.cellCounts.path;
}

// ========================================
// Показать сообщение
// ========================================
function showMessage(text) {
    if (messageArea) {
        messageArea.innerHTML = `<div class="found-item">${text}</div>`;
    }
}

// ========================================
// Обработка клика по клетке
// ========================================
function handleCellClick(x, y) {
    const dx = x - gameState.playerX;
    const dy = y - gameState.playerY;
    
    // Можно ходить только на соседние клетки
    if (Math.abs(dx) + Math.abs(dy) === 1) {
        movePlayer(dx, dy);
    }
}

// ========================================
// Движение игрока
// ========================================
function movePlayer(dx, dy) {
    const newX = gameState.playerX + dx;
    const newY = gameState.playerY + dy;
    
    if (updatePlayerPosition(newX, newY)) {
        playStepSound();
    }
}

// ========================================
// Простой звук шагов
// ========================================
function playStepSound() {
    // Можно добавить аудио в будущем
}

// ========================================
// Настройка управления
// ========================================
function setupControls() {
    // Клавиатура
    document.addEventListener('keydown', handleKeydown);
    
    // Кнопки на экране
    const btnUp = document.getElementById('btnUp');
    const btnDown = document.getElementById('btnDown');
    const btnLeft = document.getElementById('btnLeft');
    const btnRight = document.getElementById('btnRight');
    
    if (btnUp) btnUp.addEventListener('click', () => movePlayer(0, -1));
    if (btnDown) btnDown.addEventListener('click', () => movePlayer(0, 1));
    if (btnLeft) btnLeft.addEventListener('click', () => movePlayer(-1, 0));
    if (btnRight) btnRight.addEventListener('click', () => movePlayer(1, 0));
    
    // Кнопка перезапуска
    const restartBtn = document.getElementById('restartBtn');
    if (restartBtn) {
        restartBtn.addEventListener('click', restartGame);
    }
    
    // Кнопка изменения размера
    const changeSizeBtn = document.getElementById('changeSizeBtn');
    if (changeSizeBtn) {
        changeSizeBtn.addEventListener('click', changeGridSize);
    }
}

// ========================================
// Обработка нажатий клавиш
// ========================================
function handleKeydown(e) {
    switch(e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
        case 'ц':
        case 'Ц':
            e.preventDefault();
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
        case 'ы':
        case 'Ы':
            e.preventDefault();
            movePlayer(0, 1);
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
        case 'ф':
        case 'Ф':
            e.preventDefault();
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
        case 'в':
        case 'В':
            e.preventDefault();
            movePlayer(1, 0);
            break;
    }
}

// ========================================
// Перезапуск игры
// ========================================
function restartGame() {
    gameState = {
        playerX: 0,
        playerY: 0,
        steps: 0,
        foundItems: 0,
        grid: [],
        discovered: new Set(),
        cellCounts: {}
    };
    
    generateForest();
    renderGrid();
    updatePlayerPosition(0, 0);
    updateCellStats();
    showMessage('🔄 Игра началась заново!');
    
    // Сохраняем игру
    saveGameRecord();
}

// ========================================
// Изменение размера сетки
// ========================================
function changeGridSize() {
    const sizes = [10, 15, 20];
    const currentIndex = sizes.indexOf(CONFIG.gridSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    CONFIG.gridSize = sizes[nextIndex];
    
    showMessage(`📏 Размер поля изменён на ${CONFIG.gridSize}x${CONFIG.gridSize}`);
    restartGame();
}

// ========================================
// Сохранение и загрузка рекордов
// ========================================
function loadRecords() {
    const records = JSON.parse(localStorage.getItem('gameRecords')) || { bestScore: 0, gamesPlayed: 0 };
    if (bestScoreEl) bestScoreEl.textContent = records.bestScore;
    if (gamesPlayedEl) gamesPlayedEl.textContent = records.gamesPlayed;
}

function saveGameRecord() {
    const records = JSON.parse(localStorage.getItem('gameRecords')) || { bestScore: 0, gamesPlayed: 0 };
    records.gamesPlayed++;
    if (gameState.foundItems > records.bestScore) {
        records.bestScore = gameState.foundItems;
    }
    localStorage.setItem('gameRecords', JSON.stringify(records));
    loadRecords();
}

// ========================================
// Запуск игры при загрузке
// ========================================
window.addEventListener('DOMContentLoaded', init);
