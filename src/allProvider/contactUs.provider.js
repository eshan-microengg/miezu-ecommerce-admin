import React, { useState } from 'react'
import { GetContactUsPage, UpdateContactUsPage } from '../api/contactUs'
import { showToast } from '../components/toastify'

const ContactUsProvider = () => {

    const [contactUsPageData , setContactUsPageData] = useState({
        page_name: "",
        slug_url: "",
        page_content: {},
        meta_title: "",
        meta_desc: "",
        meta_keywords: "",
    })

    const getContactUsPageData = () => {
        GetContactUsPage()
        .then(res => {
          setContactUsPageData(res.data[0]);
        })
        .catch((error)=>{
          showToast('An Error Occurred , Please Try Again', "error")
        })
      }

      const updateContactUsPageData = (data) => {
        UpdateContactUsPage(data)
        .then(() => {
          showToast("Product Updated Successfully","success");
        })
        .catch((error)=>{
          showToast('An Error Occurred , Please Try Again', "error")
        })
      }

    const [socialNetwork , setSocialNetwork] = useState([{ platform: "", btn_cta: "" }]);

    const addNewSocialNetwork = () => {
        setSocialNetwork(prev => [...prev, { platform: "", btn_cta: "" }]);
    }
    const handleSocialNetworkChange = (index, field, value) => {
        setSocialNetwork(prev => {
            const newNetwork = [...prev];
            newNetwork[index] = {
                ...newNetwork[index],
                [field]: value
            };
            return newNetwork;
        });
    };
    const handleDeleteSocialNetwork = (index) => {
        setSocialNetwork(prev => prev.filter((_, i) => i !== index));
    };
  return {
    socialNetwork,
    setSocialNetwork,
    addNewSocialNetwork,
    handleDeleteSocialNetwork,
    handleSocialNetworkChange,
    contactUsPageData,
    getContactUsPageData,
    updateContactUsPageData
  }
}

export default ContactUsProvider
