$(document).ready(function () {
    $(".logout").hide();
    $("#login-btn").click(function () {
        let username = $("#username").val().trim();
        let token = $("#password").val().trim();

        //gestion d'erreur
        if (username === "" || token === "") {
            $("#login-result").html("<p style='color:red;'>Veuillez remplir tous les champs.</p>");
            return;
        }

        // Vérifier si l'utilisateur existe en appelant l'API Pixela
        let graphUrl = `https://pixe.la/v1/users/${username}/graphs`;


        //requete GET
        $.ajax({
            url: graphUrl,
            type: "GET",
            headers: { "X-USER-TOKEN": token },
            success: function (data) {
                if (data.graphs.length > 0) {
                    //resultat de la requete
                    $(".login").hide();
                    $(".logout").show();
                    $("#login-result").html("<h3>Voici vos graphes :</h3>");
                    
                    //image des graphes
                    data.graphs.forEach(graph => {
                        let graphImg = `<img src="https://pixe.la/v1/users/${username}/graphs/${graph.id}" alt="Graph ${graph.id}">`;
                        $("#login-result").append(graphImg);
                    });
                } else {
                    $("#login-result").html("<p style='color:orange;'>Aucun graphe trouvé pour cet utilisateur.</p>");
                }
            },
            error: function () {
                $("#login-result").html("<p style='color:red;'>Échec de la connexion. Vérifiez vos informations.</p>");
            }
        });
    });


    //bouton logout
    $("#logout").on("click",function(event) {
        console.log("hello");
        localStorage.setItem("pixela_username", "");
        localStorage.setItem("pixela_token", "");
        alert("Déconnexion réussie !");
        window.location.href='home.html';     
});
});

