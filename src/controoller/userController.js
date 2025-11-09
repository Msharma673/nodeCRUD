// Standarised response function
import { createUserService, getAllUsersService, getUserByIdService, updateUserService, deleteUserService } from "../models/userModel.js";
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    success: true,
    message: message,
    data: data,
  });
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await createUserService(name, email);
    handleResponse(res, 201, "User created successfully", user);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    handleResponse(res, 200, "Users fetched successfully", users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await getUserByIdService(req.params.id);
    if (!user) {
      return handleResponse(res, 404, "User not found");
    }
    return handleResponse(res, 200, "User fetched successfully", user);
  } catch (error) {
    next(error);
  }
}; 

export const updateUser = async (req, res, next) => {
    const {name, email} = req.body;
  try {
    const user = await updateUserService(req.params.id, name, email);
    if (!user) {
      return handleResponse(res, 404, "User not found");
    }   
    return handleResponse(res, 200, "User updated successfully", user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await deleteUserService(req.params.id);
    if (!user) {
      return handleResponse(res, 404, "User not found");
    }
    return handleResponse(res, 200, "User deleted successfully");
  } catch (error) {
    next(error);
  }
};
