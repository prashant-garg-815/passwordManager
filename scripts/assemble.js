const fs = require('fs');
const path = require('path');

const basePath = process.cwd();
const shellDist = path.join(basePath, 'apps', 'shell', 'dist');

const microapps = ['auth-ui', 'dashboard', 'user-profile'];

console.log('Assembling microapps for production...');

if (!fs.existsSync(shellDist)) {
    console.error(`Error: Shell dist directory ${shellDist} does not exist. Run "turbo run build" first.`);
    process.exit(1);
}

for (const app of microapps) {
    const appDist = path.join(basePath, 'apps', app, 'dist');
    const targetPath = path.join(shellDist, app);

    if (!fs.existsSync(appDist)) {
        console.warn(`Warning: source directory ${appDist} does not exist. Skipping ${app}.`);
        continue;
    }

    if (fs.existsSync(targetPath)) {
        fs.rmSync(targetPath, { recursive: true, force: true });
    }

    fs.cpSync(appDist, targetPath, { recursive: true });
    console.log(`Successfully copied ${app} dist into shell dist.`);
}

console.log('Assembly complete.');
