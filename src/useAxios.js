import axios from "axios";

const getMainURL = (url) => url.split("/")[2];

export const useAxios = (url) => {

  async function commonRequest(apiCall) {
    try {
      const data = await apiCall();
      return data;
    } catch (err) {
      alert("Reqest Falied! Server Error");
    } finally {

    }
  }

  async function getData(item) {
    if (item) {
      return commonRequest(async () => {
        const response = await axios.get(`${url}/${item.id}`);
        return response.data[`${getMainURL(url)}Item`];
      });
    }
    return commonRequest(async () => {
      const response = await axios.get(url);
      return response.data[`${getMainURL(url)}Items`];
    });
  }

  async function postData(item) {
    return commonRequest(async () => {
      const response = await axios.post(url, item);
      return response.data[`${getMainURL(url)}Item`];
    });
  }

  async function patchData(item) {
    return commonRequest(async () => {
      const response = await axios.patch(`${url}/${item.id}`, item);
      if (response.status === 200) {
        return "success";
      }
    });
  }

  async function deleteData(item) {
    return commonRequest(async () => {
      const response = await axios.delete(`${url}/${item.id}`);
      if (response.status === 204) {
        return "success";
      }
    });
  }

  return { getData, postData, deleteData, patchData };
};