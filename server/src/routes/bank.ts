import { Router } from 'express';

const router = Router();

// Mock Bank Data
const bankData = {
  '12345': {
    transactions: [
      { id: 1, date: '2025-01-01', description: 'Grocery', amount: -50 },
      { id: 2, date: '2025-01-05', description: 'Salary', amount: 5000 }
    ],
    balance: 4950
  }
};

// @route    GET api/bank/:accountNumber
// @desc     Get bank data
// @access   Private
router.get('/:accountNumber', (req, res) => {
  const accountNumber = req.params.accountNumber;
  const data = bankData[accountNumber];

  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ msg: 'Account not found' });
  }
});

export default router;