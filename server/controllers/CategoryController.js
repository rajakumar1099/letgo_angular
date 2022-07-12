const CategoriesModel = require("../model/CategoriesModel");
var Constants = require("../utils/Constants");
const crypto = require("crypto");

const getCategories = async (req, res) => {
  var categories = await CategoriesModel.find({}, { _id: 0, __v: 0 });
  // const category = categories;
  // for(let i in categories){
  //   categories[i].sub_categories.forEach( subCategory => {
  //           delete subCategory._id
  //       console.log(categories)
  //       })
  // }
//   category.forEach(v => {
//     v.sub_categories?.forEach(sub_category => {
//     console.log('s: ', sub_category?._id);
//         delete sub_category?._id;
//         // delete sub_category?.__v;
//         sub_category.child_categories?.forEach(child_category => {
//             console.log(child_category?._id);
//             delete child_category?._id;
//             // delete child_category?.__v;
//         })
//     })
//     // return v
//   });
  // delete val._id
  // delete val.__v
  
//   for(let i in category){
//     category[i].sub_categories.forEach( j => {
//         delete j._id
//     })
//     // delete category[o].type
// }
  res.json({
    status: Constants.SUCCESS,
    data: {
      categories: categories,
    },
  });
};

const addCategories = async (req, res) => {
  if (Object.keys(req.body).length < 2) {
    return res.status(400).json({
      status: Constants.FAILURE,
      data: {
        message: Constants.INVALID_PAYLOAD,
      },
    });
  }

  const payload = {
    id: crypto.randomBytes(16).toString("hex"),
    name: req.body.name,
    image: "",
    sub_categories: [
      {
        id: crypto.randomBytes(16).toString("hex"),
        name: req?.body?.sub_categories?.name,
        child_categories: [
          {
            id: crypto.randomBytes(16).toString("hex"),
            name: req?.body?.sub_categories.child_categories?.name,
          },
        ],
      },
    ],
  };

  try {
    // save the category details in DB
    await new CategoriesModel(payload).save();
    res.json({
      status: Constants.SUCCESS,
      data: {
        message: Constants.CATEGORY_ADDED_SUCCESSFULLY,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: Constants.FAILURE,
      data: {
        message: err.message,
      },
    });
  }
};

module.exports = {
  getCategories,
  addCategories,
};
