import { useState } from "react";

const useQuantity = () => {
  const [number, setNumber] = useState(1);
  const [inputValue, setInputValue] = useState("1");

  const increaseNumber = () => {
    const newCount = number + 1;
    setNumber(newCount);
    setInputValue(newCount.toString()); // Cập nhật ô input
  };

  const decreaseNumber = () => {
    if (number > 0) {
      const newCount = number - 1;
      setNumber(newCount);
      setInputValue(newCount.toString()); // Cập nhật ô input
    }
  };
  const numberDirectly = (input) => {
    setInputValue(input);
    // Cập nhật count theo giá trị nhập vào nếu là số hợp lệ
    const numericValue = parseInt(input, 10);
    if (!isNaN(numericValue) && numericValue >= 0) {
      setNumber(numericValue);
    }
  };
  const handleBlur = () => {
    // Cập nhật số lượng nếu giá trị nhập vào hợp lệ khi mất tiêu điểm
    const numericValue = parseInt(inputValue, 10);
    if (!isNaN(numericValue) && numericValue >= 1) {
      setNumber(numericValue);
    } else {
      numberDirectly(number);
    }
  };
  return {
    increaseNumber,
    decreaseNumber,
    number,
    numberDirectly,
    inputValue,
    handleBlur,
  };
};

export default useQuantity;
