import axios from 'axios';
import https from 'https-browserify'; // Локальная версия https

// Создаем экземпляр axios с использованием локального https и игнорированием сертификатов
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({ rejectUnauthorized: false })  // Игнорирование сертификатов
});

export const fetchDataFromAPI = async (mode, selectedOption, inputValue) => {
  try {
    const response = await axiosInstance.get('https://176.114.89.106/lemmatize', {
      params: { 
        mode, 
        selected_option: selectedOption,
        input_value: inputValue 
      }
    });
    return response.data.lemma;
  } catch (error) {
    console.error('Ошибка при запросе:', error);
    throw new Error('Ошибка при запросе');
  }
};
