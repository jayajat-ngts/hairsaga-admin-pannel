// import httpClient from "../utils/HttpClient";
// import { APiRoutes,httpMethod } from "../configs/endpoint";

// // ✅ Using centralized endpoints
// export const getAllBookings = () =>
//   httpClient({
//     method: httpMethod.Get,
//     url: APiRoutes.Bookings.getAll,
//   });
//   export const updateBookingStatus = async (id, status) => {
//   return await axios.patch(`${BASE_URL}api/booking/updateStatus/${id}`, { status });
// };
import httpClient from "../utils/HttpClient";
import { APiRoutes, httpMethod } from "../configs/endpoint";

// ✅ GET ALL BOOKINGS
export const getAllBookings = () =>
  httpClient({
    method: httpMethod.Get,
    url: APiRoutes.Bookings.getAll,
  });

// ✅ UPDATE BOOKING STATUS
export const updateBookingStatus = (id, status) =>
  httpClient({
    method: httpMethod.Patch,
    url: APiRoutes.Bookings.updateStatus(id),
    data: { status },
  });
