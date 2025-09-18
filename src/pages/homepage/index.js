import React, { useEffect, useState } from "react";
import "./style.scss";
import * as formik from "formik";
import NavBar from "../../components/navbar";
import Button1 from "../../components/button";
import Input from "../../components/input";
import { HOME_SIDEBAR, NAVBAR, DYNAMIC_HOMEPAGE } from "../../const";
import HomeSidebar from "../../components/homeSidebar";
import { FormAccordion } from "../../components/accordion";
import { AccordionTable } from "../../components/table";
import { HomepageProvider } from "../../allProvider/homepage.provider";
import Checkbox from "../../components/checkbox";
import Icons from "../../components/icons";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import ImageUploader from "../../imageUploader";
import Employe from "../testimonial";
import ReactQuill from "react-quill";

const HomePage = () => {
  const {
    getHomePageData,
    homePageData,
    updateHomePage,
    alkalineWaterBenefits,
    setAlkalineWaterBenefits,
    addNewBenefit,
    productBenefits,
    setProductBenefits,
    addNewProductBenefit,
    handleBenefitChange,
    handleDeleteBenefit,
    handleNewChange,
    handleMeizuChange,
    miezuProductBenefits,
    handleDeleteProductBenefit,
    quickServices,
    setQuickServices,
    addNewService,
    handleServiceChange,
    handleDeleteService,
    services,
    setServices,
    addNewServ,
    handleDeleteSer,
    handleSerChange,
    banner,
    setBanner,
    addNewBanner,
    handleBannerChange,
    handleDeleteBanner,
  } = HomepageProvider();

  const { Formik } = formik;

  useEffect(() => {
    getHomePageData();
  }, []);

  const [fileInput, setFileInput] = useState([]);
  const [fileInput2, setFileInput2] = useState([]);
  const [fileInput3, setFileInput3] = useState([]);

  const handleImagesChange = (value) => {
    if (value?.data?.image_url) {
      setFileInput(value?.data?.image_url);
    } else {
      setFileInput("");
    }
  };

  const handleImageChangePro = (value, index) => {
    if (value?.data?.image_url) {
      setFileInput2(value?.data?.image_url);
    } else {
      setFileInput2("");
    }
    handleNewChange(index, "image", value?.data?.image_url);
  };

  const handleImageMeizuBenefits = (value, index) => {
    if (value?.data?.image_url) {
      setFileInput3(value?.data?.image_url);
    } else {
      setFileInput3("");
    }
    handleMeizuChange(index, "image", value?.data?.image_url);
  };

  useEffect(() => {
    if (homePageData?.page_content?.alkalineWaterBenefits) {
      setAlkalineWaterBenefits(homePageData.page_content.alkalineWaterBenefits);
    }
    if (homePageData?.page_content?.quickServices) {
      setQuickServices(homePageData.page_content.quickServices);
    }
    if (homePageData?.page_content?.services) {
      setServices(homePageData.page_content.services);
    }

    if (homePageData?.page_content?.banner_images) {
      setBanner(homePageData?.page_content?.banner_images || []);
    }
  }, [homePageData]);

  useEffect(() => {
    if (homePageData?.page_content?.productBenefits) {
      setProductBenefits(homePageData.page_content.productBenefits);
    }
    if (homePageData?.page_content?.meizuBenefits?.miezuProductBenefits) {
      setProductBenefits(homePageData?.page_content?.meizuBenefits.miezuProductBenefits);
    }
  }, [homePageData]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        slug_url: homePageData.slug_url || "",
        meta_title: homePageData.meta_title || "",
        meta_desc: homePageData.meta_desc || "",
        meta_keywords: homePageData.meta_keywords || "",
        banner: {
          banner_img: homePageData.page_content.banner?.banner_img || "",
          heading: homePageData.page_content.banner?.heading || "",
          subHeading: homePageData.page_content.banner?.subHeading || "",
          mobile_banner_img: homePageData.page_content.banner?.mobile_banner_img || "",
        },

        alkinebenefits: {
          heading: homePageData.page_content.alkinebenefits?.heading || "",
          alkin_url: homePageData.page_content.alkinebenefits?.alkin_url || "",
          mobile_alkin_url: homePageData?.page_content?.alkinebenefits?.mobile_alkin_url || ""
        },

        miezuProducts: {
          heading: homePageData.page_content.miezuProducts?.heading || "",
          productbenefit_url: homePageData.page_content.miezuProducts?.productbenefit_url || "",
        },

        meizuBenefits: {
          heading: homePageData.page_content.meizuBenefits?.heading || "",
          image: homePageData.page_content.meizuBenefits?.image || "",
          mobile_image: homePageData?.page_content?.meizuBenefits?.mobile_image || "",
        },
        infoLinks: {
          heading: homePageData.page_content.infoLinks?.heading || "",
          subheading: homePageData.page_content.infoLinks?.subheading || "",
        },
        testimonial: {
          heading: homePageData.page_content.testimonial?.heading || "",
          subheading: homePageData.page_content.testimonial?.subheading || "",
        },
        customers: {
          heading: homePageData?.page_content?.customers?.heading,
          video_url: homePageData?.page_content?.customers?.video_url,
        },
        video_link: homePageData.page_content.video_link || "",
        alkin_url: homePageData.page_content.alkinebenefits?.alkin_url || "",
        // banner_img: homePageData.page_content.banner?.banner_img || "",
        test_video_link: homePageData.page_content.test_video_link || "",
      }}
      onSubmit={(data) => {
        const updatedData = {
          slug_url: data.slug_url,
          meta_title: data.meta_title,
          meta_desc: data.meta_desc,
          meta_keywords: data.meta_keywords,
          page_content: {
            banner_images: banner,
            // banner: data.banner,
            alkalineWaterBenefits: alkalineWaterBenefits,
            miezuProductBenefits: miezuProductBenefits,
            alkinebenefits: {
              heading: data.alkinebenefits?.heading || "",
              alkin_url: data.alkinebenefits?.alkin_url || "",
              mobile_alkin_url: data.alkinebenefits?.mobile_alkin_url || ""
            },
            meizuBenefits: {
              heading: data.meizuBenefits?.heading || "",
              image: data.meizuBenefits?.image || "",
              mobile_image: data.meizuBenefits?.mobile_image || "",
              miezuProductBenefits: productBenefits,
            },
            infoLinks: {
              heading: data.infoLinks?.heading || "",
              subheading: data.infoLinks?.subheading || "",
            },
            testimonial: {
              heading: data.testimonial?.heading || "",
              subheading: data.testimonial?.subheading || "",
            },
            video_link: data.video_link,
            test_video_link: data.test_video_link,
            customers: {
              heading: data.customers.heading,
              video_url: data.customers.video_url,
            },
            quickServices: quickServices,
            services: services,
          },
        };
        updateHomePage(updatedData);
      }}
    >
      {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
        <form noValidate onSubmit={handleSubmit}>
          <div className="container">
            <NavBar brandName={NAVBAR.BRAND_IMAGE} profileName={NAVBAR.PROFILE_NAME} profileOption={NAVBAR.PROFILE_OPTION} />
            <div className="content-wrapper">
              <HomeSidebar accordions={HOME_SIDEBAR} />
              <div className="main-content">
                <div className="card-body">
                  <div className="product-navbar">
                    <div className="product-heading">{HOME_SIDEBAR[0].items[0].LABEL}</div>
                  </div>
                  <div className="main-accordion1">
                    <div className="accordion1">
                      <FormAccordion header={DYNAMIC_HOMEPAGE.META.HEADER}>
                        <AccordionTable>
                          <thead>
                            <tr>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.META.DATA[1].ROW}</th>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.META.DATA[0].ROW}</th>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.META.DATA[2].ROW}</th>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.META.DATA[3].ROW}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="paddingtable" width={"25%"}>
                                <Input name="meta_title" type="text" placeholder="Enter Title" onChange={handleChange} value={values.meta_title} />
                              </td>
                              <td className="paddingtable" width={"25%"}>
                                <Input name="slug_url" type="text" placeholder="Enter Slug URL" onChange={handleChange} value={values.slug_url} />
                              </td>
                              <td className="paddingtable" width={"25%"}>
                                <Input
                                  name="meta_desc"
                                  textarea="textarea"
                                  placeholder="Enter Description"
                                  onChange={handleChange}
                                  value={values.meta_desc}
                                />
                              </td>
                              <td className="paddingtable" width={"25%"}>
                                <Input
                                  name="meta_keywords"
                                  textarea="textarea"
                                  placeholder="Enter Keywords"
                                  onChange={handleChange}
                                  value={values.meta_keywords}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </AccordionTable>
                      </FormAccordion>

                      <FormAccordion key="0" header="Banner">
                        <button type="button" className="addButton" onClick={addNewBanner}>
                          <Icons iconName={faCirclePlus} />
                        </button>
                        <AccordionTable>
                          <thead>
                            <tr>
                              <th className="headingtable">Heading</th>
                              <th className="headingtable">Subheading</th>
                              <th className="headingtable">Bg Img(desktop) </th>
                              <th className="headingtable">Bg Img(mobile)</th>
                              <th className="headingtable">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Array.isArray(banner) && banner.map((item, index) => (
                              <tr key={index}>
                                <td className="paddingtable" width={"25%"}>
                                  <Input
                                    name={`banner[${index}].heading`}
                                    type="text"
                                    placeholder="Enter Heading"
                                    value={item.heading}
                                    onChange={(e) => handleBannerChange(index, "heading", e.target.value)}
                                  />
                                </td>
                                <td className="paddingtable" width={"25%"}>
                                  <Input
                                    name={`banner[${index}].subHeading`}
                                    type="text"
                                    placeholder="Enter Subheading"
                                    value={item.subHeading}
                                    onChange={(e) => handleBannerChange(index, "subHeading", e.target.value)}
                                  />
                                </td>
                                <td className="paddingtable" width={"25%"}>
                                  <ImageUploader
                                    name={`banner[${index}].banner_img`}
                                    value={item.banner_img}
                                    imageUrl={item.banner_img}
                                    onChange={(value) => handleBannerChange(index, "banner_img", value?.data?.image_url)}
                                    imgStyle={{ width: "80px" }}
                                  />
                                </td>
                                <td className="paddingtable" width={"25%"}>
                                  <ImageUploader
                                    name={`banner[${index}].mob_banner_img`}
                                    value={item.mob_banner_img}
                                    imageUrl={item.mob_banner_img}
                                    onChange={(value) => handleBannerChange(index, "mob_banner_img", value?.data?.image_url)}
                                    imgStyle={{ width: "80px" }}
                                  />
                                </td>
                                <td className="paddingtable" style={{ color: "red" }} width={"25%"} onClick={() => handleDeleteBanner(index)}>
                                  <Icons iconName={faTrash} />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </AccordionTable>
                      </FormAccordion>

                      {/* <FormAccordion key="0" header={values.banner?.heading || "Banner"}>
                        <AccordionTable>
                          <thead>
                            <tr>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.BANNER.DATA[0].ROW}</th>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.BANNER.DATA[1].ROW}</th>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.BANNER.DATA[2].ROW} (Desktop)</th>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.BANNER.DATA[2].ROW} (Mobile)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="paddingtable" s={"20%"}>
                                <Input
                                  name="banner.heading"
                                  type="text"
                                  placeholder="Enter Heading"
                                  onChange={handleChange}
                                  value={values.banner?.heading}
                                />
                              </td>
                              <td className="paddingtable" s={"30%"}>
                                <Input
                                  name="banner.subHeading"
                                  textarea="textarea"
                                  placeholder="Enter Sub Heading"
                                  onChange={handleChange}
                                  value={values.banner?.subHeading}
                                />
                              </td>
                              <td className="paddingtable" s={"30%"}>
                                <div className=" " >
                                  <ImageUploader
                                    imageUrl={values.banner.banner_img}
                                    onChange={(res) => {
                                      setFieldValue("banner.banner_img", res?.data?.image_url);
                                    }}
                                    imgStyle={{ width: "200px" }}
                                  />
                                </div>
                              </td>
                              <td className="paddingtable" s={"20%"}>
                                <div>
                                  <ImageUploader
                                    imageUrl={values.banner.mobile_banner_img}
                                    onChange={(res) => {
                                      setFieldValue("banner.mobile_banner_img", res?.data?.image_url);
                                    }}
                                    imgStyle={{ width: "150px" }}
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </AccordionTable>
                      </FormAccordion> */}
                      <FormAccordion header={values.alkinebenefits?.heading || "Alkine Benefits"}>
                        <AccordionTable>
                          <thead>
                            <tr>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.MEIZU_BENEFITS.DATA[0].ROW}</th>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.MEIZU_BENEFITS.DATA[1].ROW} (1540 x 480)</th>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.MEIZU_BENEFITS.DATA[1].ROW} (Mobile)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="headingtable" >
                                <Input
                                  name="alkinebenefits.heading"
                                  type="text"
                                  placeholder="Enter Heading"
                                  onChange={handleChange}
                                  value={values.alkinebenefits?.heading || ""}
                                />
                              </td>
                              <td className="paddingtable">
                                <div>
                                  <ImageUploader
                                    title="Image/Video"
                                    imageUrl={values.alkinebenefits.alkin_url}
                                    onChange={(res) => {
                                      setFieldValue("alkinebenefits.alkin_url", res?.data?.image_url);
                                    }}
                                    imgStyle={{ width: "100px" }}
                                  />
                                </div>
                              </td>
                              <td className="paddingtable">
                                <div>
                                  <ImageUploader
                                    title="Image/Video"
                                    imageUrl={values.alkinebenefits.mobile_alkin_url}
                                    onChange={(res) => {
                                      setFieldValue("alkinebenefits.mobile_alkin_url", res?.data?.image_url);
                                    }}
                                    imgStyle={{ width: "100px" }}
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </AccordionTable>
                        <button type="button" className="addButton" onClick={addNewBenefit}>
                          <Icons iconName={faCirclePlus} />
                        </button>
                        <AccordionTable>
                          <thead>
                            <tr>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.ALKALINE_WATER_BENEFITS.DATA[0].ROW}</th>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.ALKALINE_WATER_BENEFITS.DATA[1].ROW}</th>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.ALKALINE_WATER_BENEFITS.DATA[2].ROW}</th>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.ALKALINE_WATER_BENEFITS.DATA[3].ROW}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {alkalineWaterBenefits.map((benefit, index) => (
                              <tr key={index}>
                                <td className="paddingtable" width={"50%"}>
                                  <Input
                                    name="benefit"
                                    type="text"
                                    value={benefit.benefit}
                                    placeholder="Enter Benefit"
                                    onChange={(e) => handleBenefitChange(index, "benefit", e.target.value)}
                                  />
                                </td>
                                <td className="paddingtable" width={"5%"}>
                                  <Checkbox
                                    name="alkalineWater"
                                    checked={benefit.alkalineWater}
                                    onChange={() => handleBenefitChange(index, "alkalineWater", !benefit.alkalineWater)}
                                  />
                                </td>
                                <td className="paddingtable" width={"5%"}>
                                  <Checkbox
                                    name="normalWater"
                                    checked={benefit.normalWater}
                                    onChange={() => handleBenefitChange(index, "normalWater", !benefit.normalWater)}
                                  />
                                </td>
                                <td
                                  className="paddingtable"
                                  onClick={() => handleDeleteBenefit(index)}
                                  width={"5%"}
                                  style={{ paddingLeft: "3.5%", color: "red" }}
                                >
                                  <Icons iconName={faTrash} />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </AccordionTable>
                      </FormAccordion>
                      <FormAccordion header={values.meizuBenefits?.heading || "Meizu Benefits"}>
                        <AccordionTable>
                          <thead>
                            <tr>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.MEIZU_BENEFITS.DATA[0].ROW}</th>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.MEIZU_BENEFITS.DATA[1].ROW} (Desktop)</th>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.MEIZU_BENEFITS.DATA[1].ROW} (Mobile)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="paddingtable" >
                                <Input
                                  name="meizuBenefits.heading"
                                  type="text"
                                  placeholder="Enter Headings"
                                  onChange={(e) => {
                                    setFieldValue("meizuBenefits.heading", e.target.value);
                                  }}
                                  value={values.meizuBenefits?.heading}
                                />
                              </td>
                              <td className="paddingtable">
                                <div>
                                  <ImageUploader
                                    imageUrl={values.meizuBenefits.image}
                                    onChange={(res) => {
                                      setFieldValue("meizuBenefits.image", res?.data?.image_url);
                                    }}
                                    imgStyle={{ width: "80px" }}
                                  />
                                </div>
                              </td>
                              <td className="paddingtable">
                                <div>
                                  <ImageUploader
                                    imageUrl={values.meizuBenefits.mobile_image}
                                    onChange={(res) => {
                                      setFieldValue("meizuBenefits.mobile_image", res?.data?.image_url);
                                    }}
                                    imgStyle={{ width: "80px" }}
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </AccordionTable>
                        <button type="button" className="addButton" onClick={addNewProductBenefit}>
                          <Icons iconName={faCirclePlus} />
                        </button>
                        <AccordionTable>
                          <thead>
                            <tr>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.MEIZU_BENEFITSS.DATA[0].ROW}</th>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.MEIZU_BENEFITSS.DATA[1].ROW}</th>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.MEIZU_BENEFITSS.DATA[2].ROW}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {productBenefits.map((ProductBenefit, index) => (
                              <tr key={index}>
                                <td className="paddingtable" width={"50%"}>
                                  <Input
                                    name="heading"
                                    type="text"
                                    value={ProductBenefit.heading}
                                    placeholder="Enter new Heading"
                                    onChange={(e) => handleNewChange(index, "heading", e.target.value)}
                                  />
                                </td>
                                <td className="paddingtable" width={"35%"}>
                                  <div>
                                    <ImageUploader
                                      value={values.image}
                                      imageUrl={ProductBenefit.image}
                                      onChange={(e) => handleImageChangePro(e, index)}
                                      imgStyle={{ width: "80px" }}
                                    />
                                  </div>
                                </td>
                                {/* <td
                                  className="paddingtable"
                                  onClick={() => handleDeleteService(index)}
                                  width={"5%"}
                                  style={{ paddingLeft: "3.5%", color: "red" }}>
                                  <Icons iconName={faTrash} />
                                </td> */}
                                <td
                                  className="paddingtable "
                                  onClick={() => handleDeleteProductBenefit(index)}
                                  width={"5%"}
                                  style={{ paddingLeft: "1.5%", color: "red" }}
                                >
                                  <Icons iconName={faTrash} />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </AccordionTable>
                      </FormAccordion>
                      <FormAccordion header={values.infoLinks?.heading || "Info Links"}>
                        <AccordionTable>
                          <thead>
                            <tr>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.MEIZU_BENEFITS.DATA[0].ROW}</th>
                              <th className="headingtable">{"Redirection Link"}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="paddingtable" >
                                <Input
                                  name="infoLinks.heading"
                                  type="text"
                                  placeholder="Enter Headings"
                                  onChange={(e) => {
                                    setFieldValue("infoLinks.heading", e.target.value);
                                  }}
                                  value={values.infoLinks?.heading}
                                />
                              </td>
                              <td className="paddingtable" >
                                <Input
                                  name="infoLinks.subheading"
                                  type="text"
                                  placeholder="Enter subheading"
                                  onChange={(e) => {
                                    setFieldValue("infoLinks.subheading", e.target.value);
                                  }}
                                  value={values.infoLinks?.subheading}
                                />
                              </td>
                            </tr>
                            {/* <div className=" " style={{ width: "100%" }} >
                              <h5 style={{ marginBottom: "10px", fontWeight: "bold", color: "#00435a", marginTop: "10px" }}                            >
                                Description
                                <span style={{ color: "red" }}> *</span>
                              </h5>
                              <div style={{ height: "300px", overflow: "scroll" }}>
                                <ReactQuill theme="snow" value={values.infoLinks?.subheading} style={{ height: "200px" }}
                                  onChange={(value) => { setFieldValue("infoLinks.subheading", value) }}
                                />
                              </div>
                            </div> */}
                          </tbody>
                        </AccordionTable>
                      </FormAccordion>
                      <FormAccordion header={values.testimonial?.heading || "Testimonials"}>
                        <AccordionTable>
                          <thead>
                            <tr>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.MEIZU_BENEFITS.DATA[0].ROW}</th>
                              <th className="headingtable">{"Subheading"}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="paddingtable" >
                                <Input
                                  name="testimonial.heading"
                                  type="text"
                                  placeholder="Enter Headings"
                                  onChange={(e) => {
                                    setFieldValue("testimonial.heading", e.target.value);
                                  }}
                                  value={values.testimonial?.heading}
                                />
                              </td>
                              <td className="paddingtable" >
                                <Input
                                  name="testimonial.subheading"
                                  type="text"
                                  placeholder="Enter SubHeadings"
                                  onChange={(e) => {
                                    setFieldValue("testimonial.subheading", e.target.value);
                                  }}
                                  value={values.testimonial?.subheading}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </AccordionTable>
                      </FormAccordion>
                      <FormAccordion header={values?.customers?.heading || "Customer Says"}>
                        <button type="button" className="addButton" onClick={addNewService}>
                          <Icons iconName={faCirclePlus} />
                        </button>
                        <AccordionTable>
                          <thead>
                            <tr>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.MEIZU_BENEFITS.DATA[0].ROW}</th>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.MEIZU_BENEFITS.DATA[1].ROW}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="paddingtable" width={"50%"}>
                                <Input
                                  name="customers.heading"
                                  type="text"
                                  placeholder="Enter Headings"
                                  onChange={(e) => {
                                    setFieldValue("customers.heading", e.target.value);
                                  }}
                                  value={values?.customers?.heading}
                                />
                              </td>
                              <td className="paddingtable" width={"50%"}>
                                <ImageUploader
                                  title="Video"
                                  imageUrl={values?.customers?.video_url}
                                  onChange={(res) => {
                                    setFieldValue("customers.video_url", res?.data?.image_url);
                                  }}
                                  imgStyle={{ width: "100px" }}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </AccordionTable>
                        <AccordionTable>
                          <thead>
                            <tr>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.QUICK_SERVICES.DATA[0].ROW}</th>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.QUICK_SERVICES.DATA[1].ROW}</th>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.QUICK_SERVICES.DATA[2].ROW}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {quickServices.map((service, index) => (
                              <tr key={index}>
                                <td className="paddingtable" width={"35%"}>
                                  <Input
                                    name="title"
                                    type="text"
                                    value={service.title}
                                    placeholder="Enter Title"
                                    onChange={(e) => handleServiceChange(index, "title", e.target.value)}
                                  />
                                </td>
                                <td className="paddingtable" width={"35%"}>
                                  <div>
                                    <ImageUploader
                                      value={service.video_link}
                                      imageUrl={service.video_link}
                                      title="Video"
                                      onChange={(res) => handleServiceChange(index, "video_link", res?.data?.image_url)}
                                      imgStyle={{ width: "50%" }}
                                    />
                                    {/* 
                                    <Input
                                      name="test_video_link"
                                      type="file"
                                      accept="video/*"
                                      onChange={handleChange}
                                      value={service.test_video_link}
                                    /> */}
                                  </div>
                                </td>
                                <td
                                  className="paddingtable"
                                  onClick={() => handleDeleteService(index)}
                                  width={"5%"}
                                  style={{ paddingLeft: "3.5%", color: "red" }}
                                >
                                  <Icons iconName={faTrash} />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </AccordionTable>
                      </FormAccordion>
                      <FormAccordion header={"Quick Services"}>
                        <button type="button" className="addButton" onClick={addNewServ}>
                          <Icons iconName={faCirclePlus} />
                        </button>
                        <AccordionTable>
                          <thead>
                            <tr>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.QUICK_SERVICES.DATA[0].ROW}</th>
                              <th className="headingtable">Image</th>
                              <th className="headingtable">{DYNAMIC_HOMEPAGE.QUICK_SERVICES.DATA[2].ROW}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {services.map((service, index) => (
                              <tr key={index}>
                                <td className="paddingtable" width={"70%"}>
                                  <Input
                                    name="title"
                                    type="text"
                                    value={service.title}
                                    placeholder="Enter Title"
                                    onChange={(e) => handleSerChange(index, "title", e.target.value)}
                                  />
                                </td>
                                <td className="paddingtable" width={"20%"}>
                                  <div>
                                    <ImageUploader
                                      value={service.image}
                                      imageUrl={service.image}
                                      title="Image"
                                      onChange={(res) => handleSerChange(index, "image", res?.data?.image_url)}
                                      imgStyle={{ width: "80px" }}
                                    />
                                  </div>
                                </td>
                                <td
                                  className="paddingtable"
                                  onClick={() => handleDeleteSer(index)}
                                  width={"5%"}
                                  style={{ color: "red" }}
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
                  <div className="card-footer">
                    <div className="submit-button">
                      <Button1 buttonValue="Submit" onClick={handleSubmit} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default HomePage;
