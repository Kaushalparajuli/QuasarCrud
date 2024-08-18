import 'src/css/tailwind.css';

export default function (api) {
    // Quasar compatibility check; ensures compatibility with specific versions of Quasar
    api.compatibleWith('quasar', '^2.0.0');

    if (api.hasVite === true) {
        api.compatibleWith('@quasar/app-vite', '^2.0.0-beta.1');
    } else { // api.hasWebpack === true
        api.compatibleWith('@quasar/app-webpack', '^4.0.0-beta.1');
    }

    // Extend the Quasar configuration
    api.extendQuasarConf(extendConf);
}

function extendConf(conf, api) {
    // Register the boot file for the component
    conf.boot.push('src/boot/register-my-component.js');

    // Ensure the Tailwind CSS is included
    conf.css.push('~quasar-crud-kaushal/src/css/tailwind.css');

    // For Webpack builds, ensure the extension files are transpiled
    if (api.hasVite !== true) {
        conf.build.transpileDependencies.push(/quasar-crud-kaushal[\\/]src/);
    }
}
