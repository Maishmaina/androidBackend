import Category from "../models/categoryModel.js";

// @desc  Fetch all categories
// @route GET /api/v1/categories
// @access  Public

const getCategories = async (req, res) => {
  try {
    const result = await Category.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err, success: false });
  }
};
// @desc  Create new categories
// @route GET /api/v1/categories
// @access  Private

const addCategory = async (req, res) => {
  const category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  const cateResult = await category.save();

  if (!cateResult) {
    return res.status(404).send("Error Category was Not Created");
  }
  res.send(cateResult);
};

// @desc  DELETE categories
// @route DELETE /api/v1/categories/:id
// @access  Private

const deleteCategory = async (req, res) => {
  const deletCategory = await Category.findById(req.params.id);
  if (deletCategory) {
    await deletCategory.remove();
    res.status(200).json({ success: true, message: "Category Deleted" });
  } else {
    res.status(404).json({ success: false, message: "Category Not Found" });
  }
};

// @desc  GET category by Id
// @route GET /api/v1/categories/:id
// @access  Public
const getCategoryById = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(500).json({ success: false, message: "Category Not Found" });
  }
  res.status(200).send(category);
};
// @desc Update a category
// @route PUT /api/v1/categories/:id
// @access  Private
const updateCategory = async (req, res) => {
  const { name, icon, color } = req.body;

  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = name;
    category.icon = icon;
    category.color = color;

    const updated = await category.save();
    res.status(201).json(updated);
  } else {
    res.status(404).json({ message: "Category not found" });
  }
};
export {
  getCategories,
  addCategory,
  deleteCategory,
  getCategoryById,
  updateCategory,
};
