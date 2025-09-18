import React, { useEffect, useState } from "react";
import "./style.scss";
import * as formik from "formik";
import NavBar from "../../components/navbar";
import Button1 from "../../components/button";
import Input from "../../components/input";
import { useNavigate } from "react-router";
import { HOME_SIDEBAR, HOME_PAGE, NAVBAR, TABLE_DATA, DYNAMIC_WATERTYPE_PAGE } from "../../const";
import HomeSidebar from "../../components/homeSidebar";
import { FormAccordion } from "../../components/accordion";
import { AccordionTable } from "../../components/table";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Icons from "../../components/icons";
import WaterTypeProvider from "../../allProvider/waterType.provider";
import ImageUploader from "../../imageUploader";

const WaterTypePage = () => {
  const {
    waterType,
    addNewWaterType,
    handleWaterTypeChange,
    handleDeleteWaterType,
    waterPHscale,
    addNewWaterPHscale,
    handleWaterPHscaleChange,
    handleDeleteWaterPHscale,
    healthBenefits,
    addNewHealthBenefit,
    handleHealthBenefitChange,
    handleDeleteHealthBenefit,
    waterTypePageData,
    getWaterTypePageData,
    updateWaterTypePageData,
    setWaterType,
    setWaterPHscale,
    setHealthBenefits,
  } = WaterTypeProvider();

  const { Formik } = formik;

  useEffect(() => {
    getWaterTypePageData();
  }, []);

  const [fileInput, setFileInput] = useState([]);

  const setBannerImage = (value) => {
    if (value?.data?.image_url) {
      setFileInput(value?.data?.image_url);
    } else {
      setFileInput("");
    }
  };

  useEffect(() => {
    if (waterTypePageData?.page_content?.waterType) {
      setWaterType(waterTypePageData.page_content.waterType);
    }
    if (waterTypePageData?.page_content?.waterPHscale) {
      setWaterPHscale(waterTypePageData.page_content.waterPHscale);
    }
    if (waterTypePageData?.page_content?.healthBenefits) {
      setHealthBenefits(waterTypePageData.page_content.healthBenefits);
    }
  }, [waterTypePageData]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        slug_url: waterTypePageData.slug_url || "",
        meta_title: waterTypePageData.meta_title || "",
        meta_desc: waterTypePageData.meta_desc || "",
        meta_keywords: waterTypePageData.meta_keywords || "",
        banner: {
          banner_img: waterTypePageData.page_content.banner?.banner_img || "",
          heading: waterTypePageData.page_content.banner?.heading || "",
          subHeading: waterTypePageData.page_content.banner?.subHeading || "",
          mobile_banner_img: waterTypePageData.page_content.banner?.mobile_banner_img || "",
        },
        waterTypes: {
          heading: waterTypePageData.page_content.waterTypes?.heading || "",
          subHeading: waterTypePageData.page_content.waterTypes?.subHeading || "",
          bg_img: waterTypePageData.page_content.waterTypes?.bg_img || "",
          bg_img_mob: waterTypePageData.page_content.waterTypes?.bg_img_mob || "",
        },
        waterPHScale: {
          heading: waterTypePageData.page_content.waterPHScale?.heading || "",
          subHeading: waterTypePageData.page_content.waterPHScale?.subHeading || "",
        },
        healthBenefit: {
          heading: waterTypePageData.page_content.healthBenefit?.heading || "",
          subHeading: waterTypePageData.page_content.healthBenefit?.subHeading || "",
        },
      }}
      onSubmit={(data) => {
        const updatedData = {
          slug_url: data.slug_url,
          meta_title: data.meta_title,
          meta_desc: data.meta_desc,
          meta_keywords: data.meta_keywords,
          page_content: {
            banner: { ...data.banner },
            // waterTypes: data.waterTypes,
            waterTypes: {
              heading: data.waterTypes?.heading || "",
              subHeading: data.waterTypes?.subHeading || "",
              bg_img: data.waterTypes?.bg_img || "",
              bg_img_mob: data.waterTypes?.bg_img_mob || "",
            },

            waterPHScale: data.waterPHScale,
            healthBenefit: data.healthBenefit,
            waterType: waterType,
            waterPHscale: waterPHscale,
            healthBenefits: healthBenefits,
          },
        };
        updateWaterTypePageData(updatedData);
      }}
    >
      {({ handleSubmit, handleChange, values, setFieldValue }) => (
        <form noValidate onSubmit={handleSubmit}>
          <div className="container">
            <NavBar brandName={NAVBAR.BRAND_IMAGE} profileName={NAVBAR.PROFILE_NAME} profileOption={NAVBAR.PROFILE_OPTION} />
            <div className="content-wrapper">
              <HomeSidebar accordions={HOME_SIDEBAR} />
              <div className="main-content">
                <div className="card-body">
                  <div className="product-navbar">
                    <div className="product-heading">{HOME_SIDEBAR[0].items[2].LABEL}</div>
                  </div>
                  <div className="main-accordion1">
                    <div className="accordion1">
                      <FormAccordion header={DYNAMIC_WATERTYPE_PAGE.META.HEADER}>
                        <AccordionTable>
                          <thead>
                            <tr>
                              <th className="headingtable">{DYNAMIC_WATERTYPE_PAGE.META.DATA[0].ROW}</th>
                              <th className="headingtable">{DYNAMIC_WATERTYPE_PAGE.META.DATA[1].ROW}</th>
                              <th className="headingtable">{DYNAMIC_WATERTYPE_PAGE.META.DATA[2].ROW}</th>
                              <th className="headingtable">{DYNAMIC_WATERTYPE_PAGE.META.DATA[3].ROW}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="paddingtable" width={"25%"}>
                                <Input name="slug_url" type="text" placeholder="Enter Slug URL" onChange={handleChange} value={values.slug_url} />
                              </td>
                              <td className="paddingtable" width={"25%"}>
                                <Input name="meta_title" type="text" placeholder="Enter Title" onChange={handleChange} value={values.meta_title} />
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
                                  name="search_keywords"
                                  textarea="textarea"
                                  placeholder="Enter Keywords"
                                  onChange={handleChange}
                                  value={values.search_keywords}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </AccordionTable>
                      </FormAccordion>
                      <FormAccordion key="0" header={DYNAMIC_WATERTYPE_PAGE.BANNER.HEADER}>
                        <AccordionTable>
                          <thead>
                            <tr>
                              <th className="headingtable">{DYNAMIC_WATERTYPE_PAGE.BANNER.DATA[0].ROW}</th>
                              <th className="headingtable">{DYNAMIC_WATERTYPE_PAGE.BANNER.DATA[1].ROW}</th>
                              <th className="headingtable">{DYNAMIC_WATERTYPE_PAGE.BANNER.DATA[2].ROW} (Desktop)</th>
                              <th className="headingtable">{DYNAMIC_WATERTYPE_PAGE.BANNER.DATA[2].ROW} (Mobile)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="paddingtable" width={"25%"}>
                                <Input
                                  name="banner.heading"
                                  type="text"
                                  placeholder="Enter Heading"
                                  onChange={handleChange}
                                  value={values.banner?.heading}
                                />
                              </td>
                              <td className="paddingtable" width={"35%"}>
                                <Input
                                  name="banner.subHeading"
                                  textarea="textarea"
                                  placeholder="Enter Sub Heading"
                                  onChange={handleChange}
                                  value={values.banner?.subHeading}
                                />
                              </td>
                              <td className="paddingtable" width={"20%"}>
                                <div>
                                  <ImageUploader
                                    imageUrl={values.banner.banner_img}
                                    onChange={(res) => {
                                      setFieldValue("banner.banner_img", res?.data?.image_url);
                                    }}
                                    imgStyle={{ width: "200px" }}
                                  />
                                </div>
                              </td>
                              <td className="paddingtable" width={"20%"}>
                                <div>
                                  <ImageUploader
                                    imageUrl={values.banner.mobile_banner_img}
                                    onChange={(res) => {
                                      setFieldValue("banner.mobile_banner_img", res?.data?.image_url);
                                    }}
                                    imgStyle={{ width: "100px" }}
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </AccordionTable>
                      </FormAccordion>
                      <FormAccordion header={values.waterTypes?.heading}>
                        <AccordionTable>
                          <thead>
                            <tr>
                              <th className="headingtable">{DYNAMIC_WATERTYPE_PAGE.WATER_TYPES.DATA[0].ROW}</th>
                              <th className="headingtable">{DYNAMIC_WATERTYPE_PAGE.WATER_TYPES.DATA[1].ROW}</th>
                              <th className="headingtable"> Bg Img Desktop(1540 x 480)</th>
                              <th className="headingtable"> Bg Img Mobile</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="paddingtable" width={"25%"}>
                                <Input
                                  name="waterTypes.heading"
                                  type="text"
                                  placeholder="Enter Heading"
                                  onChange={handleChange}
                                  value={values.waterTypes?.heading}
                                />
                              </td>
                              <td className="paddingtable" width={"35%"}>
                                <Input
                                  name="waterTypes.subHeading"
                                  textarea="textarea"
                                  placeholder="Enter Sub Heading"
                                  onChange={handleChange}
                                  value={values.waterTypes?.subHeading}
                                />
                              </td>

                              <td className="paddingtable">
                                <div>
                                  <ImageUploader
                                    title="Image/Video"
                                    imageUrl={values.waterTypes.bg_img}
                                    onChange={(res) => {
                                      setFieldValue("waterTypes.bg_img", res?.data?.image_url);
                                    }}
                                    imgStyle={{ width: "100px" }}
                                  />
                                </div>
                              </td>
                              <td className="paddingtable">
                                <div>
                                  <ImageUploader
                                    title="Image/Video"
                                    imageUrl={values.waterTypes.bg_img_mob}
                                    onChange={(res) => {
                                      setFieldValue("waterTypes.bg_img_mob", res?.data?.image_url);
                                    }}
                                    imgStyle={{ width: "100px" }}
                                  />
                                </div>
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
                              <th className="headingtable">{DYNAMIC_WATERTYPE_PAGE.WATER_TYPES.DATA[2].ROW}</th>
                              <th className="headingtable">{DYNAMIC_WATERTYPE_PAGE.WATER_TYPES.DATA[3].ROW}</th>
                              <th className="headingtable">{DYNAMIC_WATERTYPE_PAGE.WATER_TYPES.DATA[5].ROW}</th>
                              <th className="headingtable">{DYNAMIC_WATERTYPE_PAGE.WATER_TYPES.DATA[4].ROW}</th>
                              <th className="headingtable">{DYNAMIC_WATERTYPE_PAGE.WATER_TYPES.DATA[6].ROW}</th>
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
                                  <Input
                                    name="subTitle"
                                    type="text"
                                    value={type.subTitle}
                                    placeholder="Enter Sub Title"
                                    onChange={(e) => handleWaterTypeChange(index, "subTitle", e.target.value)}
                                  />
                                </td>
                                <td className="paddingtable" width={"20%"}>
                                  <Input
                                    name="btn_cta"
                                    type="text"
                                    value={type.btn_cta}
                                    placeholder="Enter Link"
                                    onChange={(e) => handleWaterTypeChange(index, "btn_cta", e.target.value)}
                                  />
                                </td>
                                <td className="paddingtable" width={"15%"}>
                                  <ImageUploader
                                    imageUrl={type.bg_img}
                                    onChange={(res) => {
                                      handleWaterTypeChange(index, "bg_img", res?.data?.image_url)
                                    }}
                                    imgStyle={{ width: "100px" }}
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
                      <FormAccordion header={DYNAMIC_WATERTYPE_PAGE.WATER_PH_SCALE.HEADER}>
                        <AccordionTable>
                          <thead>
                            <tr>
                              <th className="headingtable">{DYNAMIC_WATERTYPE_PAGE.WATER_PH_SCALE.DATA[0].ROW}</th>
                              <th className="headingtable">{DYNAMIC_WATERTYPE_PAGE.WATER_PH_SCALE.DATA[1].ROW}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="paddingtable" width={"25%"}>
                                <Input
                                  name="waterPHScale.heading"
                                  type="text"
                                  placeholder="Enter Heading"
                                  onChange={handleChange}
                                  value={values.waterPHScale?.heading}
                                />
                              </td>
                              <td className="paddingtable" width={"35%"}>
                                <Input
                                  name="waterPHScale.subHeading"
                                  textarea="textarea"
                                  placeholder="Enter Sub Heading"
                                  onChange={handleChange}
                                  value={values.waterPHScale?.subHeading}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </AccordionTable>
                        <button type="button" className="addButton" onClick={addNewWaterPHscale}>
                          <Icons iconName={faCirclePlus} />
                        </button>
                        <AccordionTable>
                          <thead>
                            <tr>
                              <th className="headingtable">{DYNAMIC_WATERTYPE_PAGE.WATER_PH_SCALE.DATA[2].ROW}</th>
                              <th className="headingtable">{DYNAMIC_WATERTYPE_PAGE.WATER_PH_SCALE.DATA[3].ROW}</th>
                              <th className="headingtable">{DYNAMIC_WATERTYPE_PAGE.WATER_PH_SCALE.DATA[4].ROW}</th>
                              <th className="headingtable">{DYNAMIC_WATERTYPE_PAGE.WATER_PH_SCALE.DATA[5].ROW}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {waterPHscale.map((type, index) => (
                              <tr>
                                <td className="paddingtable" width={"20%"}>
                                  <Input
                                    name="title"
                                    type="text"
                                    value={type.title}
                                    placeholder="Enter Title"
                                    onChange={(e) => handleWaterPHscaleChange(index, "title", e.target.value)}
                                  />
                                </td>
                                <td className="paddingtable" width={"20%"}>
                                  <Input
                                    name="subTitle"
                                    type="text"
                                    value={type.subTitle}
                                    placeholder="Enter Sub Title"
                                    onChange={(e) => handleWaterPHscaleChange(index, "subTitle", e.target.value)}
                                  />
                                </td>
                                <td className="paddingtable" width={"10%"}>
                                  <ImageUploader
                                    imageUrl={type.img}
                                    onChange={(res) => {
                                      handleWaterPHscaleChange(index, "img", res?.data?.image_url)
                                    }}
                                    imgStyle={{ width: "100px" }}
                                  />
                                </td>
                                <td
                                  className="paddingtable"
                                  onClick={() => handleDeleteWaterPHscale(index)}
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
                      <FormAccordion header={DYNAMIC_WATERTYPE_PAGE.HEALTH_BENEFITS.HEADER}>
                        <AccordionTable>
                          <thead>
                            <tr>
                              <th className="headingtable">{DYNAMIC_WATERTYPE_PAGE.HEALTH_BENEFITS.DATA[0].ROW}</th>
                              <th className="headingtable">{DYNAMIC_WATERTYPE_PAGE.HEALTH_BENEFITS.DATA[1].ROW}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="paddingtable" width={"25%"}>
                                <Input
                                  name="healthBenefit.heading"
                                  type="text"
                                  placeholder="Enter Heading"
                                  onChange={handleChange}
                                  value={values.healthBenefit?.heading}
                                />
                              </td>
                              <td className="paddingtable" width={"35%"}>
                                <Input
                                  name="healthBenefit.subHeading"
                                  textarea="textarea"
                                  placeholder="Enter Sub Heading"
                                  onChange={handleChange}
                                  value={values.healthBenefit?.subHeading}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </AccordionTable>
                        <button type="button" className="addButton" onClick={addNewHealthBenefit}>
                          <Icons iconName={faCirclePlus} />
                        </button>
                        <AccordionTable>
                          <thead>
                            <tr>
                              <th className="headingtable">{DYNAMIC_WATERTYPE_PAGE.HEALTH_BENEFITS.DATA[2].ROW}</th>
                              <th className="headingtable">{DYNAMIC_WATERTYPE_PAGE.HEALTH_BENEFITS.DATA[3].ROW}</th>
                              <th className="headingtable">{DYNAMIC_WATERTYPE_PAGE.HEALTH_BENEFITS.DATA[4].ROW}</th>
                              <th className="headingtable">{DYNAMIC_WATERTYPE_PAGE.HEALTH_BENEFITS.DATA[5].ROW}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {healthBenefits.map((type, index) => (
                              <tr>
                                <td className="paddingtable" width={"20%"}>
                                  <Input
                                    name="title"
                                    type="text"
                                    value={type.title}
                                    placeholder="Enter Title"
                                    onChange={(e) => handleHealthBenefitChange(index, "title", e.target.value)}
                                  />
                                </td>
                                <td className="paddingtable" width={"20%"}>
                                  <Input
                                    name="subTitle"
                                    type="text"
                                    value={type.subTitle}
                                    placeholder="Enter Sub Title"
                                    onChange={(e) => handleHealthBenefitChange(index, "subTitle", e.target.value)}
                                  />
                                </td>
                                <td className="paddingtable" width={"10%"}>
                                  <ImageUploader
                                    imageUrl={type.img}
                                    onChange={(res) => {
                                      handleHealthBenefitChange(index, "img", res?.data?.image_url)
                                    }}
                                    imgStyle={{ width: "100px" }}
                                  />
                                </td>
                                <td
                                  className="paddingtable"
                                  onClick={() => handleDeleteHealthBenefit(index)}
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

export default WaterTypePage;
