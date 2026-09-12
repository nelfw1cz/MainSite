# 🐍 PythonPath - Путь изучения Python

Полнофункциональная платформа для изучения Python с задачами, блогом, квизами и системой прогресса.

![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-3.0-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 📋 Содержание

- [Возможности](#-возможности)
- [Быстрый старт](#-быстрый-старт)
- [Установка с Docker](#-docker)
- [API Документация](#-api)
- [Структура проекта](#-структура)
- [Разработка](#-разработка)
- [Деплой](#-деплой)

## ✨ Возможности

### 🎓 Обучение
- ✅ **Задачи по Python** - решайте задачи с автоматической проверкой
- ✅ **Квизы** - проверяйте знания по 6 категориям (65 вопросов)
- ✅ **Шпаргалки** - быстрый справочник по синтаксису
- ✅ **Блог** - статьи о изучении Python
- ✅ **Ресурсы** - подобранная коллекция книг, курсов и видеоуроков
- ✅ **English для программистов** - технический английский с карточками
- ✅ **AI Ассистент** - бесплатный ИИ на базе Ollama/Hugging Face

### 🎮 Геймификация
- ✅ **Система XP и уровней** - зарабатывайте опыт за активность
- ✅ **Достижения** - получайте награды за успехи
- ✅ **Игра "Прогулка по лесу"** - отдыхайте между задачами
- ✅ **Python Квиз** - проверьте знания в интерактивной форме
- ✅ **Таблица лидеров** - соревнуйтесь с другими

### 👥 Социальное
- ✅ **Гостевая книга** - оставляйте отзывы
- ✅ **Комментарии** - обсуждайте задачи и статьи
- ✅ **Профиль пользователя** - настройте свой аккаунт

### 🛠️ Технические
- ✅ **REST API** - полноценный backend на Flask
- ✅ **SQLite база данных** - хранение данных
- ✅ **JWT аутентификация** - безопасный вход
- ✅ **PWA** - установка на телефон
- ✅ **6 тем оформления** - светлая, тёмная, цветные

## 🚀 Быстрый старт

### Вариант 1: Локальный запуск (без Docker)

#### 1. Установка Python
```bash
# Проверьте версию Python (требуется 3.11+)
python --version
```

#### 2. Установка зависимостей
```bash
cd backend
pip install -r requirements.txt
```

#### 3. Создание .env файла
```bash
# Скопируйте пример
cp .env.example .env

# Отредактируйте .env при необходимости
```

#### 4. Запуск backend
```bash
python app.py
```

#### 5. Открыть сайт
```
http://localhost:5000
```

**Логин админа по умолчанию:**
- Email: `admin@pythonpath.com`
- Пароль: `admin123`

---

### 🐳 Docker

#### 1. Установка Docker
Установите [Docker Desktop](https://www.docker.com/products/docker-desktop)

#### 2. Запуск
```bash
docker-compose up -d
```

#### 3. Открыть сайт
- Фронтенд: http://localhost:8000
- Backend API: http://localhost:5000/api

#### 4. Остановка
```bash
docker-compose down
```

#### 5. Полная очистка (с базой данных)
```bash
docker-compose down -v
```

---

## 📡 API

Полная документация API доступна в файле [API.md](API.md)

### Быстрые команды

```bash
# Регистрация
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"password123"}'

# Вход
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Получить задачи
curl http://localhost:5000/api/tasks
```

### Postman
Импортируйте коллекцию `postman_collection.json` в Postman для удобного тестирования API.

---

## 📁 Структура

```
SiteLearning2/
├── backend/
│   ├── app.py              # Flask приложение
│   ├── models.py           # Модели базы данных
│   ├── database.py         # Инициализация БД
│   ├── requirements.txt    # Python зависимости
│   └── .env.example        # Пример конфига
├── .github/
│   └── workflows/
│       ├── deploy.yml      # GitHub Pages деплой
│       └── test.yml        # Автотесты
├── index.html              # Главная страница
├── tasks.html              # Задачи
├── quiz.html               # Квиз
├── blog.html               # Блог
├── cheatsheet.html         # Шпаргалки
├── guestbook.html          # Гостевая книга
├── game.html               # Игра
├── admin.html              # Админ-панель
├── sections.html           # Все разделы
├── style.css               # Стили
├── script.js               # Основной JS
├── Dockerfile              # Docker образ
├── docker-compose.yml      # Docker Compose
├── manifest.json           # PWA манифест
├── API.md                  # API документация
└── README.md               # Этот файл
```

---

## 🛠️ Разработка

### Добавление новой задачи

1. Войдите как админ
2. Перейдите в Админ-панель
3. Нажмите "Добавить задачу"
4. Заполните форму:
   - Название
   - Описание
   - Сложность (easy/medium/hard)
   - Код решения
   - Объяснение
   - Теги

### Добавление статьи в блог

1. Войдите в аккаунт
2. Перейдите в Блог
3. Нажмите "Написать статью"
4. Заполните форму

### Изменение тем

Нажмите на иконку темы в навигации (🌙/☀️)

---

## 📊 Деплой

### GitHub Pages (фронтенд)

1. Запушите код на GitHub
2. Включите GitHub Pages в настройках репозитория
3. Деплой произойдёт автоматически через GitHub Actions

### Vercel/Netlify

1. Подключите репозиторий
2. Настройте сборку (не требуется для статики)
3. Деплой автоматически

### Backend на сервере

```bash
# Установка
pip install -r requirements.txt

# Запуск через gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app

# Или через systemd
sudo systemctl start pythonpath
```

---

## 🧪 Тестирование

```bash
cd backend
pytest
```

---

## 📝 Лицензия

MIT License - см. файл LICENSE

---

## 🤝 Вклад

1. Fork репозиторий
2. Создайте ветку (`git checkout -b feature/AmazingFeature`)
3. Commit изменения (`git commit -m 'Add AmazingFeature'`)
4. Push в ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

---

## 📞 Контакты

- GitHub Issues: [Создать issue](https://github.com/yourusername/pythonpath/issues)
- Email: your.email@example.com

---

## 🙏 Благодарности

- [Flask](https://flask.palletsprojects.com/)
- [Chart.js](https://www.chartjs.org/)
- [Google Fonts](https://fonts.google.com/)

---

**Made with ❤️ by PythonPath Team**
