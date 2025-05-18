import {Request, Response} from 'express';
import pool from '../database/db';
import { OneDay } from '../models/oneday';
import { TwoDays } from '../models/two_days';

//Main form 
export const getAddPackage = async(req: Request, res: Response) => {
    res.render('main');
}
//View all records
// export const getRecords = async(req: Request, res: Response) =>{
//     res.render('records');
// }
//Print Label
export const getPrintLabel = async(req: Request, res: Response) =>{
    res.render('printl');
}
//Success page
// export const getSuccess = async(req: Request, res: Response) =>{
//     res.render('success');
// }
export const getSuccess = async (req: Request, res: Response) => {
    const { tracking_number } = req.query;
    res.render('success', { tracking_number });
};

export const getCalculate = async(req: Request, res: Response) =>{
    res.render('calculate');
}

//Insert data into the database
// export const addPackage = async(req: Request, res: Response) => {
//     const {sender_name, receiver_name, sender_address, receiver_address, weight, shipping_method, 
//     cost_per_unit_weight, flat_fee, tracking_number, status} = req.body;

//     //set flat fee
//     let flatFee = 0;
//     if (shipping_method === 'One Day') {
//         flatFee = 10;
//     }
//     else if (shipping_method === 'Two Days') {
//         flatFee = 7;
//     }

//     //query to insert data into the database
//     const query = `INSERT INTO packages (sender_name, receiver_name, sender_address, receiver_address, weight, shipping_method, 
//     cost_per_unit_weight, flat_fee, tracking_number, status)
//     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING package_id`;


// }

// export const addPackage = async(req: Request, res: Response) => {
//     try {
//         const {
//             sender_name,
//             receiver_name,
//             sender_address,
//             receiver_address,
//             weight,
//             shipping_method,
//         } = req.body;

//         const cost_per_unit_weight = 2.5;

//         // Set flat fee based on shipping method
//         let flat_fee = 0;
//         if (shipping_method === 'One-Day') flat_fee = 10;
//         else if (shipping_method === 'Two-Day') flat_fee = 7;

//         const generateTrackingNumber = (): string => {
//             const random = Math.floor(1000 + Math.random() * 9000);
//             return `PKG-${Date.now()}-${random}`;
//         };

//         // Calculate total cost
//         const total_cost = parseFloat(weight) * cost_per_unit_weight + flat_fee;

//         const tracking_number = generateTrackingNumber();

//         const query = `
//             INSERT INTO packages (
//                 sender_name, receiver_name, sender_address, receiver_address,
//                 weight, shipping_method, cost_per_unit_weight, flat_fee,
//                 tracking_number, total_cost
//             )
//             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
//             RETURNING package_id
//         `;

//         const values = [
//             sender_name, receiver_name, sender_address, receiver_address,
//             weight, shipping_method, cost_per_unit_weight, flat_fee,
//             tracking_number, total_cost
//         ];

//         const result = await pool.query(query, values);
//         const newId = result.rows[0].package_id;

//         // Redirect to success page
//         res.redirect('/success'); 
//     } catch (err) {
//         console.error('Error inserting package:', err);
//         res.status(500).send('Server Error');
//     }
// };
export const addPackage = async(req: Request, res: Response) => {
    try {
        const {
            sender_name,
            receiver_name,
            sender_address,
            receiver_address,
            weight,
            shipping_method,
        } = req.body;

        const cost_per_unit_weight = 2.5;

        // Set flat fee based on shipping method
        let flat_fee = 0;
        if (shipping_method === 'One-Day') flat_fee = 10;
        else if (shipping_method === 'Two-Day') flat_fee = 7;

        const generateTrackingNumber = (): string => {
            const random = Math.floor(1000 + Math.random() * 9000);
            return `PKG-${Date.now()}-${random}`;
        };

        // Calculate total cost
        const total_cost = parseFloat(weight) * cost_per_unit_weight + flat_fee;

        const tracking_number = generateTrackingNumber();

        const query = `
            INSERT INTO packages (
                sender_name, receiver_name, sender_address, receiver_address,
                weight, shipping_method, cost_per_unit_weight, flat_fee,
                tracking_number, total_cost
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING package_id
        `;

        const values = [
            sender_name, receiver_name, sender_address, receiver_address,
            weight, shipping_method, cost_per_unit_weight, flat_fee,
            tracking_number, total_cost
        ];

        const result = await pool.query(query, values);
        const newId = result.rows[0].package_id;

        // Redirect to success page
        // res.redirect('/success'); 
        res.redirect(`/success?tracking_number=${tracking_number}`);

    } catch (err) {
        console.error('Error inserting package:', err);
        res.status(500).send('Server Error');
    }
};

//retrieve data
export const getRecords = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM packages ORDER BY package_id DESC');
        const packages = result.rows;
        res.render('records', { packages }); 
    } catch (err) {
        console.error('Error fetching packages:', err);
        res.status(500).send('Server Error');
    }
};
export const updateStatus = async (req: Request, res: Response) => {
    try {
        const trackingNumber = req.params.trackingNumber;
        const { status } = req.body;

        const query = `
            UPDATE packages 
            SET status = $1 
            WHERE tracking_number = $2
        `;

        await pool.query(query, [status, trackingNumber]);

        res.redirect('/records'); // Redirect back to tracking page
    } catch (err) {
        console.error('Error updating status:', err);
        res.status(500).send('Server Error');
    }
};
//get track data
// export const getPackageByTracking = async (req: Request, res: Response) => {
//     try {
//         const { trackingNumber } = req.params;
//         const result = await pool.query(
//             'SELECT * FROM packages WHERE tracking_number = $1',
//             [trackingNumber]
//         );

//         if (result.rows.length === 0) {
//             return res.status(404).json({ error: 'Package not found' });
//         }
//         // res.redirect('/printl');
//         res.json(result.rows[0]);
//     } catch (err) {
//         console.error('Error fetching package:', err);
//         res.status(500).json({ error: 'Server error' });
//     }
// };
export const getPackageByTracking = async (req: Request, res: Response): Promise<void> => {
    try {
        const { trackingNumber } = req.params;
        const result = await pool.query(
            'SELECT * FROM packages WHERE tracking_number = $1',
            [trackingNumber]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Invalid Package ID' });
            return;
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching package:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

