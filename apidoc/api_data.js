define({ "api": [
  {
    "type": "patch",
    "url": "/api/drivers/:id/trucks/:sid",
    "title": "Assign truck to Driver",
    "name": "AssignTruck",
    "group": "Drivers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Driver id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "truck",
            "description": "<p>id of assigned truck.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TruckNotFound",
            "description": "<p>Truck with <code>id</code> doesn't exist</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/drivers.js",
    "groupTitle": "Drivers"
  },
  {
    "type": "patch",
    "url": "/api/drivers/:id/loads",
    "title": "Change state of assigned load",
    "name": "ChangeLoadState",
    "group": "Drivers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Driver id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>load state</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Successfully updated state.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/drivers.js",
    "groupTitle": "Drivers"
  },
  {
    "type": "post",
    "url": "/api/drivers/:id/trucks",
    "title": "Create new truck",
    "name": "CreateTruck",
    "group": "Drivers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Truck type</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Truck name</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "truck",
            "description": "<p>New created truck.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/drivers.js",
    "groupTitle": "Drivers"
  },
  {
    "type": "delete",
    "url": "/api/drivers/:id/trucks/:sid",
    "title": "Delete truck",
    "name": "DeleteTruck",
    "group": "Drivers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Driver id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Successfully deleted.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TruckNotFound",
            "description": "<p>Truck with <code>id</code> doesn't exist</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/drivers.js",
    "groupTitle": "Drivers"
  },
  {
    "type": "get",
    "url": "/api/drivers/:id",
    "title": "Get driver profile",
    "name": "GetDriver",
    "group": "Drivers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Driver id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "driver",
            "description": "<p>full info about driver profile.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DriverNotFound",
            "description": "<p>The <code>id</code> of the Driver was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/drivers.js",
    "groupTitle": "Drivers"
  },
  {
    "type": "get",
    "url": "/api/drivers/:id/loads",
    "title": "Get driver's load",
    "name": "GetDriverLoad",
    "group": "Drivers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Driver id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "load",
            "description": "<p>Driver's assigned load.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadNotFound",
            "description": "<p>There is no load yet.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/drivers.js",
    "groupTitle": "Drivers"
  },
  {
    "type": "get",
    "url": "/api/drivers/:id/trucks",
    "title": "Get all driver's trucks",
    "name": "GetTrucks",
    "group": "Drivers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Driver id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "truck",
            "description": "<p>Array of Driver's trucks.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/drivers.js",
    "groupTitle": "Drivers"
  },
  {
    "type": "put",
    "url": "/api/drivers/:id/trucks/:sid",
    "title": "Update truck info",
    "name": "UpdateTruck",
    "group": "Drivers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Driver id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Truck name</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "truck",
            "description": "<p>updated truck instance.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TruckNotFound",
            "description": "<p>Truck with <code>id</code> doesn't exist</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/drivers.js",
    "groupTitle": "Drivers"
  },
  {
    "type": "post",
    "url": "/api/shippers/:id/loads",
    "title": "Create new load",
    "name": "CreateLoad",
    "group": "Shippers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Shipper id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Load name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Load description</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "dimensions",
            "description": "<p>Load dimensions</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "dimensions.height",
            "description": "<p>Load height</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "dimensions.width",
            "description": "<p>Load width</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "dimensions.length",
            "description": "<p>Load length</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "payload",
            "description": "<p>Load payload</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "deliveryAddress",
            "description": "<p>Load delivery address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "deliveryAddress.city",
            "description": "<p>delivery address city</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "deliveryAddress.street",
            "description": "<p>delivery address street</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "deliveryAddress.zip",
            "description": "<p>delivery address zip code</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "pickUpAddress",
            "description": "<p>Load pick up address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pickUpAddress.city",
            "description": "<p>pick up address city</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pickUpAddress.street",
            "description": "<p>pick up address street</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pickUpAddress.zip",
            "description": "<p>pick up address zip code</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "truck",
            "description": "<p>New created load.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/shippers.js",
    "groupTitle": "Shippers"
  },
  {
    "type": "delete",
    "url": "/api/shippers/:id/loads/:sid",
    "title": "Delete load",
    "name": "DeleteLoad",
    "group": "Shippers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Shipper id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sid",
            "description": "<p>Load id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Load was successfully deleted</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadStatusNotNew",
            "description": "<p>It is allowed to delete loads only with status &quot;NEW&quot;</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadNotFound",
            "description": "<p>Load not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/shippers.js",
    "groupTitle": "Shippers"
  },
  {
    "type": "delete",
    "url": "/api/shippers/:id",
    "title": "Delete shipper profile",
    "name": "DeleteShipper",
    "group": "Shippers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Shipper id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Shipper was successfully deleted.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ShipperNotFound",
            "description": "<p>Not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/shippers.js",
    "groupTitle": "Shippers"
  },
  {
    "type": "get",
    "url": "/api/shippers/:id/loads/assigned",
    "title": "Get list of loads that assigned to drivers",
    "name": "GetAssignedLoads",
    "group": "Shippers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Shipper id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "loads",
            "description": "<p>list of loads that assigned to drivers.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/shippers.js",
    "groupTitle": "Shippers"
  },
  {
    "type": "get",
    "url": "/api/shippers/:id/loads/(:query)?",
    "title": "Get list of all loads",
    "name": "GetLoads",
    "group": "Shippers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Shipper id</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "query",
            "description": "<p>query params</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "query.filter",
            "description": "<p>load status for filtering loads</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "query.page",
            "description": "<p>page number for pagination</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "loads",
            "description": "<p>list of shipper's loads.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "meta",
            "description": "<p>additional data about load list.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "meta.pagination",
            "description": "<p>pagination info (currentPage, totalPages etc).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "meta.filter",
            "description": "<p>load status for filtering on client side.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n \"meta\": {\n     \"pagination\": {\n         \"totalItems\": 16,\n         \"currentPage\": 1,\n         \"pageSize\": 10,\n         \"totalPages\": 2,\n         \"startPage\": 1,\n         \"endPage\": 2,\n         \"startIndex\": 0,\n         \"endIndex\": 9,\n         \"pages\": [\n             1,\n             2\n         ]\n     },\n     \"filter\": \"\"\n },\n \"loads\": [\n     {\n         \"dimensions\": {\n             \"width\": 119,\n             \"height\": 123,\n             \"length\": 123\n         },\n         \"...\":\"...\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/shippers.js",
    "groupTitle": "Shippers"
  },
  {
    "type": "get",
    "url": "/api/shippers/:id",
    "title": "Get shipper profile",
    "name": "GetShipper",
    "group": "Shippers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Shipper id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "shipper",
            "description": "<p>full info about shipper profile.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ShipperNotFound",
            "description": "<p>The <code>id</code> of the Shipper was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/shippers.js",
    "groupTitle": "Shippers"
  },
  {
    "type": "get",
    "url": "/api/shippers/:id/loads/:sid/logs",
    "title": "Get shipping info",
    "name": "GetShippingInfo",
    "group": "Shippers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Shipper id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sid",
            "description": "<p>Load id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "logs",
            "description": "<p>list of load's logs.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadNotFound",
            "description": "<p>Load not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/shippers.js",
    "groupTitle": "Shippers"
  },
  {
    "type": "post",
    "url": "/api/shippers/:id/loads/:sid",
    "title": "Post load",
    "name": "PostLoad",
    "group": "Shippers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Shipper id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sid",
            "description": "<p>Load id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Load was successfully posted. Driver is assigned.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DriverNotFound",
            "description": "<p>Driver not found. Load state changed to NEW.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadNotFound",
            "description": "<p>Load not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadStatusNotNew",
            "description": "<p>It is allowed to post loads only with status &quot;NEW&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/shippers.js",
    "groupTitle": "Shippers"
  },
  {
    "type": "put",
    "url": "/api/shippers/:id/loads/:sid",
    "title": "Update load info",
    "name": "UpdateLoad",
    "group": "Shippers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Shipper id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Load name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Load description</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "dimensions",
            "description": "<p>Load dimensions</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "dimensions.height",
            "description": "<p>Load height</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "dimensions.width",
            "description": "<p>Load width</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "dimensions.length",
            "description": "<p>Load length</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "payload",
            "description": "<p>Load payload</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "deliveryAddress",
            "description": "<p>Load delivery address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "deliveryAddress.city",
            "description": "<p>delivery address city</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "deliveryAddress.street",
            "description": "<p>delivery address street</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "deliveryAddress.zip",
            "description": "<p>delivery address zip code</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "pickUpAddress",
            "description": "<p>Load pick up address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pickUpAddress.city",
            "description": "<p>pick up address city</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pickUpAddress.street",
            "description": "<p>pick up address street</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pickUpAddress.zip",
            "description": "<p>pick up address zip code</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "load",
            "description": "<p>updated load instance.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadStatusNotNew",
            "description": "<p>It is allowed to update loads only with status &quot;NEW&quot;</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadNotFound",
            "description": "<p>Load not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/shippers.js",
    "groupTitle": "Shippers"
  },
  {
    "type": "post",
    "url": "/api/users",
    "title": "Registrate new user",
    "name": "PostUser",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password for account</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User role</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>registrated User.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EmailAlreadyRegistered",
            "description": "<p>Email is already exist in the system</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/registration.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/api/users/login",
    "title": "Login user",
    "name": "PostUser",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password for account</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>signed in User.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongEmail",
            "description": "<p>Account with email doesn't exist in the system</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongPassword",
            "description": "<p>Wrong password</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/registration.js",
    "groupTitle": "Users"
  },
  {
    "type": "patch",
    "url": "/api/users/:id",
    "title": "Update password",
    "name": "UpdatePassword",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>new password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Password was successfully updated!</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/api/users/:id/avatar",
    "title": "Upload avatar",
    "name": "UploadAvatar",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User id</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "file",
            "description": "<p>image file</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>path to uploaded image</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/api/weather",
    "title": "Get actual weather info",
    "name": "GetWeather",
    "group": "Weather",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "weather",
            "description": "<p>weather info.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weather.temp",
            "description": "<p>temperature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "weather.main",
            "description": "<p>weather name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "weather.description",
            "description": "<p>weather description.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "weather.city",
            "description": "<p>city name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "weather.icon",
            "description": "<p>image url for displaying current weather.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/weather.js",
    "groupTitle": "Weather"
  }
] });
