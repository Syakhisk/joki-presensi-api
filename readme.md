# joki-presensi
---

## Ini apaan

`joki-presensi` adalah sebuah bot automasi absen untuk [presensi.its.ac.id](http://presensi.its.ac.id). Dibuat karena saya mager absen manual soalnya ribet terlalu banyak yang harus di klik.


## How it works

`joki-presensi` memiliki server yang digunakan untuk melakukan [web-scrapping](https://www.dewaweb.com/blog/web-scraping-panduan-dan-teknik-tekniknya/). Teknik scrapping ini digunakan untuk menyimulasikan input yang dilakukan oleh user (mengisi form, meng-klik tombol, dsb)


## Aman gak?

> "Wah ini scam buat ngumpulin email sama password akun kita"

project ini open-source brow, source code nya bisa diliat di github eug untuk [server](http://github.com/Syakhisk/joki-presensi-api) dan [front-end](http://github.com/Syakhisk/joki-presensi-site)nya. Di project ini juga gak ada database yang dipake buat storing apapun kecuali untuk tracking berapa kali kalian pake service ini.

## Terus data yang kita input gimana?

Username dan password langsung digunakan untuk login ke form (gak disimpen server), dan kalo ke-save juga itu masuk ke cookies/cache browser masing-masing [(bisa dihapus)](https://www.google.com/search?q=clear+cookies+and+cache+browser). Kalo data kelas, disimpen di browser juga pake [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---
Project built with [next.js](https://nextjs.org/) hosted at [vercel](https://vercel.com) and [heroku](https://heroku.com) (server)

---
## Contact me
📧: mail.syakhisk@gmail.com