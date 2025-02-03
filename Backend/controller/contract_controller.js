const Contract = require("../models/alldatabase");

const getAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.find();
    res.status(200).json({ success: true, contracts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getContractById = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) {
      return res.status(404).json({ success: false, message: "Contract not found" });
    }
    res.status(200).json({ success: true, contract });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const postNewContract = async (req, res) => {
  try {
    const newContract = await Contract.create(req.body);
    res.status(201).json({ success: true, message: "New contract created", newContract });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const editContract = async (req, res) => {
  try {
    const updatedContract = await Contract.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedContract) {
      return res.status(404).json({ success: false, message: "Contract not found" });
    }
    res.status(200).json({ success: true, message: "Contract updated", updatedContract });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const deleteContract = async (req, res) => {
  try {
    const deletedContract = await Contract.findByIdAndDelete(req.params.id);
    if (!deletedContract) {
      return res.status(404).json({ success: false, message: "Contract not found" });
    }
    res.status(200).json({ success: true, message: "Contract deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const searchContract = async (req, res) => {
  try {
    const query = {};
    if (req.query.client_id) query.client_id = req.query.client_id;
    if (req.query.engineer_id) query.engineer_id = req.query.engineer_id;
    if (req.query.project_id) query.project_id = req.query.project_id;
    if (req.query.title) query.title = new RegExp(req.query.title, "i");
    
    const contracts = await Contract.find(query);
    if (contracts.length === 0) {
      return res.status(404).json({ success: false, message: "No contracts found" });
    }
    res.status(200).json({ success: true, contracts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getAllContracts,
  getContractById,
  postNewContract,
  editContract,
  deleteContract,
  searchContract,