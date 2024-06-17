import React from "react";

interface TableProps<T> {
  data: T[];
  columns: { key: keyof T; header: string; isImage?: boolean }[];
  actions?: (item: T) => React.ReactNode;
}

const renderCellValue = <T,>(value: T[keyof T], isImage: boolean = false): React.ReactNode => {
  if (isImage && typeof value === "string") {
    return <img src={value} alt="" className="h-16 w-16 object-cover" />;
  }
  return value as React.ReactNode;
};

const Table = <T,>({ data, columns, actions }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg mb-8">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              No
            </th>
            {columns.map((column, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                {column.header}
              </th>
            ))}
            {actions && (
              <th scope="col" className="px-6 py-3 text-right lg:pr-28">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index + 1}
              </td>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {renderCellValue(item[column.key], column.isImage)}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4 text-right">
                  {actions(item)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
