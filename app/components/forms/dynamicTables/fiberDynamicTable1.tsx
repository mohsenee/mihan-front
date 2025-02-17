import React, { useEffect, useState } from "react";

interface TableRow {
  name: string;
  OCDF_plan: string;
  GIS: string;
  fiber_plan: string;
  response: string;
  continuityTest: string;
  route: string;
  Long_UTM: string;
  LAT_UTM: string;
  improvment_security: string;
  fix_failure: string;
  door_cementing: string;
}

interface DynamicTableProps {
  onTableDataChange: (data: TableRow[]) => void;
  initialData?: TableRow[]; // For passing initial data like 'reports' array
  isReadOnly?: boolean;
}

const FiberDynamicTable1: React.FC<DynamicTableProps> = ({
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
        name: "",
        OCDF_plan: "",
        GIS: "",
        fiber_plan: "",
        response: "",
        continuityTest: "",
        route: "",
        Long_UTM: "",
        LAT_UTM: "",
        improvment_security: "",
        fix_failure: "",
        door_cementing: "",
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
            <th className="border p-2">نام کارشناس</th>
            <th className="border p-2">پلان OCDF</th>
            <th className="border p-2">GIS</th>
            <th className="border p-2">فایبر پلان</th>
            <th className="border p-2">جواب استعلام</th>
            <th className="border p-2">تست پیوستگی</th>
            <th className="border p-2">تعیین مسیر</th>
            <th className="border p-2">LONG(UTM)</th>
            <th className="border p-2">LAT(UTM)</th>
            <th className="border p-2">بهسازی و ایمن سازی</th>
            <th className="border p-2">رفع خرابی</th>
            <th className="border p-2">نصب درب و سیمانکاری حوضچه</th>
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

export default FiberDynamicTable1;
