import * as UserModel from "./userModel.js";

export const addUser = async (userData) => {
  try {
    const result = await UserModel.createUser(userData);
    return { message: "User created successfully", userId: result.insertedId };
  } catch (error) {
    throw new Error("Service error: " + error.message);
  }
};
