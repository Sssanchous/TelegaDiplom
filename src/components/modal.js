import React from "react";

const Modal = ({ isOpen, closeModal, modalMode, handleSwitchForm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[40%] h-[60%] p-8 rounded-lg shadow-lg relative overflow-hidden">
        {/* Закрытие модального окна */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-3xl text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        {/* Заголовок с переключателем */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold">{modalMode === 'login' ? "Авторизация" : "Регистрация"}</h2>
        </div>

        {/* Переключатель между формами */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleSwitchForm}
            className="text-xl font-semibold text-blue-500 hover:text-blue-700"
          >
            {modalMode === 'login' ? "Не зарегистрированы? Зарегистрироваться" : "Есть аккаунт? Войти"}
          </button>
        </div>

        {/* Форма авторизации */}
        {modalMode === 'login' ? (
  <div>
    <input
      type="text"
      placeholder="Введите имя пользователя"
      className="w-full text-xl p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input
      type="password"
      placeholder="Введите пароль"
      className="w-full text-xl p-4 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button className="w-full text-xl p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
      Войти
    </button>
  </div>
) : (
  /* Форма регистрации */
  <div>
    <input
      type="text"
      placeholder="Введите имя"
      className="w-full text-xl p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input
      type="email"
      placeholder="Введите email"
      className="w-full text-xl p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input
      type="password"
      placeholder="Введите пароль"
      className="w-full text-xl p-4 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button className="w-full text-xl p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
      Зарегистрироваться
    </button>
  </div>
)}

      </div>
    </div>
  );
};

export default Modal;
