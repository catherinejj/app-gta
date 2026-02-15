# Backend – Application de gestion des congés et absences

Ce projet correspond au backend de l'application interne de gestion des congés et absences.

Projet réalisé dans le cadre du Mastère Développement Full Stack – Ynov Aix-en-Provence
Année universitaire : 2025-2026 
---

## Auteur

Catherine Jules
Mastère Développement Full Stack
---

## Objectif

Ce backend expose une API REST permettant :

- L’authentification des utilisateurs (JWT)
- La gestion des rôles (Employé, Manager, RH)
- La création et gestion des demandes d'absence
- La validation ou le refus des demandes
- La consultation des soldes
- La gestion des droits (module RH si implémenté)

L’architecture suit les principes de la Clean Architecture afin de garantir :

- Une séparation claire des responsabilités
- Une indépendance vis-à-vis du framework
- Une meilleure testabilité
- Une maintenabilité accrue
---

## Architecture

Le projet est structuré selon une approche Clean Architecture :

```bash
src/
├── domain/        → Entités et logique métier pure
├── application/   → Cas d’usage
├── infrastructure/→ Base de données, services externes
├── interfaces/    → Controllers, DTO, Guards
└── main.ts

````
---

## Technologies

NestJS 
- ypeScript
- Base de données relationnelle
- JWT pour l’authentification

---

## Lancement en local

### Installation

```bash
npm install
````

### Lancer en mode développement

```bash
npm run start:dev
```

---

## Authentification

L’API est sécurisée via JWT.
Certaines routes sont protégées par des Guards selon les rôles :

- Employé
- Manager
- RH
- Administrateur

---

## Tests

Les cas d’usage principaux sont testés via des tests unitaires.

Lancer les tests :

```bash
npm run test
```

---

## Contexte pédagogique

Ce backend est développé dans le cadre d’un projet de fin d’année.
L’objectif est de démontrer :

- La maîtrise d’une architecture propre
- La gestion des rôles et permissions
- La structuration d’un backend maintenable
- La mise en place de tests