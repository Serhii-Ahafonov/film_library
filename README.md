# MovieNow App

### In order to start the app you will need to set up docker container.
### You need to create docker image:

```bash
docker build  -t your_url/movies
```

### After that, you can start container:
```bash
docker run --name movies -p 3000:3000 -e API_URL=YOUR_API_URL -d your_url/movies
```

### MovieNow App would be available at port http://localhost:3000
