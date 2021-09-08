# excalidraw-storage-backend

## Environement Variables

| Name            | Description                                                  | Default value    |
| --------------- | ------------------------------------------------------------ | ---------------- |
| `PORT`          | Server listening port                                        | 8080             |
| `GLOBAL_PREFIX` | API global prefix for every routes                           | `/api/v2`        |
| `STORAGE_URI`   | [keyv](https://github.com/lukechilds/keyv) connection string | `""` (in memory) |

Availabe storage adapter: redis, mongo, postgres and mysql
