import React, { useState } from 'react'
import { GetWaterTypePage, UpdateWaterTypePage } from '../api/waterType'
import { showToast } from '../components/toastify'

const WaterTypeProvider = () => {
  const [waterTypePageData, setWaterTypePageData] = useState({
    page_name: "",
    slug_url: "",
    page_content: {},
    meta_title: "",
    meta_desc: "",
    meta_keywords: "",
  })

  const getWaterTypePageData = () => {
    GetWaterTypePage()
      .then(res => {
        setWaterTypePageData(res?.data[0]);
      })
      .catch((error) => {
        showToast('An Error Occurred , Please Try Again', "error")
      })
  }

  const updateWaterTypePageData = (data) => {
    UpdateWaterTypePage(data)
      .then(() => {
        showToast("Product Updated Successfully", "success");
      })
      .catch((error) => {
        showToast('An Error Occurred , Please Try Again', "error")
      })
  }

  const [waterType, setWaterType] = useState([{ title: "", subTitle: "", btn_cta: "", img: "" }]);
  const [waterPHscale, setWaterPHscale] = useState([{ title: "", subTitle: "", img: "" }]);
  const [healthBenefits, setHealthBenefits] = useState([{ title: "", subTitle: "", img: "" }]);

  const addNewWaterType = () => {
    setWaterType([...waterType, { title: "", subTitle: "", btn_cta: "", img: "" }]);
  }
  const handleWaterTypeChange = (index, field, value) => {
    const updatedWaterType = [...waterType];
    updatedWaterType[index][field] = value;
    setWaterType(updatedWaterType);
  };
  const handleDeleteWaterType = (index) => {
    const newWaterType = waterType.filter((_, i) => i !== index);
    setWaterType(newWaterType);
  };

  const addNewWaterPHscale = () => {
    setWaterPHscale([...waterPHscale, { title: "", subTitle: "", img: "" }]);
  }
  const handleWaterPHscaleChange = (index, field, value) => {
    if (!value) return;
    const updatedWaterPH = [...waterPHscale];
    updatedWaterPH[index][field] = value;
    setWaterPHscale(updatedWaterPH);
  };
  const handleDeleteWaterPHscale = (index) => {
    const newWaterPH = waterPHscale.filter((_, i) => i !== index);
    setWaterPHscale(newWaterPH);
  };

  const addNewHealthBenefit = () => {
    setHealthBenefits([...healthBenefits, { title: "", subTitle: "", img: "" }]);
  }
  const handleHealthBenefitChange = (index, field, value) => {
    const updatedHealthBenefit = [...healthBenefits];
    updatedHealthBenefit[index][field] = value;
    setHealthBenefits(updatedHealthBenefit);
  };
  const handleDeleteHealthBenefit = (index) => {
    const newHealthBenefit = healthBenefits.filter((_, i) => i !== index);
    setHealthBenefits(newHealthBenefit);
  };

  return {
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
    setWaterTypePageData,
    getWaterTypePageData,
    updateWaterTypePageData,
    setWaterType,
    setWaterPHscale,
    setHealthBenefits
  }
}

export default WaterTypeProvider
