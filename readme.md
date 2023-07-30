# BE Test

## TypeScript + Express + PostgreSQL

### Persiapan

Clone repo -> jalankan perintah `npm install` -> buat *.env* file pada *root* folder yang berisi

```bash
JWT_PRIVATE_KEY = SOME-PRIVATE-KEY
JWT_REFRESH_KEY = ALSO-SOME-PRIVATE-KEY
```

Pengaturan database projek ini (PostgreSQL) dapat dilihat pada -> [`src/db/Database.ts`](src/db/Database.ts).

Projek ini meggunakan PostgreSQL pre-define schema `public`. Skema tabel yang digunakan dalam projek ini dapat dilihat pada -> [`Database.sql`](Database.sql).

Untuk menjalankan project, gunakan perintah `npm run dev`.

Postman collection untuk semua endpoints dapat ditemukan pada [`BE-Express-API.postman_collection.json`](BE-Express-API.postman_collection.json).

### Endpoint

Proyek ini memiliki 2 jenis endpoint:

1. Public Endpoint: Digunakan untuk login dan register.
2. Authenticated Endpoint: Digunakan untuk operasi CRUD terkait state.

Pastikan telah login dan mendapatkan token untuk mengakses authenticated endpoint.