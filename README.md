# uuid.app

> Simple UUID generator app.

## Web

A simple interface that generates a V4 UUID.

> [uuid.app](https://uuid.app)

## API

Exposes an API to generate multiple UUIDs as V1 or V4.

```
curl -H "accept: application/json" \
  https://uuid.app/api/v1?count=5
```

```
curl -H "accept: application/json" \
  https://uuid.app/api/v4?count=5
```
