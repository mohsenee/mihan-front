import React, { useEffect, useState } from "react";

interface TableRow {
  contractorName: string;
  status: string;
  phoneContractor: string;
  fromKm: string;
  toKm: string;
  bridgesCount: string;
  polesCount: string;
  pondsCount: string;
  routeLength: string;
  suggestions: string;
}

interface DynamicTableProps {
  onTableDataChange: (data: TableRow[]) => void;
  initialData?: TableRow[]; // For passing initial data like 'reports' array
  isReadOnly?: boolean;
}

const FiberDynamicTable3: React.FC<DynamicTableProps> = ({
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
        contractorName: "",
        status: "",
        phoneContractor: "",
        fromKm: "",
        toKm: "",
        bridgesCount: "",
        polesCount: "",
        pondsCount: "",
        routeLength: "",
        suggestions: "",
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
            <th className="border p-2">مشخصات پیمانکار</th>
            <th className="border p-2">وضعیت استعلام</th>
            <th className="border p-2">شماره همراه پیمانکار</th>
            <th className="border p-2">از کیلومتر</th>
            <th className="border p-2">تا کیلومتر</th>
            <th className="border p-2">شمارش تعداد پل ها و باروان ها</th>
            <th className="border p-2">شمارش تیرک ها</th>
            <th className="border p-2">شمارش حوضچه ها و وضعیت آن</th>
            <th className="border p-2">طول مسیر طی شده</th>
            <th className="border p-2">پیشنهادها</th>
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

export default FiberDynamicTable3;
