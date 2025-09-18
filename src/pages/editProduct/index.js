import React, { useEffect } from "react";
import "./style.scss";
import NavBar from "../../components/navbar";
import { useNavigate, useParams } from "react-router";
import { HOME_SIDEBAR, ADD_PRODUCT_DETAILS, PRODUCT_DESCRIPTION, IMAGES, NAVBAR, META } from "../../const";
import HomeSidebar from "../../components/homeSidebar";
import * as formik from "formik";
import Label from "../../components/label";
import Input from "../../components/input";
import Checkbox from "../../components/checkbox";
import DragDropImage from "../../components/imageDragAndDrop";
import { TextEditor } from "../../components/textEditor";
import FeatureInput from "../../components/multiOptionsField";
import DropdownSelect from "../../components/dropdown";
import { Provider } from "../../allProvider/products.provider";
import Footer from "../../components/footer";
import ImageUploader from "../../imageUploader";
import { FormAccordion } from "../../components/accordion";
import { AccordionTable } from "../../components/table";
import { useState } from "react";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Icons from "../../components/icons";
import ReactQuill from "react-quill";
import { slugify } from "../../utils/helpers";

const EditProductsPage = () => {
  const { getProductById, existingProduct, updateProductById } = Provider();

  const { id } = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const { Formik } = formik;

  useEffect(() => {
    getProductById(id);
  }, [id]);
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

  useEffect(() => {
    if (existingProduct?.product_content?.water_exp.watertypes) {
      setWaterType(existingProduct?.product_content?.water_exp.watertypes);
    }
    if (existingProduct?.product_content?.water_exp.watertypes) {
      setSpecs(existingProduct?.product_content?.product_specs.specs);
    }
  }, [existingProduct]);

  return (
    <Formik
      onSubmit={(data) => {
        updateProductById(id, data);
      }}
      enableReinitialize={true}
      initialValues={{
        is_new_arrival: existingProduct.is_new_arrival || false,
        is_trending_now: existingProduct.is_trending_now || false,
        is_on_sale: existingProduct.is_on_sale || false,
        is_published: existingProduct.is_published || false,
        title: existingProduct.title || "",
        mrp: existingProduct.mrp || "",
        models: existingProduct.models || "",
        short_desc: existingProduct.short_desc || "",
        desc: existingProduct.desc || "",
        images: existingProduct.images || [],
        key_feature: existingProduct.key_feature || [],
        currency: existingProduct.currency || "Rs",
        selling_price: existingProduct.selling_price || "",
        stock_quantity: existingProduct.stock_quantity || "",
        category_id: existingProduct.category_id || 1,
        slug_url: existingProduct.slug_url || "",
        meta_title: existingProduct.meta_title || "",
        meta_desc: existingProduct.meta_desc || "",
        meta_keywords: existingProduct.meta_keywords || "",
        product_content: {
          product_desc_image: existingProduct?.product_content?.product_desc_image || "",
          water_exp: {
            heading: existingProduct?.product_content?.water_exp.heading || "",
            sub_heading: existingProduct?.product_content?.water_exp.sub_heading || "",
            watertypes: waterType,
          },
          product_content_img: existingProduct?.product_content?.product_content_img || "",
          product_specs: {
            banner: existingProduct?.product_content?.product_specs?.banner || "",
            heading: existingProduct?.product_content?.product_specs.heading || "",
            sub_heading: existingProduct?.product_content?.product_specs.sub_heading || "",
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
              <HomeSidebar accordions={HOME_SIDEBAR} />
              <div className="main-content" style={{ marginRight: 0 }}>
                <div className="" style={{ width: "100%", padding: "1rem", height: "100vh", overflowY: "auto", paddingBottom: "10rem" }} >

                  <div className="product-section">
                    <h5 style={{ marginBottom: "20px", fontWeight: "bold", color: "#00435a" }}>{META.TITLE}</h5>
                    <div className="div1">
                      <div>
                        <Label label={META.M_TITLE.LABEL} />
                        <Input name="meta_title" type="text" placeholder="Enter Title" onChange={handleChange} value={values.meta_title} />
                      </div>
                      <div>
                        <Label label={META.DESC.LABEL} />
                        <Input name="meta_desc" textarea="textarea" placeholder="Enter Description" onChange={handleChange} value={values.meta_desc} />
                      </div>
                      <div>
                        <Label label={META.KEYWORDS.LABEL} />
                        <Input
                          name="meta_keywords"
                          textarea="textarea"
                          placeholder="Enter Keywords"
                          onChange={handleChange}
                          value={values.meta_keywords}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="product-section">
                    <h5 style={{ marginBottom: "20px", fontWeight: "bold", color: "#00435a" }}>{ADD_PRODUCT_DETAILS.TITLE}</h5>
                    <div className="div2" style={{ marginBottom: "15px", display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ marginRight: "50px" }}>
                        <Checkbox
                          name="is_new_arrival"
                          label={ADD_PRODUCT_DETAILS.IS_NEW_ARRIVAL.LABEL}
                          onChange={() => setFieldValue("is_new_arrival", !values.is_new_arrival)}
                          checked={values.is_new_arrival}
                        />
                      </div>
                      <div style={{ marginRight: "50px" }}>
                        <Checkbox
                          name="is_trending_now"
                          label={ADD_PRODUCT_DETAILS.IS_TRENDING_NOW.LABEL}
                          onChange={() => setFieldValue("is_trending_now", !values.is_trending_now)}
                          checked={values.is_trending_now}
                        />
                      </div>
                      <div style={{ marginRight: "50px" }}>
                        <Checkbox
                          name="is_on_sale"
                          label={ADD_PRODUCT_DETAILS.IS_ON_SALE.LABEL}
                          onChange={() => setFieldValue("is_on_sale", !values.is_on_sale)}
                          checked={values.is_on_sale}
                        />
                      </div>
                      <div style={{ marginRight: "50px" }}>
                        <Checkbox
                          name="is_published"
                          label={ADD_PRODUCT_DETAILS.IS_PUBLISHED.LABEL}
                          onChange={() => setFieldValue("is_published", !values.is_published)}
                          checked={values.is_published}
                        />
                      </div>
                    </div>
                    <div className="div1">
                      <div>
                        <Label label={ADD_PRODUCT_DETAILS.PRODUCT_NAME.LABEL} />
                        <Input name="title" type="text" textarea="textarea" placeholder="Enter Product Title"
                          // onChange={handleChange} 
                          onChange={(e) => {
                            const titleValue = e.target.value;
                            setFieldValue("title", titleValue);
                            setFieldValue("slug_url", slugify(titleValue)); // Automatically update slug_url
                          }}
                          value={values.title} />
                      </div>
                      <div>
                        <Label label={META.SLUG_URL.LABEL} />
                        <Input name="slug_url" type="text" textarea="textarea" placeholder="Enter Title" onChange={handleChange} value={values.slug_url} />
                      </div>

                      <div>
                        <Label label={ADD_PRODUCT_DETAILS.MODELS.TITLE} />
                        <DropdownSelect name="models" options={ADD_PRODUCT_DETAILS.MODELS.OPTIONS} onChange={handleChange} value={values.models} />
                      </div>
                    </div>
                    <div className="div1">
                      <div>
                        <Label label="Currency" />
                        <Input name="currency" type="text" placeholder="Enter Currency" onChange={handleChange} value={values.currency} />
                      </div>
                      <div>
                        <Label label={ADD_PRODUCT_DETAILS.PRICE.LABEL} />
                        <Input name="mrp" type="number" placeholder="Enter Price" onChange={handleChange} value={values.mrp} />
                      </div>
                      <div>
                        <Label label="Selling Price" />
                        <Input
                          name="selling_price"
                          type="number"
                          placeholder="Enter Selling Price"
                          onChange={handleChange}
                          value={values.selling_price}
                        />
                      </div>
                      <div>
                        <Label label="Stock Quantity" />
                        <Input
                          name="stock_quantity"
                          type="number"
                          placeholder="Enter Stock Quantity"
                          onChange={handleChange}
                          value={values.stock_quantity}
                        />
                      </div>
                    </div>
                    <div className="div1">
                      <div>
                        <Label label={ADD_PRODUCT_DETAILS.DESC.LABEL} />
                        <Input
                          name="short_desc"
                          textarea="textarea"
                          placeholder="Enter Description"
                          onChange={handleChange}
                          value={values.short_desc}
                        />
                      </div>
                    </div>
                    <div className="div1">
                      <div>
                        <Label label="Key Features" />
                        <FeatureInput
                          features={values.key_feature}
                          setFeatures={(features) => setFieldValue("key_feature", features)}
                          placeholder="Add Key Features"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="product-section">
                    <h5 style={{ marginBottom: "20px", fontWeight: "bold", color: "#00435a" }}>{PRODUCT_DESCRIPTION.TITLE}</h5>
                    <div style={{ overflow: "scroll" }}>
                      <ReactQuill style={{ height: "30rem", }}
                        theme="snow"
                        value={values.desc}
                        onChange={(value) => {
                          setFieldValue("desc", value);
                        }}
                      />
                    </div>

                    <div style={{ marginTop: '2rem' }} >
                      <h5 style={{ marginBottom: "20px", fontWeight: "bold", color: "#00435a" }}>Product Description Image</h5>
                      <ImageUploader imgStyle={{ width: "20rem" }}
                        imageUrl={values?.product_content?.product_desc_image}
                        onChange={(res) => { setFieldValue("product_content.product_desc_image", res?.data?.image_url); }}
                      />
                    </div>
                  </div>
                  <div className="product-section" style={{ paddingBottom: "100px" }}>
                    <h5 style={{ marginBottom: "20px", fontWeight: "bold", color: "#00435a" }}>{IMAGES.TITLE}</h5>
                    <DragDropImage setFieldValue={setFieldValue} values={values.images} productId={id} />
                  </div>
                  <div className="product-section">
                    <div className="main-accordion1">
                      <h5 style={{ marginBottom: "20px", fontWeight: "bold", color: "#00435a", }}>Quick Information</h5>
                      <AccordionTable>
                        <thead>
                          <tr>
                            <th className="headingtable">Heading</th>
                            <th className="headingtable">Subheading</th>
                            <th className="headingtable">Banner Image</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="paddingtable" width={"40%"}>
                              <Input
                                name="product_content.water_exp.heading"
                                type="text"
                                placeholder="Enter Heading"
                                onChange={handleChange}
                                value={values?.product_content?.water_exp?.heading}
                              />
                            </td>
                            <td className="paddingtable" width={"40%"}>
                              <Input
                                name="product_content.water_exp.sub_heading"
                                placeholder="Enter Sub Heading"
                                onChange={handleChange}
                                value={values?.product_content?.water_exp?.sub_heading}
                              />
                            </td>
                            <td className="paddingtable" width={"20%"}>
                              <ImageUploader
                                imageUrl={values?.product_content?.product_content_img}
                                onChange={(res) => {
                                  setFieldValue("product_content.product_content_img", res?.data?.image_url);
                                }}
                                imgStyle={{ width: "10rem" }}
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
                            <th className="headingtable">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {waterType.map((type, index) => (
                            <tr>
                              <td className="paddingtable" width={"70%"}>
                                <Input
                                  name="title"
                                  type="text"
                                  value={type.title}
                                  placeholder="Enter Title"
                                  onChange={(e) => handleWaterTypeChange(index, "title", e.target.value)}
                                />
                              </td>
                              <td className="paddingtable" width={"22%"}>
                                <ImageUploader
                                  imageUrl={type.image}
                                  onChange={(res) => {
                                    handleWaterTypeChange(index, "image", res?.data?.image_url);
                                  }}
                                  imgStyle={{ width: "80px" }}
                                />
                              </td>
                              <td
                                className="paddingtable"
                                onClick={() => handleDeleteWaterType(index)}
                                width={"8%"}
                                style={{ paddingLeft: "2.5%", color: "red" }}
                              >
                                <Icons iconName={faTrash} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </AccordionTable>
                    </div>
                  </div>

                  <div className="product-section">
                    <div className="main-accordion1">
                      <h5 style={{ marginBottom: "20px", fontWeight: "bold", color: "#00435a", }}>Quick Information 2</h5>
                      <AccordionTable>
                        <thead>
                          <tr>
                            <th className="headingtable">Heading</th>
                            <th className="headingtable">Subheading</th>
                            <th className="headingtable">Banner Image</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="paddingtable" width={"40%"}>
                              <Input
                                name="product_content.product_specs.heading"
                                type="text"
                                placeholder="Enter Heading"
                                onChange={handleChange}
                                value={values?.product_content?.product_specs?.heading}
                              />
                            </td>
                            <td className="paddingtable" width={"40%"}>
                              <Input
                                name="product_content.product_specs.sub_heading"
                                placeholder="Enter Sub Heading"
                                onChange={handleChange}
                                value={values?.product_content?.product_specs?.sub_heading}
                              />
                            </td>
                            <td className="paddingtable" width={"20%"}>
                              <ImageUploader
                                imgStyle={{ width: "250px" }}
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
                            <th className="headingtable">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {specs.map((type, index) => (
                            <tr>
                              <td className="paddingtable" width={"60%"}>
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
                                  imageUrl={type.image}
                                  imgStyle={{ width: "80px" }}
                                  onChange={(res) => {
                                    handleSpecChange(index, "image", res?.data?.image_url);
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
                      {/* </div> */}
                    </div>
                  </div>
                  <div className="footer" style={{ left: "3%", width: "94%" }}>
                    <Footer onClick={handleGoBack} buttonTitle1="Go Back" buttonTitle2="Update" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form >
      )
      }
    </Formik >
  );
};

export default EditProductsPage;
