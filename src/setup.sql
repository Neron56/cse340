CREATE TABLE organization (
	organization_id SERIAL PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	contact_email VARCHAR(255) NOT NULL,
	logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO	organization (name, description, contact_email, logo_filename)
VALUES
	('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
	('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
	('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

CREATE TABLE service_project(
	project_id SERIAL PRIMARY KEY,
	organization_id INT REFERENCES organization(organization_id),
	title VARCHAR(150),
	description VARCHAR(255),
	location VARCHAR(150),
	date DATE	
)
INSERT INTO service_project 
    (organization_id, title, description, location, date)
VALUES
    -- Organization 1
    (1, 'Community Food Drive',
     'Collect and organize donated food for local families in need.',
     'Ogden Community Center', '2026-09-20'),

    (1, 'Park Cleanup',
     'Help clean up litter and improve the appearance of a local park.',
     'Lorin Farr Park', '2026-09-27'),

    (1, 'Senior Center Assistance',
     'Assist seniors with activities, games, and basic center maintenance.',
     'Ogden Senior Center', '2026-10-04'),

    (1, 'Neighborhood Garden',
     'Plant and maintain a community garden for local residents.',
     'West Ogden Community Garden', '2026-10-11'),

    (1, 'Clothing Donation Sort',
     'Sort and organize donated clothing for distribution to families.',
     'Community Resource Center', '2026-10-18'),

    -- Organization 2
    (2, 'Riverbank Restoration',
     'Remove trash and invasive plants along the local riverbank.',
     'Ogden River Parkway', '2026-09-21'),

    (2, 'Homeless Shelter Meal Service',
     'Prepare and serve meals to individuals staying at a local shelter.',
     'Ogden Homeless Shelter', '2026-09-28'),

    (2, 'School Supply Drive',
     'Collect and organize school supplies for students in need.',
     'Washington Elementary School', '2026-10-05'),

    (2, 'Trail Maintenance',
     'Clear debris and improve trails for community recreation.',
     'Bonneville Shoreline Trail', '2026-10-12'),

    (2, 'Community Recycling Event',
     'Help residents properly sort and recycle household materials.',
     'Ogden Recreation Center', '2026-10-19'),

    -- Organization 3
    (3, 'Animal Shelter Volunteer Day',
     'Help clean animal areas and provide care for shelter animals.',
     'Weber County Animal Shelter', '2026-09-22'),

    (3, 'Habitat Restoration',
     'Plant native vegetation and restore a local natural habitat.',
     'Ogden Nature Park', '2026-09-29'),

    (3, 'Youth Mentoring Day',
     'Spend time with local youth through educational games and activities.',
     'Ogden Youth Center', '2026-10-06'),

    (3, 'Holiday Gift Collection',
     'Collect and organize donated gifts for children in local families.',
     'Community Outreach Center', '2026-10-13'),

    (3, 'Community Painting Project',
     'Help paint and improve a shared community building.',
     'Pleasant View Community Center', '2026-10-20');

CREATE TABLE categories(
	category_ID SERIAL PRIMARY KEY,
	name VARCHAR(150),
)

INSERT INTO categories(name)
VALUES
('Environmental')
('Senior Support')
('Arts')