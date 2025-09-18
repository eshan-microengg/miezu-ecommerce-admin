import React, { useState, useEffect } from "react";
import "./style.scss";
import NavBar from "../../components/navbar";
import Button1 from "../../components/button";
import { useNavigate } from "react-router";
import { HOME_SIDEBAR, NAVBAR } from "../../const";
import HomeSidebar from "../../components/homeSidebar";
import DataTable1 from "../../components/dataTable";
import SearchBar from "../../components/searchBar";
import { Provider } from "../../allProvider/products.provider";
import { faAdd, faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import Icons from "../../components/icons";
import { getAllEmployees, deleteEmployee } from "../../api/employees";
import { getAllDemos, updateDemoById } from "../../api/orders";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Employe = () => {
  const [productData, setProductData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null); // To hold the details of the clicked row
  const [showModal, setShowModal] = useState(false); // To control the modal visibility
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const res = await getAllDemos();
      setProductData(res?.data?.data || []);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleClick = () => {
    navigate("/add-employee");
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    fetchEmployees();
  };

  const handleEdit = (id) => {
    const employee = productData.find((v) => v.id === id);
    navigate(`/add-employee/`, { state: { employee: employee } });
  };

  const handleRowClick = (id) => {
    setSelectedRow(productData.find((v) => v.id === id) || {});
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false); // Hide the modal
    setSelectedRow(null); // Clear the selected row details
  };

  const demoStatus = ["Pending", "Confirmed", "Scheduled", "In Progress", "Completed", "Cancelled"];

  const handleStatusChange = async (id, e) => {
    await updateDemoById(id, { status: e.target.value });
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.full_name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => <div>{row.email}</div>,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => <div className="action-button">{row.phone}</div>,
    },
    {
      name: "Address",
      cell: (row) => {
        return (
          <div
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "150px",
              cursor: "pointer",
            }}
            title={row.address}
          >
            {row.address}
          </div>
        );
      },
    },
    {
      name: "Preferred Contact Slot",
      cell: (row) => {
        const date = new Date(row.preferred_contact_slot);
        const formattedDate = [String(date.getDate()).padStart(2, "0"), String(date.getMonth() + 1).padStart(2, "0"), date.getFullYear()].join("-");
        return <div style={{ marginLeft: "-5rem" }}>{formattedDate}</div>;
      },
    },
    {
      name: "Demo Status",
      cell: (row) => {
        return (
          <Form.Select aria-label="Default select example" defaultValue={row.status} onChange={(e) => handleStatusChange(row.id, e)}>
            <option value="1" disabled>
              Select Demo Status
            </option>
            {demoStatus.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Form.Select>
        );
      },
    },
    {
      name: "Action",
      cell: (row) => {
        return (
          <div onClick={() => handleRowClick(row.id)}>
            <FontAwesomeIcon icon={faEye} style={{ fontSize: "15px", cursor: "pointer" }} />
          </div>
        );
      },
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
              <div className="product-heading">Demo Booked</div>
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
            <p>
              <strong>Name:</strong> {selectedRow.full_name}
            </p>
            <p>
              <strong>Email:</strong> {selectedRow.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedRow.phone}
            </p>
            <p>
              <strong>Zip Code:</strong> {selectedRow.zipcode}
            </p>
            <p>
              <strong>Address:</strong> {selectedRow.address}
            </p>
            <p>
              <strong>Preferred Contact Slot:</strong> {selectedRow.preferred_contact_slot}
            </p>
            <p>
              <strong>Status:</strong> {selectedRow.status}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Employe;
