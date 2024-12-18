import React, { useState } from "react";
import { Select } from "antd"; // Nếu bạn dùng thư viện Ant Design

const MyComponent = () => {
  const [classifys, setClassifys] = useState([{ id: 1 }]); // Khởi tạo với một phần tử

  const handleSelect = () => {
    console.log(classifys);
    const newItem = { id: classifys.length + 1 }; // Tạo phần tử mới với ID duy nhất
    setClassifys([...classifys, newItem]); // Thêm phần tử mới vào mảng
  };

  // const handleSelect = (index, value) => {
  //   console.log(`Selected value for item ${index}:`, value);
  // };

  const onSearch = (value) => {
    console.log("Searching:", value);
  };

  return (
    <div className="mt-[100px]">
      {classifys.map((item) => (
        <div key={item.id}>
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="label"
            className="min-w-[200px]"
            onChange={(value) => handleSelect()}
            onSearch={onSearch}
            options={[
              {
                value: "color" === "color" ? "đỏ" : "m",
                label: "color" === "color" ? "Đỏ" : "M",
              },
              {
                value: "color" === "color" ? "vàng" : "s",
                label: "color" === "color" ? "Vàng" : "S",
              },
            ]}
          />
        </div>
      ))}
      {/*<button onClick={addNewItem} className="mt-4 p-2 bg-blue-500 text-white">*/}
      {/*  Thêm mới*/}
      {/*</button>*/}
    </div>
  );
};

export default MyComponent;
