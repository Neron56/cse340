// Import any needed model functions
import { getAllCategories, getCategoryByID } from '../models/categories.js';
import { getProjectByCategory } from '../models/projects.js';

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

// Export any controller functions
export { showCategoriesPage, showCategoryDetailsPage };