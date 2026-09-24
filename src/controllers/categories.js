// Import any needed model functions
import { getAllCategories, getCategoryByID, getCategoryByServiceProject, editCategory, createCategory } from '../models/categories.js';
import { getProjectByCategory, getProjectById } from '../models/projects.js';
import { body, validationResult } from 'express-validator';

const categoryValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 100 characters')
];

// Define any controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};  

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryByID(categoryId);
    const projects = await getProjectByCategory(categoryId);
    const title = 'Category Details';

    res.render('category', { title, category, projects});
}

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectById(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoryByServiceProject(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

const showEditCategoryForm = async (req,res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryByID(categoryId);
    const title = 'Edit a Category';
    res.render('edit-category', { title, categoryDetails });
};

const processEditCategoryForm = async (req,res) => {
    const categoryId = req.params.id;
    const { name } = req.body;

    await editCategory(categoryId, name);

    req.flash('success', 'Category updated successfully!');

    res.redirect(`/category/${categoryId}`);
};

const showNewCategoryForm = async (req,res) => {
    const title = 'Create a category';

    res.render('new-category', { title });
};

const processNewCategoryForm = async (req,res) => {
    const results = validationResult(req);
    if(!results.isEmpty()){
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-category');
    };
    const { name } = req.body;
    const categoryId = await createCategory(name);

    req.flash('success', 'Category added sucessfully');
    res.redirect(`/category/${categoryId}`);
}


// Export any controller functions
export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, showEditCategoryForm, processEditCategoryForm, showNewCategoryForm, processNewCategoryForm, categoryValidation };