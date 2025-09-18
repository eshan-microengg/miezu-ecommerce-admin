import React, { useState, useEffect } from "react";
import "./style.scss";
import NavBar from "../../components/navbar";
import Button1 from "../../components/button";
import { useNavigate } from "react-router";
import { HOME_SIDEBAR, NAVBAR } from "../../const";
import HomeSidebar from "../../components/homeSidebar";
import DataTable1 from "../../components/dataTable";
import DropdownSelect from "../../components/dropdown";
import SearchBar from "../../components/searchBar";
import { faAdd, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getCoupons, createCoupon, updateCoupon, deleteCoupon } from "../../api/coupons";
import { Direction } from "react-data-table-component";

const Employe = () => {
  const [productData, setProductData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: "",
    expiry_date: "",
    active: true,
    description: "",
    title: "",
    valid_from: "",
    discount_format: "",
  });

  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const res = await getCoupons();
      setProductData(res?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddCoupon = async () => {
    try {
      await createCoupon(newCoupon);
      setShowAddModal(false);
      setNewCoupon({
        code: "",
        discount: "",
        expiry_date: "",
        active: false,
        description: "",
        title: "",
        valid_from: "",
        discount_format: "",
      });
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRowClick = (id) => {
    const selected = productData.find((v) => v.id === id);
    setSelectedRow(selected || {});
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedRow(null);
  };

  const handleAddModalClose = () => {
    setShowAddModal(false);
    setNewCoupon({
      code: "MZU3212",
      discount: "20.00",
      expiry_date: "2024-12-28",
      active: true,
      description: "123",
      title: "title 2",
      valid_from: "2024-12-12",
      discount_format: "Percentage",
    });
  };

  const handleStatusToggle = async (id, active) => {
    try {
      await updateCoupon({ id, active });
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCoupon = async (id) => {
    try {
      await deleteCoupon(id);
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Coupon",
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: "Valid Date",
      selector: (row) => <div>{row.valid_from}</div>,
      sortable: true,
    },
    {
      name: "Expiry date",
      selector: (row) => <div>{row.expiry_date}</div>,
      sortable: true,
    },
    {
      name: " active",
      selector: (row) => (
        <Form.Check type="switch" id={`active-switch-${row.id}`} checked={row.active} onChange={() => handleStatusToggle(row.id, !row.active)} />
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <FontAwesomeIcon icon={faEye} style={{ fontSize: "15px", cursor: "pointer", marginRight: "10px" }} onClick={() => handleRowClick(row.id)} />
          <FontAwesomeIcon icon={faTrash} style={{ fontSize: "15px", cursor: "pointer", color: "red" }} onClick={() => handleDeleteCoupon(row.id)} />
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <NavBar brandName={NAVBAR.BRAND_IMAGE} profileName={NAVBAR.PROFILE_NAME} profileOption={NAVBAR.PROFILE_OPTION} />
      <div className="content-wrapper">
        <HomeSidebar accordions={HOME_SIDEBAR} />
        <div className="main-content">
          <div className="cardBody">
            <div className="product-navbar">
              <div className="product-heading">Coupons</div>
              <div className="action-navBar">
                <div className="product-searchbar">
                  <SearchBar
                    style={{
                      height: "38px",
                      border: "1px solid rgb(189,188,188)",
                      borderRadius: "5px",
                      padding: "10px",
                    }}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                  />
                </div>
                <Button
                  style={{
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    margin: "10px",
                  }}
                  variant="primary"
                  onClick={() => setShowAddModal(true)}
                >
                  Add
                </Button>
              </div>
            </div>
            <div>
              <DataTable1 Tabledata={productData} searchTerm={searchTerm} columns={columns} onRowClicked={handleRowClick} />
            </div>
          </div>
        </div>
      </div>
      {selectedRow && (
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table></table>
            <p>
              <strong>Title:</strong> {selectedRow.title}
            </p>
            <p>
              <strong>Description:</strong> {selectedRow.description}
            </p>
            <p>
              <strong>Coupon Code:</strong> {selectedRow.code}
            </p>
            <p>
              <strong>Valid Date:</strong> {selectedRow.valid_from}
            </p>
            <p>
              <strong>Expiry Date: </strong>
              {selectedRow.expiry_date}
            </p>
            <p>
              <strong>Active:</strong> {selectedRow.active ? "Active" : "INActive"}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <Modal show={showAddModal} onHide={handleAddModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Coupon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formCouponTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                value={newCoupon.title}
                onChange={(e) => setNewCoupon({ ...newCoupon, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCouponDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={newCoupon.description}
                onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCouponCode">
              <Form.Label>Coupon Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter coupon code"
                value={newCoupon.code}
                onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formCouponDiscount">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Discount"
                value={newCoupon.discount}
                onChange={(e) =>
                  setNewCoupon({ ...newCoupon, discount: e.target.value })
                }
              />
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="formCouponValidDate">
              <Form.Label>Valid From</Form.Label>
              <Form.Control type="date" value={newCoupon.valid_from} onChange={(e) => setNewCoupon({ ...newCoupon, valid_from: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCouponExpiryDate">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control type="date" value={newCoupon.expiry_date} onChange={(e) => setNewCoupon({ ...newCoupon, expiry_date: e.target.value })} />
              <Form.Group>
                <Form.Label>Discount</Form.Label>
                <DropdownSelect
                  onChange={(e) => setNewCoupon({ ...newCoupon, discount_format: e.target.value })}
                  options={[
                    {
                      VALUE: "Amount",
                      LABEL: "Amount",
                    },
                    {
                      VALUE: "Percentage",
                      LABEL: "Percentage",
                    },
                  ]}
                />
              </Form.Group>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCouponAmountUpto">
              <Form.Label>Amount Upto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Amount Upto"
                value={newCoupon.discount}
                onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddCoupon}>
            Add Coupon
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Employe;
