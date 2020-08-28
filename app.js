

const form = document.getElementById('form')
const search = document.getElementById('search')
const randomBtn = document.getElementById('random')
const resultFirst = document.getElementById('result-first')
const resultSecond = document.getElementById('result-second')
const resultThird = document.getElementById('result-third')


form.addEventListener('click',(e)=>{
    e.preventDefault()
    let searchVal = search.value;
    
     if(searchVal.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchVal}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
           resultFirst.innerHTML = `Search result for ${searchVal}`
           if(data.meals===null){
              resultFirst.innerHTML = 'Search Meals is Not Found'
           }else{
               resultSecond.innerHTML = data.meals.map(meal=>
                  `
                   <div class="meal-container">
                      <img src="${meal.strMealThumb}">
                       <div class="meal-info" data-id="${meal.idMeal}">
                           <h2>${meal.strMeal}</h2>
                       </div>
                   </div>
                  `
               ).join('')
           }
        })
        search.value = ''
     }
})

resultSecond.addEventListener('click',function(e){
    let mealId = e.path.find(ele=>{
          if(ele.classList){
              return ele.classList.contains('meal-info')
          }else{
              return false
          }
    })
    if(mealId){
        let getMealId = mealId.getAttribute('data-id')
        console.log(getMealId)
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${getMealId}`)
        .then(res=>res.json())
        .then(data=>{
            let sav = data.meals[0]
            console.log(sav)
            updateEle(sav)
        })
    }
})

function updateEle(sav){
    let ingredients = []
    
    for(let i=1;i<=15;i++){
        if(sav[`strMeasure${i}`]){
            ingredients.push(sav[`strMeasure${i}`])
        }
    }
    console.log(ingredients)

    resultThird.innerHTML = `
      <div class="single-meal">
         <h2>${sav.strMeal}</h2>
         <img src="${sav.strMealThumb}">
         <div class="single-mal-info">
           <p>${sav.strArea}</p>
           <p>${sav.strCategory}</p>
         </div>
         <p>${sav.strInstructions}</p>
         <h2>Ingredients</h2>
         <ul>
            ${ingredients.map(ele=>`<li>${ele}</li>`).join('')}
         </ul>
      </div>
    `
}

randomBtn.addEventListener('click',function(){
    resultFirst.innerHTML = ''
    resultSecond.innerHTML = ''
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res=>res.json())
    .then(data=>{
        let items = data.meals[0]
         updateEle(items)
    })
})