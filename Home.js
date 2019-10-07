const SeleniumInfrea = require('./SeleniumInfra')
const seleniuminfra = new SeleniumInfrea()

class Home{
    constructor(URL){ // Open browser in wanted link
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
            let spl = date.includes(".")?date.split("."):date.includes("/")?date.split("/"):date.split("-")
            newDate = spl[2] + "-" + spl[1] + "-" + spl[0]
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
        await seleniuminfra.clickElement("className" , "close")
    }

    // Close the browser
    async close(){
        seleniuminfra.close()
    }
}

module.exports = Home