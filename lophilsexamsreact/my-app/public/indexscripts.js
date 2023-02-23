//DATA SCRIPT
fetch('MOCK_DATA.json') //fetch JSON File
.then(function (response) 
{
    return response.json();
})

.then(function (data) 
{
    appendData(data); //call appendfunction with JSON DATA
})
 
//show Card Articles
function appendData(data) 
{ 
    //JSON datalist Starts Here -->   
    let i = 0;
    var arr = []; 
    let htmlCode = ``;
    data.forEach(function(article) 
    {
        htmlCode =
            htmlCode +
                 `
                    <div class="card-partition">
                        <div class="card-content">
                            <div class="left-side">
                                <div class="grip">
                                    <i class="fa-solid fa-grip-vertical fa-2xl"></i>
                                </div>
                                <div class="ckbox">
                                    <input type="checkbox" name="type" id="c${article.id}" class="Checked"/>
                                </div>

                            </div>
                
                            <div class="middle-side">
                                <p class="t">${article.Title}</p>
                                <div class="row-author"> 
                                    <p><i class="fa fa-user"></i>${article.author} <i class="fa fa-calendar"></i>${article.Date}</p>
                                </div>
                                
                                <div class="row-content">
                                    <p class="example">${article.Content}</p>
                                    <button id="${article.id}" type="button" class="btn btn-link"><i class="fa fa-eye">Full Read</i></button>

                                    <div id="myModal" class="modal">

                                    </div>
                                </div>
                                
                            </div>
                
                            <div class="right-side">
                                <button class="hash">#Sports</button>
                                <button class="hash">#Worldwide</button>
                                <button class="hash">#Local</button>
                            </div>
                        </div>
                    </div>
                `;
                arr[i] = article.id;
                i++;
            //console.log(htmlCode); //Console Checking
    });

    document.getElementById('listcards').innerHTML = htmlCode;
    //JSON datalist Ends here <--

    //Checkbox Delete Starts here -->
    let delid =[]; //Array for ID Deletion
    let m = 0;  //array counter
    const del = document.getElementsByClassName("delete");
    for (const btn of del) 
    {
        btn.addEventListener('click', function() 
        {
            for(k=0; k < arr.length ; k++)
            {
                if(document.getElementById('c'+arr[k]).checked == true) //check if checkbox is checked
                { 
                    delid[m] = arr[k]; //Save ID to be deleted
                    m++ //array counter up
                }     
            }

            deletehtml(data, delid); //call multiple delete IDs/CheckBox Delete Button
        })
    }
    //checkbox delete end here <--

    //modal Button Starts here -->
    const btns = document.querySelectorAll('.btn');
    for (const btn of btns) 
    {
        btn.addEventListener('click', function() 
        {
            
            var modal = document.getElementById("myModal"); //Get the modal

            var singleid = this.id; //save ID

            appendhtml(this.id, data); //show all JSON row of the ID

            modal.style.display = "block"; //display modal

            const span = document.getElementsByClassName("close"); //get close class
            for (const btn of span)
            {
                btn.addEventListener('click', function() 
                {
                    modal.style.display = "none";
                });
            } 

            /*// close modal using X button
            span.onClick = function() 
            {
                modal.style.display = "none";
            }*/

            //Button Delete
            const delsid = document.getElementsByClassName("iddelete");
            for (const btn of delsid)
            {
                btn.addEventListener('click', function() 
                {
                    deletehtmlid(data, singleid); // Single ID deletion/call modal delete button
                });
            } 
        });
    }
    //Modal Button Ends Here <--

    document.getElementById("search").addEventListener("keyup", search);
    document.getElementById("publishid").addEventListener("onClick", addpublish);
} 

//Modal View
function appendhtml(id, data)
{
    let htmlmodal =``;

    var BreakException = {};

    try 
    {
        data.forEach(function(news) 
        {
            if (news.id == id)
            {
                htmlmodal =
                     htmlmodal +
                     `
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">${news.Title}</h5>
                                <span class="close">&times;</span>
                            </div>
                            <div class="modal-subheader">
                                <h6>${news.author} | ${news.Date}</h6>
                            </div>
                            <div class="modal-pcontent">
                                <h6 class="full-content">${news.Content}</h6>
                            </div>
                            <div class="modal-footer">
                                <button class="idpublish">Publish</button>
                                <button class="iddelete">Delete</button>
                            </div>
                        </div>
                    `;
                    
                        document.getElementById('myModal').innerHTML = htmlmodal;
                        throw BreakException;
            }
        });
    } catch (e) 
    {
        if (e !== BreakException) throw e;
    }

}

//Checkbox Delete Button
function deletehtml(data, arr)
{
    let c = 0; //counting position
    for(k=0; k < arr.length; k++)
    {
        c = 0; //restart position
        data.forEach(function(article) 
        {    
            if(article.id == arr[k]) // if JSON id = id being deleted
            {
                var BreakException = {}; //stop the searching loop

                try
                {
                    removal(data, c); //call with data and position
                    throw BreakException; //stop foreach
                }
                 catch (e) 
                {
                    if (e !== BreakException) throw e;
                }

            }
            c++;
        });

    }

    const sdata = JSON.stringify(data)

    //console.log(sdata);

    //create and download updated JSON file
    function download(content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }
    download(sdata, 'json.json', 'text/plain');

    document.getElementById("search").value = "";
    appendData(data);
}

//Modal Delete Button
function deletehtmlid(data, id) 
{
    let c=0; //Counting position
    data.forEach(function(article) 
    {    
        if(article.id == id)    // if JSON id = id being deleted
        {
            removal(data, c); //call with data and position
        }
        c++;
    });

    //create and download updated JSON file
    const sdata = JSON.stringify(data);
    function download(content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }
    download(sdata, 'json.json', 'text/plain');

    document.getElementById("search").value = "";
    appendData(data);
}

//remove Value via Position
function removal(data, pos)
{
    data.splice(pos, 1);
}

function search()
{
  let input = document.getElementById('search').value;

  
  let x = document.getElementsByClassName('t');
  let z = document.getElementsByClassName("card-partition");

    
  for (i = 0; i < x.length; i++) { 
      if (!x[i].innerHTML.toLowerCase().includes(input)) {
          z[i].style.display="none";
      }
      else {
          z[i].style.display="block";                 
      }
  }

}

function addpublish()
{
    const pub = document.getElementsByClassName("publish");
    for (const btn of pub)
    {
        btn.addEventListener('click', function() 
        {
            var modal = document.getElementById("publishmyModal"); //Get the modal
            modal.style.display = "block"; //display modal
            var span = document.getElementsByClassName("close")[0]; //get close class
            var cancel = document.getElementsByClassName("cancel")[0];
            var title = document.getElementById("Title").value;
        
            // close modal using X button
            span.onClick = function() 
            {
                modal.style.display = "none";
            }
        
            cancel.onClick = function() 
            {
                modal.style.display = "none";
            }
            
            const publishcontent = document.getElementsByClassName("idpublishcontent");
            for (const btn of publishcontent)
            {
                btn.addEventListener('click', function() 
                {
        
                    console.log(title);
                });
            } 
        });
    } 
    
}
