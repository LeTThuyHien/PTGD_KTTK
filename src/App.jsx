import { useState } from "react"
import "./App.css"
import StudentItem from "./components/StudentItem"

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Nguyễn Văn A", class: "10A1", age: 16 },
    { id: 2, name: "Trần Thị B", class: "11B2", age: 17 }
  ])

  const [newStudent, setNewStudent] = useState({ name: "", class: "", age: "" })
  const [showForm, setShowForm] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewStudent((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.class && newStudent.age) {
      const newId = Date.now()
      setStudents((prev) => [...prev, { id: newId, ...newStudent, age: parseInt(newStudent.age) }])
      setNewStudent({ name: "", class: "", age: "" })
      setShowForm(false) // Ẩn form sau khi thêm sinh viên
    }
  }

  const handleDeleteStudent = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id))
  }

  const handleCancel = () => {
    setShowForm(false)
    setNewStudent({ name: "", class: "", age: "" }) // Đặt lại giá trị input khi huỷ
  }

  return (
    <div className="container">
      <h1>Quản Lý Danh Sách Sinh Viên</h1>

      {/* Nút hiển thị form */}
      {!showForm && (
        <button className="btn-add" onClick={() => setShowForm(true)}>
          Thêm sinh viên
        </button>
      )}

      {/* Hiển thị overlay và form thêm sinh viên */}
      {showForm && (
        <div className="overlay">
          <div className="form-add-student">
          <h1>Thêm Sinh Viên</h1>

            <input
              type="text"
              name="name"
              placeholder="Họ tên"
              value={newStudent.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="class"
              placeholder="Lớp"
              value={newStudent.class}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="age"
              placeholder="Tuổi"
              value={newStudent.age}
              onChange={handleInputChange}
            />
            <button onClick={handleAddStudent}>Xác nhận</button>
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
            {students.length > 0 ? (
              students.map((student) => (
                <StudentItem key={student.id} student={student} onDelete={handleDeleteStudent} />
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: "16px", color: "#888" }}>
                  Không có sinh viên nào. Hãy thêm sinh viên mới!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
