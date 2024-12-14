import React, { useState } from "react";

const HistoryModal = ({ isOpen, onClose, history, isLoading }) => {
  const [filterType, setFilterType] = useState("all"); // Фильтр: "all" или конкретный тип
  const [sortAscending, setSortAscending] = useState(true); // Сортировка по дате

  if (!isOpen) return null;

  // Применяем фильтр
  const filteredHistory =
    filterType === "all"
      ? history
      : history.filter((item) => item.lemmatize_type === parseInt(filterType));

  // Сортируем по дате
  const sortedHistory = [...filteredHistory].sort((a, b) => {
    const dateA = new Date(a.date_of_create);
    const dateB = new Date(b.date_of_create);
    return sortAscending ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full">
        <h2 className="text-xl font-bold mb-4">История</h2>

        {/* Фильтры и сортировка */}
        <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">Все</option>
            {[...new Set(history.map((item) => item.lemmatize_type))].map(
              (type) => (
                <option key={type} value={type}>
                  Тип {type}
                </option>
              )
            )}
          </select>

          <button
            onClick={() => setSortAscending(!sortAscending)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Сортировать по дате: {sortAscending ? "▲" : "▼"}
          </button>
        </div>

        {/* История */}
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : sortedHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="border border-gray-300 p-2">Слово</th>
                  <th className="border border-gray-300 p-2">Тип лемматизации</th>
                  <th className="border border-gray-300 p-2">Результат</th>
                  <th className="border border-gray-300 p-2">Дата</th>
                </tr>
              </thead>
              <tbody>
                {sortedHistory.map((item) => (
                  <tr
                    key={item.id}
                    className="odd:bg-white even:bg-gray-100 text-sm sm:text-base"
                  >
                    <td className="border border-gray-300 p-2">{item.word}</td>
                    <td className="border border-gray-300 p-2 text-center">
                      {item.lemmatize_type}
                    </td>
                    <td className="border border-gray-300 p-2">{item.result}</td>
                    <td className="border border-gray-300 p-2">
                      {new Date(item.date_of_create).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>История пуста.</p>
        )}

        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default HistoryModal;