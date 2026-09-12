/* ========================================
   PythonPath - Основной JavaScript
   ======================================== */

// ========================================
// Регистрация PWA
// ========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then((registration) => {
                console.log('SW registered:', registration.scope);
            })
            .catch((error) => {
                console.log('SW registration failed:', error);
            });
    });
}

// ========================================
// Глобальные данные
// ========================================

// Примеры задач для демонстрации
const sampleTasks = [
    {
        id: 1,
        title: "Сумма цифр числа",
        difficulty: "easy",
        date: "2026-03-20",
        preview: "Напишите программу, которая находит сумму цифр заданного натурального числа.",
        tags: ["циклы", "математика"],
        code: `# Задача: Найти сумму цифр числа
# Пример: 1234 → 1+2+3+4 = 10

def sum_of_digits(n):
    """Функция для подсчёта суммы цифр числа"""
    total = 0
    while n > 0:
        digit = n % 10  # Получаем последнюю цифру
        total += digit
        n //= 10  # Убираем последнюю цифру
    return total

# Пример использования
number = 1234
result = sum_of_digits(number)
print(f"Сумма цифр числа {number} = {result}")

# Альтернативное решение через строку
def sum_digits_str(n):
    return sum(int(d) for d in str(n))

print(f"Альтернативное решение: {sum_digits_str(1234)}")`,
        explanation: "В этом решении мы используем цикл while для последовательного извлечения цифр из числа. Оператор % 10 возвращает последнюю цифру, а // 10 удаляет её из числа. Альтернативное решение преобразует число в строку и суммирует цифры через генератор."
    },
    {
        id: 2,
        title: "Проверка на простое число",
        difficulty: "medium",
        date: "2026-03-19",
        preview: "Реализуйте функцию, которая проверяет, является ли число простым.",
        tags: ["функции", "условия", "математика"],
        code: `# Задача: Проверить число на простоту
# Простое число делится только на 1 и само на себя

def is_prime(n):
    """Проверка числа на простоту"""
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    
    # Проверяем делители до корня из n
    for i in range(3, int(n ** 0.5) + 1, 2):
        if n % i == 0:
            return False
    return True

# Тестирование
test_numbers = [1, 2, 3, 4, 5, 17, 20, 23, 100]
for num in test_numbers:
    result = is_prime(num)
    print(f"{num} - простое: {result}")

# Находим все простые до 50
primes = [n for n in range(2, 51) if is_prime(n)]
print(f"Простые числа до 50: {primes}")`,
        explanation: "Функция проверяет делимость числа. Оптимизация: достаточно проверять делители до квадратного корня из n, так как если n = a*b и a ≤ b, то a² ≤ n. Также пропускаем чётные числа после проверки на 2."
    },
    {
        id: 3,
        title: "Сортировка пузырьком",
        difficulty: "medium",
        date: "2026-03-18",
        preview: "Реализуйте алгоритм сортировки пузырьком без использования встроенной сортировки.",
        tags: ["алгоритмы", "сортировка", "списки"],
        code: `# Задача: Сортировка пузырьком (Bubble Sort)

def bubble_sort(arr):
    """Сортировка массива методом пузырька"""
    n = len(arr)
    # Копируем массив, чтобы не менять исходный
    result = arr.copy()
    
    for i in range(n - 1):
        # Флаг для оптимизации
        swapped = False
        
        for j in range(n - i - 1):
            if result[j] > result[j + 1]:
                # Меняем элементы местами
                result[j], result[j + 1] = result[j + 1], result[j]
                swapped = True
        
        # Если не было обменов, массив уже отсортирован
        if not swapped:
            break
    
    return result

# Тестирование
test_array = [64, 34, 25, 12, 22, 11, 90]
print(f"Исходный: {test_array}")
sorted_array = bubble_sort(test_array)
print(f"Отсортированный: {sorted_array}")

# Проверка
print(f"Исходный не изменился: {test_array}")`,
        explanation: "Сортировка пузырьком многократно проходит по массиву, сравнивая соседние элементы и меняя их местами при необходимости. Оптимизация: если за проход не было обменов, массив уже отсортирован."
    },
    {
        id: 4,
        title: "Подсчёт гласных в строке",
        difficulty: "easy",
        date: "2026-03-17",
        preview: "Напишите функцию для подсчёта количества гласных букв в строке.",
        tags: ["строки", "циклы"],
        code: `# Задача: Подсчитать гласные буквы в строке

def count_vowels(text):
    """Подсчёт количества гласных в строке"""
    vowels = 'аеёиоуыэюяaeiouAEIOUАЕЁИОУЫЭЮЯ'
    count = 0
    
    for char in text:
        if char in vowels:
            count += 1
    
    return count

# Более компактное решение
def count_vowels_short(text):
    vowels = set('аеёиоуыэюяaeiouAEIOUАЕЁИОУЫЭЮЯ')
    return sum(1 for char in text if char in vowels)

# Тестирование
test_strings = [
    "Привет, мир!",
    "Hello, World!",
    "Программирование на Python",
    "aeiou"
]

for text in test_strings:
    result = count_vowels(text)
    print(f"'{text}' → {result} гласных")`,
        explanation: "Функция проходит по каждому символу строки и проверяет, содержится ли он в наборе гласных букв. Учтены как английские, так и русские гласные. Второе решение использует set для более быстрого поиска."
    },
    {
        id: 5,
        title: "Рекурсивный факториал",
        difficulty: "easy",
        date: "2026-03-16",
        preview: "Реализуйте вычисление факториала числа с помощью рекурсии.",
        tags: ["рекурсия", "функции"],
        code: `# Задача: Вычислить факториал числа рекурсивно
# n! = n * (n-1) * (n-2) * ... * 1
# 0! = 1

def factorial(n):
    """Рекурсивное вычисление факториала"""
    # Базовый случай
    if n == 0 or n == 1:
        return 1
    
    # Рекурсивный случай
    return n * factorial(n - 1)

# Итеративная версия (без рекурсии)
def factorial_iter(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

# Тестирование
for i in range(11):
    print(f"{i}! = {factorial(i)}")

# Проверка на больших числах
print(f"\\n20! = {factorial(20)}")`,
        explanation: "Рекурсивная функция вызывает сама себя с уменьшающимся аргументом до достижения базового случая (n=0 или n=1). Итеративная версия использует цикл и может быть эффективнее для больших чисел."
    },
    {
        id: 6,
        title: "Поиск дубликатов в списке",
        difficulty: "medium",
        date: "2026-03-15",
        preview: "Найдите все повторяющиеся элементы в списке.",
        tags: ["списки", "множества", "словари"],
        code: `# Задача: Найти дубликаты в списке

def find_duplicates(arr):
    """Возвращает список дублирующихся элементов"""
    seen = set()
    duplicates = set()
    
    for item in arr:
        if item in seen:
            duplicates.add(item)
        else:
            seen.add(item)
    
    return list(duplicates)

# С использованием Counter
from collections import Counter

def find_duplicates_counter(arr):
    """Находит дубликаты через Counter"""
    counts = Counter(arr)
    return [item for item, count in counts.items() if count > 1]

# Тестирование
test_list = [1, 2, 3, 2, 4, 5, 3, 6, 7, 5, 5]
print(f"Исходный список: {test_list}")
print(f"Дубликаты: {find_duplicates(test_list)}")
print(f"Дубликаты (Counter): {find_duplicates_counter(test_list)}")`,
        explanation: "Используем два множества: одно для отслеживания увиденных элементов, другое — для дубликатов. Альтернативное решение использует Counter для подсчёта вхождений каждого элемента."
    },
    {
        id: 7,
        title: "Шифр Цезаря",
        difficulty: "hard",
        date: "2026-03-14",
        preview: "Реализуйте шифр Цезаря для шифрования и дешифрования текста.",
        tags: ["строки", "шифрование", "функции"],
        code: `# Задача: Реализовать шифр Цезаря

def caesar_cipher(text, shift, decrypt=False):
    """
    Шифр Цезаря
    :param text: Текст для шифрования
    :param shift: Сдвиг (ключ)
    :param decrypt: Если True - дешифруем
    """
    if decrypt:
        shift = -shift
    
    result = []
    
    for char in text:
        if char.isalpha():
            # Определяем алфавит
            if char.islower():
                base = ord('а') if char >= 'а' else ord('a')
                alphabet_size = 32 if char >= 'а' else 26
            else:
                base = ord('А') if char >= 'А' else ord('A')
                alphabet_size = 32 if char >= 'А' else 26
            
            # Смещаем символ
            shifted = (ord(char) - base + shift) % alphabet_size
            result.append(chr(base + shifted))
        else:
            # Не буквы оставляем без изменений
            result.append(char)
    
    return ''.join(result)

# Тестирование
original = "Привет, мир! Hello, World!"
shift = 3

encrypted = caesar_cipher(original, shift)
decrypted = caesar_cipher(encrypted, shift, decrypt=True)

print(f"Оригинал: {original}")
print(f"Зашифровано: {encrypted}")
print(f"Расшифровано: {decrypted}")`,
        explanation: "Шифр Цезаря сдвигает каждую букву на заданное количество позиций. Реализация поддерживает русский и английский алфавиты, сохраняет регистр и не изменяет небуквенные символы."
    }
];

// Данные пользователя
let userData = {
    isLoggedIn: false,
    username: "",
    email: "",
    xp: 0,
    level: 1,
    tasksCompleted: 0,
    streak: 0,
    theme: "light"
};

// ========================================
// Инициализация при загрузке
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initAuth();
    initNavigation();
    initFAQ();
    loadTasks();
    loadStats();
    initProfile();
    initContactForm();
});

// ========================================
// Управление темой
// ========================================

function initTheme() {
    // Загружаем сохранённую тему
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    
    // Обработчик кнопки переключения темы
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Обработчики карточек тем
    document.querySelectorAll('.theme-card').forEach(card => {
        card.addEventListener('click', () => {
            const theme = card.dataset.theme;
            applyTheme(theme);
        });
    });
    
    // Обработчики точек тем в футере
    document.querySelectorAll('.theme-dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            const theme = dot.dataset.theme;
            applyTheme(theme);
        });
    });
}

function toggleTheme() {
    const themes = ['light', 'dark', 'blue', 'green', 'purple', 'orange'];
    const currentTheme = document.documentElement.dataset.theme || 'light';
    const currentIndex = themes.indexOf(currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    applyTheme(nextTheme);
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    
    // Обновляем иконку
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        const icons = {
            'light': '🌙',
            'dark': '☀️',
            'blue': '💙',
            'green': '💚',
            'purple': '💜',
            'orange': '🧡'
        };
        themeIcon.textContent = icons[theme] || '🌙';
    }
    
    // Обновляем активную карточку темы
    document.querySelectorAll('.theme-card').forEach(card => {
        card.classList.toggle('active', card.dataset.theme === theme);
    });
}

// ========================================
// Авторизация
// ========================================

function initAuth() {
    // Проверяем сохранённые данные
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
        userData = JSON.parse(savedUser);
        updateAuthUI();
    }
    
    // Кнопка входа
    const authBtn = document.getElementById('authBtn');
    if (authBtn) {
        authBtn.addEventListener('click', openAuthModal);
    }
    
    // Кнопка выхода
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    // Модальное окно
    const modalClose = document.getElementById('modalClose');
    if (modalClose) {
        modalClose.addEventListener('click', closeAuthModal);
    }
    
    // Переключение вкладок
    document.querySelectorAll('.modal-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const tabName = tab.dataset.tab;
            if (tabName === 'login') {
                document.getElementById('loginForm').classList.remove('hidden');
                document.getElementById('registerForm').classList.add('hidden');
            } else {
                document.getElementById('loginForm').classList.add('hidden');
                document.getElementById('registerForm').classList.remove('hidden');
            }
        });
    });
    
    // Формы
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Ссылки переключения
    const showRegister = document.getElementById('showRegister');
    if (showRegister) {
        showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('[data-tab="register"]').click();
        });
    }
    
    const showLogin = document.getElementById('showLogin');
    if (showLogin) {
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('[data-tab="login"]').click();
        });
    }
    
    // Закрытие по клику вне модального окна
    const modalOverlay = document.getElementById('authModal');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeAuthModal();
            }
        });
    }
}

function openAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Простая имитация входа (в реальном проекте - запрос к серверу)
    userData.isLoggedIn = true;
    userData.email = email;
    userData.username = email.split('@')[0];
    
    // Сохраняем данные
    localStorage.setItem('userData', JSON.stringify(userData));
    
    updateAuthUI();
    closeAuthModal();
    
    // Очищаем форму
    e.target.reset();
    
    alert(`Добро пожаловать, ${userData.username}!`);
}

function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    // Простая имитация регистрации
    userData.isLoggedIn = true;
    userData.username = name;
    userData.email = email;
    
    // Сохраняем данные
    localStorage.setItem('userData', JSON.stringify(userData));
    
    updateAuthUI();
    closeAuthModal();
    
    // Очищаем форму
    e.target.reset();
    
    alert(`Регистрация успешна, ${userData.username}!`);
}

function logout() {
    userData = {
        isLoggedIn: false,
        username: "",
        email: "",
        xp: 0,
        level: 1,
        tasksCompleted: 0,
        streak: 0,
        theme: userData.theme
    };
    
    localStorage.removeItem('userData');
    updateAuthUI();
    
    // Перенаправляем на главную
    if (window.location.pathname.includes('profile.html')) {
        window.location.href = 'index.html';
    }
}

function updateAuthUI() {
    const authBtn = document.getElementById('authBtn');
    const userMenu = document.getElementById('userMenu');
    const usernameDisplay = document.getElementById('usernameDisplay');
    
    if (userData.isLoggedIn) {
        if (authBtn) authBtn.classList.add('hidden');
        if (userMenu) {
            userMenu.classList.remove('hidden');
            if (usernameDisplay) {
                usernameDisplay.textContent = userData.username;
            }
        }
    } else {
        if (authBtn) authBtn.classList.remove('hidden');
        if (userMenu) userMenu.classList.add('hidden');
    }
}

// ========================================
// Навигация
// ========================================

function initNavigation() {
    // Мобильное меню
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Подсветка активной ссылки
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ========================================
// Задачи
// ========================================

function getTasks() {
    // Сначала пробуем загрузить из localStorage
    const stored = localStorage.getItem('tasks');
    if (stored) {
        return JSON.parse(stored);
    }
    // Если нет сохранённых - возвращаем демо-задачи
    return sampleTasks;
}

function loadTasks() {
    const tasksList = document.getElementById('tasksList');
    const recentTasks = document.getElementById('recentTasks');
    const tasks = getTasks();
    
    if (tasksList) {
        renderTasksList(tasksList, tasks);
        initTaskFilters(tasksList);
    }
    
    if (recentTasks) {
        const recent = tasks.slice(0, 3);
        renderTasksPreview(recentTasks, recent);
    }
    
    // Модальное окно задачи
    initTaskModal();
}

function renderTasksList(container, tasks) {
    container.innerHTML = tasks.map(task => `
        <div class="task-card" data-task-id="${task.id}">
            <div class="task-card-header">
                <h3 class="task-card-title">${task.title}</h3>
                <div class="task-card-meta">
                    <span class="task-difficulty ${task.difficulty}">${getDifficultyLabel(task.difficulty)}</span>
                    <span class="task-date">${formatDate(task.date)}</span>
                </div>
            </div>
            <div class="task-card-body">
                <p class="task-card-preview">${task.preview}</p>
                <div class="task-tags">
                    ${task.tags.map(tag => `<span class="task-tag">#${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
    
    // Обработчики кликов
    container.querySelectorAll('.task-card').forEach(card => {
        card.addEventListener('click', () => {
            const taskId = parseInt(card.dataset.taskId);
            openTaskModal(taskId);
        });
    });
}

function renderTasksPreview(container, tasks) {
    container.innerHTML = tasks.map(task => `
        <div class="task-card" data-task-id="${task.id}">
            <div class="task-card-header">
                <h3 class="task-card-title">${task.title}</h3>
                <div class="task-card-meta">
                    <span class="task-difficulty ${task.difficulty}">${getDifficultyLabel(task.difficulty)}</span>
                </div>
            </div>
            <div class="task-card-body">
                <p class="task-card-preview">${task.preview}</p>
            </div>
        </div>
    `).join('');
    
    container.querySelectorAll('.task-card').forEach(card => {
        card.addEventListener('click', () => {
            const taskId = parseInt(card.dataset.taskId);
            openTaskModal(taskId);
        });
    });
}

function getDifficultyLabel(difficulty) {
    const labels = {
        'easy': 'Лёгкая',
        'medium': 'Средняя',
        'hard': 'Сложная'
    };
    return labels[difficulty] || difficulty;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function initTaskFilters(container) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('taskSearch');
    const sortSelect = document.getElementById('taskSort');
    
    let currentFilter = 'all';
    let searchQuery = '';
    let sortMode = 'newest';
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            filterTasks(currentFilter, searchQuery, sortMode);
        });
    });
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            filterTasks(currentFilter, searchQuery, sortMode);
        });
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            sortMode = e.target.value;
            filterTasks(currentFilter, searchQuery, sortMode);
        });
    }
    
    function filterTasks(filter, search, sort) {
        let filtered = [...sampleTasks];
        
        // Фильтр по сложности
        if (filter !== 'all') {
            filtered = filtered.filter(task => task.difficulty === filter);
        }
        
        // Поиск
        if (search) {
            filtered = filtered.filter(task => 
                task.title.toLowerCase().includes(search) ||
                task.preview.toLowerCase().includes(search) ||
                task.tags.some(tag => tag.toLowerCase().includes(search))
            );
        }
        
        // Сортировка
        if (sort === 'newest') {
            filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sort === 'oldest') {
            filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (sort === 'difficulty') {
            const diffOrder = { 'easy': 1, 'medium': 2, 'hard': 3 };
            filtered.sort((a, b) => diffOrder[a.difficulty] - diffOrder[b.difficulty]);
        }
        
        renderTasksList(container, filtered);
    }
}

function initTaskModal() {
    const modal = document.getElementById('taskModal');
    const closeBtn = document.getElementById('taskModalClose');
    const copyBtn = document.getElementById('copyCode');
    
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
    
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const code = document.getElementById('taskCode');
            if (code) {
                navigator.clipboard.writeText(code.textContent);
                copyBtn.textContent = '✅ Скопировано!';
                setTimeout(() => {
                    copyBtn.textContent = '📋 Копировать';
                }, 2000);
            }
        });
    }
}

function openTaskModal(taskId) {
    const task = sampleTasks.find(t => t.id === taskId);
    if (!task) return;
    
    const modal = document.getElementById('taskModal');
    if (!modal) return;
    
    // Заполняем данные
    document.getElementById('taskDifficulty').textContent = getDifficultyLabel(task.difficulty);
    document.getElementById('taskDifficulty').className = `task-difficulty ${task.difficulty}`;
    document.getElementById('taskTitle').textContent = task.title;
    document.getElementById('taskDate').textContent = formatDate(task.date);
    document.getElementById('taskCode').textContent = task.code;
    document.getElementById('taskExplanation').querySelector('p').textContent = task.explanation;
    
    // Скриншот (заглушка)
    const screenshotContainer = document.getElementById('taskScreenshot');
    if (screenshotContainer) {
        screenshotContainer.innerHTML = `
            <div style="text-align: center; color: var(--text-muted);">
                <span style="font-size: 3rem;">📷</span>
                <p>Скриншот условия задачи</p>
                <p style="font-size: 0.85rem;">(Добавьте свой скриншот)</p>
            </div>
        `;
    }
    
    modal.classList.add('active');
}

// ========================================
// Статистика
// ========================================

function loadStats() {
    // Загружаем из localStorage или используем значения по умолчанию
    const stats = JSON.parse(localStorage.getItem('stats')) || {
        tasksCount: sampleTasks.length,
        streakCount: 7,
        hoursCount: 42,
        level: 5
    };
    
    // Обновляем главную страницу
    updateStatValue('tasksCount', stats.tasksCount);
    updateStatValue('streakCount', stats.streakCount);
    updateStatValue('hoursCount', stats.hoursCount);
    updateStatValue('levelDisplay', stats.level);
    
    // Обновляем страницу прогресса
    updateStatValue('totalTasks', stats.tasksCount);
    updateStatValue('completedTasks', Math.floor(stats.tasksCount * 0.8));
    updateStatValue('currentStreak', stats.streakCount);
    updateStatValue('totalXP', stats.level * 100);
    
    // Загружаем график активности
    loadActivityChart();
    
    // Загружаем темы
    loadTopicsProgress();
    
    // Загружаем достижения
    loadAchievements();
}

function updateStatValue(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        animateValue(element, 0, value, 1000);
    }
}

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function loadActivityChart() {
    const chart = document.getElementById('weekChart');
    if (!chart) return;
    
    // Генерируем случайные данные для демонстрации
    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const data = days.map(() => Math.floor(Math.random() * 10) + 1);
    const maxValue = Math.max(...data);
    
    chart.innerHTML = data.map((value, index) => `
        <div class="chart-bar" 
             style="height: ${(value / maxValue) * 100}%" 
             title="${days[index]}: ${value} задач"></div>
    `).join('');
}

function loadTopicsProgress() {
    const grid = document.getElementById('topicsGrid');
    if (!grid) return;
    
    const topics = [
        { name: 'Переменные и типы данных', progress: 100 },
        { name: 'Условные операторы', progress: 90 },
        { name: 'Циклы', progress: 85 },
        { name: 'Функции', progress: 70 },
        { name: 'Структуры данных', progress: 60 },
        { name: 'Работа с файлами', progress: 40 },
        { name: 'Обработка исключений', progress: 30 },
        { name: 'ООП', progress: 15 }
    ];
    
    grid.innerHTML = topics.map(topic => `
        <div class="topic-card">
            <div class="topic-header">
                <span class="topic-name">${topic.name}</span>
                <span class="topic-percent">${topic.progress}%</span>
            </div>
            <div class="topic-progress">
                <div class="topic-fill" style="width: ${topic.progress}%"></div>
            </div>
        </div>
    `).join('');
}

function loadAchievements() {
    const grid = document.getElementById('achievementsGrid');
    const mini = document.getElementById('achievementsMini');
    
    const achievements = [
        { icon: '🎯', name: 'Первая задача', desc: 'Решить первую задачу', unlocked: true },
        { icon: '🔥', name: 'Неделя подряд', desc: '7 дней активности', unlocked: true },
        { icon: '📚', name: '10 задач', desc: 'Решить 10 задач', unlocked: true },
        { icon: '💪', name: 'Сложная задача', desc: 'Решить задачу hard', unlocked: false },
        { icon: '🏆', name: '50 задач', desc: 'Решить 50 задач', unlocked: false },
        { icon: '⭐', name: 'Месяц подряд', desc: '30 дней активности', unlocked: false }
    ];
    
    if (grid) {
        grid.innerHTML = achievements.map(ach => `
            <div class="achievement-card ${ach.unlocked ? '' : 'locked'}">
                <div class="achievement-icon">${ach.icon}</div>
                <div class="achievement-name">${ach.name}</div>
                <div class="achievement-desc">${ach.desc}</div>
            </div>
        `).join('');
    }
    
    if (mini) {
        const unlocked = achievements.filter(a => a.unlocked);
        mini.innerHTML = unlocked.map(ach => `
            <div class="achievement-mini" title="${ach.name}">${ach.icon}</div>
        `).join('');
    }
}

// ========================================
// Профиль
// ========================================

function initProfile() {
    // Вкладки профиля
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabId}Tab`) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Форма личных данных
    const personalForm = document.getElementById('personalForm');
    if (personalForm) {
        personalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Данные сохранены!');
        });
    }
    
    // Форма настроек
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Настройки обновлены!');
        });
    }
    
    // Выбор темы в настройках
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            themeOptions.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
            applyTheme(option.dataset.theme);
        });
    });
    
    // Кнопка входа для гостей
    const guestLoginBtn = document.getElementById('guestLoginBtn');
    if (guestLoginBtn) {
        guestLoginBtn.addEventListener('click', openAuthModal);
    }
    
    // Обновление UI профиля
    updateProfileUI();
}

function updateProfileUI() {
    const guestMessage = document.getElementById('guestMessage');
    const authorizedContent = document.getElementById('authorizedContent');
    
    if (userData.isLoggedIn) {
        if (guestMessage) guestMessage.classList.add('hidden');
        if (authorizedContent) authorizedContent.classList.remove('hidden');
        
        // Обновляем данные профиля
        const profileName = document.getElementById('profileName');
        const profileLevel = document.getElementById('profileLevel');
        const xpFill = document.getElementById('xpFill');
        const xpText = document.getElementById('xpText');
        const profileTasks = document.getElementById('profileTasks');
        const profileStreak = document.getElementById('profileStreak');
        
        if (profileName) profileName.textContent = userData.username;
        if (profileLevel) profileLevel.textContent = `Уровень ${userData.level}`;
        if (xpFill) xpFill.style.width = `${(userData.xp % 100)}%`;
        if (xpText) xpText.textContent = `${userData.xp % 100} / 100 XP`;
        if (profileTasks) profileTasks.textContent = userData.tasksCompleted;
        if (profileStreak) profileStreak.textContent = userData.streak;
    } else {
        if (guestMessage) guestMessage.classList.remove('hidden');
        if (authorizedContent) authorizedContent.classList.add('hidden');
    }
}

// ========================================
// FAQ
// ========================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                // Закрываем другие
                faqItems.forEach(other => {
                    if (other !== item) {
                        other.classList.remove('active');
                    }
                });
                
                // Переключаем текущий
                item.classList.toggle('active');
            });
        }
    });
}

// ========================================
// Контактная форма
// ========================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Получаем данные формы
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;
            
            // В реальном проекте здесь была бы отправка на сервер
            console.log('Форма отправлена:', { name, email, subject, message });
            
            // Очищаем форму и показываем сообщение
            contactForm.reset();
            alert('Спасибо за сообщение! Я свяжусь с вами в ближайшее время.');
        });
    }
}

// ========================================
// Утилиты
// ========================================

// Сохранение прогресса
function saveProgress() {
    localStorage.setItem('userData', JSON.stringify(userData));
}

// Экспорт данных (для будущего функционала)
function exportData() {
    const data = {
        user: userData,
        tasks: sampleTasks,
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pythonpath-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}
