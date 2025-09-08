"use client";
import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";

const EditModal = ({ isOpen, onClose, data, reportType, onSave }) => {
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
    <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-slate-800">
                Edit {reportType}
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Update the selected record details
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 transition-colors duration-200"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-5">
            {getFields().map((field) => (
              <div key={field.key} className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <select
                    value={editData[field.key] || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, [field.key]: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200"
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((option) => (
                      <option
                        key={option}
                        value={option}
                        className="capitalize"
                      >
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
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-slate-600 bg-white hover:bg-slate-100 rounded-xl transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-200 flex items-center gap-2 font-medium shadow-sm hover:shadow-md"
            >
              <Save size={16} />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
