import React, { useEffect } from 'react';
import './style.scss';
import NavBar from '../../components/navbar';
import { useNavigate, useParams } from 'react-router';
import { HOME_SIDEBAR, HOME_PAGE, NAVBAR, orderData } from '../../const';
import HomeSidebar from '../../components/homeSidebar';
import OrdersProvider from '../../allProvider/orders.provider';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import Icons from '../../components/icons';


const ViewOrdersPage = () => {
    const { getOrderById, order } = OrdersProvider();
    const { id } = useParams();
    useEffect(() => {
        getOrderById(id);
    }, [id])
    const {
        order_number,
        invoice_number,
        order_date,
        products,
        shipping_address,
        billing_address,
        total_item,
        sub_total,
        tax_amount,
        total_amount,
        payment_method,
        currency,
        order_status,
        user,
        expected_delivery
    } = order;

    const formatDate = (date) => new Date(date).toLocaleDateString();

    const handlePrint = () => {
        const originalTitle = document.title;
        document.title = "Invoice";
        window.print();
        document.title = originalTitle;
    };

    return (
        <div className="container">
            <NavBar brandName={NAVBAR.BRAND_IMAGE}
                profileName={NAVBAR.PROFILE_NAME}
                profileOption={NAVBAR.PROFILE_OPTION} />
            <div className="content-wrapper">
                <HomeSidebar accordions={HOME_SIDEBAR} />
                <div className="main-content">
                    <div className="invoice-container">

                        <button className='print-button' onClick={handlePrint}><Icons iconName={faPrint} /></button>
                        <div className='top-head'>
                            <div className='order-heading'>Invoice <p style={{ marginTop: "-7px" }}>{invoice_number}</p></div>
                            <div className='brand-logo'><img src='/assets/miezu.webp' height="30px"></img></div>
                        </div>

                        <div className="invoice-header">
                            <div className="vendor-details">
                                <h3>Seller Details</h3>
                                <p><strong>Sold by:</strong> Meizu Inc.</p>
                                <p><strong>Address:</strong> 1st Floor, 12/12, INDL. Area Site 2, Loni Road, Mohan Nagar, Ghaziabad, (U.P), 201007</p>
                                <p><strong>Email:</strong> info@meizu.in</p>
                                <p><strong>Contact No:</strong>+91-88004 69195</p>
                            </div>
                        </div>
                        <hr />

                        <div className='address-section'>

                            <div className='order-details'>
                                <h3 >Order Details</h3>
                                <p><strong>Order No:</strong> {order_number}</p>
                                <p><strong>Invoice No:</strong> {invoice_number}</p>
                                <p><strong>Order Status:</strong> {order_status}</p>
                                <p><strong>Order Date:</strong> {formatDate(order_date)}</p>
                                <p><strong>Expected Delivery:</strong> {formatDate(expected_delivery)}</p>
                            </div>

                            <div className="invoice-address">
                                <h3 >Shipping Address</h3>
                                <p><strong>Name:</strong> {shipping_address.first_name} {shipping_address.last_name}</p>
                                <p><strong>Address:</strong> {shipping_address.address}</p>
                                <p style={{ marginTop: "-5px" }}>{shipping_address.city} - {shipping_address.zipcode}, <p >{shipping_address.country}</p></p>
                                <p><strong>Email:</strong> {shipping_address.email}</p>
                                <p><strong>Phone:</strong> {shipping_address.number}</p>
                            </div>

                            {billing_address && (
                                <div className="invoice-address">
                                    <h3>Billing Address</h3>
                                    <p><strong>Name:</strong> {billing_address.first_name} {billing_address.last_name}</p>
                                    <p><strong>Address:</strong> {billing_address.address}</p>
                                    <p style={{ marginTop: "-5px" }}>{billing_address.city}  - {billing_address.zipcode},<p> {billing_address.country}</p></p>
                                    <p><strong>Email:</strong> {billing_address.email}</p>
                                    <p><strong>Phone:</strong> {billing_address.number}</p>
                                </div>
                            )}
                        </div>
                        <hr />
                        <div className="invoice-products">
                            <h3 style={{ marginBottom: "18px" }}>Product Details</h3>
                            <table className="invoice-table">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>MRP</th>
                                        <th>Selling Price</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, index) => (
                                        <tr key={index}>
                                            <td>{product.product.title}</td>
                                            <td>{product.product_quantity}</td>
                                            <td>{currency} {product.product.mrp}</td>
                                            <td>{currency} {product.product.selling_price}</td>
                                            <td>{currency} {product.product_quantity * product.product.selling_price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="invoice-summary">
                            <h3 >Summary</h3>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><strong>Total Items:</strong></td>
                                        <td>{total_item}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Sub Total:</strong></td>
                                        <td>{currency} {sub_total}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Tax Amount:</strong></td>
                                        <td>{currency} {tax_amount}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Total Amount:</strong></td>
                                        <td>{currency} {total_amount}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p style={{ marginTop: "20px" }}><strong>Payment Method: </strong>{payment_method}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewOrdersPage;