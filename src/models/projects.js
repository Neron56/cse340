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

export {getAllServiceProjects, getProjectsByOrganizationId};