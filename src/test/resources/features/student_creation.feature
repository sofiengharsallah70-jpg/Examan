Feature: Création de compte étudiant
  En tant que coordonnateur, je peux créer un compte étudiant afin que l'étudiant puisse accéder au système

  Scenario: Création réussie d'un compte étudiant
    Given l'utilisateur est sur la page "index.html"
    When il remplit le champ "firstName" avec "Jean"
    And il remplit le champ "lastName" avec "Dupont"
    And il remplit le champ "email" avec "jean.dupont@test.com"
    And il remplit le champ "studentNumber" avec "2026099"
    And il sélectionne le programme "Licence Informatique"
    And il clique sur le bouton "Créer le compte"
    Then le message de succès doit s'afficher
