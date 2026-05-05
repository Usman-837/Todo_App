import User from '../models/userModel.js';


export const getstatus = async (req, res) => {
    try {
        const total = await User.countDocuments();
        const active = await User.countDocuments({status: 'Active'});
        const inactive = await User.countDocuments({status: 'Inactive'});
        res.json({total, active, inactive})
    }
    catch(error) {
        res.status(500).json({message: 'Error Fetch Statistics', error: error.message})
    }
}

export const searchUsers = async(req, res) => {
    try {
        const query = req.params.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const searchQuery = {
            $or: [
                { name: { $regex: query, $options: 'i'}},
                { email: { $regex: query, $options: 'i'}},
                { phone: { $regex: query, $options: 'i'}},
                { status: { $regex: query, $options: 'i'}}
            ],
        };

        const users = await User.find(searchQuery).sort({createdAt: -1}).skip(skip).limit(limit)
        const total = await User.countDocuments(searchQuery);
            
        res.json({
            users,
            currentPage: page,
            totalPages: Math.ceil(total/limit),
            totalUsers: total
        });
    }
    catch(error) {
        res.status(500).json({message: 'Error fetching statistics', error: error.message});
    }
}
