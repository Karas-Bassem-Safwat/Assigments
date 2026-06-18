import CryptoJS from "crypto-js";

export const encryptPhone = (phone) =>
  CryptoJS.AES.encrypt(phone, process.env.CRYPTO_SECRET).toString();

export const decryptPhone = (encryptedPhone) => {
  const bytes = CryptoJS.AES.decrypt(encryptedPhone, process.env.CRYPTO_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
};
