import { useState } from 'react'
import { showToast } from '../components/toastify'
import { GetOthersPage, UpdateOthersPage } from '../api/others'

const OthersProvider = () => {
    const [othersData, setOthersData] = useState({
        page_name: "",
        slug_url: "",
        page_content: {},
        meta_title: "",
        meta_desc: "",
        meta_keywords: "",
    })

    const getOthersPageData = () => {
        GetOthersPage()
            .then(res => {
                setOthersData(res.data[0]);
            })
            .catch((error) => {
                showToast('An Error Occurred , Please Try Again', "error")
            })
    }

    const updateOthersPageData = (data) => {
        UpdateOthersPage(data)
            .then(() => {
                showToast("Product Updated Successfully", "success");
            })
            .catch((error) => {
                showToast('An Error Occurred , Please Try Again', "error")
            })
    }

    return {
        othersData,
        setOthersData,
        getOthersPageData,
        updateOthersPageData
    }
}
export default OthersProvider;
