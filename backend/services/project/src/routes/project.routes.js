import express from "express";
import { createProject, getProjects,getProjectById, getStarredProjects, toggleStarProject, deleteProject } from "../controller/project.controller.js";

const projectRouter = express.Router();

projectRouter.post("/", createProject);
projectRouter.get("/", getProjects);
projectRouter.get("/:id", getProjectById);
projectRouter.get("/starred", getStarredProjects);
projectRouter.patch("/:id", toggleStarProject);
projectRouter.delete("/:id", deleteProject);

export default projectRouter;