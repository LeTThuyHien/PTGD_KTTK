import { useState } from "react";
import StudentItem from "./components/StudentItem";
import "./App.css";

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Nguyễn Văn A", class: "10A1", age: 16 },
    { id: 2, name: "Trần Thị B", class: "11B2", age: 17 },
    { id: 3, name: "Lê Minh C", class: "12C1", age: 18 },
  ]);
  const [newStudent, setNewStudent] = useState({ name: "", class: "", age: "" });
  const [showForm, setShowForm] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Tìm kiếm theo tên
  const [selectedClass, setSelectedClass] = useState(""); // Lọc theo lớp

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.class && newStudent.age) {
      setStudents((prev) => [
        ...prev,
        { id: Date.now(), ...newStudent, age: parseInt(newStudent.age) },
      ]);
      setNewStudent({ name: "", class: "", age: "" });
      setShowForm(false);
    }
  };

  const handleEditStudent = (student) => {
    setEditStudent(student);
    setShowForm(true);
  };

  const handleSaveEdit = () => {
    if (editStudent.name && editStudent.class && editStudent.age) {
      setStudents((prev) =>
        prev.map((student) =>
          student.id === editStudent.id ? editStudent : student
        )
      );
      setEditStudent(null);
      setShowForm(false);
    }
  };

  const handleDeleteStudent = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const handleCancel = () => {
    setShowForm(false);
    setNewStudent({ name: "", class: "", age: "" });
    setEditStudent(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleClassFilterChange = (e) => {
    setSelectedClass(e.target.value);
  };

  // Lọc sinh viên theo tên và lớp
  const filteredStudents = students
    .filter((student) =>
      student.name.toLowerCase().includes(searchTerm)
    )
    .filter((student) => (selectedClass ? student.class === selectedClass : true));

  return (
    <div className="container">
      <h1>Quản Lý Danh Sách Sinh Viên</h1>

      <div className="info-title">
        {/* Input tìm kiếm */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Tìm kiếm sinh viên theo tên"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        {/* Dropdown lọc sinh viên theo lớp */}
        <div className="class-filter-container">
          <label htmlFor="class-filter">Chọn lớp:</label>
          <select
            id="class-filter"
            value={selectedClass}
            onChange={handleClassFilterChange}
          >
            <option value="">Tất cả lớp</option>
            <option value="10A1">10A1</option>
            <option value="11B2">11B2</option>
            <option value="12C1">12C1</option>
          </select>
        </div>
        
        {/* Nút hiển thị form thêm sinh viên */}
        {!showForm && !editStudent && (
          <button className="btn-add" onClick={() => setShowForm(true)}>
            Thêm sinh viên
          </button>
        )}
      </div>

      {/* Hiển thị overlay và form thêm sinh viên hoặc chỉnh sửa sinh viên */}
      {(showForm || editStudent) && (
        <div className="overlay">
          <div className="form-add-student">
            <input
              type="text"
              name="name"
              placeholder="Họ tên"
              value={editStudent ? editStudent.name : newStudent.name}
              onChange={(e) =>
                editStudent
                  ? setEditStudent({ ...editStudent, name: e.target.value })
                  : handleInputChange(e)
              }
            />
            <input
              type="text"
              name="class"
              placeholder="Lớp"
              value={editStudent ? editStudent.class : newStudent.class}
              onChange={(e) =>
                editStudent
                  ? setEditStudent({ ...editStudent, class: e.target.value })
                  : handleInputChange(e)
              }
            />
            <input
              type="number"
              name="age"
              placeholder="Tuổi"
              value={editStudent ? editStudent.age : newStudent.age}
              onChange={(e) =>
                editStudent
                  ? setEditStudent({ ...editStudent, age: e.target.value })
                  : handleInputChange(e)
              }
            />
            <button onClick={editStudent ? handleSaveEdit : handleAddStudent}>
              {editStudent ? "Lưu chỉnh sửa" : "Xác nhận"}
            </button>
            <button className="btn-cancel" onClick={handleCancel}>
              Huỷ
            </button>
          </div>
        </div>
      )}

      {/* Bảng danh sách sinh viên */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Họ và Tên</th>
              <th>Lớp</th>
              <th>Tuổi</th>
              <th style={{ textAlign: "right" }}>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <StudentItem
                  key={student.id}
                  student={student}
                  onDelete={handleDeleteStudent}
                  onEdit={handleEditStudent}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  style={{ textAlign: "center", padding: "16px", color: "#888" }}
                >
                  Không có sinh viên nào khớp với tìm kiếm hoặc lớp đã chọn!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
