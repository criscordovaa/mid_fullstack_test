#!/bin/bash
docker exec -it -w /var/www/html backend-server bash -c "sudo chmod 777 storage -R"
