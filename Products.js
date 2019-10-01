const SeleniumInfra = require('./SeleniumInfra')
const seleniuminfra = new SeleniumInfra()

class Products{
    constructor(URL){
        seleniuminfra.getURL(URL)
    }

    //Valid title in the header and logo link
    async validHeader(title , logoTitle){
        let titleELM = await seleniuminfra.getTextFromElement("xpath" , "//*[@id='container']/header/h3" )
        let logoELM = await seleniuminfra.getTextFromElement("xpath" , "//*[@id='container']/header/h1/a")
        if(title == titleELM){
            console.log("Title is True!")
        }else{
            console.log("Title is False")
        }
        if(logoTitle == logoELM){
            console.log("Logo Title is True")
        }else{
            console.log("Logo Title is False")
        }
        await seleniuminfra.clickElement("xpath" , "//*[@id='container']/header/h1/a")
    }

    // Insert string to search input and click on search button
    async validSearch(search){
        search = search.toLowerCase()
        seleniuminfra.write(search , "id" , "inputSearch")
        await seleniuminfra.clickElement("id" , "inputSearchSubmit")
        await seleniuminfra.validURL(search)
        // await seleniuminfra.clickElement("xpath" , "//*[@id='container']/header/h1/a")
    }

    // Click on AdvanceSearch, Insert data and valid results
    async validAdvanceSearch(cakesArr = null , ratesArr = null , date = null , txt1= null  , txt2= null ){
        await seleniuminfra.clickElement("id" , "myBtn")
        let stringResult = "You have searched the following:"
        let results , newDate
        if(cakesArr){ // Click 'checkbox' button for cakes
            for(let cakeType of cakesArr){ 
                await seleniuminfra.clickElement("css" , `.cakeTypes[value='${cakeType}']`)
            }
            stringResult+= `\nCake type: ${cakesArr}`
        }
        if(ratesArr){ // Click 'checkbox' button for rates
            for(let cakeRate of ratesArr){
                await seleniuminfra.clickElement("css" , `.cakeRates[value="${cakeRate}"]`)
            }
            stringResult+= `\nCake ratings: ${ratesArr}`
        }
        if(date){ // Insert date to Date input and change date format for comparing
            await seleniuminfra.write(date , "xpath" , `//input[@type='date']`)
            if(date.includes("/")){
                newDate = date.split("/")[2]+"-"+date.split("/")[1]+"-"+date.split("/")[0]
            }if(date.includes(".")){
                newDate = date.split(".")[2]+"-"+date.split(".")[1]+"-"+date.split(".")[0]
            }if(date.includes("-")){
                newDate = date.split("-")[2]+"-"+date.split("-")[1]+"-"+date.split("-")[0]
            }
            stringResult+= `\nDate of upload: ${newDate}`
        }
        if(txt1){ // Insert text to first text input
            await seleniuminfra.write(txt1 , "id" , "input1")
            stringResult+= `\nWeb pages that have all of these words: ${txt1}`
        }
        if(txt2){ // Insert text to second text input
            await seleniuminfra.write(txt2 , "id" , "input2")
            stringResult+= `\nWeb pages that have this exact wording or phrase: ${txt2}`
        }
        await seleniuminfra.clickElement("id" , "myBtnForm") // Click 'Search' Buttons
        results = await seleniuminfra.getTextFromElement("className" , "searchedItem") // getText from search
        
        // console.log(results)
        // console.log(stringResult)
        if(results.split(' ').join('') == stringResult.split(' ').join('')){ // Compare between wanted and result search
            console.log("woohoo Well Done!!")
        }else{
            console.log("Nooooo!!!!!!!!")
        }
    }

    // Click on arrowUp and valid that rows goes up
    async arrowUP(before , after){
        let cakeUL = await seleniuminfra.getTextFromElement("xpath" , "//*[@id='productsTable']/tbody/tr[1]/th[1]/div/h3")
        let cakeUR = await seleniuminfra.getTextFromElement("xpath" , "//*[@id='productsTable']/tbody/tr[1]/th[2]/div/h3")
        console.log(cakeUL+" , "+cakeUR)
        if(cakeUL == before[0] && cakeUR == before[1]){
            console.log("First raw is TRUE! ---> Now click arrowUP")
        }
        else{
            console.log("Not Good!")
        }
        await seleniuminfra.clickElement("id" , "arrow-up")
        cakeUL = await seleniuminfra.getTextFromElement("xpath" , "//*[@id='productsTable']/tbody/tr[1]/th[1]/div/h3")
        cakeUR = await seleniuminfra.getTextFromElement("xpath" , "//*[@id='productsTable']/tbody/tr[1]/th[2]/div/h3")
        console.log(cakeUL+" , "+cakeUR)
        if(cakeUL == after[0] && cakeUR == after[1]){
            console.log("First raw is TRUE! ---> Now click arrowUP")
        }
        else{
            console.log("Not Good!")
        }
    }

    //Click on arrowDown and valid that rows goes down
    async arrowDown(before , after){
        let cakeDL = await seleniuminfra.getTextFromElement("xpath" , "//*[@id='productsTable']/tbody/tr[2]/th[1]/div/h3")
        let cakeDR = await seleniuminfra.getTextFromElement("xpath" , "//*[@id='productsTable']/tbody/tr[2]/th[2]/div/h3")
        console.log(cakeDL+" , "+cakeDR)
        if(cakeDL == before[0] && cakeDR == before[1]){
            console.log("Before click: First raw is TRUE!")
        }
        else{
            console.log("Rows not eqaul")
        }
        await seleniuminfra.clickElement("id" , "arrow-down")
        cakeDL = await seleniuminfra.getTextFromElement("xpath" , "//*[@id='productsTable']/tbody/tr[2]/th[1]/div/h3")
        cakeDR = await seleniuminfra.getTextFromElement("xpath" , "//*[@id='productsTable']/tbody/tr[2]/th[2]/div/h3")
        console.log(cakeDL+" , "+cakeDR)
        if(cakeDL == after[0] && cakeDR == after[1]){
            console.log("After Click: First raw is TRUE!")
        }
        else{
            console.log("Rows not eqaul")
        }
    }

    // Close the browser
    async close(){
        seleniuminfra.close()
    }
}

module.exports = Products