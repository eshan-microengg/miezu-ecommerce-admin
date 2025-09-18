import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import { uploadImage, addBlogs, getBlogs, updateBlogsById } from "../../api/orders";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar";
import HomeSidebar from "../../components/homeSidebar";
import { HOME_SIDEBAR, META, NAVBAR } from "../../const";
import { useParams } from "react-router-dom";
import { showToast } from "../../components/toastify";
import { getS3Image } from "../../imageUploader";
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css";
import Footer from "../../components/footer";
import Label from "../../components/label";
import Input from "../../components/input";

const AddBlog = () => {
  const [formData, setFormData] = useState({
    meta_title:"",
    meta_desc:"",
    meta_keywords:"",
    title: "",
    keywords: "",
    description: "",
    is_active: false,
    image_url: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("write");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      // Generate a local preview URL
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleDescriptionChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      description: value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let imageUrl = formData.image_url;
      if (selectedFile) {
        const uploadRes = await uploadImage({ product_id: 0, file: selectedFile });
        imageUrl = uploadRes.data.image_url;
      }

      if (id != 0) {
        await updateBlogsById(id, {
          ...formData,
          image_url: imageUrl,
        });
        showToast("Blog is successfully updated.", "success");
      } else {
        await addBlogs({
          ...formData,
          image_url: imageUrl,
        });
        showToast("Blog is successfully added.", "success");
        navigate("/blogs");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBlogs = async () => {
    const res = await getBlogs();
    const blog = res?.data?.find((v) => v.id == id);
    if (blog) {
      setFormData({
        meta_title:blog.meta_title || "",
        meta_desc:blog.meta_desc || "",
        meta_keywords:blog.meta_keywords || "",

        title: blog.title || "ew",
        keywords: blog.keywords || "",
        description: blog.description || "",
        is_active: blog.is_active,
        image_url: blog.image_url || "",
      });
      // Set preview image for remote image
      if (blog.image_url) {
        setPreviewImage(getS3Image(blog.image_url));
      }
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (id !== 0) {
      fetchBlogs();
    }
  }, [id]);

  return (
    <div className="container">
      <NavBar brandName={NAVBAR.BRAND_IMAGE} profileName={NAVBAR.PROFILE_NAME} profileOption={NAVBAR.PROFILE_OPTION} />
      <div className="content-wrapper">
        <HomeSidebar accordions={HOME_SIDEBAR} />
        <div className="main-content">

          <div className="cardBody" style={{ width: "100%", padding: "1rem", height: "100vh", overflowY: "auto" }} >
            <div className="product-heading" style={{ paddingLeft: 0, color: "#00435a" }}>
              {id != 0 ? "Edit Blog" : "Add Blog"}
            </div>
            <Form style={{ marginBottom: "5rem" }} >
              <div className="div1">
                <div>
                  <Label label={META.M_TITLE.LABEL} />
                  <Input name="meta_title" type="text" placeholder="Enter Title" onChange={handleChange} value={formData.meta_title} />
                </div>
                <div>
                  <Label label={META.DESC.LABEL} />
                  <Input name="meta_desc" textarea="textarea" placeholder="Enter Description" onChange={handleChange} value={formData.meta_desc}/>
                </div>
                <div>
                  <Label label={META.KEYWORDS.LABEL} />
                  <Input
                    name="meta_keywords"
                    textarea="textarea"
                    placeholder="Enter Keywords" onChange={handleChange} value={formData.meta_keywords}
                  />
                </div>
              </div>

              <div className="div1" >

                <Form.Group className="mb-3" controlId="formTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter title" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formKeywords">
                  <Form.Label>Keywords</Form.Label>
                  <Form.Control type="text" name="keywords" value={formData.keywords} onChange={handleChange} placeholder="Enter keywords" />
                </Form.Group>
              </div>

              <Form.Group className="mb-3" controlId="formIsActive"  >
                <Form.Check type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} label="Active" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formImageUpload">
                <Form.Label>Upload Image</Form.Label>
                {previewImage && (
                  <div className="mb-3">
                    <img src={previewImage} alt="Blog Preview" style={{ width: "100%", maxWidth: "300px", height: "auto" }} />
                  </div>
                )}
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <ReactQuill
                  theme="snow"
                  value={formData.description}
                  onChange={handleDescriptionChange}
                />
              </Form.Group>

              {/* <Button variant="primary" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Submitting..." : id != 0 ? "Update" : "Submit"}
              </Button> */}
            </Form>
          </div>

          <div className="footer" style={{ left: "3%", width: "94%" }}>
            <Footer onClick={handleGoBack} disabled={isLoading} buttonTitle1="Go Back" buttonTitle2={id !== 0 ? "Update" : "Submit"} onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
