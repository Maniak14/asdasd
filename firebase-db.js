// Firebase Firestore Functions
// Fonctions pour sauvegarder et charger les données depuis Firebase Firestore

let db;
window.firebaseInitialized = false;

// Initialiser la connexion Firebase
function initFirebaseDB() {
  if (typeof firebase === 'undefined') {
    console.warn('Firebase SDK non chargé');
    return false;
  }
  
  if (initFirebase && typeof initFirebase === 'function') {
    window.firebaseInitialized = initFirebase();
    if (window.firebaseInitialized) {
      db = firebaseFirestore;
      return true;
    }
  }
  return false;
}

// ========== IMAGES ==========

// Sauvegarder une image dans Firestore
function saveImageToFirebase(imageId, imageUrl) {
  if (!window.firebaseInitialized || !db) return;
  
  try {
    db.collection('images').doc(imageId).set({
      url: imageUrl,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch (error) {
    console.error('Erreur sauvegarde image:', error);
  }
}

// Charger une image depuis Firestore
function loadImageFromFirebase(imageId, callback) {
  if (!window.firebaseInitialized || !db) {
    callback(null);
    return;
  }
  
  try {
    db.collection('images').doc(imageId).get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const url = data.url;
        localStorage.setItem(`image_${imageId}`, url);
        callback(url);
      } else {
        callback(null);
      }
    });
  } catch (error) {
    console.error('Erreur chargement image:', error);
    callback(null);
  }
}

// Écouter les changements d'images en temps réel
function watchImages(callback) {
  if (!window.firebaseInitialized || !db) return;
  
  try {
    db.collection('images').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const imageId = change.doc.id;
        const data = change.doc.data();
        if (data.url) {
          localStorage.setItem(`image_${imageId}`, data.url);
        }
      });
      
      // Charger toutes les images
      const images = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.url) {
          images[doc.id] = data.url;
          localStorage.setItem(`image_${doc.id}`, data.url);
        }
      });
      
      if (callback) callback(images);
    });
  } catch (error) {
    console.error('Erreur watch images:', error);
  }
}

// ========== POSITIONS ==========

// Sauvegarder une position d'image dans Firestore
function savePositionToFirebase(imageId, position) {
  if (!window.firebaseInitialized || !db) return;
  
  try {
    db.collection('positions').doc(imageId).set({
      position: position,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch (error) {
    console.error('Erreur sauvegarde position:', error);
  }
}

// Charger une position depuis Firestore
function loadPositionFromFirebase(imageId, callback) {
  if (!window.firebaseInitialized || !db) {
    callback(null);
    return;
  }
  
  try {
    db.collection('positions').doc(imageId).get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const position = data.position;
        localStorage.setItem(`image_position_${imageId}`, position);
        callback(position);
      } else {
        callback(null);
      }
    });
  } catch (error) {
    console.error('Erreur chargement position:', error);
    callback(null);
  }
}

// Écouter les changements de positions en temps réel
function watchPositions(callback) {
  if (!window.firebaseInitialized || !db) return;
  
  try {
    db.collection('positions').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const imageId = change.doc.id;
        const data = change.doc.data();
        if (data.position) {
          localStorage.setItem(`image_position_${imageId}`, data.position);
        }
      });
      
      // Charger toutes les positions
      const positions = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.position) {
          positions[doc.id] = data.position;
          localStorage.setItem(`image_position_${doc.id}`, data.position);
        }
      });
      
      if (callback) callback(positions);
    });
  } catch (error) {
    console.error('Erreur watch positions:', error);
  }
}

// ========== TEAM MEMBERS ==========

// Sauvegarder les membres de l'équipe dans Firestore
function saveTeamMembersToFirebase(teamMembers) {
  if (!window.firebaseInitialized || !db) return;
  
  try {
    db.collection('data').doc('team_members').set({
      members: teamMembers,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch (error) {
    console.error('Erreur sauvegarde team members:', error);
  }
}

// Charger les membres de l'équipe depuis Firestore
function loadTeamMembersFromFirebase(callback) {
  if (!window.firebaseInitialized || !db) {
    if (callback) callback([]);
    return;
  }
  
  try {
    db.collection('data').doc('team_members').get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const members = data.members || [];
        localStorage.setItem('team_members', JSON.stringify(members));
        if (callback) callback(members);
      } else {
        if (callback) callback([]);
      }
    });
  } catch (error) {
    console.error('Erreur chargement team members:', error);
    if (callback) callback([]);
  }
}

// Écouter les changements de membres en temps réel
function watchTeamMembers(callback) {
  if (!window.firebaseInitialized || !db) return;
  
  try {
    db.collection('data').doc('team_members').onSnapshot((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const members = data.members || [];
        localStorage.setItem('team_members', JSON.stringify(members));
        if (callback) callback(members);
      }
    });
  } catch (error) {
    console.error('Erreur watch team members:', error);
  }
}

// ========== DELETED TEAM MEMBERS ==========

// Sauvegarder les membres supprimés
function saveDeletedTeamMembersToFirebase(deletedMembers) {
  if (!window.firebaseInitialized || !db) return;
  
  try {
    db.collection('data').doc('deleted_team_members').set({
      members: deletedMembers,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch (error) {
    console.error('Erreur sauvegarde deleted team members:', error);
  }
}

// Charger les membres supprimés
function loadDeletedTeamMembersFromFirebase(callback) {
  if (!window.firebaseInitialized || !db) {
    if (callback) callback([]);
    return;
  }
  
  try {
    db.collection('data').doc('deleted_team_members').get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const deleted = data.members || [];
        localStorage.setItem('deleted_team_members', JSON.stringify(deleted));
        if (callback) callback(deleted);
      } else {
        if (callback) callback([]);
      }
    });
  } catch (error) {
    console.error('Erreur chargement deleted team members:', error);
    if (callback) callback([]);
  }
}

// ========== GALLERY IMAGES ==========

// Sauvegarder les images de galerie personnalisées
function saveCustomGalleryToFirebase(customImages) {
  if (!window.firebaseInitialized || !db) return;
  
  try {
    db.collection('data').doc('custom_gallery_images').set({
      images: customImages,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch (error) {
    console.error('Erreur sauvegarde custom gallery:', error);
  }
}

// Charger les images de galerie personnalisées
function loadCustomGalleryFromFirebase(callback) {
  if (!window.firebaseInitialized || !db) {
    if (callback) callback([]);
    return;
  }
  
  try {
    db.collection('data').doc('custom_gallery_images').get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const images = data.images || [];
        localStorage.setItem('custom_gallery_images', JSON.stringify(images));
        if (callback) callback(images);
      } else {
        if (callback) callback([]);
      }
    });
  } catch (error) {
    console.error('Erreur chargement custom gallery:', error);
    if (callback) callback([]);
  }
}

// ========== FEMMES CATALOG ==========

// Sauvegarder le catalogue femmes
function saveFemmesImagesToFirebase(femmesImages) {
  if (!window.firebaseInitialized || !db) return;
  
  try {
    db.collection('data').doc('femmes_images').set({
      images: femmesImages,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch (error) {
    console.error('Erreur sauvegarde femmes images:', error);
  }
}

// Charger le catalogue femmes
function loadFemmesImagesFromFirebase(callback) {
  if (!window.firebaseInitialized || !db) {
    if (callback) callback([]);
    return;
  }
  
  try {
    db.collection('data').doc('femmes_images').get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const images = data.images || [];
        localStorage.setItem('femmes_images', JSON.stringify(images));
        if (callback) callback(images);
      } else {
        if (callback) callback([]);
      }
    });
  } catch (error) {
    console.error('Erreur chargement femmes images:', error);
    if (callback) callback([]);
  }
}

// ========== HOMMES CATALOG ==========

// Sauvegarder le catalogue hommes
function saveHommesImagesToFirebase(hommesImages) {
  if (!window.firebaseInitialized || !db) return;
  
  try {
    db.collection('data').doc('hommes_images').set({
      images: hommesImages,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch (error) {
    console.error('Erreur sauvegarde hommes images:', error);
  }
}

// Charger le catalogue hommes
function loadHommesImagesFromFirebase(callback) {
  if (!window.firebaseInitialized || !db) {
    if (callback) callback([]);
    return;
  }
  
  try {
    db.collection('data').doc('hommes_images').get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const images = data.images || [];
        localStorage.setItem('hommes_images', JSON.stringify(images));
        if (callback) callback(images);
      } else {
        if (callback) callback([]);
      }
    });
  } catch (error) {
    console.error('Erreur chargement hommes images:', error);
    if (callback) callback([]);
  }
}

// ========== LOAD ALL DATA ==========

// Charger toutes les données depuis Firestore
async function loadAllDataFromFirebase() {
  if (!window.firebaseInitialized || !db) return;
  
  try {
    // Charger toutes les images
    const imagesSnapshot = await db.collection('images').get();
    imagesSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.url) {
        localStorage.setItem(`image_${doc.id}`, data.url);
      }
    });
    
    // Charger toutes les positions
    const positionsSnapshot = await db.collection('positions').get();
    positionsSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.position) {
        localStorage.setItem(`image_position_${doc.id}`, data.position);
      }
    });
    
    // Charger team members
    const teamMembersDoc = await db.collection('data').doc('team_members').get();
    if (teamMembersDoc.exists) {
      const data = teamMembersDoc.data();
      if (data.members) {
        localStorage.setItem('team_members', JSON.stringify(data.members));
      }
    }
    
    // Charger deleted team members
    const deletedDoc = await db.collection('data').doc('deleted_team_members').get();
    if (deletedDoc.exists) {
      const data = deletedDoc.data();
      if (data.members) {
        localStorage.setItem('deleted_team_members', JSON.stringify(data.members));
      }
    }
    
    // Charger custom gallery
    const customGalleryDoc = await db.collection('data').doc('custom_gallery_images').get();
    if (customGalleryDoc.exists) {
      const data = customGalleryDoc.data();
      if (data.images) {
        localStorage.setItem('custom_gallery_images', JSON.stringify(data.images));
      }
    }
    
    // Charger femmes images
    const femmesDoc = await db.collection('data').doc('femmes_images').get();
    if (femmesDoc.exists) {
      const data = femmesDoc.data();
      if (data.images) {
        localStorage.setItem('femmes_images', JSON.stringify(data.images));
      }
    }
    
    // Charger hommes images
    const hommesDoc = await db.collection('data').doc('hommes_images').get();
    if (hommesDoc.exists) {
      const data = hommesDoc.data();
      if (data.images) {
        localStorage.setItem('hommes_images', JSON.stringify(data.images));
      }
    }
    
    // Charger partenaires
    const partenairesDoc = await db.collection('data').doc('partenaires').get();
    if (partenairesDoc.exists) {
      const data = partenairesDoc.data();
      if (data.partenaires) {
        localStorage.setItem('partenaires', JSON.stringify(data.partenaires));
      }
    }
  } catch (error) {
    console.error('Erreur chargement données Firestore:', error);
  }
}

// ========== PARTENAIRES ==========

// Sauvegarder les partenaires dans Firestore
function savePartenairesToFirebase(partenaires) {
  if (!window.firebaseInitialized || !db) return;
  
  try {
    db.collection('data').doc('partenaires').set({
      partenaires: partenaires,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch (error) {
    console.error('Erreur sauvegarde partenaires:', error);
  }
}

// Charger les partenaires depuis Firestore
function loadPartenairesFromFirebase(callback) {
  if (!window.firebaseInitialized || !db) {
    if (callback) callback([]);
    return;
  }
  
  try {
    db.collection('data').doc('partenaires').get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const partenaires = data.partenaires || [];
        localStorage.setItem('partenaires', JSON.stringify(partenaires));
        if (callback) callback(partenaires);
      } else {
        if (callback) callback([]);
      }
    });
  } catch (error) {
    console.error('Erreur chargement partenaires:', error);
    if (callback) callback([]);
  }
}

// Écouter les changements de partenaires en temps réel
function watchPartenaires(callback) {
  if (!window.firebaseInitialized || !db) return;
  
  try {
    db.collection('data').doc('partenaires').onSnapshot((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const partenaires = data.partenaires || [];
        localStorage.setItem('partenaires', JSON.stringify(partenaires));
        if (callback) callback(partenaires);
      }
    });
  } catch (error) {
    console.error('Erreur watch partenaires:', error);
  }
}
