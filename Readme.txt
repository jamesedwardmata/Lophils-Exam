#James Edward D. Mata - OJT - Front End Developer EXAM
Date 23/02/2023 			Deadline 24/02/2023 5:00pm

note:
!!  Delete or comment to prevent json download of updated file (does not included deleted data)
    line 244 & line 216 in indexscripts.js

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

A. [RAW PROGRAM] lophilsexams folder is HTML CSS JAVASCRIPT (via XAMPP and Visual Studio Code)
	1. folder to htdocs
	2. Run Apache and SQL
	3. Localhost/lophilsexams
		> MOCK_DATA.json
		> functionality
	    		- Display Layout
	    		- Read Full Modal Click
	    		- Exit modal click
	    		- Delete on Modal
	    		- item CheckBox and Delete button lng landing page
	    		- search Bar
	    		- publish button

B. Tried converting to ReactJS 
   lophilsexamsreact folder is lophilsexams converted to REACT JS
	1. open in VSCode and Console
	2. cd my-app
	3. npm start
	4. (few refreshes if Data does not show)
		A. MOCK_DATA.json on public
		B. functionality
	    		- Display Layout
	    		- Read Full Modal Click
	    		- Exit modal click
	    		- Delete on Modal
	    		- item CheckBox and Delete button lng landing page
	    		- search Bar

C. Lophilexamsreact.zip is the whole react File (with node Modules)



