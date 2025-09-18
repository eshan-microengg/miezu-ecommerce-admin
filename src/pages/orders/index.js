import React, { useState } from 'react';
import './style.scss';
import NavBar from '../../components/navbar';
import Button1 from '../../components/button';
import { useNavigate } from 'react-router';
import { HOME_SIDEBAR, NAVBAR } from '../../const';
import HomeSidebar from '../../components/homeSidebar';
import DataTable1 from '../../components/dataTable';
import SearchBar from '../../components/searchBar';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import Icons from '../../components/icons';
import OrdersProvider from '../../allProvider/orders.provider';

const Orders = () => {
    const { ordersData } = OrdersProvider();
    const navigate = useNavigate();

    const handleView = (id) => {
        navigate(`/view-order/${id}`);
    };

    const columns = [
        {
            name: 'Order Number',
            selector: (row) => row.order_number,
            sortable: true,
        },
        {
            name: 'Invoice Number',
            selector: (row) => row.invoice_number,
        },
        {
            name: 'Order Date',
            selector: (row) => row.order_date,
            sortable: true,
        },
        {
            name: 'Payment Method',
            selector: (row) => row.payment_method,
        },
        {
            name: 'Order Status',
            selector: (row) => row.order_status,
        },
        {
            name: 'Action',
            cell: (row) => (
                <div className='action-button'>
                    <button className='view-datatable-button' onClick={() => handleView(row.id)}>
                        <Icons iconName={faEye} />
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
                    <div className='cardBody'>
                        <div className='product-navbar'>
                            <div className='product-heading'>
                                {HOME_SIDEBAR[1].items[0].LABEL}
                            </div>

                            <div className='action-navBar'>
                                <div className="product-searchbar">
                                    <SearchBar
                                        style={{ height: "38px", border: "1px solid rgb(189,188,188)", borderRadius: "5px", padding: "10px" }}
                                        searchTerm={searchTerm}
                                        setSearchTerm={setSearchTerm}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <DataTable1
                                Tabledata={ordersData}
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

export default Orders;