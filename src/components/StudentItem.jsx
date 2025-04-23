import React from "react";

function StudentItem({ student, onDelete }) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.class}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.age}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          className="text-red-600 hover:text-red-900 font-medium"
          onClick={() => onDelete(student.id)}
        >
          Xoá
        </button>
      </td>
    </tr>
  );
}

export default StudentItem;
