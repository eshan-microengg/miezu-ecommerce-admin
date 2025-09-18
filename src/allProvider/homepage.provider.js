import React, { useEffect, useState } from "react";
import { GetHomePage, UpdateHomePage } from "../api/homepage";
import { showToast } from "../components/toastify";

export const HomepageProvider = () => {
  const [homePageData, setHomePageData] = useState({
    page_name: "",
    slug_url: "",
    page_content: {},
    meta_title: "",
    meta_desc: "",
    meta_keywords: "",
  });

  const getHomePageData = () => {
    GetHomePage()
      .then((res) => {
        setHomePageData(res.data[0]);
      })
      .catch((error) => {
        showToast("An Error Occurred , Please Try Again", "error");
      });
  };

  const updateHomePage = (data) => {
    UpdateHomePage(data)
      .then(() => {
        showToast("Product Updated Successfully", "success");
      })
      .catch((error) => {
        showToast("An Error Occurred , Please Try Again", "error");
      });
  };

  const [alkalineWaterBenefits, setAlkalineWaterBenefits] = useState([{ benefit: "", alkalineWater: false, normalWater: false }]);

  const [miezuProductBenefits, setmiezuProductBenefits] = useState([{ heading: "", image: "" }]);

  const [productBenefits, setProductBenefits] = useState([{ heading: "", image: "" }]);
  const [newmeizuProduct, setnewmeizuProduct] = useState([{ heading: "", image: "" }]);
  const [quickServices, setQuickServices] = useState([{ title: "", file: "" }]);
  const [services, setServices] = useState([{ title: "", image: "" }]);
  const [banner, setBanner] = useState([{ heading: "", subHeading: "", banner_img: "", mob_banner_img: "" }]); // Initialize as an empty array

  const addNewBanner = () => {
    setBanner([...banner, { heading: "", subHeading: "", banner_img: "", mob_banner_img: "" }]);
  };

  const handleBannerChange = (index, key, value) => {
    setBanner((prev) =>
      prev.map((item, id) => (id === index ? { ...item, [key]: value } : item))
    );
  };

  const handleDeleteBanner = (index) => {
    setBanner((prev) => prev.filter((_, idx) => idx !== index));
  };

  const addNewBenefit = () => {
    setAlkalineWaterBenefits((prev) => [
      ...prev,
      {
        benefit: "",
        alkalineWater: false,
        normalWater: false,
      },
    ]);
  };

  const addNewProductBenefit = () => {
    setProductBenefits([
      ...productBenefits,
      {
        heading: "",
        image: "",
      },
    ]);
  };

  const handleNewChange = (index, field, value) => {
    const updateProductBenefits = [...productBenefits];
    updateProductBenefits[index][field] = value;
    setmiezuProductBenefits(updateProductBenefits);
  };

  const handleDeleteProductBenefit = (index) => {
    const newProduct = productBenefits.filter((_, i) => i != index);
    setProductBenefits(newProduct);
  };

  const handleBenefitChange = (index, field, value) => {
    setAlkalineWaterBenefits((prev) => {
      const newBenefits = [...prev];
      newBenefits[index] = {
        ...newBenefits[index],
        [field]: value,
      };
      return newBenefits;
    });
  };
  const handleDeleteBenefit = (index) => {
    setAlkalineWaterBenefits((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMeizuChange = (index, field, value) => {
    const updateProduct = [...newmeizuProduct];
    updateProduct[index][field] = value;
    setnewmeizuProduct(updateProduct);
  };
  const addNewService = () => {
    setQuickServices([...quickServices, { title: "", file: "" }]);
  };
  const addNewServ = () => {
    setServices([...services, { title: "", image: "" }]);
  };
  const handleServiceChange = (index, field, value) => {
    const updatedService = [...quickServices];
    updatedService[index][field] = value;
    setQuickServices(updatedService);
  };
  const handleDeleteService = (index) => {
    const newService = quickServices.filter((_, i) => i !== index);
    setQuickServices(newService);
  };
  const handleDeleteSer = (index) => {
    const newService = services.filter((_, i) => i !== index);
    setServices(newService);
  };
  const handleSerChange = (index, field, value) => {
    const updatedService = [...services];
    updatedService[index][field] = value;
    setServices(updatedService);
  };

  return {
    alkalineWaterBenefits,
    setAlkalineWaterBenefits,
    productBenefits,
    setProductBenefits,
    addNewBenefit,
    addNewProductBenefit,
    handleBenefitChange,
    handleDeleteBenefit,
    quickServices,
    setQuickServices,
    handleDeleteProductBenefit,
    addNewService,
    miezuProductBenefits,
    newmeizuProduct,
    setnewmeizuProduct,
    handleNewChange,
    handleMeizuChange,
    handleServiceChange,
    handleDeleteService,
    getHomePageData,
    homePageData,
    updateHomePage,
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
  };
};
