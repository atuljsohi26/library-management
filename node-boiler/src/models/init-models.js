import _users from "./users.js";
import _mst_email_template from "./mst_email_template.js";

export default (sequelize, DataTypes) => {
  const users = _users(sequelize, DataTypes);
  const mst_email_template = _mst_email_template(sequelize, DataTypes);
  
  return {
    users,
    mst_email_template,
    // mst_states,
    // mst_sizes,
    // products,
    // product_images,
    // carts,
    // user_address,
    // orders,
    // order_products,
    // order_delivery_information,
    // stores,
  };
};
