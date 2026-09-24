import db from './db.js'

const getAllCategories = async() => {
    const query = `
        SELECT 
        category_id,
        name
        FROM public.categories;
        `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryByID = async(categoryId) => {
    const query = `
        SELECT 
        category_id,
        name
        FROM public.categories
        WHERE category_id = $1;
        `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows;
}

const getCategoryByServiceProject = async(project_id) => {
    const query = `
        SELECT 
        c.category_id,
        name
        FROM public.categories c
        JOIN service_project_category s
        ON c.category_id = s.category_id
        JOIN service_project p
        ON s.project_id = p.project_id
        WHERE p.project_id = $1;
        `;

    const queryParams = [project_id];
    const result = await db.query(query, queryParams);
    
    return result.rows;
}

const assignCategoryToProject = async(categoryId, projectId) => {
    const query = `
        INSERT INTO project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async(projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM project_category
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
}

const createCategory = async (name) => {
    const query = `
        INSERT INTO categories (name)
        VALUES ($1)
        RETURNING category_id;
    `
    const queryParams = [name];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create Category');
    };

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new category with ID:', result.rows[0].category_id);
    }

    return result.rows[0].category_id;
}

const editCategory = async (categoryId, name) => {
    const query = `
        UPDATE categories
        SET name = $1
        WHERE category_id = $2
        RETURNING category_id;
    `;

    const queryParams = [name, categoryId];
    const result = await db.query(query, queryParams);
    console.log(result.rows[0]);
    if (result.rows.length === 0) {
        throw new Error('Category not found');
    };

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated category with ID:', categoryId);
    };

    return result.rows[0].category_id;
}

export {getAllCategories, getCategoryByID, getCategoryByServiceProject, assignCategoryToProject, updateCategoryAssignments, editCategory, createCategory};

