# 📡 PythonPath API Documentation

Полная документация REST API для PythonPath.

## 📍 Base URL

```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## 🔐 Аутентификация

API использует JWT (JSON Web Tokens) для аутентификации.

### Получение токена

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your-password"
}
```

**Ответ:**
```json
{
  "message": "Вход успешен",
  "user": {
    "id": 1,
    "username": "john",
    "email": "john@example.com",
    "xp": 100,
    "level": 2
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Использование токена

Добавляйте токен в заголовок запроса:

```
Authorization: Bearer <your-token>
```

---

## 📚 Endpoints

### Auth

#### Регистрация
```
POST /api/auth/register
```

**Тело запроса:**
```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "secure-password"
}
```

#### Вход
```
POST /api/auth/login
```

#### Текущий пользователь
```
GET /api/auth/me
Authorization: Bearer <token>
```

#### Обновление профиля
```
PUT /api/auth/update
Authorization: Bearer <token>
Content-Type: application/json

{
  "bio": "Python developer",
  "location": "Moscow"
}
```

---

### Tasks

#### Получить все задачи
```
GET /api/tasks
```

**Ответ:**
```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Сумма цифр числа",
      "description": "Напишите программу...",
      "difficulty": "easy",
      "code_solution": "def sum_of_digits(n):...",
      "tags": ["циклы", "математика"],
      "views": 156,
      "solves": 42,
      "created_at": "2026-03-20T10:00:00"
    }
  ]
}
```

#### Получить одну задачу
```
GET /api/tasks/<id>
```

#### Создать задачу (Admin only)
```
POST /api/tasks
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "Новая задача",
  "description": "Описание задачи",
  "difficulty": "medium",
  "code_solution": "def solution():...",
  "explanation": "Объяснение решения",
  "tags": ["алгоритмы", "python"]
}
```

#### Обновить задачу (Admin only)
```
PUT /api/tasks/<id>
Authorization: Bearer <admin-token>
```

#### Удалить задачу (Admin only)
```
DELETE /api/tasks/<id>
Authorization: Bearer <admin-token>
```

---

### Blog

#### Получить все статьи
```
GET /api/blog
```

**Query параметры:**
- `category` - фильтрация по категории (python, algorithms, web, tips)

**Ответ:**
```json
{
  "posts": [
    {
      "id": 1,
      "title": "Мои первые шаги в Python",
      "content": "...",
      "excerpt": "Заметки для начинающих",
      "category": "python",
      "tags": ["python", "beginner"],
      "views": 156,
      "likes": 23,
      "created_at": "2026-03-20T10:00:00"
    }
  ]
}
```

#### Получить одну статью
```
GET /api/blog/<id>
```

#### Создать статью
```
POST /api/blog
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Заголовок статьи",
  "content": "Содержимое статьи...",
  "excerpt": "Краткое описание",
  "category": "python",
  "tags": ["python", "tutorial"]
}
```

#### Лайкнуть статью
```
POST /api/blog/<id>/like
```

---

### Quiz

#### Сохранить результат квиза
```
POST /api/quiz/results
Authorization: Bearer <token>
Content-Type: application/json

{
  "category": "basics",
  "score": 85,
  "correct_answers": 8,
  "total_questions": 10,
  "time_spent": 120,
  "xp_earned": 42
}
```

#### Получить результаты пользователя
```
GET /api/quiz/results
Authorization: Bearer <token>
```

---

### Guestbook

#### Получить сообщения
```
GET /api/guestbook
```

**Ответ:**
```json
{
  "messages": [
    {
      "id": 1,
      "name": "Alexey",
      "message": "Отличный сайт!",
      "rating": 5,
      "created_at": "2026-03-20T10:00:00"
    }
  ]
}
```

#### Создать сообщение
```
POST /api/guestbook
Content-Type: application/json

{
  "name": "Ваше имя",
  "email": "email@example.com",
  "message": "Текст сообщения",
  "rating": 5,
  "parent_id": null  // для ответов
}
```

---

### Stats

#### Общая статистика
```
GET /api/stats
```

**Ответ:**
```json
{
  "stats": {
    "total_tasks": 50,
    "total_posts": 12,
    "total_users": 150,
    "total_messages": 75
  }
}
```

#### Статистика пользователя
```
GET /api/stats/user/<id>
```

---

## 🔒 Коды ответов

| Код | Описание |
|-----|----------|
| 200 | Успешный запрос |
| 201 | Ресурс создан |
| 400 | Неверный запрос |
| 401 | Не авторизован |
| 403 | Нет доступа |
| 404 | Не найдено |
| 500 | Ошибка сервера |

---

## 📝 Примеры использования

### Python (requests)

```python
import requests

# Регистрация
response = requests.post('http://localhost:5000/api/auth/register', json={
    'username': 'john',
    'email': 'john@example.com',
    'password': 'password123'
})

# Вход
response = requests.post('http://localhost:5000/api/auth/login', json={
    'email': 'john@example.com',
    'password': 'password123'
})
token = response.json()['token']

# Получение задач с токеном
headers = {'Authorization': f'Bearer {token}'}
response = requests.get('http://localhost:5000/api/tasks', headers=headers)
tasks = response.json()['tasks']
```

### JavaScript (fetch)

```javascript
// Вход
const loginResponse = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        email: 'john@example.com',
        password: 'password123'
    })
});
const { token } = await loginResponse.json();

// Получение задач
const tasksResponse = await fetch('/api/tasks', {
    headers: { 'Authorization': `Bearer ${token}` }
});
const { tasks } = await tasksResponse.json();
```

---

## 🐳 Docker

Запуск с Docker:

```bash
docker-compose up -d
```

API будет доступно по адресу: `http://localhost:5000/api`

---

## 📞 Поддержка

Вопросы и предложения: [GitHub Issues](https://github.com/yourusername/pythonpath/issues)
