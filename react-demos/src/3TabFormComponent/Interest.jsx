import React from "react";

const Interest = ({ data, setData }) => {
  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      interest: e.target.checked
        ? [...prev.interest, e.target.name]
        : prev.interest.filter((i) => i !== e.target.name),
    }));
  };
  return (
    <div>
      <div>
        <label>Coding</label>
        <input
          type="checkbox"
          name="coding"
          checked={data.interest.includes("coding")}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>tarvelling</label>
        <input
          type="checkbox"
          name="traveling"
          checked={data.interest.includes("traveling")}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Interest;
