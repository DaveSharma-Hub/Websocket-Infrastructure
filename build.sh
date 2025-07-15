#!/bin/bash

#get the vars from user input and verify

cd lambdaToClient
#build and zip it up

cd lambdaToServer
#build and zip it up

#copy zip lambdas to terraform folder

cd terraform

#apply with variables
terraform init
terraform apply --auto-approve
