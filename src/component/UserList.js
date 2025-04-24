import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../redux/userSlice";
import UserForm from "./UserForm";
import './UserList.css';

const UserList = () => {
    const dispatch = useDispatch();
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false); 
    const [userdata, setIUserData] = useState(null);
    const users = useSelector((state) => state.users);

    const handleEdit = (user) => {
        setIUserData(user);
        setEditModal(true);
    };

    const handleAddUser = () => {
        setIUserData(null); 
        setAddModal(true); 
    };

    return (
        <div className="user-list-container">
            <h2 className="user-list-heading">User List</h2>

            <div style={{ marginBottom: "20px" }}>
                <button onClick={handleAddUser} className="add-user-btn">Add User</button>
            </div>

            <div className="table-container">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>DOB</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.userList?.length > 0 ? (
                            users.userList.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.firstName?user.firstName:"-"}</td>
                                    <td>{user.lastName?user.lastName:"-"}</td>
                                    <td>{user.email?user.email:"-"}</td>
                                    <td>{user.phone?user.phone:"-"}</td>
                                    <td>{user.dob?user.dob:"-"}</td>
                                    <td>
                                        <button onClick={() => handleEdit(user)} className="edit-btn">Edit</button>
                                    </td>
                                    <td>
                                        <button onClick={() => dispatch(deleteUser(user.id))} className="delete-btn">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="7" className="no-users-text">No Users Found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add User Modal */}
            {addModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <UserForm
                            userdata={userdata}
                            handleClose={() => setAddModal(false)} 
                        />
                    </div>
                </div>
            )}
            {/* Edit User Modal */}
            {editModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                      
                        <UserForm
                            userdata={userdata}
                            handleClose={() => {
                                setEditModal(false);
                                setIUserData(null);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;
