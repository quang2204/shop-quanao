import { Spin } from "antd";
import { useColors } from "../../../Hook/useColor";

const ColorList = () => {
  const { colors, isLoading } = useColors();

  if (isLoading) {
    return <Spin size="large" className="h-[50vh] mt-[100px] flex items-center justify-center w-full" />;
  }

  if (!colors || colors.length === 0) {
    return <p className="text-center text-muted">Không có màu nào được tìm thấy.</p>;
  }

  return (
    <div className="container">
      <h2 className="text-center my-4">Danh sách màu sắc</h2>
      <ul className="list-group">
        {colors.map((color) => (
          <li key={color.id} className="list-group-item">{color.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ColorList;
