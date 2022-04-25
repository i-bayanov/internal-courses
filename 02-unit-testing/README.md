# Написание юнит-тестов

1. Создайте npm-проект в папке 02-unit-testing для работы с js-файлами и их юнит-тестирования
2. Установите jest для этого проекта
3. Создайте js-файл в папке проекта со следующим содержимым:
```
export class Calculator {
  constructor(shouldRoundFloor) {
    this.shouldRoundFloor = shouldRoundFloor;
  }

  sum() {
    return this.shouldRoundFloor ? Math.floor(a + b) : Math.ceil(a + b);
  }

  showResult(result) {
    console.log(result);
  }

  sumAndShowResult() {
    const result = this.sum(a, b);
    this.showResult(result);
  }
}
```
4. В этой же папке создайте ещё один файл, в котором покройте класс Calculator юнит-тестами с помощью jest
5. Подготовьте ветку, сделайте коммит, запуште изменения в репозиотрий и создайте Merge Request

Материалы:  
[Автоматическое тестирование c использованием фреймворка Mocha](https://learn.javascript.ru/testing-mocha)  
[Jest](https://jestjs.io/)  
[Jest - Getting Started](https://jestjs.io/docs/en/getting-started.html)  
[Тестирование JavaScript кода с Jest](https://habr.com/ru/post/502302/)
