import { useEffect, useRef, useState } from "react";
import { Form, Input, Select, Spin, TreeSelect, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCategory } from "../../../Hook/useCategory.jsx";
import TextArea from "antd/es/input/TextArea";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateProduct,
  updateProductGallerie,
  updateProductVariants,
} from "../../../Apis/Api.jsx";
import { useMutation, useQueryClient } from "react-query";
import { useColors } from "../../../Hook/useColor.jsx";
import { useSizes } from "../../../Hook/useSize.jsx";
import {
  useDetailProduct,
  useProductGalleries,
  useProductVariants,
} from "../../../Hook/useDetailProduct.jsx";
const UpdateProduct = () => {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const { id } = useParams();
  const { category, isCategory } = useCategory();
  const [tabs, setTabs] = useState("section1");
  const [classify, setClassify] = useState(false);
  const [classify1, setClassify1] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const [form] = Form.useForm();
  const [select, setSelect] = useState("");
  const [select1, setSelect1] = useState("");
  const { detailProduct, isDetailProduct } = useDetailProduct();
  const { isProductVariants, productVariant } = useProductVariants();
  const { productGallerie, isproductGalleries } = useProductGalleries();
  const { colors, isLoading: isLoadingColor } = useColors();
  const { sizes, isLoadingSize } = useSizes();
  const [valueVariants, setvalueVariants] = useState();
  const [selectedIds, setSelectedIds] = useState([0]);
  const [selectedvalue, setSelectedvalue] = useState([]);
  const [selectedIds1, setSelectedIds1] = useState([0]);
  const [selectedvalue1, setSelectedvalue1] = useState([]);
  const [types, setTypes] = useState([
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
  const [types1, setTypes1] = useState([
    {
      id: 0,
      type: "",
    },
  ]);
  const [priceAll, setpriceAll] = useState();
  // const { mutate } = useAddProduct();
  const queryClient = useQueryClient();
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    if (!productVariant || productVariant.length === 0) return;

    const product = productVariant.variants[0].product;

    // Set các field cố định
    form.setFieldsValue({
      productName: product?.name,
      categoryId: product?.category_id,
      description: product?.description,
    });

    // Set dynamic fields (giá, giá sale, số lượng)
    const dynamicFields = {};
    const validSizes = selectedvalue1.filter((item) => item !== 0);
    const validColors = selectedvalue.filter((item) => item !== 0);

    validColors.forEach((_, outerIndex) => {
      validSizes.forEach((_, innerIndex) => {
        const priceIndex = outerIndex * validSizes.length + innerIndex;
        const priceData = priceAll[priceIndex];

        dynamicFields[`price-${outerIndex}-${innerIndex}`] =
          priceData?.price ?? 0;
        dynamicFields[`pricesale-${outerIndex}-${innerIndex}`] =
          priceData?.price_sale ?? 0;
        dynamicFields[`quantity-${outerIndex}-${innerIndex}`] =
          priceData?.quantity ?? 0;
      });
    });

    form.setFieldsValue(dynamicFields);
  }, [productVariant, priceAll, selectedvalue1, selectedvalue]);

  useEffect(() => {
    if (productGallerie?.length > 0) {
      const images = productGallerie.map((item, index) => ({
        uid: `-${index + 1}`,
        name: `image${index + 1}.png`,
        status: "done",
        url: item.image,
      }));
      setFileList(images);
    }
  }, [productGallerie]);
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => updateProduct(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      updateProductGalleries();
      updateProductVariant();
      message.success("Product update successful");
    },
    onError: (error) => {
      message.error(error.response.data.error);
    },
  });
  const maxLength = Math.max(productGallerie?.length, fileList?.length);
  const productGalleries = Array.from({ length: maxLength }, (_, index) => ({
    id: productGallerie[index]?.id || null, // Nếu không có ID thì đặt null (ảnh mới)
    image: fileList[index]?.url || "", // Nếu không có ảnh thì đặt ""
  })).filter((item) => item.image !== ""); // Loại bỏ phần tử nếu không có ảnh

  const itemproductGalleries = {
    galleries: productGalleries,
  };
  const { mutate: updateProductGalleries, isLoading: isAddingGalleries } =
    useMutation({
      mutationFn: () => updateProductGallerie(id, itemproductGalleries),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["productsGalleries"] });
      },
      onError: (error) => {
        message.error(error.response.data.error);
      },
    });
  const { mutate: updateProductVariant, isLoading: isAddingVariants } =
    useMutation({
      mutationFn: () => updateProductVariants(id, valueVariants),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["productsVariants", id] });
        navigate("/admin/products");
      },
      onError: (error) => {
        message.error(error.response.data.error);
      },
    });

  useEffect(() => {
    if (!id || !productVariant || productVariant.length === 0) return;
    setpriceAll([]);
    setClassifys([]);
    setSelectedvalue([]);
    setTypes([]);
    setClassifys1([]);
    setSelectedvalue1([]);
    setTypes1([]);

    if (!id || !productVariant) return;

    const extractUniqueItems = (items, getKeyValue, getDisplayValue) => {
      return Array.from(
        new Map(
          items?.map((item) => [getKeyValue(item), getDisplayValue(item)])
        ).values()
      );
    };

    const allSizes = productVariant?.variants?.flatMap(
      (variant) => variant.size || []
    );
    const priceAll = Array.from(
      new Map(
        productVariant?.variants?.map((variant) => [
          variant?.id,
          {
            quantity: variant.quantity,
            price: variant.price,
            price_sale: variant.price_sale,
          },
        ])
      ).values()
    );

    const allColors = productVariant?.variants?.flatMap(
      (variant) => variant.color || []
    );
    const uniqueSizes = extractUniqueItems(
      allSizes,
      (item) => item?.id,
      (item) => ({ id: item?.id, type: item?.name })
    );

    const sizeIds = extractUniqueItems(
      allSizes,
      (item) => item?.id,
      (item) => item?.id
    );

    const uniqueColors = extractUniqueItems(
      allColors,
      (item) => item?.id,
      (item) => ({ id: item?.id, type: item?.name })
    );

    const colorIds = extractUniqueItems(
      allColors,
      (item) => item?.id,
      (item) => item?.id
    );

    // Add default 0 option
    sizeIds.push(0);
    colorIds.push(0);
    // Set all states at once to prevent multiple re-renders
    setpriceAll(priceAll);
    setClassifys(colorIds);
    setSelectedvalue(colorIds);
    setTypes(uniqueColors);
    setClassifys1(sizeIds);
    setSelectedvalue1(sizeIds);
    setTypes1(uniqueSizes);
  }, [id, productVariant]); // Added productVariant to dependencies
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
    handleGenericSelect(
      index,
      value,
      classifys,
      setClassifys,
      selectedIds,
      setSelectedIds,
      selectedvalue,
      setSelectedvalue,
      types1,
      setTypes1
    );
  };
  const handleGenericSelect = (
    index,
    value,
    classifysState,
    setClassifysState,
    selectedIds,
    setSelectedIds,
    selectedValues,
    setSelectedValues,
    types,
    setTypes
  ) => {
    const id = value;

    let newClassifys = [...classifysState];
    let newSelectedIds = [...selectedIds];
    let newSelectedValues = [...selectedValues];
    let newTypes = [...types];

    // Cập nhật hoặc thêm tại đúng index
    newClassifys[index - 1] = id;
    newSelectedIds[index - 1] = id;
    newSelectedValues[index - 1] = value;
    newTypes[index - 1] = { id, type: value };

    // Nếu không có giá trị rỗng nào thì thêm dòng mới (0)
    const hasEmpty =
      newSelectedValues.includes("") || newSelectedValues.includes(0);
    if (!hasEmpty) {
      newClassifys.push(0);
      newSelectedIds.push(0);
      newSelectedValues.push(0);
      newTypes.push({ id: 0, type: "" });
    }

    setClassifysState(newClassifys);
    setSelectedIds(newSelectedIds);
    setSelectedValues(newSelectedValues);
    setTypes(newTypes);
  };

  const handleSelect1 = (index, value) => {
    handleGenericSelect(
      index,
      value,
      classifys1,
      setClassifys1,
      selectedIds1,
      setSelectedIds1,
      selectedvalue1,
      setSelectedvalue1,
      types1,
      setTypes1
    );
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

  const treeData = transformToTreeData(
    category?.data.filter((item) => item.is_active == 1)
  );
  const onPopupScroll = () => {
    // console.log("onPopupScroll", e);
  };
  const onhandluploadimg = (e) => {
    let newFileList = [...e.fileList];

    // Cập nhật URL nếu upload thành công
    newFileList = newFileList.map((file) => {
      if (file.response) {
        return {
          ...file,
          url: file.response.url, // URL trả về từ server
        };
      }
      return file;
    });

    // Tạo mảng images từ newFileList
    const images = newFileList.map((file) => ({
      uid: file.uid,
      name: file.name,
      status: file.status || "done",
      url: file.url || file.thumbUrl,
    }));

    setFileList(images);
  };
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Upload only image formats!");
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

  const onSearch = () => {
    // console.log("search:", value);
  };
  const handleDelete = (id) => {
    if (id !== 0) {
      if (selectedIds.length > 2) {
        setSelectedIds([]);
      } else {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
      // setTypes(types.filter((item) => item.id !== id));
      setClassifys(classifys.filter((item) => item !== id));
      setSelectedvalue(selectedvalue.filter((item) => item !== id));
    }
  };
  const handleDelete1 = (id) => {
    if (id !== 0) {
      if (selectedIds1.length > 2) {
        setSelectedIds1([]);
      } else {
        setSelectedIds1(selectedIds1.filter((item) => item !== id));
      }
      // setTypes(types.filter((item) => item.id !== id));
      setClassifys1(classifys1.filter((item) => item !== id));
      setSelectedvalue1(selectedvalue1.filter((item) => item !== id));
    }
  };

  const onSubmit = (data) => {
    let variants = [];
    // Kiểm tra nếu selectedvalue và selectedvalue1 có dữ liệu đúng
    const colors = selectedvalue;
    const sizes = selectedvalue1;
    const isColorFirst = data.select1 === "color";
    // Duyệt qua tất cả tổ hợp màu sắc và kích thước
    const filteredColors = colors.filter((color) => color !== 0);
    const filteredSizes = sizes.filter((size) => size !== 0);

    filteredColors.forEach((color_id, colorIndex) => {
      filteredSizes.forEach((size_id, sizeIndex) => {
        if (color_id === 0 || size_id === 0) return;

        // Xác định index cho key trong form data
        const outerIndex = isColorFirst ? colorIndex : sizeIndex;
        const innerIndex = isColorFirst ? sizeIndex : colorIndex;

        const variantData = productVariant.variants.find(
          (variant) =>
            variant.color_id === color_id && variant.size_id === size_id
        );

        const variant = {
          id: variantData?.id,
          color_id,
          size_id,
          price: Number(data[`price-${outerIndex}-${innerIndex}`]),
          quantity: Number(data[`quantity-${outerIndex}-${innerIndex}`]),
          price_sale: Number(data[`pricesale-${outerIndex}-${innerIndex}`]),
        };

        variants.push(variant);
      });
    });

    const productvariants = {
      variants: variants,
    };
    setvalueVariants(productvariants);
    const product = {
      name: data.productName,
      category_id: data.categoryId === undefined ? categoryId : data.categoryId,
      img_thumb:
        data.ablumImg?.fileList?.[0]?.url === undefined
          ? fileList[0]?.url
          : data.ablumImg?.fileList?.[0]?.url,
      description: data.description,
      // slug: data.slugName,
      is_active: true,
    };
    mutate(product);
  };

  const validateFileList = () => {
    if (fileList.length < 1) {
      return Promise.reject(new Error("Please upload at least 5 images"));
    }
    return Promise.resolve();
  };

  if (
    isCategory ||
    isAddingGalleries ||
    isAddingVariants ||
    isDetailProduct ||
    isproductGalleries ||
    isLoadingColor ||
    isLoadingSize ||
    isProductVariants
  ) {
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
        {/* <div
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
        </div> */}
        <section className="col-span-12" ref={section1Ref} id="section1">
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
                  Basic information
                </button>

                <button
                  // href={"/admin/addproduct/#chitiet"}

                  className={`${tabs === "section2" ? "active" : ""} tab`}
                  onClick={() => handleScroll(section2Ref)}
                >
                  Sales information
                </button>
              </div>
              <div
                className="tab-link-bar"
                style={{
                  transform: `translateX(${tabs === "section1" ? "0" : "1230"}px)`,
                  width: "150px",
                }}
              ></div>
            </div>
          </div>
          <Form onFinish={onSubmit} form={form}>
            <section>
              <section
                className={`bg-white mt-10 px-4 rounded-xl  py-2 text-left`}
                style={{ boxShadow: "0px 0px 4px 1px #d1d1d1" }}
              >
                <div className=" text-[1.5rem] font-bold">
                  Basic information
                </div>
                <div className="grid grid-cols-12 gap-4 ">
                  <div className="flex gap-1 mt-4 mb-2 col-span-2 justify-end">
                    <span className="text-red-500 h-[17px] ">*</span>
                    <div className="text-[1rem] ">Product Image</div>
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
                      fileList={fileList}
                      accept="image/*"
                      beforeUpload={beforeUpload}
                      maxCount={5}
                      onChange={(e) => onhandluploadimg(e)}
                    >
                      {fileList?.length < 5 && (
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
                    <div className="text-[1rem]">Cover photo</div>
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
                    fileList={fileList?.length > 0 ? [fileList[0]] : []}
                  >
                    {fileList?.length < 1 && (
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
                    Product Name
                  </div>
                  <Form.Item
                    className="col-span-10"
                    name="productName"
                    rules={[
                      {
                        required: true,
                        message: "Product name is required!",
                      },
                      {
                        min: 3,
                        message: "Product name must be at least 3 characters!",
                      },
                      {
                        max: 255,
                        message: "Product name cannot exceed 255 characters!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Product Name"
                      className="col-span-10"
                    />
                  </Form.Item>
                </div>
                {/* <div className="grid grid-cols-12 gap-4 mb-2">
                  <div className="text-[1rem] col-span-2 text-right">
                    <span className="text-red-500 h-[17px] ">*</span>
                    Slug
                  </div>
                  <Form.Item
                    className="col-span-10"
                    name="slugName"
                    initialValue={detailProduct[0]?.slug}
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
                </div> */}
                <div className="grid grid-cols-12  gap-4 mb-2">
                  <div className="text-[0.99rem] col-span-2 text-right">
                    <span className="text-red-500 h-[17px] ">*</span>
                    Industry
                  </div>
                  <Form.Item
                    className="col-span-10"
                    name="categoryId"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Vui lòng chọn một mục!",
                    //   },
                    // ]}
                  >
                    <TreeSelect
                      size="large"
                      className="col-span-10"
                      showSearch
                      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                      placeholder="Vui lòng chọn ngành hàng"
                      allowClear
                      treeDefaultExpandAll
                      onChange={(value) => {
                        setCategoryId(value);
                      }}
                      treeData={treeData}
                      onPopupScroll={onPopupScroll}
                    />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-12 gap-4 mb-4">
                  <div className="text-[0.99rem] col-span-2 text-right">
                    <span className="text-red-500 h-[17px] ">*</span>
                    Describe
                  </div>
                  <Form.Item
                    name="description"
                    className=" col-span-10"
                    rules={[
                      {
                        required: true,
                        message: "Description is required!",
                      },
                      {
                        min: 100,
                        message: "Description must be at least 100 characters!",
                      },
                      {
                        max: 250,
                        message:
                          "Description must be no more than 250 characters!",
                      },
                    ]}
                  >
                    <TextArea
                      rows={5}
                      placeholder="Description"
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
                  Sales information
                </div>
                <div className="mt-7">
                  <div className="grid grid-cols-12 gap-4 items-start">
                    <div className="flex items-center justify-end gap-2 col-span-2">
                      <div>
                        <div className="eds-badge-x"></div>
                        <div className="eds-badge-x-static"></div>
                      </div>
                      <div className="text-[0.99rem] -mt-3 ">
                        Product Classification
                      </div>
                    </div>
                    <div className="col-span-10">
                      {/* {classify === false ? (
                        <button
                          className="-mt-3 border-2 mb-6 border-gray-400 px-3 text-[#ee4d2d]
                   py-2 rounded-md border-dotted text-[0.99rem]"
                          onClick={() => setClassify(true)}
                          type="button"
                        >
                          + Thêm nhóm phân loại
                        </button>
                      ) : ( */}
                      <div className="bg-[#f5f5f5] p-4 rounded-lg mb-4">
                        <div className="flex items-center gap-4 justify-content-between mb-3">
                          <div className="flex gap-4">
                            <div className="text-[1.04rem]">Category 1</div>
                            <Form.Item
                              name="select1"
                              initialValue="color"
                              rules={[
                                {
                                  required: true,
                                  message: "Please select an item!",
                                },
                              ]}
                            >
                              <Select
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="label"
                                className="min-w-[200px]"
                                value="color"
                                onChange={(value) => setSelect(value)}
                                onSearch={onSearch}
                                options={[
                                  {
                                    value: "color",
                                    label: "color",

                                    disabled: select1 === "color",
                                  },
                                ]}
                              />
                            </Form.Item>
                          </div>

                          {/* <button
                            className="text-[#ee4d2d] text-[1.4rem]"
                            type="button"
                            onClick={handleDeleteSelect}
                          >
                            X
                          </button> */}
                        </div>

                        <div className="flex gap-10">
                          <div className="text-[1rem]">Options</div>
                          <div className="grid grid-cols-3 gap-4">
                            {classifys.map((item, index) => (
                              <div
                                key={item.id || `new-${index}`}
                                className="flex gap-2 items-center"
                              >
                                {/* {item} */}
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
                                    colors?.data?.map((colorItem) => ({
                                      value: colorItem.id,
                                      label: colorItem.name,
                                      disabled: selectedvalue.includes(
                                        colorItem.id
                                      ),
                                    })) || []
                                  }
                                  value={item || null}
                                />
                                {classifys.length > 1 && (
                                  <div onClick={() => handleDelete(item)}>
                                    <i className="fa fa-trash text-[#ee4d2d] text-[17px]"></i>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* )} */}

                      {/* {classify1 && ( */}
                      <div className="bg-[#f5f5f5] p-4 rounded-lg mb-10">
                        <div className="flex items-center gap-4 justify-content-between mb-3">
                          <div className="flex  gap-4">
                            <div className="text-[1.04rem]">Category 2</div>

                            <Form.Item
                              name="select2"
                              initialValue="size"
                              rules={[
                                {
                                  required: true,
                                  message: "Please select an item!",
                                },
                              ]}
                            >
                              <Select
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="label"
                                className="min-w-[200px] "
                                onChange={(value) => setSelect1(value)}
                                onSearch={onSearch}
                                options={[
                                  {
                                    value: "size",
                                    label: "Size",
                                  },
                                ]}
                              />
                            </Form.Item>
                          </div>

                          {/* <button
                            className="text-[#ee4d2d] text-[1.4rem]"
                            type="button"
                            onClick={handleDeleteSelect1}
                          >
                            X
                          </button> */}
                        </div>

                        <div className="flex gap-10">
                          <div className="text-[1rem]">Options</div>
                          <div className="grid grid-cols-3 gap-4">
                            {classifys1.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
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
                                    sizes?.data?.map((sizeItem) => ({
                                      value: sizeItem.id,
                                      label: sizeItem.name,
                                      disabled: selectedvalue1.includes(
                                        sizeItem.id
                                      ),
                                    })) || []
                                  }
                                  value={item || null}
                                />
                                {classifys1.length > 1 && (
                                  <div
                                    type="button"
                                    className="ml-3"
                                    onClick={() => handleDelete1(item)}
                                  >
                                    <i className="fa fa-trash text-[#ee4d2d] text-[17px]"></i>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* )} */}
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
                  {/* <div className="grid grid-cols-12 gap-4 items-center">
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
                  </div> */}

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
                          Color
                        </div>
                        {selectedvalue.length > 0 &&
                          selectedvalue1.length > 0 && (
                            <div
                              className="flex-[1_0_101px] flex justify-center border-[1px] p-3 border-[#EBEBEB]
                        border-solid"
                            >
                              Size
                            </div>
                          )}

                        <div className="flex w-[100%] ">
                          <div
                            className="flex-[1_0_202px] rounded-none flex justify-center border-y-[1px]
                         p-3 rounded-s border-[#EBEBEB] border-solid"
                          >
                            Price <span className="text-red-500">*</span>
                          </div>
                          <div
                            className="flex-[1_0_202px] rounded-none flex justify-center border-y-[1px]
                         p-3 rounded-s border-[#EBEBEB] border-solid"
                          >
                            Sale Price<span className="text-red-500">*</span>
                          </div>
                          <div
                            className="flex-[1_0_202px] flex justify-center border-[1px]
                         p-3 rounded-s border-[#EBEBEB] border-solid"
                            style={{
                              borderTopRightRadius: "10px",
                            }}
                          >
                            Warehouse <span className="text-red-500">*</span>
                          </div>
                        </div>
                      </div>
                      {selectedvalue
                        .filter((item) => item !== 0)
                        .map((item, outerIndex) => (
                          <div
                            className="border-[#EBEBEB] border-solid border-[1px] last:rounded-b-xl"
                            key={outerIndex}
                          >
                            <div className="flex items-center">
                              <div className="min-w-[100px] max-w-[100px] border-e-[1px] p-3 ">
                                <div className="flex items-center gap-4">
                                  <div>
                                    {
                                      colors?.data?.find(
                                        (colorItem) => colorItem.id === item
                                      )?.name
                                    }
                                  </div>
                                </div>
                              </div>
                              {selectedvalue1.length > 0 &&
                                selectedvalue1.filter((item) => item !== 0) && (
                                  <div className="min-w-[100px] flex justify-center  border-e-[1px] ">
                                    <div>
                                      {selectedvalue1.map(
                                        (item, innerIndex) => (
                                          <div
                                            className="type text-center"
                                            key={innerIndex}
                                          >
                                            {
                                              sizes?.data?.find(
                                                (sizeItem) =>
                                                  sizeItem.id === item
                                              )?.name
                                            }
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}
                              <div className="w-full flex-wrap gap-4">
                                {selectedvalue1
                                  .filter((item) => item !== 0) // Lọc các item không phải 0
                                  .map((item, innerIndex) => {
                                    return (
                                      <div
                                        key={innerIndex}
                                        className="flex gap-2"
                                      >
                                        {/* Input: Giá */}
                                        <div className="flex-[1_0_205px] flex justify-center border-e px-3 rounded-s border-[#EBEBEB] border-solid">
                                          <Form.Item
                                            name={`price-${outerIndex}-${innerIndex}`}
                                            rules={[
                                              {
                                                required: true,
                                                message: "Please enter price",
                                              },
                                              {
                                                validator: (_, value) =>
                                                  value && value > 1000
                                                    ? Promise.resolve()
                                                    : Promise.reject(
                                                        new Error(
                                                          "Price must be greater than 1,000"
                                                        )
                                                      ),
                                              },
                                            ]}
                                          >
                                            <Input
                                              type="number"
                                              size="large"
                                              className="w-full max-h-[40px]"
                                              min={0}
                                              placeholder="Giá"
                                            />
                                          </Form.Item>
                                        </div>

                                        {/* Input: Giá sale */}
                                        <div className="flex-[1_0_205px] flex justify-center border-e px-3 rounded-s border-[#EBEBEB] border-solid">
                                          <Form.Item
                                            name={`pricesale-${outerIndex}-${innerIndex}`}
                                          >
                                            <Input
                                              type="number"
                                              size="large"
                                              className="w-full max-h-[40px]"
                                              min={0}
                                              placeholder="Price Sale"
                                            />
                                          </Form.Item>
                                        </div>

                                        {/* Input: Số lượng */}
                                        <div className="flex-[1_0_205px] flex justify-center border-e px-3 rounded-s border-[#EBEBEB] border-solid">
                                          <Form.Item
                                            name={`quantity-${outerIndex}-${innerIndex}`}
                                            rules={[
                                              {
                                                required: true,
                                                message:
                                                  "Please enter quantity",
                                              },
                                              {
                                                validator: (_, value) =>
                                                  value && value > 0
                                                    ? Promise.resolve()
                                                    : Promise.reject(
                                                        new Error(
                                                          "Quantity must be greater than 1"
                                                        )
                                                      ),
                                              },
                                            ]}
                                          >
                                            <Input
                                              type="number"
                                              size="large"
                                              className="w-full max-h-[40px]"
                                              min={0}
                                              placeholder="Warehouse"
                                            />
                                          </Form.Item>
                                        </div>
                                      </div>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div
              className="flex gap-4 justify-content-end bg-white p-3 rounded-lg mb-1 text-[1rem] fixed bottom-0 w-[82.5%]"
              style={{ boxShadow: "rgb(209, 209, 209) 0px 0px 4px 1px" }}
            >
              <button className="py-2 px-4 bg-white border-2 border-[#EBEBEB] rounded-lg border-solid text-black">
                Cancel
              </button>
              <button className="py-2 px-4 bg-white border-2 border-red-400 rounded-lg border-solid text-black">
                Save and hide
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-red-600 border-2 border-red-400 rounded-lg border-solid text-white"
              >
                Save and display
              </button>
            </div>
          </Form>
        </section>
      </section>
    </>
  );
};

export default UpdateProduct;
