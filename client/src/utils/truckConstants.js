const truckStatus = {
    FREE: "FREE",
    IS: "IN SERVICE",
    OL: "ON LOAD"
};

const type = {
    SPRINTER: {
        name: "Sprinter",
        payload: 1700,
        dimensions: {
            width: 250,
            length: 300,
            height: 150
        }
    },
    SS: {
        name: "Small Straight",
        payload: 2500,
        dimensions: {
            width: 250,
            length: 500,
            height: 170
        }
    },
    LS: {
        name: "Large Straight",
        payload: 4000,
        dimensions: {
            width: 350,
            length: 700,
            height: 200
        }
    }
};

export default { truckStatus: truckStatus, type: type };
