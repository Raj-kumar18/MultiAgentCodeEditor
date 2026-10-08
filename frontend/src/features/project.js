import api from "../utils/axios";


export const createProject = async (name, description) => {
  try {
    const { data } = await api.post("/api/projects", { name, description });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};


export const getProjects = async () => {
  try {
    const { data } = await api.get("/api/projects");
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getProjectById = async (id) => {
  try {
    const { data } = await api.get(`/api/projects/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getStarredProjects = async () => {
  try {
    const { data } = await api.get("/api/projects/starred");
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const toggleStarProject = async (id) => {
  try {
    const { data } = await api.patch(`/api/projects/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};


export const deleteProject = async(id)=>{
    try{
        const {data} =await api.delete(`/api/projects/${id}`)
        return data
    }catch(error){
        console.log(error)
        return null
    }
}