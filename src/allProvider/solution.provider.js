import React, { useState } from 'react'
import { showToast } from '../components/toastify'
import { GetSolutionPage, UpdateSolutionPage } from '../api/solution';

const SolutionProvider = () => {
    const [solutionPageData , setSolutionPageData] = useState({
        page_name: "",
        slug_url: "",
        page_content: {},
        meta_title: "",
        meta_desc: "",
        meta_keywords: "",
    })

    const getSolutionPageData = () => {
        GetSolutionPage()
        .then(res => {
          setSolutionPageData(res.data[0]);
        })
        .catch((error)=>{
          showToast('An Error Occurred , Please Try Again', "error")
        })
      }

      const updateSolutionPageData = (data) => {
        UpdateSolutionPage(data)
        .then(() => {
          showToast("Product Updated Successfully","success");
        })
        .catch((error)=>{
          showToast('An Error Occurred , Please Try Again', "error")
        })
      }

    const [faq, setFaq] = useState([{ que: "", ans: "" }]);

    const addNewFaq = () => {
        setFaq([...faq, { que: "", ans: "", created_at: "" }]);
    }
    const handleFaqChange = (index, field, value) => {
      const updatedFaq = [...faq];
      const now = new Date().toISOString();
      if (!updatedFaq[index].created_at) {
          updatedFaq[index].created_at = now;
      }
      updatedFaq[index].updated_at = now;
      updatedFaq[index][field] = value;
      setFaq(updatedFaq);
  };
  
    const handleDeleteFaq = (index) => {
        const newFaq = faq.filter((_, i) => i !== index);
        setFaq(newFaq);
    };
    
    return {
        faq,
        setFaq,
        addNewFaq,
        handleDeleteFaq,
        handleFaqChange,
        solutionPageData,
        setSolutionPageData,
        getSolutionPageData,
        updateSolutionPageData
    }
}

export default SolutionProvider
