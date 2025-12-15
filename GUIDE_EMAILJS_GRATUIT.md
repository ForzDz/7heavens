# 📧 Guide GRATUIT : Configurer EmailJS (Sans Payer)

EmailJS est **100% GRATUIT** jusqu'à 200 emails par mois - parfait pour votre restaurant !

---

## ✅ Étape 1 : Créer un compte EmailJS (2 minutes)

1. Allez sur : **https://www.emailjs.com/**
2. Cliquez sur **"Sign Up"** (S'inscrire) en haut à droite
3. Créez un compte avec votre email (vous pouvez utiliser `7.heaven.bistro@gmail.com`)
4. C'est **GRATUIT** - pas besoin de carte bancaire !

---

## ✅ Étape 2 : Connecter Gmail (3 minutes)

1. Une fois connecté, allez dans **"Email Services"** (dans le menu de gauche)
2. Cliquez sur **"Add New Service"**
3. Sélectionnez **"Gmail"**
4. Cliquez sur **"Connect Account"**
5. Connectez-vous avec votre compte Gmail : `7.heaven.bistro@gmail.com`
6. Autorisez EmailJS à envoyer des emails
7. **Notez le Service ID** qui apparaît (ex: `service_abc123`)

---

## ✅ Étape 3 : Créer un Template Email (5 minutes)

1. Allez dans **"Email Templates"** (dans le menu de gauche)
2. Cliquez sur **"Create New Template"**
3. **Dans le champ "To Email"**, entrez : `7.heaven.bistro@gmail.com`
4. **Dans le champ "Subject"**, entrez :
   ```
   Nouveau message de contact - {{subject}}
   ```
5. **Dans le champ "Content"**, copiez-collez ceci :
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
6. Cliquez sur **"Save"**
7. **Notez le Template ID** qui apparaît (ex: `template_xyz789`)

---

## ✅ Étape 4 : Obtenir votre Clé Publique (1 minute)

1. Allez dans **"Account"** (en haut à droite) → **"General"**
2. Trouvez la section **"API Keys"**
3. **Copiez votre Public Key** (ex: `abcdefghijklmnop`)

---

## ✅ Étape 5 : Configurer dans Netlify (3 minutes)

1. Allez dans votre dashboard Netlify
2. Sélectionnez votre site **"7-heavens"**
3. Allez dans **"Site settings"** → **"Environment variables"**
4. Cliquez sur **"Add a variable"**
5. Ajoutez ces 3 variables :

   **Variable 1:**
   - Key: `VITE_EMAILJS_SERVICE_ID`
   - Value: (collez votre Service ID de l'étape 2)
   - Scope: All scopes
   - Cliquez sur **"Save"**

   **Variable 2:**
   - Key: `VITE_EMAILJS_TEMPLATE_ID`
   - Value: (collez votre Template ID de l'étape 3)
   - Scope: All scopes
   - Cliquez sur **"Save"**

   **Variable 3:**
   - Key: `VITE_EMAILJS_PUBLIC_KEY`
   - Value: (collez votre Public Key de l'étape 4)
   - Scope: All scopes
   - Cliquez sur **"Save"**

6. **Important** : Allez dans **"Deploys"** et déclenchez un nouveau déploiement (ou attendez le prochain déploiement automatique)

---

## ✅ Étape 6 : Tester (2 minutes)

1. Allez sur votre site : **https://7-heavens.netlify.app/contact**
2. Remplissez le formulaire de contact
3. Envoyez un message de test
4. Vérifiez votre boîte email **7.heaven.bistro@gmail.com**
5. Vous devriez recevoir l'email dans quelques secondes ! 🎉

---

## 💡 Résumé des 3 Clés à Noter

Quand vous configurez EmailJS, notez ces 3 valeurs :

1. **Service ID** : `service_xxxxx` (depuis Email Services)
2. **Template ID** : `template_xxxxx` (depuis Email Templates)
3. **Public Key** : `xxxxxxxxxxxxx` (depuis Account → General)

Ces 3 valeurs doivent être ajoutées dans Netlify → Environment variables.

---

## ⚠️ Important

- EmailJS est **GRATUIT** jusqu'à 200 emails/mois
- Pas besoin de carte bancaire
- Les emails sont envoyés directement depuis votre compte Gmail
- Fonctionne immédiatement après configuration

---

## 🆘 Problèmes Courants

**"Je ne reçois pas les emails"**
- Vérifiez le dossier spam
- Vérifiez que les 3 variables sont bien configurées dans Netlify
- Vérifiez la console du navigateur (F12) pour les erreurs

**"Le formulaire ne fonctionne pas"**
- Vérifiez que le site a été redéployé après avoir ajouté les variables
- Vérifiez que les noms des variables commencent bien par `VITE_`

**"Je ne trouve pas mes clés"**
- Service ID : Email Services → votre service Gmail
- Template ID : Email Templates → votre template
- Public Key : Account → General → API Keys

---

## ✅ Checklist Finale

- [ ] Compte EmailJS créé
- [ ] Service Gmail connecté
- [ ] Template email créé
- [ ] 3 variables ajoutées dans Netlify
- [ ] Site redéployé
- [ ] Test effectué et email reçu

---

**C'est tout !** 🎉 Votre formulaire enverra maintenant les emails directement à `7.heaven.bistro@gmail.com` **GRATUITEMENT** !

