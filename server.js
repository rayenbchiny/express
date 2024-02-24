

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));

// Middleware pour vérifier si c'est pendant les heures ouvrables
app.use((req, res, next) => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hourOfDay = now.getHours();

    // configuration de la date 
    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
        next();
    } else {
        res.send("L'application est disponible uniquement pendant les heures ouvrables (du lundi au vendredi, de 9h à 17h).");
    }
});

// Configuration du moteur de template Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Middleware Body Parser pour traiter les données des formulaires pug ou html
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.render('accueil');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// Traitement du formulaire de contact
app.post('/contact', (req, res) => {
    const { nom, email, message } = req.body;
 console.log(req.body)
    res.render('confirmation', { nom, email, message });
});
app.use((req,res)=>
{res.status(404).send('not found')

}
)
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Serveur en cours d'exécution sur le port 3000");
});