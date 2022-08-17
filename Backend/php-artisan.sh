#!/bin/bash

args="$@"
command="php artisan $args"
echo "$command"
docker exec -it -w /var/www/html backend-server bash -c "sudo -u devuser /bin/bash -c \"$command"\"
