function getHabitabilityScore(){
    document.getElementById("result").innerHTML = '';

    const propertyArea = document.getElementById("propertyArea").value;
    const neighborhoodReview = document.getElementById("neighborhoodReview").value;
    const numberOfDoors = document.getElementById("numberOfDoors").value;
    const numberOfWindows = document.getElementById("numberOfWindows").value;
    const trafficDensityScore = document.getElementById("trafficDensityScore").value;
    const airQualityIndex = document.getElementById("airQualityIndex").value;
    const typeOfproperty = document.getElementById("typeOfproperty").value;
    const furnishing = document.getElementById("furnishing").value;
    const frequencyOfPowercuts = document.getElementById("frequencyOfPowercuts").value;
    const powerBackup = document.getElementById("powerBackup").value;
    const waterSupply = document.getElementById("waterSupply").value;
    const crimeRate = document.getElementById("crimeRate").value;
    const dustAndNoise = document.getElementById("dustAndNoise").value;
    
    if (propertyArea == "")
    {
        document.getElementById("notification").innerHTML = 'Missing Property area value'
        return;          
    }
    else if (parseInt(propertyArea, 10) > 100000)
    {
        document.getElementById("notification").innerHTML = 'Property area too high. Maximum supported value is 100000.'
        return;
    }
    else if (parseInt(propertyArea, 10) <= 0)
    {
        document.getElementById("notification").innerHTML = 'Property area must be greater than 0.'
        return;
    }
    
    if (neighborhoodReview == "")
    {
        document.getElementById("notification").innerHTML = 'Missing neighborhood review value'
        return;          
    }
    else if (parseInt(neighborhoodReview, 10) > 5)
    {
        document.getElementById("notification").innerHTML = 'Neighborhood review value must be in 0 to 5'
        return;
    }
    else if (parseInt(neighborhoodReview, 10) < 0)
    {
        document.getElementById("notification").innerHTML = 'Neighborhood review value must be in 0 to 5'
        return;
    }

    if (numberOfDoors == "")
    {
        document.getElementById("notification").innerHTML = 'Missing number of doors value'
        return;          
    }
    else if (parseInt(numberOfDoors, 10) > 99)
    {
        document.getElementById("notification").innerHTML = 'Number of door value must be in 0 to 99'
        return;
    }
    else if (parseInt(numberOfDoors, 10) < 0)
    {
        document.getElementById("notification").innerHTML = 'Number of door value must be in 0 to 99'
        return;
    }

    if (numberOfWindows == "")
    {
        document.getElementById("notification").innerHTML = 'Missing number of windows value'
        return;          
    }
    else if (parseInt(numberOfWindows, 10) > 99)
    {
        document.getElementById("notification").innerHTML = 'Number of windows value must be in 0 to 99'
        return;
    }
    else if (parseInt(numberOfWindows, 10) < 0)
    {
        document.getElementById("notification").innerHTML = 'Number of windows value must be in 0 to 99'
        return;
    }

    if (trafficDensityScore == "")
    {
        document.getElementById("notification").innerHTML = 'Missing traffic density value'
        return;          
    }
    else if (parseInt(trafficDensityScore, 10) > 10)
    {
        document.getElementById("notification").innerHTML = 'Traffic density value must be in 0 to 10'
        return;
    }
    else if (parseInt(trafficDensityScore, 10) < 0)
    {
        document.getElementById("notification").innerHTML = 'Traffic density value must be in 0 to 10'
        return;
    }
    
    if (airQualityIndex == "")
    {
        document.getElementById("notification").innerHTML = 'Missing air quality value'
        return;          
    }
    else if (parseInt(airQualityIndex, 10) > 1000)
    {
        document.getElementById("notification").innerHTML = 'Air Quality index must be in 0 to 1000'
        return;
    }
    else if (parseInt(airQualityIndex, 10) <= 0)
    {
        document.getElementById("notification").innerHTML = 'Air Quality index must be in 0 to 1000'
        return;
    }

    if (typeOfproperty == "null"){
        document.getElementById("notification").innerHTML = 'Select type of property'
        return;
    }

    if (furnishing == "null"){
        document.getElementById("notification").innerHTML = 'Select furnishing type'
        return;
    }

    if (frequencyOfPowercuts == "null"){
        document.getElementById("notification").innerHTML = 'Select frequency of Powercuts'
        return;
    }

    if (powerBackup == "null"){
        document.getElementById("notification").innerHTML = 'Select power backup facility'
        return;
    }

    if (waterSupply == "null"){
        document.getElementById("notification").innerHTML = 'Select type of water supply'
        return;
    }

    if (crimeRate == "null"){
        document.getElementById("notification").innerHTML = 'Select crime rate of region'
        return;
    }

    if (dustAndNoise == "null"){
        document.getElementById("notification").innerHTML = 'Select dust and noise rating'
        return;
    }

    let formdata = new FormData();

    formdata.append('Property_Area', propertyArea);
    formdata.append('Neighborhood_Review', neighborhoodReview);
    formdata.append('Number_of_Doors', numberOfDoors);
    formdata.append('Number_of_Windows', numberOfWindows);
    formdata.append('Traffic_Density_Score', trafficDensityScore);
    formdata.append('Air_Quality_Index', airQualityIndex);
    formdata.append('Property_Type', typeOfproperty);
    formdata.append('Furnishing', furnishing);
    formdata.append('Frequency_of_Powercuts', frequencyOfPowercuts);
    formdata.append('Power_Backup', powerBackup);
    formdata.append('Water_Supply', waterSupply);
    formdata.append('Crime_Rate', crimeRate);
    formdata.append('Dust_and_Noise', dustAndNoise);

    fetch('http://127.0.0.1:5000/getScore', 
        {   method: 'POST', 
            body: formdata,
        })  .then(response => response.json() )
            .then(data => document.getElementById("result").innerHTML = '<div class="result" >Habitability Score ' + data.result + '%</div>')
            .catch(error => {
                console.error('Error: ', error);
        });
        // document.getElementById("result").innerHTML = '<div class="result" >Habitability Score ' + data.result + '%</div>'
}