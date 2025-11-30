# L'Esthétique Vespucci - Site Web

Site catalogue moderne pour le salon de coiffure L'Esthétique Vespucci.

## Structure du Projet

```
L-esth-tique-Vespucci/
├── index.html          # Page d'accueil
├── femmes.html          # Catalogue des coupes femmes
├── hommes.html          # Catalogue des coupes hommes
├── tarifs.html          # Page des tarifs
├── assets/
│   ├── styles.css       # Styles principaux
│   ├── app.js           # Script principal
│   ├── particles.js     # Animation des particules
│   ├── burger-menu.js   # Menu mobile
│   ├── faq.js           # Fonctionnalité FAQ
│   └── reviews.js       # Carousel des avis
└── img/
    ├── carousel/        # Images du carousel (1.png à 6.png)
    ├── femmes/          # Images catalogue femmes (1.png à 6.png)
    ├── hommes/          # Images catalogue hommes (1.png à 6.png)
    ├── team/            # Photos de l'équipe (1.png, 2.png, 3.png)
    ├── hero.png         # Image hero principale
    └── map.png          # Carte de localisation
```

## Fonctionnalités

- **Design moderne** avec effets glassmorphism
- **Animations fluides** et transitions
- **Responsive** - adapté mobile, tablette et desktop
- **Carousel automatique** pour les images et avis
- **Lightbox** pour agrandir les images
- **FAQ interactive** avec accordéon
- **Menu burger** pour mobile
- **Modales** pour la prise de rendez-vous et les avis

## Personnalisation

### Couleurs

Les couleurs principales sont définies dans `assets/styles.css` via les variables CSS :

```css
:root {
  --primary-color: #9664c8;      /* Couleur principale (violet) */
  --primary-light: #b894e6;      /* Variante claire */
  --primary-dark: #7a4fa8;       /* Variante foncée */
  --text-primary: #ffffff;        /* Texte principal */
  --text-secondary: #cccccc;      /* Texte secondaire */
  --bg-dark: #0a0a0a;             /* Fond sombre */
}
```

### Images

Remplacez les images dans les dossiers `img/` :
- `img/hero.png` - Image principale de la section hero
- `img/carousel/` - 6 images pour le carousel
- `img/femmes/` - 6 images pour le catalogue femmes
- `img/hommes/` - 6 images pour le catalogue hommes
- `img/team/` - Photos de l'équipe (3 images)
- `img/map.png` - Carte de localisation

### Contenu

Modifiez le contenu directement dans les fichiers HTML :
- Informations de l'équipe dans `index.html`
- Avis clients dans `index.html`
- Questions FAQ dans `index.html`
- Tarifs dans `tarifs.html`
- Descriptions des coupes dans `femmes.html` et `hommes.html`

## Utilisation

1. Ouvrez `index.html` dans un navigateur web
2. Toutes les pages sont statiques et fonctionnent sans serveur
3. Pour un déploiement, uploadez tous les fichiers sur votre hébergeur

## Notes

- Les formulaires de réservation et d'avis sont des placeholders à configurer selon vos besoins
- Les liens "NOUS REJOINDRE" et "PRENDRE RENDEZ-VOUS" peuvent être connectés à vos systèmes de réservation
- Le site est optimisé pour les navigateurs modernes (Chrome, Firefox, Safari, Edge)

## Support

Pour toute question ou modification, contactez votre développeur.

