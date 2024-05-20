import bcrypt from "bcrypt";

export const checkPassword = async (enteredPassword: string, storedHash: string) => {
	return await bcrypt.compare(enteredPassword, storedHash);
};
