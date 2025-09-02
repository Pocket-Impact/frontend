import { Edit, Trash2 } from "lucide-react";

const ReportsTable = ({ data, columns, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">No data available</div>
    );
  }

  return (
    <div className="overflow-x-auto shadow-sm border border-gray-200 rounded-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800/20 text-white">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left text-sm font-semibold text-black"
              >
                {column.header}
              </th>
            ))}
            <th className="px-4 py-3 text-left text-sm font-semibold text-black">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-4 py-3 text-sm text-gray-900">
                  {column.render
                    ? column.render(row[column.key], row)
                    : row[column.key]}
                </td>
              ))}
              <td className="px-4 py-3 text-sm">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(row)}
                    className="p-1 text-ligth-green hover:text-light-green hover:bg-primary rounded transition-colors"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(row)}
                    className="p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsTable