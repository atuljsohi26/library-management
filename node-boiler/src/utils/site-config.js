const Codes = {
  INFORMATION: 230,
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  MOVED_PERMANENTLY: 301,
  FOUND: 301,
  NOT_MODIFIED: 304,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  ALREADY_EXIST: 409,
  REFRESH_TOKEN_EXPIRED: 419,
  TOO_MANY_REQUESTS: 429,
};

const CONSTANTS = {
  // Email Templates
  SIGNUP_PIN_GENERATE_TEMPLATE: 1,
  SIGNUP_TEMPLATE: 2,
  BUYER_ORDER_TEMPLATE: 3,
  SELLER_ORDER_TEMPLATE: 4,

  ACTIVE: 1,
  INACTIVE: 0,

  SERVER_RUNNING: 'Server is running on Port',
  PIN_GENERATE_EMAIL_SEND: 'Your OTP has been successfully generated and sent to your registered email address.',
  REQUIRED_FIELDS_ARE_MISSING: 'Required fields are missing or incorrect.',
  INVALID_EMAIL_PASSWORD: 'Invalid email id or password.',
  SOMETHING_WENT_WRONG: 'Something Went Wrong. Please try later.',
  LOGIN_SUCCESS: 'Welcome User!',
  USER_NOT_EXIST: 'No account found with this email.',
  USERNAME_NOT_EXIST: 'No account found with this username.',
  TOKEN_UPDATED_SUCCESSFULLY: 'Token updated successfully.',
  PASSWORD_UPDATED_SUCCESSFULLY: 'Password updated successfully.',
  PASSWORD_NOT_UPDATED: 'Password could not be updated. Please try again.',
  INVALID_FORGOT_TOKEN: 'The link has expired or has been used before.',
  RESET_PASSWORD_MSG:
    'An email has been sent to the registered email to reset your password. Please check email.',
  IMEI_ALREADY_EXIST:
    'This IMEI number is already associated with another device. Please enter a different IMEI number.',
  USER_ALREADY_ASSOCIATED_WITH_IMEI:
    'This IMEI is already associated with another user. Please use a different IMEI number.',
  NO_TOKEN: 'No token provided',
  INVALID_TOKEN: 'Invalid token',
  SESSION_EXPIRED: 'Your session is expired.',
  RECORD_SUCCESS: 'Record found successfully.',
  RECORD_NOT_FOUND: 'No records found.',
  LOGIN_ATTEMPTS_REACHED:
    'You have reached your limit for login attempts today.',
  WEAK_PASSWORD:
    'Your password at least 6 characters long and must contain at least one digit, one special character, one lowercase and one uppercase character',
  VALID_TOKEN: 'Token is valid.',
  ORDER_NUMBER_ALREADY_EXIST:
    'This Order Number is already associated with another device. Please enter a different Order Number.',
  NO_SAME_PASSWORD:
    'Your new password cannot be the same as your previous password.',
  USER_NOT_ALLOWED_LOGIN_AS_SELLER: 'You are not allowed to login as seller.',
  //---------------------------------//
  LOGIN_PIN_GENERATE_TEMPLATE: 1,
  THIS_EMAIL: 'Email is available.',
  THIS_USERNAME: 'Username is available.',
  UNIQUE_EMAIL: 'That email address already exists. Try another.',
  UNIQUE_USERNAME: 'That username already exists. Try another.',
  PIN_GENERATE_TOKEN_SEND: 'Your OTP has been successfully sent.',
  EMAIL_OTP_NOT_MATCH: 'Email OTP does not match. Please try again.',
  EMAIL_OTP_MATCH_SUCCESS: 'OTP matched successfully.',
  PASSWORD_SET_SUCCESS: 'Your password has been set successfully.',
  ONBOARDING_COMPLETED_SUCCESS: 'Thank you for completing the onboarding process! You can now explore all features.',
  VALID_EMAIL: 'Please enter valid email address.',
  CART_ADDED_SUCCESS: 'Product has been added successfully.',
  RECORD_DELETE: 'Product deleted successfully.',
  ALREADY_PRODUCT_ADDED_CART: 'The product is already added to the cart.',
  OTHER_SELLER_PRODUCT_ADD_CART: 'You are adding a product from another seller in the cart. If you want to proceed, the previous cart items will be removed.',
  USER_ADDRESS_ADDED_SUCCESS: 'Address has been added successfully.',
  USER_ADDRESS_UPDATED_SUCCESS: 'Address updated successfully.',
  PRODUCT_ADDED_SUCCESS: 'Product has been added successfully.',
  PRODUCT_UPDATED_SUCCESS: 'Product updated successfully.',
  DELETE_PRODUCT_SUCCESS: 'Product has been successfully deleted.',
  DELETE_ACCOUNT_SUCCESS: 'Account has been successfully deleted.',
  USER_PROFILE_UPDATED_SUCCESS: 'Profile updated successfully.',
  CUSTOMER_ADDED_SUCCESS: 'Customer has been added successfully.',
  CARD_ADDED_SUCCESS: 'Card has been added successfully.',
  PRODUCT_ALREADY_SOLDED:'This product is already sold.',
  KEY_CREATE_SUCCESS: 'Key generated successfully.',
  ORDER_PAYMENT_INTENT_SUCCESS:'Payment intent for the order has been successfully created.',
  ORDER_SUCCESS: 'Congratulations! Your order has been successfully placed.',
  TRANSACTION_LIST: 'Transaction list found.',
  USER_BECOME_SELLER_SUCCESS: 'Your profile has been successfully updated to a seller account.',
  PRODUCT_ALREADY_DELETED:'This product has already been deleted by the seller.',
  ORDER_PAYMENT_RECORD_NOT_FOUND: 'This product is no longer available. Please select another product.',
  PRODUCT_NOT_AVAILABLE: 'Product are not available.',

};

export { Codes, CONSTANTS };
