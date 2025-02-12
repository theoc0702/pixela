$(document).ready(function() {
    // Fonction pour charger le contenu de register.html
    function loadRegisterPage() {

        $('#pixelaForm').on('submit', function(event) {

            // Empêche l'envoi du formulaire par défaut
            event.preventDefault(); 

            // Récupère les valeurs des champs du formulaire
            const username = $('#username').val().trim();
            const token = $('#token').val().trim();
            const agreeTerms = $('#agreeTerms').is(':checked');
            const notMinor = $('#notMinor').is(':checked');

        // Vérifie que les champs sont correctement remplis
            if (!username || !token || !agreeTerms || !notMinor) {
                $('#result').text("Veuillez remplir tous les champs correctement.");
            return;
            }

        // Données à envoyer dans la requête POST
            const userData = {
                token: token,
                username: username,
                agreeTermsOfService: "yes",
                notMinor: "yes"
            };

        // Requête POST avec jQuery
            $.ajax({
                url: "https://pixe.la/v1/users",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(userData),
                success: function(response) {
                    $('#result').text("Compte créé avec succès !");
                },
                //gestion d'erreur
                error: function(xhr, status, error) {
                    $('#result').text("Erreur lors de la création du compte : " + xhr.responseText);
                }
            });
        });
    }
});



