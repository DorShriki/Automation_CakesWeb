const Products = require('./Products')
const products = new Products('https://cakes-automation-course.herokuapp.com/products.html')

test()
async function test(){
    // products.validHeader("bubu" , "bub")
    // products.validSearch("store")
    // await products.validAdvanceSearch(["asd"] , [4] , "11/11/11" , "bbb" , "ddd")
    // await products.arrowUP(["Chocolate Cake" , "Apple Pie"] , ["Vanilla Cake" , "Red Valvet Cake"])
    await products.arrowDown(["Vanilla Cake" ,"Red Valvet Cake"] , ["Chocolate Cake" , "Apple Pie"])
    // await products.cakeExsist("bubu")
    products.close()    
}