"""
PythonPath - Конфигурация базы данных
"""
import os
from datetime import datetime
from models import (
    db, User, Task, BlogPost, Comment, QuizResult,
    UserTask, GuestbookMessage, Achievement, UserAchievement
)


def init_db(app):
    """Инициализация базы данных"""
    db.init_app(app)
    
    with app.app_context():
        db.create_all()
        create_default_data()


def create_default_data():
    """Создание данных по умолчанию"""
    # Проверяем, есть ли уже данные
    if User.query.first() is not None:
        return
    
    # Создаем админа
    admin = User(
        username='admin',
        email='admin@pythonpath.com',
        bio='Администратор PythonPath',
        xp=1000,
        level=10
    )
    admin.set_password('admin123')
    db.session.add(admin)
    
    # Создаем достижения
    achievements = [
        Achievement(
            name='Первая задача',
            description='Решить первую задачу',
            icon='🎯',
            xp_reward=10,
            condition_type='tasks_solved',
            condition_value=1
        ),
        Achievement(
            name='10 задач',
            description='Решить 10 задач',
            icon='📚',
            xp_reward=50,
            condition_type='tasks_solved',
            condition_value=10
        ),
        Achievement(
            name='50 задач',
            description='Решить 50 задач',
            icon='🏆',
            xp_reward=200,
            condition_type='tasks_solved',
            condition_value=50
        ),
        Achievement(
            name='Неделя подряд',
            description='7 дней активности подряд',
            icon='🔥',
            xp_reward=100,
            condition_type='streak',
            condition_value=7
        ),
        Achievement(
            name='Месяц подряд',
            description='30 дней активности подряд',
            icon='⭐',
            xp_reward=500,
            condition_type='streak',
            condition_value=30
        ),
        Achievement(
            name='Эксперт квизов',
            description='Получить 100% в любом квизе',
            icon='🧠',
            xp_reward=75,
            condition_type='quiz_score',
            condition_value=100
        ),
    ]
    
    for achievement in achievements:
        db.session.add(achievement)
    
    # Создаем примеры задач
    sample_tasks = [
        Task(
            title='Сумма цифр числа',
            description='Напишите программу, которая находит сумму цифр заданного натурального числа.',
            difficulty='easy',
            code_solution='''def sum_of_digits(n):
    total = 0
    while n > 0:
        digit = n % 10
        total += digit
        n //= 10
    return total

# Пример
print(sum_of_digits(1234))  # 10''',
            explanation='Используем цикл while для последовательного извлечения цифр из числа.',
            tags='циклы,математика,beginner',
            author_id=1
        ),
        Task(
            title='Проверка на простое число',
            description='Реализуйте функцию, которая проверяет, является ли число простым.',
            difficulty='medium',
            code_solution='''def is_prime(n):
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    
    for i in range(3, int(n ** 0.5) + 1, 2):
        if n % i == 0:
            return False
    return True

# Пример
print(is_prime(17))  # True''',
            explanation='Проверяем делимость до квадратного корня из n.',
            tags='функции,математика,алгоритмы',
            author_id=1
        ),
        Task(
            title='Сортировка пузырьком',
            description='Реализуйте алгоритм сортировки пузырьком.',
            difficulty='medium',
            code_solution='''def bubble_sort(arr):
    n = len(arr)
    result = arr.copy()
    
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if result[j] > result[j + 1]:
                result[j], result[j + 1] = result[j + 1], result[j]
                swapped = True
        if not swapped:
            break
    
    return result

# Пример
print(bubble_sort([64, 34, 25, 12]))''',
            explanation='Многократно проходим по массиву, сравнивая соседние элементы.',
            tags='алгоритмы,сортировка,списки',
            author_id=1
        ),
    ]
    
    for task in sample_tasks:
        db.session.add(task)
    
    # Создаем примеры статей блога
    sample_posts = [
        BlogPost(
            title='Мои первые шаги в Python',
            content='''# Начало пути

Когда я только начал изучать Python, я не знал, с чего начать.

## Установка Python

Первым делом нужно установить Python с официального сайта python.org.

## Первая программа

```python
print("Hello, World!")
```

## Что дальше?

Изучайте типы данных, условные операторы и циклы!''',
            excerpt='Заметки для начинающих изучать Python',
            category='python',
            tags='python,beginner,start',
            author_id=1,
            views=156,
            likes=23
        ),
        BlogPost(
            title='Понимание списков в Python',
            content='''# Списки в Python

Списки — одна из самых важных структур данных.

## Создание списка

```python
numbers = [1, 2, 3, 4, 5]
fruits = ["яблоко", "банан", "апельсин"]
```

## List Comprehension

```python
squares = [x**2 for x in range(10)]
```''',
            excerpt='Всё о списках в Python',
            category='python',
            tags='python,lists,data-structures',
            author_id=1,
            views=203,
            likes=35
        ),
    ]
    
    for post in sample_posts:
        db.session.add(post)
    
    db.session.commit()
    print("База данных инициализирована с данными по умолчанию!")
