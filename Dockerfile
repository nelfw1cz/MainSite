# PythonPath - Dockerfile для backend
FROM python:3.11-slim

# Рабочая директория
WORKDIR /app

# Переменные окружения
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Установка зависимостей
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копирование кода
COPY backend/ ./backend/
COPY . .

# Создание директории для базы данных
RUN mkdir -p /app/instance

# Экспортируемый порт
EXPOSE 5000

# Команда запуска
CMD ["python", "backend/app.py"]
