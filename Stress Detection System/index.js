function getPredicion(){

    const sr = document.getElementById("sr").value;
    const rr = document.getElementById("rr").value;
    const bt = document.getElementById("bt").value;
    const lm = document.getElementById("lm").value;
    const bo = document.getElementById("bo").value;
    const em = document.getElementById("em").value;
    const sh = document.getElementById("sh").value;
    const hr = document.getElementById("hr").value;
    
    if (sr === '' || rr === '' || bt === '' || lm === '' || bo === '' || em === '' || sh === '' || hr === '')
    {
        document.getElementById("notification").innerHTML = "Please enter all the values";
    }
    else{
        let formdata = new FormData();

        formdata.append('sr', sr);
        formdata.append('rr', rr);
        formdata.append('bt', bt);
        formdata.append('lm', lm);
        formdata.append('bo', bo);
        formdata.append('em', em);
        formdata.append('sh', sh);
        formdata.append('hr', hr);

        document.getElementById("notification").innerHTML = "";

        fetch('http://127.0.0.1:5000/getStressInfo', 
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
}