import { useState } from "react";

const LaggyForm = () => {
  const [formData, setFormData] = useState(
    Array.from({ length: 20 }, (_, i) => ({ id: i, value: "" }))
  );

  const handleChange = (id, value) => {
    // Updating entire array -> all inputs re-render
    setFormData((prev) => prev.map((f) => (f.id === id ? { ...f, value } : f)));
  };

  return (
    <div className="p-4 border rounded mb-6">
      <h2 className="font-bold mb-2">🚨 Laggy Form (Controlled)</h2>
      {formData.map((field) => (
        <div key={field.id} className="mb-2">
          <input
            className="border p-2 w-full"
            value={field.value}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={`Field ${field.id + 1}`}
          />
        </div>
      ))}
    </div>
  );
};

export default LaggyForm;
