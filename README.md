# PRETTY API DATA FETCHER

SPA-сервис для получения данных с сервера.<br>
## nav:
- [Изменение адреса API](#apichanging)
- [Изменение запроса: тело запроса, метод, эндпоинт](#queryChanging)
- [Изменение вывода под возможный ответ сервера](#templatechanging)
- [Деплой](#deploy)

## Описание сервиса:</br>
Сервис разработан с целью предоставлять профиль пользователей по их уникальному идентификатору.
Первоначальное окно предоставляет окно запроса:</br></br>
![image](https://github.com/user-attachments/assets/09c80af3-733d-46dc-9b8b-e68a8eec1e2c)</br></br>
Для того, чтобы запрос был отправлен, нужно ввести уникальный идентификатор профиля и нажать клавишу ввода (Enter). Сразу после этого произойдет загрузка профиля:</br></br>
![image](https://github.com/user-attachments/assets/e93eec31-1537-4011-b679-e2a3efcce634)</br></br>
Ссылку на профиль пользователя и каждое из установленных полей можно скопировать нажатием мыши на соответствующую кнопку</br></br>
![image](https://github.com/user-attachments/assets/2219a524-6890-4854-9d41-73d0668f318f)</br></br>
При вводе идентификатора, не связанного с профилем пользователя, будет выведена соответствующая ошибка:</br></br>
![image](https://github.com/user-attachments/assets/26da27cb-b6b9-4e66-bd34-9ea4267d6b55)</br></br>
Приложение будет оповещать об ошибках сервера или обмена данными:</br></br>
![image](https://github.com/user-attachments/assets/ccb12fd5-79f6-4b94-be36-b0fa5410025b)</br></br>
![image](https://github.com/user-attachments/assets/bf6400d0-4ebf-4039-b374-363d9eae74df)</br></br>
![image](https://github.com/user-attachments/assets/11d1b944-e10c-453f-bb5c-9d50dca49977)</br></br>



## <a name="queryChanging">Изменение запроса</a>
Компонент src/Components/main содержит функцию fetchData, определяющую формат запроса. </br>
Для изменения заголовков или введения интерцепторов для axios, обратите внимание на файл src/hooks/APIFetch </br>
</br></br>
## <a name="templatechanging">Изменение шаблона вывода</a>
Используя файл src/hooks/fillInformationalWindow.ts, отредактируйте объект templates. </br>
При необходимости, добавьте адаптеры для поступающих с сервера данных. </br>
</br></br>
## <a name="apichanging">Изменение API</a>
Для изменения ссылка на сервер API отредактируйте переменную в файле .env в корневом каталоге проекта.</br></br>
## <a name="deploy">ДЕПЛОЙ:</a>
В корневом каталоге проекта выполнить следующие команды:
```sh
npm install
```

### Компиляция и hot-reload для разработки:

```sh
npm run dev
```

### Компиляция под Prod:

```sh
npm run build
```
