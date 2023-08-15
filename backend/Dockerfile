# Use the official Go image as the base image
FROM golang

# Set the working directory in the container
WORKDIR /app

# Copy the backend code to the container
COPY . .

# Build the Go application
RUN go build -o main .

# Start the Go backend server
CMD ["./main"]
