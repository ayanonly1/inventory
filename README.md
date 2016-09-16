Inventory Management
====================

PreRequest

1. Node install
2. Bower install - 'npm install -g bower'
3. mongoDB install and started

======================================

Steps to start the server

1. run 'npm install' to install the dependency
2. run 'bower install' to install the dependency
3. run 'gulp dev' to start the server (the server will run with localhost:3000)

======================================
Adding HTML files

Add any html files in the 'webApp/templates/' folder and add the routing to the 'webAppNg/routes.js'

======================================
Adding Css to the application

Add any style sheet for any pages with proper file and extension '.styl' in the folder 'webAppStyl'
gulp will automatically build css and write it to the 'webApp/assets/css/app.css'
======================================

Adding Angular controller and services

Add angular Controller and services with proper name inside 'webAppNg' folder

=======================================

Adding Database model

Add respective database model with proper name inside models folder.

=======================================

Note: server will restart automatically if any file changes other than gulp and webApp
      Build process is also automatic.
