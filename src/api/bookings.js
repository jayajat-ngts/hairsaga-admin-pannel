import httpClient from "../utils/HttpClient";
import { APiRoutes,httpMethod } from "../configs/endpoint";

// ✅ Using centralized endpoints
export const getAllBookings = () =>
  httpClient({
    method: httpMethod.Get,
    url: APiRoutes.Bookings.getAll,
  });
