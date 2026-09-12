/* ========================================
   PythonPath - Шпаргалки
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initAuth();
    initNavigation();
    initCheatsheetSearch();
    initCopyCode();
});

// ========================================
// Поиск по шпаргалкам
// ========================================
function initCheatsheetSearch() {
    const searchInput = document.getElementById('cheatsheetSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            filterCheatsheets(query);
        });
    }
}

function filterCheatsheets(query) {
    const cards = document.querySelectorAll('.cheatsheet-card');
    
    cards.forEach(card => {
        const content = card.textContent.toLowerCase();
        const title = card.querySelector('h3').textContent.toLowerCase();
        
        if (content.includes(query) || title.includes(query) || query === '') {
            card.style.display = '';
            
            // Подсветка совпадений внутри карточки
            if (query) {
                highlightMatches(card, query);
            }
        } else {
            card.style.display = 'none';
        }
    });
}

function highlightMatches(card, query) {
    // Можно добавить подсветку найденных терминов
    const items = card.querySelectorAll('.cheat-item h4');
    items.forEach(item => {
        const text = item.textContent;
        if (text.toLowerCase().includes(query)) {
            item.style.color = 'var(--accent-primary)';
        } else {
            item.style.color = '';
        }
    });
}

// ========================================
// Копирование кода
// ========================================
function initCopyCode() {
    // Добавляем кнопки копирования ко всем блокам кода
    const codeBlocks = document.querySelectorAll('pre');
    
    codeBlocks.forEach(block => {
        // Создаём кнопку
        const btn = document.createElement('button');
        btn.className = 'copy-code-btn';
        btn.textContent = '📋';
        btn.title = 'Копировать';
        
        btn.addEventListener('click', () => {
            const code = block.querySelector('code')?.textContent || block.textContent;
            navigator.clipboard.writeText(code).then(() => {
                btn.textContent = '✅';
                setTimeout(() => {
                    btn.textContent = '📋';
                }, 2000);
            });
        });
        
        block.style.position = 'relative';
        block.appendChild(btn);
    });
}
