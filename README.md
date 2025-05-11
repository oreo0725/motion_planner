# motion_planner
==============

motion planner in javascript version

This is an implementation of path planning algorithm.

## Algorithm

- NF1 - potential fields 
- BFS - Breath first search

---

# How to run

1. You have to install `node` and `yarn` in advance
2. Install package
    ```bash
    yarn
    ```
3. Run up at local
    ```bash
    yarn dev
    ```

## Deployment

This project is configured to automatically deploy to GitHub Pages using GitHub Actions. When changes are pushed to the `master` branch, the application will be built and deployed to the `gh-pages` branch.

### How it works

1. The GitHub Actions workflow is defined in `.github/workflows/deploy.yml`
2. When code is pushed to the `master` branch, the workflow:
   - Sets up Node.js
   - Installs dependencies
   - Builds the project
   - Deploys the built files to the `gh-pages` branch

### Manual Deployment

If you want to deploy manually:

1. Build the project:
   ```bash
   yarn build
   ```

2. The built files will be in the `dist` directory, which can be deployed to any static hosting service.

### Accessing the Deployed Application

Once deployed, the application will be available at:
`https://<your-github-username>.github.io/motion_planner/`

