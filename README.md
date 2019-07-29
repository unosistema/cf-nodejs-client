# cf-nodejs-client 

[![Build Status](https://travis-ci.org/prosociallearnEU/cf-nodejs-client.svg)](https://travis-ci.org/prosociallearnEU/cf-nodejs-client) 
[![Dependency Status](https://david-dm.org/prosociallearnEU/cf-nodejs-client.svg)](https://david-dm.org/prosociallearnEU/cf-nodejs-client) 
[![devDependency Status](https://david-dm.org/prosociallearnEU/cf-nodejs-client/dev-status.svg)](https://david-dm.org/prosociallearnEU/cf-nodejs-client#info=devDependencies)
[![Changelog](https://img.shields.io/badge/see-CHANGELOG-red.svg?style=flat-square)](https://github.com/prosociallearnEU/cf-nodejs-client/blob/master/CHANGELOG.md)

[![NPM](https://nodei.co/npm/cf-nodejs-client.png?stars=true)](https://nodei.co/npm/cf-nodejs-client/)

#### Note: This package is not ready for a production App yet.

This project provides a simple client library to interact with the [Cloud Foundry Architecture](https://docs.pivotal.io/pivotalcf/concepts/architecture/):

![ScreenShot](https://raw.githubusercontent.com/prosociallearnEU/cf-nodejs-client/master/docs/cf_architecture_block.png)

Using this library, you could interact with the following platforms: [PWS](https://console.run.pivotal.io)
, [Bluemix](https://console.ng.bluemix.net/) or a [Local Cloud Foundry instance](https://github.com/yudai/cf_nise_installer):

| **[Cloud Controller](http://apidocs.cloudfoundry.org/)**  	| **[UAA](https://github.com/cloudfoundry/uaa)**   	| **Logging & Metrics** 	|
|------------------------ |-----------------------	|------------------------	|
| [Apps](https://prosociallearneu.github.io/cf-nodejs-client/docs/v0.12.0/Apps.html)                    | [Users](https://prosociallearneu.github.io/cf-nodejs-client/docs/v0.12.0/UsersUAA.html)             	    | [Logs](https://prosociallearneu.github.io/cf-nodejs-client/docs/v0.12.0/Logs.html)                   	|
| [Buildpacks](https://prosociallearneu.github.io/cf-nodejs-client/docs/v0.12.0/BuildPacks.html)              |                    	    |                       	|
| [Domains](https://prosociallearneu.github.io/cf-nodejs-client/docs/v0.12.0/Domains.html)                 |                    	    |                       	|
| [Jobs](https://prosociallearneu.github.io/cf-nodejs-client/docs/v0.12.0/Jobs.html)                    |                    	    |                       	|
| [Organizations](https://prosociallearneu.github.io/cf-nodejs-client/docs/v0.12.0/Organizations.html)           |                    	    |                       	|
| [Organizations Quotas](https://prosociallearneu.github.io/cf-nodejs-client/docs/v0.12.0/OrganizationsQuota.html)     |                    	    |                       	|
| [Routes](https://prosociallearneu.github.io/cf-nodejs-client/docs/v0.12.0/Routes.html)                  |                    	    |                       	|
| [Services](https://prosociallearneu.github.io/cf-nodejs-client/docs/v0.12.0/Services.html) | | |            
| [Service Bindings](https://prosociallearneu.github.io/cf-nodejs-client/docs/v0.12.0/ServiceBindings.html)        |                    	    |                       	|
| [Service Instances](https://prosociallearneu.github.io/cf-nodejs-client/docs/v0.12.0/ServiceInstances.html) | | |            
| [Service Plans](https://prosociallearneu.github.io/cf-nodejs-client/docs/v0.12.0/ServicePlans.html) | | |            
| [Spaces](https://prosociallearneu.github.io/cf-nodejs-client/docs/v0.12.0/Spaces.html)                  |                    	    |                       	|
| [Spaces Quotas](https://prosociallearneu.github.io/cf-nodejs-client/docs/v0.12.0/SpacesQuota.html)            |                    	    |                       	|
| [Stacks](https://prosociallearneu.github.io/cf-nodejs-client/docs/v0.12.0/Stacks.html)                  |                    	    |                       	|
| [User provided Services](https://prosociallearneu.github.io/cf-nodejs-client/docs/v0.12.0/UserProvidedServices.html)  |                    	    |                       	|
| [Users](https://prosociallearneu.github.io/cf-nodejs-client/docs/v0.12.0/Users.html)                   |                    	    |                       	|

# Focus

The development doesn't cover the whole CloudController API. Main areas of development are:

**App life cycle:**

* Create an App
* Upload source code in .zip or .war (Support for Static, Python, PHP, Node.js & JEE)
* Create an User Provided Services
* Associate Apps with an User Provided Services
* Start | Stop an App
* Restage Apps
* Scale Apps
* Simple Logs management
* Remove Apps
* Remove User Provided Services

**SAP Cloud Platform HANA Service life cycle:**

* Start/Stop a HANA Service
* Delete a HANA Service

**PaaS Management:**

* Organization quota
* Organization
* Space
* Services, Service Instances, Service Plans, User provided Services & Service Binding
* UAA Users
* Users

# Getting Started

If you need to interact with a Cloud Foundry platform try this [online tool](https://tonicdev.com/npm/cf-nodejs-client) and use this example:

``` Javascript
"use-strict";

const endpoint = "https://api.cf.eu10.hana.ondemand.com";
const username = "SAPCP_USERNAME";
const password = "SAPCP_PASSWORD";

const CloudController = new (require("cf-nodejs-client")).CloudController(endpoint);
const UsersUAA = new (require("cf-nodejs-client")).UsersUAA;
const Apps = new (require("cf-nodejs-client")).Apps(endpoint);

CloudController.getInfo().then( (result) => {
    UsersUAA.setEndPoint(result.authorization_endpoint);
    return UsersUAA.login(username, password);
}).then( (result) => {
	Apps.setToken(result);
    return Apps.getApps();
}).then( (result) => {
    console.log(result);
}).catch( (reason) => {
    console.error("Error: " + reason);
});

```

Explore the library and if you like the features, use it on your App:

``` Javascript

npm install unosistema/cf-nodejs-client --save

```

# Start/Stop HANA Service

If you need to start/stop a SAP Cloud Platform HANA Service in Cloud Foundry Env. try this example:

``` Javascript
"use-strict";

const endpoint = "https://api.cf.eu10.hana.ondemand.com";
const username = "SAPCP_USERNAME";
const password = "SAPCP_PASSWORD";

const CloudController = new (require("cf-nodejs-client")).CloudController(endpoint);
const UsersUAA = new (require("cf-nodejs-client")).UsersUAA;
//const Apps = new (require("cf-nodejs-client")).Apps(endpoint);
const ServiceInstances = new (require("cf-nodejs-client")).ServiceInstances(endpoint);

CloudController.getInfo().then( (result) => {
    UsersUAA.setEndPoint(result.authorization_endpoint);
    return UsersUAA.login(username, password);
}).then( (result) => {
    
    ServiceInstances.setToken(result);
    return ServiceInstances.start("<YOUR_HANA_SERVICE_ID>");
    //return ServiceInstances.stop("<YOUR_HANA_SERVICE_ID>");
    
}).then( (result) => {
    console.log(result);
}).catch( (reason) => {
    console.error("Error: " + reason);
});

```

# Technical Documentation

[JSDoc](https://prosociallearneu.github.io/cf-nodejs-client/) 

# Testing

This project has a test suite to ensure the reability of this project. Take a look the [Tests cases](https://github.com/jabrena/cf-nodejs-client/tree/master/test/) developed with [Mocha](https://mochajs.org/) & [Chai](http://chaijs.com/api/bdd/) to understand some stuff about [Cloud Foundry](https://www.cloudfoundry.org/)  and the usage of this client. Besides, the project has invested some amount of time in testing phase to be the code with a nice coverage level.

The development has been tested with:

| [Local Instance](https://github.com/yudai/cf_nise_installer) | [PWS](https://console.run.pivotal.io)           | [Bluemix](https://console.ng.bluemix.net/) |
| -------------- |:-------------:| -------:|
| 2.25.0         | 2.47.0        | 2.40.0  |

**Last test:** 2016/01/26

**Test suite:**

``` shell
npm test

```

**Code coverage:**

``` shell
istanbul cover node_modules/mocha/bin/_mocha -- -R spec

```

**Continous integration:**

``` shell
https://travis-ci.org/prosociallearnEU/cf-nodejs-client/

```

# References

* API Docs: http://apidocs.cloudfoundry.org/
* Developer list: https://lists.cloudfoundry.org/archives/list/cf-dev@lists.cloudfoundry.org/
* PWS Console: https://console.run.pivotal.io
* Bluemix Console: https://console.ng.bluemix.net/
* PWS Forum: https://support.run.pivotal.io/forums
* Bluemix Forum: https://developer.ibm.com/answers/
* CF for Beginners: From Zero to Hero http://slides.cf-hero.cloudcredo.io/
* Cloud Foundry CLI with the SAP HANA Service: https://help.sap.com/viewer/cc53ad464a57404b8d453bbadbc81ceb/Cloud/en-US/5330bf0513e24aaabc4b88a55fdb063b.html#loio5330bf0513e24aaabc4b88a55fdb063b__section_vxr_xx5_4fb

## Others references

* Issue management: https://overv.io

# Issues

If you have any question or doubt, please [create an issue](https://github.com/unosistema/cf-nodejs-client/issues). 

# License

Licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).
