import axios from 'axios'
import { config } from '../assets/config/config'

const apiUrl = config.api.url


const getPackages = (page) => {
	return axios.get(`${apiUrl}/admin/packages?limit=${config.users.resultsPerPage}&page=${page}`, {})
		.then(response => {
	    return response.data
	  })
}
const deletePackage = (id) => {
	return axios.delete(`${apiUrl}/admin/packages/${id}`, {})
		.then(response => {
	    return response.data
	  })
}
const createPackage = (data) => {
	return axios.post(`${apiUrl}/admin/packages`, data)
		.then(response => {
	    return response.data
	  })
}
const updatePackage = (id, data) => {
	return axios.patch(`${apiUrl}/admin/packages/${id}`, data)
		.then(response => {
	    return response.data
	  })
}

export const packageService = {
    getPackages,
    deletePackage,
    updatePackage,
	createPackage
}