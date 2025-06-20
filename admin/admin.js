// Проверка авторизации при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadDashboard();
    loadPages();
    loadNews();
    loadMedia();
    loadUsers();
    loadSettings();
    setupFileUpload();
});

// Проверка авторизации
function checkAuth() {
    const user = localStorage.getItem('currentUser');
    if (!user) {
        alert('Необходима авторизация');
        window.location.href = 'forum.html';
        return;
    }
    
    const userData = JSON.parse(user);
    if (userData.role !== 'Admin') {
        alert('Доступ запрещен. Требуются права администратора.');
        window.location.href = 'index.html';
        return;
    }
    
    document.getElementById('adminName').textContent = userData.name;
}

// Выход из системы
function logout() {
    if (confirm('Вы уверены, что хотите выйти?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
}

// Переключение между секциями
function showSection(sectionId) {
    // Скрыть все секции
    const sections = document.querySelectorAll('.admin-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Показать выбранную секцию
    document.getElementById(sectionId).classList.add('active');
    
    // Обновить активную кнопку навигации
    const navButtons = document.querySelectorAll('.admin-nav button');
    navButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// Загрузка дашборда
function loadDashboard() {
    // Здесь можно добавить реальную статистику
    const pages = getPages();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const news = getNews();
    
    document.getElementById('totalPages').textContent = pages.length;
    document.getElementById('totalUsers').textContent = users.length;
    document.getElementById('totalNews').textContent = news.length;
    document.getElementById('totalMedia').textContent = '12'; // Заглушка
}

// Данные страниц вашего сайта
function getPages() {
    return [
        { id: 'index', title: 'Главная страница', url: 'index.html', description: 'Главная страница IT-центра' },
        { id: 'about', title: 'О нас', url: 'about.html', description: 'Информация о центре' },
        { id: 'activity', title: 'Деятельность', url: 'activity.html', description: 'Наша деятельность' },
        { id: 'documents', title: 'Документы', url: 'documents.html', description: 'Документы и регламенты' },
        { id: 'electronic', title: 'Электронные услуги', url: 'electronic.html', description: 'Электронные услуги' },
        { id: 'faq', title: 'FAQ', url: 'faq.html', description: 'Часто задаваемые вопросы' },
        { id: 'forum', title: 'Авторизация', url: 'forum.html', description: 'Вход в систему' },
        { id: 'history', title: 'История', url: 'history.html', description: 'История IT-центра' },
        { id: 'mission', title: 'Миссия', url: 'mission.html', description: 'Наша миссия и цели' },
        { id: 'news', title: 'Новости', url: 'news.html', description: 'Новости и события' },
        { id: 'profile', title: 'Профиль', url: 'profile.html', description: 'Профиль пользователя' },
        { id: 'review', title: 'Отзывы', url: 'review.html', description: 'Отзывы клиентов' }
    ];
}

// Загрузка страниц
function loadPages() {
    const pageList = document.getElementById('pageList');
    const pages = getPages();
    
    pageList.innerHTML = '';
    
    pages.forEach(page => {
        const pageCard = document.createElement('div');
        pageCard.className = 'page-card';
        pageCard.innerHTML = `
            <h3>${page.title}</h3>
            <div class="page-url">${page.url}</div>
            <p style="color: #6c757d; margin: 10px 0;">${page.description}</p>
            <div class="page-actions">
                <button class="btn btn-primary" onclick="editPage('${page.id}')">
                    ✏️ Редактировать
                </button>
                <button class="btn btn-secondary" onclick="viewPage('${page.url}')" style="background: #28a745;">
                    👁️ Просмотр
                </button>
                ${page.id !== 'index' ? `<button class="btn btn-danger" onclick="deletePage('${page.id}')">🗑️ Удалить</button>` : ''}
            </div>
        `;
        pageList.appendChild(pageCard);
    });
}

// Просмотр страницы
function viewPage(url) {
    window.open(url, '_blank');
}

// Данные новостей
function getNews() {
    return JSON.parse(localStorage.getItem('news') || `[
        {"id": 1, "title": "Запуск нового IT-курса", "date": "2025-06-15", "content": "Мы рады объявить о запуске нового курса по веб-разработке"},
        {"id": 2, "title": "Обновление сайта", "date": "2025-06-10", "content": "Сайт IT-центра был обновлен с новым дизайном"},
        {"id": 3, "title": "Партнерство с университетом", "date": "2025-06-05", "content": "Подписано соглашение о сотрудничестве"}
    ]`);
}

// Загрузка новостей
function loadNews() {
    const newsList = document.getElementById('newsList');
    const news = getNews();
    
    newsList.innerHTML = '';
    
    news.forEach(item => {
        const newsCard = document.createElement('div');
        newsCard.className = 'page-card';
        newsCard.innerHTML = `
            <h3>${item.title}</h3>
            <div class="page-url">${item.date}</div>
            <p style="color: #6c757d; margin: 10px 0;">${item.content}</p>
            <div class="page-actions">
                <button class="btn btn-primary" onclick="editNews(${item.id})">✏️ Редактировать</button>
                <button class="btn btn-danger" onclick="deleteNews(${item.id})">🗑️ Удалить</button>
            </div>
        `;
        newsList.appendChild(newsCard);
    });
}

// Создание новой страницы
function createNewPage() {
    document.getElementById('modalTitle').textContent = 'Создать новую страницу';
    document.getElementById('pageTitle').value = '';
    document.getElementById('pageUrl').value = '';
    document.getElementById('pageDescription').value = '';
    document.getElementById('pageContent').value = '';
    document.getElementById('pageModal').style.display = 'block';
}

// Редактирование страницы
function editPage(pageId) {
    const pages = getPages();
    const page = pages.find(p => p.id === pageId);
    
    if (page) {
        document.getElementById('modalTitle').textContent = 'Редактировать страницу';
        document.getElementById('pageTitle').value = page.title;
        document.getElementById('pageUrl').value = page.url;
        document.getElementById('pageDescription').value = page.description;
        
        // Здесь в реальном проекте нужно загрузить содержимое файла
        document.getElementById('pageContent').value = `<!-- Содержимое файла ${page.url} -->
<h1>${page.title}</h1>
<p>${page.description}</p>`;
        
        document.getElementById('pageModal').style.display = 'block';
    }
}

// Закрытие модального окна
function closeModal() {
    document.getElementById('pageModal').style.display = 'none';
}

// Обработка формы страницы
document.getElementById('pageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('pageTitle').value;
    const url = document.getElementById('pageUrl').value;
    const description = document.getElementById('pageDescription').value;
    const content = document.getElementById('pageContent').value;
    
    // В реальном проекте здесь будет отправка на сервер
    alert(`Страница сохранена!
    
Название: ${title}
URL: ${url}
Описание: ${description}

В реальном проекте содержимое будет сохранено в файл ${url}`);
    
    closeModal();
    loadPages();
});

// Настройка загрузки файлов
function setupFileUpload() {
    const uploadArea = document.querySelector('.file-upload-area');
    const fileInput = document.getElementById('mediaUpload');
    
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        handleFileUpload(files);
    });
    
    fileInput.addEventListener('change', function(e) {
        handleFileUpload(e.target.files);
    });
}

function handleFileUpload(files) {
    if (files.length === 0) return;
    
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                addMediaToGrid(file.name, e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
}

function addMediaToGrid(filename, dataUrl) {
    const mediaGrid = document.getElementById('mediaGrid');
    const mediaItem = document.createElement('div');
    mediaItem.className = 'page-card';
    mediaItem.innerHTML = `
        <img src="${dataUrl}" alt="${filename}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;">
        <h4 style="margin: 0; font-size: 14px;">${filename}</h4>
        <div class="page-actions" style="margin-top: 15px;">
            <button class="btn btn-danger" onclick="this.parentElement.parentElement.remove()">🗑️ Удалить</button>
        </div>
    `;
    mediaGrid.appendChild(mediaItem);
}

// Загрузка медиа-файлов
function loadMedia() {
    const mediaGrid = document.getElementById('mediaGrid');
    
    // Добавляем примеры медиа-файлов для демонстрации
    const sampleMedia = [
        { name: 'logo.png', type: 'image', url: 'img/logo.png' },
        { name: 'banner.jpg', type: 'image', url: 'img/banner.jpg' },
        { name: 'team.jpg', type: 'image', url: 'img/team.jpg' }
    ];
    
    mediaGrid.innerHTML = '';
    
    sampleMedia.forEach(media => {
        const mediaItem = document.createElement('div');
        mediaItem.className = 'page-card';
        mediaItem.innerHTML = `
            <img src="${media.url}" alt="${media.name}" 
                 style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;"
                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiNmOGY5ZmEiLz48dGV4dCB4PSIxMDAiIHk9Ijc1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNmM3NTdkIiBmb250LXNpemU9IjE0Ij7QndC10YIg0LjQt9C+0LHRgNCw0LbQtdC90LjRjzwvdGV4dD48L3N2Zz4='">
            <h4 style="margin: 0; font-size: 14px;">${media.name}</h4>
            <div class="page-actions" style="margin-top: 15px;">
                <button class="btn btn-primary" onclick="copyMediaUrl('${media.url}')">📋 Копировать URL</button>
                <button class="btn btn-danger" onclick="deleteMedia('${media.name}')">🗑️ Удалить</button>
            </div>
        `;
        mediaGrid.appendChild(mediaItem);
    });
}

// Копирование URL медиа-файла
function copyMediaUrl(url) {
    navigator.clipboard.writeText(url).then(() => {
        alert('URL скопирован в буфер обмена!');
    }).catch(() => {
        // Fallback для старых браузеров
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('URL скопирован в буфер обмена!');
    });
}

// Удаление медиа-файла
function deleteMedia(filename) {
    if (confirm(`Вы уверены, что хотите удалить файл "${filename}"?`)) {
        // В реальном проекте здесь будет удаление файла с сервера
        alert('В реальном проекте файл будет удален с сервера');
        loadMedia();
    }
}

// Загрузка пользователей
function loadUsers() {
    const userList = document.getElementById('userList');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    userList.innerHTML = '';
    
    users.forEach((user, index) => {
        const userCard = document.createElement('div');
        userCard.className = 'page-card';
        
        const roleColor = user.role === 'Admin' ? '#dc3545' : '#28a745';
        const roleIcon = user.role === 'Admin' ? '👑' : '👤';
        
        userCard.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px;">
                    ${user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h3 style="margin: 0; display: flex; align-items: center; gap: 5px;">
                        ${user.name} 
                        <span style="color: ${roleColor}; font-size: 16px;">${roleIcon}</span>
                    </h3>
                    <p style="margin: 2px 0; color: #6c757d;">${user.email}</p>
                    <span style="background: ${roleColor}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${user.role}</span>
                </div>
            </div>
            <div class="page-actions">
                <button class="btn btn-primary" onclick="editUser(${index})">✏️ Редактировать</button>
                <button class="btn btn-secondary" onclick="resetUserPassword(${index})" style="background: #ffc107; color: #000;">🔑 Сбросить пароль</button>
                <button class="btn btn-danger" onclick="deleteUser(${index})">🗑️ Удалить</button>
            </div>
        `;
        userList.appendChild(userCard);
    });
}

// Создание пользователя
function createUser() {
    const name = prompt('Имя пользователя:');
    if (!name) return;
    
    const email = prompt('Email:');
    if (!email) return;
    
    const password = prompt('Пароль:');
    if (!password) return;
    
    const role = confirm('Это администратор?') ? 'Admin' : 'User';
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Проверяем, нет ли уже пользователя с таким email
    if (users.find(u => u.email === email)) {
        alert('Пользователь с таким email уже существует!');
        return;
    }
    
    users.push({ name, email, password, role });
    localStorage.setItem('users', JSON.stringify(users));
    
    loadUsers();
    loadDashboard();
    alert('Пользователь создан успешно!');
}

// Редактирование пользователя
function editUser(index) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users[index];
    
    const name = prompt('Имя пользователя:', user.name);
    if (name === null) return;
    
    const email = prompt('Email:', user.email);
    if (email === null) return;
    
    // Проверяем уникальность email (исключая текущего пользователя)
    if (users.find((u, i) => u.email === email && i !== index)) {
        alert('Пользователь с таким email уже существует!');
        return;
    }
    
    const isAdmin = confirm(`Роль: Администратор?\n\nТекущая роль: ${user.role}\nНажмите ОК для Admin, Отмена для User`);
    const role = isAdmin ? 'Admin' : 'User';
    
    users[index] = { ...user, name, email, role };
    localStorage.setItem('users', JSON.stringify(users));
    
    loadUsers();
    alert('Пользователь обновлен успешно!');
}

// Сброс пароля пользователя
function resetUserPassword(index) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users[index];
    
    const newPassword = prompt(`Введите новый пароль для пользователя ${user.name}:`);
    if (!newPassword) return;
    
    users[index].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    
    alert(`Пароль для пользователя ${user.name} был изменен на: ${newPassword}`);
}

// Удаление пользователя
function deleteUser(index) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users[index];
    
    if (confirm(`Вы уверены, что хотите удалить пользователя "${user.name}"?`)) {
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        
        loadUsers();
        loadDashboard();
        alert('Пользователь удален успешно!');
    }
}

// Создание новости
function createNews() {
    const title = prompt('Заголовок новости:');
    if (!title) return;
    
    const content = prompt('Содержание новости:');
    if (!content) return;
    
    const news = getNews();
    const newId = Math.max(...news.map(n => n.id), 0) + 1;
    const currentDate = new Date().toISOString().split('T')[0];
    
    news.push({
        id: newId,
        title: title,
        date: currentDate,
        content: content
    });
    
    localStorage.setItem('news', JSON.stringify(news));
    loadNews();
    loadDashboard();
    alert('Новость добавлена успешно!');
}

// Редактирование новости
function editNews(id) {
    const news = getNews();
    const item = news.find(n => n.id === id);
    
    if (!item) return;
    
    const title = prompt('Заголовок новости:', item.title);
    if (title === null) return;
    
    const content = prompt('Содержание новости:', item.content);
    if (content === null) return;
    
    const index = news.findIndex(n => n.id === id);
    news[index] = { ...item, title, content };
    
    localStorage.setItem('news', JSON.stringify(news));
    loadNews();
    alert('Новость обновлена успешно!');
}

// Удаление новости
function deleteNews(id) {
    if (confirm('Вы уверены, что хотите удалить эту новость?')) {
        const news = getNews();
        const filteredNews = news.filter(n => n.id !== id);
        
        localStorage.setItem('news', JSON.stringify(filteredNews));
        loadNews();
        loadDashboard();
        alert('Новость удалена успешно!');
    }
}

// Удаление страницы
function deletePage(pageId) {
    if (confirm('Вы уверены, что хотите удалить эту страницу?')) {
        // В реальном проекте здесь будет удаление файла с сервера
        alert(`Страница ${pageId} будет удалена.\n\nВ реальном проекте файл будет удален с сервера.`);
        loadPages();
    }
}

// Загрузка настроек
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('siteSettings') || '{}');
    
    document.getElementById('siteName').value = settings.siteName || 'IT-центр';
    document.getElementById('siteDescription').value = settings.siteDescription || 'Центр информационных технологий';
    document.getElementById('adminEmail').value = settings.adminEmail || 'kuanyshbekmeir@gmail.com';
    document.getElementById('sitePhone').value = settings.sitePhone || '+7 (XXX) XXX-XX-XX';
    document.getElementById('siteAddress').value = settings.siteAddress || 'Астана, Казахстан';
}

// Сохранение настроек
document.getElementById('settingsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const settings = {
        siteName: document.getElementById('siteName').value,
        siteDescription: document.getElementById('siteDescription').value,
        adminEmail: document.getElementById('adminEmail').value,
        sitePhone: document.getElementById('sitePhone').value,
        siteAddress: document.getElementById('siteAddress').value,
        updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    
    // Показываем уведомление об успешном сохранении
    const button = e.target.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = '✅ Сохранено!';
    button.style.background = '#28a745';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 2000);
});

// Закрытие модального окна по клику вне его
document.getElementById('pageModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Закрытие модального окна по нажатию Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('pageModal').style.display === 'block') {
        closeModal();
    }
});

// Инициализация пользователей по умолчанию
function initializeDefaultUsers() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.length === 0) {
        const defaultUsers = [
            {
                name: 'Meirman',
                email: 'kuanyshbekmeir@gmail.com',
                password: 'admin123',
                role: 'Admin'
            },
            {
                name: 'Admin',
                email: 'admin@itcz.kz',
                password: 'admin123',
                role: 'Admin'
            },
            {
                name: 'User',
                email: 'user@itcz.kz',
                password: 'user123',
                role: 'User'
            }
        ];
        
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
}

// Вызываем инициализацию при загрузке
initializeDefaultUsers();

// Функция для экспорта данных
function exportData() {
    const data = {
        users: JSON.parse(localStorage.getItem('users') || '[]'),
        news: JSON.parse(localStorage.getItem('news') || '[]'),
        settings: JSON.parse(localStorage.getItem('siteSettings') || '{}'),
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `itcz_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
}

// Функция для импорта данных
function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                
                if (confirm('Вы уверены, что хотите импортировать данные? Текущие данные будут перезаписаны.')) {
                    if (data.users) localStorage.setItem('users', JSON.stringify(data.users));
                    if (data.news) localStorage.setItem('news', JSON.stringify(data.news));
                    if (data.settings) localStorage.setItem('siteSettings', JSON.stringify(data.settings));
                    
                    alert('Данные успешно импортированы!');
                    location.reload();
                }
            } catch (error) {
                alert('Ошибка при импорте данных. Проверьте формат файла.');
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}

// Добавляем кнопки экспорта/импорта в настройки
document.addEventListener('DOMContentLoaded', function() {
    const settingsForm = document.getElementById('settingsForm');
    const exportImportDiv = document.createElement('div');
    exportImportDiv.innerHTML = `
        <div style="margin-top: 30px; padding-top: 30px; border-top: 1px solid #dee2e6;">
            <h4>Резервное копирование</h4>
            <div style="display: flex; gap: 15px; margin-top: 15px;">
                <button type="button" class="btn btn-secondary" onclick="exportData()">
                    📥 Экспорт данных
                </button>
                <button type="button" class="btn btn-secondary" onclick="importData()">
                    📤 Импорт данных
                </button>
            </div>
            <p style="color: #6c757d; font-size: 12px; margin-top: 10px;">
                Экспорт сохранит все данные в JSON файл. Импорт восстановит данные из файла.
            </p>
        </div>
    `;
    settingsForm.appendChild(exportImportDiv);
});

console.log('🎉 Админ-панель IT-центра загружена успешно!');

// Остальные функции (loadMedia, loadUsers, loadSettings, etc.)