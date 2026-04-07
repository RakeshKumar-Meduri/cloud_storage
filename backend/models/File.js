const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  s3Key: {
    type: String, // Or relative path if not using S3
    required: true,
  },
  url: {
    type: String, // Public S3 URL or local path
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

module.exports = mongoose.model('File', FileSchema);
