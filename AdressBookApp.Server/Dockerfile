#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
#EXPOSE 8081



FROM mcr.microsoft.com/dotnet/sdk:8.0  AS build
#Debug purpose - to be able to start the demo with docker or with one click
RUN apt-get update
RUN apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash
RUN apt-get -y install nodejs
RUN npm install -g @angular/cli
#
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["AdressBookApp.Server/AdressBookApp.Server.csproj", "AdressBookApp.Server/"]
COPY ["adressbookapp.client/adressbookapp.client.esproj", "adressbookapp.client/"]
RUN dotnet restore "./AdressBookApp.Server/AdressBookApp.Server.csproj"
COPY . .
WORKDIR "/src/AdressBookApp.Server"
RUN dotnet build "./AdressBookApp.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./AdressBookApp.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AdressBookApp.Server.dll"]
