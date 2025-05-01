const Member = require('../models/memberModel');

// Get all team members
exports.getAllMembers = async (req, res) => {
  try {
    // Fetch all members from database
    const members = await Member.find({});
    res.status(200).json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ message: 'Server error while fetching members' });
  }
};

// Get a single team member by ID
exports.getMemberById = async (req, res) => {
  try {
    const memberId = req.params.id;
    
    // Find member by ID
    const member = await Member.findById(memberId);
    
    // If no member found with that ID
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    
    res.status(200).json(member);
  } catch (error) {
    console.error('Error fetching member by ID:', error);
    res.status(500).json({ message: 'Server error while fetching member details' });
  }
};

// Create a new team member
exports.createMember = async (req, res) => {
  try {
    console.log('Received create member request:', {
      body: req.body,
      file: req.file,
      headers: req.headers
    });

    if (!req.body) {
      return res.status(400).json({ message: 'Request body is missing' });
    }

    const { name, role, email, phone, bio } = req.body;
    
    // Validate required fields
    if (!name || !role || !email) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: ['name', 'role', 'email'],
        received: { name, role, email }
      });
    }

    // Get the filename of the uploaded image (if any)
    const profileImage = req.file ? req.file.filename : '';
    
    // Create new member with data
    const newMember = new Member({
      name,
      role,
      email,
      phone,
      bio,
      profileImage
    });
    
    // Save to database
    const savedMember = await newMember.save();
    console.log('Successfully created member:', savedMember);
    
    res.status(201).json(savedMember);
  } catch (error) {
    console.error('Error creating member:', {
      error: error.message,
      stack: error.stack,
      body: req.body,
      file: req.file
    });

    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error',
        details: error.message 
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Email already exists',
        details: 'A member with this email address is already registered'
      });
    }
    
    res.status(500).json({ 
      message: 'Server error while creating member',
      details: error.message
    });
  }
};

// Update an existing team member
exports.updateMember = async (req, res) => {
  try {
    const memberId = req.params.id;
    const updateData = { ...req.body };
    
    // If a new image was uploaded, update the profileImage field
    if (req.file) {
      updateData.profileImage = req.file.filename;
    }
    
    // Find and update the member
    const updatedMember = await Member.findByIdAndUpdate(
      memberId,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }
    
    res.status(200).json(updatedMember);
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).json({ message: 'Server error while updating member' });
  }
};

// Delete a team member
exports.deleteMember = async (req, res) => {
  try {
    const memberId = req.params.id;
    
    // Find and delete the member
    const deletedMember = await Member.findByIdAndDelete(memberId);
    
    if (!deletedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }
    
    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error('Error deleting member:', error);
    res.status(500).json({ message: 'Server error while deleting member' });
  }
};