import axios from 'axios';

const adaptSelectedOption = (selectedOption) => {
  const mapping = {
    '-': '-',
    'Существительное': 'NOUN',
    'Глагол': 'VERB',
    'Вспомогательный глагол': 'AUX',
    'Прилагательное': 'ADJ',
    'Местоимение': 'PRON',
    'Числительное': 'NUM',
    'Порядковое числительное': 'ANUM',
    'Имя собственное': 'PROPN',
    'Детерминатив': 'DET',
    'Частица': 'PART',
    'Наречие': 'ADV',
    'Местоименное наречие': 'ADVPRO',
    'Предлог': 'ADP',
    'Символ': 'SYM',
    'Сочинительный союз': 'CCONJ',
    'Подчинительный союз': 'SCONJ',
    'Междометие': 'INTJ',
    'Предикатив': 'PRED',
    'Вводное слово': 'PARENTH',
    'COM': 'COM',
    'Знак препинания': 'PUNCT'
  };

  return mapping[selectedOption] || '-'; // Если selectedOption не найден, вернем 'X' как значение по умолчанию
};

export const fetchDataFromAPI = async (mode, selectedOption, inputValue) => {
  try {
    if (mode === 1) {
      selectedOption = adaptSelectedOption(selectedOption);
    }
    if (mode === 2){
      if (selectedOption === "Все предложение" ){
        selectedOption = "All"
      }
    }
    const response = await axios.post('https://lemmaapp.ru/lemmatize', {
      mode: mode,
      selected_option: selectedOption,
      input_value: inputValue,
    });
    return response.data.lemma;
  } catch (error) {
    console.error('Ошибка при запросе:', error);
    throw new Error('Ошибка при запросе');
  }
};