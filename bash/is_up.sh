
# is_up.sh
# Checks if an http server is up. Does the check 10 times waiting for 1s between tries
# Useful to check if a conteinarized service is running for real.
#  
attempt=0
until $(curl --output /dev/null --silent --head --fail http://google.com); do
  printf '.'
  if [ $attempt -eq 10 ]; then
    exit 1
  fi
  attempt=`expr $attempt + 1`
  sleep 1
done
