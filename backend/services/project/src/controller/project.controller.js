import Project from "../models/project.models.js"
import redis from "../../../../shared/redis/redis.js";

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


export const getProjects = async (req,res)=>{
    try{
        const userId = req.headers["x-user-id"]
        if(!userId){
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            })
        }
        const key = `projects-${userId}`
        let result = await redis.get(key)
        if(result){
            const projects = JSON.parse(result)
            return res.status(200).json({
                success: true,
                message: "Projects fetched successfully",
                projects
            })
        }
        const projects = await Project.find({owner: userId}).sort({updatedAt: -1})
        await redis.set(key, JSON.stringify(projects), "EX", 60 * 60)

        return res.status(200).json({
            success: true,
            message: "Projects fetched successfully",
            projects
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching projects",
            error: error.message
        })
    }
}


export const getProjectById = async (req,res)=>{
    try{
        const userId = req.headers["x-user-id"]
        if(!userId){
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            })
        }

        const projectId = req.params.id
        const project = await Project.findOne({_id: projectId, owner: userId})
        await Project.findByIdAndUpdate(projectId, {lastOpenAt: Date.now()}) 
        if(!project){
            return res.status(404).json({
                success: false,
                message: "Project not found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Project fetched successfully",
            project
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching project",
            error: error.message
        })
    }
}


export const getStarredProjects = async (req,res)=>{
    try{
        const userId = req.headers["x-user-id"]
        if(!userId){
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            })
        }

        const projects = await Project.find({owner: userId, starred: true}).sort({updatedAt: -1})
        return res.status(200).json({
            success: true,
            message: "Starred projects fetched successfully",
            projects
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching starred projects",
            error: error.message
        })
    }
}

export const toggleStarProject = async (req,res)=>{
    try{
        const userId = req.headers["x-user-id"]
        if(!userId){
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            })
        }
        const {id} = req.params
        const project = await Project.findById(id)
        if(!project){
            return res.status(404).json({
                success: false,
                message: "Project not found",
            })
        }
        if(project.owner.toString() !== userId){
            return res.status(403).json({
                success: false,
                message: "You are not authorized to star this project",
            })
        }
        project.starred =! project.starred
        await project.save()
        return res.status(200).json(
             {success: true,
            message: "Starred Toggle  successfully",
            project}
        )
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error toggling star",
            error: error.message
        })
    }
}



export const deleteProject = async (req,res)=>{
    try{
        const userId = req.headers["x-user-id"]
        if(!userId){
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            })
        }
        const {id} = req.params
        const project = await Project.findByIdAndDelete(id)
        if(!project){
            return res.status(404).json({
                success: false,
                message: "Project not found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Project deleted successfully",
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting project",
            error: error.message
        })
    }
}