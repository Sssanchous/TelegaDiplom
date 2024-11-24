import axios from 'axios';

export const fetchDataFromAPI = async (mode, selectedOption, inputValue) => {
    try {
        const response = await axios.get('http://176.114.89.106:8000/lemmatize', {
            params: { 
                mode, 
                selected_option: selectedOption, // Приведение к ожидаемому сервером имени
                input_value: inputValue // Исправление имени параметра
            }
        });
        return response.data.lemma;
    } catch (error) {
        console.error('Ошибка при запросе:', error);
        throw new Error('Ошибка при запросе');
    }
};
