"use client"
import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  reportType: string;
  onSave: (data: any) => void;
}

const EditModal = ({ isOpen, onClose, data, reportType, onSave }: EditModalProps) => {
  const [editData, setEditData] = useState(data || {});

  useEffect(() => {
    setEditData(data || {});
  }, [data]);

  const handleSave = () => {
    onSave(editData);
    onClose();
  };

  const getFields = () => {
    switch (reportType) {
      case "surveys":
        return [
          { key: "title", label: "Title", type: "text" },
          { key: "responseCount", label: "Response Count", type: "number" },
          {
            key: "status",
            label: "Status",
            type: "select",
            options: ["active", "inactive"],
          },
        ];
      case "responses":
        return [
          { key: "date", label: "Date", type: "date" },
          { key: "count", label: "Count", type: "number" },
          { key: "completionRate", label: "Completion Rate", type: "number" },
        ];
      case "feedback":
        return [
          {
            key: "category",
            label: "Category",
            type: "select",
            options: ["product", "support", "ux", "pricing"],
          },
          { key: "count", label: "Count", type: "number" },
          {
            key: "sentiment",
            label: "Sentiment",
            type: "select",
            options: ["positive", "neutral", "negative"],
          },
        ];
      case "users":
        return [
          {
            key: "role",
            label: "Role",
            type: "select",
            options: ["admin", "analyst", "researcher"],
          },
          { key: "count", label: "Count", type: "number" },
          {
            key: "status",
            label: "Status",
            type: "select",
            options: ["active", "inactive"],
          },
        ];
      default:
        return [];
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Edit {reportType}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {getFields().map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              {field.type === "select" ? (
                <select
                  value={editData[field.key] || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, [field.key]: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((option: any) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  value={editData[field.key] || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, [field.key]: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-2 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-700 text-white hover:bg-green-800 rounded-md transition-colors flex items-center space-x-1"
          >
            <Save size={16} />
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal