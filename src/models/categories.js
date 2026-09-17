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

export {getAllCategories, getCategoryByID, getCategoryByServiceProject};

