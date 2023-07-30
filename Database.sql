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

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."user"
    OWNER to postgres;


-- Add default user

INSERT INTO public."user" (fullname, username, password,
					last_login, created_by, updated_by, created_at,
				   updated_at)
VALUES ('Gamal Aziz', 'gamal', 'qwerty', NOW(),
		'Gamal Aziz', 'Gamal Aziz', NOW(), NOW());

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

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."ruas"
    OWNER to postgres;

-- gis tabel ruas koordinat

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

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."ruas_coordinates"
    OWNER to postgres;

-- dummy

INSERT INTO public."ruas" (ruas, km_awal, km_akhir, status, created_by, updated_by, created_at, updated_at)
VALUES
    ('Jalan A', '187+100', '188+500', true, 'gamal', 'gamal', '2023-07-29 12:00:00', '2023-07-29 14:30:00'),
    ('Jalan B', '57+300', '59+200', true, 'User2', 'gamal', '2023-07-29 13:15:00', '2023-07-29 16:45:00'),
    ('Jalan C', '100+000', '102+000', false, 'User3', 'User2', '2023-07-29 14:00:00', '2023-07-29 17:00:00');

INSERT INTO public."ruas_coordinates" (ruas_id, coordinates, created_by, updated_by, created_at, updated_at)
VALUES
    (1, '-6.200123, 106.789456', 'gamal', 'gamal', '2023-07-29 12:05:00', '2023-07-29 12:10:00'),
    (1, '-6.201234, 106.790567', 'gamal', 'User2', '2023-07-29 12:12:00', '2023-07-29 12:20:00'),
    (1, '-6.202345, 106.791678', 'User2', 'User2', '2023-07-29 12:22:00', '2023-07-29 12:30:00'),
    (2, '-6.203456, 106.792789', 'gamal', 'User3', '2023-07-29 13:20:00', '2023-07-29 13:25:00'),
    (2, '-6.204567, 106.793890', 'User2', 'User3', '2023-07-29 13:27:00', '2023-07-29 13:35:00'),
    (2, '-6.205678, 106.794901', 'User3', 'User4', '2023-07-29 13:40:00', '2023-07-29 13:45:00'),
    (2, '-6.206789, 106.795912', 'User3', 'User4', '2023-07-29 13:50:00', '2023-07-29 13:55:00'),
    (3, '-6.207890, 106.796923', 'User4', 'User4', '2023-07-29 14:10:00', '2023-07-29 14:15:00'),
    (3, '-6.208901, 106.797934', 'User4', 'User5', '2023-07-29 14:20:00', '2023-07-29 14:25:00'),
    (3, '-6.209912, 106.798945', 'User5', 'User5', '2023-07-29 14:30:00', '2023-07-29 14:35:00');
