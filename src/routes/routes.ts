import express from "express";
import {getAddPackage, getRecords, getPrintLabel, getSuccess, addPackage, updateStatus, getPackageByTracking, getCalculate} from '../controllers/controllers';

const route = express.Router();

//Home route
route.get('/', getAddPackage);
route.post('/new', addPackage);

//track page route 
route.get('/records', getRecords);
route.post('/update-status/:trackingNumber', updateStatus);
// route.post('/records', Records);

//viewall records route 
route.get('/printlabel', getPrintLabel);

route.get('/track/:trackingNumber', getPackageByTracking);

//success page route 
route.get('/success', getSuccess);

//get calculate 
route.get('/calculate', getCalculate);

export default route;