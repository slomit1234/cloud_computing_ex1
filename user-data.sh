#!/bin/bash
# Update the instance
yum update -y

# Install unzip and AWS CLI
yum install unzip aws-cli -y

# Install Node.js (using Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
nvm install node

# Replace '<your-package-path>' with the path to your package.zip in S3
aws s3 cp s3://slomitas-my-media-server-backend/package.zip /home/ec2-user/package.zip

# Unzip the package
unzip /home/ec2-user/package.zip -d /home/ec2-user/app

# Change directory to where the app was unzipped
cd /home/ec2-user/app

# Install NPM packages
npm install

# Start the Express app
# (ensure your package.json has a start script
# or replace this with the command to run your app)
npm start
