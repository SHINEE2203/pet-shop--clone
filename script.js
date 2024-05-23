var dogurl = "https://api.thedogapi.com/v1/breeds/";
var caturl = "https://api.thecatapi.com/v1/breeds";
var dogfacts = "https://catfact.ninja/fact";

let isLoading = ()=>{
  let display = document.querySelector(".row") 
    display.innerHTML=`
    <center>
    <div class="spinner-border" role="status">
  <span class="sr-only"></span>
</div>
</center>
`
  }

  var resdata = []
//fetching all the url using promise all
var getdetails =  Promise.all([
  fetch(dogurl)
  .then(value => {
    isLoading()
    return value.json()}),

  fetch(caturl)
  .then(value => {
    return value.json()}),

  fetch(dogfacts)
  .then(value => {
    return value.json()})
  ])
  .then((value) => {
    // console.log(value)
    resdata = value
    return value  
    //json response
  })
  .catch((err) => {
      console.log(err);
  });
  


 //-------Display dog function starts -----------
  async function displaydog(){
    // console.log(resdata)
    // const data = await getdetails;
    const dogdata = resdata[0] // fetching dogs details
    const doglist = document.querySelector('.row');
    doglist.innerHTML = ''; //wipping the old data  
    
    // loading new data
    dogdata.forEach((arr) => {
      
      doglist.innerHTML  += `
        <div class="col-sm-12 col-md-6 offset-md-2 col-lg-4 offset-lg-0 col-xl-3 col-xxl-3" id="content">
              <div class="container"> 
                  <div class="image-layout">
                  
                      <img loading="lazy" src=${arr.image.url} class="image">   
                  </div>
                  <div class="overlay">
                  <div class="text">                       
                          <p><b>Name:</b> ${arr.name}  <br/>
                          <b>Bread for:</b> ${arr.bred_for}<br/>
                          <b>Origin:</b> ${arr.origin}<br/>
                          <b>Life Span:</b> ${arr.life_span}<br/>
                          <b>Temperament:</b> ${arr.temperament}</p>
                                                
                   </div>       
                  </div>
              </div>
        </div>
        
          ` 
    })  
  }
   
//-------Display dog function ends -----------

  //-------Display Cat function starts -----------
  async function displaycat(){
    // const data = await getdetails;
    // catimg = https://api.thecatapi.com/v1/images/0XYvRd7oD

    catimageURL = "https://api.thecatapi.com/v1/images/"
    const catdata = resdata[1]
    //console.log(users)
    const catlist = document.querySelector('.row');
    catlist.innerHTML = ''; //wipping the old data  
    // loading new data
    catdata.forEach(async(arr) => {

      let resimage = await fetch(catimageURL+`${arr.reference_image_id}`, {method:"GET"});
      let jsdata = await resimage.json()
      // let image = await resimage;
      // console.log(jsdata)
      
      catlist.innerHTML  += `
        <div class="col-sm-12 col-md-6 offset-md-2 col-lg-4 offset-lg-0 col-xl-3 col-xxl-3" id="content">
              <div class="container"> 
                  <div class="image-layout">
                      <img src=${jsdata.url} class="image">   
                  </div>
                  <div class="overlay">
                  <div class="text">                       
                          <p>
                          <b>Name:</b> ${arr.name}  <br/>
                          <b>Temperament:</b> ${arr.temperament}<br/>
                          <b>Origin:</b> ${arr.origin}<br/>
                          <b>Life Span:</b> ${arr.life_span}<br/></p>
                          <a href=${arr.wikipedia_url}  class="btn btn-outline-light" target="_blank">Read More</a>
                          
                          </div>       
                  </div>
              </div>
        </div>
          ` 
    })  
  }
  
  //-------Display cats function Ends -----------

  //-------Display random fact function starts -----------

  async function randomfact(){
    const data = await getdetails;
    const dogfact = data[2]
  
    const factdata = document.querySelector('.row');
    factdata.innerHTML = '';
    factdata.innerHTML = `
    <div class="facts">
    <h3>${dogfact.fact}</h3> 
    </div>
    `
   }
   randomfact()
  
  //-------Display random fact function ends -----------