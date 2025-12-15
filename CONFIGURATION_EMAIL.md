# Configuration de l'envoi d'emails pour le formulaire de contact

## 📧 Configuration EmailJS (Recommandé)

Pour recevoir les messages du formulaire de contact directement à `7.heaven.bistro@gmail.com`, suivez ces étapes :

### Étape 1 : Créer un compte EmailJS
1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Créez un compte gratuit (200 emails/mois gratuits)
3. Connectez-vous à votre compte

### Étape 2 : Configurer un service email
1. Dans le dashboard, allez dans **Email Services**
2. Cliquez sur **Add New Service**
3. Choisissez **Gmail** (ou votre service email préféré)
4. Connectez votre compte Gmail `7.heaven.bistro@gmail.com`
5. Notez le **Service ID** (ex: `service_xxxxx`)

### Étape 3 : Créer un template
1. Allez dans **Email Templates**
2. Cliquez sur **Create New Template**
3. Utilisez ce template :

**Subject:**
```
Nouveau message de contact - {{subject}}
```

**Content:**
```
Bonjour,

Vous avez reçu un nouveau message depuis le formulaire de contact du site 7 Heavens.

Détails:
- Nom: {{from_name}}
- Email: {{from_email}}
- Sujet: {{subject}}

Message:
{{message}}

---
Pour répondre, cliquez sur "Reply" ou envoyez un email à: {{reply_to}}
```

4. Notez le **Template ID** (ex: `template_xxxxx`)

### Étape 4 : Obtenir votre clé publique
1. Allez dans **Account** > **General**
2. Copiez votre **Public Key** (ex: `xxxxxxxxxxxxx`)

### Étape 5 : Configurer les variables d'environnement
1. Créez un fichier `.env` à la racine du projet
2. Ajoutez ces lignes :

```env
VITE_EMAILJS_SERVICE_ID=votre_service_id
VITE_EMAILJS_TEMPLATE_ID=votre_template_id
VITE_EMAILJS_PUBLIC_KEY=votre_public_key
```

3. Remplacez les valeurs par celles que vous avez notées
4. Redémarrez le serveur de développement

### Étape 6 : Tester
1. Remplissez le formulaire de contact sur votre site
2. Envoyez un message de test
3. Vérifiez que vous recevez l'email à `7.heaven.bistro@gmail.com`

---

## 🔄 Alternative : Configuration Netlify Forms

Si vous préférez utiliser Netlify Forms :

1. Le formulaire est déjà configuré avec `data-netlify="true"`
2. Allez dans votre dashboard Netlify
3. Activez les notifications par email pour le formulaire "contact"
4. Configurez l'email de destination : `7.heaven.bistro@gmail.com`

---

## ⚠️ Important

- Ne commitez **JAMAIS** le fichier `.env` dans Git
- Le fichier `.env.example` est fourni comme modèle
- Les variables d'environnement doivent commencer par `VITE_` pour être accessibles dans le code

---

## 🆘 Support

Si vous rencontrez des problèmes :
1. Vérifiez que toutes les variables d'environnement sont correctement configurées
2. Vérifiez la console du navigateur pour les erreurs
3. Vérifiez que votre compte EmailJS est actif
4. Assurez-vous que le service email est bien connecté

