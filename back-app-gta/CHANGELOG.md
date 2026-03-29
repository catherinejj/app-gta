# Changelog – Backend

## [0.3.0] - 2026-03-21

### Ajout
- Implémentation des opérations CRUD minimales pour les entités principales du domaine RH (#13)
  - User
  - Department
  - Contract
  - RequestType
  - LeaveRequest
  - LeaveBalance
  - ApprovalHistory

- Extension du modèle Prisma pour la gestion avancée des demandes RH (#14)
  - Hiérarchie des types de demandes (parent/enfant)
  - Système de tags pour les types de demandes
  - Règles d’éligibilité avancées (contrat, RQTH, télétravail, ancienneté, quotité, département)
  - Ajout de métadonnées UI (couleur, icône, ordre d’affichage)

### Modifié
- Amélioration de la structure du modèle métier pour anticiper les besoins RH complexes
- Préparation du backend pour l’intégration avec l’interface front-end Angular

## [0.2.0] - 2026-02-28

### Ajout
- Implémentation de l’inscription (register) (#3)
- Implémentation de la connexion avec JWT (#4)
- Implémentation de la déconnexion (logout) (#9)
- Implémentation de la mise à jour de rôle par un administrateur (#5)
- Implémentation du cas d’usage GetAllUsers (#11)
- Implémentation du cas d’usage SearchUsers (#1)
- Implémentation du cas d’usage GetUserById (#12)

### Modifié
- Séparation des modèles User/Auth et ajout des champs de suivi de connexion (lastLoginAt, lastLogoutAt)
- Ajout du champ rqth sur User

## [0.1.0] - 2026-02-27

### Ajout
- Mise en place de Prisma 5
- Définition du modèle User et de l’enum Role (ADMIN, USER, MANAGER, RH)
- Création de la migration initiale
- Génération du client Prisma
- Ajout d’un script de seed pour créer un administrateur par défaut
