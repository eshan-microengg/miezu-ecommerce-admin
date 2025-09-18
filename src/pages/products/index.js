import React, { useState } from 'react';
import './style.scss';
import NavBar from '../../components/navbar';
import Button1 from '../../components/button';
import { useNavigate } from 'react-router';
import { HOME_SIDEBAR, NAVBAR } from '../../const';
import HomeSidebar from '../../components/homeSidebar';
import DataTable1 from '../../components/dataTable';
import SearchBar from '../../components/searchBar';
import { Provider } from '../../allProvider/products.provider';
import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Icons from '../../components/icons';
import { getS3Image } from '../../utils/helpers';

const Products = () => {
    const { productData, deleteProduct } = Provider();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/add-products');
    };

    const handleDelete = async (id) => {
        await deleteProduct(id);
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    };

    const handleEdit = (id) => {
        navigate(`/edit-product/${id}`);
    };

    const columns = [
        {
            name: 'Image',
            selector: (row) => {
                return <img src={getS3Image(row.images)} alt={row.productName} width={60} />
            },
        },
        {
            name: 'Product Name',
            selector: (row) => row.productName,
            sortable: true,
        },
        {
            name: 'Price',
            selector: (row) => row.price,
            sortable: true,
        },
        // {
        //     name: 'Description',
        //     selector: (row) => row.description,
        // },
        {
            name: 'Action',
            cell: (row) => (
                <div className='action-button'>
                    <button className='edit-datatable-button' onClick={() => handleEdit(row.id)}>
                        <Icons iconName={faEdit} />
                    </button>
                    <button className='delete-datatable-button' onClick={() => handleDelete(row.id)}>
                        <Icons iconName={faTrash} />
                    </button>
                </div>
            ),
        },
    ];

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="container">
            <NavBar brandName={NAVBAR.BRAND_IMAGE}
                profileName={NAVBAR.PROFILE_NAME}
                profileOption={NAVBAR.PROFILE_OPTION} />
            <div className="content-wrapper">
                <HomeSidebar accordions={HOME_SIDEBAR} />
                <div className="main-content">
                    <div className='cardBody' style={{ width: "100%", padding: "1rem", height: "100vh", overflowY: "auto", paddingBottom: "5rem" }}>
                        <div className='product-navbar'>
                            <div className='product-heading'>
                                Products
                            </div>

                            <div className='action-navBar'>
                                <div className="product-searchbar">
                                    <SearchBar
                                        style={{ height: "38px", border: "1px solid rgb(189,188,188)", borderRadius: "5px", padding: "10px" }}
                                        searchTerm={searchTerm}
                                        setSearchTerm={setSearchTerm}
                                    />
                                </div>
                                <div className='product-add-button'>
                                    <Button1 buttonValue={
                                        <div style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginRight: "-12px" }}>
                                            <Icons iconName={faAdd} />
                                            Add
                                        </div>
                                    } onClick={handleClick} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <DataTable1
                                Tabledata={productData}
                                searchTerm={searchTerm}
                                columns={columns}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;