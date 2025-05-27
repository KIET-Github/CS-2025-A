import { asyncHandler } from "../utils/asyncHandler.js"
import { Petition, Upvote } from "../models/petition.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create a petition
export const createPetition = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        res.status(400);
        throw new Error('Please provide both title and description');
    }

    const petition = new Petition({
        user: req.user._id,
        name: req.user.username,
        email: req.user.email,
        title,
        description,
    });

    const createdPetition = await petition.save();

    res.status(201).json({
        message: "Petition created successfully",
        petition: createdPetition,
    });
});

export const editPetition = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
        res.status(400);
        throw new Error('Please provide both title and description');
    }

    const petition = await Petition.findById(id);

    if (!petition) {
        res.status(404);
        throw new Error('Petition not found');
    }

    if (petition.user.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('You are not authorized to edit this petition');
    }

    petition.title = title;
    petition.description = description;
    petition.updatedAt = new Date();

    const updatedPetition = await petition.save();

    res.status(200).json({
        message: "Petition updated successfully",
        petition: updatedPetition,
    });
});

export const deletePetition = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const petition = await Petition.findById(id);

    if (!petition) {
        res.status(404);
        throw new Error('Petition not found');
    }

    if (petition.user.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('You are not authorized to delete this petition');
    }

    await petition.deleteOne();

    res.status(200).json({
        message: "Petition deleted successfully",
    });
});

// Upvote a petition (increment upvoteCount)
export const upvotePetition = asyncHandler(async (req, res) => {
    const petitionId = req.params.id;
    const userId = req.user._id;

    const petition = await Petition.findById(petitionId);
    if (!petition) {
        res.status(404);
        throw new Error('Petition not found');
    }

    // Check if the user has already upvoted this petition
    const existingUpvote = await Upvote.findOne({ user: userId, petition: petitionId });
    if (existingUpvote) {
        res.status(400);
        throw new Error('You have already upvoted this petition');
    }

    // Increment the upvoteCount
    petition.upvoteCount += 1;
    await petition.save();

    const upvote = new Upvote({
        user: userId,
        petition: petitionId
    });
    await upvote.save();

    res.status(200).json({
        message: "Petition upvoted successfully",
        upvoteCount: petition.upvoteCount
    });
});

export const getPetitionById = asyncHandler(async (req, res) => {
    const { id } = req.params;  // Petition ID from the request parameters

    // Find the petition by ID
    const petition = await Petition.findById(id);

    if (!petition) {
        res.status(404);
        throw new Error('Petition not found');
    }

    res.status(200).json(new ApiResponse(200, petition, "Fetched Petition Successfully"));
});

export const getAllPetitons = asyncHandler(async (req, res) => {
    /*
        1. Fetch all Petitions submitted by all users
    */

    const grievances = await Petition.find({}); // Fetch all petitions

    return res.status(200).json(new ApiResponse(200, grievances, "All petitions fetched successfully"));
});