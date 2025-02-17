import React, { useState } from 'react';

interface TableRow {
  stationName: string;
  stationNumber: string;
  names: string;
  timeFromCenter: string;
  arriveTimeToStation: string;
  timeFromStation: string;
  workPermitNumber: string;
  reason: string;
  description: string;
}

interface DynamicTableProps {
  onTableDataChange: (data: TableRow[]) => void;
  initialData: TableRow[];
  isReadOnly: boolean;
}

const MuxDynamicTable2: React.FC<DynamicTableProps> = ({ onTableDataChange, initialData, isReadOnly }) => {
  const [rows, setRows] = useState<TableRow[]>(initialData);

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedRows = [...rows];
    updatedRows[index] = { ...updatedRows[index], [name]: value };
    setRows(updatedRows);
    onTableDataChange(updatedRows); // Pass updated data to parent
  };

  const addRow = () => {
    setRows([...rows, { stationName: "", stationNumber: "", names: "", timeFromCenter: "", arriveTimeToStation: "", timeFromStation: "", workPermitNumber: '', reason: '', description: "" }]);
  };

  const removeRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
    onTableDataChange(updatedRows); // Pass updated data to parent
  };

  return (
    <div className="p-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">نام ایستگاه</th>
            <th className="border p-2">شماره ایستگاه</th>
            <th className="border p-2">نام مامورین</th>
            <th className="border p-2">ساعت خروج از مرکز</th>
            <th className="border p-2">ساعت ورود به ایستگاه</th>
            <th className="border p-2">ساعت خروج از ایستگاه</th>
            <th className="border p-2">شماره اجازه کار</th>
            <th className="border p-2">علت مراجعه</th>
            <th className="border p-2">توضیحات</th>
            <th className="border p-2"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="border p-2">
                <input
                  type="text"
                  name="stationName"
                  value={row.stationName}
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-full border px-2 py-1"
                  disabled={isReadOnly} // Disable if in read-only mode
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  name="stationNumber"
                  value={row.stationNumber}
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-full border px-2 py-1"
                  disabled={isReadOnly}
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  name="names"
                  value={row.names}
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-full border px-2 py-1"
                  disabled={isReadOnly}
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  name="timeFromCenter"
                  value={row.timeFromCenter}
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-full border px-2 py-1"
                  disabled={isReadOnly}
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  name="arriveTimeToStation"
                  value={row.arriveTimeToStation}
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-full border px-2 py-1"
                  disabled={isReadOnly}
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  name="timeFromStation"
                  value={row.timeFromStation}
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-full border px-2 py-1"
                  disabled={isReadOnly}
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  name="workPermitNumber"
                  value={row.workPermitNumber}
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-full border px-2 py-1"
                  disabled={isReadOnly}
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  name="reason"
                  value={row.reason}
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-full border px-2 py-1"
                  disabled={isReadOnly}
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  name="description"
                  value={row.description}
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-full border px-2 py-1"
                  disabled={isReadOnly}
                />
              </td>
              <td className="border p-2">
                {!isReadOnly && (  // Conditionally render "حذف" button
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

      {/* Add Row button is only visible when not in read-only mode */}
      {!isReadOnly && (
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

export default MuxDynamicTable2;
