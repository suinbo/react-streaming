const mediaRouter = require("./mediaRouter.js")
const express = require("express")
const app = express()

const PORT = 3000
app.use("/media", mediaRouter)
app.get("/upload", function (req, res) {
    const body = `
<html>
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  </head>
  <body>
    <form action="http://localhost:3000/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="video" accept="video/mp4">
    <br>
    <button type="submit">Upload</button>
    </form>
  </body>
</html>
`
    res.writeHead(200, { "Content-Type": "text/html" })
    res.write(body)
    res.end()
})

const multer = require("multer")
const path = require("path")

// 업로드된 파일을 저장할 디렉토리 설정
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
})

// 업로드 미들웨어 생성
const upload = multer({ storage: storage })

// 업로드된 파일을 제공할 정적 경로 설정
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// 파일 업로드를 처리할 라우터 설정
app.post("/upload", upload.single("video"), (req, res) => {
    res.send("File uploaded!")
})

app.listen(PORT, () => {
    console.log(`running media server on ${PORT}`)
})
