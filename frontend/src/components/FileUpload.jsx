import { useState ,useContext, useEffect} from "react";
import { CloudUpload, Trash2, Download, Edit, CheckCircle, Database } from "lucide-react";
import * as XLSX from "xlsx";
import { AppContext } from "../context/AppContext";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [fieldErrors, setFieldErrors] = useState({});  // Track required field errors
  const [columns, setColumns] = useState([]);  // Store columns dynamically
  
  const navigate = useNavigate();
  const {backendUrl } = useContext(AppContext) ; 


  const dataSaverToBackend = async () =>{
    try {
      axios.defaults.withCredentials = true ;  
          const response = await axios.post(`${backendUrl}/api/excel/store ` , {data}) ; 
          if (response.data.success) {
            navigate('/');
          }else{
            toast.error(response.data.message)
          }
      
    } catch (error) {
      toast.error(error.message) ;
    }
  }

  const [isRefreshing, setIsRefreshing] = useState(false);

  // Your existing states and methods

  const handleBeforeUnload = (event) => {
    // Show a confirmation alert before refreshing the page
    event.preventDefault();
    const userConfirmed = window.confirm("Are you sure you want to refresh the page?");
    if (!userConfirmed) {
      event.returnValue = false; // Prevent the page from refreshing if "Cancel" is clicked
    } else {
      setIsRefreshing(true); // Indicate that the user confirmed to refresh
      event.returnValue = true; // Allow the page to refresh if "OK" is clicked
    }
  };

  useEffect(() => {
    // Add the beforeunload event listener to show the confirmation dialog
    window.addEventListener("beforeunload", handleBeforeUnload);
    
    return () => {
      // Clean up the event listener
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);





  useEffect(() => {
    if (isRefreshing) {
      // Refresh the page if the user confirmed the action
      window.location.reload();
    }
  }, [isRefreshing]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    validateFile(droppedFile);
  };

  const validateFile = (file) => {
    if (!file) return;
    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".csv")) {
      setError("Only Excel (.xlsx) or CSV files are allowed.");
      setFile(null);
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("File size must be less than 2MB.");
      setFile(null);
      return;
    }
    setFile(file);
    setError("");
    readFile(file);
  };

  const readFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const ab = e.target.result;
      const wb = XLSX.read(ab, { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(ws);
      setData(data);

      // Dynamically set columns based on the keys of the first row
      if (data.length > 0) {
        setColumns(Object.keys(data[0]));
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const removeFile = () => {
    setFile(null);
    setData([]);
    setError("");
    setColumns([]);
  };

  const handleDeleteRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const handleEditRow = (index) => {
    setEditingIndex(index);
    setEditedRow(data[index]);
    setFieldErrors({}); // Reset field errors when editing a row
  };

  const handleSaveEdit = () => {
    if (validateRow(editedRow)) {
      const newData = [...data];
      newData[editingIndex] = editedRow;
      setData(newData);
      setEditingIndex(null);
      setEditedRow({});
    }
  };

  const validateRow = (row) => {
    let isValid = true;
    const errors = {};
    columns.forEach((col) => {
      if (!row[col]) {
        isValid = false;
        errors[col] = `${col} is required`;
      }
    });
    setFieldErrors(errors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRow({ ...editedRow, [name]: value });
  };

  const sortData = (column) => {
    const newSortOrder = sortedColumn === column && sortOrder === "asc" ? "desc" : "asc";
    const sortedData = [...data].sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === "number" && typeof valueB === "number") {
        return newSortOrder === "asc" ? valueA - valueB : valueB - valueA;
      } else {
        return newSortOrder === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
    });
    setData(sortedData);
    setSortedColumn(column);
    setSortOrder(newSortOrder);
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "modified_data.xlsx");
  };

  return (
    <div className="flex flex-col mt-19 items-center justify-center min-h-screen bg-gray-100 p-6">
      <header className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Excel Data Importer</h1>
        <p className="text-gray-600 mt-2">Upload your Excel or CSV file (Max: 2MB)</p>
      </header>

      {!file && (
        <div
          className="mt-8 w-full max-w-lg bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center cursor-pointer hover:bg-gray-50 transition-all"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <CloudUpload size={50} className="text-gray-500" />
          <p className="mt-2 text-gray-700 font-medium">Drag & Drop Here</p>
          <p className="text-sm text-gray-500">or</p>
          <label className="mt-2 bg-blue-600 text-white px-5 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition-all">
            Select File
            <input
              type="file"
              accept=".xlsx,.csv"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      )}

      {file && (
        <div className="mt-6 w-full max-w-lg bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
          <p className="text-gray-800">{file.name} ({(file.size / 1024).toFixed(1)} KB)</p>
          <button onClick={removeFile} className="text-red-600 hover:text-red-800 transition-all">
            <Trash2 size={20} />
          </button>
        </div>
      )}

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {/* Display Data Table */}
      {data.length > 0 && (
        <div className="mt-6 w-full max-w-full bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col}
                    className="px-4 py-2 border-b text-left cursor-pointer"
                    onClick={() => sortData(col)}
                  >
                    {col} {sortedColumn === col && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                ))}
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {columns.map((col) => (
                    <td key={col} className="px-4 py-2 border-b">
                      {editingIndex === index ? (
                        <>
                          <input
                            type="text"
                            name={col}
                            value={editedRow[col] || ""}
                            onChange={handleChange}
                            className="border border-gray-300 p-1"
                          />
                          {fieldErrors[col] && <p className="text-red-600 text-sm">{fieldErrors[col]}</p>}
                        </>
                      ) : (
                        row[col]
                      )}
                    </td>
                ))}
                  <td className="px-4 py-4 border-b flex space-x-2">
                    {editingIndex === index ? (
                      <button
                        onClick={handleSaveEdit}
                        className="text-green-600 hover:text-green-800"
                      >
                        <CheckCircle size={20} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditRow(index)}
                        className="text-yellow-600 hover:text-yellow-800"
                      >
                        <Edit size={20} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteRow(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleExport}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all"
          >
            <Download size={20} className="inline-block mr-2" />
            Export Data
          </button>
          <button
            onClick={()=>dataSaverToBackend()}
            className="mt-4 ml-5 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all"
          >
            <Database size={20} className="inline-block mr-2" />
            Save Data
          </button>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
