const express = require("express");
const router = express.Router();
const AuthRoutes = require("../modules/auth/auth.routes");
const UserRoutes = require("../modules/user/user.routes");
const UserListRoutes = require("../modules/user-list/user-list.routes");
const AdminRoutes = require("../modules/admin/admin.routes");  
const DashboardRoutes = require("../modules/dashboard/dashboard.routes");
const PaymentRoutes = require("../modules/payment/payment.routes");  
const PackageRoutes = require("../modules/packages/packages.routes");  
const ManageWebRoutes = require("../modules/manage-web/manage.routes");  
const MessageRoutes = require("../modules/message/message.routes");  
// Define routes--------------------

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/userList",
    route: UserListRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,  
  },  
  {
    path: "/dashboard",
    route: DashboardRoutes,
  }, 
  {
    path: "/payment",
    route: PaymentRoutes,
  },
  {
    path: "/package",
    route: PackageRoutes,
  },
  {
    path: "/manage-web",
    route: ManageWebRoutes,
  },
  {
    path: "/message",
    route: MessageRoutes,
  },
];

// Apply routes to the router
moduleRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
