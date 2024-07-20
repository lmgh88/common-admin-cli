#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const repoMap = {
    'vue-element-admin': 'https://github.com/PanJiaChen/vue-element-admin.git',
    'ant-design-vue': 'https://github.com/vueComponent/ant-design-vue-pro.git',
    'vue-vben-admin': 'https://github.com/vbenjs/vue-vben-admin.git',
    'iview-admin': 'https://github.com/iview/iview-admin.git',
    'd2-admin': 'https://github.com/d2-projects/d2-admin.git',
    'naive-ui-admin': 'https://github.com/jekip/naive-ui-admin.git',
    'mall-admin-web': 'https://github.com/macrozheng/mall-admin-web.git'
};

try {
    execSync('git --version', { stdio: 'ignore' });
} catch (err) {
    console.error('Git is not installed. Please install Git to continue.');
    process.exit(1);
}

console.log('Please select a template:');
Object.keys(repoMap).forEach((key, index) => {
    console.log(`${index + 1}. ${key}`);
});

rl.question('Enter your choice: ', (answer) => {
    const projectKey = Object.keys(repoMap)[parseInt(answer) - 1];
    const gitRepo = repoMap[projectKey];

    if (!gitRepo) {
        console.error('Invalid choice. Exiting.');
        rl.close();
        process.exit(1);
    }

    try {
        execSync(`git clone ${gitRepo}`, { stdio: 'inherit' });
        console.log('Your project was initialized successfully!');
    } catch (err) {
        console.error('Failed to initialize the project.');
        console.error(err);
    }

    rl.close();
});