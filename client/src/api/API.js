import axios from 'axios'

const serverURL = 'http://localhost:8080'

const API = {
    getFood: function() {
        return axios.get(`${serverURL}/foodRoute`);
    },

    getDate: async (month, day, year) => {
        try {
            const response = await axios.get(`${serverURL}/dateRoute`, {
            params: { month, day, year },
            });
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching date: ${error.message}`);
        }
   },

    removeFood: function(dateId, foodItemId) {
        return axios.delete(`${serverURL}/dateRoute/${dateId}/${foodItemId}`);
    },      

    changeFood: function(payload, id){
        return axios.put(`${serverURL}/foodRoute/${id}`, payload)
    },

    postFood: async (month, day, year, newFoodItem) => {
   
        try {
          const response = await axios.post(
            `${serverURL}/dateRoute/${month}/${day}/${year}`,
            newFoodItem
          );
          return newFoodItem;
        } catch (error) {
          throw new Error(`Error adding food item: ${error.message}`);
        }
    },

    createUser: function(payload) {
        return axios.post(`${serverURL}/api/register`, payload);
    },
    
    loginUser: function(payload) {
        return axios.post(`${serverURL}/api/login`, payload);
    }
}

export default API;