const type = {
  SPRINTER: {
    name: 'SPRINTER',
    payload: 1700,
    dimensions: {
      width: 250,
      length: 300,
      height: 150,
    },
  },
  SS: {
    name: 'SS',
    payload: 2500,
    dimensions: {
      width: 250,
      length: 500,
      height: 170,
    },
  },
  LS: {
    name: 'LS',
    payload: 4000,
    dimensions: {
      width: 350,
      length: 700,
      height: 200,
    },
  },
};

const getTruckTypes = () => {
  const array = [];
  for (const truck in type) {
    if (Object.prototype.hasOwnProperty.call(type, truck)) {
      const name = type[truck].name;
      array.push(name);
    }
  }
  return array;
};

const truckTypesArray = getTruckTypes();

module.exports = {type, truckTypesArray};
