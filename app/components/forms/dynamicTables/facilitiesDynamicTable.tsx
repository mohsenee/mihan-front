import React, { useEffect, useState } from "react";

interface TableRow {
  centerName: string;
  floor: string;
  station: string;
  EMPM: string;
  code: string;
  equipmentName: string;
  equipmentCode: string;
  name: string;
  description: string;
  items: string;
  itemsType: string;
  itemsNumber: string;
}

interface DynamicTableProps {
  onTableDataChange: (data: TableRow[]) => void;
  initialData?: TableRow[]; // For passing initial data like 'reports' array
  isReadOnly?: boolean;
}

const FacilitiesDynamicTable: React.FC<DynamicTableProps> = ({
  onTableDataChange,
  initialData = [],
  isReadOnly = false,
}) => {
  const [rows, setRows] = useState<TableRow[]>(initialData);

  useEffect(() => {
    // When initialData prop changes, update the state
    setRows(initialData);
  }, [initialData]);

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const updatedRows = [...rows];
    updatedRows[index] = { ...updatedRows[index], [name]: value };
    setRows(updatedRows);
    onTableDataChange(updatedRows); // Pass updated data to parent
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        centerName: "",
        floor: "",
        station: "",
        EMPM: "",
        code: "",
        equipmentName: "",
        equipmentCode: "",
        name: "",
        description: "",
        items: "",
        itemsType: "",
        itemsNumber: "",
      },
    ]);
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
            <th className="border p-2">نام مرکز/ایستگاه</th>
            <th className="border p-2">طبقه</th>
            <th className="border p-2">اتاق/سالن</th>
            <th className="border p-2">EM/PM</th>
            <th className="border p-2">کد عملکرد</th>
            <th className="border p-2">نام تجهیز</th>
            <th className="border p-2">کد تجهیز</th>
            <th className="border p-2">نام و نام خانوادگی</th>
            <th className="border p-2">توضیحات</th>
            <th className="border p-2">اقلام مصرفی</th>
            <th className="border p-2">نوع</th>
            <th className="border p-2">تعداد</th>
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

export default FacilitiesDynamicTable;
