import bcrypt from "bcrypt";

export const hashPassword = async (data: string) => {
  const hashed = await bcrypt.hash(data, 10);
  return hashed;
};

export const comparePassword = async (data: string, hashed: string) => {
  return await bcrypt.compare(data, hashed);
};
