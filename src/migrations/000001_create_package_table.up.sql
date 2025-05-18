CREATE TABLE IF NOT EXISTS packages (
    package_id BIGSERIAL PRIMARY KEY,
    sender_name VARCHAR(255) NOT NULL,
    receiver_name TEXT NOT NULL,
    sender_address VARCHAR(255) NOT NULL,
    receiver_address TEXT NOT NULL,
    weight DECIMAL(10, 2) NOT NULL,
    shipping_method VARCHAR(20) CHECK (shipping_method IN ('One-Day', 'Two-Day')),
    cost_per_unit_weight DECIMAL(10, 2) NOT NULL,
    flat_fee DECIMAL(10, 2) NOT NULL,
    tracking_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(20) CHECK (status IN ('Created', 'Shipped', 'In Transit', 'Delivered')) DEFAULT 'Created',
    total_cost DECIMAL(10, 2) NOT NULL DEFAULT 0.00
);