import React, { useState, useEffect } from "react";
import "./style.scss";
import NavBar from "../../components/navbar";
import { HOME_SIDEBAR, NAVBAR } from "../../const";
import HomeSidebar from "../../components/homeSidebar";
import DataTable1 from "../../components/dataTable";
import SearchBar from "../../components/searchBar";
import { getBlogs, updateBlogsById, deleteBlogsById, addBlogs } from "../../api/orders";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Icons from "../../components/icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { uploadImage } from "../../api/orders";
import { getS3Image } from "../../imageUploader";
import { useNavigate } from "react-router";
import "./style.scss"

const Employe = () => {
  const [productData, setProductData] = useState([]);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currId, setCurrId] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const res = await getBlogs();
      setProductData(res?.data || []);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleEdit = (id) => {
    navigate(`/blogs/${id}`)
    setCurrId(id);
  };

  const handleDelete = async (id) => {
    await deleteBlogsById(id);
    fetchBlogs();
  };

  const columns = [
    {
      name: "Image",
      selector: (row) => (
        row.image_url ? <img src={getS3Image(row.image_url)} alt="Blog" style={{ width: "50px" }} /> : "No Image"
      ),
      sortable: false,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Keywords",
      selector: (row) => row.keywords,
      sortable: true,
    },
    // {
    //   name: "Description",
    //   selector: (row) => row.description,
    //   sortable: true,
    // },

    {
      name: "Active",
      selector: (row) => <div className="action-button">{row.is_active ? "Yes" : "No"}</div>,
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
      title: _formData?.title || "",
      keywords: _formData.keywords || "",
      description: _formData?.description || "",
      is_active: _formData?.is_active || false,
      image_url: _formData?.image_url || "",
    });

    const [selectedFile, setSelectedFile] = useState(null);

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
    };

    const handleSave = async () => {
      setIsLoading(true);
      try {
        let imageUrl = formData.image_url;
        if (selectedFile) {
          const uploadRes = await uploadImage({ product_id: currId, file: selectedFile });
          imageUrl = uploadRes.data.image_url;
        }
        await updateBlogsById(currId, {
          title: formData.title,
          keywords: formData.keywords,
          description: formData.description,
          is_active: formData.is_active,
          image_url: imageUrl,
        });
        handleClose();
        fetchBlogs();
      } finally {
        setIsLoading(false);
      }
    };

    const handleAdd = async () => {
      setIsLoading(true);
      try {
        let imageUrl = "";
        if (selectedFile) {
          const uploadRes = await uploadImage({ product_id: 0, file: selectedFile });
          imageUrl = uploadRes.data.image_url;
        }
        await addBlogs({
          title: formData.title,
          keywords: formData.keywords,
          description: formData.description,
          is_active: formData.is_active,
          image_url: imageUrl,
        });
        handleClose();
        fetchBlogs();
        setIsAdd(false);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{isAdd ? "Add Blog" : "Edit Blog"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* Title Field */}
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter title" />
              </Form.Group>

              {/* Keywords Field */}
              <Form.Group className="mb-3" controlId="formKeywords">
                <Form.Label>Keywords</Form.Label>
                <Form.Control type="text" name="keywords" value={formData.keywords} onChange={handleChange} placeholder="Enter keywords" />
              </Form.Group>

              {/* Description Field */}
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  rows={3}
                />
              </Form.Group>

              {/* Image Upload Field */}
              <Form.Group className="mb-3" controlId="formImageUpload">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>

              {/* Active Field */}
              <Form.Group className="mb-3" controlId="formIsActive">
                <Form.Check
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                  label="Active"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={isAdd ? handleAdd : handleSave} disabled={isLoading}>
              {isLoading ? "Submitting" : isAdd ? "Submit" : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  const handleAdd = () => {
    navigate(`/blogs/0`)
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
              <div className="product-heading">Blogs</div>

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
