import React from "react";
import "./style.scss";
import NavBar from "../../components/navbar";
import HomeSidebar from "../../components/homeSidebar";
import * as formik from "formik";
import * as yup from "yup";
import Label from "../../components/label";
import Input from "../../components/input";
import { isStringRequired } from "../../utils/validation";
import Button1 from "../../components/button";
import { Form } from "react-bootstrap";
import { HOME_SIDEBAR } from "../../const";
import { NAVBAR } from "../../const";
import { addNewEmployee, updateEmployeeById } from "../../api/employees";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

const AddEmployeePage = () => {
  const { Formik } = formik;
  const navigate = useNavigate();
  const location = useLocation();
  const { employee } = location.state || {};

  const schema = yup.object().shape({
    name: isStringRequired(),
    contact_no: isStringRequired(),
    address: isStringRequired(),
  });

  const handleSubmit = async (values) => {
    try {
      const payload = {
        name: values?.name,
        contact_no: values?.contact_no,
        address: values?.address,
        date_of_joining: values?.date_of_joining,
        active: values?.active,
      };
      if (employee) {
        payload.id = values.id;
        await updateEmployeeById(payload);
        navigate(-1);
        return;
      }
      await addNewEmployee(payload);
      navigate(-1);
    } catch (err) {
      return err;
    }
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        name: employee?.name || "",
        address: employee?.address || "",
        contact_no: employee?.contact_no || "",
        date_of_joining: employee?.date_of_joining || "",
        active: employee?.active,
        id: employee?.id || "",
      }}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
        <form noValidate onSubmit={handleSubmit}>
          <div className="container">
            <NavBar brandName={NAVBAR.BRAND_IMAGE} profileName={NAVBAR.PROFILE_NAME} profileOption={NAVBAR.PROFILE_OPTION} />
            <div className="content-wrapper">
              <HomeSidebar accordions={HOME_SIDEBAR} />
              <div className="main-content">
                <div className="product-section">
                  <h5
                    style={{
                      marginBottom: "20px",
                      fontWeight: "bold",
                      color: "#00435a",
                    }}
                  >
                    Add Employee
                  </h5>
                  <div className="div1">
                    <div>
                      <Label label="Name" />
                      <Input
                        name="name"
                        type="text"
                        placeholder="Enter Name"
                        onChange={handleChange}
                        error={errors.name}
                        value={values.name}
                        isInvalid={!!errors.name}
                      />
                    </div>
                    <div>
                      <Label label="Contact Number" />
                      <Input
                        name="contact_no"
                        type="text"
                        placeholder="Enter Contact Number"
                        onChange={handleChange}
                        error={errors.contact_no}
                        value={values.contact_no}
                        isInvalid={!!errors.contact_no}
                      />
                    </div>
                  </div>
                  <div className="div1">
                    <div>
                      <Label label="Address" />
                      <Input
                        name="address"
                        type="text"
                        placeholder="Enter Address"
                        onChange={handleChange}
                        error={errors.address}
                        value={values.address}
                        isInvalid={!!errors.address}
                      />
                    </div>
                    <div>
                      <Label label="Date of Joining" />
                      <Form.Control
                        name="date_of_joining"
                        type="date"
                        onChange={handleChange}
                        error={errors.date_of_joining}
                        value={values.date_of_joining}
                        isInvalid={!!errors.date_of_joining}
                      />
                    </div>
                  </div>
                  <div className="div1" style={{ width: "fit-content" }}>
                    <Label label="Active" />
                    <Form.Check
                      name="active"
                      type="switch"
                      onChange={handleChange}
                      error={errors.active}
                      value={values.active}
                      isInvalid={!!errors.active}
                      checked={values.active}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", width: "100%" }}>
                  <div className="submit-section" style={{ marginLeft: "auto", marginRight: "30px" }}>
                    <Button1 buttonValue={employee ? "Update" : "Submit"} type="submit" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default AddEmployeePage;
