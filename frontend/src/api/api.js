import axios from "axios";


const api = axios.create({

  baseURL: "http://localhost:5000/api",

  withCredentials: true,

});



// REQUEST INTERCEPTOR

api.interceptors.request.use(

  (config) => {


    window.dispatchEvent(
      new Event("api-request-start")
    );


    const token =
      localStorage.getItem("token");


    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }


    return config;


  },


  (error) => {


    window.dispatchEvent(
      new Event("api-request-end")
    );


    return Promise.reject(error);

  }

);






// RESPONSE INTERCEPTOR

api.interceptors.response.use(

  (response) => {

    window.dispatchEvent(
      new Event("api-request-end")
    );

    return response;

  },

  async (error) => {

    window.dispatchEvent(
      new Event("api-request-end")
    );

    const originalRequest = error.config;

    // Access token expired
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;

      try {

        const response = await axios.post(

          "http://localhost:5000/api/auth/refresh",

          {},

          {
            withCredentials: true,
          }

        );

        const newAccessToken =
          response.data.accessToken;

        // Save new access token
        localStorage.setItem(
          "token",
          newAccessToken
        );

        // Update Authorization header
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        // Retry original request
        return api(originalRequest);

      }

      catch (refreshError) {

        // Refresh token expired or invalid

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        // Redirect to login page
        window.location.href = "/";

        return Promise.reject(refreshError);

      }

    }

    return Promise.reject(error);

  }

);



export default api;