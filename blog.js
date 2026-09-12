/* ========================================
   PythonPath - Блог
   ======================================== */

// ========================================
// Примеры статей
// ========================================
const samplePosts = [
    {
        id: 1,
        title: "Мои первые шаги в Python",
        category: "python",
        author: "Admin",
        date: "2026-03-20",
        tags: ["python", "beginner", "start"],
        content: `# Начало пути

Когда я только начал изучать Python, я не знал, с чего начать. Вот мои заметки для начинающих.

## Установка Python

Первым делом нужно установить Python с официального сайта python.org. Рекомендую версию 3.10 или новее.

## Первая программа

Традиционно, первая программа — это "Hello, World!":

\`\`\`python
print("Hello, World!")
\`\`\`

## Переменные

Переменные в Python объявляются без указания типа:

\`\`\`python
name = "Alex"
age = 25
height = 1.75
\`\`\`

## Что дальше?

Изучайте типы данных, условные операторы и циклы. Практикуйтесь каждый день!`,
        views: 156,
        likes: 23
    },
    {
        id: 2,
        title: "Понимание списков в Python",
        category: "python",
        author: "Admin",
        date: "2026-03-18",
        tags: ["python", "lists", "data-structures"],
        content: `# Списки в Python

Списки — одна из самых важных структур данных в Python.

## Создание списка

\`\`\`python
numbers = [1, 2, 3, 4, 5]
fruits = ["яблоко", "банан", "апельсин"]
mixed = [1, "два", 3.0, True]
\`\`\`

## Основные операции

\`\`\`python
# Добавление
fruits.append("груша")

# Удаление
fruits.remove("банан")

# Доступ к элементу
first = fruits[0]

# Срез
subset = numbers[1:4]  # [2, 3, 4]
\`\`\`

## List Comprehension

Мощная возможность Python:

\`\`\`python
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
\`\`\``,
        views: 203,
        likes: 35
    },
    {
        id: 3,
        title: "Алгоритм бинарного поиска",
        category: "algorithms",
        author: "Admin",
        date: "2026-03-15",
        tags: ["algorithms", "search", "binary"],
        content: `# Бинарный поиск

Бинарный поиск — эффективный алгоритм поиска в отсортированном массиве.

## Как работает

1. Берём средний элемент
2. Сравниваем с искомым
3. Если не совпадает — ищем в половине
4. Повторяем

## Реализация

\`\`\`python
def binary_search(arr, target):
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1
\`\`\`

## Сложность

- Время: O(log n)
- Память: O(1)

Гораздо быстрее линейного поиска O(n)!`,
        views: 178,
        likes: 28
    },
    {
        id: 4,
        title: "Создание веб-приложения на Flask",
        category: "web",
        author: "Admin",
        date: "2026-03-12",
        tags: ["flask", "web", "python"],
        content: `# Веб-приложение на Flask

Flask — лёгкий веб-фреймворк для Python.

## Установка

\`\`\`bash
pip install flask
\`\`\`

## Простое приложение

\`\`\`python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return 'Привет, мир!'

@app.route('/user/<name>')
def user(name):
    return f'Привет, {name}!'

if __name__ == '__main__':
    app.run(debug=True)
\`\`\`

## Запуск

\`\`\`bash
python app.py
\`\`\`

Откройте http://127.0.0.1:5000 в браузере!`,
        views: 245,
        likes: 42
    },
    {
        id: 5,
        title: "10 советов для начинающих программистов",
        category: "tips",
        author: "Admin",
        date: "2026-03-10",
        tags: ["tips", "beginner", "advice"],
        content: `# Советы начинающим

## 1. Практикуйтесь каждый день

Даже 30 минут в день лучше, чем 8 часов раз в неделю.

## 2. Не копируйте код слепо

Разбирайтесь, что делает каждая строка.

## 3. Читайте чужой код

GitHub — отличный ресурс для обучения.

## 4. Пишите чистый код

Следуйте PEP 8, давайте понятные имена переменным.

## 5. Не бойтесь ошибок

Ошибки — это возможность научиться чему-то новому.

## 6. Задавайте вопросы

Stack Overflow и сообщества помогут.

## 7. Делайте проекты

Лучший способ учиться — создавать что-то своё.

## 8. Отдыхайте

Выгорание — реальный враг прогресса.

## 9. Ведите заметки

Записывайте то, что изучили.

## 10. Не сдавайтесь!

Все программисты когда-то были новичками.`,
        views: 312,
        likes: 58
    },
    {
        id: 6,
        title: "Работа с файлами в Python",
        category: "python",
        author: "Admin",
        date: "2026-03-08",
        tags: ["python", "files", "io"],
        content: `# Работа с файлами

## Чтение файла

\`\`\`python
with open('file.txt', 'r', encoding='utf-8') as f:
    content = f.read()
\`\`\`

## Запись в файл

\`\`\`python
with open('output.txt', 'w', encoding='utf-8') as f:
    f.write('Привет, файл!')
\`\`\`

## Построчное чтение

\`\`\`python
with open('file.txt', 'r') as f:
    for line in f:
        print(line.strip())
\`\`\`

## Режимы открытия

- 'r' — чтение
- 'w' — запись (перезаписывает)
- 'a' — добавление
- 'b' — бинарный режим`,
        views: 189,
        likes: 31
    }
];

// ========================================
// Глобальные переменные
// ========================================
let posts = [];
let currentUser = null;

// ========================================
// Инициализация
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initAuth();
    initNavigation();
    loadPosts();
    initFilters();
    initModals();
    initBlogForm();
});

// ========================================
// Загрузка постов
// ========================================
function loadPosts() {
    const stored = localStorage.getItem('blogPosts');
    if (stored) {
        posts = JSON.parse(stored);
    } else {
        posts = [...samplePosts];
        savePosts();
    }
    
    renderPosts(posts);
}

function savePosts() {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
}

// ========================================
// Отрисовка постов
// ========================================
function renderPosts(postsToRender) {
    const grid = document.getElementById('blogGrid');
    if (!grid) return;
    
    if (postsToRender.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">📭</span>
                <h3>Нет статей</h3>
                <p>Будьте первым, кто напишет статью!</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = postsToRender.map(post => `
        <article class="blog-card" data-post-id="${post.id}">
            <div class="blog-card-category">${getCategoryLabel(post.category)}</div>
            <h3 class="blog-card-title">${escapeHtml(post.title)}</h3>
            <div class="blog-card-meta">
                <span class="blog-author">👤 ${escapeHtml(post.author)}</span>
                <span class="blog-date">📅 ${formatDate(post.date)}</span>
            </div>
            <p class="blog-card-preview">${escapeHtml(post.content.substring(0, 200))}...</p>
            <div class="blog-card-tags">
                ${post.tags.map(tag => `<span class="blog-tag">#${tag}</span>`).join('')}
            </div>
            <div class="blog-card-stats">
                <span>👁️ ${post.views}</span>
                <span>👍 ${post.likes}</span>
            </div>
            <button class="btn btn-outline btn-read" onclick="openReadModal(${post.id})">Читать далее →</button>
        </article>
    `).join('');
}

function getCategoryLabel(category) {
    const labels = {
        'python': '🐍 Python',
        'algorithms': '🔍 Алгоритмы',
        'web': '🌐 Web',
        'tips': '💡 Советы'
    };
    return labels[category] || category;
}

// ========================================
// Фильтры и поиск
// ========================================
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('blogSearch');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            filterPosts(filter, searchInput?.value || '');
        });
    });
    
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
            filterPosts(activeFilter, searchInput.value);
        });
    }
}

function filterPosts(category, search) {
    let filtered = [...posts];
    
    if (category !== 'all') {
        filtered = filtered.filter(post => post.category === category);
    }
    
    if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(post => 
            post.title.toLowerCase().includes(searchLower) ||
            post.content.toLowerCase().includes(searchLower) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
    }
    
    renderPosts(filtered);
}

// ========================================
// Модальные окна
// ========================================
function initModals() {
    // Чтение
    const readModal = document.getElementById('readModal');
    const readClose = document.getElementById('readModalClose');
    
    if (readClose) {
        readClose.addEventListener('click', () => {
            readModal.classList.remove('active');
        });
    }
    
    if (readModal) {
        readModal.addEventListener('click', (e) => {
            if (e.target === readModal) {
                readModal.classList.remove('active');
            }
        });
    }
    
    // Редактирование
    const editModal = document.getElementById('editModal');
    const editClose = document.getElementById('editModalClose');
    const cancelEdit = document.getElementById('cancelEditBtn');
    
    if (editClose) {
        editClose.addEventListener('click', () => {
            editModal.classList.remove('active');
        });
    }
    
    if (cancelEdit) {
        cancelEdit.addEventListener('click', () => {
            editModal.classList.remove('active');
        });
    }
    
    if (editModal) {
        editModal.addEventListener('click', (e) => {
            if (e.target === editModal) {
                editModal.classList.remove('active');
            }
        });
    }
    
    // Кнопка добавления
    const addPostBtn = document.getElementById('addPostBtn');
    if (addPostBtn) {
        addPostBtn.addEventListener('click', () => {
            if (!currentUser) {
                alert('Войдите для добавления статьи');
                return;
            }
            openEditModal();
        });
    }
    
    // Лайки
    const likeBtn = document.getElementById('likeBtn');
    if (likeBtn) {
        likeBtn.addEventListener('click', handleLike);
    }
}

// ========================================
// Чтение статьи
// ========================================
function openReadModal(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    
    // Увеличиваем просмотры
    post.views++;
    savePosts();
    
    // Заполняем модальное окно
    document.getElementById('articleCategory').textContent = getCategoryLabel(post.category);
    document.getElementById('articleTitle').textContent = post.title;
    document.getElementById('articleAuthor').textContent = `👤 ${post.author}`;
    document.getElementById('articleDate').textContent = formatDate(post.date);
    document.getElementById('articleViews').textContent = `👁️ ${post.views}`;
    document.getElementById('articleContent').innerHTML = renderMarkdown(post.content);
    document.getElementById('articleTags').innerHTML = post.tags.map(tag => 
        `<span class="blog-tag">#${tag}</span>`
    ).join('');
    document.getElementById('likeCount').textContent = post.likes;
    
    // Сохраняем текущий ID для лайков
    window.currentPostId = postId;
    
    document.getElementById('readModal').classList.add('active');
}

function handleLike() {
    if (!currentUser) {
        alert('Войдите для оценки статьи');
        return;
    }
    
    const postId = window.currentPostId;
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes++;
        savePosts();
        document.getElementById('likeCount').textContent = post.likes;
    }
}

// ========================================
// Добавление/редактирование
// ========================================
function initBlogForm() {
    const form = document.getElementById('blogForm');
    if (form) {
        form.addEventListener('submit', handleBlogSubmit);
    }
}

function openEditModal(postId = null) {
    const modal = document.getElementById('editModal');
    const title = document.getElementById('editModalTitle');
    
    if (postId) {
        const post = posts.find(p => p.id === postId);
        if (post) {
            title.textContent = 'Редактировать статью';
            document.getElementById('editPostId').value = post.id;
            document.getElementById('postTitle').value = post.title;
            document.getElementById('postCategory').value = post.category;
            document.getElementById('postTags').value = post.tags.join(', ');
            document.getElementById('postContent').value = post.content;
        }
    } else {
        title.textContent = 'Новая статья';
        form.reset();
        document.getElementById('editPostId').value = '';
    }
    
    modal.classList.add('active');
}

function handleBlogSubmit(e) {
    e.preventDefault();
    
    if (!currentUser) {
        alert('Войдите для публикации');
        return;
    }
    
    const postId = document.getElementById('editPostId').value;
    const title = document.getElementById('postTitle').value.trim();
    const category = document.getElementById('postCategory').value;
    const tags = parseTags(document.getElementById('postTags').value);
    const content = document.getElementById('postContent').value.trim();
    
    if (postId) {
        // Редактирование
        const index = posts.findIndex(p => p.id === parseInt(postId));
        if (index !== -1) {
            posts[index] = {
                ...posts[index],
                title,
                category,
                tags,
                content
            };
        }
    } else {
        // Новая статья
        const newPost = {
            id: Date.now(),
            title,
            category,
            author: currentUser.username,
            date: new Date().toISOString().split('T')[0],
            tags,
            content,
            views: 0,
            likes: 0
        };
        posts.unshift(newPost);
    }
    
    savePosts();
    renderPosts(posts);
    document.getElementById('editModal').classList.remove('active');
    
    showNotification('✅ Статья опубликована!', 'success');
}

// ========================================
// Утилиты
// ========================================
function parseTags(tagsStr) {
    if (!tagsStr.trim()) return [];
    return tagsStr.split(',')
        .map(tag => tag.trim().toLowerCase())
        .filter(tag => tag.length > 0);
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

function renderMarkdown(text) {
    // Простой рендерер Markdown
    let html = escapeHtml(text);
    
    // Заголовки
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    
    // Код
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Жирный и курсив
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    // Списки
    html = html.replace(/^\- (.*$)/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // Переносы строк
    html = html.replace(/\n/g, '<br>');
    
    return html;
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
