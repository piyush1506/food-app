
const order = require('../models/order');
const Order = require('../models/order');
const User = require('../models/usermodel');

const getAllUser = async (req, res) => {
  try {

    // const userStats = await User.aggregate([
    //   {
    //     $group: {
    //       _id: {
    //         $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
    //       },
    //       users: { $sum: 1 }
    //     }
    //   },
    //   { $sort: { _id: 1 } }
    // ]);

    // const formattedData = userStats.map(item => ({
    //   date: item._id,
    //   users: item.users
    // }));

    // res.status(200).json({
    //   stats: formattedData
    // });

    const userStats = await User.aggregate([
     {
      $group:{
        _id:{
          $dateToString:{format:"%m-%d",date:"$createdAt"}
           },
           users:{$sum:1}
                 }
     },
     {$sort:{_id:1}}
    ])

    // const formattadData = userStats.map(item=>({
    //   date:item._id,
    //   users:item.users
    // }))

    const orderStats = await Order.aggregate([
      {
      $group:{
        _id:{
          $dateToString:{ format:"%m-%d",date:"$createdAt" },
          },
            orders:{$sum:1}
      }
    },
    {$sort:{_id:1}}
    ])

    const combined ={}
        const totalUsers = await User.countDocuments();
    userStats.forEach(item=>{
      combined[item._id]= {date:item._id,users:item.users,orders:0}
        })
        orderStats.forEach(item=>{
          if (!combined[item._id]) {
          combined[item._id] = {date:item._id,users:0,orders:item.orders}  
          }else{
            combined[item._id].order  = item.orders
          }
          
        })

         
              const revenueData = await Order.aggregate([
                {
                  $group:{
                    _id:null,
                    totalRevenue:{$sum:"$payments"}
                  }
                }
              ])
                 const totalRevenue = revenueData.length> 0 ? revenueData[0].totalRevenue:0
       
              
         

    res.status(200).json({
      totalUsers,
      totalRevenue,
      stats:Object.values(combined).sort((a,b)=>a.date.localeCompare(b.date))
    })


  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { getAllUser };
