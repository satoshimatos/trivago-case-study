CREATE TABLE IF NOT EXISTS public.location
(
    location_id SERIAL PRIMARY KEY,
    city character varying(255) COLLATE pg_catalog."default" NOT NULL,
    state character varying(255) COLLATE pg_catalog."default" NOT NULL,
    country character varying(255) COLLATE pg_catalog."default" NOT NULL,
    zip_code character varying(5) COLLATE pg_catalog."default" NOT NULL,
    address text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT check_number_only CHECK (zip_code::text ~ '^[0-9]+$'::text)
);

CREATE TABLE IF NOT EXISTS public.item
(
    item_id SERIAL PRIMARY KEY,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    rating integer NOT NULL,
    category character varying(255) COLLATE pg_catalog."default" NOT NULL,
    location_id integer,
    image character varying(255) COLLATE pg_catalog."default" NOT NULL,
    reputation integer NOT NULL,
    reputation_badge reputation_badge_enum NOT NULL,
    price numeric(10,2) NOT NULL,
    availability integer NOT NULL,
    CONSTRAINT item_location_id_fkey FOREIGN KEY (location_id)
        REFERENCES public.location (location_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT item_reputation_check CHECK (reputation >= 0 AND reputation <= 1000),
    CONSTRAINT check_value_range CHECK (rating >= 0 AND rating <= 5)
);