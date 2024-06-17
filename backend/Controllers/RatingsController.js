const ProdRatings = require('../schema/prodRatingsSchema');


// Read all
const readAllRatings = async (req, res) => {
    try {
      const merciItems = await ProdRatings.find();
      res.status(200).json(merciItems);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Read by SPU ID
  const readBySpuIdRatings = async (req, res) => {
    const { spu_id } = req.params;
    try {
      const merciItem = await ProdRatings.find({ merci_spu_id: spu_id });
      if (merciItem) {
        res.status(200).json(merciItem);
      } else {
        res.status(200).json([]);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Read by User
  const readByUserRatings = async (req, res) => {
    const { user_id } = req.params;
    try {
      const merciItems = await ProdRatings.find({ merci_user: user_id });
      res.status(200).json(merciItems);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Create
  const createRatings = async (req, res) => {
    const merciData = req.body;
    try {
      const newMerci = new ProdRatings(merciData);
      await newMerci.save();
      res.status(201).json(newMerci);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete
  const deleteRatings = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedMerci = await ProdRatings.findByIdAndDelete(id);
      if (deletedMerci) {
        res.status(200).json({ message: 'Item deleted successfully' });
      } else {
        res.status(404).json({ message: 'Item not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  module.exports = {
    createRatings,
    readAllRatings,
    readByUserRatings,
    readBySpuIdRatings,
    deleteRatings
}