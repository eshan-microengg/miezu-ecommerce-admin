import React, { useState, useEffect } from "react";
import "./style.scss";
import NavBar from "../../components/navbar";
import { HOME_SIDEBAR, NAVBAR } from "../../const";
import HomeSidebar from "../../components/homeSidebar";
import DataTable1 from "../../components/dataTable";
import SearchBar from "../../components/searchBar";
import { getTestimonials, updateTestById, deleteTestById, addTest } from "../../api/orders";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Icons from "../../components/icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";

const Employe = () => {
  const [productData, setProductData] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currId, setCurrId] = useState(null);
  const [isAdd, setIsAdd] = useState(false);

  const fetchEmployees = async () => {
    try {
      const res = await getTestimonials();
      setProductData(res?.data || []);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEdit = (id) => {
    handleShow();
    setCurrId(id);
  };

  const handleDelete = async (id) => {
    await deleteTestById(id);
    fetchEmployees();
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.full_name,
      sortable: true,
    },
    {
      name: "Position",
      selector: (row) => <div>{row.position}</div>,
      sortable: true,
    },

    {
      name: "Rating",
      selector: (row) => <div className="action-button">{row.rating}</div>,
    },
    {
      name: "Review",
      cell: (row) => {
        return (
          <div
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {row.review}
          </div>
        );
      },
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="action-button" style={{ marginLeft: "10%" }}>
          <button className="edit-datatable-button" onClick={() => handleEdit(row.id)}>
            <Icons iconName={faEdit} />
          </button>
          <button className="delete-datatable-button" onClick={() => handleDelete(row.id)}>
            <Icons iconName={faTrash} />
          </button>
        </div>
      ),
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const EditModal = (props) => {
    const _formData = productData.find((v) => v.id === currId) || {};
    const [formData, setFormData] = useState({
      name: _formData?.full_name || "",
      position: _formData.position || "",
      rating: _formData?.rating || "",
      review: _formData?.review || "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
      await updateTestById({
        id: currId,
        full_name: formData.name,
        position: formData.position || "",
        rating: formData?.rating || "",
        review: formData?.review || "",
      });
      handleClose();
      fetchEmployees();
    };

    const handleAdd = async () => {
      await addTest({
        full_name: formData.name,
        position: formData.position || "",
        rating: Number(formData?.rating),
        review: formData?.review || "",
      });
      handleClose();
      fetchEmployees();
      setIsAdd(false);
    };

    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* Name Field */}
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name" />
              </Form.Group>

              {/* Position Field */}
              <Form.Group className="mb-3" controlId="formPosition">
                <Form.Label>Position</Form.Label>
                <Form.Control type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Enter position" />
              </Form.Group>

              {/* Rating Field */}
              <Form.Group className="mb-3" controlId="formRating">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  placeholder="Enter rating (1-5)"
                  min="1"
                  max="5"
                />
              </Form.Group>

              {/* Review Field */}
              <Form.Group className="mb-3" controlId="formReview">
                <Form.Label>Review</Form.Label>
                <Form.Control as="textarea" name="review" value={formData.review} onChange={handleChange} placeholder="Enter review" rows={3} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={isAdd ? handleAdd : handleSave}>
              {isAdd ? "Submit" : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  const handleAdd = () => {
    setIsAdd(true);
    handleShow();
  };

  return (
    <div className="container">
      <EditModal />
      <NavBar brandName={NAVBAR.BRAND_IMAGE} profileName={NAVBAR.PROFILE_NAME} profileOption={NAVBAR.PROFILE_OPTION} />
      <div className="content-wrapper">
        <HomeSidebar accordions={HOME_SIDEBAR} />
        <div className="main-content">
          <div className="cardBody">
            <div className="product-navbar">
              <div className="product-heading">Testimonials</div>

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
                <Button variant="primary" onClick={handleAdd} style={{ height: "40px", marginTop: "10px", marginRight: "10px" }}>
                  + Add
                </Button>
              </div>
            </div>
            <div>
              <DataTable1 Tabledata={productData} searchTerm={searchTerm} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employe;
