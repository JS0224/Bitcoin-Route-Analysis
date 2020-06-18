#### 0. 사용 방법
local 상에 mariaDB 설치. db/bitcoin_test.back(DB 파일)이 로컬에 있어야함.  
node.js 설치. code(폴더) 에서 npm start  
테스트 해보고 싶으면, 아래 데이터 사용. 아래 Addr 은 2개의 tx 와 관련돼있음.  

***
block : 198777, 198882  
hash(tx)  
- be8364e0de2b4b6a150050a81698b3bad4ab5d92d45ad30d3b0901b564885745  
- ee126d64f10f7967f6d56ecdecba87dec56890c9aebaf684be1eba53b3fed9b0

addr
- 14QStGxfFxmxzCUqS1m2ESmrLbxwHJMmvr

blockchain site  
  https://www.blockchain.com/btc/address/14QStGxfFxmxzCUqS1m2ESmrLbxwHJMmvr
***


#### 1. 기본적인 구조
- 화면에 있는 Addr/Tx 에 있는 input form 에 주소 or Tx hash 검색(Block은 검색하지 말것. 아직 구현 안됨)  
- 가지고 온 데이터를 중심으로 화면에 뿌림(이 때, 주소를 추가한 경우라면 주소와 관련된 tx, tx를 추가한 경우라면 관련된 주소 모두가 표시)  
	단, 중심 데이터는 모든 정보 표시, 주변 데이터는 해시 혹은 주소 정도의 간단한 데이터만 표시  
- 화면에 있는 Element를 dbclick 하면 데이터가 확장됨.  

#### 2. 파일 설명(javascript 위주 : 나머지는 추가를 거의 안함)
- bitcoinElement.js : bitcoin Element(tx or addr) 과 관련된 함수. Cluster 와 관련된 함수 포함.  
- colorPicDialog.js : bitcoin Element 의 색깔을 바꾸고 싶을 때, dialog를 생성.  
- const.js : DB 접속 데이터  
- mariaDB.js : DB 연결 및 쿼리 날리기.  
- event.js : 온갖 click event(search, confirm 등등)  
- tab.js : tab toggle, 그리고 안에 있는 작은 tab(form) 토글  
- painter.js : Cluster를 그린다. 제일 위에 기본 알고리즘 적혀 있음)  
- infoData.js : bitcoin Element 위에서 Hover 하면 뜨는 infoBox 데이터 관련  


#### 3. 고민(?) 인 점
- server에서 쓰는 js 파일, client 에서 쓰는 js 가 다같이 public/javascripts/ 에 있다?  
- painter.js , bitcoinElement.js 파일이 너무 큰 것 같음.  
- jQuery 와 vanilia js 혼재  
- event.js : 이런 파일이 있어도 되는 건지 모르겠음  
