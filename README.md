<p align="center">
  <a href="https://scholarshipandcourse.herokuapp.com/">
    <img src="https://github.com/hilmialmuhtadeb/scholarship-and-course/blob/main/src/assets/images/snc1.png" alt="Logo" width=120 height=120>
  </a>

  <h3 align="center">Scholarship and Course API</h3>

  <p align="center">
    API for scholarship and course application.
  </p>
</p>


## Table of contents

- [Get All Scholarships](#get-all-scholarships)
- [Get Detail Scholarship](#get-detail-scholarship)
- [Get Favorited Scholarship](#get-favorited-scholarship)
- [Get Scholarship Poster](#get-scholarship-poster)
- [Add New Scholarship](#add-new-scholarship)
- [Add Scholarship to Favorite](#add-scholarship-to-favorite)
- [Update Scholarship](#update-scholarship)
- [Delete Scholarship](#delete-scholarship)
- [Remove Scholarship from Favorited](#remove-scholarship-from-favorited)
- [Register User](#register-user)
- [Login User](#login-user)
- [Logout User](#logout-user)
- [Get Authenticated User](#get-authenticated-user)
- [Credit](#credit)


## Get All Scholarships

Mendapatkan seluruh informasi beasiswa

- ### URL

  /v1/scholarships
  
- ### Query

  - category :
  
     value
     - 1 : kategori beasiswa pendidikan
     - 2 : kategori beasiswa kursus

- ### Method

  GET

- ### Response

```json
{
    "message": "Berhasil mendapatkan semua informasi beasiswa.",
    "data": [
        {
            "_id": "61c47c2d5676b90016656d2d",
            "title": "Beasiswa Ikan",
            "poster": "images/1640266797002-1247a657fb7ca61cda4214de9c943daaebada7b739fe43a43074c015ba0b4455.jpg",
            "deadline": "2022-01-01T00:00:00.000Z",
            "description": "Lorem Ipsum Dolor Sit Amet",
            "category": 2,
            "author": {
                "user_id": "61c36c4e60ba3d00164b4d18",
                "name": "Jovan Alvado"
            },
            "createdAt": "2021-12-23T13:39:57.009Z",
            "updatedAt": "2021-12-23T13:39:57.009Z",
            "__v": 0
        },
        {
            "_id": "61c430db97f715001631b080",
            "title": "Indosat Ooredoo Digital Camp 2021",
            "poster": "images/1640247515399-2078891783p.jpg",
            "deadline": "2021-12-31T00:00:00.000Z",
            "description": "Indosat Ooredoo Digital Camp (IDCamp) adalah sebuah program beasiswa dari Indosat Ooredoo untuk mencetak developer/programmer muda Indonesia yang siap bersaing di dunia ekonomi digital.\n\nIDCamp merupakan salah satu program Corporate Social Responsibility (CSR) Indosat Ooredoo di pilar Pendidikan Digital sebagai upaya membangun bangsa Indonesia sebagai Digital Nation.\n\nMelanjutkan sukses IDCamp di tahun 2019 dan 2020 yang telah menghasilkan 13.018 developer tersertifikasi, Indosat Ooredoo kembali menggelar IDCamp 2021 yang akan memberikan 20,000 beasiswa belajar coding untuk developer muda Indonesia.\n\nIDCamp 2021 memberikan beasiswa pelatihan coding online di 6 Learning Path (alur belajar) Utama yaitu Android Developer, Front-End Web Developer, iOS Developer, Machine Learning Developer, Multi-Platform App Developer dan Back-End Developer yang tersedia mulai dari level dasar (basic), pemula (beginner), menengah (intermediate), mahir (expert) dan profesional (professional).\n\nTahun ini IDCamp 2021 juga kembali menghadirkan tim fasilitator dan forum diskusi online untuk membantu para peserta menyelesaikan semua modul belajar secara online dan mandiri, mulai level menengah sampai dengan profesional. Selain memberikan pelatihan online, IDCamp juga membuka pelatihan offline (tatap muka) bagi calon-calon developer dengan kebutuhan khusus (difabel).\n\nModul pelatihan online IDCamp dikembangkan oleh Dicoding selaku Google Authorized Training Partners di Indonesia, bekerja sama dengan Indosat Ooredoo dengan memanfaatkan use case yang sering ditemui dalam dunia industri khususnya telekomunikasi dan digital, serta diperkuat dengan metode mentoring secara online.\n\nDi akhir program, Indosat Ooredoo dan Dicoding akan membantu talenta digital terbaik lulusan IDCamp untuk mendapatkan akses pekerjaan.\n\nAlur Belajar Tersedia :\n1. Android Developer\n2. Front-End Web Developer\n3. iOS Developer\n4. Machine Learning Developer\n5. Multi-Platform App Developer\n6. Back-End Developer",
            "category": 2,
            "author": {
                "user_id": "61c35de5475b50844c0ea4fa",
                "name": "Hilmi Almuhtade"
            },
            "createdAt": "2021-12-23T08:18:35.472Z",
            "updatedAt": "2021-12-23T08:18:35.472Z",
            "__v": 0
        }
    ],
    "total_data": 2,
    "per_page": 9,
    "current_page": 1
}
```

## Get Detail Scholarship

Mendapatkan detail informasi beasiswa

- ### URL

  /v1/scholarships/:scholarshipId

- ### Method

  GET

- ### Response

```json
{
    "message": "Berhasil mendapatkan informasi beasiswa.",
    "data": {
        "_id": "61c47c2d5676b90016656d2d",
        "title": "Beasiswa Ikan",
        "poster": "images/1640266797002-1247a657fb7ca61cda4214de9c943daaebada7b739fe43a43074c015ba0b4455.jpg",
        "deadline": "2022-01-01T00:00:00.000Z",
        "description": "Lorem Ipsum Dolor Sit Amet",
        "category": 2,
        "author": {
            "user_id": "61c36c4e60ba3d00164b4d18",
            "name": "Jovan Alvado"
        },
        "createdAt": "2021-12-23T13:39:57.009Z",
        "updatedAt": "2021-12-23T13:39:57.009Z",
        "__v": 0
    }
}
```

## Get Favorited Scholarship

Mendapatkan semua beasiswa yang difavoritkan oleh pengguna

- ### URL

  /v1/favorites/:userId

- ### Method

  GET

- ### Response

```json
{
    "message": "Berhasil mendapatkan informasi beasiswa.",
    "data": [
        {
            "_id": "61c47c2d5676b90016656d2d",
            "title": "Beasiswa Ikan",
            "poster": "images/1640266797002-1247a657fb7ca61cda4214de9c943daaebada7b739fe43a43074c015ba0b4455.jpg",
            "deadline": "2022-01-01T00:00:00.000Z",
            "description": "Lorem Ipsum Dolor Sit Amet",
            "category": 2,
            "author": {
                "user_id": "61c36c4e60ba3d00164b4d18",
                "name": "Jovan Alvado"
            },
            "createdAt": "2021-12-23T13:39:57.009Z",
            "updatedAt": "2021-12-23T13:39:57.009Z",
            "__v": 0
        }
    ]
}
```

## Get Scholarship Poster

Mendapatkan gambar poster dari informasi beasiswa

- ### URL

  /v1/images/:scholarship.poster
  
## Add New Scholarship

Menambahkan informasi beasiswa

- ### URL

  /v1/scholarships

- ### Method

  POST
  
- ### Headers

  Content-Type : multipart/form-data

- ### Body

  - title : string
  - poster : file image
  - deadline : date
  - category : number
  - description : text

- ### Response

```json
{
    "message": "Berhasil menambahkan informasi beasiswa.",
    "data": {
        "_id": "61c4e27044e75cb1bc0031ad",
        "title": "beasiswa glints informatics",
        "poster": "images\\1640292976623-1247a657fb7ca61cda4214de9c943daaebada7b739fe43a43074c015ba0b4455.jpg",
        "deadline": "2021-10-29T00:00:00.000Z",
        "description": "bilia curae nulla dapibus dolor vel est donec odio ",
        "category": 2,
        "createdAt": "2021-12-23T20:56:16.639Z",
        "updatedAt": "2021-12-23T20:56:16.639Z",
        "__v": 0
    }
}
```

## Add Scholarship to Favorite

- ### URL

  /v1/favorites

- ### Method

  POST
  
- ### Headers

  Content-Type : multipart/form-data

- ### Body

  - username : string
  - scholarschipId : ObjectId

- ### Response

```json
{
    "message": "Berhasil menyimpan informasi beasiswa ke favorite.",
    "data": {
        "_id": "61c4debb44e75cb1bc0031ab",
        "username": "hilmialmuhtadeb",
        "scholarshipId": "61c47c2d5676b90016656d2d",
        "createdAt": "2021-12-23T20:40:27.348Z",
        "updatedAt": "2021-12-23T20:40:27.348Z",
        "__v": 0
    }
}
```

## Update Scholarship

Mengubah detail beasiswa

- ### URL

  /v1/scholarships/:scholarshipId

- ### Method

  PATCH
  
- ### Headers

  Content-Type : multipart/form-data

- ### Body

  - title : string
  - poster : file image
  - deadline : date
  - category : number
  - description : text

- ### Response

```json
{
    "message": "Informasi beasiswa berhasil diperbarui",
    "data": {
        "_id": "61c4ebc4318fb084ac375cd9",
        "title": "beasiswa akuarium",
        "poster": "images\\1640295498332-5c8a2166dbfbd8903e112bb8b56e80318bbce952fdbcfb408c4121bc73b813a5.jpg",
        "deadline": "2022-11-10T00:00:00.000Z",
        "description": "lorem ipsum dolor sit amet",
        "category": 1,
        "createdAt": "2021-12-23T21:36:04.039Z",
        "updatedAt": "2021-12-23T21:36:04.039Z",
        "__v": 0
    }
}
```

## Delete Scholarship

Menghapus informasi beasiswa

- ### URL

  /v1/scholarships/:scholarshipId

- ### Method

  DELETE

- ### Response

```json
{
    "message": "Beasiswa berhasil dihapus.",
    "data": {
        "_id": "61c4ebc4318fb084ac375cd9",
        "title": "beasiswa glints informatics",
        "poster": "images\\1640295363979-1e29434802ce1e4aaa7ca8e8d09830cdd3386a82de207c017fe769b3fc334422.jpg",
        "deadline": "2021-10-29T00:00:00.000Z",
        "description": "bilia curae nulla dapibus dolor vel est donec odio ",
        "category": 2,
        "createdAt": "2021-12-23T21:36:04.039Z",
        "updatedAt": "2021-12-23T21:36:04.039Z",
        "__v": 0
    }
}
```

## Remove Scholarship from Favorited

Menghapus beasiswa dari favorit

- ### URL

  /v1/favorites?username=:username&scholarshipId=:scholarshipId

- ### Method

  DELETE

- ### Response

```json
Berhasil menghapus informasi beasiswa dari favorit.
```

## Register User

Mendaftarkan user baru

- ### URL

  /v1/auth/register

- ### Method

  POST
  
- ### Headers

  Content-Type : multipart/form-data

- ### Body

  - name : string
  - username : string
  - password : string

- ### Response

```json
{
    "status": 201,
    "message": "User baru berhasil dibuat.",
    "data": {
        "_id": "61c4e1ba44e75cb1bc0031ac",
        "username": "windayani",
        "name": "Ni Wayan Windayani",
        "hash": "$2a$10$n1qJVsYoxgnfo.QAtcdgn.a2pHbBjCAEczRwDQwqC2MI.JJNBklYm",
        "createdAt": "2021-12-23T20:53:14.699Z",
        "updatedAt": "2021-12-23T20:53:14.699Z",
        "__v": 0
    }
}
```

## Login User

Menambahkan informasi user yang sedang login

- ### URL

  /v1/auth/login

- ### Method

  POST
  
- ### Headers

  Content-Type : multipart/form-data

- ### Body

  - username : string
  - password : string

- ### Response

```json
{
    "message": "success"
}
```

## Logout User

Menghapus cookie token informasi login user

- ### URL

  /v1/auth/logout

- ### Method

  POST

- ### Response

```json
{
    "message": "success"
}
```

## Get Authenticated User

Mendapatkan informasi user yang sedang login

- ### URL
  
  /v1/auth/user
    
- ### Method

  GET

- ### Response

```json
{
    "_id": "61c35de5475b50844c0ea4fa",
    "username": "hilmialmuhtadeb",
    "name": "Hilmi Almuhtade",
    "createdAt": "2021-12-22T17:18:29.232Z",
    "updatedAt": "2021-12-22T17:18:29.232Z",
    "__v": 0
}
```



## Credit

Terima kasih kepada :
- Node JS
- Express JS
- Mongoose
- jsonwebtoken
- nodemon
