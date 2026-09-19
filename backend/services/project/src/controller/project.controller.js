import Project from "../models/project.models.js"


export const createProject = async (req, res) => {
    const { name, description } = req.body
    if (!name || !description) {
        return res.status(400).json({
            success: false,
            message: "Project name and description are required",
        })
    }
    const userId = req.headers["x-user-id"]
    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "User ID is required",
        })
    }
    try {
        const project = await Project.create({
            owner: userId,
            name,
            description
        })
        return res.status(201).json({
            success: true,
            message: "Project created successfully",
            project
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error creating project",
            error: error.message
        })
    }
}