import React, { useState, useEffect } from 'react';

interface TableRow {
  reporter: string;
  systemType: string;
  operation: string;
  startTime: string;
  endTime: string;
  alarm: string;
  description: string;
}

interface DynamicTableProps {
  onTableDataChange: (data: TableRow[]) => void;
  initialData?: TableRow[]; // For passing initial data like 'reports' array
  isReadOnly?: boolean; // Prop to control read-only mode
}

const MuxDynamicTable1: React.FC<DynamicTableProps> = ({ onTableDataChange, initialData = [], isReadOnly = false }) => {
  const [rows, setRows] = useState<TableRow[]>(initialData);

  useEffect(() => {
    // When initialData prop changes, update the state
    setRows(initialData);
  }, [initialData]);

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedRows = [...rows];
    updatedRows[index] = { ...updatedRows[index], [name]: value };
    setRows(updatedRows);
    onTableDataChange(updatedRows);
  };

  const addRow = () => {
    setRows([...rows, { reporter: "", systemType: "", operation: "", startTime: "", endTime: "", alarm: '', description: "" }]);
  };

  const removeRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
    onTableDataChange(updatedRows);
  };

  return (
    <div className="p-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">گزارش دهنده</th>
            <th className="border p-2">نوع سیستم</th>
            <th className="border p-2">عملیات</th>
            <th className="border p-2">ساعت شروع</th>
            <th className="border p-2">ساعت پایان</th>
            <th className="border p-2">آلارم</th>
            <th className="border p-2">توضیحات</th>
            <th className="border p-2"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {Object.keys(row).map((key) => (
                <td className="border p-2" key={key}>
                  <input
                    type="text"
                    name={key}
                    value={row[key as keyof TableRow]}
                    onChange={(e) => handleInputChange(index, e)}
                    className="w-full border px-2 py-1"
                    readOnly={isReadOnly} // If isReadOnly is true, fields are non-editable
                  />
                </td>
              ))}
              <td className="border p-2">
                {!isReadOnly && ( // Only show "Delete" button in edit mode
                  <button
                    type="button"
                    onClick={() => removeRow(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    حذف
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!isReadOnly && ( // Only show "Add" button in edit mode
        <button
          type="button"
          onClick={addRow}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          اضافه کردن
        </button>
      )}
    </div>
  );
};

export default MuxDynamicTable1;

