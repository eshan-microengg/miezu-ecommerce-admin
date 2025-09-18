import React, { useEffect, useState } from 'react';
import './style.scss';
import * as formik from 'formik';
import * as Yup from 'yup';
import NavBar from '../../components/navbar';
import Button1 from '../../components/button';
import Input from '../../components/input';
import { HOME_SIDEBAR, NAVBAR, DYNAMIC_ABOUTUS_PAGE } from '../../const';
import HomeSidebar from '../../components/homeSidebar';
import { FormAccordion } from '../../components/accordion';
import { AccordionTable } from '../../components/table';
import Icons from '../../components/icons';
import { faCirclePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import AboutUsProvider from '../../allProvider/aboutUs.provider';
import ImageUploader from '../../imageUploader';

const AboutUsPage = () => {

    const {
        aboutUsPageData,
        setAboutUsPageData,
        getAboutUsPageData,
        updateAboutUsPageData,
        foundersData,
        setFoundersData,
        addNewFounder,
        handleDeleteFounder,
        handleFounderChange,
        motto,
        setMotto,
        addNewMotto,
        handleMottoChange,
        handleDeleteMotto,
        principle,
        setPrinciple,
        addNewPrinciple,
        handlePrincipleChange,
        handleDeletePrinciple,
        certifications,
        setCertifications,
        addCertification,
        removeCertification,
        updateCertification
    } = AboutUsProvider();

    const { Formik } = formik

    // Validation schema for certifications
    const certificationValidationSchema = Yup.object({
        certifications: Yup.object({
            heading: Yup.string(),
            subHeading: Yup.string(),
            description: Yup.string(),
        })
    });

    useEffect(() => {
        getAboutUsPageData();
    }, []);

    useEffect(() => {
        if (aboutUsPageData?.page_content?.founderData) {
            setFoundersData(aboutUsPageData.page_content.founderData);
        }
        if (aboutUsPageData?.page_content?.motto) {
            setMotto(aboutUsPageData.page_content.motto);
        }
        if (aboutUsPageData?.page_content?.principle) {
            setPrinciple(aboutUsPageData.page_content.principle);
        }
        if (aboutUsPageData?.page_content?.certifications?.certifications) {
            setCertifications(aboutUsPageData.page_content.certifications.certifications);
        }
        if (aboutUsPageData.page_content.banner?.banner_img) {
            setFileInput(aboutUsPageData.page_content.banner?.banner_img)
        }

    }, [aboutUsPageData]);

    const [fileInput, setFileInput] = useState([]);
    const [fileInput2, setFileInput2] = useState([]);

    const handleImageChange = (value) => {
        if (value?.data?.image_url) {
            setFileInput(value?.data?.image_url)
        } else {
            setFileInput("")
        }
    }

    const handleImageChangePro = (value, index) => {
        if (value?.data?.image_url) {
            setFileInput2(value?.data?.image_url)
        } else {
            setFileInput2("")
        }
        handleFounderChange(index, 'image', value?.data?.image_url)
    }

    return (
        <Formik
            enableReinitialize={true}
            validationSchema={certificationValidationSchema}
            initialValues={{
                slug_url: aboutUsPageData.slug_url || "",
                meta_title: aboutUsPageData.meta_title || "",
                meta_desc: aboutUsPageData.meta_desc || "",
                meta_keywords: aboutUsPageData.meta_keywords || "",
                banner: {
                    heading: aboutUsPageData.page_content.banner?.heading || "",
                    subHeading: aboutUsPageData.page_content.banner?.subHeading || "",
                    banner_img: aboutUsPageData.page_content.banner?.banner_img || "",
                    mobile_banner_img: aboutUsPageData.page_content.banner?.mobile_banner_img || "",
                },
                information: {
                    heading: aboutUsPageData.page_content.information?.heading || "",
                    desc: aboutUsPageData.page_content.information?.desc || ""
                },
                ourFounders: {
                    heading: aboutUsPageData.page_content.ourFounders?.heading || "",
                    desc: aboutUsPageData.page_content.ourFounders?.desc || ""
                },
                principles: {
                    heading: aboutUsPageData.page_content.principles?.heading || "",
                    subHeading: aboutUsPageData.page_content.principles?.subHeading || "",
                    imageUrl: aboutUsPageData.page_content.principles?.imageUrl || "",
                },
                certifications: {
                    heading: aboutUsPageData.page_content.certifications?.heading || "",
                    subHeading: aboutUsPageData.page_content.certifications?.subHeading || "",
                    description: aboutUsPageData.page_content.certifications?.description || ""
                }
            }}
            onSubmit={data => {
                const updatedData = {
                    slug_url: data.slug_url,
                    meta_title: data.meta_title,
                    meta_desc: data.meta_desc,
                    meta_keywords: data.meta_keywords,
                    page_content: {
                        banner: data.banner,
                        information: data.information,
                        ourFounders: data.ourFounders,
                        foundersData: foundersData,
                        motto: motto,
                        principles: data.principles,
                        principle: principle,
                        founderInfo: data.ourFounders,
                        founderData: foundersData,
                        certifications: {
                            heading: data.certifications?.heading || '',
                            subHeading: data.certifications?.subHeading || '',
                            description: data.certifications?.description || '',
                            certifications: certifications.filter(cert => cert.title && cert.image)
                        }
                    }
                }
                updateAboutUsPageData(updatedData);
            }}>
            {({ handleSubmit, handleChange, values, setFieldValue }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <div className="container">
                        <NavBar brandName={NAVBAR.BRAND_IMAGE}
                            profileName={NAVBAR.PROFILE_NAME}
                            profileOption={NAVBAR.PROFILE_OPTION} />
                        <div className="content-wrapper">
                            <HomeSidebar accordions={HOME_SIDEBAR} />
                            <div className="main-content">
                                <div className='card-body'>
                                    <div className='product-navbar'>
                                        <div className='product-heading'>
                                            {HOME_SIDEBAR[0].items[1].LABEL}
                                        </div>
                                    </div>
                                    <div className='main-accordion1'>
                                        <div className='accordion1'>
                                            <FormAccordion header={DYNAMIC_ABOUTUS_PAGE.META.HEADER}>
                                                <AccordionTable>
                                                    <thead>
                                                        <tr>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.META.DATA[0].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.META.DATA[1].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.META.DATA[2].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.META.DATA[3].ROW}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className='paddingtable' width={"25%"}>
                                                                <Input
                                                                    name="meta_title"
                                                                    type="text"
                                                                    placeholder="Enter Title"
                                                                    onChange={handleChange}
                                                                    value={values.meta_title}
                                                                />
                                                            </td>
                                                            <td className='paddingtable' width={"25%"}>
                                                                <Input
                                                                    name="slug_url"
                                                                    type="text"
                                                                    placeholder="Enter Name"
                                                                    onChange={handleChange}
                                                                    value={values.slug_url}
                                                                />
                                                            </td>
                                                            <td className='paddingtable' width={"25%"}>
                                                                <Input
                                                                    name="meta_desc"
                                                                    textarea="textarea"
                                                                    placeholder="Enter Description"
                                                                    onChange={handleChange}
                                                                    value={values.meta_desc}
                                                                />
                                                            </td>
                                                            <td className='paddingtable' width={"25%"}>
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
                                            <FormAccordion key="0" header={DYNAMIC_ABOUTUS_PAGE.BANNER.HEADER}>
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
                                                                    value={values.banner?.heading}
                                                                />
                                                            </td>
                                                            <td className='paddingtable' width={"40%"}>
                                                                <Input
                                                                    name="banner.subHeading"
                                                                    textarea="textarea"
                                                                    placeholder="Enter Sub Heading"
                                                                    onChange={handleChange}
                                                                    value={values.banner?.subHeading}
                                                                />
                                                            </td>
                                                            <td className='paddingtable' width={"20%"}>
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
                                                            <td className='paddingtable' width={"20%"}>
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
                                            <FormAccordion header={DYNAMIC_ABOUTUS_PAGE.INFO.HEADER}>
                                                <AccordionTable>
                                                    <thead>
                                                        <tr>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.INFO.DATA[0].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.INFO.DATA[1].ROW}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className='paddingtable' width={"50%"}>
                                                                <Input
                                                                    name="information.heading"
                                                                    type="text"
                                                                    placeholder="Enter Heading"
                                                                    onChange={handleChange}
                                                                    value={values.information?.heading || ''}
                                                                />
                                                            </td>
                                                            <td className='paddingtable'>
                                                                <Input
                                                                    name="information.desc"
                                                                    textarea="textarea"
                                                                    placeholder="Enter Description"
                                                                    onChange={handleChange}
                                                                    value={values.information?.desc || ''}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </AccordionTable>
                                            </FormAccordion>
                                            <FormAccordion header={DYNAMIC_ABOUTUS_PAGE.OUR_FOUNDERS.HEADER}>
                                                <AccordionTable>
                                                    <thead>
                                                        <tr>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.OUR_FOUNDERS.DATA[0].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.OUR_FOUNDERS.DATA[1].ROW}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className='paddingtable' width={"50%"}>
                                                                <Input
                                                                    name="ourFounders.heading"
                                                                    type="text"
                                                                    placeholder="Enter Heading"
                                                                    onChange={handleChange}
                                                                    value={values.ourFounders?.heading}
                                                                />
                                                            </td>
                                                            <td className='paddingtable'>
                                                                <Input
                                                                    name="ourFounders.desc"
                                                                    textarea="textarea"
                                                                    placeholder="Enter Description"
                                                                    onChange={handleChange}
                                                                    value={values.ourFounders?.desc}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>

                                                </AccordionTable>
                                                <button type='button' className='addButton' onClick={addNewFounder}>
                                                    <Icons iconName={faCirclePlus} />
                                                </button>
                                                <AccordionTable>
                                                    <thead>
                                                        <tr>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.OUR_FOUNDERS.DATA[2].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.OUR_FOUNDERS.DATA[4].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.OUR_FOUNDERS.DATA[3].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.OUR_FOUNDERS.DATA[5].ROW}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {foundersData.map((founder, index) => (
                                                            <tr key={index}>
                                                                <td className='paddingtable' width={"35%"}>
                                                                    <Input
                                                                        name="name"
                                                                        type="text"
                                                                        value={founder.name}
                                                                        placeholder="Enter Name"
                                                                        onChange={(e) => handleFounderChange(index, 'name', e.target.value)}
                                                                    />
                                                                </td>
                                                                <td className='paddingtable' width={"35%"}>
                                                                    <Input
                                                                        name="role"
                                                                        type="text"
                                                                        value={founder.role}
                                                                        placeholder="Enter Role"
                                                                        onChange={(e) => handleFounderChange(index, 'role', e.target.value)}
                                                                    />
                                                                </td>
                                                                <td className='paddingtable' width={"35%"}>
                                                                    <div>
                                                                        <ImageUploader value={values.image} imageUrl={founder.image_url} onChange={(e) => handleImageChangePro(e, index)} imgStyle={{ width: "150px" }} />
                                                                    </div>
                                                                </td>
                                                                <td className='paddingtable' onClick={() => handleDeleteFounder(index)} width={"5%"} style={{ paddingLeft: "2%", color: "red" }}><Icons iconName={faTrash} />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </AccordionTable>
                                            </FormAccordion>
                                            <FormAccordion header={DYNAMIC_ABOUTUS_PAGE.MOTTO.HEADER}>
                                                <button type='button' className='addButton' onClick={addNewMotto}>
                                                    <Icons iconName={faCirclePlus} />
                                                </button>
                                                <AccordionTable>
                                                    <thead>
                                                        <tr>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.MOTTO.DATA[0].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.MOTTO.DATA[1].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.MOTTO.DATA[2].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.MOTTO.DATA[3].ROW}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {motto.map((m, index) => (
                                                            <tr key={index}>
                                                                <td className='paddingtable' width={"35%"}>
                                                                    <Input
                                                                        name="motto"
                                                                        type="text"
                                                                        value={m.motto}
                                                                        placeholder="Enter Title"
                                                                        onChange={(e) => handleMottoChange(index, 'motto', e.target.value)}
                                                                    />
                                                                </td>
                                                                <td className='paddingtable' width={"35%"}>
                                                                    <Input
                                                                        name="description"
                                                                        textarea="textarea"
                                                                        value={m.description}
                                                                        placeholder="Enter Description"
                                                                        onChange={(e) => handleMottoChange(index, 'description', e.target.value)}
                                                                    />
                                                                </td>
                                                                <td className='paddingtable' width={"35%"}>
                                                                    <div>
                                                                        <ImageUploader value={values.image} imgStyle={{ width: "100px" }} />
                                                                    </div>
                                                                </td>
                                                                <td className='paddingtable' onClick={() => handleDeleteMotto(index)} width={"5%"} style={{ paddingLeft: "2%", color: "red" }}><Icons iconName={faTrash} />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </AccordionTable>
                                            </FormAccordion>
                                            <FormAccordion header={DYNAMIC_ABOUTUS_PAGE.CORE_PRINCIPLES.HEADER}>
                                                <AccordionTable>
                                                    <thead>
                                                        <tr>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.CORE_PRINCIPLES.DATA[0].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.CORE_PRINCIPLES.DATA[1].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.CORE_PRINCIPLES.DATA[2].ROW}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className='paddingtable' width={"28%"}>
                                                                <Input
                                                                    name="principles.heading"
                                                                    type="text"
                                                                    placeholder="Enter Heading"
                                                                    onChange={handleChange}
                                                                    value={values.principles?.heading}
                                                                /></td>
                                                            <td className='paddingtable' width={"40%"}>
                                                                <Input
                                                                    name="principles.subHeading"
                                                                    type="text"
                                                                    placeholder="Enter Heading"
                                                                    onChange={handleChange}
                                                                    value={values.principles?.subHeading}
                                                                /></td>
                                                            <td className='paddingtable'>
                                                                {/* <ImageUploader value={values.image}/> */}
                                                                <ImageUploader
                                                                    imageUrl={values.principles.imageUrl}
                                                                    onChange={(res) => {
                                                                        setFieldValue("principles.imageUrl", res?.data?.image_url);
                                                                    }}
                                                                    imgStyle={{ width: "100px" }}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </AccordionTable>
                                                <button type='button' className='addButton' onClick={addNewPrinciple}>
                                                    <Icons iconName={faCirclePlus} />
                                                </button>
                                                <AccordionTable>
                                                    <thead>
                                                        <tr>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.CORE_PRINCIPLES.DATA[3].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.CORE_PRINCIPLES.DATA[4].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_ABOUTUS_PAGE.CORE_PRINCIPLES.DATA[5].ROW}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {principle.map((f, index) => (
                                                            <tr>
                                                                <td className='paddingtable'>
                                                                    <Input
                                                                        name="title"
                                                                        type="text"
                                                                        placeholder="Enter Title"
                                                                        onChange={(e) => handlePrincipleChange(index, 'title', e.target.value)}
                                                                        value={f.title}
                                                                    />
                                                                </td>
                                                                <td className='paddingtable'>
                                                                    <Input
                                                                        name="desc"
                                                                        textarea="textarea"
                                                                        placeholder="Enter Description"
                                                                        onChange={(e) => handlePrincipleChange(index, 'desc', e.target.value)}
                                                                        value={f.desc}
                                                                    />
                                                                </td>
                                                                <td className='paddingtable' onClick={() => handleDeletePrinciple(index)} width={"5%"} style={{ paddingLeft: "2%", color: "red" }}><Icons iconName={faTrash} />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </AccordionTable>
                                            </FormAccordion>
                                            <FormAccordion header="Certifications & Accreditations">
                                                <AccordionTable>
                                                    <thead>
                                                        <tr>
                                                            <th className='headingtable'>Section Heading</th>
                                                            <th className='headingtable'>Sub Heading</th>
                                                            <th className='headingtable'>Description</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className='paddingtable' width={"33%"}>
                                                                <Input
                                                                    name="certifications.heading"
                                                                    type="text"
                                                                    placeholder="Certifications & Accreditations"
                                                                    onChange={handleChange}
                                                                    value={values.certifications?.heading}
                                                                />
                                                            </td>
                                                            <td className='paddingtable' width={"33%"}>
                                                                <Input
                                                                    name="certifications.subHeading"
                                                                    type="text"
                                                                    placeholder="Trusted by leading institutions"
                                                                    onChange={handleChange}
                                                                    value={values.certifications?.subHeading}
                                                                />
                                                            </td>
                                                            <td className='paddingtable' width={"34%"}>
                                                                <Input
                                                                    name="certifications.description"
                                                                    textarea="textarea"
                                                                    placeholder="Section description..."
                                                                    onChange={handleChange}
                                                                    value={values.certifications?.description}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </AccordionTable>

                                                <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                                                    <h5>Certification Items</h5>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary btn-sm"
                                                        onClick={addCertification}
                                                    >
                                                        <Icons iconName={faCirclePlus} /> Add Certification
                                                    </button>
                                                </div>

                                                {certifications.map((cert, index) => (
                                                    <div key={index} className="card mb-3">
                                                        <div className="card-body">
                                                            <div className="d-flex justify-content-between mb-3">
                                                                <h6>Certification {index + 1}</h6>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger btn-sm"
                                                                    onClick={() => removeCertification(index)}
                                                                >
                                                                    <Icons iconName={faTrash} /> Remove
                                                                </button>
                                                            </div>

                                                            <AccordionTable>
                                                                <thead>
                                                                    <tr>
                                                                        <th className='headingtable'>Title</th>
                                                                        <th className='headingtable'>Issued By</th>
                                                                        <th className='headingtable'>Year</th>
                                                                        <th className='headingtable'>Description</th>
                                                                        <th className='headingtable'>Image</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className='paddingtable' width={"20%"}>
                                                                            <Input
                                                                                type="text"
                                                                                placeholder="Certificate title"
                                                                                value={cert.title}
                                                                                onChange={(e) => updateCertification(index, 'title', e.target.value)}
                                                                            />
                                                                        </td>
                                                                        <td className='paddingtable' width={"15%"}>
                                                                            <Input
                                                                                type="text"
                                                                                placeholder="CSIR-IICT"
                                                                                value={cert.issuedBy}
                                                                                onChange={(e) => updateCertification(index, 'issuedBy', e.target.value)}
                                                                            />
                                                                        </td>
                                                                        <td className='paddingtable' width={"15%"}>
                                                                            <Input
                                                                                type="number"
                                                                                placeholder="2024"
                                                                                value={cert.year}
                                                                                onChange={(e) => updateCertification(index, 'year', e.target.value)}
                                                                            />
                                                                        </td>
                                                                        <td className='paddingtable' width={"25%"}>
                                                                            <Input
                                                                                textarea="textarea"
                                                                                placeholder="Certificate description"
                                                                                value={cert.description}
                                                                                onChange={(e) => updateCertification(index, 'description', e.target.value)}
                                                                            />
                                                                        </td>
                                                                        <td className='paddingtable' width={"25%"}>
                                                                            <ImageUploader
                                                                                onChange={(res) => updateCertification(index, 'image', res?.data?.image_url)}
                                                                                imageUrl={cert.image}
                                                                                imgStyle={{ width: "100px" }}
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </AccordionTable>
                                                        </div>
                                                    </div>
                                                ))}
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

export default AboutUsPage;