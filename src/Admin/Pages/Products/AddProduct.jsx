import { useEffect, useRef, useState } from "react";
import { Form, Input, Select, Spin, TreeSelect, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCategory } from "../../../Hook/useCategory.jsx";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";
import { addProduct, addProductGallerie } from "../../../Apis/Api.jsx";
import { useMutation, useQueryClient } from "react-query";
import { useColors } from "../../../Hook/useColor.jsx";
import { useSizes } from "../../../Hook/useSize.jsx";
// import { useAddProduct, useAddProductGalleries } from "../../../Hook/useProduct.jsx";
// import { Link } from "react-router-dom";

const AddProduct = () => {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const { category, isCategory } = useCategory();
  const [tabs, setTabs] = useState("section1");
  const [classify, setClassify] = useState(false);
  const [classify1, setClassify1] = useState(false);
  const [select, setSelect] = useState("");
  const [select1, setSelect1] = useState("");
  const [fileList, setFileList] = useState([]);
  const { colors, isLoading: isLoadingColor } = useColors();
  const { sizes, isLoadingSize } = useSizes();
  // const { mutate } = useAddProduct();
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => addProduct(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      message.success("Thêm sản phẩm thành công");
      addProductGalleries(data.product.id);
      // navigate("/admin");
    },
    onError: (error) => {
      message.error(error.response.data.error);
    },
  });
  const productGalleries = {
    images: fileList.map((item) => item.url),
  };
  const { mutate: addProductGalleries, isLoading: isAddingGalleries } =
    useMutation({
      mutationFn: (id) => addProductGallerie(id, productGalleries),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["productsGalleries"] });
      },
      onError: (error) => {
        message.error(error.response.data.error);
      },
    });

  const [types, setTypes] = useState([
    {
      id: 0,
      type: "",
    },
  ]);
  const [types1, setTypes1] = useState([
    {
      id: 0,
      type: "",
    },
  ]);
  const [classifys, setClassifys] = useState([
    {
      id: 0,
    },
  ]);
  const [classifys1, setClassifys1] = useState([
    {
      id: 0,
    },
  ]);

  const [selectedIds, setSelectedIds] = useState([0]);
  const [selectedvalue, setSelectedvalue] = useState([]);
  const [selectedIds1, setSelectedIds1] = useState([0]);
  const [selectedvalue1, setSelectedvalue1] = useState([]);
  const handleScroll = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
    setTabs(ref.current.id);
  };
  useEffect(() => {
    window.scrollTo({
      top: tabs === "section1" ? 10 : 600,
      behavior: "smooth",
    });
  }, [tabs]);
  const [value, setValue] = useState();
  const [fileList1, setFileList1] = useState([]);
  const handleSelect = (index, value) => {
    const id = value;

    // Kiểm tra nếu id đã tồn tại => không cho tạo mới
    if (classifys.some((item) => item.id === id)) {
      return; // Dừng hàm ngay nếu id đã tồn tại
    }

    // Loại bỏ id = 0 nếu id mới > 0
    let newClassifys =
      id !== 0 ? classifys.filter((item) => item.id !== 0) : classifys;
    let newSelectedIds =
      id > 0 ? selectedIds.filter((item) => item !== 0) : selectedIds;
    let newSelectedValues =
      id > 0
        ? selectedvalue.filter((item, i) => selectedIds[i] !== 0)
        : selectedvalue;
    let newTypes = id > 0 ? types.filter((item) => item.id !== 0) : types;

    // Thêm mục đã chọn
    newClassifys = [...newClassifys, { id }];
    newSelectedIds = [...newSelectedIds, id];
    newSelectedValues = [...newSelectedValues, value].filter(
      (item) => item !== ""
    ); // Loại bỏ giá trị rỗng
    newTypes = [...newTypes, { id, type: value }];

    // Nếu không có ô trống nào, thêm một ô trống mới (id = 0)
    if (!newSelectedValues.includes("")) {
      newClassifys.push({ id: 0 });
      newSelectedIds.push(0);
      newTypes.push({ id: 0, type: "" });
    }

    // Cập nhật state
    setClassifys(newClassifys);
    setSelectedIds(newSelectedIds);
    setSelectedvalue(newSelectedValues);
    setTypes(newTypes);
  };

  const handleSelect1 = (index, value) => {
    const id = value; // Lấy id từ value
    if (classifys1.some((item) => item.id === id)) return;
    // Loại bỏ id = 0 nếu id mới > 0
    let newClassifys =
      id > 0 ? classifys1.filter((item) => item.id !== 0) : classifys1;
    let newSelectedIds =
      id > 0 ? selectedIds1.filter((item) => item !== 0) : selectedIds1;
    let newSelectedValues =
      id > 0
        ? selectedvalue1.filter((item, i) => selectedIds1[i] !== 0)
        : [...selectedvalue1];
    let newTypes = id > 0 ? types1.filter((item) => item.id !== 0) : types1;

    // Thêm mục đã chọn và một ô trống
    newClassifys = [...newClassifys, { id }];
    newSelectedIds = [...newSelectedIds, id];
    newSelectedValues = [...newSelectedValues, value].filter(
      (item) => item !== ""
    ); // Loại bỏ giá trị rỗng
    newTypes = [...newTypes, { id, type: value }];

    // Nếu chưa có ô trống nào, thêm một ô trống mới
    if (!newSelectedValues.includes("")) {
      newClassifys.push({ id: 0 });
      newSelectedIds.push(0);
      newTypes.push({ id: 0, type: "" });
    }

    // Cập nhật state
    setClassifys1(newClassifys);
    setSelectedIds1(newSelectedIds);
    setSelectedvalue1(newSelectedValues);
    setTypes1(newTypes);
  };

  const transformToTreeData = (data) => {
    return data?.map((items) => {
      return {
        // selectable: false,
        value: items.id,
        title: items.name,
      };
    });
  };

  const treeData = transformToTreeData(category?.data);
  const onChange = (newValue) => {
    setValue(newValue);
  };
  const onPopupScroll = () => {
    // console.log("onPopupScroll", e);
  };
  const onhandluploadimg = (e) => {
    let newFileList = [...e.fileList];

    // Nếu upload thành công, cập nhật URL
    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.url; // URL trả về từ server
      }
      return file;
    });

    setFileList(newFileList);
    // setImg(!img);
  };
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Chỉ được tải lên định dạng ảnh!");
    }
    return isImage || Upload.LIST_IGNORE;
  };
  const handleDeleteSelect = () => {
    setClassify(false);
    setSelectedIds([]);
    setClassifys([
      {
        id: 0,
      },
    ]);
    setSelectedvalue([]);
    setSelect("");
  };
  useEffect(() => {
    if (classify === false && classify1 === false) {
      setTypes([
        {
          id: 0,
          type: "",
        },
      ]);
    }
  }, [classify, classify1]);

  const handleDeleteSelect1 = () => {
    setClassify1(false);
    setSelectedIds1([]);
    setClassifys1([
      {
        id: 0,
      },
    ]);
    setSelect1("");
    setSelectedvalue1([]);
    const check = selectedvalue ? selectedvalue : selectedvalue1;
    const result = check.map((item, index) => ({
      id: index,
      type: item,
    }));
  };
  const onhandluploadimgPl = (e) => {
    let newFileList = [...e.fileList];

    // Nếu upload thành công, cập nhật URL
    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.url; // URL trả về từ server
      }
      return file;
    });

    setFileList1(newFileList);
    // setImg(!img);
  };
  const onSearch = () => {
    // console.log("search:", value);
  };
  const handleDelete = (id) => {
    if (selectedIds.length > 2) {
      setSelectedIds([]);
    } else {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    }
    setTypes(types.filter((item) => item.id !== id));
    setClassifys(classifys.filter((item) => item.id !== id));
    setSelectedvalue(selectedvalue.filter((_, i) => i !== id));
  };
  const handleDelete1 = (id) => {
    if (selectedIds1.length > 2) {
      setSelectedIds1([]);
    } else {
      setSelectedIds1(selectedIds1.filter((item) => item !== id));
    }
    setTypes(types.filter((item) => item.id !== id));
    setClassifys1(classifys.filter((item) => item.id !== id));
    setSelectedvalue1(selectedvalue.filter((_, i) => i !== id));
  };

  const onSubmit = (data) => {
    const variants = [];
    let index = 0;
    // while (data[`price${index}`] !== undefined) {
    //   // Dynamically check and assign the `colorselect` field
    //   const color =
    //     data[`select${index + 1}`] === "color" ? selectedvalue[`${index}`] : "";
    //   const size = data[`select2`] === "size" ? selectedvalue1[`${index}`] : "";
    //   variants.push({
    //     color, // Include colorselect if applicable
    //     size,
    //     price: data[`price-${index}`],
    //     quantity: data[`quantity-${index}`],
    //     imgUrl: data[`imgUrl-${index}`].fileList[0].url,
    //   });
    //   index++;
    // }
    const product = {
      name: data.productName,
      // price: data.price,
      category_id: data.categoryId,
      // albumImg: data.ablumImg.fileList.map((item) => item.url),
      img_thumb: data.ablumImg.fileList.map((item) => item.url)[0],
      description: data.description,
      slug: data.slugName,
      is_active: true,
      // variants: variants,
    };

    mutate(product);
  };
  const validateFileList = () => {
    if (fileList.length < 1) {
      return Promise.reject(new Error("Vui lòng tải lên ít nhất 5 hình ảnh"));
    }
    return Promise.resolve();
  };

  if (isCategory) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
      />
    );
  }
  return (
    <>
      <section className="grid grid-cols-12 gap-4 px-4">
        <div
          className="col-span-3 bg-white rounded-xl h-[220px] "
          style={{ boxShadow: "0px 0px 4px 1px #d1d1d1" }}
        >
          <div
            className="text-[1.1rem] rounded-t-xl py-3 px-2 bg-[#E5EEFB] "
            style={{ boxShadow: "inset 0 3px 0 #2673dd" }}
          >
            Gợi ý điền Thông tin
          </div>
          <div className="mt-3">
            <div className="flex items-center mb-2 px-3 gap-2">
              <i className="fa fa-check-circle text-[#d1d2d4] text-xl"></i>
              <div className="text-[1rem]"> Thêm ít nhất 5 hình ảnh</div>
            </div>
            <div className="flex items-center mb-2 px-3 gap-2">
              <i className="fa fa-check-circle text-[#d1d2d4] text-xl"></i>
              <div className="text-[1rem]">
                Tên sản phẩm có ít nhất 15~100 kí tự
              </div>
            </div>
            <div className="flex items-center mb-2 px-3 gap-2">
              <i className="fa fa-check-circle text-[#d1d2d4] text-xl"></i>
              <div className="text-[1rem] text-left">
                Thêm ít nhất 100 kí tự hoặc 1 hình ảnh trong mô tả sản phẩm
              </div>
            </div>
          </div>
        </div>
        <section className="col-span-9" ref={section1Ref} id="section1">
          <div
            className="  bg-white rounded-xl z-50 "
            style={{ boxShadow: "0px 0px 4px 1px #d1d1d1" }}
          >
            <div className="relative">
              <div
                className="tabs flex w-full justify-between flex-none "
                style={{ transform: "translateX(0px)" }}
              >
                <button
                  className={`${tabs === "section1" ? "active" : ""} tab`}
                  onClick={() => handleScroll(section1Ref)}
                >
                  Thông tin cơ bản
                </button>

                <button
                  // href={"/admin/addproduct/#chitiet"}

                  className={`${tabs === "section2" ? "active" : ""} tab`}
                  onClick={() => handleScroll(section2Ref)}
                >
                  Thông tin bán hàng
                </button>
              </div>
              <div
                className="tab-link-bar"
                style={{
                  transform: `translateX(${tabs === "section1" ? "0" : "760"}px)`,
                  width: "130px",
                }}
              ></div>
            </div>
          </div>
          <Form onFinish={onSubmit}>
            <section>
              <section
                className={`bg-white mt-10 px-4 rounded-xl  py-2 text-left`}
                style={{ boxShadow: "0px 0px 4px 1px #d1d1d1" }}
              >
                <div className=" text-[1.5rem] font-bold">Thông tin cơ bản</div>
                <div className="grid grid-cols-12 gap-4 ">
                  <div className="flex gap-1 mt-4 mb-2 col-span-2 justify-end">
                    <span className="text-red-500 h-[17px] ">*</span>
                    <div className="text-[1rem] ">Hình ảnh sản phẩm</div>
                  </div>
                  <Form.Item
                    name="ablumImg"
                    className="col-span-10 mt-4"
                    rules={[
                      {
                        validator: validateFileList,
                      },
                    ]}
                  >
                    <Upload
                      action={
                        "https://api.cloudinary.com/v1_1/dkrcsuwbc/image/upload"
                      }
                      listType="picture-card"
                      data={{
                        upload_preset: "image1",
                      }}
                      accept="image/*"
                      beforeUpload={beforeUpload}
                      maxCount={5}
                      onChange={(e) => onhandluploadimg(e)}
                    >
                      {fileList.length < 5 && (
                        <button
                          style={{
                            border: 0,
                            background: "none",
                          }}
                          type="button"
                        >
                          <PlusOutlined />
                          <div
                            style={{
                              marginTop: 8,
                              color: "red",
                            }}
                          >
                            Image {fileList.length} / 5
                          </div>
                        </button>
                      )}
                    </Upload>
                  </Form.Item>
                </div>
                <div className="grid grid-cols-12 mb-4 gap-4">
                  <div className="flex gap-1  mb-2 col-span-2 justify-end">
                    <span className="text-red-500 h-[17px] ">*</span>
                    <div className="text-[1rem]">Ảnh bìa</div>
                  </div>
                  <Upload
                    className="col-span-10"
                    action={
                      "https://api.cloudinary.com/v1_1/dkrcsuwbc/image/upload"
                    }
                    listType="picture-card"
                    data={{
                      upload_preset: "image1",
                    }}
                    disabled
                    fileList={fileList[0] ? [fileList[0]] : []}
                  >
                    {fileList.length < 1 && (
                      <button
                        style={{
                          border: 0,
                          background: "none",
                        }}
                        type="button"
                      >
                        <PlusOutlined />
                        <div
                          style={{
                            marginTop: 8,
                            color: "red",
                          }}
                        >
                          Image {fileList.length} / 1
                        </div>
                      </button>
                    )}
                  </Upload>
                </div>
                <div className="grid grid-cols-12 gap-4 mb-2">
                  <div className="text-[1rem] col-span-2 text-right">
                    <span className="text-red-500 h-[17px] ">*</span>
                    Tên sản phẩm
                  </div>
                  <Form.Item
                    className="col-span-10"
                    name="productName"
                    // label="Tên sản phẩm"
                    rules={[
                      {
                        required: true,
                        message: "Tên sản phẩm là bắt buộc!",
                      },
                      {
                        min: 3,
                        message: "Tên sản phẩm phải có ít nhất 3 ký tự!",
                      },
                      {
                        max: 50,
                        message: "Tên sản phẩm không được vượt quá 50 ký tự!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Tên sản phẩm"
                      className="col-span-10"
                    />
                  </Form.Item>
                </div>
                <div className="grid grid-cols-12 gap-4 mb-2">
                  <div className="text-[1rem] col-span-2 text-right">
                    <span className="text-red-500 h-[17px] ">*</span>
                    Slug
                  </div>
                  <Form.Item
                    className="col-span-10"
                    name="slugName"
                    // label="Tên sản phẩm"
                    rules={[
                      {
                        required: true,
                        message: "Slug là bắt buộc!",
                      },
                      {
                        min: 3,
                        message: "Slug phải có ít nhất 3 ký tự!",
                      },
                      {
                        max: 50,
                        message: "Slug không được vượt quá 50 ký tự!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Slug sản phẩm"
                      className="col-span-10"
                    />
                  </Form.Item>
                </div>
                <div className="grid grid-cols-12  gap-4 mb-2">
                  <div className="text-[0.99rem] col-span-2 text-right">
                    <span className="text-red-500 h-[17px] ">*</span>
                    Nghành hàng
                  </div>
                  <Form.Item
                    className="col-span-10"
                    name="categoryId"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn một mục!",
                      },
                    ]}
                  >
                    <TreeSelect
                      size="large"
                      className="col-span-10"
                      showSearch
                      value={value}
                      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                      placeholder="Vui lòng chọn ngành hàng"
                      allowClear
                      treeDefaultExpandAll
                      onChange={onChange}
                      treeData={treeData}
                      onPopupScroll={onPopupScroll}
                    />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-12 gap-4 mb-4">
                  <div className="text-[0.99rem] col-span-2 text-right">
                    <span className="text-red-500 h-[17px] ">*</span>
                    Mô tả
                  </div>
                  <Form.Item
                    name="description"
                    className=" col-span-10"
                    rules={[
                      {
                        required: true,
                        message: "Mô tả là bắt buộc!",
                      },
                      {
                        min: 100,
                        message: "Mô tả phải có ít nhất 100 ký tự!",
                      },
                      {
                        max: 250,
                        message: "Mô tả phải có không quá 250 ký tự!",
                      },
                    ]}
                  >
                    <TextArea
                      rows={5}
                      placeholder="Mô tả"
                      style={{ resize: "none" }}
                    />
                  </Form.Item>

                  <section ref={section2Ref} id="section2"></section>
                </div>
              </section>
              <br />
            </section>
            <section
              className="bg-white px-4 rounded-xl mt-1 py-2 text-left mb-24"
              style={{ boxShadow: "0px 0px 4px 1px #d1d1d1" }}
            >
              <div>
                <div className=" text-[1.5rem] font-bold">
                  Thông tin bán hàng
                </div>
                <div className="mt-7">
                  <div className="grid grid-cols-12 gap-4 items-start">
                    <div className="flex items-center justify-end gap-2 col-span-2">
                      <div>
                        <div className="eds-badge-x"></div>
                        <div className="eds-badge-x-static"></div>
                      </div>
                      <div className="text-[0.99rem] -mt-3 ">
                        Phân loại hàng
                      </div>
                    </div>
                    <div className="col-span-10">
                      {classify === false ? (
                        <button
                          className="-mt-3 border-2 mb-6 border-gray-400 px-3 text-[#ee4d2d]
                   py-2 rounded-md border-dotted text-[0.99rem]"
                          onClick={() => setClassify(true)}
                          type="button"
                        >
                          + Thêm nhóm phân loại
                        </button>
                      ) : (
                        <div className="bg-[#f5f5f5] p-4 rounded-lg mb-4">
                          <div className="flex items-center gap-4 justify-content-between mb-3">
                            <div className="flex gap-4">
                              <div className="text-[1.04rem]">Phân loại 1</div>
                              <Form.Item
                                name="select1"
                                rules={[
                                  {
                                    required: true,
                                    message: "Vui lòng chọn một mục!",
                                  },
                                ]}
                              >
                                <Select
                                  showSearch
                                  placeholder="Select a person"
                                  optionFilterProp="label"
                                  className="min-w-[200px]"
                                  onChange={(value) => setSelect(value)}
                                  onSearch={onSearch}
                                  options={[
                                    {
                                      value: "color",
                                      label: "Màu sắc",

                                      disabled: select1 === "color",
                                    },
                                    {
                                      value: "size",
                                      label: "Size",
                                      disabled: select1 === "size",
                                    },
                                  ]}
                                />
                              </Form.Item>
                            </div>

                            <button
                              className="text-[#ee4d2d] text-[1.4rem]"
                              type="button"
                              onClick={handleDeleteSelect}
                            >
                              X
                            </button>
                          </div>

                          <div className="flex items-center gap-10">
                            <div className="text-[1rem]">Tùy chọn</div>
                            <div className="grid grid-cols-2 gap-4">
                              {classifys.map((item, index) => (
                                <div
                                  key={item.id || `new-${index}`}
                                  className={item.id}
                                >
                                  {" "}
                                  {/* Xử lý key cho item có id = 0 */}
                                  <Select
                                    showSearch
                                    placeholder={`Select a ${select}`}
                                    optionFilterProp="label"
                                    className="min-w-[200px]"
                                    onChange={(value) =>
                                      handleSelect(index + 1, value)
                                    }
                                    onSearch={onSearch}
                                    options={
                                      select === "color"
                                        ? colors?.data?.map((colorItem) => ({
                                            value: colorItem.id,
                                            label: colorItem.name,
                                            disabled: selectedvalue.includes(
                                              colorItem.id
                                            ),
                                          })) || []
                                        : select === "size"
                                          ? sizes?.data?.map((sizeItem) => ({
                                              value: sizeItem.id,
                                              label: sizeItem.name,
                                              disabled: selectedIds.includes(
                                                sizeItem.id
                                              ),
                                            })) || []
                                          : []
                                    }
                                    value={selectedvalue[index] || undefined}
                                  />
                                  {classifys.length > 1 && (
                                    <button
                                      onClick={() =>
                                        handleDelete(index, item.id)
                                      }
                                    >
                                      <i className="fa fa-trash text-[#ee4d2d] text-[17px]"></i>
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {classify1 && (
                        <div className="bg-[#f5f5f5] p-4 rounded-lg mb-10">
                          <div className="flex items-center gap-4 justify-content-between mb-3">
                            <div className="flex items-center gap-4">
                              <div className="text-[1.04rem]">
                                Phân loại {classify === false ? "1" : "2"}
                              </div>

                              <Form.Item
                                name="select2"
                                rules={[
                                  {
                                    required: true,
                                    message: "Vui lòng chọn một mục!",
                                  },
                                ]}
                              >
                                <Select
                                  showSearch
                                  placeholder="Select a person"
                                  optionFilterProp="label"
                                  className="min-w-[200px]"
                                  onChange={(value) => setSelect1(value)}
                                  onSearch={onSearch}
                                  options={[
                                    {
                                      value: "color",
                                      label: "Màu sắc",
                                      disabled: select === "color",
                                    },
                                    {
                                      value: "size",
                                      label: "Size",
                                      disabled: select === "size",
                                    },
                                  ]}
                                />
                              </Form.Item>
                            </div>

                            <button
                              className="text-[#ee4d2d] text-[1.4rem]"
                              type="button"
                              onClick={handleDeleteSelect1}
                            >
                              X
                            </button>
                          </div>

                          <div className="flex items-center gap-8">
                            <div className="text-[1rem]">Tùy chọn</div>
                            <div className="grid grid-cols-2 gap-4">
                              {classifys1.map((item, index) => (
                                <div key={index}>
                                  <Select
                                    showSearch
                                    placeholder={`Select a ${select}`}
                                    optionFilterProp="label"
                                    className="min-w-[200px]"
                                    onChange={(value) =>
                                      handleSelect1(index + 1, value)
                                    }
                                    onSearch={onSearch}
                                    options={
                                      select1 === "color"
                                        ? colors?.data?.map((colorItem) => ({
                                            value: colorItem.id,
                                            label: colorItem.name,
                                            disabled: selectedvalue1.includes(
                                              colorItem.name
                                            ),
                                          })) || []
                                        : select1 === "size"
                                          ? sizes?.data?.map((sizeItem) => ({
                                              value: sizeItem.id,
                                              label: sizeItem.name,
                                              disabled: selectedIds1.includes(
                                                sizeItem.id
                                              ),
                                            })) || []
                                          : []
                                    }
                                    value={selectedvalue1[index] || undefined}
                                  />
                                  {classifys1.length > 1 && (
                                    <button
                                      type="button"
                                      className="ml-3"
                                      onClick={() => handleDelete1(index)}
                                    >
                                      <i className="fa fa-trash text-[#ee4d2d] text-[17px]"></i>
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      {classify && classify1 === false && (
                        <button
                          className="-mt-3 mb-6 border-2 border-gray-400 px-3 text-[#ee4d2d]
                   py-2 rounded-md border-dotted text-[0.99rem]"
                          onClick={() => setClassify1(true)}
                          type="button"
                        >
                          + Thêm nhóm phân loại 2
                        </button>
                      )}
                    </div>
                  </div>
                  {/* {classify === false && classify1 === false && (
                    <div>
                      <div className="grid grid-cols-12 gap-4 mb-3">
                        <div className=" text-[1.03rem] col-span-2 text-right">
                          Giá <span className="text-red-500">*</span>
                        </div>
                        <Form.Item
                          className="col-span-10"
                          name="price"
                          rules={[
                            {
                              required: true,
                              message: "Vui lọc nhập giá",
                            },
                            {
                              validator: (_, value) =>
                                value && value > 1000
                                  ? Promise.resolve()
                                  : Promise.reject(
                                      new Error("Giá phải lớn hơn 1.000")
                                    ),
                            },
                          ]}
                        >
                          <div>
                            <Input
                              type="number"
                              size="large"
                              className="w-[40%] "
                              min={1}
                              // value={price}
                              // onChange={(e) => setPrice(e.target.value)}
                              placeholder="Nhập giá"
                            />
                          </div>
                        </Form.Item>
                      </div>
                      <div className="grid grid-cols-12 gap-4 pb-3">
                        <div className=" text-[1.03rem] col-span-2 text-right">
                          Kho hàng <span className="text-red-500">*</span>
                        </div>
                        <Form.Item
                          className="col-span-10"
                          name="quantity"
                          rules={[
                            {
                              required: true,
                              message: "Vui lọc nhập kho hàng",
                            },
                            {
                              validator: (_, value) =>
                                value && value > 0
                                  ? Promise.resolve()
                                  : Promise.reject(
                                      new Error("Kho hàng phải lớn hơn 0")
                                    ),
                            },
                          ]}
                        >
                          <div>
                            <Input
                              type="number"
                              size="large"
                              className="w-[40%] "
                              min={1}
                              // value={price}
                              // onChange={(e) => setPrice(e.target.value)}
                              placeholder="Nhập kho hàng"
                            />
                          </div>
                        </Form.Item>
                      </div>
                    </div>
                  )} */}
                  {(classify === true || classify1 === true) && (
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-2 text-right text-[1rem]">
                        Danh sách phân loại hàng
                      </div>
                      <div className="col-span-7 flex">
                        <Input
                          type="number"
                          size="large"
                          className="w-[100%] "
                          min={0}
                          style={{
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                          }}
                          // value={price}
                          // onChange={(e) => setPrice(e.target.value)}
                          placeholder="Giá"
                        />
                        <Input
                          type="number"
                          size="large"
                          className="w-[100%]"
                          min={0}
                          style={{
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                          }}
                          // value={price}
                          // onChange={(e) => setPrice(e.target.value)}
                          placeholder="Kho hàng"
                        />
                      </div>
                      <div className="col-span-3">
                        <button
                          className=" px-[13px] text-white bg-[#ee4d2d] py-2 rounded-md  text-[0.99rem]"
                          type="button"
                        >
                          Áp dụng cho tất cả phân loại
                        </button>
                      </div>
                    </div>
                  )}

                  {(classify1 || classify) && (
                    <div className="grid grid-cols-12 gap-4 items-center mt-3">
                      <div className="col-span-2 text-right"></div>
                      <div className="col-span-10  text-[1rem]">
                        <div className="flex bg-[#F5F5F5] ">
                          <div
                            className="min-w-[100px] border-[1px] p-3 border-[#EBEBEB] border-solid"
                            style={{
                              borderTopLeftRadius: "10px",
                            }}
                          >
                            {select || select1 ? (
                              <div>{select || select1}</div>
                            ) : (
                              <div>Phân loại</div>
                            )}
                          </div>
                          {selectedvalue.length > 0 &&
                            selectedvalue1.length > 0 && (
                              <div
                                className="flex-[1_0_101px] flex justify-center border-[1px] p-3 border-[#EBEBEB]
                        border-solid"
                              >
                                {select1 || select ? (
                                  <div>{select1 || select}</div>
                                ) : (
                                  <div>Phân loại</div>
                                )}
                              </div>
                            )}

                          <div className="flex w-[100%] ">
                            <div
                              className="flex-[1_0_202px] rounded-none flex justify-center border-y-[1px]
                         p-3 rounded-s border-[#EBEBEB] border-solid"
                            >
                              Giá <span className="text-red-500">*</span>
                            </div>
                            <div
                              className="flex-[1_0_202px] flex justify-center border-[1px]
                         p-3 rounded-s border-[#EBEBEB] border-solid"
                              style={{
                                borderTopRightRadius: "10px",
                              }}
                            >
                              Kho hàng <span className="text-red-500">*</span>
                            </div>
                          </div>
                        </div>
                        {types
                          .filter((item) => item.id !== 0) // Lọc ra các item có id khác 0
                          .map((item, index) => (
                            <div
                              className="border-[#EBEBEB] border-solid border-[1px] last:rounded-b-xl"
                              key={index}
                            >
                              <div className="flex items-center">
                                <div className="min-w-[100px]  border-e-[1px]  p-3 ">
                                  <div className="flex items-center gap-4">
                                    <div>
                                      {selectedvalue[index] ||
                                        selectedvalue1[index]}
                                    </div>
                                  </div>
                                </div>
                                {select1 &&
                                  select &&
                                  selectedvalue.length > 0 &&
                                  selectedvalue1.length > 0 && (
                                    <div className="min-w-[100px] flex justify-center  border-e-[1px] ">
                                      <div>
                                        {selectedvalue1.map((item, index) => (
                                          <div
                                            className="type text-center "
                                            key={index}
                                          >
                                            {item}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                <div className="flex w-[100%] ">
                                  <div
                                    className="flex-[1_0_205px]  flex justify-center border-e-[1px]
                         px-3 py-[2.5rem] rounded-s border-[#EBEBEB] border-solid"
                                  >
                                    <Form.Item
                                      name={`price${index}`}
                                      rules={[
                                        {
                                          required: true,
                                          message: "Vui lọc nhập giá",
                                        },
                                        {
                                          validator: (_, value) =>
                                            value && value > 1000
                                              ? Promise.resolve()
                                              : Promise.reject(
                                                  new Error(
                                                    "Giá phải lớn hơn 1.000"
                                                  )
                                                ),
                                        },
                                      ]}
                                    >
                                      <Input
                                        type="number"
                                        size="large"
                                        className="w-[100%] max-h-[40px]"
                                        min={0}
                                        // value={price}
                                        // onChange={(e) => setPrice(e.target.value)}
                                        placeholder="Giá"
                                      />
                                    </Form.Item>
                                  </div>
                                  <div
                                    className="flex-[1_0_205px]  flex justify-center border-e-[1px]
                         px-3 py-[2.5rem] rounded-s border-[#EBEBEB] border-solid"
                                  >
                                    <Form.Item name={`quantity-${index}`}>
                                      <Input
                                        type="number"
                                        size="large"
                                        className="w-[100%] max-h-[40px]"
                                        min={0}
                                        // value={price}
                                        // onChange={(e) => setPrice(e.target.value)}
                                        placeholder="Kho hàng"
                                      />
                                    </Form.Item>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
            <div
              className="flex gap-4 justify-content-end bg-white p-3 rounded-lg mb-1 text-[1rem] fixed bottom-0 w-[60%]"
              style={{ boxShadow: "rgb(209, 209, 209) 0px 0px 4px 1px" }}
            >
              <button className="py-2 px-4 bg-white border-2 border-[#EBEBEB] rounded-lg border-solid text-black">
                Hủy
              </button>
              <button className="py-2 px-4 bg-white border-2 border-red-400 rounded-lg border-solid text-black">
                Lưu và ẩn
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-red-600 border-2 border-red-400 rounded-lg border-solid text-white"
              >
                Lưu và hiển thị
              </button>
            </div>
          </Form>
        </section>
      </section>
    </>
  );
};

export default AddProduct;
