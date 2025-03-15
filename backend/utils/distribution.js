const distributePayment = (userId, paymentType, refer, merci_tree, merci_level, total, monthly, plan) => {
    let distribution = {
      Level1: 0,
      Level2: 0,
      Level3: 0,
      Level4: 0
    };

    const highComm = monthly ? 0.10 : 0.50;

    if (merci_level === 'Level 4') {
      distribution.Level4 = total * highComm;
      distribution.Level3 = total * 0.10;
      distribution.Level2 = total * 0.05;
      distribution.Level1 = total - (distribution.Level4 + distribution.Level3 + distribution.Level2);
    } else if (merci_level === 'Level 3') {
      distribution.Level3 = total * 0.10;
      distribution.Level2 = total * 0.05;
      distribution.Level1 = total - (distribution.Level3 + distribution.Level2);
    } else if (merci_level === 'Level 2') {
      distribution.Level2 = total * 0.05;
      distribution.Level1 = total - distribution.Level2;
    }

    const commissionData = Object.keys(merci_tree).map(level => ({
      level: level.replace(/(\d)/, ' $1'),  // Format the level as 'Level 1', 'Level 2', etc.
      refer_id: level === merci_level.replace(' ', '') ? refer : merci_tree[level],
      commission: distribution[level] || 0
    }));

    const finalCommissionData = {
      userId,
      paymentType,
      level1: commissionData.find(data => data.level === 'Level 1').refer_id,
      commissionL1: commissionData.find(data => data.level === 'Level 1').commission,
      level2: commissionData.find(data => data.level === 'Level 2').refer_id,
      commissionL2: commissionData.find(data => data.level === 'Level 2').commission,
      level3: commissionData.find(data => data.level === 'Level 3').refer_id,
      commissionL3: commissionData.find(data => data.level === 'Level 3').commission,
      level4: commissionData.find(data => data.level === 'Level 4').refer_id,
      commissionL4: commissionData.find(data => data.level === 'Level 4').commission
    };

    console.log('CommisionData', commissionData);


    const CommissionData = {
      userId,
      paymentType,
      level1: commissionData.find(data => data.level === 'Level 1').refer_id,
      commissionL1: 0,
      level2: commissionData.find(data => data.level === 'Level 2').refer_id,
      commissionL2: 150,
      level3: commissionData.find(data => data.level === 'Level 3').refer_id,
      commissionL3: 300,
      level4: commissionData.find(data => data.level === 'Level 4').refer_id,
      commissionL4: 1500,
    };

    return plan ? CommissionData : finalCommissionData;
  };

  module.exports = distributePayment