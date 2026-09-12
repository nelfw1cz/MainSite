/* ========================================
   PythonPath - Расширенные функции
   Графики, уведомления, экспорт PDF и т.д.
   ======================================== */

// ========================================
// 1. ГРАФИКИ PROGRESS (Chart.js)
// ========================================

let weekChartInstance = null;
let topicsChartInstance = null;

function initCharts() {
    initWeekChart();
    initTopicsChart();
}

function initWeekChart() {
    const ctx = document.getElementById('weekChartCanvas');
    if (!ctx) return;
    
    // Генерируем данные за неделю
    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const data = Array.from({length: 7}, () => Math.floor(Math.random() * 10) + 1);
    
    if (weekChartInstance) {
        weekChartInstance.destroy();
    }
    
    weekChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: days,
            datasets: [{
                label: 'Решено задач',
                data: data,
                backgroundColor: 'rgba(67, 97, 238, 0.7)',
                borderColor: 'rgba(67, 97, 238, 1)',
                borderWidth: 1,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function initTopicsChart() {
    const ctx = document.getElementById('topicsChartCanvas');
    if (!ctx) return;
    
    const topics = ['Переменные', 'Циклы', 'Функции', 'ООП', 'Алгоритмы'];
    const progress = [100, 85, 70, 45, 60];
    
    if (topicsChartInstance) {
        topicsChartInstance.destroy();
    }
    
    topicsChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: topics,
            datasets: [{
                data: progress,
                backgroundColor: [
                    'rgba(67, 97, 238, 0.8)',
                    'rgba(72, 149, 239, 0.8)',
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(241, 196, 15, 0.8)',
                    'rgba(155, 89, 182, 0.8)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// ========================================
// 2. УВЕДОМЛЕНИЯ
// ========================================

function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${getNotificationIcon(type)}</span>
        <span class="notification-message">${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        background: var(--card-bg);
        border-left: 4px solid var(--${type === 'success' ? 'success-color' : type === 'error' ? 'danger-color' : 'info-color'});
        border-radius: 8px;
        box-shadow: 0 5px 20px var(--shadow-color);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

function getNotificationIcon(type) {
    const icons = {
        'success': '✅',
        'error': '❌',
        'info': 'ℹ️',
        'warning': '⚠️'
    };
    return icons[type] || 'ℹ️';
}

// ========================================
// 3. ЭКСПОРТ В PDF
// ========================================

function exportProgressToPDF() {
    // Проверяем наличие библиотеки jsPDF
    if (typeof jsPDF === 'undefined') {
        showNotification('Библиотека jsPDF не загружена', 'error');
        return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    const stats = JSON.parse(localStorage.getItem('stats')) || {};
    
    // Заголовок
    doc.setFontSize(20);
    doc.setTextColor(67, 97, 238);
    doc.text('PythonPath - Прогресс обучения', 20, 20);
    
    // Информация о пользователе
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Пользователь: ${userData.username || 'Гость'}`, 20, 40);
    doc.text(`Уровень: ${userData.level || 1}`, 20, 50);
    doc.text(`XP: ${userData.xp || 0}`, 20, 60);
    
    // Статистика
    doc.setFontSize(16);
    doc.text('Статистика', 20, 80);
    
    doc.setFontSize(12);
    doc.text(`Всего задач: ${stats.tasksCount || 0}`, 20, 95);
    doc.text(`Дней подряд: ${stats.streakCount || 0}`, 20, 105);
    doc.text(`Часов обучения: ${stats.hoursCount || 0}`, 20, 115);
    
    // Дата генерации
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text(`Отчёт сгенерирован: ${new Date().toLocaleDateString('ru-RU')}`, 20, 140);
    
    // Сохранение
    doc.save(`pythonpath-progress-${new Date().toISOString().split('T')[0]}.pdf`);
    
    showNotification('PDF экспортирован!', 'success');
}

// ========================================
// 4. КАЛЕНДАРЬ АКТИВНОСТИ (GitHub-style)
// ========================================

function initActivityCalendar() {
    const calendar = document.getElementById('activityCalendar');
    if (!calendar) return;
    
    calendar.innerHTML = '';
    calendar.style.cssText = `
        display: grid;
        grid-template-columns: repeat(52, 1fr);
        gap: 3px;
        max-width: 1000px;
        margin: 0 auto;
    `;
    
    // Генерируем 364 дня (52 недели * 7 дней)
    for (let i = 0; i < 364; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day';
        
        // Случайный уровень активности для демонстрации
        const activityLevel = Math.floor(Math.random() * 5);
        day.classList.add(`level-${activityLevel}`);
        day.style.cssText = `
            aspect-ratio: 1;
            border-radius: 3px;
            background: ${getActivityColor(activityLevel)};
            cursor: pointer;
            transition: transform 0.2s;
        `;
        
        day.addEventListener('mouseenter', () => {
            day.style.transform = 'scale(1.3)';
        });
        
        day.addEventListener('mouseleave', () => {
            day.style.transform = 'scale(1)';
        });
        
        calendar.appendChild(day);
    }
}

function getActivityColor(level) {
    const colors = [
        'var(--bg-secondary)',
        'rgba(67, 97, 238, 0.2)',
        'rgba(67, 97, 238, 0.4)',
        'rgba(67, 97, 238, 0.7)',
        'var(--accent-primary)'
    ];
    return colors[level] || colors[0];
}

// ========================================
// 5. ДОСКА ПОЧЁТА (LEADERBOARD)
// ========================================

function initLeaderboard() {
    const leaderboard = document.getElementById('leaderboard');
    if (!leaderboard) return;
    
    // Пример данных
    const leaders = [
        { name: 'Admin', xp: 5000, level: 50 },
        { name: 'PythonMaster', xp: 3500, level: 35 },
        { name: 'CodeNinja', xp: 2800, level: 28 },
        { name: 'DevPro', xp: 2100, level: 21 },
        { name: 'You', xp: 1500, level: 15, isUser: true }
    ];
    
    leaderboard.innerHTML = `
        <div class="leaderboard-list">
            ${leaders.map((leader, index) => `
                <div class="leader-item ${leader.isUser ? 'user-item' : ''}">
                    <span class="leader-rank">#${index + 1}</span>
                    <span class="leader-name">${leader.name}</span>
                    <span class="leader-xp">${leader.xp} XP</span>
                    <span class="leader-level">Lvl ${leader.level}</span>
                </div>
            `).join('')}
        </div>
    `;
}

// ========================================
// 6. ПЛАН ОБУЧЕНИЯ (ROADMAP)
// ========================================

function initRoadmap() {
    const roadmap = document.getElementById('roadmap');
    if (!roadmap) return;
    
    const stages = [
        { 
            title: 'Основы Python', 
            status: 'completed', 
            icon: '🔰',
            items: ['Переменные', 'Типы данных', 'Операторы', 'Условия']
        },
        { 
            title: 'Циклы и функции', 
            status: 'completed', 
            icon: '🔁',
            items: ['for/while', 'break/continue', 'def', 'return']
        },
        { 
            title: 'Структуры данных', 
            status: 'in-progress', 
            icon: '📦',
            items: ['Списки', 'Словари', 'Множества', 'Кортежи']
        },
        { 
            title: 'ООП', 
            status: 'locked', 
            icon: '🏗️',
            items: ['Классы', 'Объекты', 'Наследование', 'Полиморфизм']
        },
        { 
            title: 'Веб-разработка', 
            status: 'locked', 
            icon: '🌐',
            items: ['Flask/Django', 'API', 'Базы данных', 'Деплой']
        }
    ];
    
    roadmap.innerHTML = `
        <div class="roadmap-timeline">
            ${stages.map((stage, index) => `
                <div class="roadmap-stage ${stage.status}">
                    <div class="roadmap-icon">${stage.icon}</div>
                    <div class="roadmap-content">
                        <h3>${stage.title}</h3>
                        <ul>
                            ${stage.items.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                        <span class="roadmap-status">${getStageStatusLabel(stage.status)}</span>
                    </div>
                    ${index < stages.length - 1 ? '<div class="roadmap-connector"></div>' : ''}
                </div>
            `).join('')}
        </div>
    `;
}

function getStageStatusLabel(status) {
    const labels = {
        'completed': '✅ Пройдено',
        'in-progress': '🔄 В процессе',
        'locked': '🔒 Заблокировано'
    };
    return labels[status] || status;
}

// ========================================
// 7. МНОГОЯЗЫЧНОСТЬ (i18n)
// ========================================

const translations = {
    ru: {
        'home': 'Главная',
        'tasks': 'Задачи',
        'progress': 'Прогресс',
        'profile': 'Профиль',
        'blog': 'Блог',
        'quiz': 'Квиз',
        'game': 'Игра',
        'theme': 'Тема'
    },
    en: {
        'home': 'Home',
        'tasks': 'Tasks',
        'progress': 'Progress',
        'profile': 'Profile',
        'blog': 'Blog',
        'quiz': 'Quiz',
        'game': 'Game',
        'theme': 'Theme'
    }
};

let currentLang = localStorage.getItem('lang') || 'ru';

function setLanguage(lang) {
    if (!translations[lang]) return;
    
    currentLang = lang;
    localStorage.setItem('lang', lang);
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    showNotification(`Language changed to ${lang === 'ru' ? 'Русский' : 'English'}`, 'success');
}

function initLanguageSwitcher() {
    const switcher = document.getElementById('languageSwitcher');
    if (!switcher) return;
    
    switcher.innerHTML = `
        <button class="lang-btn ${currentLang === 'ru' ? 'active' : ''}" onclick="setLanguage('ru')">🇷🇺 RU</button>
        <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" onclick="setLanguage('en')">🇺🇸 EN</button>
    `;
}

// ========================================
// 8. ЖЕСТЫ ДЛЯ МОБИЛЬНОГО МЕНЮ
// ========================================

function initTouchGestures() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            const mobileMenu = document.getElementById('mobileMenu');
            const hamburger = document.getElementById('hamburger');
            
            if (diff > 0 && mobileMenu?.classList.contains('active')) {
                // Свайп влево - закрыть меню
                mobileMenu.classList.remove('active');
                hamburger?.classList.remove('active');
            } else if (diff < 0 && !mobileMenu?.classList.contains('active')) {
                // Свайп вправо - открыть меню (если не на главной)
                // Можно добавить дополнительную логику
            }
        }
    }
}

// ========================================
// 9. ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ
// ========================================

// Копирование текста в буфер
function copyToClipboard(text, callback) {
    navigator.clipboard.writeText(text).then(() => {
        if (callback) callback();
        showNotification('Скопировано в буфер!', 'success');
    }).catch(err => {
        showNotification('Ошибка копирования', 'error');
    });
}

// Подсчёт времени на странице
let pageTimeSeconds = 0;
setInterval(() => {
    pageTimeSeconds++;
    // Можно сохранять в localStorage для статистики
}, 1000);

// Проверка ежедневного бонуса
function checkDailyBonus() {
    const lastBonus = localStorage.getItem('lastDailyBonus');
    const today = new Date().toDateString();
    
    if (lastBonus !== today) {
        // Пользователь ещё не получал бонус сегодня
        showNotification('🎁 Ежедневный бонус: +10 XP!', 'success', 5000);
        localStorage.setItem('lastDailyBonus', today);
        
        const userData = JSON.parse(localStorage.getItem('userData')) || {};
        userData.xp = (userData.xp || 0) + 10;
        localStorage.setItem('userData', JSON.stringify(userData));
    }
}

// ========================================
// ИНИЦИАЛИЗАЦИЯ
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Инициализация графиков
    initCharts();
    
    // Календарь активности
    initActivityCalendar();
    
    // Доска почёта
    initLeaderboard();
    
    // План обучения
    initRoadmap();
    
    // Переключатель языка
    initLanguageSwitcher();
    
    // Жесты
    initTouchGestures();
    
    // Ежедневный бонус
    checkDailyBonus();
    
    // Экспорт функции глобально
    window.exportProgressToPDF = exportProgressToPDF;
    window.setLanguage = setLanguage;
    window.copyToClipboard = copyToClipboard;
});
