/*
In this block of code, we defined our function with a RETURNS TRIGGER. This opens up a special variable for us to use:
NEW is a RECORD object. It contains the data that's being inserted or updated. As you can see in the example function, PostgreSQL allows us to read from and write to any field in the NEW object before it gets saved to disk.
Note: You can find more information on Postgres trigger variables here.*/
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE orders(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid,
    order_name VARCHAR(50) NOT NULL,
    price INTEGER Not Null,
    order_status VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

/*This trigger will execute the trigger_set_timestamp function that we defined earlier. It will do so whenever a row is updated in the ORDERS table.*/
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();