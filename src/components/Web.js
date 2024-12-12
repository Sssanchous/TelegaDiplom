import React, { useState, useEffect } from "react";
import { fetchDataFromAPI } from "./api"; // Импортируем функцию из api.js
import question_icon from "../images/question.png";
import menu_icon from "../images/menu.png";
import logo_icon from "../images/logo.png";
import swap_arrows_icon from "../images/swap_arrow.png";
import button_icon from "../images/button2.png";
import Modal from "../components/modal"; // Импортируем компонент модального окна

function Web() {
  const [inputValue, setInputValue] = useState("");
  const [mode, setMode] = useState(1); // 1 - слово, 2 - предложение
  const [selectedOption, setSelectedOption] = useState("");
  const [result, setResult] = useState("");
  const [isRotating, setIsRotating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна
  const [modalMode, setModalMode] = useState('login'); // Режим модального окна: 'login' или 'register'
  const [isProcessing, setIsProcessing] = useState(false); // Состояние для отслеживания процесса лемматизации
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Состояние авторизации
  const [history, setHistory] = useState([]); // История действий пользователя

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSwapClick = () => {
    if (!isProcessing) { // Запрещаем переключение, если идет лемматизация
      setMode((prev) => (prev === 1 ? 2 : 1));
      setSelectedOption("");
    }
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const partsOfSpeech = [
    '-',
    'Существительное',
    'Глагол',
    'Вспомогательный глагол',
    'Прилагательное',
    'Местоимение',
    'Числительное',
    'Порядковое числительное',
    'Имя собственное',
    'Детерминатив',
    'Частица',
    'Наречие',
    'Местоименное наречие',
    'Предлог',
    'Символ',
    'Сочинительный союз',
    'Подчинительный союз',
    'Междометие',
    'Предикатив',
    'Вводное слово',
    'COM',
    'Знак препинания'
  ];

  const options =
    mode === 1
      ? partsOfSpeech
      : [...inputValue.split(" ").filter(Boolean), "Всё предложение"];

  const handleButtonClick = async () => {
    try {
      setIsProcessing(true); // Начинаем процесс лемматизации
      setIsRotating(true);
      const data = await fetchDataFromAPI(mode, selectedOption, inputValue);
      setResult(data);
    } catch (error) {
      setResult("Ошибка при запросе");
    } finally {
      setIsProcessing(false); // Завершаем процесс лемматизации
      setIsRotating(false);
    }
  };

  // Функция для открытия модального окна
  const openModal = (mode) => {
    setModalMode(mode); // Устанавливаем режим модального окна (вход или регистрация)
    setIsModalOpen(true);
  };

  // Функция для закрытия модального окна
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Функция для переключения между формами
  const handleSwitchForm = () => {
    setModalMode((prevMode) => (prevMode === 'login' ? 'register' : 'login'));
  };

  // Функция авторизации пользователя
  const handleLogin = async (login, password) => {
    try {
      const response = await fetch("https://lemmaapp.ru/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.access_token); // Сохраняем токен в localStorage
        setIsLoggedIn(true);
        closeModal();
      } else {
        alert(data.detail || "Ошибка авторизации");
      }
    } catch (error) {
      console.error("Ошибка авторизации:", error);
    }
  };

  // Функция регистрации пользователя
  const handleRegister = async (name, surname, login, password) => {
    try {
      const response = await fetch("http://lemmaapp.ru/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, surname, login, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Регистрация успешна! Теперь вы можете войти.");
        setModalMode("login"); // Переключаемся на форму входа
      } else {
        alert(data.detail || "Ошибка регистрации");
      }
    } catch (error) {
      console.error("Ошибка регистрации:", error);
    }
  };

  // Получение истории пользователя
  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://lemmaapp.ru/history/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setHistory(data);
      } else {
        alert("Ошибка загрузки истории");
      }
    } catch (error) {
      console.error("Ошибка загрузки истории:", error);
    }
  };

  // Выход из аккаунта
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setHistory([]);
  };

  // Проверяем наличие токена при загрузке страницы
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchHistory();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      {/* Header */}
      <header className="bg-white border-b shadow-sm w-full">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center lg:w-[80%] w-full">
          <div className="flex items-center gap-2">
            <img src={logo_icon} alt="logo" className="w-20 md:w-28 h-auto" />
            <p className="font-montserrat font-bold text-xl md:text-2xl ml-2 hidden sm:block">НейроЛемма</p>
          </div>
          <nav className="space-x-4 text-gray-1000 text-xl md:text-2xl flex items-center gap-2 md:gap-5">
            {isLoggedIn ? (
              <>
                <button onClick={fetchHistory} className="hover:text-gray-700">
                  История
                </button>
                <button onClick={handleLogout} className="hover:text-gray-700">
                  Выйти
                </button>
              </>
            ) : (
              <>
                <button onClick={() => openModal('login')} className="hover:text-gray-700">
                  Вход
                </button>
                <button onClick={() => openModal('register')} className="hover:text-gray-700">
                  Регистрация
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Модальное окно */}
      <Modal 
        isOpen={isModalOpen} 
        closeModal={closeModal} 
        modalMode={modalMode} 
        handleSwitchForm={handleSwitchForm} // Передаем функцию переключения
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 lg:py-12 text-center lg:w-[80%] w-full">
        <div className="flex flex-col pb-4 border-b border-gray-300">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-4">Лемматизация слов</h2>
          <p className="text-gray-600 text-xl lg:text-2xl mb-8">Сгенирируйте лемму для вашего текста</p>
        </div>

        <div className="py-5 px-6 mb-16 shadow-sm flex flex-col lg:flex-row items-center gap-8 border-b border-gray-300">
          {/* Левая панель */}
          <div className="flex flex-col mb-8 w-full lg:w-1/2 gap-12">
            <div className="flex flex-col items-center gap-4 mt-8">
              <p className="font-montserrat text-2xl lg:text-3xl font-semibold text-black">
                Выберите режим
              </p>
              <div className="flex items-center gap-8 lg:gap-12">
                <button
                  onClick={() => setMode(1)}
                  disabled={isProcessing} // Блокируем кнопку, если идет лемматизация
                  className={`${
                    mode === 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } px-4 py-2 lg:px-6 lg:py-2 rounded-3xl font-semibold text-lg lg:text-2xl shadow-md hover:bg-blue-600 transition-colors`}
                >
                  Слово
                </button>
                <button
                  onClick={handleSwapClick}
                  disabled={isProcessing} // Блокируем кнопку, если идет лемматизация
                  className="flex items-center justify-center bg-gray-200 p-2 rounded-full shadow-md hover:scale-110 transition-transform"
                >
                  <img src={swap_arrows_icon} alt="swap" className="w-4 h-4 lg:w-6 lg:h-6" />
                </button>
                <button
                  onClick={() => setMode(2)}
                  disabled={isProcessing} // Блокируем кнопку, если идет лемматизация
                  className={`${
                    mode === 2
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } px-4 py-2 lg:px-6 lg:py-2 rounded-3xl font-semibold text-lg lg:text-2xl shadow-md hover:bg-blue-600 transition-colors`}
                >
                  Предложение
                </button>
              </div>
            </div>

            <div className="mt-6 max-w-xl w-full mx-auto flex flex-col gap-16">
              <div className="w-full flex-col gap-12">
                <p className="font-montserrat font-bold text-2xl lg:text-3xl mb-2 text-black">
                  {mode === 1 ? "Ваше слово" : "Ваше предложение"}
                </p>
                <div className="w-full bg-white text-black py-4 rounded-xl flex items-center px-4 lg:px-6 shadow-md border border-gray-300">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Введите слово или предложение"
                    className="w-full bg-transparent outline-none text-lg lg:text-2xl"
                  />
                </div>
              </div>

              <div className="">
                <p className="font-montserrat font-bold text-2xl lg:text-3xl mb-2 text-black">
                  {mode === 1 ? "Часть речи" : "Выбранное слово"}
                </p>
                <div className="w-full bg-white text-black py-4 rounded-xl shadow-md flex items-center px-4 lg:px-6 border border-gray-300">
                  <select
                    value={selectedOption}
                    onChange={handleSelectChange}
                    className="w-full bg-transparent border-none outline-none text-lg lg:text-2xl"
                  >
                    <option value="" disabled>
                      {mode === 1
                        ? "Не выбрана часть речи"
                        : "Не выбрано слово"}
                    </option>
                    {options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 max-w-xl w-full mx-auto flex justify-center">
              <button
                onClick={handleButtonClick}
                className={`bg-green-500 text-white px-6 lg:px-8 py-3 rounded-3xl font-semibold text-lg lg:text-2xl shadow-md hover:bg-green-600 transition-colors ${
                  isRotating ? "animate-spin" : ""
                }`}
              >
                Обработать
              </button>
            </div>

            <div className="mt-6 mb-4 max-w-xl w-full mx-auto">
              <p className="font-montserrat font-bold text-2xl lg:text-3xl mb-2 text-black">
                Результат
              </p>
              <div className="w-full bg-white text-black py-4 rounded-xl flex items-center px-4 lg:px-6 shadow-md border border-gray-300">
                <input
                  type="text"
                  value={result}
                  readOnly
                  placeholder="Лемматизированный результат"
                  className="w-full bg-transparent outline-none text-xl lg:text-2xl"
                />
              </div>
            </div>
          </div>

          {/* Правая панель с загрузкой файла */}
          <div className="w-full mb-6 lg:w-1/2">
            <div className="w-full">
              <p className="font-montserrat font-bold text-2xl lg:text-3xl mb-2 text-black">
                Или загрузите файл
              </p>
              <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl py-6 lg:py-8 cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors">
                <input type="file" className="hidden" />
                <span className="text-blue-500 font-semibold text-lg lg:text-3xl">
                  Нажмите, чтобы выбрать файл
                </span>
                <span className="text-gray-500 text-sm lg:text-xl mt-2">Поддерживаемые форматы: .conllu</span>
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between mt-10 items-center">
        {/* Левый блок с инструкциями */}
        <div className="lg:w-1/2 w-full lg:pr-4 mb-8 lg:mb-0">
          <h3 className="text-3xl md:text-3xl lg:text-3xl font-bold text-black mb-6">Инструкция по лемматизации</h3>
          <p className="text-lg md:text-xl lg:text-2xl text-black mb-8 leading-6 md:leading-8 lg:leading-10">
            Лемматизация — это процесс преобразования слова в его начальную (нормальную) форму, называемую леммой. Например, для глагола "бегал" леммой будет "бегать". Используйте этот инструмент для обработки как отдельных слов, так и целых предложений.
          </p>
        </div>

        {/* Правый блок с дополнительной информацией */}
        <div className="lg:w-1/2 w-full lg:pl-4">
          <h3 className="text-3xl md:text-3xl lg:text-3xl font-bold text-black mb-6">Как использовать</h3>
          <p className="text-lg md:text-xl lg:text-2xl text-black mb-8 leading-6 md:leading-8 lg:leading-10">
            Выберите режим (слово или предложение), введите текст и выберите часть речи или слово для лемматизации. Если вы хотите обработать весь текст, просто выберите "Всё предложение". Также можно загрузить файл с текстом в формате .conllu для обработки.
          </p>
        </div>
      </div>

      </main>

      {/* Footer */}
      <footer className="py-4 bg-gray-700 mt-12 w-full">
        <div className="flex flex-col justify-center text-white text-center text-base md:text-m lg:text-xl">
          <p>Разработано при поддержке НКРЯ</p>
          <p>
            Аналитик: <a href="https://vk.com/evgen_k45" target="_blank" className="underline">Evgeshkins</a> |
            Разработчик: <a href="https://vk.com/sagadeev0" target="_blank" className="underline">Ostamer</a>
          </p>
          <p>Email: lemmatize@gmail.com</p>
          <p>ТюмГУ 2024 год</p>
        </div>
      </footer>

    </div>
  );
}

export default Web;
