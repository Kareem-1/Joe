import { useState, useEffect } from "react";
import "./dashboard.css"
import logo from '../../assets/joelogo.png';
import Admins from '../../assets/Admin.png';
import Orders from '../../assets/Order.png';
import { MdOutlineReviews } from "react-icons/md";
import { FaRegNewspaper } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";

// React Icons (install with: npm install react-icons)
import {
    MdEdit,
    MdDelete,
} from "react-icons/md";

const BASE_URL = "https://joe-sbackend.fly.dev";

// Configuration for each resource:
const resourceConfig = {
    orders: {
        label: "Orders",
        endpoint: "/order",
        columns: [
            {
                key: "status",
                label: "Status",
                type: "select",
                options: ["New order", "Pending", "Shipped", "Cancelled", "Draft"],
            },
            { key: "item", label: "Item", type: "text" },
            { key: "customer_name", label: "Customer Name", type: "text" },
            { key: "clinic_name", label: "Clinic Name", type: "text" },
            { key: "phone_number", label: "Phone Number", type: "text" },
            { key: "city", label: "City", type: "text" },
            { key: "state", label: "State", type: "text" },
            { key: "additional_details", label: "Additional Details", type: "text" },
        ],
    },
    admins: {
        label: "Admins",
        endpoint: "/admin",
        columns: [
            { key: "name", label: "Name", type: "text" },
            { key: "email", label: "Email", type: "text" },
            { key: "password", label: "Password", type: "text" },
        ],
    },
    reviews: {
        label: "Reviews",
        endpoint: "/reviews",
        columns: [
            { key: "name", label: "Name", type: "text" },
            { key: "review", label: "Review", type: "text" },
            { key: "date", label: "Date", type: "text" },
            { key: "rating", label: "Rating", type: "number" },
            { key: "confirm", label: "Confirm", type: "checkbox" },
        ],
    },
    newsletters: {
        label: "Newsletters",
        endpoint: "/newsletter",
        columns: [
            { key: "name", label: "Name", type: "text" },
            { key: "number", label: "Number", type: "text" },
        ],
    },
};

// A reusable table component to handle fetch, create, edit, delete, + pagination
function ResourceTable({ resourceKey }) {
    const { label, endpoint, columns } = resourceConfig[resourceKey];

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentRecord, setCurrentRecord] = useState({});

    // Pagination states
    const [page, setPage] = useState(1);
    const pageSize = 8;

    // Fetch data from the backend
    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${BASE_URL}${endpoint}`);
            if (!res.ok) {
                throw new Error(`Failed to fetch ${label}`);
            }
            const result = await res.json();
            setData(result);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
        // Reset to page 1 whenever resource changes
        setPage(1);
        // eslint-disable-next-line
    }, [resourceKey]);

    // Client-side pagination data
    const totalPages = Math.ceil(data.length / pageSize);
    const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

    // Modal controls
    const openCreateModal = () => {
        setIsEdit(false);
        const emptyRecord = {};
        columns.forEach((col) => {
            if (col.type === "checkbox") {
                emptyRecord[col.key] = false;
            } else {
                emptyRecord[col.key] = "";
            }
        });
        setCurrentRecord(emptyRecord);
        setIsModalOpen(true);
    };

    const openEditModal = (record) => {
        setIsEdit(true);
        setCurrentRecord({ ...record });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Handle form changes
    const handleChange = (key, value, type) => {
        if (type === "checkbox") {
            setCurrentRecord((prev) => ({ ...prev, [key]: !prev[key] }));
        } else {
            setCurrentRecord((prev) => ({ ...prev, [key]: value }));
        }
    };

    // Create record
    const createRecord = async () => {
        try {
            const res = await fetch(`${BASE_URL}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(currentRecord),
            });
            if (!res.ok) {
                throw new Error(`Failed to create ${label}`);
            }
            await fetchData();
            closeModal();
        } catch (err) {
            alert(err.message);
        }
    };

    // Update record
    const updateRecord = async () => {
        try {
            const res = await fetch(`${BASE_URL}${endpoint}/${currentRecord._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(currentRecord),
            });
            if (!res.ok) {
                throw new Error(`Failed to update ${label}`);
            }
            await fetchData();
            closeModal();
        } catch (err) {
            alert(err.message);
        }
    };

    // Delete record
    const deleteRecord = async (id) => {
        if (!window.confirm("Are you sure you want to delete this record?")) return;
        try {
            const res = await fetch(`${BASE_URL}${endpoint}/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                throw new Error(`Failed to delete ${label}`);
            }
            await fetchData();
        } catch (err) {
            alert(err.message);
        }
    };

    // Handle submit in modal
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            updateRecord();
        } else {
            createRecord();
        }
    };

    // Pagination controls
    const handlePrevPage = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };
    const handleNextPage = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
    };

    // A small helper to render the "Status" field with color-coded badges
    const renderTableCell = (col, record) => {
        if (col.key === "status" && resourceKey === "orders") {
            // Example color-coded badges based on status text
            // Adjust or expand as needed for your statuses
            const statusValue = record[col.key]?.toLowerCase() || "";
            return (
                <span className={`badge ${statusValue.replace(" ", "-")}`}>
                    {record[col.key]}
                </span>
            );
        } else if (col.type === "checkbox") {
            return record[col.key] ? "Yes" : "No";
        } else {
            return record[col.key];
        }
    };

    return (
        <div className="resource-table">
            <div className="table-header">
                <h2>{label}</h2>
                <button className="create-button" onClick={openCreateModal}>
                    <FaPlus size={10} className="plus-sign" /> Create {label}
                </button>
            </div>

            {loading && <p>Loading {label}...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && data.length === 0 && <p>No {label} found.</p>}

            {!loading && !error && data.length > 0 && (
                <>
                    <table>
                        <thead>
                            <tr>
                                {columns.map((col) => (
                                    <th key={col.key}>{col.label}</th>
                                ))}
                                <th style={{ minWidth: "100px" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((record) => (
                                <tr key={record._id}>
                                    {columns.map((col) => (
                                        <td key={col.key}>{renderTableCell(col, record)}</td>
                                    ))}
                                    <td>
                                        <button
                                            className="icon-button edit-button"
                                            onClick={() => openEditModal(record)}
                                        >
                                            <MdEdit />
                                        </button>
                                        <button
                                            className="icon-button delete-button"
                                            onClick={() => deleteRecord(record._id)}
                                        >
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="pagination">
                        <button onClick={handlePrevPage} disabled={page === 1}>
                            Prev
                        </button>
                        <span>
                            Page <strong>{page}</strong> of {totalPages}
                        </span>
                        <button onClick={handleNextPage} disabled={page === totalPages}>
                            Next
                        </button>
                    </div>
                </>
            )}

            {/* Modal for create/edit */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>{isEdit ? `Edit ${label}` : `Create ${label}`}</h3>
                        <form onSubmit={handleSubmit}>
                            {columns.map((col) => (
                                <div className="form-group" key={col.key}>
                                    <label>{col.label}</label>
                                    {col.type === "checkbox" ? (
                                        <input
                                            type="checkbox"
                                            checked={!!currentRecord[col.key]}
                                            onChange={() =>
                                                handleChange(col.key, !currentRecord[col.key], "checkbox")
                                            }
                                        />
                                    ) : col.type === "select" ? (
                                        <select
                                            value={currentRecord[col.key]}
                                            onChange={(e) => handleChange(col.key, e.target.value, col.type)}
                                        >
                                            {col.options.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={col.type}
                                            value={currentRecord[col.key]}
                                            onChange={(e) =>
                                                handleChange(col.key, e.target.value, col.type)
                                            }
                                        />
                                    )}
                                </div>
                            ))}
                            <div className="modal-buttons">
                                <button type="submit" className="save-button">
                                    {isEdit ? "Save Changes" : "Create"}
                                </button>
                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Dashboard() {
    const [selectedResource, setSelectedResource] = useState("orders");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="app-container">
            {/* Collapsible Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="sidebar-header">
                    <img src={logo} alt="Logo" className="sidebar-logo" />
                    <button
                        className="close-sidebar"
                        onClick={() => setSidebarOpen(false)}
                    >
                        &times;
                    </button>
                </div>
                <nav className="nav-links">
                    <button
                        className={selectedResource === "orders" ? "nav-item active" : "nav-item"}
                        onClick={() => { setSelectedResource("orders"); setSidebarOpen(false); }}
                    >
                        <img src={Orders} alt="Orders icon" />
                        Orders
                    </button>
                    <button
                        className={selectedResource === "admins" ? "nav-item active" : "nav-item"}
                        onClick={() => { setSelectedResource("admins"); setSidebarOpen(false); }}
                    >
                        <img src={Admins} alt="Admins icon" />
                        Admins
                    </button>
                    <button
                        className={selectedResource === "reviews" ? "nav-item active" : "nav-item"}
                        onClick={() => { setSelectedResource("reviews"); setSidebarOpen(false); }}
                    >
                        <MdOutlineReviews className="nav-icon" size={22} />
                        Reviews
                    </button>
                    <button
                        className={selectedResource === "newsletters" ? "nav-item active" : "nav-item"}
                        onClick={() => { setSelectedResource("newsletters"); setSidebarOpen(false); }}
                    >
                        <FaRegNewspaper className="nav-icon" size={22} />
                        Newsletters
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                {/* Header for mobile with hamburger menu */}
                <div className="mobile-header">
                    <button
                        className="open-sidebar"
                        onClick={() => setSidebarOpen(true)}
                    >
                        &#9776;
                    </button>
                    <h1>{selectedResource.charAt(0).toUpperCase() + selectedResource.slice(1)}</h1>
                </div>
                <ResourceTable resourceKey={selectedResource} />
            </main>
        </div>
    );
}
