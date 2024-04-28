import db from "../../connection.js";

const userCollection = db.collection("users");

export const createUser = async (userData) => {
  try {
    const newUser = {
      _id: userData.firebaseUserId, // Use Firebase ID as MongoDB document ID
      ...userData,
    };

    const result = await userCollection.insertOne(newUser);
    return result;
  } catch (error) {
    throw new Error("Error creating a new user: " + error.message);
  }
};
