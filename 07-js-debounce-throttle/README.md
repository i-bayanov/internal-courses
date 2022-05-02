# Задачи на функции
## Задача: Дебонсинг и Тротлинг

Написать 2 функции **debounce(func, delay)** и **throttle(func, delay)**:

Функция **debounce** должна возвращать функцию-обёртку debouncedFunc над **func**, которая должна делать то же, что и **func**, принимая такие же аргументы. При этом если вызывать функцию debouncedFunc несколько раз подряд, то все вызовы, после которых был сделан ещё один вызов менее, чем через **delay** миллисекунд должны быть проигнорированы. Сработать должен вызов debouncedFunc, после которого прошло **delay** или более миллисекунд без нового вызова.

Функция **throttle** должна возвращать функцию-обёртку throttledFunc над **func**, которая должна делать то же, что и **func**, принимая такие же аргументы. При этом если вызывать функцию throttledFunc несколько раз подряд, то самый первый вызов должен сразу сработать, а все следующие, сделанные в течение **delay** миллисекунд должны быть проигнорированы. По истечении после сработавшего вызова **delay** миллисекунд следующий вызов должен сразу сработать.

Папка для задачи: **07-js-debounce-throttle**

Материалы:  
[Функции: основы](https://learn.javascript.ru/function-basics)  
[Function Expression](https://learn.javascript.ru/function-expressions)  
[Функции-стрелки, основы](https://learn.javascript.ru/arrow-functions-basics)  
[Повторяем стрелочные функции](https://learn.javascript.ru/arrow-functions)  
[Продвинутая работа с функциями](https://learn.javascript.ru/advanced-functions)  
[Каррирование](https://learn.javascript.ru/currying-partials)  
[Eval: выполнение строки кода](https://learn.javascript.ru/eval)  
[Основы Javascript](https://learn.javascript.ru/first-steps)
