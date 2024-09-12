import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { TOKEN_KEY, REFRESH_TOKEN_KEY, useAuth, API_URL } from "../context/AuthContext";

const baseURL = API_URL;

const useAxios = () => {
  const { authState } = useAuth();

  let isRefreshing = false;
  let refreshSubscribers: any = [];

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authState?.accessToken}` },
  });

  const onRefresh = (accessToken: string) => {
    refreshSubscribers.map((callback: any) => callback(accessToken));
  };

  const addRefreshSubscriber = (callback: any) => {
    refreshSubscribers.push(callback);
  };

  const refreshAccessToken = async () => {
    try {
      if (authState) {
        let refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY); // Await here
        console.log(refreshToken)
        const response = await axios.post(
          `${baseURL}/auth/refresh_token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`, // Correct headers placement
            },
          }
        );
        await SecureStore.setItemAsync(
          TOKEN_KEY,
          response.data.accessToken
        );
        await SecureStore.setItemAsync(
          REFRESH_TOKEN_KEY,
          response.data.refreshToken
        );
        console.log(response.data)
        authState.refreshToken = response.data.refreshToken;
        authState.accessToken = response.data.accessToken;
        onRefresh(response.data.accessToken);

        return response.data.accessToken;
      } else {
        throw new Error("No auth state");
      }
    } catch (error) {
      console.error("Error refreshing accessToken:", error);
      throw error;
    }
  };

  axiosInstance.interceptors.request.use(
    (config) => config,
    async (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { config, response: { status } = {} } = error;
      const originalRequest = config;
      if (authState && status === 401) {
        if (!originalRequest._retry) {
          if (!isRefreshing) {
            isRefreshing = true;
            originalRequest._retry = true;

            try {

              const newToken = await refreshAccessToken();
              axiosInstance.defaults.headers.Authorization = `Bearer ${newToken}`;
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              
              // Resolve all pending requests with the new accessToken
              refreshSubscribers.forEach((callback: any) => callback(newToken));
              refreshSubscribers = [];
              return axiosInstance(originalRequest);
            } catch (e) {
              console.error(e);
              return Promise.reject(e);
            } finally {
              isRefreshing = false;
            }
          }

          return new Promise((resolve, reject) => {
            addRefreshSubscriber((refreshToken: string) => {
              console.log(refreshToken)
              originalRequest.headers.Authorization = `Bearer ${refreshToken}`;
              resolve(axiosInstance(originalRequest));
            });
          });
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;


