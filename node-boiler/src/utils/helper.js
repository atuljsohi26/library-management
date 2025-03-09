import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import https from 'https';

dotenv.config();

/** Parse Query Response */
export const parseQueryResponse = async (res) => {
  let result = [];
  try {
    result = JSON.parse(JSON.stringify(res));
  } catch (e) {
    result = [];
  }
  return result;
};

/** Generate JWT Token */
export const generateJwtToken = (data, expiresIn) => {
  const token = jwt.sign(data, process.env.JWT_PUBLIC_KEY, {
    expiresIn: expiresIn,
  });

  return token;
};

/** check is password is correct or not */
export const checkPassword = (password, hashPassword) => {
  const same = bcrypt.compareSync(password, hashPassword);
  return same;
};

/** Replace Email Template Data */
export const replaceEmailTemplateData = async (template, data) => {
  const pattern = /\{(.*?)\}/g;
  return template.replace(pattern, (match, token) => data[token]);
};

/** Get File As String */
export const getFileAsString = (fileUrl) => {
  return new Promise((resolve, reject) => {
    https.get(fileUrl, (response) => {
      let data = '';

      // Collect data chunks
      response.on('data', (chunk) => {
        data += chunk;
      });

      // Once the response is complete
      response.on('end', () => {
        if (response.statusCode === 200) {
          resolve(data); // Resolve the full content of the file
        } else {
          reject(`Failed to fetch file. Status Code: ${response.statusCode}`);
        }
      });
    }).on('error', (err) => {
      reject(`Error: ${err.message}`);
    });
  });
};

/** Encrypt String */
export const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

/** Get Pagination */
export const getPagination = (page, record_per_page) => {
  console.log("page **", page);
  console.log("record_per_page **", record_per_page);
  const limit = record_per_page ? +record_per_page : 10;
  const offset = page ? (page - 1) * limit : 0;
  console.log("limitGetPagi", limit);
  console.log("offSetGetPagi", offset);
  return { limit, offset };
};

/** Get Paging Data */
export const getPagingData = (data, page, limit) => {
  const results = data.rows != undefined ? data.rows : data;
  const { count: totalItems, isFromFiltered: fromFilter } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { fromFilter, totalItems, results, totalPages, currentPage };
};

/** check is password is strong or not */
export const checkPasswordStrength = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return regex.test(password);
};
/** Check String is valid email address or not */
export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
