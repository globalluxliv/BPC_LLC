import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

const ADMIN_USER_ID = '664a1c34413c39f3d7fa02d4';
const ADMIN_USER_ID2 = '66a6ac6b52f384512b70c176';

// Create a new listing
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

// Delete a listing
export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef && req.user.id !== ADMIN_USER_ID && req.user.id !== ADMIN_USER_ID2) {
    return next(errorHandler(401, 'You can only delete your own listings!'));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
};

// Update a listing
export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef && req.user.id !== ADMIN_USER_ID && req.user.id !== ADMIN_USER_ID2) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

// Get a single listing by ID
export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

// Get listings with filters and sorting
export const getListings = async (req, res, next) => {
  try {
    const { userId, type, offer, parking, furnished, sort, order } = req.query;
    const query = {};

    // Add filters to query object
    if (userId) {
      query.userRef = userId;
    }
    if (type && type !== 'all') {
      query.type = type;
    }
    if (offer) {
      query.offer = offer === 'true';
    }

    // Only add parking and furnished filters if they are explicitly set
    if (typeof parking !== 'undefined') {
      query.parking = parking === 'true';
    }
    if (typeof furnished !== 'undefined') {
      query.furnished = furnished === 'true';
    }

    // Sorting logic
    let sortOption = {};
    if (sort) {
      sortOption[sort] = order === 'asc' ? 1 : -1;
    } else {
      sortOption = { createdAt: -1 }; // default to newest first
    }

    // Fetch listings based on query and sorting options
    const listings = await Listing.find(query).sort(sortOption);
    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};