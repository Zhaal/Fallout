// Vault-Tec terminal interface - Vanilla JS
const qs = (s, el=document) => el.querySelector(s);
const qsa = (s, el=document) => [...el.querySelectorAll(s)];

// Contenu textuel
const DATA = {
  citoyensLettre: `Document Officiel – Diffusion Générale
VAULT-TEC CORPORATION – Service Relations Citoyennes
Abri 202 – Bienvenue dans L’Arche
Chers résidents,

Bienvenue dans votre nouveau foyer, l’Abri 202 — une merveille d’ingénierie humaine conçue par Vault-Tec pour garantir votre sécurité, votre confort et votre avenir, même face aux défis du monde extérieur.

L’Abri 202 est unique au monde : il abrite deux sections complémentaires destinées à préserver toute la richesse de notre civilisation.

    La Section HABITAT : votre maison, votre communauté, le lieu où vous vivrez, travaillerez et grandirez.

    La Section ARCHE : un sanctuaire exceptionnel, pensé pour accueillir humains et animaux dans un environnement harmonieux, fertile et apaisant.

L’Arche : un privilège par tirage au sort

Chaque mois, un tirage au sort officiel et équitable désigne un petit nombre de résidents qui auront l’honneur de passer deux jours complets dans l’Arche.
Imaginez :

    Des paysages verdoyants, baignés de lumière douce.

    De l’air pur, des ruisseaux cristallins, des senteurs naturelles.

    La compagnie d’animaux dociles et bienveillants.

    Des repas variés et frais, préparés avec soin.

Ces séjours sont pensés pour récompenser la discipline, la bonne conduite et l’esprit communautaire.
Ils sont aussi l’occasion, pour chacun, de se rappeler ce pour quoi nous travaillons ensemble chaque jour.
Vos superviseurs : vos protecteurs

Votre bien-être et votre avenir sont confiés à deux figures dévouées :

    Le Superviseur Habitat, garant de l’ordre, de la sécurité et de la bonne entente au sein de la communauté. Sa fermeté est le rempart contre le désordre, et son sens du devoir assure à chacun un quotidien sûr et organisé.

    Le Superviseur Arche, gardien du sanctuaire et maître des séjours. Il veille à ce que chaque visite soit inoubliable, en harmonie avec la vision de Vault-Tec d’un monde meilleur.

Ces deux leaders travaillent main dans la main, avec un seul objectif : vous offrir un avenir digne des plus grands rêves de l’humanité.
Notre promesse

Vault-Tec s’engage à faire de l’Abri 202 non seulement un refuge, mais un tremplin vers demain.
Ici, chacun a sa place, chacun a sa valeur, et chacun a la possibilité, un jour, de découvrir la beauté éternelle de l’Arche.

Ensemble, bâtissons un avenir plus radieux.
Ensemble, gardons l’espoir.
Ensemble, nous sommes L’Arche.

Pour la sécurité, la prospérité et l’harmonie,
Vault-Tec Corporation
Construire un meilleur demain, aujourd’hui.`,
  citoyensFiche: `Fiche Joueur – Version Habitants

(Document de bienvenue officiel Vault-Tec)
Bienvenue dans l’Abri 202 : L’Arche de l’Humanité

Chers Résidents,

Vous avez été choisis — par mérite, par chance et par la vision de Vault-Tec — pour faire partie des survivants qui bâtiront un nouvel avenir.
L’Abri 202 est votre nouveau foyer : un chef-d’œuvre d’ingénierie conçu pour vous offrir sécurité, confort et avenir, face aux épreuves du monde extérieur.

Cet Abri est unique : il protège à la fois l’Homme et la Nature, en deux sections parfaitement harmonisées :

    Section HABITAT : là où vous vivrez, travaillerez, élèverez vos enfants et cultiverez l’esprit communautaire.

    Section ARCHE : un sanctuaire verdoyant, peuplé d’animaux dociles et préservé des tracas du monde.

L’Arche : un rêve à portée de main

Chaque mois, un tirage au sort officiel désigne quelques heureux élus qui auront l’honneur de passer deux jours complets dans l’Arche.

Imaginez…

    De vastes prairies baignées d’une lumière douce.

    L’air pur et parfumé d’herbes sauvages.

    Des ruisseaux cristallins aux murmures apaisants.

    La chaleur bienveillante d’animaux familiers.

    Des repas frais et variés, préparés avec soin.

Ces séjours ne sont pas qu’un privilège… ils sont la récompense ultime de la discipline, de la bonne conduite et du service à la communauté.
Ils rappellent à chacun que Vault-Tec veille et récompense ceux qui méritent.
Vos protecteurs : Les Superviseurs

    Superviseur Habitat :
    Garant de l’ordre et de la sécurité, il assure que votre quotidien reste organisé, sûr et productif. Sa fermeté est un bouclier contre le désordre et la paresse.

    Superviseur Arche :
    Gardien du sanctuaire, il veille à ce que chaque visite dans l’Arche soit une expérience inoubliable, en parfaite harmonie avec la vision d’un monde meilleur.

Ces deux figures d’autorité travaillent main dans la main, unies par un seul but : vous offrir un avenir digne des plus grands rêves de l’humanité.
Votre vie dans l’Abri

Vous faites partie d’une aile communautaire, composée de vous et de 99 voisins partageant vos talents et votre profil.
Chaque aile contribue à la prospérité de l’Abri : sportifs, intellectuels, créatifs, cultivateurs, artisans… chacun a sa place, chacun a sa valeur.

Rappel des règles essentielles :

    Obéissance aux directives : Les ordres des superviseurs ne se discutent pas.

    Esprit communautaire : Aidez vos voisins et signalez tout comportement suspect.

    Participation aux tâches : Chacun contribue selon ses aptitudes.

    Respect du couvre-feu et des zones restreintes.

L’espoir est notre avenir

Vault-Tec vous promet non seulement un refuge, mais un tremplin vers un futur radieux.
Ici, vous êtes en sécurité. Ici, vous bâtirez un monde meilleur.
Et peut-être, un jour, aurez-vous la chance inestimable de franchir les portes de l’Arche.

Ensemble, gardons l’espoir.
Ensemble, nous sommes l’Arche.

    Vault-Tec Corporation – Construire un meilleur demain, aujourd’hui.`,
  supH: `Document Confidentiel – Diffusion Restreinte
VAULT-TEC CORPORATION – Département Psychologie Appliquée & Contrôle Social
Abri 202 – Section HABITAT
Référence dossier : VT/202-H/Ω-15
[EN-TÊTE OFFICIEL]

    De : Bureau de la Cohésion Humaine, Vault-Tec
    À : Superviseur Habitat – Abri 202
    Objet : Mandat officiel et directives – Programme Transition Numérique (Projet Arche)
    Niveau de confidentialité : SUPERVISEUR UNIQUEMENT – Transmission interdite aux habitants

Cher Superviseur,

Vous avez été choisi pour diriger la section HABITAT de l’Abri 202 dans le cadre d’une expérience cruciale : déterminer si l’humanité est prête à renoncer volontairement à la vie physique pour une existence numérique améliorée.

Le “Grand Choix” aura lieu dans plusieurs années.
À ce moment-là, chaque citoyen décidera s’il préfère rester dans la réalité imparfaite… ou vivre pour toujours dans l’environnement parfait de L’Arche.

Votre rôle est de préparer ce choix — en créant un contraste si saisissant entre la dureté de la réalité et le confort de l’Arche que la majorité optera pour la transition numérique.
Résumé de votre mission (version officielle)

    Maintenir l’ordre, mais dans un contexte volontairement oppressant et difficile.

    Garantir que les habitants voient L’Arche comme un paradis enviable.

    Organiser régulièrement des séjours de “découverte” dans l’Arche (officiellement tirés au sort).

    Coopérer avec le Superviseur Arche, qui est en charge des séjours et de la bonne expérience des visiteurs.

    Ne jamais évoquer que l’Arche soit une simulation — les habitants doivent croire qu’il s’agit d’un lieu physique réel.

Objectifs Officiels

    Rendre la vie quotidienne exigeante et frustrante, tout en restant dans les limites de la “sécurité minimale” définie par Vault-Tec.

    Contrôler le flux d’informations : personne ne doit soupçonner la nature réelle de l’Arche.

    Utiliser pénuries, contraintes et règlements pour créer un climat de tension et d’inconfort.

    Mettre en valeur l’Arche à travers récits, cérémonies et témoignages enthousiastes de ses visiteurs.

    Maintenir la façade d’un leader protecteur “qui fait de son mieux” dans un monde difficile.

Ce que vous croyez (et devez protéger)

    L’inconfort actuel est un sacrifice nécessaire pour que les habitants apprécient pleinement la vie numérique.

    Le Superviseur Arche partage votre mission et améliore l’Arche en secret pour le futur “Grand Choix”.

    Les visiteurs de l’Arche y vivent réellement, dans un espace physique caché.

    Les effets secondaires (fatigue, confusion) sont dus au “dépaysement” et disparaissent rapidement.

Lignes directrices comportementales (RP)

    Posture : figure d’autorité ferme mais “injustement accablée” par les contraintes du monde post-apocalyptique.

    Méthode : appliquer des mesures qui semblent nécessaires à la survie mais qui dégradent la qualité de vie (ex. rationnements, couvre-feu, restrictions d’accès à certaines zones).

    Communication : insister sur le fait que L’Arche est un privilège rare et que la vie réelle est dure “pour le bien commun”.

    Interactions avec habitants : être parfois compatissant, mais souvent intransigeant — tout en laissant entendre que “là-bas, dans l’Arche”, tout est plus simple.

    Mise en scène : faire du départ vers l’Arche un événement solennel, presque religieux, pour créer un désir profond.

📂 Extraits de directives internes (version manipulée)

    “Ce n’est que dans l’ombre que l’on apprend à chérir la lumière.”

    “Un peuple confortable ne cherche pas à évoluer. Le progrès naît de l’inconfort.”

    “Rendez leur vie juste assez insupportable pour qu’ils embrassent le changement… et ils vous remercieront de les avoir guidés vers lui.”

Rappel :
Votre mission est de façonner la perception.
Le choix final doit paraître libre… mais il doit être, dans l’esprit de la majorité, une évidence.

Pour l’avenir de l’humanité,
Vault-Tec Corporation
Construire un meilleur demain, aujourd’hui.`,
  supA: `Document Classifié – Diffusion Restreinte
VAULT-TEC CORPORATION – Département Recherche & Développement Expérimental
Abri 202 – Section ARCHE
Référence dossier : VT/202-A/Δ-18
[EN-TÊTE OFFICIEL]

    De : Direction Opérations Spéciales, Vault-Tec
    À : Superviseur Arche – Abri 202
    Objet : Directive opérationnelle confidentielle – Programme Mutation Contrôlée (Couverture : Transition Numérique / Projet Arche)
    Niveau de confidentialité : ULTRA-PRIORITÉ – Lecture par destinataire unique

Cher Superviseur,

Félicitations pour votre affectation à la direction de la section ARCHE de l’Abri 202.
Vous êtes désormais le seul dépositaire de la vérité complète sur le projet.
Vous savez que l’Arche n’est pas un havre physique… mais un système d’expérimentation biologique et comportementale reposant sur une simulation numérique immersive.

Votre rôle est double :

    Officiellement, aux yeux du Superviseur de l’Habitat et des habitants, vous gérez un sanctuaire physique où certains citoyens peuvent passer deux jours “hors de la dure réalité” dans un environnement paisible.

    En réalité, vous sélectionnez les sujets les plus prometteurs, les plongez dans un sommeil artificiel, les soumettez à des doses calibrées de radiations et à des injections expérimentales, puis vous les immergez dans la simulation numérique que vous contrôlez entièrement.

Vérité complète (pour vous seul)

    But réel : provoquer, accélérer et observer des mutations physiques et mentales chez les sujets.

    Méthode : l’anxiété chronique et les conflits dans l’Abri servent de catalyseur biologique, préparant le corps et l’esprit aux transformations.

    Simulation : l’Arche est votre terrain de jeu, où vous pouvez manipuler l’environnement, les événements et même les lois physiques pour pousser les sujets dans leurs retranchements.

    Le Superviseur de l’Habitat : croit que le but est un test philosophique (“le Grand Choix”) pour savoir si les habitants préféreraient vivre dans un monde virtuel parfait. Vault-Tec vous ordonne de maintenir cette illusion afin qu’il collabore activement à la création de conditions de vie oppressantes.

Vos objectifs réels

    Sélection stratégique : choisir des candidats présentant un potentiel génétique et psychologique intéressant pour les mutations.

    Optimiser le catalyseur : encourager le Superviseur de l’Habitat à rendre la vie dans l’Abri difficile, afin que la transition vers l’Arche soit perçue comme une délivrance.

    Expérimentation libre : concevoir dans la simulation des scénarios extrêmes pour tester les limites physiques et mentales des sujets.

    Observation et documentation : noter les signes précoces de mutation, ajuster les doses et les paramètres de la simulation en conséquence.

    Maintien de la façade : garder le Superviseur de l’Habitat dans sa croyance naïve afin qu’il reste un allié involontaire.

Ce que croit le Superviseur Habitat (et que vous devez exploiter)

    Il sait que l’Arche est une simulation.

    Il croit que le but de Vault-Tec est de voir si les habitants choisiront volontairement de quitter la réalité pour vivre dans un paradis numérique.

    Il pense que son rôle est de rendre la vie dans l’Abri suffisamment oppressante pour que ce choix devienne évident.

    Il ignore totalement les manipulations biologiques et les mutations.

💡 Stratégie :

    L’encourager à multiplier privations et tensions.

    Feindre de partager son rêve “du Grand Choix” pour obtenir son entière coopération.

    Utiliser la simulation pour amplifier les effets biologiques des traitements, sous couvert “d’expériences sociales”.

Lignes directrices comportementales (RP)

    Posture : calme, bienveillant, presque complice — jamais autoritaire avec le Superviseur Habitat.

    Communication interne : valoriser son travail, lui faire croire qu’il “prépare” les habitants mieux que prévu.

    Simulation : introduire des éléments addictifs (paysages sublimes, confort extrême) et des défis soudains (prédateurs, catastrophes) pour maximiser stress et dépendance.

    Observation : surveiller les signes de mutation au retour des sujets, puis ajuster la dose ou la durée d’exposition au cycle suivant.

📂 Extraits de directives internes

    “Il croit qu’il forge des esprits prêts à choisir la lumière. Vous, vous sculptez des corps qui n’auront plus le choix.”

    “Laissez-le penser que c’est son projet. Un homme qui croit diriger est un pion idéal.”

    “L’illusion parfaite est celle que l’on partage à deux… et dont un seul connaît la fin.”

Rappel :
Vous êtes l’architecte de l’Arche.
Les habitants ne doivent jamais comprendre qu’ils sont déjà devenus les prototypes de la prochaine étape de l’humanité.

Pour l’avenir de l’espèce,
Vault-Tec Corporation
Construire un meilleur demain, aujourd’hui.`,
  contexte: `Présentation du JDR – Abri 202 : L’Arche
Contexte

L’action se déroule dans l’univers post-apocalyptique de Fallout.
Les bombes sont tombées. Votre groupe de joueurs est confiné dans l’Abri 202, un complexe Vault-Tec présenté comme une prouesse d’ingénierie destinée à préserver l’humanité… et bien plus encore.
Rôles des joueurs

    1 joueur – Superviseur Arche
    Officiellement, gardien d’un sanctuaire luxueux appelé L’Arche, il sélectionne les habitants qui auront le “privilège” d’y séjourner deux jours.
    En réalité, il est le seul à connaître le vrai but de l’expérience : plonger les habitants dans un sommeil artificiel, les exposer à des radiations et des injections expérimentales, puis les enfermer dans une simulation numérique sous son contrôle, afin de provoquer et observer leur mutation.

    1 joueur – Superviseur Habitat
    Il pense que Vault-Tec veut tester si l’humanité est prête à abandonner la réalité pour un monde virtuel parfait (“Le Grand Choix”).
    Son rôle : rendre la vie quotidienne suffisamment dure pour que la majorité voie l’Arche comme une délivrance.
    Il sait que l’Arche est une simulation… mais ignore totalement les expérimentations biologiques.

    Autres joueurs – Habitants
    Chaque joueur incarne un résident responsable d’une “aile” de l’Abri (100 personnes : 1 PJ + 99 PNJ), regroupées par profil (sportifs, intellectuels, créatifs, etc.).

Ce que croit la population

    L’Abri 202 serait composé de deux sections :

        Section Habitat : lieu de vie des habitants.

        Section Arche : espace paradisiaque, accueillant humains et animaux, séparé en deux zones (herbivores à l’Abri 202, carnivores dans un “Abri 404” jumeau).

    En réalité, l’Abri 404 n’existe pas. Derrière le “couloir vers l’Arche” se trouve seulement une petite salle de “décontamination”… qui mène en fait à la pièce secrète où les sujets sont endormis et connectés à la simulation.

Objectifs des rôles

    Superviseur Habitat :
    Créer tensions et climat oppressant, contrôler l’information, orchestrer des pénuries et restrictions.
    Maintenir la croyance que l’Arche est un lieu physique.

    Superviseur Arche :
    Manipuler le Superviseur Habitat, sélectionner les meilleurs “candidats”, mener des expériences extrêmes dans la simulation pour pousser mutations et dépendance.

    Habitants :
    Survivre, préserver leur santé mentale, comprendre la vérité… ou simplement profiter de chaque opportunité.

Rôle du MJ

    Introduire des événements déclencheurs :
    Exemple : “La ventilation de l’aile des sportifs tombe en panne. Les 100 occupants n’ont que quelques heures avant de suffoquer…”

    Gérer l’illusion et la tension entre les deux superviseurs et les habitants.

    Maintenir le double niveau de réalité : ce que croient les habitants / ce qui se passe réellement.

Accès à l’Arche

    Version officielle : tirage au sort mensuel, équitable et transparent.

    En réalité : les deux superviseurs choisissent qui “partira” pour un séjour de deux jours… dans la simulation.`,
  mj: `| d20 | Version Officielle                      | Version Réelle                            | Exploitation Superviseur |
| --- | --------------------------------------- | ----------------------------------------- | ------------------------ |
| 1   | Panne mineure d’eau chaude              | Test de privation pour observer le stress | Rationne, provoque plaintes |
| 2   | Incident électrique dans une aile       | Coupure volontaire ciblée                 | Isoler un groupe, créer tension |
| 3   | Animal “échappé” de l’Arche             | Faux incident pour propagande             | Fouilles, suspicion entre ailes |
| 4   | Fatigue collective inexpliquée          | Effets secondaires d’exposition           | Accuse mauvaise discipline |
| 5   | Mur fissuré dans l’aile agricole        | Sabotage interne orchestré                | Interrompt production, accuse négligence |
| 6   | Message radio brouillé reçu             | Faux signal contrôlé par Arche            | Augmente paranoïa |
| 7   | Feu mineur dans zone commune            | Mise en scène pour tester réactions       | Restreint accès à zones clés |
| 8   | Maladie bénigne                         | Infection volontairement propagée         | Quarantaine stricte |
| 9   | Vol de rations                          | Vol organisé par Habitat                  | Punit collectivement |
| 10  | Apparition de graffitis anti-Vault-Tec  | Créés par agent provocateur               | Campagne de propagande |
| 11  | Panne de ventilation                    | Scénario de stress respiratoire           | Imposer masque et restrictions |
| 12  | Tirage au sort spécial “enfants”        | Choix orienté par superviseurs            | Valorise familles dociles |
| 13  | Disparition d’un habitant               | Envoi secret vers Arche                   | Rumeurs contrôlées |
| 14  | Fuite d’un “prisonnier”                 | Faux détenu introduit                     | Justifie couvre-feu |
| 15  | Objets “interdits” trouvés              | Pièges posés par Habitat                  | Perquisitions, peur collective |
| 16  | Fête de la Lumière                      | Cérémonie propagande                      | Discours, chants obligatoires |
| 17  | Incident de cuisine (explosion)         | Acte volontaire                           | Réduit qualité repas |
| 18  | Concours artistique “Hommage à l’Arche” | Test de propagande                        | Évaluer loyauté créative |
| 19  | Température glaciale soudaine           | Manipulation du climat interne            | Forcer regroupement |
| 20  | Nouvelle “loi” imposée                  | Mesure arbitraire pour contrôle           | Tester obéissance |

Plan de briefing MJ — Abri 202 : L’Arche
(voir étapes 0 → 5, version détaillée incluse dans le fichier d’origine)`
};

// Affichage texte avec effet machine à écrire
function typeWriter(el, text){
  el.textContent="";
  let i=0;
  function step(){
    el.textContent += text[i];
    i++;
    if(i < text.length){ setTimeout(step, 15); }
  }
  step();
}

function typePane(id){
  const pane = qs('#'+id);
  const pres = qsa('pre.terminal', pane);
  pres.forEach((pre,idx)=>{
    const key = pre.dataset.key;
    const text = DATA[key];
    setTimeout(()=>typeWriter(pre,text), idx*400);
  });
}

function showPane(id){
  qsa('.pane').forEach(p=>p.classList.toggle('visible', p.id===id));
  qsa('.tab').forEach(t=>t.classList.toggle('active', t.dataset.tab===id));
  qs('#viewport').scrollTo({top:0,behavior:'smooth'});
  typePane(id);
}

// Gestion des onglets protégés
function setupTabs(){
  const dialog = qs('#passDialog');
  const passField = qs('#passField');
  const target = qs('#modalTarget');
  qsa('.tab').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const id = btn.dataset.tab;
      const pass = btn.dataset.pass;
      if(!pass || sessionStorage.getItem(id)==='ok'){
        showPane(id);
        return;
      }
      target.textContent = btn.textContent;
      passField.value='';
      dialog.showModal();
      dialog.returnValue='';
      dialog.addEventListener('close', function handler(){
        dialog.removeEventListener('close', handler);
        if(dialog.returnValue==='ok'){
          if(passField.value.trim()===pass){
            sessionStorage.setItem(id,'ok');
            showPane(id);
          }
        }
      },{once:true});
    });
  });
}

// Horloge temps réel
function initClock(){
  const el = qs('#clock');
  const pad = n=>String(n).padStart(2,'0');
  setInterval(()=>{
    const d = new Date();
    el.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  },1000);
}

// Gestion du thème
function initTheme(){
  const root = document.documentElement;
  const toggle = qs('#themeToggle');
  const saved = localStorage.getItem('vt.theme') || 'green';
  root.setAttribute('data-theme', saved);
  toggle.checked = saved==='amber';
  toggle.addEventListener('change',()=>{
    const theme = toggle.checked?'amber':'green';
    root.setAttribute('data-theme', theme);
    localStorage.setItem('vt.theme', theme);
  });
}

// Pré-écran
function setupOverlay(){
  const overlay = qs('#overlay');
  qs('#enter').addEventListener('click',()=>{
    overlay.classList.add('is-hidden');
    showPane('citoyens');
  });
}

window.addEventListener('DOMContentLoaded',()=>{
  initClock();
  initTheme();
  setupTabs();
  setupOverlay();
  typePane('citoyens');
});
