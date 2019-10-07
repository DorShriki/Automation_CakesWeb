const Store = require('./Store')
const store = new Store('https://cakes-automation-course.herokuapp.com/store.html')

test()
async function test(){
    // store.validHeader("bubu" , "bub")
    // store.validSearch("home")
    // await store.validAdvanceSearch(["Chocolate"] , [4] , "11/11/11" , "bbb" , "ddd")
    await store.checkCurrentDay()
    store.close()
}