import CryptoJS from "crypto-js";

export const encrypt = (data: string) => {
  const ecryptData = CryptoJS.AES.encrypt(
    data,
    process.env.ENC_KEY as string,
  ).toString();

  return ecryptData;
};

export const decrypt = (data: string) => {
  const decryptedData = CryptoJS.AES.decrypt(
    data,
    process.env.ENC_KEY as string,
  );

  return decryptedData;
};
