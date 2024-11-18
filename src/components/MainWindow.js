import React, { useState } from 'react';
import { fetchDataFromAPI } from './api';  // Импортируем функцию из api.js
import question_icon from '../images/question.png';
import menu_icon from '../images/menu.png';
import logo_icon from '../images/logo.png';
import swap_arrows_icon from '../images/swap_arrow.png';
import button_icon from '../images/button2.png';

const MainWindow = () => {
    const [inputValue, setInputValue] = useState('');
    const [mode, setMode] = useState(1);
    const [isRotating, setIsRotating] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [result, setResult] = useState('');

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

    const partsOfSpeech = ['-', 'Существительное', 'Глагол', 'Прилагательное', 'Наречие', 'Местоимение', 'Числительное', 'Союз', 'Предлог', 'Междометие'];

    const options = mode === 1
        ? partsOfSpeech
        : [...inputValue.split(' ').filter(Boolean), 'Всё предложение']; 

    const handleButtonClick = async () => {
        try {
            setIsRotating(true);
            const data = await fetchDataFromAPI(mode, selectedOption, inputValue);
            setResult(data);
        } catch (error) {
            setResult('Ошибка при запросе');
        } finally {
            setIsRotating(false);
        }
    };

    return (
        <div className='bg-gray-200 h-screen w-full'>
            {/* Шапка */}
            <div>
                {/* Кнопки вопроса и меню */}
                <div className='flex justify-between'>
                    <img src={question_icon} alt="question" className="w-8 h-8 ml-5 mt-6" />
                    <img src={menu_icon} alt="menu" className="w-8 h-8 mr-5 mt-6" />
                </div>
                {/* Логотип */}
                <div className='flex-grow flex justify-center items-center'>
                    <img src={logo_icon} alt="logo" className="w-40 h-32" />
                </div>
            </div>
            {/* Основной код */}
            <div className="flex-grow mt-12 px-[9%] flex flex-col justify-between">
                {/* Переключатель режимов */}
                <div className='flex items-center'>
                    <p className='font-montserrat font-bold italic text-lg'>
                        {mode === 1 ? 'Ваше слово' : 'Ваше предложение'}
                    </p>
                    <button
                        onClick={handleSwapClick}
                        className="focus:outline-none hover:scale-105 transition-transform mx-1"
                    >
                        <img
                            src={swap_arrows_icon}
                            alt="swap"
                            className="w-8 h-8"
                        />
                    </button>
                    <p className='font-montserrat font-bold italic text-lg'>
                        {mode === 1 ? 'предложение' : 'слово'}
                    </p>
                </div>
                {/* Поле для ввода изначального текста */}
                <div className="w-full bg-white text-black py-4 rounded-2xl text-lg mt-3 mb-4 flex items-center justify-between px-3 shadow-xl hover:shadow-xl transition-shadow duration-300 border border-2 border-gray-500">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Введите слово"
                        className="w-full bg-transparent border-none outline-none text-lg"
                    />
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex-grow">
                        {/* Название параметра */}
                        <div className="flex">
                        <p className="font-montserrat font-bold italic text-lg">
                            {mode === 1 ? 'Часть речи' : 'Выбранное слово'}
                        </p>
                        </div>
                        {/* Настройки параметра */}
                        <div className="w-4/5 bg-white text-black py-4 rounded-2xl text-lg mt-3 flex items-center justify-between px-3 shadow-xl hover:shadow-xl transition-shadow duration-300 border border-2 border-gray-500">
                        <select
                            value={selectedOption}
                            onChange={handleSelectChange}
                            className="w-full bg-transparent border-none outline-none text-lg"
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
                    <div className="flex-shrink-0 ml-4">
                        <button
                        onClick={handleButtonClick}
                        className={`focus:outline-none transition-transform ${isRotating ? 'animate-spin' : ''}`}
                        >
                        <img src={button_icon} alt="button" className="w-32 h-32" />
                        </button>
                    </div>
                </div>
                {/* Результат */}
                <div className='mt-5'>
                    <p className='font-montserrat font-bold italic text-lg'>Лемма вашего слова</p>
                    <div className="w-full bg-white text-black py-4 rounded-2xl text-lg mt-3 mb-4 flex items-center justify-between px-3 shadow-xl hover:shadow-xl transition-shadow duration-300 border border-2 border-gray-500">
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
    );
};

export default MainWindow;
