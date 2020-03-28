const truckStatus = {
  FREE: 'FREE',
  IN_SERVICE: 'IS',
  ON_LOAD: 'OL',
};

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

const getEnum = (object, propertyName) => {
  const array = [];
  let name;
  for (const property in object) {
    if (Object.prototype.hasOwnProperty.call(object, property)) {
      if (propertyName) {
        const secondLayer = object[property];
        name = secondLayer[propertyName];
      } else {
        name = object[property];
      }
      array.push(name);
    }
  }
  return array;
};

const truckTypesEnum = getEnum(type, 'name');
const truckStatusEnum = getEnum(truckStatus);

module.exports = {truckStatus, type, truckTypesEnum, truckStatusEnum};
