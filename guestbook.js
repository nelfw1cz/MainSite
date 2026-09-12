/* ========================================
   PythonPath - Гостевая книга
   ======================================== */

// ========================================
// Примеры сообщений
// ========================================
const sampleMessages = [
    {
        id: 1,
        name: "Алексей",
        email: "alex@example.com",
        message: "Отличный сайт! Очень помогли задачи с решениями. Продолжай в том же духе!",
        rating: 5,
        date: "2026-03-20",
        replies: []
    },
    {
        id: 2,
        name: "Мария",
        email: "maria@example.com",
        message: "Шпаргалки просто супер! Сохранила себе в закладки. Особенно понравился раздел про словари.",
        rating: 5,
        date: "2026-03-19",
        replies: []
    },
    {
        id: 3,
        name: "Дмитрий",
        email: "dmitry@example.com",
        message: "Квиз по Python очень полезный! Проверил свои знания, нашёл пробелы. Спасибо!",
        rating: 4,
        date: "2026-03-18",
        replies: []
    },
    {
        id: 4,
        name: "Елена",
        email: "elena@example.com",
        message: "Начинаю изучать Python, ваш сайт стал отличным помощником. Всё понятно и структурировано.",
        rating: 5,
        date: "2026-03-15",
        replies: []
    },
    {
        id: 5,
        name: "Иван",
        email: "ivan@example.com",
        message: "Игра 'Прогулка по лесу' - отличная идея для отдыха! А потом снова решать задачи 😄",
        rating: 4,
        date: "2026-03-12",
        replies: []
    }
];

// ========================================
// Глобальные переменные
// ========================================
let messages = [];

// ========================================
// Инициализация
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initAuth();
    initNavigation();
    loadMessages();
    initGuestbookForm();
    initRating();
    initSort();
});

// ========================================
// Загрузка сообщений
// ========================================
function loadMessages() {
    const stored = localStorage.getItem('guestbookMessages');
    if (stored) {
        messages = JSON.parse(stored);
    } else {
        messages = [...sampleMessages];
        saveMessages();
    }
    
    renderMessages(messages);
    updateStats();
}

function saveMessages() {
    localStorage.setItem('guestbookMessages', JSON.stringify(messages));
}

// ========================================
// Отрисовка сообщений
// ========================================
function renderMessages(messagesToRender) {
    const list = document.getElementById('messagesList');
    if (!list) return;
    
    if (messagesToRender.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">💬</span>
                <h3>Нет сообщений</h3>
                <p>Будьте первым, кто оставит сообщение!</p>
            </div>
        `;
        return;
    }
    
    list.innerHTML = messagesToRender.map(msg => `
        <article class="message-card" data-message-id="${msg.id}">
            <header class="message-header">
                <div class="message-author">
                    <span class="author-avatar">${getAvatar(msg.name)}</span>
                    <div class="author-info">
                        <span class="author-name">${escapeHtml(msg.name)}</span>
                        <span class="message-date">${formatDate(msg.date)}</span>
                    </div>
                </div>
                <div class="message-rating">
                    ${getStars(msg.rating)}
                </div>
            </header>
            <div class="message-content">
                ${escapeHtml(msg.message)}
            </div>
            <footer class="message-footer">
                <button class="message-reply-btn" onclick="showReplyForm(${msg.id})">
                    💬 Ответить
                </button>
                ${msg.replies && msg.replies.length > 0 ? `
                    <span class="reply-count">${msg.replies.length} ответ(ов)</span>
                ` : ''}
            </footer>
            ${msg.replies && msg.replies.length > 0 ? `
                <div class="replies-list">
                    ${msg.replies.map(reply => `
                        <div class="reply-card">
                            <span class="reply-author">${escapeHtml(reply.name)}</span>
                            <span class="reply-date">${formatDate(reply.date)}</span>
                            <p class="reply-content">${escapeHtml(reply.message)}</p>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            <form class="reply-form hidden" id="replyForm${msg.id}">
                <input type="hidden" name="parentId" value="${msg.id}">
                <div class="form-group">
                    <label>Ваше имя</label>
                    <input type="text" name="name" required value="${getCurrentUserName()}">
                </div>
                <div class="form-group">
                    <label>Ответ</label>
                    <textarea name="message" rows="2" required></textarea>
                </div>
                <div class="reply-actions">
                    <button type="submit" class="btn btn-primary">Отправить</button>
                    <button type="button" class="btn btn-secondary" onclick="hideReplyForm(${msg.id})">Отмена</button>
                </div>
            </form>
        </article>
    `).join('');
    
    // Обработчики форм ответов
    messagesToRender.forEach(msg => {
        const form = document.getElementById(`replyForm${msg.id}`);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                addReply(msg.id, form);
            });
        }
    });
}

// ========================================
// Добавление сообщения
// ========================================
function initGuestbookForm() {
    const form = document.getElementById('guestbookForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newMessage = {
                id: Date.now(),
                name: document.getElementById('guestName').value.trim(),
                email: document.getElementById('guestEmail').value.trim(),
                message: document.getElementById('guestMessage').value.trim(),
                rating: parseInt(document.getElementById('guestRating').value) || 0,
                date: new Date().toISOString().split('T')[0],
                replies: []
            };
            
            messages.unshift(newMessage);
            saveMessages();
            renderMessages(messages);
            updateStats();
            
            form.reset();
            document.getElementById('guestRating').value = '0';
            updateRatingDisplay(0);
            
            showNotification('✅ Сообщение отправлено!', 'success');
        });
    }
}

// ========================================
// Ответы на сообщения
// ========================================
function showReplyForm(messageId) {
    const form = document.getElementById(`replyForm${messageId}`);
    if (form) {
        form.classList.remove('hidden');
    }
}

function hideReplyForm(messageId) {
    const form = document.getElementById(`replyForm${messageId}`);
    if (form) {
        form.classList.add('hidden');
    }
}

function addReply(messageId, form) {
    const message = messages.find(m => m.id === messageId);
    if (!message) return;
    
    const reply = {
        id: Date.now(),
        name: form.querySelector('[name="name"]').value.trim(),
        message: form.querySelector('[name="message"]').value.trim(),
        date: new Date().toISOString().split('T')[0]
    };
    
    if (!message.replies) {
        message.replies = [];
    }
    message.replies.push(reply);
    
    saveMessages();
    renderMessages(messages);
    
    showNotification('✅ Ответ отправлен!', 'success');
}

// ========================================
// Рейтинг
// ========================================
function initRating() {
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('guestRating');
    
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const value = parseInt(star.dataset.value);
            ratingInput.value = value;
            updateRatingDisplay(value);
        });
        
        star.addEventListener('mouseenter', () => {
            const value = parseInt(star.dataset.value);
            highlightStars(value);
        });
    });
    
    const ratingContainer = document.getElementById('ratingInput');
    if (ratingContainer) {
        ratingContainer.addEventListener('mouseleave', () => {
            const value = parseInt(ratingInput.value);
            highlightStars(value);
        });
    }
}

function updateRatingDisplay(value) {
    highlightStars(value);
}

function highlightStars(value) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < value) {
            star.style.opacity = '1';
            star.style.transform = 'scale(1.2)';
        } else {
            star.style.opacity = '0.3';
            star.style.transform = 'scale(1)';
        }
    });
}

function getStars(rating) {
    if (!rating || rating === 0) return '';
    return '⭐'.repeat(rating);
}

// ========================================
// Сортировка
// ========================================
function initSort() {
    const sortSelect = document.getElementById('messagesSort');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            sortMessages(e.target.value);
        });
    }
}

function sortMessages(sortBy) {
    let sorted = [...messages];
    
    switch(sortBy) {
        case 'newest':
            sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'oldest':
            sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'rating':
            sorted.sort((a, b) => b.rating - a.rating);
            break;
    }
    
    renderMessages(sorted);
}

// ========================================
// Статистика
// ========================================
function updateStats() {
    const totalMessages = messages.length;
    const uniqueAuthors = new Set(messages.map(m => m.name)).size;
    const avgRating = messages.length > 0 
        ? Math.round(messages.reduce((sum, m) => sum + (m.rating || 0), 0) / messages.length)
        : 0;
    
    document.getElementById('totalMessages').textContent = totalMessages;
    document.getElementById('totalAuthors').textContent = uniqueAuthors;
    document.getElementById('topRating').textContent = avgRating;
}

// ========================================
// Утилиты
// ========================================
function getAvatar(name) {
    return name.charAt(0).toUpperCase();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function getCurrentUserName() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData?.username || '';
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        background: var(--card-bg);
        border-left: 4px solid var(--${type === 'success' ? 'success-color' : 'danger-color'});
        border-radius: 8px;
        box-shadow: 0 5px 20px var(--shadow-color);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
