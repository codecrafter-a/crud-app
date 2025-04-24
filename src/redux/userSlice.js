import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const initialState = {
    userList: [
        {
            id: uuidv4(), 
            firstName: "PM",
            lastName: "Mishra",
            email: "92@gmail.com",
            phone: "918273774",
            dob: "",
            address: "",
            education: [
                {
                    degree: "Bachelors",
                    college: "XYZ University",
                    startYear: "2015",
                    endYear: "2019"
                },
            ],
            experience: [
                {
                    companyName: "ABC Corp",
                    startMonthYear: "2020-01",
                    endMonthYear: "2022-12",
                    role: "Software Engineer"
                },
            ]
        },
    ]

}


const userSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {
        addUser: (state, action) => {
            state.userList.push({id:uuidv4(),...action.payload});
        },
        updateUser: (state, action) => {

            const index = state.userList.findIndex(user => user.id == action.payload.id);
            if (index !== -1) state.userList[index] = action.payload;
        }
        , deleteUser: (state, action) => {
            state.userList = state.userList.filter(user => user.id != action.payload)
        }
    }

})

export const { addUser, updateUser, deleteUser } = userSlice.actions

export default userSlice.reducer;
