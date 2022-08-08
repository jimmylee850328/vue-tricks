最後一次編輯： 2021.07.09 By ToD

你好，歡迎來到氣象團隊的Vue Single File Component開發範本

本次版本特色：
* 引入 stylelint
* 更新 webpack 小版本

本範本包括幾個部分：

初次使用請依據步驟：
1. npm install
2. npm audit fix
3. npm run dev
4. npm run start

部屬時:
1. npm run build
2. 將 dist/index/index.html 及 dist 中的檔案放置於後端該放置的位置中
3. <b>務必更新 dist/index/index.html 才能指向最新的 bundle 檔案</b>

在您 glt clone 完本套件後　請先注意下列事項：
* 本範本有使用 Vuetify　其不支援 IE 11 以下之瀏覽器　開發前請特別注意
* 本範本僅安裝所有必須之套件　若有其他需求請自行於 npm 上安裝
* 請務必利用 git remote set-url 將其改為自己之專案　請勿將修改後之專案推上此處
* 請務必打開 package.json，將專案名稱改為自己之專案名字
* 設定好後請執行 npm install 將套件安裝
* 本專案於 vue、vuex、vue router、vue jest、scss，各處已具備簡單的範例程式，開發上參考，而後可逕行刪除即可
