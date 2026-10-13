import Service from "../models/Service.js";
import mongoose from "mongoose";


export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      services,
    });
  } catch (error) {
    console.error("GET SERVICES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch services",
    });
  }
};


export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID",
      });
    }

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    console.error("GET SERVICE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch service",
    });
  }
};


export const createService = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      deliveryTime,
      status,
    } = req.body;

    // Validation
    if (
      !name ||
      !description ||
      price === undefined ||
      price === "" ||
      !deliveryTime
    ) {
      return res.status(400).json({
        success: false,
        message: "All service fields are required",
      });
    }

    if (Number(price) < 0) {
      return res.status(400).json({
        success: false,
        message: "Price cannot be negative",
      });
    }

    // Check duplicate service
    const existingService = await Service.findOne({
      name: name.trim(),
    });

    if (existingService) {
      return res.status(400).json({
        success: false,
        message: "A service with this name already exists",
      });
    }

    const service = await Service.create({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      deliveryTime: deliveryTime.trim(),
      status: status === "inactive" ? "inactive" : "active",
    });

    return res.status(201).json({
      success: true,
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    console.error("CREATE SERVICE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create service",
      error: error.message,
    });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID",
      });
    }

    const {
      name,
      description,
      price,
      deliveryTime,
      status,
    } = req.body;

    if (
      !name ||
      !description ||
      price === undefined ||
      price === "" ||
      !deliveryTime
    ) {
      return res.status(400).json({
        success: false,
        message: "All service fields are required",
      });
    }

    if (Number(price) < 0) {
      return res.status(400).json({
        success: false,
        message: "Price cannot be negative",
      });
    }

    // Check duplicate name excluding current service
    const duplicate = await Service.findOne({
      name: name.trim(),
      _id: { $ne: id },
    });

    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: "Another service with this name already exists",
      });
    }

    const service = await Service.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        deliveryTime: deliveryTime.trim(),
        status: status === "inactive" ? "inactive" : "active",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    console.error("UPDATE SERVICE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update service",
      error: error.message,
    });
  }
};


export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID",
      });
    }

    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("DELETE SERVICE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete service",
      error: error.message,
    });
  }
};