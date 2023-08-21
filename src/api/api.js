import axios from "axios";

const API_KEY = "sgA61buvsGsNFITGF_cg2jR_U7j50LiKAhwe54GJnte-YrEfrA";
const API_BASE_URL = "/api/v1/task";

const headers = {
  Authorization: `Bearer ${API_KEY}`,
};

export const fetchTodos = () =>
  axios
    .get(API_BASE_URL, { headers })
    .then((response) => response.data.items)
    .catch(() => {
      throw new Error("Could not fetch the data");
    });

export const addTodo = (todo) =>
  axios
    .post(API_BASE_URL, [todo], { headers })
    .then((response) => response.data.items[0])
    .catch(() => {
      throw new Error("Could not add the item");
    });

export const removeTodo = (id) =>
  axios.delete(`${API_BASE_URL}/${id}`, { headers }).catch(() => {
    throw new Error("Could not remove the item");
  });

export const updateTodoStatus = (id, completed) =>
  axios
    .put(`${API_BASE_URL}/${id}`, { completed }, { headers })
    .then((response) => response.data)
    .catch(() => {
      throw new Error("Could not update the status");
    });
