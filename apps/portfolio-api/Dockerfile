# Use the official .NET SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the project file and restore dependencies
COPY Portfolio.PortfolioApi.csproj ./
RUN dotnet restore Portfolio.PortfolioApi.csproj

# Copy the source code and build the application
COPY . .
RUN dotnet build Portfolio.PortfolioApi.csproj -c Release -o /app/build

# Publish the application
RUN dotnet publish Portfolio.PortfolioApi.csproj -c Release -o /app/publish

# Use the official .NET runtime image for the final stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy the published application from the build stage
COPY --from=build /app/publish .

# Expose the port the app runs on
EXPOSE 8080

# Set the entry point for the container
ENTRYPOINT ["dotnet", "Portfolio.PortfolioApi.dll"]