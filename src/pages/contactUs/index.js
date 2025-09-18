import React, { useEffect } from 'react';
import * as formik from 'formik';
import NavBar from '../../components/navbar';
import Button1 from '../../components/button';
import Input from '../../components/input';
import { HOME_SIDEBAR, NAVBAR, DYNAMIC_CONTACTUS_PAGE } from '../../const';
import HomeSidebar from '../../components/homeSidebar';
import { FormAccordion } from '../../components/accordion';
import { AccordionTable } from '../../components/table';
import Icons from '../../components/icons';
import { faCirclePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import ImageUploader from '../../imageUploader';
import ContactUsProvider from '../../allProvider/contactUs.provider';


const ContactUsPage = () => {

    const {
        socialNetwork,
        setSocialNetwork,
        addNewSocialNetwork,
        handleDeleteSocialNetwork,
        handleSocialNetworkChange,
        contactUsPageData,
        getContactUsPageData,
        updateContactUsPageData
    } = ContactUsProvider()

    const { Formik } = formik

    useEffect(() => {
        getContactUsPageData();
    }, []);

    useEffect(() => {
        if (contactUsPageData?.page_content?.socialNetwork) {
            setSocialNetwork(contactUsPageData.page_content.socialNetwork);
        }
    }, [contactUsPageData]);

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                slug_url: contactUsPageData.slug_url || "",
                meta_title: contactUsPageData.meta_title || "",
                meta_desc: contactUsPageData.meta_desc || "",
                meta_keywords: contactUsPageData.meta_keywords || "",
                banner: {
                    heading: contactUsPageData.page_content.banner?.heading || "",
                    subHeading: contactUsPageData.page_content.banner?.subHeading || ""
                },
                contact: {
                    heading: contactUsPageData.page_content.contact?.heading || "",
                    subHeading: contactUsPageData.page_content.contact?.subHeading || "",
                    phone: contactUsPageData.page_content.contact?.phone || "",
                    email: contactUsPageData.page_content.contact?.email || "",
                    address: contactUsPageData.page_content.contact?.address || "",
                },
                social: {
                    heading: contactUsPageData.page_content.social?.heading || ""
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
                        contact: data.contact,
                        social: data.social,
                        socialNetwork: socialNetwork
                    }
                }
                updateContactUsPageData(updatedData);
            }}>
            {({ handleSubmit, handleChange, values }) => (
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
                                            {HOME_SIDEBAR[0].items[4].LABEL}
                                        </div>
                                    </div>
                                    <div className='main-accordion1'>
                                        <div className='accordion1'>
                                            <FormAccordion header={DYNAMIC_CONTACTUS_PAGE.META.HEADER}>
                                                <AccordionTable>
                                                    <thead>
                                                        <tr>
                                                            <th className='headingtable'>{DYNAMIC_CONTACTUS_PAGE.META.DATA[0].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_CONTACTUS_PAGE.META.DATA[1].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_CONTACTUS_PAGE.META.DATA[2].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_CONTACTUS_PAGE.META.DATA[3].ROW}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
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
                                                                    name="meta_title"
                                                                    type="text"
                                                                    placeholder="Enter Title"
                                                                    onChange={handleChange}
                                                                    value={values.meta_title}
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
                                            <FormAccordion key="0" header={DYNAMIC_CONTACTUS_PAGE.BANNER.HEADER}>
                                                <AccordionTable>
                                                    <thead>
                                                        <tr>
                                                            <th className='headingtable'>{DYNAMIC_CONTACTUS_PAGE.BANNER.DATA[0].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_CONTACTUS_PAGE.BANNER.DATA[1].ROW}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className='paddingtable' width={"25%"}>
                                                                <Input
                                                                    name="banner.heading"
                                                                    type="text"
                                                                    placeholder="Enter Heading"
                                                                    onChange={handleChange}
                                                                    value={values.banner?.heading}
                                                                />
                                                            </td>
                                                            <td className='paddingtable' width={"35%"}>
                                                                <Input
                                                                    name="banner.subHeading"
                                                                    textarea="textarea"
                                                                    placeholder="Enter Sub Heading"
                                                                    onChange={handleChange}
                                                                    value={values.banner?.subHeading}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </AccordionTable>
                                            </FormAccordion>
                                            <FormAccordion header={DYNAMIC_CONTACTUS_PAGE.CONTACT.HEADER}>
                                                <AccordionTable>
                                                    <thead>
                                                        <tr>
                                                            <th className='headingtable'>{DYNAMIC_CONTACTUS_PAGE.CONTACT.DATA[0].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_CONTACTUS_PAGE.CONTACT.DATA[1].ROW}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className='paddingtable' width={"35%"}>
                                                                <Input
                                                                    name="contact.heading"
                                                                    type="text"
                                                                    placeholder="Enter Heading"
                                                                    onChange={handleChange}
                                                                    value={values.contact?.heading}
                                                                />
                                                            </td>
                                                            <td className='paddingtable' width={"35%"}>
                                                                <Input
                                                                    name="contact.subHeading"
                                                                    type="text"
                                                                    placeholder="Enter Sub Heading"
                                                                    onChange={handleChange}
                                                                    value={values.contact?.subHeading}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </AccordionTable>
                                                <AccordionTable>
                                                    <thead>
                                                        <tr>
                                                            <th className='headingtable'>{DYNAMIC_CONTACTUS_PAGE.CONTACT.DATA[2].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_CONTACTUS_PAGE.CONTACT.DATA[3].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_CONTACTUS_PAGE.CONTACT.DATA[4].ROW}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className='paddingtable' width={"35%"}>
                                                                <Input
                                                                    name="contact.phone"
                                                                    type="text"
                                                                    placeholder="Enter Contact No."
                                                                    onChange={handleChange}
                                                                    value={values.contact?.phone}
                                                                />
                                                            </td>
                                                            <td className='paddingtable' width={"35%"}>
                                                                <Input
                                                                    name="contact.email"
                                                                    type="text"
                                                                    placeholder="Enter Email"
                                                                    onChange={handleChange}
                                                                    value={values.contact?.email}
                                                                />
                                                            </td>
                                                            <td className='paddingtable' width={"35%"}>
                                                                <Input
                                                                    name="contact.address"
                                                                    textarea="textarea"
                                                                    placeholder="Enter Address"
                                                                    onChange={handleChange}
                                                                    value={values.contact?.address}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </AccordionTable>
                                            </FormAccordion>
                                            <FormAccordion header={DYNAMIC_CONTACTUS_PAGE.SOCIAL_NETWORKS.HEADER}>
                                                <AccordionTable>
                                                    <thead>
                                                        <tr>
                                                            <th className='headingtable'>{DYNAMIC_CONTACTUS_PAGE.SOCIAL_NETWORKS.DATA[0].ROW}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className='paddingtable' width={"35%"}>
                                                                <Input
                                                                    name="social.heading"
                                                                    type="text"
                                                                    placeholder="Enter Heading"
                                                                    onChange={handleChange}
                                                                    value={values.social?.heading}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </AccordionTable>
                                                <button type='button' className='addButton' onClick={addNewSocialNetwork}>
                                                    <Icons iconName={faCirclePlus} />
                                                </button>
                                                <AccordionTable>
                                                    <thead>
                                                        <tr>
                                                            <th className='headingtable'>{DYNAMIC_CONTACTUS_PAGE.SOCIAL_NETWORKS.DATA[2].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_CONTACTUS_PAGE.SOCIAL_NETWORKS.DATA[3].ROW}</th>
                                                            <th className='headingtable'>{DYNAMIC_CONTACTUS_PAGE.SOCIAL_NETWORKS.DATA[4].ROW}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {socialNetwork.map((network, index) => (
                                                            <tr key={index}>
                                                                <td className='paddingtable' width={"35%"}>
                                                                    <Input
                                                                        name="platform"
                                                                        type="text"
                                                                        value={network.platform}
                                                                        placeholder="Enter Platform Name"
                                                                        onChange={(e) => handleSocialNetworkChange(index, 'platform', e.target.value)}
                                                                    />
                                                                </td>
                                                                <td className='paddingtable' width={"35%"}>
                                                                    <Input
                                                                        name="btn_cta"
                                                                        type="text"
                                                                        value={network.btn_cta}
                                                                        placeholder="Enter Link"
                                                                        onChange={(e) => handleSocialNetworkChange(index, 'btn_cta', e.target.value)}
                                                                    />
                                                                </td>
                                                                <td className='paddingtable' onClick={() => handleDeleteSocialNetwork(index)} width={"5%"} style={{ paddingLeft: "2.5%", color: "red" }}><Icons iconName={faTrash} />
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

export default ContactUsPage;