import httpClient from "../utils/HttpClient";
import { APiRoutes, httpMethod } from "../configs/endpoint";

export const getAllBookings = () =>
  httpClient({
    method: httpMethod.Get,
    url: APiRoutes.Bookings.getAll,
  });

export const getAllStaff = () =>
  httpClient({
    method: httpMethod.Get,
    url: APiRoutes.Staff.getAll,
  });

export const getAllServices = () =>
  httpClient({
    method: httpMethod.Get,
    url: APiRoutes.Services.getAll,
  });

export const getAllUsers = () =>
  httpClient({
    method: httpMethod.Get,
    url: APiRoutes.Users.getAll,
  });
