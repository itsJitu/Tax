import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { TbEdit, TbTrash } from "react-icons/tb";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

function Tax() {
  const [showModal, setShowModal] = useState(false);
  const [taxes, setTaxes] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    gst: "",
    igst: "",
    cgst: "",
    sgst: "",
  });

  const API_URL = "http://localhost:8080/api/tax";

  const fetchTaxes = async () => {
    try {
      const response = await axios.get(API_URL);
      setTaxes(response.data);
    } catch (error) {
      console.error("Error fetching taxes:", error);
    }
  };

  useEffect(() => {
    fetchTaxes();
  }, []);

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // UPDATE
        await axios.put(`${API_URL}/${currentId}`, form);
      } else {
        // ADD NEW
        await axios.post(API_URL, form);
      }

      setForm({ gst: "", igst: "", cgst: "", sgst: "" });
      setShowModal(false);
      setIsEditing(false);
      setCurrentId(null);
      fetchTaxes();
    } catch (error) {
      console.error("Error saving tax:", error);
    }
  };

  const openAddModal = () => {
    setForm({ gst: "", igst: "", cgst: "", sgst: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditModal = (tax) => {
    setForm({
      gst: tax.gst,
      igst: tax.igst,
      cgst: tax.cgst,
      sgst: tax.sgst,
    });
    setIsEditing(true);
    setCurrentId(tax._id);
    setShowModal(true);
  };

  // Delete tax====================================================
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this tax?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchTaxes(); // refresh list after delete
      } catch (error) {
        console.error("Error deleting tax:", error);
      }
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4 className="fw-bold">TAX</h4>
              <h6>Manage your Tax</h6>
            </div>
          </div>
          <div className="table-top-head me-2">
            <li></li>
            <li
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
              className="icon-btn"
            >
              <label>Export : </label>
              <button
                title="Download PDF"
                style={{ backgroundColor: "white", border: "none" }}
              >
                <FaFilePdf className="fs-20" style={{ color: "red" }} />
              </button>
              <button
                title="Download Excel"
                style={{ backgroundColor: "white", border: "none" }}
              >
                <FaFileExcel className="fs-20" style={{ color: "orange" }} />
              </button>
            </li>
            <li
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
              className="icon-btn"
            >
              <label>Import : </label>
              <label title="Import Excel">
                <input type="file" accept=".xlsx,.xls,.csv" hidden />
                <FaFileExcel style={{ color: "green", cursor: "pointer" }} />
              </label>
            </li>
          </div>
          <div className="page-btn">
            <button className="btn btn-primary" onClick={openAddModal}>
              <CiCirclePlus className="me-1" />
              Add Tax
            </button>
          </div>
        </div>

        {/* TAX Table */}
        <div className="card">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table datatable">
                <thead className="thead-light">
                  <tr>
                    <th></th>
                    <th>GST</th>
                    <th>IGST</th>
                    <th>CGST</th>
                    <th>SGST</th>
                    <th>Total</th>
                    <th style={{ textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {taxes.length ? (
                    taxes.map((tax) => (
                      <tr key={tax._id}>
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td>{tax.gst}</td>
                        <td>{tax.igst}</td>
                        <td>{tax.cgst}</td>
                        <td>{tax.sgst}</td>
                        <td>{tax.cgst + tax.sgst}%</td>
                        <td style={{ textAlign: "center" }}>
                          <TbEdit
                            style={{ cursor: "pointer" }}
                            onClick={() => openEditModal(tax)}
                          />
                          <TbTrash
                            style={{
                              cursor: "pointer",
                              marginLeft: "8px",
                              color: "red",
                            }}
                            onClick={() => handleDelete(tax._id)}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} style={{ textAlign: "center" }}>
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div
                className="d-flex justify-content-end gap-3"
                style={{ padding: "10px 20px" }}
              >
                <select className="form-select w-auto">
                  <option value={10}>10 Per Page</option>
                  <option value={25}>25 Per Page</option>
                  <option value={50}>50 Per Page</option>
                  <option value={100}>100 Per Page</option>
                </select>

                <span
                  style={{
                    backgroundColor: "white",
                    boxShadow: "rgb(0 0 0 / 4%) 0px 3px 8px",
                    padding: "7px",
                    borderRadius: "5px",
                    border: "1px solid #e4e0e0ff",
                    color: "gray",
                  }}
                >
                  <button
                    style={{
                      border: "none",
                      color: "grey",
                      backgroundColor: "white",
                    }}
                  >
                    <GrFormPrevious />
                  </button>
                  <button style={{ border: "none", backgroundColor: "white" }}>
                    <MdNavigateNext />
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-container">
              <div className="modal-header">
                <h5>{isEditing ? "Edit Tax" : "Add Tax"}</h5>
                {/* <button
                  onClick={() => setShowModal(false)}
                  style={{
                    border: "none",
                    background: "transparent",
                    fontSize: "18px",
                  }}
                >
                  ✖
                </button> */}
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">GST (%)</label>
                    <input
                      type="number"
                      name="gst"
                      value={form.gst}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">IGST (%)</label>
                    <input
                      type="number"
                      name="igst"
                      value={form.igst}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">CGST (%)</label>
                    <input
                      type="number"
                      name="cgst"
                      value={form.cgst}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">SGST (%)</label>
                    <input
                      type="number"
                      name="sgst"
                      value={form.sgst}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="d-flex justify-content-end gap-2 mt-3">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {isEditing ? "Update" : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tax;
