# 📧 Guide Complet : Configuration Netlify Forms

Ce guide vous explique étape par étape comment configurer Netlify Forms pour recevoir les emails du formulaire de contact directement à **7.heaven.bistro@gmail.com**.

---

## 📋 Prérequis

- Votre site doit être déployé sur Netlify
- Vous devez avoir accès au dashboard Netlify
- Un compte Netlify (gratuit suffit)

---

## 🚀 Étape 1 : Vérifier que le formulaire est bien configuré

Le formulaire est déjà configuré avec `data-netlify="true"` dans le code. Vérifiez que vous avez bien :

```html
<form 
  name="contact" 
  method="POST" 
  data-netlify="true" 
  ...
>
  <input type="hidden" name="form-name" value="contact" />
  ...
</form>
```

✅ **C'est déjà fait dans votre code !**

---

## 🚀 Étape 2 : Créer un fichier HTML statique pour Netlify

Netlify doit détecter le formulaire lors du build. Créez un fichier HTML statique :

1. Créez un fichier `public/contact-form.html` avec ce contenu :

```html
<!DOCTYPE html>
<html>
<head>
    <title>Contact Form</title>
</head>
<body>
    <form name="contact" method="POST" data-netlify="true" netlify-honeypot="botField">
        <input type="hidden" name="form-name" value="contact" />
        <p style="display: none;">
            <label>Ne remplissez pas ce champ si vous êtes humain : <input name="botField" /></label>
        </p>
        <p>
            <label>Nom: <input type="text" name="name" /></label>
        </p>
        <p>
            <label>Email: <input type="email" name="email" /></label>
        </p>
        <p>
            <label>Sujet: <input type="text" name="subject" /></label>
        </p>
        <p>
            <label>Message: <textarea name="message"></textarea></label>
        </p>
        <p>
            <button type="submit">Envoyer</button>
        </p>
    </form>
</body>
</html>
```

**Note :** Ce fichier n'est utilisé que par Netlify pour détecter le formulaire. Il n'est pas visible sur votre site.

---

## 🚀 Étape 3 : Déployer sur Netlify

1. **Si vous n'avez pas encore déployé :**
   - Allez sur [https://app.netlify.com](https://app.netlify.com)
   - Connectez votre repository GitHub/GitLab/Bitbucket
   - Netlify détectera automatiquement les paramètres de build

2. **Si votre site est déjà déployé :**
   - Poussez vos changements (commit + push)
   - Netlify redéploiera automatiquement

---

## 🚀 Étape 4 : Configurer les notifications email dans Netlify

### 4.1 Accéder aux paramètres du formulaire

1. Connectez-vous à [https://app.netlify.com](https://app.netlify.com)
2. Sélectionnez votre site
3. Allez dans **Site settings** (Paramètres du site)
4. Dans le menu de gauche, cliquez sur **Forms** (Formulaires)

### 4.2 Activer les notifications email

1. Vous devriez voir votre formulaire "contact" dans la liste
2. Cliquez sur **Settings** (Paramètres) à côté du formulaire "contact"
3. Ou cliquez directement sur le nom du formulaire

### 4.3 Configurer l'email de destination

1. Dans la section **Form notifications** (Notifications du formulaire)
2. Cliquez sur **Add notification** (Ajouter une notification)
3. Sélectionnez **Email notification** (Notification par email)
4. Entrez l'adresse email : **7.heaven.bistro@gmail.com**
5. Configurez le sujet de l'email (optionnel) :
   ```
   Nouveau message de contact - {{subject}}
   ```
6. Configurez le corps de l'email (optionnel) :
   ```
   Nouveau message depuis le formulaire de contact :
   
   Nom: {{name}}
   Email: {{email}}
   Sujet: {{subject}}
   
   Message:
   {{message}}
   ```
7. Cliquez sur **Save** (Enregistrer)

---

## 🚀 Étape 5 : Tester le formulaire

1. Allez sur votre site déployé
2. Remplissez le formulaire de contact
3. Envoyez un message de test
4. Vérifiez votre boîte email **7.heaven.bistro@gmail.com**
5. Vous devriez recevoir l'email dans quelques secondes

---

## 🔧 Configuration Avancée (Optionnel)

### Personnaliser le template d'email

Dans les paramètres de notification, vous pouvez utiliser ces variables :
- `{{name}}` - Nom du client
- `{{email}}` - Email du client
- `{{subject}}` - Sujet du message
- `{{message}}` - Contenu du message

### Filtrer les spams

Netlify Forms inclut déjà une protection anti-spam. Le champ `botField` (honeypot) dans votre formulaire ajoute une couche supplémentaire.

### Limiter les soumissions

Dans les paramètres du formulaire, vous pouvez :
- Limiter le nombre de soumissions par heure/jour
- Bloquer certaines adresses IP
- Ajouter un CAPTCHA (nécessite un plan payant)

---

## ⚠️ Dépannage

### Le formulaire ne fonctionne pas

1. **Vérifiez que le fichier HTML statique existe :**
   - Le fichier `public/contact-form.html` doit être présent
   - Il doit contenir le formulaire avec `data-netlify="true"`

2. **Vérifiez la console du navigateur :**
   - Ouvrez les outils de développement (F12)
   - Regardez l'onglet Console pour les erreurs

3. **Vérifiez les logs Netlify :**
   - Allez dans **Forms** > **Submissions**
   - Vérifiez si les soumissions apparaissent

### Les emails ne sont pas reçus

1. **Vérifiez les paramètres de notification :**
   - L'email est bien configuré : **7.heaven.bistro@gmail.com**
   - La notification est activée

2. **Vérifiez le dossier spam :**
   - Les emails peuvent être dans le dossier spam
   - Ajoutez `notifications@netlify.com` à vos contacts

3. **Vérifiez les logs Netlify :**
   - Allez dans **Forms** > **Submissions**
   - Vérifiez si les soumissions sont enregistrées

### Le formulaire n'apparaît pas dans Netlify

1. **Attendez quelques minutes :**
   - Netlify peut prendre quelques minutes pour détecter le formulaire

2. **Vérifiez le build :**
   - Allez dans **Deploys** (Déploiements)
   - Vérifiez que le dernier déploiement a réussi

3. **Vérifiez le fichier HTML statique :**
   - Le fichier `public/contact-form.html` doit être présent
   - Il doit être inclus dans le build

---

## 📊 Statistiques et Suivi

Dans le dashboard Netlify, vous pouvez :
- Voir toutes les soumissions dans **Forms** > **Submissions**
- Exporter les données en CSV
- Voir les statistiques (nombre de soumissions, taux de spam, etc.)

---

## 💡 Astuces

1. **Testez en local d'abord :**
   - Utilisez `netlify dev` pour tester localement
   - Les formulaires fonctionnent même en local

2. **Configurez plusieurs emails :**
   - Vous pouvez ajouter plusieurs notifications
   - Par exemple : vous + votre équipe

3. **Utilisez les webhooks :**
   - Pour intégrer avec d'autres services (Slack, Discord, etc.)
   - Allez dans **Forms** > **Settings** > **Webhooks**

---

## ✅ Checklist de Configuration

- [ ] Formulaire configuré avec `data-netlify="true"`
- [ ] Fichier HTML statique créé (`public/contact-form.html`)
- [ ] Site déployé sur Netlify
- [ ] Formulaire détecté dans Netlify Dashboard
- [ ] Notification email configurée
- [ ] Email de destination : **7.heaven.bistro@gmail.com**
- [ ] Test effectué et email reçu

---

## 🆘 Besoin d'aide ?

Si vous rencontrez des problèmes :
1. Consultez la [documentation officielle Netlify Forms](https://docs.netlify.com/forms/setup/)
2. Vérifiez les logs dans le dashboard Netlify
3. Contactez le support Netlify si nécessaire

---

**Félicitations !** 🎉 Votre formulaire est maintenant configuré pour envoyer les emails directement à **7.heaven.bistro@gmail.com** !
