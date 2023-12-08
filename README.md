# React Streaming Server

### Environment

-   [nodejs] - v.18.18.2

### Main Plugins

-   [express] - v.4.18.2
-   [multer] - v.1.4.5

### Development

will be run at localhost:3000

```bash
node index.js
```

### Note

-   [HTTP 206] Partial Content

    -   요청 헤더에 데이터 범위를 지정한 헤더가 있을 경우 그 범위에 대한 요청이 성공적으로 응답이 되어 Body에 그 데이터가 있음을 알려줌

-   [응답 헤더] Content-Range

    -   응답이 여러 범위를 가지고 있는 경우 응답 내용

    -   `Content-Range:<단위><start>-<end>/<size>`
