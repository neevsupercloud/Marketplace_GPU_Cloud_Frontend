import axios, { AxiosError, AxiosRequestConfig } from "axios";
import {useStore } from "./index.ts";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const ENDPOINTS = {
  me: BASE_URL + "/api/v1/me",
  register: BASE_URL + "/api/v1/register",
  listVms: (org: string, p: string) => BASE_URL + `/api/v1/orgs/${org}/projects/${p}/vms`,
  createVm: (org: string, p: string) => BASE_URL + `/api/v1/orgs/${org}/projects/${p}/vms`,
  action: (org: string, p: string, v: string) => BASE_URL + `/api/v1/orgs/${org}/projects/${p}/vms/${v}/action`,
  getVm: (org: string, p: string, v: string) => BASE_URL + `/api/v1/orgs/${org}/projects/${p}/vms/${v}`,
  getProjects: (org: string) => BASE_URL + `/api/v1/orgs/${org}/projects`,
  deleteProject: (org: string, projectId: string) => BASE_URL + `/api/v1/orgs/${org}/projects/${projectId}`,    //deleting the existing project
  createProject: (org: string) => BASE_URL + `/api/v1/orgs/${org}/projects`,
  getSshKeys: (org: string, p: string) => BASE_URL + `/api/v1/orgs/${org}/projects/${p}/keys`,
  addSshKeys: (org: string, p: string) => BASE_URL + `/api/v1/orgs/${org}/projects/${p}/keys`,
  getVolumes: (org: string, p: string) => BASE_URL + `/api/v1/orgs/${org}/projects/${p}/volumes`,
  createVolume: (org: string, p: string) => BASE_URL + `/ap/v1/orgs/${org}/projects/${p}/volumes`,
  deleteVolume: (org: string, p: string, v_name: string) => BASE_URL + `/api/v1/orgs/${org}/projects/${p}/volumes/${v_name}`,
  secrets: (org: string, p: string) => BASE_URL + `/api/v1/orgs/${org}/projects/${p}/secrets`,
  models: (org: string, p: string) => BASE_URL + `/api/v1/orgs/${org}/projects/${p}/endpoints`,
  updateVm: (org: string, p: string) => BASE_URL + `/api/v1/orgs/${org}/projects/${p}/vms`,
};

export function useQuery() {   
  const navigate = useNavigate(); 
  const { setLoading, setError, currProject } = useStore();
  const { auth } = useStore();

  // const headers = {
  //   'Accept': 'application/json',
  //   'Authorization': `Bearer ${auth}`, // Pass the access token in the header
  //   'Content-Type': 'application/json',
  // };
  function _get<T>(url: string, headers: Record<string, string>): Promise<T> {
    return fetch(url, {
      method: 'GET',
      headers: new Headers(headers),
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  }
  
  
  function _delete<T>(url: string, config?: AxiosRequestConfig): Promise<T | void> {
    if (!auth) return Promise.resolve(console.log("NO AUTH FOUND"));
    return Promise.resolve()
      .then(() => setLoading(true))
      .then(() => axios.delete<T>(url, config))
      .then(({ data }) => data as T)
      .catch((err: AxiosError) => {
        console.log(err);
  
        // Type guard to ensure err.response exists and has the expected properties
        const responseMessage = (err.response?.data as { message?: string })?.message;
  
        setError(
          <div>
            <p>{err.name}</p>
            <p>{err.message}</p>
            {responseMessage && <p>{responseMessage}</p>}
          </div>
        );
      })
      .finally(() => setLoading(false));
  }

  function _get_raw<T>(url: string, config?: AxiosRequestConfig<never>): Promise<T | void> {   // without  auth 
    return Promise.resolve()
      .then(() => setLoading(true))
      .then(() => axios.get<T>(url, config))
      .then((resp) => {
        const data = resp.data;
        if (!data || !resp) throw new Error("NO RESPONSE");
        return data as T;
      })
      .catch((err: Error) => {
        console.log(err);
        setError(
          <div>
            <p>{err.name}</p>
            <p>{err.message}</p>
            {err instanceof AxiosError && <p>{err.response?.data.message}</p>}
          </div>
        );
      })
      .finally(() => setLoading(false));
  }

  function _post<T>(url: string, payload: object, config?: AxiosRequestConfig): Promise<T | void> {           //with auth
    if (!auth) return Promise.resolve(console.log("NO AUTH FOUND"));  
    return Promise.resolve()
      .then(() => setLoading(true))
      .then(() => axios.post<T>(url, payload, config))
      .then((response) => {
        const data = response.data;
        // Handle any additional logic here if needed
        return data as T;
      })
      .catch((err: Error) => {
        console.log(err);
        // setError(
        //   <div>
        //     <p>{err.name}</p>
        //     <p>{err.message}</p>
        //     {err instanceof AxiosError && <p>{err.response?.data.message}</p>}
        //   </div>
        // );
      })
      .finally(() => setLoading(false));
  }


  function _post_raw<T>(url: string, payload: object, config?: AxiosRequestConfig): Promise<T | void> {      //without auth 
    return Promise.resolve()
      .then(() => setLoading(true))
      .then(() => axios.post<T>(url, payload, config))
      .then((resp) => {
        const data = resp.data;
        if (!data || !resp) throw new Error("NO RESPONSE");
        return data as T;
      })
      .catch((err: any) => {
        if (url.split('/')[url.split('/').length - 1] === 'register' && (err instanceof AxiosError && err.response?.status === 400)) {
          return false as T;
        }
        // setError(
        //   <div>
        //     <p>{err.name}</p>
        //     <p>{err.message}</p>
        //     {err instanceof AxiosError && <p>{err.response?.data.message}</p>}
        //   </div>
        // );
      })
      .finally(() => setLoading(false));
  }

  function _put<T>(url: string, payload: object, config?: AxiosRequestConfig): Promise<T | void> {
    
    
    if (!auth) {
      console.log("NO AUTH FOUND");
      return Promise.resolve();
    }
    
    return Promise.resolve()
      .then(() => setLoading(true))
      .then(() => axios.put<T>(url, payload, config))
      .then(({ data }) => {
        // Successful response handling
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'VM rescaled successfully.'
        }).then(() => {
          navigate('/gpu-compute/gpu-dashboard');
        });
        return data as T;
      })
      .catch((err: Error) => {
        console.log(err);
        if (err instanceof AxiosError) {
          const errorMessage = err.response?.data?.message;
          
          // Show specific error message if VM is not stopped
          if (err.response?.data?.error === "vm not stopped") {
            Swal.fire({
              icon: 'info',
              title: 'Oops..',
              text: 'Stop the VM to modify resources.'
            }).then(() => {
              navigate('/gpu-compute/gpu-dashboard');
            });
          } else {
            // Show generic error message
            Swal.fire({
              icon: 'info',
              title: 'Oops',
              text: errorMessage || 'Your Vm is not yet started.'
            }).then(() => {
              navigate('/gpu-compute/gpu-dashboard');
            });
          }
          
          // setError(
          //   <div>
          //     <p>{err.name}</p>
          //     <p>{err.message}</p>
          //     {errorMessage && <p>{errorMessage}</p>}
          //   </div>
          // );
        } else {
          // Handle non-Axios errors
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An unexpected error occurred.'
          });
        }
      })
      .finally(() => setLoading(false));
  }
  
  return {
    _get,
    _post,
    _get_raw,
    _post_raw,
    _put,
    _delete,
    project_slug: currProject?.slug
  };
}