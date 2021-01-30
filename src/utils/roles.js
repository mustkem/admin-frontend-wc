/*
These permissions are action, view centric.
Priority action>view
canDo
showXyz
*/

const permissions = {
  normal_user: ["canAddOrder", "processOrder", "viewOrderUser", "showUserOrderDashboard"],
  transporter_user: ["manageCoverage", "viewOrderTransporter", "showTransporterOrderDashboard"],
};

export default permissions;
