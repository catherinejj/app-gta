# FrontAppGta – Application de gestion des congés et absences

Ce projet correspond à l’interface utilisateur de l'application interne de gestion des congés et absences.

Projet réalisé dans le cadre du Mastère Développement Full Stack – Ynov Aix-en-Provence
Année universitaire : 2025-2026 

---

## Auteur

Catherine Jules
Ynov Mastère Développement Full Stack

---

## Objectif

Le frontend permet aux utilisateurs :

- De se connecter à l’application
- De consulter leurs soldes
- De déposer des demandes d’absence
- De consulter le calendrier
- Pour les managers : de valider ou refuser des demandes
- Pour les RH : d’administrer les soldes (si module activé)

L’interface est conçue pour être :

- Responsive (desktop et mobile)
- Accessible
- Épurée et intuitive

---

## Structure du projet

Le projet est structuré par fonctionnalités :

```bash
src/
├── app/
│   ├── core/        → Services globaux (auth, guards, interceptors)
│   ├── features/    → Modules fonctionnels (employé, manager, RH)
│   ├── shared/      → Composants réutilisables
│   └── pages/       → Pages principales ````

```

---

## Technologies

- Angular version 21.2.0.
- TypeScript
- Communication avec l’API REST NestJS
- Architecture modulaire

---

## Lancement en local

### Installation


```bash
npm install
```

### Lancer l’application

```bash
ng serve
```

Accès via :

```
http://localhost:4200
```

---

## Communication avec le backend

Le frontend consomme l’API REST exposée par le backend NestJS.

Les URLs des services sont configurées dans les fichiers d’environnement.

---

## Contexte pédagogique

Ce frontend est développé dans le cadre d’un projet de fin d’année.
L’objectif est de démontrer :

- La capacité à structurer une application Angular version 21.2.0.
- La gestion des rôles côté interface
- L’intégration avec une API sécurisée
- La cohérence UX entre desktop et mobile