import React, { useState, useEffect } from 'react';
import { fetchDataFromAPI } from './api';  // Импортируем функцию из api.js
import question_icon from '../images/question.png';
import menu_icon from '../images/menu.png';
import logo_icon from '../images/logo.png';
import swap_arrows_icon from '../images/swap_arrow.png';
import button_icon from '../images/button2.png';
import QuestionScreen from './QuestionWindow';  // Импортируем компонент всплывающего окна
import MenuSidebar from './MenuSidebar'; // Импортируем боковое меню


const MainWindow = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Состояние для меню
    const [inputValue, setInputValue] = useState('');
    const [mode, setMode] = useState(1);
    const [isRotating, setIsRotating] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [result, setResult] = useState('');
    const [isQuestionVisible, setisQuestionVisible] = useState(false);  // Состояние для видимости всплывающего окна
    const [token, setToken] = useState(null); // Состояние для хранения токена

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const userData = window.userData; // Данные пользователя из глобальной переменной
                console.log(userData.id)
                if (userData && userData.id) {
                    console.log("Я зашел")
                    var aboba = userData.id.toString();
                    const response = await fetch('https://lemmaapp.ru/server1/login_by_tgid', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            login: aboba,  // Используем tg_id как login
                            password: "12345678"  // Можешь передать пароля заглушку или реальный пароль, если нужно
                        }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        const receivedToken = data.access_token;
                        
                        // Сохраняем токен в локальное хранилище (localStorage)
                        localStorage.setItem("token", receivedToken);
                        
                        // Сохраняем токен в состояние компонента
                        setToken(receivedToken);

                        // Сохраняем токен в глобальную переменную для дальнейшего использования
                        window.token = receivedToken;
                    } else {
                        console.error('Ошибка при авторизации');
                    }
                }
            } catch (error) {
                console.error('Ошибка при запросе токена:', error);
            }
        };

        fetchToken(); // Выполняем запрос при монтировании компонента
    }, []);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSwapClick = () => {
        setMode((prev) => (prev === 1 ? 2 : 1));
        setSelectedOption('');
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

    const handleQuestionClick = () => {
        setisQuestionVisible(true);  // Показываем всплывающее окно
        setIsMenuOpen(false); // Закрываем меню, если оно было открыто
    };

    const handleCloseQuestionWindow = () => {
        setisQuestionVisible(false);  // Скрываем всплывающее окно
    };

    const handleMenuClick = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false); // Если меню уже открыто, закрыть его
        } else {
            setisQuestionVisible(false); // Если меню открывается, закрыть окно вопроса
            setIsMenuOpen(true); // Открываем меню
        }
    };

    const handleCloseMenu = () => {
        setIsMenuOpen(false); // Закрываем меню
    };

    // ... (импорты и useState/useEffect как раньше)

    return (
    <div className="bg-gray-100 min-h-[100dvh] w-full flex justify-center px-4 overflow-y-auto">
        <div className="w-full max-w-sm flex flex-col">
        {/* Шапка */}
        <div className="flex justify-between mt-6">
            <img src={question_icon} alt="question" className="w-8 h-8 cursor-pointer" onClick={handleQuestionClick} />
            <img src={menu_icon} alt="menu" className="w-8 h-8 cursor-pointer" onClick={handleMenuClick} />
        </div>

        {/* Логотип */}
        <div className="mt-6 flex justify-center">
            <img src={logo_icon} alt="logo" className="w-[70%] h-auto" />
        </div>

        {/* Контент */}
        <div className="mt-6">
            {/* Переключатель режимов */}
            <div className="flex items-center">
            <p className="font-montserrat font-bold italic text-lg">
                {mode === 1 ? 'Ваше слово' : 'Ваше предложение'}
            </p>
            <button
                onClick={handleSwapClick}
                className="focus:outline-none hover:scale-105 transition-transform mx-1"
            >
                <img src={swap_arrows_icon} alt="swap" className="w-8 h-8" />
            </button>
            <p className="font-montserrat font-bold italic text-lg">
                {mode === 1 ? 'предложение' : 'слово'}
            </p>
            </div>

            {/* Поле ввода */}
            <div className="w-full bg-white text-black py-4 rounded-2xl text-lg mt-3 mb-4 flex items-center justify-between px-3 shadow-xl border border-gray-500">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Введите слово"
                className="w-full bg-transparent border-none outline-none text-lg"
            />
            </div>

            {/* 🔧 Адаптивный блок: Часть речи + кнопка */}
            <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 mt-4">
            {/* Селект */}
            <div className="w-full">
                <p className="font-montserrat font-bold italic text-lg">
                {mode === 1 ? 'Часть речи' : 'Выбранное слово'}
                </p>
                <div className="w-full bg-white text-black py-4 rounded-2xl text-lg mt-3 flex items-center justify-between px-3 shadow-xl border border-gray-500">
                <select
                    value={selectedOption}
                    onChange={handleSelectChange}
                    className="w-full bg-transparent border-none outline-none text-lg"
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
            <div className="mt-3 sm:mt-8">
                <button
                onClick={handleButtonClick}
                className={`focus:outline-none transition-transform ${isRotating ? 'animate-spin' : ''}`}
                >
                <img src={button_icon} alt="button" className="w-28 h-28 sm:w-32 sm:h-32" />
                </button>
            </div>
            </div>

            {/* Результат */}
            <div className='mt-5'>
            <p className='font-montserrat font-bold italic text-lg'>Лемма вашего слова</p>
            <div className="w-full bg-white text-black py-4 rounded-2xl text-lg mt-3 mb-4 flex items-center justify-between px-3 shadow-xl border border-gray-500">
                <input
                type="text"
                value={result}
                readOnly
                placeholder="Результат"
                className="w-full bg-transparent border-none outline-none text-lg"
                />
            </div>
            </div>
        </div>
        </div>

        {/* Окна */}
        {isQuestionVisible && <QuestionScreen onClose={handleCloseQuestionWindow} />}
        <MenuSidebar isOpen={isMenuOpen} onClose={handleCloseMenu} />
    </div>
    );
};

export default MainWindow;
