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

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            {/* Шапка */}
            <div className="flex justify-between px-4 mt-4">
                {/* Кнопки вопроса и меню */}
                <img 
                    src={question_icon} 
                    alt="question" 
                    className="w-6 h-6 cursor-pointer" 
                    onClick={handleQuestionClick} // Обработчик клика на кнопку вопроса
                />
                <img
                    src={menu_icon}
                    alt="menu"
                    className="w-6 h-6 cursor-pointer"
                    onClick={handleMenuClick} // Обработчик клика для открытия меню
                />
            </div>

            {/* Логотип */}
            <div className="flex-grow flex justify-center items-center">
                <img 
                    src={logo_icon} 
                    alt="logo" 
                    className="w-full max-w-[300px] h-auto" 
                />
            </div>

            {/* Основной контент с растяжением */}
            <div className="flex flex-col flex-grow px-4 py-4">
                {/* Ваш основной контент */}
                <div>
                    {/* Переключатель режимов */}
                    <div className='flex items-center'>
                        <p className='font-montserrat font-bold italic text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl'>
                            {mode === 1 ? 'Ваше слово' : 'Ваше предложение'}
                        </p>
                        <button
                            onClick={handleSwapClick}
                            className="ml-1 focus:outline-none hover:scale-105 transition-transform"
                        >
                            <img
                                src={swap_arrows_icon}
                                alt="swap"
                                className="w-6 h-6"
                            />
                        </button>
                        <p className='font-montserrat font-bold italic text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl'>
                            {mode === 1 ? 'предложение' : 'слово'}
                        </p>
                    </div>
                    {/* Поле для ввода изначального текста */}
                    <div className="w-full bg-white text-black py-3 sm:py-4 md:py-5 px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8 rounded-xl shadow-md border border-gray-300 flex items-center transition-all mt-1 sm:mt-2 md:mt-3 mb-1">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Введите слово"
                            className="w-full bg-transparent border-none outline-none text-base sm:text-lg md:text-xl lg:text-2xl"
                        />
                    </div>
                </div>
                {/* Второй блок */}
                <div className="flex items-center mb-1">
                    <div className="flex-grow">
                        {/* Название параметра */}
                        <div className="flex">
                            <p className="font-montserrat font-bold italic text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-2">
                                {mode === 1 ? 'Часть речи' : 'Выбранное слово'}
                            </p>
                        </div>
                        {/* Настройки параметра */}
                        <div className="w-full bg-white text-black py-3 sm:py-4 md:py-5 lg:py-6 xl:py-6 px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8 rounded-xl shadow-md border border-gray-300 flex items-center transition-all mb-0.5">
                            <select
                                value={selectedOption}
                                onChange={handleSelectChange}
                                className="w-full bg-transparent border-none outline-none text-base sm:text-lg md:text-xl lg:text-2xl"
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
                    {/* Кнопка лемматизации */}
                    <div className="flex-shrink-0 mt-2 ml-2 sm:ml-4 md:ml-6 lg:ml-8 xl:ml-10">
                        <button
                            onClick={handleButtonClick}
                            className={`focus:outline-none transition-transform ${isRotating ? 'animate-spin' : ''}`}
                        >
                            <img src={button_icon} alt="button" className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 " />
                        </button>
                    </div>
                </div>
                {/* Результат */}
                <div className='mt-1'>
                    <p className='font-montserrat font-bold italic text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-2'>Лемма вашего слова</p>
                    <div className="w-full bg-white text-black py-3 sm:py-4 md:py-5 lg:py-6 xl:py-6 px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8 rounded-xl shadow-md border border-gray-300 flex items-center transition-all mb-0.5">
                        <input
                            type="text"
                            value={result}
                            readOnly
                            placeholder="Результат"
                            className="w-full bg-transparent border-none outline-none text-base sm:text-lg md:text-xl lg:text-2xl"
                        />
                    </div>
                </div>
            </div>
        
            {/* Всплывающее окно */}
            {isQuestionVisible && <QuestionScreen onClose={handleCloseQuestionWindow} />}
            <MenuSidebar isOpen={isMenuOpen} onClose={handleCloseMenu} />
        </div>
    );
};

export default MainWindow;
