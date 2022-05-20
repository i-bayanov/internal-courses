# Задачи на прототипы, классы и наследование
## Задача: Создание инстанса

Написать собственную реализацию оператора **new** в виде функции **newInstance(constructor, args)**, не используя сам оператор **new** и **Reflect.construct**.

Параметры:  
**constructor** - функция-конструктор для создания объектов  
**args** - массив аргументов, с которыми должна вызываться функция-конструктор

То есть, например, для функции-конструктора **Test**, следующие вызовы должны возвращать одно и то же при любом содержимом функции-конструктора и при любом указании прототипа:

new Test(10, true);  
newInstance(Test, [10, true]);

Папка для задачи: **12-js-new-instance**

Материалы:  
[Конструкторы, создание объектов через "new"](https://learn.javascript.ru/constructor-new)  
[Прототипное наследование](https://learn.javascript.ru/prototype-inheritance)  
[F.prototype](https://learn.javascript.ru/function-prototype)  
[Встроенные прототипы](https://learn.javascript.ru/native-prototypes)  
[Методы прототипов, объекты без свойства _proto_](https://learn.javascript.ru/prototype-methods)  
[Класс: базовый синтаксис](https://learn.javascript.ru/class)  
[Наследование классов](https://learn.javascript.ru/class-inheritance)  
[Статические свойства и методы](https://learn.javascript.ru/static-properties-methods)  
[Приватные и защищённые методы и свойства](https://learn.javascript.ru/private-protected-properties-methods)  
[Расширение встроенных классов](https://learn.javascript.ru/extend-natives)  
[Проверка класса: "instanceof"](https://learn.javascript.ru/instanceof)
