import React, { useState } from 'react'
import { GetAboutUsPage, UpdateAboutUsPage } from '../api/aboutUs'
import { showToast } from '../components/toastify'

const AboutUsProvider = () => {
    const [aboutUsPageData , setAboutUsPageData] = useState({
        page_name: "",
        slug_url: "",
        page_content: {},
        meta_title: "",
        meta_desc: "",
        meta_keywords: "",
    })

    const getAboutUsPageData = () => {
        GetAboutUsPage()
        .then(res => {
          setAboutUsPageData(res.data[0]);
        })
        .catch((error)=>{
          showToast('An Error Occurred , Please Try Again', "error")
        })
      }

      const updateAboutUsPageData = (data) => {
        UpdateAboutUsPage(data)
        .then(() => {
          showToast("Product Updated Successfully","success");
        })
        .catch((error)=>{
          showToast('An Error Occurred , Please Try Again', "error")
        })
      }

    const [foundersData, setFoundersData] = useState([{ name: "", role: "", image: "" }]);
    const [motto , setMotto] = useState([{ motto:"", description:"", image:"" }]);
    const [principle , setPrinciple] = useState([{ title: "", desc: ""}]);
    const [certifications, setCertifications] = useState([]);

    const addNewFounder = () => {
        setFoundersData([...foundersData, { name: "", role: "", image: "" }]);
    }
    const handleFounderChange = (index, field, value) => {
        const updatedFounder = [...foundersData];
        updatedFounder[index][field] = value;
        setFoundersData(updatedFounder);
    };
    const handleDeleteFounder = (index) => {
        const newFounder = foundersData.filter((_, i) => i !== index);
        setFoundersData(newFounder);
    };

    const addNewMotto = () => {
        setMotto([...motto, { motto:"", description:"", image:"" }]);
    }
    const handleMottoChange = (index, field, value) => {
        const updatedMotto = [...motto];
        updatedMotto[index][field] = value;
        setMotto(updatedMotto);
    };
    const handleDeleteMotto = (index) => {
        const newMotto = motto.filter((_, i) => i !== index);
        setMotto(newMotto);
    };

    const addNewPrinciple = () => {
        setPrinciple([...principle, { title: "", desc: ""}]);
    }
    const handlePrincipleChange = (index, field, value) => {
        const updatedPrinciple = [...principle];
        updatedPrinciple[index][field] = value;
        setPrinciple(updatedPrinciple);
    };
    const handleDeletePrinciple = (index) => {
        const newPrinciple = principle.filter((_, i) => i !== index);
        setPrinciple(newPrinciple);
    };

    const addCertification = () => {
        setCertifications([...certifications, {
            title: '',
            issuedBy: '',
            year: '',
            description: '',
            image: null
        }]);
    };

    const removeCertification = (index) => {
        setCertifications(certifications.filter((_, i) => i !== index));
    };

    const updateCertification = (index, field, value) => {
        const updated = certifications.map((cert, i) =>
            i === index ? { ...cert, [field]: value } : cert
        );
        setCertifications(updated);
    };

  return {
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
  }
}

export default AboutUsProvider
