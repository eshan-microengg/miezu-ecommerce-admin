import React, { useEffect, useState } from 'react'
import { GetOrders, GetOrdersByID } from '../api/orders';
import { showToast } from '../components/toastify';

const OrdersProvider = () => {

    const [ordersData, setOrdersData] = useState([]);
    const [order , setOrder] = useState({
        order_number: "",
        invoice_number: "",
        order_date: "",
        products: [],
        shipping_address: {},
        billing_address: {},
        expected_delivery: "",
        total_item: "",
        sub_total: "",
        tax_amount: "",
        total_amount: "",
        payment_method: "",
        currency: "",
        order_status: "",
        user: []
      })

    useEffect(() => {
        const getOrdersData = async () => {
            try {
                const res = await GetOrders();
                const data = res.data;
                const formattedOrders = data.map(orders => ({
                  id: orders.id,
                  order_number: orders.order_number,
                  invoice_number: orders.invoice_number,
                  order_date: new Date(orders.order_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                  }),
                  expected_delivery: new Date(orders.expected_delivery).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                  }),
                  payment_method: orders.payment_method,
                  order_status: orders.order_status
              }));

                setOrdersData(formattedOrders);
            } catch (err) {
                showToast("Error Fetching Orders", "error");
            }
        };

        getOrdersData();
    }, []);

    useEffect(() => {
    }, [ordersData]);

    const getOrderById = (id) => {
        GetOrdersByID(id)
        .then(res => {
          setOrder(res.data);
        })
        .catch((error)=>{
          showToast('An Error Occurred , Please Try Again', "error")
        })
      }

    return {
        ordersData,
        getOrderById,
        order
}
}

export default OrdersProvider
