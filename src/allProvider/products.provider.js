import React, { useEffect, useState } from 'react';
import { AddNewProduct, DeleteProduct, GetProductByID, GetProducts, UpdateProductByID } from '../api/products';
import { showToast } from '../components/toastify';
import { uploadImage } from '../api/orders';
import { deleteProductImage } from '../api/orders';

export const Provider = () => {
  const [productData, setProductData] = useState([]);
  const [existingProduct , setExistingProduct] = useState({
    is_new_arrival: "",
    is_trending_now: "",
    is_on_sale: "",
    is_published: "",
    title: "",
    mrp: "",
    models: "",
    currency: "",
    selling_price: "",
    stock_quantity: "",
    short_desc: "",
    key_feature: [],
    desc: "",
    images: [],
    meta_title: "",
    meta_desc: "",
    meta_keywords: "",
    slug_url: ""
  })

  useEffect(() => {
    const getProductData = async () => {
      try {
        const res = await GetProducts({ limit: 200 });
        const data = res.data;
        const formattedProducts = data.map(product => ({
          id: product.id,
          productName: product.title,
          price: `Rs. ${product.mrp}`,
          images: product.images[0]?.image_url || './assets/miezu.webp',
          description: product.short_desc,
        }));

        setProductData(formattedProducts);
      } catch (err) {
        showToast("Error Fetching Products", "error");
      }
    };

    getProductData();
  }, []);

  useEffect(() => {
  }, [productData]);

  const addNewProduct = (productData) => {
    AddNewProduct(productData)
      .then(() => {
        showToast('Product Added Successfully', "success");
      })
      .catch((error) => {
        showToast('An Error Occurred , Please Try Again', "error");
      });
  };

  const deleteProduct = (id) => {
    DeleteProduct(id)
    .then(() => {
      showToast('Product Deleted Successfully', "success");
    })
    .catch((error) => {
      showToast('An Error Occurred , Please Try Again', "error");
    });
  }

  const getProductById = (id) => {
    GetProductByID(id)
    .then(res => {
      setExistingProduct(res.data);
    })
    .catch((error)=>{
      showToast('An Error Occurred , Please Try Again', "error")
    })
  }

  const updateProductById = async (id , productData) => {
    const uploadedImages = [];

    // if (productData?.images?.length > 0) {
    //   for (const file of productData?.images) {
    //     file?.id && await deleteProductImage(file.id)
    //     try {
    //         const response = await uploadImage({ file, product_id: id });
    //         uploadedImages.push(response.data);
    //     } catch (error) {
    //         console.error('Error uploading image:', error);
    //     }
    //   }
    // }
    UpdateProductByID(id , productData)
    .then(() => {
      showToast("Product Updated Successfully","success");
    })
    .catch((error)=>{
      showToast('An Error Occurred , Please Try Again', "error")
    })
  }

  return {

    productData,
    addNewProduct,
    deleteProduct,
    getProductById,
    existingProduct,
    updateProductById
  };
};