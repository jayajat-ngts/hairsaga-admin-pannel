 export const httpMethod = {
  Get: "GET",
  Post: "POST",
  Delete: "DELETE",
  Patch: "PATCH",
  Put: "PUT"
};


export const APiRoutes = {
  Bookings: {
    getAll: '/api/bookings',
    getById: (id) => `/api/bookings/${id}`,
    create: '/api/bookings',
    delete: (id) => `/api/bookings/${id}`,
    update: (id) => `/api/bookings/${id}`,
  },
  Services: {
    getAll: '/api/services',
    getById: (id) => `/api/services/${id}`,
    create: '/api/services',
    delete: (id) => `/api/services/${id}`,
    update: (id) => `/api/services/${id}`,
  },
  Login:{
    devLogin: '/api/login',
  }

};

