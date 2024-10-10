## Overview

This app is merely a demonstration. The following projects are included in the solution:

1. **AddressBookApp.Server** - A .Net Minimal API project.
2. **addressbookapp.client** - The client application written in Angular.
3. **AddressBookDemo** - SQL Server Database Project. Since the solution is already set up to establish a local database and seed data into it for display purposes, this project should not be published.
4. **AddressBookApp.tests** - NUnit Test Project - Contains the unit tests.
5. **docker-compose** - Used to orchestrate the solution. This will also create a Sql Server container exposed on 1434.
Set "SeedDatabase" to "0" to stop seeding data on application start.

## Running the Application
1. Using **docker compose** is advised; You can do this by running "docker compose up --build" or via Visual Studio. Do not forget to update the "appsettings.json" file accordingly; The application can be accessed at [http://localhost:4200](http://localhost:4200)
2. The following startup projects in Visual Studio can be used to run the application locally:
**AddressBookApp.Server** ( the server project is configured to also start the client ). The program cannot be executed without an existing **SQL Server** instance . You need to adjust the connection strings in the "appsettings.json" file. The application may be accessed via [https://localhost:4200](https://localhost:4200)
3. Deploy on a server
4. Others :)
