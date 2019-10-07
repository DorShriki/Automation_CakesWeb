const Home = require('./Home')
const home = new Home('https://cakes-automation-course.herokuapp.com/index.html')

test()

async function test(){
    // await home.validHeader("YOUR PLACE FOR THE BEST CAKES" , "TITLE PLACEHOLDER")
    // await home.validSearch("ABOUT")
    await home.validAdvanceSearch(["Chocolate" , "Cheese" , "Mousse"] , ["0-3" ,"4" , "5"] ,"14/08/1995" ,  "bubu" , "tutu")
    await home.close()
}
