// import { APiRoutes, httpMethod } from "../configs/endpoint";
// import httpClient from "../utils/HttpClient";

// // ✅ Takes email & password, sends POST request
// export const devLogin = (email, password) => {
//   return httpClient({
//     method: httpMethod.Post,
//     url: APiRoutes.Login.devLogin,
//     data: {
//       email,
//       password
//     }
//   });
// };


// src/api/auth.js
import httpClient from "../utils/HttpClient";

export const devLogin = async (email, password, role) => {
  const res = await httpClient.post("/api/user/login", { email, password, role });
  return res;
};


