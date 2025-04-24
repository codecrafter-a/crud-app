import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from "../redux/userSlice";
import "./UserList.css"
import YearPickerDropdown from "./YearPickerDropdown";
const UserForm = ({ handleClose, userdata }) => {
    const dispatch = useDispatch();
    const defaultEducation = { degree: '', college: '', startYear: '', endYear: '' };
    const defaultExperience = { companyName: '', startMonthYear: '', endMonthYear: '' };

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dob: "",
        address: "",
        education: [defaultEducation],
        experience: [defaultExperience],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDynamicChange = (section, index, name, value) => {
        const updated = [...formData[section]];
        if (!updated[index]) {
            updated[index] = {};
        }
        updated[index] = {
            ...updated[index],
            [name]: value,
        };

        setFormData((prev) => ({ ...prev, [section]: updated }));
    };

    const addField = (section, defaultVal) => {
        setFormData((prev) => ({
            ...prev,
            [section]: [...prev[section], { ...defaultVal }],
        }));
    };

    const removeField = (section, index) => {
        setFormData((prev) => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.firstName || !formData.email) return alert("First name and email are required.");

        if (userdata) {
            dispatch(updateUser(formData));
            handleClose();
        } else {
            dispatch(addUser(formData));
            handleClose();

        }

        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            dob: "",
            address: "",
            education: [defaultEducation],
            experience: [defaultExperience],
        });
    };

    useEffect(() => {
        if (userdata) {
            setFormData(userdata);
        }
    }, [userdata]);

    return (
        <div>
            <div className="heading-data">
                <h2>{userdata ? "Update" : "Add"} User</h2>
                <p onClick={handleClose} style={{ cursor: "pointer" }}>X</p>
            </div>
            <form onSubmit={handleSubmit}>
                <input name="firstName" type="text" placeholder="First Name" onChange={handleChange} value={formData.firstName} />
                <input name="lastName" type="text" placeholder="Last Name" onChange={handleChange} value={formData.lastName} />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} value={formData.email} />
                <input name="phone" type="text" placeholder="Phone" onChange={handleChange} value={formData.phone} />
                <input name="dob" type="date" placeholder="DOB" onChange={handleChange} value={formData.dob} />
                <input name="address" type="text" placeholder="Address" onChange={handleChange} value={formData.address} />

                <h3>Education</h3>
                {formData?.education?.map((edu, i) => (
                    <div key={i} style={{ display: "flex", gap: 10 }}>
                        <input placeholder="Degree" value={edu?.degree} onChange={(e) => handleDynamicChange('education', i, 'degree', e.target.value)} />
                        <input placeholder="College" value={edu?.college} onChange={(e) => handleDynamicChange('education', i, 'college', e.target.value)} />
                        {/* <input placeholder="Start Year" value={edu?.startYear} onChange={(e) => handleDynamicChange('education', i, 'startYear', e.target.value)} /> */}
                        <YearPickerDropdown lable={"Start Year"} className="dropdown-data" value={edu?.startYear} onChange={(e) => handleDynamicChange('education', i, 'startYear', e.target.value)} name={"startYear"} />
                        <YearPickerDropdown lable={"End Year"} className="dropdown-data" value={edu?.endYear}
                            onChange={(e) => handleDynamicChange('education', i, 'endYear', e.target.value)} name={"endYear"} />

                        {/* <input placeholder="End Year" value={edu?.endYear} onChange={(e) => handleDynamicChange('education', i, 'endYear', e.target.value)} /> */}
                        <button type="button" onClick={() => removeField("education", i)} style={{ width: 35 }}>X</button>
                    </div>
                ))}
                <button type="button" onClick={() => addField('education', defaultEducation)}>Add More Education</button>

                <h3>Experience</h3>
                {formData?.experience?.map((exp, i) => (
                    <div key={i} style={{ display: "flex", gap: 10 }}>
                        <input placeholder="Company Name" value={exp?.companyName} onChange={(e) => handleDynamicChange('experience', i, 'companyName', e.target.value)} />
                        <YearPickerDropdown lable={"Start Month & Year"} className="dropdown-data" value={exp?.startMonthYear} onChange={(e) => handleDynamicChange('experience', i, 'startMonthYear', e.target.value)} name={"startMonthYear"} />
                        <YearPickerDropdown lable={"End Month & Year"} className="dropdown-data" value={exp?.endtMonthYear} onChange={(e) => handleDynamicChange('experience', i, 'endMonthYear', e.target.value)} name={"endMonthYear"} />

                        {/* <input placeholder="Start Month & Year" value={exp?.startMonthYear} onChange={(e) => handleDynamicChange('experience', i, 'startMonthYear', e.target.value)} /> */}
                        {/* <input placeholder="End Month & Year" value={exp?.endMonthYear} onChange={(e) => handleDynamicChange('experience', i, 'endMonthYear', e.target.value)} /> */}
                        <button type="button" onClick={() => removeField("experience", i)} style={{ width: 35 }}>X</button>
                    </div>
                ))}
                <button type="button" onClick={() => addField('experience', defaultExperience)}>Add More Experience</button>

                <button type="submit">{userdata?.id ? "Update" : "Submit"} User</button>
            </form>
        </div>
    );
};

export default UserForm;
