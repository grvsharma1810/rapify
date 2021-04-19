import axios from "axios";

const domainUrl = "https://rapify.gauravkumarkum4.repl.co";

export const useAxios = () => {

  async function getData(url) {
    console.log("get");
    try {
      const response = await axios.get(`${domainUrl}${url}`);
      return response.data.data;
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 404: alert(`Error 404! ${error.response.message}`);
            return null;
          case 500: alert(`Internal Server Error! ${error.response.message}`);
            return null;
          default: return error.response;
        }
      } else if (error.request) {
        alert("Please Check Your Internet Connection");
        return null;
      } else {
        alert("Something went wrong");
      }
    }
  }

  async function postData(url, item) {
    console.log("post");
    try {
      const response = await axios.post(`${domainUrl}${url}`, item);
      return response.data.data;
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 404: alert(`Error 404! ${error.response.message}`);
            return null;
          case 500: alert(`Internal Server Error! ${error.response.message}`);
            return null;
          default: return error.response;
        }
      } else if (error.request) {
        alert("Please Check Your Internet Connection");
        return null;
      } else {
        alert("Something went wrong");
      }
    }
  }

  async function deleteData(url) {
    console.log("delete");
    try {
      const response = await axios.delete(`${domainUrl}${url}`);
      return response.data.data;
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 404: alert(`Error 404! ${error.response.message}`);
            return null;
          case 500: alert(`Internal Server Error! ${error.response.message}`);
            return null;
          default: return error.response;
        }
      } else if (error.request) {
        alert("Please Check Your Internet Connection");
        return null;
      } else {
        alert("Something went wrong");
      }
    }
  }


  // async function commonRequest(apiCall) {
  //   try {
  //     const response = await apiCall();
  //     return response.data;
  //   } catch (err) {
  //     alert("Reqest Falied! Can't Connect To Server");
  //   } finally {

  //   }
  // }

  // async function getData(url) {
  //   console.log("get");
  //   return commonRequest(async () => {
  //     const response = await axios.get(`${domainUrl}${url}`);
  //     console.log({ response });
  //     switch (response.status) {
  //       case 200: return response.data;
  //       case 404: alert(`Error 404! ${response?.message}`);
  //         return {};
  //       case 500: alert(response.message);
  //         return {};
  //     }
  //   });
  // }

  // async function postData(url, item) {
  //   return commonRequest(async () => {
  //     const response = await axios.post(`${domainUrl}${url}`, item);
  //     console.log({ response });
  //     switch (response.status) {
  //       case 200: return response.data;
  //       case 201: return response.data;
  //       case 404: alert(`Error 404! ${response?.message}`);
  //         return {};
  //       case 500: alert(response.message);
  //         return {};
  //     }
  //   });
  // }

  // async function deleteData(url) {
  //   return commonRequest(async () => {
  //     const response = await axios.delete(`${domainUrl}${url}`);
  //     console.log({ response });
  //     switch (response.status) {
  //       case 204: return response.data;
  //       case 404: alert(`Error 404! ${response?.message}`);
  //         return {};
  //       case 500: alert(response.message);
  //         return {};
  //     }
  //   });
  // }

  return { getData, postData, deleteData };
};