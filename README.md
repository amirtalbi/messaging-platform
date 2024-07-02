# Messaging Platform

This is the README file for the Messaging Platform project. It provides instructions on how to set up and run the project locally.

## Prerequisites

Before running the project, make sure you have the following installed:

- Docker
- Docker Compose

## Getting Started

To get started with the Messaging Platform project, follow these steps:

1. Clone the repository from GitHub:
  ```
  git clone https://github.com/amirtalbi/messaging-platform.git
  ```

2. Navigate to the project directory:
  ```
  cd messaging-platform
  ```

3. Start the Docker containers using Docker Compose:
  ```
  docker-compose up -d
  ```

4. Access the application locally by opening the following URL in your web browser:
  ```
  http://localhost:4200
  ```

## Services

The Messaging Platform project consists of the following services:

- RabbitMQ: A message broker service running on port 5672 for message queuing and routing. The RabbitMQ management interface is accessible at http://localhost:15672.

- PostgreSQL: A relational database service running on port 5432. The database name is `messaging`, and the default username and password are both `postgres`.

- GraphQL API: A GraphQL API service running on port 3000 at http://localhost:3000/graphql. This service depends on RabbitMQ and PostgreSQL.

## Additional Information

For more information about the Messaging Platform project, please refer to the [GitHub repository](https://github.com/amirtalbi/messaging-platform).
