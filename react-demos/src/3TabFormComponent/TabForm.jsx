import Interest from "./Interest";
import Profile from "./Profile";

import React, { useState } from "react";
import Settings from "./Settings";

const TabForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState({});

  const [data, setData] = useState({
    name: "vrushabh",
    age: 28,
    interest: ["coding", "traveling"],
    theme: "dark",
  });

  const tabs = [
    {
      title: "Profile",
      component: Profile,
      validate: () => {
        const obj = {};
        if (!data.name && data.name.length < 2) {
          obj.name = "Name is not valid";
        }
        if (!data.age && data.age < 18) {
          obj.name = "Age is not valid";
        }
        setError(obj);

        return Object.keys(obj).length > 0 ? false : true;
      },
    },
    {
      title: "Interest",
      component: Interest,
    },
    {
      title: "Settings",
      component: Settings,
    },
  ];

  const ActiveTabComp = tabs[activeTab].component;

  const handlePrev = () => {
    setActiveTab((prev) => prev - 1);
  };
  const handleNext = () => {
    console.log(error);
    
    if (tabs[activeTab].validate()) {
      setActiveTab((prev) => prev + 1);
    }
  };
  const handleSubmit = () => {};
  return (
    <>
      {tabs.map((tab, index) => (
        <span
          key={index}
          onClick={() => setActiveTab(index)}
          className="p-2 border"
        >
          {tab.title}
        </span>
      ))}
      <br />
      <div className="p-2 border mt-2 h-[300px]">
        <ActiveTabComp data={data} setData={setData} error={error} />
      </div>
      <div>
        {activeTab > 0 && <button onClick={handlePrev}>Prev</button>}
        {activeTab < tabs.length - 1 && (
          <button onClick={handleNext}>Next</button>
        )}
        {activeTab === tabs.length - 1 && (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </>
  );
};

export default TabForm;
