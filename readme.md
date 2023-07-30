# BE Test

## TypeScript + Express + PostgreSQL

Clone repo -> jalankan perintah `npm install` -> buat *.env* file pada *root* folder yang berisi

```bash
JWT_PRIVATE_KEY = SOME-RANDOM-KEY
JWT_REFRESH_KEY = ALSO-SOME-RANDOM-KEY
```

Pengaturan database PostgreSQL config -> [Database.ts](src/db/Database.ts).


Skema publik database yang digunakan -> [Database.sql](Database.sql).

Untuk menjalankan project, gunakan perintah `npm run dev`.

