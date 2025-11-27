
```markdown
# Project Name

Краткое описание вашего проекта.

## Предварительные требования

Перед запуском проекта убедитесь, что у вас установлен:

- **Docker** - [Скачать Docker](https://www.docker.com/get-started)
- **Docker Compose** (обычно входит в состав Docker Desktop)

Проверьте установку Docker выполнив команду:
```bash
docker --version
docker-compose --version
```

## Запуск проекта

1. **Клонируйте репозиторий:**
```bash
git clone https://github.com/alljay3/MedicalProjectTest
cd MedicalProjectTest
```

2. **Запустите проект с помощью Docker Compose:**
```bash
docker-compose up -d
```


## Доступ к приложениям

После успешного запуска:

- **Frontend (Клиентская часть)** доступен по адресу:  
  `http://localhost:3000`

- **Backend (Серверная часть)** доступен по адресу:  
  `http://localhost:8080`

## Структура проекта

```
project/
├── frontend/          # Frontend приложение
├── backend/           # Backend приложение
├── docker-compose.yml # Конфигурация Docker
└── README.md
```
