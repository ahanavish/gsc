FROM python:3.9-slim-buster

WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the rest of the application code
COPY . /app

# Expose port 5000 for the Flask app
EXPOSE 5000

# Set the Flask app environment variables
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# Start the Flask app using the "flask run" command
CMD ["flask", "run"]