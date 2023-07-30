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
    last_login timestamp,
    created_by VARCHAR(255) NOT NULL,
    updated_by VARCHAR(255) NOT NULL,
    created_at timestamp NOT NULL,
    updated_at timestamp NOT NULL,
    CONSTRAINT usernme UNIQUE (username)
)


-- gis tabel ruas

CREATE TABLE IF NOT EXISTS public."ruas"
(
    id bigserial NOT NULL PRIMARY KEY,
    ruas VARCHAR(255) NOT NULL,
    km_awal VARCHAR(255) NOT NULL,
    km_akhir VARCHAR(255) NOT NULL,
    status boolean,
    created_by VARCHAR(255) NOT NULL,
    updated_by VARCHAR(255) NOT NULL,
    created_at timestamp NOT NULL,
    updated_at timestamp NOT NULL
)

-- gis tabel ruas_coordinates

CREATE TABLE IF NOT EXISTS public."ruas_coordinates"
(
    id bigserial NOT NULL PRIMARY KEY,
    ruas_id int NOT NULL,
    coordinates VARCHAR(255) NOT NULL,
    created_by VARCHAR(255) NOT NULL,
    updated_by VARCHAR(255) NOT NULL,
    created_at timestamp NOT NULL,
    updated_at timestamp NOT NULL,
    FOREIGN KEY (ruas_id) REFERENCES public.ruas(id) ON DELETE RESTRICT
)