1. Copy .env.example and set your tokens
2. docker build --pull -f .infrastructure/Dockerfile . -t prjctr-monitoring-user-metrics:latest
3. docker run prjctr-monitoring-user-metrics:latest