"""
PythonPath - Backend API Server
Flask приложение с REST API
"""
import os
from datetime import datetime, timedelta
from functools import wraps

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from dotenv import load_dotenv

from models import db, User, Task, BlogPost, Comment, QuizResult, UserTask
from models import GuestbookMessage, Achievement, UserAchievement
from database import init_db

# Загружаем переменные окружения
load_dotenv()

# Создаем приложение
app = Flask(__name__, static_folder='../', static_url_path='')

# Конфигурация
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///pythonpath.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
app.config['CORS_ORIGINS'] = os.getenv('CORS_ORIGINS', '*').split(',')

# Инициализация расширений
CORS(app, origins=app.config['CORS_ORIGINS'])
JWTManager(app)
init_db(app)


# ============================================
# Вспомогательные функции
# ============================================

def admin_required(fn):
    """Декоратор для администраторов"""
    @wraps(fn)
    def wrapper(*args, **kwargs):
        current_user = get_jwt_identity()
        user = User.query.get(current_user)
        if not user or user.username != 'admin':
            return jsonify({'error': 'Требуется права администратора'}), 403
        return fn(*args, **kwargs)
    return wrapper


# ============================================
# Статические файлы (фронтенд)
# ============================================

@app.route('/')
def serve_frontend():
    """Отдача фронтенда"""
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/<path:path>')
def serve_static(path):
    """Отдача статических файлов"""
    if os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')


# ============================================
# Auth API
# ============================================

@app.route('/api/auth/register', methods=['POST'])
def register():
    """Регистрация пользователя"""
    data = request.get_json()
    
    # Проверка данных
    if not data or not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Все поля обязательны'}), 400
    
    # Проверка существующего пользователя
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': 'Пользователь уже существует'}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email уже зарегистрирован'}), 400
    
    # Создание пользователя
    user = User(
        username=data['username'],
        email=data['email'],
        bio=data.get('bio', ''),
        location=data.get('location', '')
    )
    user.set_password(data['password'])
    
    db.session.add(user)
    db.session.commit()
    
    # Создаем токен
    access_token = create_access_token(identity=user.id)
    
    return jsonify({
        'message': 'Регистрация успешна',
        'user': user.to_dict(),
        'token': access_token
    }), 201


@app.route('/api/auth/login', methods=['POST'])
def login():
    """Вход пользователя"""
    data = request.get_json()
    
    user = User.query.filter_by(email=data.get('email')).first()
    
    if not user or not user.check_password(data.get('password')):
        return jsonify({'error': 'Неверный email или пароль'}), 401
    
    access_token = create_access_token(identity=user.id)
    
    return jsonify({
        'message': 'Вход успешен',
        'user': user.to_dict(),
        'token': access_token
    })


@app.route('/api/auth/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """Получение текущего пользователя"""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({'error': 'Пользователь не найден'}), 404
    
    return jsonify({'user': user.to_dict()})


@app.route('/api/auth/update', methods=['PUT'])
@jwt_required()
def update_profile():
    """Обновление профиля"""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({'error': 'Пользователь не найден'}), 404
    
    data = request.get_json()
    
    if data.get('bio') is not None:
        user.bio = data['bio']
    if data.get('location') is not None:
        user.location = data['location']
    
    db.session.commit()
    
    return jsonify({'user': user.to_dict()})


# ============================================
# Tasks API
# ============================================

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    """Получение всех задач"""
    tasks = Task.query.order_by(Task.created_at.desc()).all()
    return jsonify({'tasks': [task.to_dict() for task in tasks]})


@app.route('/api/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    """Получение одной задачи"""
    task = Task.query.get_or_404(task_id)
    task.views += 1
    db.session.commit()
    return jsonify({'task': task.to_dict()})


@app.route('/api/tasks', methods=['POST'])
@jwt_required()
@admin_required
def create_task():
    """Создание задачи (только админ)"""
    data = request.get_json()
    
    task = Task(
        title=data['title'],
        description=data['description'],
        difficulty=data['difficulty'],
        code_solution=data['code_solution'],
        explanation=data.get('explanation', ''),
        screenshot=data.get('screenshot', ''),
        tags=','.join(data.get('tags', [])),
        author_id=get_jwt_identity()
    )
    
    db.session.add(task)
    db.session.commit()
    
    return jsonify({'task': task.to_dict(), 'message': 'Задача создана'}), 201


@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
@jwt_required()
@admin_required
def update_task(task_id):
    """Обновление задачи (только админ)"""
    task = Task.query.get_or_404(task_id)
    data = request.get_json()
    
    task.title = data.get('title', task.title)
    task.description = data.get('description', task.description)
    task.difficulty = data.get('difficulty', task.difficulty)
    task.code_solution = data.get('code_solution', task.code_solution)
    task.explanation = data.get('explanation', task.explanation)
    task.screenshot = data.get('screenshot', task.screenshot)
    
    if 'tags' in data:
        task.tags = ','.join(data['tags'])
    
    db.session.commit()
    
    return jsonify({'task': task.to_dict(), 'message': 'Задача обновлена'})


@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
@jwt_required()
@admin_required
def delete_task(task_id):
    """Удаление задачи (только админ)"""
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    
    return jsonify({'message': 'Задача удалена'})


# ============================================
# Blog API
# ============================================

@app.route('/api/blog', methods=['GET'])
def get_posts():
    """Получение всех статей"""
    category = request.args.get('category')
    query = BlogPost.query.filter_by(published=True)
    
    if category:
        query = query.filter_by(category=category)
    
    posts = query.order_by(BlogPost.created_at.desc()).all()
    return jsonify({'posts': [post.to_dict() for post in posts]})


@app.route('/api/blog/<int:post_id>', methods=['GET'])
def get_post(post_id):
    """Получение одной статьи"""
    post = BlogPost.query.get_or_404(post_id)
    post.views += 1
    db.session.commit()
    return jsonify({'post': post.to_dict()})


@app.route('/api/blog', methods=['POST'])
@jwt_required()
def create_post():
    """Создание статьи"""
    data = request.get_json()
    
    post = BlogPost(
        title=data['title'],
        content=data['content'],
        excerpt=data.get('excerpt', ''),
        category=data.get('category', 'python'),
        tags=','.join(data.get('tags', [])),
        author_id=get_jwt_identity()
    )
    
    db.session.add(post)
    db.session.commit()
    
    return jsonify({'post': post.to_dict(), 'message': 'Статья создана'}), 201


@app.route('/api/blog/<int:post_id>/like', methods=['POST'])
def like_post(post_id):
    """Лайк статьи"""
    post = BlogPost.query.get_or_404(post_id)
    post.likes += 1
    db.session.commit()
    
    return jsonify({'likes': post.likes})


# ============================================
# Quiz API
# ============================================

@app.route('/api/quiz/results', methods=['POST'])
@jwt_required()
def save_quiz_result():
    """Сохранение результата квиза"""
    data = request.get_json()
    user_id = get_jwt_identity()
    
    result = QuizResult(
        category=data['category'],
        score=data['score'],
        correct_answers=data['correct_answers'],
        total_questions=data['total_questions'],
        time_spent=data.get('time_spent', 0),
        xp_earned=data.get('xp_earned', 0),
        user_id=user_id
    )
    
    db.session.add(result)
    
    # Обновляем XP пользователя
    user = User.query.get(user_id)
    user.xp += result.xp_earned
    user.level = (user.xp // 100) + 1
    
    db.session.commit()
    
    return jsonify({'result': result.to_dict(), 'user': user.to_dict()})


@app.route('/api/quiz/results', methods=['GET'])
@jwt_required()
def get_quiz_results():
    """Получение результатов пользователя"""
    user_id = get_jwt_identity()
    results = QuizResult.query.filter_by(user_id=user_id).order_by(QuizResult.created_at.desc()).all()
    
    return jsonify({'results': [r.to_dict() for r in results]})


# ============================================
# Guestbook API
# ============================================

@app.route('/api/guestbook', methods=['GET'])
def get_guestbook():
    """Получение сообщений гостевой книги"""
    messages = GuestbookMessage.query.order_by(GuestbookMessage.created_at.desc()).all()
    return jsonify({'messages': [m.to_dict() for m in messages]})


@app.route('/api/guestbook', methods=['POST'])
def create_guestbook_message():
    """Создание сообщения в гостевой книге"""
    data = request.get_json()
    
    message = GuestbookMessage(
        name=data['name'],
        email=data.get('email'),
        message=data['message'],
        rating=data.get('rating', 0),
        parent_id=data.get('parent_id')
    )
    
    db.session.add(message)
    db.session.commit()
    
    return jsonify({'message': message.to_dict()}, 201)


# ============================================
# Stats API
# ============================================

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Получение общей статистики"""
    stats = {
        'total_tasks': Task.query.count(),
        'total_posts': BlogPost.query.count(),
        'total_users': User.query.count(),
        'total_messages': GuestbookMessage.query.count()
    }
    return jsonify({'stats': stats})


@app.route('/api/stats/user/<int:user_id>', methods=['GET'])
def get_user_stats(user_id):
    """Статистика пользователя"""
    user = User.query.get_or_404(user_id)
    
    tasks_solved = UserTask.query.filter_by(user_id=user_id, solved=True).count()
    quiz_results = QuizResult.query.filter_by(user_id=user_id).all()
    
    stats = {
        'user': user.to_dict(),
        'tasks_solved': tasks_solved,
        'quizzes_taken': len(quiz_results),
        'total_xp': sum(r.xp_earned for r in quiz_results)
    }
    
    return jsonify({'stats': stats})


# ============================================
# Запуск приложения
# ============================================

if __name__ == '__main__':
    print("🚀 Запуск PythonPath Backend API...")
    print("📍 API доступно по адресу: http://localhost:5000/api")
    print("🌐 Фронтенд доступен по адресу: http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
