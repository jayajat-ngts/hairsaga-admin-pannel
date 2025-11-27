 export const httpMethod = {
  Get: "GET",
  Post: "POST",
  Delete: "DELETE",
  Patch: "PATCH",
  Put: "PUT"
};


export const APiRoutes = {
  Bookings: {
    getAll: '/api/booking/get-all-booking',
    getById: (id) => `/api/bookings/${id}`,
    create: '/api/bookings',
    delete: (id) => `/api/bookings/${id}`,
    update: (id) => `/api/bookings/${id}`,
   updateStatus: (id) => `/api/booking/updateStatus/${id}`,  // ✅ ADD THIS
    assignStaff: (id) => `/api/booking/assign-staff/${id}`,
  },
  Services: {
    getAll: '/api/services',
    getById: (id) => `/api/services/${id}`,
    create: '/api/services/create',   // ✅ FIXED
    delete: (id) => `/api/services/${id}`,
    update: (id) => `/api/services/${id}`,
  },
  Login:{
    devLogin: '/api/user/login',
  },  
  Staff: {
    create: "/api/staff/create",
    getAll: "/api/staff",
    updateStatus: (id) => `/api/staff/update-status/${id}`, // ✔ Correct
  },
  inquiry:{
    getAll: '/api/contact',
  }

};

