const http = require('http');

const server = http.createServer((req, res) => {
  console.log(`--- 새 요청 시작 ---`);
  console.log(`들어온 요청: ${req.method} ${req.url}`);

  // 1. 요청 (req) 정보 로깅
  console.log(`  메서드 (Method): ${req.method}`);
  console.log(`  URL: ${req.url}`);
  console.log(`  HTTP 버전: ${req.httpVersion}`);
  console.log(`  원격 주소 (Remote Address): ${req.socket.remoteAddress}`);
  console.log(`  원격 포트 (Remote Port): ${req.socket.remotePort}`);

  console.log(`  --- 헤더 (Headers) ---`);
  for (const header in req.headers) {
    console.log(`    ${header}: ${req.headers[header]}`);
  }

  // 2. 요청 바디 (Body) - 비동기 처리 필요
  let body = [];
  req.on('error', (err) => {
    console.error(`  요청 바디 오류: ${err}`);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    const requestBody = Buffer.concat(body).toString();
    console.log(`  --- 바디 (Body) ---`);
    if (requestBody) {
      console.log(`    ${requestBody}`);
    } else {
      console.log(`    바디 없음 (GET 요청 등)`);
    }

    // 3. 응답 (res) 정보 설정 및 로깅
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8'); // 한글 깨짐 방지
    const responseBodyContent = '안녕하세요, 월드!\n'; // 응답할 실제 내용

    console.log(`  --- 응답 (Response) 정보 ---`);
    console.log(`    설정된 상태 코드 (Status Code): ${res.statusCode}`);
    console.log(`    설정된 헤더 (Headers):`);
    // res.getHeaders()는 응답이 전송되기 전에 설정된 헤더를 보여줍니다.
    // 하지만, res.setHeader()로 설정한 헤더는 내부적으로 관리되므로,
    // 명시적으로 설정한 Content-Type과 같은 헤더를 직접 출력합니다.
    console.log(`      Content-Type: ${res.getHeader('Content-Type')}`);
    // 필요한 경우 다른 헤더도 getHeader로 가져와 출력할 수 있습니다.
    // console.log(`      Server: ${res.getHeader('Server')}`); // 기본적으로 설정되지 않을 수 있음

    console.log(`    전송될 바디 내용 (Body Content):`);
    console.log(`      ${responseBodyContent.replace(/\n/g, '\\n')}`); // 줄바꿈 문자 표시

    res.end(responseBodyContent); // 실제 응답 전송
    console.log('응답이 전송되었습니다.');
    console.log(`--- 요청 처리 끝 ---`);
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`서버가 http://localhost:${port}/ 에서 실행 중입니다.`);
});