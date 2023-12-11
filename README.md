# Video Streaming Server

### Environment

-   [nodejs] - v.18.18.2

### Main Plugins

-   [express] - v.4.18.2 \*
-   [multer] - v.1.4.5 \*
-   [multiparty] - v.4.2.3

### Development

will be run at localhost:3000

```bash
node index.js
```

### Note

-   파일 업로드 모듈

    -   `multiparty` : 파일을 스트리밍하며, 파일 일부를 메모리에 로드하지 않고 직접 디스크에 사용 가능
    -   `multer` : 특정 라우터에 미들웨어로 추가하여 사용, Storage Engine 으로 파일 저장

-   [HTTP 206]: Partial Content

    -   요청 헤더에 데이터 범위를 지정한 헤더가 있을 경우 그 범위에 대한 요청이 성공적으로 응답이 되어 Body에 그 데이터가 있음을 알려줌

-   [응답 헤더] Content-Range

    -   응답이 여러 범위를 가지고 있는 경우 응답 내용

    -   `Content-Range:<단위> <start>-<end>/<파일전체크기>` (`<end>` 생략 가능)

-   TEST URL

    -   **파일 업로드** : `http://localhost:3000/upload` [GET]
    -   **스트림 재생 URL** : `http://localhost:3000/media/${파일명}.mp4` [GET]

        -   스트림 재생시, `Content-Type` 이 video/mp4 인 GET 요청이 두 번 오는데,  
            (1)첫번째 요청은 해당 URL 에 정상적으로 접근할 수 있는지를 묻는 역할을 하며, 헤더에 Content-Range 가지고 있지 않음.  
            (2)두번째 요청은 실제 미디어 파일에 대한 요청으로, 헤더에 Content-Range 가짐(구간 설정)

            ```
            // console 에 req.headers.range 출력시
            undefined
            bytes=0-
            ```
