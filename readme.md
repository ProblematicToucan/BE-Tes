# BE Test

## TypeScript + Express + PostgreSQL

Clone repo -> jalankan perintah `npm install` -> buat *.env* file pada *root* folder yang berisi

```bash
JWT_PRIVATE_KEY = SOME-RANDOM-KEY
JWT_REFRESH_KEY = ALSO-SOME-RANDOM-KEY
```

Pengaturan database projek ini (PostgreSQL) dapat dilihat pada -> [`src/db/Database.ts`](src/db/Database.ts).


Projek ini meggunakan PostgreSQL pre-define schema `public`. Skema tabel yang digunakan dalam project ini dapat dilihat pada -> [`Database.sql`](Database.sql).

Untuk menjalankan project, gunakan perintah `npm run dev`.

Postman collection untuk semua endpoints dapat ditemukan pada [`BE-Express-API.postman_collection.json`](BE-Express-API.postman_collection.json).
