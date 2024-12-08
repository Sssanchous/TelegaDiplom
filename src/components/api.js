import axios from 'axios';

export const fetchDataFromAPI = async (mode, selectedOption, inputValue) => {
  try {
    const response = await axios.get('https://176.114.89.106/lemmatize', {
      params: {
        mode,
        selected_option: selectedOption,
        input_value: inputValue,
      },
    });
    return response.data.lemma;
  } catch (error) {
    console.error('Ошибка при запросе:', error);
    throw new Error('Ошибка при запросе');
  }
};
