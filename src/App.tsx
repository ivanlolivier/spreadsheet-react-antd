import './App.css'
import Spreadsheet from './components/spreadsheet';

const columns = ["Name", "Age", "Address"];
const rows = [
  ["John Doe", 28, "123 Main St"],
  ["Jane Smith", 32, "456 Maple Dr"]
];

function App() {
  return (
      <Spreadsheet columns={columns} rows={rows} />
  )
}

export default App
