import React, { useEffect, useState } from "react";

interface TableRow {
  routeName: string;
  name: string;
  driver: string;
  startTime: string;
  endTime: string;
  km: string;
  excavation: string;
  excavatorName: string;
  license: string;
  startDate: string;
  endDate: string;
  LONG_UTM: string;
  LAT_UTM: string;
  description: string;
}

interface DynamicTableProps {
  onTableDataChange: (data: TableRow[]) => void;
  initialData?: TableRow[]; // For passing initial data like 'reports' array
  isReadOnly?: boolean;
}

const FiberDynamicTable2: React.FC<DynamicTableProps> = ({
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
        routeName: "",
        name: "",
        driver: "",
        startTime: "",
        endTime: "",
        km: "",
        excavation: "",
        excavatorName: "",
        license: "",
        startDate: "",
        endDate: "",
        LONG_UTM: "",
        LAT_UTM: "",
        description: "",
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
            <th className="border p-2">نام مسیر</th>
            <th className="border p-2">نام کارشناس</th>
            <th className="border p-2">نام راننده</th>
            <th className="border p-2">ساعت شروع</th>
            <th className="border p-2">ساعت پایان</th>
            <th className="border p-2">کیلومتر کل</th>
            <th className="border p-2">حفاری های مسیر</th>
            <th className="border p-2">نام دستگاه حفار</th>
            <th className="border p-2">مجوز دارد/ندارد</th>
            <th className="border p-2">تاریخ شروع عملیات</th>
            <th className="border p-2">پیش بینی تاریخ خاتمه</th>
            <th className="border p-2">LONG(UTM)</th>
            <th className="border p-2">LAT(UTM)</th>
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

export default FiberDynamicTable2;
