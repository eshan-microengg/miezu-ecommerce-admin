import React, { useEffect, useState } from 'react';
import './style.scss';
import * as formik from 'formik';
import NavBar from '../../components/navbar';
import Button1 from '../../components/button';
import Input from '../../components/input';
import { HOME_SIDEBAR, NAVBAR, DYNAMIC_ABOUTUS_PAGE, OTHER } from '../../const';
import HomeSidebar from '../../components/homeSidebar';
import { FormAccordion } from '../../components/accordion';
import { AccordionTable } from '../../components/table';
import ImageUploader from '../../imageUploader';
import OthersProvider from '../../allProvider/others.provider';

const Others = () => {

    const { othersData, setOthersData, getOthersPageData, updateOthersPageData, } = OthersProvider();
    const { Formik } = formik

    useEffect(() => {
        getOthersPageData();
    }, []);

    useEffect(() => {
        if (othersData?.page_content?.banner?.banner_img) {
            setFileInput(othersData?.page_content.banner?.banner_img)
        }
        if (othersData?.page_content?.blog_banner?.banner_img) {
            setFileInput(othersData?.page_content.blog_banner?.banner_img)
        }
        if (othersData?.page_content?.order_banner?.banner_img) {
            setFileInput(othersData?.page_content.order_banner?.banner_img)
        }
        if (othersData?.page_content?.login_banner?.banner_img) {
            setFileInput(othersData?.page_content.login_banner?.banner_img)
        }

    }, [othersData]);

    const [fileInput, setFileInput] = useState([]);
    const [fileInput2, setFileInput2] = useState([]);

    const handleImageChange = (value) => {
        if (value?.data?.image_url) {
            setFileInput(value?.data?.image_url)
        } else { setFileInput("") }
    }

    const handleImageChangePro = (value, index) => {
        if (value?.data?.image_url) {
            setFileInput2(value?.data?.image_url)
        } else {
            setFileInput2("")
        }
        // handleFounderChange(index, 'image', value?.data?.image_url)
    }

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                slug_url: othersData?.slug_url || "",
                meta_title: othersData?.meta_title || "",
                meta_desc: othersData?.meta_desc || "",
                meta_keywords: othersData?.meta_keywords || "",
                banner: {
                    slug_url: othersData?.page_content?.banner?.slug_url || "",
                    meta_title: othersData?.page_content?.banner?.meta_title || "",
                    meta_desc: othersData?.page_content?.banner?.meta_desc || "",
                    meta_keywords: othersData?.page_content?.banner?.meta_keywords || "",
                    heading: othersData?.page_content?.banner?.heading || "",
                    subHeading: othersData?.page_content?.banner?.subHeading || "",
                    banner_img: othersData?.page_content?.banner?.banner_img || "",
                    mobile_banner_img: othersData?.page_content?.banner?.mobile_banner_img || "",
                },
                blog_banner: {
                    slug_url: othersData?.page_content?.blog_banner?.slug_url || "",
                    meta_title: othersData?.page_content?.blog_banner?.meta_title || "",
                    meta_desc: othersData?.page_content?.blog_banner?.meta_desc || "",
                    meta_keywords: othersData?.page_content?.blog_banner?.meta_keywords || "",
                    heading: othersData?.page_content?.blog_banner?.heading || "",
                    subHeading: othersData?.page_content?.blog_banner?.subHeading || "",
                    banner_img: othersData?.page_content?.blog_banner?.banner_img || "",
                    mobile_banner_img: othersData?.page_content?.blog_banner?.mobile_banner_img || "",
                },
                order_banner: {
                    heading: othersData?.page_content?.order_banner?.heading || "",
                    subHeading: othersData?.page_content?.order_banner?.subHeading || "",
                    banner_img: othersData?.page_content?.order_banner?.banner_img || "",
                    mobile_banner_img: othersData?.page_content?.order_banner?.mobile_banner_img || "",
                },
                login_banner: {
                    banner_img: othersData?.page_content?.login_banner?.banner_img || "",
                    mobile_banner_img: othersData?.page_content?.login_banner?.mobile_banner_img || "",
                },
            }}
            onSubmit={data => {
                const updatedData = {
                    slug_url: data?.slug_url,
                    meta_title: data?.meta_title,
                    meta_desc: data?.meta_desc,
                    meta_keywords: data?.meta_keywords,
                    page_content: {
                        banner: data?.banner,
                        blog_banner: data?.blog_banner,
                        order_banner: data?.order_banner,
                        login_banner: data?.login_banner
                    }
                }
                updateOthersPageData(updatedData);
            }}>
            {({ handleSubmit, handleChange, values, setFieldValue }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <div className="container">
                        <NavBar brandName={NAVBAR.BRAND_IMAGE} profileName={NAVBAR.PROFILE_NAME} profileOption={NAVBAR.PROFILE_OPTION} />
                        <div className="content-wrapper">
                            <HomeSidebar accordions={HOME_SIDEBAR} />
                            <div className="main-content">
                                <div className='card-body'>
                                    <div className='product-navbar'>
                                        <div className='product-heading'>
                                            {HOME_SIDEBAR[0].items[5].LABEL}
                                        </div>
                                    </div>
                                    <div className='main-accordion1'>
                                        <div className='accordion1'>
                                            <FormAccordion header={"Product List Page Meta Seo"}>
                                                <AccordionTable>
                                                    <thead>
                                                        <tr>
                                                            <th className="headingtable">Meta Title</th>
                                                            <th className="headingtable">Slug Url</th>
                                                            <th className="headingtable">Meta Description</th>
                                                            <th className="headingtable">Meta Keywords</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="paddingtable" width={"25%"}>
                                                                <Input name="banner.meta_title" type="text" placeholder="Enter Title" onChange={handleChange} value={values?.banner?.meta_title} />
                                                            </td>
                                                            <td className="paddingtable" width={"25%"}>
                                                                <Input name="banner.slug_url" type="text" placeholder="Enter Slug URL" onChange={handleChange} value={values?.banner?.slug_url} />
                                                            </td>
                                                            <td className="paddingtable" width={"25%"}>
                                                                <Input
                                                                    name="banner.meta_desc"
                                                                    textarea="textarea"
                                                                    placeholder="Enter Description"
                                                                    onChange={handleChange}
                                                                    value={values?.banner?.meta_desc}
                                                                />
                                                            </td>
                                                            <td className="paddingtable" width={"25%"}>
                                                                <Input
                                                                    name="banner.meta_keywords"
                                                                    textarea="textarea"
                                                                    placeholder="Enter Keywords"
                                                                    onChange={handleChange}
                                                                    value={values?.banner?.meta_keywords}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </AccordionTable>
                                            </FormAccordion>
                                            <FormAccordion key="0" header={"Product List Page Banner"}>
                                                <AccordionTable>
                                                    <thead>
                                                        <tr>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.BANNER.DATA[0].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.BANNER.DATA[1].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.BANNER.DATA[2].ROW} (Desktop)</th>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.BANNER.DATA[2].ROW} (Mobile)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className='paddingtable' width={"20%"}>
                                                                <Input
                                                                    name="banner.heading"
                                                                    type="text"
                                                                    placeholder="Enter Heading"
                                                                    onChange={handleChange}
                                                                    value={values?.banner?.heading}
                                                                />
                                                            </td>
                                                            <td className='paddingtable' width={"40%"}>
                                                                <Input
                                                                    name="banner.subHeading"
                                                                    textarea="textarea"
                                                                    placeholder="Enter Sub Heading"
                                                                    onChange={handleChange}
                                                                    value={values?.banner?.subHeading}
                                                                />
                                                            </td>
                                                            <td className='paddingtable' width={"20%"}>
                                                                <div>
                                                                    <ImageUploader
                                                                        imageUrl={values?.banner?.banner_img}
                                                                        onChange={(res) => {
                                                                            setFieldValue("banner.banner_img", res?.data?.image_url);
                                                                        }} imgStyle={{ width: "100px" }}
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td className='paddingtable' width={"20%"}>
                                                                <div>
                                                                    <ImageUploader
                                                                        imageUrl={values?.banner?.mobile_banner_img}
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
                                            <FormAccordion header={"Blog List Page Meta Seo"}>
                                                <AccordionTable>
                                                    <thead>
                                                        <tr>
                                                            <th className="headingtable">Meta Title</th>
                                                            <th className="headingtable">Slug Url</th>
                                                            <th className="headingtable">Meta Description</th>
                                                            <th className="headingtable">Meta Keywords</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="paddingtable" width={"25%"}>
                                                                <Input name="blog_banner.meta_title" type="text" placeholder="Enter Title" onChange={handleChange} value={values?.blog_banner?.meta_title} />
                                                            </td>
                                                            <td className="paddingtable" width={"25%"}>
                                                                <Input name="blog_banner.slug_url" type="text" placeholder="Enter Slug URL" onChange={handleChange} value={values?.blog_banner?.slug_url} />
                                                            </td>
                                                            <td className="paddingtable" width={"25%"}>
                                                                <Input
                                                                    name="blog_banner.meta_desc"
                                                                    textarea="textarea"
                                                                    placeholder="Enter Description"
                                                                    onChange={handleChange}
                                                                    value={values?.blog_banner?.meta_desc}
                                                                />
                                                            </td>
                                                            <td className="paddingtable" width={"25%"}>
                                                                <Input
                                                                    name="blog_banner.meta_keywords"
                                                                    textarea="textarea"
                                                                    placeholder="Enter Keywords"
                                                                    onChange={handleChange}
                                                                    value={values?.blog_banner?.meta_keywords}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </AccordionTable>
                                            </FormAccordion>
                                            <FormAccordion key="0" header={"Blog List Page Banner"}>
                                                <AccordionTable>
                                                    <thead>
                                                        <tr>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.BANNER.DATA[0].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.BANNER.DATA[1].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.BANNER.DATA[2].ROW} (Desktop)</th>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.BANNER.DATA[2].ROW} (Mobile)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className='paddingtable' width={"20%"}>
                                                                <Input
                                                                    name="blog_banner.heading"
                                                                    type="text"
                                                                    placeholder="Enter Heading"
                                                                    onChange={handleChange}
                                                                    value={values?.blog_banner?.heading}
                                                                />
                                                            </td>
                                                            <td className='paddingtable' width={"40%"}>
                                                                <Input
                                                                    name="blog_banner.subHeading"
                                                                    textarea="textarea"
                                                                    placeholder="Enter Sub Heading"
                                                                    onChange={handleChange}
                                                                    value={values?.blog_banner?.subHeading}
                                                                />
                                                            </td>
                                                            <td className='paddingtable' width={"20%"}>
                                                                <div>
                                                                    <ImageUploader
                                                                        imageUrl={values?.blog_banner?.banner_img}
                                                                        onChange={(res) => {
                                                                            setFieldValue("blog_banner.banner_img", res?.data?.image_url);
                                                                        }} imgStyle={{ width: "100px" }}
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td className='paddingtable' width={"20%"}>
                                                                <div>
                                                                    <ImageUploader
                                                                        imageUrl={values?.blog_banner?.mobile_banner_img}
                                                                        onChange={(res) => {
                                                                            setFieldValue("blog_banner.mobile_banner_img", res?.data?.image_url);
                                                                        }}
                                                                        imgStyle={{ width: "100px" }}
                                                                    />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </AccordionTable>
                                            </FormAccordion>
                                            <FormAccordion key="1" header={"Order Page Banner"}>
                                                <AccordionTable>
                                                    <thead>
                                                        <tr>
                                                            <th className='headingtable'>{OTHER.BANNER.DATA[0].ROW}</th>
                                                            <th className='headingtable'>{OTHER.BANNER.DATA[1].ROW}</th>
                                                            <th className='headingtable'>{OTHER.BANNER.DATA[2].ROW} (Desktop)</th>
                                                            <th className='headingtable'>{OTHER.BANNER.DATA[2].ROW} (Mobile)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className='paddingtable' width={"20%"}>
                                                                <Input
                                                                    name="order_banner.heading"
                                                                    type="text"
                                                                    placeholder="Enter Heading"
                                                                    onChange={handleChange}
                                                                    value={values?.order_banner?.heading}
                                                                />
                                                            </td>
                                                            <td className='paddingtable' width={"40%"}>
                                                                <Input
                                                                    name="order_banner.subHeading"
                                                                    textarea="textarea"
                                                                    placeholder="Enter Sub Heading"
                                                                    onChange={handleChange}
                                                                    value={values?.order_banner?.subHeading}
                                                                />
                                                            </td>
                                                            <td className='paddingtable' width={"20%"}>
                                                                <div>
                                                                    <ImageUploader
                                                                        imageUrl={values?.order_banner?.banner_img}
                                                                        onChange={(res) => {
                                                                            setFieldValue("order_banner.banner_img", res?.data?.image_url);
                                                                        }} imgStyle={{ width: "100px" }}
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td className='paddingtable' width={"20%"}>
                                                                <div>
                                                                    <ImageUploader
                                                                        imageUrl={values?.order_banner?.mobile_banner_img}
                                                                        onChange={(res) => {
                                                                            setFieldValue("order_banner.mobile_banner_img", res?.data?.image_url);
                                                                        }}
                                                                        imgStyle={{ width: "100px" }}
                                                                    />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </AccordionTable>
                                            </FormAccordion>
                                            <FormAccordion key="2" header={"Login Page Banner"}>
                                                <AccordionTable>
                                                    <thead>
                                                        <tr>
                                                            <th className='headingtable'>{OTHER.BANNER.DATA[2].ROW} (Desktop)</th>
                                                            <th className='headingtable'>{OTHER.BANNER.DATA[2].ROW} (Mobile)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className='paddingtable' width={"50%"}>
                                                                <div>
                                                                    <ImageUploader
                                                                        imageUrl={values?.login_banner?.banner_img}
                                                                        onChange={(res) => {
                                                                            setFieldValue("login_banner.banner_img", res?.data?.image_url);
                                                                        }} imgStyle={{ width: "100px" }}
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td className='paddingtable' width={"50%"}>
                                                                <div>
                                                                    <ImageUploader
                                                                        imageUrl={values?.login_banner?.mobile_banner_img}
                                                                        onChange={(res) => {
                                                                            setFieldValue("login_banner.mobile_banner_img", res?.data?.image_url);
                                                                        }}
                                                                        imgStyle={{ width: "100px" }}
                                                                    />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </AccordionTable>
                                            </FormAccordion>
                                        </div>
                                    </div>
                                    <div className='card-footer'>
                                        <div className='submit-button'>
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

export default Others;