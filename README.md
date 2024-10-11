# daven-park.github.io

## github upload

```
git pull
git add .
git commit -m message
git push origin master
```

## new blog page add

- contents폴더에 md파일 추가 후 배포 및 깃허브 업로드
- 사용하는 썸네일 사진 또한 contents에 포함되어야 함

## gatsby blog deploy

```
yarn deploy
```

- package.json의 "deploy": "gatsby build && gh-pages -d public -b deploy" 실행
- gh-pages를 통해 deploy브랜치로 배포 실행
