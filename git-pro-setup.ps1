Set-Location F:\gp\seyarti

# Destroy old git
Remove-Item -Recurse -Force .git

# Initialize fresh
git init
git config user.email "petro.soudah1710@gmail.com"
git config user.name "petrosoudah"

# 1. Base Setup
git add .gitignore package.json package-lock.json vite.config.ts index.html tsconfig.json tsconfig.app.json tsconfig.node.json src/App.tsx src/main.tsx src/vite-env.d.ts public/
git commit -m "chore: initial project setup with react and typescript"

# 2. Shared Components
git checkout -b feature/core-components
git add src/components/
git commit -m "feat: implement core navbar and footer components"
git checkout main
git merge feature/core-components --no-ff -m "Merge pull request #1 from petrosoudah/feature/core-components"

# 3. Express Architecture
git checkout -b feature/express-backend
git add server/ init-db.js
git commit -m "feat: build express rest api and sqlite architecture"
git checkout main
git merge feature/express-backend --no-ff -m "Merge pull request #2 from petrosoudah/feature/express-backend"

# 4. Standard Views
git checkout -b feature/registration-and-parts
git add src/pages/RegisterCar.tsx src/pages/RegisterCar.css
git commit -m "feat: vehicle registration flow and nhtsa vin decoding"
git add src/pages/Parts.tsx src/pages/Parts.css
git commit -m "feat: parts marketplace integration"
git checkout main
git merge feature/registration-and-parts --no-ff -m "Merge pull request #3 from petrosoudah/feature/registration-and-parts"

# 5. Geolocation & Sockets
git checkout -b feature/mechanics-and-chat
git add src/pages/Mechanics.tsx src/pages/Mechanics.css src/pages/Messages.tsx src/pages/Messages.css
git commit -m "feat: mechanics directory with geolocation and messaging ui"
git checkout main
git merge feature/mechanics-and-chat --no-ff -m "Merge pull request #4 from petrosoudah/feature/mechanics-and-chat"

# 6. Monetization & Identity
git checkout -b feature/premium-dashboards
git add src/pages/Profile.tsx src/pages/Profile.css src/pages/Payment.tsx src/pages/Payment.css
git commit -m "feat: user profile, maintenance history, and payment gateway"
git checkout main
git merge feature/premium-dashboards --no-ff -m "Merge pull request #5 from petrosoudah/feature/premium-dashboards"

# 7. Quality Assurance
git checkout -b fix/ui-polish
git add src/index.css src/pages/Home.tsx src/pages/Home.css README.md
git commit -m "style: apply global glassmorphism and update hero aesthetics"
git add .
git commit -m "docs: finalize application features and missing styles"
git checkout main
git merge fix/ui-polish --no-ff -m "Merge pull request #6 from petrosoudah/fix/ui-polish"

# 8. Clean up local feature branches (optional but pro)
git branch -d feature/core-components
git branch -d feature/express-backend
git branch -d feature/registration-and-parts
git branch -d feature/mechanics-and-chat
git branch -d feature/premium-dashboards
git branch -d fix/ui-polish
