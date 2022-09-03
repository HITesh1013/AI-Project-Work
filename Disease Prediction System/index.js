
const all_symptoms = ['Itching', 'Skin Rashes', 'Nodal Skin Eruptions', 'Continuous Sneezing', 'Shivering', 'Chills', 'Joint Pain', 
'Stomach Pain', 'Acidity', 'Ulcers on Tongue', 'Muscle Wasting', 'Vomiting', 'Burning Micturition', 'Spotting Urination', 'Fatigue', 
'Weight_gain', 'Anxiety', 'Cold Hands and Feets', 'Mood Swings', 'Weight Loss', 'Restlessness', 'Lethargy', 'Patches in  Throat', 
'Irregular Sugar Level', 'Cough', 'High Fever', 'Sunken Eyes', 'Breathlessness', 'Sweating', 'Dehydration', 'Indigestion', 
'Headache', 'Yellowish Skin', 'Dark Urine', 'Nausea', 'Loss of Appetite', 'Pain behind the Eyes', 'Back Pain', 'Constipation', 
'Abdominal Pain', 'Diarrhoea', 'Mild Fever', 'Yellow Urine', 'Yellowing of Eyes', 'Acute Liver Failure', 'Swelling of Stomach', 
'Swelled Lymph Nodes', 'Malaise', 'Blurred and Distorted Vision', 'Phlegm', 'Throat Irritation', 'Redness of Eyes', 'Sinus Pressure', 
'Runny Nose', 'Congestion', 'Chest Pain', 'Weakness in Limbs', 'Fast Heart Rate', 'Pain During Bowel Movements', 'Pain in Anal Region', 
'Bloody Stool', 'Irritation in Anus', 'Neck Pain', 'Dizziness', 'Cramps', 'Bruising', 'Obesity', 'Swollen Legs', 'Swollen Blood Vessels',
'Puffy Face and Eyes', 'Enlarged Thyroid', 'Brittle Nails', 'Swollen Extremeties', 'Excessive Hunger', 'Extra Marital Contacts',
'Drying and Tingling Lips', 'Slurred Speech', 'Knee Pain', 'Hip Joint Pain', 'Muscle Weakness', 'Stiff Neck', 'Swelling Joints',
'Movement Stiffness', 'Spinning Movements', 'Loss of Balance', 'Unsteadiness', 'Weakness of One Body Side', 'Loss of Smell',
'Bladder Discomfort', 'Foul Smell of urine', 'Continuous Feel of Urine', 'Passage of Gases', 'Internal Itching', 'Toxic Look (typhos)',
'Depression', 'Irritability', 'Muscle Pain', 'Altered Sensorium', 'Red Spots Over Body', 'Belly Pain', 'Abnormal Menstruation',
'Dischromic Patches', 'Watering from Eyes', 'Increased Appetite', 'Polyuria', 'Family History', 'Mucoid Sputum', 'Rusty Sputum', 
'Lack of Concentration', 'Visual Disturbances', 'Receiving Blood Transfusion', 'Receiving Unsterile Injections', 'Coma',
'Stomach Bleeding', 'Distention of Abdomen', 'History of Alcohol Consumption', 'Fluid Overload', 'Blood in Sputum',
'Prominent Veins on Calf', 'Palpitations', 'Painful Walking', 'Pus Filled Pimples', 'Blackheads', 'Scurring', 'Skin Peeling', 
'Silver Like Dusting', 'Small Dents in Nails', 'Inflammatory Nails', 'Blister', 'Red Sore Around Nose', 'Yellow Crust Ooze'];

const selected_symptoms = [];
let predicted_result = ""

function clearSelectedSymptoms(){
    document.getElementById("warning").innerHTML = `All symptoms removed`;
    document.getElementById("result").innerHTML = "";
    selected_symptoms.length = 0;
    showSymptoms();
    symptomCount()
}

function createSymptomsArray(){
    const symptom = document.getElementById("selectSymptoms").value;    

    if (selected_symptoms.length < 15)
    {
        if(selected_symptoms.indexOf(symptom) == "-1")
        {
            selected_symptoms.push(symptom);
            document.getElementById("warning").innerHTML = `${symptom} added successfully.`;
        }
        else{
            document.getElementById("warning").innerHTML = `${symptom} already added.`;
        }
    }
    else{
        document.getElementById("warning").innerHTML = `You can't select symptoms more than 15`;
    }
    symptomCount();
    showSymptoms();
}

function removeElement(removeElement)
{
    const index = selected_symptoms.indexOf(removeElement);
    if(index > -1) {
        selected_symptoms.splice(index, 1);
    }
    document.getElementById("warning").innerHTML = `${removeElement} removed successfully.`;
    showSymptoms();
    symptomCount();
}

function showSymptoms(){
    let tableOption = "<tr>";

    const stringPart1 = '<td><div class="tableElement"><div class="tableValue">'
    const stringPart2 = `</div><div class="tableButton"><button class="crossButton" onclick="removeElement('`
    const stringPart3 = `')"><img src="images/crossButton.png" class = "buttonIcon" ></button></div></div></td>`

    for (let i =0; i<selected_symptoms.length; i++)
    {
        if (i % 3 == 0 )
        {
            tableOption += '<tr></tr>'
        }
        tableOption += stringPart1 + selected_symptoms[i] + stringPart2 + selected_symptoms[i] + stringPart3;
    }

    tableOption += '</tr>';
    document.getElementById("symptomTable").innerHTML = tableOption;
}

function symptomCount()
{
    if(selected_symptoms.length == 0){
        document.getElementById("symptomsCount").innerHTML = '<p>Select Symptoms from ths List</p>';
    }
    else{
        document.getElementById("symptomsCount").innerHTML = '<p>You have selected ' + selected_symptoms.length + ' Symptom.</p>';
    }
}

function getDiseaseDetails()
{
    let check_symptoms = "";
    for (let i = 0; i < all_symptoms.length; i++)
    {
        if(selected_symptoms.indexOf(all_symptoms[i]) != "-1")
        {
            check_symptoms += "1";
        }
        else{
            check_symptoms += "0";
        }
    }

    let formdata = new FormData();
    formdata.append('symptoms', check_symptoms);

    fetch('http://127.0.0.1:5000/getDiseaseInfo', 
    {   method: 'POST', 
        // mode: 'no-cors',
        // contentType:"application/json",
        // headers: {'Content-Type': 'application/json'  }, 
        body: formdata,
    })  .then(response => response.json() )
        .then(data => document.getElementById("result").innerHTML = data.result)
        .catch(error => {
            console.error('Error: ', error);
    });
}