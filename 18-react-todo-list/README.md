- [Class components](#%D0%BE%D1%81%D0%BD%D0%BE%D0%B2%D1%8B-react-%D0%B8-%D0%BA%D0%BB%D0%B0%D1%81%D1%81%D0%BE%D0%B2%D1%8B%D0%B5-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D1%8B)
  - [Задача: SPA Todo List на классовых компонентах](#%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B0-spa-todo-list-%D0%BD%D0%B0-%D0%BA%D0%BB%D0%B0%D1%81%D1%81%D0%BE%D0%B2%D1%8B%D1%85-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%B0%D1%85)
- [Hooks](#react-%D1%85%D1%83%D0%BA%D0%B8)
  - [Задача: SPA Todo List на хуках](#%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B0-spa-todo-list-%D0%BD%D0%B0-%D1%85%D1%83%D0%BA%D0%B0%D1%85)
- [Routing](#react-%D1%80%D0%BE%D1%83%D1%82%D0%B5%D1%80)
  - [Задача: SPA Todo List с роутером](#%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B0-spa-todo-list-%D1%81-%D1%80%D0%BE%D1%83%D1%82%D0%B5%D1%80%D0%BE%D0%BC)
- [Redux](#%D1%83%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D1%81%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D0%B5%D0%BC-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F)
  - [Задача: SPA Todo List c Redux](#%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B0-spa-todo-list-c-redux)
- [React DevTools](#%D0%BE%D1%82%D0%BB%D0%B0%D0%B4%D0%BA%D0%B0-react-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F)
- [Testing](#%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-react-%D0%BA%D0%BE%D0%B4%D0%B0)
  - [Задача: Тестирование приложения Todo List](#%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B0-%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F-todo-list)
- [SSR](#server-side-rendering)
- [Advanced guides](#%D0%BF%D1%80%D0%BE%D0%B4%D0%B2%D0%B8%D0%BD%D1%83%D1%82%D1%8B%D0%B5-%D1%82%D0%B5%D1%85%D0%BD%D0%B8%D0%BA%D0%B8-react)

# Основы React и классовые компоненты
1. Изучите разделы документации React: Установка, Основные понятия
2. Изучите классовый компонент React и его жизненный цикл
3. Изучите особенности использования атрибутов тегов в JSX
4. Изучите синтетические события React
5. Реализуйте приложение Todo List

## Задача: SPA Todo List на классовых компонентах
Реализовать single-page приложение, с таким же функционалом, как в этом примере:  
https://todomvc.com/examples/vanilla-es6/

- использовать React с create-react-app
- использовать классовые компоненты
- можно заимствовать CSS из примера
- не использовать роутинг

Функционал:

- добавление нового TODO через input и Enter
- редактирование TODO через double click по нему
- изменение статуса TODO на выполнено/не выполнено через клик на иконку слева от текста
- изменение статуса сразу всех TODO через клик на иконку слева от input для добавления новых
- удаление TODO через клик на иконку справа от текста
- счётчик оставшихся невыполненных TODO
- фильтр TODO из 3 кнопок - All, Active и Completed
- удаление сразу всех выполненных TODO через кнопку Clear completed

Папка для задачи: **18-react-todo-list**

Материалы:  
[React: Начало работы](https://ru.reactjs.org/docs/getting-started.html)  
[React.Component](https://ru.reactjs.org/docs/react-component.html)  
[React: Элементы DOM](https://ru.reactjs.org/docs/dom-elements.html)  
[React: SyntheticEvent](https://ru.reactjs.org/docs/events.html)

# React хуки
Изучите раздел Хуки документации React

## Задача: SPA Todo List на хуках
Переписать реализацию SPA Todo List с классовых компонентов на хуки.

Папка для задачи: **18-react-todo-list**

Материалы:  
[React: Хуки](https://ru.reactjs.org/docs/hooks-intro.html)

# React роутер
Изучите работу React роутера

## Задача: SPA Todo List с роутером
Переписать реализацию SPA Todo List с использованием React роутера:

- при переключении фильтрации Todo должен меняться адрес в браузере
- при прямом переходе по адресу должна применяться соответствующая фильтрация

Папка для задачи: **18-react-todo-list**

Материалы:  
[Простой туториал React Router v4](https://habr.com/ru/post/329996/)  
[React Router](https://v5.reactrouter.com/web/guides/quick-start)

# Управление состоянием приложения
1. Изучите работу Redux
2. Изучите способы использования Redux вместе с React

## Задача: SPA Todo List c Redux

Переписать реализацию SPA Todo List с использованием Redux.

Папка для задачи: **18-react-todo-list**

Материалы:  
[Небольшая статья про Redux](https://metanit.com/web/react/5.3.php)  
[Документация Redux](https://redux.js.org/introduction/getting-started)  
[Асинхронность в Redux](https://habr.com/ru/post/351168/)  
[React Redux](https://react-redux.js.org/)

# Отладка React приложения
Изучите отладку React приложения с помощью специального расширения браузера

Материалы:  
[React DevTools Tutorial](https://react-devtools-tutorial.vercel.app/)  
[Debug React Components with Developer Tools in Chrome](https://egghead.io/lessons/developer-tools)

# Тестирование React кода
1. Изучите тестирование React приложений с помощью Jest и Enzyme
2. Изучите тестирование с помощью react-testing-library
3. Изучите тестирование с помощью снимков

## Задача: Тестирование приложения Todo List
Протестировать приложение Todo List, используя Jest и react-testing-library.

Папка для задачи: **18-react-todo-list**

Материалы:  
[Основы тестирования](https://ru.reactjs.org/docs/testing.html)  
[Среды тестирования](https://ru.reactjs.org/docs/testing-environments.html)  
[Рецепты тестирования](https://ru.reactjs.org/docs/testing-recipes.html)  
[Что и как тестировать с помощью Jest и Enzyme. Полная инструкция по тестированию React-компонентов](https://medium.com/devschacht/what-and-how-to-test-with-jest-and-enzyme-full-instruction-on-react-components-testing-d3504f3fbc54)  
[Обзор библиотеки react-testing-library](https://habr.com/ru/company/ruvds/blog/353076/)  
[Jest: Getting started](https://jestjs.io/ru/docs/getting-started)  
[Snapshot Testing](https://jestjs.io/ru/docs/snapshot-testing)

# Server Side Rendering
Изучите использование рендеринга на стороне сервера для React приложений.

Материалы:  
[Server Rendering with Redux](https://redux.js.org/usage/server-rendering/)  
[ReactDOMServer](https://ru.reactjs.org/docs/react-dom-server.html)

# Продвинутые техники React
Изучите продвинутые техники использования React

Материалы:  
[React: Продвинутые темы](https://ru.reactjs.org/docs/accessibility.html)
