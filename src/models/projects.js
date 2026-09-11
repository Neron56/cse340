import db from './db.js'

const getAllServiceProjects = async() => {
    const query = `
        SELECT o.name, title, s.description, location, date 
        FROM public.service_project s
        JOIN public.organization o
        ON s.organization_id = o.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
}

export {getAllServiceProjects}  