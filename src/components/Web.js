import React from "react";
import question_icon from '../images/question.png';
import menu_icon from '../images/menu.png';
import logo_icon from '../images/logo.png';
import swap_arrows_icon from '../images/swap_arrow.png';
import button_icon from '../images/button2.png';

function Web() {
  return (
    <div className="min-h-screen bg-gray-50 flex-col justify-center items-center">

      <header className="bg-white border-b shadow-sm mx-auto">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center w-[80%]">
                <div className="flex items-center gap-2">
                    <img 
                        src={logo_icon} 
                        alt="logo" 
                        className="w-[15%] h-auto" 
                    />
                    <p className="font-montserrat font-bold text-2xl">НейроЛемма</p>
                </div>
                <nav className="space-x-4 text-gray-1000 text-xl flex items-center gap-5">
                    <a href="#" className="hover:text-gray-700">Вход</a>
                    <a href="#" className="hover:text-gray-700">Регистрация</a>
                </nav>
            </div>
      </header>

      <main className="container mx-auto px-4 py-12 text-center w-[80%]">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Лемматизация слов</h2>
        <p className="text-gray-600 mb-8">Сгенирируйте лемму для вашего текста</p>

        <div
      className="border border-gray-300 rounded-lg py-10 px-6 shadow-sm flex flex-col flex-grow mt-4 px-[9%]"
      style={{
        backgroundImage: `
          linear-gradient(45deg,rgba(0,0,0,0.06) 25%,transparent 0),
          linear-gradient(-45deg,rgba(0,0,0,0.06) 25%,transparent 0),
          linear-gradient(45deg,transparent 75%,rgba(0,0,0,0.06) 0),
          linear-gradient(-45deg,transparent 75%,rgba(0,0,0,0.06) 0)
        `,
        backgroundSize: "24px 24px",
        backgroundColor: "#3c3c3c",
      }}
    >
      {/* Заголовок блока */}
      <div className="flex justify-center items-center space-x-4 mb-6">
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg">Выберите файлы</button>
        <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg">Dropbox</button>
        <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg">Google Drive</button>
      </div>
      <p className="text-gray-500">
        Перетащите файлы сюда. 100 MB максимальный размер файла или{" "}
        <a href="#" className="text-blue-500 underline">
          Регистрация
        </a>
      </p>

      {/* Переключатель режимов */}
      <div className="flex items-center mt-8">
        <p className="font-montserrat font-bold italic text-lg">Ваше слово</p>
        <button
          className="focus:outline-none hover:scale-105 transition-transform mx-1"
        >
          <img src="/path/to/swap_arrows_icon.png" alt="swap" className="w-8 h-8" />
        </button>
        <p className="font-montserrat font-bold italic text-lg">предложение</p>
      </div>

      {/* Поле для ввода текста */}
      <div className="w-full bg-white text-black py-4 rounded-2xl text-lg mt-3 mb-4 flex items-center justify-between px-3 shadow-xl hover:shadow-xl transition-shadow duration-300 border border-2 border-gray-500">
        <input
          type="text"
          placeholder="Введите слово"
          className="w-full bg-transparent border-none outline-none text-lg"
        />
      </div>

      {/* Блок с настройками параметра */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex-grow">
          <div className="flex">
            <p className="font-montserrat font-bold italic text-lg">Часть речи</p>
          </div>
          <div className="w-4/5 bg-white text-black py-4 rounded-2xl text-lg mt-3 flex items-center justify-between px-3 shadow-xl hover:shadow-xl transition-shadow duration-300 border border-2 border-gray-500">
            <select className="w-full bg-transparent border-none outline-none text-lg">
              <option value="" disabled>Не выбрана часть речи</option>
              <option value="option1">Существительное</option>
              <option value="option2">Глагол</option>
              <option value="option3">Прилагательное</option>
            </select>
          </div>
        </div>
        <div className="flex-shrink-0 ml-4 mt-3">
          <button className="focus:outline-none transition-transform">
            <img src="/path/to/button_icon.png" alt="button" className="w-32 h-32" />
          </button>
        </div>
      </div>

      {/* Результат */}
      <div className="mt-5">
        <p className="font-montserrat font-bold italic text-lg">Лемма вашего слова</p>
        <div className="w-full bg-white text-black py-4 rounded-2xl text-lg mt-3 mb-4 flex items-center justify-between px-3 shadow-xl hover:shadow-xl transition-shadow duration-300 border border-2 border-gray-500">
          <input
            type="text"
            readOnly
            placeholder="Результат"
            className="w-full bg-transparent border-none outline-none text-lg"
          />
        </div>
      </div>
    </div>



        {/* <section className="mt-12">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Как сконвертировать TXT в PNG</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h4 className="font-bold text-gray-800 mb-2">Шаг 1</h4>
              <p className="text-gray-600">Загрузите txt-файл(ы) с компьютера, Google Диска, Dropbox, по ссылке или перетащив их на страницу.</p>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h4 className="font-bold text-gray-800 mb-2">Шаг 2</h4>
              <p className="text-gray-600">Выберите "в png" или любой другой формат, который вам нужен (более 200 поддерживаемых форматов).</p>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h4 className="font-bold text-gray-800 mb-2">Шаг 3</h4>
              <p className="text-gray-600">Загрузите ваш png-файл. После конвертации вы сразу сможете скачать ваш файл.</p>
            </div>
          </div>
        </section> */}
      </main>
      <footer>
        
      </footer>
    </div>
  );
}

export default Web;
