export const getCurrentUser = async (req,res) => {
    try{
        return res.status(200).json({
            message:"Current user fetched successfully",user:req.user
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            message:"Error fetching current user"
        })
    }
}