# Ioredis bug

This basic nextjs implementation with redis will get into a loop of 
``` MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 close listeners added to [Socket]. MaxListeners is 10. Use emitter.setMaxListeners() to increase limit```
warnings.

## How to reproduce

1. Install docker
2. Start Redis and Nextjs with `docker compose up`
