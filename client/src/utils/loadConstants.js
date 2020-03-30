export default loadStatus = {
    NEW: "NEW",
    POSTED: "POSTED",
    ASSIGNED: "ASSIGNED",
    SHIPPED: "SHIPPED"
};

export default loadState = {
    EN_ROUTE_TO_PICK_UP: "En route to Pick Up",
    ARRIVED_TO_PICK_UP: "Arrived to Pick Up",
    EN_ROUTE_TO_DELIVERY: "En route to delivery",
    ARRIVED_TO_DELIVERY: "Arrived to delivery"
};

export default logMessage = {
    POSTING_LOAD: "Posting a load...\nLoad status: POSTED",
    DRIVER_NOT_FOUND: "Driver was not found...\nLoad status: NEW",
    DRIVER_FOUND: "Driver was found...\n Load status: ASSIGNED",
    EN_ROUTE_TO_PICKUP: "...En route to Pick Up...",
    ARRIVED_TO_PICKUP: "...Arrived to Pick Up...",
    EN_ROUTE_TO_DELIVERY: "...En route to Delivery...",
    ARRIVED_TO_DELIVERY: "...Arrived to Delivery..."
};
