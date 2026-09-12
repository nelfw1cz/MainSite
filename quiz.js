/* ========================================
   PythonPath - Квиз по Python
   ======================================== */

// ========================================
// Вопросы по категориям
// ========================================
const questionsByCategory = {
    basics: [
        {
            question: "Что выведет print(type(5))?",
            answers: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'number'>"],
            correct: 0
        },
        {
            question: "Как объявить переменную в Python?",
            answers: ["int x = 5", "var x = 5", "x = 5", "let x = 5"],
            correct: 2
        },
        {
            question: "Какой оператор используется для возведения в степень?",
            answers: ["^", "**", "pow", "exp"],
            correct: 1
        },
        {
            question: "Что выведет print(10 // 3)?",
            answers: ["3.33", "3", "4", "3.0"],
            correct: 1
        },
        {
            question: "Как преобразовать строку в число?",
            answers: ["str()", "int()", "float()", "num()"],
            correct: 1
        },
        {
            question: "Какой тип данных НЕ изменяемый?",
            answers: ["list", "dict", "tuple", "set"],
            correct: 2
        },
        {
            question: "Что выведет print('Hi' * 2)?",
            answers: ["HiHi", "Hi2", "Hi Hi", "Ошибка"],
            correct: 0
        },
        {
            question: "Как проверить тип переменной?",
            answers: ["check()", "typeof", "type()", "is_type()"],
            correct: 2
        },
        {
            question: "Что такое None в Python?",
            answers: ["0", "Пустая строка", "Null-объект", "False"],
            correct: 2
        },
        {
            question: "Как получить длину строки?",
            answers: ["length()", "len()", "size()", "count()"],
            correct: 1
        }
    ],
    loops: [
        {
            question: "Как правильно написать цикл for?",
            answers: ["for i in range(5):", "for (i=0; i<5; i++)", "for i from 0 to 5", "loop i in 5"],
            correct: 0
        },
        {
            question: "Что делает break?",
            answers: ["Пропускает итерацию", "Завершает цикл", "Перезапускает цикл", "Ничего"],
            correct: 1
        },
        {
            question: "Что выведет цикл: for i in range(3): print(i, end=' ')?",
            answers: ["1 2 3", "0 1 2", "0 1 2 3", "1 2"],
            correct: 1
        },
        {
            question: "Как работает continue?",
            answers: ["Завершает цикл", "Пропускает текущую итерацию", "Возвращает значение", "Останавливает программу"],
            correct: 1
        },
        {
            question: "Сколько раз выполнится: while False: print('Hi')",
            answers: ["1", "0", "Бесконечно", "5"],
            correct: 1
        },
        {
            question: "Что выведет range(1, 5)?",
            answers: ["1,2,3,4,5", "1,2,3,4", "0,1,2,3,4", "2,3,4,5"],
            correct: 1
        },
        {
            question: "Как перебрать список с индексами?",
            answers: ["for i in list", "for i, v in enumerate(list)", "for index in list", "for i in range(list)"],
            correct: 1
        },
        {
            question: "Можно ли использовать else с циклом?",
            answers: ["Да", "Нет", "Только с for", "Только с while"],
            correct: 0
        },
        {
            question: "Что выведет: for i in [1,2,3]: print(i)",
            answers: ["1 2 3", "1\n2\n3", "[1, 2, 3]", "Ошибка"],
            correct: 1
        },
        {
            question: "Как создать бесконечный цикл?",
            answers: ["while True:", "loop forever", "while 1:", "do while True"],
            correct: 0
        }
    ],
    functions: [
        {
            question: "Как объявить функцию?",
            answers: ["function myFunc()", "def myFunc():", "func myFunc()", "define myFunc()"],
            correct: 1
        },
        {
            question: "Что возвращает функция без return?",
            answers: ["0", "False", "None", "Ошибка"],
            correct: 2
        },
        {
            question: "Что такое lambda?",
            answers: ["Тип данных", "Анонимная функция", "Модуль", "Декоратор"],
            correct: 1
        },
        {
            question: "Что такое *args?",
            answers: ["Именованные аргументы", "Позиционные аргументы", "Аргументы по умолчанию", "Обязательные аргументы"],
            correct: 1
        },
        {
            question: "Что такое **kwargs?",
            answers: ["Позиционные аргументы", "Именованные аргументы", "Список аргументов", "Кортеж аргументов"],
            correct: 1
        },
        {
            question: "Как передать аргумент по умолчанию?",
            answers: ["def f(x=5)", "def f(x:5)", "def f(default x=5)", "def f(x default 5)"],
            correct: 0
        },
        {
            question: "Что выведет: print((lambda x: x*2)(5))?",
            answers: ["5", "10", "25", "Ошибка"],
            correct: 1
        },
        {
            question: "Можно ли возвращать несколько значений?",
            answers: ["Да, кортежем", "Нет", "Только списком", "Только словарём"],
            correct: 0
        },
        {
            question: "Что такое рекурсия?",
            answers: ["Цикл", "Вызов функции самой себя", "Декоратор", "Генератор"],
            correct: 1
        },
        {
            question: "Что такое docstring?",
            answers: ["Комментарий", "Строка документации", "Имя функции", "Тип возврата"],
            correct: 1
        }
    ],
    data_structures: [
        {
            question: "Как создать пустой список?",
            answers: ["[]", "{}", "()", "list[]"],
            correct: 0
        },
        {
            question: "Как добавить элемент в список?",
            answers: ["list.add(5)", "list.append(5)", "list.insert(5)", "list.push(5)"],
            correct: 1
        },
        {
            question: "Что выведет len([1,2,3])?",
            answers: ["2", "3", "4", "Ошибка"],
            correct: 1
        },
        {
            question: "Как получить последний элемент списка?",
            answers: ["list[last]", "list[-1]", "list.end()", "list.pop()"],
            correct: 1
        },
        {
            question: "Что такое словарь?",
            answers: ["Список ключей", "Пары ключ-значение", "Множество значений", "Кортеж"],
            correct: 1
        },
        {
            question: "Как создать множество?",
            answers: ["[]", "{}", "{1,2,3}", "()"],
            correct: 2
        },
        {
            question: "Что НЕ может быть ключом словаря?",
            answers: ["str", "int", "list", "tuple"],
            correct: 2
        },
        {
            question: "Как удалить элемент из списка по индексу?",
            answers: ["remove()", "delete()", "pop()", "cut()"],
            correct: 2
        },
        {
            question: "Что выведет [1,2,3] + [4,5]?",
            answers: ["[1,2,3,4,5]", "[5,7]", "[1,2,3,[4,5]]", "Ошибка"],
            correct: 0
        },
        {
            question: "Как отсортировать список?",
            answers: ["list.sort()", "sort(list)", "list.order()", "list.arrange()"],
            correct: 0
        },
        {
            question: "Что такое кортеж?",
            answers: ["Изменяемый список", "Неизменяемый список", "Словарь", "Множество"],
            correct: 1
        },
        {
            question: "Как получить ключи словаря?",
            answers: ["dict.values()", "dict.items()", "dict.keys()", "dict.all()"],
            correct: 2
        },
        {
            question: "Что выведет set([1,2,2,3])?",
            answers: ["[1,2,2,3]", "{1,2,3}", "{1,2,2,3}", "Ошибка"],
            correct: 1
        },
        {
            question: "Как объединить два словаря?",
            answers: ["dict1 + dict2", "dict1.merge(dict2)", "{**dict1, **dict2}", "dict1.append(dict2)"],
            correct: 2
        },
        {
            question: "Что такое list comprehension?",
            answers: ["Сортировка списка", "Генератор списка", "Фильтрация списка", "Копирование списка"],
            correct: 1
        }
    ],
    oop: [
        {
            question: "Как объявить класс?",
            answers: ["class MyClass:", "struct MyClass", "object MyClass", "define MyClass"],
            correct: 0
        },
        {
            question: "Что такое __init__?",
            answers: ["Метод удаления", "Конструктор", "Деструктор", "Статический метод"],
            correct: 1
        },
        {
            question: "Что такое self?",
            answers: ["Ключевое слово", "Ссылка на экземпляр", "Глобальная переменная", "Модуль"],
            correct: 1
        },
        {
            question: "Как создать наследника?",
            answers: ["class Child extends Parent", "class Child(Parent)", "class Child : Parent", "inherit Child from Parent"],
            correct: 1
        },
        {
            question: "Что такое инкапсуляция?",
            answers: ["Сокрытие данных", "Наследование", "Полиморфизм", "Абстракция"],
            correct: 0
        },
        {
            question: "Что такое @staticmethod?",
            answers: ["Метод экземпляра", "Статический метод", "Приватный метод", "Абстрактный метод"],
            correct: 1
        },
        {
            question: "Что выведет print(isinstance(5, int))?",
            answers: ["True", "False", "5", "int"],
            correct: 0
        },
        {
            question: "Что такое полиморфизм?",
            answers: ["Много форм", "Одна форма", "Наследование", "Инкапсуляция"],
            correct: 0
        },
        {
            question: "Как сделать приватный атрибут?",
            answers: ["private x", "_x", "__x", "x!"],
            correct: 2
        },
        {
            question: "Что такое @property?",
            answers: ["Метод", "Геттер", "Сеттер", "Декоратор свойства"],
            correct: 3
        }
    ]
};

// ========================================
// Состояние игры
// ========================================
let gameState = {
    currentCategory: null,
    questions: [],
    currentQuestion: 0,
    score: 0,
    correctAnswers: 0,
    startTime: null,
    timer: null,
    timeLeft: 30
};

// ========================================
// Инициализация
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initAuth();
    initNavigation();
    initQuizCategories();
    initQuizControls();
});

// ========================================
// Выбор категории
// ========================================
function initQuizCategories() {
    const cards = document.querySelectorAll('.quiz-category-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            startQuiz(category);
        });
    });
}

// ========================================
// Начало викторины
// ========================================
function startQuiz(category) {
    gameState.currentCategory = category;
    gameState.currentQuestion = 0;
    gameState.score = 0;
    gameState.correctAnswers = 0;
    gameState.startTime = Date.now();
    
    // Получаем вопросы
    if (category === 'mixed') {
        // Смешиваем все вопросы
        const allQuestions = [];
        Object.values(questionsByCategory).forEach(questions => {
            allQuestions.push(...questions);
        });
        gameState.questions = shuffleArray(allQuestions).slice(0, 20);
    } else {
        gameState.questions = [...(questionsByCategory[category] || [])];
        gameState.questions = shuffleArray(gameState.questions);
    }
    
    // Переключаем экраны
    document.getElementById('quizCategories').classList.add('hidden');
    document.getElementById('quizGameSection').classList.remove('hidden');
    document.getElementById('quizResultsSection').classList.add('hidden');
    
    // Показываем первый вопрос
    showQuestion();
}

// ========================================
// Показ вопроса
// ========================================
function showQuestion() {
    const question = gameState.questions[gameState.currentQuestion];
    if (!question) return;
    
    // Обновляем прогресс
    const progress = ((gameState.currentQuestion) / gameState.questions.length) * 100;
    document.getElementById('quizProgress').style.width = `${progress}%`;
    document.getElementById('quizProgressText').textContent = 
        `Вопрос ${gameState.currentQuestion + 1} из ${gameState.questions.length}`;
    document.getElementById('currentScore').textContent = gameState.score;
    
    // Показываем вопрос
    document.getElementById('questionCategory').textContent = getCategoryName(gameState.currentCategory);
    document.getElementById('questionText').textContent = question.question;
    
    // Показываем ответы
    const answersGrid = document.getElementById('answersGrid');
    answersGrid.innerHTML = question.answers.map((answer, index) => `
        <button class="answer-btn" data-index="${index}" onclick="selectAnswer(${index})">
            ${answer}
        </button>
    `).join('');
    
    // Скрываем кнопку "Далее"
    document.getElementById('nextQuestionBtn').classList.add('hidden');
    
    // Запускаем таймер
    startTimer();
}

// ========================================
// Таймер
// ========================================
function startTimer() {
    gameState.timeLeft = 30;
    document.getElementById('timerValue').textContent = gameState.timeLeft;
    document.getElementById('quizTimer').classList.remove('timeout');
    
    if (gameState.timer) clearInterval(gameState.timer);
    
    gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        document.getElementById('timerValue').textContent = gameState.timeLeft;
        
        if (gameState.timeLeft <= 10) {
            document.getElementById('quizTimer').classList.add('warning');
        } else {
            document.getElementById('quizTimer').classList.remove('warning');
        }
        
        if (gameState.timeLeft <= 0) {
            clearInterval(gameState.timer);
            document.getElementById('quizTimer').classList.add('timeout');
            showCorrectAnswer();
        }
    }, 1000);
}

// ========================================
// Выбор ответа
// ========================================
function selectAnswer(index) {
    clearInterval(gameState.timer);
    
    const question = gameState.questions[gameState.currentQuestion];
    const buttons = document.querySelectorAll('.answer-btn');
    
    // Показываем правильный/неправильный
    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === question.correct) {
            btn.classList.add('correct');
        } else if (i === index && i !== question.correct) {
            btn.classList.add('wrong');
        }
    });
    
    // Проверяем ответ
    if (index === question.correct) {
        gameState.correctAnswers++;
        // Очки зависят от времени
        const timeBonus = Math.floor(gameState.timeLeft / 3);
        gameState.score += 10 + timeBonus;
    }
    
    document.getElementById('currentScore').textContent = gameState.score;
    
    // Показываем кнопку "Далее"
    document.getElementById('nextQuestionBtn').classList.remove('hidden');
}

function showCorrectAnswer() {
    const question = gameState.questions[gameState.currentQuestion];
    const buttons = document.querySelectorAll('.answer-btn');
    
    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === question.correct) {
            btn.classList.add('correct');
        }
    });
    
    document.getElementById('nextQuestionBtn').classList.remove('hidden');
}

// ========================================
// Следующий вопрос
// ========================================
function nextQuestion() {
    gameState.currentQuestion++;
    
    if (gameState.currentQuestion >= gameState.questions.length) {
        endQuiz();
    } else {
        showQuestion();
    }
}

// ========================================
// Конец викторины
// ========================================
function endQuiz() {
    const totalTime = Math.floor((Date.now() - gameState.startTime) / 1000);
    const percent = Math.round((gameState.correctAnswers / gameState.questions.length) * 100);
    const xpEarned = Math.floor(gameState.score / 2);
    
    // Сохраняем XP
    saveXp(xpEarned);
    
    // Показываем результаты
    document.getElementById('quizGameSection').classList.add('hidden');
    document.getElementById('quizResultsSection').classList.remove('hidden');
    
    // Иконка и заголовок
    let icon = '🏆';
    let title = 'Поздравляем!';
    if (percent < 50) {
        icon = '📚';
        title = 'Нужно подучить!';
    } else if (percent < 80) {
        icon = '👍';
        title = 'Хороший результат!';
    } else if (percent === 100) {
        icon = '🌟';
        title = 'Идеально!';
    }
    
    document.getElementById('resultsIcon').textContent = icon;
    document.getElementById('resultsTitle').textContent = title;
    document.getElementById('correctCount').textContent = `${gameState.correctAnswers}/${gameState.questions.length}`;
    document.getElementById('correctPercent').textContent = `${percent}%`;
    document.getElementById('xpEarned').textContent = `+${xpEarned}`;
    document.getElementById('totalTime').textContent = `${totalTime}с`;
}

// ========================================
// Управление
// ========================================
function initQuizControls() {
    document.getElementById('nextQuestionBtn')?.addEventListener('click', nextQuestion);
    document.getElementById('quitQuizBtn')?.addEventListener('click', quitQuiz);
    document.getElementById('retryQuizBtn')?.addEventListener('click', () => {
        startQuiz(gameState.currentCategory);
    });
    document.getElementById('backToCategoriesBtn')?.addEventListener('click', () => {
        document.getElementById('quizResultsSection').classList.add('hidden');
        document.getElementById('quizCategories').classList.remove('hidden');
    });
}

function quitQuiz() {
    if (confirm('Вы уверены, что хотите выйти? Прогресс будет потерян.')) {
        document.getElementById('quizGameSection').classList.add('hidden');
        document.getElementById('quizCategories').classList.remove('hidden');
    }
}

// ========================================
// Утилиты
// ========================================
function getCategoryName(category) {
    const names = {
        'basics': '🔰 Основы',
        'loops': '🔁 Циклы',
        'functions': '⚙️ Функции',
        'data_structures': '📦 Структуры данных',
        'oop': '🏗️ ООП',
        'mixed': '🎲 Микс'
    };
    return names[category] || category;
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function saveXp(xp) {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    userData.xp = (userData.xp || 0) + xp;
    userData.level = Math.floor(userData.xp / 100) + 1;
    localStorage.setItem('userData', JSON.stringify(userData));
}
