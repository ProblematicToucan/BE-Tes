CREATE DATABASE gis
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

COMMENT ON DATABASE gis
    IS 'gis database';

-- Create user table

CREATE TABLE IF NOT EXISTS public."user"
(
    id bigserial NOT NULL PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    last_login timestamp NOT NULL,
    created_by VARCHAR(255) NOT NULL,
    updated_by VARCHAR(255) NOT NULL,
    created_at timestamp NOT NULL,
    updated_at timestamp NOT NULL,
    CONSTRAINT usernme UNIQUE (username)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."user"
    OWNER to postgres;


-- Add default user

INSERT INTO "user" (fullname, username, password,
					last_login, created_by, updated_by, created_at,
				   updated_at)
VALUES ('Gamal Aziz', 'gamal', 'qwerty', NOW(),
		'Gamal Aziz', 'Gamal Aziz', NOW(), NOW());