$(document).ready(() => {
    $("#searchForm").on('submit', e => {
        //get the data of form input
        let searchTerm = $("#searchTerm").val();

        //call function gtMovies to get the data
        getMovies(searchTerm);
        e.preventDefault();
    })
});

output = "";

function getMovies(searchTerm) {
    output = "";
    //now call the axios to get the data 
    axios.get('https://www.omdbapi.com?s=' + searchTerm + '&apikey=3f265c45')
        .then(response => {
            console.log(response)
                //get the response into variable
            const movies = response.data.Search;

            //check for response true or not
            if (response.data.Response === "True") {
                // iterate through movies array/object
                output += '<div class="row">';

                $.each(movies, (index, movie) => {
                    let poster = movie.Poster === "N/A" ? '../css/no-image.png' : movie.Poster;

                    output += `
						<div class="column">
							<div class="card">
								<img alt='${movie.Title}' src=${poster}>
								<div class="container">
									<h3 class="title">${movie.Title}</h3>
									<p class="year">${movie.Year}</p>
									<p><button class="button">Details</button></p>
								</div>
							</div>
						</div>
				`;
                });

                output += '</div>';
            } else {

                //put the error
                output += '<p>Too many results. Please search using more words.</p>';
            }

            //add the output to the output div of html file
            $("#searchResults").html(output);
        })
        .catch(err => {
            output += `
		    <p>Something is wrong, Please try again.</p>
			<img src="../css/404.png"/>
			`;

            $("#searchResults").html(output);
        })
}