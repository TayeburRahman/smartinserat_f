import axios from 'axios'
import { config } from '../assets/config/config'

const apiUrl = config.api.url


const getMessages = (page) => {
	return axios.get(`${apiUrl}/message?limit=${config.users.resultsPerPage}&page=${page}`, {})
		.then(response => {
	    return response.data
	  })
}
const deleteMessage = (id) => {
	return axios.delete(`${apiUrl}/message/${id}`, {})
		.then(response => {
	    return response.data
	  })
}
export const messageService = {
    getMessages,
    deleteMessage,
}