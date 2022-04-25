let axios = require("axios")


let getStates = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistricts = async function (req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getOtp = async function (req, res) {
    try {
        let blahhh = req.body
        
        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getByDistrict=async function(req,res){
try{
 let distId=req.query.district_id;
 let date1=req.query.date;
 var options = {
    method: "get",
    url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${distId}&date=${date1}`
}
      let result =  axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
}catch(err){
     
    console.log(err)
    res.status(500).send({msg:err.message})

}
}

const weather=async function(req,res){
try{
 let city1=req.query.q1;
 let city2=req.query.q2;
 let city3=req.query.q3;
 let city4=req.query.q4;
 let city5=req.query.q5;
 let city6=req.query.q6;
 let city7=req.query.q7;
 let Id=req.query.appid;
var options = {
    method: "get",
    url: `http://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=${Id}`
}
 let cityLondon = await axios(options)
    

        var options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city2}&appid=${Id}`
        }
        let cityBengaluru = await axios(options)
            

                 var options = {
                method: "get",
                url: `http://api.openweathermap.org/data/2.5/weather?q=${city3}&appid=${Id}`
                 }
         let cityMumbai= await axios(options)
        
       
        var options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city4}&appid=${Id}`
        }
    
        let cityDelhi=await axios(options)


        var options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city5}&appid=${Id}`
        }
    
        let cityKolkata=await axios(options)
        
        var options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city6}&appid=${Id}`
        }
    
        let cityChennai=await axios(options)

        var options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city7}&appid=${Id}`
        }
        
        let cityMoscow=await axios(options)

        let londonTemp=cityLondon.data.main.temp;
        let mascowTemp=cityMoscow.data.main.temp;
        let delhiTemp=cityDelhi.data.main.temp;
        let chennaiTemp=cityChennai.data.main.temp;
        let mumbaiTemp=cityMumbai.data.main.temp;
        let bengaluruTemp=cityBengaluru.data.main.temp;
        let kolkataTemp=cityKolkata.data.main.temp;
        let tempArray=new Array(7)
        tempArray[0]={city:"London",temp:londonTemp}
        tempArray[1]={city:"Moscow",temp:mascowTemp}
        tempArray[2]={city:"Delhi",temp:delhiTemp}
        tempArray[3]={city:"Chennai",temp:chennaiTemp}
        tempArray[4]={city:"Mumbai",temp:mumbaiTemp}
        tempArray[5]={city:"Bengaluru",temp:bengaluruTemp}
        tempArray[6]={city:"Kolkata",temp:kolkataTemp}
       tempArray=tempArray.sort(function(a,b){return a.temp-b.temp});
       console.log(tempArray)
       res.send({msg:tempArray})
}catch{

    console.log(err)
    res.status(500).send({msg:err.message})
}

// the same logic can be made more dynamic if we code as below in the weather function
//moreover the above code can be made completely dynamic by dynamically declaring the size
//of the array and then dynamically insrting cities in it by passing in the query parameters

// let cities=["Bengaluru","Mumbai","Delhi","Kolkata","Chennai","London","Moscow"]
// let cityObjectArray=[]
// for(let i=0;i<cities.length;i++)
// {
// let obj={city:cities[i]}
// let resp=await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=${Id}`)
// console.log(resp.data.main.temp)
// obj.temp=resp.data.main.temp
// cityObjectArray.push(obj)

// }
// let sorted=cityObjectArray.sort(function(a,b){return a.temp-b.temp})
// console.log(sorted)
// res.status(200).send({status:true,data:sorted})

}

const meme=async function(req,res){
    try{
 let urll=req.query.url1;
 let id=req.query.template_id;
 let caption=req.query.text0;
 let option=req.query.text1;
 let user=req.query.username
 let passw=req.query.password;
 var options = {
     method: "post",
     url: `${urll}?template_id=${id}&text0=${caption}&text1=${option}&username=${user}&password=${passw}`
 }
 let data1 = await axios(options)
 console.log(data1.data)
 res.status(200).send({msg:data1.data})
    }catch{

        console.log(err)
        res.status(500).send({msg:err.message})
    }
}
module.exports.getByDistrict=getByDistrict
module.exports.getStates = getStates                  
module.exports.getDistricts = getDistricts
module.exports.getByPin = getByPin
module.exports.getOtp = getOtp
module.exports.weather=weather;
module.exports.meme=meme

// template_id <meme_id>
//            text0 <text you want as a caption>
//            text1 <optional>
//            username chewie12345
//            password meme@123
