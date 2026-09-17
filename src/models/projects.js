import db from './db.js'

const getAllServiceProjects = async() => {
    const query = `
        SELECT project_id, o.name, title, s.description, location, date, s.organization_id
        FROM public.service_project s
        JOIN public.organization o
        ON s.organization_id = o.organization_id
        ORDER BY date
        LIMIT 5;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM service_project
        WHERE organization_id = $1
        ORDER BY date;
      `;
      
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

const getProjectById = async (project_id) => {
  const query = `
    SELECT
      project_id,
      s.organization_id,
      title,
      s.description,
      location,
      date,
      o.name
    FROM public.service_project s
    JOIN organization o
    ON s.organization_id = o.organization_id
    WHERE project_id = $1
    `;

    const queryParams = [project_id];
    const result = await db.query(query, queryParams);

    return result.rows;
}

const getProjectByCategory = async (category_id) => {
  const query = `
    SELECT
      s.project_id,
      title
    FROM public.service_project s
    JOIN service_project_category p
    ON s.project_id = p.project_id
    JOIN categories c
    ON p.category_id = c.category_id
    WHERE c.category_id = $1
    `;

    const queryParams = [category_id];
    const result = await db.query(query, queryParams);

    return result.rows;
}
export {getAllServiceProjects, getProjectsByOrganizationId, getProjectById, getProjectByCategory};