echo "start stop all"
forever stopall

echo "
start app"
forever start ./bin/www

echo "
list apps"
forever list

sleep 3

echo "
log:"
cat "$(forever list | grep -oP '/\b\S+\.log')"
