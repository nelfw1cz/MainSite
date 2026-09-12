/* ========================================
   PythonPath - Страница разделов
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initAuth();
    initNavigation();
    loadSiteStats();
});

// ========================================
// Статистика сайта
// ========================================
function loadSiteStats() {
    // Задачи
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    document.getElementById('totalTasksStat').textContent = tasks.length;
    
    // Посты блога
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    document.getElementById('totalPostsStat').textContent = posts.length;
    
    // Вопросы в квизе
    const totalQuestions = 65; // Из quiz.js
    document.getElementById('totalQuestionsStat').textContent = totalQuestions;
    
    // Сообщения гостевой книги
    const messages = JSON.parse(localStorage.getItem('guestbookMessages')) || [];
    document.getElementById('totalMessagesStat').textContent = messages.length;
}
