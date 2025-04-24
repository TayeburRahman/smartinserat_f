import axios from 'axios'
import { config } from '../assets/config/config'

const apiUrl = config.api.url

const getUsers = (page) => {
	return axios.get(`${apiUrl}/admin/users?limit=${config.users.resultsPerPage}&page=${page}`, {})
		.then(response => {
	    return response.data
	  })
}

const createUser = (username, lastname, email, password, role, confirmPassword) => {
	return axios.post(`${apiUrl}/auth/register`, {
    name: username,
    lastname: lastname,
    email: email,
    password: password,
    role: role,
    confirmPassword
  })
}

const updateUserPassword = (oldPassword, newPassword, confirmPassword, email) => {
	return axios.patch(`${apiUrl}/auth/change-password`, {
    oldPassword,
    newPassword,
    confirmPassword,
    email
  })
}

const updateUserDetails = (data) => {

  console.log("data", data)
	return axios.patch(`${apiUrl}/user/edit-profile`,
    data
  )
}


const deleteUser = (userId) => {
	return axios.delete(`${apiUrl}/admin/users/${userId}`, {})
}
const deleteUserList = (uniqId) => {
	return axios.delete(`${apiUrl}/userList/deleteList/${uniqId}`, {})
}

export const userService = {
  getUsers,
  createUser,
  updateUserPassword,
  updateUserDetails,
  deleteUser,
  deleteUserList,
}