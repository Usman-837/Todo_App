import User from '../models/userModel.js';


export const getstatus = async (req, res) => {
    try{
        const total = await User.countDocuments();
        const active = await User.countDocuments({status: 'Active'});
        const inactive = await User.countDocuments({status: 'Inactive'});

        res.json({total, active, inactive})

    }catch(error) {
        res.status(500).json({message: 'Error Fetch Statistics', error: error.message})
    }
}
