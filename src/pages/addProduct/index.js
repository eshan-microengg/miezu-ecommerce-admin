import React from "react";
import "./style.scss";
import NavBar from "../../components/navbar";
import { useNavigate } from "react-router";
import { HOME_SIDEBAR, ADD_PRODUCT_DETAILS, PRODUCT_DESCRIPTION, IMAGES, NAVBAR, META } from "../../const";
import HomeSidebar from "../../components/homeSidebar";
import * as formik from "formik";
import * as yup from "yup";
import Label from "../../components/label";
import Input from "../../components/input";
import Checkbox from "../../components/checkbox";
import { isArrayRequired, isImageRequired, isNumberRequired, isStringRequired } from "../../utils/validation";
import DragDropImage from "../../components/imageDragAndDrop";
import { TextEditor } from "../../components/textEditor";
import Button1 from "../../components/button";
import FeatureInput from "../../components/multiOptionsField";
import DropdownSelect from "../../components/dropdown";
import { Provider } from "../../allProvider/products.provider";
import ImageUploader from "../../imageUploader";
import { FormAccordion } from "../../components/accordion";
import { AccordionTable } from "../../components/table";
import { useState, useEffect } from "react";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Icons from "../../components/icons";
import ReactQuill from "react-quill";

const AddProductsPage = () => {
  const { addNewProduct } = Provider();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const { Formik } = formik;

  const schema = yup.object().shape({
    mrp: isNumberRequired(),
    title: isStringRequired(),
    model: isStringRequired(),
    short_desc: isStringRequired(),
    desc: isStringRequired(),
    images: isImageRequired(false),
    key_feature: isArrayRequired(),
    currency: isStringRequired(),
    selling_price: isNumberRequired(),
    stock_quantity: isNumberRequired(),
  });
  const [waterType, setWaterType] = useState([{ title: "", image: "" }]);
  const [specs, setSpecs] = useState([{ title: "", image: "" }]);

  const handleWaterTypeChange = (index, field, value) => {
    const updatedWaterType = [...waterType];
    updatedWaterType[index][field] = value;
    setWaterType(updatedWaterType);
  };
  const addNewWaterType = () => {
    setWaterType([...waterType, { title: "", subTitle: "", btn_cta: "", img: "" }]);
  };
  const handleDeleteWaterType = (index) => {
    const newWaterType = waterType.filter((_, i) => i !== index);
    setWaterType(newWaterType);
  };

  const handleSpecChange = (index, field, value) => {
    const updatedWaterType = [...specs];
    updatedWaterType[index][field] = value;
    setSpecs(updatedWaterType);
  };
  const addNewSpec = () => {
    setSpecs([...specs, { title: "", subTitle: "", btn_cta: "", img: "" }]);
  };
  const handleDeleteSpec = (index) => {
    const newWaterType = specs.filter((_, i) => i !== index);
    setSpecs(newWaterType);
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(data) => {
        addNewProduct(data);
      }}
      initialValues={{
        id: Math.floor(Math.random() * 1000000),
        slug_url: "",
        meta_title: "",
        meta_desc: "",
        meta_keywords: "",
        is_new_arrival: false,
        is_trending_now: false,
        is_on_sale: false,
        is_published: false,
        title: "",
        mrp: "",
        short_desc: "",
        desc: "",
        images: [],
        key_feature: [],
        currency: "Rs",
        selling_price: "",
        stock_quantity: "",
        category_id: 1,
        product_content: {
          product_desc_image: "",
          water_exp: {
            heading: "",
            sub_heading: "",
            watertypes: waterType,
          },
          product_content_img: "",
          product_specs: {
            banner: "",
            heading: "",
            sub_heading: "",
            specs: specs,
          },
        },
      }}
    >
      {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
        <form noValidate onSubmit={handleSubmit}>
          <div className="container">
            <NavBar brandName={NAVBAR.BRAND_IMAGE} profileName={NAVBAR.PROFILE_NAME} profileOption={NAVBAR.PROFILE_OPTION} />
            <div className="content-wrapper">
              <div className="main-content" style={{ marginRight: 0 }}>
                <div className="product-section">
                  <h5
                    style={{
                      marginBottom: "20px",
                      fontWeight: "bold",
                      color: "#00435a",
                    }}
                  >
                    {META.TITLE}
                  </h5>
                  <div className="div1">
                    <div>
                      <Label label={META.SLUG_URL.LABEL} />
                      <Input
                        name="slug_url"
                        type="text"
                        placeholder="Enter Slug URL"
                        onChange={handleChange}
                        error={errors.slug_url}
                        value={values.slug_url}
                        isInvalid={!!errors.slug_url}
                      />
                    </div>
                    <div>
                      <Label label={META.M_TITLE.LABEL} />
                      <Input
                        name="meta_title"
                        type="text"
                        placeholder="Enter Title"
                        onChange={handleChange}
                        error={errors.meta_title}
                        value={values.meta_title}
                        isInvalid={!!errors.meta_title}
                      />
                    </div>
                    <div>
                      <Label label={META.DESC.LABEL} />
                      <Input
                        name="meta_desc"
                        textarea="textarea"
                        placeholder="Enter Description"
                        onChange={handleChange}
                        error={errors.meta_desc}
                        value={values.meta_desc}
                        isInvalid={!!errors.meta_desc}
                      />
                    </div>
                    <div>
                      <Label label={META.KEYWORDS.LABEL} />
                      <Input
                        name="meta_keywords"
                        textarea="textarea"
                        placeholder="Enter Keywords"
                        onChange={handleChange}
                        error={errors.meta_keywords}
                        value={values.meta_keywords}
                        isInvalid={!!errors.meta_keywords}
                      />
                    </div>
                  </div>
                </div>
                <div className="product-section">
                  <h5
                    style={{
                      marginBottom: "20px",
                      fontWeight: "bold",
                      color: "#00435a",
                    }}
                  >
                    {ADD_PRODUCT_DETAILS.TITLE}
                  </h5>
                  <div className="div2" style={{ marginBottom: "15px" }}>
                    <div style={{ marginRight: "50px" }}>
                      <Checkbox
                        name="is_new_arrival"
                        label={ADD_PRODUCT_DETAILS.IS_NEW_ARRIVAL.LABEL}
                        onChange={() => setFieldValue("is_new_arrival", !values.is_new_arrival)}
                        error={errors.is_new_arrival}
                        value={values.is_new_arrival}
                        isInvalid={!!errors.is_new_arrival}
                      />
                    </div>
                    <div style={{ marginRight: "50px" }}>
                      <Checkbox
                        name="is_trending_now"
                        label={ADD_PRODUCT_DETAILS.IS_TRENDING_NOW.LABEL}
                        onChange={() => setFieldValue("is_trending_now", !values.is_trending_now)}
                        error={errors.is_trending_now}
                        value={values.is_trending_now}
                        isInvalid={!!errors.is_trending_now}
                      />
                    </div>
                    <div style={{ marginRight: "50px" }}>
                      <Checkbox
                        name="is_on_sale"
                        label={ADD_PRODUCT_DETAILS.IS_ON_SALE.LABEL}
                        onChange={() => setFieldValue("is_on_sale", !values.is_on_sale)}
                        error={errors.is_on_sale}
                        value={values.is_on_sale}
                        isInvalid={!!errors.is_on_sale}
                      />
                    </div>
                    <div style={{ marginRight: "50px" }}>
                      <Checkbox
                        name="is_published"
                        label={ADD_PRODUCT_DETAILS.IS_PUBLISHED.LABEL}
                        onChange={() => setFieldValue("is_published", !values.is_published)}
                        error={errors.is_published}
                        value={values.is_published}
                        isInvalid={!!errors.is_published}
                      />
                    </div>
                  </div>
                  <div className="div1">
                    <div>
                      <Label label={ADD_PRODUCT_DETAILS.PRODUCT_NAME.LABEL} isRequired={true} />
                      <Input
                        name="title"
                        type="text"
                        placeholder="Enter Product Name"
                        onChange={handleChange}
                        error={errors.title}
                        value={values.title}
                        isInvalid={!!errors.title}
                      />
                    </div>
                    <div>
                      <Label label={ADD_PRODUCT_DETAILS.PRICE.LABEL} isRequired={true} />
                      <Input
                        name="mrp"
                        type="number"
                        placeholder="Enter Price"
                        onChange={handleChange}
                        error={errors.mrp}
                        value={values.mrp}
                        isInvalid={!!errors.mrp}
                      />
                    </div>
                  </div>
                  <div className="div1">
                    <div>
                      <Label label="Currency" isRequired={true} />
                      <Input
                        name="currency"
                        type="text"
                        placeholder="Enter Currency"
                        onChange={handleChange}
                        error={errors.currency}
                        value={values.currency}
                        isInvalid={!!errors.currency}
                      />
                    </div>
                    <div>
                      <Label label="Selling Price" isRequired={true} />
                      <Input
                        name="selling_price"
                        type="number"
                        placeholder="Enter Selling Price"
                        onChange={handleChange}
                        error={errors.selling_price}
                        value={values.selling_price}
                        isInvalid={!!errors.selling_price}
                      />
                    </div>
                    <div>
                      <Label label="Stock Quantity" isRequired={true} />
                      <Input
                        name="stock_quantity"
                        type="number"
                        placeholder="Enter Stock Quantity"
                        onChange={handleChange}
                        value={values.stock_quantity}
                        error={errors.stock_quantity}
                        isInvalid={!!errors.stock_quantity}
                      />
                    </div>
                  </div>
                  <div className="div1">
                    <div>
                      <Label label={ADD_PRODUCT_DETAILS.DESC.LABEL} isRequired={true} />
                      <Input
                        name="short_desc"
                        textarea="textarea"
                        placeholder="Enter Description"
                        onChange={handleChange}
                        error={errors.short_desc}
                        value={values.short_desc}
                        isInvalid={!!errors.short_desc}
                      />
                    </div>
                  </div>
                  <div className="div1">
                    <div>
                      <Label label="Key Features" isRequired={true} />
                      <FeatureInput
                        features={values.key_feature}
                        setFeatures={(features) => setFieldValue("key_feature", features)}
                        placeholder="Add Key Features"
                        isInvalid={!!errors.key_feature}
                      />
                    </div>
                  </div>
                </div>

                <div className="product-section">
                  <h5
                    style={{
                      marginBottom: "20px",
                      fontWeight: "bold",
                      color: "#00435a",
                    }}
                  >
                    {PRODUCT_DESCRIPTION.TITLE}
                    <span style={{ color: "red" }}> *</span>
                  </h5>
                  <div style={{ height: "200px", overflow: "scroll" }}>
                    {/* <TextEditor fieldName="desc" value={values.desc} setFieldValue={setFieldValue} isInvalid={!!errors.desc} /> */}
                    <ReactQuill theme="snow" value={values.desc} onChange={(value) => {
                        setFieldValue("desc", value)
                    }} />
                  </div>
                </div>
                <div className="product-section">
                  <h5
                    style={{
                      marginBottom: "20px",
                      fontWeight: "bold",
                      color: "#00435a",
                    }}
                  >
                    {IMAGES.TITLE}
                    <span style={{ color: "red" }}> *</span>
                  </h5>
                  <DragDropImage setFieldValue={setFieldValue} values={values} />
                  {errors.images && <div style={{ color: "red" }}>{errors.images}</div>}
                </div>
                <div className="product-section">
                  <h5
                    style={{
                      marginBottom: "20px",
                      fontWeight: "bold",
                      color: "#00435a",
                    }}
                  >
                    Product Description Image
                  </h5>
                  <ImageUploader
                    imageUrl={values?.product_content?.product_desc_image}
                    onChange={(res) => {
                      setFieldValue("product_content.product_desc_image", res?.data?.image_url);
                    }}
                  />
                </div>
                <div className="product-section">
                  <div className="main-accordion1">
                    <div className="accordion1">
                      <FormAccordion header="Water Experience" style={{ border: "2px" }}>
                        <AccordionTable>
                          <thead>
                            <tr>
                              <th className="headingtable">Heading</th>
                              <th className="headingtable">Subheading</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="paddingtable" width={"25%"}>
                                <Input
                                  name="product_content.water_exp.heading"
                                  type="text"
                                  placeholder="Enter Heading"
                                  onChange={handleChange}
                                  value={values?.product_content?.water_exp?.heading}
                                />
                              </td>
                              <td className="paddingtable" width={"35%"}>
                                <Input
                                  name="product_content.water_exp.subHeading"
                                  textarea="textarea"
                                  placeholder="Enter Sub Heading"
                                  onChange={handleChange}
                                  value={values?.product_content?.water_exp?.sub_heading}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </AccordionTable>
                        <button type="button" className="addButton" onClick={addNewWaterType}>
                          <Icons iconName={faCirclePlus} />
                        </button>
                        <AccordionTable>
                          <thead>
                            <tr>
                              <th className="headingtable">Title</th>
                              <th className="headingtable">Image</th>
                            </tr>
                          </thead>
                          <tbody>
                            {waterType.map((type, index) => (
                              <tr>
                                <td className="paddingtable" width={"20%"}>
                                  <Input
                                    name="title"
                                    type="text"
                                    value={type.title}
                                    placeholder="Enter Title"
                                    onChange={(e) => handleWaterTypeChange(index, "title", e.target.value)}
                                  />
                                </td>
                                <td className="paddingtable" width={"20%"}>
                                  <ImageUploader
                                    imageUrl={type.bg_img}
                                    onChange={(res) => {
                                      handleWaterTypeChange(index, "bg_img", res?.data?.image_url);
                                    }}
                                  />
                                </td>
                                <td
                                  className="paddingtable"
                                  onClick={() => handleDeleteWaterType(index)}
                                  width={"5%"}
                                  style={{ paddingLeft: "2.5%", color: "red" }}
                                >
                                  <Icons iconName={faTrash} />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </AccordionTable>
                      </FormAccordion>
                    </div>
                  </div>
                </div>
                <div className="product-section">
                  <h5
                    style={{
                      marginBottom: "20px",
                      fontWeight: "bold",
                      color: "#00435a",
                    }}
                  >
                    Product Content Image
                  </h5>
                  <ImageUploader
                    imageUrl={values?.product_content?.product_content_img}
                    onChange={(res) => {
                      setFieldValue("product_content.product_content_img", res?.data?.image_url);
                    }}
                  />
                </div>

                <div className="product-section">
                  <div className="main-accordion1">
                    <div className="accordion1">
                      <FormAccordion header="Product Specifications" style={{ border: "2px" }}>
                        <AccordionTable>
                          <thead>
                            <tr>
                              <th className="headingtable">Heading</th>
                              <th className="headingtable">Subheading</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="paddingtable" width={"25%"}>
                                <Input
                                  name="product_content.product_specs.heading"
                                  type="text"
                                  placeholder="Enter Heading"
                                  onChange={handleChange}
                                  value={values?.product_content?.product_specs?.heading}
                                />
                              </td>
                              <td className="paddingtable" width={"35%"}>
                                <Input
                                  name="product_content.product_specs.subHeading"
                                  textarea="textarea"
                                  placeholder="Enter Sub Heading"
                                  onChange={handleChange}
                                  value={values?.product_content?.product_specs?.sub_heading}
                                />
                              </td>
                              <td>
                                <ImageUploader
                                  imageUrl={values?.product_content?.product_specs?.banner}
                                  onChange={(res) => {
                                    setFieldValue("product_content.product_specs.banner", res?.data?.image_url);
                                  }}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </AccordionTable>
                        <button type="button" className="addButton" onClick={addNewSpec}>
                          <Icons iconName={faCirclePlus} />
                        </button>
                        <AccordionTable>
                          <thead>
                            <tr>
                              <th className="headingtable">Title</th>
                              <th className="headingtable">Image</th>
                            </tr>
                          </thead>
                          <tbody>
                            {specs.map((type, index) => (
                              <tr>
                                <td className="paddingtable" width={"20%"}>
                                  <Input
                                    name="title"
                                    type="text"
                                    value={type.title}
                                    placeholder="Enter Title"
                                    onChange={(e) => handleSpecChange(index, "title", e.target.value)}
                                  />
                                </td>
                                <td className="paddingtable" width={"20%"}>
                                  <ImageUploader
                                    imageUrl={type.bg_img}
                                    onChange={(res) => {
                                      handleSpecChange(index, "bg_img", res?.data?.image_url);
                                    }}
                                  />
                                </td>
                                <td
                                  className="paddingtable"
                                  onClick={() => handleDeleteSpec(index)}
                                  width={"5%"}
                                  style={{ paddingLeft: "2.5%", color: "red" }}
                                >
                                  <Icons iconName={faTrash} />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </AccordionTable>
                      </FormAccordion>
                    </div>
                  </div>
                </div>

                <div className="submit-section" style={{ marginLeft: "auto" }}>
                  <Button1 buttonValue="Submit" type="submit" />
                  <Button1 buttonValue="Go Back" onClick={handleGoBack} type="button" />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default AddProductsPage;
