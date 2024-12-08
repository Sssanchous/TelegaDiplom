import axios from 'axios';

// Создаем экземпляр axios с отключением проверки сертификатов
const axiosInstance = axios.create({
  httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
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
