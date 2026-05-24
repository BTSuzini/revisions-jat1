const COURSES = [
  {
    theme: "Les bases",
    title: "Objectif d’un tableau",
    essential: "Un tableau représente l’enchaînement des parties et permet de désigner les qualifiés ou le vainqueur.",
    example: "Dans une épreuve nombreuse, plusieurs tableaux peuvent s’enchaîner : les vainqueurs d’un tableau deviennent qualifiés pour le tableau suivant.",
    trap: "Ne pas confondre tableau final et tableaux intermédiaires."
  },
  {
    theme: "Les bases",
    title: "Bon tableau = exact + satisfaisant",
    essential: "Un tableau exact respecte les règles. Un bon tableau respecte les règles et applique le maximum de recommandations.",
    example: "Deux tableaux peuvent être exacts, mais l’un peut être meilleur s’il traite plus équitablement les joueurs d’un même classement.",
    trap: "Un tableau réglementaire n’est pas forcément le meilleur tableau possible."
  },
  {
    theme: "Têtes de série",
    title: "Principe des têtes de série",
    essential: "Dans un tableau comportant des joueurs classés, les mieux classés doivent être placés pour se rencontrer le plus tard possible.",
    example: "La tête de série n°1 et la tête de série n°2 doivent être placées dans des zones opposées.",
    trap: "Un tableau avec joueurs classés doit présenter des têtes de série, sauf tableau ne comportant que des non-classés."
  },
  {
    theme: "Têtes de série",
    title: "Nombre de têtes de série",
    essential: "Le nombre de têtes de série est compris entre le huitième et la moitié de l’effectif du tableau, et au moins égal au nombre de qualifiés sortants.",
    example: "Pour un tableau de 16 joueurs qualifiant 4 joueurs, il faut au moins 4 têtes de série et au maximum 8.",
    trap: "Prendre trop de têtes de série peut compliquer la progression régulière du tableau."
  },
  {
    theme: "Têtes de série",
    title: "Désignation des têtes de série",
    essential: "La numérotation suit l’ordre du classement officiel. En cas d’égalité de classement, on procède par tirage au sort.",
    example: "Deux joueurs 30/1 candidats aux TS n°2 et n°3 sont départagés par tirage au sort.",
    trap: "Un qualifié entrant ne peut pas être tête de série."
  },
  {
    theme: "Qualifiés",
    title: "Qualifiés entrants et sortants",
    essential: "Les qualifiés entrants viennent du tableau précédent. Les qualifiés sortants sont les joueurs qui gagnent leur place pour le tableau suivant.",
    example: "Q1, Q2, Q3 désignent les qualifiés sortants ; q désigne souvent une place réservée à un qualifié entrant.",
    trap: "Ne jamais faire rencontrer deux qualifiés entrants pour leur première partie dans le tableau."
  },
  {
    theme: "Qualifiés",
    title: "Qualifiés sortants connus au même tour",
    essential: "Tous les qualifiés sortants d’un tableau doivent être connus au même tour.",
    example: "Si Q1 est connu après un tour de moins que Q2, le tableau est faux.",
    trap: "Un tableau déséquilibré peut produire des qualifiés trop tôt : à vérifier absolument."
  },
  {
    theme: "Règles obligatoires",
    title: "Même classement : entrée au même tour ou sur deux tours consécutifs",
    essential: "Tous les joueurs d’un même classement doivent entrer au même tour ou sur deux tours consécutifs.",
    example: "Des 30/3 répartis sur trois tours différents rendent le tableau faux.",
    trap: "La règle s’applique aussi aux non-classés."
  },
  {
    theme: "Règles obligatoires",
    title: "Ne pas faire entrer un joueur plus faible plus loin",
    essential: "Sauf pour les qualifiés, un joueur ne doit pas entrer plus loin qu’un joueur mieux classé que lui.",
    example: "Un 30/3 ne doit pas entrer après un 30/2 directement admis.",
    trap: "Les qualifiés entrants constituent une exception à cette règle."
  },
  {
    theme: "Recommandations",
    title: "Adversaires des qualifiés",
    essential: "Dans la mesure du possible, les qualifiés entrants doivent rencontrer les joueurs de plus faible classement directement admis.",
    example: "Un qualifié entrant affronte plutôt un 30/4 qu’un 30/1 directement admis.",
    trap: "C’est une recommandation, pas une règle absolue, mais elle améliore l’équité."
  },
  {
    theme: "Recommandations",
    title: "Compression",
    essential: "Une compression apparaît quand deux joueurs directement admis à un tour donné peuvent se rencontrer au tour suivant s’ils gagnent.",
    example: "Il est recommandé de programmer les compressions à classement égal.",
    trap: "Éviter qu’un joueur d’un même classement soit traité beaucoup plus durement que les autres."
  }
];
