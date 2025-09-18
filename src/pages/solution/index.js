import React, { useEffect } from 'react';
import './style.scss';
import * as formik from 'formik';
import NavBar from '../../components/navbar';
import Button1 from '../../components/button';
import Input from '../../components/input';
import { HOME_SIDEBAR, NAVBAR, DYNAMIC_SOLUTION_PAGE } from '../../const';
import HomeSidebar from '../../components/homeSidebar';
import { FormAccordion } from '../../components/accordion';
import { AccordionTable, Table } from '../../components/table';
import SolutionProvider from '../../allProvider/solution.provider';
import { faCirclePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Icons from '../../components/icons';
import ImageUploader from '../../imageUploader';


const SolutionPage = () => {

    const {
        faq,
        setFaq,
        addNewFaq,
        handleDeleteFaq,
        handleFaqChange,
        solutionPageData,
        setSolutionPageData,
        getSolutionPageData,
        updateSolutionPageData
    } = SolutionProvider();

    const { Formik } = formik

    useEffect(() => {
        getSolutionPageData();
    }, []);

    useEffect(() => {
        if (solutionPageData?.page_content?.faq) {
            setFaq(solutionPageData.page_content.faq);
        }
    }, [solutionPageData]);

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                slug_url: solutionPageData.slug_url || "",
                meta_title: solutionPageData.meta_title || "",
                meta_desc: solutionPageData.meta_desc || "",
                meta_keywords: solutionPageData.meta_keywords || "",
                banner: {
                    heading: solutionPageData.page_content.banner?.heading || "",
                    subHeading: solutionPageData.page_content.banner?.subHeading || "",
                    banner_img: solutionPageData.page_content.banner?.banner_img || "",
                    mobile_banner_img: solutionPageData.page_content.banner?.mobile_banner_img || "",
                },
            }}
            onSubmit={data => {
                const updatedData = {
                    slug_url: data.slug_url,
                    meta_title: data.meta_title,
                    meta_desc: data.meta_desc,
                    meta_keywords: data.meta_keywords,
                    page_content: {
                        banner: data.banner,
                        faq: faq
                    }
                }
                updateSolutionPageData(updatedData);
            }}
        >
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
                                            {HOME_SIDEBAR[0].items[3].LABEL}
                                        </div>
                                    </div>
                                    <div className='main-accordion1'>
                                        <div className='accordion1'>
                                            <FormAccordion header={DYNAMIC_SOLUTION_PAGE.META.HEADER}>
                                                <AccordionTable>
                                                    <thead>
                                                        <tr>
                                                            <th className='headingtable'>{DYNAMIC_SOLUTION_PAGE.META.DATA[0].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_SOLUTION_PAGE.META.DATA[1].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_SOLUTION_PAGE.META.DATA[2].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_SOLUTION_PAGE.META.DATA[3].ROW}</th>
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
                                                                    placeholder="Enter Slug URL"
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
                                            <FormAccordion key="0" header={DYNAMIC_SOLUTION_PAGE.BANNER.HEADER}>
                                                <AccordionTable>
                                                    <thead>
                                                        <tr>
                                                            <th className='headingtable'>{DYNAMIC_SOLUTION_PAGE.BANNER.DATA[1].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_SOLUTION_PAGE.BANNER.DATA[1].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_SOLUTION_PAGE.BANNER.DATA[2].ROW} (Desktop)</th>
                                                            <th className='headingtable'>{DYNAMIC_SOLUTION_PAGE.BANNER.DATA[2].ROW} (Mobile)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className='paddingtable' s={"20%"}>
                                                                <Input
                                                                    name="banner.heading"
                                                                    type="text"
                                                                    placeholder="Enter Heading"
                                                                    onChange={handleChange}
                                                                    value={values.banner.heading}
                                                                />
                                                            </td>
                                                            <td className='paddingtable' s={"30%"}>
                                                                <Input
                                                                    name="banner.subHeading"
                                                                    textarea="textarea"
                                                                    placeholder="Enter Sub Heading"
                                                                    onChange={handleChange}
                                                                    value={values.banner.subHeading}
                                                                />
                                                            </td>
                                                            <td className='paddingtable' s={"30%"}>
                                                                <div>
                                                                    <ImageUploader imageUrl={values.banner.banner_img} onChange={(res) => {
                                                                        setFieldValue('banner.banner_img', res?.data?.image_url)
                                                                    }}
                                                                        imgStyle={{ width: "200px" }} />
                                                                </div>
                                                            </td>
                                                            <td className='paddingtable' s={"20%"}>
                                                                <div>
                                                                    <ImageUploader imageUrl={values.banner.mobile_banner_img} onChange={(res) => {
                                                                        setFieldValue('banner.mobile_banner_img', res?.data?.image_url)
                                                                    }} imgStyle={{ width: "100px" }} />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </AccordionTable>
                                            </FormAccordion>
                                            <FormAccordion header={DYNAMIC_SOLUTION_PAGE.FAQ.HEADER}>
                                                <button type='button' className='addButton' onClick={addNewFaq}>
                                                    <Icons iconName={faCirclePlus} />
                                                </button>
                                                <AccordionTable>
                                                    <thead>
                                                        <tr>
                                                            <th className='headingtable'>{DYNAMIC_SOLUTION_PAGE.FAQ.DATA[0].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_SOLUTION_PAGE.FAQ.DATA[1].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_SOLUTION_PAGE.FAQ.DATA[2].ROW}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {faq.map((f, index) => (
                                                            <tr>
                                                                <td className='paddingtable'>
                                                                    <Input
                                                                        name="que"
                                                                        textarea="textarea"
                                                                        placeholder="Enter Question"
                                                                        onChange={(e) => handleFaqChange(index, 'que', e.target.value)}
                                                                        value={f.que}
                                                                    />
                                                                </td>
                                                                <td className='paddingtable'>
                                                                    <Input
                                                                        name="ans"
                                                                        textarea="textarea"
                                                                        placeholder="Enter Answer"
                                                                        onChange={(e) => handleFaqChange(index, 'ans', e.target.value)}
                                                                        value={f.ans}
                                                                    />
                                                                </td>
                                                                <td className='paddingtable' onClick={() => handleDeleteFaq(index)} width={"5%"} style={{ paddingLeft: "2%", color: "red" }}><Icons iconName={faTrash} />
                                                                </td>
                                                            </tr>
                                                        ))}
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

export default SolutionPage;