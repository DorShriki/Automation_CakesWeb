const SeleniumInfra = require('./SeleniumInfra')
const seleniuminfra = new SeleniumInfra()

class Store{
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
    async validAdvanceSearch(cakesArr = null , ratesArr = null , day = null , txt1= null  , txt2= null ){
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
        if(day){ // Insert day to Date input and change day format for comparing
            await seleniuminfra.write(day , "xpath" , `//input[@type='day']`)
            let spl = day.includes(".")?day.split("."):day.includes("/")?day.split("/"):day.split("-")
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

        if(results.split(' ').join('') == stringResult.split(' ').join('')){ // Compare between wanted and result search
            console.log("woohoo Well Done!!")
        }else{
            console.log("Nooooo!!!!!!!!")
        }
        await seleniuminfra.clickElement("className" , "close")
    }

    async checkCurrentDay(){
        try{
            const day = await new Date().getDay()
            const week = ['Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday']
            const bold = 'color: rgb(212, 126, 21); font-weight: bold;'
            if(await seleniuminfra.isElementExists(`css` , `.today[style='${bold}']`)==false){
                return console.log("Day is not BOLD")
            }
            if(await seleniuminfra.isElementExists(`css` , `.todayInfo[style='${bold}']`)==false){
                return console.log("Info is not BOLD")
            }
            const webDay = await seleniuminfra.getTextFromElement(`css` , `.today[style='${bold}']`)
            const webInfo = await seleniuminfra.getTextFromElement(`css` , `.todayInfo[style='${bold}']`)
            if(webDay == week[day]){
                console.log(`Today is ${week[day]} with Info: ${webInfo}. Text is BOLD`)
            }else{
                console.log("Today is not Bold")
            }
        }catch(Error){
            console.log(Error)
        }
    }



    // Close the browser
    async close(){
        seleniuminfra.close()
    }
}

module.exports = Store