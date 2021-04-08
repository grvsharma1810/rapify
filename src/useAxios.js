import axios from "axios";
import { useState } from "react";
import { useToast } from "./shared-components/Toast/toast-context"

const getMainURL = (url) => url.split("/")[2];

export const useAxios = (url, showToast = true) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccessToast, showErrorToast } = useToast();

  async function commonRequest(apiCall, successMessage) {
    try {
      setIsLoading(true);
      const data = await apiCall();
      return data;
    } catch (err) {
      setIsLoading(false);
      if (showToast) {
        showErrorToast({ title: "Error", description: "Reqest Falied! Server Error" });
      }
    } finally {
      setIsLoading(false);
      if (successMessage && showToast) {
        showSuccessToast(successMessage);
      }
    }
  }

  async function getData(item) {
    if(item){
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
    }, { title: "SUCCESS", description: "Action Saved Successfully" });
  }

  async function patchData(item) {
    return commonRequest(async () => {
      const response = await axios.patch(`${url}/${item.id}`, item);
      if (response.status === 200) {
        return "success";
      }
    }, { title: "PATCHED", description: "Action Saved Successfully" });
  }

  async function deleteData(item) {
    return commonRequest(async () => {
      const response = await axios.delete(`${url}/${item.id}`);
      if (response.status === 204) {
        return "success";
      }
    }, { title: "DELETED", description: "Action Saved Successfully" });
  }

  return { isLoading, getData, postData, deleteData, patchData };
};