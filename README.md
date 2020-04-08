# Krevetochka Delivery
Uber-like service for delivering loads. 
Shippers create loads and post them. An app is looking for a free truck and assign posted load to a driver. 
Drivers add trucks to their profile, assign to themselves one of them and receive a load to delivery. 

## Project setup

### Run server
```
npm start
```

### Run client
```
cd client
npm run serve
```

### Software that should be installed to run app
- Node.js
- MongoDB

### External Services that app uses
- [Amazon S3](https://aws.amazon.com/ru/) for uploading avatar;
- [OpenWeatherMap](https://openweathermap.org/) for weather info;


## App criterias

### Acceptance
- [x] Driver is able to register in the system;
- [x] Driver is able to login into the system;
- [x] Driver is able to view his profile info;
- [x] Driver is able to change his account password;
- [x] Driver is able to add trucks;
- [x] Driver is able to view created trucks;
- [x] Driver is able to assign truck to himself;
- [x] Driver is able to update not assigned to him trucks info;
- [x] Driver is able to delete not assigned to him trucks;
- [x] Driver is able to view assigned to him load;
- [x] Driver is able to interact with assigned to him load;
- [x] Shipper is able to register in the system;
- [x] Shipper is able to login into the system;
- [x] Shipper is able to view his profile info;
- [x] Shipper is able to change his account password;
- [x] Shipper is able to delete his account;
- [x] Shipper is able to create loads in the system;
- [x] Shipper is able to view created loads;
- [x] Shipper is able to update loads with status ‘NEW';
- [x] Shipper is able to delete loads with status 'NEW';
- [x] Shipper is able to post a load;
- [x] Shipper is able to view shipping info;

### Optional

- [x] User is able to attach photo to his profile;
- [x] Any system user can see weather information which should be stored on server side;
- [x] Ability to filter loads by status;
- [x] Pagination for loads;
- [x] [UI] User can interact with application through simple UI application(Vue.js);
- [x] [UI] Any system user is able to interact with the system UI using a mobile phone without any issues;

### Rockstar
- [x] Driver and Shipper can contact each other through simple chat related to load;
