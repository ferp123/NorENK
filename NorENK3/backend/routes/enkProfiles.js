const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const ENKProfile = require('../models/enkProfile');
const auth = require('../middleware/auth');

// Validation rules
const profileValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('description').notEmpty().withMessage('Description is required'),
  body('skills').isArray().withMessage('Skills must be an array'),
  body('rating').isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5')
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Bulk insert ENK profiles
router.post('/bulk', auth, async (req, res) => {
  try {
    const profiles = req.body;
    const insertedProfiles = await ENKProfile.insertMany(profiles);
    res.status(201).json({ message: `${insertedProfiles.length} profiles inserted successfully` });
  } catch (err) {
    res.status(500).json({ message: 'Error inserting profiles', error: err.message });
  }
});


// Create a new ENK profile
router.post('/', auth, profileValidationRules, handleValidationErrors, async (req, res) => {
  try {
    const newProfile = new ENKProfile(req.body);
    const savedProfile = await newProfile.save();
    res.status(201).json(savedProfile);
  } catch (err) {
    res.status(500).json({ message: 'Error creating profile', error: err.message });
  }
});

// Get all ENK profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await ENKProfile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search ENK profiles
router.get('/search', async (req, res) => {
try {
    const { query } = req.query;
    const profiles = await ENKProfile.find({
    $or: [
        { name: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { skills: { $in: [new RegExp(query, 'i')] } }
    ]
    });
    res.json(profiles);
} catch (err) {
    res.status(500).json({ message: 'Error searching profiles', error: err.message });
}
});

// Filter ENK profiles
router.get('/filter', async (req, res) => {
try {
    const { category, location, minRating } = req.query;
    let filter = {};
    
    if (category) filter.category = category;
    if (location) filter.location = location;
    if (minRating) filter.rating = { $gte: parseFloat(minRating) };

    const profiles = await ENKProfile.find(filter);
    res.json(profiles);
} catch (err) {
    res.status(500).json({ message: 'Error filtering profiles', error: err.message });
}
});
  

// Get a specific ENK profile
router.get('/:id', getProfile, (req, res) => {
  res.json(res.profile);
});

// Update an ENK profile
router.patch('/:id', auth, getProfile, profileValidationRules, handleValidationErrors, async (req, res) => {
  Object.assign(res.profile, req.body);
  try {
    const updatedProfile = await res.profile.save();
    res.json(updatedProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an ENK profile
router.delete('/:id', getProfile, async (req, res) => {
  try {
    await ENKProfile.deleteOne({ _id: res.profile._id });
    res.json({ message: 'Deleted ENK profile' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Middleware function to get a specific profile by ID
async function getProfile(req, res, next) {
  let profile;
  try {
    profile = await ENKProfile.findById(req.params.id);
    if (profile == null) {
      return res.status(404).json({ message: 'Cannot find profile' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.profile = profile;
  next();
}

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
});

module.exports = router;
