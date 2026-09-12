/* ========================================
   PythonPath - Админ-панель
   ======================================== */

// ========================================
// Глобальные переменные
// ========================================

let tasks = [];
let screenshotData = null;

// ========================================
// Инициализация
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initAuth();
    initNavigation();
    checkAdminAccess();
    initAdminTabs();
    initAddTaskForm();
    initFileUpload();
    initFormatCode();
    initSettings();
    initEditModal();
});

// ========================================
// Проверка доступа
// ========================================

function checkAdminAccess() {
    const savedUser = localStorage.getItem('userData');
    const accessDenied = document.getElementById('accessDenied');
    const adminContent = document.getElementById('adminContent');
    const loginToAdmin = document.getElementById('loginToAdmin');
    
    if (!savedUser) {
        accessDenied.classList.remove('hidden');
        adminContent.classList.add('hidden');
    } else {
        const userData = JSON.parse(savedUser);
        if (!userData.isLoggedIn) {
            accessDenied.classList.remove('hidden');
            adminContent.classList.add('hidden');
        } else {
            accessDenied.classList.add('hidden');
            adminContent.classList.remove('hidden');
            loadTasks();
        }
    }
    
    if (loginToAdmin) {
        loginToAdmin.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
}

// ========================================
// Вкладки админ-панели
// ========================================

function initAdminTabs() {
    const tabs = document.querySelectorAll('.admin-tab');
    const panels = document.querySelectorAll('.admin-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;
            
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            panels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `${tabId}Panel`) {
                    panel.classList.add('active');
                }
            });
            
            if (tabId === 'manage-tasks') {
                loadTasksAdminList();
            }
        });
    });
}

// ========================================
// Добавление задачи
// ========================================

function initAddTaskForm() {
    const form = document.getElementById('addTaskForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const task = {
            id: Date.now(),
            title: document.getElementById('taskTitle').value.trim(),
            difficulty: document.getElementById('taskDifficulty').value,
            preview: document.getElementById('taskPreview').value.trim(),
            tags: parseTags(document.getElementById('taskTags').value),
            screenshot: screenshotData,
            code: document.getElementById('taskCode').value,
            explanation: document.getElementById('taskExplanation').value.trim(),
            date: new Date().toISOString().split('T')[0]
        };
        
        // Загружаем существующие задачи
        tasks = loadTasksFromStorage();
        tasks.unshift(task); // Добавляем в начало
        
        // Сохраняем
        saveTasksToStorage(tasks);
        
        // Очищаем форму
        form.reset();
        screenshotData = null;
        document.getElementById('screenshotPreview').innerHTML = '';
        
        // Уведомление
        showNotification('✅ Задача успешно добавлена!', 'success');
        
        // Обновляем статистику
        updateStats();
    });
}

function parseTags(tagsStr) {
    if (!tagsStr.trim()) return [];
    return tagsStr.split(',')
        .map(tag => tag.trim().toLowerCase())
        .filter(tag => tag.length > 0);
}

// ========================================
// Загрузка файлов
// ========================================

function initFileUpload() {
    const fileInput = document.getElementById('taskScreenshot');
    const preview = document.getElementById('screenshotPreview');
    
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        // Проверка размера (5MB)
        if (file.size > 5 * 1024 * 1024) {
            showNotification('❌ Файл слишком большой (макс. 5MB)', 'error');
            fileInput.value = '';
            return;
        }
        
        // Проверка типа
        if (!file.type.startsWith('image/')) {
            showNotification('❌ Загрузите изображение (PNG, JPG, GIF)', 'error');
            fileInput.value = '';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            screenshotData = e.target.result;
            preview.innerHTML = `
                <div class="preview-container">
                    <img src="${screenshotData}" alt="Preview">
                    <button type="button" class="remove-file" onclick="removeScreenshot()">✕</button>
                </div>
            `;
        };
        reader.readAsDataURL(file);
    });
}

function removeScreenshot() {
    screenshotData = null;
    document.getElementById('taskScreenshot').value = '';
    document.getElementById('screenshotPreview').innerHTML = '';
}

// ========================================
// Форматирование кода
// ========================================

function initFormatCode() {
    const btn = document.getElementById('formatCodeBtn');
    const codeArea = document.getElementById('taskCode');
    
    btn.addEventListener('click', () => {
        const code = codeArea.value;
        // Простое форматирование - удаление лишних пустых строк
        const formatted = code.replace(/\n\s*\n\s*\n/g, '\n\n').trim();
        codeArea.value = formatted;
        showNotification('📝 Код отформатирован', 'info');
    });
}

// ========================================
// Список задач (админ)
// ========================================

function loadTasksAdminList() {
    const container = document.getElementById('tasksAdminList');
    const countEl = document.getElementById('totalTasksCount');
    
    tasks = loadTasksFromStorage();
    countEl.textContent = tasks.length;
    
    if (tasks.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">📭</span>
                <p>Задач пока нет</p>
                <button class="btn btn-primary" onclick="document.querySelector('[data-tab=add-task]').click()">
                    ➕ Добавить первую задачу
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = tasks.map(task => `
        <div class="task-admin-item" data-task-id="${task.id}">
            <div class="task-admin-info">
                <div class="task-admin-header-row">
                    <h4>${escapeHtml(task.title)}</h4>
                    <span class="task-difficulty ${task.difficulty}">${getDifficultyLabel(task.difficulty)}</span>
                </div>
                <p class="task-admin-preview">${escapeHtml(task.preview)}</p>
                <div class="task-admin-meta">
                    <span class="task-admin-date">📅 ${formatDate(task.date)}</span>
                    ${task.tags.length > 0 ? `
                        <span class="task-admin-tags">
                            ${task.tags.map(tag => `#${tag}`).join(' ')}
                        </span>
                    ` : ''}
                </div>
            </div>
            <div class="task-admin-actions">
                <button class="btn-action btn-edit" onclick="openEditTask(${task.id})" title="Редактировать">
                    ✏️
                </button>
                <button class="btn-action btn-delete" onclick="confirmDeleteTask(${task.id})" title="Удалить">
                    🗑️
                </button>
            </div>
        </div>
    `).join('');
    
    // Поиск
    initAdminSearch();
}

function initAdminSearch() {
    const searchInput = document.getElementById('adminTaskSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const items = document.querySelectorAll('.task-admin-item');
        
        items.forEach(item => {
            const title = item.querySelector('h4').textContent.toLowerCase();
            const preview = item.querySelector('.task-admin-preview').textContent.toLowerCase();
            const tags = item.querySelector('.task-admin-tags')?.textContent.toLowerCase() || '';
            
            if (title.includes(query) || preview.includes(query) || tags.includes(query)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// ========================================
// Редактирование задачи
// ========================================

function initEditModal() {
    const modal = document.getElementById('editTaskModal');
    const closeBtn = document.getElementById('editModalClose');
    const cancelBtn = document.getElementById('cancelEditBtn');
    const form = document.getElementById('editTaskForm');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        saveEditTask();
    });
}

function openEditTask(taskId) {
    tasks = loadTasksFromStorage();
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    document.getElementById('editTaskId').value = task.id;
    document.getElementById('editTaskTitle').value = task.title;
    document.getElementById('editTaskDifficulty').value = task.difficulty;
    document.getElementById('editTaskPreview').value = task.preview;
    document.getElementById('editTaskTags').value = task.tags.join(', ');
    document.getElementById('editTaskCode').value = task.code;
    document.getElementById('editTaskExplanation').value = task.explanation || '';
    
    document.getElementById('editTaskModal').classList.add('active');
}

function saveEditTask() {
    const taskId = parseInt(document.getElementById('editTaskId').value);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) return;
    
    tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: document.getElementById('editTaskTitle').value.trim(),
        difficulty: document.getElementById('editTaskDifficulty').value,
        preview: document.getElementById('editTaskPreview').value.trim(),
        tags: parseTags(document.getElementById('editTaskTags').value),
        code: document.getElementById('editTaskCode').value,
        explanation: document.getElementById('editTaskExplanation').value.trim()
    };
    
    saveTasksToStorage(tasks);
    document.getElementById('editTaskModal').classList.remove('active');
    loadTasksAdminList();
    showNotification('✅ Задача обновлена!', 'success');
}

// ========================================
// Удаление задач
// ========================================

function confirmDeleteTask(taskId) {
    const modal = document.getElementById('confirmModal');
    const title = document.getElementById('confirmTitle');
    const message = document.getElementById('confirmMessage');
    const okBtn = document.getElementById('confirmOk');
    const cancelBtn = document.getElementById('confirmCancel');
    
    title.textContent = 'Удаление задачи';
    message.textContent = 'Вы уверены, что хотите удалить эту задачу?';
    modal.classList.add('active');
    
    const handleConfirm = () => {
        tasks = loadTasksFromStorage();
        tasks = tasks.filter(t => t.id !== taskId);
        saveTasksToStorage(tasks);
        loadTasksAdminList();
        modal.classList.remove('active');
        showNotification('🗑️ Задача удалена', 'info');
        
        okBtn.removeEventListener('click', handleConfirm);
        cancelBtn.removeEventListener('click', handleCancel);
    };
    
    const handleCancel = () => {
        modal.classList.remove('active');
        okBtn.removeEventListener('click', handleConfirm);
        cancelBtn.removeEventListener('click', handleCancel);
    };
    
    okBtn.addEventListener('click', handleConfirm);
    cancelBtn.addEventListener('click', handleCancel);
}

// ========================================
// Настройки
// ========================================

function initSettings() {
    // Экспорт
    const exportBtn = document.getElementById('exportTasksBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportTasks);
    }
    
    // Импорт
    const importInput = document.getElementById('importTasksFile');
    if (importInput) {
        importInput.addEventListener('change', importTasks);
    }
    
    // Удаление всех задач
    const deleteAllBtn = document.getElementById('deleteAllTasksBtn');
    if (deleteAllBtn) {
        deleteAllBtn.addEventListener('click', () => {
            const modal = document.getElementById('confirmModal');
            const title = document.getElementById('confirmTitle');
            const message = document.getElementById('confirmMessage');
            const okBtn = document.getElementById('confirmOk');
            const cancelBtn = document.getElementById('confirmCancel');
            
            title.textContent = 'Удалить все задачи?';
            message.textContent = 'Это действие нельзя отменить! Все задачи будут удалены безвозвратно.';
            modal.classList.add('active');
            
            const handleConfirm = () => {
                localStorage.removeItem('tasks');
                tasks = [];
                loadTasksAdminList();
                modal.classList.remove('active');
                showNotification('🗑️ Все задачи удалены', 'info');
                
                okBtn.removeEventListener('click', handleConfirm);
                cancelBtn.removeEventListener('click', handleCancel);
            };
            
            const handleCancel = () => {
                modal.classList.remove('active');
                okBtn.removeEventListener('click', handleConfirm);
                cancelBtn.removeEventListener('click', handleCancel);
            };
            
            okBtn.addEventListener('click', handleConfirm);
            cancelBtn.addEventListener('click', handleCancel);
        });
    }
}

function exportTasks() {
    tasks = loadTasksFromStorage();
    
    if (tasks.length === 0) {
        showNotification('❌ Нет задач для экспорта', 'error');
        return;
    }
    
    const data = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        tasks: tasks
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pythonpath-tasks-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('📥 Задачи экспортированы', 'success');
}

function importTasks(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const data = JSON.parse(event.target.result);
            
            if (!data.tasks || !Array.isArray(data.tasks)) {
                throw new Error('Неверный формат файла');
            }
            
            const modal = document.getElementById('confirmModal');
            const title = document.getElementById('confirmTitle');
            const message = document.getElementById('confirmMessage');
            const okBtn = document.getElementById('confirmOk');
            const cancelBtn = document.getElementById('confirmCancel');
            
            title.textContent = 'Импорт задач';
            message.textContent = `Будет импортировано ${data.tasks.length} задач. Продолжить?`;
            modal.classList.add('active');
            
            const handleConfirm = () => {
                tasks = loadTasksFromStorage();
                
                // Добавляем новые задачи, генерируя новые ID
                data.tasks.forEach(task => {
                    task.id = Date.now() + Math.random();
                    tasks.push(task);
                });
                
                saveTasksToStorage(tasks);
                loadTasksAdminList();
                modal.classList.remove('active');
                showNotification(`📥 Импортировано ${data.tasks.length} задач`, 'success');
                
                okBtn.removeEventListener('click', handleConfirm);
                cancelBtn.removeEventListener('click', handleCancel);
            };
            
            const handleCancel = () => {
                modal.classList.remove('active');
                okBtn.removeEventListener('click', handleConfirm);
                cancelBtn.removeEventListener('click', handleCancel);
            };
            
            okBtn.addEventListener('click', handleConfirm);
            cancelBtn.addEventListener('click', handleCancel);
            
        } catch (err) {
            showNotification('❌ Ошибка импорта: ' + err.message, 'error');
        }
    };
    reader.readAsText(file);
    e.target.value = '';
}

// ========================================
// Утилиты
// ========================================

function loadTasksFromStorage() {
    const stored = localStorage.getItem('tasks');
    if (stored) {
        return JSON.parse(stored);
    }
    // Возвращаем демо-задачи если нет сохранённых
    return typeof sampleTasks !== 'undefined' ? [...sampleTasks] : [];
}

function saveTasksToStorage(tasksToSave) {
    localStorage.setItem('tasks', JSON.stringify(tasksToSave));
}

function loadTasks() {
    tasks = loadTasksFromStorage();
}

function updateStats() {
    const stats = {
        tasksCount: tasks.length,
        streakCount: 7,
        hoursCount: 42,
        level: Math.floor(tasks.length / 10) + 1
    };
    localStorage.setItem('stats', JSON.stringify(stats));
}

function showNotification(message, type = 'info') {
    // Удаляем предыдущие уведомления
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        background: var(--card-bg);
        border-left: 4px solid var(--${type === 'success' ? 'success-color' : type === 'error' ? 'danger-color' : 'info-color'});
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

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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

// ========================================
// Стили для уведомлений
// ========================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .admin-tabs {
        display: flex;
        gap: 10px;
        margin-bottom: 30px;
        flex-wrap: wrap;
    }
    
    .admin-tab {
        padding: 12px 20px;
        background: var(--bg-secondary);
        border: 2px solid var(--border-color);
        border-radius: 10px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;
        color: var(--text-primary);
    }
    
    .admin-tab:hover,
    .admin-tab.active {
        background: var(--accent-primary);
        color: white;
        border-color: var(--accent-primary);
    }
    
    .admin-panel {
        display: none;
    }
    
    .admin-panel.active {
        display: block;
    }
    
    .admin-card {
        background: var(--card-bg);
        padding: 30px;
        border-radius: 20px;
        box-shadow: 0 5px 20px var(--shadow-color);
    }
    
    .admin-card h3 {
        margin-bottom: 25px;
        color: var(--text-primary);
    }
    
    .admin-form .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }
    
    .admin-form .form-group {
        margin-bottom: 20px;
    }
    
    .admin-form label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: var(--text-primary);
    }
    
    .admin-form input,
    .admin-form select,
    .admin-form textarea {
        width: 100%;
        padding: 12px 15px;
        border: 1px solid var(--border-color);
        border-radius: 10px;
        font-size: 1rem;
        font-family: inherit;
        background: var(--bg-primary);
        color: var(--text-primary);
    }
    
    .admin-form input:focus,
    .admin-form select:focus,
    .admin-form textarea:focus {
        outline: none;
        border-color: var(--accent-primary);
    }
    
    .admin-form textarea {
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
    }
    
    .code-editor-wrapper {
        position: relative;
    }
    
    .format-code-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 6px 12px;
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.85rem;
        color: var(--text-primary);
    }
    
    .file-upload {
        margin-top: 10px;
    }
    
    .file-upload-label {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px;
        border: 2px dashed var(--border-color);
        border-radius: 15px;
        cursor: pointer;
        transition: all 0.3s ease;
        color: var(--text-secondary);
    }
    
    .file-upload-label:hover {
        border-color: var(--accent-primary);
        background: var(--bg-secondary);
    }
    
    .upload-icon {
        font-size: 2rem;
        margin-bottom: 10px;
    }
    
    .file-preview {
        margin-top: 15px;
    }
    
    .preview-container {
        position: relative;
        display: inline-block;
    }
    
    .preview-container img {
        max-width: 300px;
        max-height: 200px;
        border-radius: 10px;
        border: 1px solid var(--border-color);
    }
    
    .remove-file {
        position: absolute;
        top: -10px;
        right: -10px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: var(--danger-color);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1rem;
    }
    
    .form-actions {
        display: flex;
        gap: 15px;
        margin-top: 25px;
    }
    
    .tasks-admin-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        flex-wrap: wrap;
        gap: 15px;
    }
    
    .tasks-count {
        color: var(--text-secondary);
        font-weight: 500;
    }
    
    .tasks-admin-list {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    
    .task-admin-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background: var(--bg-secondary);
        border-radius: 15px;
        transition: all 0.3s ease;
    }
    
    .task-admin-item:hover {
        background: var(--bg-tertiary);
    }
    
    .task-admin-info {
        flex: 1;
    }
    
    .task-admin-header-row {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 10px;
    }
    
    .task-admin-header-row h4 {
        color: var(--text-primary);
        margin: 0;
    }
    
    .task-admin-preview {
        color: var(--text-secondary);
        margin-bottom: 10px;
        font-size: 0.95rem;
    }
    
    .task-admin-meta {
        display: flex;
        gap: 15px;
        font-size: 0.85rem;
        color: var(--text-muted);
    }
    
    .task-admin-tags {
        color: var(--accent-primary);
    }
    
    .task-admin-actions {
        display: flex;
        gap: 10px;
    }
    
    .btn-action {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        transition: all 0.3s ease;
    }
    
    .btn-edit {
        background: var(--info-color);
        color: white;
    }
    
    .btn-edit:hover {
        background: var(--accent-primary);
    }
    
    .btn-delete {
        background: var(--danger-color);
        color: white;
    }
    
    .btn-delete:hover {
        background: #c0392b;
    }
    
    .empty-state {
        text-align: center;
        padding: 60px 20px;
    }
    
    .empty-icon {
        font-size: 4rem;
        display: block;
        margin-bottom: 20px;
    }
    
    .empty-state p {
        color: var(--text-secondary);
        margin-bottom: 20px;
    }
    
    .settings-group {
        padding: 20px;
        background: var(--bg-secondary);
        border-radius: 15px;
        margin-bottom: 20px;
    }
    
    .settings-group h4 {
        color: var(--text-primary);
        margin-bottom: 10px;
    }
    
    .settings-group p {
        color: var(--text-secondary);
        margin-bottom: 15px;
    }
    
    .btn-danger {
        background: var(--danger-color);
        color: white;
    }
    
    .btn-danger:hover {
        opacity: 0.8;
    }
    
    .confirm-modal,
    .edit-task-modal {
        max-width: 500px;
    }
    
    .edit-task-modal {
        max-width: 700px;
        max-height: 90vh;
        overflow-y: auto;
    }
    
    .confirm-buttons {
        display: flex;
        gap: 15px;
        justify-content: flex-end;
        margin-top: 20px;
    }
    
    .access-denied {
        text-align: center;
        padding: 80px 20px;
    }
    
    .access-icon {
        font-size: 5rem;
        margin-bottom: 20px;
    }
    
    .access-denied h2 {
        color: var(--text-primary);
        margin-bottom: 15px;
    }
    
    .access-denied p {
        color: var(--text-secondary);
        margin-bottom: 25px;
    }
`;
document.head.appendChild(style);
