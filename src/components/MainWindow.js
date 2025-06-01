import React, { useState, useEffect } from 'react';
import { fetchDataFromAPI } from './api';  // Импорт функции API

import question_icon from '../images/question.png';
import menu_icon from '../images/menu.png';
import logo_icon from '../images/logo.png';
import swap_arrows_icon from '../images/swap_arrow.png';
import button_icon from '../images/button2.png';

import QuestionScreen from './QuestionWindow';  // Всплывающее окно
import MenuSidebar from './MenuSidebar';       // Боковое меню

const MainWindow = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [mode, setMode] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [result, setResult] = useState('');
  const [isQuestionVisible, setIsQuestionVisible] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Получаем токен при монтировании
    const fetchToken = async () => {
      try {
        const userData = window.userData;
        if (userData && userData.id) {
          const aboba = userData.id.toString();
          const response = await fetch(
            'https://lemmaapp.ru/server1/login_by_tgid',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                login: aboba,
                password: '12345678',
              }),
            }
          );
          if (response.ok) {
            const data = await response.json();
            const receivedToken = data.access_token;
            localStorage.setItem('token', receivedToken);
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
    'Знак препинания',
  ];

  const options =
    mode === 1
      ? partsOfSpeech
      : [...inputValue.split(' ').filter(Boolean), 'Всё предложение'];

  const handleButtonClick = async () => {
    const token = localStorage.getItem('token');
    try {
      setIsRotating(true);
      const data = await fetchDataFromAPI(
        mode,
        selectedOption,
        inputValue,
        token
      );
      setResult(data);
    } catch (error) {
      setResult('Ошибка при запросе');
    } finally {
      setIsRotating(false);
    }
  };

  const handleQuestionClick = () => {
    setIsQuestionVisible(true);
    setIsMenuOpen(false);
  };
  const handleCloseQuestionWindow = () => setIsQuestionVisible(false);
  const handleMenuClick = () => {
    if (isMenuOpen) setIsMenuOpen(false);
    else {
      setIsQuestionVisible(false);
      setIsMenuOpen(true);
    }
  };
  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* === Шапка с кнопками «?» и «меню» === */}
      <div className="flex justify-between px-4 mt-4">
        <img
          src={question_icon}
          alt="question"
          className="w-6 h-6 cursor-pointer"
          onClick={handleQuestionClick}
        />
        <img
          src={menu_icon}
          alt="menu"
          className="w-6 h-6 cursor-pointer"
          onClick={handleMenuClick}
        />
      </div>

      {/* === Логотип (справа и слева нет padding’ов, т. к. лучше центрировать) === */}
      <div className="flex-grow flex justify-center items-center">
        <img
          src={logo_icon}
          alt="logo"
          className="w-full max-w-[300px] h-auto"
        />
      </div>

      {/* === Основной блок (контент) === */}
      <div className="flex flex-col flex-grow px-4 py-4">
        {/* — Секция 1: «Ваше слово ↔ предложение» + инпут */}
        <div className="mb-6">
          <div className="flex items-center">
            <p className="font-montserrat font-bold italic text-base">
              {mode === 1 ? 'Ваше слово' : 'Ваше предложение'}
            </p>
            <button
              onClick={handleSwapClick}
              className="ml-2 focus:outline-none hover:scale-105 transition-transform"
            >
              <img
                src={swap_arrows_icon}
                alt="swap"
                className="w-6 h-6"
              />
            </button>
            <p className="ml-2 font-montserrat font-bold italic text-base">
              {mode === 1 ? 'предложение' : 'слово'}
            </p>
          </div>
          <div className="mt-3 w-full bg-white text-black py-2 px-3 rounded-xl shadow-md border border-gray-300 flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={mode === 1 ? 'Введите слово' : 'Введите предложение'}
              className="w-full bg-transparent border-none outline-none text-sm"
            />
          </div>
        </div>

        {/* — Секция 2: «Часть речи / выбранное слово» + select + кнопка */}
        <div className="flex items-center mb-6">
          <div className="flex-grow">
            <p className="font-montserrat font-bold italic text-base">
              {mode === 1 ? 'Часть речи' : 'Выбранное слово'}
            </p>
            <div className="mt-2 flex flex-shrink flex-grow bg-white text-black py-2 px-3 rounded-xl shadow-md border border-gray-300 items-center">
              <select
                value={selectedOption}
                onChange={handleSelectChange}
                className="w-full bg-transparent border-none outline-none text-sm"
              >
                <option value="" disabled>
                  {mode === 1 ? 'Не выбрана часть речи' : 'Не выбрано слово'}
                </option>
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="ml-2 flex-shrink-0">
            <button
              onClick={handleButtonClick}
              className={`focus:outline-none transition-transform ${
                isRotating ? 'animate-spin' : ''
              }`}
            >
              <img
                src={button_icon}
                alt="button"
                className="w-full max-w-[80px] h-auto"
              />
            </button>
          </div>
        </div>

        {/* — Секция 3: Результат */}
        <div>
          <p className="font-montserrat font-bold italic text-base mb-2">
            Лемма вашего слова
          </p>
          <div className="w-full bg-white text-black py-2 px-3 rounded-xl shadow-md border border-gray-300 flex items-center">
            <input
              type="text"
              value={result}
              readOnly
              placeholder="Результат"
              className="w-full bg-transparent border-none outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* === Всплывающее окно и боковое меню === */}
      {isQuestionVisible && (
        <QuestionScreen onClose={handleCloseQuestionWindow} />
      )}
      <MenuSidebar isOpen={isMenuOpen} onClose={handleCloseMenu} />
    </div>
  );
};

export default MainWindow;
