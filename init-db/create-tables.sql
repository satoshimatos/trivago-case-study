CREATE TYPE reputation_badge_enum AS ENUM ('green', 'yellow', 'red');

CREATE TABLE IF NOT EXISTS public.location
(
    location_id SERIAL PRIMARY KEY,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    zip_code VARCHAR(5) NOT NULL,
    address text NOT NULL,
    CONSTRAINT check_number_only CHECK (zip_code::text ~ '^[0-9]+$'::text AND length(zip_code) = 5)
);

CREATE TABLE IF NOT EXISTS public.item
(
    item_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    rating integer NOT NULL,
    category VARCHAR(255) NOT NULL,
    location_id integer,
    image VARCHAR(255) NOT NULL,
    reputation integer NOT NULL,
    reputation_badge reputation_badge_enum NOT NULL,
    price numeric(10,2) NOT NULL,
    availability integer NOT NULL,
    CONSTRAINT item_location_id_fkey FOREIGN KEY (location_id)
        REFERENCES public.location (location_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT item_reputation_check CHECK (reputation >= 0 AND reputation <= 1000),
    CONSTRAINT check_value_range CHECK (rating >= 0 AND rating <= 5),
    CONSTRAINT check_name_value CHECK (
        length(name) > 10 AND
        name NOT LIKE '%Free%' AND
        name NOT LIKE '%Offer%' AND
        name NOT LIKE '%Book%' AND
        name NOT LIKE '%Website%'
    ),
    CONSTRAINT check_category_value CHECK (
        category IN ('hotel', 'alternative', 'hostel', 'lodge', 'resort', 'guesthouse')
    )
);