Une interface **React** pour construire visuellement un scénario marketing composé d’étapes conditionnelles pouvant s’exécuter **séquentiellement ou en parallèle**, puis de le **simuler côté client**.

---

## 📌 Fonctionnalités

- Ajouter, modifier et supprimer des étapes (nodes).
- Définir des **transitions conditionnelles** (✅ Success / ❌ Failure).
- Lancer une **simulation depuis l’étape `start`**.
- Simulation **100% côté client**.
- Affichage d’un **journal d’exécution dynamique**.
- Types d’étapes : `start`, `sms`, `email`, `date`, `end`.

---

## 🛠 Comportement de la simulation

- Chaque étape retourne un **résultat simulé** :
  - `sms` → toujours Success
  - `email` → 50% chance Success / Failure
  - `date` → s'affiche au lancement du workflow
- Les étapes **sans dépendances** s’exécutent **en parallèle**.
- Les transitions conditionnelles déterminent la suite de l’exécution.

---

## 🎨 Interface

- Graphe interactif des étapes via **React Flow**.
- Éditeur d’étape avec formulaire pour modifier le type et les paramètres.
- Journal d’exécution dynamique.

---

## 💻 Technologies

- **Framework** : React + TypeScript
- **Visualisation** : React Flow
- **Journal d’exécution** : Hook personnalisé `useLogs`

---

## 🚀 Installation et utilisation

```bash
# Cloner le projet
cd opportunity-front-test

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

## Utilisation

### 1. Ajouter une étape
- Ouvrir le panneau latéral.
- Choisir le type de node (`start`, `sms`, `email`, `date`, `end`).
- Cliquer sur **Ajouter node**.

### 2. Connecter les étapes
- Glisser-déposer les connexions entre les nodes.

### 3. Modifier un node
- Sélectionner le node voulu.
- Choisir un nouveau type dans le select.
- Cliquer sur **Modifier** pour appliquer le changement.

### 4. Lancer la simulation
- Cliquer sur **Lancer la simulation** depuis le panneau latéral.
- Les nodes s’exécutent en parallèle si possible et en séquence selon les transitions.

### 5. Consulter le journal d’exécution
- Les logs sont mis à jour en temps réel pendant la simulation.

```
