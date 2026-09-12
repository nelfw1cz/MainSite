"""
PythonPath - Модели базы данных
"""
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(UserMixin, db.Model):
    """Пользователь"""
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Профиль
    bio = db.Column(db.Text, default='')
    location = db.Column(db.String(100), default='')
    avatar = db.Column(db.String(256), default='')
    
    # Статистика
    xp = db.Column(db.Integer, default=0)
    level = db.Column(db.Integer, default=1)
    streak = db.Column(db.Integer, default=0)
    last_activity = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Связи
    tasks = db.relationship('Task', backref='author', lazy=True)
    posts = db.relationship('BlogPost', backref='author', lazy=True)
    comments = db.relationship('Comment', backref='author', lazy=True)
    quiz_results = db.relationship('QuizResult', backref='user', lazy=True)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'bio': self.bio,
            'location': self.location,
            'xp': self.xp,
            'level': self.level,
            'streak': self.streak,
            'created_at': self.created_at.isoformat()
        }


class Task(db.Model):
    """Задача по Python"""
    __tablename__ = 'tasks'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    difficulty = db.Column(db.String(20), nullable=False)  # easy, medium, hard
    code_solution = db.Column(db.Text, nullable=False)
    explanation = db.Column(db.Text, default='')
    screenshot = db.Column(db.Text, default='')  # Base64 или URL
    tags = db.Column(db.String(500), default='')  # JSON список тегов
    
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    views = db.Column(db.Integer, default=0)
    solves = db.Column(db.Integer, default=0)
    
    # Связи
    comments = db.relationship('Comment', backref='task', lazy=True)
    user_tasks = db.relationship('UserTask', backref='task', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'difficulty': self.difficulty,
            'code_solution': self.code_solution,
            'explanation': self.explanation,
            'screenshot': self.screenshot,
            'tags': self.tags.split(',') if self.tags else [],
            'author_id': self.author_id,
            'views': self.views,
            'solves': self.solves,
            'created_at': self.created_at.isoformat()
        }


class BlogPost(db.Model):
    """Статья в блоге"""
    __tablename__ = 'blog_posts'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    excerpt = db.Column(db.String(500), default='')
    category = db.Column(db.String(50), default='python')
    tags = db.Column(db.String(500), default='')
    
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    views = db.Column(db.Integer, default=0)
    likes = db.Column(db.Integer, default=0)
    published = db.Column(db.Boolean, default=True)
    
    # Связи
    comments = db.relationship('Comment', backref='post', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'excerpt': self.excerpt,
            'category': self.category,
            'tags': self.tags.split(',') if self.tags else [],
            'author_id': self.author_id,
            'views': self.views,
            'likes': self.likes,
            'published': self.published,
            'created_at': self.created_at.isoformat()
        }


class Comment(db.Model):
    """Комментарий"""
    __tablename__ = 'comments'
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'), nullable=True)
    post_id = db.Column(db.Integer, db.ForeignKey('blog_posts.id'), nullable=True)
    parent_id = db.Column(db.Integer, db.ForeignKey('comments.id'), nullable=True)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    likes = db.Column(db.Integer, default=0)
    
    # Связи
    replies = db.relationship('Comment', backref=db.backref('parent', remote_side=[id]))
    
    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'author_id': self.author_id,
            'task_id': self.task_id,
            'post_id': self.post_id,
            'parent_id': self.parent_id,
            'likes': self.likes,
            'created_at': self.created_at.isoformat()
        }


class QuizResult(db.Model):
    """Результат квиза"""
    __tablename__ = 'quiz_results'
    
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    correct_answers = db.Column(db.Integer, nullable=False)
    total_questions = db.Column(db.Integer, nullable=False)
    time_spent = db.Column(db.Integer, default=0)  # секунды
    xp_earned = db.Column(db.Integer, default=0)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'category': self.category,
            'score': self.score,
            'correct_answers': self.correct_answers,
            'total_questions': self.total_questions,
            'time_spent': self.time_spent,
            'xp_earned': self.xp_earned,
            'user_id': self.user_id,
            'created_at': self.created_at.isoformat()
        }


class UserTask(db.Model):
    """Прогресс пользователя по задачам"""
    __tablename__ = 'user_tasks'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'), nullable=False)
    
    solved = db.Column(db.Boolean, default=False)
    attempts = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    solved_at = db.Column(db.DateTime, nullable=True)
    
    __table_args__ = (db.UniqueConstraint('user_id', 'task_id', name='unique_user_task'),)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'task_id': self.task_id,
            'solved': self.solved,
            'attempts': self.attempts,
            'solved_at': self.solved_at.isoformat() if self.solved_at else None
        }


class GuestbookMessage(db.Model):
    """Сообщение гостевой книги"""
    __tablename__ = 'guestbook_messages'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=True)
    message = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, default=0)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    parent_id = db.Column(db.Integer, db.ForeignKey('guestbook_messages.id'), nullable=True)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Связи
    replies = db.relationship('GuestbookMessage', backref=db.backref('parent', remote_side=[id]))
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'message': self.message,
            'rating': self.rating,
            'user_id': self.user_id,
            'parent_id': self.parent_id,
            'created_at': self.created_at.isoformat()
        }


class Achievement(db.Model):
    """Достижение"""
    __tablename__ = 'achievements'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    icon = db.Column(db.String(50), default='🏆')
    xp_reward = db.Column(db.Integer, default=10)
    
    # Условия получения
    condition_type = db.Column(db.String(50), nullable=False)  # tasks_solved, quiz_score, streak
    condition_value = db.Column(db.Integer, nullable=False)
    
    # Связи
    user_achievements = db.relationship('UserAchievement', backref='achievement', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'icon': self.icon,
            'xp_reward': self.xp_reward,
            'condition_type': self.condition_type,
            'condition_value': self.condition_value
        }


class UserAchievement(db.Model):
    """Полученное пользователем достижение"""
    __tablename__ = 'user_achievements'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    achievement_id = db.Column(db.Integer, db.ForeignKey('achievements.id'), nullable=False)
    
    earned_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    __table_args__ = (db.UniqueConstraint('user_id', 'achievement_id', name='unique_user_achievement'),)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'achievement_id': self.achievement_id,
            'earned_at': self.earned_at.isoformat()
        }
