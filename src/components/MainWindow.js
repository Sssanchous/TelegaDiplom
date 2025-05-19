import React, { useState, useEffect } from 'react';
import { fetchDataFromAPI } from './api';
import question_icon from '../images/question.png';
import menu_icon from '../images/menu.png';
import logo_icon from '../images/logo.png';
import swap_arrows_icon from '../images/swap_arrow.png';
import button_icon from '../images/button2.png';
import QuestionScreen from './QuestionWindow';
import MenuSidebar from './MenuSidebar';

const MainWindow = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [mode, setMode] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [result, setResult] = useState('');
  const [isQuestionVisible, setisQuestionVisible] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const userData = window.userData;
        if (userData && userData.id) {
          const aboba = userData.id.toString();
          const response = await fetch('https://lemmaapp.ru/server1/login_by_tgid', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              login: aboba,
              password: "12345678"
            }),
          });

          if (response.ok) {
            const data = await response.json();
            const receivedToken = data.access_token;
            localStorage.setItem("token", receivedToken);
            setToken(receivedToken);
            window.token = receivedToken;
          } else {
            console.error('Ошибка при авторизации');
          }
        }
      } catch (error) {
        console.error('Ошибка при запросе токена:', error);
      }
    };

    fetchToken();
  }, []);

  const handleInputChange = (e) => setInputValue(e.target.value);
  const handleSwapClick = () => {
    setMode((prev) => (prev === 1 ? 2 : 1));
    setSelectedOption('');
  };
  const handleSelectChange = (e) => setSelectedOption(e.target.value);

  const partsOfSpeech = [
    '-', 'Существительное', 'Глагол', 'Вспомогательный глагол',
    'Прилагательное', 'Местоимение', 'Числительное', 'Порядковое числительное',
    'Имя собственное', 'Детерминатив', 'Частица', 'Наречие', 'Местоименное наречие',
    'Предлог', 'Символ', 'Сочинительный союз', 'Подчинительный союз',
    'Междометие', 'Предикатив', 'Вводное слово', 'COM', 'Знак препинания'
  ];

  const options = mode === 1
    ? partsOfSpeech
    : [...inputValue.split(' ').filter(Boolean), 'Всё предложение'];

  const handleButtonClick = async () => {
    const token = localStorage.getItem("token");
    try {
      setIsRotating(true);
      const data = await fetchDataFromAPI(mode, selectedOption, inputValue, token);
      setResult(data);
    } catch (error) {
      setResult('Ошибка при запросе');
    } finally {
      setIsRotating(false);
    }
  };

  return (
    <div className="bg-gray-100 h-screen w-full flex flex-col items-center overflow-hidden">
      <div className="w-full max-w-sm px-4 py-3 flex flex-col justify-between flex-grow overflow-y-auto">
        {/* Шапка */}
        <div className="flex justify-between mb-4">
          <img
            src={question_icon}
            alt="question"
            className="w-8 h-8 cursor-pointer"
            onClick={() => {
              setisQuestionVisible(true);
              setIsMenuOpen(false);
            }}
          />
          <img
            src={menu_icon}
            alt="menu"
            className="w-8 h-8 cursor-pointer"
            onClick={() => {
              setIsMenuOpen((prev) => !prev);
              setisQuestionVisible(false);
            }}
          />
        </div>

        {/* Логотип */}
        <div className="flex justify-center items-center mb-6">
          <img src={logo_icon} alt="logo" className="w-[50%] h-auto" />
        </div>

        {/* Контент */}
        <div className="flex flex-col">
          {/* Переключатель */}
          <div className="flex items-center justify-center gap-1 mb-2">
            <p className="font-montserrat font-bold italic text-lg">
              {mode === 1 ? 'Ваше слово' : 'Ваше предложение'}
            </p>
            <button
              onClick={handleSwapClick}
              className="focus:outline-none hover:scale-105 transition-transform mx-1"
            >
              <img src={swap_arrows_icon} alt="swap" className="w-6 h-6" />
            </button>
            <p className="font-montserrat font-bold italic text-lg">
              {mode === 1 ? 'предложение' : 'слово'}
            </p>
          </div>

          {/* Ввод */}
          <div className="w-full bg-white text-black py-2 sm:py-4 rounded-2xl text-lg mb-4 flex items-center justify-between px-3 shadow-md border border-gray-500">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Введите слово"
              className="w-full bg-transparent border-none outline-none text-base sm:text-lg"
            />
          </div>

          {/* Селект + Кнопка */}
          <div className="flex justify-between items-end gap-2">
            <div className="flex-grow">
              <p className="font-montserrat font-bold italic text-lg mb-2">
                {mode === 1 ? 'Часть речи' : 'Выбранное слово'}
              </p>
              <div className="w-full bg-white text-black py-2 sm:py-4 rounded-2xl text-lg flex items-center justify-between px-3 shadow-md border border-gray-500">
                <select
                  value={selectedOption}
                  onChange={handleSelectChange}
                  className="w-full bg-transparent border-none outline-none text-base sm:text-lg"
                >
                  <option value="" disabled>
                    {mode === 1 ? 'Не выбрана часть речи' : 'Не выбрано слово'}
                  </option>
                  {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Кнопка */}
            <div className="flex-shrink-0 ml-2">
              <button
                onClick={handleButtonClick}
                className={`focus:outline-none transition-transform ${isRotating ? 'animate-spin' : ''}`}
              >
                <img
                  src={button_icon}
                  alt="button"
                  className="w-20 h-20 sm:w-24 sm:h-24"
                />
              </button>
            </div>
          </div>

          {/* Результат */}
          <div className="mt-5">
            <p className="font-montserrat font-bold italic text-lg mb-2">Лемма вашего слова</p>
            <div className="w-full bg-white text-black py-2 sm:py-4 rounded-2xl text-lg flex items-center justify-between px-3 shadow-md border border-gray-500">
              <input
                type="text"
                value={result}
                readOnly
                placeholder="Результат"
                className="w-full bg-transparent border-none outline-none text-base sm:text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Модальные окна */}
      {isQuestionVisible && <QuestionScreen onClose={() => setisQuestionVisible(false)} />}
      <MenuSidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default MainWindow;
