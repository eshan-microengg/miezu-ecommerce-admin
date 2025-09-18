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
import { faAdd, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Icons from "../../components/icons";
import { getAllEmployees, deleteEmployee } from "../../api/employees";

const Employe = () => {
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const res = await getAllEmployees();
      setProductData(res?.data || [])
    } catch (err) {
      return err;
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, [])

  const handleClick = () => {
    navigate("/add-employee");
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    fetchEmployees();
  };

  const handleEdit = (id) => {
    const employee = productData.find(v => v.id === id);
    navigate(`/add-employee/`, { state: { employee: employee } });
  };

  const columns = [
    {
      name: "Employee Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: " Employee ID",
      selector: (row) => (
        <div style={{marginLeft: "4rem"}}>
         {row.employee_id}
        </div>
      ),
      sortable: true,
    },

    {
      name: "Active",
      selector: (row) => (
        <div className="action-button" style={{ marginLeft: "10rem" }}>
          {row.active ? "Active" : "Inactive"}
        </div>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="action-button" style={{ marginLeft: "10%"}}>
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

  return (
    <div className="container">
      <NavBar brandName={NAVBAR.BRAND_IMAGE} profileName={NAVBAR.PROFILE_NAME} profileOption={NAVBAR.PROFILE_OPTION} />
      <div className="content-wrapper">
        <HomeSidebar accordions={HOME_SIDEBAR} />
        <div className="main-content">
          <div className="cardBody">
            <div className="product-navbar">
              <div className="product-heading">Employee page</div>

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
                <div className="product-add-button">
                  <Button1
                    buttonValue={
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          marginRight: "-12px",
                        }}
                      >
                        <Icons iconName={faAdd} />
                        Add
                      </div>
                    }
                    onClick={handleClick}
                  />
                </div>
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
