1. [Programming paradigms](https://github.com/i-bayanov/internal-courses/tree/master/15-oop-network#programming-paradigms)
    - [Объектно-ориентированное программирование и типизация](https://github.com/i-bayanov/internal-courses/tree/master/15-oop-network#%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BD%D0%BE-%D0%BE%D1%80%D0%B8%D0%B5%D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5-%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B8-%D1%82%D0%B8%D0%BF%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F)
      - [Задача: Локальная сеть](https://github.com/i-bayanov/internal-courses/tree/master/15-oop-network#%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B0-%D0%BB%D0%BE%D0%BA%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F-%D1%81%D0%B5%D1%82%D1%8C)
    - [Функциональное программирование](https://github.com/i-bayanov/internal-courses/tree/master/15-oop-network#%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5-%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)
2. [Network communications](https://github.com/i-bayanov/internal-courses/tree/master/15-oop-network#network-communications)
    - [HTTP](https://github.com/i-bayanov/internal-courses/tree/master/15-oop-network#%D0%BF%D1%80%D0%BE%D1%82%D0%BE%D0%BA%D0%BE%D0%BB-%D0%BF%D0%B5%D1%80%D0%B5%D0%B4%D0%B0%D1%87%D0%B8-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85-http)
    - [AJAX](https://github.com/i-bayanov/internal-courses/tree/master/15-oop-network#%D1%81%D0%B5%D1%82%D0%B5%D0%B2%D1%8B%D0%B5-%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81%D1%8B-%D0%B2-javascript)
    - [WebSocket](https://github.com/i-bayanov/internal-courses/tree/master/15-oop-network#%D0%BF%D1%80%D0%BE%D1%82%D0%BE%D0%BA%D0%BE%D0%BB-%D0%BF%D0%B5%D1%80%D0%B5%D0%B4%D0%B0%D1%87%D0%B8-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85-websocket)
    - [Server initiated requests](https://github.com/i-bayanov/internal-courses/tree/master/15-oop-network#%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81%D1%8B-%D0%B8%D0%BD%D0%B8%D1%86%D0%B8%D0%B8%D1%80%D1%83%D0%B5%D0%BC%D1%8B%D0%B5-%D1%81%D0%B5%D1%80%D0%B2%D0%B5%D1%80%D0%BE%D0%BC)
    - [Express.js](https://github.com/i-bayanov/internal-courses/tree/master/15-oop-network#%D1%81%D0%B5%D1%80%D0%B2%D0%B5%D1%80-%D0%BD%D0%B0-nodejs)
      - [Задача: Сеть из раздела OOP на Node.js](https://github.com/i-bayanov/internal-courses/tree/master/15-oop-network#%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B0-%D1%81%D0%B5%D1%82%D1%8C-%D0%B8%D0%B7-%D1%80%D0%B0%D0%B7%D0%B4%D0%B5%D0%BB%D0%B0-oop-%D0%BD%D0%B0-nodejs)

# Programming paradigms
## Объектно-ориентированное программирование и типизация

1. Изучите основы ООП
2. Изучите основы типизации на Typescript
3. Реализуйте локальную сеть, используя принципы ООП и Typescript
4. Напишите документацию для каждого класса

### Задача: Локальная сеть

Реализовать локальную сеть с пользователями и серверами. Для этого написать следующие классы с наследованием:
- Network
- Node
- Server --> PublicServer, PrivateServer
- User

Такую локальную сеть смогут использовать:
- Оператор, которому доступны:

  * класс Network
  * API сети для изначального предоставления всем Абонентам, желающим работать с сетью

- Абонент, которому доступны:

  * классы PublicServer и PrivateServer для создания сервера
  * API созданного сервера для отправки при подключении к сети
  * API сети, которое изначально предоставляется Оператором
  * API узла, которое предоставляется после подключения к сети
  * API пользователя сервера, которое предоставляется после подключения к серверу

Класс Node используется для работы Network.  
Класс Server - для работы PublicServer и PrivateServer.  
Класс User - для работы серверов, создания пользователей с возможными ролями Гость (guest), Участник (member) и Администратор (admin).

**Возможности сети (Network):**
- Иметь адрес формата **xxx.xxx.xxx**, который задаётся при создании, где xxx от 0 до 255
- Подключать узел, автоматически назначая адрес формата **адрес_сети.xxx**, где xxx от 0 до 255
- Регистрировать API полученное от Абонента при подключении. Такое API должно предоставлять метод **getName** для регистрации имени и метод **connect** для подключения к нему других узлов
- Отклонять подключение узла к сети, если Абонент передаёт API с именем, которое уже занято
- Отключать узел, освобождая адрес для других новых подключений
- Сохранять адрес узла при переподключении, если он не был занят другим узлом
- Подключать узел к другому узлу по адресу или имени, предоставляя подключаемому узлу API целевого узла
- Автоматически отключать узел от сети, если он не подключился к другому узлу в течение 5 минут после подключения к сети
- Предоставлять Абоненту список имён подключенных узлов, у которых есть имя
- Предоставлять Абоненту его адрес

**Возможности публичного сервера (PublicServer):**
- Предоставлять API для подключения к сети и для использования пользователями сервера
- Предоставлять имя для регистрации в сети при подключении к сети
- Владельцу сервера подключаться к серверу с ролью Администратор
- Подключать пользователя как Гостя, если пользователь не предоставил имя
- Подключать пользователя как Участника или Администратора, если пользователь предоставил имя. При этом создавать нового пользователя с ролью Участник, если указанное имя не занято. Если пользователь предоставил имя и оно занято, убедиться, что это именно тот пользователь, который регистрировался, а не какой-то другой, пытающийся подключиться под чужим именем
- Пользователю отключаться от сервера
- Автоматически отключать пользователя, если он не использовал API сервера в течение 1 минуты
- Администратору менять роль пользователя с Участника на Администратор и наоборот
- Участнику и Администратору добавлять сообщение в чат
- Добавлять логи в чат - о входе и выходе Участника или Администратора, о смене роли пользователя
- Любому пользователю предоставлять последние 50 сообщений чата

**Возможности частного сервера (PrivateServer):**
- Включают возможности публичного сервера
- Гостю запрещать получать 50 последних сообщений чата
- Администратору блокировать пользователей по их адресу
- Добавлять логи в чат - о блокировке пользователя

Папка для задачи: **15-oop-network**

Примечание:
Пример реализации внешнего API:
```
class Test {
    publicMethod1() {}
    publicMethod2() {}
    publicMethod3() {}
    privateMethod1() {}

    getAPI() {
        return {
            publicMethod1: this.publicMethod1.bind(this),
            publicMethod2: this.publicMethod2.bind(this),
        };
    }
}
```
В этом примере **const test = new Test()** вернёт инстанс, который предоставляет полный доступ к публичным свойствам и методам владельцу интерфейса. А **test.getAPI()** вернёт ограниченный набор методов, предназначенный для использования внешним пользователем интерфейса.

Материалы:  
[Основы ООП](https://habr.com/ru/post/147927/)  
[10 принципов ООП](https://habr.com/ru/company/skillbox/blog/454314/)  
[S.O.L.I.D-ый JavaScript (видео)](https://www.youtube.com/watch?v=wi3wPzReKZQ)  
[Объектно-ориентированный JavaScript для начинающих](https://developer.mozilla.org/ru/docs/conflicting/Learn/JavaScript/Objects/Classes_in_JavaScript)  
[Typescript: Basic Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)  
[Typescript: Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html)  
[Typescript: Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)  
[Typescript: Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)  
[Typescript: Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)

## Функциональное программирование

Материалы:  
[Функциональное программирование в JavaScript с практическими примерами](https://habr.com/ru/company/vk/blog/327522/)  
[Функторы, аппликативные функторы и монады в картинках](https://habr.com/ru/post/183150/)

# Network communications
## Протокол передачи данных HTTP

1. Изучить теорию по компьютерным сетям
2. Изучить архитектурный подход REST
3. Изучить теорию по HTTP

Материалы:  
[Основы компьютерных сетей. Основные сетевые термины и сетевые модели](https://habr.com/ru/post/307252/)  
[Как работают сети (видео)](https://www.youtube.com/watch?v=k_0BAtyaDio)  
[REST (wikipedia)](https://ru.wikipedia.org/wiki/REST)  
[Обзор протокола HTTP](https://developer.mozilla.org/ru/docs/Web/HTTP/Overview)  
[Методы HTTP запроса](https://developer.mozilla.org/ru/docs/Web/HTTP/Methods)  
[Простым языком об HTTP](https://habr.com/ru/post/215117/)  
[Зачем нужен HTTP/2 для сайтов](https://habr.com/ru/company/webo/blog/300794/)

## Сетевые запросы в Javascript

1. Изучите теорию по fetch
2. Изучите теорию по XMLHttpRequest

Материалы:  
[Fetch](https://learn.javascript.ru/fetch)  
[Введение в fetch](https://habr.com/ru/post/252941/)  
[Fetch: ход загрузки](https://learn.javascript.ru/fetch-progress)  
[Fetch API](https://learn.javascript.ru/fetch-api)  
[Кроссдоменные запросы](https://learn.javascript.ru/fetch-crossorigin)  
[Fetch: прерывание запроса](https://learn.javascript.ru/fetch-abort)  
[XMLHttpRequest](https://learn.javascript.ru/xmlhttprequest)  
[XMLHttpRequest - Поля объекта](https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest)  
[Объект XMLHttpRequest](https://metanit.com/web/javascript/13.1.php)  
[Возобновляемая загрузка файлов](https://learn.javascript.ru/resume-upload)

## Протокол передачи данных WebSocket

Изучите теорию по протоколу WebSocket

Материалы:  
[WebSocket](https://learn.javascript.ru/websocket)  
[Разница между WebSocket, Socket, Http](https://russianblogs.com/article/3438220188/#WebSocketSocket_33)

## Запросы, инициируемые сервером

1. Изучите теорию по Длинным опросам (Long Pooling)
2. Изучите теорию по SSE (Server Sent Events)

Материалы:  
[Длинные опросы](https://learn.javascript.ru/long-polling)  
[Server Sent Events](https://learn.javascript.ru/server-sent-events)

## Сервер на Node.js

1. Изучите возможности пакета Express.js
2. Реализуйте сеть для серверов и пользователей, используя Node.js, Express.js и WebSocket

### Задача: Сеть из раздела OOP на Node.js

Переработать сеть из раздела OOP, чтобы Оператор и Абоненты обменивались данными по HTTP и WebSocket:

- Оператор должен работать в собственной Node.js среде
- Абонент в качестве пользователя сервера сети должен использовать браузер
- Абонент в качестве сервера должен работать в собственной Node.js среде
- Реализовать простой UI-интерфейс для работы пользователя с сервером через браузер, в том числе чат
- Обмен сообщений в чате должен быть реализован на WebSocket, остальные операции на HTTP
- В реализации использовать: HTML, CSS, Typescript, Node.js, Express.js, WebSocket

Папка для задачи: **15-oop-network**

Материалы:  
[Express, минималистичный веб-фреймворк для приложений Node.js](https://expressjs.com/ru/)  
[Простой WebSocket-сервер на Node.JS](https://habr.com/ru/post/546758/)  
[Как использовать Websocket на примере простого Express API](https://habr.com/ru/post/516334/)
