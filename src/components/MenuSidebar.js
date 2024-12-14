// import React, { useEffect, useState, useRef } from 'react';
// import { motion } from 'framer-motion';

// const MenuSidebar = ({ isOpen, onClose }) => {
//     const sidebarRef = useRef(); // Ссылка на боковое меню
//     const [user, setUser] = useState(null); // Состояние для данных пользователя

//     useEffect(() => {
//         // Проверка, если Telegram SDK уже инициализирован
//         const initializeUser = () => {
//             const miniApp = window.Telegram ? window.Telegram : null; // Используем глобальный объект Telegram

//             if (miniApp && miniApp.initData?.user) {
//                 const userData = miniApp.initData.user;

//                 setUser({
//                     id: userData.id,
//                     firstName: userData.first_name,
//                     lastName: userData.last_name,
//                     username: userData.username,
//                 });
//             } else {
//                 console.error('Telegram SDK не инициализирован или нет данных о пользователе.');
//             }
//         };

//         if (isOpen) {
//             initializeUser(); // Инициализируем данные пользователя, когда меню открыто
//         }
//     }, [isOpen]); // Запускаем эффект, когда меню открыто

//     // Ссылка на аватар пользователя
//     const avatarUrl = user?.id
//         ? `https://t.me/i/userpic/320/${user.id}.jpg`
//         : null;

//     const sidebarVariants = {
//         hidden: { y: '100%' }, // Скрытое состояние (за пределами экрана снизу)
//         visible: { y: 0 },    // Видимое состояние
//     };

//     return (
//         <motion.div
//             ref={sidebarRef}
//             initial="hidden"
//             animate={isOpen ? "visible" : "hidden"}
//             variants={sidebarVariants}
//             transition={{ type: 'spring', stiffness: 300, damping: 50 }}
//             className="fixed bottom-0 left-0 w-full max-h-screen bg-black bg-opacity-90 backdrop-blur-md shadow-lg z-50 overflow-hidden"
//             style={{ height: '65vh', minHeight: '300px' }}
//         >
//             {/* Закрывающая кнопка */}
//             <div className="flex justify-end py-3 px-6">
//                 <button
//                     onClick={onClose}
//                     className="text-white text-2xl font-bold focus:outline-none"
//                 >
//                     ✕
//                 </button>
//             </div>
            
//             {/* Содержимое меню */}
//             <div className="font-montserrat px-4 text-white flex flex-col items-center justify-between" style={{ height: '85%' }}>
//                 {/* Фото */}
//                 {avatarUrl ? (
//                     <img
//                         src={avatarUrl}
//                         alt="Аватар пользователя"
//                         className="rounded-full"
//                         style={{ width: '40%', aspectRatio: '1/1', objectFit: 'cover' }}
//                     />
//                 ) : (
//                     <div
//                         className="rounded-full bg-gray-700 flex items-center justify-center text-lg font-bold text-white"
//                         style={{ width: '40%', aspectRatio: '1/1' }}
//                     >
//                         Фото
//                     </div>
//                 )}

//                 {/* Фамилия и имя */}
//                 <p
//                     className="font-semibold text-center mt-4"
//                     style={{
//                         fontSize: 'clamp(1rem, 7.5vw, 2rem)', 
//                     }}
//                 >
//                     {user?.firstName || "Фамилия"} {user?.lastName || "Имя"}
//                 </p>

//                 {/* Кнопка */}
//                 <div className="w-full px-6 mt-4">
//                     <button className="bg-white text-black w-full py-4 rounded-full text-xl font-bold hover:bg-gray-300 transition">
//                         История
//                     </button>
//                 </div>

//                 {/* Футер */}
//                 <div className="w-full text-center text-sm opacity-75 pb-4">
//                     <p>Разработано при поддержке НКРЯ</p>
//                     <p>
//                         Аналитик: <a href="https://vk.com/evgen_k45" target="_blank" className="underline">Evgeshkins</a> |
//                         Разработчик: <a href="https://vk.com/sagadeev0" target="_blank" className="underline">Ostamer</a>
//                     </p>
//                     <p>Email: lemmatize@gmail.com</p>
//                     <p>ТюмГУ 2024 год</p>
//                 </div>
//             </div>
//         </motion.div>
//     );
// };

// export default MenuSidebar;
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const MenuSidebar = ({ isOpen, onClose }) => {
    const sidebarRef = useRef();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const initializeUser = () => {
            // Получаем объект Telegram SDK через глобальный window.Telegram
            const miniApp = window.Telegram || null;

            if (miniApp && miniApp.initData && miniApp.initData.user) {
                const userData = miniApp.initData.user;
                setUser({
                    id: userData.id,
                    firstName: userData.first_name,
                    lastName: userData.last_name,
                    username: userData.username,
                });
            } else {
                console.error('Telegram SDK не инициализирован или нет данных о пользователе.');
            }
        };

        if (isOpen) {
            initializeUser(); // Инициализируем данные о пользователе, когда меню открыто
        }
    }, [isOpen]);

    const avatarUrl = user?.id
        ? `https://t.me/i/userpic/320/${user.id}.jpg`
        : null;

    const sidebarVariants = {
        hidden: { y: '100%' },
        visible: { y: 0 },
    };

    return (
        <motion.div
            ref={sidebarRef}
            initial="hidden"
            animate={isOpen ? "visible" : "hidden"}
            variants={sidebarVariants}
            transition={{ type: 'spring', stiffness: 300, damping: 50 }}
            className="fixed bottom-0 left-0 w-full max-h-screen bg-black bg-opacity-90 backdrop-blur-md shadow-lg z-50 overflow-hidden"
            style={{ height: '65vh', minHeight: '300px' }}
        >
            <div className="flex justify-end py-3 px-6">
                <button
                    onClick={onClose}
                    className="text-white text-2xl font-bold focus:outline-none"
                >
                    ✕
                </button>
            </div>

            <div className="font-montserrat px-4 text-white flex flex-col items-center justify-between" style={{ height: '85%' }}>
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt="Аватар пользователя"
                        className="rounded-full"
                        style={{ width: '40%', aspectRatio: '1/1', objectFit: 'cover' }}
                    />
                ) : (
                    <div
                        className="rounded-full bg-gray-700 flex items-center justify-center text-lg font-bold text-white"
                        style={{ width: '40%', aspectRatio: '1/1' }}
                    >
                        Фото
                    </div>
                )}

                {/* Отображение имени и фамилии */}
                <p className="font-semibold text-center mt-4" style={{ fontSize: 'clamp(1rem, 7.5vw, 2rem)' }}>
                    {user?.firstName || "Имя"} {user?.lastName || "Фамилия"}
                </p>

                <div className="w-full px-6 mt-4">
                    <button className="bg-white text-black w-full py-4 rounded-full text-xl font-bold hover:bg-gray-300 transition">
                        История
                    </button>
                </div>

                <div className="w-full text-center text-sm opacity-75 pb-4">
                    <p>Разработано при поддержке НКРЯ</p>
                    <p>
                        Аналитик: <a href="https://vk.com/evgen_k45" target="_blank" className="underline">Evgeshkins</a> |
                        Разработчик: <a href="https://vk.com/sagadeev0" target="_blank" className="underline">Ostamer</a>
                    </p>
                    <p>Email: lemmatize@gmail.com</p>
                    <p>ТюмГУ 2024 год</p>
                </div>
            </div>
        </motion.div>
    );
};

export default MenuSidebar;
