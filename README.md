# excalidraw-storage-backend

This is a reimplementation of [excalidraw-json](https://github.com/excalidraw/excalidraw-json) suitable for self hosting you own instance of Excalidraw.

It can be used with [kiliandeca/excalidraw-fork](https://gitlab.com/kiliandeca/excalidraw-fork)

[DockerHub kiliandeca/excalidraw-storage-backend](https://hub.docker.com/r/kiliandeca/excalidraw-storage-backend)

## Environement Variables

| Name            | Description                                                  | Default value    |
| --------------- | ------------------------------------------------------------ | ---------------- |
| `PORT`          | Server listening port                                        | 8080             |
| `GLOBAL_PREFIX` | API global prefix for every routes                           | `/api/v2`        |
| `STORAGE_URI`   | [Keyv](https://github.com/lukechilds/keyv) connection string | `""` (in memory) |

Availabe Keyv storage adapter: redis, mongo, postgres and mysql
