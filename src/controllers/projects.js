// Import any needed model functions
import { getAllServiceProjects } from '../models/projects.js';

// Define any controller functions
const showProjectsPage = async (req, res) => {
    const projects = await getAllServiceProjects();
    const title = 'Service Projects';

    res.render('projects', { title, projects });
};  

// Export any controller functions
export { showProjectsPage };