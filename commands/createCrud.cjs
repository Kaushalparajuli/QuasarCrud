const fs = require('fs');
const path = require('path');

// Extract arguments
const [,, entityModelName, entityApiPath = entityModelName, entityRouteUrl = entityModelName] = process.argv;

if (!entityModelName) {
  console.error('Please provide an entity name. Usage: "npm run create-crud entityModelName [entityApiPath] [entityRouteUrl]"');
  process.exit(1);
}

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const entityModelNameCapitalized = capitalize(entityModelName);
const entityModelNameStore = `${entityModelName}Store`;

// Resolve paths relative to the Quasar project root
const rootDir = path.resolve(__dirname, '../../../'); // Adjusted to go up to Quasar project root

console.log('root Dir', rootDir)

const pagesDir = path.join(rootDir, 'src', 'pages', entityModelName);
const componentsDir = path.join(rootDir, 'src', 'components', 'list', entityModelName);
const storesDir = path.join(rootDir, 'src', 'stores');
const commandsDir = path.join(__dirname, 'crud');

// Ensure directories exist
fs.mkdirSync(pagesDir, { recursive: true });
fs.mkdirSync(componentsDir, { recursive: true });
fs.mkdirSync(storesDir, { recursive: true });

// File paths
const componentFilePath = path.join(componentsDir, `${entityModelNameCapitalized}ListComponent.vue`);
const indexFilePath = path.join(pagesDir, 'index.vue');
const detailFilePath = path.join(pagesDir, 'detail.vue');
const addFilePath = path.join(pagesDir, 'add.vue');
const editFilePath = path.join(pagesDir, 'edit.vue');
const storeFilePath = path.join(storesDir, `${entityModelNameStore}.js`);

// Templates
let componentTemplate = fs.readFileSync(path.join(commandsDir, 'list.vue'), 'utf8');
let storeTemplate = fs.readFileSync(path.join(commandsDir, 'store.js'), 'utf8');
let indexTemplate = `<template>\n  <${entityModelNameCapitalized}ListComponent />\n</template>\n\n<script setup>\nimport ${entityModelNameCapitalized}ListComponent from 'src/components/list/${entityModelName}/${entityModelNameCapitalized}ListComponent.vue';\n</script>`;
let detailTemplate = fs.readFileSync(path.join(commandsDir, 'detail.vue'), 'utf8');
let addTemplate = fs.readFileSync(path.join(commandsDir, 'add.vue'), 'utf8');
let editTemplate = fs.readFileSync(path.join(commandsDir, 'edit.vue'), 'utf8');

// Replace placeholders in the templates
storeTemplate = storeTemplate.replace(/\${entityModelName}/g, entityModelName)
    .replace(/\${entityModelNameCapitalized}/g, entityModelNameCapitalized)
    .replace(/\${entityApiUrl}/g, entityApiPath);
componentTemplate = componentTemplate.replace(/\${entityModelName}/g, entityModelName)
    .replace(/\${entityModelNameCapitalized}/g, entityModelNameCapitalized)
    .replace(/\${entityRouteUrl}/g, entityRouteUrl)
    .replace(/\${entityApiUrl}/g, entityApiPath);
detailTemplate = detailTemplate.replace(/\${entityModelName}/g, entityModelName)
    .replace(/\${entityModelNameCapitalized}/g, entityModelNameCapitalized)
    .replace(/\${entityApiUrl}/g, entityApiPath)
    .replace(/\${entityRouteUrl}/g, entityRouteUrl);
addTemplate = addTemplate.replace(/\${entityModelName}/g, entityModelName)
    .replace(/\${entityModelNameCapitalized}/g, entityModelNameCapitalized)
    .replace(/\${entityApiUrl}/g, entityApiPath)
    .replace(/\${entityRouteUrl}/g, entityRouteUrl);
editTemplate = editTemplate.replace(/\${entityModelName}/g, entityModelName)
    .replace(/\${entityModelNameCapitalized}/g, entityModelNameCapitalized)
    .replace(/\${entityApiUrl}/g, entityApiPath)
    .replace(/\${entityRouteUrl}/g, entityRouteUrl);

// Check if files already exist and provide warnings
let fileExists = false;

if (fs.existsSync(componentFilePath)) {
  console.warn(`Component file already exists: ${componentFilePath}`);
  fileExists = true;
}

if (fs.existsSync(indexFilePath)) {
  console.warn(`Index file already exists: ${indexFilePath}`);
  fileExists = true;
}

if (fs.existsSync(detailFilePath)) {
  console.warn(`Detail file already exists: ${detailFilePath}`);
  fileExists = true;
}

if (fs.existsSync(addFilePath)) {
  console.warn(`Add file already exists: ${addFilePath}`);
  fileExists = true;
}

if (fs.existsSync(editFilePath)) {
  console.warn(`Edit file already exists: ${editFilePath}`);
  fileExists = true;
}

if (fs.existsSync(storeFilePath)) {
  console.warn(`Store file already exists: ${storeFilePath}`);
  fileExists = true;
}

if (fileExists) {
  console.warn('Some files already exist. Aborting the creation process.');
  process.exit(1);
}

// Write files if they don't already exist
fs.writeFileSync(componentFilePath, componentTemplate);
fs.writeFileSync(indexFilePath, indexTemplate);
fs.writeFileSync(detailFilePath, detailTemplate);
fs.writeFileSync(addFilePath, addTemplate);
fs.writeFileSync(editFilePath, editTemplate);
fs.writeFileSync(storeFilePath, storeTemplate);

console.log(`CRUD component, detail component, add component, edit component, and store created for "${entityModelName}" with API path "${entityApiPath}" and website route "${entityRouteUrl}"`);
