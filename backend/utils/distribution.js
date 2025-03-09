const distributePayment = (merci_tree, merci_level, total, monthly) => {
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

    return distribution;
  };

  module.exports = distributePayment