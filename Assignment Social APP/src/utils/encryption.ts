import CryptoJS from "crypto-js";

export const encryptPhone = (phone:any) =>
  CryptoJS.AES.encrypt(phone, process.env.CRYPTO_SECRET as string).toString();

export const decryptPhone = (encryptedPhone:any) => {
  const bytes = CryptoJS.AES.decrypt(encryptedPhone, process.env.CRYPTO_SECRET as string);
  return bytes.toString(CryptoJS.enc.Utf8);
};
