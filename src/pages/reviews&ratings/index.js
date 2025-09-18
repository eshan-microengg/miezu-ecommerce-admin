import React, { useState, useEffect } from "react";
import "./style.scss";
import NavBar from "../../components/navbar";
import Button1 from "../../components/button";
import { useNavigate } from "react-router";
import { HOME_SIDEBAR, NAVBAR } from "../../const";
import HomeSidebar from "../../components/homeSidebar";
import DataTable1 from "../../components/dataTable";
import SearchBar from "../../components/searchBar";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import Icons from "../../components/icons";
import { productReview } from "../../api/products";
import { Form } from "react-bootstrap"; 

const Orders = () => {
  const navigate = useNavigate();
  const [ordersData, setOrderData] = useState([]);
  
  const fetchReviews = async (page = 0) => {
    const response = await productReview({
      action: "fetch",
      page: page + 1,
      limit: 999,
    });
    setOrderData(response?.data?.data?.reviews);
  };

  const handleStatusToggle = async (reviewId, currentStatus) => {
    try {
      await productReview({
        action: "update",  
        review_id: reviewId,
        is_published: currentStatus
      });
      fetchReviews(); 
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const columns = [
    {
      name: "Product Name",
      selector: (row) => row.product.title,
      sortable: true,
    },
    {
      name: "User Name",
      selector: (row) => row.user.full_name,
    },
    {
      name: "Rating",
      selector: (row) => row.rating,
    },
    {
      name: "Review",
      selector: (row) => row.review,
      sortable: true,
    },
    {
      name: "Is Published",
      selector: (row) => (
        <Form.Check
          type="switch"
          id={`active-switch-${row.id}`}
          checked={row.is_published}
          onChange={() => handleStatusToggle(row.id, !row.is_published)}
        />
      ),
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container">
      <NavBar brandName={NAVBAR.BRAND_IMAGE} profileName={NAVBAR.PROFILE_NAME} profileOption={NAVBAR.PROFILE_OPTION} />
      <div className="content-wrapper">
        <HomeSidebar accordions={HOME_SIDEBAR} />
        <div className="main-content">
          <div className="cardBody">
            <div className="product-navbar">
              <div className="product-heading">Reviews & Rating</div>

              <div className="action-navBar">
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
              <DataTable1 Tabledata={ordersData} searchTerm={searchTerm} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
