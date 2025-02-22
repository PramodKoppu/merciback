const setCommision = (userId,merciTree, total) => {

    const commissionRates = {
        level1: 0,     // To be calculated based on remaining amount
        level2: merciTree.Level2 ? parseFloat((total * 0.005).toFixed(2)) : 0,  // 0.5%
        level3: merciTree.Level3 ? parseFloat((total * 0.01).toFixed(2)) : 0,    // 1%
        level4: merciTree.Level4 ? parseFloat((total * 0.03).toFixed(2)) : 0,     // 3%
      };
  
      let level1Commission = total - (commissionRates.level2 + commissionRates.level3 + commissionRates.level4);
      
      // Initialize finalCommissionData object
      const finalCommissionData = {
        userId,
        paymentType: 'greenmoney',
        level1: merciTree.Level1,   // To be determined based on merci_level and merci_tree
        commissionL1: level1Commission,
        level2: merciTree.Level2,   // To be determined based on merci_tree
        commissionL2: commissionRates.level2,
        level3: merciTree.Level3,   // To be determined based on merci_tree
        commissionL3: commissionRates.level3,
        level4: merciTree.Level4,   // To be determined based on merci_tree
        commissionL4: commissionRates.level4,
      };
      return finalCommissionData;
}

module.exports = setCommision