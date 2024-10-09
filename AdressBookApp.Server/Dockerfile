FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
#EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0  AS build
#Debug purpose - to be able to start the demo with docker or with one click
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs
RUN npm install -g @angular/cli
#
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["AdressBookApp.Server/AddressBookApp.Server.csproj", "AdressBookApp.Server/"]
RUN dotnet restore "./AdressBookApp.Server/AddressBookApp.Server.csproj"
COPY . .
WORKDIR "/src/AdressBookApp.Server"
RUN dotnet build "./AddressBookApp.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./AddressBookApp.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AddressBookApp.Server.dll"]
