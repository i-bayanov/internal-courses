# Software development and FE tools
  1. [Software development](https://github.com/i-bayanov/internal-courses/edit/master/README.md#software-development)  
    - [Software Development Life Cycle](https://github.com/i-bayanov/internal-courses/edit/master/README.md#software-development-life-cycle)  
    - [Software Development Methodologies](https://github.com/i-bayanov/internal-courses/edit/master/README.md#software-development-methodologies)  
  2. [FE tools](https://github.com/i-bayanov/internal-courses/edit/master/README.md#fe-tools)  
    - [IDE](https://github.com/i-bayanov/internal-courses/edit/master/README.md#ide)  
    - [Git](https://github.com/i-bayanov/internal-courses/edit/master/README.md#git)  
    - [NPM](https://github.com/i-bayanov/internal-courses/edit/master/README.md#npm)

## Software development
### Software Development Life Cycle

Изучите цикл разработки ПО

Материалы:  
[Что такое SDLC? Этапы, методология и процессы жизненного цикла программного обеспечения](https://habr.com/ru/company/dcmiran/blog/521718/)  
[Ещё раз про семь основных методологий разработки](https://habr.com/ru/company/edison/blog/269789/)

### Software Development Methodologies

Изучите методологии разработки ПО

Материалы:  
[WHAT IS SCRUM?](https://www.scrum.org/resources/what-is-scrum)  
[Scrum - методология управления проектами](https://unetway.com/tutorials/scrum)  
[Introduction to Kanban](https://www.planview.com/resources/guide/introduction-to-kanban/)  
[Kanban vs. Scrum](https://www.planview.com/resources/guide/introduction-to-kanban/kanban-vs-scrum/)  

## FE tools
### IDE

Установка и настройка IDE

1. Выберите наиболее удобную для вас IDE для дальнейшей работы с кодом.  
  Рекомендации: WebStorm или VSCode
2. Изучите плагины, которые доступны для выбранной IDE. Установите те, которые вам потребуются
3. Изучите возможности editorconfig, подготовьте и сохраните локально файл .editorconfig, настройте его как вам удобно

Материалы:  
[Standalone installation of WebStorm](https://www.jetbrains.com/help/webstorm/installation-guide.html#standalone)  
[Visual Studio Code](https://code.visualstudio.com/)  
[EditorConfig — Одни Настройки для всех Редакторов/IDE](https://habr.com/ru/post/220131/)  
[EditorConfig](https://editorconfig.org/)  

### Git

Установка git, подготовка репозитория

1. Изучите теоритические основы Git
2. Изучите наиболее используемые стратегии бранчевания, выберите одну и обсудите свой выбор с тренером
3. Изучите стандарт Conventional Commits, применяйте его при создании коммитов
4. Установите git вместе с bash терминалом
5. Настройте глобально в гите данные пользователя (имя и почту)
6. (опционально) Можете настроить SSH доступ к репозиторию
7. Склонируйте ваш репозиторий на локальный компьютер
8. Создайте ветку для работы в соответствии со стратегией бранчевания
9. Изучите работу с файлом .gitignore, настройте его и добавьте в свой локальный репозиторий, создайте коммит для этого изменения с помощью bash терминала
10. Добавьте в локальный репозиторий заготовленный файл .editorconfig, снова создайте коммит
11. Создайте структуру папок в корне репозитория для будущих задач, затем снова сделайте коммит:

```
01-code-quality
02-unit-testing
03-webpack
04-typescript
05-js-deep-clone
06-js-polyfills
07-js-debounce-throttle
08-js-data-combaine
09-js-week-days-service
10-js-words-sorting
11-js-tag-object-model
12-js-new-instance
13-js-robots-and-cleaners
14-js-weather-service
15-oop-network
16-layout-frontend-pizza
17-mvc-zombie-invasion
18-react-todo-list
19-react-custom-application
```
12. Сделайте пуш рабочей ветки в удалённый репозиторий через bash терминал
13. Создайте Merge Request на GitLab из вашей рабочей ветки в целевую
14. Пройдите код ревью, получите Approval от тренера и сделайте Merge

Примечания:
- Merge Request часто называют Pull Request, это просто другое название.
- Наличие таски в сторе означает, что для этой таски нужен мёрдж реквест. Если тасок в сторе нет, мёрдж реквест создавать не нужно (это не общее правило, только для этих курсов).
- Название каждого мёрдж реквеста должно быть таким же, как название соответствующей таски.
- В описание каждого мёрдж реквеста копируйте описание задачи.
- В дальнейшем тренер будет проводить код ревью всех мёрдж реквестов, оставляя комментарии. Все комментарии нужно обрабатывать - вносить исправления в код (если требуется), сообщать о результате, либо отвечать на вопросы. Если тренер видит в мёрдж реквесте свои комментарии, на которые нет ответа, то считает, что не все замечания обработаны и проверять ещё рано.
- При написании комментариев нажимать кнопку Resolve thread не нужно.
- Используйте зелёные кнопки Start a review, Add to review и Submit review, когда пишите комментарии в мёрдж реквесте. Это позволит публиковать комментарии сразу всей группой - при необходимости можно успеть отредактировать что-то до публикации, и в почту не будут приходить лишние уведомления.
- Рекомендуется писать комментарии на английском языке.

Материалы:  
[Документация Git](https://git-scm.com/book/ru/v2)  
[Git за полчаса: руководство для начинающих](https://proglib.io/p/git-for-half-an-hour)  
[LearnGitBranching](https://learngitbranching.js.org/)  
[Git – Введение – Что такое Git?](https://www.youtube.com/watch?v=W4hoc24K93E&list=PLDyvV36pndZFHXjXuwA_NywNrVQO0aQqb)  
[Branching стратегии в Git](https://bool.dev/blog/detail/git-branching-strategies)  
[Как генерировать осмысленные коммиты. Применяем стандарт Conventional Commits](https://habr.com/ru/company/yandex/blog/431432/)  
[Git How To](https://githowto.com/ru)  
[Правила синтаксиса файла .gitignore](https://support.rdb24.com/hc/ru/articles/115000463769-Правила-синтаксиса-файла-gitignore)  
[Инструменты Git - Раскрытие тайн reset](https://git-scm.com/book/ru/v2/Инструменты-Git-Раскрытие-тайн-reset)  
[Основы Git - Операции отмены](https://git-scm.com/book/ru/v2/Основы-Git-Операции-отмены)  

### NPM

Установка npm

1. Установите стабильную версию Node.js (попутно установится npm)
2. Создайте node-проект с помощью CLI в папке 01-code-quality
3. Укажите различную информацию о проекте
4. Установите для этого проекта пакеты eslint и prettier, выбрав нужный тип зависимости
5. Найдите эти пакеты в npm-реестре (npmjs.com), прочитайте их описание
6. Подготовьте ветку, сделайте коммит, запуште изменения в репозиторий и создайте Merge Request

Материалы:  
[Начало работы с Node.js](https://medium.com/devschacht/node-hero-chapter-1-239f7afeb1d1)  
[Использование NPM](https://medium.com/devschacht/node-hero-chapter-2-f04fec8182f0)  
[Введение в NPM - менеджер пакетов для Node.JS](https://learn.javascript.ru/screencast/nodejs#nodejs-npm-intro)  
[Структура пакета NPM](https://learn.javascript.ru/screencast/nodejs#nodejs-npm-package)  
[Глобальные модули](https://learn.javascript.ru/screencast/nodejs#nodejs-npm-global)  
[Семантическое Версионирование 2.0.0](https://semver.org/lang/ru/)  
[These NPM tricks will make you a pro](https://www.freecodecamp.org/news/10-npm-tricks-that-will-make-you-a-pro-a945982afb25/)  
[What to ask yourself before adding an NPM package to your project](https://www.freecodecamp.org/news/what-to-ask-yourself-before-adding-an-npm-package-to-your-project-6b92ba13070d/)
