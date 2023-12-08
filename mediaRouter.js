const router = require("express").Router()
const multiparty = require("multiparty")
const path = require("path")
const url = require("url")
const fs = require("fs")

/** MP4 파일 스트리밍 위한 라우터 */
router.get("/*", (req, res) => {
    const { pathname } = url.parse(req.url, true)
    const filename = path.basename(pathname) // URL에서 파일 이름 추출
    const filepath = path.join(__dirname, "uploads", filename)

    const stat = fs.statSync(filepath) // 파일 정보 가져오기
    const fileSize = stat.size
    const range = req.headers.range
    console.log("range:: ", range)

    if (!range) {
        const header = { "Content-Type": "video/mp4" }
        res.writeHead(200, header)
        res.end()
    } else {
        const MAX_CHUNK_SIZE = 1000 * 1000 * 50

        // range 헤더 파싱
        const parts = range.replace(/bytes=/, "").split("-")

        // 재생 구간 설정
        const start = parseInt(parts[0], 10)
        const _end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
        const end = Math.min(_end, start + MAX_CHUNK_SIZE - 1)

        const header = {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Type": "video/mp4",
            "Content-Length": fileSize - 1,
        }
        res.writeHead(206, header) //
        const readStream = fs.createReadStream(filepath, { start, end })
        readStream.pipe(res)
    }
})

router.post("/", (req, res) => {
    const form = new multiparty.Form()
    form.on("error", err => res.status(500).end())
    form.on("part", part => {
        // file이 아닌 경우 skip
        if (!part.filename) return part.resume()

        const filestream = fs.createWriteStream(`./uploads/${part.filename}`)
        part.pipe(filestream)
    })
    form.on("close", () => res.end())
    form.parse(req)
})

module.exports = router
