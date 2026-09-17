// Import any needed model functions
import { getCategoryByServiceProject } from '../models/categories.js';
import { getAllServiceProjects, getProjectById } from '../models/projects.js';

// Define any controller functions
const showProjectsPage = async (req, res) => {
    const projects = await getAllServiceProjects();
    const title = 'Service Projects';

    res.render('projects', { title, projects });
};  

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const project = await getProjectById(projectId);
    const categories = await getCategoryByServiceProject(projectId);
    const title = 'Project Details';
    console.log(project)
    res.render('project', { title, project, categories });
}

// Export any controller functions
export { showProjectsPage, showProjectDetailsPage };